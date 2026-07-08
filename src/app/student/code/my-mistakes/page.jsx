// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { getCodeQuizAttemptReview, getMyQuizAttempts } from "@/features/API";

// const getFullFileUrl = (path) => {
//   if (!path) return "";
//   if (path.startsWith("http")) return path;

//   const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
//   const rootUrl = apiUrl.replace("/api", "");

//   return `${rootUrl}${path}`;
// };

// export default function MyMistakesPage() {
//   const [mistakes, setMistakes] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchMistakes = async () => {
//     try {
//       setLoading(true);

//       const attemptsRes = await getMyQuizAttempts();
//       const attempts = attemptsRes?.data?.data || [];

//       const completedAttempts = attempts.filter(
//         (attempt) => attempt.status === "completed" && attempt.wrongCount > 0,
//       );

//       const reviewResponses = await Promise.all(
//         completedAttempts.map((attempt) =>
//           getCodeQuizAttemptReview(attempt._id).catch(() => null),
//         ),
//       );

//       const allMistakes = [];

//       reviewResponses.forEach((res) => {
//         const review = res?.data?.data;
//         if (!review) return;

//         review.answers?.forEach((answer) => {
//           if (answer.isCorrect) return;

//           const question = answer.question;
//           const selectedOption =
//             question?.options?.[answer.selectedOptionIndex];
//           const correctOption = question?.options?.[answer.correctOptionIndex];

//           allMistakes.push({
//             id: `${review._id}-${question?._id}`,
//             attemptId: review._id,
//             quizId:
//               typeof review.quiz === "object" ? review.quiz?._id : review.quiz,
//             quizTitle: review.quiz?.title || "Quiz",
//             question,
//             selectedOption,
//             correctOption,
//             createdAt: review.finishedAt || review.createdAt,
//           });
//         });
//       });

//       setMistakes(allMistakes);
//     } catch (error) {
//       alert(error?.response?.data?.message || "Failed to load mistakes");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMistakes();
//   }, []);

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
//                 My Mistakes
//               </h1>
//               <p className="mt-2 text-sm text-slate-500">
//                 Test-e je question ভুল হয়েছে, সেগুলো এখানে দেখাবে। এখান থেকে
//                 revise করে আবার retry দিতে পারবেন।
//               </p>
//             </div>

//             <button
//               onClick={fetchMistakes}
//               className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
//             >
//               Refresh
//             </button>
//           </div>
//         </div>

