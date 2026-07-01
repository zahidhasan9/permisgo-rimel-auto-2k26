"use client";

import { useRouter } from "next/navigation";
import {
  FaChevronLeft,
  FaGem,
  FaGift,
  FaHandshake,
  FaRegCopy,
  FaSearch,
  FaWallet,
} from "react-icons/fa";

const referralCode = "E2MS2C6614";

const stats = [
  {
    title: "Total Amount Used",
    value: "0",
    icon: FaWallet,
  },
  {
    title: "Total Sponsorships",
    value: "0",
    icon: FaHandshake,
  },
];

export default function MySponsorships() {
  const router = useRouter();

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      alert("Referral code copied!");
    } catch {
      alert("Copy failed!");
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-5 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#16458f] shadow-sm transition hover:bg-blue-50"
          >
            <FaChevronLeft size={14} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-[#16458f]">
              My Sponsorships
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Track your referral code, rewards and sponsorship activity.
            </p>
          </div>
        </header>

        {/* Referral Banner */}
        <div className="mb-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#e2233d]">
                <FaGift size={22} />
              </div>

              <div>
                <h2 className="text-lg font-extrabold leading-snug text-slate-900">
                  Referral Program
                </h2>
                <p className="mt-1 max-w-2xl text-sm leading-5 text-slate-500">
                  Earn money by recommending the driving school. Share your
                  experience and help your friends sign up.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#eef4fb] px-4 text-sm font-bold text-[#16458f] transition hover:bg-[#e0ecff]"
            >
              <FaGem className="text-sky-500" size={15} />
              How does it work?
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {/* Referral Code Card */}
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900">
                Your Referral Code
              </h3>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#16458f]">
                Active
              </span>
            </div>

            <div className="mb-4 flex h-11 items-center justify-between rounded-xl border border-slate-200 bg-[#f8fafc] px-4">
              <span className="text-sm font-extrabold tracking-wide text-slate-700">
                {referralCode}
              </span>

              <button
                type="button"
                onClick={copyReferralCode}
                className="text-[#16458f] transition hover:text-[#0f3470]"
              >
                <FaRegCopy size={16} />
              </button>
            </div>

            <button
              type="button"
              className="h-10 w-full rounded-xl bg-[#e2233d] text-sm font-bold text-white transition hover:bg-[#c91f35]"
            >
              Share Code
            </button>
          </div>

          {/* Stat Cards */}
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-5"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef4fb] text-[#16458f]">
                  <Icon size={20} />
                </div>

                <p className="text-sm font-bold text-slate-500">{item.title}</p>

                <h3 className="mt-2 text-3xl font-black text-[#16458f]">
                  {item.value}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        <div className="mt-4 rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-100">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef4fb] text-[#16458f]">
            <FaSearch size={22} />
          </div>

          <h3 className="text-lg font-extrabold text-slate-900">
            No Sponsorships Found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            You haven&apos;t sponsored anyone yet.
          </p>
        </div>
      </section>
    </main>
  );
}
