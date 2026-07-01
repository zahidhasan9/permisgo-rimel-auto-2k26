"use client";

import { FaCaretDown } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";

const progressCards = [
  {
    code: "C1",
    title: "MASTERING",
    bg: "#AFC8F4",
    border: "#2869E8",
    bar: "#2869E8",
  },
  {
    code: "C2",
    title: "To Understand",
    bg: "#F4A5AF",
    border: "#F0182D",
    bar: "#F0182D",
  },
  {
    code: "C3",
    title: "Driving",
    bg: "#EFD9A1",
    border: "#C99E35",
    bar: "#D2AD43",
  },
  {
    code: "C4",
    title: "Practice",
    bg: "#91DFAF",
    border: "#05A850",
    bar: "#05A850",
  },
];

const skills = [
  {
    bold: "MASTERING",
    text: " vehicle handling in light or no traffic",
  },
  {
    bold: "To understand",
    text: " the road and drive under normal conditions",
  },
  {
    bold: "Driving",
    text: " in difficult conditions and sharing the road with other users",
  },
  {
    bold: "Practice",
    text: " autonomous, safe and economical driving",
  },
];

function Header() {
  return (
    <header className="flex items-start gap-[16px]">
      <button className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[12px] bg-[#EEF4FB] text-[27px] text-black">
        <IoChevronBack />
      </button>

      <div>
        <h1 className="text-[26px] font-[700] leading-none text-[#174A9B]">
          Learning booklet
        </h1>

        <p className="mt-[15px] text-[13.5px] font-[500] leading-none text-[#666666]">
          Update your information to ensure accurate lesson scheduling and
          communication.
        </p>
      </div>
    </header>
  );
}

function BookletCta() {
  return (
    <section className="mt-[39px] h-[124px] rounded-[10px] bg-[#E8EEF8] px-[20px] pt-[23px]">
      <h2 className="text-[22px] font-[700] leading-none text-[#174A9B]">
        Check your learning booklet and track your progress
      </h2>

      <button className="mt-[24px] h-[40px] rounded-[7px] bg-[#E5273D] px-[12px] text-[12px] font-[700] text-white">
        Check Learning Booklet
      </button>
    </section>
  );
}

function TrackingSheet() {
  return (
    <section className="mt-[20px] rounded-[10px] bg-[#E8EEF8] px-[20px] pb-[20px] pt-[23px]">
      <h2 className="text-[22px] font-[700] leading-none text-[#174A9B]">
        Tracking Sheet
      </h2>

      <div className="mt-[18px] rounded-[10px] bg-white p-[16px]">
        <div className="grid gap-[10px] text-[13px] font-[500] text-[#666666]">
          <div className="flex flex-wrap items-center gap-[6px]">
            <span className="min-w-[110px] font-[700] text-[#222222]">
              Date:
            </span>
            <span>Tuesday, June 3, 2025 at 7:00 AM</span>
            <span className="rounded-[5px] bg-[#DCE7FA] px-[8px] py-[3px] text-[12px] font-[600] text-[#174A9B]">
              2 hours
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-[6px]">
            <span className="min-w-[110px] font-[700] text-[#222222]">
              Location:
            </span>
            <span>Paris - Place de Clichy</span>
          </div>

          <div className="flex flex-wrap items-center gap-[6px]">
            <span className="min-w-[110px] font-[700] text-[#222222]">
              Teacher:
            </span>
            <span>Robart Smith</span>
          </div>

          <div className="flex flex-wrap items-center gap-[6px]">
            <span className="min-w-[110px] font-[700] text-[#222222]">
              Lesson summary:
            </span>
            <span>Expect results</span>
          </div>
        </div>

        <button className="mt-[16px] flex h-[48px] w-full items-center justify-between rounded-[9px] bg-[#E8EEF8] px-[16px] text-[15px] font-[600] text-[#174A9B]">
          Previous reports
          <FaCaretDown className="text-[15px] text-[#222222]" />
        </button>
      </div>
    </section>
  );
}

function ProgressCard({ item }) {
  return (
    <div
      className="h-[156px] rounded-[10px] border px-[20px] pt-[20px]"
      style={{
        backgroundColor: item.bg,
        borderColor: item.border,
      }}
    >
      <div className="mx-auto flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white text-[15px] font-[700] text-[#174A9B]">
        {item.code}
      </div>

      <h3 className="mt-[13px] text-center text-[13px] font-[700] leading-none text-[#174A9B]">
        {item.title}
      </h3>

      <div className="mt-[14px] rounded-full bg-white">
        <div
          className="h-[11px] w-[56%] rounded-full"
          style={{ backgroundColor: item.bar }}
        />
      </div>

      <p className="mt-[8px] text-center text-[12.5px] font-[700] leading-none text-[#111111]">
        56% Completed
      </p>
    </div>
  );
}

function ProgressGrid() {
  return (
    <section className="mt-[20px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 xl:grid-cols-4">
      {progressCards.map((item) => (
        <ProgressCard key={item.code} item={item} />
      ))}
    </section>
  );
}

function SkillRow({ item }) {
  return (
    <button className="flex h-[69px] w-full items-center justify-between rounded-[10px] bg-[#E8EEF8] px-[20px] text-left">
      <span className="text-[14px] font-[500] leading-[20px] text-[#666666]">
        <span className="font-[700] text-[#222222]">{item.bold}</span>
        {item.text}
      </span>

      <FaCaretDown className="ml-4 shrink-0 text-[18px] text-[#222222]" />
    </button>
  );
}

function SkillsSection() {
  return (
    <section className="mt-[20px] rounded-[10px] bg-[#E8EEF8] px-[20px] pb-[20px] pt-[23px]">
      <div className="flex items-start justify-between gap-[20px]">
        <h2 className="text-[22px] font-[700] leading-none text-[#174A9B]">
          Skills
        </h2>

        <p className="mt-[2px] text-[14px] font-[700] leading-none text-[#20BE3A]">
          25 hours Completed
        </p>
      </div>

      <div className="mt-[22px] rounded-[10px] bg-white px-[20px] py-[20px]">
        <div className="space-y-[12px]">
          {skills.map((item) => (
            <SkillRow key={item.bold} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          background: #ffffff;
          font-family: "Poppins", sans-serif;
          overflow-x: hidden;
        }
      `}</style>

      <main className="min-h-screen bg-white">
        <div className="mx-auto w-full max-w-[1132px] px-[24px] pb-[24px] pt-[24px]">
          <Header />
          <BookletCta />
          <TrackingSheet />
          <ProgressGrid />
          <SkillsSection />
        </div>
      </main>
    </>
  );
}
