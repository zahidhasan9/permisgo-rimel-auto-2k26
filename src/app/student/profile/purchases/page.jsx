// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// import { IoChevronBack } from "react-icons/io5";

// function Header() {
//   const router = useRouter();

//   function handleBack() {
//     router.back();
//   }

//   return (
//     <header className="flex items-center gap-[16px]">
//       <button
//         type="button"
//         className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[12px] bg-[#EEF4FB] text-[27px] text-black"
//         onClick={handleBack}
//       >
//         <IoChevronBack />
//       </button>

//       <h1 className="text-[26px] font-[700] leading-none text-[#174A9B]">
//         My Purchase
//       </h1>
//     </header>
//   );
// }

// function CreditCard() {
//   const router = useRouter();

//   function handleBack() {
//     router.back();
//   }

//   return (
//     <section className="h-[333px] rounded-[10px] bg-[#E8EEF8] px-[24px] pt-[28px]">
//       <h2 className="text-[21px] font-[700] leading-none text-[#174A9B]">
//         My Credit
//       </h2>

//       <h3 className="mt-[29px] text-[21px] font-[700] leading-none text-[#252525]">
//         Driving lessons
//       </h3>

//       <p className="mt-[16px] text-[14px] font-[500] leading-none text-[#666666]">
//         0 Credit available
//       </p>

//       <button className="mt-[32px] h-[32px] w-[182px] rounded-[3px] bg-[#B6C8E5] text-[12px] font-[700] text-[#174A9B]">
//         Automatic Transmission
//       </button>

//       <button className="mt-[75px] h-[40px] w-[71px] rounded-[8px] bg-[#E5273D] text-[12px] font-[700] text-white">
//         Buy now
//       </button>
//     </section>
//   );
// }

// function PurchaseHistory() {
//   return (
//     <section className="h-[333px] rounded-[10px] bg-[#E8EEF8] px-[24px] pt-[28px]">
//       <h2 className="text-[21px] font-[700] leading-none text-[#174A9B]">
//         Purchase history
//       </h2>

//       <div className="mt-[28px] min-h-[198px] rounded-[10px] bg-white px-[20px] py-[20px]">
//         <div className="flex items-start justify-between gap-[20px]">
//           <div className="min-w-0">
//             <p className="max-w-[520px] text-[14px] font-[500] leading-[22px] text-[#666666]">
//               Driving license | Zen Permit | Theory test + 20 driving lessons
//               <br />| 20 hours
//             </p>

//             <p className="mt-[17px] text-[16px] font-[500] leading-none text-[#111111]">
//               23 March, 2026
//             </p>
//           </div>

//           <span className="flex h-[32px] w-[86px] shrink-0 items-center justify-center rounded-[3px] bg-[#B6C8E5] text-[12px] font-[700] text-[#174A9B]">
//             Credited
//           </span>
//         </div>

//         <button className="mt-[40px] h-[40px] w-[122px] rounded-[8px] bg-[#E5273D] text-[12px] font-[700] text-white">
//           View my invoices
//         </button>
//       </div>
//     </section>
//   );
// }

// export default function Page() {
//   return (
//     <>
//       <style jsx global>{`
//         @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

//         * {
//           box-sizing: border-box;
//         }

//         html,
//         body {
//           margin: 0;
//           background: #ffffff;
//           font-family: "Poppins", sans-serif;
//           overflow-x: hidden;
//         }
//       `}</style>

//       <main className="min-h-screen bg-white">
//         <div className="mx-auto w-full max-w-[1132px] px-[24px] pb-[24px] pt-[26px]">
//           <Header />

//           <div className="mt-[34px] grid grid-cols-1 gap-[20px] lg:grid-cols-[340px_1fr]">
//             <CreditCard />
//             <PurchaseHistory />
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import {
  IoChevronBack,
  IoCardOutline,
  IoDocumentTextOutline,
  IoReceiptOutline,
  IoWalletOutline,
} from "react-icons/io5";

const purchaseInfo = {
  title:
    "Driving license | Zen Permit | Theory test + 20 driving lessons | 20 hours",
  date: "23 March, 2026",
  status: "Credited",
};

