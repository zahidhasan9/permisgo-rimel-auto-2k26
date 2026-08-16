"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaEdit,
  FaExclamationTriangle,
  FaInfoCircle,
  FaSyncAlt,
} from "react-icons/fa";
import QuizForm from "@/components/quiz/QuizForm";
import { getQuizById, updateQuiz } from "@/features/API";

export default function EditQuizPage() {
  const { id } = useParams();
  const router = useRouter();

  const [quiz, setQuiz] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadQuiz = async () => {
    try {
      setPageLoading(true);
      setError("");

      const res = await getQuizById(id);
      setQuiz(res.data?.data || null);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to load quiz",
      );
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <section className="min-h-screen overflow-x-hidden bg-[#f8f8fb] px-3 py-3 md:px-4">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="mb-3 flex flex-col justify-between gap-2 lg:flex-row lg:items-center">
          <div className="min-w-0">
            <div className="mb-1 flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-slate-400">
              <span>Admin</span>
              <span>/</span>
              <span>Quizzes</span>
              <span>/</span>
              <span className="text-slate-600">Edit Quiz</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <FaEdit className="text-sm" />
              </div>

              <div className="min-w-0">
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  Edit Quiz
                </h1>

                <p className="mt-0.5 max-w-2xl text-xs leading-5 text-slate-500">
                  Update quiz information, settings, cover image and status.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={loadQuiz}
              disabled={pageLoading || loading}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaSyncAlt className={pageLoading ? "animate-spin" : ""} />
              Refresh
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800"
            >
              <FaArrowLeft />
              Back
            </button>
          </div>
        </div>

        <div className="mb-3 rounded-[14px] border border-slate-200 bg-white px-3 py-2.5 shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                <FaInfoCircle className="text-xs" />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Current Quiz
                </p>

                <h2 className="truncate text-sm font-bold text-slate-900">
                  {pageLoading ? "Loading..." : quiz?.title || "Quiz details"}
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-700">
                Edit Mode
              </span>

              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                {quiz?.slug || "No slug"}
              </span>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-3 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
            <FaExclamationTriangle className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {pageLoading && (
          <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
            <div className="border-b border-slate-100 px-3 py-2.5">
              <div className="h-3.5 w-36 animate-pulse rounded bg-slate-100" />
              <div className="mt-2 h-3 w-56 animate-pulse rounded bg-slate-100" />
            </div>

            <div className="space-y-2.5 p-3">
              <div className="h-9 animate-pulse rounded-xl bg-slate-100" />
              <div className="h-9 animate-pulse rounded-xl bg-slate-100" />
              <div className="grid gap-2.5 md:grid-cols-2">
                <div className="h-9 animate-pulse rounded-xl bg-slate-100" />
                <div className="h-9 animate-pulse rounded-xl bg-slate-100" />
              </div>
              <div className="h-20 animate-pulse rounded-xl bg-slate-100" />
            </div>
          </div>
        )}

        {!pageLoading && quiz && (
          <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
            <div className="flex flex-col justify-between gap-2 border-b border-slate-100 bg-[#fbfbfd] px-3 py-2.5 md:flex-row md:items-center">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Quiz Details
                </h2>

                <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                  Update required fields and save changes.
                </p>
              </div>

              <span className="w-fit rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-700">
                Update Form
              </span>
            </div>

            <div
              className="
                p-3
                [&_label]:!mb-1
                [&_label]:!text-xs
                [&_input]:!h-9
                [&_input]:!rounded-xl
                [&_input]:!text-xs
                [&_input]:!px-3
                [&_select]:!h-9
                [&_select]:!rounded-xl
                [&_select]:!text-xs
                [&_select]:!px-3
                [&_textarea]:!min-h-[76px]
                [&_textarea]:!rounded-xl
                [&_textarea]:!text-xs
                [&_textarea]:!px-3
                [&_textarea]:!py-2
                [&_button]:!rounded-xl
                [&_button]:!text-xs
                [&_button]:!px-3
                [&_button]:!py-2
                [&_.gap-4]:!gap-2.5
                [&_.gap-5]:!gap-3
                [&_.gap-6]:!gap-3
                [&_.p-4]:!p-3
                [&_.p-5]:!p-3
                [&_.p-6]:!p-3
                [&_.py-4]:!py-2.5
                [&_.py-5]:!py-3
                [&_.mt-4]:!mt-2.5
                [&_.mt-5]:!mt-3
                [&_.mb-4]:!mb-2.5
                [&_.mb-5]:!mb-3
              "
            >
              <QuizForm
                initialValues={quiz}
                onSubmit={handleSubmit}
                loading={loading}
                submitText="Update Quiz"
              />
            </div>
          </div>
        )}

        {!pageLoading && !quiz && !error && (
          <div className="rounded-[14px] border border-slate-200 bg-white p-5 text-center shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <FaInfoCircle className="text-xl" />
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Quiz not found
            </h3>

            <p className="mt-1.5 text-sm font-medium text-slate-500">
              This quiz may have been deleted or the link is incorrect.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
