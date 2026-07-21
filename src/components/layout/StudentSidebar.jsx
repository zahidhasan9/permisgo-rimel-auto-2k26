// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useMemo, useState } from "react";

// import { BsBook } from "react-icons/bs";
// import { CiMemoPad } from "react-icons/ci";
// import {
//   FaAddressBook,
//   FaCar,
//   FaSignOutAlt,
//   FaTag,
//   FaUser,
// } from "react-icons/fa";
// import { RiSteering2Fill } from "react-icons/ri";

// import { FiChevronRight, FiMenu, FiX } from "react-icons/fi";
// import { HiAcademicCap } from "react-icons/hi";
// import { IoIosChatboxes } from "react-icons/io";
// import {
//   MdAccountTree,
//   MdDashboard,
//   MdOutlineTraffic,
//   MdSupportAgent,
// } from "react-icons/md";

// const menu = [
//   { name: "Dashboard", href: "/student/dashboard", icon: MdDashboard },

//   {
//     name: "Personal Info",
//     icon: FaUser,
//     children: [
//       { name: "Profile", href: "/student/profile" },
//       { name: "Documents", href: "/student/documents" },
//       { name: "Reset Password", href: "/student/profile/reset-password" },
//       { name: "Purchases", href: "/student/profile/purchases" },
//       { name: "Booklet", href: "/student/profile/booklet" },
//       { name: "Account", href: "/student/accounting/invoice" },
//     ],
//   },

//   // {
//   //   name: "Academic Info",
//   //   icon: HiAcademicCap,
//   //   children: [
//   //     { name: "Live Coding", href: "/student/academic-Info/live-coding" },
//   //     { name: "Exam Topic", href: "/student/academic-Info/exam-topic" },
//   //     {
//   //       name: "Knowledge Sheets",
//   //       href: "/student/academic-Info/knowledge-sheets",
//   //     },
//   //     { name: "Road Signs", href: "/student/academic-Info/road-signs" },
//   //   ],
//   // },

//   {
//     name: "Driving Operation",
//     icon: FaCar,
//     children: [
//       {
//         name: "Driving Dashboard",
//         href: "/student/driving-operation/driving-dashboard",
//       },
//       {
//         name: "Planning",
//         href: "/student/driving-operation/planning",
//       },
//       {
//         name: "Instructors",
//         href: "/student/driving-operation/instructors",
//       },
//       {
//         name: "Location",
//         href: "/student/driving-operation/book-lesson",
//       },
//     ],
//   },

//   { name: "Code de la", href: "/student/code", icon: RiSteering2Fill },
//   { name: "Offers", href: "/student/offers", icon: FaTag },
//   { name: "Traffic Law", href: "/student/traffic-law", icon: MdOutlineTraffic },
//   { name: "Book Driving", href: "/student/book-driving", icon: FaAddressBook },
//   { name: "Referral", href: "/student/referral", icon: BsBook },
//   { name: "Support", href: "/student/support", icon: MdSupportAgent },
//   { name: "Chat", href: "/chat", icon: IoIosChatboxes },
//   // { name: "Logout", href: "/logout", icon: FaSignOutAlt },
// ];

// export default function StudentSidebar({ variant = "desktop", onClose }) {
//   const pathname = usePathname();

//   const [collapsed, setCollapsed] = useState(false);
//   const [openMenu, setOpenMenu] = useState(null);

//   const navItems = useMemo(() => menu, []);

//   if (variant === "mobile") {
//     return (
//       <aside className="flex h-full w-72 flex-col bg-white">
//         {/* MOBILE HEADER */}
//         <div className="flex shrink-0 items-center justify-between border-b p-4">
//           <h2 className="font-bold text-gray-800">Student Panel</h2>

//           <button
//             type="button"
//             onClick={onClose}
//             className="rounded-lg p-2 hover:bg-gray-100"
//             aria-label="Close sidebar"
//           >
//             <FiX size={22} />
//           </button>
//         </div>

//         {/* MOBILE MENU */}
//         <div className="min-h-0 flex-1 overflow-y-auto p-3">
//           <MobileNav items={navItems} pathname={pathname} onClose={onClose} />
//         </div>
//       </aside>
//     );
//   }

