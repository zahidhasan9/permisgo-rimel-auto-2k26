"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { IoChevronBack } from "react-icons/io5";

function Header() {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  return (
    <header className="flex items-center gap-[16px]">
      <button
        type="button"
        className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[12px] bg-[#EEF4FB] text-[27px] text-black"
        onClick={handleBack}
      >
        <IoChevronBack />
      </button>

      <h1 className="text-[26px] font-[700] leading-none text-[#174A9B]">
        My Purchase
      </h1>
    </header>
  );
}

function CreditCard() {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  return (
    <section className="h-[333px] rounded-[10px] bg-[#E8EEF8] px-[24px] pt-[28px]">
      <h2 className="text-[21px] font-[700] leading-none text-[#174A9B]">
        My Credit
      </h2>

      <h3 className="mt-[29px] text-[21px] font-[700] leading-none text-[#252525]">
        Driving lessons
      </h3>

      <p className="mt-[16px] text-[14px] font-[500] leading-none text-[#666666]">
        0 Credit available
      </p>

      <button className="mt-[32px] h-[32px] w-[182px] rounded-[3px] bg-[#B6C8E5] text-[12px] font-[700] text-[#174A9B]">
        Automatic Transmission
      </button>

      <button className="mt-[75px] h-[40px] w-[71px] rounded-[8px] bg-[#E5273D] text-[12px] font-[700] text-white">
        Buy now
      </button>
    </section>
  );
}

function PurchaseHistory() {
  return (
    <section className="h-[333px] rounded-[10px] bg-[#E8EEF8] px-[24px] pt-[28px]">
      <h2 className="text-[21px] font-[700] leading-none text-[#174A9B]">
        Purchase history
      </h2>

      <div className="mt-[28px] min-h-[198px] rounded-[10px] bg-white px-[20px] py-[20px]">
        <div className="flex items-start justify-between gap-[20px]">
          <div className="min-w-0">
            <p className="max-w-[520px] text-[14px] font-[500] leading-[22px] text-[#666666]">
              Driving license | Zen Permit | Theory test + 20 driving lessons
              <br />| 20 hours
            </p>

            <p className="mt-[17px] text-[16px] font-[500] leading-none text-[#111111]">
              23 March, 2026
            </p>
          </div>

          <span className="flex h-[32px] w-[86px] shrink-0 items-center justify-center rounded-[3px] bg-[#B6C8E5] text-[12px] font-[700] text-[#174A9B]">
            Credited
          </span>
        </div>

        <button className="mt-[40px] h-[40px] w-[122px] rounded-[8px] bg-[#E5273D] text-[12px] font-[700] text-white">
          View my invoices
        </button>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          background: #ffffff;
          font-family: "Poppins", sans-serif;
          overflow-x: hidden;
        }
      `}</style>

      <main className="min-h-screen bg-white">
        <div className="mx-auto w-full max-w-[1132px] px-[24px] pb-[24px] pt-[26px]">
          <Header />

          <div className="mt-[34px] grid grid-cols-1 gap-[20px] lg:grid-cols-[340px_1fr]">
            <CreditCard />
            <PurchaseHistory />
          </div>
        </div>
      </main>
    </>
  );
}
