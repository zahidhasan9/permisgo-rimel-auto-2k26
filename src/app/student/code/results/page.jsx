"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getCodeQuizAttemptReview, getMyQuizAttempts } from "@/features/API";

const getFullFileUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const rootUrl = apiUrl.replace("/api", "");

  return `${rootUrl}${path}`;
};

const getQuizId = (quiz) => {
  if (!quiz) return "";
  if (typeof quiz === "object") return quiz._id || "";
  return quiz;
};

export default function StudentCodeResultsPage() {
  const searchParams = useSearchParams();

  const attemptId = searchParams.get("attemptId");
  const quizId = searchParams.get("quizId");

  const [attempts, setAttempts] = useState([]);
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);

  const filteredAttempts = useMemo(() => {
    if (!quizId) return attempts;

    return attempts.filter((attempt) => {
      const currentQuizId = getQuizId(attempt.quiz);
      return currentQuizId === quizId;
    });
  }, [attempts, quizId]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const attemptsRes = await getMyQuizAttempts();
      setAttempts(attemptsRes?.data?.data || []);

      if (attemptId) {
        const reviewRes = await getCodeQuizAttemptReview(attemptId);
        setReview(reviewRes?.data?.data || null);
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to load result");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [attemptId, quizId]);

  const latestAttempt = filteredAttempts[0];

  const resultData = review || latestAttempt;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <Link href="/student/code" className="text-sm font-bold text-red-500">
            ← Back to Code
          </Link>

          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl font-black text-slate-900">
                Test Result
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Your latest score, correct answers, wrong answers and previous
                attempts.
              </p>
            </div>

            {quizId && (
              <Link
                href={`/student/code/test?quizId=${quizId}`}
                className="rounded-2xl bg-red-500 px-5 py-3 text-sm font-bold text-white"
              >
                Retry Test
              </Link>
            )}
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
            Loading result...
          </div>
        ) : !resultData ? (
          <div className="rounded-3xl bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
            No result found.
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-4">
              <ResultCard
                label="Score"
                value={`${resultData.score || 0}/${resultData.totalQuestions || 0}`}
              />
              <ResultCard
                label="Percentage"
                value={`${resultData.percentage || 0}%`}
              />
              <ResultCard
                label="Correct"
                value={resultData.correctCount || 0}
              />
              <ResultCard label="Wrong" value={resultData.wrongCount || 0} />
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-500">
                    {resultData.quiz?.title || "Quiz"}
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-slate-900">
                    {resultData.passed ? "Passed" : "Need More Practice"}
                  </h2>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-black ${
                    resultData.passed
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {resultData.passed ? "PASSED" : "FAILED"}
                </span>
              </div>
            </div>

            {review?.answers?.length > 0 && (
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-black text-slate-900">
                  Answer Review
                </h2>

                <div className="mt-5 space-y-4">
                  {review.answers.map((answer, index) => {
                    const question = answer.question;
                    const selectedOption =
                      question?.options?.[answer.selectedOptionIndex];
                    const correctOption =
                      question?.options?.[answer.correctOptionIndex];

                    return (
                      <div
                        key={index}
                        className="rounded-3xl border border-slate-100 p-5"
                      >
                        <div className="mb-3 flex flex-wrap gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              answer.isCorrect
                                ? "bg-green-50 text-green-600"
                                : "bg-red-50 text-red-600"
                            }`}
                          >
                            {answer.isCorrect ? "Correct" : "Wrong"}
                          </span>

                          {question?.topic && (
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                              {question.topic}
                            </span>
                          )}
                        </div>

                        <h3 className="font-black text-slate-900">
                          {index + 1}. {question?.questionText}
                        </h3>

                        {question?.questionImage && (
                          <img
                            src={getFullFileUrl(question.questionImage)}
                            alt="Question"
                            className="mt-4 max-h-52 rounded-2xl object-contain"
                          />
                        )}

                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                          <div className="rounded-2xl bg-red-50 p-4">
                            <p className="text-xs font-black text-red-500">
                              Your Answer
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-800">
                              {selectedOption?.text || "-"}
                            </p>
                          </div>

                          <div className="rounded-2xl bg-green-50 p-4">
                            <p className="text-xs font-black text-green-600">
                              Correct Answer
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-800">
                              {correctOption?.text || "-"}
                            </p>
                          </div>
                        </div>

                        {question?.explanationText && (
                          <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                            <span className="font-black text-slate-900">
                              Explanation:
                            </span>{" "}
                            {question.explanationText}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-black text-slate-900">
                Previous Attempts
              </h2>

              {filteredAttempts.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">
                  No previous attempt found.
                </p>
              ) : (
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b text-slate-500">
                        <th className="py-3">Quiz</th>
                        <th className="py-3">Score</th>
                        <th className="py-3">Percentage</th>
                        <th className="py-3">Status</th>
                        <th className="py-3">Date</th>
                        <th className="py-3 text-right">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredAttempts.map((attempt) => (
                        <tr key={attempt._id} className="border-b">
                          <td className="py-3 font-bold">
                            {attempt.quiz?.title || "Quiz"}
                          </td>
                          <td className="py-3">
                            {attempt.score}/{attempt.totalQuestions}
                          </td>
                          <td className="py-3">{attempt.percentage}%</td>
                          <td className="py-3">
                            {attempt.passed ? "Passed" : "Failed"}
                          </td>
                          <td className="py-3">
                            {attempt.createdAt
                              ? new Date(attempt.createdAt).toLocaleDateString()
                              : "-"}
                          </td>
                          <td className="py-3 text-right">
                            <Link
                              href={`/student/code/results?attemptId=${attempt._id}&quizId=${getQuizId(
                                attempt.quiz,
                              )}`}
                              className="font-bold text-red-500"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ResultCard({ label, value }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black text-slate-900">{value}</p>
    </div>
  );
}
