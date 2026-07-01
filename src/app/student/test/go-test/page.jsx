"use client";

import { useEffect, useMemo, useState } from "react";
import {
  IoArrowBack,
  IoArrowForward,
  IoCheckmarkCircle,
  IoChevronBack,
  IoFlagOutline,
  IoGridOutline,
  IoImageOutline,
  IoRadioButtonOffOutline,
  IoTimeOutline,
  IoWarningOutline,
} from "react-icons/io5";

const questions = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/9821085/pexels-photo-9821085.jpeg",
    title: "Parking is prohibited",
    question: "According to the road sign, parking is prohibited:",
    options: [
      { id: "A", text: "Before the sign only" },
      { id: "B", text: "Only after the sign" },
      { id: "C", text: "Before and after the sign" },
      { id: "D", text: "Only on weekends" },
    ],
    correctAnswer: "C",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/4048602/pexels-photo-4048602.jpeg",
    title: "Road sign awareness",
    question: "What should a driver do when approaching this type of sign?",
    options: [
      { id: "A", text: "Ignore it if the road is empty" },
      { id: "B", text: "Follow the restriction shown on the sign" },
      { id: "C", text: "Stop immediately in the middle of the road" },
      { id: "D", text: "Park beside the sign" },
    ],
    correctAnswer: "B",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/27843582/pexels-photo-27843582.jpeg",
    title: "Safe driving decision",
    question: "What is the safest action in a narrow village road?",
    options: [
      { id: "A", text: "Drive faster to pass quickly" },
      { id: "B", text: "Keep checking mirrors and reduce speed" },
      { id: "C", text: "Use horn continuously" },
      { id: "D", text: "Drive in the centre line" },
    ],
    correctAnswer: "B",
  },
];

const TOTAL_QUESTIONS = 40;
const TEST_DURATION = 25 * 60;

