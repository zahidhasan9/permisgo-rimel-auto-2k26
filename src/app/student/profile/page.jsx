// "use client";

// import { BsCheckSquareFill, BsPlusCircleFill } from "react-icons/bs";
// import { FiEdit2 } from "react-icons/fi";
// import { IoChevronBack } from "react-icons/io5";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// const BLUE = "#174A9B";
// const LIGHT = "#E8EEF8";
// const RED = "#F12B45";

// const chartData = [
//   { x: 0, y: 7 },
//   { x: 0.28, y: 17 },
//   { x: 0.55, y: 20 },
//   { x: 0.84, y: 14 },
//   { x: 1.08, y: 15 },
//   { x: 1.1, y: 27 },
//   { x: 1.3, y: 29 },
//   { x: 1.55, y: 22 },
//   { x: 1.9, y: 21 },
//   { x: 2.1, y: 25 },
//   { x: 2.25, y: 36 },
//   { x: 2.55, y: 38.7, dot: true },
//   { x: 2.8, y: 35 },
//   { x: 3.1, y: 26 },
//   { x: 3.35, y: 24 },
//   { x: 3.75, y: 28 },
//   { x: 4.15, y: 37 },
// ];

// const learningRows = [
//   ["Registration", "24/03/2026", "Theoretical exam"],
//   ["Assessment", "24/03/2026", "Practical exam"],
//   ["Entry Code", "24/03/2026", "Theoretical exam"],
//   ["Registration", "24/03/2026", "Practical exam"],
//   ["Entrance to the driveway", "24/03/2026", "Theoretical exam"],
// ];

// const profileSteps = [
//   ["Account Setup", true],
//   ["Profile Photo", true],
//   ["Personal Info", true],
//   ["Driving Info (+20%)", false],
//   ["Contact", true],
//   ["Documents (+20%)", false],
// ];

// function StudentAvatar() {
//   return (
//     <div className="relative h-[70px] w-[70px] rounded-full border-[1.7px] border-[#174A9B] bg-white p-[3px]">
//       <div className="relative h-full w-full overflow-hidden rounded-full bg-[#DDE9F7]">
//         <div className="absolute left-1/2 top-[7px] h-[27px] w-[39px] -translate-x-1/2 rounded-t-full bg-[#221A17]" />
//         <div className="absolute left-1/2 top-[19px] h-[35px] w-[34px] -translate-x-1/2 rounded-full bg-[#B87A4C]" />
//         <div className="absolute left-[23px] top-[34px] h-[3px] w-[3px] rounded-full bg-black" />
//         <div className="absolute right-[23px] top-[34px] h-[3px] w-[3px] rounded-full bg-black" />
//         <div className="absolute left-1/2 top-[47px] h-[4px] w-[17px] -translate-x-1/2 rounded-b-full bg-white" />
//         <div className="absolute bottom-[-17px] left-1/2 h-[42px] w-[55px] -translate-x-1/2 rounded-t-full bg-[#174A9B]" />
//       </div>

//       <div className="absolute bottom-[1px] right-[-3px] flex h-[17px] w-[17px] items-center justify-center rounded-full border-[2px] border-white bg-[#174A9B] text-[11px] font-bold leading-none text-white">
//         +
//       </div>
//     </div>
//   );
// }

// function InfoBox({ title, data }) {
//   return (
//     <div className="h-[168px] rounded-[10px] bg-white px-[38px] pt-[21px]">
//       <div className="flex items-start justify-between">
//         <h3 className="text-[15px] font-[700] text-[#174A9B]">{title}</h3>
//         <FiEdit2 className="mt-[1px] text-[19px] text-[#174A9B]" />
//       </div>

//       <div className="mt-[30px] grid grid-cols-3 border-b border-[#E1E5EA] pb-[18px]">
//         {data.map((item) => (
//           <p
//             key={item.label}
//             className="text-[12.6px] font-[700] text-[#292D33]"
//           >
//             {item.label}
//           </p>
//         ))}
//       </div>

//       <div className="mt-[18px] grid grid-cols-3">
//         {data.map((item) => (
//           <p
//             key={item.value}
//             className="text-[11.2px] font-[500] text-[#777B84]"
//           >
//             {item.value}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// }

