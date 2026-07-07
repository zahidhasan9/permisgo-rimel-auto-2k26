"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  finishQuizAttempt,
  startQuizAttempt,
  submitQuizAnswer,
} from "@/features/API";

const getFullFileUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const rootUrl = apiUrl.replace("/api", "");

  return `${rootUrl}${path}`;
};

export default function StudentCodeTestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const quizId = searchParams.get("quizId");
  const contentId = searchParams.get("contentId");

  const [quiz, setQuiz] = useState(null);
  const [attempt, setAttempt] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [answerMap, setAnswerMap] = useState({});
  const [checking, setChecking] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentQuestion = questions[currentIndex];

  const answeredCount = useMemo(() => {
    return Object.keys(answerMap).length;
  }, [answerMap]);

  const startTest = async () => {
    if (!quizId) {
      alert("Quiz ID missing.");
      return;
    }

    try {
      setLoading(true);

      const res = await startQuizAttempt(quizId);
      const data = res?.data?.data;

      setQuiz(data?.quiz || null);
      setAttempt(data?.attempt || null);
      setQuestions(data?.questions || []);
      setCurrentIndex(0);
      setSelectedOptionIndex(null);
      setAnswerMap({});
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to start test");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    startTest();
  }, [quizId]);

  const submitCurrentAnswer = async () => {
    if (!attempt?._id || !currentQuestion?._id) return;

    if (selectedOptionIndex === null) {
      alert("Please select one option.");
      return;
    }

    try {
      setChecking(true);

      const res = await submitQuizAnswer(attempt._id, {
        questionId: currentQuestion._id,
        selectedOptionIndex,
        timeSpentSeconds: 0,
      });

      const answerResult = res?.data?.data;

      setAnswerMap((prev) => ({
        ...prev,
        [currentQuestion._id]: answerResult,
      }));
    } catch (error) {
      alert(error?.response?.data?.message || "Answer submit failed");
    } finally {
      setChecking(false);
    }
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      const nextQuestion = questions[nextIndex];
      const oldAnswer = answerMap[nextQuestion?._id];

      setSelectedOptionIndex(
        oldAnswer?.selectedOptionIndex !== undefined
          ? oldAnswer.selectedOptionIndex
          : null,
      );
    }
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);

      const prevQuestion = questions[prevIndex];
      const oldAnswer = answerMap[prevQuestion?._id];

      setSelectedOptionIndex(
        oldAnswer?.selectedOptionIndex !== undefined
          ? oldAnswer.selectedOptionIndex
          : null,
      );
    }
  };

  const finishTest = async () => {
    if (!attempt?._id) return;

    if (answeredCount < questions.length) {
      const ok = confirm(
        `You answered ${answeredCount}/${questions.length}. Finish anyway?`,
      );
      if (!ok) return;
    }

    try {
      setLoading(true);

      const res = await finishQuizAttempt(attempt._id);
      const finishedAttempt = res?.data?.data;

      router.push(
        `/student/code/results?attemptId=${finishedAttempt?._id || attempt._id}${
          quizId ? `&quizId=${quizId}` : ""
        }${contentId ? `&contentId=${contentId}` : ""}`,
      );
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to finish test");
    } finally {
      setLoading(false);
    }
  };

  const alreadyAnswered = currentQuestion
    ? answerMap[currentQuestion._id]
    : null;

  if (!quizId) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-black text-slate-900">Quiz Missing</h1>
          <p className="mt-2 text-sm text-slate-500">
            Ei content-er sathe kono quiz connect kora hoy nai.
          </p>
          <Link
            href="/student/code"
            className="mt-5 inline-block rounded-2xl bg-red-500 px-5 py-3 text-sm font-bold text-white"
          >
            Back to Code
          </Link>
        </div>
      </div>
    );
  }

  if (loading && !currentQuestion) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
          Starting test...
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-black text-slate-900">
            No Question Found
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Admin panel theke ei quiz-er question add korte hobe.
          </p>
          <Link
            href="/student/code"
            className="mt-5 inline-block rounded-2xl bg-red-500 px-5 py-3 text-sm font-bold text-white"
          >
            Back to Code
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <Link href="/student/code" className="text-sm font-bold text-red-500">
            ← Back to Code
          </Link>

          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-black text-slate-900">
                {quiz?.title || "Code Test"}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Question {currentIndex + 1} of {questions.length}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 px-5 py-3 text-sm font-bold text-slate-700">
              Answered: {answeredCount}/{questions.length}
            </div>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-red-500"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-900">
            {currentQuestion.questionText}
          </h2>

          {currentQuestion.questionImage && (
            <img
              src={getFullFileUrl(currentQuestion.questionImage)}
              alt="Question"
              className="mt-5 max-h-[320px] w-full rounded-3xl object-contain"
            />
          )}

          <div className="mt-6 grid gap-3">
            {currentQuestion.options?.map((option, index) => {
              const isSelected = selectedOptionIndex === index;
              const isCorrect =
                alreadyAnswered?.correctOptionIndex === index &&
                alreadyAnswered?.isCorrect !== undefined;
              const isWrongSelected =
                alreadyAnswered?.selectedOptionIndex === index &&
                alreadyAnswered?.isCorrect === false;

              return (
                <button
                  key={index}
                  disabled={Boolean(alreadyAnswered)}
                  onClick={() => setSelectedOptionIndex(index)}
                  className={`rounded-2xl border p-4 text-left text-sm font-semibold transition ${
                    isCorrect
                      ? "border-green-500 bg-green-50 text-green-700"
                      : isWrongSelected
                        ? "border-red-500 bg-red-50 text-red-700"
                        : isSelected
                          ? "border-red-500 bg-red-50 text-red-600"
                          : "border-slate-200 bg-white text-slate-700 hover:border-red-300"
                  }`}
                >
                  <span className="mr-2 font-black">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option.text}

                  {option.image && (
                    <img
                      src={getFullFileUrl(option.image)}
                      alt={option.text}
                      className="mt-3 max-h-32 rounded-xl object-contain"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {alreadyAnswered && (
            <div
              className={`mt-5 rounded-2xl p-4 text-sm ${
                alreadyAnswered.isCorrect
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              <p className="font-black">
                {alreadyAnswered.isCorrect ? "Correct Answer!" : "Wrong Answer"}
              </p>

              {alreadyAnswered.explanationText && (
                <p className="mt-2 leading-6">
                  {alreadyAnswered.explanationText}
                </p>
              )}
            </div>
          )}

          <div className="mt-6 flex flex-wrap justify-between gap-3">
            <button
              onClick={goPrevious}
              disabled={currentIndex === 0}
              className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700 disabled:opacity-50"
            >
              Previous
            </button>

            <div className="flex flex-wrap gap-3">
              {!alreadyAnswered ? (
                <button
                  onClick={submitCurrentAnswer}
                  disabled={checking}
                  className="rounded-2xl bg-red-500 px-5 py-3 text-sm font-bold text-white disabled:opacity-60"
                >
                  {checking ? "Checking..." : "Submit Answer"}
                </button>
              ) : currentIndex < questions.length - 1 ? (
                <button
                  onClick={goNext}
                  className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={finishTest}
                  disabled={loading}
                  className="rounded-2xl bg-green-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-60"
                >
                  {loading ? "Finishing..." : "Finish & See Result"}
                </button>
              )}

              {currentIndex < questions.length - 1 && alreadyAnswered && (
                <button
                  onClick={finishTest}
                  disabled={loading}
                  className="rounded-2xl bg-green-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-60"
                >
                  Finish Test
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
