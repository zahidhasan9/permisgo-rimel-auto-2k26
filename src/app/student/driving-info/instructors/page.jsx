"use client";

import { useState } from "react";
import { FaArrowLeft, FaSearch, FaCalendar, FaClock } from "react-icons/fa";

const instructors = Array(10).fill({
  name: "Ralph Edwards",
  location: "Paris",
  date: "Mon, March 2, 2026",
  time: "9:00 AM - 2:00 PM",
  vehicle: "Automatic Car",
});

export default function Page() {
  const [search, setSearch] = useState("Paris");

  return (
    <div className="min-h-screen bg-gray-100 p-2 text-xs">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <h1 className="text-base font-semibold text-blue-900">Instructors</h1>
      </div>

      {/* Search Box */}
      <div className="bg-gray-200 p-3 rounded-lg mb-3">
        <h2 className="font-semibold mb-2 text-xs">Find a Instructor</h2>

        <div className="bg-white flex items-center gap-2 p-2 rounded-md mb-2">
          <FaSearch className="text-gray-400 text-xs" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-xs"
            placeholder="Paris"
          />
        </div>

        <div className="flex gap-2 mb-2">
          <div className="flex items-center gap-1 bg-white p-2 rounded-md w-1/2">
            <FaCalendar className="text-gray-400 text-xs" />
            <input className="w-full outline-none text-xs" placeholder="Date" />
          </div>

          <div className="flex items-center gap-1 bg-white p-2 rounded-md w-1/2">
            <FaClock className="text-gray-400 text-xs" />
            <input className="w-full outline-none text-xs" placeholder="Time" />
          </div>
        </div>

        <button className="bg-red-600 text-white px-4 py-1.5 rounded-md text-xs">
          Search
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        {/* Header */}
        <div className="grid grid-cols-5 bg-blue-900 text-white text-[10px] font-semibold p-2">
          <div>Name</div>
          <div>Loc</div>
          <div>Date</div>
          <div>Time</div>
          <div>Vehicle</div>
        </div>

        {/* Rows */}
        {instructors.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-5 items-center text-[10px] p-2 border-b"
          >
            <div className="flex items-center gap-2 font-medium">
              <div className="w-5 h-5 rounded-full bg-gray-300" />
              {item.name}
            </div>

            <div className="text-gray-600">{item.location}</div>
            <div className="text-gray-600">{item.date}</div>
            <div className="text-gray-600">{item.time}</div>
            <div className="text-gray-600">{item.vehicle}</div>
          </div>
        ))}

        {/* Footer */}
        <div className="flex justify-between items-center p-2 text-[10px] text-gray-500">
          <span>1-10 of 50</span>

          <div className="flex items-center gap-1">
            <button className="px-2 py-1 bg-gray-200 rounded">‹</button>
            <span>2</span>
            <button className="px-2 py-1 bg-gray-200 rounded">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}
