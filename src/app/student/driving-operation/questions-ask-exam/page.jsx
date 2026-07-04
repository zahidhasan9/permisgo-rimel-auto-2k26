"use client";

import Link from "next/link";
import { useState } from "react";
import { IoChevronBack, IoVideocam } from "react-icons/io5";

const questionNumbers = [
  ...Array.from({ length: 99 }, (_, index) =>
    String(index + 1).padStart(2, "0"),
  ),
  "00",
];

const questions = [
  {
    id: 1,
    question:
      "Question 01 : Montrez la commande de reglage de hauteur des feux.",
    answer: "Disposili situe en general a gauche du volant.",
  },
  {
    id: 2,
    question: "Question 02 : Pourquoi doit-on régler la hauteur des feux ?",
    answer: "Pour ne pas eblouir les autres usagers.",
  },
  {
    id: 3,
    question:
      "Question 03 : ‘Comment et pourquoi protéger une. zone de danger en cas d'accident de la route ?",
    answer:
      "En délimitant clairement et largement a zone de danger de façon visible pour protéger les victimes et éviter un sur-accident.",
  },
];

const questionImage =
  "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=1200&auto=format&fit=crop";

export default function Page() {
  const [activeQuestion, setActiveQuestion] = useState("01");

  return (
    <main className="min-h-screen bg-white px-4 py-5 font-sans text-[#171717] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1100px]">
        {/* Header */}
        <header className="flex items-center gap-3 sm:gap-4">
          <Link
            href="#"
            aria-label="Go back"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#E8EEF7] text-[23px] text-black transition hover:bg-[#dfe7f2] sm:h-11 sm:w-11"
          >
            <IoChevronBack />
          </Link>

          <h1 className="text-[22px] font-bold leading-tight text-[#173F8F] sm:text-[24px]">
            Questions asked in the exam
          </h1>
        </header>

        {/* Main Box */}
        <section className="mt-8 rounded-[12px] bg-[#E8EEF7] p-4 sm:p-5">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[370px_1fr]">
            {/* Question Number Grid */}
            <div className="rounded-[10px] bg-transparent">
              <div className="grid grid-cols-5 gap-2 xs:grid-cols-6 sm:grid-cols-8 lg:grid-cols-10">
                {questionNumbers.map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => setActiveQuestion(number)}
                    className={`flex h-[28px] items-center justify-center rounded-[3px] border text-[13px] font-bold transition ${
                      activeQuestion === number
                        ? "border-[#DF2339] bg-[#DF2339] text-white"
                        : "border-[#8EA5C9] bg-[#AFC0DD] text-white hover:bg-[#174596]"
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Content */}
            <div className="min-w-0">
              {/* Image */}
              <div className="relative overflow-hidden rounded-[10px]">
                <img
                  src={questionImage}
                  alt="Question explanation"
                  className="h-[190px] w-full object-cover sm:h-[220px]"
                />

                <button
                  type="button"
                  className="absolute bottom-4 right-4 flex h-10 items-center gap-2 rounded-[9px] bg-white/90 px-4 text-[13px] font-bold text-[#174596] shadow-md backdrop-blur transition hover:bg-white"
                >
                  <IoVideocam className="text-[18px]" />
                  Video Explanation
                </button>
              </div>

              {/* Questions */}
              <div className="mt-6 space-y-5">
                {questions.map((item) => (
                  <div key={item.id}>
                    <h2 className="text-[16px] font-bold leading-[1.45] text-[#171717]">
                      {item.question}
                    </h2>

                    <div className="mt-3 flex flex-col gap-1 text-[14px] leading-[1.55] text-[#666666] sm:flex-row sm:gap-4">
                      <span className="shrink-0 font-bold text-[#171717]">
                        Réponse
                      </span>

                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
