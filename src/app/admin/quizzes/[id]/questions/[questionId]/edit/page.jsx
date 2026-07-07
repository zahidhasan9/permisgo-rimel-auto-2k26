// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import QuestionForm from "@/components/quiz/QuestionForm";
// import { getQuestionById, updateQuizQuestion } from "@/features/API";

// export default function EditQuestionPage() {
//   const { id, questionId } = useParams();
//   const router = useRouter();
//   const [question, setQuestion] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const loadQuestion = async () => {
//       try {
//         const res = await getQuestionById(questionId);
//         setQuestion(res.data?.data);
//       } catch (err) {
//         setError(err.response?.data?.message || err.message || "Failed to load question");
//       }
//     };
//     if (questionId) loadQuestion();
//   }, [questionId]);

//   const handleSubmit = async (formData) => {
//     try {
//       setLoading(true);
//       setError("");
//       await updateQuizQuestion(questionId, formData);
//       router.push(`/admin/quizzes/${id}/questions`);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || "Failed to update question");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-4">
//       <h2>Edit Question</h2>
//       {error && <div className="alert alert-danger">{error}</div>}
//       {question ? <QuestionForm initialValues={question} onSubmit={handleSubmit} loading={loading} submitText="Update Question" /> : <div className="alert alert-info">Loading...</div>}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaEdit,
  FaExclamationTriangle,
  FaInfoCircle,
  FaQuestionCircle,
  FaSyncAlt,
} from "react-icons/fa";
import QuestionForm from "@/components/quiz/QuestionForm";
import { getQuestionById, updateQuizQuestion } from "@/features/API";

export default function EditQuestionPage() {
  const { id, questionId } = useParams();
  const router = useRouter();

  const [question, setQuestion] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadQuestion = async () => {
    try {
      setPageLoading(true);
      setError("");

      const res = await getQuestionById(questionId);
      setQuestion(res.data?.data || null);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to load question",
      );
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (questionId) {
      loadQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId]);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError("");

      await updateQuizQuestion(questionId, formData);

      router.push(`/admin/quizzes/${id}/questions`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update question",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen overflow-x-hidden bg-[#f8f8fb] px-3 py-3 md:px-4 lg:px-5">
      <div className="mx-auto w-full max-w-[1360px]">
        <div className="mb-3 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
          <div className="min-w-0">
            <div className="mb-1.5 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-400">
              <span>Admin</span>
              <span>/</span>
              <span>Quizzes</span>
              <span>/</span>
              <span>Questions</span>
              <span>/</span>
              <span className="text-slate-600">Edit Question</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <FaEdit className="text-sm" />
              </div>

              <div className="min-w-0">
                <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                  Edit Question
                </h1>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
                  Update question text, options, correct answer, difficulty and
                  images.
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
              onClick={loadQuestion}
              disabled={pageLoading || loading}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaSyncAlt className={pageLoading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        <div className="mb-3 rounded-[16px] border border-slate-200 bg-white px-3.5 py-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <FaInfoCircle className="text-sm" />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Current Question
                </p>

                <h2 className="truncate text-sm font-bold text-slate-900">
                  {pageLoading
                    ? "Loading question..."
                    : question?.questionText || "Question details"}
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-700">
                Edit Mode
              </span>

              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold capitalize text-slate-600">
                {question?.status || "Question"}
              </span>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-3 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs font-semibold text-rose-700">
            <FaExclamationTriangle className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {pageLoading && (
          <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
            <div className="border-b border-slate-100 bg-[#fbfbfd] px-3.5 py-3">
              <div className="h-4 w-40 animate-pulse rounded bg-slate-100" />
              <div className="mt-2 h-3 w-72 animate-pulse rounded bg-slate-100" />
            </div>

            <div className="space-y-3 p-3.5">
              <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
              <div className="grid gap-3 md:grid-cols-2">
                <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
                <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
              </div>
              <div className="h-24 animate-pulse rounded-xl bg-slate-100" />
              <div className="grid gap-3 md:grid-cols-2">
                <div className="h-16 animate-pulse rounded-xl bg-slate-100" />
                <div className="h-16 animate-pulse rounded-xl bg-slate-100" />
              </div>
            </div>
          </div>
        )}

        {!pageLoading && question && (
          <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
            <div className="flex flex-col justify-between gap-2 border-b border-slate-100 bg-[#fbfbfd] px-3.5 py-3 md:flex-row md:items-center">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Question Details
                </h2>

                <p className="mt-0.5 text-xs font-medium text-slate-400">
                  Update required fields and save the question.
                </p>
              </div>

              <span className="w-fit rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-700">
                Update Form
              </span>
            </div>

            <div
              className="
                p-3.5
                [&_label]:!mb-1
                [&_label]:!text-xs
                [&_input]:!min-h-0
                [&_input]:!h-9
                [&_input]:!rounded-xl
                [&_input]:!px-3
                [&_input]:!py-2
                [&_input]:!text-xs
                [&_select]:!h-9
                [&_select]:!rounded-xl
                [&_select]:!px-3
                [&_select]:!text-xs
                [&_textarea]:!min-h-[72px]
                [&_textarea]:!rounded-xl
                [&_textarea]:!px-3
                [&_textarea]:!py-2
                [&_textarea]:!text-xs
                [&_button]:!rounded-xl
                [&_button]:!px-3
                [&_button]:!py-2
                [&_button]:!text-xs
                [&_.container]:!max-w-none
                [&_.container]:!p-0
                [&_.row]:!gap-2
                [&_.gap-3]:!gap-2.5
                [&_.gap-4]:!gap-2.5
                [&_.gap-5]:!gap-3
                [&_.gap-6]:!gap-3
                [&_.p-4]:!p-3
                [&_.p-5]:!p-3
                [&_.p-6]:!p-3
                [&_.px-4]:!px-3
                [&_.py-4]:!py-2.5
                [&_.mt-4]:!mt-2.5
                [&_.mt-5]:!mt-3
                [&_.mb-4]:!mb-2.5
                [&_.mb-5]:!mb-3
                [&_img]:!max-h-32
              "
            >
              <QuestionForm
                initialValues={question}
                onSubmit={handleSubmit}
                loading={loading}
                submitText="Update Question"
              />
            </div>
          </div>
        )}

        {!pageLoading && !question && !error && (
          <div className="rounded-[16px] border border-slate-200 bg-white p-6 text-center shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <FaQuestionCircle className="text-xl" />
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Question not found
            </h3>

            <p className="mt-1.5 text-sm font-medium text-slate-500">
              This question may have been deleted or the link is incorrect.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
