"use client";

import { FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const timeSlots = [
  { time: "10.00", data: ["29", "30", "01", "02", "03", "04", "05"] },
  { time: "11.00", data: ["06", "07", "08", "09", "10", "11", "12"] },
  { time: "12.00", data: ["13", "14", "15", "16", "17", "18", "19"] },
  { time: "1.00", data: ["20", "21", "22", "23", "24", "25", "26"] },
  { time: "2.00", data: ["27", "28", "29", "30", "31", "01", "02"] },
];

const activeCells = ["01", "18", "20", "23"];

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 p-3 text-xs">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <h1 className="text-lg font-semibold text-blue-900">Planning</h1>
      </div>

      {/* Calendar Container */}
      <div className="bg-gray-200 p-3 rounded-xl">
        {/* Top bar */}
        <div className="flex justify-between items-center bg-white p-3 rounded-lg mb-3">
          <span className="font-medium">December 2, 2021</span>

          <div className="flex items-center gap-2 text-blue-800">
            <FaChevronLeft className="cursor-pointer" />
            <FaChevronRight className="cursor-pointer" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-8 border-b">
            <div className="p-3 font-semibold text-blue-800 border-r">Time</div>

            {days.map((d) => (
              <div
                key={d}
                className="p-3 font-semibold text-center border-r last:border-r-0"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Rows */}
          {timeSlots.map((row, i) => (
            <div key={i} className="grid grid-cols-8 border-b last:border-b-0">
              {/* Time */}
              <div className="p-3 text-green-500 font-semibold border-r">
                {row.time}
              </div>

              {/* Days */}
              {row.data.map((cell, idx) => {
                const isActive = activeCells.includes(cell);

                return (
                  <div
                    key={idx}
                    className="p-3 text-center border-r last:border-r-0"
                  >
                    <span
                      className={`inline-block px-2 py-1 rounded-md ${
                        isActive ? "bg-blue-900 text-white" : "text-gray-800"
                      }`}
                    >
                      {cell}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
