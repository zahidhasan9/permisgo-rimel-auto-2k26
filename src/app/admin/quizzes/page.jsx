// "use client";

// import Link from "next/link";
// import { useEffect, useMemo, useState } from "react";
// import {
//   FaBookOpen,
//   FaBullseye,
//   FaCheckCircle,
//   FaChevronLeft,
//   FaChevronRight,
//   FaClock,
//   FaCoins,
//   FaEdit,
//   FaExclamationTriangle,
//   FaFilter,
//   FaImage,
//   FaLayerGroup,
//   FaPlus,
//   FaQuestionCircle,
//   FaSearch,
//   FaSyncAlt,
//   FaTimes,
//   FaTrashAlt,
// } from "react-icons/fa";
// import { deleteQuiz, getAdminQuizStats, getAdminQuizzes } from "@/features/API";
// import { mediaUrl } from "@/utils/mediaUrl";

// const quizTypes = [
//   { label: "All Types", value: "all" },
//   { label: "Simple Series", value: "simple_series" },
//   { label: "Mock Test", value: "mock_test" },
//   { label: "Thematic Series", value: "thematic_series" },
//   { label: "Crash Test", value: "crash_test" },
//   { label: "Road Sign", value: "road_sign" },
//   { label: "Code Ebook", value: "code_ebook" },
//   { label: "Knowledge Sheet", value: "knowledge_sheet" },
//   { label: "Live Replay", value: "live_replay" },
//   { label: "Learn", value: "learn" },
//   { label: "Evaluation", value: "evaluation" },
//   { label: "Reserve Exam", value: "reserve_exam" },
//   { label: "FAQ", value: "faq" },
// ];

// const statuses = [
//   { label: "All Status", value: "all" },
//   { label: "Active", value: "active" },
//   { label: "Inactive", value: "inactive" },
// ];

// const formatType = (type = "") =>
//   type
//     .split("_")
//     .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
//     .join(" ");

// function getMessage(error, fallback = "Something went wrong.") {
//   return error?.response?.data?.message || error?.message || fallback;
// }

// function StatCard({ title, value, sub, icon: Icon, tone = "violet", loading }) {
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
//         <div className="min-w-0">
//           <p className="text-sm font-semibold text-slate-500">{title}</p>

//           <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
//             {loading ? "..." : value}
//           </h3>

//           <p className="mt-2 text-xs font-medium text-slate-400">
//             {loading ? "Loading..." : sub}
//           </p>
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

// function EmptyState() {
//   return (
//     <div className="flex min-h-[340px] items-center justify-center p-6 text-center">
//       <div>
//         <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
//           <FaQuestionCircle className="text-2xl" />
//         </div>

//         <h3 className="text-lg font-bold text-slate-900">No quiz found</h3>

//         <p className="mt-2 max-w-sm text-sm font-medium text-slate-400">
//           Try changing your search keyword, quiz type, status or payment filter.
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
//           <td colSpan="8" className="px-5 py-4">
//             <div className="h-16 animate-pulse rounded-2xl bg-slate-100" />
//           </td>
//         </tr>
//       ))}
//     </>
//   );
// }

// export default function AdminQuizzesPage() {
//   const [quizzes, setQuizzes] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [pagination, setPagination] = useState(null);

//   const [search, setSearch] = useState("");
//   const [type, setType] = useState("all");
//   const [status, setStatus] = useState("all");
//   const [isPaid, setIsPaid] = useState("all");

//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [statsLoading, setStatsLoading] = useState(true);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [error, setError] = useState("");
//   const [toast, setToast] = useState("");

//   const activeFilterCount = useMemo(() => {
//     let count = 0;
//     if (search.trim()) count += 1;
//     if (type !== "all") count += 1;
//     if (status !== "all") count += 1;
//     if (isPaid !== "all") count += 1;
//     return count;
//   }, [search, type, status, isPaid]);

//   const loadStats = async () => {
//     try {
//       setStatsLoading(true);
//       const res = await getAdminQuizStats();
//       setStats(res.data?.data || null);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setStatsLoading(false);
//     }
//   };

//   const loadQuizzes = async (targetPage = 1, overrideFilters = null) => {
//     try {
//       setLoading(true);
//       setError("");

