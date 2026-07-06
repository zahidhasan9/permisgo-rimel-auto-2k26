// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import {
//   IoChevronBack,
//   IoAlertCircleOutline,
//   IoRefreshOutline,
// } from "react-icons/io5";
// import { getMyQuizAttempts } from "@/features/API";

// function formatDate(date) {
//   if (!date) return "Date not found";

//   return new Date(date).toLocaleString("en-US", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

// function getDuration(seconds) {
//   if (!seconds) return "-";

//   const min = Math.floor(seconds / 60);
//   const sec = seconds % 60;

//   if (min <= 0) return `${sec}s`;
//   return `${min}m ${sec}s`;
// }

// function StatusBadge({ passed }) {
//   return (
//     <span
//       className={`inline-flex h-7 items-center rounded-md px-3 text-[11px] font-black ${
//         passed ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
//       }`}
//     >
//       {passed ? "PASSED" : "FAILED"}
//     </span>
//   );
// }

// function SummaryBox({ label, value, tone = "default" }) {
//   const toneClass =
//     tone === "green"
//       ? "text-green-700"
//       : tone === "red"
//         ? "text-red-700"
//         : "text-[#0D4598]";

//   return (
//     <div className="rounded-lg border border-[#E5EAF2] bg-white px-4 py-3">
//       <p className="text-[10px] font-bold uppercase tracking-wide text-[#7B8190]">
//         {label}
//       </p>
//       <p className={`mt-1 text-lg font-black ${toneClass}`}>{value}</p>
//     </div>
//   );
// }

// function LoadingRow() {
//   return (
//     <div className="animate-pulse rounded-xl border border-[#E5EAF2] bg-white p-4">
//       <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//         <div className="flex-1">
//           <div className="h-4 w-2/5 rounded bg-slate-200" />
//           <div className="mt-3 h-3 w-1/3 rounded bg-slate-200" />
//         </div>

//         <div className="grid grid-cols-4 gap-2 md:w-[420px]">
//           <div className="h-12 rounded bg-slate-200" />
//           <div className="h-12 rounded bg-slate-200" />
//           <div className="h-12 rounded bg-slate-200" />
//           <div className="h-12 rounded bg-slate-200" />
//         </div>
//       </div>
//     </div>
//   );
// }

// function MiniStat({ label, value, tone = "default" }) {
//   const toneClass =
//     tone === "green"
//       ? "text-green-700"
//       : tone === "red"
//         ? "text-red-700"
//         : "text-[#151515]";

//   return (
//     <div className="rounded-lg border border-[#E5EAF2] bg-[#F8FAFD] px-3 py-2">
//       <p className="text-[10px] font-bold uppercase tracking-wide text-[#7B8190]">
//         {label}
//       </p>
//       <p className={`mt-0.5 text-sm font-black ${toneClass}`}>{value}</p>
//     </div>
//   );
// }

// function AttemptRow({ attempt, index }) {
//   const quizTitle = attempt.quiz?.title || "Code Quiz";
//   const quizId = attempt.quiz?._id;
//   const percentage = Number(attempt.percentage || 0);
//   const correct = attempt.correctCount || 0;
//   const wrong = attempt.wrongCount || 0;
//   const total = attempt.totalQuestions || correct + wrong || 0;
//   const duration = getDuration(attempt.durationSeconds);

//   return (
//     <div className="rounded-xl border border-[#E5EAF2] bg-white p-4 transition hover:border-[#0D4598]">
//       <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
//         <div className="flex min-w-0 flex-1 items-start gap-3">
//           <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-sm font-black text-[#0D4598]">
//             {String(index + 1).padStart(2, "0")}
//           </div>

//           <div className="min-w-0 flex-1">
//             <div className="flex flex-wrap items-center gap-2">
//               <h3 className="line-clamp-1 text-[16px] font-bold text-[#151515]">
//                 {quizTitle}
//               </h3>

//               <StatusBadge passed={attempt.passed} />
//             </div>

//             <p className="mt-1 text-sm font-medium text-[#7B8190]">
//               {formatDate(attempt.createdAt)}
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:w-[560px]">
//           <MiniStat label="Score" value={`${percentage}%`} />
//           <MiniStat label="Correct" value={correct} tone="green" />
//           <MiniStat label="Wrong" value={wrong} tone="red" />
//           <MiniStat label="Total" value={total} />
//           <MiniStat label="Time" value={duration} />
//         </div>

