// "use client";

// import { useState } from "react";
// import { BsEmojiSmile } from "react-icons/bs";
// import {
//   FaPaperPlane,
//   FaPhone,
//   FaPlus,
//   FaSearch,
//   FaVideo,
// } from "react-icons/fa";
// import { HiOutlineDotsHorizontal } from "react-icons/hi";
// import { IoMdAttach } from "react-icons/io";

// const chats = [
//   { name: "Dianne", msg: "Hi, Wade Warren!", time: "10:00 AM" },
//   {
//     name: "Wade Warren",
//     msg: "Hi, Wade Warren!",
//     time: "10:00 AM",
//     active: true,
//   },
//   { name: "Mitchell", msg: "Hi, Wade Warren!", time: "10:00 AM" },
//   { name: "Cody", msg: "Hi, Wade Warren!", time: "10:00 AM", badge: 6 },
//   { name: "Angel", msg: "Hi, Wade Warren!", time: "10:00 AM" },
//   { name: "Aubrey", msg: "Hi, Wade Warren!", time: "10:00 AM", badge: 6 },
//   { name: "Kristin", msg: "Hi, Wade Warren!", time: "10:00 AM" },
//   { name: "Cameron", msg: "Hi, Wade Warren!", time: "10:00 AM" },
// ];

// export default function Page() {
//   const [activeChat, setActiveChat] = useState("Wade Warren");

//   return (
//     <div className="h-screen w-full bg-[#f4f6fb] flex p-4 gap-4">
//       {/* LEFT SIDEBAR */}
//       <div className="w-[320px] bg-white rounded-2xl p-4 flex flex-col shadow-sm">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-4">
//           <h1 className="text-xl font-semibold">Chat Box</h1>
//           <button className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center">
//             <FaPlus size={12} />
//           </button>
//         </div>

//         {/* Search */}
//         <div className="flex items-center bg-gray-100 px-3 py-2 rounded-xl mb-4">
//           <FaSearch className="text-gray-400 mr-2" />
//           <input
//             className="bg-transparent outline-none text-sm w-full"
//             placeholder="Search"
//           />
//         </div>

//         {/* Tabs */}
//         <div className="flex bg-gray-100 rounded-xl p-1 mb-4 text-sm">
//           <button className="flex-1 bg-white rounded-lg py-1 font-medium">
//             All
//           </button>
//           <button className="flex-1 py-1">Active</button>
//           <button className="flex-1 py-1">Unread</button>
//         </div>

//         {/* Chat List */}
//         <div className="flex-1 overflow-auto space-y-2">
//           {chats.map((c, i) => (
//             <div
//               key={i}
//               onClick={() => setActiveChat(c.name)}
//               className={`flex items-center justify-between p-2 rounded-xl cursor-pointer ${
//                 c.active ? "bg-blue-50" : "hover:bg-gray-50"
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full bg-gray-300" />
//                 <div>
//                   <p className="font-medium text-sm">{c.name}</p>
//                   <p className="text-xs text-gray-500">{c.msg}</p>
//                 </div>
//               </div>

//               <div className="text-right">
//                 <p className="text-xs text-gray-500">{c.time}</p>
//                 {c.badge && (
//                   <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
//                     {c.badge}
//                   </span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* RIGHT CHAT AREA */}
//       <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col">
//         {/* CHAT HEADER */}
//         <div className="flex items-center justify-between px-6 py-4 border-b">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-gray-300" />
//             <div>
//               <p className="font-semibold">Wade Warren</p>
//               <p className="text-xs text-gray-500">WadeWarren202@gmail.com</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 text-gray-600">
//             <FaVideo />
//             <FaPhone />
//             <HiOutlineDotsHorizontal />
//           </div>
//         </div>

//         {/* CHAT MESSAGES */}
//         <div className="flex-1 p-6 space-y-4 overflow-auto bg-[#f7f9fc]">
//           {/* incoming */}
//           <div className="flex flex-col items-start">
//             <div className="bg-white p-3 rounded-xl shadow text-sm max-w-md">
//               Hello Sarah, I wanted to confirm my driving lesson tomorrow at
//               10:00 AM.
//             </div>
//             <span className="text-xs text-gray-400 mt-1">10:00 AM</span>
//           </div>

