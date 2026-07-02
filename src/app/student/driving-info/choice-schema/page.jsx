"use client";

import Image from "next/image";
import { FaArrowLeft, FaInfoCircle } from "react-icons/fa";

const tabs = [
  "Mecanique",
  "Vision",
  "Autoroute",
  "Intersection",
  "Manoeuvre",
  "Voyant",
  "Signalisation",
  "Divers",
];

const cards = [
  {
    title: "Deceleration",
    desc: "Reduce speed safely before exit",
    img: "/image/deceleration.png",
    tag: "Safety",
  },
  {
    title: "Insertion",
    desc: "Merge smoothly into traffic flow",
    img: "/image/insertion.png",
    tag: "Merge",
  },
  {
    title: "Weaving",
    desc: "Change lanes efficiently on highway",
    img: "/image/weaving.png",
    tag: "Traffic",
  },
  {
    title: "3-lane highway",
    desc: "Maintain lane discipline & speed",
    img: "/image/3-lane highway.png",
    tag: "Core",
  },
  {
    title: "Distance",
    desc: "Keep safe following distance",
    img: "/image/Distanc.png",
    tag: "Important",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EEF3FF] to-[#F8FAFF] p-6">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#1E3A8A]">Choice schémas</h1>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <FaInfoCircle /> Learn driving scenarios step by step
          </p>
        </div>
      </div>

      {/* MAIN WRAPPER */}
      <div className="bg-white/70 backdrop-blur-xl border rounded-2xl p-5 shadow-lg">
        {/* TABS */}
        <div className="flex gap-2 overflow-x-auto pb-3">
          {tabs.map((t, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-full text-xs whitespace-nowrap transition ${
                i === 0
                  ? "bg-[#1E3A8A] text-white shadow"
                  : "bg-white border text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* CARDS */}
        <div className="mt-5 flex gap-5 overflow-x-auto">
          {cards.map((c, i) => (
            <div
              key={i}
              className="min-w-[250px] bg-white rounded-2xl border shadow-sm hover:shadow-xl transition overflow-hidden"
            >
              {/* IMAGE (BIG FOR LEARNING) */}
              <div className="h-56 relative">
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  className="object-cover"
                />

                {/* TAG */}
                <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full">
                  {c.tag}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h3 className="font-semibold text-sm text-gray-800">
                  {c.title}
                </h3>

                <p className="text-xs text-gray-500 mt-1 leading-snug">
                  {c.desc}
                </p>

                {/* PROGRESS BAR */}
                <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-[#1E3A8A]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
