"use client";

import Link from "next/link";
import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { LuClock3 } from "react-icons/lu";

const topics = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  title: "Topic 01",
  lessons: "06 Lessons",
  progress: 70,
}));

const exams = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  date: "23 March, 2025",
  title: "Mock Exam",
  score: "Last Score: -/50",
  button: index === 6 ? "Goodbye" : "Take The Exam",
}));

const TrafficLawPage = () => {
  const [activeTab, setActiveTab] = useState("learn");

  const tabClass = (tab) =>
    activeTab === tab
      ? "rounded-lg border border-[#174596] bg-[#b7cdf6] px-5 py-2 text-xs font-semibold text-[#174596] sm:px-6 sm:text-[13px]"
      : "rounded-lg border border-[#174596] bg-white px-5 py-2 text-xs font-semibold text-[#111827] transition hover:bg-[#f3f6fb] sm:px-6 sm:text-[13px]";

  return (
    <main className="min-h-screen bg-white px-4 py-4 font-sans text-[#171717] sm:px-5 lg:px-6">
      <div className="mx-auto w-full max-w-[1100px]">
        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="#"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#e7ebf2] text-[21px] text-black sm:h-10 sm:w-10"
          >
            <IoChevronBack />
          </Link>

          <h1 className="text-[21px] font-bold text-[#173f8f] sm:text-[24px]">
            Traffic {activeTab === "learn" ? "Law" : "Laws"}
          </h1>
        </div>

        {/* Tabs */}
        <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("learn")}
            className={tabClass("learn")}
          >
            Learn
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("evaluations")}
            className={tabClass("evaluations")}
          >
            Evaluations
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("exams")}
            className={tabClass("exams")}
          >
            Exams
          </button>
        </div>

        {/* Learn Tab */}
        {activeTab === "learn" && (
          <section className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr]">
            {/* Left Side */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1">
              <div className="flex min-h-[250px] flex-col items-center justify-center rounded-[10px] bg-[#e8eef7] p-5 sm:min-h-[280px]">
                <div className="flex h-[145px] w-[145px] items-center justify-center rounded-full bg-[conic-gradient(#174596_0deg_252deg,#ffffff_252deg_360deg)] sm:h-[160px] sm:w-[160px]">
                  <div className="flex h-[128px] w-[128px] items-center justify-center rounded-full bg-[#e8eef7] sm:h-[142px] sm:w-[142px]">
                    <span className="text-[34px] font-bold text-[#174596] sm:text-[38px]">
                      70%
                    </span>
                  </div>
                </div>

                <h2 className="mt-6 text-center text-[19px] font-bold sm:text-[21px]">
                  Revision progress
                </h2>
              </div>

              <div className="rounded-[10px] bg-[#174596] p-5 text-white">
                <h3 className="text-[19px] font-bold sm:text-[21px]">
                  Right of Way Rules
                </h3>

                <p className="mt-3 max-w-[300px] text-[13.5px] leading-[1.5] sm:text-[14px]">
                  Learn who has priority at intersections, pedestrian crossings,
                  and roundabouts.
                </p>

                <div className="mt-3 flex items-center gap-2 text-[13px]">
                  <LuClock3 className="text-[16px]" />
                  <span>10 Minutes</span>
                </div>

                <button className="mt-6 rounded-lg bg-[#df2339] px-4 py-2 text-[11.5px] font-bold text-white transition hover:bg-[#c91f33]">
                  Continue Courses
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div className="rounded-[10px] bg-[#e8eef7] p-4 sm:p-5">
              <h2 className="text-[20px] font-bold sm:text-[22px]">
                Revision Topics
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
                {topics.map((topic) => (
                  <div
                    key={topic.id}
                    className="grid grid-cols-[58px_1fr] items-center gap-3 sm:grid-cols-[62px_1fr]"
                  >
                    <div className="flex h-[62px] items-center justify-center rounded-[9px] bg-white">
                      <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[conic-gradient(#174596_0deg_252deg,#9ca3af_252deg_360deg)]">
                        <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-white">
                          <span className="text-[11.5px] font-bold text-[#174596]">
                            {topic.progress}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex h-[62px] min-w-0 flex-col justify-center rounded-[9px] bg-white px-4">
                      <h4 className="truncate text-[14.5px] font-bold">
                        {topic.title}
                      </h4>
                      <p className="mt-1 text-[13px] text-[#555]">
                        {topic.lessons}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Evaluations / Exams Tab */}
        {(activeTab === "evaluations" || activeTab === "exams") && (
          <section className="mt-5">
            {/* Top Cards */}
            <div className="rounded-[10px] bg-[#e8eef7] p-4 sm:p-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-[10px] bg-white p-4 sm:p-5">
                  <h2 className="text-[18px] font-bold sm:text-[20px]">
                    Total Performance in Mock Exam
                  </h2>

                  <p className="mt-3 max-w-[430px] text-[13.5px] leading-[1.5] sm:text-[14px]">
                    See your overall score and track your progress in traffic
                    rules knowledge.
                  </p>

                  <div className="mt-3 space-y-1 text-[13.5px]">
                    <p>Score: 85%</p>
                    <p>Total Mock Test: 20</p>
                    <p>Passed: 13</p>
                  </div>

                  <button className="mt-4 rounded-lg bg-[#df2339] px-4 py-2 text-[11.5px] font-bold text-white transition hover:bg-[#c91f33]">
                    Take Practice Test
                  </button>
                </div>

                <div className="rounded-[10px] bg-white p-4 sm:p-5">
                  <h2 className="text-[18px] font-bold sm:text-[20px]">
                    Recent Quiz Result
                  </h2>

                  <p className="mt-3 max-w-[430px] text-[13.5px] leading-[1.5] sm:text-[14px]">
                    See your latest score and track your progress in traffic
                    rules knowledge.
                  </p>

                  <div className="mt-3 space-y-1 text-[13.5px]">
                    <p>Latest Score: 85%</p>
                    <p>Correct Answers: 17 / 20</p>
                    <p>Status: Passed</p>
                  </div>

                  <button className="mt-4 rounded-lg bg-[#df2339] px-4 py-2 text-[11.5px] font-bold text-white transition hover:bg-[#c91f33]">
                    Review Answers
                  </button>
                </div>
              </div>
            </div>

            {/* Mock Exam List */}
            <div className="mt-5 rounded-[10px] bg-[#e8eef7] p-4 sm:p-5">
              <div className="rounded-[10px] bg-white p-4 sm:p-5">
                <h2 className="text-[21px] font-bold text-[#174596] sm:text-[23px]">
                  Mock Exam
                </h2>

                <div className="mt-4 overflow-hidden rounded-lg bg-[#e8eef7]">
                  {exams.map((exam, index) => (
                    <div
                      key={exam.id}
                      className={`grid grid-cols-1 items-start gap-2 px-4 py-3 sm:grid-cols-[150px_1fr] sm:items-center md:grid-cols-[155px_1fr_150px_120px] lg:grid-cols-[170px_1fr_170px_125px] ${
                        index !== exams.length - 1
                          ? "border-b border-[#8b95a3]"
                          : ""
                      }`}
                    >
                      <div>
                        <span className="inline-block rounded-md bg-[#c8d8f3] px-3 py-1.5 text-[11.5px] font-bold text-[#174596]">
                          {exam.date}
                        </span>
                      </div>

                      <div className="text-left text-[12.5px] font-bold md:text-center">
                        {exam.title}
                      </div>

                      <div className="text-left text-[12.5px] text-[#666] md:text-center">
                        {exam.score}
                      </div>

                      <div className="text-left md:text-right">
                        <button
                          className={`w-full rounded-lg px-3 py-2 text-[11px] font-bold text-white transition sm:w-auto ${
                            exam.button === "Goodbye"
                              ? "bg-[#0f3470] hover:bg-[#0b2857]"
                              : "bg-[#df2339] hover:bg-[#c91f33]"
                          }`}
                        >
                          {exam.button}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default TrafficLawPage;