function Header() {
  const router = useRouter();

  return (
    <header className="mb-4 rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
          >
            <IoChevronBack size={24} />
          </button>

          <div>
            <div className="mb-1 inline-flex rounded-md bg-[#EAF1FB] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#0D4598]">
              Student Panel / Purchase
            </div>

            <h1 className="text-xl font-black text-[#151515]">My Purchase</h1>

            <p className="mt-1 text-sm text-[#7B8190]">
              View your credit balance, purchase history and invoices.
            </p>
          </div>
        </div>

        <div className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#DDE6F3] bg-white px-4 text-xs font-black text-[#0D4598]">
          <IoReceiptOutline size={17} />
          Purchase Overview
        </div>
      </div>
    </header>
  );
}

function SummaryBox({ label, value, icon: Icon }) {
  return (
    <div className="rounded-xl border border-[#E5EAF2] bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-wide text-[#7B8190]">
            {label}
          </p>
          <p className="mt-1 text-lg font-black text-[#0D4598]">{value}</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598]">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

function CreditCard() {
  return (
    <section className="rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-[#151515]">My Credit</h2>
          <p className="mt-1 text-sm text-[#7B8190]">
            Your available lesson credit balance.
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598]">
          <IoWalletOutline size={21} />
        </div>
      </div>

      <div className="rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] p-4">
        <p className="text-[10px] font-black uppercase tracking-wide text-[#7B8190]">
          Credit Category
        </p>

        <h3 className="mt-1 text-base font-black text-[#151515]">
          Driving Lessons
        </h3>

        <p className="mt-2 text-sm font-semibold text-[#7B8190]">
          0 Credit available
        </p>

        <div className="mt-4 inline-flex rounded-lg bg-[#EAF1FB] px-3 py-2 text-xs font-black text-[#0D4598]">
          Automatic Transmission
        </div>
      </div>

      <button
        type="button"
        className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#0D4598] px-4 text-xs font-black text-white transition hover:bg-[#083777]"
      >
        <IoCardOutline size={17} />
        Buy Now
      </button>
    </section>
  );
}

function PurchaseHistory() {
  return (
    <section className="rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-black text-[#151515]">
            Purchase History
          </h2>

          <p className="mt-1 text-sm text-[#7B8190]">
            Your previous package purchase and invoice details.
          </p>
        </div>

        <span className="rounded-lg bg-[#EAF1FB] px-3 py-2 text-xs font-black text-[#0D4598]">
          1 Record
        </span>
      </div>

      <div className="rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="mb-2 inline-flex rounded-md bg-white px-3 py-1.5 text-[11px] font-black text-[#0D4598]">
              Zen Permit Package
            </div>

            <h3 className="text-sm font-black leading-6 text-[#151515]">
              {purchaseInfo.title}
            </h3>

            <p className="mt-2 text-xs font-semibold text-[#7B8190]">
              Purchased on {purchaseInfo.date}
            </p>
          </div>

          <span className="inline-flex h-8 shrink-0 items-center justify-center rounded-lg bg-green-50 px-3 text-xs font-black text-green-700">
            {purchaseInfo.status}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#E5EAF2] pt-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#7B8190]">
            <IoDocumentTextOutline size={17} className="text-[#0D4598]" />
            Invoice available for this purchase.
          </div>

          <button
            type="button"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#DDE6F3] bg-white px-4 text-xs font-black text-[#0D4598] transition hover:bg-[#EAF1FB]"
          >
            <IoReceiptOutline size={16} />
            View Invoices
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-4 sm:px-5 lg:px-6">
      <div className="mx-auto w-full max-w-5xl">
        <Header />

        <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <SummaryBox
            label="Available Credit"
            value="0"
            icon={IoWalletOutline}
          />
          <SummaryBox
            label="Transmission"
            value="Automatic"
            icon={IoCardOutline}
          />
          <SummaryBox label="Invoices" value="1 File" icon={IoReceiptOutline} />
        </section>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
          <CreditCard />
          <PurchaseHistory />
        </div>
      </div>
    </main>
  );
}
