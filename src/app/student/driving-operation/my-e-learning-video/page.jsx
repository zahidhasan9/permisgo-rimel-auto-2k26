"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack, IoClose, IoPlay, IoTime } from "react-icons/io5";
import { getLearningContents } from "@/features/API";

const sectionMeta = {
  C1: {
    title: "C1 - MASTERING",
    bg: "bg-[#AFC7F1]",
    border: "border-[#4A82E6]",
  },
  C2: {
    title: "C2 - TO UNDERSTAND",
    bg: "bg-[#F4A6AE]",
    border: "border-[#DF2339]",
  },
  C3: { title: "C3 - DRIVING", bg: "bg-[#EEDCA8]", border: "border-[#CBA64B]" },
  C4: {
    title: "C4 - PRACTICE",
    bg: "bg-[#8FDEAA]",
    border: "border-[#20A85A]",
  },
};

function youtubeId(url = "") {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be"))
      return parsed.pathname.split("/").filter(Boolean)[0] || "";
    if (
      parsed.pathname.startsWith("/shorts/") ||
      parsed.pathname.startsWith("/embed/")
    )
      return parsed.pathname.split("/")[2] || "";
    return parsed.searchParams.get("v") || "";
  } catch {
    return "";
  }
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
      .catch((err) =>
        setError(err.response?.data?.message || "Videos could not be loaded."),
      )
      .finally(() => setLoading(false));
  }, []);

  const groups = useMemo(
    () =>
      Object.keys(sectionMeta).map((key) => ({
        key,
        ...sectionMeta[key],
        videos: videos.filter((video) => (video.category || "C1") === key),
      })),
    [videos],
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-3 py-4 text-[#171717] sm:px-6 sm:py-5 lg:px-8">
      <div className="mx-auto w-full max-w-[1020px]">
        <header className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#E8EEF7] text-[22px] transition hover:bg-[#dfe7f2] sm:rounded-[11px] sm:text-[23px]"
          >
            <IoChevronBack />
          </button>
          <h1 className="min-w-0 text-[19px] font-bold leading-6 text-[#173F8F] sm:text-[24px] sm:leading-none">
            My E-learning Videos
          </h1>
        </header>

        {loading && (
          <div className="mt-6 rounded-xl bg-[#e8eef7] p-6 text-center text-sm font-semibold text-[#173f87] sm:mt-8 sm:p-8">
            Loading videos...
          </div>
        )}
        {error && (
          <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700 sm:mt-8">
            {error}
          </div>
        )}
        {!loading && !error && !videos.length && (
          <div className="mt-6 rounded-xl bg-[#e8eef7] p-6 text-center sm:mt-8 sm:p-8">
            <h2 className="font-bold text-[#173f87]">
              No E-learning videos yet
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              New videos will appear here when they are published.
            </p>
          </div>
        )}

        <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-7">
          {groups
            .filter((group) => group.videos.length)
            .map((section) => (
              <section
                key={section.key}
                className={`rounded-[12px] border ${section.border} ${section.bg} p-3 sm:p-5`}
              >
                <div className="flex min-w-0 items-center justify-between gap-2">
                  <h2 className="min-w-0 text-[13px] font-bold uppercase leading-5 text-[#174596] sm:text-[16px]">
                    {section.title}
                  </h2>
                  <span className="shrink-0 rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-bold text-[#174596] sm:px-3 sm:text-xs">
                    {section.videos.length} videos
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-5 sm:gap-4 md:grid-cols-2">
                  {section.videos.map((video) => {
                    const id = youtubeId(video.videoUrl);
                    return (
                      <button
                        type="button"
                        onClick={() => setSelected(video)}
                        key={video._id}
                        className="group min-w-0 rounded-[11px] bg-white p-2.5 text-left transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(23,69,150,0.14)] sm:p-3"
                      >
                        <div className="flex min-w-0 flex-col gap-3 min-[430px]:flex-row min-[430px]:items-center sm:gap-4">
                          <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-[10px] bg-[#d9e2ef] min-[430px]:h-[84px] min-[430px]:w-[112px] min-[430px]:aspect-auto sm:w-[104px]">
                            {id && (
                              <img
                                src={`https://i.ytimg.com/vi/${id}/mqdefault.jpg`}
                                alt=""
                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                              />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#174596] shadow-sm min-[430px]:h-[34px] min-[430px]:w-[34px]">
                                <IoPlay className="ml-0.5 text-[21px]" />
                              </span>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1 px-1 pb-1 min-[430px]:px-0 min-[430px]:pb-0">
                            <h3 className="line-clamp-2 text-[14px] font-bold leading-5 text-black sm:text-[16px]">
                              {video.title}
                            </h3>
                            <div className="mt-2 flex items-center gap-2 text-[12px] font-medium text-[#555] sm:text-[13px]">
                              <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#174596] text-white">
                                <IoTime className="text-[12px]" />
                              </span>
                              <span>{video.readMinutes || 0} minutes</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-2 sm:p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="my-auto w-full max-w-4xl rounded-xl bg-white p-2.5 shadow-2xl sm:rounded-2xl sm:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-2 flex min-w-0 items-center justify-between gap-3 sm:mb-3">
              <h2 className="min-w-0 truncate text-sm font-bold text-[#173f87] sm:text-base">
                {selected.title}
              </h2>
              <button
                onClick={() => setSelected(null)}
                aria-label="Close video"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100"
              >
                <IoClose size={22} />
              </button>
            </div>
            <div className="aspect-video overflow-hidden rounded-lg bg-black sm:rounded-xl">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${youtubeId(selected.videoUrl)}?autoplay=1`}
                title={selected.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