//   return (
//     <aside
//       className={`hidden h-screen flex-col border-r bg-white transition-all duration-300 md:flex ${
//         collapsed ? "w-20" : "w-72"
//       }`}
//     >
//       {/* DESKTOP HEADER */}
//       <div className="flex shrink-0 items-center justify-between border-b p-4">
//         {!collapsed && (
//           <h2 className="font-bold text-gray-800">Student Panel</h2>
//         )}

//         <button
//           type="button"
//           onClick={() => setCollapsed(!collapsed)}
//           className="rounded-lg p-2 hover:bg-gray-100"
//           aria-label="Toggle sidebar"
//         >
//           <FiMenu />
//         </button>
//       </div>

//       {/* DESKTOP SCROLLABLE MENU */}
//       <div className="min-h-0 flex-1 overflow-y-auto px-2 py-3">
//         <DesktopNav
//           items={navItems}
//           pathname={pathname}
//           collapsed={collapsed}
//           openMenu={openMenu}
//           setOpenMenu={setOpenMenu}
//         />
//       </div>

//       {/* DESKTOP BOTTOM SUBSCRIPTION CARD */}
//       {!collapsed && (
//         <div className="shrink-0 border-t bg-white p-4">
//           <div className="rounded-2xl bg-blue-900 p-4 text-center text-white">
//             <p className="mb-1 text-xs">Subscription</p>
//             <p className="mb-3 text-[11px] text-blue-100">
//               Explore Premium Features
//             </p>

//             <button
//               type="button"
//               className="w-full rounded-lg bg-red-500 py-2 text-sm"
//             >
//               Upgrade Now
//             </button>
//           </div>
//         </div>
//       )}
//     </aside>
//   );
// }

// function DesktopNav({ items, pathname, collapsed, openMenu, setOpenMenu }) {
//   return (
//     <nav className="space-y-1">
//       {items.map((item) => {
//         const Icon = item.icon;

//         const isActive =
//           pathname === item.href ||
//           item.children?.some((child) => pathname === child.href);

//         const isOpen = openMenu === item.name;

//         if (!item.children) {
//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 transition ${
//                 isActive
//                   ? "bg-blue-900 text-white"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               {Icon && <Icon size={18} />}

//               {!collapsed && (
//                 <span className="text-sm font-medium">{item.name}</span>
//               )}
//             </Link>
//           );
//         }

//         return (
//           <div key={item.name}>
//             <button
//               type="button"
//               onClick={() => setOpenMenu(isOpen ? null : item.name)}
//               className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 transition ${
//                 isActive
//                   ? "bg-blue-900 text-white"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               {Icon && <Icon size={18} />}

//               {!collapsed && (
//                 <>
//                   <span className="flex-1 text-left text-sm font-medium">
//                     {item.name}
//                   </span>

//                   <FiChevronRight
//                     className={`transition-transform ${
//                       isOpen ? "rotate-90" : ""
//                     }`}
//                   />
//                 </>
//               )}
//             </button>

//             {isOpen && !collapsed && (
//               <div className="ml-6 mt-1 space-y-1 border-l pl-3">
//                 {item.children.map((child) => (
//                   <Link
//                     key={child.href}
//                     href={child.href}
//                     className={`block rounded-lg px-3 py-2 text-sm ${
//                       pathname === child.href
//                         ? "bg-blue-100 font-medium text-blue-900"
//                         : "text-gray-600 hover:bg-gray-100"
//                     }`}
//                   >
//                     {child.name}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </nav>
//   );
// }

// function MobileNav({ items, pathname, onClose }) {
//   const [open, setOpen] = useState(null);

//   return (
//     <nav className="space-y-2">
//       {items.map((item) => {
//         const Icon = item.icon;
//         const isOpen = open === item.name;

//         const isActive =
//           pathname === item.href ||
//           item.children?.some((child) => pathname === child.href);

//         if (!item.children) {
//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               onClick={onClose}
//               className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm ${
//                 isActive
//                   ? "bg-blue-900 text-white"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               {Icon && <Icon size={18} />}
//               <span>{item.name}</span>
//             </Link>
//           );
//         }

//         return (
//           <div key={item.name}>
//             <button
//               type="button"
//               onClick={() => setOpen(isOpen ? null : item.name)}
//               className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm ${
//                 isActive
//                   ? "bg-blue-100 text-blue-900"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               {Icon && <Icon size={18} />}
//               <span className="flex-1 text-left">{item.name}</span>