//         {quizId ? (
//           <Link
//             href={`/student/code/code-challenge?quizId=${quizId}`}
//             className="flex h-10 items-center justify-center rounded-lg bg-[#0D4598] px-4 text-xs font-black text-white transition hover:bg-[#083777] lg:w-[110px]"
//           >
//             Retake
//           </Link>
//         ) : (
//           <button
//             disabled
//             className="h-10 rounded-lg bg-gray-200 px-4 text-xs font-black text-gray-500 lg:w-[110px]"
//           >
//             Retake
//           </button>
//         )}
//       </div>

//       <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#EDF1F7]">
//         <div
//           className={`h-full rounded-full ${
//             attempt.passed ? "bg-green-600" : "bg-red-600"
//           }`}
//           style={{ width: `${Math.min(percentage, 100)}%` }}
//         />
//       </div>
//     </div>
//   );
// }

// export default function MyHistoryPage() {
//   const [attempts, setAttempts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const loadHistory = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await getMyQuizAttempts();
//       setAttempts(res.data?.data || []);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           err.message ||
//           "Failed to load quiz history",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadHistory();
//   }, []);

//   const summary = useMemo(() => {
//     const totalAttempts = attempts.length;
//     const passedCount = attempts.filter((item) => item.passed).length;
//     const failedCount = totalAttempts - passedCount;

//     const averageScore =
//       totalAttempts > 0
//         ? Math.round(
//             attempts.reduce(
//               (sum, item) => sum + Number(item.percentage || 0),
//               0,
//             ) / totalAttempts,
//           )
//         : 0;

//     return {
//       totalAttempts,
//       passedCount,
//       failedCount,
//       averageScore,
//     };
//   }, [attempts]);

//   return (
//     <main className="min-h-screen bg-[#F7F9FC] px-4 py-5 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-6xl">
//         <header className="mb-5 rounded-xl border border-[#E5EAF2] bg-white p-4">
//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex items-center gap-3">
//               <Link
//                 href="/student/code"
//                 className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
//               >
//                 <IoChevronBack size={24} />
//               </Link>

//               <div>
//                 <h1 className="text-xl font-bold text-[#151515]">My History</h1>
//                 <p className="mt-1 text-sm text-[#7B8190]">
//                   Your quiz attempts, scores and pass/fail records.
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               <button
//                 type="button"
//                 onClick={loadHistory}
//                 className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#DDE6F3] bg-white px-4 text-xs font-black text-[#0D4598] transition hover:bg-[#EAF1FB]"
//               >
//                 <IoRefreshOutline size={17} />
//                 Refresh
//               </button>

//               <Link
//                 href="/student/code/simple-series-list"
//                 className="inline-flex h-10 items-center rounded-lg bg-[#0D4598] px-4 text-xs font-black text-white transition hover:bg-[#083777]"
//               >
//                 Take Quiz
//               </Link>
//             </div>
//           </div>
//         </header>

//         <section className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
//           <SummaryBox label="Total Attempts" value={summary.totalAttempts} />
//           <SummaryBox
//             label="Average Score"
//             value={`${summary.averageScore}%`}
//           />
//           <SummaryBox label="Passed" value={summary.passedCount} tone="green" />
//           <SummaryBox label="Failed" value={summary.failedCount} tone="red" />
//         </section>

//         {loading ? (
//           <div className="space-y-3">
//             <LoadingRow />
//             <LoadingRow />
//             <LoadingRow />
//           </div>
//         ) : null}

//         {error ? (
//           <div className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
//             <IoAlertCircleOutline size={22} />
//             <span>{error}</span>
//           </div>
//         ) : null}

//         {!loading && !error && attempts.length === 0 ? (
//           <div className="rounded-xl border border-dashed border-[#B8C7DD] bg-white p-8 text-center">
//             <h2 className="text-lg font-bold text-[#151515]">
//               No quiz record found
//             </h2>

//             <p className="mt-2 text-sm text-[#7B8190]">
//               You have not participated in any quiz yet.
//             </p>

//             <Link
//               href="/student/code/simple-series-list"
//               className="mt-4 inline-flex h-10 items-center rounded-lg bg-[#0D4598] px-5 text-xs font-black text-white"
//             >
//               Start First Quiz
//             </Link>
//           </div>
//         ) : null}

