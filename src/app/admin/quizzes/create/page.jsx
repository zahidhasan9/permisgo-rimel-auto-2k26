"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiEdit3,
  FiImage,
} from "react-icons/fi";
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
    <div className="min-h-screen bg-[#f4f7fb] px-4 py-4">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-4 rounded-2xl bg-blue-800 px-6 py-5 shadow-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="mb-2 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-blue-100">
                Admin Panel / Quiz Management
              </div>

              <h1 className="text-2xl font-bold text-white">Create New Quiz</h1>

              <p className="mt-1 max-w-xl text-sm text-blue-100">
                Add quiz title, settings, cover image and required information.
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100"
            >
              <FiArrowLeft className="h-4 w-4" />
              Back
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
          {/* Card Header */}
          <div className="border-b border-slate-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Quiz Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Fill in the details carefully before creating the quiz.
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
                New Quiz Setup
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Info Panel */}
            <div className="bg-slate-50 p-5 lg:col-span-3 lg:border-r lg:border-slate-200">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-800 text-white shadow">
                <FiEdit3 className="h-5 w-5" />
              </div>

              <h3 className="text-base font-bold text-slate-800">
                Before You Create
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Check quiz title, description, marks, duration, status and cover
                image before submit.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl bg-white p-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-100 text-green-700">
                      <FiCheckCircle className="h-4 w-4" />
                    </span>

                    <p className="text-sm font-semibold text-slate-800">
                      Required Details
                    </p>
                  </div>

                  <p className="mt-1 pl-9 text-xs text-slate-500">
                    Fill all necessary fields.
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                      <FiClock className="h-4 w-4" />
                    </span>

                    <p className="text-sm font-semibold text-slate-800">
                      Time Settings
                    </p>
                  </div>

                  <p className="mt-1 pl-9 text-xs text-slate-500">
                    Check duration and status.
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                      <FiImage className="h-4 w-4" />
                    </span>

                    <p className="text-sm font-semibold text-slate-800">
                      Cover Image
                    </p>
                  </div>

                  <p className="mt-1 pl-9 text-xs text-slate-500">
                    Upload a clear image.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Panel */}
            <div className="p-5 lg:col-span-9">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <QuizForm
                  onSubmit={handleSubmit}
                  loading={loading}
                  submitText="Create Quiz"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
