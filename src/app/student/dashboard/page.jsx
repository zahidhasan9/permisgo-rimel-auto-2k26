// "use client";

// import {
//   FaArrowLeft,
//   FaArrowRight,
//   FaBrain,
//   FaCalendarAlt,
//   FaCarSide,
//   FaClipboardCheck,
// } from "react-icons/fa";
// import { IoStatsChart } from "react-icons/io5";
// import { MdChecklist } from "react-icons/md";

// function StatCard({ icon, title, value }) {
//   return (
//     <div className="min-h-[142px] rounded-[12px] bg-[#E8EEF8] px-4 py-5">
//       <div className="mx-auto flex h-[38px] w-[38px] items-center justify-center rounded-[11px] bg-white text-[18px] text-[#174A9B]">
//         {icon}
//       </div>

//       <h3 className="mt-4 text-center text-[14px] font-[700] text-black">
//         {title}
//       </h3>

//       <p className="mt-2 text-center text-[25px] font-[700] leading-none text-[#2DBE42]">
//         {value}
//       </p>
//     </div>
//   );
// }

// function LessonCard() {
//   return (
//     <div className="rounded-[12px] bg-white p-4 sm:p-[18px]">
//       <h3 className="mb-4 text-[14px] font-[700] leading-[18px] text-[#174A9B] underline underline-offset-[3px]">
//         City Driving Practice
//       </h3>

//       <div className="space-y-[8px] text-[12px] leading-[17px]">
//         <div className="grid grid-cols-[82px_1fr] gap-2">
//           <span className="font-[500] text-[#6E7077]">Start Date</span>
//           <span className="font-[700] text-[#25272D]">
//             Monday, March 2, 2026, 10:00 AM
//           </span>
//         </div>

//         <div className="grid grid-cols-[82px_1fr] gap-2">
//           <span className="font-[500] text-[#6E7077]">Duration</span>
//           <span className="font-[700] text-[#25272D]">60 Minutes</span>
//         </div>

//         <div className="grid grid-cols-[82px_1fr] gap-2">
//           <span className="font-[500] text-[#6E7077]">Vehicle</span>
//           <span className="font-[700] text-[#25272D]">
//             Automatic – Toyota Corolla
//           </span>
//         </div>

//         <div className="grid grid-cols-[82px_1fr] gap-2">
//           <span className="font-[500] text-[#6E7077]">Instructor</span>
//           <span className="font-[700] text-[#174A9B]">Michael Carter</span>
//         </div>
//       </div>

//       <div className="mt-4 rounded-full bg-[#D7DFEC] p-[2px]">
//         <div className="h-[8px] w-[46%] rounded-full bg-[#174A9B]" />
//       </div>

//       <p className="mt-2 text-[12px] font-[700] leading-none text-[#2DBE42]">
//         20% Progress
//       </p>
//     </div>
//   );
// }

// function ScheduleRow({ day, date }) {
//   return (
//     <div className="flex min-h-[72px] gap-[10px]">
//       <div className="flex min-h-[72px] w-[62px] shrink-0 flex-col items-center justify-center rounded-[10px] bg-white">
//         <p className="text-[14px] font-[700] leading-none text-[#858585]">
//           {day}
//         </p>
//         <p className="mt-[10px] text-[23px] font-[700] leading-none text-[#E5273D]">
//           {date}
//         </p>
//       </div>

//       <div className="min-w-0 flex-1 rounded-[10px] bg-white px-[15px] py-[16px]">
//         <h4 className="truncate text-[15px] font-[700] leading-none text-black">
//           Online code review
//         </h4>
//         <p className="mt-[13px] text-[13px] font-[500] leading-none text-[#55565B]">
//           9:00 AM - 2:00 PM
//         </p>
//       </div>
//     </div>
//   );
// }

// function SemiDonutChart() {
//   const cx = 170;
//   const cy = 170;
//   const r = 108;
//   const stroke = 52;

