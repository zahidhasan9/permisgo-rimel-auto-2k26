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
// import { FaExpandArrowsAlt } from "react-icons/fa";
// import { IoChevronBack, IoVolumeHigh, IoVolumeMute } from "react-icons/io5";
// import { TbClockHour4 } from "react-icons/tb";

// import {
//   finishQuizAttempt,
//   startQuizAttempt,
//   submitQuizAnswer,
// } from "@/features/API";
// import { mediaUrl } from "@/utils/mediaUrl";

// const letter = (index) => String.fromCharCode(65 + index);
// const youtubeEmbed = (value) => {
//   try {
//     const url = new URL(value);
//     const id = url.hostname.includes("youtu.be")
//       ? url.pathname.split("/")[1]
//       : url.searchParams.get("v") ||
//         url.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1];
//     return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0` : "";
//   } catch {
//     return "";
//   }
// };

// function Message({ error = false, children }) {
//   return (
//     <main className="min-h-screen bg-white p-6">
//       <div
//         className={`mx-auto max-w-xl rounded-2xl border p-5 text-center text-sm font-bold ${
//           error
//             ? "border-red-200 bg-red-50 text-red-700"
//             : "border-slate-200 text-[#123f88]"
//         }`}
//       >
//         {children}
//       </div>
//     </main>
//   );
// }

// function QuizContent() {
//   const router = useRouter();
//   const quizId = useSearchParams().get("quizId");
//   const panelRef = useRef(null);
//   const startedRef = useRef(false);
//   const finishedRef = useRef(false);
//   const [quiz, setQuiz] = useState(null);
//   const [attempt, setAttempt] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedIndex, setSelectedIndex] = useState(null);
//   const [selectedIndexes, setSelectedIndexes] = useState([]);
//   const [answeredIds, setAnsweredIds] = useState([]);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [feedbackByQuestion, setFeedbackByQuestion] = useState({});
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [questionStartedAt, setQuestionStartedAt] = useState(Date.now());
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [speaking, setSpeaking] = useState(false);

//   const question = questions[currentIndex];
//   const feedback = question ? feedbackByQuestion[question._id] : null;
//   const answered =
//     Boolean(feedback) ||
//     Boolean(question && answeredIds.includes(question._id));
//   const formattedTime = useMemo(
//     () =>
//       `${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(timeLeft % 60).padStart(2, "0")}`,
//     [timeLeft],
//   );

//   const start = useCallback(async () => {
//     if (!quizId || startedRef.current) return;
//     startedRef.current = true;
//     try {
//       const response = await startQuizAttempt(quizId);
//       const data = response.data?.data || {};
//       const list = data.questions || [];
//       setQuiz(data.quiz || null);
//       setAttempt(data.attempt || null);
//       setQuestions(list);
//       setAnsweredIds(data.answeredQuestionIds || []);
//       setSelectedAnswers(data.selectedAnswers || {});
//       setCurrentIndex(
//         list.length
//           ? Math.min(Number(data.resumeIndex || 0), list.length - 1)
//           : 0,
//       );
//       setTimeLeft(
//         Number(data.remainingSeconds) ||
//           Number(data.quiz?.durationMinutes || 30) * 60,
//       );
//     } catch (requestError) {
//       setError(
//         requestError.response?.data?.message ||
//           requestError.message ||
//           "Quiz could not be started.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, [quizId]);

//   useEffect(() => {
//     start();
//   }, [start]);

//   const finish = useCallback(async () => {
//     if (!attempt?._id || finishedRef.current) return;
//     finishedRef.current = true;
//     try {
//       window.speechSynthesis?.cancel();
//       const response = await finishQuizAttempt(attempt._id);
//       router.push(
//         `/student/code/results?attemptId=${response.data?.data?._id || attempt._id}`,
//       );
//     } catch (requestError) {
//       finishedRef.current = false;
//       setError(
//         requestError.response?.data?.message ||
//           requestError.message ||
//           "Quiz could not be finished.",
//       );
//     }
//   }, [attempt?._id, router]);

//   useEffect(() => {
//     if (!attempt?._id || loading || finishedRef.current) return undefined;
//     const timer = window.setInterval(() => {
//       setTimeLeft((value) => {
//         if (value <= 1) {
//           window.clearInterval(timer);
//           finish();
//           return 0;
//         }
//         return value - 1;
//       });
//     }, 1000);
//     return () => window.clearInterval(timer);
//   }, [attempt?._id, finish, loading]);

