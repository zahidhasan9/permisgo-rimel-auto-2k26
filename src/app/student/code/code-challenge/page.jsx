"use client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { IoChevronBack, IoVolumeHigh, IoVolumeMute } from "react-icons/io5";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { TbClockHour4 } from "react-icons/tb";

const questions = [
  {
    id: 1,
    image: "/image/road-question.png",
    title: "Parking is prohibited",
    options: [
      { key: "HAS", text: "before the sign only" },
      { key: "B", text: "only after the sign" },
      { key: "C", text: "before and after the sign" },
    ],
    answer: "HAS",
    timeLimit: 40,
  },
  {
    id: 2,
    image: "/image/road-question.png",
    title: "Parking is prohibited",
    options: [
      { key: "HAS", text: "before the sign only" },
      { key: "B", text: "only after the sign" },
      { key: "C", text: "before and after the sign" },
    ],
    answer: "B",
    timeLimit: 35,
  },
];

export default function CodeChallenge() {
  const panelRef = useRef(null);
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(questions[0].timeLimit);

  const currentQuestion = questions[currentIndex];

  const isCorrect = useMemo(() => {
    return selectedAnswer === currentQuestion.answer;
  }, [selectedAnswer, currentQuestion.answer]);

  useEffect(() => {
    setSelectedAnswer("");
    setIsValidated(false);
    setSecondsLeft(currentQuestion.timeLimit);
  }, [currentIndex, currentQuestion.timeLimit]);

  useEffect(() => {
    if (isValidated) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsValidated(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isValidated, currentIndex]);

  function handleValidate() {
    if (!selectedAnswer) return;
    setIsValidated(true);
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function handleFullscreen() {
    if (!panelRef.current) return;

    if (!document.fullscreenElement) {
      panelRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  function getButtonClass(optionKey) {
    if (!isValidated) {
      return selectedAnswer === optionKey
        ? "bg-[#0D4598] text-white"
        : "bg-white text-[#151515]";
    }

    if (optionKey === currentQuestion.answer) {
      return "bg-[#26C13A] text-white";
    }

    if (
      selectedAnswer === optionKey &&
      selectedAnswer !== currentQuestion.answer
    ) {
      return "bg-[#E7233D] text-white";
    }

    return "bg-white text-[#151515]";
  }

  return (
    <main className="min-h-screen bg-white px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1000px]">
        <header className="mb-5 flex items-center gap-3 sm:mb-7 sm:gap-4">
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8EEF7] text-black sm:h-[38px] sm:w-[38px]"
            onClick={handleBack}
          >
            <IoChevronBack className="text-[22px] sm:text-[24px]" />
          </button>

          <h1 className="text-xl font-bold leading-none text-[#0D4598] sm:text-[23px]">
            Code Challenge
          </h1>
        </header>

        <section
          ref={panelRef}
          className="max-h-full overflow-y-auto rounded-[9px] bg-[#E8EEF7] p-4 sm:p-5 lg:px-5 lg:pb-5 lg:pt-[22px]"
        >
          <div className="mb-5 flex flex-col gap-4 sm:mb-[26px] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3 sm:gap-[14px]">
              <h2 className="text-sm font-bold text-[#0D4598] sm:text-[15px]">
                Question {currentIndex + 1}/40
              </h2>

              <div className="flex h-7 min-w-[72px] items-center justify-center gap-[5px] rounded-md bg-white px-2 text-xs font-bold text-[#0D4598]">
                <TbClockHour4 className="text-[17px]" />
                <span>{secondsLeft}s</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[#061B3D]">
              <button type="button" onClick={handleFullscreen}>
                <FaExpandArrowsAlt className="text-[18px] sm:text-[20px]" />
              </button>

              <button type="button" onClick={() => setSoundOn((prev) => !prev)}>
                {soundOn ? (
                  <IoVolumeHigh className="text-[25px] sm:text-[27px]" />
                ) : (
                  <IoVolumeMute className="text-[25px] sm:text-[27px]" />
                )}
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[9px] bg-white">
            <img
              src={currentQuestion.image}
              alt="Road question"
              className="aspect-[16/9] h-auto w-full object-cover sm:max-h-[335px]"
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-7 lg:mt-[30px] lg:grid-cols-[minmax(0,1fr)_minmax(280px,390px)] lg:gap-6">
            <div className="min-w-0">
              <h3 className="mb-4 text-sm font-bold text-[#171717] sm:text-[15px]">
                {currentQuestion.title}
              </h3>

              <div className="space-y-3 sm:space-y-[15px]">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    disabled={isValidated}
                    onClick={() => setSelectedAnswer(option.key)}
                    className="flex w-full items-center gap-2 rounded-md px-1 py-1 text-left text-sm font-medium text-[#0D4598] transition hover:bg-white/60 disabled:cursor-not-allowed sm:text-[15px]"
                  >
                    <span className="min-w-0 flex-1 break-words">
                      - {option.text}
                    </span>

                    <span className="hidden flex-1 border-b border-dashed border-[#171717]/60 sm:block" />

                    <span className="shrink-0 font-semibold text-[#171717]">
                      {option.key}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="min-w-0">
              <h3 className="mb-3 text-sm font-bold text-[#171717] sm:mb-[14px] sm:text-[15px]">
                An answer
              </h3>

              <div className="mb-4 ml-1 sm:mb-[18px]">
                <TbClockHour4 className="text-[44px] text-[#202020] sm:text-[54px]" />
              </div>

              {isValidated && (
                <p
                  className={`mb-3 text-sm font-bold ${
                    isCorrect ? "text-[#26C13A]" : "text-[#E7233D]"
                  }`}
                >
                  {isCorrect
                    ? "Correct answer"
                    : `Wrong answer. Correct: ${currentQuestion.answer}`}
                </p>
              )}

              <div className="grid grid-cols-2 gap-3 xs:grid-cols-3 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                {["HAS", "B", "C", "D"].map((optionKey) => (
                  <button
                    key={optionKey}
                    type="button"
                    disabled={isValidated}
                    onClick={() => setSelectedAnswer(optionKey)}
                    className={`h-9 w-full rounded-md text-sm font-bold transition sm:w-[58px] ${getButtonClass(
                      optionKey,
                    )}`}
                  >
                    {optionKey}
                  </button>
                ))}

                {!isValidated ? (
                  <button
                    type="button"
                    onClick={handleValidate}
                    disabled={!selectedAnswer}
                    className="col-span-2 h-9 w-full rounded-md bg-[#26C13A] text-[11px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 xs:col-span-1 sm:w-[112px]"
                  >
                    TO VALIDATE
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={currentIndex === questions.length - 1}
                    className="col-span-2 h-9 w-full rounded-md bg-[#0D4598] text-[11px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 xs:col-span-1 sm:w-[112px]"
                  >
                    NEXT
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