//       const filterData = {
//         search: overrideFilters?.search ?? search,
//         type: overrideFilters?.type ?? type,
//         status: overrideFilters?.status ?? status,
//         isPaid: overrideFilters?.isPaid ?? isPaid,
//       };

//       const params = {
//         page: targetPage,
//         limit: 10,
//       };

//       if (filterData.search.trim()) params.search = filterData.search.trim();
//       if (filterData.type !== "all") params.type = filterData.type;
//       if (filterData.status !== "all") params.status = filterData.status;
//       if (filterData.isPaid !== "all") params.isPaid = filterData.isPaid;

//       const res = await getAdminQuizzes(params);
//       const data = res.data?.data;

//       setQuizzes(data?.quizzes || []);
//       setPagination(data?.pagination || null);
//       setPage(targetPage);
//     } catch (err) {
//       setError(getMessage(err, "Failed to load quizzes."));
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadStats();
//     loadQuizzes(1);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     if (!toast) return;

//     const timer = setTimeout(() => {
//       setToast("");
//     }, 2500);

//     return () => clearTimeout(timer);
//   }, [toast]);

//   const handleSearch = () => {
//     loadQuizzes(1);
//   };

//   const handleReset = () => {
//     const resetFilters = {
//       search: "",
//       type: "all",
//       status: "all",
//       isPaid: "all",
//     };

//     setSearch("");
//     setType("all");
//     setStatus("all");
//     setIsPaid("all");

//     loadQuizzes(1, resetFilters);
//   };

//   const handleDelete = async () => {
//     if (!deleteTarget?._id) return;

//     try {
//       setDeleteLoading(true);
//       setError("");

//       await deleteQuiz(deleteTarget._id);
//       await loadQuizzes(page);
//       await loadStats();

