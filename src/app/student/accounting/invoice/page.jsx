"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f7fb] px-2.5 pb-24 pt-3 text-[#111827] sm:px-6 sm:py-6 sm:pb-8">
      <div className="mx-auto min-w-0 space-y-3 sm:space-y-5">
        {/* HEADER */}
        <header className="flex items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-black/5 bg-white sm:h-9 sm:w-9 sm:rounded-full"
          >
            <IoChevronBack />
          </button>

          <h1 className="text-lg font-bold tracking-tight text-[#174a9b] sm:font-medium sm:text-[#111827]">Invoices</h1>
        </header>

        {/* TABS */}
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((t, i) => (
            <button
              key={i}
              className={`shrink-0 rounded-full px-4 py-2 text-[12px] transition ${
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
        <div className="hidden overflow-hidden rounded-2xl border border-black/5 bg-white md:block">
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

        <div className="space-y-2.5 md:hidden">
          {invoices.map((inv) => (
            <article key={inv.id} className="min-w-0 rounded-xl border border-black/5 bg-white p-3.5 shadow-sm">
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <div><p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">Invoice number</p><p className="mt-1 text-sm font-bold text-[#174a9b]">#{inv.id}</p></div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${inv.status === "Paid" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>{inv.status}</span>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3 text-[11px]">
                <div className="min-w-0"><dt className="text-slate-400">Issue date</dt><dd className="mt-1 break-words font-semibold text-slate-700">{inv.issue}</dd></div>
                <div className="min-w-0"><dt className="text-slate-400">Expiration</dt><dd className="mt-1 break-words font-semibold text-slate-700">{inv.expire}</dd></div>
                <div><dt className="text-slate-400">Amount</dt><dd className="mt-1 font-bold text-slate-900">{inv.amount}</dd></div>
                <div><dt className="text-slate-400">Paid</dt><dd className="mt-1 font-bold text-slate-900">{inv.pay}</dd></div>
              </dl>
              <Link href="/student/accounting/invoice/details-invoice" className="mt-3 flex h-10 w-full items-center justify-center rounded-lg bg-[#174a9b] text-xs font-bold text-white">View details</Link>
            </article>
          ))}
        </div>

        {/* FOOTER */}
        <div className="flex flex-col gap-2.5 rounded-xl bg-white p-2.5 text-[11px] text-[#6b7280] sm:flex-row sm:items-center sm:justify-between sm:bg-transparent sm:p-0 sm:text-[12px]">
          <span>Showing 1–10 of 50</span>

          <div className="grid grid-cols-[40px_1fr_40px] items-center gap-2 sm:flex">
            <button aria-label="Previous page" className="flex h-9 items-center justify-center rounded-lg border border-black/10 bg-white hover:bg-[#f3f4f6] sm:h-auto sm:rounded-full sm:px-3 sm:py-1">
              ←
            </button>

            <span className="flex h-9 items-center justify-center rounded-lg border border-black/10 bg-white px-3 sm:h-auto sm:rounded-full sm:py-1">
              Page 1
            </span>

            <button aria-label="Next page" className="flex h-9 items-center justify-center rounded-lg border border-black/10 bg-white hover:bg-[#f3f4f6] sm:h-auto sm:rounded-full sm:px-3 sm:py-1">
              →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
