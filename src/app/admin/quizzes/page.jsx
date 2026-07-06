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
//       setError(err.response?.data?.message || err.message || "Failed to load quizzes");
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
//     <div className="container py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h2 className="mb-1">Quiz Management</h2>
//           <p className="text-muted mb-0">Admin can create, edit and delete quiz series.</p>
//         </div>
//         <Link href="/admin/quizzes/create" className="btn btn-primary">Create Quiz</Link>
//       </div>

//       {error && <div className="alert alert-danger">{error}</div>}
//       {loading ? <div className="alert alert-info">Loading quizzes...</div> : null}

//       <div className="table-responsive card border-0 shadow-sm">
//         <table className="table table-hover align-middle mb-0">
//           <thead className="table-light">
//             <tr>
//               <th>Image</th>
//               <th>Title</th>
//               <th>Type</th>
//               <th>Questions</th>
//               <th>Duration</th>
//               <th>Pass %</th>
//               <th>Status</th>
//               <th className="text-end">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {quizzes.map((quiz) => (
//               <tr key={quiz._id}>
//                 <td style={{ width: 90 }}>
//                   {quiz.coverImage ? <img src={mediaUrl(quiz.coverImage)} alt={quiz.title} className="rounded" style={{ width: 70, height: 45, objectFit: "cover" }} /> : "—"}
//                 </td>
//                 <td className="fw-semibold">{quiz.title}</td>
//                 <td>{quiz.type}</td>
//                 <td>{quiz.totalQuestions || 0}</td>
//                 <td>{quiz.durationMinutes} min</td>
//                 <td>{quiz.passingScore}%</td>
//                 <td><span className={`badge ${quiz.status === "active" ? "bg-success" : "bg-secondary"}`}>{quiz.status}</span></td>
//                 <td className="text-end">
//                   <Link href={`/admin/quizzes/${quiz._id}/questions`} className="btn btn-sm btn-outline-primary me-2">Questions</Link>
//                   <Link href={`/admin/quizzes/${quiz._id}/edit`} className="btn btn-sm btn-outline-secondary me-2">Edit</Link>
//                   <button onClick={() => handleDelete(quiz._id)} className="btn btn-sm btn-outline-danger">Delete</button>
//                 </td>
//               </tr>
//             ))}
//             {!quizzes.length && !loading && (
//               <tr><td colSpan="8" className="text-center py-4 text-muted">No quiz found.</td></tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteQuiz, getAdminQuizzes } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

export default function AdminQuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const res = await getAdminQuizzes();
      setQuizzes(res.data?.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to load quizzes",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  const handleDelete = async (quizId) => {
    if (!confirm("Are you sure you want to delete this quiz?")) return;
    await deleteQuiz(quizId);
    loadQuizzes();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Quiz Management
            </h1>
            <p className="mt-2 text-slate-500">
              Manage all quizzes, questions and settings.
            </p>
          </div>

          <Link
            href="/admin/quizzes/create"
            className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold shadow-lg transition hover:bg-indigo-700 hover:shadow-xl"
          >
            + Create Quiz
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {loading && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-blue-700">
            Loading quizzes...
          </div>
        )}

        {/* Table */}

        {!loading && (
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Image</th>

                    <th className="px-6 py-4 text-left">Title</th>

                    <th className="px-6 py-4 text-left">Type</th>

                    <th className="px-6 py-4 text-center">Questions</th>

                    <th className="px-6 py-4 text-center">Duration</th>

                    <th className="px-6 py-4 text-center">Pass %</th>

                    <th className="px-6 py-4 text-center">Status</th>

                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {quizzes.map((quiz) => (
                    <tr
                      key={quiz._id}
                      className="transition hover:bg-indigo-50"
                    >
                      <td className="px-6 py-4">
                        {quiz.coverImage ? (
                          <img
                            src={mediaUrl(quiz.coverImage)}
                            alt={quiz.title}
                            className="h-16 w-24 rounded-xl object-cover shadow"
                          />
                        ) : (
                          <div className="flex h-16 w-24 items-center justify-center rounded-xl bg-slate-200 text-slate-500">
                            No Image
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <h3 className="font-semibold text-slate-800">
                          {quiz.title}
                        </h3>
                      </td>

                      <td className="px-6 py-4 capitalize text-slate-600">
                        {quiz.type}
                      </td>

                      <td className="px-6 py-4 text-center font-semibold">
                        {quiz.totalQuestions || 0}
                      </td>

                      <td className="px-6 py-4 text-center">
                        {quiz.durationMinutes} min
                      </td>

                      <td className="px-6 py-4 text-center">
                        {quiz.passingScore}%
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`rounded-full px-4 py-1 text-sm font-semibold ${
                            quiz.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {quiz.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/quizzes/${quiz._id}/questions`}
                            className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white transition hover:bg-blue-600"
                          >
                            Questions
                          </Link>

                          <Link
                            href={`/admin/quizzes/${quiz._id}/edit`}
                            className="rounded-lg bg-amber-500 px-4 py-2 text-sm text-white transition hover:bg-amber-600"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => handleDelete(quiz._id)}
                            className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white transition hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {!quizzes.length && (
                    <tr>
                      <td
                        colSpan={8}
                        className="py-16 text-center text-slate-500"
                      >
                        No quizzes found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
