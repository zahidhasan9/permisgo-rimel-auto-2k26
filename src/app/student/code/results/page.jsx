"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  IoAlertCircleOutline,
  IoBookOutline,
  IoCheckmarkCircleOutline,
  IoChevronBack,
  IoCloseCircleOutline,
  IoEyeOutline,
  IoLockClosedOutline,
  IoRefreshOutline,
  IoRepeatOutline,
  IoStatsChartOutline,
  IoTrophyOutline,
} from "react-icons/io5";
import {
  getCodeQuizAttemptReview,
  getMyQuizAttempts,
  getMyRetakePermissions,
} from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

function getQuizId(quiz) {
  if (!quiz) return "";
  if (typeof quiz === "string") return quiz;
  return quiz._id || quiz.id || "";
}

function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDuration(seconds) {
  const value = Number(seconds || 0);

  if (!value) return "-";

  const minutes = Math.floor(value / 60);
  const remainingSeconds = value % 60;

  if (minutes <= 0) return `${remainingSeconds}s`;

  return `${minutes}m ${remainingSeconds}s`;
}

function StatusBadge({ passed }) {
  return (
    <span
      className={`inline-flex h-7 items-center gap-1 rounded-md px-3 text-[11px] font-black uppercase ${
        passed ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
      }`}
    >
      {passed ? (
        <IoCheckmarkCircleOutline size={15} />
      ) : (
        <IoCloseCircleOutline size={15} />
      )}
      {passed ? "PASSED" : "FAILED"}
    </span>
  );
}