//               <FiChevronRight
//                 className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
//               />
//             </button>

//             {isOpen && (
//               <div className="ml-6 mt-1 space-y-1 border-l pl-3">
//                 {item.children.map((child) => (
//                   <Link
//                     key={child.href}
//                     href={child.href}
//                     onClick={onClose}
//                     className={`block rounded-lg px-3 py-2 text-sm ${
//                       pathname === child.href
//                         ? "bg-blue-900 text-white"
//                         : "text-gray-600 hover:bg-gray-100"
//                     }`}
//                   >
//                     {child.name}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </nav>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { logout } from "@/features/userSlice";
import { logoutUser } from "@/features/API";

import { BsBook } from "react-icons/bs";
import {
  FaAddressBook,
  FaCar,
  FaSignOutAlt,
  FaTag,
  FaUser,
} from "react-icons/fa";
import { RiSteering2Fill } from "react-icons/ri";

import { FiChevronRight, FiMenu, FiX } from "react-icons/fi";
import { IoIosChatboxes } from "react-icons/io";
import { MdDashboard, MdOutlineTraffic, MdSupportAgent } from "react-icons/md";

const menu = [
  {
    name: "Dashboard",
    href: "/student/dashboard",
    icon: MdDashboard,
  },

  {
    name: "Personal Info",
    icon: FaUser,
    children: [
      {
        name: "Profile",
        href: "/student/profile",
      },
      {
        name: "Documents",
        href: "/student/documents",
      },
      {
        name: "Reset Password",
        href: "/student/profile/reset-password",
      },
      {
        name: "Purchases",
        href: "/student/profile/purchases",
      },
      {
        name: "Booklet",
        href: "/student/profile/booklet",
      },
      {
        name: "Account",
        href: "/student/accounting/invoice",
      },
    ],
  },

  {
    name: "Driving Operation",
    icon: FaCar,
    children: [
      {
        name: "Driving Dashboard",
        href: "/student/driving-operation/driving-dashboard",
      },
      {
        name: "Planning",
        href: "/student/driving-operation/planning",
      },
      {
        name: "Lessons",
        href: "/student/lessons",
      },
      {
        name: "Instructors",
        href: "/student/driving-operation/instructors",
      },
      {
        name: "Book Teacher",
        href: "/student/driving-operation/book-lesson",
      },
    ],
  },

  {
    name: "Code de la",
    href: "/student/code",
    icon: RiSteering2Fill,
  },
  {
    name: "Offers",
    href: "/student/offers",
    icon: FaTag,
  },
  // {
  //   name: "Traffic Law",
  //   href: "/student/traffic-law",
  //   icon: MdOutlineTraffic,
  // },
  // {
  //   name: "Book Driving",
  //   href: "/student/book-driving",
  //   icon: FaAddressBook,
  // },
  {
    name: "Referral",
    href: "/student/referral",
    icon: BsBook,
  },
  {
    name: "Support",
    href: "/student/support",
    icon: MdSupportAgent,
  },
  {
    name: "Chat",
    href: "/chat",
    icon: IoIosChatboxes,
  },
  {
    name: "Logout",
    action: "logout",
    icon: FaSignOutAlt,
  },
];

