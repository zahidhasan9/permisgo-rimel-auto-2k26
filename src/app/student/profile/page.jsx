"use client";

import { useState } from "react";
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
  { x: 2.55, y: 38.7, dot: true },
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

function StudentAvatar() {
  return (
    <div className="relative h-14 w-14 shrink-0 rounded-full border border-[#174A9B] bg-white p-[3px] shadow-sm sm:h-[70px] sm:w-[70px]">
      <div className="relative h-full w-full overflow-hidden rounded-full bg-[#DDE9F7]">
        <div className="absolute left-1/2 top-[6px] h-[22px] w-[32px] -translate-x-1/2 rounded-t-full bg-[#221A17] sm:top-[7px] sm:h-[27px] sm:w-[39px]" />
        <div className="absolute left-1/2 top-[16px] h-[29px] w-[28px] -translate-x-1/2 rounded-full bg-[#B87A4C] sm:top-[19px] sm:h-[35px] sm:w-[34px]" />
        <div className="absolute left-[19px] top-[28px] h-[3px] w-[3px] rounded-full bg-black sm:left-[23px] sm:top-[34px]" />
        <div className="absolute right-[19px] top-[28px] h-[3px] w-[3px] rounded-full bg-black sm:right-[23px] sm:top-[34px]" />
        <div className="absolute left-1/2 top-[39px] h-[4px] w-[14px] -translate-x-1/2 rounded-b-full bg-white sm:top-[47px] sm:w-[17px]" />
        <div className="absolute bottom-[-15px] left-1/2 h-[36px] w-[48px] -translate-x-1/2 rounded-t-full bg-[#174A9B] sm:bottom-[-17px] sm:h-[42px] sm:w-[55px]" />
      </div>

      <div className="absolute bottom-0 right-[-3px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#174A9B] text-[10px] font-bold leading-none text-white sm:h-[17px] sm:w-[17px]">
        +
      </div>
    </div>
  );
}

