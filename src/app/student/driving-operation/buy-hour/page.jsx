"use client";

import Link from "next/link";
import { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const offers = [
  {
    id: 1,
    title: "Per Unit",
    subtitle: "One or more hours",
    price: "$88.99",
    span: "normal",
  },
  {
    id: 2,
    title: "5 lessons",
    subtitle: "at $55.20/hour",
    price: "$88.99",
    span: "normal",
  },
  {
    id: 3,
    title: "10 lessons",
    subtitle: "at $55.20/hour",
    price: "$88.99",
    span: "normal",
  },
  {
    id: 4,
    title: "20 lessons",
    subtitle: "at $55.20/hour",
    price: "$88.99",
    span: "normal",
  },
  {
    id: 5,
    title: "CPF Funding",
    subtitle: "Take an extra hour",
    price: "",
    span: "full",
  },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState("manual");

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

          <h1 className="text-[22px] font-bold leading-none text-[#173F8F] sm:text-[24px]">
            Our offers
          </h1>
        </header>

        {/* Offer Box */}
        <section className="mt-8 rounded-[13px] bg-[#E8EEF7] p-4 sm:p-5 lg:p-6">
          {/* Top Area */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-[21px] font-bold leading-none text-[#174596] sm:text-[22px]">
                Driving Lessons
              </h2>

              <p className="mt-3 text-[16px] font-semibold text-[#606060] sm:text-[17px]">
                starting from €47.97
              </p>
            </div>

            {/* Tabs */}
            <div className="flex w-full rounded-full bg-white p-1 sm:w-fit">
              <button
                type="button"
                onClick={() => setActiveTab("manual")}
                className={`h-10 flex-1 rounded-full px-4 text-[13px] font-semibold transition sm:flex-none sm:px-6 sm:text-[14px] ${
                  activeTab === "manual"
                    ? "bg-[#174596] text-white"
                    : "bg-white text-[#171717]"
                }`}
              >
                Manual transmission
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("automatic")}
                className={`h-10 flex-1 rounded-full px-4 text-[13px] font-semibold transition sm:flex-none sm:px-6 sm:text-[14px] ${
                  activeTab === "automatic"
                    ? "bg-[#174596] text-white"
                    : "bg-white text-[#171717]"
                }`}
              >
                Automatic transmission
              </button>
            </div>
          </div>

          {/* Offers Grid */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {offers.map((offer) => (
              <Link
                href="#"
                key={offer.id}
                className={`group flex min-h-[105px] items-center justify-between gap-4 rounded-[12px] bg-white px-5 py-5 transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(23,69,150,0.13)] sm:px-7 ${
                  offer.span === "full" ? "md:col-span-2" : ""
                }`}
              >
                <div className="min-w-0">
                  <h3 className="text-[16px] font-bold text-[#171717]">
                    {offer.title}
                  </h3>

                  <p className="mt-2 text-[16px] font-semibold text-[#606060]">
                    {offer.subtitle}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-4">
                  {offer.price && (
                    <span className="text-[18px] font-bold text-[#20BF3A]">
                      {offer.price}
                    </span>
                  )}

                  <IoChevronForward className="text-[24px] text-[#174596] transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
