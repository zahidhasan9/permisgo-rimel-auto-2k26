// "use client";

// import { useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import QuestionForm from "@/components/quiz/QuestionForm";
// import { createQuizQuestionWithForm } from "@/features/API";

// export default function CreateQuestionPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (formData) => {
//     try {
//       setLoading(true);
//       setError("");
//       await createQuizQuestionWithForm(id, formData);
//       router.push(`/admin/quizzes/${id}/questions`);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || "Failed to create question");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-4">
//       <h2>Add Question</h2>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <QuestionForm onSubmit={handleSubmit} loading={loading} submitText="Create Question" />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import QuestionForm from "@/components/quiz/QuestionForm";
import { createQuizQuestionWithForm } from "@/features/API";

export default function CreateQuestionPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError("");

      await createQuizQuestionWithForm(id, formData);

      router.push(`/admin/quizzes/${id}/questions`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create question",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Add New Question
            </h1>

            <p className="mt-2 text-slate-500">
              Create a new question for this quiz.
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

        {/* Form */}

        <QuestionForm
          onSubmit={handleSubmit}
          loading={loading}
          submitText="Create Question"
        />
      </div>
    </div>
  );
}
