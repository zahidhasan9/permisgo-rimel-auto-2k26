// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useMemo, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { FaSignOutAlt } from "react-icons/fa";

// import { logout } from "@/features/userSlice";
// import { logoutUser } from "@/features/API";

// import { BsBook } from "react-icons/bs";
// import { CiMemoPad } from "react-icons/ci";
// import {
//   FaThLarge,
//   FaUser,
//   FaBookOpen,
//   FaCalendarAlt,
//   FaGraduationCap,
//   FaFileAlt,
//   FaUniversity,
//   FaTruck,
//   FaMapMarkerAlt,
//   FaUserFriends,
//   FaFileInvoiceDollar,
//   FaSignOutAlt,
// } from "react-icons/fa";

// import { FiChevronRight, FiMenu, FiX } from "react-icons/fi";

// const menu = [
//   {
//     name: "Dashboard",
//     href: "/teacher/dashboard",
//     icon: FaThLarge,
//   },
//   {
//     name: "Personal Info",
//     icon: FaUser,
//     children: [
//       { name: "Profile", href: "/teacher/profile" },
//       { name: "Documents", href: "/teacher/documents" },
//       { name: "Reset Password", href: "/teacher/reset-password" },
//     ],
//   },
//   {
//     name: "Lessons",
//     href: "/teacher/lessons",
//     icon: FaBookOpen,
//   },
//   {
//     name: "Calendar",
//     href: "/teacher/calendar",
//     icon: FaCalendarAlt,
//   },
//   {
//     name: "Students",
//     href: "/teacher/students",
//     icon: FaGraduationCap,
//   },
//   {
//     name: "Exams",
//     href: "/teacher/exams",
//     icon: FaFileAlt,
//   },
//   {
//     name: "Account",
//     href: "/teacher/account",
//     icon: FaUniversity,
//   },
//   {
//     name: "Vehicles",
//     href: "/teacher/vehicles",
//     icon: FaTruck,
//   },
//   {
//     name: "Location",
//     href: "/teacher/location",
//     icon: FaMapMarkerAlt,
//   },
//   {
//     name: "My References",
//     href: "/teacher/references",
//     icon: FaUserFriends,
//   },
//   {
//     name: "Offers",
//     href: "/teacher/offers",
//     icon: FaFileInvoiceDollar,
//   },
//   {
//     name: "Logout",
//     action: "logout",
//     icon: FaSignOutAlt,
//   },
// ];

// export default function TeacherSidebar({ variant = "desktop", onClose }) {
//   const pathname = usePathname();

//   const [collapsed, setCollapsed] = useState(false);
//   const [hoverExpanded, setHoverExpanded] = useState(false);
//   const [openMenu, setOpenMenu] = useState(null);

//   const hoverDelayRef = useRef(null);

//   const navItems = useMemo(() => menu, []);

//   const isCollapsed = collapsed && !hoverExpanded;

//   const handleMouseEnter = () => {
//     if (!collapsed) return;

//     if (hoverDelayRef.current) {
//       clearTimeout(hoverDelayRef.current);
//     }

//     hoverDelayRef.current = setTimeout(() => {
//       setHoverExpanded(true);
//     }, 180);
//   };

//   const handleMouseLeave = () => {
//     if (hoverDelayRef.current) {
//       clearTimeout(hoverDelayRef.current);
//     }

//     if (collapsed) {
//       setHoverExpanded(false);
//     }
//   };

//   const router = useRouter();
//   const dispatch = useDispatch();

//   const handleLogout = async () => {
//     try {
//       // Backend logout endpoint call
//       await logoutUser();
//     } catch (error) {
//       console.error("Logout API error:", error);
//     } finally {
//       // Redux user state clear
//       dispatch(logout());

//       // Local token clear
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");

