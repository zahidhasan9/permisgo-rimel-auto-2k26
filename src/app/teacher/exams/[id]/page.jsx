"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";

const competencies = [
  {
    id: "C1",
    title: "MASTERING",
    score: "56%",
    heading: "C1 Mastering vehicle controls and safety checks",
    background: "bg-[#a9c3ef]",
    border: "border-[#6f9fe7]",
    questions: [
      "Know the main components and controls of the vehicle.",
      "Perform interior and exterior safety checks.",
      "Adjust the seat, steering wheel and mirrors correctly.",
      "Identify the warning lights on the dashboard.",
      "Check tyres, lights and vehicle fluids.",
      "Use the seat belt and safety equipment properly.",
    ],
  },
  {
    id: "C2",
    title: "TO UNDERSTAND",
    score: "56%",
    heading: "C2 Understanding road rules and traffic situations",
    background: "bg-[#f3a5ab]",
    border: "border-[#ef5f6d]",
    questions: [
      "Understand traffic signs and road markings.",
      "Recognize priority rules at intersections.",
      "Maintain a safe distance from other vehicles.",
      "Understand speed limits in different road areas.",
      "Identify potential hazards on the road.",
      "Adapt driving according to weather conditions.",
    ],
  },
  {
    id: "C3",
    title: "DRIVING",
    score: "56%",
    heading: "C3 Driving safely in different road conditions",
    background: "bg-[#efd9a5]",
    border: "border-[#dcbf6d]",
    questions: [
      "Start the vehicle and move away safely.",
      "Change gears smoothly at the correct time.",
      "Maintain an appropriate position on the road.",
      "Approach and cross intersections safely.",
      "Change direction using proper observations.",
      "Park the vehicle safely and correctly.",
      "Drive safely on urban and rural roads.",
    ],
  },
  {
    id: "C4",
    title: "PRACTICE",
    score: "56%",
    heading: "C4 Practice autonomous, safe and economical driving",
    background: "bg-[#8ddbaa]",
    border: "border-[#45bd77]",
    questions: [
      "Know the main components and controls of the vehicle, perform interior and exterior checks.",
      "Enter, get into the driver's seat and get out.",
      "Hold, turn the steering wheel and maintain the trajectory.",
      "Start and stop.",
      "Control acceleration and braking at various speeds.",
      "Use the gearbox.",
      "Steer the car forward in a straight line and around a curve by adapting speed and trajectory.",
      "Look around and warn others.",
      "Perform a reverse manoeuvre and a U-turn safely.",
    ],
  },
];

const evaluationOptions = [
  {
    value: "not-acquired",
    label: "Not acquired",
  },
  {
    value: "to-work",
    label: "To work",
  },
  {
    value: "acquired",
    label: "Acquired",
  },
];

export default function EvaluateStudentsPage() {
  const router = useRouter();

  const [activeCompetencyId, setActiveCompetencyId] = useState("C4");

  const [answers, setAnswers] = useState({
    C1: {},
    C2: {},
    C3: {},
    C4: {},
  });

  const activeCompetency = competencies.find(
    (competency) => competency.id === activeCompetencyId
  );

  const handleTabChange = (competencyId) => {
    setActiveCompetencyId(competencyId);
  };

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,

      [activeCompetencyId]: {
        ...previousAnswers[activeCompetencyId],
        [questionIndex]: value,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const currentAnswers = answers[activeCompetencyId];

    console.log({
      competency: activeCompetencyId,
      answers: currentAnswers,
    });

    alert(`${activeCompetencyId} evaluation submitted successfully.`);
  };

  return (
    <main className="min-h-screen bg-[#eef2f8] p-1.5 sm:p-3">
      <section className="mx-auto min-h-[calc(100vh-12px)] w-full  rounded-[8px] bg-white px-3 py-4 shadow-sm sm:px-5 sm:py-5">
        {/* Header */}
        <header className="mb-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf2f9] text-[#0b3e88] transition hover:bg-[#e1e9f5]"
            aria-label="Go back"
          >
            <FaChevronLeft size={13} />
          </button>

          <h1 className="text-[18px] font-extrabold text-[#0b3e88] sm:text-[20px]">
            Evaluate Students
          </h1>
        </header>

        {/* Main container */}
        <div className="rounded-xl bg-[#e8eef7] p-3 sm:p-4">
          {/* Tabs */}
          <div className="w-full overflow-x-none pb-4">
            <div className="grid min-w-[680px] grid-cols-4 gap-4">
              {competencies.map((competency) => {
                const isActive =
                  activeCompetencyId === competency.id;

                return (
                  <button
                    key={competency.id}
                    type="button"
                    onClick={() => handleTabChange(competency.id)}
                    className={`relative flex min-h-[130px] flex-col items-center justify-center rounded-[9px] border px-4 py-4 text-center transition duration-200
                      ${competency.background}
                      ${competency.border}
                      ${
                        isActive
                          ? "scale-[1.01] shadow-md"
                          : "hover:-translate-y-0.5 hover:shadow-sm"
                      }
                    `}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[11px] font-extrabold text-[#16458f]">
                      {competency.id}
                    </span>

                    <span className="mt-3 text-[13px] font-extrabold text-[#0b3e88]">
                      {competency.title}
                    </span>

                    <span className="mt-2 text-[12px] font-extrabold text-slate-900">
                      {competency.score}
                    </span>

                    {isActive && (
                      <span className="absolute -bottom-[17px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[13px] border-b-[17px] border-t-0 border-x-transparent border-b-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Questions */}
          <form
            key={activeCompetencyId}
            onSubmit={handleSubmit}
            className="rounded-[9px] bg-white px-4 py-5 sm:px-5"
          >
            <h2 className="mb-5 text-[13px] font-extrabold text-[#0b3e88] sm:text-[16px]">
              {activeCompetency.heading}
            </h2>

            <div className="space-y-5">
              {activeCompetency.questions.map(
                (question, questionIndex) => {
                  const selectedValue =
                    answers[activeCompetencyId]?.[
                      questionIndex
                    ];

                  return (
                    <div key={`${activeCompetencyId}-${questionIndex}`}>
                      <div className="flex items-start gap-1.5">
                        <span className="shrink-0 text-[13px] font-extrabold text-slate-800">
                          {String(questionIndex + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <p className="text-[10px] font-medium leading-4 text-[#686c75] sm:text-[14px]">
                          {question}
                        </p>
                      </div>

                      <div className="mt-2 grid max-w-[540px] grid-cols-3 gap-4">
                        {evaluationOptions.map((option) => {
                          const isSelected =
                            selectedValue === option.value;

                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() =>
                                handleAnswerChange(
                                  questionIndex,
                                  option.value
                                )
                              }
                              className={`h-8 rounded-[6px] px-2 text-[10px] font-medium transition sm:text-[13px]
                                ${
                                  isSelected
                                    ? "bg-[#16458f] text-white"
                                    : "bg-[#e7edf6] text-slate-700 hover:bg-[#dbe5f2]"
                                }
                              `}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-[8px] bg-[#e2233d] px-5 text-[13px] font-extrabold text-white transition hover:bg-[#c91f35] active:scale-[0.98]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}