// function Metric({ value, label }) {
//   return (
//     <div className="flex h-[74px] w-[224px] flex-col items-center justify-center rounded-[9px] bg-white">
//       <p className="text-[14px] font-[700] leading-[18px] text-[#30323A]">
//         {value}
//       </p>
//       <p className="text-[11.5px] font-[500] leading-[16px] text-[#30323A]">
//         {label}
//       </p>
//     </div>
//   );
// }

// function CheckItem({ label, done }) {
//   return (
//     <div className="flex h-[28px] items-center gap-[9px]">
//       {done ? (
//         <BsCheckSquareFill className="h-[18px] w-[18px] text-[#2DBE52]" />
//       ) : (
//         <span className="h-[18px] w-[18px] rounded-[3px] border-[1.5px] border-[#4F7EC5] bg-white" />
//       )}

//       <span
//         className={`text-[15px] font-[500] ${
//           done ? "text-[#30323A]" : "text-[#868A92]"
//         }`}
//       >
//         {label}
//       </span>
//     </div>
//   );
// }

// function ProgressRing() {
//   return (
//     <div className="relative mx-auto mt-[25px] h-[112px] w-[112px] rounded-full">
//       <div
//         className="absolute inset-0 rounded-full"
//         style={{
//           background:
//             "conic-gradient(from -20deg, #174A9B 0deg, #174A9B 216deg, #ffffff 216deg, #ffffff 360deg)",
//         }}
//       />
//       <div className="absolute inset-[12px] rounded-full bg-[#DEE7F2]" />
//       <div className="absolute inset-0 flex items-center justify-center text-[18px] font-[700] text-[#174A9B]">
//         60%
//       </div>
//     </div>
//   );
// }

// export default function Page() {
//   return (
//     <>
//       <style jsx global>{`
//         @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

//         body {
//           margin: 0;
//           background: #ffffff;
//           font-family: "Poppins", sans-serif;
//         }

//         * {
//           box-sizing: border-box;
//         }

//         .profile-chart .recharts-cartesian-axis-line,
//         .profile-chart .recharts-cartesian-axis-tick-line {
//           display: none;
//         }

//         .profile-chart .recharts-cartesian-axis-tick-value {
//           fill: #2d3036;
//           font-size: 13px;
//           font-weight: 500;
//         }
//       `}</style>

//       <main className="min-h-screen bg-white">
//         <div className="mx-auto flex w-[1059px] gap-[19px] px-[22px] pb-[18px] pt-[23px]">
//           <div className="w-[748px]">
//             <header className="flex h-[84px] gap-[17px]">
//               <button className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px] bg-[#EEF4FB] text-[26px] text-[#111827]">
//                 <IoChevronBack />
//               </button>

//               <div>
//                 <h1 className="mt-[-1px] text-[24px] font-[700] leading-[29px] text-[#174A9B]">
//                   Profile
//                 </h1>
//                 <p className="mt-[9px] text-[13.5px] font-[500] text-[#767B84]">
//                   Update your information to ensure accurate lesson scheduling
//                   and communication.
//                 </p>
//               </div>
//             </header>

//             <section className="h-[501px] rounded-[10px] bg-[#E8EEF8] px-[18px] pt-[20px]">
//               <div className="flex items-center gap-[20px]">
//                 <StudentAvatar />

//                 <div>
//                   <h2 className="text-[21px] font-[700] leading-[25px] text-[#174A9B]">
//                     Shahin Miah
//                   </h2>
//                   <p className="mt-[7px] text-[13px] font-[500] text-[#7C818A]">
//                     Driving Student
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-[28px]">
//                 <InfoBox
//                   title="Personal information"
//                   data={[
//                     { label: "Date of Birth", value: "12 March 2000" },
//                     { label: "Email", value: "shahin@email.com" },
//                     { label: "Address", value: "Paris, France" },
//                   ]}
//                 />
//               </div>

//               <div className="mt-[19px]">
//                 <InfoBox
//                   title="Driving Information"
//                   data={[
//                     { label: "NEPH Number", value: "250395301980" },
//                     { label: "Permit Type", value: "Accelerated Training" },
//                     { label: "License Type", value: "Automatic" },
//                   ]}
//                 />
//               </div>
//             </section>

//             <section className="mt-[19px] h-[516px] rounded-[10px] bg-[#E8EEF8] px-[18px] pt-[21px]">
//               <h2 className="text-[15px] font-[700] text-[#174A9B]">
//                 Lesson Summary
//               </h2>

