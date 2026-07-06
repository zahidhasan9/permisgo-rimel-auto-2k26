"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  IoChevronBack,
  IoVolumeHigh,
  IoVolumeMute,
  IoAlertCircleOutline,
} from "react-icons/io5";
import { FaExpandArrowsAlt, FaCheckCircle } from "react-icons/fa";
import { TbClockHour4 } from "react-icons/tb";
import {
  finishQuizAttempt,
  startQuizAttempt,
  submitQuizAnswer,
} from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const optionLetter = (index) => String.fromCharCode(65 + index);

function StatBox({ label, value }) {
  return (
    <div className="rounded-lg border border-[#DDE6F3] bg-white px-3 py-2">
      <p className="text-[10px] font-bold uppercase tracking-wide text-[#7B8190]">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-black text-[#151515]">{value}</p>
    </div>
  );
}

function CodeChallengeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quizId");

  const panelRef = useRef(null);
  const hasStarted = useRef(false);
  const hasFinished = useRef(false);

  const [quiz, setQuiz] = useState(null);
  const [attempt, setAttempt] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const currentQuestion = questions[currentIndex];

  const progress = questions.length
    ? Math.round(((currentIndex + 1) / questions.length) * 100)
    : 0;

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(timeLeft % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  }, [timeLeft]);

  useEffect(() => {
    const startQuiz = async () => {
      if (!quizId || hasStarted.current) return;

      try {
        hasStarted.current = true;
        setLoading(true);
        setError("");

        const res = await startQuizAttempt(quizId);
        const data = res.data?.data;

        setQuiz(data?.quiz || null);
        setAttempt(data?.attempt || null);
        setQuestions(data?.questions || []);
        setTimeLeft((data?.quiz?.durationMinutes || 30) * 60);
        setQuestionStartTime(Date.now());
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Failed to start quiz",
        );
      } finally {
        setLoading(false);
      }
    };

    startQuiz();
  }, [quizId]);

  const finishAttempt = useCallback(async () => {
    if (!attempt?._id || hasFinished.current) return;

    try {
      hasFinished.current = true;

      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }

      const res = await finishQuizAttempt(attempt._id);
      const finishedAttempt = res.data?.data;

      router.push(
        `/student/code/my-history?latest=${finishedAttempt?._id || ""}`,
      );
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to finish quiz",
      );
    }
  }, [attempt?._id, router]);

  useEffect(() => {
    if (!attempt?._id || hasFinished.current || loading || timeLeft <= 0)
      return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishAttempt();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [attempt?._id, finishAttempt, loading, timeLeft]);

  useEffect(() => {
    setSelectedIndex(null);
    setFeedback(null);
    setQuestionStartTime(Date.now());

    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function handleBack() {
    router.back();
  }

  function handleFullscreen() {
    if (!panelRef.current) return;

    if (!document.fullscreenElement) {
      panelRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  function speakQuestion() {
    if (!currentQuestion || typeof window === "undefined") return;
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const text = currentQuestion.voiceText || currentQuestion.questionText;
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "fr-FR";
    utterance.rate = 0.9;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  function stopVoice() {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    setIsSpeaking(false);
  }

  async function selectAnswer(index) {
    if (!attempt?._id || !currentQuestion?._id) return;
    if (feedback || submitting) return;

    try {
      setSubmitting(true);
      setSelectedIndex(index);

      const timeSpentSeconds = Math.max(
        Math.round((Date.now() - questionStartTime) / 1000),
        0,
      );

      const res = await submitQuizAnswer(attempt._id, {
        questionId: currentQuestion._id,
        selectedOptionIndex: index,
        timeSpentSeconds,
      });

      setFeedback(res.data?.data);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to submit answer",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      finishAttempt();
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  }

  function getOptionClass(index) {
    if (!feedback) {
      if (selectedIndex === index) {
        return "border-[#0D4598] bg-[#0D4598] text-white";
      }

      return "border-[#DDE6F3] bg-white text-[#151515] hover:border-[#0D4598] hover:bg-[#F3F7FC]";
    }

    if (index === feedback.correctOptionIndex) {
      return "border-[#26C13A] bg-[#26C13A] text-white";
    }

    if (index === selectedIndex && !feedback.isCorrect) {
      return "border-[#E7233D] bg-[#E7233D] text-white";
    }

    return "border-[#DDE6F3] bg-white text-[#7B8190] opacity-70";
  }

  if (!quizId) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] px-4 py-6">
        <div className="mx-auto max-w-4xl rounded-xl border border-red-100 bg-red-50 p-5 text-center text-sm font-semibold text-red-700">
          Quiz ID missing. Please go back and select a series.
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] px-4 py-6">
        <div className="mx-auto max-w-4xl rounded-xl border border-[#DDE6F3] bg-white p-5 text-center text-sm font-semibold text-[#0D4598]">
          Starting quiz...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] px-4 py-6">
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 p-5 text-center text-sm font-semibold text-red-700">
          <IoAlertCircleOutline size={22} />
          {error}
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] px-4 py-6">
        <div className="mx-auto max-w-4xl rounded-xl border border-[#DDE6F3] bg-white p-5 text-center text-sm font-semibold text-[#7B8190]">
          No question found. Admin থেকে আগে question add করুন।
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-4 sm:px-6 lg:px-8">
      <div ref={panelRef} className="mx-auto max-w-[1120px]">
        <header className="mb-4 rounded-xl border border-[#DDE6F3] bg-white p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
              >
                <IoChevronBack size={24} />
              </button>

              <div className="min-w-0">
                <h1 className="line-clamp-1 text-lg font-black text-[#151515]">
                  {quiz?.title || "Code Challenge"}
                </h1>
                <p className="mt-0.5 text-sm font-medium text-[#7B8190]">
                  Question {currentIndex + 1} of {questions.length}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
              <StatBox label="Timer" value={formattedTime} />
              <StatBox label="Progress" value={`${progress}%`} />
              <StatBox
                label="Answered"
                value={`${currentIndex}/${questions.length}`}
              />

              <button
                type="button"
                onClick={handleFullscreen}
                className="hidden h-10 w-10 items-center justify-center rounded-lg border border-[#DDE6F3] bg-white text-[#0D4598] transition hover:bg-[#EAF1FB] sm:flex"
                title="Fullscreen"
              >
                <FaExpandArrowsAlt size={15} />
              </button>
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E8EEF7]">
            <div
              className="h-full rounded-full bg-[#0D4598] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="rounded-xl border border-[#DDE6F3] bg-white p-4">
            <div className="flex items-start justify-between gap-3 border-b border-[#EEF2F7] pb-3">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#0D4598]">
                  Question
                </p>
                <h2 className="mt-1 text-[17px] font-bold leading-relaxed text-[#151515]">
                  {currentQuestion.questionText}
                </h2>
              </div>

              <button
                type="button"
                onClick={isSpeaking ? stopVoice : speakQuestion}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
                title="Read question"
              >
                {isSpeaking ? (
                  <IoVolumeMute size={22} />
                ) : (
                  <IoVolumeHigh size={22} />
                )}
              </button>
            </div>

            {currentQuestion.questionImage ? (
              <div className="mt-4 overflow-hidden rounded-xl border border-[#DDE6F3] bg-[#F8FAFD]">
                <img
                  src={mediaUrl(currentQuestion.questionImage)}
                  alt="Question"
                  className="max-h-[360px] w-full object-contain"
                />
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-[#B8C7DD] bg-[#F8FAFD] p-8 text-center text-sm font-semibold text-[#7B8190]">
                No question image available.
              </div>
            )}

            {feedback ? (
              <div
                className={`mt-4 rounded-xl border p-4 ${
                  feedback.isCorrect
                    ? "border-green-100 bg-green-50 text-green-800"
                    : "border-red-100 bg-red-50 text-red-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FaCheckCircle />
                  <h3 className="text-sm font-black">
                    {feedback.isCorrect
                      ? "Correct answer"
                      : `Wrong answer. Correct: ${optionLetter(
                          feedback.correctOptionIndex,
                        )}`}
                  </h3>
                </div>

                {feedback.explanationText ? (
                  <p className="mt-2 text-sm font-medium leading-relaxed">
                    {feedback.explanationText}
                  </p>
                ) : null}

                {(feedback.markedAnswerImage || feedback.explanationImage) && (
                  <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                    {feedback.markedAnswerImage ? (
                      <div>
                        <p className="mb-1 text-xs font-black">Marked Answer</p>
                        <img
                          src={mediaUrl(feedback.markedAnswerImage)}
                          alt="Marked answer"
                          className="max-h-56 w-full rounded-lg border border-white bg-white object-contain"
                        />
                      </div>
                    ) : null}

                    {feedback.explanationImage ? (
                      <div>
                        <p className="mb-1 text-xs font-black">Explanation</p>
                        <img
                          src={mediaUrl(feedback.explanationImage)}
                          alt="Explanation"
                          className="max-h-56 w-full rounded-lg border border-white bg-white object-contain"
                        />
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            ) : null}
          </div>

          <aside className="rounded-xl border border-[#DDE6F3] bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-black text-[#151515]">
                Choose Answer
              </h3>

              <div className="flex items-center gap-1 rounded-md bg-[#EAF1FB] px-2 py-1 text-xs font-black text-[#0D4598]">
                <TbClockHour4 size={16} />
                {formattedTime}
              </div>
            </div>

            <div className="space-y-2">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  disabled={Boolean(feedback) || submitting}
                  onClick={() => selectAnswer(index)}
                  className={`w-full rounded-lg border px-3 py-3 text-left text-sm font-semibold transition disabled:cursor-not-allowed ${getOptionClass(
                    index,
                  )}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-black/10 text-xs font-black">
                      {optionLetter(index)}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="leading-relaxed">{option.text}</p>

                      {option.image ? (
                        <img
                          src={mediaUrl(option.image)}
                          alt={`Option ${optionLetter(index)}`}
                          className="mt-2 max-h-24 w-full rounded-md border border-white/70 object-contain"
                        />
                      ) : null}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-lg bg-[#F8FAFD] p-3 text-xs font-semibold leading-relaxed text-[#7B8190]">
              {feedback
                ? "Answer submitted. Review the feedback and continue."
                : submitting
                  ? "Submitting your answer..."
                  : "Click an option to submit your answer. Correct will show green, wrong will show red."}
            </div>

            {feedback ? (
              <button
                type="button"
                onClick={handleNext}
                className="mt-4 w-full rounded-lg bg-[#0D4598] px-4 py-3 text-sm font-black text-white transition hover:bg-[#083777]"
              >
                {currentIndex + 1 >= questions.length
                  ? "FINISH QUIZ"
                  : "NEXT QUESTION"}
              </button>
            ) : null}
          </aside>
        </section>
      </div>
    </main>
  );
}

export default function CodeChallengePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F9FC] px-4 py-6">
          <div className="mx-auto max-w-4xl rounded-xl border border-[#DDE6F3] bg-white p-5 text-center text-sm font-semibold text-[#0D4598]">
            Loading...
          </div>
        </div>
      }
    >
      <CodeChallengeContent />
    </Suspense>
  );
}