//   const polar = (angle) => {
//     const rad = (Math.PI / 180) * angle;
//     return {
//       x: cx + r * Math.cos(rad),
//       y: cy + r * Math.sin(rad),
//     };
//   };

//   const arc = (start, end) => {
//     const s = polar(start);
//     const e = polar(end);
//     const large = Math.abs(end - start) > 180 ? 1 : 0;
//     return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
//   };

//   return (
//     <div className="relative mx-auto mt-[22px] h-[175px] w-full max-w-[310px]">
//       <svg
//         className="h-full w-full"
//         viewBox="0 0 340 210"
//         preserveAspectRatio="xMidYMid meet"
//       >
//         <path
//           d={arc(180, 270)}
//           fill="none"
//           stroke="#174A9B"
//           strokeWidth={stroke}
//           strokeLinecap="butt"
//         />
//         <path
//           d={arc(270, 315)}
//           fill="none"
//           stroke="#2DBE42"
//           strokeWidth={stroke}
//           strokeLinecap="butt"
//         />
//         <path
//           d={arc(315, 360)}
//           fill="none"
//           stroke="#E5273D"
//           strokeWidth={stroke}
//           strokeLinecap="butt"
//         />
//       </svg>

//       <p className="absolute bottom-[28px] left-0 right-0 text-center text-[18px] font-[700] text-[#174A9B]">
//         60% Average
//       </p>
//     </div>
//   );
// }

// function LegendItem({ color, label }) {
//   return (
//     <div className="flex items-center gap-[8px]">
//       <span
//         className="h-[14px] w-[14px] shrink-0 rounded-[4px]"
//         style={{ backgroundColor: color }}
//       />
//       <span className="text-[12px] font-[500] text-[#30323A]">{label}</span>
//     </div>
//   );
// }

// function TrainingCard({ icon, text }) {
//   return (
//     <div className="flex min-h-[128px] min-w-0 flex-1 flex-col items-center justify-center rounded-[12px] bg-white px-3 py-4">
//       <div className="mb-[16px] flex h-[34px] w-[34px] items-center justify-center rounded-[8px] bg-[#E8EEF8] text-[16px] text-[#174A9B]">
//         {icon}
//       </div>

//       <p className="max-w-[105px] text-center text-[13px] font-[500] leading-[20px] text-[#101010]">
//         {text}
//       </p>
//     </div>
//   );
// }

// function Avatar() {
//   return (
//     <div className="relative h-[38px] w-[38px] shrink-0 overflow-hidden rounded-full bg-[#F4B642]">
//       <div className="absolute left-1/2 top-[7px] h-[18px] w-[20px] -translate-x-1/2 rounded-full bg-[#8B4A25]" />
//       <div className="absolute left-1/2 top-[14px] h-[21px] w-[21px] -translate-x-1/2 rounded-full bg-[#D89C62]" />
//       <div className="absolute bottom-[-9px] left-1/2 h-[24px] w-[38px] -translate-x-1/2 rounded-t-full bg-[#111827]" />
//     </div>
//   );
// }

// function MessageRow() {
//   return (
//     <div className="flex h-[52px] items-center gap-[10px] rounded-[12px] bg-white px-[11px]">
//       <Avatar />

//       <div className="min-w-0">
//         <p className="truncate text-[12px] font-[700] leading-none text-black">
//           Michael Carter
//         </p>
//         <p className="mt-[6px] truncate text-[11px] font-[500] leading-none text-[#30323A]">
//           Message text here
//         </p>
//       </div>
//     </div>
//   );
// }

// export default function Page() {
//   return (
//     <>
//       <style jsx global>{`
//         @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

//         * {
//           box-sizing: border-box;
//         }

//         html,
//         body {
//           margin: 0;
//           background: #ffffff;
//           font-family: "Poppins", sans-serif;
//           overflow-x: hidden;
//         }
//       `}</style>

