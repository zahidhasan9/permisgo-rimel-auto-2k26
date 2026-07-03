// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
// import { FiChevronDown, FiMenu } from "react-icons/fi";

// export default function DashboardTopbar({ onMenuClick }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <header className="relative flex h-16 items-center justify-between border-b bg-white/80 px-3 shadow-sm backdrop-blur-md md:px-6">
//       {/* LEFT SIDE */}
//       <div className="flex min-w-0 items-center gap-3">
//         {/* MOBILE HAMBURGER */}
//         <button
//           type="button"
//           onClick={onMenuClick}
//           className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
//           aria-label="Open sidebar"
//         >
//           <FiMenu size={22} />
//         </button>

//         <div className="hidden h-12 items-center justify-center overflow-hidden rounded-xl bg-blue-600 shadow-md sm:flex">
//           <Image
//             src="/image/logo.png"
//             alt="Logo"
//             width={172}
//             height={36}
//             className="h-full w-full object-cover"
//           />
//         </div>

//         <div className="min-w-0">
//           <h1 className="truncate text-sm font-semibold text-gray-800">
//             Student Dashboard
//           </h1>
//           <p className="truncate text-[11px] text-gray-500">
//             Driving Learning System
//           </p>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="relative">
//         <button
//           type="button"
//           onClick={() => setOpen(!open)}
//           className="flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-gray-100 md:gap-3"
//         >
//           <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md">
//             <span className="font-bold text-white">S</span>
//           </div>

//           <div className="hidden text-left md:block">
//             <p className="text-xs text-gray-500">Student</p>
//             <p className="text-sm font-medium text-gray-700">Profile</p>
//           </div>

//           <FiChevronDown className="text-gray-500" />
//         </button>

//         {open && (
//           <div className="absolute right-0 top-14 z-50 w-52 overflow-hidden rounded-xl border bg-white shadow-lg">
//             <Link
//               href="/student/profile"
//               className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-100"
//               onClick={() => setOpen(false)}
//             >
//               <FaUser className="text-gray-500" />
//               Profile
//             </Link>

//             <Link
//               href="/student/settings"
//               className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-100"
//               onClick={() => setOpen(false)}
//             >
//               <FaCog className="text-gray-500" />
//               Settings
//             </Link>

//             <div className="border-t" />

//             <Link
//               href="/logout"
//               className="flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-gray-100"
//               onClick={() => setOpen(false)}
//             >
//               <FaSignOutAlt />
//               Logout
//             </Link>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FiChevronDown, FiMenu } from "react-icons/fi";

export default function DashboardTopbar({ onMenuClick }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative flex h-16 shrink-0 items-center justify-between border-b bg-white/80 px-3 shadow-sm backdrop-blur-md md:px-6">
      {/* LEFT SIDE */}
      <div className="flex min-w-0 items-center gap-3">
        {/* MOBILE HAMBURGER */}
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Open sidebar"
        >
          <FiMenu size={22} />
        </button>

        <div className="hidden h-12 items-center justify-center overflow-hidden rounded-xl bg-blue-600 shadow-md sm:flex">
          <Image
            src="/image/logo.png"
            alt="Logo"
            width={172}
            height={36}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold text-gray-800">
            Student Dashboard
          </h1>
          <p className="truncate text-[11px] text-gray-500">
            Driving Learning System
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-gray-100 md:gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md">
            <span className="font-bold text-white">S</span>
          </div>

          <div className="hidden text-left md:block">
            <p className="text-xs text-gray-500">Student</p>
            <p className="text-sm font-medium text-gray-700">Profile</p>
          </div>

          <FiChevronDown className="text-gray-500" />
        </button>

        {open && (
          <div className="absolute right-0 top-14 z-50 w-52 overflow-hidden rounded-xl border bg-white shadow-lg">
            <Link
              href="/student/profile"
              className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              <FaUser className="text-gray-500" />
              Profile
            </Link>

            <Link
              href="/student/settings"
              className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              <FaCog className="text-gray-500" />
              Settings
            </Link>

            <div className="border-t" />

            <Link
              href="/logout"
              className="flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              <FaSignOutAlt />
              Logout
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
