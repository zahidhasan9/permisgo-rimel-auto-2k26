// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import QuizForm from "@/components/quiz/QuizForm";
// import { getQuizById, updateQuiz } from "@/features/API";

// export default function EditQuizPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [quiz, setQuiz] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const loadQuiz = async () => {
//       try {
//         const res = await getQuizById(id);
//         setQuiz(res.data?.data);
//       } catch (err) {
//         setError(err.response?.data?.message || err.message || "Failed to load quiz");
//       }
//     };
//     if (id) loadQuiz();
//   }, [id]);

//   const handleSubmit = async (formData) => {
//     try {
//       setLoading(true);
//       setError("");
//       await updateQuiz(id, formData);
//       router.push("/admin/quizzes");
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || "Failed to update quiz");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-4">
//       <h2>Edit Quiz</h2>
//       {error && <div className="alert alert-danger">{error}</div>}
//       {quiz ? <QuizForm initialValues={quiz} onSubmit={handleSubmit} loading={loading} submitText="Update Quiz" /> : <div className="alert alert-info">Loading...</div>}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import QuizForm from "@/components/quiz/QuizForm";
import { getQuizById, updateQuiz } from "@/features/API";

export default function EditQuizPage() {
  const { id } = useParams();
  const router = useRouter();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const res = await getQuizById(id);
        setQuiz(res.data?.data);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Failed to load quiz",
        );
      }
    };

    if (id) loadQuiz();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError("");

      await updateQuiz(id, formData);

      router.push("/admin/quizzes");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to update quiz",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}

        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Edit Quiz</h1>

            <p className="mt-2 text-slate-500">
              Update quiz information, settings and cover image.
            </p>
          </div>

          <button
            onClick={() => router.back()}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 shadow transition hover:bg-slate-50"
          >
            ← Back
          </button>
        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}

        {!quiz && (
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center text-blue-700 shadow">
            Loading quiz...
          </div>
        )}

        {/* Form */}

        {quiz && (
          <QuizForm
            initialValues={quiz}
            onSubmit={handleSubmit}
            loading={loading}
            submitText="Update Quiz"
          />
        )}
      </div>
    </div>
  );
}
