"use client";

import { useState } from "react";
import {
  IoArrowBack,
  IoChevronBack,
  IoChevronForward,
  IoSearch,
} from "react-icons/io5";

const miniDays = [
  { day: "29", muted: true },
  { day: "30", muted: true },
  { day: "01" },
  { day: "02", active: true },
  { day: "03" },
  { day: "04" },
  { day: "05" },
  { day: "06" },
  { day: "07" },
  { day: "08" },
  { day: "09" },
  { day: "10" },
  { day: "11" },
  { day: "12" },
  { day: "13" },
  { day: "14" },
  { day: "15" },
  { day: "16" },
  { day: "17" },
  { day: "18" },
  { day: "19" },
  { day: "20" },
  { day: "21" },
  { day: "22" },
  { day: "23" },
  { day: "24" },
  { day: "25" },
  { day: "26" },
  { day: "27" },
  { day: "28" },
  { day: "29" },
  { day: "30" },
  { day: "31" },
  { day: "01", muted: true },
  { day: "02", muted: true },
];

const students = [
  {
    name: "Devon Lane",
    email: "devonlane@gmail.com",
    initial: "D",
  },
  {
    name: "Bessie Cooper",
    email: "bessiecooper@gmail.com",
    initial: "B",
  },
  {
    name: "Theresa Webb",
    email: "theresawebb@gmail.com",
    initial: "T",
  },
];

const weekDays = [
  { date: "15", day: "Mon" },
  { date: "16", day: "Tue" },
  { date: "17", day: "Wed" },
  { date: "18", day: "Thu" },
  { date: "19", day: "Fri" },
  { date: "20", day: "Sat" },
  { date: "21", day: "Sun" },
];

const times = ["10.00", "11.00", "12.00", "1.00", "2.00"];

const bookings = [
  { timeIndex: 0, dayIndex: 2 },
  { timeIndex: 2, dayIndex: 5 },
  { timeIndex: 3, dayIndex: 1 },
  { timeIndex: 3, dayIndex: 4 },
  { timeIndex: 4, dayIndex: 3 },
];

export default function AvailabilityCalendar() {
  const [search, setSearch] = useState("");

  const isBooked = (timeIndex, dayIndex) => {
    return bookings.some(
      (item) => item.timeIndex === timeIndex && item.dayIndex === dayIndex,
    );
  };

  return (
    <section className="min-h-screen w-full max-w-full overflow-hidden bg-white px-3 py-4 sm:px-5 lg:px-6">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl text-slate-900 transition hover:bg-slate-200"
          >
            <IoArrowBack />
          </button>

          <h1 className="truncate text-xl font-extrabold text-blue-900 sm:text-2xl">
            Availability Calendar
          </h1>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            className="rounded-xl border-2 border-blue-900 bg-white px-5 py-2.5 text-sm font-bold text-blue-900 transition hover:bg-blue-50"
          >
            Copy for next week
          </button>

          <button
            type="button"
            className="rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-rose-700"
          >
            Set availability
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid w-full max-w-full grid-cols-1 gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
        {/* Left Panel */}
        <aside className="rounded-2xl bg-slate-100 p-4">
          {/* Mini Calendar */}
          <div className="rounded-xl bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                December 2, 2021
              </h3>

              <div className="flex items-center gap-2 text-blue-900">
                <button className="text-lg">
                  <IoChevronBack />
                </button>
                <button className="text-lg">
                  <IoChevronForward />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <span
                  key={index}
                  className="text-xs font-semibold text-slate-900"
                >
                  {day}
                </span>
              ))}

              {miniDays.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  className={`flex h-7 items-center justify-center rounded-md text-xs transition ${
                    item.active
                      ? "bg-slate-200 text-slate-900"
                      : item.muted
                        ? "text-slate-400 hover:bg-slate-100"
                        : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.day}
                </button>
              ))}
            </div>
          </div>

          {/* Students */}
          <div className="mt-7">
            <h4 className="mb-3 text-sm font-extrabold text-slate-900">
              Student
            </h4>

            <div className="mb-4 flex h-11 items-center gap-3 rounded-xl bg-white px-4">
              <IoSearch className="text-xl text-slate-500" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search students"
                className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-4">
              {students.map((student, index) => (
                <StudentItem key={index} student={student} />
              ))}
            </div>
          </div>
        </aside>

        {/* Calendar Table */}
        <main className="min-w-0 rounded-2xl bg-slate-100 p-4">
          <div className="mb-4 flex items-center justify-between rounded-xl bg-white px-4 py-3">
            <h3 className="text-sm font-bold text-slate-900 sm:text-base">
              Dec 15, 2021 - Dec 21, 2021
            </h3>

            <div className="flex items-center gap-3 text-blue-900">
              <button className="text-lg">
                <IoChevronBack />
              </button>
              <button className="text-lg">
                <IoChevronForward />
              </button>
            </div>
          </div>

          <div className="w-full max-w-full overflow-x-auto rounded-xl bg-white">
            <div className="min-w-[760px]">
              {/* Days Header */}
              <div className="grid grid-cols-[110px_repeat(7,minmax(85px,1fr))] border-b border-slate-200">
                <div className="flex h-20 items-center justify-center border-r border-slate-200 text-sm font-extrabold text-blue-900">
                  Time
                </div>

                {weekDays.map((item, index) => (
                  <div
                    key={index}
                    className="flex h-20 flex-col items-center justify-center border-r border-slate-200 text-center last:border-r-0"
                  >
                    <span className="text-base font-extrabold text-slate-900">
                      {item.date}
                    </span>
                    <span className="mt-1 text-sm font-bold text-slate-900">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>

              {/* Time Rows */}
              {times.map((time, timeIndex) => (
                <div
                  key={timeIndex}
                  className="grid grid-cols-[110px_repeat(7,minmax(85px,1fr))] border-b border-slate-200 last:border-b-0"
                >
                  <div className="flex h-[84px] items-center justify-center border-r border-slate-200 bg-slate-50 text-base font-extrabold text-green-500">
                    {time}
                  </div>

                  {weekDays.map((_, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="relative flex h-[84px] items-center justify-center border-r border-slate-200 last:border-r-0"
                    >
                      {isBooked(timeIndex, dayIndex) && (
                        <span className="rounded-lg bg-blue-900 px-3 py-1.5 text-xs font-extrabold text-white">
                          Booked
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

function StudentItem({ student }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-blue-900 bg-blue-100 text-sm font-extrabold text-blue-900">
        {student.initial}
      </div>

      <div className="min-w-0">
        <h5 className="truncate text-sm font-extrabold text-slate-900">
          {student.name}
        </h5>
        <p className="truncate text-xs text-slate-500">{student.email}</p>
      </div>
    </div>
  );
}