//               <div className="mt-[21px] flex gap-[19px]">
//                 <Metric value="40 Hours" label="Completed" />
//                 <Metric value="0 min" label="Planned" />
//                 <Metric value="40:00" label="Evaluated" />
//               </div>

//               <div className="profile-chart mt-[18px] h-[345px] rounded-[9px] border border-[#B7CBE8] bg-white px-[19px] pb-[13px] pt-[34px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart
//                     data={chartData}
//                     margin={{ top: 17, right: 5, bottom: 2, left: -20 }}
//                   >
//                     <defs>
//                       <linearGradient
//                         id="chartFill"
//                         x1="0"
//                         y1="0"
//                         x2="0"
//                         y2="1"
//                       >
//                         <stop offset="0%" stopColor={BLUE} stopOpacity={0.16} />
//                         <stop
//                           offset="100%"
//                           stopColor={BLUE}
//                           stopOpacity={0.07}
//                         />
//                       </linearGradient>
//                     </defs>

//                     <CartesianGrid
//                       vertical={false}
//                       stroke="#000000"
//                       strokeOpacity={0.18}
//                     />

//                     <XAxis
//                       dataKey="x"
//                       type="number"
//                       domain={[0, 4.15]}
//                       ticks={[0.08, 1.02, 2.0, 2.95, 4.0]}
//                       tickFormatter={(value) => {
//                         if (value < 0.5) return "Aug";
//                         if (value < 1.5) return "Sep";
//                         if (value < 2.5) return "Oct";
//                         if (value < 3.5) return "Nov";
//                         return "Dec";
//                       }}
//                       padding={{ left: 0, right: 0 }}
//                       interval={0}
//                       dy={17}
//                     />

//                     <YAxis
//                       domain={[0, 40]}
//                       ticks={[0, 10, 20, 30, 40]}
//                       width={55}
//                       dx={-10}
//                     />

//                     <Tooltip
//                       cursor={false}
//                       contentStyle={{
//                         borderRadius: 8,
//                         border: "1px solid #B7CBE8",
//                         fontSize: 12,
//                       }}
//                     />

//                     <Area
//                       type="monotone"
//                       dataKey="y"
//                       stroke={BLUE}
//                       strokeWidth={2.2}
//                       fill="url(#chartFill)"
//                       dot={(props) => {
//                         if (!props.payload.dot) return null;
//                         return (
//                           <circle
//                             cx={props.cx}
//                             cy={props.cy}
//                             r={5}
//                             fill={BLUE}
//                             stroke={BLUE}
//                             strokeWidth={1}
//                           />
//                         );
//                       }}
//                       activeDot={false}
//                     />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </div>
//             </section>

//             <section className="mt-[19px] h-[312px] rounded-[10px] bg-[#E8EEF8] px-[18px] pt-[19px]">
//               <div className="h-[266px] rounded-[10px] bg-white px-[19px] pt-[20px]">
//                 <h2 className="text-[15px] font-[700] text-[#174A9B]">
//                   Learning Progress
//                 </h2>

//                 <div className="mt-[14px]">
//                   {learningRows.map((row, index) => (
//                     <div
//                       key={index}
//                       className="grid h-[40px] grid-cols-[192px_190px_200px_88px] items-center border-b border-[#E4E8EF] last:border-b-0"
//                     >
//                       <p className="text-[12.5px] font-[700] text-[#2D3036]">
//                         {row[0]}
//                       </p>
//                       <p className="text-[12.5px] font-[500] text-[#7D828B]">
//                         {row[1]}
//                       </p>
//                       <p className="text-[12.5px] font-[500] text-[#7D828B]">
//                         {row[2]}
//                       </p>

//                       <button className="flex items-center gap-[8px] text-[12.5px] font-[600] text-[#174A9B]">
//                         <BsPlusCircleFill className="h-[15px] w-[15px] text-[#F12B45]" />
//                         Add Date
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </section>

//             <section className="mt-[19px] flex h-[264px] gap-[19px] rounded-[10px] bg-[#E8EEF8] px-[18px] pt-[19px]">
//               <div className="h-[223px] w-[346px] rounded-[10px] bg-white px-[20px] pt-[23px]">
//                 <h2 className="text-[15px] font-[700] text-[#174A9B]">
//                   Appointments
//                 </h2>

