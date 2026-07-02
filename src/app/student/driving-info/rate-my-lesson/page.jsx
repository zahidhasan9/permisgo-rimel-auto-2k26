"use client";

import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const ratings = [
  { label: "Very Satisfied", emoji: "😄", stars: 5 },
  { label: "Satisfied", emoji: "🙂", stars: 4 },
  { label: "Neutral", emoji: "😐", stars: 3 },
  { label: "Unsatisfied", emoji: "😕", stars: 2 },
  { label: "Very Unsatisfied", emoji: "😞", stars: 1 },
];

export default function Page() {
  const [selected, setSelected] = useState(1);
  const [comment, setComment] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 p-3 text-[11px]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <h1 className="text-base font-semibold text-blue-900">
          Rating note down my lessons
        </h1>
      </div>

      {/* Card */}
      <div className="bg-gray-200 rounded-xl p-3">
        <div className="bg-white rounded-xl p-4 text-center">
          {/* Title */}
          <h2 className="text-sm font-semibold text-blue-900">
            Give ratings to your lesson
          </h2>

          <p className="text-[10px] text-gray-500 mt-1">
            Don’t forget to rate your lesson within 48 hours
          </p>

          <p className="text-[10px] mt-3 font-medium">
            Please choose one option
          </p>

          {/* Ratings */}
          <div className="grid grid-cols-5 gap-1 mt-3">
            {ratings.map((r, i) => (
              <div
                key={i}
                onClick={() => setSelected(i)}
                className="cursor-pointer flex flex-col items-center"
              >
                {/* emoji circle */}
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-lg
                    ${
                      selected === i ? "bg-blue-900 text-white" : "bg-gray-200"
                    }`}
                >
                  {r.emoji}
                </div>

                {/* stars */}
                <div className="flex gap-[1px] mt-1 text-yellow-400 text-[8px]">
                  {[...Array(r.stars)].map((_, idx) => (
                    <span key={idx}>★</span>
                  ))}
                </div>

                <p className="text-[9px] mt-1 text-center">{r.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comment Box */}
        <div className="mt-3">
          <p className="text-[11px] font-semibold mb-1">
            Write down your comment here *
          </p>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write Here"
            className="w-full h-24 p-2 rounded-lg border outline-none text-xs"
          />
        </div>
      </div>
    </div>
  );
}
