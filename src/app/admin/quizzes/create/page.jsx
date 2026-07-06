// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import QuizForm from "@/components/quiz/QuizForm";
// import { createQuizWithForm } from "@/features/API";

// export default function CreateQuizPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (formData) => {
//     try {
//       setLoading(true);
//       setError("");
//       await createQuizWithForm(formData);
//       router.push("/admin/quizzes");
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || "Failed to create quiz");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-4">
//       <h2>Create Quiz</h2>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <QuizForm onSubmit={handleSubmit} loading={loading} submitText="Create Quiz" />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import QuizForm from "@/components/quiz/QuizForm";
import { createQuizWithForm } from "@/features/API";

export default function CreateQuizPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError("");

      await createQuizWithForm(formData);

      router.push("/admin/quizzes");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to create quiz",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Create Quiz</h1>

            <p className="mt-2 text-slate-500">
              Create a new quiz with title, settings, cover image and other
              details.
            </p>
          </div>

          <button
            onClick={() => router.back()}
            className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            ← Back
          </button>
        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Card */}

        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-5">
            <h2 className="text-xl font-semibold text-white">
              Quiz Information
            </h2>

            <p className="mt-1 text-indigo-100">
              Fill in the required information below.
            </p>
          </div>

          <div className="p-8">
            <QuizForm
              onSubmit={handleSubmit}
              loading={loading}
              submitText="Create Quiz"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
