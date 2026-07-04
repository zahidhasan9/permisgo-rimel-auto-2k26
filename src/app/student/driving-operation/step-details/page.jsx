"use client";

import { useRouter } from "next/navigation";
import { IoChevronBack, IoCheckmark, IoCarSport } from "react-icons/io5";
import { FaFlag } from "react-icons/fa";

const steps = [
  {
    id: 1,
    label: "Step 01 :",
    title: "Driving registration",
    status: "done",
  },
  {
    id: 2,
    label: "Step 02 :",
    title: "First lesson",
    status: "done",
  },
  {
    id: 3,
    label: "Step 03 :",
    title: "Driving training",
    status: "active",
    description:
      "This is the heart of your training! Each lesson allows you to develop the essential skills to drive safely and independently.",
    cards: [
      { title: "Driving hours", value: "50h" },
      { title: "Skills acquired", value: "60%" },
      { title: "Mock exam", value: "To do" },
    ],
  },
  {
    id: 4,
    label: "Step 04 :",
    title: "Exam preparation",
    status: "pending",
    description:
      "Once your instructor registers you for the exam, the average wait time is 2 to 8 weeks. In the meantime, keep practicing.",
  },
  {
    id: 5,
    label: "Step 05 :",
    title: "Practical exam",
    status: "pending",
    description:
      "We’ve set aside two hours for your exam day. Your instructor will accompany you to the exam center.",
  },
];

export default function Page() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white px-4 py-4 font-sans text-[#171717] sm:px-5 lg:px-6">
      <div className="mx-auto w-full max-w-[1020px]">
        {/* Header */}
        <header className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#E8EEF7] text-[22px] text-black transition hover:bg-[#dfe7f2] sm:h-10 sm:w-10"
          >
            <IoChevronBack />
          </button>

          <h1 className="text-[21px] font-bold leading-none text-[#173F8F] sm:text-[23px]">
            Step Details
          </h1>
        </header>

        {/* Main Box */}
        <section className="mt-6 rounded-[12px] bg-[#E8EEF7] p-4 sm:p-5">
          <h2 className="text-[15px] font-bold text-[#171717] sm:text-[16px]">
            My road to getting my driver&apos;s license
          </h2>

          <div className="relative mt-5">
            {/* Vertical Road Line */}
            <div className="absolute left-[16px] top-0 h-full w-[24px] rounded-full bg-[#4F5356]">
              <div className="mx-auto h-full w-[2px] border-l border-dashed border-white/80" />
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className="relative flex gap-4 sm:gap-5">
                  {/* Step Icon */}
                  <div className="relative z-10 flex w-[40px] shrink-0 justify-center">
                    <div
                      className={`flex h-[30px] w-[30px] items-center justify-center rounded-full text-[17px] ${
                        step.status === "done"
                          ? "bg-[#174596] text-white"
                          : step.status === "active"
                            ? "bg-white text-[#174596] ring-[3px] ring-white"
                            : "bg-white text-white"
                      }`}
                    >
                      {step.status === "done" && <IoCheckmark />}
                      {step.status === "active" && (
                        <IoCarSport className="text-[19px]" />
                      )}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="min-w-0 flex-1">
                    {step.status === "active" ? (
                      <div className="rounded-[11px] bg-white p-4">
                        <span className="inline-flex rounded-[6px] bg-[#E8EEF7] px-3 py-1.5 text-[13px] font-bold text-[#174596]">
                          {step.label}
                        </span>

                        <h3 className="mt-3 text-[14px] font-bold text-[#171717]">
                          {step.title}
                        </h3>

                        <p className="mt-2 text-[12.5px] leading-[1.5] text-[#666666]">
                          {step.description}
                        </p>

                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                          {step.cards.map((card) => (
                            <div
                              key={card.title}
                              className="flex items-center justify-between gap-3 rounded-[9px] bg-[#DDE6F2] p-3"
                            >
                              <div>
                                <p className="text-[13px] font-medium text-[#666666]">
                                  {card.title}
                                </p>

                                <button
                                  type="button"
                                  className="mt-1 text-[13px] font-bold text-[#174596] underline"
                                >
                                  See Details
                                </button>
                              </div>

                              <span
                                className={`flex h-[38px] min-w-[42px] items-center justify-center rounded-[5px] px-2.5 text-[13px] font-bold ${
                                  card.value === "To do"
                                    ? "bg-white text-[#666666]"
                                    : "bg-[#3478EA] text-white"
                                }`}
                              >
                                {card.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-[11px] bg-[#DDE6F2] px-4 py-3.5">
                        <p className="text-[13px] font-medium text-[#666666]">
                          {step.label}
                        </p>

                        <h3 className="mt-1 text-[13.5px] font-bold text-[#171717]">
                          {step.title}
                        </h3>

                        {step.description && (
                          <p className="mt-2 text-[12.5px] leading-[1.5] text-[#666666]">
                            {step.description}
                          </p>
                        )}
                      </div>
                    )}

                    {index === steps.length - 1 && (
                      <div className="absolute bottom-[-38px] left-0 z-10 flex w-[40px] justify-center">
                        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white text-[#20BF3A]">
                          <FaFlag className="text-[16px]" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="h-6" />
          </div>
        </section>
      </div>
    </main>
  );
}
