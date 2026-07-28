"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaChevronLeft,
  FaGift,
  FaHandsHelping,
  FaHandshake,
  FaMoneyBillWave,
  FaRegCopy,
  FaSearchDollar,
  FaShareAlt,
  FaSpinner,
} from "react-icons/fa";
import { getMyReferral } from "@/features/API";
import { showToast } from "@/utils/showToast";

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  "Unable to load your referral details.";

export default function ReferralDashboard({ accountType = "student" }) {
  const router = useRouter();
  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadReferral = async () => {
      try {
        const response = await getMyReferral();
        if (active) setReferral(response?.data?.data || null);
      } catch (requestError) {
        if (active) setError(getErrorMessage(requestError));
      } finally {
        if (active) setLoading(false);
      }
    };

    loadReferral();
    return () => {
      active = false;
    };
  }, []);

  const code = referral?.referralCode || "";
  const referredUsers = referral?.referredUsers || [];

  const copyCode = async () => {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      showToast.success("Referral code copied to clipboard.");
    } catch {
      showToast.error("Could not copy the referral code.");
    }
  };

  const shareCode = async () => {
    if (!code) return;
    const message = `Join PermisGo with my referral code: ${code}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "PermisGo Referral", text: message });
        return;
      } catch (shareError) {
        if (shareError?.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(message);
      showToast.success("Referral message copied. You can share it now.");
    } catch {
      showToast.error("Could not share the referral code.");
    }
  };

  return (
    <main className=" pb-8 text-[#161616] 
    min-h-screen bg-[#f8fafc] px-4 py-5 sm:px-6 lg:px-8">
      <header className="mb-8 flex items-center gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] bg-[#e8edf5] text-xl text-slate-950 transition hover:bg-[#dce4f0]"
          aria-label="Go back"
        >
          <FaChevronLeft />
        </button>
        <h1 className="text-[27px] font-extrabold text-[#16458f]">
          My Sponsorships
        </h1>
        <span className="sr-only">{accountType} referral account</span>
      </header>

      {loading ? (
        <div className="flex min-h-[360px] items-center justify-center rounded-[16px] bg-[#e8edf5]">
          <FaSpinner className="animate-spin text-3xl text-[#16458f]" />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm font-semibold text-rose-700">
          {error}
        </div>
      ) : (
        <>
          <section className="relative mb-7 min-h-[226px] overflow-hidden rounded-[16px] bg-[#e8edf5] px-6 py-7 sm:px-7">
            <div className="relative z-10 max-w-[760px]">
              <h2 className="flex items-center gap-3 text-[21px] font-extrabold leading-tight sm:text-[23px]">
                <FaGift className="shrink-0 text-[#e2233d]" />
                Referral Program - Earn money by recommending the driving
                School
              </h2>
              <p className="mt-3 text-[14px] text-[#6d6d6d]">
                Share your experience and help your friend sign up
              </p>

              <a
                href="#how-it-works"
                className="mt-10 flex min-h-[68px] items-center gap-4 rounded-[15px] bg-white px-6 text-[16px] font-extrabold text-[#16458f] underline underline-offset-2 transition hover:shadow-sm"
              >
                <span className="text-xl">💎</span>
                How does it work?
              </a>
            </div>

            <FaHandsHelping className="pointer-events-none absolute -bottom-9 right-7 hidden text-[155px] text-black lg:block" />
          </section>

          <section
            id="how-it-works"
            className="grid gap-7 md:grid-cols-3"
          >
            <article className="flex min-h-[292px] flex-col items-center justify-center rounded-[16px] bg-[#e8edf5] p-6 text-center">
              <h2 className="text-[17px] font-extrabold">
                Your Referral Code
              </h2>
              <div className="mt-6 flex h-[54px] w-full max-w-[245px] items-center justify-between rounded-[12px] bg-white px-4">
                <span className="truncate text-[15px] font-bold tracking-wide text-[#6c6c6c]">
                  {code}
                </span>
                <button
                  type="button"
                  onClick={copyCode}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xl text-[#16458f] transition hover:bg-blue-50"
                  aria-label="Copy referral code"
                  title="Copy referral code"
                >
                  <FaRegCopy />
                </button>
              </div>
              <button
                type="button"
                onClick={shareCode}
                className="mt-5 inline-flex min-h-[40px] items-center justify-center gap-2 rounded-[10px] bg-[#e2233d] px-6 text-[13px] font-extrabold text-white transition hover:bg-[#c91f35]"
              >
                <FaShareAlt className="text-xs" /> Share
              </button>
            </article>

            <StatCard
              title="Total Amount Used"
              value={referral?.totalAmountUsed || 0}
              Icon={FaMoneyBillWave}
            />
            <StatCard
              title="Total Number of Sponsorship"
              value={referral?.totalSponsorship || referredUsers.length}
              Icon={FaHandshake}
            />
          </section>

          {referredUsers.length ? (
            <section className="mt-7 overflow-hidden rounded-[16px] bg-[#e8edf5]">
              <h2 className="border-b border-white/70 px-7 py-5 text-lg font-extrabold text-[#16458f]">
                Your Sponsorships
              </h2>
              <div className="divide-y divide-white/70">
                {referredUsers.map((entry) => (
                  <div
                    key={entry._id}
                    className="flex flex-wrap items-center justify-between gap-3 px-7 py-5"
                  >
                    <div>
                      <p className="font-extrabold">
                        {entry.user?.name || "PermisGo member"}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {entry.user?.email || "Referral joined"}
                      </p>
                    </div>
                    <span className="rounded-full bg-white px-4 py-1.5 text-xs font-bold capitalize text-[#16458f]">
                      {entry.status || "pending"}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section className="mt-7 flex min-h-[340px] flex-col items-center justify-center rounded-[16px] bg-[#e8edf5] p-8 text-center">
              <span className="flex h-20 w-20 items-center justify-center text-[62px] text-[#16458f]">
                <FaSearchDollar />
              </span>
              <h2 className="mt-5 text-[22px] font-extrabold">
                No Sponsorships Found
              </h2>
              <p className="mt-2 text-[14px] text-[#777]">
                You haven&apos;t sponsored anyone yet.
              </p>
            </section>
          )}
        </>
      )}
    </main>
  );
}

function StatCard({ title, value, Icon }) {
  return (
    <article className="flex min-h-[292px] flex-col items-center justify-center rounded-[16px] bg-[#e8edf5] p-6 text-center">
      <span className="flex h-[52px] w-[52px] items-center justify-center rounded-[13px] bg-white text-xl text-[#16458f]">
        <Icon />
      </span>
      <h2 className="mt-7 text-[17px] font-extrabold">{title}</h2>
      <p className="mt-3 text-[35px] font-black leading-none text-[#16458f]">
        {value}
      </p>
    </article>
  );
}
