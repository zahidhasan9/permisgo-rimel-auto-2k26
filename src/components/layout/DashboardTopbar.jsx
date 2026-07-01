"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

export default function DashboardTopbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b flex items-center justify-between px-6 shadow-sm relative">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        {/* <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-sm">D</span>
        </div> */}

        <div className="flex h-12 items-center justify-center overflow-hidden rounded-xl bg-blue-600 shadow-md">
          <Image
            src="/image/logo.png"
            alt="Logo"
            width={172}
            height={36}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-sm font-semibold text-gray-800">
            Student Dashboard
          </h1>
          <p className="text-[11px] text-gray-500">Driving Learning System</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative">
        {/* TRIGGER */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-gray-100 transition"
        >
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center shadow-md">
            <span className="text-white font-bold">S</span>
          </div>

          <div className="hidden md:block text-left">
            <p className="text-xs text-gray-500">Student</p>
            <p className="text-sm font-medium text-gray-700">Profile</p>
          </div>

          <FiChevronDown className="text-gray-500" />
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 top-14 w-52 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
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
