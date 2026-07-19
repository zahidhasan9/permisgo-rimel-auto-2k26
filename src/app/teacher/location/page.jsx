// "use client";

// import { useRouter } from "next/navigation";
// import {
//   FaChevronLeft,
//   FaMapMarkedAlt,
//   FaMapMarkerAlt,
//   FaSearch,
// } from "react-icons/fa";

// export default function LocationsPage() {
//   const router = useRouter();

//   const handleAddLocation = () => {
//     router.push("/teacher/locations/add");
//   };

//   return (
//     <main className="min-h-screen bg-[#edf1f7] p-1.5">
//       <section className="mx-auto min-h-[calc(100vh-12px)] w-full rounded-[8px] bg-white px-3 py-3 shadow-sm sm:px-5 sm:py-4">
//         {/* Header */}
//         <header className="flex items-center gap-3">
//           <button
//             type="button"
//             onClick={() => router.back()}
//             className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#e8eef7] text-[#16458f] transition hover:bg-[#dce5f2]"
//             aria-label="Go back"
//           >
//             <FaChevronLeft size={12} />
//           </button>

//           <h1 className="text-[17px] font-extrabold text-[#16458f]">
//             List of Locations
//           </h1>
//         </header>

//         {/* Empty state */}
//         <section className="mt-6 flex min-h-[190px] w-full items-center justify-center rounded-[9px] bg-[#e8eef7] px-4 py-8 sm:min-h-[220px]">
//           <div className="flex max-w-md flex-col items-center text-center">
//             {/* React icon illustration */}
//             <div className="relative mb-4 h-[58px] w-[72px] text-[#16458f]">
//               <FaMapMarkedAlt className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[46px]" />

//               <span className="absolute right-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#16458f] bg-[#e8eef7]">
//                 <FaSearch size={11} />
//               </span>

//               <FaMapMarkerAlt className="absolute left-[5px] top-[2px] text-[14px]" />
//             </div>

//             <h2 className="text-[16px] font-extrabold text-[#20242c]">
//               No Location Found
//             </h2>

//             <p className="mt-2 text-[10px] font-medium leading-4 text-slate-500 sm:text-[11px]">
//               It seems you haven&apos;t added a location yet. Please add one to
//               get started.
//             </p>

//             <button
//               type="button"
//               onClick={handleAddLocation}
//               className="mt-5 inline-flex h-10 items-center justify-center rounded-[8px] bg-[#e2233d] px-5 text-[11px] font-extrabold text-white shadow-sm transition hover:bg-[#c91f35] active:scale-[0.98]"
//             >
//               Add a location
//             </button>
//           </div>
//         </section>
//       </section>
//     </main>
//   );
// }

import { redirect } from "next/navigation";

export default function TeacherLocationRedirectPage() {
  redirect("/teacher/locations");
}
