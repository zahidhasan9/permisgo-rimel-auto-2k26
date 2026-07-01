"use client";

import {
  FaArrowLeft,
  FaArrowRight,
  FaBrain,
  FaCalendarAlt,
  FaCarSide,
  FaClipboardCheck,
} from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { MdChecklist } from "react-icons/md";

function StatCard({ icon, title, value }) {
  return (
    <div className="min-h-[142px] rounded-[12px] bg-[#E8EEF8] px-4 py-5">
      <div className="mx-auto flex h-[38px] w-[38px] items-center justify-center rounded-[11px] bg-white text-[18px] text-[#174A9B]">
        {icon}
      </div>

      <h3 className="mt-4 text-center text-[14px] font-[700] text-black">
        {title}
      </h3>

      <p className="mt-2 text-center text-[25px] font-[700] leading-none text-[#2DBE42]">
        {value}
      </p>
    </div>
  );
}

function LessonCard() {
  return (
    <div className="rounded-[12px] bg-white p-4 sm:p-[18px]">
      <h3 className="mb-4 text-[14px] font-[700] leading-[18px] text-[#174A9B] underline underline-offset-[3px]">
        City Driving Practice
      </h3>

      <div className="space-y-[8px] text-[12px] leading-[17px]">
        <div className="grid grid-cols-[82px_1fr] gap-2">
          <span className="font-[500] text-[#6E7077]">Start Date</span>
          <span className="font-[700] text-[#25272D]">
            Monday, March 2, 2026, 10:00 AM
          </span>
        </div>

        <div className="grid grid-cols-[82px_1fr] gap-2">
          <span className="font-[500] text-[#6E7077]">Duration</span>
          <span className="font-[700] text-[#25272D]">60 Minutes</span>
        </div>

        <div className="grid grid-cols-[82px_1fr] gap-2">
          <span className="font-[500] text-[#6E7077]">Vehicle</span>
          <span className="font-[700] text-[#25272D]">
            Automatic – Toyota Corolla
          </span>
        </div>

        <div className="grid grid-cols-[82px_1fr] gap-2">
          <span className="font-[500] text-[#6E7077]">Instructor</span>
          <span className="font-[700] text-[#174A9B]">Michael Carter</span>
        </div>
      </div>

      <div className="mt-4 rounded-full bg-[#D7DFEC] p-[2px]">
        <div className="h-[8px] w-[46%] rounded-full bg-[#174A9B]" />
      </div>

      <p className="mt-2 text-[12px] font-[700] leading-none text-[#2DBE42]">
        20% Progress
      </p>
    </div>
  );
}

function ScheduleRow({ day, date }) {
  return (
    <div className="flex min-h-[72px] gap-[10px]">
      <div className="flex min-h-[72px] w-[62px] shrink-0 flex-col items-center justify-center rounded-[10px] bg-white">
        <p className="text-[14px] font-[700] leading-none text-[#858585]">
          {day}
        </p>
        <p className="mt-[10px] text-[23px] font-[700] leading-none text-[#E5273D]">
          {date}
        </p>
      </div>

      <div className="min-w-0 flex-1 rounded-[10px] bg-white px-[15px] py-[16px]">
        <h4 className="truncate text-[15px] font-[700] leading-none text-black">
          Online code review
        </h4>
        <p className="mt-[13px] text-[13px] font-[500] leading-none text-[#55565B]">
          9:00 AM - 2:00 PM
        </p>
      </div>
    </div>
  );
}

