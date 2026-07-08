"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
  IoChevronBack,
  IoChevronForward,
  IoCloseCircleOutline,
  IoFlagOutline,
  IoHelpCircleOutline,
  IoRefreshOutline,
  IoSendOutline,
} from "react-icons/io5";
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

function MiniBox({ label, value }) {
  return (
    <div className="rounded-lg border border-[#E5EAF2] bg-[#F8FAFD] px-3 py-2">
      <p className="text-[10px] font-black uppercase tracking-wide text-[#7B8190]">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-black text-[#0D4598]">{value}</p>
    </div>
  );
}

function PageMessage({ title, text, icon: Icon = IoAlertCircleOutline }) {
  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-4">
      <div className="mx-auto max-w-2xl rounded-xl border border-[#E5EAF2] bg-white p-6 text-center shadow-sm">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF1FB] text-[#0D4598]">
          <Icon size={22} />
        </div>

        <h1 className="mt-3 text-lg font-black text-[#151515]">{title}</h1>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#7B8190]">
          {text}
        </p>

        <Link
          href="/student/code"
          className="mt-4 inline-flex h-9 items-center justify-center rounded-lg bg-[#0D4598] px-4 text-xs font-black text-white transition hover:bg-[#083777]"
        >
          Back to Code
        </Link>
      </div>
    </main>
  );
}

