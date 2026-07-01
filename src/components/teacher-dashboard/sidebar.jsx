// "use client";

// import { useState } from "react";

// import {
//   FaThLarge,
//   FaUser,
//   FaCar,
//   FaMapMarkerAlt,
//   FaBookOpen,
//   FaCalendarAlt,
//   FaUsers,
//   FaClipboardCheck,
//   FaWallet,
//   FaLink,
//   FaGift,
//   FaSignOutAlt,
//   FaFileAlt,
//   FaLock,
// } from "react-icons/fa";

// const menuItems = [
//   { id: "dashboard", label: "Dashboard", icon: <FaThLarge /> },

//   {
//     id: "personal",
//     label: "Personal Info",
//     icon: <FaUser />,
//     children: [
//       { id: "profile",label: "Profile",icon: <FaFileAlt />},
//       { id: "my-document", label: "My Document", icon: <FaFileAlt /> },
//       { id: "reset-password", label: "Reset Password", icon: <FaLock /> },
//     ],
//   },
//   //n

//   { id: "vehicles", label: "Vehicles", icon: <FaCar /> },
//   { id: "location", label: "Location", icon: <FaMapMarkerAlt /> },
//   { id: "lessons", label: "Lessons", icon: <FaBookOpen /> },
//   { id: "calendar", label: "Calendar", icon: <FaCalendarAlt /> },
//   { id: "students", label: "Students", icon: <FaUsers /> },
//   { id: "exams", label: "Exams", icon: <FaClipboardCheck /> },
//   { id: "account", label: "Account", icon: <FaWallet /> },
//   { id: "references", label: "My References", icon: <FaLink /> },
//   { id: "offers", label: "Offers", icon: <FaGift /> },

// ];

// export default function Sidebar({ activeTab, setActiveTab }) {
//   const [openMenu, setOpenMenu] = useState(null);

//   const toggleMenu = (id) => {
//     setOpenMenu(openMenu === id ? null : id);
//   };

//   return (
//     <aside className="sidebar">
//       <div className="sidebar-menu">

//         {menuItems.map((item) => (
//           <div key={item.id}>
//             {/* MAIN MENU */}
//             <button
//               type="button"
//               onClick={() => {
//                 if (item.children) {
//                   toggleMenu(item.id);
//                 } else {
//                   setActiveTab(item.id);
//                 }
//               }}
//               className={`sidebar-btn ${
//                 activeTab === item.id ? "active" : ""
//               }`}
//             >
//               <span className="sidebar-icon">{item.icon}</span>
//               <span>{item.label}</span>

//               {item.children && <span className="ms-auto arrow">›</span>}
//             </button>

//             {/* SUB MENU */}
//             {item.children && openMenu === item.id && (
//               <div className="submenu">
//                 {item.children.map((child) => (
//                   <button
//                     key={child.id}
//                     type="button"
//                     className={`sidebar-sub-btn ${
//                       activeTab === child.id ? "active" : ""
//                     }`}
//                     onClick={() => setActiveTab(child.id)}
//                   >
//                     <span className="sidebar-icon">{child.icon}</span>
//                     <span>{child.label}</span>
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}

//         {/* LOGOUT */}
//         <button type="button" className="sidebar-btn logout-btn">
//           <span className="sidebar-icon">
//             <FaSignOutAlt />
//           </span>
//           <span>Logout</span>
//         </button>

//       </div>

//       <div className="subscription-card">
//         <h6>Subscription</h6>
//         <p>Explore 20+ Feature with Lifetime Membership</p>
//         <button type="button">Upgrade Now</button>
//       </div>
//     </aside>
//   );
// }

"use client";

import { useState } from "react";

