// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { deleteQuiz, getAdminQuizzes } from "@/features/API";
// import { mediaUrl } from "@/utils/mediaUrl";

// export default function AdminQuizzesPage() {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const loadQuizzes = async () => {
//     try {
//       setLoading(true);
//       const res = await getAdminQuizzes();
//       setQuizzes(res.data?.data || []);
//     } catch (err) {
//       setError(
//         err.response?.data?.message || err.message || "Failed to load quizzes",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadQuizzes();
//   }, []);

//   const handleDelete = async (quizId) => {
//     if (!confirm("Are you sure you want to delete this quiz?")) return;
//     await deleteQuiz(quizId);
//     loadQuizzes();
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 p-6">
//       <div className="mx-auto max-w-7xl">
//         {/* Header */}

//         <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-800">
//               Quiz Management
//             </h1>
//             <p className="mt-2 text-slate-500">
//               Manage all quizzes, questions and settings.
//             </p>
//           </div>

//           <Link
//             href="/admin/quizzes/create"
//             className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold shadow-lg transition hover:bg-indigo-700 hover:shadow-xl"
//           >
//             + Create Quiz
//           </Link>
//         </div>

//         {error && (
//           <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
//             {error}
//           </div>
//         )}

//         {loading && (
//           <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-blue-700">
//             Loading quizzes...
//           </div>
//         )}

//         {/* Table */}

//         {!loading && (
//           <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
//             <div className="overflow-x-auto">
//               <table className="min-w-full">
//                 <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
//                   <tr>
//                     <th className="px-6 py-4 text-left">Image</th>

//                     <th className="px-6 py-4 text-left">Title</th>

//                     <th className="px-6 py-4 text-left">Type</th>

//                     <th className="px-6 py-4 text-center">Questions</th>

//                     <th className="px-6 py-4 text-center">Duration</th>

//                     <th className="px-6 py-4 text-center">Pass %</th>

//                     <th className="px-6 py-4 text-center">Status</th>

//                     <th className="px-6 py-4 text-right">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-slate-200">
//                   {quizzes.map((quiz) => (
//                     <tr
//                       key={quiz._id}
//                       className="transition hover:bg-indigo-50"
//                     >
//                       <td className="px-6 py-4">
//                         {quiz.coverImage ? (
//                           <img
//                             src={mediaUrl(quiz.coverImage)}
//                             alt={quiz.title}
//                             className="h-16 w-24 rounded-xl object-cover shadow"
//                           />
//                         ) : (
//                           <div className="flex h-16 w-24 items-center justify-center rounded-xl bg-slate-200 text-slate-500">
//                             No Image
//                           </div>
//                         )}
//                       </td>

//                       <td className="px-6 py-4">
//                         <h3 className="font-semibold text-slate-800">
//                           {quiz.title}
//                         </h3>
//                       </td>

//                       <td className="px-6 py-4 capitalize text-slate-600">
//                         {quiz.type}
//                       </td>

//                       <td className="px-6 py-4 text-center font-semibold">
//                         {quiz.totalQuestions || 0}
//                       </td>

//                       <td className="px-6 py-4 text-center">
//                         {quiz.durationMinutes} min
//                       </td>

//                       <td className="px-6 py-4 text-center">
//                         {quiz.passingScore}%
//                       </td>

//                       <td className="px-6 py-4 text-center">
//                         <span
//                           className={`rounded-full px-4 py-1 text-sm font-semibold ${
//                             quiz.status === "active"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-gray-200 text-gray-600"
//                           }`}
//                         >
//                           {quiz.status}
//                         </span>
//                       </td>

//                       <td className="px-6 py-4">
//                         <div className="flex justify-end gap-2">
//                           <Link
//                             href={`/admin/quizzes/${quiz._id}/questions`}
//                             className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white transition hover:bg-blue-600"
//                           >
//                             Questions
//                           </Link>

//                           <Link
//                             href={`/admin/quizzes/${quiz._id}/edit`}
//                             className="rounded-lg bg-amber-500 px-4 py-2 text-sm text-white transition hover:bg-amber-600"
//                           >
//                             Edit
//                           </Link>

//                           <button
//                             onClick={() => handleDelete(quiz._id)}
//                             className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white transition hover:bg-red-600"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}

