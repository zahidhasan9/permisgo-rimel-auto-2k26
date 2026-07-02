"use client";

import {
  FaCar,
  FaCheck,
  FaStar,
  FaPhone,
  FaBook,
  FaList,
  FaVideo,
  FaGraduationCap,
  FaClipboardList,
  FaTasks,
  FaMapMarkerAlt,
  FaChevronRight,
} from "react-icons/fa";
import Link from "next/link";

/* ---------------- DATA ---------------- */

const teachers = [
  { name: "Wade Warren", years: 5 },
  { name: "Marvin McKinney", years: 7 },
  { name: "Guy Hawkins", years: 4 },
  { name: "Ronald Richards", years: 9 },
];

const journey = [
  { label: "Theory", state: "done", icon: <FaCheck /> },
  { label: "Permit", state: "done", icon: <FaCheck /> },
  { label: "Training", state: "active", icon: <FaCar /> },
  { label: "Road Test", state: "upcoming", icon: "4" },
  { label: "License", state: "upcoming", icon: "5" },
];

/* ---------------- MAIN PAGE ---------------- */

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F3F4EF] px-5 py-8 font-sans">
      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6">Driving Dashboard</h1>

      {/* PROGRESS BOX */}
      <div className="bg-blue-900 text-white rounded-3xl p-6">
        <div className="flex justify-between">
          <div>
            <p className="text-xs text-yellow-400 uppercase">
              ● ROUTE IN PROGRESS
            </p>
            <h2 className="text-lg font-semibold mt-1">
              My Road to a Driver's License
            </h2>
            <p className="text-sm text-gray-400">
              Step 3 of 5 — Driver Training
            </p>
          </div>

          <div className="text-right">
            <h3 className="text-yellow-400 text-xl font-bold">50h</h3>
            <p className="text-xs text-gray-400">logged behind the wheel</p>
          </div>
        </div>

        {/* JOURNEY */}
        <div className="flex mt-6 justify-between">
          {journey.map((item, i) => (
            <div key={i} className="text-center flex-1">
              <div
                className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full border-2 ${
                  item.state === "done"
                    ? "bg-green-600 text-white border-green-600"
                    : item.state === "active"
                      ? "bg-yellow-400 text-black border-yellow-600"
                      : "bg-white text-gray-500"
                }`}
              >
                {item.state === "done" ? <FaCheck /> : item.icon}
              </div>

              <p className="text-xs mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TEACHERS */}
      <h2 className="text-xl font-semibold mt-8 mb-3">Favorite Teachers</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {teachers.map((t, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border shadow-sm p-4 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            {/* Avatar (smaller & cleaner) */}
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center font-bold text-sm text-green-700">
              {t.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            {/* Name */}
            <h3 className="mt-3 text-sm font-semibold text-gray-800 line-clamp-1">
              {t.name}
            </h3>

            {/* Phone */}
            <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
              <FaPhone className="text-green-600 text-xs" />
              <span>089 636 789 000</span>
            </div>

            {/* Experience */}
            <div className="mt-2 px-2 py-0.5 bg-gray-100 rounded-full text-[10px] text-gray-600">
              {t.years}+ yrs exp
            </div>

            {/* Stars (smaller) */}
            <div className="flex gap-0.5 text-yellow-400 mt-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={10} />
              ))}
            </div>

            {/* Button (smaller + tighter) */}
            <button className="mt-3 w-full bg-blue-900 hover:bg-blue-950 text-white py-1.5 rounded-lg text-xs font-medium transition">
              Message
            </button>
          </div>
        ))}
      </div>

      {/* LESSONS */}
      <h2 className="text-xl font-semibold mt-8">Lessons</h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {/* Card 1 */}

        <Link href="/student/driving-info/book-lesson">
          <button className="bg-white p-4 rounded-2xl border shadow-sm flex items-center gap-3 hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-700">
              <FaBook />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">Book lesson</p>
              <p className="text-xs text-gray-500">Schedule new class</p>
            </div>
          </button>
        </Link>

        {/* Card 2 */}
        <Link href="/student/driving-info/see-my-lesson">
          <button className="bg-white p-4 rounded-2xl border shadow-sm flex items-center gap-3 hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <FaList />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">See My lessons</p>
              <p className="text-xs text-gray-500">View all bookings</p>
            </div>
          </button>
        </Link>

        <button className="bg-white p-4 rounded-2xl border shadow-sm flex items-center gap-3 hover:shadow-md transition">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
            <FaList />
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm">Rating note down my lessons</p>
            <p className="text-xs text-gray-500">View all lessons</p>
          </div>
        </button>

        {/* Card 3 */}
        <Link href="/student/driving-info/rate-my-lesson">
          <button className="bg-white p-4 rounded-2xl border shadow-sm flex items-center gap-3 hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-600">
              <FaClipboardList />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">Rate lessons</p>
              <p className="text-xs text-gray-500">Give feedback</p>
            </div>
          </button>
        </Link>

        {/* Card 4 */}
        <button className="bg-white p-4 rounded-2xl border shadow-sm flex items-center gap-3 hover:shadow-md transition">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
            <FaTasks />
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm">Buy hours</p>
            <p className="text-xs text-gray-500">Add more lessons</p>
          </div>
        </button>
      </div>

      {/* LEARNING */}
      <h2 className="text-xl font-semibold mt-8">Learning</h2>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <Link href="/student/driving-info/my-e-learning-video">
          <button className="bg-white p-4 rounded-xl border flex items-center gap-2">
            <FaVideo /> My e-learning Videos
          </button>
        </Link>

        <button className="bg-white p-4 rounded-xl border flex items-center gap-2">
          <FaVideo /> See my learning booklet
        </button>

        <button className="bg-white p-4 rounded-xl border flex items-center gap-2">
          <FaVideo /> Questions asked in the exam
        </button>

        <Link href="/student/driving-info/choice-schema">
          <button className="bg-white p-4 rounded-xl border flex items-center gap-2">
            <FaGraduationCap /> Choice schémas
          </button>
        </Link>
        <button className="bg-white p-4 rounded-xl border flex items-center gap-2">
          <FaGraduationCap /> My Mock exam
        </button>
      </div>

      {/* TEST */}
      <h2 className="text-xl font-semibold mt-8">Driving Test</h2>

      <button className="w-full mt-3 bg-red-100 p-4 rounded-xl flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt />
          Request exam
        </div>

        <FaChevronRight className="text-red-500" />
      </button>
    </div>
  );
}
