// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { getCodeQuizAttemptReview, getMyQuizAttempts } from "@/features/API";

// const getFullFileUrl = (path) => {
//   if (!path) return "";
//   if (path.startsWith("http")) return path;

//   const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
//   const rootUrl = apiUrl.replace("/api", "");

//   return `${rootUrl}${path}`;
// };

// const getQuizId = (quiz) => {
//   if (!quiz) return "";
//   if (typeof quiz === "object") return quiz._id || "";
//   return quiz;
// };

// export default function StudentCodeResultsPage() {
//   const searchParams = useSearchParams();

//   const attemptId = searchParams.get("attemptId");
//   const quizId = searchParams.get("quizId");

//   const [attempts, setAttempts] = useState([]);
//   const [review, setReview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const filteredAttempts = useMemo(() => {
//     if (!quizId) return attempts;

//     return attempts.filter((attempt) => {
//       const currentQuizId = getQuizId(attempt.quiz);
//       return currentQuizId === quizId;
//     });
//   }, [attempts, quizId]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const attemptsRes = await getMyQuizAttempts();
//       setAttempts(attemptsRes?.data?.data || []);

//       if (attemptId) {
//         const reviewRes = await getCodeQuizAttemptReview(attemptId);
//         setReview(reviewRes?.data?.data || null);
//       }
//     } catch (error) {
//       alert(error?.response?.data?.message || "Failed to load result");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [attemptId, quizId]);

//   const latestAttempt = filteredAttempts[0];

//   const resultData = review || latestAttempt;

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 md:p-6">
//       <div className="mx-auto max-w-6xl space-y-6">
//         <div className="rounded-3xl bg-white p-6 shadow-sm">
//           <Link href="/student/code" className="text-sm font-bold text-red-500">
//             ← Back to Code
//           </Link>

//           <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
//             <div>
//               <h1 className="text-2xl font-black text-slate-900">
//                 Test Result
//               </h1>
//               <p className="mt-2 text-sm text-slate-500">
//                 Your latest score, correct answers, wrong answers and previous
//                 attempts.
//               </p>
//             </div>

//             {quizId && (
//               <Link
//                 href={`/student/code/test?quizId=${quizId}`}
//                 className="rounded-2xl bg-red-500 px-5 py-3 text-sm font-bold text-white"
//               >
//                 Retry Test
//               </Link>
//             )}
//           </div>
//         </div>

//         {loading ? (
//           <div className="rounded-3xl bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
//             Loading result...
//           </div>
//         ) : !resultData ? (
//           <div className="rounded-3xl bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
//             No result found.
//           </div>
//         ) : (
//           <>
//             <div className="grid gap-4 md:grid-cols-4">
//               <ResultCard
//                 label="Score"
//                 value={`${resultData.score || 0}/${resultData.totalQuestions || 0}`}
//               />
//               <ResultCard
//                 label="Percentage"
//                 value={`${resultData.percentage || 0}%`}
//               />
//               <ResultCard
//                 label="Correct"
//                 value={resultData.correctCount || 0}
//               />
//               <ResultCard label="Wrong" value={resultData.wrongCount || 0} />
//             </div>

//             <div className="rounded-3xl bg-white p-6 shadow-sm">
//               <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//                 <div>
//                   <p className="text-sm font-bold text-slate-500">
//                     {resultData.quiz?.title || "Quiz"}
//                   </p>
//                   <h2 className="mt-1 text-2xl font-black text-slate-900">
//                     {resultData.passed ? "Passed" : "Need More Practice"}
//                   </h2>
//                 </div>

//                 <span
//                   className={`rounded-full px-4 py-2 text-sm font-black ${
//                     resultData.passed
//                       ? "bg-green-50 text-green-600"
//                       : "bg-red-50 text-red-600"
//                   }`}
//                 >
//                   {resultData.passed ? "PASSED" : "FAILED"}
//                 </span>
//               </div>
//             </div>

//             {review?.answers?.length > 0 && (
//               <div className="rounded-3xl bg-white p-6 shadow-sm">
//                 <h2 className="text-lg font-black text-slate-900">
//                   Answer Review
//                 </h2>

