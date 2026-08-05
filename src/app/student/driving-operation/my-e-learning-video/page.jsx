"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack, IoClose, IoPlay, IoTime } from "react-icons/io5";
import { getLearningContents } from "@/features/API";

const sectionMeta = {
  C1: { title: "C1 - MASTERING", bg: "bg-[#AFC7F1]", border: "border-[#4A82E6]" },
  C2: { title: "C2 - TO UNDERSTAND", bg: "bg-[#F4A6AE]", border: "border-[#DF2339]" },
  C3: { title: "C3 - DRIVING", bg: "bg-[#EEDCA8]", border: "border-[#CBA64B]" },
  C4: { title: "C4 - PRACTICE", bg: "bg-[#8FDEAA]", border: "border-[#20A85A]" },
};

function youtubeId(url = "") {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.split("/").filter(Boolean)[0] || "";
    if (parsed.pathname.startsWith("/shorts/") || parsed.pathname.startsWith("/embed/")) return parsed.pathname.split("/")[2] || "";
    return parsed.searchParams.get("v") || "";
  } catch { return ""; }
}

export default function Page() {
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getLearningContents({ type: "e-learning-video" })
      .then(({ data }) => setVideos(data?.data || []))
      .catch((err) => setError(err.response?.data?.message || "Videos could not be loaded."))
      .finally(() => setLoading(false));
  }, []);

  const groups = useMemo(() => Object.keys(sectionMeta).map((key) => ({ key, ...sectionMeta[key], videos: videos.filter((video) => (video.category || "C1") === key) })), [videos]);

  return <main className="min-h-screen bg-white px-4 py-5 text-[#171717] sm:px-6 lg:px-8"><div className="mx-auto w-full max-w-[1020px]">
    <header className="flex items-center gap-3 sm:gap-4"><button type="button" onClick={() => router.back()} aria-label="Go back" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#E8EEF7] text-[23px] transition hover:bg-[#dfe7f2]"><IoChevronBack /></button><h1 className="text-[22px] font-bold leading-none text-[#173F8F] sm:text-[24px]">My E-learning Videos</h1></header>
    {loading && <div className="mt-8 rounded-xl bg-[#e8eef7] p-8 text-center font-semibold text-[#173f87]">Loading videos...</div>}
    {error && <div className="mt-8 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
    {!loading && !error && !videos.length && <div className="mt-8 rounded-xl bg-[#e8eef7] p-8 text-center"><h2 className="font-bold text-[#173f87]">No E-learning videos yet</h2><p className="mt-1 text-sm text-slate-500">New videos will appear here when they are published.</p></div>}
    <div className="mt-8 space-y-7">{groups.filter((group) => group.videos.length).map((section) => <section key={section.key} className={`rounded-[12px] border ${section.border} ${section.bg} p-4 sm:p-5`}><div className="flex items-center justify-between"><h2 className="text-[15px] font-bold uppercase text-[#174596] sm:text-[16px]">{section.title}</h2><span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-[#174596]">{section.videos.length} videos</span></div><div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">{section.videos.map((video) => { const id = youtubeId(video.videoUrl); return <button type="button" onClick={() => setSelected(video)} key={video._id} className="group rounded-[11px] bg-white p-3 text-left transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(23,69,150,0.14)]"><div className="flex items-center gap-4"><div className="relative h-[82px] w-[100px] shrink-0 overflow-hidden rounded-[10px] bg-[#d9e2ef] sm:h-[84px] sm:w-[104px]">{id && <img src={`https://i.ytimg.com/vi/${id}/mqdefault.jpg`} alt="" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />}<div className="absolute inset-0 flex items-center justify-center bg-black/20"><span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/90 text-[#174596] shadow-sm"><IoPlay className="ml-0.5 text-[20px]" /></span></div></div><div className="min-w-0 flex-1"><h3 className="line-clamp-2 text-[15px] font-bold text-black sm:text-[16px]">{video.title}</h3><div className="mt-2 flex items-center gap-2 text-[13px] font-medium text-[#555]"><span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#174596] text-white"><IoTime className="text-[12px]" /></span><span>{video.readMinutes || 0} minutes</span></div></div></div></button>; })}</div></section>)}</div>
  </div>{selected && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setSelected(null)}><div className="w-full max-w-4xl rounded-2xl bg-white p-3 shadow-2xl sm:p-5" onClick={(event) => event.stopPropagation()}><div className="mb-3 flex items-center justify-between gap-4"><h2 className="line-clamp-1 font-bold text-[#173f87]">{selected.title}</h2><button onClick={() => setSelected(null)} aria-label="Close video" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100"><IoClose size={22} /></button></div><div className="aspect-video overflow-hidden rounded-xl bg-black"><iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${youtubeId(selected.videoUrl)}?autoplay=1`} title={selected.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div></div></div>}
  </main>;
}
