"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BsCheckSquareFill, BsPlusCircleFill } from "react-icons/bs";
import { FiEdit2, FiX } from "react-icons/fi";
import { IoChevronBack } from "react-icons/io5";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BLUE = "#174A9B";

const chartData = [
  { x: 0, y: 7 },
  { x: 0.28, y: 17 },
  { x: 0.55, y: 20 },
  { x: 0.84, y: 14 },
  { x: 1.08, y: 15 },
  { x: 1.1, y: 27 },
  { x: 1.3, y: 29 },
  { x: 1.55, y: 22 },
  { x: 1.9, y: 21 },
  { x: 2.1, y: 25 },
  { x: 2.25, y: 36 },
  { x: 2.55, y: 38.7 },
  { x: 2.8, y: 35 },
  { x: 3.1, y: 26 },
  { x: 3.35, y: 24 },
  { x: 3.75, y: 28 },
  { x: 4.15, y: 37 },
];

const learningRows = [
  ["Registration", "24/03/2026", "Theoretical exam"],
  ["Assessment", "24/03/2026", "Practical exam"],
  ["Entry Code", "24/03/2026", "Theoretical exam"],
  ["Registration", "24/03/2026", "Practical exam"],
  ["Entrance to the driveway", "24/03/2026", "Theoretical exam"],
];

const profileSteps = [
  ["Account Setup", true],
  ["Profile Photo", true],
  ["Personal Info", true],
  ["Driving Info (+20%)", false],
  ["Contact", true],
  ["Documents (+20%)", false],
];

