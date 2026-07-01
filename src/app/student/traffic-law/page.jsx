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
      ? "rounded-[9px] border border-[#174596] bg-[#b7cdf6] px-6 py-2.5 text-[13px] font-semibold text-[#174596]"
      : "rounded-[9px] border border-[#174596] bg-white px-6 py-2.5 text-[13px] font-semibold text-[#111827] transition hover:bg-[#f3f6fb]";

  return (
    <main className="min-h-screen bg-white px-5 py-5 font-sans text-[#171717]">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="#"
          className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-[#e7ebf2] text-[22px] text-black"
        >
          <IoChevronBack />
        </Link>

        <h1 className="text-[24px] font-bold text-[#173f8f]">
          Traffic {activeTab === "learn" ? "Law" : "Laws"}
        </h1>
      </div>

      {/* Tabs */}
      <div className="mt-7 flex flex-wrap gap-3">
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
        <section className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-[320px_1fr]">
          {/* Left Side */}
          <div>
            <div className="flex h-[380px] flex-col items-center justify-center rounded-[10px] bg-[#e8eef7]">
              <div className="flex h-[190px] w-[190px] items-center justify-center rounded-full bg-[conic-gradient(#174596_0deg_252deg,#ffffff_252deg_360deg)]">
                <div className="flex h-[170px] w-[170px] items-center justify-center rounded-full bg-[#e8eef7]">
                  <span className="text-[42px] font-bold text-[#174596]">
                    70%
                  </span>
                </div>
              </div>

              <h2 className="mt-8 text-[23px] font-bold">Revision progress</h2>
            </div>

            <div className="mt-5 rounded-[10px] bg-[#174596] p-5 text-white">
              <h3 className="text-[22px] font-bold">Right of Way Rules</h3>

              <p className="mt-4 max-w-[280px] text-[14.5px] leading-[1.55]">
                Learn who has priority at intersections, pedestrian crossings,
                and roundabouts.
              </p>

              <div className="mt-3 flex items-center gap-2 text-[13px]">
                <LuClock3 className="text-[17px]" />
                <span>10 Minutes</span>
              </div>

              <button className="mt-8 rounded-[8px] bg-[#df2339] px-4 py-2 text-[11.5px] font-bold text-white transition hover:bg-[#c91f33]">
                Continue Courses
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="rounded-[10px] bg-[#e8eef7] p-5">
            <h2 className="text-[23px] font-bold">Revision Topics</h2>

            <div className="mt-6 space-y-4">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className="grid grid-cols-[64px_1fr] items-center gap-3"
                >
                  <div className="flex h-[72px] items-center justify-center rounded-[9px] bg-white">
                    <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[conic-gradient(#174596_0deg_252deg,#9ca3af_252deg_360deg)]">
                      <div className="flex h-[37px] w-[37px] items-center justify-center rounded-full bg-white">
                        <span className="text-[12.5px] font-bold text-[#174596]">
                          70%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex h-[72px] flex-col justify-center rounded-[9px] bg-white px-4">
                    <h4 className="text-[15.5px] font-bold">{topic.title}</h4>
                    <p className="mt-1.5 text-[13.5px] text-[#555]">
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
        <section className="mt-7">
          {/* Top Cards */}
          <div className="rounded-[10px] bg-[#e8eef7] p-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-[10px] bg-white p-5">
                <h2 className="text-[20px] font-bold">
                  Total Performance in Mock Exam
                </h2>

                <p className="mt-4 max-w-[430px] text-[14.5px] leading-[1.5]">
                  See your overall score and track your progress in traffic
                  rules knowledge.
                </p>

                <div className="mt-3 space-y-1 text-[14px]">
                  <p>Score: 85%</p>
                  <p>Total Mock Test: 20</p>
                  <p>Passed: 13</p>
                </div>

                <button className="mt-5 rounded-[8px] bg-[#df2339] px-4 py-2 text-[11.5px] font-bold text-white transition hover:bg-[#c91f33]">
                  Take Practice Test
                </button>
              </div>

              <div className="rounded-[10px] bg-white p-5">
                <h2 className="text-[20px] font-bold">Recent Quiz Result</h2>

                <p className="mt-4 max-w-[430px] text-[14.5px] leading-[1.5]">
                  See your latest score and track your progress in traffic rules
                  knowledge.
                </p>

                <div className="mt-3 space-y-1 text-[14px]">
                  <p>Latest Score: 85%</p>
                  <p>Correct Answers: 17 / 20</p>
                  <p>Status: Passed</p>
                </div>

                <button className="mt-5 rounded-[8px] bg-[#df2339] px-4 py-2 text-[11.5px] font-bold text-white transition hover:bg-[#c91f33]">
                  Review Answers
                </button>
              </div>
            </div>
          </div>

          {/* Mock Exam List */}
          <div className="mt-7 rounded-[10px] bg-[#e8eef7] p-5">
            <div className="rounded-[10px] bg-white px-6 py-6">
              <h2 className="text-[23px] font-bold text-[#174596]">
                Mock Exam
              </h2>

              <div className="mt-6 overflow-hidden rounded-[8px] bg-[#e8eef7]">
                {exams.map((exam, index) => (
                  <div
                    key={exam.id}
                    className={`grid grid-cols-1 items-center gap-3 px-6 py-3.5 md:grid-cols-[190px_1fr_200px_135px] ${
                      index !== exams.length - 1
                        ? "border-b border-[#8b95a3]"
                        : ""
                    }`}
                  >
                    <div>
                      <span className="inline-block rounded-[6px] bg-[#c8d8f3] px-4 py-2 text-[12px] font-bold text-[#174596]">
                        {exam.date}
                      </span>
                    </div>

                    <div className="text-center text-[12.5px] font-bold">
                      {exam.title}
                    </div>

                    <div className="text-center text-[12.5px] text-[#666]">
                      {exam.score}
                    </div>

                    <div className="text-right">
                      <button
                        className={`rounded-[8px] px-4 py-2 text-[11.5px] font-bold text-white transition ${
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
    </main>
  );
};

export default TrafficLawPage;
