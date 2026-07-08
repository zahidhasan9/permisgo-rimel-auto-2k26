// "use client";

// import {
//   Suspense,
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import {
//   IoAlertCircleOutline,
//   IoChevronBack,
//   IoVolumeHigh,
//   IoVolumeMute,
// } from "react-icons/io5";
// import { FaCheckCircle, FaExpandArrowsAlt } from "react-icons/fa";
// import { FaArrowRight } from "react-icons/fa6";
// import { TbClockHour4 } from "react-icons/tb";
// import {
//   finishQuizAttempt,
//   startQuizAttempt,
//   submitQuizAnswer,
// } from "@/features/API";
// import { mediaUrl } from "@/utils/mediaUrl";

// const optionLetter = (index) => String.fromCharCode(65 + index);

// function StatBox({ label, value }) {
//   return (
//     <div className="rounded-xl border border-slate-200 bg-[#f8f8fb] px-2.5 py-2">
//       <p className="text-[9px] font-bold uppercase leading-none text-slate-400">
//         {label}
//       </p>

//       <p className="mt-1 text-xs font-black leading-none text-slate-900">
//         {value}
//       </p>
//     </div>
//   );
// }

// function CenterMessage({ type = "info", children }) {
//   const toneClass =
//     type === "error"
//       ? "border-rose-200 bg-rose-50 text-rose-700"
//       : "border-slate-200 bg-white text-[#0D4598]";

//   return (
//     <div className="min-h-screen bg-[#f8f8fb] px-3 py-3 md:px-4 lg:px-5">
//       <div
//         className={`mx-auto flex max-w-xl items-center justify-center gap-2 rounded-[16px] border px-4 py-4 text-center text-xs font-bold shadow-[0_8px_22px_rgba(15,23,42,0.04)] ${toneClass}`}
//       >
//         {type === "error" && <IoAlertCircleOutline size={18} />}
//         {children}
//       </div>
//     </div>
//   );
// }

// function CodeChallengeContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const quizId = searchParams.get("quizId");

//   const panelRef = useRef(null);
//   const hasStarted = useRef(false);
//   const hasFinished = useRef(false);

//   const [quiz, setQuiz] = useState(null);
//   const [attempt, setAttempt] = useState(null);
//   const [questions, setQuestions] = useState([]);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedIndex, setSelectedIndex] = useState(null);
//   const [feedback, setFeedback] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [questionStartTime, setQuestionStartTime] = useState(Date.now());

//   const currentQuestion = questions[currentIndex];

//   const progress = questions.length
//     ? Math.round(((currentIndex + 1) / questions.length) * 100)
//     : 0;

//   const formattedTime = useMemo(() => {
//     const minutes = Math.floor(timeLeft / 60)
//       .toString()
//       .padStart(2, "0");
//     const seconds = Math.floor(timeLeft % 60)
//       .toString()
//       .padStart(2, "0");

//     return `${minutes}:${seconds}`;
//   }, [timeLeft]);

//   useEffect(() => {
//     const startQuiz = async () => {
//       if (!quizId || hasStarted.current) return;

//       try {
//         hasStarted.current = true;
//         setLoading(true);
//         setError("");

//         const res = await startQuizAttempt(quizId);
//         const data = res.data?.data;

//         setQuiz(data?.quiz || null);
//         setAttempt(data?.attempt || null);
//         setQuestions(data?.questions || []);
//         setTimeLeft((data?.quiz?.durationMinutes || 30) * 60);
//         setQuestionStartTime(Date.now());
//       } catch (err) {
//         const status = err.response?.status;
//         const message =
//           err.response?.data?.message || err.message || "Failed to start quiz";

//         if (status === 409) {
//           setError(`${message} Please go to My History to view your result.`);
//         } else {
//           setError(message);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     startQuiz();
//   }, [quizId]);

//   const finishAttempt = useCallback(async () => {
//     if (!attempt?._id || hasFinished.current) return;

//     try {
//       hasFinished.current = true;

//       if (typeof window !== "undefined" && window.speechSynthesis) {
//         window.speechSynthesis.cancel();
//       }

//       const res = await finishQuizAttempt(attempt._id);
//       const finishedAttempt = res.data?.data;

//       router.push(
//         `/student/code/my-history?latest=${finishedAttempt?._id || ""}`,
//       );
//     } catch (err) {
//       setError(
//         err.response?.data?.message || err.message || "Failed to finish quiz",
//       );
//     }
//   }, [attempt?._id, router]);

//   useEffect(() => {
//     if (!attempt?._id || hasFinished.current || loading || timeLeft <= 0) {
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           finishAttempt();
//           return 0;
//         }

//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [attempt?._id, finishAttempt, loading, timeLeft]);

//   useEffect(() => {
//     setSelectedIndex(null);
//     setFeedback(null);
//     setQuestionStartTime(Date.now());

//     if (typeof window !== "undefined" && window.speechSynthesis) {
//       window.speechSynthesis.cancel();
//       setIsSpeaking(false);
//     }
//   }, [currentIndex]);

//   useEffect(() => {
//     return () => {
//       if (typeof window !== "undefined" && window.speechSynthesis) {
//         window.speechSynthesis.cancel();
//       }
//     };
//   }, []);

//   function handleBack() {
//     router.back();
//   }

//   function handleFullscreen() {
//     if (!panelRef.current) return;

//     if (!document.fullscreenElement) {
//       panelRef.current.requestFullscreen?.();
//     } else {
//       document.exitFullscreen?.();
//     }
//   }

//   function speakQuestion() {
//     if (!currentQuestion || typeof window === "undefined") return;
//     if (!window.speechSynthesis) return;

//     window.speechSynthesis.cancel();

//     const text = currentQuestion.voiceText || currentQuestion.questionText;
//     const utterance = new SpeechSynthesisUtterance(text);

//     utterance.lang = "fr-FR";
//     utterance.rate = 0.9;

//     utterance.onend = () => setIsSpeaking(false);
//     utterance.onerror = () => setIsSpeaking(false);

//     setIsSpeaking(true);
//     window.speechSynthesis.speak(utterance);
//   }

//   function stopVoice() {
//     if (typeof window !== "undefined" && window.speechSynthesis) {
//       window.speechSynthesis.cancel();
//     }

//     setIsSpeaking(false);
//   }

//   async function selectAnswer(index) {
//     if (!attempt?._id || !currentQuestion?._id) return;
//     if (feedback || submitting) return;

//     try {
//       setSubmitting(true);
//       setSelectedIndex(index);

//       const timeSpentSeconds = Math.max(
//         Math.round((Date.now() - questionStartTime) / 1000),
//         0,
//       );

//       const res = await submitQuizAnswer(attempt._id, {
//         questionId: currentQuestion._id,
//         selectedOptionIndex: index,
//         timeSpentSeconds,
//       });

//       setFeedback(res.data?.data);
//     } catch (err) {
//       setError(
//         err.response?.data?.message || err.message || "Failed to submit answer",
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   function handleNext() {
//     if (currentIndex + 1 >= questions.length) {
//       finishAttempt();
//       return;
//     }

//     setCurrentIndex((prev) => prev + 1);
//   }

//   function getOptionClass(index) {
//     if (!feedback) {
//       if (selectedIndex === index) {
//         return "border-[#0D4598] bg-[#0D4598] text-white";
//       }

//       return "border-slate-200 bg-white text-slate-900 hover:border-[#0D4598] hover:bg-[#f7faff]";
//     }

//     if (index === feedback.correctOptionIndex) {
//       return "border-emerald-500 bg-emerald-500 text-white";
//     }

//     if (index === selectedIndex && !feedback.isCorrect) {
//       return "border-rose-500 bg-rose-500 text-white";
//     }

//     return "border-slate-200 bg-white text-slate-400 opacity-70";
//   }

//   if (!quizId) {
//     return (
//       <CenterMessage type="error">
//         Quiz ID missing. Please go back and select a series.
//       </CenterMessage>
//     );
//   }

//   if (loading) {
//     return <CenterMessage>Starting quiz...</CenterMessage>;
//   }

//   if (error) {
//     return <CenterMessage type="error">{error}</CenterMessage>;
//   }

//   if (!currentQuestion) {
//     return (
//       <CenterMessage>
//         No question found. Admin থেকে আগে question add করুন।
//       </CenterMessage>
//     );
//   }

//   return (
//     <main className="min-h-screen overflow-x-hidden bg-[#f8f8fb] px-3 py-3 md:px-4 lg:px-5">
//       <div ref={panelRef} className="mx-auto w-full max-w-[1320px]">
//         <header className="mb-3 rounded-[16px] border border-slate-200 bg-white p-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
//           <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex min-w-0 items-center gap-2.5">
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-[#f8f8fb] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
//               >
//                 <IoChevronBack size={19} />
//               </button>

//               <div className="min-w-0">
//                 <div className="mb-0.5 flex flex-wrap items-center gap-1 text-[10px] font-semibold text-slate-400">
//                   <span>Student</span>
//                   <span>/</span>
//                   <span>Code Practice</span>
//                   <span>/</span>
//                   <span className="text-slate-600">Challenge</span>
//                 </div>

//                 <h1 className="line-clamp-1 text-lg font-black leading-5 text-slate-900 md:text-xl">
//                   {quiz?.title || "Code Challenge"}
//                 </h1>

//                 <p className="mt-0.5 text-[11px] font-medium leading-4 text-slate-500">
//                   Question {currentIndex + 1} of {questions.length}
//                 </p>
//               </div>
//             </div>

//             <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-[repeat(3,88px)_36px]">
//               <StatBox label="Timer" value={formattedTime} />
//               <StatBox label="Progress" value={`${progress}%`} />
//               <StatBox
//                 label="Answered"
//                 value={`${currentIndex}/${questions.length}`}
//               />

//               <button
//                 type="button"
//                 onClick={handleFullscreen}
//                 className="hidden h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0D4598] transition hover:bg-[#EAF1FB] sm:flex"
//                 title="Fullscreen"
//               >
//                 <FaExpandArrowsAlt size={13} />
//               </button>
//             </div>
//           </div>

//           <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#E8EEF7]">
//             <div
//               className="h-full rounded-full bg-[#0D4598] transition-all duration-300"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//         </header>

//         <section className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_350px]">
//           <div className="rounded-[16px] border border-slate-200 bg-white p-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
//             <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-2.5">
//               <div className="min-w-0">
//                 <p className="text-[10px] font-black uppercase tracking-wide text-[#0D4598]">
//                   Question
//                 </p>

//                 <h2 className="mt-1 text-[15px] font-bold leading-6 text-slate-900">
//                   {currentQuestion.questionText}
//                 </h2>
//               </div>

//               <button
//                 type="button"
//                 onClick={isSpeaking ? stopVoice : speakQuestion}
//                 className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF1FB] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
//                 title="Read question"
//               >
//                 {isSpeaking ? (
//                   <IoVolumeMute size={20} />
//                 ) : (
//                   <IoVolumeHigh size={20} />
//                 )}
//               </button>
//             </div>

//             {currentQuestion.questionImage ? (
//               <div className="mt-3 overflow-hidden rounded-[14px] border border-slate-200 bg-[#f8f8fb]">
//                 <img
//                   src={mediaUrl(currentQuestion.questionImage)}
//                   alt="Question"
//                   className="max-h-[260px] w-full object-contain"
//                 />
//               </div>
//             ) : (
//               <div className="mt-3 rounded-[14px] border border-dashed border-slate-300 bg-[#f8f8fb] p-5 text-center text-xs font-semibold text-slate-500">
//                 No question image available.
//               </div>
//             )}

//             {feedback && (
//               <div
//                 className={`mt-3 rounded-[14px] border p-3 ${
//                   feedback.isCorrect
//                     ? "border-emerald-200 bg-emerald-50 text-emerald-800"
//                     : "border-rose-200 bg-rose-50 text-rose-800"
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   <FaCheckCircle className="text-sm" />

//                   <h3 className="text-xs font-black">
//                     {feedback.isCorrect
//                       ? "Correct answer"
//                       : `Wrong answer. Correct: ${optionLetter(
//                           feedback.correctOptionIndex,
//                         )}`}
//                   </h3>
//                 </div>

//                 {feedback.explanationText && (
//                   <p className="mt-1.5 text-xs font-medium leading-5">
//                     {feedback.explanationText}
//                   </p>
//                 )}

//                 {(feedback.markedAnswerImage || feedback.explanationImage) && (
//                   <div className="mt-2.5 grid grid-cols-1 gap-2 md:grid-cols-2">
//                     {feedback.markedAnswerImage && (
//                       <div>
//                         <p className="mb-1 text-[10px] font-black">
//                           Marked Answer
//                         </p>

//                         <img
//                           src={mediaUrl(feedback.markedAnswerImage)}
//                           alt="Marked answer"
//                           className="max-h-36 w-full rounded-xl border border-white bg-white object-contain"
//                         />
//                       </div>
//                     )}

//                     {feedback.explanationImage && (
//                       <div>
//                         <p className="mb-1 text-[10px] font-black">
//                           Explanation
//                         </p>

//                         <img
//                           src={mediaUrl(feedback.explanationImage)}
//                           alt="Explanation"
//                           className="max-h-36 w-full rounded-xl border border-white bg-white object-contain"
//                         />
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           <aside className="rounded-[16px] border border-slate-200 bg-white p-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)] lg:max-h-[calc(100vh-105px)] lg:overflow-y-auto">
//             <div className="mb-2.5 flex items-center justify-between gap-2">
//               <h3 className="text-sm font-black text-slate-900">
//                 Choose Answer
//               </h3>

//               <div className="flex items-center gap-1 rounded-lg bg-[#EAF1FB] px-2 py-1 text-[11px] font-black text-[#0D4598]">
//                 <TbClockHour4 size={14} />
//                 {formattedTime}
//               </div>
//             </div>

//             <div className="space-y-1.5">
//               {currentQuestion.options?.map((option, index) => (
//                 <button
//                   key={index}
//                   type="button"
//                   disabled={Boolean(feedback) || submitting}
//                   onClick={() => selectAnswer(index)}
//                   className={`w-full rounded-xl border px-2.5 py-2 text-left text-xs font-semibold transition disabled:cursor-not-allowed ${getOptionClass(
//                     index,
//                   )}`}
//                 >
//                   <div className="flex items-start gap-2">
//                     <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-black/10 text-[10px] font-black">
//                       {optionLetter(index)}
//                     </span>

//                     <div className="min-w-0 flex-1">
//                       <p className="leading-5">{option.text}</p>

//                       {option.image && (
//                         <img
//                           src={mediaUrl(option.image)}
//                           alt={`Option ${optionLetter(index)}`}
//                           className="mt-1.5 max-h-16 w-full rounded-lg border border-white/70 object-contain"
//                         />
//                       )}
//                     </div>
//                   </div>
//                 </button>
//               ))}
//             </div>

//             <div className="mt-2.5 rounded-xl bg-[#f8f8fb] p-2.5 text-[11px] font-semibold leading-5 text-slate-500">
//               {feedback
//                 ? "Answer submitted. Review the feedback and continue."
//                 : submitting
//                   ? "Submitting your answer..."
//                   : "Click an option to submit your answer."}
//             </div>

//             {feedback && (
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0D4598] px-3 py-2.5 text-xs font-black text-white transition hover:bg-[#083777]"
//               >
//                 {currentIndex + 1 >= questions.length
//                   ? "FINISH QUIZ"
//                   : "NEXT QUESTION"}
//                 <FaArrowRight size={11} />
//               </button>
//             )}
//           </aside>
//         </section>
//       </div>
//     </main>
//   );
// }

// export default function CodeChallengePage() {
//   return (
//     <Suspense fallback={<CenterMessage>Loading...</CenterMessage>}>
//       <CodeChallengeContent />
//     </Suspense>
//   );
// }

"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  IoAlertCircleOutline,
  IoChevronBack,
  IoVolumeHigh,
  IoVolumeMute,
} from "react-icons/io5";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { TbClockHour4 } from "react-icons/tb";
import {
  finishQuizAttempt,
  startQuizAttempt,
  submitQuizAnswer,
} from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const optionLetter = (index) => String.fromCharCode(65 + index);

function StatBox({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-[#f8f8fb] px-2.5 py-2">
      <p className="text-[9px] font-bold uppercase leading-none text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-black leading-none text-slate-900">
        {value}
      </p>
    </div>
  );
}

function CenterMessage({ type = "info", children }) {
  const toneClass =
    type === "error"
      ? "border-rose-200 bg-rose-50 text-rose-700"
      : "border-slate-200 bg-white text-[#0D4598]";

  return (
    <div className="min-h-screen bg-[#f8f8fb] px-3 py-3 md:px-4 lg:px-5">
      <div
        className={`mx-auto flex max-w-xl items-center justify-center gap-2 rounded-[16px] border px-4 py-4 text-center text-xs font-bold shadow-[0_8px_22px_rgba(15,23,42,0.04)] ${toneClass}`}
      >
        {type === "error" && <IoAlertCircleOutline size={18} />}
        {children}
      </div>
    </div>
  );
}

function CodeChallengeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quizId");

  const panelRef = useRef(null);
  const hasStarted = useRef(false);
  const hasFinished = useRef(false);

  const [quiz, setQuiz] = useState(null);
  const [attempt, setAttempt] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const currentQuestion = questions[currentIndex];

  const progress = questions.length
    ? Math.round(((currentIndex + 1) / questions.length) * 100)
    : 0;

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");

    const seconds = Math.floor(timeLeft % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  }, [timeLeft]);

  const startQuiz = useCallback(async () => {
    if (!quizId || hasStarted.current) return;

    try {
      hasStarted.current = true;
      setLoading(true);
      setError("");

      const res = await startQuizAttempt(quizId);
      const data = res.data?.data;

      const serverQuestions = data?.questions || [];
      const serverAnsweredIds = data?.answeredQuestionIds || [];
      const serverSelectedAnswers = data?.selectedAnswers || {};
      const serverResumeIndex = Number(data?.resumeIndex || 0);

      setQuiz(data?.quiz || null);
      setAttempt(data?.attempt || null);
      setQuestions(serverQuestions);
      setAnsweredQuestionIds(serverAnsweredIds);
      setSelectedAnswers(serverSelectedAnswers);

      setCurrentIndex(
        serverQuestions.length
          ? Math.min(serverResumeIndex, serverQuestions.length - 1)
          : 0,
      );

      setTimeLeft(
        Number(data?.remainingSeconds) ||
          (data?.quiz?.durationMinutes || 30) * 60,
      );

      setQuestionStartTime(Date.now());
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to start quiz";

      setError(message);
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  useEffect(() => {
    startQuiz();
  }, [startQuiz]);

  const finishAttempt = useCallback(async () => {
    if (!attempt?._id || hasFinished.current) return;

    try {
      hasFinished.current = true;

      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }

      const res = await finishQuizAttempt(attempt._id);
      const finishedAttempt = res.data?.data;

      router.push(
        `/student/code/my-history?latest=${finishedAttempt?._id || ""}`,
      );
    } catch (err) {
      hasFinished.current = false;

      setError(
        err.response?.data?.message || err.message || "Failed to finish quiz",
      );
    }
  }, [attempt?._id, router]);

  useEffect(() => {
    if (!attempt?._id || hasFinished.current || loading) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishAttempt();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [attempt?._id, finishAttempt, loading]);

  useEffect(() => {
    const currentQuestionId = questions[currentIndex]?._id;

    const savedSelectedIndex =
      currentQuestionId && selectedAnswers[currentQuestionId] !== undefined
        ? Number(selectedAnswers[currentQuestionId])
        : null;

    setSelectedIndex(
      Number.isFinite(savedSelectedIndex) ? savedSelectedIndex : null,
    );

    setAnswerSubmitted(
      currentQuestionId
        ? answeredQuestionIds.includes(currentQuestionId)
        : false,
    );

    setQuestionStartTime(Date.now());

    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [currentIndex, questions, answeredQuestionIds, selectedAnswers]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function handleBack() {
    router.back();
  }

  function handleFullscreen() {
    if (!panelRef.current) return;

    if (!document.fullscreenElement) {
      panelRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  function speakQuestion() {
    if (!currentQuestion || typeof window === "undefined") return;
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const text = currentQuestion.voiceText || currentQuestion.questionText;
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "fr-FR";
    utterance.rate = 0.9;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  function stopVoice() {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    setIsSpeaking(false);
  }

  async function selectAnswer(index) {
    if (!attempt?._id || !currentQuestion?._id) return;
    if (answerSubmitted || submitting) return;

    try {
      setSubmitting(true);
      setSelectedIndex(index);

      const timeSpentSeconds = Math.max(
        Math.round((Date.now() - questionStartTime) / 1000),
        0,
      );

      const res = await submitQuizAnswer(attempt._id, {
        questionId: currentQuestion._id,
        selectedOptionIndex: index,
        timeSpentSeconds,
      });

      const responseData = res.data?.data || {};

      const finalSelectedIndex =
        responseData.selectedOptionIndex !== undefined
          ? Number(responseData.selectedOptionIndex)
          : index;

      setAnsweredQuestionIds((prev) => {
        if (prev.includes(currentQuestion._id)) return prev;
        return [...prev, currentQuestion._id];
      });

      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQuestion._id]: finalSelectedIndex,
      }));

      setSelectedIndex(finalSelectedIndex);
      setAnswerSubmitted(true);

      if (responseData.remainingSeconds !== undefined) {
        setTimeLeft(Number(responseData.remainingSeconds) || 0);
      }
    } catch (err) {
      setSelectedIndex(null);

      setError(
        err.response?.data?.message || err.message || "Failed to submit answer",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleNext() {
    const answeredSet = new Set(answeredQuestionIds);

    if (currentQuestion?._id && answerSubmitted) {
      answeredSet.add(currentQuestion._id);
    }

    const nextIndex = questions.findIndex((question, index) => {
      return index > currentIndex && !answeredSet.has(question._id);
    });

    if (nextIndex === -1) {
      finishAttempt();
      return;
    }

    setCurrentIndex(nextIndex);
  }

  function getOptionClass(index) {
    if (selectedIndex === index) {
      return "border-[#0D4598] bg-[#0D4598] text-white";
    }

    if (answerSubmitted) {
      return "border-slate-200 bg-white text-slate-400 opacity-70";
    }

    return "border-slate-200 bg-white text-slate-900 hover:border-[#0D4598] hover:bg-[#f7faff]";
  }

  if (!quizId) {
    return (
      <CenterMessage type="error">
        Quiz ID missing. Please go back and select a series.
      </CenterMessage>
    );
  }

  if (loading) {
    return <CenterMessage>Starting quiz...</CenterMessage>;
  }

  if (error) {
    return <CenterMessage type="error">{error}</CenterMessage>;
  }

  if (!currentQuestion) {
    return (
      <CenterMessage>
        No question found. Admin থেকে আগে question add করুন।
      </CenterMessage>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8f8fb] px-3 py-3 md:px-4 lg:px-5">
      <div ref={panelRef} className="mx-auto w-full max-w-[1320px]">
        <header className="mb-3 rounded-[16px] border border-slate-200 bg-white p-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-2.5">
              <button
                type="button"
                onClick={handleBack}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-[#f8f8fb] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
              >
                <IoChevronBack size={19} />
              </button>

              <div className="min-w-0">
                <div className="mb-0.5 flex flex-wrap items-center gap-1 text-[10px] font-semibold text-slate-400">
                  <span>Student</span>
                  <span>/</span>
                  <span>Code Practice</span>
                  <span>/</span>
                  <span className="text-slate-600">Challenge</span>
                </div>

                <h1 className="line-clamp-1 text-lg font-black leading-5 text-slate-900 md:text-xl">
                  {quiz?.title || "Code Challenge"}
                </h1>

                <p className="mt-0.5 text-[11px] font-medium leading-4 text-slate-500">
                  Question {currentIndex + 1} of {questions.length}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-[repeat(3,88px)_36px]">
              <StatBox label="Timer" value={formattedTime} />
              <StatBox label="Progress" value={`${progress}%`} />
              <StatBox
                label="Answered"
                value={`${answeredQuestionIds.length}/${questions.length}`}
              />

              <button
                type="button"
                onClick={handleFullscreen}
                className="hidden h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0D4598] transition hover:bg-[#EAF1FB] sm:flex"
                title="Fullscreen"
              >
                <FaExpandArrowsAlt size={13} />
              </button>
            </div>
          </div>

          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#E8EEF7]">
            <div
              className="h-full rounded-full bg-[#0D4598] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </header>

        <section className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_350px]">
          <div className="rounded-[16px] border border-slate-200 bg-white p-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-2.5">
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-wide text-[#0D4598]">
                  Question
                </p>

                <h2 className="mt-1 text-[15px] font-bold leading-6 text-slate-900">
                  {currentQuestion.questionText}
                </h2>
              </div>

              <button
                type="button"
                onClick={isSpeaking ? stopVoice : speakQuestion}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF1FB] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
                title="Read question"
              >
                {isSpeaking ? (
                  <IoVolumeMute size={20} />
                ) : (
                  <IoVolumeHigh size={20} />
                )}
              </button>
            </div>

            {currentQuestion.questionImage ? (
              <div className="mt-3 overflow-hidden rounded-[14px] border border-slate-200 bg-[#f8f8fb]">
                <img
                  src={mediaUrl(currentQuestion.questionImage)}
                  alt="Question"
                  className="max-h-[260px] w-full object-contain"
                />
              </div>
            ) : (
              <div className="mt-3 rounded-[14px] border border-dashed border-slate-300 bg-[#f8f8fb] p-5 text-center text-xs font-semibold text-slate-500">
                No question image available.
              </div>
            )}

            {answerSubmitted && (
              <div className="mt-3 rounded-[14px] border border-[#DDE6F3] bg-[#F7F9FC] p-3 text-xs font-semibold text-[#0D4598]">
                Answer saved successfully. This selected answer is locked and
                cannot be changed.
              </div>
            )}
          </div>

          <aside className="rounded-[16px] border border-slate-200 bg-white p-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)] lg:max-h-[calc(100vh-105px)] lg:overflow-y-auto">
            <div className="mb-2.5 flex items-center justify-between gap-2">
              <h3 className="text-sm font-black text-slate-900">
                Choose Answer
              </h3>

              <div className="flex items-center gap-1 rounded-lg bg-[#EAF1FB] px-2 py-1 text-[11px] font-black text-[#0D4598]">
                <TbClockHour4 size={14} />
                {formattedTime}
              </div>
            </div>

            <div className="space-y-1.5">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  disabled={answerSubmitted || submitting}
                  onClick={() => selectAnswer(index)}
                  className={`w-full rounded-xl border px-2.5 py-2 text-left text-xs font-semibold transition disabled:cursor-not-allowed ${getOptionClass(
                    index,
                  )}`}
                >
                  <div className="flex items-start gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-black/10 text-[10px] font-black">
                      {optionLetter(index)}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="leading-5">{option.text}</p>

                      {option.image && (
                        <img
                          src={mediaUrl(option.image)}
                          alt={`Option ${optionLetter(index)}`}
                          className="mt-1.5 max-h-16 w-full rounded-lg border border-white/70 object-contain"
                        />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-2.5 rounded-xl bg-[#f8f8fb] p-2.5 text-[11px] font-semibold leading-5 text-slate-500">
              {answerSubmitted
                ? "Answer already saved. Continue to the next question."
                : submitting
                  ? "Submitting your answer..."
                  : "Click an option to submit and lock your answer."}
            </div>

            {answerSubmitted && (
              <button
                type="button"
                onClick={handleNext}
                className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0D4598] px-3 py-2.5 text-xs font-black text-white transition hover:bg-[#083777]"
              >
                {currentIndex + 1 >= questions.length
                  ? "FINISH QUIZ"
                  : "NEXT QUESTION"}
                <FaArrowRight size={11} />
              </button>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}

export default function CodeChallengePage() {
  return (
    <Suspense fallback={<CenterMessage>Loading...</CenterMessage>}>
      <CodeChallengeContent />
    </Suspense>
  );
}