function SemiDonutChart() {
  const cx = 170;
  const cy = 170;
  const r = 108;
  const stroke = 52;

  const polar = (angle) => {
    const rad = (Math.PI / 180) * angle;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const arc = (start, end) => {
    const s = polar(start);
    const e = polar(end);
    const large = Math.abs(end - start) > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  return (
    <div className="relative mx-auto mt-[22px] h-[175px] w-full max-w-[310px]">
      <svg
        className="h-full w-full"
        viewBox="0 0 340 210"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d={arc(180, 270)}
          fill="none"
          stroke="#174A9B"
          strokeWidth={stroke}
          strokeLinecap="butt"
        />
        <path
          d={arc(270, 315)}
          fill="none"
          stroke="#2DBE42"
          strokeWidth={stroke}
          strokeLinecap="butt"
        />
        <path
          d={arc(315, 360)}
          fill="none"
          stroke="#E5273D"
          strokeWidth={stroke}
          strokeLinecap="butt"
        />
      </svg>

      <p className="absolute bottom-[28px] left-0 right-0 text-center text-[18px] font-[700] text-[#174A9B]">
        60% Average
      </p>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-[8px]">
      <span
        className="h-[14px] w-[14px] shrink-0 rounded-[4px]"
        style={{ backgroundColor: color }}
      />
      <span className="text-[12px] font-[500] text-[#30323A]">{label}</span>
    </div>
  );
}

function TrainingCard({ icon, text }) {
  return (
    <div className="flex min-h-[128px] min-w-0 flex-1 flex-col items-center justify-center rounded-[12px] bg-white px-3 py-4">
      <div className="mb-[16px] flex h-[34px] w-[34px] items-center justify-center rounded-[8px] bg-[#E8EEF8] text-[16px] text-[#174A9B]">
        {icon}
      </div>

      <p className="max-w-[105px] text-center text-[13px] font-[500] leading-[20px] text-[#101010]">
        {text}
      </p>
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative h-[38px] w-[38px] shrink-0 overflow-hidden rounded-full bg-[#F4B642]">
      <div className="absolute left-1/2 top-[7px] h-[18px] w-[20px] -translate-x-1/2 rounded-full bg-[#8B4A25]" />
      <div className="absolute left-1/2 top-[14px] h-[21px] w-[21px] -translate-x-1/2 rounded-full bg-[#D89C62]" />
      <div className="absolute bottom-[-9px] left-1/2 h-[24px] w-[38px] -translate-x-1/2 rounded-t-full bg-[#111827]" />
    </div>
  );
}

function MessageRow() {
  return (
    <div className="flex h-[52px] items-center gap-[10px] rounded-[12px] bg-white px-[11px]">
      <Avatar />

      <div className="min-w-0">
        <p className="truncate text-[12px] font-[700] leading-none text-black">
          Michael Carter
        </p>
        <p className="mt-[6px] truncate text-[11px] font-[500] leading-none text-[#30323A]">
          Message text here
        </p>
      </div>
    </div>
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

      <main className="min-h-screen w-full min-w-0 overflow-x-hidden bg-white">
        <div className="mx-auto w-full max-w-[1080px] px-4 pb-6 pt-6 sm:px-5 lg:px-6">
          <header>
            <h1 className="text-[24px] font-[700] leading-tight text-[#174A9B] sm:text-[28px]">
              Welcome, Robert
            </h1>
            <p className="mt-[10px] text-[12px] font-[500] leading-[19px] text-[#6D6F76] sm:text-[13px]">
              Track your lessons, attendance, payments, and progress easily from
              one dashboard
            </p>
          </header>

          <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={<FaClipboardCheck />}
              title="Time Taken"
              value="13"
            />
            <StatCard
              icon={<FaCalendarAlt />}
              title="Time to Come"
              value="560"
            />
            <StatCard icon={<FaBrain />} title="Skills Acquired" value="04" />
            <StatCard icon={<FaBrain />} title="Hours Left" value="04" />
          </section>

          <section className="mt-5 rounded-[14px] bg-[#E8EEF8] p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-[18px] font-[700] leading-none text-[#174A9B]">
                Lesson Progress
              </h2>

              <div className="flex shrink-0 gap-[10px]">
                <button className="flex h-[36px] w-[36px] items-center justify-center rounded-[11px] bg-[#DEE7F3] text-[14px] text-[#E5273D]">
                  <FaArrowLeft />
                </button>
                <button className="flex h-[36px] w-[36px] items-center justify-center rounded-[11px] bg-[#E5273D] text-[14px] text-white">
                  <FaArrowRight />
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              <LessonCard />
              <LessonCard />
              <LessonCard />
            </div>
          </section>

          <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
            <div className="rounded-[14px] bg-[#E8EEF8] p-4 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-[18px] font-[700] leading-none text-[#174A9B]">
                  Upcoming Schedule
                </h2>

                <button className="text-[12px] font-[700] leading-none text-[#174A9B] underline underline-offset-[2px]">
                  See All
                </button>
              </div>

              <button className="mt-5 flex h-[28px] w-[104px] items-center justify-center gap-[7px] rounded-[6px] bg-white text-[11px] font-[500] text-[#30323A]">
                March, 2026
                <FaCalendarAlt className="text-[#174A9B]" />
              </button>

              <div className="mt-4 space-y-[10px]">
                <ScheduleRow day="Sat" date="10" />
                <ScheduleRow day="Sat" date="11" />
                <ScheduleRow day="Sat" date="12" />
              </div>
            </div>

            <div className="min-w-0 rounded-[14px] bg-[#E8EEF8] p-4 sm:p-5">
              <h2 className="text-[18px] font-[700] leading-none text-[#174A9B]">
                Total Progress Statistics
              </h2>

              <SemiDonutChart />

              <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2">
                <LegendItem color="#174A9B" label="Completed Lessons" />
                <LegendItem color="#2DBE42" label="In progress" />
                <LegendItem color="#E5273D" label="Not completed" />
              </div>
            </div>
          </section>

          <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-[minmax(0,1.55fr)_minmax(150px,0.55fr)_minmax(270px,1fr)]">
            <div className="rounded-[14px] bg-[#E8EEF8] p-4 sm:p-5">
              <h2 className="text-[18px] font-[700] leading-none text-[#174A9B]">
                Training
              </h2>

              <h3 className="mt-5 text-[15px] font-[700] leading-none text-[#15233B]">
                Traffic Law’s
              </h3>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <TrainingCard icon={<MdChecklist />} text="Start Revising" />
                <TrainingCard icon={<FaCarSide />} text="Take Practice exam" />
                <TrainingCard
                  icon={<IoStatsChart />}
                  text="Exam Registration"
                />
              </div>
            </div>

            <div className="rounded-[14px] bg-[#E8EEF8] p-4 sm:p-5">
              <h2 className="text-[18px] font-[700] leading-[25px] text-[#174A9B]">
                Practice <br /> Driving
              </h2>

              <p className="mt-4 text-[12px] font-[500] leading-[18px] text-[#30323A]">
                Check your driving test readiness and stay updated on your
                progress.
              </p>

              <p className="mt-4 text-[12px] font-[700] leading-none text-[#2DBE42]">
                Not Scheduled
              </p>

              <button className="mt-6 h-[32px] w-full max-w-[120px] rounded-[7px] bg-[#E5273D] text-[11px] font-[700] text-white">
                Book Now
              </button>
            </div>

            <div className="rounded-[14px] bg-[#E8EEF8] p-4 sm:p-5 lg:col-span-2 xl:col-span-1">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-[18px] font-[700] leading-none text-[#174A9B]">
                  Message Instructor
                </h2>

                <button className="shrink-0 text-[12px] font-[700] leading-none text-[#174A9B] underline underline-offset-[2px]">
                  See All
                </button>
              </div>

              <div className="mt-4 space-y-[12px]">
                <MessageRow />
                <MessageRow />
                <MessageRow />
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
