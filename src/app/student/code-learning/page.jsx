"use client";

import { motion } from "framer-motion";
import { AiFillBug } from "react-icons/ai";
import { BsLightningCharge } from "react-icons/bs";
import {
  FaArrowLeft,
  FaBook,
  FaCode,
  FaHistory,
  FaQuestionCircle,
  FaRoad,
} from "react-icons/fa";
import { MdQuiz, MdSchool } from "react-icons/md";

/* ================= MAIN PAGE ================= */

export default function CodePracticePage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-10">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <button className="p-2 bg-white rounded-lg shadow hover:scale-105 transition">
          <FaArrowLeft />
        </button>

        <h1 className="text-xl font-semibold text-blue-900">Code Practice</h1>
      </motion.div>

      {/* GRID */}
      <SectionGrid />

      {/* LATEST SERIES */}
      <LatestSeries />

      {/* TOPIC RESULT */}
      <TopicResult />
    </div>
  );
}

/* ================= GRID SECTION ================= */

function SectionGrid() {
  const items = [
    { name: "Simple series", icon: MdSchool },
    { name: "Exam Mock Series", icon: MdQuiz },
    { name: "Thématiques Séries", icon: BsLightningCharge },
    { name: "Crash Test", icon: AiFillBug },
    { name: "My mistakes (09)", icon: AiFillBug },
    { name: "My History", icon: FaHistory },
    { name: "Road Signs", icon: FaRoad },
    { name: "Code eBook", icon: FaBook },
    { name: "Knowledge Sheets", icon: FaBook },
    { name: "Live Coding Replays", icon: BsLightningCharge },
    { name: "Learn", icon: MdSchool },
    { name: "Evaluations", icon: MdQuiz },
    { name: "Reserve Exam API", icon: FaCode },
    { name: "FAQ", icon: FaQuestionCircle },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item, i) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white border border-blue-200 rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon className="text-blue-700 text-lg" />
              </div>

              <p className="text-sm font-medium text-gray-700">{item.name}</p>
            </div>

            <span className="text-blue-600 text-lg">›</span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ================= LATEST SERIES ================= */

function LatestSeries() {
  const data = [
    {
      date: "23 March, 2025",
      name: "Simple Series",
      score: "-/50",
      btn: "Take The Exam",
    },
    {
      date: "23 March, 2025",
      name: "Mock Exam",
      score: "40/50",
      btn: "Goodbye",
    },
    {
      date: "2025",
      name: "Simple Series",
      score: "-/50",
      btn: "Take The Exam",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl p-5 shadow space-y-4"
    >
      <h2 className="text-blue-900 font-semibold">My Latest Series</h2>

      <div className="space-y-3">
        {data.map((d, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.01 }}
            className="grid grid-cols-4 items-center bg-gray-50 p-3 rounded-lg gap-2"
          >
            <span className="text-xs bg-blue-200 px-2 py-1 rounded w-fit">
              {d.date}
            </span>

            <span className="text-sm">{d.name}</span>

            <span className="text-sm text-gray-600">Last Score: {d.score}</span>

            <button
              className={`text-xs px-3 py-2 rounded text-white w-fit ${
                d.btn === "Goodbye" ? "bg-blue-900" : "bg-red-500"
              }`}
            >
              {d.btn}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ================= TOPIC RESULT ================= */

function TopicResult() {
  const data = [
    { label: "L", value: 40, color: "bg-blue-500" },
    { label: "C", value: 40, color: "bg-pink-500" },
    { label: "R", value: 30, color: "bg-purple-400" },
    { label: "U", value: 47, color: "bg-orange-500" },
    { label: "D", value: 36, color: "bg-yellow-500" },
    { label: "HAS", value: 40, color: "bg-red-500" },
    { label: "P", value: 47, color: "bg-gray-600" },
    { label: "M", value: 21, color: "bg-orange-400" },
    { label: "S", value: 31, color: "bg-green-600" },
    { label: "E", value: 37, color: "bg-lime-600" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-5 rounded-xl shadow space-y-4"
    >
      <h2 className="text-blue-900 font-semibold">My result by topic</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((d, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span>{d.label}</span>
              <span>{d.value}%</span>
            </div>

            <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${d.value}%` }}
                transition={{ duration: 0.6 }}
                className={`${d.color} h-4 rounded-full`}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 pt-2">
        Performance analytics overview
      </p>
    </motion.div>
  );
}
