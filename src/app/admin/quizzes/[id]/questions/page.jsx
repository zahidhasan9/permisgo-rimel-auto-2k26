// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import {
//   deleteQuizQuestion,
//   getAdminQuizQuestions,
//   getQuizById,
// } from "@/features/API";
// import { mediaUrl } from "@/utils/mediaUrl";

// export default function AdminQuizQuestionsPage() {
//   const { id } = useParams();

//   const [quiz, setQuiz] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const loadData = async () => {
//     try {
//       setLoading(true);

//       const [quizRes, questionRes] = await Promise.all([
//         getQuizById(id),
//         getAdminQuizQuestions(id),
//       ]);

//       setQuiz(quizRes.data?.data);
//       setQuestions(questionRes.data?.data || []);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           err.message ||
//           "Failed to load questions",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       loadData();
//     }
//   }, [id]);

//   const handleDelete = async (questionId) => {
//     if (!confirm("Delete this question?")) return;

//     try {
//       await deleteQuizQuestion(questionId);
//       loadData();
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           err.message ||
//           "Failed to delete question",
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 p-6">
//       <div className="mx-auto max-w-7xl">
//         {/* Header */}

//         <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-800">
//               Quiz Questions
//             </h1>

//             <p className="mt-2 text-slate-500">
//               {quiz?.title || "Loading quiz..."}
//             </p>
//           </div>

//           <Link
//             href={`/admin/quizzes/${id}/questions/create`}
//             className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-indigo-700 hover:shadow-xl"
//           >
//             + Add Question
//           </Link>
//         </div>

//         {/* Error */}

//         {error && (
//           <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
//             {error}
//           </div>
//         )}

//         {/* Loading */}

//         {loading && (
//           <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-5 text-blue-700">
//             Loading questions...
//           </div>
//         )}

//         {/* Table */}

//         {!loading && (
//           <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
//             <div className="overflow-x-auto">
//               <table className="min-w-full">
//                 <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
//                   <tr>
//                     <th className="px-6 py-4 text-left">Order</th>

//                     <th className="px-6 py-4 text-left">Image</th>

//                     <th className="px-6 py-4 text-left">Question</th>

//                     <th className="px-6 py-4 text-center">Correct</th>

//                     <th className="px-6 py-4 text-center">Difficulty</th>

//                     <th className="px-6 py-4 text-center">Status</th>

//                     <th className="px-6 py-4 text-right">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-slate-200">
//                   {questions.map((question) => (
//                     <tr
//                       key={question._id}
//                       className="transition hover:bg-indigo-50"
//                     >
//                       <td className="px-6 py-4 font-semibold">
//                         {question.order}
//                       </td>

//                       <td className="px-6 py-4">
//                         {question.questionImage ? (
//                           <img
//                             src={mediaUrl(question.questionImage)}
//                             alt="Question"
//                             className="h-16 w-24 rounded-xl object-cover shadow"
//                           />
//                         ) : (
//                           <div className="flex h-16 w-24 items-center justify-center rounded-xl bg-slate-200 text-sm text-slate-500">
//                             No Image
//                           </div>
//                         )}
//                       </td>

//                       <td className="max-w-md px-6 py-4">
//                         <p className="line-clamp-2 font-medium text-slate-800">
//                           {question.questionText}
//                         </p>
//                       </td>

//                       <td className="px-6 py-4 text-center font-bold text-indigo-600">
//                         {String.fromCharCode(
//                           65 + Number(question.correctOptionIndex || 0),
//                         )}
//                       </td>

//                       <td className="px-6 py-4 text-center capitalize">
//                         {question.difficulty}
//                       </td>

//                       <td className="px-6 py-4 text-center">
//                         <span
//                           className={`rounded-full px-4 py-1 text-sm font-semibold ${
//                             question.status === "active"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-gray-200 text-gray-600"
//                           }`}
//                         >
//                           {question.status}
//                         </span>
//                       </td>

//                       <td className="px-6 py-4">
//                         <div className="flex justify-end gap-2">
//                           <Link
//                             href={`/admin/quizzes/${id}/questions/${question._id}/edit`}
//                             className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
//                           >
//                             Edit
//                           </Link>

//                           <button
//                             onClick={() => handleDelete(question._id)}
//                             className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}

//                   {!questions.length && (
//                     <tr>
//                       <td
//                         colSpan={7}
//                         className="py-16 text-center text-slate-500"
//                       >
//                         No questions found.
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
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaEdit,
  FaExclamationTriangle,
  FaEye,
  FaImage,
  FaLayerGroup,
  FaListOl,
  FaPlus,
  FaQuestionCircle,
  FaSyncAlt,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa";