//                 <div className="mt-5 space-y-4">
//                   {review.answers.map((answer, index) => {
//                     const question = answer.question;
//                     const selectedOption =
//                       question?.options?.[answer.selectedOptionIndex];
//                     const correctOption =
//                       question?.options?.[answer.correctOptionIndex];

//                     return (
//                       <div
//                         key={index}
//                         className="rounded-3xl border border-slate-100 p-5"
//                       >
//                         <div className="mb-3 flex flex-wrap gap-2">
//                           <span
//                             className={`rounded-full px-3 py-1 text-xs font-bold ${
//                               answer.isCorrect
//                                 ? "bg-green-50 text-green-600"
//                                 : "bg-red-50 text-red-600"
//                             }`}
//                           >
//                             {answer.isCorrect ? "Correct" : "Wrong"}
//                           </span>

//                           {question?.topic && (
//                             <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
//                               {question.topic}
//                             </span>
//                           )}
//                         </div>

//                         <h3 className="font-black text-slate-900">
//                           {index + 1}. {question?.questionText}
//                         </h3>

//                         {question?.questionImage && (
//                           <img
//                             src={getFullFileUrl(question.questionImage)}
//                             alt="Question"
//                             className="mt-4 max-h-52 rounded-2xl object-contain"
//                           />
//                         )}

//                         <div className="mt-4 grid gap-3 md:grid-cols-2">
//                           <div className="rounded-2xl bg-red-50 p-4">
//                             <p className="text-xs font-black text-red-500">
//                               Your Answer
//                             </p>
//                             <p className="mt-1 text-sm font-semibold text-slate-800">
//                               {selectedOption?.text || "-"}
//                             </p>
//                           </div>

//                           <div className="rounded-2xl bg-green-50 p-4">
//                             <p className="text-xs font-black text-green-600">
//                               Correct Answer
//                             </p>
//                             <p className="mt-1 text-sm font-semibold text-slate-800">
//                               {correctOption?.text || "-"}
//                             </p>
//                           </div>
//                         </div>

//                         {question?.explanationText && (
//                           <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
//                             <span className="font-black text-slate-900">
//                               Explanation:
//                             </span>{" "}
//                             {question.explanationText}
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             <div className="rounded-3xl bg-white p-6 shadow-sm">
//               <h2 className="text-lg font-black text-slate-900">
//                 Previous Attempts
//               </h2>

//               {filteredAttempts.length === 0 ? (
//                 <p className="mt-4 text-sm text-slate-500">
//                   No previous attempt found.
//                 </p>
//               ) : (
//                 <div className="mt-5 overflow-x-auto">
//                   <table className="w-full text-left text-sm">
//                     <thead>
//                       <tr className="border-b text-slate-500">
//                         <th className="py-3">Quiz</th>
//                         <th className="py-3">Score</th>
//                         <th className="py-3">Percentage</th>
//                         <th className="py-3">Status</th>
//                         <th className="py-3">Date</th>
//                         <th className="py-3 text-right">Action</th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {filteredAttempts.map((attempt) => (
//                         <tr key={attempt._id} className="border-b">
//                           <td className="py-3 font-bold">
//                             {attempt.quiz?.title || "Quiz"}
//                           </td>
//                           <td className="py-3">
//                             {attempt.score}/{attempt.totalQuestions}
//                           </td>
//                           <td className="py-3">{attempt.percentage}%</td>
//                           <td className="py-3">
//                             {attempt.passed ? "Passed" : "Failed"}
//                           </td>
//                           <td className="py-3">
//                             {attempt.createdAt
//                               ? new Date(attempt.createdAt).toLocaleDateString()
//                               : "-"}
//                           </td>
//                           <td className="py-3 text-right">
//                             <Link
//                               href={`/student/code/results?attemptId=${attempt._id}&quizId=${getQuizId(
//                                 attempt.quiz,
//                               )}`}
//                               className="font-bold text-red-500"
//                             >
//                               View
//                             </Link>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// function ResultCard({ label, value }) {
//   return (
//     <div className="rounded-3xl bg-white p-5 shadow-sm">
//       <p className="text-sm font-bold text-slate-500">{label}</p>
//       <p className="mt-2 text-3xl font-black text-slate-900">{value}</p>
//     </div>
//   );
// }

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  IoAlertCircleOutline,
  IoBookOutline,
  IoCheckmarkCircleOutline,
  IoChevronBack,
  IoCloseCircleOutline,
  IoEyeOutline,
  IoRefreshOutline,
  IoRepeatOutline,
  IoStatsChartOutline,
  IoTrophyOutline,
} from "react-icons/io5";
import { getCodeQuizAttemptReview, getMyQuizAttempts } from "@/features/API";

const getFullFileUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const rootUrl = apiUrl.replace("/api", "");

  return `${rootUrl}${path}`;
};

const getQuizId = (quiz) => {
  if (!quiz) return "";
  if (typeof quiz === "object") return quiz._id || "";
  return quiz;
};

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function StatusBadge({ passed }) {
  return (
    <span
      className={`inline-flex h-7 items-center gap-1 rounded-md px-3 text-[11px] font-black ${
        passed ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
      }`}
    >
      {passed ? (
        <IoCheckmarkCircleOutline size={15} />
      ) : (
        <IoCloseCircleOutline size={15} />
      )}
      {passed ? "PASSED" : "FAILED"}
    </span>
  );
}

function ResultCard({ label, value, tone = "default", icon: Icon }) {
  const toneClass =
    tone === "green"
      ? "text-green-700"
      : tone === "red"
        ? "text-red-700"
        : "text-[#0D4598]";

  const iconClass =
    tone === "green"
      ? "bg-green-50 text-green-700"
      : tone === "red"
        ? "bg-red-50 text-red-700"
        : "bg-[#EAF1FB] text-[#0D4598]";

  return (
    <div className="rounded-xl border border-[#E5EAF2] bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#7B8190]">
            {label}
          </p>
          <p className={`mt-1 text-xl font-black ${toneClass}`}>{value}</p>
        </div>

        {Icon && (
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconClass}`}
          >
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingBox() {
  return (
    <div className="animate-pulse rounded-xl border border-[#E5EAF2] bg-white p-4">
      <div className="h-4 w-40 rounded bg-slate-200" />
      <div className="mt-3 h-3 w-64 rounded bg-slate-200" />
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <div className="h-20 rounded-xl bg-slate-200" />
        <div className="h-20 rounded-xl bg-slate-200" />
        <div className="h-20 rounded-xl bg-slate-200" />
        <div className="h-20 rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}

function AnswerReviewCard({ answer, index }) {
  const question = answer.question;
  const selectedOption = question?.options?.[answer.selectedOptionIndex];
  const correctOption = question?.options?.[answer.correctOptionIndex];

  return (
    <div className="rounded-xl border border-[#E5EAF2] bg-white p-4 transition hover:border-[#0D4598]">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex h-7 items-center gap-1 rounded-md px-3 text-[11px] font-black ${
            answer.isCorrect
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {answer.isCorrect ? (
            <IoCheckmarkCircleOutline size={15} />
          ) : (
            <IoCloseCircleOutline size={15} />
          )}
          {answer.isCorrect ? "Correct" : "Wrong"}
        </span>

        {question?.topic && (
          <span className="inline-flex h-7 items-center rounded-md bg-[#F1F4F8] px-3 text-[11px] font-black text-[#667085]">
            {question.topic}
          </span>
        )}
      </div>

      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-sm font-black text-[#0D4598]">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-black leading-6 text-[#151515]">
            {question?.questionText || "Question not found"}
          </h3>

          {question?.questionImage && (
            <div className="mt-3 rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] p-3">
              <img
                src={getFullFileUrl(question.questionImage)}
                alt="Question"
                className="max-h-44 rounded-lg object-contain"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div
          className={`rounded-xl border p-4 ${
            answer.isCorrect
              ? "border-green-100 bg-green-50"
              : "border-red-100 bg-red-50"
          }`}
        >
          <p
            className={`text-[11px] font-black uppercase tracking-wide ${
              answer.isCorrect ? "text-green-700" : "text-red-600"
            }`}
          >
            Your Answer
          </p>
          <p className="mt-1 text-sm font-semibold leading-6 text-[#151515]">
            {selectedOption?.text || "-"}
          </p>
        </div>

        <div className="rounded-xl border border-green-100 bg-green-50 p-4">
          <p className="text-[11px] font-black uppercase tracking-wide text-green-700">
            Correct Answer
          </p>
          <p className="mt-1 text-sm font-semibold leading-6 text-[#151515]">
            {correctOption?.text || "-"}
          </p>
        </div>
      </div>

      {question?.explanationText && (
        <div className="mt-3 rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] p-4 text-sm leading-6 text-[#667085]">
          <span className="font-black text-[#151515]">Explanation:</span>{" "}
          {question.explanationText}
        </div>
      )}
    </div>
  );
}

export default function StudentCodeResultsPage() {
  const searchParams = useSearchParams();

  const attemptId = searchParams.get("attemptId");
  const quizId = searchParams.get("quizId");

  const [attempts, setAttempts] = useState([]);
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sortedAttempts = useMemo(() => {
    return [...attempts].sort((a, b) => {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [attempts]);

  const filteredAttempts = useMemo(() => {
    if (!quizId) return sortedAttempts;

    return sortedAttempts.filter((attempt) => {
      const currentQuizId = getQuizId(attempt.quiz);
      return currentQuizId === quizId;
    });
  }, [sortedAttempts, quizId]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const attemptsRes = await getMyQuizAttempts();
      setAttempts(attemptsRes?.data?.data || []);

      if (attemptId) {
        const reviewRes = await getCodeQuizAttemptReview(attemptId);
        setReview(reviewRes?.data?.data || null);
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Failed to load result",
      );
    } finally {
      setLoading(false);
    }
  }, [attemptId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const latestAttempt = filteredAttempts[0];
  const resultData = review || latestAttempt;

  const activeQuizId =
    quizId || getQuizId(resultData?.quiz) || getQuizId(latestAttempt?.quiz);

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-5 rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/student/code"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
              >
                <IoChevronBack size={24} />
              </Link>

              <div>
                <div className="mb-1 inline-flex rounded-md bg-[#EAF1FB] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#0D4598]">
                  Student Panel / Code Quiz
                </div>

                <h1 className="text-xl font-black text-[#151515]">
                  Test Result
                </h1>

                <p className="mt-1 text-sm text-[#7B8190]">
                  View your score, answer review and previous attempts.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={fetchData}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#DDE6F3] bg-white px-4 text-xs font-black text-[#0D4598] transition hover:bg-[#EAF1FB]"
              >
                <IoRefreshOutline size={17} />
                Refresh
              </button>

              {activeQuizId && (
                <Link
                  href={`/student/code/test?quizId=${activeQuizId}`}
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0D4598] px-4 text-xs font-black text-white transition hover:bg-[#083777]"
                >
                  <IoRepeatOutline size={16} />
                  Retry Test
                </Link>
              )}
            </div>
          </div>
        </header>

        {loading ? <LoadingBox /> : null}

        {!loading && error ? (
          <div className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
            <IoAlertCircleOutline size={22} />
            <span>{error}</span>
          </div>
        ) : null}

        {!loading && !error && !resultData ? (
          <div className="rounded-xl border border-dashed border-[#B8C7DD] bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF1FB] text-[#0D4598]">
              <IoBookOutline size={24} />
            </div>

            <h2 className="mt-4 text-lg font-black text-[#151515]">
              No result found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#7B8190]">
              No completed quiz result is available for this page.
            </p>

            <Link
              href="/student/code/simple-series-list"
              className="mt-4 inline-flex h-10 items-center rounded-lg bg-[#0D4598] px-5 text-xs font-black text-white transition hover:bg-[#083777]"
            >
              Take Quiz
            </Link>
          </div>
        ) : null}

        {!loading && !error && resultData ? (
          <>
            {/* Summary Cards */}
            <section className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              <ResultCard
                label="Score"
                value={`${resultData.score || 0}/${
                  resultData.totalQuestions || 0
                }`}
                icon={IoTrophyOutline}
              />
              <ResultCard
                label="Percentage"
                value={`${resultData.percentage || 0}%`}
                icon={IoStatsChartOutline}
              />
              <ResultCard
                label="Correct"
                value={resultData.correctCount || 0}
                tone="green"
                icon={IoCheckmarkCircleOutline}
              />
              <ResultCard
                label="Wrong"
                value={resultData.wrongCount || 0}
                tone="red"
                icon={IoCloseCircleOutline}
              />
            </section>

            {/* Result Status */}
            <section className="mb-4 rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-bold text-[#7B8190]">
                    {resultData.quiz?.title || "Quiz"}
                  </p>

                  <h2 className="mt-1 text-xl font-black text-[#151515]">
                    {resultData.passed ? "Passed" : "Need More Practice"}
                  </h2>

                  <p className="mt-1 text-sm text-[#7B8190]">
                    Result generated from your latest selected quiz attempt.
                  </p>
                </div>

                <StatusBadge passed={resultData.passed} />
              </div>
            </section>

            {/* Answer Review */}
            {review?.answers?.length > 0 && (
              <section className="mb-4 rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-black text-[#151515]">
                      Answer Review
                    </h2>
                    <p className="mt-1 text-sm text-[#7B8190]">
                      Check every answer with correct option and explanation.
                    </p>
                  </div>

                  <span className="rounded-lg bg-[#EAF1FB] px-3 py-2 text-xs font-black text-[#0D4598]">
                    {review.answers.length} Questions
                  </span>
                </div>

                <div className="space-y-3">
                  {review.answers.map((answer, index) => (
                    <AnswerReviewCard
                      key={index}
                      answer={answer}
                      index={index}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Previous Attempts */}
            <section className="rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-black text-[#151515]">
                    Previous Attempts
                  </h2>
                  <p className="mt-1 text-sm text-[#7B8190]">
                    Your previous quiz attempts and result history.
                  </p>
                </div>

                <span className="rounded-lg bg-[#F1F4F8] px-3 py-2 text-xs font-black text-[#667085]">
                  {filteredAttempts.length} Records
                </span>
              </div>

              {filteredAttempts.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#B8C7DD] bg-[#F8FAFD] p-6 text-center text-sm font-semibold text-[#7B8190]">
                  No previous attempt found.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-[#E5EAF2]">
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="bg-[#F8FAFD]">
                      <tr className="border-b border-[#E5EAF2]">
                        <th className="px-4 py-3 text-[11px] font-black uppercase tracking-wide text-[#7B8190]">
                          Quiz
                        </th>
                        <th className="px-4 py-3 text-[11px] font-black uppercase tracking-wide text-[#7B8190]">
                          Score
                        </th>
                        <th className="px-4 py-3 text-[11px] font-black uppercase tracking-wide text-[#7B8190]">
                          Percentage
                        </th>
                        <th className="px-4 py-3 text-[11px] font-black uppercase tracking-wide text-[#7B8190]">
                          Status
                        </th>
                        <th className="px-4 py-3 text-[11px] font-black uppercase tracking-wide text-[#7B8190]">
                          Date
                        </th>
                        <th className="px-4 py-3 text-right text-[11px] font-black uppercase tracking-wide text-[#7B8190]">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredAttempts.map((attempt) => (
                        <tr
                          key={attempt._id}
                          className="border-b border-[#E5EAF2] last:border-b-0 hover:bg-[#F8FAFD]"
                        >
                          <td className="px-4 py-3 font-bold text-[#151515]">
                            {attempt.quiz?.title || "Quiz"}
                          </td>

                          <td className="px-4 py-3 font-semibold text-[#151515]">
                            {attempt.score || 0}/{attempt.totalQuestions || 0}
                          </td>

                          <td className="px-4 py-3 font-semibold text-[#151515]">
                            {attempt.percentage || 0}%
                          </td>

                          <td className="px-4 py-3">
                            <StatusBadge passed={attempt.passed} />
                          </td>

                          <td className="px-4 py-3 font-medium text-[#7B8190]">
                            {formatDate(attempt.createdAt)}
                          </td>

                          <td className="px-4 py-3 text-right">
                            <Link
                              href={`/student/code/results?attemptId=${
                                attempt._id
                              }&quizId=${getQuizId(attempt.quiz)}`}
                              className="inline-flex h-9 items-center gap-1 rounded-lg border border-[#DDE6F3] bg-white px-3 text-xs font-black text-[#0D4598] transition hover:bg-[#EAF1FB]"
                            >
                              <IoEyeOutline size={15} />
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}