//       <main className="min-h-screen w-full min-w-0 overflow-x-hidden bg-white">
//         <div className="mx-auto w-full max-w-[1080px] px-4 pb-6 pt-6 sm:px-5 lg:px-6">
//           <header>
//             <h1 className="text-[24px] font-[700] leading-tight text-[#174A9B] sm:text-[28px]">
//               Welcome, Robert
//             </h1>
//             <p className="mt-[10px] text-[12px] font-[500] leading-[19px] text-[#6D6F76] sm:text-[13px]">
//               Track your lessons, attendance, payments, and progress easily from
//               one dashboard
//             </p>
//           </header>

//           <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//             <StatCard
//               icon={<FaClipboardCheck />}
//               title="Time Taken"
//               value="13"
//             />
//             <StatCard
//               icon={<FaCalendarAlt />}
//               title="Time to Come"
//               value="560"
//             />
//             <StatCard icon={<FaBrain />} title="Skills Acquired" value="04" />
//             <StatCard icon={<FaBrain />} title="Hours Left" value="04" />
//           </section>

//           <section className="mt-5 rounded-[14px] bg-[#E8EEF8] p-4 sm:p-5">
//             <div className="flex items-start justify-between gap-4">
//               <h2 className="text-[18px] font-[700] leading-none text-[#174A9B]">
//                 Lesson Progress
//               </h2>

//               <div className="flex shrink-0 gap-[10px]">
//                 <button className="flex h-[36px] w-[36px] items-center justify-center rounded-[11px] bg-[#DEE7F3] text-[14px] text-[#E5273D]">
//                   <FaArrowLeft />
//                 </button>
//                 <button className="flex h-[36px] w-[36px] items-center justify-center rounded-[11px] bg-[#E5273D] text-[14px] text-white">
//                   <FaArrowRight />
//                 </button>
//               </div>
//             </div>

//             <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
//               <LessonCard />
//               <LessonCard />
//               <LessonCard />
//             </div>
//           </section>

//           <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
//             <div className="rounded-[14px] bg-[#E8EEF8] p-4 sm:p-5">
//               <div className="flex items-start justify-between gap-4">
//                 <h2 className="text-[18px] font-[700] leading-none text-[#174A9B]">
//                   Upcoming Schedule
//                 </h2>

//                 <button className="text-[12px] font-[700] leading-none text-[#174A9B] underline underline-offset-[2px]">
//                   See All
//                 </button>
//               </div>

//               <button className="mt-5 flex h-[28px] w-[104px] items-center justify-center gap-[7px] rounded-[6px] bg-white text-[11px] font-[500] text-[#30323A]">
//                 March, 2026
//                 <FaCalendarAlt className="text-[#174A9B]" />
//               </button>

//               <div className="mt-4 space-y-[10px]">
//                 <ScheduleRow day="Sat" date="10" />
//                 <ScheduleRow day="Sat" date="11" />
//                 <ScheduleRow day="Sat" date="12" />
//               </div>
//             </div>

//             <div className="min-w-0 rounded-[14px] bg-[#E8EEF8] p-4 sm:p-5">
//               <h2 className="text-[18px] font-[700] leading-none text-[#174A9B]">
//                 Total Progress Statistics
//               </h2>

//               <SemiDonutChart />

//               <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2">
//                 <LegendItem color="#174A9B" label="Completed Lessons" />
//                 <LegendItem color="#2DBE42" label="In progress" />
//                 <LegendItem color="#E5273D" label="Not completed" />
//               </div>
//             </div>
//           </section>

//           <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-[minmax(0,1.55fr)_minmax(150px,0.55fr)_minmax(270px,1fr)]">
//             <div className="rounded-[14px] bg-[#E8EEF8] p-4 sm:p-5">
//               <h2 className="text-[18px] font-[700] leading-none text-[#174A9B]">
//                 Training
//               </h2>