//           {/* outgoing */}
//           <div className="flex flex-col items-end">
//             <div className="bg-blue-100 p-3 rounded-xl text-sm max-w-md">
//               Hi Wade! Yes, your lesson is scheduled for tomorrow at 10:00 AM.
//             </div>
//             <span className="text-xs text-gray-400 mt-1">10:25 AM</span>
//           </div>

//           {/* incoming */}
//           <div className="flex flex-col items-start">
//             <div className="bg-white p-3 rounded-xl shadow text-sm max-w-md">
//               Great, thank you! Should I bring anything for the lesson?
//             </div>
//             <span className="text-xs text-gray-400 mt-1">10:32 AM</span>
//           </div>

//           {/* outgoing */}
//           <div className="flex flex-col items-end">
//             <div className="bg-blue-100 p-3 rounded-xl text-sm max-w-md">
//               Just bring your learner’s permit. We’ll practice parking and lane
//               changes tomorrow.
//             </div>
//             <div className="bg-blue-100 p-3 rounded-xl text-sm max-w-md mt-2">
//               Thank you, see you tomorrow.
//             </div>
//           </div>
//         </div>

//         {/* INPUT BAR */}
//         <div className="p-4 border-t flex items-center gap-3">
//           <BsEmojiSmile className="text-gray-500 text-xl" />
//           <IoMdAttach className="text-gray-500 text-xl" />

//           <input
//             className="flex-1 bg-gray-100 px-4 py-2 rounded-xl outline-none text-sm"
//             placeholder="Type a message..."
//           />

//           <button className="bg-blue-600 text-white p-3 rounded-xl">
//             <FaPaperPlane size={14} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import {
  FaPaperPlane,
  FaPhone,
  FaPlus,
  FaSearch,
  FaVideo,
} from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoMdAttach } from "react-icons/io";

/* -----------------------------
  DESIGN SYSTEM (compact Apple style)
------------------------------ */
const ui = {
  font: {
    h1: "text-base md:text-lg font-semibold tracking-tight",
    body: "text-sm text-gray-700",
    small: "text-xs text-gray-500",
  },
  card: "bg-white rounded-xl shadow-sm border border-gray-100",
  hover:
    "transition duration-200 ease-out hover:shadow-md hover:-translate-y-[1px]",
};

/* -----------------------------
  CHAT DATA
------------------------------ */
const chats = [
  { name: "Dianne", msg: "Hi, Wade Warren!", time: "10:00 AM" },
  {
    name: "Wade Warren",
    msg: "Hi, Wade Warren!",
    time: "10:00 AM",
    active: true,
  },
  { name: "Mitchell", msg: "Hi, Wade Warren!", time: "10:00 AM" },
  { name: "Cody", msg: "Hi, Wade Warren!", time: "10:00 AM", badge: 6 },
  { name: "Angel", msg: "Hi, Wade Warren!", time: "10:00 AM" },
  { name: "Aubrey", msg: "Hi, Wade Warren!", time: "10:00 AM", badge: 6 },
  { name: "Kristin", msg: "Hi, Wade Warren!", time: "10:00 AM" },
  { name: "Cameron", msg: "Hi, Wade Warren!", time: "10:00 AM" },
];

