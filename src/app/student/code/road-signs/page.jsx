"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack, IoArrowForward, IoChevronBack } from "react-icons/io5";
import { getRoadSigns } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const PAGE_SIZE = 12;

export default function RoadSignsPage() {
  const router = useRouter();
  const [signs, setSigns] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRoadSigns().then(({ data }) => setSigns(data?.data || [])).catch((err) => setError(err.response?.data?.message || "Road signs could not be loaded.")).finally(() => setLoading(false));
  }, []);

  const pages = Math.max(1, Math.ceil(signs.length / PAGE_SIZE));
  const visible = useMemo(() => signs.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE), [signs, page]);

  return <main className="min-h-screen overflow-x-hidden bg-white px-3 py-6 sm:px-6">
    <div className="mx-auto w-full max-w-[1084px]">
      <header className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4"><button type="button" onClick={() => router.back()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8edf5] text-black"><IoChevronBack size={25} /></button><h1 className="truncate text-[22px] font-semibold text-[#173f87] sm:text-[25px]">Road Sign</h1></div>
        <div className="flex shrink-0 gap-3"><button type="button" aria-label="Previous signs" disabled={page === 0} onClick={() => setPage((p) => p - 1)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6edf7] text-[#e3263c] disabled:opacity-40"><IoArrowBack /></button><button type="button" aria-label="Next signs" disabled={page + 1 >= pages} onClick={() => setPage((p) => p + 1)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e3263c] text-white disabled:opacity-40"><IoArrowForward /></button></div>
      </header>

      <section className="mt-8 rounded-2xl bg-[#e8eef7] p-4 sm:p-6">
        {loading && <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-[262px] animate-pulse rounded-xl bg-white" />)}</div>}
        {error && <div className="rounded-xl bg-red-50 p-5 text-center font-semibold text-red-700">{error}</div>}
        {!loading && !error && !visible.length && <div className="rounded-xl bg-white p-12 text-center"><h2 className="font-bold text-[#173f87]">No road signs available</h2><p className="mt-2 text-sm text-slate-500">Road signs added by admin will appear here.</p></div>}
        {!loading && !error && visible.length > 0 && <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{visible.map((sign) => <article key={sign._id} className="flex min-w-0 flex-col items-center rounded-xl bg-white px-4 pb-5 pt-6 text-center"><div className="flex h-[170px] w-full items-center justify-center"><img src={mediaUrl(sign.image)} alt={sign.title} className="max-h-[160px] max-w-full object-contain" /></div><h2 className="mt-2 break-words text-xl font-bold leading-6 text-[#173f87]">{sign.title}</h2>{sign.description && <p className="mt-2 break-words text-sm leading-5 text-slate-700">{sign.description}</p>}</article>)}</div>}
      </section>

      <section className="mt-8 flex flex-col gap-4 rounded-2xl bg-[#e8eef7] p-6 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-xl font-bold text-black">Road Signs Guide</h2><p className="mt-2 text-sm text-slate-500">● {signs.length} road signs available</p></div><button type="button" onClick={() => window.print()} className="inline-flex w-fit rounded-lg bg-[#e3263c] px-8 py-3 text-xs font-bold text-white">Download</button></section>
    </div>
  </main>;
}
