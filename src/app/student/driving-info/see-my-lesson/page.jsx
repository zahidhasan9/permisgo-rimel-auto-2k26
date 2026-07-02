"use client";

import { useState } from "react";
import { FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";

const lessons = Array(4).fill({
  type: "Lesson",
  status: "Completed",
  date: "March 12, 2025",
  time: "10 am to 12 pm",
  location: "Place de Clichy",
  instructor: "Robart Smith",
  tag: "Automatic transmission",
});

export default function Page() {
  const [filter, setFilter] = useState("Past");

  return (
    <div className="min-h-screen bg-gray-100 p-3 text-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <FaArrowLeft className="text-gray-600" />
        <h1 className="text-lg font-semibold text-gray-800">Driving Lesson</h1>
      </div>

      <div className="flex gap-4">
        {/* Sidebar (XS compact) */}
        <div className="w-56 bg-white rounded-xl p-3 shadow-sm">
          <h2 className="font-semibold mb-3 text-sm">Lessons</h2>

          <div className="space-y-2 text-xs">
            {[
              "Exams awaiting monitor validation",
              "Past",
              "Confirmed",
              "Canceled",
            ].map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="filter"
                  checked={filter === item}
                  onChange={() => setFilter(item)}
                />
                <span className="leading-tight">{item}</span>
              </label>
            ))}
          </div>

          <button className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg text-xs font-medium">
            New lesson
          </button>
        </div>

        {/* Main */}
        <div className="flex-1">
          <p className="text-gray-500 text-xs mb-3">
            48 hours in total on this page
          </p>

          <div className="space-y-3">
            {lessons.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-3 shadow-sm flex justify-between"
              >
                {/* Left */}
                <div>
                  <span
                    className={`text-[10px] px-2 py-1 rounded-full text-white ${
                      item.type === "Exam" ? "bg-blue-600" : "bg-green-500"
                    }`}
                  >
                    {item.type}
                  </span>

                  <p className="mt-2 font-medium text-gray-800 text-sm">
                    {item.date}
                  </p>
                  <p className="text-xs text-gray-500">{item.time}</p>

                  <span className="inline-block mt-2 text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>

                {/* Right */}
                <div className="text-right">
                  <p className="text-green-500 text-xs font-medium">
                    {item.status}
                  </p>

                  <div className="flex items-center justify-end gap-1 text-gray-500 text-xs mt-2">
                    <FaMapMarkerAlt className="text-gray-400 text-[10px]" />
                    <span>{item.location}</span>
                  </div>

                  <p className="text-[11px] text-gray-400 mt-1">
                    {item.instructor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