//         {!loading && !error && attempts.length > 0 ? (
//           <section className="space-y-3">
//             {attempts.map((attempt, index) => (
//               <AttemptRow key={attempt._id} attempt={attempt} index={index} />
//             ))}
//           </section>
//         ) : null}
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  IoChevronBack,
  IoAlertCircleOutline,
  IoRefreshOutline,
} from "react-icons/io5";
import { getMyQuizAttempts } from "@/features/API";

function formatDate(date) {
  if (!date) return "Date not found";

  return new Date(date).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getDuration(seconds) {
  if (!seconds) return "-";

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  if (min <= 0) return `${sec}s`;
  return `${min}m ${sec}s`;
}

function StatusBadge({ passed }) {
  return (
    <span
      className={`inline-flex h-7 items-center rounded-md px-3 text-[11px] font-black ${
        passed ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
      }`}
    >
      {passed ? "PASSED" : "FAILED"}
    </span>
  );
}

function SummaryBox({ label, value, tone = "default" }) {
  const toneClass =
    tone === "green"
      ? "text-green-700"
      : tone === "red"
        ? "text-red-700"
        : "text-[#0D4598]";

  return (
    <div className="rounded-lg border border-[#E5EAF2] bg-white px-4 py-3">
      <p className="text-[10px] font-bold uppercase tracking-wide text-[#7B8190]">
        {label}
      </p>
      <p className={`mt-1 text-lg font-black ${toneClass}`}>{value}</p>
    </div>
  );
}

function LoadingRow() {
  return (
    <div className="animate-pulse rounded-xl border border-[#E5EAF2] bg-white p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <div className="h-4 w-2/5 rounded bg-slate-200" />
          <div className="mt-3 h-3 w-1/3 rounded bg-slate-200" />
        </div>

        <div className="grid grid-cols-4 gap-2 md:w-[420px]">
          <div className="h-12 rounded bg-slate-200" />
          <div className="h-12 rounded bg-slate-200" />
          <div className="h-12 rounded bg-slate-200" />
          <div className="h-12 rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value, tone = "default" }) {
  const toneClass =
    tone === "green"
      ? "text-green-700"
      : tone === "red"
        ? "text-red-700"
        : "text-[#151515]";

  return (
    <div className="rounded-lg border border-[#E5EAF2] bg-[#F8FAFD] px-3 py-2">
      <p className="text-[10px] font-bold uppercase tracking-wide text-[#7B8190]">
        {label}
      </p>
      <p className={`mt-0.5 text-sm font-black ${toneClass}`}>{value}</p>
    </div>
  );
}

function AttemptRow({ attempt, index }) {
  const quizTitle = attempt.quiz?.title || "Code Quiz";
  const quizId = attempt.quiz?._id;
  const percentage = Number(attempt.percentage || 0);
  const correct = attempt.correctCount || 0;
  const wrong = attempt.wrongCount || 0;
  const total = attempt.totalQuestions || correct + wrong || 0;
  const duration = getDuration(attempt.durationSeconds);

  return (
    <div className="rounded-xl border border-[#E5EAF2] bg-white p-4 transition hover:border-[#0D4598]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-sm font-black text-[#0D4598]">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="line-clamp-1 text-[16px] font-bold text-[#151515]">
                {quizTitle}
              </h3>

              <StatusBadge passed={attempt.passed} />
            </div>

            <p className="mt-1 text-sm font-medium text-[#7B8190]">
              {formatDate(attempt.createdAt)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:w-[560px]">
          <MiniStat label="Score" value={`${percentage}%`} />
          <MiniStat label="Correct" value={correct} tone="green" />
          <MiniStat label="Wrong" value={wrong} tone="red" />
          <MiniStat label="Total" value={total} />
          <MiniStat label="Time" value={duration} />
        </div>

        {quizId ? (
          <Link
            href={`/student/code/code-challenge?quizId=${quizId}`}
            className="flex h-10 items-center justify-center rounded-lg bg-[#0D4598] px-4 text-xs font-black text-white transition hover:bg-[#083777] lg:w-[110px]"
          >
            Retake
          </Link>
        ) : (
          <button
            disabled
            className="h-10 rounded-lg bg-gray-200 px-4 text-xs font-black text-gray-500 lg:w-[110px]"
          >
            Retake
          </button>
        )}
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#EDF1F7]">
        <div
          className={`h-full rounded-full ${
            attempt.passed ? "bg-green-600" : "bg-red-600"
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  startItem,
  endItem,
  totalItems,
  perPage,
  onPerPageChange,
}) {
  if (totalItems === 0) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="mt-4 rounded-xl border border-[#E5EAF2] bg-white p-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-semibold text-[#7B8190]">
          Showing <span className="font-black text-[#151515]">{startItem}</span>
          -<span className="font-black text-[#151515]">{endItem}</span> of{" "}
          <span className="font-black text-[#151515]">{totalItems}</span>{" "}
          records
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={perPage}
            onChange={(event) => onPerPageChange(Number(event.target.value))}
            className="h-9 rounded-lg border border-[#DDE6F3] bg-white px-3 text-xs font-bold text-[#151515] outline-none focus:border-[#0D4598]"
          >
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
          </select>

          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="h-9 rounded-lg border border-[#DDE6F3] bg-white px-3 text-xs font-black text-[#0D4598] transition hover:bg-[#EAF1FB] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Prev
          </button>

          <div className="flex items-center gap-1">
            {pages.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={`h-9 min-w-9 rounded-lg px-3 text-xs font-black transition ${
                  currentPage === page
                    ? "bg-[#0D4598] text-white"
                    : "border border-[#DDE6F3] bg-white text-[#0D4598] hover:bg-[#EAF1FB]"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="h-9 rounded-lg border border-[#DDE6F3] bg-white px-3 text-xs font-black text-[#0D4598] transition hover:bg-[#EAF1FB] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MyHistoryPage() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getMyQuizAttempts();
      setAttempts(res.data?.data || []);
      setCurrentPage(1);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load quiz history",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const sortedAttempts = useMemo(() => {
    return [...attempts].sort((a, b) => {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [attempts]);

  const summary = useMemo(() => {
    const totalAttempts = attempts.length;
    const passedCount = attempts.filter((item) => item.passed).length;
    const failedCount = totalAttempts - passedCount;

    const averageScore =
      totalAttempts > 0
        ? Math.round(
            attempts.reduce(
              (sum, item) => sum + Number(item.percentage || 0),
              0,
            ) / totalAttempts,
          )
        : 0;

    return {
      totalAttempts,
      passedCount,
      failedCount,
      averageScore,
    };
  }, [attempts]);

  const totalPages = Math.max(Math.ceil(sortedAttempts.length / perPage), 1);
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  const paginatedAttempts = sortedAttempts.slice(startIndex, endIndex);

  const startItem = sortedAttempts.length === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(endIndex, sortedAttempts.length);

  const handlePerPageChange = (value) => {
    setPerPage(value);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-5 rounded-xl border border-[#E5EAF2] bg-white p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/student/code"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
              >
                <IoChevronBack size={24} />
              </Link>

              <div>
                <h1 className="text-xl font-bold text-[#151515]">My History</h1>
                <p className="mt-1 text-sm text-[#7B8190]">
                  Your quiz attempts, scores and pass/fail records.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={loadHistory}
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

        <section className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          <SummaryBox label="Total Attempts" value={summary.totalAttempts} />
          <SummaryBox
            label="Average Score"
            value={`${summary.averageScore}%`}
          />
          <SummaryBox label="Passed" value={summary.passedCount} tone="green" />
          <SummaryBox label="Failed" value={summary.failedCount} tone="red" />
        </section>

        {loading ? (
          <div className="space-y-3">
            <LoadingRow />
            <LoadingRow />
            <LoadingRow />
          </div>
        ) : null}

        {error ? (
          <div className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
            <IoAlertCircleOutline size={22} />
            <span>{error}</span>
          </div>
        ) : null}

        {!loading && !error && attempts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#B8C7DD] bg-white p-8 text-center">
            <h2 className="text-lg font-bold text-[#151515]">
              No quiz record found
            </h2>

            <p className="mt-2 text-sm text-[#7B8190]">
              You have not participated in any quiz yet.
            </p>

            <Link
              href="/student/code/simple-series-list"
              className="mt-4 inline-flex h-10 items-center rounded-lg bg-[#0D4598] px-5 text-xs font-black text-white"
            >
              Start First Quiz
            </Link>
          </div>
        ) : null}

        {!loading && !error && attempts.length > 0 ? (
          <>
            <section className="space-y-3">
              {paginatedAttempts.map((attempt, index) => (
                <AttemptRow
                  key={attempt._id}
                  attempt={attempt}
                  index={startIndex + index}
                />
              ))}
            </section>

            <Pagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              startItem={startItem}
              endItem={endItem}
              totalItems={sortedAttempts.length}
              perPage={perPage}
              onPerPageChange={handlePerPageChange}
            />
          </>
        ) : null}
      </div>
    </main>
  );
}