export default function CrashTestExamPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION);
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentQuestion.id];

  const answeredCount = Object.keys(answers).length;
  const progress = Math.round(((currentIndex + 1) / TOTAL_QUESTIONS) * 100);

  const score = useMemo(() => {
    return questions.reduce((total, question) => {
      return answers[question.id] === question.correctAnswer
        ? total + 1
        : total;
    }, 0);
  }, [answers]);

  useEffect(() => {
    if (submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setSubmitted(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const handleSelect = (optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-4 antialiased sm:px-5 lg:px-6">
      <div className="mx-auto max-w-[1120px]">
        {/* Header */}
        <header className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white text-[#344054] shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] transition active:scale-95"
            >
              <IoChevronBack className="text-[21px]" />
            </button>

            <div>
              <h1 className="text-[22px] font-semibold tracking-[-0.035em] text-[#1B3F73] sm:text-[26px]">
                Crash Test
              </h1>
              <p className="mt-0.5 text-xs text-[#7A8495]">
                Driving theory assessment with image-based questions.
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-[14px] bg-white px-3.5 py-2.5 text-xs font-medium text-[#667085] shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] sm:flex">
            <IoTimeOutline className="text-[16px] text-[#477DBA]" />
            {minutes}:{seconds}
          </div>
        </header>

        {/* Top Status */}
        <section className="mb-4 rounded-[22px] bg-white p-3 shadow-[0_1px_3px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04]">
          <div className="grid gap-2 sm:grid-cols-4">
            <StatusCard
              icon={<IoGridOutline />}
              label="Question"
              value={`${currentIndex + 1}/${TOTAL_QUESTIONS}`}
            />
            <StatusCard
              icon={<IoCheckmarkCircle />}
              label="Answered"
              value={`${answeredCount}/${TOTAL_QUESTIONS}`}
            />
            <StatusCard
              icon={<IoFlagOutline />}
              label="Passing Score"
              value="80%"
            />
            <StatusCard
              icon={<IoTimeOutline />}
              label="Time Left"
              value={`${minutes}:${seconds}`}
              warning={timeLeft < 300}
            />
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#EDF2F8]">
            <div
              className="h-full rounded-full bg-[#477DBA] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        {/* Exam Layout */}
        <section className="grid gap-4 lg:grid-cols-[1.42fr_0.58fr]">
          {/* Main Question */}
          <div className="rounded-[24px] bg-white p-3.5 shadow-[0_1px_3px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-3 px-1">
              <div>
                <p className="text-xs font-medium text-[#477DBA]">
                  Question {currentIndex + 1}
                </p>
                <h2 className="mt-0.5 text-[18px] font-semibold tracking-[-0.03em] text-[#263241]">
                  {currentQuestion.title}
                </h2>
              </div>

              <span className="rounded-full bg-[#EEF5FF] px-3 py-1.5 text-[11px] font-medium text-[#477DBA]">
                Image Based
              </span>
            </div>

            <div className="relative overflow-hidden rounded-[20px] bg-[#EAF1FA]">
              <img
                src={currentQuestion.image}
                alt={currentQuestion.title}
                className="h-[250px] w-full object-cover sm:h-[330px] lg:h-[390px]"
              />

              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-medium text-[#344054] shadow-sm backdrop-blur-md">
                <IoImageOutline className="text-[#477DBA]" />
                Road situation
              </div>
            </div>

            <div className="mt-4 rounded-[18px] bg-[#FAFBFD] p-4 ring-1 ring-black/[0.04]">
              <p className="text-[15px] font-medium leading-6 text-[#263241]">
                {currentQuestion.question}
              </p>

              <div className="mt-3 grid gap-2">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswer === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelect(option.id)}
                      className={`flex items-center gap-3 rounded-[16px] border px-3.5 py-3 text-left transition-all duration-200 ${
                        isSelected
                          ? "border-[#477DBA] bg-[#EEF5FF] shadow-[0_8px_18px_rgba(71,125,186,0.10)]"
                          : "border-black/[0.04] bg-white hover:bg-[#F6FAFF]"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                          isSelected
                            ? "bg-[#477DBA] text-white"
                            : "bg-[#F1F5F9] text-[#667085]"
                        }`}
                      >
                        {option.id}
                      </span>

                      <span
                        className={`text-sm leading-5 ${
                          isSelected
                            ? "font-medium text-[#1B3F73]"
                            : "font-normal text-[#667085]"
                        }`}
                      >
                        {option.text}
                      </span>

                      <span className="ml-auto">
                        {isSelected ? (
                          <IoCheckmarkCircle className="text-[19px] text-[#477DBA]" />
                        ) : (
                          <IoRadioButtonOffOutline className="text-[19px] text-[#C0C8D4]" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="flex h-10 items-center justify-center gap-2 rounded-[14px] bg-white px-4 text-xs font-medium text-[#667085] ring-1 ring-black/[0.06] transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <IoArrowBack className="text-sm" />
                Previous
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  className="h-10 rounded-[14px] bg-[#FFF7E8] px-4 text-xs font-medium text-[#B76E00] ring-1 ring-[#F4D9A6]"
                >
                  Mark Review
                </button>

                {currentIndex === questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setSubmitted(true)}
                    className="h-10 rounded-[14px] bg-[#22B947] px-5 text-xs font-medium text-white shadow-[0_8px_18px_rgba(34,185,71,0.18)] transition active:scale-[0.98]"
                  >
                    Submit Test
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex h-10 items-center justify-center gap-2 rounded-[14px] bg-[#1D4E89] px-5 text-xs font-medium text-white shadow-[0_8px_18px_rgba(29,78,137,0.16)] transition active:scale-[0.98]"
                  >
                    Next
                    <IoArrowForward className="text-sm" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <aside className="space-y-4">
            <div className="rounded-[24px] bg-white p-4 shadow-[0_1px_3px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04]">
              <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-[#263241]">
                Question Palette
              </h3>
              <p className="mt-0.5 text-xs text-[#8A94A6]">
                Jump between questions.
              </p>

              <div className="mt-4 grid grid-cols-5 gap-2">
                {Array.from({ length: 40 }).map((_, index) => {
                  const qId = index + 1;
                  const isActive = index === currentIndex;
                  const isAnswered = Boolean(answers[qId]);

                  return (
                    <button
                      key={qId}
                      type="button"
                      onClick={() => {
                        if (index < questions.length) setCurrentIndex(index);
                      }}
                      className={`h-9 rounded-[12px] text-xs font-medium transition ${
                        isActive
                          ? "bg-[#1D4E89] text-white shadow-[0_8px_16px_rgba(29,78,137,0.16)]"
                          : isAnswered
                            ? "bg-[#ECFDF3] text-[#12A150]"
                            : "bg-[#F2F5F9] text-[#7A8495]"
                      }`}
                    >
                      {qId}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[24px] bg-[#EAF1FA] p-4 shadow-[0_1px_3px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.03]">
              <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white text-[#477DBA] shadow-sm">
                <IoWarningOutline className="text-[20px]" />
              </div>

              <h3 className="mt-3 text-[15px] font-semibold tracking-[-0.02em] text-[#263241]">
                Exam Instructions
              </h3>

              <ul className="mt-2 space-y-2 text-xs leading-5 text-[#667085]">
                <li>• Select one answer for each question.</li>
                <li>• Use Next and Previous to navigate.</li>
                <li>• Submit before the timer ends.</li>
                <li>• Minimum passing score is 80%.</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>

      {/* Result Modal */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/35 px-4 backdrop-blur-sm">
          <div className="w-full max-w-[390px] rounded-[26px] bg-white p-5 text-center shadow-[0_24px_60px_rgba(16,24,40,0.20)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#ECFDF3] text-[#12A150]">
              <IoCheckmarkCircle className="text-[30px]" />
            </div>

            <h2 className="mt-4 text-[22px] font-semibold tracking-[-0.035em] text-[#263241]">
              Test Submitted
            </h2>

            <p className="mt-1 text-sm text-[#7A8495]">
              Your test has been completed successfully.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <ResultItem
                label="Score"
                value={`${score}/${questions.length}`}
              />
              <ResultItem label="Answered" value={answeredCount} />
              <ResultItem label="Time" value={`${minutes}:${seconds}`} />
            </div>

            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-5 h-11 w-full rounded-[15px] bg-[#1D4E89] text-sm font-medium text-white"
            >
              Review Answers
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function StatusCard({ icon, label, value, warning = false }) {
  return (
    <div className="rounded-[17px] bg-[#FAFBFD] p-3 ring-1 ring-black/[0.04]">
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-[12px] bg-[#EEF5FF] text-[16px] text-[#477DBA]">
        {icon}
      </div>
      <p className="text-[11px] text-[#8A94A6]">{label}</p>
      <h3
        className={`mt-0.5 text-[17px] font-semibold tracking-[-0.03em] ${
          warning ? "text-[#D92D20]" : "text-[#263241]"
        }`}
      >
        {value}
      </h3>
    </div>
  );
}

function ResultItem({ label, value }) {
  return (
    <div className="rounded-[16px] bg-[#F7F9FC] p-3 ring-1 ring-black/[0.04]">
      <p className="text-[10px] text-[#98A2B3]">{label}</p>
      <h3 className="mt-1 text-[16px] font-semibold text-[#263241]">{value}</h3>
    </div>
  );
}
