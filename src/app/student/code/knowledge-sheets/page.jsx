"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack, IoTime } from "react-icons/io5";
import { downloadLearningContentFile, getLearningContents } from "@/features/API";

export default function KnowledgeSheetsPage() {
  const router = useRouter();
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getLearningContents({ type: "knowledge-sheet" })
      .then(({ data }) => setSheets(data?.data || []))
      .catch((e) => setError(e.response?.data?.message || "Knowledge sheets could not be loaded."))
      .finally(() => setLoading(false));
  }, []);

  const download = async (sheet) => {
    setDownloading(sheet._id); setError("");
    try {
      const response = await downloadLearningContentFile(sheet._id);
      const url = URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url; link.download = `${sheet.title || "knowledge-sheet"}.pdf`;
      document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
    } catch (requestError) {
      let message = requestError.response?.data?.message;
      if (requestError.response?.data instanceof Blob) {
        try { message = JSON.parse(await requestError.response.data.text())?.message; } catch { /* use fallback */ }
      }
      setError(message || "PDF download failed. Please try again.");
    } finally { setDownloading(""); }
  };

  return <main className="min-h-screen bg-white px-3 py-6 sm:px-6"><div className="mx-auto max-w-[1084px]">
    <header className="flex items-center gap-4"><button onClick={() => router.back()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8edf5]"><IoChevronBack size={25} /></button><h1 className="text-[22px] font-semibold text-[#173f87] sm:text-[25px]">Knowledge Sheets</h1></header>
    {error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}
    <section className="mt-8 rounded-2xl bg-[#e8eef7] p-4 sm:p-5">
      {loading ? <div className="grid gap-3 md:grid-cols-2">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-[91px] animate-pulse rounded-xl bg-white" />)}</div> : sheets.length ? <div className="grid gap-3 md:grid-cols-2">{sheets.map((sheet) => <article key={sheet._id} className="flex min-w-0 flex-col gap-4 rounded-xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><h2 className="break-words text-base font-bold leading-6 text-black">{sheet.title}</h2>{sheet.description && <p className="mt-1 line-clamp-1 break-words text-xs text-slate-500">{sheet.description}</p>}<p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#174a9b] text-white"><IoTime size={11} /></span>{sheet.readMinutes || 0} minutes read</p></div>{sheet.fileUrl ? <button type="button" disabled={downloading === sheet._id} onClick={() => download(sheet)} className="flex h-9 w-full shrink-0 items-center justify-center rounded-lg border border-[#174a9b] px-6 text-xs font-bold text-[#174a9b] hover:bg-[#174a9b] hover:text-white disabled:opacity-50 sm:w-[125px]">{downloading === sheet._id ? "Downloading..." : "Download"}</button> : <span className="flex h-9 w-full shrink-0 items-center justify-center rounded-lg border border-slate-200 px-6 text-xs font-bold text-slate-400 sm:w-[125px]">Unavailable</span>}</article>)}</div> : <p className="rounded-xl bg-white p-10 text-center text-slate-500">No knowledge sheets available yet.</p>}
    </section>
  </div></main>;
}
