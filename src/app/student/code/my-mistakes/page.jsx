"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack, IoArrowForward, IoChevronBack } from "react-icons/io5";

import { getCodeQuizAttemptReview, getMyQuizAttempts } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

export default function MyMistakesPage() {
  const router = useRouter();
  const [mistakes, setMistakes] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const attemptResponse = await getMyQuizAttempts();
        const attempts = (attemptResponse.data?.data || []).filter((item) => item.status === "completed" && Number(item.wrongCount) > 0);
        const responses = await Promise.all(attempts.map((attempt) => getCodeQuizAttemptReview(attempt._id).catch(() => null)));
        if (!active) return;
        const rows = [];
        responses.forEach((response) => {
          const review = response?.data?.data;
          review?.answers?.forEach((answer) => {
            if (answer.isCorrect || !answer.question) return;
            rows.push({
              id: `${review._id}-${answer.question._id}`,
              attemptId: review._id,
              quizTitle: review.quiz?.title || "Quiz",
              question: answer.question,
              selectedIndex: Number(answer.selectedOptionIndex),
              correctIndex: Number(answer.correctOptionIndex),
            });
          });
        });
        setMistakes(rows);
      } catch (requestError) {
        if (active) setError(requestError.response?.data?.message || requestError.message || "Mistakes could not be loaded.");
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, []);

  const item = mistakes[index];
  const topics = useMemo(() => new Set(mistakes.map((row) => row.question?.topic).filter(Boolean)).size, [mistakes]);
  const quizzes = useMemo(() => new Set(mistakes.map((row) => row.quizTitle)).size, [mistakes]);
  const selectedOption = item?.question?.options?.[item?.selectedIndex];
  const correctOption = item?.question?.options?.[item?.correctIndex];

  return <main className="min-h-screen overflow-x-hidden bg-white px-3 py-6 sm:px-6">
    <div className="mx-auto min-w-0 w-full max-w-[1084px]">
      <header className="flex min-w-0 items-center gap-4"><button type="button" onClick={() => router.back()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8edf5] text-black"><IoChevronBack size={25} /></button><div className="min-w-0"><h1 className="text-[22px] font-semibold text-[#173f87] sm:text-[25px]">My Mistakes</h1><p className="truncate text-xs text-slate-500">Review wrong answers and learn the correct answer.</p></div></header>

      <section className="mt-8 rounded-2xl bg-[#e8eef7] p-5">
        <div className="grid grid-cols-3 gap-3"><div className="rounded-xl bg-white p-3 sm:p-4"><p className="text-[9px] font-bold uppercase text-slate-500 sm:text-[11px]">Mistakes</p><p className="mt-1 text-xl font-bold text-red-600">{mistakes.length}</p></div><div className="rounded-xl bg-white p-3 sm:p-4"><p className="text-[9px] font-bold uppercase text-slate-500 sm:text-[11px]">Quizzes</p><p className="mt-1 text-xl font-bold text-[#173f87]">{quizzes}</p></div><div className="rounded-xl bg-white p-3 sm:p-4"><p className="text-[9px] font-bold uppercase text-slate-500 sm:text-[11px]">Topics</p><p className="mt-1 text-xl font-bold text-[#173f87]">{topics}</p></div></div>
      </section>

      {loading && <section className="mt-8 animate-pulse rounded-2xl bg-[#e8eef7] p-5"><div className="h-[360px] rounded-xl bg-white" /></section>}
      {error && <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
      {!loading && !error && !item && <section className="mt-8 rounded-2xl bg-[#e8eef7] p-10 text-center"><h2 className="text-lg font-bold text-[#173f87]">No mistakes found</h2><p className="mt-2 text-sm text-slate-500">Wrong answers from completed quizzes will appear here.</p><Link href="/student/code/simple-series-list" className="mt-4 inline-flex rounded-lg bg-[#173f87] px-4 py-2 text-xs font-bold text-white">Take a Quiz</Link></section>}

      {!loading && !error && item && <section className="mt-8 min-w-0 rounded-2xl bg-[#e8eef7] p-4 sm:p-5">
        <div className="mb-5 flex min-w-0 items-center justify-between gap-3"><div className="min-w-0"><p className="text-xs font-bold uppercase text-red-600">Wrong Answer Review</p><h2 className="mt-1 text-lg font-bold text-[#173f87]">Mistake {index + 1} of {mistakes.length}</h2></div><div className="flex shrink-0 gap-2"><button type="button" aria-label="Previous mistake" disabled={index === 0} onClick={() => setIndex((value) => value - 1)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dce6f4] text-[#e3263c] disabled:opacity-40"><IoArrowBack /></button><button type="button" aria-label="Next mistake" disabled={index + 1 >= mistakes.length} onClick={() => setIndex((value) => value + 1)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e3263c] text-white disabled:opacity-40"><IoArrowForward /></button></div></div>

        <article className="min-w-0 overflow-hidden rounded-xl bg-white p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-bold text-red-700">Wrong Answer</span><span className="max-w-full truncate rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-[#173f87]">{item.quizTitle}</span>{item.question.topic && <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600">Topic {item.question.topic}</span>}</div>
          <h3 className="mt-4 break-words text-base font-bold leading-7 sm:text-lg">{item.question.questionText}</h3>

          <div className={`mt-5 grid min-w-0 gap-5 ${item.question.questionImage ? "xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]" : "grid-cols-1"}`}>
            {item.question.questionImage && <div className="min-w-0 rounded-xl bg-slate-50 p-2"><img src={mediaUrl(item.question.questionImage)} alt="Question" className="mx-auto max-h-[340px] max-w-full rounded-lg object-contain" /></div>}
            <div className="min-w-0 space-y-3"><div className="min-w-0 rounded-xl border border-red-200 bg-red-50 p-4"><p className="text-[11px] font-bold uppercase text-red-600">Your Answer</p><p className="mt-2 break-words text-sm font-semibold leading-6 text-slate-800">{selectedOption?.text || "No answer"}</p></div><div className="min-w-0 rounded-xl border border-green-200 bg-green-50 p-4"><p className="text-[11px] font-bold uppercase text-green-700">Correct Answer</p><p className="mt-2 break-words text-sm font-semibold leading-6 text-slate-800">{correctOption?.text || "Not available"}</p></div>{item.question.explanationText && <div className="min-w-0 rounded-xl bg-[#f5f8fc] p-4"><p className="text-[11px] font-bold uppercase text-[#173f87]">Explanation</p><p className="mt-2 break-words text-sm leading-6 text-slate-600">{item.question.explanationText}</p></div>}</div>
          </div>

          {(item.question.markedAnswerImage || item.question.explanationImage) && <div className="mt-5 rounded-xl bg-[#f5f8fc] p-3"><img src={mediaUrl(item.question.markedAnswerImage || item.question.explanationImage)} alt="Correct answer explanation" className="mx-auto max-h-[360px] max-w-full rounded-lg object-contain" /></div>}
          <Link href={`/student/code/results?attemptId=${item.attemptId}`} className="mt-5 inline-flex rounded-lg bg-[#173f87] px-4 py-2.5 text-xs font-bold text-white">View Full Review</Link>
        </article>
      </section>}
    </div>
  </main>;
}
