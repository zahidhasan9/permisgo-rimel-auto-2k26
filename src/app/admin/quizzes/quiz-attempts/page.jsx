// "use client";

// import Link from "next/link";
// import { useEffect, useMemo, useState } from "react";
// import {
//   FaBookOpen,
//   FaCalendarAlt,
//   FaChartLine,
//   FaCheckCircle,
//   FaChevronRight,
//   FaClock,
//   FaEnvelope,
//   FaExclamationTriangle,
//   FaEye,
//   FaFilter,
//   FaGraduationCap,
//   FaSearch,
//   FaSyncAlt,
//   FaTimesCircle,
//   FaTrophy,
//   FaUsers,
// } from "react-icons/fa";
// import { getAdminQuizAttempts } from "@/features/API";

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

// const formatType = (type = "") =>
//   type
//     .split("_")
//     .filter(Boolean)
//     .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
//     .join(" ");

// const getResultLabel = (attempt) => {
//   if (attempt.status !== "completed") return "In Progress";
//   return attempt.passed ? "Passed" : "Failed";
// };

// function getMessage(error) {
//   return (
//     error?.response?.data?.message ||
//     error?.message ||
//     "Failed to load quiz attempts."
//   );
// }

// function getInitials(name = "Student") {
//   return name
//     .split(" ")
//     .map((item) => item?.[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();
// }

// function Badge({ children, tone = "slate" }) {
//   const toneClass =
//     tone === "green"
//       ? "border-emerald-200 bg-emerald-50 text-emerald-700"
//       : tone === "red"
//         ? "border-rose-200 bg-rose-50 text-rose-700"
//         : tone === "amber"
//           ? "border-amber-200 bg-amber-50 text-amber-700"
//           : tone === "sky"
//             ? "border-sky-200 bg-sky-50 text-sky-700"
//             : tone === "violet"
//               ? "border-violet-200 bg-violet-50 text-violet-700"
//               : "border-slate-200 bg-slate-50 text-slate-600";

//   return (
//     <span
//       className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-bold capitalize ${toneClass}`}
//     >
//       {children}
//     </span>
//   );
// }

// function getResultTone(attempt) {
//   if (attempt.status !== "completed") return "amber";
//   return attempt.passed ? "green" : "red";
// }

// function getStatusTone(status) {
//   if (status === "completed") return "green";
//   if (status === "started") return "amber";
//   return "slate";
// }

// function StatCard({ title, value, note, icon: Icon, tone = "violet" }) {
//   const toneClass =
//     tone === "green"
//       ? "bg-emerald-50 text-emerald-600"
//       : tone === "red"
//         ? "bg-rose-50 text-rose-600"
//         : tone === "amber"
//           ? "bg-amber-50 text-amber-600"
//           : tone === "sky"
//             ? "bg-sky-50 text-sky-600"
//             : "bg-violet-50 text-violet-600";

//   return (
//     <div className="group rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
//       <div className="flex items-start justify-between gap-4">
//         <div>
//           <p className="text-sm font-semibold text-slate-500">{title}</p>

//           <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
//             {value}
//           </h3>

//           <p className="mt-2 text-xs font-medium text-slate-400">{note}</p>
//         </div>

//         <div
//           className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${toneClass}`}
//         >
//           <Icon className="text-lg" />
//         </div>
//       </div>
//     </div>
//   );
// }

// function EmptyState() {
//   return (
//     <div className="flex min-h-[340px] items-center justify-center p-6 text-center">
//       <div>
//         <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
//           <FaGraduationCap className="text-2xl" />
//         </div>

//         <h3 className="text-lg font-bold text-slate-900">No attempts found</h3>

//         <p className="mt-2 max-w-sm text-sm font-medium text-slate-400">
//           Try changing your search keyword, status or result filter.
//         </p>
//       </div>
//     </div>
//   );
// }

// function LoadingRows() {
//   return (
//     <>
//       {[1, 2, 3, 4, 5].map((item) => (
//         <tr key={item}>
//           <td colSpan="9" className="px-5 py-4">
//             <div className="h-16 animate-pulse rounded-2xl bg-slate-100" />
//           </td>
//         </tr>
//       ))}
//     </>
//   );
// }

// export default function AdminQuizAttemptsPage() {
//   const [attempts, setAttempts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [resultFilter, setResultFilter] = useState("all");

