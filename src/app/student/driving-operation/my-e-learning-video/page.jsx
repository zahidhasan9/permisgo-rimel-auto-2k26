"use client";

import Link from "next/link";
import { IoChevronBack, IoPlay, IoTime } from "react-icons/io5";

const img =
  "https://res.cloudinary.com/highereducation/images/f_auto,q_auto/v1662131195/ComputerScience.org/CompSci_Resources_What-Coding-_50339eae3/CompSci_Resources_What-Coding-_50339eae3.jpg?_i=AA";

const videoSections = [
  {
    id: 1,
    title: "C1- MASTERING",
    bg: "bg-[#AFC7F1]",
    border: "border-[#4A82E6]",
    videos: 4,
  },
  {
    id: 2,
    title: "C2 - To Apprehend",
    bg: "bg-[#F4A6AE]",
    border: "border-[#DF2339]",
    videos: 4,
  },
  {
    id: 3,
    title: "C3- MASTERING",
    bg: "bg-[#EEDCA8]",
    border: "border-[#CBA64B]",
    videos: 4,
  },
  {
    id: 4,
    title: "C4- MASTERING",
    bg: "bg-[#8FDEAA]",
    border: "border-[#20A85A]",
    videos: 4,
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white px-4 py-5 font-sans text-[#171717] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1020px]">
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
            My E-learning Videos
          </h1>
        </header>

        {/* Video Sections */}
        <div className="mt-8 space-y-7">
          {videoSections.map((section) => (
            <section
              key={section.id}
              className={`rounded-[12px] border ${section.border} ${section.bg} p-4 sm:p-5`}
            >
              <h2 className="text-[15px] font-bold uppercase text-[#174596] sm:text-[16px]">
                {section.title}
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                {Array.from({ length: section.videos }).map((_, index) => (
                  <Link
                    href="#"
                    key={index}
                    className="group rounded-[11px] bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(23,69,150,0.14)]"
                  >
                    <div className="flex items-center gap-4">
                      {/* Thumbnail */}
                      <div className="relative h-[82px] w-[100px] shrink-0 overflow-hidden rounded-[10px] bg-[#d9e2ef] sm:h-[84px] sm:w-[104px]">
                        <img
                          src={img}
                          alt="Online code review"
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/85 text-[#174596] shadow-sm transition group-hover:scale-110">
                            <IoPlay className="ml-0.5 text-[20px]" />
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-[15px] font-bold text-black sm:text-[16px]">
                          Online code review
                        </h3>

                        <div className="mt-2 flex items-center gap-2 text-[13px] font-medium text-[#555555] sm:text-[14px]">
                          <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#174596] text-white">
                            <IoTime className="text-[12px]" />
                          </span>
                          <span>3 minutes</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <button
                type="button"
                className="mt-5 h-[34px] w-[115px] rounded-[7px] bg-[#DF2339] text-[12px] font-bold text-white transition hover:bg-[#c91f33]"
              >
                View all
              </button>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