import {
  deleteQuizQuestion,
  getAdminQuizQuestions,
  getQuizById,
} from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

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

function getMessage(error, fallback = "Something went wrong.") {
  return error?.response?.data?.message || error?.message || fallback;
}

function EmptyState() {
  return (
    <div className="flex min-h-[240px] items-center justify-center p-5 text-center">
      <div>
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <FaQuestionCircle className="text-xl" />
        </div>

        <h3 className="text-base font-bold text-slate-900">
          No questions found
        </h3>

        <p className="mt-1.5 max-w-sm text-sm font-medium text-slate-400">
          Add a new question to start building this quiz.
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

export default function AdminQuizQuestionsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [quizRes, questionRes] = await Promise.all([
        getQuizById(id),
        getAdminQuizQuestions(id),
      ]);

      setQuiz(quizRes.data?.data || null);
      setQuestions(questionRes.data?.data || []);
    } catch (err) {
      setError(getMessage(err, "Failed to load questions"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast("");
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

  const stats = useMemo(() => {
    const total = questions.length;
    const active = questions.filter((item) => item.status === "active").length;
    const inactive = questions.filter(
      (item) => item.status !== "active",
    ).length;

    return { total, active, inactive };
  }, [questions]);

  const handleDelete = async () => {
    if (!deleteTarget?._id) return;

    try {
      setDeleteLoading(true);
      setError("");

      await deleteQuizQuestion(deleteTarget._id);
      await loadData();

      setDeleteTarget(null);
      setToast("Question deleted successfully.");
    } catch (err) {
      setError(getMessage(err, "Failed to delete question"));
    } finally {
      setDeleteLoading(false);
    }
  };

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
              <span>Quizzes</span>
              <span>/</span>
              <span className="text-slate-600">Questions</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <FaQuestionCircle className="text-sm" />
              </div>

              <div className="min-w-0">
                <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                  Quiz Questions
                </h1>

                <p className="mt-1 max-w-2xl truncate text-xs leading-5 text-slate-500">
                  {quiz?.title || "Loading quiz..."}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <FaArrowLeft />
              Back
            </button>

            <button
              type="button"
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <FaSyncAlt className={loading ? "animate-spin" : ""} />
              Refresh
            </button>

            <Link
              href={`/admin/quizzes/${id}/questions/create`}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800"
            >
              <FaPlus />
              Add Question
            </Link>
          </div>
        </div>

        <div className="mb-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[16px] border border-slate-200 bg-white p-3.5 shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  Total Questions
                </p>
                <h3 className="mt-1.5 text-2xl font-bold text-slate-900">
                  {loading ? "..." : stats.total}
                </h3>
                <p className="mt-1 text-[11px] font-medium text-slate-400">
                  All questions in this quiz
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <FaListOl className="text-sm" />
              </div>
            </div>
          </div>

          <div className="rounded-[16px] border border-slate-200 bg-white p-3.5 shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-500">Active</p>
                <h3 className="mt-1.5 text-2xl font-bold text-slate-900">
                  {loading ? "..." : stats.active}
                </h3>
                <p className="mt-1 text-[11px] font-medium text-slate-400">
                  Published questions
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <FaCheckCircle className="text-sm" />
              </div>
            </div>
          </div>

          <div className="rounded-[16px] border border-slate-200 bg-white p-3.5 shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-500">Inactive</p>
                <h3 className="mt-1.5 text-2xl font-bold text-slate-900">
                  {loading ? "..." : stats.inactive}
                </h3>
                <p className="mt-1 text-[11px] font-medium text-slate-400">
                  Hidden questions
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <FaLayerGroup className="text-sm" />
              </div>
            </div>
          </div>

          <div className="rounded-[16px] border border-slate-200 bg-white p-3.5 shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-500">
                  Current Quiz
                </p>
                <h3 className="mt-1.5 truncate text-sm font-bold text-slate-900">
                  {quiz?.title || "Quiz information"}
                </h3>
                <p className="mt-1 truncate text-[11px] font-medium text-slate-400">
                  Manage question list
                </p>
              </div>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <FaEye className="text-sm" />
              </div>
            </div>
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
                All Questions
              </h2>

              <p className="mt-0.5 text-xs font-medium text-slate-400">
                {questions.length} question found
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <Badge tone="violet">{stats.total} total</Badge>
              <Badge tone="green">{stats.active} active</Badge>
              <Badge tone="amber">{stats.inactive} inactive</Badge>
            </div>
          </div>

          <div className="hidden max-w-full overflow-x-auto lg:block">
            <table className="w-full min-w-[940px] table-fixed text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-[#fbfbfd]">
                  <th className="w-[8%] px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Order
                  </th>

                  <th className="w-[11%] px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Image
                  </th>

                  <th className="w-[38%] px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Question
                  </th>

                  <th className="w-[10%] px-3 py-2.5 text-center text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Correct
                  </th>

                  <th className="w-[13%] px-3 py-2.5 text-center text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Difficulty
                  </th>

                  <th className="w-[10%] px-3 py-2.5 text-center text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Status
                  </th>

                  <th className="w-[10%] px-3 py-2.5 text-right text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <LoadingRows />
                ) : questions.length ? (
                  questions.map((question) => (
                    <tr
                      key={question._id}
                      className="transition duration-200 hover:bg-[#fbfbfd]"
                    >
                      <td className="px-3 py-2.5">
                        <span className="text-sm font-bold text-slate-800">
                          {question.order || 0}
                        </span>
                      </td>

                      <td className="px-3 py-2.5">
                        {question.questionImage ? (
                          <img
                            src={mediaUrl(question.questionImage)}
                            alt="Question"
                            className="h-11 w-16 rounded-xl border border-slate-100 object-cover"
                          />
                        ) : (
                          <div className="flex h-11 w-16 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                            <FaImage className="text-sm" />
                          </div>
                        )}
                      </td>

                      <td className="px-3 py-2.5">
                        <p className="line-clamp-2 text-xs font-semibold leading-5 text-slate-800">
                          {question.questionText || "No question text"}
                        </p>
                      </td>

                      <td className="px-3 py-2.5 text-center">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-violet-50 text-xs font-bold text-violet-700">
                          {String.fromCharCode(
                            65 + Number(question.correctOptionIndex || 0),
                          )}
                        </span>
                      </td>

                      <td className="px-3 py-2.5 text-center">
                        <Badge tone="sky">
                          {question.difficulty || "normal"}
                        </Badge>
                      </td>

                      <td className="px-3 py-2.5 text-center">
                        <Badge
                          tone={
                            question.status === "active" ? "green" : "slate"
                          }
                        >
                          {question.status || "inactive"}
                        </Badge>
                      </td>

                      <td className="px-3 py-2.5">
                        <div className="flex justify-end gap-1.5">
                          <Link
                            href={`/admin/quizzes/${id}/questions/${question._id}/edit`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-xs font-bold text-amber-700 transition hover:bg-amber-100"
                            title="Edit question"
                          >
                            <FaEdit />
                          </Link>

                          <button
                            onClick={() => setDeleteTarget(question)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
                            title="Delete question"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
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
                  className="h-40 animate-pulse rounded-[15px] bg-slate-100"
                />
              ))
            ) : questions.length ? (
              questions.map((question) => (
                <div
                  key={question._id}
                  className="rounded-[15px] border border-slate-200 bg-white p-3 shadow-sm"
                >
                  <div className="flex gap-2.5">
                    {question.questionImage ? (
                      <img
                        src={mediaUrl(question.questionImage)}
                        alt="Question"
                        className="h-16 w-20 shrink-0 rounded-xl border border-slate-100 object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-20 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                        <FaImage />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                        <Badge tone="violet">Order {question.order || 0}</Badge>
                        <Badge
                          tone={
                            question.status === "active" ? "green" : "slate"
                          }
                        >
                          {question.status || "inactive"}
                        </Badge>
                      </div>

                      <p className="line-clamp-3 text-sm font-semibold leading-5 text-slate-800">
                        {question.questionText || "No question text"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <div className="rounded-xl bg-slate-50 p-2.5">
                      <p className="text-[10px] font-bold uppercase text-slate-400">
                        Correct
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        {String.fromCharCode(
                          65 + Number(question.correctOptionIndex || 0),
                        )}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-2.5">
                      <p className="text-[10px] font-bold uppercase text-slate-400">
                        Level
                      </p>
                      <p className="mt-1 text-sm font-bold capitalize text-slate-800">
                        {question.difficulty || "normal"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-2.5">
                      <p className="text-[10px] font-bold uppercase text-slate-400">
                        Status
                      </p>
                      <p className="mt-1 text-sm font-bold capitalize text-slate-800">
                        {question.status || "inactive"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-end gap-1.5 border-t border-slate-100 pt-3">
                    <Link
                      href={`/admin/quizzes/${id}/questions/${question._id}/edit`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-2.5 py-2 text-[11px] font-bold text-amber-700"
                    >
                      <FaEdit />
                      Edit
                    </Link>

                    <button
                      onClick={() => setDeleteTarget(question)}
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
                    Delete Question
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Are you sure you want to delete this question? This action
                    cannot be undone.
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
