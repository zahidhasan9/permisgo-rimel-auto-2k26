// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   IoChevronBack,
//   IoDownloadOutline,
//   IoSearch,
//   IoTime,
//   IoDocumentTextOutline,
// } from "react-icons/io5";

// const sheets = [
//   {
//     id: 1,
//     code: "KS-01",
//     title: "Different categories of road signs",
//     readTime: "3 minutes read",
//   },
//   {
//     id: 2,
//     code: "KS-02",
//     title: "Driving in Different Conditions",
//     readTime: "3 minutes read",
//   },
//   {
//     id: 3,
//     code: "KS-03",
//     title: "Warning signs and their meanings",
//     readTime: "3 minutes read",
//   },
//   {
//     id: 4,
//     code: "KS-04",
//     title: "Safety & Responsibility",
//     readTime: "3 minutes read",
//   },
//   {
//     id: 5,
//     code: "KS-05",
//     title: "Mandatory signs that drivers must follow",
//     readTime: "3 minutes read",
//   },
//   {
//     id: 6,
//     code: "KS-06",
//     title: "Parking & Maneuvering",
//     readTime: "3 minutes read",
//   },
//   {
//     id: 7,
//     code: "KS-07",
//     title: "Road markings used for lane guidance",
//     readTime: "3 minutes read",
//   },
//   {
//     id: 8,
//     code: "KS-08",
//     title: "Emergency Situations",
//     readTime: "3 minutes read",
//   },
// ];

// export default function Page() {
//   const [search, setSearch] = useState("");

//   const filteredSheets = useMemo(() => {
//     return sheets.filter((sheet) =>
//       sheet.title.toLowerCase().includes(search.toLowerCase()),
//     );
//   }, [search]);

//   return (
//     <main className="min-h-screen bg-white px-4 py-5 font-sans text-[#171717] sm:px-6 lg:px-8">
//       <div className="mx-auto w-full max-w-[1100px]">
//         {/* Header */}
//         <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-3 sm:gap-4">
//             <Link
//               href="#"
//               aria-label="Go back"
//               className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#E8EEF7] text-[23px] text-black transition hover:bg-[#dfe7f2] sm:h-11 sm:w-11"
//             >
//               <IoChevronBack />
//             </Link>

//             <div>
//               <h1 className="text-[22px] font-bold leading-none text-[#173F8F] sm:text-[24px]">
//                 Knowledge Sheets
//               </h1>

//               <p className="mt-2 text-[13px] font-medium text-[#667085]">
//                 Download and read important driving knowledge sheets.
//               </p>
//             </div>
//           </div>

//           <div className="w-fit rounded-full bg-[#E8EEF7] px-4 py-2 text-[12px] font-bold text-[#174596]">
//             {sheets.length} Sheets Available
//           </div>
//         </header>

//         {/* Content Box */}
//         <section className="mt-7 rounded-[14px] bg-[#E8EEF7] p-4 sm:p-5">
//           {/* Top Bar */}
//           <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h2 className="text-[18px] font-bold text-[#174596]">
//                 All Knowledge Sheets
//               </h2>
//               <p className="mt-1 text-[13px] text-[#667085]">
//                 Choose a sheet and download it for learning.
//               </p>
//             </div>

//             <div className="relative w-full sm:w-[280px]">
//               <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#174596]" />

//               <input
//                 type="text"
//                 value={search}
//                 onChange={(event) => setSearch(event.target.value)}
//                 placeholder="Search sheets..."
//                 className="h-10 w-full rounded-[9px] border border-transparent bg-white pl-10 pr-4 text-[13px] font-medium text-[#171717] outline-none transition placeholder:text-[#8a8a8a] focus:border-[#174596]"
//               />
//             </div>
//           </div>

//           {/* Cards */}
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             {filteredSheets.map((sheet) => (
//               <article
//                 key={sheet.id}
//                 className="group rounded-[13px] bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(23,69,150,0.13)]"
//               >
//                 <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//                   <div className="flex min-w-0 items-start gap-3">
//                     <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] bg-[#E8EEF7] text-[#174596] transition group-hover:bg-[#174596] group-hover:text-white">
//                       <IoDocumentTextOutline className="text-[24px]" />
//                     </div>

//                     <div className="min-w-0">
//                       <div className="mb-1.5 inline-flex rounded-full bg-[#F1F5FB] px-2.5 py-1 text-[10px] font-bold text-[#174596]">
//                         {sheet.code}
//                       </div>

//                       <h3 className="text-[15px] font-bold leading-[1.35] text-black sm:text-[16px]">
//                         {sheet.title}
//                       </h3>

//                       <div className="mt-2.5 flex items-center gap-2 text-[13px] font-medium text-[#555555]">
//                         <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#174596] text-white">
//                           <IoTime className="text-[12px]" />
//                         </span>
//                         <span>{sheet.readTime}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <button
//                     type="button"
//                     className="flex h-9 w-full shrink-0 items-center justify-center gap-2 rounded-[8px] border border-[#174596] px-4 text-[12px] font-bold text-[#174596] transition hover:bg-[#174596] hover:text-white sm:w-[125px]"
//                   >
//                     <IoDownloadOutline className="text-[15px]" />
//                     Download
//                   </button>
//                 </div>
//               </article>
//             ))}
//           </div>

//           {filteredSheets.length === 0 && (
//             <div className="rounded-[12px] bg-white px-4 py-10 text-center">
//               <p className="text-[14px] font-semibold text-[#667085]">
//                 No knowledge sheet found.
//               </p>
//             </div>
//           )}
//         </section>
//       </div>
//     </main>
//   );
// }

// apply backend

import LearningContentPage from "../_components/LearningContentPage";

export default function KnowledgeSheetsPage() {
  return (
    <LearningContentPage
      type="knowledge-sheet"
      title="Knowledge Sheets"
      subtitle="Quick revision sheets for exam preparation."
      heroIcon="📄"
      emptyText="No knowledge sheets added yet."
    />
  );
}
