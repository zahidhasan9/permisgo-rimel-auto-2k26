"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { IoChevronBack, IoVolumeHigh, IoVolumeMute } from "react-icons/io5";
import { TbClockHour4 } from "react-icons/tb";

import { finishQuizAttempt, startQuizAttempt, submitQuizAnswer } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const letter = (index) => String.fromCharCode(65 + index);

function Message({ error = false, children }) {
  return <main className="min-h-screen bg-white p-6"><div className={`mx-auto max-w-xl rounded-2xl border p-5 text-center text-sm font-bold ${error ? "border-red-200 bg-red-50 text-red-700" : "border-slate-200 text-[#123f88]"}`}>{children}</div></main>;
}

function QuizContent() {
  const router = useRouter();
  const quizId = useSearchParams().get("quizId");
  const panelRef = useRef(null);
  const startedRef = useRef(false);
  const finishedRef = useRef(false);
  const [quiz, setQuiz] = useState(null);
  const [attempt, setAttempt] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [answeredIds, setAnsweredIds] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedbackByQuestion, setFeedbackByQuestion] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [questionStartedAt, setQuestionStartedAt] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [speaking, setSpeaking] = useState(false);

  const question = questions[currentIndex];
  const feedback = question ? feedbackByQuestion[question._id] : null;
  const answered = Boolean(feedback) || Boolean(question && answeredIds.includes(question._id));
  const formattedTime = useMemo(() => `${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(timeLeft % 60).padStart(2, "0")}`, [timeLeft]);

  const start = useCallback(async () => {
    if (!quizId || startedRef.current) return;
    startedRef.current = true;
    try {
      const response = await startQuizAttempt(quizId);
      const data = response.data?.data || {};
      const list = data.questions || [];
      setQuiz(data.quiz || null);
      setAttempt(data.attempt || null);
      setQuestions(list);
      setAnsweredIds(data.answeredQuestionIds || []);
      setSelectedAnswers(data.selectedAnswers || {});
      setCurrentIndex(list.length ? Math.min(Number(data.resumeIndex || 0), list.length - 1) : 0);
      setTimeLeft(Number(data.remainingSeconds) || Number(data.quiz?.durationMinutes || 30) * 60);
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "Quiz could not be started.");
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  useEffect(() => { start(); }, [start]);

  const finish = useCallback(async () => {
    if (!attempt?._id || finishedRef.current) return;
    finishedRef.current = true;
    try {
      window.speechSynthesis?.cancel();
      const response = await finishQuizAttempt(attempt._id);
      router.push(`/student/code/my-history?latest=${response.data?.data?._id || ""}`);
    } catch (requestError) {
      finishedRef.current = false;
      setError(requestError.response?.data?.message || requestError.message || "Quiz could not be finished.");
    }
  }, [attempt?._id, router]);

  useEffect(() => {
    if (!attempt?._id || loading || finishedRef.current) return undefined;
    const timer = window.setInterval(() => setTimeLeft((value) => {
      if (value <= 1) { window.clearInterval(timer); finish(); return 0; }
      return value - 1;
    }), 1000);
    return () => window.clearInterval(timer);
  }, [attempt?._id, finish, loading]);

  useEffect(() => {
    const id = questions[currentIndex]?._id;
    const saved = id !== undefined ? selectedAnswers[id] : undefined;
    setSelectedIndex(saved !== undefined ? Number(saved) : null);
    setQuestionStartedAt(Date.now());
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, [currentIndex, questions, selectedAnswers]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const speak = () => {
    if (!question || !window.speechSynthesis) return;
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return; }
    const utterance = new SpeechSynthesisUtterance(question.voiceText || question.questionText);
    utterance.lang = "fr-FR";
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const validate = async () => {
    if (selectedIndex === null || answered || submitting || !question?._id) return;
    setSubmitting(true);
    try {
      const response = await submitQuizAnswer(attempt._id, {
        questionId: question._id,
        selectedOptionIndex: selectedIndex,
        timeSpentSeconds: Math.max(Math.round((Date.now() - questionStartedAt) / 1000), 0),
      });
      const result = response.data?.data || {};
      const finalIndex = Number(result.selectedOptionIndex ?? selectedIndex);
      setSelectedIndex(finalIndex);
      setSelectedAnswers((old) => ({ ...old, [question._id]: finalIndex }));
      setAnsweredIds((old) => old.includes(question._id) ? old : [...old, question._id]);
      setFeedbackByQuestion((old) => ({ ...old, [question._id]: result }));
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "Answer could not be checked.");
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => {
    const nextIndex = questions.findIndex((item, index) => index > currentIndex && !answeredIds.includes(item._id));
    if (nextIndex < 0) finish(); else setCurrentIndex(nextIndex);
  };

  const optionClass = (index) => {
    if (feedback) {
      if (index === Number(feedback.correctOptionIndex)) return "bg-[#21c33b] text-white border-[#21c33b]";
      if (index === selectedIndex && !feedback.isCorrect) return "bg-[#e52a39] text-white border-[#e52a39]";
      return "bg-white text-slate-800 border-white";
    }
    return index === selectedIndex ? "bg-[#123f88] text-white border-[#123f88]" : "bg-white text-slate-800 border-white hover:border-[#123f88]";
  };

  if (!quizId) return <Message error>Quiz ID missing. Please select a quiz series.</Message>;
  if (loading) return <Message>Starting quiz...</Message>;
  if (error) return <Message error>{error}</Message>;
  if (!question) return <Message>No active question found.</Message>;

  const feedbackImage = !feedback?.isCorrect && (feedback?.markedAnswerImage || feedback?.explanationImage);
  const image = feedbackImage || question.questionImage;

  return (
    <main className="min-h-screen bg-white px-3 py-6 text-[#171717] sm:px-6">
      <div ref={panelRef} className="mx-auto w-full max-w-[1084px] bg-white">
        <header className="mb-8 flex h-11 items-center gap-4">
          <button type="button" onClick={() => router.back()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8edf5] text-black"><IoChevronBack size={25} /></button>
          <h1 className="text-[25px] font-semibold leading-none tracking-[-0.02em] text-[#173f87]">{quiz?.title || "Code Challenge"}</h1>
        </header>

        <section className="min-h-[760px] rounded-xl bg-[#e8eef7] p-4 sm:p-6">
          <div className="mb-[30px] flex h-[30px] items-center justify-between text-[#123f88]">
            <p className="text-[16px] font-bold leading-none">Question {currentIndex + 1}/{questions.length}</p>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => !document.fullscreenElement ? panelRef.current?.requestFullscreen?.() : document.exitFullscreen?.()} title="Fullscreen"><FaExpandArrowsAlt size={24} /></button>
              <button type="button" onClick={speak} title="Read question">{speaking ? <IoVolumeMute size={29} /> : <IoVolumeHigh size={29} />}</button>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl bg-white">
            {image ? <img src={mediaUrl(image)} alt="Question" className="h-[300px] w-full object-cover sm:h-[439px]" /> : <div className="flex h-[300px] items-center justify-center text-slate-500 sm:h-[439px]">No question image available</div>}
          </div>

          <div className="mt-[32px] grid gap-7 lg:grid-cols-[559px_1fr]">
            <div>
              <h2 className="mb-[13px] text-[16px] font-bold leading-5">{question.questionText}</h2>
              <div className="space-y-[13px] text-[16px] leading-5 text-[#123f88]">
                {question.options?.map((option, index) => (
                  <div key={index} className="flex items-center gap-3 pr-5">
                    <p className="shrink-0">– {option.text}</p>
                    <span className="mb-[-4px] min-w-8 flex-1 border-b-2 border-dashed border-[#252525]" />
                    <span className="min-w-8 font-medium text-slate-900">{letter(index)}</span>
                  </div>
                ))}
              </div>
              {feedback?.explanationText && <p className="mt-4 rounded-lg bg-white/70 p-3 text-sm font-semibold text-[#123f88]">{feedback.explanationText}</p>}
            </div>

            <div className="flex flex-col justify-end">
              {!feedback ? (
                <div className="mb-5">
                  <p className="mb-2 text-base font-bold">An answer</p>
                  <div className="flex items-center gap-3 text-[#123f88]"><TbClockHour4 size={54} /><span className="text-lg font-black">{formattedTime}</span></div>
                </div>
              ) : (
                <div className="mb-[50px] flex h-[43px] w-fit overflow-hidden rounded-lg bg-white text-[16px] font-medium">
                  <span className="flex items-center px-3">Score {feedback.isCorrect ? 1 : 0}/1</span>
                  <span className={`flex items-center px-3 text-white ${feedback.isCorrect ? "bg-[#20c23b]" : "bg-[#e62a3a]"}`}>{feedback.isCorrect ? "Correct answer" : "Wrong answer"}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4">
                {question.options?.map((_, index) => <button key={index} type="button" disabled={answered || submitting} onClick={() => setSelectedIndex(index)} className={`h-[42px] min-w-[65px] rounded-lg border-2 px-4 text-[16px] font-medium transition ${optionClass(index)}`}>{letter(index)}</button>)}
                {!feedback ? <button type="button" disabled={selectedIndex === null || submitting} onClick={validate} className="h-[42px] rounded-lg bg-[#20c23b] px-6 text-xs font-bold uppercase text-white disabled:cursor-not-allowed disabled:opacity-50">{submitting ? "Checking..." : "To validate"}</button> : <button type="button" onClick={next} className="h-[48px] rounded-xl border-2 border-[#123f88] bg-white px-[18px] text-[16px] font-bold text-[#123f88]">{currentIndex + 1 >= questions.length ? "Finish" : "Following"}</button>}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function CodeChallengePage() {
  return <Suspense fallback={<Message>Loading...</Message>}><QuizContent /></Suspense>;
}
