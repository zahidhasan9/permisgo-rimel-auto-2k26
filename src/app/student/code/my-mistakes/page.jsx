"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCodeQuizAttemptReview, getMyQuizAttempts } from "@/features/API";

const getFullFileUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const rootUrl = apiUrl.replace("/api", "");

  return `${rootUrl}${path}`;
};

export default function MyMistakesPage() {
  const [mistakes, setMistakes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMistakes = async () => {
    try {
      setLoading(true);

      const attemptsRes = await getMyQuizAttempts();
      const attempts = attemptsRes?.data?.data || [];

      const completedAttempts = attempts.filter(
        (attempt) => attempt.status === "completed" && attempt.wrongCount > 0,
      );

      const reviewResponses = await Promise.all(
        completedAttempts.map((attempt) =>
          getCodeQuizAttemptReview(attempt._id).catch(() => null),
        ),
      );

      const allMistakes = [];

      reviewResponses.forEach((res) => {
        const review = res?.data?.data;
        if (!review) return;

        review.answers?.forEach((answer) => {
          if (answer.isCorrect) return;

          const question = answer.question;
          const selectedOption =
            question?.options?.[answer.selectedOptionIndex];
          const correctOption = question?.options?.[answer.correctOptionIndex];

          allMistakes.push({
            id: `${review._id}-${question?._id}`,
            attemptId: review._id,
            quizId:
              typeof review.quiz === "object" ? review.quiz?._id : review.quiz,
            quizTitle: review.quiz?.title || "Quiz",
            question,
            selectedOption,
            correctOption,
            createdAt: review.finishedAt || review.createdAt,
          });
        });
      });

      setMistakes(allMistakes);
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to load mistakes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMistakes();
  }, []);

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
                My Mistakes
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Test-e je question ভুল হয়েছে, সেগুলো এখানে দেখাবে। এখান থেকে
                revise করে আবার retry দিতে পারবেন।
              </p>
            </div>

            <button
              onClick={fetchMistakes}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
            >
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
            Loading mistakes...
          </div>
        ) : mistakes.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
            No mistake found. Test দিলে wrong answers এখানে show করবে।
          </div>
        ) : (
          <div className="space-y-4">
            {mistakes.map((item, index) => (
              <div key={item.id} className="rounded-3xl bg-white p-5 shadow-sm">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-500">
                    Wrong Answer
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    {item.quizTitle}
                  </span>

                  {item.question?.topic && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      {item.question.topic}
                    </span>
                  )}
                </div>

                <h2 className="text-base font-black text-slate-900">
                  {index + 1}. {item.question?.questionText}
                </h2>

                {item.question?.questionImage && (
                  <img
                    src={getFullFileUrl(item.question.questionImage)}
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
                      {item.selectedOption?.text || "-"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-green-50 p-4">
                    <p className="text-xs font-black text-green-600">
                      Correct Answer
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {item.correctOption?.text || "-"}
                    </p>
                  </div>
                </div>

                {item.question?.explanationText && (
                  <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                    <span className="font-black text-slate-900">
                      Explanation:
                    </span>{" "}
                    {item.question.explanationText}
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/student/code/results?attemptId=${item.attemptId}&quizId=${item.quizId}`}
                    className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
                  >
                    View Full Review
                  </Link>

                  {item.quizId && (
                    <Link
                      href={`/student/code/test?quizId=${item.quizId}`}
                      className="rounded-2xl bg-red-500 px-5 py-3 text-sm font-bold text-white"
                    >
                      Retry Test
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