//                 <div className="mt-[27px] space-y-[17px] text-[13px] font-[500] text-[#747981]">
//                   <p>
//                     Driving Lesson:{" "}
//                     <span className="font-[700] text-[#30323A]">40 Hours</span>
//                   </p>
//                   <p>
//                     Simulator Lesson:{" "}
//                     <span className="font-[700] text-[#30323A]">5 Hours</span>
//                   </p>
//                   <p>
//                     Coding Session:{" "}
//                     <span className="font-[700] text-[#30323A]">1 Hour</span>
//                   </p>
//                 </div>

//                 <p className="mt-[42px] text-[15px] font-[700] text-[#174A9B]">
//                   Total Sessions: 46 Hour
//                 </p>
//               </div>

//               <div className="h-[223px] w-[346px] rounded-[10px] bg-white px-[20px] pt-[23px]">
//                 <h2 className="text-[15px] font-[700] text-[#174A9B]">
//                   Performance Overview
//                 </h2>

//                 <div className="mt-[27px] space-y-[17px] text-[13px] font-[500] text-[#747981]">
//                   <p>
//                     Students Like Rating:{" "}
//                     <span className="font-[700] text-[#30323A]">4.8</span>
//                   </p>
//                   <p>
//                     Pass Probability:{" "}
//                     <span className="font-[700] text-[#174A9B]">High</span>
//                   </p>
//                   <p>
//                     Progress Level:{" "}
//                     <span className="font-[700] text-[#30323A]">
//                       Intermediate
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             </section>

//             <section className="mt-[19px] flex h-[108px] items-center justify-between rounded-[10px] bg-[#DEE7F2] px-[18px]">
//               <div>
//                 <h2 className="text-[19px] font-[700] text-[#174A9B]">
//                   ANTS Registration
//                 </h2>
//                 <p className="mt-[17px] text-[13.5px] font-[500] text-[#343841]">
//                   No applications are currently being processed.
//                 </p>
//               </div>

//               <button className="mt-[25px] h-[38px] w-[235px] rounded-[9px] border-[1.5px] border-[#174A9B] bg-white text-[15px] font-[700] text-[#F12B45]">
//                 Continue on ANTS website
//               </button>
//             </section>

//             <section className="mt-[19px] h-[117px] rounded-[10px] bg-[#E8EEF8] px-[18px] pt-[21px]">
//               <h2 className="text-[19px] font-[700] text-[#174A9B]">
//                 Check your learning booklet and track your progress
//               </h2>

//               <button className="mt-[23px] h-[39px] w-[151px] rounded-[7px] bg-[#F12B45] text-[11px] font-[700] text-white">
//                 Check Learning Booklet
//               </button>
//             </section>
//           </div>

//           <aside className="w-[247px]">
//             <section className="h-[493px] rounded-[10px] bg-[#DEE7F2] px-[20px] pt-[22px]">
//               <h2 className="text-center text-[15px] font-[700] text-[#174A9B]">
//                 Complete your profile
//               </h2>

//               <ProgressRing />

//               <div className="mt-[30px] space-y-[1px]">
//                 {profileSteps.map(([label, done]) => (
//                   <CheckItem key={label} label={label} done={done} />
//                 ))}
//               </div>
//             </section>

//             <section className="mt-[19px] h-[110px] rounded-[10px] bg-[#DEE7F2] px-[18px] pt-[20px]">
//               <h2 className="text-[13.5px] font-[700] text-[#174A9B]">
//                 Instructor Notes
//               </h2>

//               <textarea
//                 placeholder="Write here"
//                 className="mt-[12px] h-[41px] w-[209px] resize-none rounded-[10px] border border-[#A6B9D8] bg-white px-[17px] py-[10px] text-[12.5px] font-[500] text-[#30323A] outline-none placeholder:text-[#A3A7AE]"
//               />
//             </section>
//           </aside>
//         </div>
//       </main>
//     </>
//   );
// }

"use client";

import { useState } from "react";
import { BsCheckSquareFill, BsPlusCircleFill } from "react-icons/bs";
import { FiEdit2, FiX } from "react-icons/fi";
import { IoChevronBack } from "react-icons/io5";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BLUE = "#174A9B";