//       setToast("Quiz deleted successfully.");
//       setDeleteTarget(null);
//     } catch (err) {
//       setError(getMessage(err, "Failed to delete quiz."));
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   const statCards = [
//     {
//       title: "Total Quizzes",
//       value: stats?.totalQuizzes || 0,
//       sub: `${stats?.activeQuizzes || 0} active quizzes`,
//       icon: FaLayerGroup,
//       tone: "violet",
//     },
//     {
//       title: "Total Questions",
//       value: stats?.totalQuestions || 0,
//       sub: `${stats?.activeQuestions || 0} active questions`,
//       icon: FaQuestionCircle,
//       tone: "sky",
//     },
//     {
//       title: "Attempts",
//       value: stats?.totalAttempts || 0,
//       sub: `${stats?.completedAttempts || 0} completed attempts`,
//       icon: FaCheckCircle,
//       tone: "green",
//     },
//     {
//       title: "Average Score",
//       value: `${stats?.averageScore || 0}%`,
//       sub: `${stats?.passedAttempts || 0} passed attempts`,
//       icon: FaBullseye,
//       tone: "amber",
//     },
//   ];

//   return (
//     <section className="min-h-screen bg-[#f8f8fb] px-4 py-5 md:px-6 lg:px-8">
//       <div className="mx-auto max-w-[1500px]">
//         {toast && (
//           <div className="fixed right-5 top-5 z-50 rounded-2xl border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow-xl">
//             {toast}
//           </div>
//         )}

//         <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
//           <div>
//             <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-400">
//               <span>Admin</span>
//               <span>/</span>
//               <span className="text-slate-600">Quiz Management</span>
//             </div>

//             <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
//               Quiz Management
//             </h1>

//             <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
//               Create, manage, filter and monitor quiz series from one clean
//               admin dashboard.
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center gap-3">
//             <button
//               onClick={() => {
//                 loadStats();
//                 loadQuizzes(page);
//               }}
//               disabled={loading || statsLoading}
//               className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
//             >
//               <FaSyncAlt className={loading ? "animate-spin" : ""} />
//               Refresh
//             </button>

//             <Link
//               href="/admin/quizzes/create"
//               className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800"
//             >
//               <FaPlus />
//               Create Quiz
//             </Link>
//           </div>
//         </div>

//         <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//           {statCards.map((item) => (
//             <StatCard
//               key={item.title}
//               title={item.title}
//               value={item.value}
//               sub={item.sub}
//               icon={item.icon}
//               tone={item.tone}
//               loading={statsLoading}
//             />
//           ))}
//         </div>

//         <div className="mb-6 rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
//           <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
//             <div className="flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
//                 <FaFilter />
//               </div>

//               <div>
//                 <h2 className="text-base font-bold text-slate-900">
//                   Filter Quizzes
//                 </h2>

//                 <p className="text-xs font-medium text-slate-400">
//                   {activeFilterCount > 0
//                     ? `${activeFilterCount} filter active`
//                     : "Search and filter quiz records"}
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

//           <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
//             <div className="relative">
//               <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") handleSearch();
//                 }}
//                 placeholder="Search by title, slug, type..."
//                 className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8f8fb] pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"
//               />
//             </div>

//             <select
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               className="h-12 rounded-2xl border border-slate-200 bg-[#f8f8fb] px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"
//             >
//               {quizTypes.map((item) => (
//                 <option key={item.value} value={item.value}>
//                   {item.label}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className="h-12 rounded-2xl border border-slate-200 bg-[#f8f8fb] px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"
//             >
//               {statuses.map((item) => (
//                 <option key={item.value} value={item.value}>
//                   {item.label}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={isPaid}
//               onChange={(e) => setIsPaid(e.target.value)}
//               className="h-12 rounded-2xl border border-slate-200 bg-[#f8f8fb] px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"
//             >
//               <option value="all">All Payment</option>
//               <option value="false">Free</option>
//               <option value="true">Paid</option>
//             </select>

//             <button
//               onClick={handleSearch}
//               disabled={loading}
//               className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
//             >
//               <FaSearch />
//               Apply
//             </button>
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
//               <h2 className="text-lg font-bold text-slate-900">All Quizzes</h2>

//               <p className="mt-1 text-sm font-medium text-slate-400">
//                 {pagination?.total || 0} quiz found
//               </p>
//             </div>

//             <div className="flex flex-wrap items-center gap-2">
//               <Badge tone="violet">Page {pagination?.page || page}</Badge>
//               <Badge>{pagination?.totalPages || 1} pages</Badge>
//             </div>
//           </div>

//           <div className="hidden overflow-x-auto xl:block">
//             <table className="w-full min-w-[1120px] text-left">
//               <thead>
//                 <tr className="border-b border-slate-100 bg-[#fbfbfd]">
//                   <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
//                     Quiz
//                   </th>
//                   <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
//                     Type
//                   </th>
//                   <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
//                     Questions
//                   </th>
//                   <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
//                     Duration
//                   </th>
//                   <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
//                     Pass
//                   </th>
//                   <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
//                     Payment
//                   </th>
//                   <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
//                     Status
//                   </th>
//                   <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-400">
//                     Action
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-slate-100">
//                 {loading ? (
//                   <LoadingRows />
//                 ) : quizzes.length ? (
//                   quizzes.map((quiz) => (
//                     <tr
//                       key={quiz._id}
//                       className="transition duration-200 hover:bg-[#fbfbfd]"
//                     >
//                       <td className="px-5 py-4">
//                         <div className="flex items-center gap-3">
//                           <div className="h-16 w-24 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-100">
//                             {quiz.coverImage ? (
//                               <img
//                                 src={mediaUrl(quiz.coverImage)}
//                                 alt={quiz.title}
//                                 className="h-full w-full object-cover"
//                               />
//                             ) : (
//                               <div className="flex h-full w-full items-center justify-center text-slate-400">
//                                 <FaImage />
//                               </div>
//                             )}
//                           </div>

//                           <div className="min-w-0">
//                             <h3 className="max-w-[260px] truncate font-bold text-slate-900">
//                               {quiz.title || "Untitled Quiz"}
//                             </h3>

//                             <p className="mt-1 max-w-[260px] truncate text-xs font-medium text-slate-400">
//                               {quiz.slug || "No slug"}
//                             </p>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="px-5 py-4">
//                         <Badge tone="sky">{formatType(quiz.type)}</Badge>
//                       </td>

//                       <td className="px-5 py-4">
//                         <p className="font-bold text-slate-700">
//                           {quiz.totalQuestions || 0}
//                         </p>
//                       </td>

//                       <td className="px-5 py-4">
//                         <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
//                           <FaClock className="text-slate-300" />
//                           {quiz.durationMinutes || 0} min
//                         </p>
//                       </td>

//                       <td className="px-5 py-4">
//                         <p className="font-bold text-slate-700">
//                           {quiz.passingScore || 0}%
//                         </p>
//                       </td>

//                       <td className="px-5 py-4">
//                         <Badge tone={quiz.isPaid ? "amber" : "green"}>
//                           {quiz.isPaid ? "Paid" : "Free"}
//                         </Badge>
//                       </td>

//                       <td className="px-5 py-4">
//                         <Badge
//                           tone={quiz.status === "active" ? "green" : "slate"}
//                         >
//                           {quiz.status || "inactive"}
//                         </Badge>
//                       </td>

//                       <td className="px-5 py-4">
//                         <div className="flex justify-end gap-2">
//                           <Link
//                             href={`/admin/quizzes/${quiz._id}/questions`}
//                             className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-bold text-sky-700 transition hover:bg-sky-100"
//                           >
//                             <FaQuestionCircle />
//                             Questions
//                           </Link>

//                           <Link
//                             href={`/admin/quizzes/${quiz._id}/edit`}
//                             className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
//                           >
//                             <FaEdit />
//                             Edit
//                           </Link>

//                           <button
//                             onClick={() => setDeleteTarget(quiz)}
//                             className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
//                           >
//                             <FaTrashAlt />
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="8">
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
//                   className="h-48 animate-pulse rounded-[1.3rem] bg-slate-100"
//                 />
//               ))
//             ) : quizzes.length ? (
//               quizzes.map((quiz) => (
//                 <div
//                   key={quiz._id}
//                   className="rounded-[1.3rem] border border-slate-200 bg-white p-4 shadow-sm"
//                 >
//                   <div className="flex gap-3">
//                     <div className="h-20 w-24 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-100">
//                       {quiz.coverImage ? (
//                         <img
//                           src={mediaUrl(quiz.coverImage)}
//                           alt={quiz.title}
//                           className="h-full w-full object-cover"
//                         />
//                       ) : (
//                         <div className="flex h-full w-full items-center justify-center text-slate-400">
//                           <FaImage />
//                         </div>
//                       )}
//                     </div>

//                     <div className="min-w-0 flex-1">
//                       <h3 className="line-clamp-2 font-bold text-slate-900">
//                         {quiz.title || "Untitled Quiz"}
//                       </h3>

//                       <p className="mt-1 break-all text-xs font-medium text-slate-400">
//                         {quiz.slug || "No slug"}
//                       </p>

//                       <div className="mt-2 flex flex-wrap gap-2">
//                         <Badge tone="sky">{formatType(quiz.type)}</Badge>
//                         <Badge
//                           tone={quiz.status === "active" ? "green" : "slate"}
//                         >
//                           {quiz.status || "inactive"}
//                         </Badge>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-4 grid grid-cols-2 gap-3">
//                     <div className="rounded-2xl bg-slate-50 p-3">
//                       <p className="text-xs font-bold uppercase text-slate-400">
//                         Questions
//                       </p>
//                       <p className="mt-1 font-bold text-slate-800">
//                         {quiz.totalQuestions || 0}
//                       </p>
//                     </div>

//                     <div className="rounded-2xl bg-slate-50 p-3">
//                       <p className="text-xs font-bold uppercase text-slate-400">
//                         Duration
//                       </p>
//                       <p className="mt-1 font-bold text-slate-800">
//                         {quiz.durationMinutes || 0} min
//                       </p>
//                     </div>

//                     <div className="rounded-2xl bg-slate-50 p-3">
//                       <p className="text-xs font-bold uppercase text-slate-400">
//                         Pass Score
//                       </p>
//                       <p className="mt-1 font-bold text-slate-800">
//                         {quiz.passingScore || 0}%
//                       </p>
//                     </div>

//                     <div className="rounded-2xl bg-slate-50 p-3">
//                       <p className="text-xs font-bold uppercase text-slate-400">
//                         Payment
//                       </p>
//                       <div className="mt-1">
//                         <Badge tone={quiz.isPaid ? "amber" : "green"}>
//                           {quiz.isPaid ? "Paid" : "Free"}
//                         </Badge>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-4 flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-4">
//                     <Link
//                       href={`/admin/quizzes/${quiz._id}/questions`}
//                       className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-bold text-sky-700"
//                     >
//                       <FaQuestionCircle />
//                       Questions
//                     </Link>

//                     <Link
//                       href={`/admin/quizzes/${quiz._id}/edit`}
//                       className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
//                     >
//                       <FaEdit />
//                       Edit
//                     </Link>

//                     <button
//                       onClick={() => setDeleteTarget(quiz)}
//                       className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700"
//                     >
//                       <FaTrashAlt />
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <EmptyState />
//             )}
//           </div>

//           {pagination && pagination.totalPages > 1 && (
//             <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row">
//               <p className="text-sm font-semibold text-slate-400">
//                 Page <span className="text-slate-800">{pagination.page}</span>{" "}
//                 of{" "}
//                 <span className="text-slate-800">{pagination.totalPages}</span>
//               </p>

//               <div className="flex items-center gap-2">
//                 <button
//                   disabled={!pagination.hasPrevPage || loading}
//                   onClick={() => loadQuizzes(page - 1)}
//                   className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   <FaChevronLeft className="text-xs" />
//                   Previous
//                 </button>

//                 <button
//                   disabled={!pagination.hasNextPage || loading}
//                   onClick={() => loadQuizzes(page + 1)}
//                   className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   Next
//                   <FaChevronRight className="text-xs" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {deleteTarget && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
//           <div className="w-full max-w-md rounded-[1.4rem] bg-white p-6 shadow-2xl">
//             <div className="mb-5 flex items-start justify-between gap-4">
//               <div className="flex gap-4">
//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
//                   <FaTrashAlt />
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-bold text-slate-900">
//                     Delete Quiz
//                   </h3>

//                   <p className="mt-1 text-sm leading-6 text-slate-500">
//                     Are you sure you want to delete{" "}
//                     <span className="font-bold text-slate-800">
//                       {deleteTarget.title || "this quiz"}
//                     </span>
//                     ? This action cannot be undone.
//                   </p>
//                 </div>
//               </div>

//               <button
//                 onClick={() => setDeleteTarget(null)}
//                 className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
//               >
//                 <FaTimes />
//               </button>
//             </div>

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setDeleteTarget(null)}
//                 disabled={deleteLoading}
//                 className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleDelete}
//                 disabled={deleteLoading}
//                 className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {deleteLoading ? (
//                   <FaSyncAlt className="animate-spin" />
//                 ) : (
//                   <FaTrashAlt />
//                 )}
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FaBullseye,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaEdit,
  FaExclamationTriangle,
  FaFilter,
  FaImage,
  FaLayerGroup,
  FaPlus,
  FaQuestionCircle,
  FaSearch,
  FaSyncAlt,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa";
