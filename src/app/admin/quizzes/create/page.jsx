"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
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
    <main className="min-h-screen bg-[#f6f8fc] px-4 py-5 sm:px-6 sm:py-7">
      <div className="mx-auto max-w-4xl">
        <header className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
          >
            <FiArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <p className="text-xs font-semibold text-slate-400">
              Quiz Management
            </p>
            <h1 className="mt-0.5 text-2xl font-bold text-slate-900">
              Create Quiz
            </h1>
          </div>
        </header>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <QuizForm
          onSubmit={handleSubmit}
          loading={loading}
          submitText="Create Quiz"
        />
      </div>
    </main>
  );
}
