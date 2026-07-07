// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { getQuizAttemptReview } from "@/features/API";
// import { mediaUrl } from "@/utils/mediaUrl";

// const formatDateTime = (value) => {
//   if (!value) return "—";

//   return new Date(value).toLocaleString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

// export default function AdminQuizAttemptReviewPage() {
//   const params = useParams();
//   const attemptId = params?.attemptId;

//   const [attempt, setAttempt] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const loadReview = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await getQuizAttemptReview(attemptId);
//       setAttempt(res.data?.data || null);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           err.message ||
//           "Failed to load attempt review",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (attemptId) {
//       loadReview();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [attemptId]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-100 p-6">
//         <div className="rounded-2xl bg-white p-6 text-slate-500 shadow-sm">
//           Loading review...
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-slate-100 p-6">
//         <div className="rounded-2xl border border-red-300 bg-red-50 p-6 text-red-700">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   if (!attempt) {
//     return (
//       <div className="min-h-screen bg-slate-100 p-6">
//         <div className="rounded-2xl bg-white p-6 text-slate-500 shadow-sm">
//           Attempt not found.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-6">
//       <div className="mx-auto max-w-7xl">
//         <div className="mb-6">
//           <Link
//             href="/admin/quiz-attempts"
//             className="text-sm font-semibold text-blue-700 hover:underline"
//           >
//             ← Back to attempts
//           </Link>
//         </div>

//         <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
//           <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-slate-800">
//                 Attempt Review
//               </h1>
//               <p className="mt-2 text-slate-500">
//                 Review student answer, correct answer and question details.
//               </p>
//             </div>

//             <span
//               className={`rounded-full px-4 py-2 text-sm font-semibold ${
//                 attempt.status !== "completed"
//                   ? "bg-amber-100 text-amber-700"
//                   : attempt.passed
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-700"
//               }`}
//             >
//               {attempt.status !== "completed"
//                 ? "In Progress"
//                 : attempt.passed
//                   ? "Passed"
//                   : "Failed"}
//             </span>
//           </div>

//           <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
//             <div className="rounded-xl bg-slate-50 p-4">
//               <p className="text-sm text-slate-500">Student</p>
//               <h3 className="mt-1 font-bold text-slate-800">
//                 {attempt.student?.name || "Unknown Student"}
//               </h3>
//               <p className="mt-1 text-xs text-slate-500">
//                 {attempt.student?.email || "No email"}
//               </p>
//             </div>

//             <div className="rounded-xl bg-slate-50 p-4">
//               <p className="text-sm text-slate-500">Quiz</p>
//               <h3 className="mt-1 font-bold text-slate-800">
//                 {attempt.quiz?.title || "Deleted Quiz"}
//               </h3>
//               <p className="mt-1 text-xs text-slate-500">
//                 Passing Score: {attempt.quiz?.passingScore || 0}%
//               </p>
//             </div>

//             <div className="rounded-xl bg-slate-50 p-4">
//               <p className="text-sm text-slate-500">Score</p>
//               <h3 className="mt-1 text-2xl font-bold text-slate-800">
//                 {attempt.percentage || 0}%
//               </h3>
//               <p className="mt-1 text-xs text-slate-500">
//                 {attempt.correctCount || 0} correct / {attempt.wrongCount || 0}{" "}
//                 wrong
//               </p>
//             </div>

//             <div className="rounded-xl bg-slate-50 p-4">
//               <p className="text-sm text-slate-500">Finished At</p>
//               <h3 className="mt-1 font-bold text-slate-800">
//                 {formatDateTime(attempt.finishedAt)}
//               </h3>
//               <p className="mt-1 text-xs text-slate-500">
//                 Started: {formatDateTime(attempt.startedAt)}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-4">
//           {attempt.answers?.length ? (
//             attempt.answers.map((answer, index) => {
//               const question = answer.question;
//               const options = question?.options || [];

//               return (
//                 <div
//                   key={`${answer.question?._id || index}-${index}`}
//                   className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
//                 >
//                   <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//                     <h2 className="text-lg font-bold text-slate-800">
//                       Question {index + 1}
//                     </h2>

//                     <span
//                       className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
//                         answer.isCorrect
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {answer.isCorrect ? "Correct" : "Wrong"}
//                     </span>
//                   </div>

