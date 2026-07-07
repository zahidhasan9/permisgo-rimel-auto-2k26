// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   IoChevronBack,
//   IoPlay,
//   IoSearch,
//   IoTime,
//   IoVideocamOutline,
// } from "react-icons/io5";

// const img =
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLqSWq6T7vE5qFHx3M6TjS6wfEtgjmWemf1x7q0yQ6fA&s=10";
// const replays = [
//   {
//     id: 1,
//     title: "Online code review",
//     duration: "3 minutes",
//     image: img,
//   },
//   {
//     id: 2,
//     title: "Online code review",
//     duration: "3 minutes",
//     image: img,
//   },
//   {
//     id: 3,
//     title: "Online code review",
//     duration: "3 minutes",
//     image: img,
//   },
//   {
//     id: 4,
//     title: "Online code review",
//     duration: "3 minutes",
//     image: img,
//   },
//   {
//     id: 5,
//     title: "Online code review",
//     duration: "3 minutes",
//     image: img,
//   },
//   {
//     id: 6,
//     title: "Online code review",
//     duration: "3 minutes",
//     image: img,
//   },
// ];

// export default function Page() {
//   const [search, setSearch] = useState("");

//   const filteredReplays = useMemo(() => {
//     return replays.filter((replay) =>
//       replay.title.toLowerCase().includes(search.toLowerCase()),
//     );
//   }, [search]);

//   return (
//     <main className="min-h-screen bg-white px-4 py-5 font-sans text-[#171717] sm:px-6 lg:px-8">
//       <div className="mx-auto w-full max-w-[1100px]">
//         {/* Header */}
//         <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-start gap-3 sm:items-center sm:gap-4">
//             <Link
//               href="#"
//               aria-label="Go back"
//               className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#E8EEF7] text-[23px] text-black transition hover:bg-[#dfe7f2] sm:h-11 sm:w-11"
//             >
//               <IoChevronBack />
//             </Link>

//             <div>
//               <h1 className="text-[22px] font-bold leading-tight text-[#173F8F] sm:text-[24px]">
//                 Our Live Coding Replay List
//               </h1>

//               <p className="mt-1.5 text-[13px] font-medium text-[#667085]">
//                 Watch your previous live coding and review sessions.
//               </p>
//             </div>
//           </div>

//           <div className="flex w-fit items-center gap-2 rounded-full bg-[#E8EEF7] px-4 py-2 text-[12px] font-bold text-[#174596]">
//             <IoVideocamOutline className="text-[16px]" />
//             {replays.length} Replays
//           </div>
//         </header>

//         {/* Replay Box */}
//         <section className="mt-7 rounded-[14px] bg-[#E8EEF7] p-4 sm:p-5">
//           {/* Top Bar */}
//           <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h2 className="text-[18px] font-bold text-[#174596]">
//                 Replay Sessions
//               </h2>
//               <p className="mt-1 text-[13px] text-[#667085]">
//                 Select a replay and continue learning.
//               </p>
//             </div>

//             <div className="relative w-full sm:w-[280px]">
//               <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#174596]" />

//               <input
//                 type="text"
//                 value={search}
//                 onChange={(event) => setSearch(event.target.value)}
//                 placeholder="Search replay..."
//                 className="h-10 w-full rounded-[9px] border border-transparent bg-white pl-10 pr-4 text-[13px] font-medium text-[#171717] outline-none transition placeholder:text-[#8a8a8a] focus:border-[#174596]"
//               />
//             </div>
//           </div>

//           {/* Cards */}
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             {filteredReplays.map((replay) => (
//               <Link
//                 href="#"
//                 key={replay.id}
//                 className="group rounded-[13px] bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(23,69,150,0.13)]"
//               >
//                 <div className="flex flex-col gap-4 xs:flex-row xs:items-center sm:flex-row">
//                   {/* Thumbnail */}
//                   <div className="relative aspect-video w-full overflow-hidden rounded-[12px] bg-[#d9e2ef] xs:h-[86px] xs:w-[116px] xs:shrink-0 sm:h-[88px] sm:w-[118px]">
//                     <img
//                       src={replay.image}
//                       alt={replay.title}
//                       className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
//                     />

//                     <div className="absolute inset-0 bg-black/20" />

//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white/90 text-[#174596] shadow-md transition group-hover:scale-110 group-hover:bg-[#174596] group-hover:text-white">
//                         <IoPlay className="ml-0.5 text-[21px]" />
//                       </span>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="flex min-w-0 flex-1 flex-col justify-center">
//                     <div className="mb-2 w-fit rounded-full bg-[#F1F5FB] px-2.5 py-1 text-[10px] font-bold text-[#174596]">
//                       LIVE REPLAY
//                     </div>

//                     <h3 className="truncate text-[16px] font-bold text-black sm:text-[17px]">
//                       {replay.title}
//                     </h3>

//                     <div className="mt-2.5 flex items-center gap-2 text-[14px] font-medium text-[#555555]">
//                       <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#174596] text-white">
//                         <IoTime className="text-[12px]" />
//                       </span>
//                       <span>{replay.duration}</span>
//                     </div>
//                   </div>

//                   {/* Small CTA */}
//                   <div className="hidden shrink-0 md:block">
//                     <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#174596] text-[#174596] transition group-hover:bg-[#174596] group-hover:text-white">
//                       <IoPlay className="ml-0.5 text-[18px]" />
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>

//           {filteredReplays.length === 0 && (
//             <div className="rounded-[12px] bg-white px-4 py-10 text-center">
//               <p className="text-[14px] font-semibold text-[#667085]">
//                 No replay found.
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

export default function LiveReplaysPage() {
  return (
    <LearningContentPage
      type="live-replay"
      title="Live Class Replays"
      subtitle="Watch previous live driving code classes and revise difficult topics."
      heroIcon="🎥"
      emptyText="No live replay added yet."
    />
  );
}
