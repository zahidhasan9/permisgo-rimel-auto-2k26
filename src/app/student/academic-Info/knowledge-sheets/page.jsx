// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { IoChevronBack } from "react-icons/io5";
// import { LuClock3 } from "react-icons/lu";

// const data = [
//   { id: 1, title: "Different categories of road signs", tag: "Road Signs" },
//   { id: 2, title: "Driving in Different Conditions", tag: "Driving" },
//   { id: 3, title: "Warning signs and their meanings", tag: "Road Signs" },
//   { id: 4, title: "Safety & Responsibility", tag: "Safety" },
//   {
//     id: 5,
//     title: "Mandatory signs that drivers must follow",
//     tag: "Road Signs",
//   },
//   { id: 6, title: "Parking & Maneuvering", tag: "Driving" },
//   { id: 7, title: "Road markings used for lane guidance", tag: "Road Signs" },
//   { id: 8, title: "Emergency Situations", tag: "Emergency" },
// ];

// const filters = ["All", "Road Signs", "Driving", "Safety", "Emergency"];

// export default function Page() {
//   const [active, setActive] = useState("All");
//   const [search, setSearch] = useState("");

//   const filtered = data.filter((item) => {
//     const matchFilter = active === "All" || item.tag === active;
//     const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());

//     return matchFilter && matchSearch;
//   });

//   return (
//     <main className="min-h-screen bg-white px-4 py-5">
//       <div className="mx-auto w-full max-w-[1050px]">
//         {/* Header */}
//         <header className="flex items-center gap-4">
//           <Link
//             href="#"
//             className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#e7ebf2]"
//           >
//             <IoChevronBack className="text-[20px]" />
//           </Link>

//           <h1 className="text-[24px] font-bold text-[#143f8d]">
//             Knowledge Sheets
//           </h1>
//         </header>

//         {/* Search + Filter */}
//         <div className="mt-5 space-y-3">
//           {/* Search */}
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search knowledge sheets..."
//             className="w-full rounded-[10px] border border-[#d7deea] px-4 py-2 text-[14px] outline-none focus:border-[#143f8d]"
//           />

//           {/* Filters */}
//           <div className="flex flex-wrap gap-2">
//             {filters.map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setActive(f)}
//                 className={`rounded-[20px] px-3 py-1 text-[12px] font-semibold transition ${
//                   active === f
//                     ? "bg-[#143f8d] text-white"
//                     : "bg-[#e8eef7] text-[#143f8d] hover:bg-[#dbe6f7]"
//                 }`}
//               >
//                 {f}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Grid */}
//         <section className="mt-5 rounded-[12px] bg-[#e8eef7] p-3">
//           <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//             {filtered.map((item) => (
//               <div
//                 key={item.id}
//                 className="group flex items-center justify-between rounded-[10px] bg-white px-4 py-3 transition hover:shadow-md"
//               >
//                 {/* Left */}
//                 <div>
//                   <span className="text-[11px] font-semibold text-green-500">
//                     {item.tag}
//                   </span>

//                   <h2 className="text-[15px] font-semibold text-[#111] group-hover:text-[#143f8d]">
//                     {item.title}
//                   </h2>

//                   <div className="mt-1 flex items-center gap-2 text-[12px] text-[#6b7280]">
//                     <LuClock3 className="text-[#143f8d]" />
//                     <span>3 minutes read</span>
//                   </div>
//                 </div>

//                 {/* Button */}
//                 <button className="rounded-[8px] border border-[#143f8d] px-4 py-1.5 text-[12px] font-semibold text-[#143f8d] transition hover:bg-[#143f8d] hover:text-white">
//                   Download
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

"use client";

import Link from "next/link";
import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { LuClock3 } from "react-icons/lu";

const data = [
  { id: 1, title: "Different categories of road signs", tag: "Road Signs" },
  { id: 2, title: "Driving in Different Conditions", tag: "Driving" },
  { id: 3, title: "Warning signs and their meanings", tag: "Road Signs" },
  { id: 4, title: "Safety & Responsibility", tag: "Safety" },
  {
    id: 5,
    title: "Mandatory signs that drivers must follow",
    tag: "Road Signs",
  },
  { id: 6, title: "Parking & Maneuvering", tag: "Driving" },
  { id: 7, title: "Road markings used for lane guidance", tag: "Road Signs" },
  { id: 8, title: "Emergency Situations", tag: "Emergency" },
];

const filters = ["All", "Road Signs", "Driving", "Safety", "Emergency"];

export default function Page() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = data.filter((item) => {
    const matchFilter = active === "All" || item.tag === active;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-8 text-[#1d1d1f]">
      <div className="mx-auto w-full max-w-[1000px]">
        {/* Header */}
        <header className="flex items-center gap-4">
          <Link
            href="#"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2f2f2] hover:bg-[#e9e9e9] transition"
          >
            <IoChevronBack className="text-[18px] text-[#333]" />
          </Link>

          <h1 className="text-[22px] font-medium tracking-tight">
            Knowledge Sheets
          </h1>
        </header>

        {/* Search + Filters */}
        <div className="mt-6 space-y-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search knowledge sheets..."
            className="w-full rounded-[12px] border border-[#e5e5e5] bg-white px-4 py-2 text-[14px] font-normal placeholder:text-[#999] outline-none focus:border-[#999]"
          />

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full px-3 py-1 text-[12px] font-normal transition ${
                  active === f
                    ? "bg-[#1d1d1f] text-white"
                    : "bg-[#f2f2f2] text-[#333] hover:bg-[#e9e9e9]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <section className="mt-8">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group flex items-start justify-between rounded-[14px] border border-[#eee] bg-white p-4 transition hover:shadow-sm"
              >
                {/* Left */}
                <div className="space-y-1">
                  <span className="text-[11px] font-normal text-[#6b7280]">
                    {item.tag}
                  </span>

                  <h2 className="text-[15px] font-medium leading-snug text-[#1d1d1f] group-hover:text-black">
                    {item.title}
                  </h2>

                  <div className="flex items-center gap-2 text-[12px] text-[#8a8a8a]">
                    <LuClock3 className="text-[13px]" />
                    <span>3 min read</span>
                  </div>
                </div>

                {/* Button */}
                <button className="rounded-full border border-[#d0d0d0] px-3 py-1.5 text-[12px] font-normal text-[#333] transition hover:bg-[#1d1d1f] hover:text-white">
                  Download
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