//   const loadAttempts = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await getAdminQuizAttempts();
//       setAttempts(res.data?.data || []);
//     } catch (err) {
//       setError(getMessage(err));
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadAttempts();
//   }, []);

//   const filteredAttempts = useMemo(() => {
//     const keyword = search.trim().toLowerCase();

//     return attempts.filter((attempt) => {
//       const studentName = attempt.student?.name?.toLowerCase() || "";
//       const studentEmail = attempt.student?.email?.toLowerCase() || "";
//       const quizTitle = attempt.quiz?.title?.toLowerCase() || "";
//       const quizType = attempt.quiz?.type?.toLowerCase() || "";

//       const matchesSearch =
//         !keyword ||
//         studentName.includes(keyword) ||
//         studentEmail.includes(keyword) ||
//         quizTitle.includes(keyword) ||
//         quizType.includes(keyword);

//       const matchesStatus =
//         statusFilter === "all" || attempt.status === statusFilter;

//       let matchesResult = true;

//       if (resultFilter === "passed") {
//         matchesResult = attempt.status === "completed" && attempt.passed;
//       }

//       if (resultFilter === "failed") {
//         matchesResult = attempt.status === "completed" && !attempt.passed;
//       }

//       if (resultFilter === "in_progress") {
//         matchesResult = attempt.status !== "completed";
//       }

//       return matchesSearch && matchesStatus && matchesResult;
//     });
//   }, [attempts, search, statusFilter, resultFilter]);

//   const stats = useMemo(() => {
//     const total = attempts.length;

//     const completed = attempts.filter(
//       (attempt) => attempt.status === "completed",
//     ).length;

//     const passed = attempts.filter(
//       (attempt) => attempt.status === "completed" && attempt.passed,
//     ).length;

//     const failed = attempts.filter(
//       (attempt) => attempt.status === "completed" && !attempt.passed,
//     ).length;

//     const completedAttempts = attempts.filter(
//       (attempt) => attempt.status === "completed",
//     );

//     const averagePercentage =
//       completedAttempts.length > 0
//         ? Math.round(
//             completedAttempts.reduce(
//               (sum, attempt) => sum + Number(attempt.percentage || 0),
//               0,
//             ) / completedAttempts.length,
//           )
//         : 0;

//     return {
//       total,
//       completed,
//       passed,
//       failed,
//       averagePercentage,
//     };
//   }, [attempts]);

//   const activeFilterCount = useMemo(() => {
//     let count = 0;
//     if (search.trim()) count += 1;
//     if (statusFilter !== "all") count += 1;
//     if (resultFilter !== "all") count += 1;
//     return count;
//   }, [search, statusFilter, resultFilter]);

//   const handleReset = () => {
//     setSearch("");
//     setStatusFilter("all");
//     setResultFilter("all");
//   };

//   return (
//     <section className="min-h-screen bg-[#f8f8fb] px-4 py-5 md:px-6 lg:px-8">
//       <div className="mx-auto max-w-[1500px]">
//         <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
//           <div>
//             <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-400">
//               <span>Admin</span>
//               <span>/</span>
//               <span>Quizzes</span>
//               <span>/</span>
//               <span className="text-slate-600">Quiz Attempts</span>
//             </div>

//             <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
//               Quiz Attempts
//             </h1>

//             <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
//               See student quiz attempts, scores, pass or fail results and review
//               submitted answers from one clean admin table.
//             </p>
//           </div>

//           <button
//             onClick={loadAttempts}
//             disabled={loading}
//             className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
//           >
//             <FaSyncAlt className={loading ? "animate-spin" : ""} />
//             Refresh
//           </button>
//         </div>

//         <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
//           <StatCard
//             title="Total Attempts"
//             value={loading ? "..." : stats.total}
//             note="All submitted attempts"
//             icon={FaUsers}
//             tone="violet"
//           />

//           <StatCard
//             title="Completed"
//             value={loading ? "..." : stats.completed}
//             note="Finished attempts"
//             icon={FaCheckCircle}
//             tone="sky"
//           />

//           <StatCard
//             title="Passed"
//             value={loading ? "..." : stats.passed}
//             note="Successful attempts"
//             icon={FaTrophy}
//             tone="green"
//           />

