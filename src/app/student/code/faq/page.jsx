"use client";

import Link from "next/link";
import { useState } from "react";
import { IoChevronBack, IoChevronDown } from "react-icons/io5";

const faqs = [
  {
    id: 1,
    question: "How long does it take to complete a driving course?",
    answer:
      "Most beginner courses can be completed within 4–6 weeks, depending on your availability and learning pace. We offer flexible scheduling to match your routine.",
  },
  {
    id: 2,
    question: "How long does it take to complete a driving course?",
    answer:
      "The duration depends on your selected package, lesson frequency, and practice progress.",
  },
  {
    id: 3,
    question: "How long does it take to complete a driving course?",
    answer:
      "You can complete the course faster with regular practice and consistent lesson attendance.",
  },
];

export default function Page() {
  const [openId, setOpenId] = useState(1);

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="min-h-screen bg-white px-4 py-5 font-sans text-[#171717] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1085px]">
        {/* Header */}
        <header className="flex items-center gap-3 sm:gap-4">
          <Link
            href="#"
            aria-label="Go back"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#E8EEF7] text-[23px] text-black transition hover:bg-[#dfe7f2] sm:h-11 sm:w-11"
          >
            <IoChevronBack />
          </Link>

          <h1 className="text-[22px] font-bold leading-none text-[#173F8F] sm:text-[24px]">
            FAQ
          </h1>
        </header>

        {/* FAQ Content */}
        <section className="mt-9 w-full max-w-[700px]">
          <h2 className="text-[24px] font-bold leading-tight text-[#222222] sm:text-[26px]">
            Frequently Asked Question
          </h2>

          <div className="mt-7 space-y-3.5">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="overflow-hidden rounded-[10px] bg-[#F2F5FA]"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="flex min-h-[64px] w-full items-center justify-between gap-4 rounded-[10px] bg-[#174596] px-5 py-4 text-left text-white transition hover:bg-[#123a7d] sm:px-6"
                  >
                    <span className="text-[14.5px] font-medium leading-[1.4] sm:text-[15px]">
                      {faq.question}
                    </span>

                    <IoChevronDown
                      className={`shrink-0 text-[22px] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 py-5 text-[13px] leading-[1.55] text-[#222222] sm:px-6 sm:text-[13.5px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