const chartData = [
  { x: 0, y: 7 },
  { x: 0.28, y: 17 },
  { x: 0.55, y: 20 },
  { x: 0.84, y: 14 },
  { x: 1.08, y: 15 },
  { x: 1.1, y: 27 },
  { x: 1.3, y: 29 },
  { x: 1.55, y: 22 },
  { x: 1.9, y: 21 },
  { x: 2.1, y: 25 },
  { x: 2.25, y: 36 },
  { x: 2.55, y: 38.7, dot: true },
  { x: 2.8, y: 35 },
  { x: 3.1, y: 26 },
  { x: 3.35, y: 24 },
  { x: 3.75, y: 28 },
  { x: 4.15, y: 37 },
];

const learningRows = [
  ["Registration", "24/03/2026", "Theoretical exam"],
  ["Assessment", "24/03/2026", "Practical exam"],
  ["Entry Code", "24/03/2026", "Theoretical exam"],
  ["Registration", "24/03/2026", "Practical exam"],
  ["Entrance to the driveway", "24/03/2026", "Theoretical exam"],
];

const profileSteps = [
  ["Account Setup", true],
  ["Profile Photo", true],
  ["Personal Info", true],
  ["Driving Info (+20%)", false],
  ["Contact", true],
  ["Documents (+20%)", false],
];

function StudentAvatar() {
  return (
    <div className="relative h-[70px] w-[70px] rounded-full border-[1.7px] border-[#174A9B] bg-white p-[3px]">
      <div className="relative h-full w-full overflow-hidden rounded-full bg-[#DDE9F7]">
        <div className="absolute left-1/2 top-[7px] h-[27px] w-[39px] -translate-x-1/2 rounded-t-full bg-[#221A17]" />
        <div className="absolute left-1/2 top-[19px] h-[35px] w-[34px] -translate-x-1/2 rounded-full bg-[#B87A4C]" />
        <div className="absolute left-[23px] top-[34px] h-[3px] w-[3px] rounded-full bg-black" />
        <div className="absolute right-[23px] top-[34px] h-[3px] w-[3px] rounded-full bg-black" />
        <div className="absolute left-1/2 top-[47px] h-[4px] w-[17px] -translate-x-1/2 rounded-b-full bg-white" />
        <div className="absolute bottom-[-17px] left-1/2 h-[42px] w-[55px] -translate-x-1/2 rounded-t-full bg-[#174A9B]" />
      </div>

      <div className="absolute bottom-[1px] right-[-3px] flex h-[17px] w-[17px] items-center justify-center rounded-full border-[2px] border-white bg-[#174A9B] text-[11px] font-bold leading-none text-white">
        +
      </div>
    </div>
  );
}

function InfoBox({ title, data, onEdit }) {
  return (
    <div className="h-[168px] rounded-[10px] bg-white px-[38px] pt-[21px]">
      <div className="flex items-start justify-between">
        <h3 className="text-[15px] font-[700] text-[#174A9B]">{title}</h3>

        <button
          type="button"
          onClick={onEdit}
          className="mt-[1px] text-[19px] text-[#174A9B] transition hover:scale-110"
        >
          <FiEdit2 />
        </button>
      </div>

      <div className="mt-[30px] grid grid-cols-3 border-b border-[#E1E5EA] pb-[18px]">
        {data.map((item) => (
          <p
            key={item.label}
            className="text-[12.6px] font-[700] text-[#292D33]"
          >
            {item.label}
          </p>
        ))}
      </div>

      <div className="mt-[18px] grid grid-cols-3">
        {data.map((item) => (
          <p
            key={item.label}
            className="text-[11.2px] font-[500] text-[#777B84]"
          >
            {item.value}
          </p>
        ))}
      </div>
    </div>
  );
}