export default function StudentSidebar({ variant = "desktop", onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const navItems = useMemo(() => menu, []);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      // Clear backend cookie/session.
      await logoutUser();
    } catch (error) {
      // Local logout must still work if the API request fails.
      console.error("Logout API error:", error);
    } finally {
      // Clear Redux authentication state.
      dispatch(logout());

      // Clear local authentication data.
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("user");

      // Close mobile sidebar when logout is clicked.
      onClose?.();

      // Redirect to login and refresh protected layouts.
      router.replace("/login");
      router.refresh();
    }
  };

  if (variant === "mobile") {
    return (
      <aside className="flex h-full w-72 flex-col bg-white">
        {/* MOBILE HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b p-4">
          <h2 className="font-bold text-gray-800">Student Panel</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* MOBILE MENU */}
        <div className="min-h-0 flex-1 overflow-y-auto p-3">
          <MobileNav
            items={navItems}
            pathname={pathname}
            onClose={onClose}
            onLogout={handleLogout}
            loggingOut={loggingOut}
          />
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={`hidden h-screen flex-col border-r bg-white transition-all duration-300 md:flex ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* DESKTOP HEADER */}
      <div className="flex shrink-0 items-center justify-between border-b p-4">
        {!collapsed && (
          <h2 className="font-bold text-gray-800">Student Panel</h2>
        )}

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-2 hover:bg-gray-100"
          aria-label="Toggle sidebar"
        >
          <FiMenu />
        </button>
      </div>

      {/* DESKTOP SCROLLABLE MENU */}
      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-3">
        <DesktopNav
          items={navItems}
          pathname={pathname}
          collapsed={collapsed}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          onLogout={handleLogout}
          loggingOut={loggingOut}
        />
      </div>

      {/* DESKTOP BOTTOM SUBSCRIPTION CARD */}
      {!collapsed && (
        <div className="shrink-0 border-t bg-white p-4">
          <div className="rounded-2xl bg-blue-900 p-4 text-center text-white">
            <p className="mb-1 text-xs">Subscription</p>
            <p className="mb-3 text-[11px] text-blue-100">
              Explore Premium Features
            </p>

            <button
              type="button"
              className="w-full rounded-lg bg-red-500 py-2 text-sm"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}

function DesktopNav({
  items,
  pathname,
  collapsed,
  openMenu,
  setOpenMenu,
  onLogout,
  loggingOut,
}) {
  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;

        const isActive =
          pathname === item.href ||
          item.children?.some((child) => pathname === child.href);

        const isOpen = openMenu === item.name;

        // Logout is an action button, not a Link.
        if (item.action === "logout") {
          return (
            <button
              key={item.name}
              type="button"
              onClick={onLogout}
              disabled={loggingOut}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 ${
                collapsed ? "justify-center" : ""
              }`}
              title={collapsed ? item.name : undefined}
            >
              {Icon && <Icon size={18} className="shrink-0" />}

              {!collapsed && (
                <span className="text-sm font-medium">
                  {loggingOut ? "Logging out..." : item.name}
                </span>
              )}
            </button>
          );
        }

        if (!item.children) {
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 transition ${
                isActive
                  ? "bg-blue-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {Icon && <Icon size={18} />}

              {!collapsed && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </Link>
          );
        }

        return (
          <div key={item.name}>
            <button
              type="button"
              onClick={() => setOpenMenu(isOpen ? null : item.name)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 transition ${
                isActive
                  ? "bg-blue-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {Icon && <Icon size={18} />}

              {!collapsed && (
                <>
                  <span className="flex-1 text-left text-sm font-medium">
                    {item.name}
                  </span>

                  <FiChevronRight
                    className={`transition-transform ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  />
                </>
              )}
            </button>

            {isOpen && !collapsed && (
              <div className="ml-6 mt-1 space-y-1 border-l pl-3">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={`block rounded-lg px-3 py-2 text-sm ${
                      pathname === child.href
                        ? "bg-blue-100 font-medium text-blue-900"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

function MobileNav({ items, pathname, onClose, onLogout, loggingOut }) {
  const [open, setOpen] = useState(null);

  return (
    <nav className="space-y-2">
      {items.map((item) => {
        const Icon = item.icon;
        const isOpen = open === item.name;

        const isActive =
          pathname === item.href ||
          item.children?.some((child) => pathname === child.href);

        // Logout is an action button, not a Link.
        if (item.action === "logout") {
          return (
            <button
              key={item.name}
              type="button"
              onClick={onLogout}
              disabled={loggingOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {Icon && <Icon size={18} />}
              <span>{loggingOut ? "Logging out..." : item.name}</span>
            </button>
          );
        }

        if (!item.children) {
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm ${
                isActive
                  ? "bg-blue-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {Icon && <Icon size={18} />}
              <span>{item.name}</span>
            </Link>
          );
        }

        return (
          <div key={item.name}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : item.name)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm ${
                isActive
                  ? "bg-blue-100 text-blue-900"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {Icon && <Icon size={18} />}
              <span className="flex-1 text-left">{item.name}</span>

              <FiChevronRight
                className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
              />
            </button>

            {isOpen && (
              <div className="ml-6 mt-1 space-y-1 border-l pl-3">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onClose}
                    className={`block rounded-lg px-3 py-2 text-sm ${
                      pathname === child.href
                        ? "bg-blue-900 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