import {
  FaBookOpen,
  FaCalendarAlt,
  FaCar,
  FaClipboardCheck,
  FaFileAlt,
  FaGift,
  FaLink,
  FaLock,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaThLarge,
  FaUser,
  FaUsers,
  FaWallet,
} from "react-icons/fa";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: <FaThLarge /> },

  {
    id: "personal",
    label: "Personal Info",
    icon: <FaUser />,
    children: [
      { id: "profile", label: "Profile", icon: <FaFileAlt /> },
      { id: "my-document", label: "My Document", icon: <FaFileAlt /> },
      { id: "reset-password", label: "Reset Password", icon: <FaLock /> },
    ],
  },

  { id: "vehicles", label: "Vehicles", icon: <FaCar /> },
  { id: "location", label: "Location", icon: <FaMapMarkerAlt /> },
  { id: "lessons", label: "Lessons", icon: <FaBookOpen /> },
  { id: "calendar", label: "Calendar", icon: <FaCalendarAlt /> },
  { id: "students", label: "Students", icon: <FaUsers /> },
  { id: "exams", label: "Exams", icon: <FaClipboardCheck /> },
  { id: "account", label: "Account", icon: <FaWallet /> },
  { id: "references", label: "My References", icon: <FaLink /> },
  { id: "offers", label: "Offers", icon: <FaGift /> },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  };

  const isChildActive = (item) => {
    return item.children?.some((child) => child.id === activeTab);
  };

  return (
    <aside className="flex h-screen w-[245px] shrink-0 flex-col justify-between border-r-[14px] border-slate-50 bg-white p-[18px] max-md:h-auto max-md:w-full max-md:border-r-0 max-md:border-b-[10px] max-md:border-b-slate-100">
      {/* Menu */}
      <div className="max-h-[calc(100vh-210px)] overflow-y-auto pr-1 max-md:max-h-[340px]">
        {menuItems.map((item) => {
          const parentActive = activeTab === item.id || isChildActive(item);
          const isOpen = openMenu === item.id || isChildActive(item);

          return (
            <div key={item.id}>
              {/* Main Menu Button */}
              <button
                type="button"
                onClick={() => {
                  if (item.children) {
                    toggleMenu(item.id);
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`mb-[10px] flex min-h-[42px] w-full items-center gap-[10px] rounded-lg px-[14px] text-sm font-semibold transition-all duration-300 ${
                  parentActive
                    ? "bg-[#1c4b9b] text-white shadow-sm"
                    : "bg-[#e6ecf5] text-[#16458f] hover:bg-[#1c4b9b] hover:text-white"
                }`}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[16px]">
                  {item.icon}
                </span>

                <span className="truncate">{item.label}</span>

                {item.children && (
                  <span
                    className={`ml-auto text-2xl leading-none transition-transform duration-300 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  >
                    ›
                  </span>
                )}
              </button>

              {/* Sub Menu */}
              {item.children && isOpen && (
                <div className="mb-[10px] ml-5 mt-[-4px] border-l-2 border-[#e6ecf5] pl-[10px]">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      type="button"
                      onClick={() => setActiveTab(child.id)}
                      className={`mb-[6px] flex w-full items-center gap-[10px] rounded-md px-3 py-2 text-left text-[13px] font-medium transition-all duration-300 ${
                        activeTab === child.id
                          ? "bg-[#1c4b9b] text-white"
                          : "bg-[#f5f7fb] text-slate-700 hover:bg-[#1c4b9b] hover:text-white"
                      }`}
                    >
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center text-[13px]">
                        {child.icon}
                      </span>

                      <span className="truncate">{child.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Logout */}
        <button
          type="button"
          className="mt-1 flex min-h-[42px] w-full items-center gap-[10px] rounded-lg bg-[#e6ecf5] px-[14px] text-sm font-semibold text-[#16458f] transition-all duration-300 hover:bg-rose-600 hover:text-white"
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[16px]">
            <FaSignOutAlt />
          </span>
          <span>Logout</span>
        </button>
      </div>

      {/* Subscription Card */}
      <div className="mt-5 rounded-xl bg-[#1c4b9b] px-4 py-5 text-center text-white max-md:hidden">
        <h6 className="mb-3 text-sm font-bold">Subscription</h6>

        <p className="mb-4 text-xs leading-5 text-white/85">
          Explore 20+ Feature with Lifetime Membership
        </p>

        <button
          type="button"
          className="rounded-lg bg-rose-600 px-5 py-2 text-xs font-bold text-white transition hover:bg-rose-700"
        >
          Upgrade Now
        </button>
      </div>
    </aside>
  );
}