//   useEffect(() => {
//     const id = questions[currentIndex]?._id;
//     const saved = id !== undefined ? selectedAnswers[id] : undefined;
//     const savedIndexes = Array.isArray(saved)
//       ? saved.map(Number)
//       : saved !== undefined
//         ? [Number(saved)]
//         : [];
//     setSelectedIndexes(savedIndexes);
//     setSelectedIndex(savedIndexes[0] ?? null);
//     setQuestionStartedAt(Date.now());
//     window.speechSynthesis?.cancel();
//     setSpeaking(false);
//   }, [currentIndex, questions, selectedAnswers]);

//   useEffect(() => () => window.speechSynthesis?.cancel(), []);

//   const speak = () => {
//     if (!question || !window.speechSynthesis) return;
//     if (speaking) {
//       window.speechSynthesis.cancel();
//       setSpeaking(false);
//       return;
//     }
//     const utterance = new SpeechSynthesisUtterance(
//       question.voiceText ||
//         [question.questionText, question.secondaryQuestionText]
//           .filter(Boolean)
//           .join(". "),
//     );
//     utterance.lang = "fr-FR";
//     utterance.onend = () => setSpeaking(false);
//     utterance.onerror = () => setSpeaking(false);
//     setSpeaking(true);
//     window.speechSynthesis.speak(utterance);
//   };