//       // Login page redirect
//       router.replace("/login");
//       router.refresh();
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (hoverDelayRef.current) {
//         clearTimeout(hoverDelayRef.current);
//       }
//     };
//   }, []);

//   if (variant === "mobile") {
//     return (
//       <aside className="flex h-full w-72 flex-col bg-white">
//         {/* MOBILE HEADER */}
//         <div className="flex shrink-0 items-center justify-between border-b p-4">
//           <h2 className="font-bold text-gray-800">Teacher Panel</h2>

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
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       className={`hidden h-screen flex-col overflow-hidden border-r bg-white transition-all delay-75 duration-500 ease-in-out md:flex ${
//         isCollapsed ? "w-20" : "w-72"
//       }`}
//     >
//       {/* DESKTOP HEADER */}
//       <div className="flex shrink-0 items-center justify-between border-b p-4">
//         {!isCollapsed && (
//           <h2 className="whitespace-nowrap font-bold text-gray-800 transition-opacity delay-150 duration-300">
//             Teacher Panel
//           </h2>
//         )}

//         <button
//           type="button"
//           onClick={() => {
//             setCollapsed(!collapsed);
//             setHoverExpanded(false);
//           }}
//           className="rounded-lg p-2 hover:bg-gray-100"
//           aria-label="Toggle sidebar"
//         >
//           <FiMenu />
//         </button>
//       </div>

//       {/* DESKTOP SCROLLABLE MENU */}
//       <div className="min-h-0 flex-1 overflow-y-auto px-2 py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
//         <DesktopNav
//           items={navItems}
//           pathname={pathname}
//           collapsed={isCollapsed}
//           openMenu={openMenu}
//           setOpenMenu={setOpenMenu}
//         />
//       </div>

//       {/* DESKTOP BOTTOM SUBSCRIPTION CARD */}
//       {!isCollapsed && (
//         <div className="shrink-0 border-t bg-white p-4 transition-opacity delay-150 duration-300">
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
//               className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 transition duration-300 ${
//                 isActive
//                   ? "bg-blue-900 text-white"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               {Icon && <Icon size={18} className="shrink-0" />}

//               {!collapsed && (
//                 <span className="whitespace-nowrap text-sm font-medium transition-opacity delay-150 duration-300">
//                   {item.name}
//                 </span>
//               )}
//             </Link>
//           );
//         }

//         return (
//           <div key={item.name}>
//             <button
//               type="button"
//               onClick={() => setOpenMenu(isOpen ? null : item.name)}
//               className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 transition duration-300 ${
//                 isActive
//                   ? "bg-blue-900 text-white"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               {Icon && <Icon size={18} className="shrink-0" />}

//               {!collapsed && (
//                 <>
//                   <span className="flex-1 whitespace-nowrap text-left text-sm font-medium transition-opacity delay-150 duration-300">
//                     {item.name}
//                   </span>

//                   <FiChevronRight
//                     className={`shrink-0 transition-transform duration-300 ${
//                       isOpen ? "rotate-90" : ""
//                     }`}
//                   />
//                 </>
//               )}
//             </button>

//             {isOpen && !collapsed && (
//               <div className="ml-6 mt-1 space-y-1 border-l pl-3 transition-all delay-150 duration-300">
//                 {item.children.map((child) => (
//                   <Link
//                     key={child.href}
//                     href={child.href}
//                     className={`block rounded-lg px-3 py-2 text-sm transition duration-300 ${
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
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { logout } from "@/features/userSlice";
import { logoutUser } from "@/features/API";

import {
  FaBookOpen,
  FaCalendarAlt,
  FaFileAlt,
  FaFileInvoiceDollar,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaThLarge,
  FaTruck,
  FaUniversity,
  FaUser,
  FaUserFriends,
} from "react-icons/fa";
import { FiChevronRight, FiMenu, FiX } from "react-icons/fi";

const menu = [
  {
    name: "Dashboard",
    href: "/teacher/dashboard",
    icon: FaThLarge,
  },
  {
    name: "Personal Info",
    icon: FaUser,
    children: [
      { name: "Profile", href: "/teacher/profile" },
      { name: "Documents", href: "/teacher/documents" },
      { name: "Reset Password", href: "/teacher/reset-password" },
    ],
  },
  {
    name: "Lessons",
    href: "/teacher/lessons",
    icon: FaBookOpen,
  },
  {
    name: "Calendar",
    href: "/teacher/calendar",
    icon: FaCalendarAlt,
  },
  {
    name: "Students",
    href: "/teacher/students",
    icon: FaGraduationCap,
  },
  {
    name: "Exams",
    href: "/teacher/exams",
    icon: FaFileAlt,
  },
  {
    name: "Account",
    href: "/teacher/account",
    icon: FaUniversity,
  },
  {
    name: "Vehicles",
    href: "/teacher/vehicles",
    icon: FaTruck,
  },
  {
    name: "Location",
    href: "/teacher/location",
    icon: FaMapMarkerAlt,
  },
  {
    name: "My References",
    href: "/teacher/references",
    icon: FaUserFriends,
  },
  {
    name: "Offers",
    href: "/teacher/offers",
    icon: FaFileInvoiceDollar,
  },
  {
    name: "Logout",
    action: "logout",
    icon: FaSignOutAlt,
  },
];

export default function TeacherSidebar({ variant = "desktop", onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const [hoverExpanded, setHoverExpanded] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const hoverDelayRef = useRef(null);
  const navItems = useMemo(() => menu, []);

  const isCollapsed = collapsed && !hoverExpanded;

  const handleMouseEnter = () => {
    if (!collapsed) return;

    if (hoverDelayRef.current) {
      clearTimeout(hoverDelayRef.current);
    }

    hoverDelayRef.current = setTimeout(() => {
      setHoverExpanded(true);
    }, 180);
  };

  const handleMouseLeave = () => {
    if (hoverDelayRef.current) {
      clearTimeout(hoverDelayRef.current);
    }

    if (collapsed) {
      setHoverExpanded(false);
    }
  };

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      // Clears the backend authentication cookie/session.
      await logoutUser();
    } catch (error) {
      // Local logout must still complete if the API request fails.
      console.error("Logout API error:", error);
    } finally {
      // Clear Redux authentication state.
      dispatch(logout());

      // Clear any locally stored authentication information.
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("user");

      onClose?.();

      // Prevent returning to protected pages through normal navigation.
      router.replace("/login");
      router.refresh();
    }
  };

  useEffect(() => {
    return () => {
      if (hoverDelayRef.current) {
        clearTimeout(hoverDelayRef.current);
      }
    };
  }, []);

  if (variant === "mobile") {
    return (
      <aside className="flex h-full w-72 flex-col bg-white">
        {/* MOBILE HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b p-4">
          <h2 className="font-bold text-gray-800">Teacher Panel</h2>

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`hidden h-screen flex-col overflow-hidden border-r bg-white transition-all delay-75 duration-500 ease-in-out md:flex ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      {/* DESKTOP HEADER */}
      <div className="flex shrink-0 items-center justify-between border-b p-4">
        {!isCollapsed && (
          <h2 className="whitespace-nowrap font-bold text-gray-800 transition-opacity delay-150 duration-300">
            Teacher Panel
          </h2>
        )}

        <button
          type="button"
          onClick={() => {
            setCollapsed(!collapsed);
            setHoverExpanded(false);
          }}
          className="rounded-lg p-2 hover:bg-gray-100"
          aria-label="Toggle sidebar"
        >
          <FiMenu />
        </button>
      </div>

      {/* DESKTOP SCROLLABLE MENU */}
      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <DesktopNav
          items={navItems}
          pathname={pathname}
          collapsed={isCollapsed}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          onLogout={handleLogout}
          loggingOut={loggingOut}
        />
      </div>

      {/* DESKTOP BOTTOM SUBSCRIPTION CARD */}
      {!isCollapsed && (
        <div className="shrink-0 border-t bg-white p-4 transition-opacity delay-150 duration-300">
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

        // Logout is an action button, not a navigation link.
        if (item.action === "logout") {
          return (
            <button
              key={item.name}
              type="button"
              onClick={onLogout}
              disabled={loggingOut}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-red-600 transition duration-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 ${
                collapsed ? "justify-center" : ""
              }`}
              title={collapsed ? item.name : undefined}
            >
              {Icon && <Icon size={18} className="shrink-0" />}

              {!collapsed && (
                <span className="whitespace-nowrap text-sm font-medium transition-opacity delay-150 duration-300">
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
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 transition duration-300 ${
                isActive
                  ? "bg-blue-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {Icon && <Icon size={18} className="shrink-0" />}

              {!collapsed && (
                <span className="whitespace-nowrap text-sm font-medium transition-opacity delay-150 duration-300">
                  {item.name}
                </span>
              )}
            </Link>
          );
        }

        return (
          <div key={item.name}>
            <button
              type="button"
              onClick={() => setOpenMenu(isOpen ? null : item.name)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 transition duration-300 ${
                isActive
                  ? "bg-blue-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {Icon && <Icon size={18} className="shrink-0" />}

              {!collapsed && (
                <>
                  <span className="flex-1 whitespace-nowrap text-left text-sm font-medium transition-opacity delay-150 duration-300">
                    {item.name}
                  </span>

                  <FiChevronRight
                    className={`shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  />
                </>
              )}
            </button>

            {isOpen && !collapsed && (
              <div className="ml-6 mt-1 space-y-1 border-l pl-3 transition-all delay-150 duration-300">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={`block rounded-lg px-3 py-2 text-sm transition duration-300 ${
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

        // Logout is an action button, not a navigation link.
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