//           <StatCard
//             title="Failed"
//             value={loading ? "..." : stats.failed}
//             note="Unsuccessful attempts"
//             icon={FaTimesCircle}
//             tone="red"
//           />

//           <StatCard
//             title="Avg Score"
//             value={loading ? "..." : `${stats.averagePercentage}%`}
//             note="Average completed score"
//             icon={FaChartLine}
//             tone="amber"
//           />
//         </div>

//         <div className="mb-6 rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
//           <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
//             <div className="flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
//                 <FaFilter />
//               </div>

//               <div>
//                 <h2 className="text-base font-bold text-slate-900">
//                   Filter Attempts
//                 </h2>

//                 <p className="text-xs font-medium text-slate-400">
//                   {activeFilterCount > 0
//                     ? `${activeFilterCount} filter active`
//                     : "Search and filter student attempt records"}
//                 </p>
//               </div>
//             </div>

//             <button
//               onClick={handleReset}
//               className="w-fit rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
//             >
//               Clear Filters
//             </button>
//           </div>

//           <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px]">
//             <div className="relative">
//               <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search student, email, quiz..."
//                 className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8f8fb] pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"
//               />
//             </div>

//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="h-12 rounded-2xl border border-slate-200 bg-[#f8f8fb] px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"
//             >
//               <option value="all">All Status</option>
//               <option value="started">Started</option>
//               <option value="completed">Completed</option>
//             </select>

//             <select
//               value={resultFilter}
//               onChange={(e) => setResultFilter(e.target.value)}
//               className="h-12 rounded-2xl border border-slate-200 bg-[#f8f8fb] px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"
//             >
//               <option value="all">All Results</option>
//               <option value="passed">Passed</option>
//               <option value="failed">Failed</option>
//               <option value="in_progress">In Progress</option>
//             </select>
//           </div>
//         </div>

//         {error && (
//           <div className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
//             <FaExclamationTriangle className="mt-0.5 shrink-0" />
//             <span>{error}</span>
//           </div>
//         )}

//         <div className="overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
//           <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-5 md:flex-row md:items-center">
//             <div>
//               <h2 className="text-lg font-bold text-slate-900">
//                 All Quiz Attempts
//               </h2>

//               <p className="mt-1 text-sm font-medium text-slate-400">
//                 Showing {filteredAttempts.length} of {attempts.length} attempts
//               </p>
//             </div>

//             <div className="flex flex-wrap items-center gap-2">
//               <Badge tone="violet">{stats.completed} completed</Badge>
//               <Badge tone="green">{stats.passed} passed</Badge>
//               <Badge tone="red">{stats.failed} failed</Badge>
//             </div>
//           </div>

//           <div className="hidden overflow-x-auto xl:block">
//             <table className="w-full min-w-[1160px] text-left">
//               <thead>
//                 <tr className="border-b border-slate-100 bg-[#fbfbfd]">
//                   <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
//                     Student
//                   </th>
//                   <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
//                     Quiz
//                   </th>
//                   <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
//                     Score
//                   </th>
//                   <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
//                     Correct
//                   </th>
//                   <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
//                     Wrong
//                   </th>
//                   <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
//                     Result
//                   </th>
//                   <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
//                     Status
//                   </th>
//                   <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
//                     Date
//                   </th>
//                   <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-400">
//                     Action
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-slate-100">
//                 {loading ? (
//                   <LoadingRows />
//                 ) : filteredAttempts.length ? (
//                   filteredAttempts.map((attempt) => {
//                     const studentName =
//                       attempt.student?.name || "Unknown Student";

//                     return (
//                       <tr
//                         key={attempt._id}
//                         className="transition duration-200 hover:bg-[#fbfbfd]"
//                       >
//                         <td className="px-5 py-4">
//                           <div className="flex items-center gap-3">
//                             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-slate-900 text-sm font-bold text-white">
//                               {getInitials(studentName)}
//                             </div>

//                             <div className="min-w-0">
//                               <h3 className="max-w-[190px] truncate font-bold text-slate-900">
//                                 {studentName}
//                               </h3>

//                               <p className="mt-1 flex max-w-[190px] items-center gap-1 truncate text-xs font-medium text-slate-400">
//                                 <FaEnvelope className="shrink-0 text-slate-300" />
//                                 {attempt.student?.email || "No email"}
//                               </p>
//                             </div>
//                           </div>
//                         </td>