//                   <p className="mb-4 text-slate-700">
//                     {question?.questionText || "Question text not available"}
//                   </p>

//                   {question?.questionImage && (
//                     <img
//                       src={mediaUrl(question.questionImage)}
//                       alt="Question"
//                       className="mb-4 max-h-64 rounded-xl border object-contain"
//                     />
//                   )}

//                   <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//                     {options.map((option, optionIndex) => {
//                       const isSelected =
//                         answer.selectedOptionIndex === optionIndex;
//                       const isCorrect =
//                         answer.correctOptionIndex === optionIndex;

//                       return (
//                         <div
//                           key={optionIndex}
//                           className={`rounded-xl border p-4 ${
//                             isCorrect
//                               ? "border-green-300 bg-green-50"
//                               : isSelected
//                                 ? "border-red-300 bg-red-50"
//                                 : "border-slate-200 bg-slate-50"
//                           }`}
//                         >
//                           <div className="flex items-start justify-between gap-3">
//                             <p className="font-medium text-slate-800">
//                               {String.fromCharCode(65 + optionIndex)}.{" "}
//                               {option.text || "No option text"}
//                             </p>

//                             <div className="flex shrink-0 gap-2">
//                               {isSelected && (
//                                 <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-bold text-blue-700">
//                                   Selected
//                                 </span>
//                               )}

//                               {isCorrect && (
//                                 <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold text-green-700">
//                                   Correct
//                                 </span>
//                               )}
//                             </div>
//                           </div>

//                           {option.image && (
//                             <img
//                               src={mediaUrl(option.image)}
//                               alt={`Option ${optionIndex + 1}`}
//                               className="mt-3 max-h-40 rounded-lg border object-contain"
//                             />
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>

//                   {question?.explanationText && (
//                     <div className="mt-4 rounded-xl bg-blue-50 p-4 text-blue-800">
//                       <p className="font-semibold">Explanation</p>
//                       <p className="mt-1 text-sm">{question.explanationText}</p>
//                     </div>
//                   )}

//                   {question?.explanationImage && (
//                     <img
//                       src={mediaUrl(question.explanationImage)}
//                       alt="Explanation"
//                       className="mt-4 max-h-64 rounded-xl border object-contain"
//                     />
//                   )}
//                 </div>
//               );
//             })
//           ) : (
//             <div className="rounded-2xl bg-white p-6 text-center text-slate-500 shadow-sm">
//               No answers found.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaAward,
  FaBookOpen,
  FaCalendarAlt,
  FaCheck,
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaExclamationTriangle,
  FaGraduationCap,
  FaImage,
  FaListOl,
  FaPercent,
  FaQuestionCircle,
  FaRedoAlt,
  FaSyncAlt,
  FaTimes,
  FaTimesCircle,
  FaUserGraduate,
} from "react-icons/fa";
import { getQuizAttemptReview } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const formatDateTime = (value) => {
  if (!value) return "—";

  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function getMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Failed to load attempt review."
  );
}