//               <h3 className="mt-5 text-[15px] font-[700] leading-none text-[#15233B]">
//                 Traffic Law’s
//               </h3>

//               <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
//                 <TrainingCard icon={<MdChecklist />} text="Start Revising" />
//                 <TrainingCard icon={<FaCarSide />} text="Take Practice exam" />
//                 <TrainingCard
//                   icon={<IoStatsChart />}
//                   text="Exam Registration"
//                 />
//               </div>
//             </div>

//             <div className="rounded-[14px] bg-[#E8EEF8] p-4 sm:p-5">
//               <h2 className="text-[18px] font-[700] leading-[25px] text-[#174A9B]">
//                 Practice <br /> Driving
//               </h2>

//               <p className="mt-4 text-[12px] font-[500] leading-[18px] text-[#30323A]">
//                 Check your driving test readiness and stay updated on your
//                 progress.
//               </p>

//               <p className="mt-4 text-[12px] font-[700] leading-none text-[#2DBE42]">
//                 Not Scheduled
//               </p>

//               <button className="mt-6 h-[32px] w-full max-w-[120px] rounded-[7px] bg-[#E5273D] text-[11px] font-[700] text-white">
//                 Book Now
//               </button>
//             </div>

//             <div className="rounded-[14px] bg-[#E8EEF8] p-4 sm:p-5 lg:col-span-2 xl:col-span-1">
//               <div className="flex items-start justify-between gap-4">
//                 <h2 className="text-[18px] font-[700] leading-none text-[#174A9B]">
//                   Message Instructor
//                 </h2>

//                 <button className="shrink-0 text-[12px] font-[700] leading-none text-[#174A9B] underline underline-offset-[2px]">
//                   See All
//                 </button>
//               </div>

//               <div className="mt-4 space-y-[12px]">
//                 <MessageRow />
//                 <MessageRow />
//                 <MessageRow />
//               </div>
//             </div>
//           </section>
//         </div>
//       </main>
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FaBrain,
  FaCalendarAlt,
  FaCarSide,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";

import { getLessons, getLoggedInUser, getMyQuizAttempts } from "@/features/API";

/**
 * API response থেকে আসল data বের করবে।
 *
 * Supported response:
 * { data: { data: [] } }
 * { data: [] }
 */
const getResponseData = (response, fallback = null) => {
  return response?.data?.data ?? response?.data ?? fallback;
};

const getErrorMessage = (error, fallback) => {
  return error?.response?.data?.message || error?.message || fallback;
};

/**
 * Minutes-কে readable time-এ convert করে।
 * 90 => 1h 30m
 */
const formatMinutes = (value) => {
  const totalMinutes = Math.max(0, Number(value) || 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours && minutes) {
    return `${hours}h ${minutes}m`;
  }

  if (hours) {
    return `${hours}h`;
  }

  return `${minutes}m`;
};

/**
 * Lesson date এবং start time একসঙ্গে Date object-এ convert করে।
 */
const getLessonDate = (lesson) => {
  if (!lesson?.lessonDate) {
    return null;
  }

  const date = new Date(lesson.lessonDate);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const timeMatch = String(lesson?.startTime || "").match(/^(\d{1,2}):(\d{2})/);

  if (timeMatch) {
    date.setHours(Number(timeMatch[1]), Number(timeMatch[2]), 0, 0);
  }

  return date;
};