//                         <td className="px-5 py-4">
//                           <h3 className="max-w-[220px] truncate font-bold text-slate-900">
//                             {attempt.quiz?.title || "Deleted Quiz"}
//                           </h3>

//                           <p className="mt-1 flex max-w-[220px] items-center gap-1 truncate text-xs font-medium text-slate-400">
//                             <FaBookOpen className="shrink-0 text-slate-300" />
//                             {formatType(attempt.quiz?.type) || "No type"}
//                           </p>
//                         </td>

//                         <td className="px-5 py-4">
//                           <p className="text-lg font-bold text-slate-900">
//                             {attempt.percentage || 0}%
//                           </p>

//                           <p className="mt-1 text-xs font-medium text-slate-400">
//                             {attempt.score || 0} score
//                           </p>
//                         </td>

//                         <td className="px-5 py-4">
//                           <span className="font-bold text-emerald-600">
//                             {attempt.correctCount || 0}
//                           </span>
//                         </td>

//                         <td className="px-5 py-4">
//                           <span className="font-bold text-rose-600">
//                             {attempt.wrongCount || 0}
//                           </span>
//                         </td>

//                         <td className="px-5 py-4">
//                           <Badge tone={getResultTone(attempt)}>
//                             {getResultLabel(attempt)}
//                           </Badge>
//                         </td>

//                         <td className="px-5 py-4">
//                           <Badge tone={getStatusTone(attempt.status)}>
//                             {attempt.status || "unknown"}
//                           </Badge>
//                         </td>

//                         <td className="px-5 py-4">
//                           <p className="flex items-center gap-2 text-sm font-semibold text-slate-600">
//                             <FaCalendarAlt className="shrink-0 text-slate-300" />
//                             {formatDateTime(attempt.createdAt)}
//                           </p>
//                         </td>

//                         <td className="px-5 py-4 text-right">
//                           <Link
//                             href={`/admin/quizzes/quiz-attempts/${attempt._id}`}
//                             className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-bold text-sky-700 transition hover:bg-sky-100"
//                           >
//                             <FaEye />
//                             Review
//                           </Link>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 ) : (
//                   <tr>
//                     <td colSpan="9">
//                       <EmptyState />
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="grid gap-4 p-4 xl:hidden">
//             {loading ? (
//               [1, 2, 3].map((item) => (
//                 <div
//                   key={item}
//                   className="h-56 animate-pulse rounded-[1.3rem] bg-slate-100"
//                 />
//               ))
//             ) : filteredAttempts.length ? (
//               filteredAttempts.map((attempt) => {
//                 const studentName = attempt.student?.name || "Unknown Student";

//                 return (
//                   <div
//                     key={attempt._id}
//                     className="rounded-[1.3rem] border border-slate-200 bg-white p-4 shadow-sm"
//                   >
//                     <div className="flex items-start gap-3">
//                       <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-slate-900 text-sm font-bold text-white">
//                         {getInitials(studentName)}
//                       </div>

//                       <div className="min-w-0 flex-1">
//                         <h3 className="font-bold text-slate-900">
//                           {studentName}
//                         </h3>

//                         <p className="mt-1 flex items-center gap-2 break-all text-sm font-medium text-slate-500">
//                           <FaEnvelope className="shrink-0 text-slate-300" />
//                           {attempt.student?.email || "No email"}
//                         </p>

//                         <div className="mt-3 flex flex-wrap gap-2">
//                           <Badge tone={getResultTone(attempt)}>
//                             {getResultLabel(attempt)}
//                           </Badge>

//                           <Badge tone={getStatusTone(attempt.status)}>
//                             {attempt.status || "unknown"}
//                           </Badge>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="mt-4 rounded-2xl bg-slate-50 p-3">
//                       <p className="text-xs font-bold uppercase text-slate-400">
//                         Quiz
//                       </p>

//                       <p className="mt-1 font-bold text-slate-900">
//                         {attempt.quiz?.title || "Deleted Quiz"}
//                       </p>

//                       <p className="mt-1 text-xs font-medium text-slate-400">
//                         {formatType(attempt.quiz?.type) || "No type"}
//                       </p>
//                     </div>

