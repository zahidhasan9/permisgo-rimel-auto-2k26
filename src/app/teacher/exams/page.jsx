"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
const examsData = [
  {
    name: "Theresa Webb",
    center: "Ab Center",
    date: "Mon, March 2, 2026",
    time: "9:00 AM - 2:00 PM",
    booklet: "View booklet",
    status: "Passed",
  },
  {
    name: "Esther Howard",
    center: "Ab Center",
    date: "Mon, March 2, 2026",
    time: "9:00 AM - 2:00 PM",
    booklet: "View booklet",
    status: "Passed",
  },
  {
    name: "Brooklyn Simmons",
    center: "Ab Center",
    date: "Mon, March 2, 2026",
    time: "9:00 AM - 2:00 PM",
    booklet: "View booklet",
    status: "Passed",
  },
  {
    name: "Bessie Cooper",
    center: "Ab Center",
    date: "Mon, March 2, 2026",
    time: "9:00 AM - 2:00 PM",
    booklet: "View booklet",
    status: "Failed",
  },
  {
    name: "Dianne Russell",
    center: "Ab Center",
    date: "Mon, March 2, 2026",
    time: "9:00 AM - 2:00 PM",
    booklet: "View booklet",
    status: "Failed",
  },
  {
    name: "Kristin Watson",
    center: "Ab Center",
    date: "Mon, March 2, 2026",
    time: "9:00 AM - 2:00 PM",
    booklet: "N/A",
    status: "Upcoming",
  },
];

const filters = [
  { key: "all", label: "All" },
  { key: "upcoming", label: "Upcoming exams" },
  { key: "passed", label: "Exam passed" },
  { key: "failed", label: "Failed" },
];

export default function ExaminationList() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredData = examsData.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      activeFilter === "all" || item.status.toLowerCase() === activeFilter;

    return matchSearch && matchFilter;
  });


  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-5 sm:px-6 lg:px-8">
      <section className="mx-auto ">
        {/* Header */}
        <header className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
                onClick={() => router.back()}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#16458f] shadow-sm transition hover:bg-blue-50"
            >
              <FaChevronLeft size={14} />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-[#16458f]">
                Examination List
              </h1>
              {/* <p className="mt-1 text-sm text-slate-500">
                Manage student exam records and results.
              </p> */}
            </div>
          </div>

          <button
            type="button"
            className="h-10 rounded-xl bg-[#e2233d] px-4 text-sm font-bold text-white transition hover:bg-[#c91f35]"
          >
            Request for revision
          </button>
        </header>

        {/* Toolbar */}
        <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="flex h-11 w-full items-center gap-3 rounded-xl bg-[#eef2f7] px-4 lg:max-w-md">
              <FaSearch className="text-slate-400" size={14} />

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

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
                  className={`h-10 rounded-xl border px-4 text-sm font-semibold transition ${
                    activeFilter === filter.key
                      ? "border-[#16458f] bg-[#d8e6ff] text-[#16458f]"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="bg-[#16458f] text-white">
                  <Th>Student Name</Th>
                  <Th>Exam Center</Th>
                  <Th>Date</Th>
                  <Th>Time</Th>
                  <Th>Booklet</Th>
                  <Th>Status</Th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white transition hover:bg-[#f8fafc]"
                  >
                    <Td>
                      <span className="font-bold text-slate-800">
                        {item.name}
                      </span>
                    </Td>
                    <Td>{item.center}</Td>
                    <Td>{item.date}</Td>
                    <Td>{item.time}</Td>
                    <Td>
                      {item.booklet === "N/A" ? (
                        <span className="text-slate-400">N/A</span>
                      ) : (
                        <Link   href="/teacher/exams/1" className="font-semibold text-[#16458f] underline underline-offset-2">
                          {item.booklet}
                        </Link>
                      )}
                    </Td>
                    <Td>
                      <StatusBadge status={item.status} />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-slate-500">
              Showing 1-{filteredData.length} of 50 students
            </p>

            <div className="flex items-center gap-3">
              <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eef2f7] text-slate-600 transition hover:bg-slate-200">
                <FaChevronLeft size={12} />
              </button>

              <span className="text-sm font-bold text-slate-700">Page 2</span>

              <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eef2f7] text-slate-600 transition hover:bg-slate-200">
                <FaChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Th({ children }) {
  return (
    <th className="whitespace-nowrap px-4 py-3 text-sm font-bold">
      {children}
    </th>
  );
}

function Td({ children }) {
  return (
    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-600">
      {children}
    </td>
  );
}

function StatusBadge({ status }) {
  const style =
    status === "Passed"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
      : status === "Failed"
        ? "bg-red-50 text-red-700 ring-red-100"
        : "bg-amber-50 text-amber-700 ring-amber-100";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${style}`}
    >
      {status}
    </span>
  );
}
