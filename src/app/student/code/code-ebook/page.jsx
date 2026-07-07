// "use client";

// import Link from "next/link";
// import { IoChevronBack } from "react-icons/io5";

// const lessons = [
//   {
//     id: 1,
//     title: "Legal provisions regarding road traffic",
//     image: "/image/legal-road-traffic.png",
//   },
//   {
//     id: 2,
//     title: "The Driver",
//     image: "/image/the-driver.png",
//   },
//   {
//     id: 3,
//     title: "The Road",
//     image: "/image/the-road.png",
//   },
//   {
//     id: 4,
//     title: "Other road users",
//     image: "/image/other-road-users.png",
//   },
//   {
//     id: 5,
//     title: "General regulations and miscellaneous",
//     image: "/image/general-regulations.png",
//   },
//   {
//     id: 6,
//     title: "Precautions to take when leaving the vehicle",
//     image: "/image/precautions-vehicle.png",
//   },
//   {
//     id: 7,
//     title: "Mechanical components & safety-related equipment",
//     image: "/image/mechanical-components.png",
//   },
//   {
//     id: 8,
//     title: "First aid",
//     image: "/image/first-aid.png",
//   },
//   {
//     id: 9,
//     title: "Vehicle safety equipment",
//     image: "/image/vehicle-safety.png",
//   },
//   {
//     id: 10,
//     title: "Rules for using the vehicle in relation to ecology",
//     image: "/image/ecology.png",
//   },
// ];

// export default function Page() {
//   return (
//     <main className="min-h-screen bg-white px-4 py-5 font-sans text-[#171717] sm:px-6 lg:px-8">
//       <div className="mx-auto w-full max-w-[1120px]">
//         {/* Header */}
//         <header className="flex items-center gap-3 sm:gap-4">
//           <Link
//             href="#"
//             aria-label="Go back"
//             className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#E8EEF7] text-[23px] text-black transition hover:bg-[#dfe7f2] sm:h-11 sm:w-11 sm:text-[25px]"
//           >
//             <IoChevronBack />
//           </Link>

//           <h1 className="text-[22px] font-bold leading-none text-[#173F8F] sm:text-[24px]">
//             Lesson List
//           </h1>
//         </header>

//         {/* Lesson Grid */}
//         <section className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-5 xl:grid-cols-4">
//           {lessons.map((lesson) => (
//             <Link
//               href="#"
//               key={lesson.id}
//               className="group flex min-h-[205px] flex-col rounded-[10px] bg-[#E8EEF7] p-4 transition duration-200 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(23,69,150,0.12)] sm:min-h-[200px]"
//             >
//               <div className="overflow-hidden rounded-[10px] bg-white">
//                 <img
//                   src={lesson.image}
//                   alt={lesson.title}
//                   className="h-[120px] w-full rounded-[10px] object-cover transition duration-300 group-hover:scale-105 sm:h-[112px] lg:h-[108px]"
//                 />
//               </div>

//               <div className="flex flex-1 items-center justify-center px-2 pt-4">
//                 <h2 className="text-center text-[15px] font-bold leading-[1.45] text-[#111111] sm:text-[16px]">
//                   {lesson.title}
//                 </h2>
//               </div>
//             </Link>
//           ))}
//         </section>
//       </div>
//     </main>
//   );
// }

// apply backend

import LearningContentPage from "../_components/LearningContentPage";

export default function CodeEbookPage() {
  return (
    <LearningContentPage
      type="code-ebook"
      title="Code eBook"
      subtitle="Read driving code chapters and mark chapters as learned."
      heroIcon="📘"
      emptyText="No Code eBook content added yet."
    />
  );
}
