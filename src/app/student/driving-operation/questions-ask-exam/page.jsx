"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack, IoChevronForward, IoVideocam } from "react-icons/io5";
import { getExamQuestions } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

export default function ExamQuestionsPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getExamQuestions().then((response) => {
      const data = response?.data?.data ?? response?.data ?? [];
      if (active) setQuestions(Array.isArray(data) ? data : []);
    }).catch((requestError) => { if (active) setError(requestError.response?.data?.message || "Exam questions could not be loaded."); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const selected = questions[activeIndex];
  return <main className="min-h-screen bg-white px-4 py-5 text-[#171717] sm:px-6 lg:px-8"><div className="mx-auto w-full">
    <header className="flex items-center gap-4"><button type="button" onClick={() => router.back()} className="flex h-11 w-11 items-center justify-center rounded-[11px] bg-[#E8EEF7] text-[24px]"><IoChevronBack /></button><h1 className="text-[23px] font-bold text-[#173F8F] sm:text-[25px]">Questions asked in the exam</h1></header>
    {error && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
    <section className="mt-8 rounded-[12px] bg-[#E8EEF7] p-4 sm:p-5">
      {loading ? <div className="h-96 animate-pulse rounded-xl bg-white" /> : !selected ? <div className="rounded-xl bg-white p-12 text-center text-sm font-semibold text-slate-500">No exam question is available yet.</div> : <div className="grid grid-cols-1 gap-6 lg:grid-cols-[370px_1fr]">
        <aside><div className="grid grid-cols-5 gap-x-3 gap-y-3 xs:grid-cols-6 sm:grid-cols-8 lg:grid-cols-10">{questions.map((question, index) => <button key={question._id} type="button" onClick={() => setActiveIndex(index)} title={question.title || `Question ${question.number}`} className={`flex h-[27px] min-w-0 items-center justify-center rounded-[2px] border text-[12px] font-bold transition ${activeIndex === index ? "border-[#DF2339] bg-[#DF2339] text-white" : "border-[#8EA5C9] bg-[#AFC0DD] text-white hover:bg-[#174596]"}`}>{String(question.number).padStart(2, "0")}</button>)}</div></aside>
        <div className="min-w-0">{selected.image && <div className="relative overflow-hidden rounded-[10px] bg-white"><img src={mediaUrl(selected.image)} alt={selected.title || "Exam question"} className="h-[190px] w-full object-cover sm:h-[220px] lg:h-[222px]" />{selected.videoUrl && <button type="button" onClick={() => window.open(selected.videoUrl, "_blank", "noopener,noreferrer")} className="absolute bottom-3 right-3 flex h-10 items-center gap-2 rounded-[9px] bg-white/90 px-4 text-[13px] font-bold text-[#174596] shadow-md"><IoVideocam className="text-lg" />Video Explanation</button>}</div>}
          {!selected.image && selected.videoUrl && <button type="button" onClick={() => window.open(selected.videoUrl, "_blank", "noopener,noreferrer")} className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-bold text-[#174596]"><IoVideocam />Video Explanation</button>}
          <div className="mt-5 space-y-5">{selected.items.map((item, index) => <article key={item._id || index}><h3 className="text-[15px] font-bold leading-relaxed">Question {String(index + 1).padStart(2, "0")}: {item.question}</h3><div className="mt-2 grid gap-2 text-[13px] leading-relaxed text-[#666] sm:grid-cols-[65px_1fr]"><b className="text-[#171717]">Answer</b><p>{item.answer}</p></div></article>)}</div>
        </div>
      </div>}
    </section>
    {!!selected && <div className="mt-24 flex justify-center"><div className="flex overflow-hidden rounded-xl bg-slate-600 shadow-lg"><button type="button" disabled={activeIndex === 0} onClick={() => setActiveIndex((index) => index - 1)} className="flex h-11 w-11 items-center justify-center border-r border-white/20 text-white disabled:opacity-30"><IoChevronBack /></button><button type="button" disabled={activeIndex === questions.length - 1} onClick={() => setActiveIndex((index) => index + 1)} className="flex h-11 w-11 items-center justify-center text-white disabled:opacity-30"><IoChevronForward /></button></div></div>}
  </div></main>;
}
