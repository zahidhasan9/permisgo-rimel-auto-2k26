"use client";

import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";

const tabs = ["Invoice", "Payments", "Refunds"];

const invoices = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1).padStart(2, "0"),
  issue: "Mon, March 2, 2026",
  expire: "Mon, March 2, 2026",
  amount: "100$",
  pay: "100$",
  status: i % 3 === 0 ? "Not Paid" : "Paid",
}));

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f6f7fb] px-6 py-6 text-[#111827]">
      <div className="mx-auto max-w-[1100px] space-y-5">
        {/* HEADER */}
        <header className="flex items-center gap-3">
          <Link
            href="#"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-black/5"
          >
            <IoChevronBack />
          </Link>

          <h1 className="text-[18px] font-medium tracking-tight">Invoices</h1>
        </header>

        {/* TABS */}
        <div className="flex gap-2">
          {tabs.map((t, i) => (
            <button
              key={i}
              className={`rounded-full px-4 py-2 text-[12px] transition ${
                i === 0
                  ? "bg-[#dbeafe] text-[#1d4ed8] border border-[#bfdbfe]"
                  : "bg-white border border-black/5 text-[#6b7280] hover:bg-[#f3f4f6]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* TABLE WRAPPER */}
        <div className="rounded-2xl border border-black/5 bg-white overflow-hidden">
          {/* TABLE HEADER */}
          <div className="bg-[#0f2f7f] text-white text-[12px] grid grid-cols-7 px-4 py-3">
            <span>Number</span>
            <span>Date</span>
            <span>Expiration</span>
            <span>Amount</span>
            <span>Pay</span>
            <span>Details</span>
            <span>Status</span>
          </div>

          {/* ROWS */}
          <div className="divide-y divide-black/5">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="grid grid-cols-7 px-4 py-3 text-[12.5px] items-center"
              >
                <span className="text-[#6b7280]">{inv.id}</span>

                <span className="text-[#6b7280]">{inv.issue}</span>

                <span className="text-[#6b7280]">{inv.expire}</span>

                <span className="text-[#111827]">{inv.amount}</span>

                <span className="text-[#111827]">{inv.pay}</span>

                <Link
                  href="/student/accounting/invoice/details-invoice"
                  className="text-[#1d4ed8] hover:underline"
                >
                  View details
                </Link>

                <span
                  className={`text-[12px] font-medium ${
                    inv.status === "Paid" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {inv.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between text-[12px] text-[#6b7280]">
          <span>Showing 1–10 of 50</span>

          <div className="flex items-center gap-2">
            <button className="rounded-full border border-black/10 bg-white px-3 py-1 hover:bg-[#f3f4f6]">
              ←
            </button>

            <span className="rounded-full bg-white px-3 py-1 border border-black/10">
              Page 1
            </span>

            <button className="rounded-full border border-black/10 bg-white px-3 py-1 hover:bg-[#f3f4f6]">
              →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
