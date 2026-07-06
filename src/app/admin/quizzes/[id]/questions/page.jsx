// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { deleteQuizQuestion, getAdminQuizQuestions, getQuizById } from "@/features/API";
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
//       const [quizRes, questionRes] = await Promise.all([getQuizById(id), getAdminQuizQuestions(id)]);
//       setQuiz(quizRes.data?.data);
//       setQuestions(questionRes.data?.data || []);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || "Failed to load questions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id) loadData();
//   }, [id]);

//   const handleDelete = async (questionId) => {
//     if (!confirm("Delete this question?")) return;
//     await deleteQuizQuestion(questionId);
//     loadData();
//   };

//   return (
//     <div className="container py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h2 className="mb-1">Questions</h2>
//           <p className="text-muted mb-0">{quiz?.title}</p>
//         </div>
//         <Link href={`/admin/quizzes/${id}/questions/create`} className="btn btn-primary">Add Question</Link>
//       </div>

//       {error && <div className="alert alert-danger">{error}</div>}
//       {loading ? <div className="alert alert-info">Loading questions...</div> : null}

//       <div className="card border-0 shadow-sm">
//         <div className="table-responsive">
//           <table className="table table-hover align-middle mb-0">
//             <thead className="table-light">
//               <tr>
//                 <th>Order</th>
//                 <th>Image</th>
//                 <th>Question</th>
//                 <th>Correct</th>
//                 <th>Difficulty</th>
//                 <th>Status</th>
//                 <th className="text-end">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {questions.map((question) => (
//                 <tr key={question._id}>
//                   <td>{question.order}</td>
//                   <td style={{ width: 90 }}>
//                     {question.questionImage ? <img src={mediaUrl(question.questionImage)} alt="Question" className="rounded" style={{ width: 70, height: 45, objectFit: "cover" }} /> : "—"}
//                   </td>
//                   <td style={{ maxWidth: 420 }}>{question.questionText}</td>
//                   <td>{String.fromCharCode(65 + Number(question.correctOptionIndex || 0))}</td>
//                   <td>{question.difficulty}</td>
//                   <td><span className={`badge ${question.status === "active" ? "bg-success" : "bg-secondary"}`}>{question.status}</span></td>
//                   <td className="text-end">
//                     <Link href={`/admin/quizzes/${id}/questions/${question._id}/edit`} className="btn btn-sm btn-outline-secondary me-2">Edit</Link>
//                     <button onClick={() => handleDelete(question._id)} className="btn btn-sm btn-outline-danger">Delete</button>
//                   </td>
//                 </tr>
//               ))}
//               {!questions.length && !loading && (
//                 <tr><td colSpan="7" className="text-center py-4 text-muted">No question found.</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  deleteQuizQuestion,
  getAdminQuizQuestions,
  getQuizById,
} from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

export default function AdminQuizQuestionsPage() {
  const { id } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);

      const [quizRes, questionRes] = await Promise.all([
        getQuizById(id),
        getAdminQuizQuestions(id),
      ]);

      setQuiz(quizRes.data?.data);
      setQuestions(questionRes.data?.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load questions",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const handleDelete = async (questionId) => {
    if (!confirm("Delete this question?")) return;

    try {
      await deleteQuizQuestion(questionId);
      loadData();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete question",
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Quiz Questions
            </h1>

            <p className="mt-2 text-slate-500">
              {quiz?.title || "Loading quiz..."}
            </p>
          </div>

          <Link
            href={`/admin/quizzes/${id}/questions/create`}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-indigo-700 hover:shadow-xl"
          >
            + Add Question
          </Link>
        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}

        {loading && (
          <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-5 text-blue-700">
            Loading questions...
          </div>
        )}

        {/* Table */}

        {!loading && (
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Order</th>

                    <th className="px-6 py-4 text-left">Image</th>

                    <th className="px-6 py-4 text-left">Question</th>

                    <th className="px-6 py-4 text-center">Correct</th>

                    <th className="px-6 py-4 text-center">Difficulty</th>

                    <th className="px-6 py-4 text-center">Status</th>

                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {questions.map((question) => (
                    <tr
                      key={question._id}
                      className="transition hover:bg-indigo-50"
                    >
                      <td className="px-6 py-4 font-semibold">
                        {question.order}
                      </td>

                      <td className="px-6 py-4">
                        {question.questionImage ? (
                          <img
                            src={mediaUrl(question.questionImage)}
                            alt="Question"
                            className="h-16 w-24 rounded-xl object-cover shadow"
                          />
                        ) : (
                          <div className="flex h-16 w-24 items-center justify-center rounded-xl bg-slate-200 text-sm text-slate-500">
                            No Image
                          </div>
                        )}
                      </td>

                      <td className="max-w-md px-6 py-4">
                        <p className="line-clamp-2 font-medium text-slate-800">
                          {question.questionText}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-center font-bold text-indigo-600">
                        {String.fromCharCode(
                          65 + Number(question.correctOptionIndex || 0),
                        )}
                      </td>

                      <td className="px-6 py-4 text-center capitalize">
                        {question.difficulty}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`rounded-full px-4 py-1 text-sm font-semibold ${
                            question.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {question.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/quizzes/${id}/questions/${question._id}/edit`}
                            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => handleDelete(question._id)}
                            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {!questions.length && (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-16 text-center text-slate-500"
                      >
                        No questions found.
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
