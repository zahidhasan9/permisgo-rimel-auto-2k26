"use client";

import { useRouter } from "next/navigation";

import { IoChevronBack } from "react-icons/io5";

function Header() {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  return (
    <header className="flex min-w-0 items-center gap-2.5 sm:gap-4">
      <button
        type="button"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#EEF4FB] text-[22px] text-black sm:h-[44px] sm:w-[44px] sm:rounded-[12px] sm:text-[27px]"
        onClick={handleBack}
      >
        <IoChevronBack />
      </button>

      <h1 className="truncate text-xl font-[700] leading-none text-[#174A9B] sm:text-[26px]">
        My Purchase
      </h1>
    </header>
  );
}

function CreditCard() {
  return (
    <section className="flex min-h-[245px] min-w-0 flex-col rounded-[10px] bg-[#E8EEF8] p-4 sm:min-h-[333px] sm:px-6 sm:pt-7">
      <h2 className="text-lg font-[700] leading-none text-[#174A9B] sm:text-[21px]">
        My Credit
      </h2>

      <h3 className="mt-6 text-lg font-[700] leading-none text-[#252525] sm:mt-[29px] sm:text-[21px]">
        Driving lessons
      </h3>

      <p className="mt-3 text-[13px] font-[500] leading-none text-[#666666] sm:mt-4 sm:text-[14px]">
        0 Credit available
      </p>

      <div className="mt-5 w-fit max-w-full rounded-md bg-[#B6C8E5] px-3 py-2 text-center text-[11px] font-[700] text-[#174A9B] sm:mt-8 sm:px-4 sm:text-[12px]">
        Automatic Transmission
      </div>

      <button className="mt-auto h-11 w-full rounded-[8px] bg-[#E5273D] text-[12px] font-[700] text-white sm:h-10 sm:w-[90px]">
        Buy now
      </button>
    </section>
  );
}

function PurchaseHistory() {
  return (
    <section className="min-w-0 rounded-[10px] bg-[#E8EEF8] p-4 sm:min-h-[333px] sm:px-6 sm:pt-7">
      <h2 className="text-lg font-[700] leading-none text-[#174A9B] sm:text-[21px]">
        Purchase history
      </h2>

      <div className="mt-4 min-h-[198px] rounded-[10px] bg-white p-3.5 sm:mt-7 sm:p-5">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
          <div className="min-w-0">
            <p className="max-w-[520px] break-words text-[12px] font-[500] leading-[19px] text-[#666666] sm:text-[14px] sm:leading-[22px]">
              Driving license | Zen Permit | Theory test + 20 driving lessons
              <span className="block">| 20 hours</span>
            </p>

            <p className="mt-3 text-[13px] font-[500] leading-none text-[#111111] sm:mt-[17px] sm:text-[16px]">
              23 March, 2026
            </p>
          </div>

          <span className="flex h-8 w-fit shrink-0 items-center justify-center rounded-md bg-[#B6C8E5] px-3 text-[11px] font-[700] text-[#174A9B] sm:w-[86px] sm:text-[12px]">
            Credited
          </span>
        </div>

        <button className="mt-5 h-11 w-full rounded-[8px] bg-[#E5273D] px-4 text-[12px] font-[700] text-white sm:mt-10 sm:h-10 sm:w-auto">
          View my invoices
        </button>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <main className="dashboard-poppins min-h-screen overflow-x-hidden bg-white">
        <div className="mx-auto w-full px-2.5 pb-24 pt-3 sm:px-6 sm:pb-8 sm:pt-[26px]">
          <Header />

          <div className="mt-4 grid min-w-0 grid-cols-1 gap-3 sm:mt-[34px] sm:gap-5 lg:grid-cols-[340px_minmax(0,1fr)]">
            <CreditCard />
            <PurchaseHistory />
          </div>
        </div>
      </main>
    </>
  );
}