import { deleteQuiz, getAdminQuizStats, getAdminQuizzes } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const quizTypes = [
  { label: "All Types", value: "all" },
  { label: "Simple Series", value: "simple_series" },
  { label: "Mock Test", value: "mock_test" },
  { label: "Thematic Series", value: "thematic_series" },
  { label: "Crash Test", value: "crash_test" },
  { label: "Road Sign", value: "road_sign" },
  { label: "Code Ebook", value: "code_ebook" },
  { label: "Knowledge Sheet", value: "knowledge_sheet" },
  { label: "Live Replay", value: "live_replay" },
  { label: "Learn", value: "learn" },
  { label: "Evaluation", value: "evaluation" },
  { label: "Reserve Exam", value: "reserve_exam" },
  { label: "FAQ", value: "faq" },
];

const statuses = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const formatType = (type = "") =>
  type
    .split("_")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");

function getMessage(error, fallback = "Something went wrong.") {
  return error?.response?.data?.message || error?.message || fallback;
}

function StatCard({ title, value, sub, icon: Icon, tone = "violet", loading }) {
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
            {loading ? "..." : value}
          </h3>

          <p className="mt-1 truncate text-[11px] font-medium text-slate-400">
            {loading ? "Loading..." : sub}
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

function EmptyState() {
  return (
    <div className="flex min-h-[250px] items-center justify-center p-5 text-center">
      <div>
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <FaQuestionCircle className="text-xl" />
        </div>

        <h3 className="text-base font-bold text-slate-900">No quiz found</h3>

        <p className="mt-1.5 max-w-sm text-sm font-medium text-slate-400">
          Try changing your search keyword, quiz type, status or payment filter.
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
          <td colSpan="6" className="px-3 py-2.5">
            <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
          </td>
        </tr>
      ))}
    </>
  );
}