function ResultCard({ label, value, tone = "default", icon: Icon }) {
  const toneClass =
    tone === "green"
      ? "text-green-700"
      : tone === "red"
        ? "text-red-700"
        : "text-[#0D4598]";

  const iconClass =
    tone === "green"
      ? "bg-green-50 text-green-700"
      : tone === "red"
        ? "bg-red-50 text-red-700"
        : "bg-[#EAF1FB] text-[#0D4598]";

  return (
    <div className="rounded-xl border border-[#E5EAF2] bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-wide text-[#7B8190]">
            {label}
          </p>

          <p className={`mt-1 text-xl font-black ${toneClass}`}>{value}</p>
        </div>

        {Icon && (
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconClass}`}
          >
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingBox() {
  return (
    <div className="rounded-xl border border-[#E5EAF2] bg-white p-6 text-center shadow-sm">
      <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-[#DDE6F3] border-t-[#0D4598]" />

      <p className="mt-3 text-sm font-bold text-[#7B8190]">Loading result...</p>
    </div>
  );
}

function AnswerReviewCard({ answer, index }) {
  const question = answer.question;
  const selectedOption = question?.options?.[answer.selectedOptionIndex];
  const correctOption = question?.options?.[answer.correctOptionIndex];

  return (
    <div className="rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm transition hover:border-[#0D4598]">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex h-7 items-center gap-1 rounded-md px-3 text-[11px] font-black uppercase ${
              answer.isCorrect
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {answer.isCorrect ? (
              <IoCheckmarkCircleOutline size={15} />
            ) : (
              <IoCloseCircleOutline size={15} />
            )}
            {answer.isCorrect ? "Correct" : "Wrong"}
          </span>

          {question?.topic && (
            <span className="inline-flex h-7 items-center rounded-md bg-[#EAF1FB] px-3 text-[11px] font-black text-[#0D4598]">
              {question.topic}
            </span>
          )}
        </div>

        <span className="inline-flex h-7 items-center rounded-md bg-[#F8FAFD] px-3 text-[11px] font-black text-[#7B8190]">
          Q{String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="text-[15px] font-black leading-6 text-[#151515]">
        {index + 1}. {question?.questionText || "Question not found"}
      </h3>

      {question?.questionImage && (
        <div className="mt-3 rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] p-3">
          <img
            src={mediaUrl(question.questionImage)}
            alt="Question"
            className="max-h-44 w-full rounded-lg object-contain"
          />
        </div>
      )}

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div
          className={`rounded-xl border p-3 ${
            answer.isCorrect
              ? "border-green-100 bg-green-50"
              : "border-red-100 bg-red-50"
          }`}
        >
          <p
            className={`text-[11px] font-black uppercase tracking-wide ${
              answer.isCorrect ? "text-green-700" : "text-red-600"
            }`}
          >
            Your Answer
          </p>

          <p className="mt-1 text-sm font-semibold leading-6 text-[#151515]">
            {selectedOption?.text || "-"}
          </p>

          {selectedOption?.image && (
            <img
              src={mediaUrl(selectedOption.image)}
              alt="Selected option"
              className="mt-2 max-h-28 w-full rounded-lg border border-[#E5EAF2] object-contain"
            />
          )}
        </div>

        <div className="rounded-xl border border-green-100 bg-green-50 p-3">
          <p className="text-[11px] font-black uppercase tracking-wide text-green-700">
            Correct Answer
          </p>

          <p className="mt-1 text-sm font-semibold leading-6 text-[#151515]">
            {correctOption?.text || "-"}
          </p>

          {correctOption?.image && (
            <img
              src={mediaUrl(correctOption.image)}
              alt="Correct option"
              className="mt-2 max-h-28 w-full rounded-lg border border-green-100 object-contain"
            />
          )}
        </div>
      </div>

      {question?.explanationText && (
        <div className="mt-3 rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] p-3 text-sm leading-6 text-[#667085]">
          <span className="font-black text-[#151515]">Explanation:</span>{" "}
          {question.explanationText}
        </div>
      )}

      {question?.explanationImage && (
        <div className="mt-3 rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] p-3">
          <img
            src={mediaUrl(question.explanationImage)}
            alt="Explanation"
            className="max-h-44 w-full rounded-lg object-contain"
          />
        </div>
      )}
    </div>
  );
}

function ResultsContent() {
  const searchParams = useSearchParams();

  const attemptId = searchParams.get("attemptId") || searchParams.get("latest");
  const quizId = searchParams.get("quizId");

  const [attempts, setAttempts] = useState([]);
  const [review, setReview] = useState(null);
  const [retakePermissions, setRetakePermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [attemptsRes, retakeRes] = await Promise.all([
        getMyQuizAttempts(),
        getMyRetakePermissions().catch(() => ({ data: { data: [] } })),
      ]);

      setAttempts(attemptsRes?.data?.data || []);
      setRetakePermissions(retakeRes?.data?.data || []);

      if (attemptId) {
        const reviewRes = await getCodeQuizAttemptReview(attemptId);
        setReview(reviewRes?.data?.data || null);
      } else {
        setReview(null);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || err.message || "Failed to load result",
      );
    } finally {
      setLoading(false);
    }
  }, [attemptId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sortedAttempts = useMemo(() => {
    return [...attempts].sort((a, b) => {
      const dateA = new Date(a.finishedAt || a.createdAt || 0).getTime();
      const dateB = new Date(b.finishedAt || b.createdAt || 0).getTime();

      return dateB - dateA;
    });
  }, [attempts]);

  const filteredAttempts = useMemo(() => {
    if (!quizId) return sortedAttempts;

    return sortedAttempts.filter((attempt) => {
      return getQuizId(attempt.quiz) === quizId;
    });
  }, [sortedAttempts, quizId]);

  const latestAttempt = filteredAttempts[0];
  const resultData = review || latestAttempt;

  const activeQuizId =
    quizId || getQuizId(resultData?.quiz) || getQuizId(latestAttempt?.quiz);

  const activeRetakePermission = useMemo(() => {
    if (!activeQuizId) return null;

    return (
      retakePermissions.find((permission) => {
        return (
          permission.status === "active" &&
          getQuizId(permission.quiz) === activeQuizId
        );
      }) || null
    );
  }, [retakePermissions, activeQuizId]);

  const hasRetakePermission = Boolean(activeRetakePermission);
  const answers = review?.answers || [];

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-5 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-4 rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/student/code"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
              >
                <IoChevronBack size={24} />
              </Link>

              <div>
                <div className="mb-1 inline-flex rounded-md bg-[#EAF1FB] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#0D4598]">
                  Student Panel / Code Quiz
                </div>

                <h1 className="text-xl font-black text-[#151515]">
                  Test Result
                </h1>

                <p className="mt-1 text-sm text-[#7B8190]">
                  View your score, answer review and previous attempts.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={fetchData}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#DDE6F3] bg-white px-4 text-xs font-black text-[#0D4598] transition hover:bg-[#EAF1FB]"
              >
                <IoRefreshOutline size={17} />
                Refresh
              </button>

              {activeQuizId && hasRetakePermission && (
                <Link
                  href={`/student/code/code-challenge?quizId=${activeQuizId}`}
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-green-600 px-4 text-xs font-black text-white transition hover:bg-green-700"
                >
                  <IoRepeatOutline size={16} />
                  Retake Approved
                </Link>
              )}

              {activeQuizId && !hasRetakePermission && (
                <div className="inline-flex h-10 items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-4 text-xs font-black text-amber-700">
                  <IoLockClosedOutline size={16} />
                  Retake Locked
                </div>
              )}
            </div>
          </div>
        </header>

        {loading ? <LoadingBox /> : null}

        {!loading && error ? (
          <div className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
            <IoAlertCircleOutline size={22} />
            <span>{error}</span>
          </div>
        ) : null}

        {!loading && !error && !resultData ? (
          <div className="rounded-xl border border-dashed border-[#B8C7DD] bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF1FB] text-[#0D4598]">
              <IoBookOutline size={24} />
            </div>

            <h2 className="mt-4 text-lg font-black text-[#151515]">
              No result found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#7B8190]">
              No completed quiz result is available for this page.
            </p>

            <Link
              href="/student/code"
              className="mt-4 inline-flex h-10 items-center rounded-lg bg-[#0D4598] px-5 text-xs font-black text-white transition hover:bg-[#083777]"
            >
              Take Quiz
            </Link>
          </div>
        ) : null}

        {!loading && !error && resultData ? (
          <>
            {/* Summary Cards */}
            <section className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              <ResultCard
                label="Score"
                value={`${resultData.score || 0}/${
                  resultData.totalQuestions || 0
                }`}
                icon={IoTrophyOutline}
                tone={resultData.passed ? "green" : "red"}
              />

              <ResultCard
                label="Percentage"
                value={`${resultData.percentage || 0}%`}
                icon={IoStatsChartOutline}
                tone={resultData.passed ? "green" : "red"}
              />

              <ResultCard
                label="Correct"
                value={resultData.correctCount || 0}
                icon={IoCheckmarkCircleOutline}
                tone="green"
              />

              <ResultCard
                label="Wrong"
                value={resultData.wrongCount || 0}
                icon={IoCloseCircleOutline}
                tone="red"
              />
            </section>

            {/* Result Status */}
            <section className="mb-4 rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wide text-[#7B8190]">
                    {resultData.quiz?.type || "Quiz"}
                  </p>

                  <h2 className="mt-1 text-xl font-black text-[#151515]">
                    {resultData.quiz?.title || "Quiz"}
                  </h2>

                  <p className="mt-1 text-sm text-[#7B8190]">
                    Result generated from your selected quiz attempt.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge passed={resultData.passed} />

                  <span className="inline-flex h-7 items-center rounded-md bg-[#EAF1FB] px-3 text-[11px] font-black text-[#0D4598]">
                    Duration: {formatDuration(resultData.durationSeconds)}
                  </span>

                  <span className="inline-flex h-7 items-center rounded-md bg-[#EAF1FB] px-3 text-[11px] font-black text-[#0D4598]">
                    Finished:{" "}
                    {formatDate(resultData.finishedAt || resultData.createdAt)}
                  </span>
                </div>
              </div>

              {hasRetakePermission ? (
                <div className="mt-4 rounded-xl border border-green-100 bg-green-50 p-3 text-sm font-semibold text-green-700">
                  Admin has allowed one retake for this quiz. Once you start the
                  retake, this permission will be used.
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 p-3 text-sm font-semibold text-amber-700">
                  Retake is locked. Contact admin if you need another attempt.
                </div>
              )}
            </section>

            {/* Answer Review */}
            {answers.length > 0 && (
              <section className="mb-4 rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-black text-[#151515]">
                      Answer Review
                    </h2>

                    <p className="mt-1 text-sm text-[#7B8190]">
                      Check every answer with correct option and explanation.
                    </p>
                  </div>

                  <span className="rounded-lg bg-[#EAF1FB] px-3 py-2 text-xs font-black text-[#0D4598]">
                    {answers.length} Questions
                  </span>
                </div>

                <div className="space-y-3">
                  {answers.map((answer, index) => (
                    <AnswerReviewCard
                      key={`${answer.question?._id || index}-${index}`}
                      answer={answer}
                      index={index}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Previous Attempts */}
            <section className="rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-black text-[#151515]">
                    Previous Attempts
                  </h2>

                  <p className="mt-1 text-sm text-[#7B8190]">
                    Your previous quiz attempts and result history.
                  </p>
                </div>

                <span className="rounded-lg bg-[#F1F4F8] px-3 py-2 text-xs font-black text-[#667085]">
                  {filteredAttempts.length} Records
                </span>
              </div>

              {filteredAttempts.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#B8C7DD] bg-[#F8FAFD] p-6 text-center text-sm font-semibold text-[#7B8190]">
                  No previous attempt found.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-[#E5EAF2]">
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="bg-[#F8FAFD]">
                      <tr className="border-b border-[#E5EAF2]">
                        <th className="px-4 py-3 text-[11px] font-black uppercase tracking-wide text-[#7B8190]">
                          Quiz
                        </th>
                        <th className="px-4 py-3 text-[11px] font-black uppercase tracking-wide text-[#7B8190]">
                          Score
                        </th>
                        <th className="px-4 py-3 text-[11px] font-black uppercase tracking-wide text-[#7B8190]">
                          Percentage
                        </th>
                        <th className="px-4 py-3 text-[11px] font-black uppercase tracking-wide text-[#7B8190]">
                          Status
                        </th>
                        <th className="px-4 py-3 text-[11px] font-black uppercase tracking-wide text-[#7B8190]">
                          Date
                        </th>
                        <th className="px-4 py-3 text-right text-[11px] font-black uppercase tracking-wide text-[#7B8190]">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredAttempts.map((attempt) => {
                        const currentQuizId = getQuizId(attempt.quiz);

                        return (
                          <tr
                            key={attempt._id}
                            className="border-b border-[#E5EAF2] last:border-b-0 hover:bg-[#F8FAFD]"
                          >
                            <td className="px-4 py-3">
                              <p className="font-black text-[#151515]">
                                {attempt.quiz?.title || "Quiz"}
                              </p>

                              <p className="mt-0.5 text-[11px] font-black uppercase tracking-wide text-[#7B8190]">
                                {attempt.quiz?.type || "quiz"}
                              </p>
                            </td>

                            <td className="px-4 py-3 font-black text-[#0D4598]">
                              {attempt.score || 0}/{attempt.totalQuestions || 0}
                            </td>

                            <td className="px-4 py-3 font-black text-[#0D4598]">
                              {attempt.percentage || 0}%
                            </td>

                            <td className="px-4 py-3">
                              <StatusBadge passed={attempt.passed} />
                            </td>

                            <td className="px-4 py-3 text-xs font-bold text-[#7B8190]">
                              {formatDate(
                                attempt.finishedAt || attempt.createdAt,
                              )}
                            </td>

                            <td className="px-4 py-3 text-right">
                              <Link
                                href={`/student/code/results?attemptId=${attempt._id}&quizId=${currentQuizId}`}
                                className="inline-flex h-9 items-center gap-1 rounded-lg border border-[#DDE6F3] bg-white px-3 text-xs font-black text-[#0D4598] transition hover:bg-[#EAF1FB]"
                              >
                                <IoEyeOutline size={15} />
                                View
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        ) : null}
      </section>
    </main>
  );
}

export default function StudentCodeResultsPage() {
  return (
    <Suspense fallback={<LoadingBox />}>
      <ResultsContent />
    </Suspense>
  );
}
