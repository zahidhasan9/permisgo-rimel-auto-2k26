"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoArrowBack, IoArrowForward, IoChevronBack } from "react-icons/io5";

import { getCodeQuizAttemptReview, getMyQuizAttempts } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const optionLetter = (index) => String.fromCharCode(65 + index);

function Message({ error = false, children }) {
  return <main className="min-h-screen bg-white p-6"><div className={`mx-auto max-w-xl rounded-xl border p-5 text-center text-sm font-semibold ${error ? "border-red-200 bg-red-50 text-red-700" : "border-slate-200 text-[#173f87]"}`}>{children}</div></main>;
}

function ResultsContent() {
  const router = useRouter();
  const params = useSearchParams();
  const requestedId = params.get("attemptId") || params.get("latest");
  const [result, setResult] = useState(null);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        let attemptId = requestedId;
        if (!attemptId) {
          const response = await getMyQuizAttempts();
          attemptId = (response.data?.data || []).find((item) => item.status === "completed")?._id;
        }
        if (!attemptId) throw new Error("No completed quiz result found.");
        const response = await getCodeQuizAttemptReview(attemptId);
        if (active) setResult(response.data?.data || null);
      } catch (requestError) {
        if (active) setError(requestError.response?.data?.message || requestError.message || "Result could not be loaded.");
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, [requestedId]);

  if (loading) return <Message>Loading result...</Message>;
  if (error || !result) return <Message error>{error || "Result not found."}</Message>;

  const answers = result.answers || [];
  const answer = answers[index];
  const question = answer?.question || {};
  const selected = Number(answer?.selectedOptionIndex);
  const correct = Number(answer?.correctOptionIndex);

  return <main className="min-h-screen overflow-x-hidden bg-[#f8fafc] px-3 py-5 sm:px-5 lg:px-6">
    <div className="mx-auto min-w-0 w-full max-w-[1084px]">
      <header className="flex min-w-0 items-center gap-3"><button type="button" onClick={() => router.back()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8edf5] text-black"><IoChevronBack size={25} /></button><div className="min-w-0"><h1 className="text-[22px] font-semibold leading-tight text-[#173f87] sm:text-[25px]">Quiz Result</h1><p className="mt-0.5 truncate text-xs text-slate-500">{result.quiz?.title || "Quiz review"}</p></div></header>

      <section className="mt-8 rounded-2xl bg-[#e8eef7] p-5">
        <div className="grid min-w-0 grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
          {[["Score", `${result.score || 0}/${result.totalQuestions || 0}`], ["Percentage", `${result.percentage || 0}%`], ["Correct", result.correctCount || 0], ["Wrong", result.wrongCount || 0], ["Status", result.passed ? "Passed" : "Failed"]].map(([label, value]) => <div key={label} className={`min-w-0 rounded-xl bg-white p-3.5 ${label === "Status" ? "col-span-2 md:col-span-1" : ""}`}><p className="truncate text-[10px] font-semibold uppercase tracking-wide text-slate-500">{label}</p><p className={`mt-1 truncate text-lg font-bold sm:text-xl ${label === "Correct" || (label === "Status" && result.passed) ? "text-green-600" : label === "Wrong" || label === "Status" ? "text-red-600" : "text-[#173f87]"}`}>{value}</p></div>)}
        </div>
        <div className="mt-4 flex items-center gap-3"><div className="h-3 min-w-0 flex-1 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-[#17479a]" style={{ width: `${result.percentage || 0}%` }} /></div><b className="shrink-0 text-xs text-[#173f87]">{result.percentage || 0}%</b></div>
      </section>

      {answer ? <section className="mt-8 rounded-2xl bg-[#e8eef7] p-5">
        <div className="mb-5 flex min-w-0 items-center justify-between gap-3"><div className="min-w-0"><p className="text-xs font-bold uppercase text-[#173f87]">Answer Review</p><h2 className="mt-1 text-lg font-bold sm:text-xl">Question {index + 1} of {answers.length}</h2></div><div className="flex shrink-0 gap-2"><button type="button" aria-label="Previous question" disabled={index === 0} onClick={() => setIndex((value) => value - 1)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dce6f4] text-[#e3263c] disabled:opacity-40"><IoArrowBack /></button><button type="button" aria-label="Next question" disabled={index + 1 >= answers.length} onClick={() => setIndex((value) => value + 1)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e3263c] text-white disabled:opacity-40"><IoArrowForward /></button></div></div>

        <article className="min-w-0 overflow-hidden rounded-xl bg-white p-4 sm:p-5">
          <div className={`grid min-w-0 gap-5 ${question.questionImage ? "xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]" : "grid-cols-1"}`}>
            {question.questionImage && <div className="min-w-0 rounded-xl bg-slate-50 p-2"><img src={mediaUrl(question.questionImage)} alt="Question" className="mx-auto max-h-[360px] w-full rounded-lg object-contain" /></div>}
            <div className="min-w-0"><div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"><h3 className="min-w-0 break-words text-base font-bold leading-7 sm:text-lg">{question.questionText || "Question"}</h3><span className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-bold ${answer.isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{answer.isCorrect ? "Correct" : "Wrong"}</span></div>
              <div className="mt-4 space-y-2">{question.options?.map((option, optionIndex) => {
                const isCorrect = optionIndex === correct;
                const isWrongSelected = optionIndex === selected && !answer.isCorrect;
                return <div key={optionIndex} className={`grid min-w-0 grid-cols-[28px_minmax(0,1fr)] items-start gap-3 rounded-lg border p-3 text-sm font-semibold sm:grid-cols-[28px_minmax(0,1fr)_auto] ${isCorrect ? "border-green-300 bg-green-50 text-green-800" : isWrongSelected ? "border-red-300 bg-red-50 text-red-800" : "border-slate-200 bg-white text-slate-600"}`}><span className={`flex h-7 w-7 items-center justify-center rounded-md ${isCorrect ? "bg-green-600 text-white" : isWrongSelected ? "bg-red-600 text-white" : "bg-slate-100"}`}>{optionLetter(optionIndex)}</span><span className="min-w-0 break-words leading-6">{option.text}</span>{isCorrect && <b className="col-start-2 text-[10px] uppercase sm:col-auto sm:self-center">Correct answer</b>}{isWrongSelected && <b className="col-start-2 text-[10px] uppercase sm:col-auto sm:self-center">Your answer</b>}</div>;
              })}</div>
            </div>
          </div>
          {(question.markedAnswerImage || question.explanationImage || question.explanationText) && <div className="mt-5 min-w-0 overflow-hidden rounded-xl bg-[#f5f8fc] p-4"><h4 className="font-bold text-[#173f87]">Explanation</h4>{question.explanationText && <p className="mt-2 break-words text-sm leading-6 text-slate-600">{question.explanationText}</p>}{(question.markedAnswerImage || question.explanationImage) && <img src={mediaUrl(question.markedAnswerImage || question.explanationImage)} alt="Correct answer explanation" className="mx-auto mt-3 max-h-[360px] max-w-full rounded-xl object-contain" />}</div>}
        </article>
      </section> : <section className="mt-8 rounded-xl bg-[#e8eef7] p-10 text-center text-sm text-slate-500">No answer review is available.</section>}
    </div>
  </main>;
}

export default function StudentCodeResultsPage() {
  return <Suspense fallback={<Message>Loading result...</Message>}><ResultsContent /></Suspense>;
}