export default function AdminQuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState(null);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [isPaid, setIsPaid] = useState("all");

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (search.trim()) count += 1;
    if (type !== "all") count += 1;
    if (status !== "all") count += 1;
    if (isPaid !== "all") count += 1;
    return count;
  }, [search, type, status, isPaid]);

  const loadStats = async () => {
    try {
      setStatsLoading(true);
      const res = await getAdminQuizStats();
      setStats(res.data?.data || null);
    } catch (err) {
      console.error(err);
    } finally {
      setStatsLoading(false);
    }
  };

  const loadQuizzes = async (targetPage = 1, overrideFilters = null) => {
    try {
      setLoading(true);
      setError("");

      const filterData = {
        search: overrideFilters?.search ?? search,
        type: overrideFilters?.type ?? type,
        status: overrideFilters?.status ?? status,
        isPaid: overrideFilters?.isPaid ?? isPaid,
      };

      const params = {
        page: targetPage,
        limit: 10,
      };

      if (filterData.search.trim()) params.search = filterData.search.trim();
      if (filterData.type !== "all") params.type = filterData.type;
      if (filterData.status !== "all") params.status = filterData.status;
      if (filterData.isPaid !== "all") params.isPaid = filterData.isPaid;

      const res = await getAdminQuizzes(params);
      const data = res.data?.data;

      setQuizzes(data?.quizzes || []);
      setPagination(data?.pagination || null);
      setPage(targetPage);
    } catch (err) {
      setError(getMessage(err, "Failed to load quizzes."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    loadQuizzes(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast("");
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleSearch = () => {
    loadQuizzes(1);
  };

  const handleReset = () => {
    const resetFilters = {
      search: "",
      type: "all",
      status: "all",
      isPaid: "all",
    };

    setSearch("");
    setType("all");
    setStatus("all");
    setIsPaid("all");

    loadQuizzes(1, resetFilters);
  };

  const handleDelete = async () => {
    if (!deleteTarget?._id) return;

    try {
      setDeleteLoading(true);
      setError("");

      await deleteQuiz(deleteTarget._id);
      await loadQuizzes(page);
      await loadStats();

      setToast("Quiz deleted successfully.");
      setDeleteTarget(null);
    } catch (err) {
      setError(getMessage(err, "Failed to delete quiz."));
    } finally {
      setDeleteLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Quizzes",
      value: stats?.totalQuizzes || 0,
      sub: `${stats?.activeQuizzes || 0} active quizzes`,
      icon: FaLayerGroup,
      tone: "violet",
    },
    {
      title: "Total Questions",
      value: stats?.totalQuestions || 0,
      sub: `${stats?.activeQuestions || 0} active questions`,
      icon: FaQuestionCircle,
      tone: "sky",
    },
    {
      title: "Attempts",
      value: stats?.totalAttempts || 0,
      sub: `${stats?.completedAttempts || 0} completed attempts`,
      icon: FaCheckCircle,
      tone: "green",
    },
    {
      title: "Average Score",
      value: `${stats?.averageScore || 0}%`,
      sub: `${stats?.passedAttempts || 0} passed attempts`,
      icon: FaBullseye,
      tone: "amber",
    },
  ];

  return (
    <section className="min-h-screen overflow-x-hidden bg-[#f8f8fb] px-3 py-3 md:px-4 lg:px-5">
      <div className="mx-auto w-full max-w-[1360px]">
        {toast && (
          <div className="fixed right-4 top-4 z-50 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-xs font-semibold text-emerald-700 shadow-xl">
            {toast}
          </div>
        )}

        <div className="mb-3 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
          <div className="min-w-0">
            <div className="mb-1.5 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-400">
              <span>Admin</span>
              <span>/</span>
              <span className="text-slate-600">Quiz Management</span>
            </div>

            <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
              Quiz Management
            </h1>

            <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
              Create, manage, filter and monitor quiz series from one clean
              admin dashboard.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                loadStats();
                loadQuizzes(page);
              }}
              disabled={loading || statsLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <FaSyncAlt className={loading ? "animate-spin" : ""} />
              Refresh
            </button>

            <Link
              href="/admin/quizzes/create"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800"
            >
              <FaPlus />
              Create Quiz
            </Link>
          </div>
        </div>

        <div className="mb-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((item) => (
            <StatCard
              key={item.title}
              title={item.title}
              value={item.value}
              sub={item.sub}
              icon={item.icon}
              tone={item.tone}
              loading={statsLoading}
            />
          ))}
        </div>

        <div className="mb-3 rounded-[16px] border border-slate-200 bg-white p-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
          <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <FaFilter className="text-sm" />
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Filter Quizzes
                </h2>

                <p className="text-[11px] font-medium text-slate-400">
                  {activeFilterCount > 0
                    ? `${activeFilterCount} filter active`
                    : "Search and filter quiz records"}
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

          <div className="grid gap-2.5 lg:grid-cols-[minmax(0,1.4fr)_160px_150px_140px_90px]">
            <div className="relative min-w-0">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                placeholder="Search by title, slug, type..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-[#f8f8fb] pl-9 pr-3 text-xs font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"
              />
            </div>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-[#f8f8fb] px-3 text-xs font-bold text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"
            >
              {quizTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-[#f8f8fb] px-3 text-xs font-bold text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"
            >
              {statuses.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <select
              value={isPaid}
              onChange={(e) => setIsPaid(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-[#f8f8fb] px-3 text-xs font-bold text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"
            >
              <option value="all">All Payment</option>
              <option value="false">Free</option>
              <option value="true">Paid</option>
            </select>

            <button
              onClick={handleSearch}
              disabled={loading}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3 text-xs font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <FaSearch />
              Apply
            </button>
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
                All Quizzes
              </h2>

              <p className="mt-0.5 text-xs font-medium text-slate-400">
                {pagination?.total || 0} quiz found
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <Badge tone="violet">Page {pagination?.page || page}</Badge>
              <Badge>{pagination?.totalPages || 1} pages</Badge>
            </div>
          </div>

          <div className="hidden max-w-full overflow-x-auto lg:block">
            <table className="w-full min-w-[980px] table-fixed text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-[#fbfbfd]">
                  <th className="w-[34%] px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Quiz
                  </th>
                  <th className="w-[18%] px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Type
                  </th>
                  <th className="w-[15%] px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Info
                  </th>
                  <th className="w-[14%] px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Payment
                  </th>
                  <th className="w-[11%] px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Status
                  </th>
                  <th className="w-[8%] px-3 py-2.5 text-right text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <LoadingRows />
                ) : quizzes.length ? (
                  quizzes.map((quiz) => (
                    <tr
                      key={quiz._id}
                      className="transition duration-200 hover:bg-[#fbfbfd]"
                    >
                      <td className="px-3 py-2.5">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <div className="h-12 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-100">
                            {quiz.coverImage ? (
                              <img
                                src={mediaUrl(quiz.coverImage)}
                                alt={quiz.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-slate-400">
                                <FaImage />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-xs font-bold text-slate-900">
                              {quiz.title || "Untitled Quiz"}
                            </h3>

                            <p className="mt-1 truncate text-[11px] font-medium text-slate-400">
                              {quiz.slug || "No slug"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-2.5">
                        <Badge tone="sky">{formatType(quiz.type)}</Badge>
                      </td>

                      <td className="px-3 py-2.5">
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-slate-700">
                            Q: {quiz.totalQuestions || 0}
                          </p>

                          <p className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                            <FaClock className="text-slate-300" />
                            {quiz.durationMinutes || 0} min ·{" "}
                            {quiz.passingScore || 0}%
                          </p>
                        </div>
                      </td>

                      <td className="px-3 py-2.5">
                        <Badge tone={quiz.isPaid ? "amber" : "green"}>
                          {quiz.isPaid ? "Paid" : "Free"}
                        </Badge>
                      </td>

                      <td className="px-3 py-2.5">
                        <Badge
                          tone={quiz.status === "active" ? "green" : "slate"}
                        >
                          {quiz.status || "inactive"}
                        </Badge>
                      </td>

                      <td className="px-3 py-2.5 text-right">
                        <div className="flex justify-end gap-1.5">
                          <Link
                            href={`/admin/quizzes/${quiz._id}/questions`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 text-xs font-bold text-sky-700 transition hover:bg-sky-100"
                            title="Questions"
                          >
                            <FaQuestionCircle />
                          </Link>

                          <Link
                            href={`/admin/quizzes/${quiz._id}/edit`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>

                          <button
                            onClick={() => setDeleteTarget(quiz)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
                            title="Delete"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">
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
                  className="h-40 animate-pulse rounded-[15px] bg-slate-100"
                />
              ))
            ) : quizzes.length ? (
              quizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="rounded-[15px] border border-slate-200 bg-white p-3 shadow-sm"
                >
                  <div className="flex gap-2.5">
                    <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-100">
                      {quiz.coverImage ? (
                        <img
                          src={mediaUrl(quiz.coverImage)}
                          alt={quiz.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-400">
                          <FaImage />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-sm font-bold text-slate-900">
                        {quiz.title || "Untitled Quiz"}
                      </h3>

                      <p className="mt-1 break-all text-[11px] font-medium text-slate-400">
                        {quiz.slug || "No slug"}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <Badge tone="sky">{formatType(quiz.type)}</Badge>
                        <Badge
                          tone={quiz.status === "active" ? "green" : "slate"}
                        >
                          {quiz.status || "inactive"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-4 gap-2">
                    <div className="rounded-xl bg-slate-50 p-2.5">
                      <p className="text-[10px] font-bold uppercase text-slate-400">
                        Q
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        {quiz.totalQuestions || 0}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-2.5">
                      <p className="text-[10px] font-bold uppercase text-slate-400">
                        Time
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        {quiz.durationMinutes || 0}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-2.5">
                      <p className="text-[10px] font-bold uppercase text-slate-400">
                        Pass
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        {quiz.passingScore || 0}%
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-2.5">
                      <p className="text-[10px] font-bold uppercase text-slate-400">
                        Pay
                      </p>
                      <div className="mt-1">
                        <Badge tone={quiz.isPaid ? "amber" : "green"}>
                          {quiz.isPaid ? "Paid" : "Free"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap justify-end gap-1.5 border-t border-slate-100 pt-3">
                    <Link
                      href={`/admin/quizzes/${quiz._id}/questions`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-sky-200 bg-sky-50 px-2.5 py-2 text-[11px] font-bold text-sky-700"
                    >
                      <FaQuestionCircle />
                      Questions
                    </Link>

                    <Link
                      href={`/admin/quizzes/${quiz._id}/edit`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-[11px] font-bold text-slate-700"
                    >
                      <FaEdit />
                      Edit
                    </Link>

                    <button
                      onClick={() => setDeleteTarget(quiz)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-2.5 py-2 text-[11px] font-bold text-rose-700"
                    >
                      <FaTrashAlt />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState />
            )}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="flex flex-col items-center justify-between gap-2 border-t border-slate-100 px-3.5 py-3 sm:flex-row">
              <p className="text-xs font-semibold text-slate-400">
                Page <span className="text-slate-800">{pagination.page}</span>{" "}
                of{" "}
                <span className="text-slate-800">{pagination.totalPages}</span>
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  disabled={!pagination.hasPrevPage || loading}
                  onClick={() => loadQuizzes(page - 1)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaChevronLeft className="text-[10px]" />
                  Prev
                </button>

                <button
                  disabled={!pagination.hasNextPage || loading}
                  onClick={() => loadQuizzes(page + 1)}
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

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[16px] bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                  <FaTrashAlt />
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Delete Quiz
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Are you sure you want to delete{" "}
                    <span className="font-bold text-slate-800">
                      {deleteTarget.title || "this quiz"}
                    </span>
                    ? This action cannot be undone.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleteLoading}
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleteLoading ? (
                  <FaSyncAlt className="animate-spin" />
                ) : (
                  <FaTrashAlt />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