/* -----------------------------
  PAGE
------------------------------ */
export default function Page() {
  const [activeChat, setActiveChat] = useState("Wade Warren");

  return (
    <main className="min-h-screen w-full bg-[#F6F7FB] flex flex-col md:flex-row p-2 md:p-4 gap-2 md:gap-4 font-sans">
      {/* ================= LEFT SIDEBAR ================= */}
      <aside
        className={`w-full md:w-[300px] ${ui.card} ${ui.hover} flex flex-col overflow-hidden`}
      >
        {/* HEADER */}
        <header className="flex items-center justify-between px-3 py-3 border-b border-gray-100">
          <h1 className={ui.font.h1}>Chat Box</h1>

          <button className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition">
            <FaPlus size={11} />
          </button>
        </header>

        {/* SEARCH */}
        <div className="px-3 py-2">
          <div className="flex items-center bg-gray-100 px-2 py-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition">
            <FaSearch className="text-gray-400 mr-2 text-xs" />
            <input
              placeholder="Search"
              className="bg-transparent w-full outline-none text-sm text-gray-700"
            />
          </div>
        </div>

        {/* TABS */}
        <nav className="px-3">
          <div className="flex bg-gray-100 rounded-lg p-1 text-xs">
            <button className="flex-1 bg-white rounded-md py-1 font-medium shadow-sm">
              All
            </button>
            <button className="flex-1 text-gray-500">Active</button>
            <button className="flex-1 text-gray-500">Unread</button>
          </div>
        </nav>

        {/* CHAT LIST */}
        <section className="flex-1 overflow-auto px-2 py-2 space-y-1">
          {chats.map((c, i) => (
            <article
              key={i}
              onClick={() => setActiveChat(c.name)}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
                c.active ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-gray-300" />

                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-gray-500 truncate max-w-[120px]">
                    {c.msg}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[10px] text-gray-400">{c.time}</p>

                {c.badge && (
                  <span className="inline-block mt-1 text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full">
                    {c.badge}
                  </span>
                )}
              </div>
            </article>
          ))}
        </section>
      </aside>

      {/* ================= RIGHT CHAT ================= */}
      <section
        className={`flex-1 ${ui.card} ${ui.hover} flex flex-col overflow-hidden`}
      >
        {/* HEADER */}
        <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-300" />

            <div>
              <h2 className="text-base font-semibold tracking-tight">
                {activeChat}
              </h2>
              <p className="text-[11px] text-gray-500">
                WadeWarren202@gmail.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-500">
            <FaVideo className="hover:text-blue-600 transition cursor-pointer" />
            <FaPhone className="hover:text-blue-600 transition cursor-pointer" />
            <HiOutlineDotsHorizontal className="hover:text-gray-900 transition cursor-pointer" />
          </div>
        </header>

        {/* MESSAGES */}
        <main className="flex-1 overflow-auto p-3 md:p-5 space-y-3 bg-[#F8FAFF]">
          {/* incoming */}
          <div className="flex flex-col items-start">
            <div className="bg-white border border-gray-100 shadow-sm p-2.5 rounded-xl max-w-[90%] md:max-w-md text-sm">
              Hello Sarah, I wanted to confirm my driving lesson tomorrow at
              10:00 AM.
            </div>
            <span className="text-[10px] text-gray-400 mt-1">10:00 AM</span>
          </div>

          {/* outgoing */}
          <div className="flex flex-col items-end">
            <div className="bg-blue-100 p-2.5 rounded-xl max-w-[90%] md:max-w-md text-sm">
              Hi Wade! Yes, your lesson is scheduled for tomorrow at 10:00 AM.
            </div>
            <span className="text-[10px] text-gray-400 mt-1">10:25 AM</span>
          </div>

          {/* incoming */}
          <div className="flex flex-col items-start">
            <div className="bg-white border border-gray-100 shadow-sm p-2.5 rounded-xl max-w-[90%] md:max-w-md text-sm">
              Great, thank you! Should I bring anything for the lesson?
            </div>
            <span className="text-[10px] text-gray-400 mt-1">10:32 AM</span>
          </div>

          {/* outgoing */}
          <div className="flex flex-col items-end">
            <div className="bg-blue-100 p-2.5 rounded-xl max-w-[90%] md:max-w-md text-sm">
              Just bring your learner’s permit.
            </div>

            <div className="bg-blue-100 p-2.5 rounded-xl max-w-[90%] md:max-w-md text-sm mt-1">
              See you tomorrow.
            </div>
          </div>
        </main>

        {/* INPUT */}
        <footer className="p-2 md:p-3 border-t border-gray-100 flex items-center gap-2 bg-white">
          <BsEmojiSmile className="text-gray-500 hover:text-gray-900 transition cursor-pointer text-sm" />
          <IoMdAttach className="text-gray-500 hover:text-gray-900 transition cursor-pointer text-sm" />

          <input
            placeholder="Message..."
            className="flex-1 bg-gray-100 px-3 py-2 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500"
          />

          <button className="bg-blue-600 hover:bg-blue-700 transition text-white p-2.5 rounded-lg">
            <FaPaperPlane size={12} />
          </button>
        </footer>
      </section>
    </main>
  );
}