//         {loading ? (
//           <div className="rounded-3xl bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
//             Loading mistakes...
//           </div>
//         ) : mistakes.length === 0 ? (
//           <div className="rounded-3xl bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
//             No mistake found. Test দিলে wrong answers এখানে show করবে।
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {mistakes.map((item, index) => (
//               <div key={item.id} className="rounded-3xl bg-white p-5 shadow-sm">
//                 <div className="mb-3 flex flex-wrap gap-2">
//                   <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-500">
//                     Wrong Answer
//                   </span>

//                   <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
//                     {item.quizTitle}
//                   </span>

//                   {item.question?.topic && (
//                     <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
//                       {item.question.topic}
//                     </span>
//                   )}
//                 </div>

//                 <h2 className="text-base font-black text-slate-900">
//                   {index + 1}. {item.question?.questionText}
//                 </h2>

//                 {item.question?.questionImage && (
//                   <img
//                     src={getFullFileUrl(item.question.questionImage)}
//                     alt="Question"
//                     className="mt-4 max-h-52 rounded-2xl object-contain"
//                   />
//                 )}

//                 <div className="mt-4 grid gap-3 md:grid-cols-2">
//                   <div className="rounded-2xl bg-red-50 p-4">
//                     <p className="text-xs font-black text-red-500">
//                       Your Answer
//                     </p>
//                     <p className="mt-1 text-sm font-semibold text-slate-800">
//                       {item.selectedOption?.text || "-"}
//                     </p>
//                   </div>

//                   <div className="rounded-2xl bg-green-50 p-4">
//                     <p className="text-xs font-black text-green-600">
//                       Correct Answer
//                     </p>
//                     <p className="mt-1 text-sm font-semibold text-slate-800">
//                       {item.correctOption?.text || "-"}
//                     </p>
//                   </div>
//                 </div>

//                 {item.question?.explanationText && (
//                   <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
//                     <span className="font-black text-slate-900">
//                       Explanation:
//                     </span>{" "}
//                     {item.question.explanationText}
//                   </div>
//                 )}

//                 <div className="mt-5 flex flex-wrap gap-3">
//                   <Link
//                     href={`/student/code/results?attemptId=${item.attemptId}&quizId=${item.quizId}`}
//                     className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
//                   >
//                     View Full Review
//                   </Link>

//                   {item.quizId && (
//                     <Link
//                       href={`/student/code/test?quizId=${item.quizId}`}
//                       className="rounded-2xl bg-red-500 px-5 py-3 text-sm font-bold text-white"
//                     >
//                       Retry Test
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  IoAlertCircleOutline,
  IoBookOutline,
  IoChevronBack,
  IoCloseCircleOutline,
  IoRefreshOutline,
  IoRepeatOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { getCodeQuizAttemptReview, getMyQuizAttempts } from "@/features/API";

const getFullFileUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const rootUrl = apiUrl.replace("/api", "");

  return `${rootUrl}${path}`;
};

const formatDate = (date) => {
  if (!date) return "Date not found";

  return new Date(date).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function SummaryBox({ label, value, tone = "default" }) {
  const toneClass =
    tone === "red"
      ? "text-red-700"
      : tone === "green"
        ? "text-green-700"
        : "text-[#0D4598]";

  return (
    <div className="rounded-xl border border-[#E5EAF2] bg-white px-4 py-3 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-wide text-[#7B8190]">
        {label}
      </p>
      <p className={`mt-1 text-lg font-black ${toneClass}`}>{value}</p>
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="animate-pulse rounded-xl border border-[#E5EAF2] bg-white p-4">
      <div className="mb-4 flex gap-2">
        <div className="h-6 w-24 rounded-full bg-slate-200" />
        <div className="h-6 w-32 rounded-full bg-slate-200" />
      </div>

      <div className="h-4 w-4/5 rounded bg-slate-200" />
      <div className="mt-3 h-4 w-2/3 rounded bg-slate-200" />

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="h-20 rounded-xl bg-slate-200" />
        <div className="h-20 rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}

function MistakeCard({ item, index }) {
  return (
    <div className="rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm transition hover:border-[#0D4598]">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex h-7 items-center gap-1 rounded-md bg-red-50 px-3 text-[11px] font-black text-red-700">
          <IoCloseCircleOutline size={15} />
          Wrong Answer
        </span>

        <span className="inline-flex h-7 items-center rounded-md bg-[#EAF1FB] px-3 text-[11px] font-black text-[#0D4598]">
          {item.quizTitle}
        </span>

        {item.question?.topic && (
          <span className="inline-flex h-7 items-center rounded-md bg-[#F1F4F8] px-3 text-[11px] font-black text-[#667085]">
            {item.question.topic}
          </span>
        )}

        <span className="ml-auto text-xs font-semibold text-[#7B8190]">
          {formatDate(item.createdAt)}
        </span>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-sm font-black text-[#0D4598]">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-[15px] font-black leading-6 text-[#151515]">
            {item.question?.questionText || "Question not found"}
          </h2>

          {item.question?.questionImage && (
            <div className="mt-3 rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] p-3">
              <img
                src={getFullFileUrl(item.question.questionImage)}
                alt="Question"
                className="max-h-44 rounded-lg object-contain"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-red-100 bg-red-50 p-4">
          <p className="text-[11px] font-black uppercase tracking-wide text-red-600">
            Your Answer
          </p>
          <p className="mt-1 text-sm font-semibold leading-6 text-[#151515]">
            {item.selectedOption?.text || "-"}
          </p>
        </div>

        <div className="rounded-xl border border-green-100 bg-green-50 p-4">
          <p className="text-[11px] font-black uppercase tracking-wide text-green-700">
            Correct Answer
          </p>
          <p className="mt-1 text-sm font-semibold leading-6 text-[#151515]">
            {item.correctOption?.text || "-"}
          </p>
        </div>
      </div>

      {item.question?.explanationText && (
        <div className="mt-3 rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] p-4 text-sm leading-6 text-[#667085]">
          <span className="font-black text-[#151515]">Explanation:</span>{" "}
          {item.question.explanationText}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={`/student/code/results?attemptId=${item.attemptId}&quizId=${item.quizId}`}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-[#0D4598] px-4 text-xs font-black text-white transition hover:bg-[#083777]"
        >
          View Full Review
        </Link>

        {item.quizId && (
          <Link
            href={`/student/code/test?quizId=${item.quizId}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#DDE6F3] bg-white px-4 text-xs font-black text-[#0D4598] transition hover:bg-[#EAF1FB]"
          >
            <IoRepeatOutline size={16} />
            Retry Test
          </Link>
        )}
      </div>
    </div>
  );
}

export default function MyMistakesPage() {
  const [mistakes, setMistakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMistakes = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const attemptsRes = await getMyQuizAttempts();
      const attempts = attemptsRes?.data?.data || [];

      const completedAttempts = attempts.filter(
        (attempt) => attempt.status === "completed" && attempt.wrongCount > 0,
      );

      const reviewResponses = await Promise.all(
        completedAttempts.map((attempt) =>
          getCodeQuizAttemptReview(attempt._id).catch(() => null),
        ),
      );

      const allMistakes = [];

      reviewResponses.forEach((res) => {
        const review = res?.data?.data;
        if (!review) return;

        review.answers?.forEach((answer) => {
          if (answer.isCorrect) return;

          const question = answer.question;
          const selectedOption =
            question?.options?.[answer.selectedOptionIndex];
          const correctOption = question?.options?.[answer.correctOptionIndex];

          allMistakes.push({
            id: `${review._id}-${question?._id}`,
            attemptId: review._id,
            quizId:
              typeof review.quiz === "object" ? review.quiz?._id : review.quiz,
            quizTitle: review.quiz?.title || "Quiz",
            question,
            selectedOption,
            correctOption,
            createdAt: review.finishedAt || review.createdAt,
          });
        });
      });

      setMistakes(allMistakes);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Failed to load mistakes",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMistakes();
  }, [fetchMistakes]);

  const summary = useMemo(() => {
    const totalMistakes = mistakes.length;

    const uniqueQuizzes = new Set(
      mistakes.map((item) => item.quizId).filter(Boolean),
    ).size;

    const topics = new Set(
      mistakes.map((item) => item.question?.topic).filter(Boolean),
    ).size;

    return {
      totalMistakes,
      uniqueQuizzes,
      topics,
    };
  }, [mistakes]);

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
                  My Mistakes
                </h1>

                <p className="mt-1 text-sm text-[#7B8190]">
                  Review your wrong answers, understand mistakes and retry
                  tests.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={fetchMistakes}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#DDE6F3] bg-white px-4 text-xs font-black text-[#0D4598] transition hover:bg-[#EAF1FB]"
              >
                <IoRefreshOutline size={17} />
                Refresh
              </button>

              <Link
                href="/student/code/simple-series-list"
                className="inline-flex h-10 items-center rounded-lg bg-[#0D4598] px-4 text-xs font-black text-white transition hover:bg-[#083777]"
              >
                Take Quiz
              </Link>
            </div>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <SummaryBox
            label="Total Mistakes"
            value={summary.totalMistakes}
            tone="red"
          />
          <SummaryBox
            label="Quiz With Mistakes"
            value={summary.uniqueQuizzes}
          />
          <SummaryBox label="Topics Found" value={summary.topics} />
        </section>

        {/* Loading */}
        {loading ? (
          <section className="space-y-3">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </section>
        ) : null}

        {/* Error */}
        {!loading && error ? (
          <div className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
            <IoAlertCircleOutline size={22} />
            <span>{error}</span>
          </div>
        ) : null}

        {/* Empty State */}
        {!loading && !error && mistakes.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#B8C7DD] bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF1FB] text-[#0D4598]">
              <IoSearchOutline size={24} />
            </div>

            <h2 className="mt-4 text-lg font-black text-[#151515]">
              No mistake found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#7B8190]">
              You have no wrong answers yet. After completing a test, wrong
              answers will appear here for revision.
            </p>

            <Link
              href="/student/code/simple-series-list"
              className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-[#0D4598] px-5 text-xs font-black text-white transition hover:bg-[#083777]"
            >
              <IoBookOutline size={16} />
              Start First Quiz
            </Link>
          </div>
        ) : null}

        {/* Mistakes List */}
        {!loading && !error && mistakes.length > 0 ? (
          <section className="space-y-3">
            {mistakes.map((item, index) => (
              <MistakeCard key={item.id} item={item} index={index} />
            ))}
          </section>
        ) : null}
      </div>
    </main>
  );
}
