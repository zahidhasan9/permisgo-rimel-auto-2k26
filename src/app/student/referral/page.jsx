"use client";

import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f6f7fb] px-6 py-6 text-[#111827]">
      <div className="mx-auto max-w-[1100px] space-y-6">
        {/* HEADER */}
        <header className="flex items-center gap-3">
          <Link
            href="#"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-black/5"
          >
            <IoChevronBack />
          </Link>

          <h1 className="text-[18px] font-medium tracking-tight">
            My Sponsorships
          </h1>
        </header>

        {/* HERO */}
        <section className="rounded-2xl border border-black/5 bg-white p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="text-[15px] font-medium text-[#111827]">
                Referral Program
              </h2>

              <p className="text-[12.5px] text-[#6b7280]">
                Earn rewards by recommending the driving school
              </p>

              <Link
                href="#"
                className="inline-flex text-[12px] text-blue-600 hover:underline"
              >
                How does it work?
              </Link>
            </div>

            <div className="text-[11px] text-[#9ca3af]">
              Invite friends • Track earnings • Get rewards
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-black/5 bg-white p-5">
            <p className="text-[12px] text-[#6b7280]">Your Referral Code</p>

            <div className="mt-2 flex items-center justify-between rounded-xl border border-black/10 px-3 py-2">
              <span className="text-[13px] font-medium tracking-wide">
                E2MS2C6614
              </span>
              <button className="text-[11px] text-blue-600">Copy</button>
            </div>

            <button className="mt-3 w-full rounded-full bg-[#e11d48] py-2 text-[12px] text-white">
              Share
            </button>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-5 text-center">
            <p className="text-[12px] text-[#6b7280]">Total Amount Used</p>

            <p className="mt-3 text-[26px] font-medium">0</p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-5 text-center">
            <p className="text-[12px] text-[#6b7280]">Total Sponsorships</p>

            <p className="mt-3 text-[26px] font-medium">0</p>
          </div>
        </div>

        {/* EMPTY STATE */}
        <section className="rounded-2xl border border-black/5 bg-white p-10 text-center">
          <div className="mx-auto mb-4 h-10 w-10 rounded-full bg-[#f3f4f6]" />

          <h3 className="text-[15px] font-medium">No Sponsorships Found</h3>

          <p className="mt-1 text-[12.5px] text-[#6b7280]">
            You haven’t sponsored anyone yet.
          </p>
        </section>
      </div>
    </main>
  );
}
