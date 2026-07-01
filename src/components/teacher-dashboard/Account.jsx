"use client";

import { useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import {
  IoArrowBack,
  IoChevronBack,
  IoChevronDown,
  IoChevronForward,
  IoClose,
  IoSearch,
  IoTime,
} from "react-icons/io5";

const rows = Array.from({ length: 10 }, (_, i) => ({
  week: `Week ${String(i + 1).padStart(2, "0")}`,
  year: "2026",
  duration: "2 hours",
  rate: "30$",
  earning: "60$",
  date: "Date",
  status: "Paid",
}));

export default function AccountingPage() {
  const [search, setSearch] = useState("");

  return (
    <section className="min-h-screen w-full max-w-full overflow-x-hidden bg-white px-3 py-4 sm:px-5 lg:px-6">
      <div className="mx-auto w-full max-w-full min-w-0">
        {/* Header */}
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl text-slate-900 transition hover:bg-slate-200"
            >
              <IoArrowBack />
            </button>

            <div className="min-w-0">
              <h1 className="truncate text-2xl font-bold text-blue-900">
                Accounting
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Accounting Dashboard for your lessons
              </p>
            </div>
          </div>

          <button
            type="button"
            className="hidden shrink-0 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-rose-700 sm:inline-flex"
          >
            Withdraw Funds
          </button>
        </div>

        {/* Main Box */}
        <div className="w-full max-w-full overflow-hidden rounded-2xl bg-slate-100 p-3 sm:p-4 lg:p-5">
          <h3 className="mb-4 text-base font-bold text-slate-900">
            Filters & Summary
          </h3>

          {/* Top Area */}
          <div className="mb-5 grid w-full min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(260px,360px)] xl:items-end">
            {/* Filters + Search */}
            <div className="min-w-0">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,180px)_minmax(0,180px)_auto]">
                <SelectBox label="Status" defaultValue="All Status" />
                <SelectBox label="Year" defaultValue="All Year" />

                <button
                  type="button"
                  className="h-10 rounded-xl bg-rose-600 px-5 text-sm font-bold text-white transition hover:bg-rose-700 lg:mt-7"
                >
                  Filter
                </button>
              </div>

              <div className="mt-4 flex h-11 w-full max-w-[520px] items-center gap-3 rounded-xl bg-white px-4">
                <IoSearch className="shrink-0 text-xl text-slate-500" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search records"
                  className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="shrink-0 text-xl text-slate-800"
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-2">
              <SummaryCard
                icon={<FaDollarSign />}
                label="Total Earnings"
                value="0"
              />
              <SummaryCard icon={<IoTime />} label="Total Hours" value="0" />
            </div>
          </div>

          {/* Table */}
          <div className="w-full max-w-full overflow-hidden rounded-xl bg-white">
            <div className="w-full max-w-full overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <Th>Week</Th>
                    <Th>Year ⇅</Th>
                    <Th>Total Duration ⇅</Th>
                    <Th>Hourly Rate</Th>
                    <Th>Total Earning ⇅</Th>
                    <Th>Date ⇅</Th>
                    <Th>Action</Th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
                    >
                      <Td>{row.week}</Td>
                      <Td>{row.year}</Td>
                      <Td>{row.duration}</Td>
                      <Td>{row.rate}</Td>
                      <Td>{row.earning}</Td>
                      <Td>{row.date}</Td>
                      <Td>
                        <span className="text-xs font-bold text-green-500">
                          {row.status}
                        </span>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-medium text-slate-700">
              Showing 1-10 of 40
            </p>

            <div className="flex items-center gap-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-400 transition hover:bg-slate-200">
                <IoChevronBack />
              </button>

              <span className="text-xs font-semibold text-slate-800">
                Page 2
              </span>

              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-200 text-blue-900 transition hover:bg-blue-300">
                <IoChevronForward />
              </button>
            </div>
          </div>

          {/* Mobile Button */}
          <button
            type="button"
            className="mt-5 w-full rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-rose-700 sm:hidden"
          >
            Withdraw Funds
          </button>
        </div>
      </div>
    </section>
  );
}

function SelectBox({ label, defaultValue }) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-xs font-bold text-slate-600">
        {label}
      </label>

      <div className="relative min-w-0">
        <select className="h-10 w-full appearance-none rounded-xl border border-blue-800 bg-white px-4 pr-9 text-sm text-slate-700 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100">
          <option>{defaultValue}</option>
        </select>

        <IoChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-slate-900" />
      </div>
    </div>
  );
}

function SummaryCard({ icon, label, value }) {
  return (
    <div className="min-w-0 rounded-xl bg-white p-4 text-center shadow-sm">
      <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-base text-blue-900">
        {icon}
      </div>

      <p className="truncate text-xs font-bold text-slate-900">{label}</p>

      <h2 className="mt-1 text-2xl font-bold text-blue-900">{value}</h2>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="whitespace-nowrap px-4 py-3 text-xs font-bold">
      {children}
    </th>
  );
}

function Td({ children }) {
  return (
    <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">
      {children}
    </td>
  );
}
