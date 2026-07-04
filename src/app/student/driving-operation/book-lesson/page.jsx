"use client";

import { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const places = ["Paris", "Jussieu", "Belleville", "Louvre", "Berlin"];

const list = [
  { name: "Jussieu Metro Station", km: "1.3 km", date: "Tue, April 14" },
  { name: "Belleville", km: "2.5 km", date: "March 07 - 10" },
  { name: "Louvre Station", km: "3.1 km", date: "March 09 - 12" },
  { name: "Paris Central", km: "1.0 km", date: "March 11 - 15" },
];

export default function Page() {
  const [search, setSearch] = useState("");

  const filtered = places.filter((p) =>
    p.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="h-screen w-full bg-[#F3F6FB] flex flex-col p-2">
      {/* HEADER (compact) */}
      <div className="mb-2">
        <h1 className="text-lg font-bold text-[#0F3D91]">Book Lesson</h1>
      </div>

      {/* MAIN WRAPPER */}
      <div className="flex-1 bg-[#E6EBF5] rounded-xl p-3 flex gap-3 overflow-hidden">
        {/* LEFT PANEL */}
        <div className="w-[300px] flex flex-col gap-3">
          {/* SEARCH */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400 text-xs" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search location..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white text-xs outline-none"
            />

            {search && (
              <div className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow border">
                {filtered.map((p, i) => (
                  <div
                    key={i}
                    onClick={() => setSearch(p)}
                    className="p-2 text-xs hover:bg-gray-100 cursor-pointer"
                  >
                    📍 {p}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* BUTTONS */}
          <button className="bg-[#0F3D91] text-white py-2 rounded-lg text-xs">
            Manual
          </button>

          <button className="bg-white py-2 rounded-lg text-xs">
            Automatic
          </button>

          {/* LIST */}
          <div className="flex-1 overflow-auto space-y-2">
            {list.map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-3 shadow-sm">
                <div className="flex gap-2">
                  <FaMapMarkerAlt className="text-[#0F3D91] text-xs mt-1" />

                  <div>
                    <h3 className="text-xs font-semibold">{item.name}</h3>

                    <p className="text-[10px] text-gray-500">{item.km}</p>

                    <p className="text-[10px] text-[#0F3D91] mt-1">
                      {item.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT MAP */}
        <div className="flex-1 rounded-xl overflow-hidden relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.6313577021792!2d2.352085076463716!3d48.84616997133053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671faaf02920b%3A0x53500e1db50cf704!2sJussieu!5e0!3m2!1sen!2sbd!4v1782977932097!5m2!1sen!2sbd"
            className="w-full h-full border-0"
            loading="lazy"
          />

          {/* FLOAT CARD (smaller) */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-xl p-3 shadow-lg w-[240px]">
            <div className="flex items-center gap-2">
              <img
                src="https://i.pravatar.cc/80"
                className="w-8 h-8 rounded-full"
                alt=""
              />

              <div>
                <h3 className="text-xs font-semibold">Robert Fox</h3>

                <p className="text-[10px] text-gray-500">5+ Years</p>
              </div>
            </div>

            <button className="mt-2 w-full bg-red-600 text-white py-1 rounded text-xs">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