//                     <div className="mt-4 grid grid-cols-3 gap-3">
//                       <div className="rounded-2xl bg-slate-50 p-3">
//                         <p className="text-xs font-bold uppercase text-slate-400">
//                           Score
//                         </p>

//                         <p className="mt-1 font-bold text-slate-800">
//                           {attempt.percentage || 0}%
//                         </p>
//                       </div>

//                       <div className="rounded-2xl bg-emerald-50 p-3">
//                         <p className="text-xs font-bold uppercase text-emerald-500">
//                           Correct
//                         </p>

//                         <p className="mt-1 font-bold text-emerald-700">
//                           {attempt.correctCount || 0}
//                         </p>
//                       </div>

//                       <div className="rounded-2xl bg-rose-50 p-3">
//                         <p className="text-xs font-bold uppercase text-rose-500">
//                           Wrong
//                         </p>

//                         <p className="mt-1 font-bold text-rose-700">
//                           {attempt.wrongCount || 0}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
//                       <p className="flex items-center gap-2 text-xs font-semibold text-slate-400">
//                         <FaCalendarAlt />
//                         {formatDateTime(attempt.createdAt)}
//                       </p>

//                       <Link
//                         href={`/admin/quizzes/quiz-attempts/${attempt._id}`}
//                         className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-bold text-sky-700"
//                       >
//                         Review
//                         <FaChevronRight className="text-xs" />
//                       </Link>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <EmptyState />
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FaBookOpen,
  FaCalendarAlt,
  FaChartLine,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaEnvelope,
  FaExclamationTriangle,
  FaEye,
  FaFilter,
  FaGraduationCap,
  FaSearch,
  FaSyncAlt,
  FaTimesCircle,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";
import { getAdminQuizAttempts } from "@/features/API";

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

const formatType = (type = "") =>
  type
    .split("_")
    .filter(Boolean)
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");

const getResultLabel = (attempt) => {
  if (attempt.status !== "completed") return "In Progress";
  return attempt.passed ? "Passed" : "Failed";
};

function getMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Failed to load quiz attempts."
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
      className={`inline-flex w-fit max-w-full rounded-full border px-2.5 py-1 text-[11px] font-bold capitalize leading-none ${toneClass}`}
    >
      {children}
    </span>
  );
}

function getResultTone(attempt) {
  if (attempt.status !== "completed") return "amber";
  return attempt.passed ? "green" : "red";
}

function getStatusTone(status) {
  if (status === "completed") return "green";
  if (status === "started") return "amber";
  return "slate";
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
    <div className="rounded-[16px] border border-slate-200 bg-white p-3.5 shadow-[0_8px_22px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.07)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-slate-500">
            {title}
          </p>

          <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900">
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

function EmptyState() {
  return (
    <div className="flex min-h-[260px] items-center justify-center p-5 text-center">
      <div>
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <FaGraduationCap className="text-xl" />
        </div>

        <h3 className="text-base font-bold text-slate-900">
          No attempts found
        </h3>

        <p className="mt-1.5 max-w-sm text-sm font-medium text-slate-400">
          Try changing your search keyword, status or result filter.
        </p>
      </div>
    </div>
  );
}

function LoadingRows() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((item) => (
        <tr key={item}>
          <td colSpan="7" className="px-3 py-2.5">
            <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
          </td>
        </tr>
      ))}
    </>
  );
}