//   const validate = async () => {
//     if (!selectedIndexes.length || answered || submitting || !question?._id)
//       return;
//     setSubmitting(true);
//     try {
//       const response = await submitQuizAnswer(attempt._id, {
//         questionId: question._id,
//         selectedOptionIndex: selectedIndex,
//         selectedOptionIndexes: selectedIndexes,
//         timeSpentSeconds: Math.max(
//           Math.round((Date.now() - questionStartedAt) / 1000),
//           0,
//         ),
//       });
//       const result = response.data?.data || {};
//       const finalIndex = Number(result.selectedOptionIndex ?? selectedIndex);
//       const finalIndexes = result.selectedOptionIndexes?.length
//         ? result.selectedOptionIndexes.map(Number)
//         : [finalIndex];
//       setSelectedIndex(finalIndex);
//       setSelectedIndexes(finalIndexes);
//       setSelectedAnswers((old) => ({
//         ...old,
//         [question._id]: finalIndexes.length > 1 ? finalIndexes : finalIndex,
//       }));
//       setAnsweredIds((old) =>
//         old.includes(question._id) ? old : [...old, question._id],
//       );
//       setFeedbackByQuestion((old) => ({ ...old, [question._id]: result }));
//     } catch (requestError) {
//       setError(
//         requestError.response?.data?.message ||
//           requestError.message ||
//           "Answer could not be checked.",
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const next = () => {
//     const nextIndex = questions.findIndex(
//       (item, index) => index > currentIndex && !answeredIds.includes(item._id),
//     );
//     if (nextIndex < 0) finish();
//     else setCurrentIndex(nextIndex);
//   };

//   const optionClass = (index) => {
//     if (feedback) {
//       if (
//         (feedback.correctOptionIndexes || [feedback.correctOptionIndex])
//           .map(Number)
//           .includes(index)
//       )
//         return "bg-[#21c33b] text-white border-[#21c33b]";
//       if (
//         selectedIndexes.includes(index) &&
//         !(feedback.correctOptionIndexes || [feedback.correctOptionIndex])
//           .map(Number)
//           .includes(index)
//       )
//         return "bg-[#e52a39] text-white border-[#e52a39]";
//       return "bg-white text-slate-800 border-white";
//     }
//     return selectedIndexes.includes(index)
//       ? "bg-[#123f88] text-white border-[#123f88]"
//       : "bg-white text-slate-800 border-white hover:border-[#123f88]";
//   };

//   if (!quizId)
//     return (
//       <Message error>Quiz ID missing. Please select a quiz series.</Message>
//     );
//   if (loading) return <Message>Starting quiz...</Message>;
//   if (error) return <Message error>{error}</Message>;
//   if (!question) return <Message>No active question found.</Message>;

//   const feedbackImage =
//     !feedback?.isCorrect &&
//     (feedback?.markedAnswerImage || feedback?.explanationImage);
//   const image = feedbackImage || question.questionImage;
//   const videoEmbedUrl = !feedbackImage
//     ? youtubeEmbed(question.questionVideoUrl)
//     : "";
//   const hasTwoPrompts = Number(question.promptCount) === 2;
//   const answerGroups = hasTwoPrompts
//     ? [
//         { label: "Question 1", indexes: [0, 1] },
//         { label: "Question 2", indexes: [2, 3] },
//       ]
//     : [{ label: "", indexes: [0, 1, 2, 3] }];
//   const correctPromptCount = hasTwoPrompts
//     ? (feedback?.groupResults || []).filter((result) => result.isCorrect).length
//     : feedback?.isCorrect
//       ? 1
//       : 0;

//   const selectOption = (index) => {
//     if (question.answerMode === "multiple") {
//       setSelectedIndexes((current) => {
//         const promptGroup = hasTwoPrompts
//           ? index < 2
//             ? [0, 1]
//             : [2, 3]
//           : null;
//         let next;
//         if (promptGroup)
//           next = [
//             ...current.filter((value) => !promptGroup.includes(value)),
//             index,
//           ].sort();
//         else
//           next = current.includes(index)
//             ? current.filter((value) => value !== index)
//             : [...current, index].sort();
//         setSelectedIndex(next[0] ?? null);
//         return next;
//       });
//     } else {
//       setSelectedIndex(index);
//       setSelectedIndexes([index]);
//     }
//   };

//   return (
//     <main className="min-h-screen overflow-x-hidden bg-white px-1.5 py-1.5 text-[#171717] sm:px-6 sm:py-6">
//       <div ref={panelRef} className="mx-auto w-full max-w-[1084px] bg-white">
//         <header className="mb-2 flex items-center gap-2 sm:mb-8 sm:gap-4">
//           <button
//             type="button"
//             onClick={() => router.back()}
//             className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#e8edf5] text-black sm:h-11 sm:w-11 sm:rounded-xl"
//           >
//             <IoChevronBack size={17} />
//           </button>
//           <h1 className="min-w-0 truncate text-[14px] font-semibold leading-none tracking-[-0.02em] text-[#173f87] sm:text-[25px]">
//             {quiz?.title || "Code Challenge"}
//           </h1>
//         </header>

//         <section className="rounded-lg bg-[#e8eef7] p-2 sm:min-h-[760px] sm:rounded-xl sm:p-6">
//           <div className="mb-2 flex items-center justify-between gap-2 text-[#123f88] sm:mb-[30px] sm:h-[30px] sm:gap-4">
//             <p className="text-[11px] font-bold leading-none sm:text-[16px]">
//               Question {currentIndex + 1}/{questions.length}
//             </p>
//             <div className="flex items-center gap-3 sm:gap-4">
//               <button
//                 type="button"
//                 onClick={() =>
//                   !document.fullscreenElement
//                     ? panelRef.current?.requestFullscreen?.()
//                     : document.exitFullscreen?.()
//                 }
//                 title="Fullscreen"
//                 className="shrink-0"
//               >
//                 <FaExpandArrowsAlt className="h-3.5 w-3.5 sm:h-6 sm:w-6" />
//               </button>
//               <button
//                 type="button"
//                 onClick={speak}
//                 title="Read question"
//                 className="shrink-0"
//               >
//                 {speaking ? (
//                   <IoVolumeMute className="h-4 w-4 sm:h-[29px] sm:w-[29px]" />
//                 ) : (
//                   <IoVolumeHigh className="h-4 w-4 sm:h-[29px] sm:w-[29px]" />
//                 )}
//               </button>
//             </div>
//           </div>

//           <div className="overflow-hidden rounded-xl bg-white">
//             {videoEmbedUrl ? (
//               <iframe
//                 src={videoEmbedUrl}
//                 title="Question video"
//                 className="aspect-video max-h-[180px] w-full sm:max-h-none"
//                 allow="encrypted-media; picture-in-picture"
//                 allowFullScreen
//               />
//             ) : question.questionVideoUrl && !feedbackImage ? (
//               <video
//                 src={question.questionVideoUrl}
//                 controls
//                 className="max-h-[180px] w-full bg-black sm:max-h-[439px]"
//               />
//             ) : image ? (
//               <img
//                 src={mediaUrl(image)}
//                 alt="Question"
//                 className="h-[170px] w-full object-cover sm:h-[439px]"
//               />
//             ) : (
//               <div className="flex h-[90px] items-center justify-center px-4 text-center text-[10px] text-slate-500 sm:h-[439px] sm:text-base">
//                 No question media available
//               </div>
//             )}
//           </div>

//           <div className="mt-2 grid gap-3 sm:mt-[32px] sm:gap-7 lg:grid-cols-[559px_1fr]">
//             <div>
//               {(Number(question.promptCount) === 2
//                 ? [
//                     { text: question.questionText, start: 0, end: 2 },
//                     { text: question.secondaryQuestionText, start: 2, end: 4 },
//                   ]
//                 : [{ text: question.questionText, start: 0, end: 4 }]
//               ).map((prompt, promptIndex) => (
//                 <div
//                   key={promptIndex}
//                   className={
//                     promptIndex
//                       ? "mt-1.5 border-t border-slate-300 pt-1.5 sm:mt-7 sm:pt-6"
//                       : ""
//                   }
//                 >
//                   <h2 className="mb-2 text-[12px] font-bold leading-[15px] sm:mb-[13px] sm:text-[16px] sm:leading-5">
//                     {Number(question.promptCount) === 2
//                       ? `${promptIndex + 1}. `
//                       : ""}
//                     {prompt.text}
//                   </h2>
//                   <div className="space-y-1.5 text-[11px] leading-[14px] text-[#123f88] sm:space-y-[13px] sm:text-[16px] sm:leading-5">
//                     {question.options
//                       ?.slice(prompt.start, prompt.end)
//                       .map((option, localIndex) => {
//                         const index = prompt.start + localIndex;
//                         return (
//                           <div
//                             key={index}
//                             className="flex min-w-0 items-center gap-2 rounded-md bg-white/70 px-2 py-1 sm:gap-3 sm:bg-transparent sm:px-0 sm:py-0 sm:pr-5"
//                           >
//                             <p className="min-w-0 flex-1 break-words">
//                               <span className="hidden sm:inline">â€“ </span>
//                               {option.text}
//                             </p>
//                             <span className="mb-[-4px] hidden min-w-8 flex-1 border-b-2 border-dashed border-[#252525] sm:block" />
//                             <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e8eef7] text-[9px] font-bold text-[#123f88] sm:block sm:h-auto sm:min-w-8 sm:bg-transparent sm:text-left sm:text-[16px] sm:font-medium sm:text-slate-900">
//                               {letter(index)}
//                             </span>
//                           </div>
//                         );
//                       })}
//                   </div>
//                 </div>
//               ))}
//               {feedback?.explanationText && (
//                 <p className="mt-4 rounded-lg bg-white/70 p-3 text-sm font-semibold text-[#123f88]">
//                   {feedback.explanationText}
//                 </p>
//               )}
//             </div>

//             <div className="flex flex-col justify-end">
//               {!feedback ? (
//                 <div className="mb-2 flex items-center justify-between gap-2 sm:mb-5 sm:block">
//                   <p className="text-[11px] font-bold sm:mb-2 sm:text-base">
//                     {hasTwoPrompts ? "Select two answers" : "Select an answer"}
//                   </p>
//                   <div className="flex items-center gap-1 text-[#123f88] sm:gap-3">
//                     <TbClockHour4 className="h-4 w-4 shrink-0 sm:h-[54px] sm:w-[54px]" />
//                     <span className="text-[10px] font-black sm:text-lg">
//                       {formattedTime}
//                     </span>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="mb-3 flex h-[36px] w-fit overflow-hidden rounded-lg bg-white text-[13px] font-medium sm:mb-[50px] sm:h-[43px] sm:text-[16px]">
//                   <span className="flex items-center px-3">
//                     Score {correctPromptCount}/{hasTwoPrompts ? 2 : 1}
//                   </span>
//                   <span
//                     className={`flex items-center px-3 text-white ${
//                       feedback.isCorrect ? "bg-[#20c23b]" : "bg-[#e62a3a]"
//                     }`}
//                   >
//                     {feedback.isCorrect ? "Correct answer" : "Wrong answer"}
//                   </span>
//                 </div>
//               )}

//               <div className="space-y-1.5 sm:space-y-3">
//                 <div
//                   className={
//                     hasTwoPrompts
//                       ? "grid grid-cols-2 gap-2 sm:gap-3"
//                       : "grid grid-cols-2 gap-2 sm:grid-cols-4 sm:flex sm:flex-wrap sm:items-center sm:gap-4"
//                   }
//                 >
//                   {answerGroups.map((group) => (
//                     <div
//                       key={group.label || "answer"}
//                       className={
//                         hasTwoPrompts
//                           ? "rounded-md bg-white/55 p-1.5 sm:rounded-xl sm:p-3"
//                           : "contents"
//                       }
//                     >
//                       {group.label && (
//                         <p className="mb-1 text-[9px] font-bold uppercase tracking-wide text-[#123f88] sm:mb-2 sm:text-xs">
//                           {group.label}
//                         </p>
//                       )}
//                       <div
//                         className={
//                           hasTwoPrompts
//                             ? "flex items-center gap-1.5 sm:gap-3"
//                             : "grid grid-cols-2 gap-2 sm:contents"
//                         }
//                       >
//                         {group.indexes.map((index) => (
//                           <button
//                             key={index}
//                             type="button"
//                             disabled={answered || submitting}
//                             onClick={() => selectOption(index)}
//                             className={`h-8 min-w-0 rounded-md border px-2 text-[10px] font-bold transition sm:h-[42px] sm:w-auto sm:min-w-[65px] sm:rounded-lg sm:border-2 sm:px-4 sm:text-[16px] sm:font-medium ${optionClass(index)}`}
//                           >
//                             {letter(index)}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {!feedback ? (
//                   <button
//                     type="button"
//                     disabled={
//                       !selectedIndexes.length ||
//                       (hasTwoPrompts && selectedIndexes.length !== 2) ||
//                       submitting
//                     }
//                     onClick={validate}
//                     className="h-9 w-full rounded-md bg-[#20c23b] px-4 text-[10px] font-bold uppercase text-white disabled:cursor-not-allowed disabled:opacity-50 sm:h-[42px] sm:w-auto sm:rounded-lg sm:px-6 sm:text-xs"
//                   >
//                     {submitting ? "Checking..." : "To validate"}
//                   </button>
//                 ) : (
//                   <button
//                     type="button"
//                     onClick={next}
//                     className="h-9 w-full rounded-lg border border-[#123f88] bg-white px-4 text-[10px] font-bold text-[#123f88] sm:h-[48px] sm:w-auto sm:rounded-xl sm:border-2 sm:px-[18px] sm:text-[16px]"
//                   >
//                     {currentIndex + 1 >= questions.length
//                       ? "Finish"
//                       : "Following"}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

// export default function CodeChallengePage() {
//   return (
//     <Suspense fallback={<Message>Loading...</Message>}>
//       <QuizContent />
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
import { FaExpandArrowsAlt } from "react-icons/fa";
import { IoChevronBack, IoVolumeHigh, IoVolumeMute } from "react-icons/io5";
import { TbClockHour4 } from "react-icons/tb";

import {
  finishQuizAttempt,
  startQuizAttempt,
  submitQuizAnswer,
} from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const letter = (index) => String.fromCharCode(65 + index);
const youtubeEmbed = (value) => {
  try {
    const url = new URL(value);
    const id = url.hostname.includes("youtu.be")
      ? url.pathname.split("/")[1]
      : url.searchParams.get("v") ||
        url.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1];
    return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0` : "";
  } catch {
    return "";
  }
};

function Message({ error = false, children }) {
  return (
    <main className="min-h-screen bg-white p-6">
      <div
        className={`mx-auto max-w-xl rounded-2xl border p-5 text-center text-sm font-bold ${error ? "border-red-200 bg-red-50 text-red-700" : "border-slate-200 text-[#123f88]"}`}
      >
        {children}
      </div>
    </main>
  );
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
  const [selectedIndexes, setSelectedIndexes] = useState([]);
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
  const answered =
    Boolean(feedback) ||
    Boolean(question && answeredIds.includes(question._id));
  const formattedTime = useMemo(
    () =>
      `${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(timeLeft % 60).padStart(2, "0")}`,
    [timeLeft],
  );

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
      setCurrentIndex(
        list.length
          ? Math.min(Number(data.resumeIndex || 0), list.length - 1)
          : 0,
      );
      setTimeLeft(
        Number(data.remainingSeconds) ||
          Number(data.quiz?.durationMinutes || 30) * 60,
      );
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Quiz could not be started.",
      );
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  useEffect(() => {
    start();
  }, [start]);

  const finish = useCallback(async () => {
    if (!attempt?._id || finishedRef.current) return;
    finishedRef.current = true;
    try {
      window.speechSynthesis?.cancel();
      const response = await finishQuizAttempt(attempt._id);
      router.push(
        `/student/code/results?attemptId=${response.data?.data?._id || attempt._id}`,
      );
    } catch (requestError) {
      finishedRef.current = false;
      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Quiz could not be finished.",
      );
    }
  }, [attempt?._id, router]);

  useEffect(() => {
    if (!attempt?._id || loading || finishedRef.current) return undefined;
    const timer = window.setInterval(
      () =>
        setTimeLeft((value) => {
          if (value <= 1) {
            window.clearInterval(timer);
            finish();
            return 0;
          }
          return value - 1;
        }),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [attempt?._id, finish, loading]);

  useEffect(() => {
    const id = questions[currentIndex]?._id;
    const saved = id !== undefined ? selectedAnswers[id] : undefined;
    const savedIndexes = Array.isArray(saved)
      ? saved.map(Number)
      : saved !== undefined
        ? [Number(saved)]
        : [];
    setSelectedIndexes(savedIndexes);
    setSelectedIndex(savedIndexes[0] ?? null);
    setQuestionStartedAt(Date.now());
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, [currentIndex, questions, selectedAnswers]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const speak = () => {
    if (!question || !window.speechSynthesis) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(
      question.voiceText ||
        [question.questionText, question.secondaryQuestionText]
          .filter(Boolean)
          .join(". "),
    );
    utterance.lang = "fr-FR";
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const validate = async () => {
    if (!selectedIndexes.length || answered || submitting || !question?._id)
      return;
    setSubmitting(true);
    try {
      const response = await submitQuizAnswer(attempt._id, {
        questionId: question._id,
        selectedOptionIndex: selectedIndex,
        selectedOptionIndexes: selectedIndexes,
        timeSpentSeconds: Math.max(
          Math.round((Date.now() - questionStartedAt) / 1000),
          0,
        ),
      });
      const result = response.data?.data || {};
      const finalIndex = Number(result.selectedOptionIndex ?? selectedIndex);
      const finalIndexes = result.selectedOptionIndexes?.length
        ? result.selectedOptionIndexes.map(Number)
        : [finalIndex];
      setSelectedIndex(finalIndex);
      setSelectedIndexes(finalIndexes);
      setSelectedAnswers((old) => ({
        ...old,
        [question._id]: finalIndexes.length > 1 ? finalIndexes : finalIndex,
      }));
      setAnsweredIds((old) =>
        old.includes(question._id) ? old : [...old, question._id],
      );
      setFeedbackByQuestion((old) => ({ ...old, [question._id]: result }));
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Answer could not be checked.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => {
    const nextIndex = questions.findIndex(
      (item, index) => index > currentIndex && !answeredIds.includes(item._id),
    );
    if (nextIndex < 0) finish();
    else setCurrentIndex(nextIndex);
  };

  const optionClass = (index) => {
    if (feedback) {
      if (
        (feedback.correctOptionIndexes || [feedback.correctOptionIndex])
          .map(Number)
          .includes(index)
      )
        return "bg-[#21c33b] text-white border-[#21c33b]";
      if (
        selectedIndexes.includes(index) &&
        !(feedback.correctOptionIndexes || [feedback.correctOptionIndex])
          .map(Number)
          .includes(index)
      )
        return "bg-[#e52a39] text-white border-[#e52a39]";
      return "bg-white text-slate-800 border-white";
    }
    return selectedIndexes.includes(index)
      ? "bg-[#123f88] text-white border-[#123f88]"
      : "bg-white text-slate-800 border-white hover:border-[#123f88]";
  };

  if (!quizId)
    return (
      <Message error>Quiz ID missing. Please select a quiz series.</Message>
    );
  if (loading) return <Message>Starting quiz...</Message>;
  if (error) return <Message error>{error}</Message>;
  if (!question) return <Message>No active question found.</Message>;

  const feedbackImage =
    !feedback?.isCorrect &&
    (feedback?.markedAnswerImage || feedback?.explanationImage);
  const image = feedbackImage || question.questionImage;
  const videoEmbedUrl = !feedbackImage
    ? youtubeEmbed(question.questionVideoUrl)
    : "";
  const hasTwoPrompts = Number(question.promptCount) === 2;
  const answerGroups = hasTwoPrompts
    ? [
        { label: "Question 1", indexes: [0, 1] },
        { label: "Question 2", indexes: [2, 3] },
      ]
    : [{ label: "", indexes: [0, 1, 2, 3] }];
  const correctPromptCount = hasTwoPrompts
    ? (feedback?.groupResults || []).filter((result) => result.isCorrect).length
    : feedback?.isCorrect
      ? 1
      : 0;

  const selectOption = (index) => {
    if (question.answerMode === "multiple") {
      setSelectedIndexes((current) => {
        const promptGroup = hasTwoPrompts
          ? index < 2
            ? [0, 1]
            : [2, 3]
          : null;
        let next;
        if (promptGroup)
          next = [
            ...current.filter((value) => !promptGroup.includes(value)),
            index,
          ].sort();
        else
          next = current.includes(index)
            ? current.filter((value) => value !== index)
            : [...current, index].sort();
        setSelectedIndex(next[0] ?? null);
        return next;
      });
    } else {
      setSelectedIndex(index);
      setSelectedIndexes([index]);
    }
  };

  return (
    <main className="min-h-screen bg-white px-1.5 py-1.5 text-[#171717] sm:px-6 sm:py-6">
      <div ref={panelRef} className="mx-auto w-full max-w-[1084px] bg-white">
        <header className="mb-1 flex h-7 items-center gap-1.5 sm:mb-8 sm:h-11 sm:gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#e8edf5] text-black sm:h-11 sm:w-11 sm:rounded-xl"
          >
            <IoChevronBack size={17} />
          </button>
          <h1 className="truncate text-[14px] font-semibold leading-none tracking-[-0.02em] text-[#173f87] sm:text-[25px]">
            {quiz?.title || "Code Challenge"}
          </h1>
        </header>

        <section className="rounded-lg bg-[#e8eef7] p-2 sm:min-h-[760px] sm:rounded-xl sm:p-6">
          <div className="mb-1 flex h-5 items-center justify-between text-[#123f88] sm:mb-[30px] sm:h-[30px]">
            <p className="text-[11px] font-bold leading-none sm:text-[16px]">
              Question {currentIndex + 1}/{questions.length}
            </p>
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                type="button"
                onClick={() =>
                  !document.fullscreenElement
                    ? panelRef.current?.requestFullscreen?.()
                    : document.exitFullscreen?.()
                }
                title="Fullscreen"
              >
                <FaExpandArrowsAlt className="h-3.5 w-3.5 sm:h-6 sm:w-6" />
              </button>
              <button type="button" onClick={speak} title="Read question">
                {speaking ? (
                  <IoVolumeMute className="h-4 w-4 sm:h-[29px] sm:w-[29px]" />
                ) : (
                  <IoVolumeHigh className="h-4 w-4 sm:h-[29px] sm:w-[29px]" />
                )}
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl bg-white">
            {videoEmbedUrl ? (
              <iframe
                src={videoEmbedUrl}
                title="Question video"
                className="aspect-video max-h-[145px] w-full sm:max-h-none"
                allow="encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : question.questionVideoUrl && !feedbackImage ? (
              <video
                src={question.questionVideoUrl}
                controls
                className="max-h-[145px] w-full bg-black sm:max-h-[439px]"
              />
            ) : image ? (
              <img
                src={mediaUrl(image)}
                alt="Question"
                className="h-[140px] w-full object-contain sm:h-[439px]"
              />
            ) : (
              <div className="flex h-[60px] items-center justify-center text-[10px] text-slate-500 sm:h-[439px] sm:text-base">
                No question media available
              </div>
            )}
          </div>

          <div className="mt-1.5 grid gap-1.5 sm:mt-[32px] sm:gap-7 lg:grid-cols-[559px_1fr]">
            <div>
              {(Number(question.promptCount) === 2
                ? [
                    { text: question.questionText, start: 0, end: 2 },
                    { text: question.secondaryQuestionText, start: 2, end: 4 },
                  ]
                : [{ text: question.questionText, start: 0, end: 4 }]
              ).map((prompt, promptIndex) => (
                <div
                  key={promptIndex}
                  className={
                    promptIndex
                      ? "mt-1.5 border-t border-slate-300 pt-1.5 sm:mt-7 sm:pt-6"
                      : ""
                  }
                >
                  <h2 className="mb-1 text-[12px] font-bold leading-[15px] sm:mb-[13px] sm:text-[16px] sm:leading-5">
                    {Number(question.promptCount) === 2
                      ? `${promptIndex + 1}. `
                      : ""}
                    {prompt.text}
                  </h2>
                  <div className="space-y-1 text-[11px] leading-[14px] text-[#123f88] sm:space-y-[13px] sm:text-[16px] sm:leading-5">
                    {question.options
                      ?.slice(prompt.start, prompt.end)
                      .map((option, localIndex) => {
                        const index = prompt.start + localIndex;
                        return (
                          <div
                            key={index}
                            className="flex min-w-0 items-center gap-2 rounded-md bg-white/70 px-2 py-1 sm:gap-3 sm:bg-transparent sm:px-0 sm:py-0 sm:pr-5"
                          >
                            <p className="min-w-0 flex-1">
                              <span className="hidden sm:inline">– </span>
                              {option.text}
                            </p>
                            <span className="mb-[-4px] hidden min-w-8 flex-1 border-b-2 border-dashed border-[#252525] sm:block" />
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e8eef7] text-[9px] font-bold text-[#123f88] sm:block sm:h-auto sm:min-w-8 sm:bg-transparent sm:text-left sm:text-[16px] sm:font-medium sm:text-slate-900">
                              {letter(index)}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
              {feedback?.explanationText && (
                <p className="mt-4 rounded-lg bg-white/70 p-3 text-sm font-semibold text-[#123f88]">
                  {feedback.explanationText}
                </p>
              )}
            </div>

            <div className="flex flex-col justify-end">
              {!feedback ? (
                <div className="mb-1 flex items-center justify-between sm:mb-5 sm:block">
                  <p className="text-[11px] font-bold sm:mb-2 sm:text-base">
                    {hasTwoPrompts ? "Select two answers" : "Select an answer"}
                  </p>
                  <div className="flex items-center gap-1 text-[#123f88] sm:gap-3">
                    <TbClockHour4 className="h-4 w-4 sm:h-[54px] sm:w-[54px]" />
                    <span className="text-[10px] font-black sm:text-lg">
                      {formattedTime}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mb-3 flex h-[36px] w-fit overflow-hidden rounded-lg bg-white text-[13px] font-medium sm:mb-[50px] sm:h-[43px] sm:text-[16px]">
                  <span className="flex items-center px-3">
                    Score {correctPromptCount}/{hasTwoPrompts ? 2 : 1}
                  </span>
                  <span
                    className={`flex items-center px-3 text-white ${feedback.isCorrect ? "bg-[#20c23b]" : "bg-[#e62a3a]"}`}
                  >
                    {feedback.isCorrect ? "Correct answer" : "Wrong answer"}
                  </span>
                </div>
              )}

              <div className="space-y-1.5 sm:space-y-3">
                <div
                  className={
                    hasTwoPrompts
                      ? "grid grid-cols-2 gap-2 sm:gap-3"
                      : "grid grid-cols-4 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-4"
                  }
                >
                  {answerGroups.map((group) => (
                    <div
                      key={group.label || "answer"}
                      className={
                        hasTwoPrompts
                          ? "rounded-md bg-white/55 p-1.5 sm:rounded-xl sm:p-3"
                          : "contents"
                      }
                    >
                      {group.label && (
                        <p className="mb-1 text-[9px] font-bold uppercase tracking-wide text-[#123f88] sm:mb-2 sm:text-xs">
                          {group.label}
                        </p>
                      )}
                      <div
                        className={
                          hasTwoPrompts
                            ? "flex items-center gap-1.5 sm:gap-3"
                            : "contents"
                        }
                      >
                        {group.indexes.map((index) => (
                          <button
                            key={index}
                            type="button"
                            disabled={answered || submitting}
                            onClick={() => selectOption(index)}
                            className={`h-7 w-full min-w-0 rounded-md border px-2 text-[10px] font-bold transition sm:h-[42px] sm:w-auto sm:min-w-[65px] sm:rounded-lg sm:border-2 sm:px-4 sm:text-[16px] sm:font-medium ${optionClass(index)}`}
                          >
                            {letter(index)}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {!feedback ? (
                  <button
                    type="button"
                    disabled={
                      !selectedIndexes.length ||
                      (hasTwoPrompts && selectedIndexes.length !== 2) ||
                      submitting
                    }
                    onClick={validate}
                    className="h-7 w-full rounded-md bg-[#20c23b] px-4 text-[9px] font-bold uppercase text-white disabled:cursor-not-allowed disabled:opacity-50 sm:h-[42px] sm:w-auto sm:rounded-lg sm:px-6 sm:text-xs"
                  >
                    {submitting ? "Checking..." : "To validate"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={next}
                    className="h-8 w-full rounded-lg border border-[#123f88] bg-white px-4 text-[10px] font-bold text-[#123f88] sm:h-[48px] sm:w-auto sm:rounded-xl sm:border-2 sm:px-[18px] sm:text-[16px]"
                  >
                    {currentIndex + 1 >= questions.length
                      ? "Finish"
                      : "Following"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function CodeChallengePage() {
  return (
    <Suspense fallback={<Message>Loading...</Message>}>
      <QuizContent />
    </Suspense>
  );
}
