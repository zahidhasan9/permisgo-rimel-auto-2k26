"use client";

import Link from "next/link";
import { IoArrowForward, IoChevronBack } from "react-icons/io5";

const thematicSeries = [
  {
    id: 1,
    letter: "L",
    title: "Legal provisions regarding road traffic",
    color: "#69A9DF",
    progress: 54,
  },
  {
    id: 2,
    letter: "A",
    title: "First aid",
    color: "#EF2F2B",
    progress: 54,
  },
  {
    id: 3,
    letter: "C",
    title: "The Driver",
    color: "#E6007E",
    progress: 54,
  },
  {
    id: 4,
    letter: "P",
    title: "Precautions to take when leaving the vehicle",
    color: "#555553",
    progress: 54,
  },
  {
    id: 5,
    letter: "R",
    title: "The Road",
    color: "#AAA2CC",
    progress: 54,
  },
  {
    id: 6,
    letter: "M",
    title: "Mechanical components & safety equipment",
    color: "#F79500",
    progress: 54,
  },
  {
    id: 7,
    letter: "U",
    title: "Other road users",
    color: "#DA4E2D",
    progress: 54,
  },
  {
    id: 8,
    letter: "S",
    title: "Vehicle safety equipment",
    color: "#40962D",
    progress: 54,
  },
  {
    id: 9,
    letter: "D",
    title: "General regulations and miscellaneous",
    color: "#FDBA12",
    progress: 54,
  },
  {
    id: 10,
    letter: "E",
    title: "Rules for using the vehicle in relation to ecology",
    color: "#91A719",
    progress: 54,
  },
];

export default function ThematicSeriesListPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-[#173F8F]">
      <div className="mx-auto w-full max-w-[1132px] px-6 py-[26px]">
        {/* Header */}
        <header className="flex items-center gap-[18px]">
          <Link
            href="#"
            aria-label="Go back"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#E8EEF7] text-[26px] text-black"
          >
            <IoChevronBack />
          </Link>

          <h1 className="text-[24px] font-bold leading-none text-[#173F8F]">
            Thematic Series List
          </h1>
        </header>

        {/* Cards */}
        <section className="mt-[34px] grid grid-cols-1 gap-5 lg:grid-cols-2">
          {thematicSeries.map((item) => (
            <Link
              href="#"
              key={item.id}
              className="group flex h-[108px] items-center rounded-[10px] px-[28px] transition-transform duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: item.color }}
            >
              <div className="flex w-full min-w-0 items-center">
                {/* Letter Circle */}
                <div className="flex h-[53px] w-[53px] shrink-0 items-center justify-center rounded-full bg-[#F7FBFF] ring-[4px] ring-[#D9E5F0]">
                  <span className="text-[20px] font-bold leading-none text-[#174596]">
                    {item.letter}
                  </span>
                </div>

                {/* Content */}
                <div className="ml-5 min-w-0 flex-1 pr-4">
                  <h2 className="truncate text-[16px] font-bold leading-none text-white">
                    {item.title}
                  </h2>

                  <div className="mt-3 h-[15px] w-full max-w-[252px] overflow-hidden rounded-full bg-[#DDE9F6]">
                    <div
                      className="h-full rounded-full bg-[#174596]"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-white transition group-hover:scale-105">
                  <IoArrowForward
                    className="text-[28px]"
                    style={{ color: item.color }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
