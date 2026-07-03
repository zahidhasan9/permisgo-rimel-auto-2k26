"use client";

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
    <main className="min-h-screen bg-white px-[20px] py-[20px]">
      <div className="mx-auto max-w-[1000px]">
        <header className="mb-[26px] flex items-center gap-[14px]">
          <button
            type="button"
            className="flex h-[38px] w-[38px] items-center justify-center rounded-[9px] bg-[#E8EEF7] text-black"
          >
            <IoChevronBack className="text-[24px]" />
          </button>

          <h1 className="text-[23px] font-bold leading-none text-[#0D4598]">
            Code Challenge
          </h1>
        </header>

        <section
          ref={panelRef}
          className="rounded-[9px] bg-[#E8EEF7] px-[20px] pb-[20px] pt-[22px]"
        >
          <div className="mb-[26px] flex items-center justify-between">
            <div className="flex items-center gap-[14px]">
              <h2 className="text-[15px] font-bold text-[#0D4598]">
                Question {currentIndex + 1}/40
              </h2>

              <div className="flex h-[28px] min-w-[72px] items-center justify-center gap-[5px] rounded-[6px] bg-white px-[9px] text-[12px] font-bold text-[#0D4598]">
                <TbClockHour4 className="text-[17px]" />
                <span>{secondsLeft}s</span>
              </div>
            </div>

            <div className="flex items-center gap-[14px] text-[#061B3D]">
              <button type="button" onClick={handleFullscreen}>
                <FaExpandArrowsAlt className="text-[20px]" />
              </button>

              <button type="button" onClick={() => setSoundOn((prev) => !prev)}>
                {soundOn ? (
                  <IoVolumeHigh className="text-[27px]" />
                ) : (
                  <IoVolumeMute className="text-[27px]" />
                )}
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[9px]">
            <img
              src={currentQuestion.image}
              alt="Road question"
              className="h-[335px] w-full object-cover"
            />
          </div>

          <div className="mt-[30px] grid grid-cols-1 gap-[24px] lg:grid-cols-[1fr_390px]">
            <div>
              <h3 className="mb-[15px] text-[15px] font-bold text-[#171717]">
                {currentQuestion.title}
              </h3>

              <div className="space-y-[15px]">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    disabled={isValidated}
                    onClick={() => setSelectedAnswer(option.key)}
                    className="grid w-full grid-cols-[200px_180px_36px] items-center text-left text-[15px] font-medium text-[#0D4598]"
                  >
                    <span>- {option.text}</span>
                    <span className="text-[#171717]">-------------------</span>
                    <span className="text-[#171717]">{option.key}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-[14px] text-[15px] font-bold text-[#171717]">
                An answer
              </h3>

              <div className="mb-[18px] ml-[5px]">
                <TbClockHour4 className="text-[54px] text-[#202020]" />
              </div>

              {isValidated && (
                <p
                  className={`mb-[12px] text-[13px] font-bold ${
                    isCorrect ? "text-[#26C13A]" : "text-[#E7233D]"
                  }`}
                >
                  {isCorrect
                    ? "Correct answer"
                    : `Wrong answer. Correct: ${currentQuestion.answer}`}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-[12px]">
                {["HAS", "B", "C", "D"].map((optionKey) => (
                  <button
                    key={optionKey}
                    type="button"
                    disabled={isValidated}
                    onClick={() => setSelectedAnswer(optionKey)}
                    className={`h-[36px] w-[58px] rounded-[6px] text-[14px] font-bold transition ${getButtonClass(
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
                    className="h-[36px] w-[112px] rounded-[6px] bg-[#26C13A] text-[11px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    TO VALIDATE
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={currentIndex === questions.length - 1}
                    className="h-[36px] w-[112px] rounded-[6px] bg-[#0D4598] text-[11px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
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