function LoadingState() {
  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-4">
      <div className="mx-auto max-w-4xl">
        <div className="animate-pulse rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
          <div className="h-4 w-40 rounded bg-slate-200" />
          <div className="mt-3 h-5 w-72 rounded bg-slate-200" />
          <div className="mt-4 h-1.5 rounded-full bg-slate-200" />

          <div className="mt-5 grid gap-2 md:grid-cols-2">
            <div className="h-14 rounded-xl bg-slate-200" />
            <div className="h-14 rounded-xl bg-slate-200" />
            <div className="h-14 rounded-xl bg-slate-200" />
            <div className="h-14 rounded-xl bg-slate-200" />
          </div>
        </div>
      </div>
    </main>
  );
}

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
  const [error, setError] = useState("");

  const currentQuestion = questions[currentIndex];

  const answeredCount = useMemo(() => {
    return Object.keys(answerMap).length;
  }, [answerMap]);

  const progressPercent = useMemo(() => {
    if (!questions.length) return 0;
    return Math.round(((currentIndex + 1) / questions.length) * 100);
  }, [currentIndex, questions.length]);

  const answeredPercent = useMemo(() => {
    if (!questions.length) return 0;
    return Math.round((answeredCount / questions.length) * 100);
  }, [answeredCount, questions.length]);

  const startTest = useCallback(async () => {
    if (!quizId) {
      setError("Quiz ID missing.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await startQuizAttempt(quizId);
      const data = res?.data?.data;

      setQuiz(data?.quiz || null);
      setAttempt(data?.attempt || null);
      setQuestions(data?.questions || []);
      setCurrentIndex(0);
      setSelectedOptionIndex(null);
      setAnswerMap({});
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Failed to start test",
      );
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  useEffect(() => {
    startTest();
  }, [startTest]);

  const submitCurrentAnswer = async () => {
    if (!attempt?._id || !currentQuestion?._id) return;

    if (selectedOptionIndex === null) {
      setError("Please select one option.");
      return;
    }

    try {
      setChecking(true);
      setError("");

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
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Answer submit failed",
      );
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
      const ok = window.confirm(
        `You answered ${answeredCount}/${questions.length}. Finish anyway?`,
      );
      if (!ok) return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await finishQuizAttempt(attempt._id);
      const finishedAttempt = res?.data?.data;

      router.push(
        `/student/code/results?attemptId=${finishedAttempt?._id || attempt._id}${
          quizId ? `&quizId=${quizId}` : ""
        }${contentId ? `&contentId=${contentId}` : ""}`,
      );
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Failed to finish test",
      );
    } finally {
      setLoading(false);
    }
  };

  const alreadyAnswered = currentQuestion
    ? answerMap[currentQuestion._id]
    : null;

  if (!quizId) {
    return (
      <PageMessage
        title="Quiz Missing"
        text="Ei content-er sathe kono quiz connect kora hoy nai."
      />
    );
  }

  if (loading && !currentQuestion) {
    return <LoadingState />;
  }

  if (!currentQuestion) {
    return (
      <PageMessage
        title="No Question Found"
        text="Admin panel theke ei quiz-er question add korte hobe."
        icon={IoHelpCircleOutline}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-3">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-3 rounded-xl border border-[#E5EAF2] bg-white p-3 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/student/code"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
              >
                <IoChevronBack size={22} />
              </Link>

              <div>
                <div className="mb-1 inline-flex rounded-md bg-[#EAF1FB] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-[#0D4598]">
                  Student Panel / Code Test
                </div>

                <h1 className="line-clamp-1 text-lg font-black text-[#151515]">
                  {quiz?.title || "Code Test"}
                </h1>

                <p className="mt-0.5 text-xs font-semibold text-[#7B8190]">
                  Question {currentIndex + 1} of {questions.length}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={startTest}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#DDE6F3] bg-white px-3 text-xs font-black text-[#0D4598] transition hover:bg-[#EAF1FB]"
            >
              <IoRefreshOutline size={16} />
              Restart
            </button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
            <MiniBox
              label="Current"
              value={`${currentIndex + 1}/${questions.length}`}
            />
            <MiniBox label="Answered" value={answeredCount} />
            <MiniBox
              label="Remaining"
              value={questions.length - answeredCount}
            />
            <MiniBox label="Progress" value={`${answeredPercent}%`} />
          </div>

          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-[11px] font-bold text-[#7B8190]">
              <span>Test Progress</span>
              <span>{progressPercent}%</span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-[#EDF1F7]">
              <div
                className="h-full rounded-full bg-[#0D4598]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </header>

        {/* Error */}
        {error && (
          <div className="mb-3 flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 p-3 text-sm font-semibold text-red-700">
            <IoAlertCircleOutline size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Question Card */}
        <section className="rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex h-7 items-center rounded-md bg-[#EAF1FB] px-3 text-[10px] font-black uppercase tracking-wide text-[#0D4598]">
              Question {String(currentIndex + 1).padStart(2, "0")}
            </div>

            {alreadyAnswered ? (
              <span
                className={`inline-flex h-7 items-center gap-1 rounded-md px-3 text-[10px] font-black ${
                  alreadyAnswered.isCorrect
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {alreadyAnswered.isCorrect ? (
                  <IoCheckmarkCircleOutline size={15} />
                ) : (
                  <IoCloseCircleOutline size={15} />
                )}
                {alreadyAnswered.isCorrect ? "Correct" : "Wrong"}
              </span>
            ) : (
              <span className="inline-flex h-7 items-center rounded-md bg-[#F1F4F8] px-3 text-[10px] font-black text-[#667085]">
                Select one answer
              </span>
            )}
          </div>

          <h2 className="text-base font-black leading-6 text-[#151515]">
            {currentQuestion.questionText}
          </h2>

          {currentQuestion.questionImage && (
            <div className="mt-3 rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] p-2">
              <img
                src={getFullFileUrl(currentQuestion.questionImage)}
                alt="Question"
                className="max-h-[220px] w-full rounded-lg object-contain"
              />
            </div>
          )}

          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {currentQuestion.options?.map((option, index) => {
              const isSelected = selectedOptionIndex === index;

              const isCorrect =
                alreadyAnswered?.correctOptionIndex === index &&
                alreadyAnswered?.isCorrect !== undefined;

              const isWrongSelected =
                alreadyAnswered?.selectedOptionIndex === index &&
                alreadyAnswered?.isCorrect === false;

              const optionClass = isCorrect
                ? "border-green-500 bg-green-50 text-green-700"
                : isWrongSelected
                  ? "border-red-500 bg-red-50 text-red-700"
                  : isSelected
                    ? "border-[#0D4598] bg-[#EAF1FB] text-[#0D4598]"
                    : "border-[#E5EAF2] bg-white text-[#151515] hover:border-[#0D4598] hover:bg-[#F8FAFD]";

              return (
                <button
                  key={index}
                  type="button"
                  disabled={Boolean(alreadyAnswered)}
                  onClick={() => {
                    setSelectedOptionIndex(index);
                    setError("");
                  }}
                  className={`rounded-lg border p-3 text-left text-sm font-semibold transition disabled:cursor-not-allowed ${optionClass}`}
                >
                  <div className="flex items-start gap-2">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-black ${
                        isCorrect
                          ? "bg-green-600 text-white"
                          : isWrongSelected
                            ? "bg-red-600 text-white"
                            : isSelected
                              ? "bg-[#0D4598] text-white"
                              : "bg-[#EAF1FB] text-[#0D4598]"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="leading-5">{option.text}</p>

                      {option.image && (
                        <img
                          src={getFullFileUrl(option.image)}
                          alt={option.text}
                          className="mt-2 max-h-24 rounded-md border border-[#E5EAF2] object-contain"
                        />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {alreadyAnswered && (
            <div
              className={`mt-3 rounded-lg border p-3 text-sm ${
                alreadyAnswered.isCorrect
                  ? "border-green-100 bg-green-50 text-green-700"
                  : "border-red-100 bg-red-50 text-red-700"
              }`}
            >
              <p className="flex items-center gap-2 font-black">
                {alreadyAnswered.isCorrect ? (
                  <IoCheckmarkCircleOutline size={17} />
                ) : (
                  <IoCloseCircleOutline size={17} />
                )}
                {alreadyAnswered.isCorrect ? "Correct Answer!" : "Wrong Answer"}
              </p>

              {alreadyAnswered.explanationText && (
                <p className="mt-1.5 leading-6">
                  {alreadyAnswered.explanationText}
                </p>
              )}
            </div>
          )}

          {/* Bottom Actions */}
          <div className="mt-4 flex flex-wrap justify-between gap-2 border-t border-[#E5EAF2] pt-3">
            <button
              type="button"
              onClick={goPrevious}
              disabled={currentIndex === 0}
              className="inline-flex h-9 items-center gap-1 rounded-lg border border-[#DDE6F3] bg-white px-3 text-xs font-black text-[#0D4598] transition hover:bg-[#EAF1FB] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <IoChevronBack size={16} />
              Previous
            </button>

            <div className="flex flex-wrap gap-2">
              {!alreadyAnswered ? (
                <button
                  type="button"
                  onClick={submitCurrentAnswer}
                  disabled={checking}
                  className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#0D4598] px-4 text-xs font-black text-white transition hover:bg-[#083777] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <IoSendOutline size={15} />
                  {checking ? "Checking..." : "Submit Answer"}
                </button>
              ) : currentIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex h-9 items-center gap-1 rounded-lg bg-[#0D4598] px-4 text-xs font-black text-white transition hover:bg-[#083777]"
                >
                  Next
                  <IoChevronForward size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={finishTest}
                  disabled={loading}
                  className="inline-flex h-9 items-center gap-1 rounded-lg bg-green-600 px-4 text-xs font-black text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <IoFlagOutline size={16} />
                  {loading ? "Finishing..." : "Finish & Result"}
                </button>
              )}

              {currentIndex < questions.length - 1 && alreadyAnswered && (
                <button
                  type="button"
                  onClick={finishTest}
                  disabled={loading}
                  className="inline-flex h-9 items-center gap-1 rounded-lg border border-green-100 bg-green-50 px-4 text-xs font-black text-green-700 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <IoFlagOutline size={16} />
                  Finish Test
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
