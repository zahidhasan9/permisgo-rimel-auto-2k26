"use client";

import {
  IoArrowForward,
  IoCalendarClearOutline,
  IoChevronBack,
  IoCodeSlash,
  IoFilter,
  IoPlay,
  IoSearch,
  IoStar,
  IoTimeOutline,
  IoVideocamOutline,
} from "react-icons/io5";

export default function LiveCodingReplayPage() {
  const replays = [
    {
      title: "Online Code Review",
      duration: "3 minutes",
      date: "Today",
      level: "Beginner",
      tag: "React",
    },
    {
      title: "Component Debugging",
      duration: "8 minutes",
      date: "Today",
      level: "Intermediate",
      tag: "Next.js",
    },
    {
      title: "API Integration Replay",
      duration: "12 minutes",
      date: "Yesterday",
      level: "Pro",
      tag: "API",
    },
    {
      title: "Tailwind UI Fixing",
      duration: "6 minutes",
      date: "Yesterday",
      level: "Beginner",
      tag: "UI Design",
    },
    {
      title: "Live Project Refactor",
      duration: "15 minutes",
      date: "2 days ago",
      level: "Advanced",
      tag: "Clean Code",
    },
    {
      title: "Frontend Error Solving",
      duration: "10 minutes",
      date: "2 days ago",
      level: "Intermediate",
      tag: "JavaScript",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-4 antialiased sm:px-5 lg:px-6">
      <div className="mx-auto max-w-[1040px]">
        {/* Top Header */}
        <header className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white text-[#344054] shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] transition-all duration-200 hover:bg-[#F1F5FB] active:scale-95"
            >
              <IoChevronBack className="text-[21px]" />
            </button>

            <div>
              <h1 className="text-[21px] font-semibold tracking-[-0.035em] text-[#1B3F73] sm:text-[25px]">
                Live Coding Replays
              </h1>
              <p className="mt-0.5 text-xs font-normal text-[#7A8495]">
                Watch coding sessions, reviews and debugging lessons.
              </p>
            </div>
          </div>

          <button className="hidden items-center gap-1.5 rounded-[14px] bg-[#1D4E89] px-4 py-2.5 text-xs font-medium text-white shadow-[0_8px_20px_rgba(29,78,137,0.14)] transition-all duration-200 hover:bg-[#193F70] sm:flex">
            <IoVideocamOutline className="text-[15px]" />
            Latest Replay
          </button>
        </header>

        {/* Hero / Featured - Soft XS */}
        <section className="mb-4 overflow-hidden rounded-[22px] bg-[#EAF1FA] p-3 shadow-[0_10px_28px_rgba(16,24,40,0.05)] ring-1 ring-black/[0.03] sm:p-4">
          <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative min-h-[145px] overflow-hidden rounded-[18px] bg-gradient-to-br from-[#477DBA] via-[#245A97] to-[#163A63] p-4 text-white sm:min-h-[158px]">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-14 left-16 h-36 w-36 rounded-full bg-[#B7D4FF]/20 blur-3xl" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/14 px-2.5 py-1 text-[10px] font-medium text-white/90 backdrop-blur-md">
                    <IoStar className="text-[#F8D57E]" />
                    Featured Replay
                  </div>

                  <h2 className="max-w-[420px] text-[21px] font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-[27px]">
                    Online Code Review Session
                  </h2>

                  <p className="mt-2 max-w-[455px] text-xs font-normal leading-5 text-white/72">
                    Learn clean coding, frontend mistakes and faster debugging
                    from replay sessions.
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button className="flex items-center gap-2 rounded-[13px] bg-white px-3.5 py-2 text-xs font-medium text-[#1D4E89] shadow-[0_8px_20px_rgba(0,0,0,0.10)] transition-all duration-200 hover:bg-[#F8FAFC] active:scale-[0.98]">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1D4E89] text-white">
                      <IoPlay className="ml-0.5 text-xs" />
                    </span>
                    Watch Now
                  </button>

                  <div className="flex items-center gap-1.5 rounded-[13px] bg-white/12 px-3 py-2 text-xs font-normal text-white/90 backdrop-blur-md">
                    <IoTimeOutline className="text-[15px]" />3 minutes
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Box - Soft */}
            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
              <StatCard
                number="06"
                label="Total Replays"
                icon={<IoVideocamOutline />}
              />
              <StatCard
                number="54m"
                label="Learning Time"
                icon={<IoTimeOutline />}
              />
              <StatCard
                number="Pro"
                label="Quality Content"
                icon={<IoCodeSlash />}
              />
            </div>
          </div>
        </section>

        {/* Search + Filter */}
        <section className="mb-4 flex flex-col gap-2.5 sm:flex-row">
          <div className="flex h-11 flex-1 items-center gap-2.5 rounded-[15px] bg-white px-3.5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04]">
            <IoSearch className="text-[17px] text-[#98A2B3]" />
            <input
              type="text"
              placeholder="Search replay..."
              className="h-full w-full bg-transparent text-xs font-normal text-[#344054] outline-none placeholder:text-[#A8B0BE]"
            />
          </div>

          <button className="flex h-11 items-center justify-center gap-2 rounded-[15px] bg-white px-4 text-xs font-medium text-[#667085] shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] transition-all duration-200 hover:bg-[#F1F5FB]">
            <IoFilter className="text-[15px] text-[#477DBA]" />
            Filter
          </button>
        </section>

        {/* Replay Cards */}
        <section className="rounded-[22px] bg-white p-3.5 shadow-[0_1px_3px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] sm:p-4">
          <div className="mb-3 flex items-center justify-between px-1">
            <div>
              <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-[#263241]">
                All Replay Videos
              </h3>
              <p className="mt-0.5 text-xs font-normal text-[#8A94A6]">
                Continue learning from previous sessions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {replays.map((item, index) => (
              <article
                key={index}
                className="group overflow-hidden rounded-[19px] bg-[#FAFBFD] p-2.5 ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_28px_rgba(16,24,40,0.07)]"
              >
                {/* Thumbnail */}
                <div className="relative h-[105px] overflow-hidden rounded-[15px] bg-gradient-to-br from-[#5B8DCA] via-[#2D67A7] to-[#1B416D] sm:h-[120px]">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute left-4 top-4 h-1.5 w-20 rounded-full bg-white" />
                    <div className="absolute left-4 top-8 h-1.5 w-28 rounded-full bg-white" />
                    <div className="absolute left-4 top-12 h-1.5 w-24 rounded-full bg-white" />
                    <div className="absolute bottom-6 right-4 h-1.5 w-24 rounded-full bg-white" />
                    <div className="absolute bottom-10 right-4 h-1.5 w-16 rounded-full bg-white" />
                  </div>

                  <div className="absolute left-3 top-3 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium text-white/90 backdrop-blur-md">
                    {item.tag}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#1D4E89] shadow-[0_10px_22px_rgba(0,0,0,0.16)] transition-all duration-300 group-hover:scale-105">
                      <IoPlay className="ml-0.5 text-[21px]" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-1.5 pt-3">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-[#EEF5FF] px-2.5 py-1 text-[10px] font-medium text-[#477DBA]">
                      {item.level}
                    </span>

                    <div className="flex items-center gap-1 text-[10px] font-normal text-[#8A94A6]">
                      <IoCalendarClearOutline className="text-xs" />
                      {item.date}
                    </div>
                  </div>

                  <h2 className="truncate text-[15px] font-semibold tracking-[-0.02em] text-[#263241]">
                    {item.title}
                  </h2>

                  <div className="mt-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-normal text-[#7A8495]">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EEF5FF] text-[#477DBA]">
                        <IoTimeOutline className="text-[13px]" />
                      </span>
                      {item.duration}
                    </div>

                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#477DBA] shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] transition-all duration-200 group-hover:bg-[#EEF5FF]">
                      <IoArrowForward className="text-[15px]" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ number, label, icon }) {
  return (
    <div className="rounded-[16px] bg-white/70 p-3 text-[#263241] shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-white/60 backdrop-blur-md">
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-[12px] bg-[#EEF5FF] text-[16px] text-[#477DBA]">
        {icon}
      </div>
      <h3 className="text-[20px] font-semibold leading-none tracking-[-0.04em] text-[#263241]">
        {number}
      </h3>
      <p className="mt-1 text-[11px] font-normal text-[#7A8495]">{label}</p>
    </div>
  );
}
