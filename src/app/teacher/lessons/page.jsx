"use client";

import { useState } from "react";
import {
  FaCalendarAlt,
  FaCheck,
  FaChevronLeft,
  FaQuestionCircle,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
const filterGroups = [
  {
    title: "Income-generating lessons",
    items: [
      { key: "futureLessons", label: "Future lessons" },
      { key: "lessonsLearned", label: "Lessons learned" },
    ],
  },
  {
    title: "Other lessons",
    items: [
      { key: "awaitingConfirmation", label: "Awaiting confirmation" },
      { key: "canceledByYou", label: "Canceled by you" },
      { key: "canceledByStudent", label: "Canceled by the student" },
    ],
  },
];

export default function Lessons() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    futureLessons: true,
    lessonsLearned: false,
    awaitingConfirmation: false,
    canceledByYou: false,
    canceledByStudent: false,
  });
const router = useRouter();
  const handleCheckbox = (name) => {
    setFilters((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-5 sm:px-6 lg:px-8">
      <section className="mx-auto ">
        {/* Header */}
        {/* <header className="mb-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#16458f] shadow-sm transition hover:bg-blue-50"
          >
            <FaChevronLeft size={14} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-[#16458f]">
              List of Lessons
            </h1>
           
          </div>
        </header> */}

        {/* Header */}
        <header className="mb-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#16458f] shadow-sm transition hover:bg-blue-50"
          >
            <FaChevronLeft size={14} />
          </button>

          <h1 className="text-2xl font-bold text-[#16458f]">List of Lessons</h1>
        </header>

        {/* Action Bar */}
        <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex h-11 w-full items-center gap-3 rounded-xl border border-slate-200 bg-[#f8fafc] px-4 transition focus-within:border-[#16458f] focus-within:ring-4 focus-within:ring-blue-50 lg:max-w-md">
              <FaSearch size={14} className="text-slate-400" />

              <input
                type="text"
                placeholder="Search students"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-slate-400 transition hover:text-slate-700"
                >
                  <FaTimes size={14} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="h-11 rounded-xl border border-[#e2233d] bg-white px-5 text-sm font-bold text-slate-900 transition hover:bg-red-50"
              >
                Arrange Review
              </button>

              <button
                type="button"
                className="h-11 rounded-xl bg-[#e2233d] px-5 text-sm font-bold text-white transition hover:bg-[#c91f35]"
              >
                Submit Lesson
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
          {/* Filter Card */}
          <aside className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <DateInput label="Start date" value="10/12/2025" />
              <DateInput label="End date" value="10/12/2025" />
            </div>

            <div className="mt-5 space-y-5">
              {filterGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="mb-3 text-sm font-extrabold text-slate-900">
                    {group.title}
                  </h3>

                  <div className="space-y-2.5">
                    {group.items.map((item) => (
                      <CustomCheckbox
                        key={item.key}
                        label={item.label}
                        checked={filters[item.key]}
                        onChange={() => handleCheckbox(item.key)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Result Card */}
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <div className="flex min-h-[360px] items-center justify-center rounded-2xl bg-[#eef4fb] p-6 text-center">
              <div>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#16458f] shadow-sm">
                  <FaQuestionCircle size={24} />
                </div>

                <h3 className="text-lg font-extrabold text-slate-900">
                  No Lessons Found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  You have no lessons in this filter range.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function DateInput({ label, value }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <div className="flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-[#f8fafc] px-4">
        <input
          type="text"
          value={value}
          readOnly
          className="w-full bg-transparent text-sm font-medium text-slate-600 outline-none"
        />

        <FaCalendarAlt size={15} className="text-[#16458f]" />
      </div>
    </div>
  );
}

function CustomCheckbox({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex w-full items-center gap-3 rounded-xl px-2 py-1.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[10px] transition ${
          checked
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-[#16458f] bg-white text-transparent"
        }`}
      >
        <FaCheck />
      </span>

      <span>{label}</span>
    </button>
  );
}

