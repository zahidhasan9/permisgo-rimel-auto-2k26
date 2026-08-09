"use client";

import Link from "next/link";
import { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useRouter } from "next/navigation";


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
  const router = useRouter();
  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-3 py-4 font-sans text-[#171717] sm:px-6 sm:py-5 lg:px-8">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Header */}
        <header className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#E8EEF7] text-[22px] text-black transition hover:bg-[#dfe7f2] sm:h-11 sm:w-11 sm:rounded-[11px]"
          >
            <IoChevronBack />
          </button>

          <h1 className="text-[20px] font-bold leading-none text-[#173F8F] sm:text-[24px]">
            Our offers
          </h1>
        </header>

        {/* Offer Box */}
        <section className="mt-5 rounded-[13px] bg-[#E8EEF7] p-3 sm:mt-8 sm:p-5 lg:p-6">
          {/* Top Area */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-5">
            <div>
              <h2 className="text-[19px] font-bold leading-none text-[#174596] sm:text-[22px]">
                Driving Lessons
              </h2>

              <p className="mt-3 text-[16px] font-semibold text-[#606060] sm:text-[17px]">
                starting from €47.97
              </p>
            </div>

            {/* Tabs */}
            <div className="grid w-full grid-cols-2 gap-1 rounded-xl bg-white p-1 sm:flex sm:w-fit sm:rounded-full sm:gap-0">
              <button
                type="button"
                onClick={() => setActiveTab("manual")}
                className={`min-h-11 min-w-0 rounded-lg px-2 py-1.5 text-[11px] font-semibold leading-4 transition sm:h-10 sm:min-h-0 sm:flex-none sm:rounded-full sm:px-6 sm:py-0 sm:text-[14px] ${
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
                className={`min-h-11 min-w-0 rounded-lg px-2 py-1.5 text-[11px] font-semibold leading-4 transition sm:h-10 sm:min-h-0 sm:flex-none sm:rounded-full sm:px-6 sm:py-0 sm:text-[14px] ${
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
          <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-6 sm:gap-4 md:grid-cols-2">
            {offers.map((offer) => (
              <Link
                href="#"
                key={offer.id}
                className={`group flex min-h-[88px] min-w-0 items-center justify-between gap-2 rounded-[12px] bg-white px-3 py-4 transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(23,69,150,0.13)] sm:min-h-[105px] sm:gap-4 sm:px-7 sm:py-5 ${
                  offer.span === "full" ? "md:col-span-2" : ""
                }`}
              >
                <div className="min-w-0">
                  <h3 className="text-[14px] font-bold text-[#171717] sm:text-[16px]">
                    {offer.title}
                  </h3>

                  <p className="mt-1.5 text-[13px] font-semibold leading-4 text-[#606060] sm:mt-2 sm:text-[16px] sm:leading-normal">
                    {offer.subtitle}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                  {offer.price && (
                    <span className="whitespace-nowrap text-[14px] font-bold text-[#20BF3A] sm:text-[18px]">
                      {offer.price}
                    </span>
                  )}

                  <IoChevronForward className="text-[20px] text-[#174596] transition group-hover:translate-x-1 sm:text-[24px]" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