//                   {!quizzes.length && (
//                     <tr>
//                       <td
//                         colSpan={8}
//                         className="py-16 text-center text-slate-500"
//                       >
//                         No quizzes found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [error, setError] = useState("");

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

  const loadQuizzes = async (targetPage = 1) => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page: targetPage,
        limit: 10,
      };

      if (search.trim()) params.search = search.trim();
      if (type !== "all") params.type = type;
      if (status !== "all") params.status = status;
      if (isPaid !== "all") params.isPaid = isPaid;

      const res = await getAdminQuizzes(params);
      const data = res.data?.data;

      setQuizzes(data?.quizzes || []);
      setPagination(data?.pagination || null);
      setPage(targetPage);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to load quizzes",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    loadQuizzes(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    loadQuizzes(1);
  };

  const handleReset = () => {
    setSearch("");
    setType("all");
    setStatus("all");
    setIsPaid("all");

    setTimeout(() => {
      loadQuizzes(1);
    }, 0);
  };

  const handleDelete = async (quizId) => {
    const ok = confirm("Are you sure you want to delete this quiz?");
    if (!ok) return;

    try {
      await deleteQuiz(quizId);
      await loadQuizzes(page);
      await loadStats();
    } catch (err) {
      alert(
        err.response?.data?.message || err.message || "Failed to delete quiz",
      );
    }
  };

  const statCards = [
    {
      title: "Total Quizzes",
      value: stats?.totalQuizzes || 0,
      sub: `${stats?.activeQuizzes || 0} active`,
    },
    {
      title: "Total Questions",
      value: stats?.totalQuestions || 0,
      sub: `${stats?.activeQuestions || 0} active`,
    },
    {
      title: "Attempts",
      value: stats?.totalAttempts || 0,
      sub: `${stats?.completedAttempts || 0} completed`,
    },
    {
      title: "Average Score",
      value: `${stats?.averageScore || 0}%`,
      sub: `${stats?.passedAttempts || 0} passed`,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Quiz Management
            </h1>
            <p className="mt-2 text-slate-500">
              Create, manage, filter and monitor quiz series from admin panel.
            </p>
          </div>

          <Link
            href="/admin/quizzes/create"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            + Create Quiz
          </Link>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-500">{item.title}</p>
              <div className="mt-3 flex items-end justify-between">
                <h2 className="text-3xl font-bold text-slate-800">
                  {statsLoading ? "..." : item.value}
                </h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {item.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-600">
                Search
              </label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                placeholder="Search by title, slug, type..."
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                {quizTypes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                {statuses.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">
                Payment
              </label>
              <select
                value={isPaid}
                onChange={(e) => setIsPaid(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="all">All</option>
                <option value="false">Free</option>
                <option value="true">Paid</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={handleSearch}
              className="rounded-xl bg-slate-900 px-5 py-2.5 font-semibold text-white transition hover:bg-slate-800"
            >
              Apply Filter
            </button>

            <button
              onClick={handleReset}
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Reset
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-lg font-bold text-slate-800">All Quizzes</h2>
            <p className="mt-1 text-sm text-slate-500">
              {pagination?.total || 0} quiz found
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    Quiz
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    Type
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    Questions
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    Duration
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    Pass
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    Payment
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    Status
                  </th>
                  <th className="px-5 py-4 text-right text-sm font-semibold text-slate-600">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-5 py-10 text-center text-slate-500"
                    >
                      Loading quizzes...
                    </td>
                  </tr>
                ) : quizzes.length ? (
                  quizzes.map((quiz) => (
                    <tr key={quiz._id} className="hover:bg-slate-50">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-14 w-20 overflow-hidden rounded-xl bg-slate-100">
                            {quiz.coverImage ? (
                              <img
                                src={mediaUrl(quiz.coverImage)}
                                alt={quiz.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                                No Image
                              </div>
                            )}
                          </div>

                          <div>
                            <h3 className="font-semibold text-slate-800">
                              {quiz.title}
                            </h3>
                            <p className="mt-1 text-xs text-slate-500">
                              {quiz.slug || "No slug"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {formatType(quiz.type)}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                        {quiz.totalQuestions || 0}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {quiz.durationMinutes || 0} min
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {quiz.passingScore || 0}%
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            quiz.isPaid
                              ? "bg-amber-100 text-amber-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {quiz.isPaid ? "Paid" : "Free"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            quiz.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {quiz.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/quizzes/${quiz._id}/questions`}
                            className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                          >
                            Questions
                          </Link>

                          <Link
                            href={`/admin/quizzes/${quiz._id}/edit`}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => handleDelete(quiz._id)}
                            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-5 py-10 text-center text-slate-500"
                    >
                      No quiz found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Page {pagination.page} of {pagination.totalPages}
              </p>

              <div className="flex gap-2">
                <button
                  disabled={!pagination.hasPrevPage || loading}
                  onClick={() => loadQuizzes(page - 1)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <button
                  disabled={!pagination.hasNextPage || loading}
                  onClick={() => loadQuizzes(page + 1)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
