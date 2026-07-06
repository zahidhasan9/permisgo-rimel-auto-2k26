// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { getQuizzes } from "@/features/API";
// import { mediaUrl } from "@/utils/mediaUrl";

// export default function StudentQuizzesPage() {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const loadQuizzes = async () => {
//       try {
//         const res = await getQuizzes();
//         setQuizzes(res.data?.data || []);
//       } catch (err) {
//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             "Failed to load quizzes",
//         );
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadQuizzes();
//   }, []);

//   return (
//     <div className="container py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h2 className="mb-1">Quiz Series</h2>
//           <p className="text-muted mb-0">
//             Practice, listen to questions, answer and review your score.
//           </p>
//         </div>
//         <Link
//           href="/student/quizzes/history"
//           className="btn btn-outline-primary"
//         >
//           My Records
//         </Link>
//       </div>

//       {error && <div className="alert alert-danger">{error}</div>}
//       {loading ? (
//         <div className="alert alert-info">Loading quizzes...</div>
//       ) : null}

//       <div className="row g-4">
//         {quizzes.map((quiz) => (
//           <div key={quiz._id} className="col-md-6 col-lg-4">
//             <div className="card h-100 border-0 shadow-sm overflow-hidden">
//               {quiz.coverImage ? (
//                 <img
//                   src={mediaUrl(quiz.coverImage)}
//                   alt={quiz.title}
//                   style={{ width: "100%", height: 170, objectFit: "cover" }}
//                 />
//               ) : null}
//               <div className="card-body d-flex flex-column">
//                 <span className="badge bg-light text-dark align-self-start mb-2">
//                   {quiz.type}
//                 </span>
//                 <h5>{quiz.title}</h5>
//                 <p className="text-muted small flex-grow-1">
//                   {quiz.description || "No description"}
//                 </p>
//                 <div className="d-flex justify-content-between text-muted small mb-3">
//                   <span>{quiz.totalQuestions || 0} questions</span>
//                   <span>{quiz.durationMinutes} min</span>
//                   <span>Pass {quiz.passingScore}%</span>
//                 </div>
//                 <Link
//                   href={`/student/quizzes/${quiz._id}/attempt`}
//                   className="btn btn-primary w-100"
//                 >
//                   Start Quiz
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//         {!quizzes.length && !loading && (
//           <div className="col-12">
//             <div className="alert alert-warning">No active quiz found.</div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getQuizzes } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

export default function StudentQuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const res = await getQuizzes();
        setQuizzes(res.data?.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load quizzes",
        );
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Quiz Series</h1>

            <p className="mt-2 text-slate-500">
              Practice, listen to questions, answer and review your score.
            </p>
          </div>

          <Link
            href="/student/quizzes/history"
            className="rounded-xl border border-indigo-600 bg-white px-6 py-3 font-semibold text-indigo-600 shadow transition hover:bg-indigo-600 hover:text-white"
          >
            My Records
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
            Loading quizzes...
          </div>
        )}

        {/* Quiz Grid */}

        {!loading && (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {quizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Cover */}

                {quiz.coverImage ? (
                  <img
                    src={mediaUrl(quiz.coverImage)}
                    alt={quiz.title}
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-52 items-center justify-center bg-slate-200 text-slate-500">
                    No Image
                  </div>
                )}

                {/* Body */}

                <div className="flex h-[280px] flex-col p-6">
                  <span className="mb-3 w-fit rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                    {quiz.type.replace("_", " ")}
                  </span>

                  <h2 className="mb-2 text-xl font-bold text-slate-800">
                    {quiz.title}
                  </h2>

                  <p className="mb-5 flex-1 text-sm leading-6 text-slate-500 line-clamp-3">
                    {quiz.description || "No description available."}
                  </p>

                  {/* Info */}

                  <div className="mb-5 grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-3 text-center">
                    <div>
                      <p className="text-lg font-bold text-slate-800">
                        {quiz.totalQuestions || 0}
                      </p>

                      <p className="text-xs text-slate-500">Questions</p>
                    </div>

                    <div>
                      <p className="text-lg font-bold text-slate-800">
                        {quiz.durationMinutes}
                      </p>

                      <p className="text-xs text-slate-500">Minutes</p>
                    </div>

                    <div>
                      <p className="text-lg font-bold text-green-600">
                        {quiz.passingScore}%
                      </p>

                      <p className="text-xs text-slate-500">Pass</p>
                    </div>
                  </div>

                  <Link
                    href={`/student/quizzes/${quiz._id}/attempt`}
                    className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-center font-semibold text-white transition hover:from-indigo-700 hover:to-purple-700"
                  >
                    Start Quiz
                  </Link>
                </div>
              </div>
            ))}

            {!quizzes.length && (
              <div className="col-span-full rounded-2xl border border-yellow-200 bg-yellow-50 py-16 text-center text-yellow-700 shadow">
                No active quiz found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