function InfoBox({ title, data, onEdit }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)] sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-[#174A9B] sm:text-[15px]">
          {title}
        </h3>

        <button
          type="button"
          onClick={onEdit}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF4FB] text-[#174A9B] transition hover:bg-[#174A9B] hover:text-white"
          aria-label={`Edit ${title}`}
        >
          <FiEdit2 size={16} />
        </button>
      </div>

      <div className="mt-3 grid gap-2 sm:mt-5 sm:grid-cols-3 sm:gap-4">
        {data.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2 sm:block sm:bg-transparent sm:px-0 sm:py-0"
          >
            <p className="text-[11px] font-bold text-[#292D33] sm:text-[12.5px]">
              {item.label}
            </p>
            <p className="max-w-[55%] truncate text-right text-[11px] font-medium text-[#777B84] sm:mt-2 sm:max-w-full sm:text-left sm:text-[11.5px]">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EditModal({ open, title, draft, onClose, onChange, onSave }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-3 pb-3 sm:items-center sm:p-4">
      <div className="max-h-[88vh] w-full max-w-[430px] overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Profile Update
            </p>
            <h2 className="mt-1 text-lg font-bold text-[#174A9B]">
              Edit {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF4FB] text-xl text-[#174A9B]"
            aria-label="Close modal"
          >
            <FiX />
          </button>
        </div>

        <div className="space-y-3">
          {draft.map((item, index) => (
            <div key={item.label}>
              <label className="mb-1.5 block text-xs font-bold text-[#292D33]">
                {item.label}
              </label>

              <input
                value={item.value}
                onChange={(e) => onChange(index, e.target.value)}
                className="h-10 w-full rounded-xl border border-[#B7CBE8] bg-white px-3 text-xs font-medium text-[#30323A] outline-none focus:border-[#174A9B] focus:ring-2 focus:ring-[#174A9B]/15 sm:h-11 sm:text-sm"
              />
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-xl border border-[#B7CBE8] bg-white px-4 text-sm font-bold text-[#174A9B]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            className="h-10 rounded-xl bg-[#174A9B] px-4 text-sm font-bold text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function Metric({ value, label }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white px-2 py-3 text-center shadow-[0_8px_24px_rgba(15,23,42,0.05)] sm:px-4 sm:py-4">
      <p className="text-[13px] font-bold leading-4 text-[#30323A] sm:text-sm">
        {value}
      </p>
      <p className="mt-1 text-[10.5px] font-medium leading-4 text-[#64748B] sm:text-[11.5px]">
        {label}
      </p>
    </div>
  );
}

function CheckItem({ label, done }) {
  return (
    <div className="flex min-h-7 items-center gap-2.5">
      {done ? (
        <BsCheckSquareFill className="h-4 w-4 shrink-0 text-[#2DBE52] sm:h-[18px] sm:w-[18px]" />
      ) : (
        <span className="h-4 w-4 shrink-0 rounded border border-[#4F7EC5] bg-white sm:h-[18px] sm:w-[18px]" />
      )}

      <span
        className={`text-[13px] font-medium sm:text-sm ${
          done ? "text-[#30323A]" : "text-[#868A92]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function ProgressRing() {
  return (
    <div className="relative mx-auto mt-4 h-24 w-24 rounded-full sm:mt-6 sm:h-28 sm:w-28">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from -20deg, #174A9B 0deg, #174A9B 216deg, #ffffff 216deg, #ffffff 360deg)",
        }}
      />
      <div className="absolute inset-[10px] rounded-full bg-[#DEE7F2] sm:inset-[12px]" />
      <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-[#174A9B] sm:text-lg">
        60%
      </div>
    </div>
  );
}

export default function Page() {
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

  const [modalType, setModalType] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [draft, setDraft] = useState([]);

  const openModal = (type, title, data) => {
    setModalType(type);
    setModalTitle(title);
    setDraft(data.map((item) => ({ ...item })));
  };

  const closeModal = () => {
    setModalType(null);
    setModalTitle("");
    setDraft([]);
  };

  const handleDraftChange = (index, value) => {
    setDraft((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, value } : item,
      ),
    );
  };

  const saveModal = () => {
    if (modalType === "personal") {
      setPersonalInfo(draft);
    }

    if (modalType === "driving") {
      setDrivingInfo(draft);
    }

    closeModal();
  };

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

        body {
          margin: 0;
          background: #f6f8fc;
          font-family: "Poppins", sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        .profile-chart .recharts-cartesian-axis-line,
        .profile-chart .recharts-cartesian-axis-tick-line {
          display: none;
        }

        .profile-chart .recharts-cartesian-axis-tick-value {
          fill: #2d3036;
          font-size: 11px;
          font-weight: 500;
        }

        @media (min-width: 640px) {
          .profile-chart .recharts-cartesian-axis-tick-value {
            font-size: 12px;
          }
        }
      `}</style>

      <EditModal
        open={Boolean(modalType)}
        title={modalTitle}
        draft={draft}
        onClose={closeModal}
        onChange={handleDraftChange}
        onSave={saveModal}
      />

      <main className="min-h-screen bg-[#F6F8FC]">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-4 px-3 py-3 sm:gap-5 sm:px-5 sm:py-5 lg:px-6 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0 space-y-4 sm:space-y-5">
            <header className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-5">
              <div className="flex gap-3 sm:gap-4">
                <button
                  type="button"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FB] text-xl text-[#111827] sm:h-[42px] sm:w-[42px] sm:text-[26px]"
                >
                  <IoChevronBack />
                </button>

                <div className="min-w-0">
                  <h1 className="text-xl font-bold leading-7 text-[#174A9B] sm:text-2xl">
                    Profile
                  </h1>
                  <p className="mt-1.5 max-w-[720px] text-xs font-medium leading-5 text-[#767B84] sm:mt-2 sm:text-[13.5px]">
                    Update your information to ensure accurate lesson scheduling
                    and communication.
                  </p>
                </div>
              </div>
            </header>

            <section className="rounded-2xl border border-[#DCE7F5] bg-[#E8EEF8] p-3 shadow-sm sm:p-5">
              <div className="flex items-center gap-3 sm:gap-5">
                <StudentAvatar />

                <div className="min-w-0">
                  <h2 className="truncate text-lg font-bold leading-6 text-[#174A9B] sm:text-[21px]">
                    Shahin Miah
                  </h2>
                  <p className="mt-1 text-xs font-medium text-[#7C818A] sm:text-[13px]">
                    Driving Student
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                <InfoBox
                  title="Personal information"
                  data={personalInfo}
                  onEdit={() =>
                    openModal("personal", "Personal information", personalInfo)
                  }
                />

                <InfoBox
                  title="Driving Information"
                  data={drivingInfo}
                  onEdit={() =>
                    openModal("driving", "Driving Information", drivingInfo)
                  }
                />
              </div>
            </section>

            <section className="rounded-2xl border border-[#DCE7F5] bg-[#E8EEF8] p-3 shadow-sm sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-bold text-[#174A9B] sm:text-[15px]">
                  Lesson Summary
                </h2>
                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#174A9B] shadow-sm">
                  2026
                </span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-4">
                <Metric value="40 Hours" label="Completed" />
                <Metric value="0 min" label="Planned" />
                <Metric value="40:00" label="Evaluated" />
              </div>

              <div className="profile-chart mt-3 h-[220px] rounded-2xl border border-[#B7CBE8] bg-white px-1 pb-2 pt-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] sm:mt-5 sm:h-[330px] sm:px-4 sm:pb-3 sm:pt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 12, right: 4, bottom: 2, left: -30 }}
                  >
                    <defs>
                      <linearGradient
                        id="chartFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor={BLUE} stopOpacity={0.18} />
                        <stop
                          offset="100%"
                          stopColor={BLUE}
                          stopOpacity={0.06}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      vertical={false}
                      stroke="#000000"
                      strokeOpacity={0.12}
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
                      padding={{ left: 0, right: 0 }}
                      interval={0}
                      dy={12}
                    />

                    <YAxis
                      domain={[0, 40]}
                      ticks={[0, 10, 20, 30, 40]}
                      width={42}
                      dx={-8}
                    />

                    <Tooltip
                      cursor={false}
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid #B7CBE8",
                        fontSize: 12,
                        boxShadow: "0 10px 30px rgba(15,23,42,0.12)",
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="y"
                      stroke={BLUE}
                      strokeWidth={2.2}
                      fill="url(#chartFill)"
                      dot={(props) => {
                        if (!props.payload.dot) return null;
                        return (
                          <circle
                            cx={props.cx}
                            cy={props.cy}
                            r={5}
                            fill={BLUE}
                            stroke={BLUE}
                            strokeWidth={1}
                          />
                        );
                      }}
                      activeDot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="rounded-2xl border border-[#DCE7F5] bg-[#E8EEF8] p-3 shadow-sm sm:p-5">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_8px_24px_rgba(15,23,42,0.05)] sm:p-5">
                <h2 className="text-sm font-bold text-[#174A9B] sm:text-[15px]">
                  Learning Progress
                </h2>

                <div className="mt-3 space-y-2 md:hidden">
                  {learningRows.map((row, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold text-[#2D3036]">
                            {row[0]}
                          </p>
                          <p className="mt-1 text-[11px] font-medium text-[#7D828B]">
                            {row[1]} · {row[2]}
                          </p>
                        </div>

                        <button
                          type="button"
                          className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#174A9B]"
                        >
                          <BsPlusCircleFill className="h-3.5 w-3.5 text-[#F12B45]" />
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 hidden overflow-x-auto md:block">
                  <div className="min-w-[680px]">
                    {learningRows.map((row, index) => (
                      <div
                        key={index}
                        className="grid min-h-[44px] grid-cols-[1.25fr_1fr_1.2fr_110px] items-center gap-3 border-b border-[#E4E8EF] py-2 last:border-b-0"
                      >
                        <p className="text-[12.5px] font-bold text-[#2D3036]">
                          {row[0]}
                        </p>
                        <p className="text-[12.5px] font-medium text-[#7D828B]">
                          {row[1]}
                        </p>
                        <p className="text-[12.5px] font-medium text-[#7D828B]">
                          {row[2]}
                        </p>

                        <button
                          type="button"
                          className="flex items-center gap-2 text-[12.5px] font-semibold text-[#174A9B]"
                        >
                          <BsPlusCircleFill className="h-[15px] w-[15px] text-[#F12B45]" />
                          Add Date
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 gap-4 rounded-2xl border border-[#DCE7F5] bg-[#E8EEF8] p-3 shadow-sm sm:p-5 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
                <h2 className="text-sm font-bold text-[#174A9B] sm:text-[15px]">
                  Appointments
                </h2>

                <div className="mt-4 space-y-3 text-xs font-medium text-[#747981] sm:text-[13px]">
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

                <p className="mt-5 text-sm font-bold text-[#174A9B] sm:text-[15px]">
                  Total Sessions: 46 Hour
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
                <h2 className="text-sm font-bold text-[#174A9B] sm:text-[15px]">
                  Performance Overview
                </h2>

                <div className="mt-4 space-y-3 text-xs font-medium text-[#747981] sm:text-[13px]">
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
                    <span className="font-bold text-[#30323A]">
                      Intermediate
                    </span>
                  </p>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-3 rounded-2xl border border-[#DCE7F5] bg-[#DEE7F2] p-4 shadow-sm md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-base font-bold text-[#174A9B] sm:text-[19px]">
                  ANTS Registration
                </h2>
                <p className="mt-2 text-xs font-medium text-[#343841] sm:text-[13.5px]">
                  No applications are currently being processed.
                </p>
              </div>

              <button
                type="button"
                className="h-10 rounded-xl border border-[#174A9B] bg-white px-4 text-xs font-bold text-[#F12B45] shadow-sm sm:min-w-[235px] sm:text-sm"
              >
                Continue on ANTS website
              </button>
            </section>

            <section className="rounded-2xl border border-[#DCE7F5] bg-[#E8EEF8] p-4 shadow-sm">
              <h2 className="text-base font-bold text-[#174A9B] sm:text-[19px]">
                Check your learning booklet and track your progress
              </h2>

              <button
                type="button"
                className="mt-4 h-10 rounded-xl bg-[#F12B45] px-4 text-xs font-bold text-white shadow-sm"
              >
                Check Learning Booklet
              </button>
            </section>
          </div>

          <aside className="min-w-0 space-y-4 xl:w-[280px]">
            <section className="rounded-2xl border border-[#DCE7F5] bg-[#DEE7F2] p-4 shadow-sm sm:p-5">
              <h2 className="text-center text-sm font-bold text-[#174A9B] sm:text-[15px]">
                Complete your profile
              </h2>

              <ProgressRing />

              <div className="mt-5 grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-1">
                {profileSteps.map(([label, done]) => (
                  <CheckItem key={label} label={label} done={done} />
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-[#DCE7F5] bg-[#DEE7F2] p-4 shadow-sm sm:p-5">
              <h2 className="text-[13.5px] font-bold text-[#174A9B]">
                Instructor Notes
              </h2>

              <textarea
                placeholder="Write here"
                className="mt-3 h-20 w-full resize-none rounded-xl border border-[#A6B9D8] bg-white px-3 py-2 text-xs font-medium text-[#30323A] outline-none placeholder:text-[#A3A7AE] focus:border-[#174A9B] focus:ring-2 focus:ring-[#174A9B]/15"
              />
            </section>
          </aside>
        </div>
      </main>
    </>
  );
}
