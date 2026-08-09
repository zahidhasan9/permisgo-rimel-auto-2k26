// "use client";

// import { useRouter } from "next/navigation";
// import {
//   IoChevronBack,
//   IoCardOutline,
//   IoDocumentTextOutline,
//   IoReceiptOutline,
//   IoWalletOutline,
// } from "react-icons/io5";

// const purchaseInfo = {
//   title:
//     "Driving license | Zen Permit | Theory test + 20 driving lessons | 20 hours",
//   date: "23 March, 2026",
//   status: "Credited",
// };

// function Header() {
//   const router = useRouter();

//   return (
//     <header className="mb-4 rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
//       <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//         <div className="flex items-center gap-3">
//           <button
//             type="button"
//             onClick={() => router.back()}
//             className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
//           >
//             <IoChevronBack size={24} />
//           </button>

//           <div>
//             <div className="mb-1 inline-flex rounded-md bg-[#EAF1FB] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#0D4598]">
//               Student Panel / Purchase
//             </div>

//             <h1 className="text-xl font-black text-[#151515]">My Purchase</h1>

//             <p className="mt-1 text-sm text-[#7B8190]">
//               View your credit balance, purchase history and invoices.
//             </p>
//           </div>
//         </div>

//         <div className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#DDE6F3] bg-white px-4 text-xs font-black text-[#0D4598]">
//           <IoReceiptOutline size={17} />
//           Purchase Overview
//         </div>
//       </div>
//     </header>
//   );
// }

// function SummaryBox({ label, value, icon: Icon }) {
//   return (
//     <div className="rounded-xl border border-[#E5EAF2] bg-white px-4 py-3 shadow-sm">
//       <div className="flex items-center justify-between gap-3">
//         <div>
//           <p className="text-[10px] font-black uppercase tracking-wide text-[#7B8190]">
//             {label}
//           </p>
//           <p className="mt-1 text-lg font-black text-[#0D4598]">{value}</p>
//         </div>

//         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598]">
//           <Icon size={20} />
//         </div>
//       </div>
//     </div>
//   );
// }

// function CreditCard() {
//   return (
//     <section className="rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
//       <div className="mb-4 flex items-center justify-between gap-3">
//         <div>
//           <h2 className="text-lg font-black text-[#151515]">My Credit</h2>
//           <p className="mt-1 text-sm text-[#7B8190]">
//             Your available lesson credit balance.
//           </p>
//         </div>

//         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598]">
//           <IoWalletOutline size={21} />
//         </div>
//       </div>

//       <div className="rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] p-4">
//         <p className="text-[10px] font-black uppercase tracking-wide text-[#7B8190]">
//           Credit Category
//         </p>

//         <h3 className="mt-1 text-base font-black text-[#151515]">
//           Driving Lessons
//         </h3>

//         <p className="mt-2 text-sm font-semibold text-[#7B8190]">
//           0 Credit available
//         </p>

//         <div className="mt-4 inline-flex rounded-lg bg-[#EAF1FB] px-3 py-2 text-xs font-black text-[#0D4598]">
//           Automatic Transmission
//         </div>
//       </div>

//       <button
//         type="button"
//         className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#0D4598] px-4 text-xs font-black text-white transition hover:bg-[#083777]"
//       >
//         <IoCardOutline size={17} />
//         Buy Now
//       </button>
//     </section>
//   );
// }

// function PurchaseHistory() {
//   return (
//     <section className="rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
//       <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h2 className="text-lg font-black text-[#151515]">
//             Purchase History
//           </h2>

//           <p className="mt-1 text-sm text-[#7B8190]">
//             Your previous package purchase and invoice details.
//           </p>
//         </div>

//         <span className="rounded-lg bg-[#EAF1FB] px-3 py-2 text-xs font-black text-[#0D4598]">
//           1 Record
//         </span>
//       </div>

//       <div className="rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] p-4">
//         <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
//           <div className="min-w-0">
//             <div className="mb-2 inline-flex rounded-md bg-white px-3 py-1.5 text-[11px] font-black text-[#0D4598]">
//               Zen Permit Package
//             </div>

//             <h3 className="text-sm font-black leading-6 text-[#151515]">
//               {purchaseInfo.title}
//             </h3>

//             <p className="mt-2 text-xs font-semibold text-[#7B8190]">
//               Purchased on {purchaseInfo.date}
//             </p>
//           </div>

//           <span className="inline-flex h-8 shrink-0 items-center justify-center rounded-lg bg-green-50 px-3 text-xs font-black text-green-700">
//             {purchaseInfo.status}
//           </span>
//         </div>

//         <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#E5EAF2] pt-4">
//           <div className="flex items-center gap-2 text-xs font-semibold text-[#7B8190]">
//             <IoDocumentTextOutline size={17} className="text-[#0D4598]" />
//             Invoice available for this purchase.
//           </div>

//           <button
//             type="button"
//             className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#DDE6F3] bg-white px-4 text-xs font-black text-[#0D4598] transition hover:bg-[#EAF1FB]"
//           >
//             <IoReceiptOutline size={16} />
//             View Invoices
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default function Page() {
//   return (
//     <main className="min-h-screen bg-[#F7F9FC] px-4 py-4 sm:px-5 lg:px-6">
//       <div className="mx-auto w-full max-w-5xl">
//         <Header />

//         <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
//           <SummaryBox
//             label="Available Credit"
//             value="0"
//             icon={IoWalletOutline}
//           />
//           <SummaryBox
//             label="Transmission"
//             value="Automatic"
//             icon={IoCardOutline}
//           />
//           <SummaryBox label="Invoices" value="1 File" icon={IoReceiptOutline} />
//         </section>

//         <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
//           <CreditCard />
//           <PurchaseHistory />
//         </div>
//       </div>
//     </main>
//   );
// }

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