export default function Page() {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  const [personalInfo, setPersonalInfo] = useState([
    { label: "Date of Birth", value: "12 March 2000" },
    { label: "Email", value: "shahin@email.com" },
    { label: "Address", value: "Paris, France" },
  ]);

  const [drivingInfo, setDrivingInfo] = useState([
    { label: "NEPH Number", value: "250395301980" },
    { label: "Permit Type", value: "Accelerated Training" },
    { label: "License Type", value: "Automatic" },
  ]);

  const [modal, setModal] = useState({
    open: false,
    type: "",
    title: "",
    data: [],
  });

  return (
    <main className="min-h-screen bg-[#F6F8FC] px-3 py-3 font-sans sm:px-5 sm:py-5 lg:px-6">
      <div className="mx-auto grid w-full max-w-[1160px] grid-cols-1 gap-4 xl:grid-cols-[1fr_280px]">
        {/* LEFT SIDE */}
        <div className="space-y-4">
          {/* HEADER */}
          <header className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FB] text-[24px] text-[#111827]"
              >
                <IoChevronBack />
              </button>

              <div>
                <h1 className="text-xl font-bold text-[#174A9B] sm:text-2xl">
                  Profile
                </h1>
                <p className="mt-1 text-xs font-medium leading-5 text-[#767B84] sm:text-[13px]">
                  Update your information to ensure accurate lesson scheduling
                  and communication.
                </p>
              </div>
            </div>
          </header>

          {/* PROFILE INFO */}
          <section className="rounded-2xl border border-[#DCE7F5] bg-[#E8EEF8] p-4 shadow-sm sm:p-5">
            <div className="flex items-center gap-4">
              {/* AVATAR */}
              <div className="relative h-[66px] w-[66px] shrink-0 rounded-full border border-[#174A9B] bg-white p-[3px]">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#DDE9F7] text-[28px] font-bold text-[#174A9B]">
                  S
                </div>

                <div className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#174A9B] text-[12px] font-bold text-white">
                  +
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#174A9B] sm:text-[21px]">
                  Shahin Miah
                </h2>
                <p className="mt-1 text-xs font-medium text-[#7C818A]">
                  Driving Student
                </p>
              </div>
            </div>

            {/* PERSONAL INFO */}
            <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#174A9B]">
                  Personal information
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    setModal({
                      open: true,
                      type: "personal",
                      title: "Personal information",
                      data: personalInfo.map((item) => ({ ...item })),
                    })
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF4FB] text-[#174A9B]"
                >
                  <FiEdit2 />
                </button>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {personalInfo.map((item) => (
                  <div key={item.label} className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[12px] font-bold text-[#292D33]">
                      {item.label}
                    </p>
                    <p className="mt-1 text-[12px] font-medium text-[#777B84]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* DRIVING INFO */}
            <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#174A9B]">
                  Driving Information
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    setModal({
                      open: true,
                      type: "driving",
                      title: "Driving Information",
                      data: drivingInfo.map((item) => ({ ...item })),
                    })
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF4FB] text-[#174A9B]"
                >
                  <FiEdit2 />
                </button>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {drivingInfo.map((item) => (
                  <div key={item.label} className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[12px] font-bold text-[#292D33]">
                      {item.label}
                    </p>
                    <p className="mt-1 text-[12px] font-medium text-[#777B84]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* LESSON SUMMARY */}
          <section className="rounded-2xl border border-[#DCE7F5] bg-[#E8EEF8] p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#174A9B]">
                Lesson Summary
              </h2>
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#174A9B]">
                2026
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                ["40 Hours", "Completed"],
                ["0 min", "Planned"],
                ["40:00", "Evaluated"],
              ].map((item) => (
                <div
                  key={item[1]}
                  className="rounded-2xl bg-white px-2 py-3 text-center shadow-sm"
                >
                  <p className="text-[13px] font-bold text-[#30323A]">
                    {item[0]}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-[#64748B]">
                    {item[1]}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 h-[230px] rounded-2xl border border-[#B7CBE8] bg-white p-3 sm:h-[310px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 8, bottom: 0, left: -25 }}
                >
                  <defs>
                    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={BLUE} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={BLUE} stopOpacity={0.05} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    vertical={false}
                    stroke="#000000"
                    strokeOpacity={0.1}
                  />

                  <XAxis
                    dataKey="x"
                    type="number"
                    domain={[0, 4.15]}
                    ticks={[0.08, 1.02, 2.0, 2.95, 4.0]}
                    tickFormatter={(value) => {
                      if (value < 0.5) return "Aug";
                      if (value < 1.5) return "Sep";
                      if (value < 2.5) return "Oct";
                      if (value < 3.5) return "Nov";
                      return "Dec";
                    }}
                    tick={{ fontSize: 11 }}
                  />

                  <YAxis
                    domain={[0, 40]}
                    ticks={[0, 10, 20, 30, 40]}
                    width={38}
                    tick={{ fontSize: 11 }}
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="y"
                    stroke={BLUE}
                    strokeWidth={2.2}
                    fill="url(#chartFill)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* LEARNING PROGRESS */}
          <section className="rounded-2xl border border-[#DCE7F5] bg-[#E8EEF8] p-4 shadow-sm sm:p-5">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h2 className="text-sm font-bold text-[#174A9B]">
                Learning Progress
              </h2>

              <div className="mt-4 space-y-3 md:hidden">
                {learningRows.map((row, index) => (
                  <div key={index} className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs font-bold text-[#2D3036]">{row[0]}</p>
                    <p className="mt-1 text-[11px] text-[#7D828B]">
                      {row[1]} · {row[2]}
                    </p>

                    <button
                      type="button"
                      className="mt-2 flex items-center gap-2 text-[11px] font-bold text-[#174A9B]"
                    >
                      <BsPlusCircleFill className="text-[#F12B45]" />
                      Add Date
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4 hidden overflow-x-auto md:block">
                <div className="min-w-[650px]">
                  {learningRows.map((row, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[1.2fr_1fr_1.2fr_100px] items-center gap-3 border-b border-[#E4E8EF] py-3 last:border-b-0"
                    >
                      <p className="text-[12.5px] font-bold text-[#2D3036]">
                        {row[0]}
                      </p>
                      <p className="text-[12.5px] text-[#7D828B]">{row[1]}</p>
                      <p className="text-[12.5px] text-[#7D828B]">{row[2]}</p>

                      <button
                        type="button"
                        className="flex items-center gap-2 text-[12px] font-semibold text-[#174A9B]"
                      >
                        <BsPlusCircleFill className="text-[#F12B45]" />
                        Add Date
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* APPOINTMENTS + PERFORMANCE */}
          <section className="grid grid-cols-1 gap-4 rounded-2xl border border-[#DCE7F5] bg-[#E8EEF8] p-4 shadow-sm md:grid-cols-2">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h2 className="text-sm font-bold text-[#174A9B]">Appointments</h2>

              <div className="mt-4 space-y-3 text-[13px] text-[#747981]">
                <p>
                  Driving Lesson:{" "}
                  <span className="font-bold text-[#30323A]">40 Hours</span>
                </p>
                <p>
                  Simulator Lesson:{" "}
                  <span className="font-bold text-[#30323A]">5 Hours</span>
                </p>
                <p>
                  Coding Session:{" "}
                  <span className="font-bold text-[#30323A]">1 Hour</span>
                </p>
              </div>

              <p className="mt-5 text-sm font-bold text-[#174A9B]">
                Total Sessions: 46 Hour
              </p>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h2 className="text-sm font-bold text-[#174A9B]">
                Performance Overview
              </h2>

              <div className="mt-4 space-y-3 text-[13px] text-[#747981]">
                <p>
                  Students Like Rating:{" "}
                  <span className="font-bold text-[#30323A]">4.8</span>
                </p>
                <p>
                  Pass Probability:{" "}
                  <span className="font-bold text-[#174A9B]">High</span>
                </p>
                <p>
                  Progress Level:{" "}
                  <span className="font-bold text-[#30323A]">Intermediate</span>
                </p>
              </div>
            </div>
          </section>

          {/* ANTS */}
          <section className="rounded-2xl border border-[#DCE7F5] bg-[#DEE7F2] p-4 shadow-sm md:flex md:items-center md:justify-between">
            <div>
              <h2 className="text-base font-bold text-[#174A9B]">
                ANTS Registration
              </h2>
              <p className="mt-2 text-xs font-medium text-[#343841]">
                No applications are currently being processed.
              </p>
            </div>

            <button
              type="button"
              className="mt-4 h-10 rounded-xl border border-[#174A9B] bg-white px-4 text-xs font-bold text-[#F12B45] md:mt-0"
            >
              Continue on ANTS website
            </button>
          </section>

          {/* BOOKLET */}
          <section className="rounded-2xl border border-[#DCE7F5] bg-[#E8EEF8] p-4 shadow-sm">
            <h2 className="text-base font-bold text-[#174A9B]">
              Check your learning booklet and track your progress
            </h2>

            <button
              type="button"
              className="mt-4 h-10 rounded-xl bg-[#F12B45] px-4 text-xs font-bold text-white"
            >
              Check Learning Booklet
            </button>
          </section>
        </div>

        {/* RIGHT SIDE */}
        <aside className="space-y-4">
          {/* COMPLETE PROFILE */}
          <section className="rounded-2xl border border-[#DCE7F5] bg-[#DEE7F2] p-4 shadow-sm">
            <h2 className="text-center text-sm font-bold text-[#174A9B]">
              Complete your profile
            </h2>

            <div className="relative mx-auto mt-5 h-28 w-28 rounded-full">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(#174A9B 0deg, #174A9B 216deg, #ffffff 216deg, #ffffff 360deg)",
                }}
              />
              <div className="absolute inset-[12px] rounded-full bg-[#DEE7F2]" />
              <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#174A9B]">
                60%
              </div>
            </div>

            <div className="mt-5 space-y-2">
              {profileSteps.map(([label, done]) => (
                <div key={label} className="flex items-center gap-2.5">
                  {done ? (
                    <BsCheckSquareFill className="text-[#2DBE52]" />
                  ) : (
                    <span className="h-4 w-4 rounded border border-[#4F7EC5] bg-white" />
                  )}

                  <span
                    className={`text-sm font-medium ${
                      done ? "text-[#30323A]" : "text-[#868A92]"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* NOTES */}
          <section className="rounded-2xl border border-[#DCE7F5] bg-[#DEE7F2] p-4 shadow-sm">
            <h2 className="text-sm font-bold text-[#174A9B]">
              Instructor Notes
            </h2>

            <textarea
              placeholder="Write here"
              className="mt-3 h-24 w-full resize-none rounded-xl border border-[#A6B9D8] bg-white px-3 py-2 text-xs outline-none focus:border-[#174A9B]"
            />
          </section>
        </aside>
      </div>

      {/* EDIT MODAL */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-3 pb-3 sm:items-center sm:p-4">
          <div className="w-full max-w-[430px] rounded-2xl bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase text-slate-400">
                  Profile Update
                </p>
                <h2 className="mt-1 text-lg font-bold text-[#174A9B]">
                  Edit {modal.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setModal({ open: false, type: "", title: "", data: [] })
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF4FB] text-xl text-[#174A9B]"
              >
                <FiX />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {modal.data.map((item, index) => (
                <div key={item.label}>
                  <label className="mb-1.5 block text-xs font-bold text-[#292D33]">
                    {item.label}
                  </label>

                  <input
                    value={item.value}
                    onChange={(event) => {
                      const updatedData = modal.data.map((field, fieldIndex) =>
                        fieldIndex === index
                          ? { ...field, value: event.target.value }
                          : field,
                      );

                      setModal({ ...modal, data: updatedData });
                    }}
                    className="h-10 w-full rounded-xl border border-[#B7CBE8] px-3 text-xs outline-none focus:border-[#174A9B]"
                  />
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setModal({ open: false, type: "", title: "", data: [] })
                }
                className="h-10 rounded-xl border border-[#B7CBE8] text-sm font-bold text-[#174A9B]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  if (modal.type === "personal") {
                    setPersonalInfo(modal.data);
                  }

                  if (modal.type === "driving") {
                    setDrivingInfo(modal.data);
                  }

                  setModal({ open: false, type: "", title: "", data: [] });
                }}
                className="h-10 rounded-xl bg-[#174A9B] text-sm font-bold text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
