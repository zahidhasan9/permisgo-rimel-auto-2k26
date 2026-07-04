"use client";

import Link from "next/link";
import { IoChevronBack, IoArrowBack, IoArrowForward } from "react-icons/io5";

const progressLessons = [
  {
    id: 1,
    title: "Legal provisions regarding road traffic",
    date: "Monday, March 2, 2026, 10:00 AM",
    progress: 20,
  },
  {
    id: 2,
    title: "Legal provisions regarding road traffic",
    date: "Monday, March 2, 2026, 10:00 AM",
    progress: 20,
  },
  {
    id: 3,
    title: "Legal provisions regarding road traffic",
    date: "Monday, March 2, 2026, 10:00 AM",
    progress: 20,
  },
];

const completedLessons = [
  {
    id: 1,
    title: "Legal provisions regarding road traffic",
    date: "Monday, March 2, 2026, 10:00 AM",
    vehicle: "Automatic - Toyota Corolla",
    progress: 100,
  },
  {
    id: 2,
    title: "Legal provisions regarding road traffic",
    date: "Monday, March 2, 2026, 10:00 AM",
    vehicle: "Automatic - Toyota Corolla",
    progress: 100,
  },
  {
    id: 3,
    title: "Legal provisions regarding road traffic",
    date: "Monday, March 2, 2026, 10:00 AM",
    vehicle: "Automatic - Toyota Corolla",
    progress: 100,
  },
];

const topicResults = [
  { key: "L", percent: 40, color: "#69A9DF" },
  { key: "HAS", percent: 40, color: "#EF2F2B" },
  { key: "C", percent: 40, color: "#E6007E" },
  { key: "P", percent: 47, color: "#555553" },
  { key: "R", percent: 30, color: "#AAA2CC" },
  { key: "M", percent: 21, color: "#F79500" },
  { key: "U", percent: 47, color: "#DA4E2D" },
  { key: "S", percent: 31, color: "#40962D" },
  { key: "D", percent: 36, color: "#FDBA12" },
  { key: "E", percent: 37, color: "#91A719" },
];

