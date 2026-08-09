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
    <main className="min-h-screen overflow-x-hidden bg-[#f8fafc] px-2.5 py-4 pb-24 text-[#161616] sm:px-6 sm:py-5 sm:pb-8 lg:px-8">
      <header className="mb-4 flex min-w-0 items-center gap-3 sm:mb-8 sm:gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8edf5] text-base text-slate-950 transition hover:bg-[#dce4f0] sm:h-[52px] sm:w-[52px] sm:rounded-[14px] sm:text-xl"
          aria-label="Go back"
        >
          <FaChevronLeft />
        </button>
        <h1 className="min-w-0 truncate text-xl font-extrabold text-[#16458f] sm:text-[27px]">
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
          <section className="relative mb-4 overflow-hidden rounded-[16px] bg-[#e8edf5] px-4 py-5 sm:mb-7 sm:min-h-[226px] sm:px-7 sm:py-7">
            <div className="relative z-10 max-w-[760px]">
              <h2 className="flex items-start gap-2 text-base font-extrabold leading-6 sm:items-center sm:gap-3 sm:text-[23px] sm:leading-tight">
                <FaGift className="shrink-0 text-[#e2233d]" />
                Referral Program - Earn money by recommending the driving
                School
              </h2>
              <p className="mt-2 text-xs leading-5 text-[#6d6d6d] sm:mt-3 sm:text-[14px]">
                Share your experience and help your friend sign up
              </p>

              <a
                href="#how-it-works"
                className="mt-4 flex min-h-12 items-center gap-3 rounded-xl bg-white px-4 text-sm font-extrabold text-[#16458f] underline underline-offset-2 transition hover:shadow-sm sm:mt-10 sm:min-h-[68px] sm:rounded-[15px] sm:px-6 sm:text-[16px]"
              >
                <span className="text-xl">💎</span>
                How does it work?
              </a>
            </div>

            <FaHandsHelping className="pointer-events-none absolute -bottom-9 right-7 hidden text-[155px] text-black lg:block" />
          </section>

          <section
            id="how-it-works"
            className="grid gap-3 sm:gap-5 md:grid-cols-3 lg:gap-7"
          >
            <article className="flex min-h-[190px] flex-col items-center justify-center rounded-[16px] bg-[#e8edf5] p-4 text-center sm:min-h-[240px] sm:p-6 md:min-h-[292px]">
              <h2 className="text-[17px] font-extrabold">
                Your Referral Code
              </h2>
              <div className="mt-4 flex h-[50px] w-full max-w-[245px] min-w-0 items-center justify-between rounded-[12px] bg-white px-3 sm:mt-6 sm:h-[54px] sm:px-4">
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
                className="mt-4 inline-flex min-h-[40px] w-full max-w-[245px] items-center justify-center gap-2 rounded-[10px] bg-[#e2233d] px-6 text-[13px] font-extrabold text-white transition hover:bg-[#c91f35] sm:mt-5 sm:w-auto"
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
            <section className="mt-4 overflow-hidden rounded-[16px] bg-[#e8edf5] sm:mt-7">
              <h2 className="border-b border-white/70 px-4 py-4 text-base font-extrabold text-[#16458f] sm:px-7 sm:py-5 sm:text-lg">
                Your Sponsorships
              </h2>
              <div className="divide-y divide-white/70">
                {referredUsers.map((entry) => (
                  <div
                    key={entry._id}
                    className="flex min-w-0 items-center justify-between gap-3 px-4 py-4 sm:px-7 sm:py-5"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-extrabold sm:text-base">
                        {entry.user?.name || "PermisGo member"}
                      </p>
                      <p className="mt-1 truncate text-[11px] text-slate-500 sm:text-xs">
                        {entry.user?.email || "Referral joined"}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold capitalize text-[#16458f] sm:px-4 sm:text-xs">
                      {entry.status || "pending"}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section className="mt-4 flex min-h-[230px] flex-col items-center justify-center rounded-[16px] bg-[#e8edf5] p-5 text-center sm:mt-7 sm:min-h-[340px] sm:p-8">
              <span className="flex h-16 w-16 items-center justify-center text-5xl text-[#16458f] sm:h-20 sm:w-20 sm:text-[62px]">
                <FaSearchDollar />
              </span>
              <h2 className="mt-4 text-lg font-extrabold sm:mt-5 sm:text-[22px]">
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
    <article className="flex min-h-[170px] flex-col items-center justify-center rounded-[16px] bg-[#e8edf5] p-4 text-center sm:min-h-[240px] sm:p-6 md:min-h-[292px]">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg text-[#16458f] sm:h-[52px] sm:w-[52px] sm:rounded-[13px] sm:text-xl">
        <Icon />
      </span>
      <h2 className="mt-4 text-sm font-extrabold sm:mt-7 sm:text-[17px]">{title}</h2>
      <p className="mt-2 text-3xl font-black leading-none text-[#16458f] sm:mt-3 sm:text-[35px]">
        {value}
      </p>
    </article>
  );
}