export default function AdminQuizAttemptsPage() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [resultFilter, setResultFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const loadAttempts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getAdminQuizAttempts();
      setAttempts(res.data?.data || []);
    } catch (err) {
      setError(getMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttempts();
  }, []);

  const filteredAttempts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return attempts.filter((attempt) => {
      const studentName = attempt.student?.name?.toLowerCase() || "";
      const studentEmail = attempt.student?.email?.toLowerCase() || "";
      const quizTitle = attempt.quiz?.title?.toLowerCase() || "";
      const quizType = attempt.quiz?.type?.toLowerCase() || "";

      const matchesSearch =
        !keyword ||
        studentName.includes(keyword) ||
        studentEmail.includes(keyword) ||
        quizTitle.includes(keyword) ||
        quizType.includes(keyword);

      const matchesStatus =
        statusFilter === "all" || attempt.status === statusFilter;

      let matchesResult = true;

      if (resultFilter === "passed") {
        matchesResult = attempt.status === "completed" && attempt.passed;
      }

      if (resultFilter === "failed") {
        matchesResult = attempt.status === "completed" && !attempt.passed;
      }

      if (resultFilter === "in_progress") {
        matchesResult = attempt.status !== "completed";
      }

      return matchesSearch && matchesStatus && matchesResult;
    });
  }, [attempts, search, statusFilter, resultFilter]);

  const stats = useMemo(() => {
    const total = attempts.length;

    const completed = attempts.filter(
      (attempt) => attempt.status === "completed",
    ).length;

    const passed = attempts.filter(
      (attempt) => attempt.status === "completed" && attempt.passed,
    ).length;

    const failed = attempts.filter(
      (attempt) => attempt.status === "completed" && !attempt.passed,
    ).length;

    const completedAttempts = attempts.filter(
      (attempt) => attempt.status === "completed",
    );

    const averagePercentage =
      completedAttempts.length > 0
        ? Math.round(
            completedAttempts.reduce(
              (sum, attempt) => sum + Number(attempt.percentage || 0),
              0,
            ) / completedAttempts.length,
          )
        : 0;

    return {
      total,
      completed,
      passed,
      failed,
      averagePercentage,
    };
  }, [attempts]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (search.trim()) count += 1;
    if (statusFilter !== "all") count += 1;
    if (resultFilter !== "all") count += 1;
    return count;
  }, [search, statusFilter, resultFilter]);

  const totalPages = Math.max(Math.ceil(filteredAttempts.length / pageSize), 1);

  const paginatedAttempts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAttempts.slice(start, start + pageSize);
  }, [filteredAttempts, currentPage, pageSize]);

  const pageInfo = useMemo(() => {
    const total = filteredAttempts.length;
    const start = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, total);

    return { start, end, total };
  }, [filteredAttempts.length, currentPage, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, resultFilter, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleReset = () => {
    setSearch("");
    setStatusFilter("all");
    setResultFilter("all");
    setCurrentPage(1);
  };

  return (
    <section className="min-h-screen overflow-x-hidden bg-[#f8f8fb] px-3 py-3 md:px-4 lg:px-5">
      <div className="mx-auto w-full max-w-[1360px]">
        <div className="mb-3 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
          <div className="min-w-0">
            <div className="mb-1.5 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-400">
              <span>Admin</span>
              <span>/</span>
              <span>Quizzes</span>
              <span>/</span>
              <span className="text-slate-600">Quiz Attempts</span>
            </div>

            <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
              Quiz Attempts
            </h1>

            <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
              See student quiz attempts, scores, pass or fail results and review
              submitted answers.
            </p>
          </div>

          <button
            onClick={loadAttempts}
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            <FaSyncAlt className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        <div className="mb-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <StatCard
            title="Total Attempts"
            value={loading ? "..." : stats.total}
            note="All submitted attempts"
            icon={FaUsers}
            tone="violet"
          />

          <StatCard
            title="Completed"
            value={loading ? "..." : stats.completed}
            note="Finished attempts"
            icon={FaCheckCircle}
            tone="sky"
          />

          <StatCard
            title="Passed"
            value={loading ? "..." : stats.passed}
            note="Successful attempts"
            icon={FaTrophy}
            tone="green"
          />

          <StatCard
            title="Failed"
            value={loading ? "..." : stats.failed}
            note="Unsuccessful attempts"
            icon={FaTimesCircle}
            tone="red"
          />

          <StatCard
            title="Avg Score"
            value={loading ? "..." : `${stats.averagePercentage}%`}
            note="Average completed score"
            icon={FaChartLine}
            tone="amber"
          />
        </div>

        <div className="mb-3 rounded-[16px] border border-slate-200 bg-white p-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
          <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <FaFilter className="text-sm" />
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Filter Attempts
                </h2>

                <p className="text-[11px] font-medium text-slate-400">
                  {activeFilterCount > 0
                    ? `${activeFilterCount} filter active`
                    : "Search and filter student attempt records"}
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-fit rounded-xl border border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Clear Filters
            </button>
          </div>

          <div className="grid gap-2.5 lg:grid-cols-[minmax(0,1fr)_170px_170px_130px]">
            <div className="relative min-w-0">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search student, email, quiz..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-[#f8f8fb] pl-9 pr-3 text-xs font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-[#f8f8fb] px-3 text-xs font-bold text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"
            >
              <option value="all">All Status</option>
              <option value="started">Started</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={resultFilter}
              onChange={(e) => setResultFilter(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-[#f8f8fb] px-3 text-xs font-bold text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"
            >
              <option value="all">All Results</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
              <option value="in_progress">In Progress</option>
            </select>

            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="h-10 rounded-xl border border-slate-200 bg-[#f8f8fb] px-3 text-xs font-bold text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"
            >
              <option value={5}>5 / page</option>
              <option value={10}>10 / page</option>
              <option value={20}>20 / page</option>
              <option value={50}>50 / page</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-3 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs font-semibold text-rose-700">
            <FaExclamationTriangle className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
          <div className="flex flex-col justify-between gap-2 border-b border-slate-100 px-3.5 py-3 md:flex-row md:items-center">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                All Quiz Attempts
              </h2>

              <p className="mt-0.5 text-xs font-medium text-slate-400">
                Showing {pageInfo.start}-{pageInfo.end} of {pageInfo.total}{" "}
                filtered attempts
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <Badge tone="violet">{stats.completed} completed</Badge>
              <Badge tone="green">{stats.passed} passed</Badge>
              <Badge tone="red">{stats.failed} failed</Badge>
            </div>
          </div>

          <div className="hidden max-w-full overflow-x-auto lg:block">
            <table className="w-full min-w-[940px] table-fixed text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-[#fbfbfd]">
                  <th className="w-[19%] px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Student
                  </th>
                  <th className="w-[23%] px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Quiz
                  </th>
                  <th className="w-[12%] px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Score
                  </th>
                  <th className="w-[13%] px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Answers
                  </th>
                  <th className="w-[14%] px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Result
                  </th>
                  <th className="w-[13%] px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Date
                  </th>
                  <th className="w-[6%] px-3 py-2.5 text-right text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    View
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <LoadingRows />
                ) : paginatedAttempts.length ? (
                  paginatedAttempts.map((attempt) => {
                    const studentName =
                      attempt.student?.name || "Unknown Student";

                    return (
                      <tr
                        key={attempt._id}
                        className="transition duration-200 hover:bg-[#fbfbfd]"
                      >
                        <td className="px-3 py-2.5">
                          <div className="flex min-w-0 items-center gap-2">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-slate-900 text-xs font-bold text-white">
                              {getInitials(studentName)}
                            </div>

                            <div className="min-w-0">
                              <h3 className="truncate text-xs font-bold text-slate-900">
                                {studentName}
                              </h3>

                              <p className="mt-1 flex min-w-0 items-center gap-1 truncate text-[11px] font-medium text-slate-400">
                                <FaEnvelope className="shrink-0 text-slate-300" />
                                <span className="truncate">
                                  {attempt.student?.email || "No email"}
                                </span>
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-2.5">
                          <h3 className="truncate text-xs font-bold text-slate-900">
                            {attempt.quiz?.title || "Deleted Quiz"}
                          </h3>

                          <p className="mt-1 flex min-w-0 items-center gap-1 truncate text-[11px] font-medium text-slate-400">
                            <FaBookOpen className="shrink-0 text-slate-300" />
                            <span className="truncate">
                              {formatType(attempt.quiz?.type) || "No type"}
                            </span>
                          </p>
                        </td>

                        <td className="px-3 py-2.5">
                          <p className="text-sm font-bold text-slate-900">
                            {attempt.percentage || 0}%
                          </p>

                          <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                            {attempt.score || 0} score
                          </p>
                        </td>

                        <td className="px-3 py-2.5">
                          <div className="flex flex-wrap gap-1">
                            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-bold leading-none text-emerald-700">
                              C: {attempt.correctCount || 0}
                            </span>

                            <span className="rounded-full bg-rose-50 px-2 py-1 text-[11px] font-bold leading-none text-rose-700">
                              W: {attempt.wrongCount || 0}
                            </span>
                          </div>
                        </td>

                        <td className="px-3 py-2.5">
                          <div className="flex flex-col gap-1">
                            <Badge tone={getResultTone(attempt)}>
                              {getResultLabel(attempt)}
                            </Badge>

                            <Badge tone={getStatusTone(attempt.status)}>
                              {attempt.status || "unknown"}
                            </Badge>
                          </div>
                        </td>

                        <td className="px-3 py-2.5">
                          <p className="flex items-center gap-1.5 text-[11px] font-semibold leading-4 text-slate-600">
                            <FaCalendarAlt className="shrink-0 text-slate-300" />
                            <span>{formatDateTime(attempt.createdAt)}</span>
                          </p>
                        </td>

                        <td className="px-3 py-2.5 text-right">
                          <Link
                            href={`/admin/quizzes/quiz-attempts/${attempt._id}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 text-xs font-bold text-sky-700 transition hover:bg-sky-100"
                            title="Review attempt"
                          >
                            <FaEye />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7">
                      <EmptyState />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 p-3 lg:hidden">
            {loading ? (
              [1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-44 animate-pulse rounded-[15px] bg-slate-100"
                />
              ))
            ) : paginatedAttempts.length ? (
              paginatedAttempts.map((attempt) => {
                const studentName = attempt.student?.name || "Unknown Student";

                return (
                  <div
                    key={attempt._id}
                    className="rounded-[15px] border border-slate-200 bg-white p-3 shadow-sm"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-slate-900 text-xs font-bold text-white">
                        {getInitials(studentName)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-bold text-slate-900">
                          {studentName}
                        </h3>

                        <p className="mt-1 flex items-center gap-1.5 break-all text-xs font-medium text-slate-500">
                          <FaEnvelope className="shrink-0 text-slate-300" />
                          {attempt.student?.email || "No email"}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <Badge tone={getResultTone(attempt)}>
                            {getResultLabel(attempt)}
                          </Badge>

                          <Badge tone={getStatusTone(attempt.status)}>
                            {attempt.status || "unknown"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 rounded-xl bg-slate-50 p-2.5">
                      <p className="text-[10px] font-bold uppercase text-slate-400">
                        Quiz
                      </p>

                      <p className="mt-1 line-clamp-2 text-sm font-bold text-slate-900">
                        {attempt.quiz?.title || "Deleted Quiz"}
                      </p>

                      <p className="mt-1 text-[11px] font-medium text-slate-400">
                        {formatType(attempt.quiz?.type) || "No type"}
                      </p>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <div className="rounded-xl bg-slate-50 p-2.5">
                        <p className="text-[10px] font-bold uppercase text-slate-400">
                          Score
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-800">
                          {attempt.percentage || 0}%
                        </p>
                      </div>

                      <div className="rounded-xl bg-emerald-50 p-2.5">
                        <p className="text-[10px] font-bold uppercase text-emerald-500">
                          Correct
                        </p>

                        <p className="mt-1 text-sm font-bold text-emerald-700">
                          {attempt.correctCount || 0}
                        </p>
                      </div>

                      <div className="rounded-xl bg-rose-50 p-2.5">
                        <p className="text-[10px] font-bold uppercase text-rose-500">
                          Wrong
                        </p>

                        <p className="mt-1 text-sm font-bold text-rose-700">
                          {attempt.wrongCount || 0}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                      <p className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                        <FaCalendarAlt />
                        {formatDateTime(attempt.createdAt)}
                      </p>

                      <Link
                        href={`/admin/quizzes/quiz-attempts/${attempt._id}`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-sky-200 bg-sky-50 px-2.5 py-2 text-[11px] font-bold text-sky-700"
                      >
                        Review
                        <FaChevronRight className="text-[10px]" />
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <EmptyState />
            )}
          </div>

          {!loading && filteredAttempts.length > 0 && (
            <div className="flex flex-col items-center justify-between gap-2 border-t border-slate-100 px-3.5 py-3 sm:flex-row">
              <p className="text-xs font-semibold text-slate-400">
                Showing <span className="text-slate-800">{pageInfo.start}</span>
                -<span className="text-slate-800">{pageInfo.end}</span> of{" "}
                <span className="text-slate-800">{pageInfo.total}</span>
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage <= 1}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaChevronLeft className="text-[10px]" />
                  Prev
                </button>

                <span className="rounded-xl bg-violet-50 px-3 py-2 text-xs font-bold text-violet-700">
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage >= totalPages}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                  <FaChevronRight className="text-[10px]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