function EditModal({ open, title, draft, onClose, onChange, onSave }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <div className="w-full max-w-[520px] rounded-[16px] bg-white p-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="mb-[22px] flex items-center justify-between">
          <h2 className="text-[20px] font-[700] text-[#174A9B]">
            Edit {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#E8EEF8] text-[22px] text-[#174A9B]"
          >
            <FiX />
          </button>
        </div>

        <div className="space-y-[16px]">
          {draft.map((item, index) => (
            <div key={item.label}>
              <label className="mb-[7px] block text-[13px] font-[700] text-[#292D33]">
                {item.label}
              </label>

              <input
                value={item.value}
                onChange={(e) => onChange(index, e.target.value)}
                className="h-[46px] w-full rounded-[10px] border border-[#B7CBE8] bg-white px-[14px] text-[13px] font-[500] text-[#30323A] outline-none focus:border-[#174A9B] focus:ring-2 focus:ring-[#174A9B]/15"
              />
            </div>
          ))}
        </div>

        <div className="mt-[26px] flex justify-end gap-[12px]">
          <button
            type="button"
            onClick={onClose}
            className="h-[42px] rounded-[9px] border border-[#B7CBE8] bg-white px-[22px] text-[14px] font-[700] text-[#174A9B]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            className="h-[42px] rounded-[9px] bg-[#174A9B] px-[26px] text-[14px] font-[700] text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function Metric({ value, label }) {
  return (
    <div className="flex h-[74px] w-[224px] flex-col items-center justify-center rounded-[9px] bg-white">
      <p className="text-[14px] font-[700] leading-[18px] text-[#30323A]">
        {value}
      </p>
      <p className="text-[11.5px] font-[500] leading-[16px] text-[#30323A]">
        {label}
      </p>
    </div>
  );
}

function CheckItem({ label, done }) {
  return (
    <div className="flex h-[28px] items-center gap-[9px]">
      {done ? (
        <BsCheckSquareFill className="h-[18px] w-[18px] text-[#2DBE52]" />
      ) : (
        <span className="h-[18px] w-[18px] rounded-[3px] border-[1.5px] border-[#4F7EC5] bg-white" />
      )}

      <span
        className={`text-[15px] font-[500] ${
          done ? "text-[#30323A]" : "text-[#868A92]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function ProgressRing() {
  return (
    <div className="relative mx-auto mt-[25px] h-[112px] w-[112px] rounded-full">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from -20deg, #174A9B 0deg, #174A9B 216deg, #ffffff 216deg, #ffffff 360deg)",
        }}
      />
      <div className="absolute inset-[12px] rounded-full bg-[#DEE7F2]" />
      <div className="absolute inset-0 flex items-center justify-center text-[18px] font-[700] text-[#174A9B]">
        60%
      </div>
    </div>
  );
}

export default function Page() {
  const [personalInfo, setPersonalInfo] = useState([
    { label: "Date of Birth", value: "12 March 2000" },
    { label: "Email", value: "shahin@email.com" },
    { label: "Address", value: "Paris, France" },
  ]);

  const [drivingInfo, setDrivingInfo] = useState([
    { label: "NEPH Number", value: "250395301980" },
    { label: "Permit Type", value: "Accelerated Training" },
    { label: "License Type", value: "Automatic" },
  ]);

  const [modalType, setModalType] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [draft, setDraft] = useState([]);

  const openModal = (type, title, data) => {
    setModalType(type);
    setModalTitle(title);
    setDraft(data.map((item) => ({ ...item })));
  };

  const closeModal = () => {
    setModalType(null);
    setModalTitle("");
    setDraft([]);
  };

  const handleDraftChange = (index, value) => {
    setDraft((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, value } : item,
      ),
    );
  };

  const saveModal = () => {
    if (modalType === "personal") {
      setPersonalInfo(draft);
    }

    if (modalType === "driving") {
      setDrivingInfo(draft);
    }

    closeModal();
  };

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

        body {
          margin: 0;
          background: #ffffff;
          font-family: "Poppins", sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        .profile-chart .recharts-cartesian-axis-line,
        .profile-chart .recharts-cartesian-axis-tick-line {
          display: none;
        }

        .profile-chart .recharts-cartesian-axis-tick-value {
          fill: #2d3036;
          font-size: 13px;
          font-weight: 500;
        }
      `}</style>

      <EditModal
        open={Boolean(modalType)}
        title={modalTitle}
        draft={draft}
        onClose={closeModal}
        onChange={handleDraftChange}
        onSave={saveModal}
      />

      <main className="min-h-screen bg-white">
        <div className="mx-auto flex w-[1059px] gap-[19px] px-[22px] pb-[18px] pt-[23px]">
          <div className="w-[748px]">
            <header className="flex h-[84px] gap-[17px]">
              <button className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px] bg-[#EEF4FB] text-[26px] text-[#111827]">
                <IoChevronBack />
              </button>

              <div>
                <h1 className="mt-[-1px] text-[24px] font-[700] leading-[29px] text-[#174A9B]">
                  Profile
                </h1>
                <p className="mt-[9px] text-[13.5px] font-[500] text-[#767B84]">
                  Update your information to ensure accurate lesson scheduling
                  and communication.
                </p>
              </div>
            </header>

            <section className="h-[501px] rounded-[10px] bg-[#E8EEF8] px-[18px] pt-[20px]">
              <div className="flex items-center gap-[20px]">
                <StudentAvatar />

                <div>
                  <h2 className="text-[21px] font-[700] leading-[25px] text-[#174A9B]">
                    Shahin Miah
                  </h2>
                  <p className="mt-[7px] text-[13px] font-[500] text-[#7C818A]">
                    Driving Student
                  </p>
                </div>
              </div>

              <div className="mt-[28px]">
                <InfoBox
                  title="Personal information"
                  data={personalInfo}
                  onEdit={() =>
                    openModal("personal", "Personal information", personalInfo)
                  }
                />
              </div>

              <div className="mt-[19px]">
                <InfoBox
                  title="Driving Information"
                  data={drivingInfo}
                  onEdit={() =>
                    openModal("driving", "Driving Information", drivingInfo)
                  }
                />
              </div>
            </section>

            <section className="mt-[19px] h-[516px] rounded-[10px] bg-[#E8EEF8] px-[18px] pt-[21px]">
              <h2 className="text-[15px] font-[700] text-[#174A9B]">
                Lesson Summary
              </h2>

              <div className="mt-[21px] flex gap-[19px]">
                <Metric value="40 Hours" label="Completed" />
                <Metric value="0 min" label="Planned" />
                <Metric value="40:00" label="Evaluated" />
              </div>

              <div className="profile-chart mt-[18px] h-[345px] rounded-[9px] border border-[#B7CBE8] bg-white px-[19px] pb-[13px] pt-[34px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 17, right: 5, bottom: 2, left: -20 }}
                  >
                    <defs>
                      <linearGradient
                        id="chartFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor={BLUE} stopOpacity={0.16} />
                        <stop
                          offset="100%"
                          stopColor={BLUE}
                          stopOpacity={0.07}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      vertical={false}
                      stroke="#000000"
                      strokeOpacity={0.18}
                    />

                    <XAxis
                      dataKey="x"
                      type="number"
                      domain={[0, 4.15]}
                      ticks={[0.08, 1.02, 2.0, 2.95, 4.0]}
                      tickFormatter={(value) => {
                        if (value < 0.5) return "Aug";
                        if (value < 1.5) return "Sep";
                        if (value < 2.5) return "Oct";
                        if (value < 3.5) return "Nov";
                        return "Dec";
                      }}
                      padding={{ left: 0, right: 0 }}
                      interval={0}
                      dy={17}
                    />

                    <YAxis
                      domain={[0, 40]}
                      ticks={[0, 10, 20, 30, 40]}
                      width={55}
                      dx={-10}
                    />

                    <Tooltip
                      cursor={false}
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid #B7CBE8",
                        fontSize: 12,
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="y"
                      stroke={BLUE}
                      strokeWidth={2.2}
                      fill="url(#chartFill)"
                      dot={(props) => {
                        if (!props.payload.dot) return null;
                        return (
                          <circle
                            cx={props.cx}
                            cy={props.cy}
                            r={5}
                            fill={BLUE}
                            stroke={BLUE}
                            strokeWidth={1}
                          />
                        );
                      }}
                      activeDot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="mt-[19px] h-[312px] rounded-[10px] bg-[#E8EEF8] px-[18px] pt-[19px]">
              <div className="h-[266px] rounded-[10px] bg-white px-[19px] pt-[20px]">
                <h2 className="text-[15px] font-[700] text-[#174A9B]">
                  Learning Progress
                </h2>

                <div className="mt-[14px]">
                  {learningRows.map((row, index) => (
                    <div
                      key={index}
                      className="grid h-[40px] grid-cols-[192px_190px_200px_88px] items-center border-b border-[#E4E8EF] last:border-b-0"
                    >
                      <p className="text-[12.5px] font-[700] text-[#2D3036]">
                        {row[0]}
                      </p>
                      <p className="text-[12.5px] font-[500] text-[#7D828B]">
                        {row[1]}
                      </p>
                      <p className="text-[12.5px] font-[500] text-[#7D828B]">
                        {row[2]}
                      </p>

                      <button className="flex items-center gap-[8px] text-[12.5px] font-[600] text-[#174A9B]">
                        <BsPlusCircleFill className="h-[15px] w-[15px] text-[#F12B45]" />
                        Add Date
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-[19px] flex h-[264px] gap-[19px] rounded-[10px] bg-[#E8EEF8] px-[18px] pt-[19px]">
              <div className="h-[223px] w-[346px] rounded-[10px] bg-white px-[20px] pt-[23px]">
                <h2 className="text-[15px] font-[700] text-[#174A9B]">
                  Appointments
                </h2>

                <div className="mt-[27px] space-y-[17px] text-[13px] font-[500] text-[#747981]">
                  <p>
                    Driving Lesson:{" "}
                    <span className="font-[700] text-[#30323A]">40 Hours</span>
                  </p>
                  <p>
                    Simulator Lesson:{" "}
                    <span className="font-[700] text-[#30323A]">5 Hours</span>
                  </p>
                  <p>
                    Coding Session:{" "}
                    <span className="font-[700] text-[#30323A]">1 Hour</span>
                  </p>
                </div>

                <p className="mt-[42px] text-[15px] font-[700] text-[#174A9B]">
                  Total Sessions: 46 Hour
                </p>
              </div>

              <div className="h-[223px] w-[346px] rounded-[10px] bg-white px-[20px] pt-[23px]">
                <h2 className="text-[15px] font-[700] text-[#174A9B]">
                  Performance Overview
                </h2>

                <div className="mt-[27px] space-y-[17px] text-[13px] font-[500] text-[#747981]">
                  <p>
                    Students Like Rating:{" "}
                    <span className="font-[700] text-[#30323A]">4.8</span>
                  </p>
                  <p>
                    Pass Probability:{" "}
                    <span className="font-[700] text-[#174A9B]">High</span>
                  </p>
                  <p>
                    Progress Level:{" "}
                    <span className="font-[700] text-[#30323A]">
                      Intermediate
                    </span>
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-[19px] flex h-[108px] items-center justify-between rounded-[10px] bg-[#DEE7F2] px-[18px]">
              <div>
                <h2 className="text-[19px] font-[700] text-[#174A9B]">
                  ANTS Registration
                </h2>
                <p className="mt-[17px] text-[13.5px] font-[500] text-[#343841]">
                  No applications are currently being processed.
                </p>
              </div>

              <button className="mt-[25px] h-[38px] w-[235px] rounded-[9px] border-[1.5px] border-[#174A9B] bg-white text-[15px] font-[700] text-[#F12B45]">
                Continue on ANTS website
              </button>
            </section>

            <section className="mt-[19px] h-[117px] rounded-[10px] bg-[#E8EEF8] px-[18px] pt-[21px]">
              <h2 className="text-[19px] font-[700] text-[#174A9B]">
                Check your learning booklet and track your progress
              </h2>

              <button className="mt-[23px] h-[39px] w-[151px] rounded-[7px] bg-[#F12B45] text-[11px] font-[700] text-white">
                Check Learning Booklet
              </button>
            </section>
          </div>

          <aside className="w-[247px]">
            <section className="h-[493px] rounded-[10px] bg-[#DEE7F2] px-[20px] pt-[22px]">
              <h2 className="text-center text-[15px] font-[700] text-[#174A9B]">
                Complete your profile
              </h2>

              <ProgressRing />

              <div className="mt-[30px] space-y-[1px]">
                {profileSteps.map(([label, done]) => (
                  <CheckItem key={label} label={label} done={done} />
                ))}
              </div>
            </section>

            <section className="mt-[19px] h-[110px] rounded-[10px] bg-[#DEE7F2] px-[18px] pt-[20px]">
              <h2 className="text-[13.5px] font-[700] text-[#174A9B]">
                Instructor Notes
              </h2>

              <textarea
                placeholder="Write here"
                className="mt-[12px] h-[41px] w-[209px] resize-none rounded-[10px] border border-[#A6B9D8] bg-white px-[17px] py-[10px] text-[12.5px] font-[500] text-[#30323A] outline-none placeholder:text-[#A3A7AE]"
              />
            </section>
          </aside>
        </div>
      </main>
    </>
  );
}
