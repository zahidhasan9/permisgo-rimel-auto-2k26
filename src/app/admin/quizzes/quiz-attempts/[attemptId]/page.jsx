"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getQuizAttemptReview } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const formatDateTime = (value) => {
  if (!value) return "—";

  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function AdminQuizAttemptReviewPage() {
  const params = useParams();
  const attemptId = params?.attemptId;

  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadReview = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getQuizAttemptReview(attemptId);
      setAttempt(res.data?.data || null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load attempt review",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (attemptId) {
      loadReview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="rounded-2xl bg-white p-6 text-slate-500 shadow-sm">
          Loading review...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="rounded-2xl border border-red-300 bg-red-50 p-6 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (!attempt) {
    return (
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="rounded-2xl bg-white p-6 text-slate-500 shadow-sm">
          Attempt not found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <Link
            href="/admin/quiz-attempts"
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            ← Back to attempts
          </Link>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Attempt Review
              </h1>
              <p className="mt-2 text-slate-500">
                Review student answer, correct answer and question details.
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                attempt.status !== "completed"
                  ? "bg-amber-100 text-amber-700"
                  : attempt.passed
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {attempt.status !== "completed"
                ? "In Progress"
                : attempt.passed
                  ? "Passed"
                  : "Failed"}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Student</p>
              <h3 className="mt-1 font-bold text-slate-800">
                {attempt.student?.name || "Unknown Student"}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {attempt.student?.email || "No email"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Quiz</p>
              <h3 className="mt-1 font-bold text-slate-800">
                {attempt.quiz?.title || "Deleted Quiz"}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Passing Score: {attempt.quiz?.passingScore || 0}%
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Score</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-800">
                {attempt.percentage || 0}%
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {attempt.correctCount || 0} correct / {attempt.wrongCount || 0}{" "}
                wrong
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Finished At</p>
              <h3 className="mt-1 font-bold text-slate-800">
                {formatDateTime(attempt.finishedAt)}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Started: {formatDateTime(attempt.startedAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {attempt.answers?.length ? (
            attempt.answers.map((answer, index) => {
              const question = answer.question;
              const options = question?.options || [];

              return (
                <div
                  key={`${answer.question?._id || index}-${index}`}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-lg font-bold text-slate-800">
                      Question {index + 1}
                    </h2>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                        answer.isCorrect
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {answer.isCorrect ? "Correct" : "Wrong"}
                    </span>
                  </div>

                  <p className="mb-4 text-slate-700">
                    {question?.questionText || "Question text not available"}
                  </p>

                  {question?.questionImage && (
                    <img
                      src={mediaUrl(question.questionImage)}
                      alt="Question"
                      className="mb-4 max-h-64 rounded-xl border object-contain"
                    />
                  )}

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {options.map((option, optionIndex) => {
                      const isSelected =
                        answer.selectedOptionIndex === optionIndex;
                      const isCorrect =
                        answer.correctOptionIndex === optionIndex;

                      return (
                        <div
                          key={optionIndex}
                          className={`rounded-xl border p-4 ${
                            isCorrect
                              ? "border-green-300 bg-green-50"
                              : isSelected
                                ? "border-red-300 bg-red-50"
                                : "border-slate-200 bg-slate-50"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <p className="font-medium text-slate-800">
                              {String.fromCharCode(65 + optionIndex)}.{" "}
                              {option.text || "No option text"}
                            </p>

                            <div className="flex shrink-0 gap-2">
                              {isSelected && (
                                <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-bold text-blue-700">
                                  Selected
                                </span>
                              )}

                              {isCorrect && (
                                <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold text-green-700">
                                  Correct
                                </span>
                              )}
                            </div>
                          </div>

                          {option.image && (
                            <img
                              src={mediaUrl(option.image)}
                              alt={`Option ${optionIndex + 1}`}
                              className="mt-3 max-h-40 rounded-lg border object-contain"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {question?.explanationText && (
                    <div className="mt-4 rounded-xl bg-blue-50 p-4 text-blue-800">
                      <p className="font-semibold">Explanation</p>
                      <p className="mt-1 text-sm">{question.explanationText}</p>
                    </div>
                  )}

                  {question?.explanationImage && (
                    <img
                      src={mediaUrl(question.explanationImage)}
                      alt="Explanation"
                      className="mt-4 max-h-64 rounded-xl border object-contain"
                    />
                  )}
                </div>
              );
            })
          ) : (
            <div className="rounded-2xl bg-white p-6 text-center text-slate-500 shadow-sm">
              No answers found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