const topicList = [
  {
    key: "L",
    title: "Legal provisions regarding road traffic",
    color: "#FDBA12",
  },
  {
    key: "HAS",
    title: "First aid",
    color: "#E6007E",
  },
  {
    key: "C",
    title: "The Driver",
    color: "#69A9DF",
  },
  {
    key: "P",
    title: "Precautions to take when leaving the vehicle",
    color: "#555553",
  },
  {
    key: "R",
    title: "The Road",
    color: "#EF2F2B",
  },
  {
    key: "M",
    title: "Mechanical components and other safety-related equipment",
    color: "#3BB0AA",
  },
  {
    key: "U",
    title: "Other road users",
    color: "#736AB0",
  },
  {
    key: "S",
    title: "Vehicle safety equipment",
    color: "#40962D",
  },
  {
    key: "D",
    title: "General regulations and miscellaneous",
    color: "#E6007E",
  },
  {
    key: "E",
    title: "Rules for using the vehicle in relation to ecology",
    color: "#91A719",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white px-4 py-4 font-sans text-[#171717] sm:px-5">
      <div className="mx-auto w-full max-w-[980px]">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-[#E8EEF7] text-[23px] text-black"
            >
              <IoChevronBack />
            </Link>

            <h1 className="text-[21px] font-bold text-[#174596] sm:text-[22px]">
              My History
            </h1>
          </div>

          <button
            type="button"
            className="rounded-[7px] bg-[#DF2339] px-5 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#c91f33]"
          >
            Download
          </button>
        </header>

        <section className="mt-7 rounded-[10px] bg-[#E8EEF7] p-4 sm:p-5">
          <SectionHeader title="Lesson Progress" />

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {progressLessons.map((lesson) => (
              <LessonProgressCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </section>

        <section className="mt-7 rounded-[10px] bg-[#E8EEF7] p-4 sm:p-5">
          <SectionHeader title="Lesson Completed" />

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {completedLessons.map((lesson) => (
              <CompletedLessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </section>

        <section className="mt-7 rounded-[10px] bg-[#E8EEF7] p-4 sm:p-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <PerformanceCard
              title="Total Performance in Mock Exam"
              description="See your overall score and track your progress in traffic rules knowledge."
              lines={["Score: 85%", "Total Mock Test: 20", "Passed: 13"]}
              button="Take Practice Test"
            />

            <PerformanceCard
              title="Recent Quiz Result"
              description="See your latest score and track your progress in traffic rules knowledge."
              lines={[
                "Latest Score: 85%",
                "Correct Answers: 17 / 20",
                "Status: Passed",
              ]}
              button="Review Answers"
            />
          </div>
        </section>

        <section className="mt-7 rounded-[10px] bg-[#E8EEF7] p-4 sm:p-5">
          <h2 className="text-[20px] font-bold text-[#174596]">
            My result by topic
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-3 md:grid-cols-2">
            {topicResults.map((topic) => (
              <TopicBar key={topic.key} topic={topic} />
            ))}
          </div>

          <div className="mt-5 rounded-[10px] bg-white p-4 sm:p-5">
            <h3 className="text-[15px] font-bold text-[#174596]">
              List of topics:
            </h3>

            <div className="mt-5 grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
              {topicList.map((topic) => (
                <div
                  key={topic.key}
                  className="flex items-start gap-2 text-[13px] text-[#6b6b6b]"
                >
                  <span
                    className="min-w-fit text-[18px] font-bold leading-none"
                    style={{ color: topic.color }}
                  >
                    {topic.key} :
                  </span>

                  <span className="leading-[1.35]">{topic.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SectionHeader({ title }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-[19px] font-bold text-[#174596] sm:text-[20px]">
        {title}
      </h2>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex h-[35px] w-[35px] items-center justify-center rounded-[9px] bg-[#DDE6F2] text-[18px] text-[#DF2339]"
        >
          <IoArrowBack />
        </button>

        <button
          type="button"
          className="flex h-[35px] w-[35px] items-center justify-center rounded-[9px] bg-[#DF2339] text-[18px] text-white"
        >
          <IoArrowForward />
        </button>
      </div>
    </div>
  );
}

function LessonProgressCard({ lesson }) {
  return (
    <div className="rounded-[10px] bg-white p-4">
      <h3 className="text-[14px] font-bold leading-[1.25] text-[#174596] underline">
        {lesson.title}
      </h3>

      <p className="mt-3 text-[11px] text-[#555]">
        Start Date{" "}
        <span className="font-bold text-[#171717]">{lesson.date}</span>
      </p>

      <div className="mt-4 h-[13px] overflow-hidden rounded-full bg-[#D7E1EF]">
        <div
          className="h-full rounded-full bg-[#174596]"
          style={{ width: `${lesson.progress}%` }}
        />
      </div>

      <p className="mt-2 text-[11.5px] font-bold text-[#20BF3A]">
        {lesson.progress}% Progress
      </p>
    </div>
  );
}

function CompletedLessonCard({ lesson }) {
  return (
    <div className="rounded-[10px] bg-white p-4">
      <h3 className="text-[14px] font-bold leading-[1.25] text-[#174596] underline">
        {lesson.title}
      </h3>

      <p className="mt-3 text-[11px] text-[#555]">
        Start Date{" "}
        <span className="font-bold text-[#171717]">{lesson.date}</span>
      </p>

      <p className="mt-2 text-[11px] text-[#555]">
        Vehicle Type:{" "}
        <span className="font-bold text-[#171717]">{lesson.vehicle}</span>
      </p>

      <div className="mt-4 h-[13px] overflow-hidden rounded-full bg-[#D7E1EF]">
        <div
          className="h-full rounded-full bg-[#174596]"
          style={{ width: `${lesson.progress}%` }}
        />
      </div>

      <p className="mt-2 text-[11.5px] font-bold text-[#20BF3A]">
        {lesson.progress}% Completed
      </p>
    </div>
  );
}

function PerformanceCard({ title, description, lines, button }) {
  return (
    <div className="rounded-[10px] bg-white p-5">
      <h2 className="text-[19px] font-bold text-black">{title}</h2>

      <p className="mt-4 max-w-[390px] text-[13px] leading-[1.45] text-black">
        {description}
      </p>

      <div className="mt-3 space-y-1 text-[13px] text-black">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <button
        type="button"
        className="mt-4 rounded-[7px] bg-[#DF2339] px-4 py-2 text-[11px] font-bold text-white transition hover:bg-[#c91f33]"
      >
        {button}
      </button>
    </div>
  );
}

function TopicBar({ topic }) {
  return (
    <div className="h-[40px] overflow-hidden rounded-[4px] bg-white">
      <div
        className="flex h-full items-center justify-between rounded-[4px] px-4 text-white"
        style={{
          width: `${Math.max(topic.percent, 28)}%`,
          backgroundColor: topic.color,
        }}
      >
        <span className="text-[16px] font-bold">{topic.key}</span>
        <span className="text-[18px] font-bold">{topic.percent}%</span>
      </div>
    </div>
  );
}
