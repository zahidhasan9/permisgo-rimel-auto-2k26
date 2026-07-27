"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoChevronBack, IoMusicalNotes } from "react-icons/io5";
import { getCodeQuizAttemptReview, getMyQuizAttempts } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const letter = (index) => String.fromCharCode(65 + index);

function Message({ error, children }) {
  return <main className="min-h-screen bg-white p-6"><div className={`mx-auto max-w-xl rounded-xl p-5 text-center text-sm font-semibold ${error ? "bg-red-50 text-red-700" : "bg-[#e8eef7] text-[#173f87]"}`}>{children}</div></main>;
}

function ScoreContent() {
  const router = useRouter();
  const requestedId = useSearchParams().get("attemptId");
  const refs = useRef({});
  const [result, setResult] = useState(null);
  const [resultFilter, setResultFilter] = useState("all");
  const [themeFilter, setThemeFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        let id = requestedId;
        if (!id) {
          const attempts = await getMyQuizAttempts();
          id = (attempts.data?.data || []).find((item) => item.status === "completed")?._id;
        }
        if (!id) throw new Error("No completed result found.");
        const response = await getCodeQuizAttemptReview(id);
        if (active) setResult(response.data?.data || null);
      } catch (requestError) { if (active) setError(requestError.response?.data?.message || requestError.message || "Score could not be loaded."); }
      finally { if (active) setLoading(false); }
    };
    load();
    return () => { active = false; };
  }, [requestedId]);

  const themes = useMemo(() => [...new Set((result?.answers || []).map((answer) => answer.question?.topic).filter(Boolean))], [result]);
  const visibleAnswers = useMemo(() => (result?.answers || []).filter((answer) => {
    if (resultFilter === "correct" && !answer.isCorrect) return false;
    if (resultFilter === "wrong" && answer.isCorrect) return false;
    return themeFilter === "all" || answer.question?.topic === themeFilter;
  }), [result, resultFilter, themeFilter]);

  const speak = (question) => {
    if (!window.speechSynthesis || !question) return;
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(question.voiceText || question.questionText);
    speech.lang = "fr-FR";
    window.speechSynthesis.speak(speech);
  };

  if (loading) return <Message>Loading your score...</Message>;
  if (error || !result) return <Message error>{error || "Score not found."}</Message>;

  return <main className="min-h-screen bg-white px-3 py-5 sm:px-6">
    <div className="mx-auto max-w-[1200px]">
      <header className="flex items-center gap-3"><button onClick={() => router.back()} className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8edf5]"><IoChevronBack size={25}/></button><h1 className="text-[25px] font-bold text-[#173f87]">My Score</h1></header>
      <div className="mt-7 grid gap-5 lg:grid-cols-[265px_minmax(0,1fr)]">
        <aside className="space-y-5 lg:sticky lg:top-5 lg:self-start">
          <section className="rounded-xl bg-[#e8eef7] p-5"><p className="text-xs text-slate-500">My score</p><h2 className="mt-2 text-sm font-bold uppercase text-[#173f87]">{result.quiz?.title || "Quiz Series"}</h2><p className="mt-4 text-3xl font-black text-[#173f87]">{result.score || 0}/{result.totalQuestions || 0}</p></section>
          <section className="rounded-xl bg-[#e8eef7] p-5"><h2 className="text-sm font-bold uppercase text-[#173f87]">Filter by..</h2><select value={resultFilter} onChange={(e) => setResultFilter(e.target.value)} className="mt-4 w-full rounded-lg border-0 bg-white px-3 py-3 text-xs"><option value="all">Results</option><option value="correct">Correct answers</option><option value="wrong">Wrong answers</option></select><select value={themeFilter} onChange={(e) => setThemeFilter(e.target.value)} className="mt-3 w-full rounded-lg border-0 bg-white px-3 py-3 text-xs"><option value="all">Themes</option>{themes.map((theme) => <option key={theme} value={theme}>{theme}</option>)}</select></section>
          <section className="rounded-xl bg-[#e8eef7] p-5"><h2 className="text-sm font-bold text-[#173f87]">Show the question...</h2><div className="mt-4 flex flex-wrap gap-3">{result.answers?.map((answer,index) => <button key={index} onClick={() => refs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" })} className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-white ${answer.isCorrect ? "bg-[#24bd3b]" : "bg-[#df263d]"}`}>{index + 1}</button>)}</div></section>
        </aside>

        <section className="space-y-7">
          {!visibleAnswers.length && <div className="rounded-xl bg-[#e8eef7] p-10 text-center text-sm text-slate-500">No answer matches this filter.</div>}
          {visibleAnswers.map((answer) => {
            const originalIndex = result.answers.indexOf(answer);
            const question = answer.question || {};
            const selected = Number(answer.selectedOptionIndex);
            const correct = Number(answer.correctOptionIndex);
            return <article ref={(node) => { refs.current[originalIndex] = node; }} key={`${question._id}-${originalIndex}`} className="scroll-mt-5 overflow-hidden rounded-[11px] bg-[#e8eef7] p-3">
              {question.questionImage && <img src={mediaUrl(question.questionImage)} alt="Question" className="h-[250px] w-full rounded-[9px] bg-white object-cover sm:h-[365px]"/>}
              <div className={`mt-5 grid gap-5 ${answer.isCorrect ? "lg:grid-cols-[minmax(0,1fr)_210px]" : "lg:grid-cols-[minmax(0,1fr)_230px]"}`}>
                <div className="min-w-0">
                  <div className="flex gap-3"><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[7px] text-sm font-bold text-white ${answer.isCorrect ? "bg-[#20bd39]" : "bg-[#e2253b]"}`}>{originalIndex + 1}</span><div><h2 className="text-[15px] font-bold text-[#173f87]">{answer.isCorrect ? "Right answer" : "Wrong answer"}</h2><p className="mt-1 text-[11px] text-slate-500">{answer.isCorrect ? "You answered correctly" : "You didn’t answer correctly"}</p></div></div>
                  <h3 className="mt-7 text-[13px] font-bold">{question.questionText}</h3>
                  <div className="mt-4 space-y-2">{question.options?.map((option,index) => {
                    const correctOption = index === correct;
                    const wrongSelection = index === selected && !answer.isCorrect;
                    return <div key={index} className={`flex min-h-[38px] items-center justify-between gap-4 rounded-[7px] border px-3 py-2 text-[11px] ${correctOption ? "border-[#20bd39] bg-[#f5fff6] text-[#287b35]" : wrongSelection ? "border-[#e2253b] bg-[#fff7f8] text-[#b82033]" : "border-transparent bg-transparent text-slate-600"}`}><span>{option.text}</span><span className="min-w-[90px] border-b border-dashed border-slate-500 pb-0.5 text-right font-bold">{letter(index)}</span></div>;
                  })}</div>
                </div>
                <aside className="space-y-3">
                  <div className="flex items-center gap-3"><span className="flex h-11 min-w-11 items-center justify-center rounded-full bg-[#f6b72d] px-2 text-[11px] font-bold text-white">{question.topic || "—"}</span><button onClick={() => speak(question)} className="flex h-11 flex-1 items-center justify-center gap-2 rounded-[8px] bg-white px-3 text-[11px] font-bold text-[#173f87]"><IoMusicalNotes/> Listen to the answer</button></div>
                  {!answer.isCorrect && <div className="rounded-[9px] bg-white p-4 text-[11px]"><p className="font-bold text-[#173f87]">My first answer</p><span className="mt-3 inline-flex rounded-[6px] bg-[#20bd39] px-4 py-2 font-bold text-white">{question.topic || letter(correct)}</span><p className="mt-5 font-bold text-[#173f87]">My second answer</p><div className="mt-3 flex gap-3"><span className="rounded-[6px] bg-[#20bd39] px-4 py-2 font-bold text-white">{question.topic || letter(correct)}</span><span className="rounded-[6px] bg-[#e2253b] px-4 py-2 font-bold text-white">{letter(selected)}</span></div></div>}
                </aside>
              </div>
              {(question.explanationText || question.explanationImage || question.markedAnswerImage) && <div className="mt-5 rounded-xl bg-white p-4">{question.explanationText && <p className="text-sm leading-6 text-slate-600">{question.explanationText}</p>}{(question.markedAnswerImage || question.explanationImage) && <img src={mediaUrl(question.markedAnswerImage || question.explanationImage)} alt="Explanation" className="mx-auto mt-3 max-h-[320px] rounded-lg object-contain"/>}</div>}
            </article>;
          })}
        </section>
      </div>
    </div>
  </main>;
}

export default function ScorePage() { return <Suspense fallback={<Message>Loading your score...</Message>}><ScoreContent/></Suspense>; }