function getInitials(name = "Student") {
  return name
    .split(" ")
    .map((item) => item?.[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getAttemptResult(attempt) {
  if (attempt?.status !== "completed") return "In Progress";
  return attempt?.passed ? "Passed" : "Failed";
}

function getAttemptTone(attempt) {
  if (attempt?.status !== "completed") return "amber";
  return attempt?.passed ? "green" : "red";
}

function Badge({ children, tone = "slate" }) {
  const toneClass =
    tone === "green"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : tone === "red"
        ? "border-rose-200 bg-rose-50 text-rose-700"
        : tone === "amber"
          ? "border-amber-200 bg-amber-50 text-amber-700"
          : tone === "sky"
            ? "border-sky-200 bg-sky-50 text-sky-700"
            : tone === "violet"
              ? "border-violet-200 bg-violet-50 text-violet-700"
              : "border-slate-200 bg-slate-50 text-slate-600";

  return (
    <span
      className={`inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold capitalize leading-none ${toneClass}`}
    >
      {children}
    </span>
  );
}

function StatCard({ title, value, note, icon: Icon, tone = "violet" }) {
  const toneClass =
    tone === "green"
      ? "bg-emerald-50 text-emerald-600"
      : tone === "red"
        ? "bg-rose-50 text-rose-600"
        : tone === "amber"
          ? "bg-amber-50 text-amber-600"
          : tone === "sky"
            ? "bg-sky-50 text-sky-600"
            : "bg-violet-50 text-violet-600";

  return (
    <div className="rounded-[16px] border border-slate-200 bg-white p-3.5 shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-slate-500">
            {title}
          </p>

          <h3 className="mt-1.5 truncate text-lg font-bold tracking-tight text-slate-900">
            {value}
          </h3>

          <p className="mt-1 truncate text-[11px] font-medium text-slate-400">
            {note}
          </p>
        </div>

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${toneClass}`}
        >
          <Icon className="text-sm" />
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <section className="min-h-screen bg-[#f8f8fb] px-3 py-3 md:px-5">
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-3 h-20 animate-pulse rounded-[16px] bg-white shadow-sm" />

        <div className="mb-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-20 animate-pulse rounded-[16px] bg-white shadow-sm"
            />
          ))}
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-36 animate-pulse rounded-[16px] bg-white shadow-sm"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ErrorState({ error, onRetry }) {
  return (
    <section className="min-h-screen bg-[#f8f8fb] px-3 py-3 md:px-5">
      <div className="mx-auto max-w-[760px]">
        <Link
          href="/admin/quizzes/quiz-attempts"
          className="mb-3 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          <FaArrowLeft />
          Back to attempts
        </Link>

        <div className="rounded-[16px] border border-rose-200 bg-white p-5 text-center shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
            <FaExclamationTriangle className="text-xl" />
          </div>

          <h1 className="text-lg font-bold text-slate-900">
            Could not load review
          </h1>

          <p className="mx-auto mt-2 max-w-xl text-sm font-medium leading-6 text-slate-500">
            {error}
          </p>

          <button
            onClick={onRetry}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            <FaRedoAlt />
            Try Again
          </button>
        </div>
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <section className="min-h-screen bg-[#f8f8fb] px-3 py-3 md:px-5">
      <div className="mx-auto max-w-[760px]">
        <Link
          href="/admin/quizzes/quiz-attempts"
          className="mb-3 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          <FaArrowLeft />
          Back to attempts
        </Link>

        <div className="rounded-[16px] border border-slate-200 bg-white p-5 text-center shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <FaGraduationCap className="text-xl" />
          </div>

          <h1 className="text-lg font-bold text-slate-900">
            Attempt not found
          </h1>

          <p className="mt-2 text-sm font-medium text-slate-500">
            This attempt may have been deleted or the link is incorrect.
          </p>
        </div>
      </div>
    </section>
  );
}

function OptionCard({ option, optionIndex, isSelected, isCorrect }) {
  const cardClass = isCorrect
    ? "border-emerald-200 bg-emerald-50"
    : isSelected
      ? "border-rose-200 bg-rose-50"
      : "border-slate-200 bg-white";

  const letterClass = isCorrect
    ? "bg-emerald-600 text-white"
    : isSelected
      ? "bg-rose-600 text-white"
      : "bg-slate-100 text-slate-600";

  return (
    <div className={`rounded-[14px] border p-3 ${cardClass}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-start gap-2.5">
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${letterClass}`}
          >
            {String.fromCharCode(65 + optionIndex)}
          </span>

          <p className="min-w-0 break-words text-[13px] font-semibold leading-5 text-slate-800">
            {option.text || "No option text"}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
          {isSelected && (
            <Badge tone={isCorrect ? "green" : "red"}>
              {isCorrect ? <FaCheck /> : <FaTimes />}
              Selected
            </Badge>
          )}

          {isCorrect && (
            <Badge tone="green">
              <FaCheckCircle />
              Correct
            </Badge>
          )}
        </div>
      </div>

      {option.image && (
        <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5">
          <img
            src={mediaUrl(option.image)}
            alt={`Option ${optionIndex + 1}`}
            className="max-h-28 w-full object-contain"
          />
        </div>
      )}
    </div>
  );
}

export default function AdminQuizAttemptReviewPage() {
  const params = useParams();
  const attemptId = params?.attemptId;

  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadReview = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getQuizAttemptReview(attemptId);
      setAttempt(res.data?.data || null);
    } catch (err) {
      setError(getMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (attemptId) {
      loadReview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptId]);

  const correctPercentage = useMemo(() => {
    const totalAnswers = attempt?.answers?.length || 0;
    const correct = attempt?.correctCount || 0;

    if (!totalAnswers) return 0;

    return Math.round((correct / totalAnswers) * 100);
  }, [attempt]);

  if (loading) return <LoadingState />;

  if (error) return <ErrorState error={error} onRetry={loadReview} />;

  if (!attempt) return <EmptyState />;

  const studentName = attempt.student?.name || "Unknown Student";
  const resultTone = getAttemptTone(attempt);

  return (
    <section className="min-h-screen bg-[#f8f8fb] px-3 py-3 md:px-4 lg:px-5">
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-3 flex items-center justify-between gap-3">
          <Link
            href="/admin/quizzes/quiz-attempts"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:bg-slate-50"
          >
            <FaArrowLeft />
            Back
          </Link>

          <button
            onClick={loadReview}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800"
          >
            <FaSyncAlt />
            Refresh
          </button>
        </div>

        <div className="mb-3 overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
          <div className="border-b border-slate-100 bg-white px-4 py-3">
            <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
              <div className="min-w-0">
                <div className="mb-1.5 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-400">
                  <span>Admin</span>
                  <span>/</span>
                  <span>Quizzes</span>
                  <span>/</span>
                  <span>Attempts</span>
                  <span>/</span>
                  <span className="text-slate-600">Review</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                    Attempt Review
                  </h1>

                  <Badge tone={resultTone}>{getAttemptResult(attempt)}</Badge>
                </div>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
                  Review student answers, correct answers, explanation and
                  question details.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3.5">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Student"
                value={studentName}
                note={attempt.student?.email || "No email"}
                icon={FaUserGraduate}
                tone="violet"
              />

              <StatCard
                title="Quiz"
                value={attempt.quiz?.title || "Deleted Quiz"}
                note={`Passing Score: ${attempt.quiz?.passingScore || 0}%`}
                icon={FaBookOpen}
                tone="sky"
              />

              <StatCard
                title="Score"
                value={`${attempt.percentage || 0}%`}
                note={`${attempt.correctCount || 0} correct / ${
                  attempt.wrongCount || 0
                } wrong`}
                icon={FaPercent}
                tone={attempt.passed ? "green" : "red"}
              />

              <StatCard
                title="Finished"
                value={formatDateTime(attempt.finishedAt)}
                note={`Started: ${formatDateTime(attempt.startedAt)}`}
                icon={FaCalendarAlt}
                tone="amber"
              />
            </div>

            <div className="mt-3 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[15px] border border-slate-200 bg-slate-50 p-3.5">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-slate-900 text-sm font-bold text-white">
                    {getInitials(studentName)}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-400">
                      Student Information
                    </p>

                    <h2 className="mt-1 text-base font-bold text-slate-900">
                      {studentName}
                    </h2>

                    <p className="mt-1 flex items-center gap-2 break-all text-xs font-medium text-slate-500">
                      <FaEnvelope className="shrink-0 text-slate-300" />
                      {attempt.student?.email || "No email"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[15px] border border-slate-200 bg-slate-50 p-3.5">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-400">
                      Performance
                    </p>

                    <h2 className="mt-1 text-base font-bold text-slate-900">
                      {correctPercentage}% Correct
                    </h2>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <FaAward />
                  </div>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-white">
                  <div
                    className={`h-full rounded-full ${
                      attempt.passed ? "bg-emerald-500" : "bg-rose-500"
                    }`}
                    style={{ width: `${Math.min(correctPercentage, 100)}%` }}
                  />
                </div>

                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  <Badge tone="green">
                    <FaCheckCircle />
                    {attempt.correctCount || 0} Correct
                  </Badge>

                  <Badge tone="red">
                    <FaTimesCircle />
                    {attempt.wrongCount || 0} Wrong
                  </Badge>

                  <Badge tone="sky">
                    <FaListOl />
                    {attempt.answers?.length || 0} Questions
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-3 flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Answer Review</h2>

            <p className="mt-0.5 text-xs font-medium text-slate-500">
              Question wise selected answer, correct answer and explanation.
            </p>
          </div>

          <Badge tone="violet">
            <FaQuestionCircle />
            {attempt.answers?.length || 0} Answers
          </Badge>
        </div>

        <div className="space-y-3">
          {attempt.answers?.length ? (
            attempt.answers.map((answer, index) => {
              const question = answer.question;
              const options = question?.options || [];

              return (
                <div
                  key={`${answer.question?._id || index}-${index}`}
                  className="overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_8px_22px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex flex-col justify-between gap-2 border-b border-slate-100 bg-[#fbfbfd] px-4 py-3 md:flex-row md:items-center">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-xs font-bold text-violet-700">
                        Q{index + 1}
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          Question {index + 1}
                        </h3>

                        <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                          Review selected and correct answer
                        </p>
                      </div>
                    </div>

                    <Badge tone={answer.isCorrect ? "green" : "red"}>
                      {answer.isCorrect ? <FaCheckCircle /> : <FaTimesCircle />}
                      {answer.isCorrect ? "Correct" : "Wrong"}
                    </Badge>
                  </div>

                  <div className="p-3.5">
                    <div className="rounded-[14px] border border-slate-200 bg-slate-50 p-3">
                      <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                        Question
                      </p>

                      <p className="break-words text-sm font-semibold leading-6 text-slate-800">
                        {question?.questionText ||
                          "Question text not available"}
                      </p>

                      {question?.questionImage && (
                        <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5">
                          <img
                            src={mediaUrl(question.questionImage)}
                            alt="Question"
                            className="max-h-44 w-full object-contain"
                          />
                        </div>
                      )}
                    </div>

                    <div className="mt-3 grid grid-cols-1 gap-2.5 lg:grid-cols-2">
                      {options.length ? (
                        options.map((option, optionIndex) => {
                          const isSelected =
                            answer.selectedOptionIndex === optionIndex;
                          const isCorrect =
                            answer.correctOptionIndex === optionIndex;

                          return (
                            <OptionCard
                              key={optionIndex}
                              option={option}
                              optionIndex={optionIndex}
                              isSelected={isSelected}
                              isCorrect={isCorrect}
                            />
                          );
                        })
                      ) : (
                        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-center text-sm font-semibold text-slate-400 lg:col-span-2">
                          No options found for this question.
                        </div>
                      )}
                    </div>

                    {question?.explanationText && (
                      <div className="mt-3 rounded-[14px] border border-sky-200 bg-sky-50 p-3">
                        <div className="mb-1.5 flex items-center gap-2 text-xs font-bold text-sky-700">
                          <FaBookOpen />
                          Explanation
                        </div>

                        <p className="break-words text-xs font-medium leading-5 text-sky-800">
                          {question.explanationText}
                        </p>
                      </div>
                    )}

                    {question?.explanationImage && (
                      <div className="mt-3 overflow-hidden rounded-[14px] border border-slate-200 bg-white p-1.5">
                        <div className="mb-1.5 flex items-center gap-2 px-2 pt-1.5 text-xs font-bold text-slate-600">
                          <FaImage />
                          Explanation Image
                        </div>

                        <img
                          src={mediaUrl(question.explanationImage)}
                          alt="Explanation"
                          className="max-h-44 w-full object-contain"
                        />
                      </div>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-3">
                      <Badge tone="sky">
                        Selected:{" "}
                        {answer.selectedOptionIndex >= 0
                          ? String.fromCharCode(
                              65 + Number(answer.selectedOptionIndex),
                            )
                          : "N/A"}
                      </Badge>

                      <Badge tone="green">
                        Correct:{" "}
                        {answer.correctOptionIndex >= 0
                          ? String.fromCharCode(
                              65 + Number(answer.correctOptionIndex),
                            )
                          : "N/A"}
                      </Badge>

                      <Badge tone="amber">
                        <FaClock />
                        Reviewed
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-[16px] border border-slate-200 bg-white p-6 text-center shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <FaQuestionCircle className="text-xl" />
              </div>

              <h3 className="text-base font-bold text-slate-900">
                No answers found
              </h3>

              <p className="mt-1.5 text-sm font-medium text-slate-500">
                This attempt does not have any submitted answers.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
