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
//       setError(
//         err.response?.data?.message ||
//           err.message ||
//           "Failed to create question",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 p-6">
//       <div className="mx-auto max-w-6xl">
//         {/* Header */}

//         <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-800">
//               Add New Question
//             </h1>

//             <p className="mt-2 text-slate-500">
//               Create a new question for this quiz.
//             </p>
//           </div>

//           <button
//             onClick={() => router.back()}
//             className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 shadow transition hover:bg-slate-50"
//           >
//             ← Back
//           </button>
//         </div>

//         {/* Error */}

//         {error && (
//           <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
//             {error}
//           </div>
//         )}

//         {/* Form */}

//         <QuestionForm
//           onSubmit={handleSubmit}
//           loading={loading}
//           submitText="Create Question"
//         />
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaExclamationTriangle,
  FaInfoCircle,
  FaPlus,
  FaQuestionCircle,
} from "react-icons/fa";
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
              <span className="text-slate-600">Create Question</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <FaPlus className="text-sm" />
              </div>

              <div className="min-w-0">
                <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                  Add New Question
                </h1>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
                  Create a new question with options, images, correct answer and
                  explanation.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex w-fit items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <FaArrowLeft />
            Back
          </button>
        </div>

        <div className="mb-3 rounded-[16px] border border-slate-200 bg-white px-3.5 py-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <FaInfoCircle className="text-sm" />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Question Setup
                </p>

                <h2 className="truncate text-sm font-bold text-slate-900">
                  New question will be added to this quiz
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-700">
                Create Mode
              </span>

              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                Quiz ID: {id}
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

        <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
          <div className="flex flex-col justify-between gap-2 border-b border-slate-100 bg-[#fbfbfd] px-3.5 py-3 md:flex-row md:items-center">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <FaQuestionCircle className="text-sm" />
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Question Details
                </h2>

                <p className="mt-0.5 text-xs font-medium text-slate-400">
                  Fill up the required fields and save the question.
                </p>
              </div>
            </div>

            <span className="w-fit rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-700">
              New Question
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
              onSubmit={handleSubmit}
              loading={loading}
              submitText="Create Question"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