const formatLessonDate = (lesson) => {
  const date = getLessonDate(lesson);

  if (!date) {
    return "Date not available";
  }

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const getLessonTitle = (lesson) => {
  return (
    lesson?.title ||
    lesson?.booking?.title ||
    lesson?.booking?.offer?.title ||
    "Driving Lesson"
  );
};

const getInstructorName = (lesson) => {
  return (
    lesson?.teacher?.name ||
    lesson?.teacher?.fullName ||
    "Instructor not assigned"
  );
};

const getVehicleName = (lesson) => {
  const vehicleType = lesson?.booking?.vehicleType || lesson?.vehicleType;

  const vehicle = lesson?.booking?.vehicle;

  const specificVehicleName = [vehicle?.brand, vehicle?.model]
    .filter(Boolean)
    .join(" ");

  if (specificVehicleName && vehicleType) {
    return `${vehicleType} - ${specificVehicleName}`;
  }

  if (specificVehicleName) {
    return specificVehicleName;
  }

  if (vehicleType) {
    return `${vehicleType
      .charAt(0)
      .toUpperCase()}${vehicleType.slice(1)} vehicle`;
  }

  return "Vehicle not assigned";
};

const getLessonStatusLabel = (status) => {
  const labels = {
    scheduled: "Scheduled",
    in_progress: "In Progress",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  return labels[status] || "Unknown";
};

const getLessonStatusClass = (status) => {
  if (status === "completed") {
    return "bg-green-100 text-green-700";
  }

  if (status === "in_progress") {
    return "bg-amber-100 text-amber-700";
  }

  if (status === "cancelled") {
    return "bg-red-100 text-red-700";
  }

  return "bg-blue-100 text-blue-700";
};

const clampPercentage = (value) => {
  return Math.min(100, Math.max(0, Math.round(Number(value) || 0)));
};

function StatCard({ icon, title, value, helper }) {
  return (
    <article className="rounded-2xl bg-[#E8EEF8] p-5 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl text-[#174A9B]">
        {icon}
      </div>

      <p className="mt-5 text-sm font-semibold text-slate-600">{title}</p>

      <p className="mt-2 text-3xl font-bold text-[#174A9B]">{value}</p>

      <p className="mt-2 text-xs text-slate-500">{helper}</p>
    </article>
  );
}

function EmptyState({ title, text }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-7 text-center">
      <p className="font-bold text-[#174A9B]">{title}</p>

      <p className="mt-2 text-sm text-slate-500">{text}</p>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="grid grid-cols-[82px_1fr] gap-3">
      <span className="text-slate-500">{label}</span>

      <span className="break-words font-semibold text-slate-800">{value}</span>
    </div>
  );
}

function LessonCard({ lesson }) {
  const skills = lesson?.lessonProgress?.skillsCovered || [];

  return (
    <article className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-bold text-[#174A9B]">{getLessonTitle(lesson)}</h3>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${getLessonStatusClass(
            lesson?.status,
          )}`}
        >
          {getLessonStatusLabel(lesson?.status)}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <InfoRow label="Date" value={formatLessonDate(lesson)} />

        <InfoRow
          label="Time"
          value={
            [lesson?.startTime, lesson?.endTime].filter(Boolean).join(" - ") ||
            "Time not available"
          }
        />

        <InfoRow label="Duration" value={formatMinutes(lesson?.duration)} />

        <InfoRow label="Vehicle" value={getVehicleName(lesson)} />

        <InfoRow label="Instructor" value={getInstructorName(lesson)} />
      </div>

      {skills.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold text-slate-500">
            Skills covered
          </p>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="rounded-full bg-[#E8EEF8] px-3 py-1 text-xs font-medium text-[#174A9B]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function ProgressBar({ label, value }) {
  const percentage = clampPercentage(value);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-slate-600">{label}</span>

        <span className="font-bold text-[#174A9B]">{percentage}%</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-[#174A9B] transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="mt-7 animate-pulse space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-44 rounded-2xl bg-slate-200" />
        ))}
      </div>

      <div className="h-80 rounded-2xl bg-slate-200" />

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="h-72 rounded-2xl bg-slate-200" />
        <div className="h-72 rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
}

export default function StudentDashboardPage() {
  const [user, setUser] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [quizAttempts, setQuizAttempts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [userError, setUserError] = useState("");
  const [lessonError, setLessonError] = useState("");
  const [quizError, setQuizError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadDashboard = async () => {
      setLoading(true);

      setUserError("");
      setLessonError("");
      setQuizError("");

      const [userResult, lessonResult, quizResult] = await Promise.allSettled([
        getLoggedInUser(),
        getLessons(),
        getMyQuizAttempts(),
      ]);

      if (!mounted) {
        return;
      }

      if (userResult.status === "fulfilled") {
        const userData = getResponseData(userResult.value, null);

        setUser(userData);
      } else {
        setUserError(
          getErrorMessage(
            userResult.reason,
            "User information load করা যায়নি।",
          ),
        );
      }

      if (lessonResult.status === "fulfilled") {
        const lessonData = getResponseData(lessonResult.value, []);

        setLessons(Array.isArray(lessonData) ? lessonData : []);
      } else {
        setLessons([]);

        setLessonError(
          getErrorMessage(lessonResult.reason, "Lesson data load করা যায়নি।"),
        );
      }

      if (quizResult.status === "fulfilled") {
        const quizData = getResponseData(quizResult.value, []);

        setQuizAttempts(Array.isArray(quizData) ? quizData : []);
      } else {
        setQuizAttempts([]);

        setQuizError(
          getErrorMessage(quizResult.reason, "Quiz data load করা যায়নি।"),
        );
      }

      setLoading(false);
    };

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  const dashboardData = useMemo(() => {
    const validLessons = lessons.filter(
      (lesson) => lesson?.status !== "cancelled",
    );

    const completedLessons = validLessons.filter(
      (lesson) => lesson?.status === "completed",
    );

    const upcomingLessons = validLessons
      .filter((lesson) => ["scheduled", "in_progress"].includes(lesson?.status))
      .sort((firstLesson, secondLesson) => {
        const firstDate =
          getLessonDate(firstLesson)?.getTime() || Number.MAX_SAFE_INTEGER;

        const secondDate =
          getLessonDate(secondLesson)?.getTime() || Number.MAX_SAFE_INTEGER;

        return firstDate - secondDate;
      });

    const completedMinutes = completedLessons.reduce(
      (total, lesson) => total + (Number(lesson?.duration) || 0),
      0,
    );

    const upcomingMinutes = upcomingLessons.reduce(
      (total, lesson) => total + (Number(lesson?.duration) || 0),
      0,
    );

    const uniqueSkills = new Set(
      completedLessons.flatMap(
        (lesson) => lesson?.lessonProgress?.skillsCovered || [],
      ),
    );

    const completedQuizAttempts = quizAttempts.filter(
      (attempt) => attempt?.status === "completed",
    );

    const quizAverage =
      completedQuizAttempts.length > 0
        ? Math.round(
            completedQuizAttempts.reduce(
              (total, attempt) => total + (Number(attempt?.percentage) || 0),
              0,
            ) / completedQuizAttempts.length,
          )
        : 0;

    const passedQuizCount = completedQuizAttempts.filter(
      (attempt) => attempt?.passed === true,
    ).length;

    const lessonProgress =
      validLessons.length > 0
        ? Math.round((completedLessons.length / validLessons.length) * 100)
        : 0;

    const progressValues = [];

    if (validLessons.length > 0) {
      progressValues.push(lessonProgress);
    }

    if (completedQuizAttempts.length > 0) {
      progressValues.push(quizAverage);
    }

    const overallProgress =
      progressValues.length > 0
        ? Math.round(
            progressValues.reduce((total, value) => total + value, 0) /
              progressValues.length,
          )
        : 0;

    return {
      validLessons,
      completedLessons,
      upcomingLessons,
      completedMinutes,
      upcomingMinutes,
      skillsCount: uniqueSkills.size,
      completedQuizAttempts,
      quizAverage,
      passedQuizCount,
      lessonProgress,
      overallProgress,
      latestQuiz: completedQuizAttempts[0] || null,
    };
  }, [lessons, quizAttempts]);

  const studentName =
    user?.name || user?.fullName || user?.firstName || "Student";

  return (
    <main className="min-h-screen bg-white px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header>
          <h1 className="text-3xl font-bold text-[#174A9B]">
            Welcome, {studentName}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Track your lessons and quiz performance from one dashboard.
          </p>
        </header>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {(userError || lessonError || quizError) && (
              <section className="mt-6 space-y-2">
                {userError && (
                  <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                    User API: {userError}
                  </p>
                )}

                {lessonError && (
                  <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                    Lesson API: {lessonError}
                  </p>
                )}

                {quizError && (
                  <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                    Quiz API: {quizError}
                  </p>
                )}
              </section>
            )}

            {/* Dashboard summary cards */}
            <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                icon={<FaClock />}
                title="Completed Lesson Time"
                value={formatMinutes(dashboardData.completedMinutes)}
                helper={`${dashboardData.completedLessons.length} completed lessons`}
              />

              <StatCard
                icon={<FaCalendarAlt />}
                title="Upcoming Lesson Time"
                value={formatMinutes(dashboardData.upcomingMinutes)}
                helper={`${dashboardData.upcomingLessons.length} upcoming lessons`}
              />

              <StatCard
                icon={<FaBrain />}
                title="Skills Acquired"
                value={String(dashboardData.skillsCount).padStart(2, "0")}
                helper="From completed lessons"
              />

              <StatCard
                icon={<IoStatsChart />}
                title="Quiz Average"
                value={`${dashboardData.quizAverage}%`}
                helper={`${dashboardData.completedQuizAttempts.length} completed attempts`}
              />
            </section>

            {/* Lesson progress */}
            <section className="mt-5 rounded-2xl bg-[#E8EEF8] p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-[#174A9B]">
                  Lesson Progress
                </h2>

                <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#174A9B]">
                  {lessons.length} total lessons
                </span>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {dashboardData.upcomingLessons.length > 0 ? (
                  dashboardData.upcomingLessons
                    .slice(0, 3)
                    .map((lesson) => (
                      <LessonCard key={lesson?._id} lesson={lesson} />
                    ))
                ) : dashboardData.completedLessons.length > 0 ? (
                  dashboardData.completedLessons
                    .slice(0, 3)
                    .map((lesson) => (
                      <LessonCard key={lesson?._id} lesson={lesson} />
                    ))
                ) : (
                  <div className="lg:col-span-2 xl:col-span-3">
                    <EmptyState
                      title="No lesson found"
                      text="এই student-এর lesson তৈরি হলে এখানে lesson information দেখাবে।"
                    />
                  </div>
                )}
              </div>
            </section>

            <section className="mt-5 grid gap-5 lg:grid-cols-2">
              {/* Upcoming schedule */}
              <div className="rounded-2xl bg-[#E8EEF8] p-5 sm:p-6">
                <h2 className="text-xl font-bold text-[#174A9B]">
                  Upcoming Schedule
                </h2>

                <div className="mt-5 space-y-3">
                  {dashboardData.upcomingLessons.length > 0 ? (
                    dashboardData.upcomingLessons.slice(0, 4).map((lesson) => (
                      <article
                        key={lesson?._id}
                        className="flex items-center gap-4 rounded-xl bg-white p-4"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8EEF8] text-[#174A9B]">
                          <FaCarSide />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate font-bold text-slate-900">
                            {getLessonTitle(lesson)}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {formatLessonDate(lesson)}
                            {" · "}
                            {lesson?.startTime || "Time not set"}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {getInstructorName(lesson)}
                          </p>
                        </div>

                        <span
                          className={`hidden shrink-0 rounded-full px-3 py-1 text-xs font-bold sm:block ${getLessonStatusClass(
                            lesson?.status,
                          )}`}
                        >
                          {getLessonStatusLabel(lesson?.status)}
                        </span>
                      </article>
                    ))
                  ) : (
                    <EmptyState
                      title="No upcoming lesson"
                      text="বর্তমানে কোনো scheduled বা in-progress lesson নেই।"
                    />
                  )}
                </div>
              </div>

              {/* Progress statistics */}
              <div className="rounded-2xl bg-[#E8EEF8] p-5 sm:p-6">
                <h2 className="text-xl font-bold text-[#174A9B]">
                  Total Progress Statistics
                </h2>

                <div className="mt-6 space-y-6 rounded-xl bg-white p-5">
                  <ProgressBar
                    label="Lesson completion"
                    value={dashboardData.lessonProgress}
                  />

                  <ProgressBar
                    label="Quiz average"
                    value={dashboardData.quizAverage}
                  />

                  <ProgressBar
                    label="Overall progress"
                    value={dashboardData.overallProgress}
                  />

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="rounded-xl bg-green-50 p-4 text-center">
                      <FaCheckCircle className="mx-auto text-green-600" />

                      <p className="mt-2 text-2xl font-bold text-green-700">
                        {dashboardData.passedQuizCount}
                      </p>

                      <p className="text-xs text-green-700">Passed quizzes</p>
                    </div>

                    <div className="rounded-xl bg-blue-50 p-4 text-center">
                      <IoStatsChart className="mx-auto text-blue-700" />

                      <p className="mt-2 text-2xl font-bold text-blue-700">
                        {dashboardData.completedQuizAttempts.length}
                      </p>

                      <p className="text-xs text-blue-700">Quiz attempts</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-5 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
              {/* Quiz actions */}
              <div className="rounded-2xl bg-[#E8EEF8] p-5 sm:p-6">
                <h2 className="text-xl font-bold text-[#174A9B]">
                  Quiz & Training
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/student/code"
                    className="rounded-xl bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <FaBrain className="text-2xl text-[#174A9B]" />

                    <p className="mt-4 font-bold text-slate-900">
                      Start Revising
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Review road-safety learning content.
                    </p>
                  </Link>

                  <Link
                    href="/student/code/simple-series-list"
                    className="rounded-xl bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <IoStatsChart className="text-2xl text-[#174A9B]" />

                    <p className="mt-4 font-bold text-slate-900">
                      Take Practice Exam
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Start a new quiz from the available quiz list.
                    </p>
                  </Link>
                </div>
              </div>

              {/* Latest quiz */}
              <div className="rounded-2xl bg-[#E8EEF8] p-5 sm:p-6">
                <h2 className="text-xl font-bold text-[#174A9B]">
                  Latest Quiz
                </h2>

                {dashboardData.latestQuiz ? (
                  <div className="mt-5 rounded-xl bg-white p-5">
                    <p className="font-bold text-slate-900">
                      {dashboardData.latestQuiz?.quiz?.title || "Quiz Attempt"}
                    </p>

                    <div className="mt-5 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-sm text-slate-500">Score</p>

                        <p className="text-4xl font-bold text-[#174A9B]">
                          {clampPercentage(
                            dashboardData.latestQuiz?.percentage,
                          )}
                          %
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-4 py-2 text-xs font-bold ${
                          dashboardData.latestQuiz?.passed
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {dashboardData.latestQuiz?.passed
                          ? "Passed"
                          : "Not Passed"}
                      </span>
                    </div>

                    <p className="mt-4 text-sm text-slate-500">
                      Correct answers:{" "}
                      {dashboardData.latestQuiz?.correctCount || 0}
                      {" / "}
                      {dashboardData.latestQuiz?.totalQuestions || 0}
                    </p>
                  </div>
                ) : (
                  <div className="mt-5">
                    <EmptyState
                      title="No completed quiz"
                      text="Quiz complete করলে latest result এখানে দেখাবে।"
                    />
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
