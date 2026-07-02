"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

// React Icons
import { BsBook } from "react-icons/bs";
import { CiMemoPad } from "react-icons/ci";
import {
  FaAddressBook,
  FaCar,
  FaSignOutAlt,
  FaTag,
  FaUser,
} from "react-icons/fa";

import { FiChevronRight, FiMenu, FiX } from "react-icons/fi";
import { HiAcademicCap } from "react-icons/hi";
import { IoIosChatboxes } from "react-icons/io";
import {
  MdAccountTree,
  MdDashboard,
  MdOutlineTraffic,
  MdSupportAgent,
} from "react-icons/md";
import { RiChatHistoryLine } from "react-icons/ri";

const menu = [
  { name: "Dashboard", href: "/student/dashboard", icon: MdDashboard },

  {
    name: "Personal Info",
    icon: FaUser,
    children: [
      { name: "Profile", href: "/student/profile" },
      { name: "Documents", href: "/student/documents" },
      { name: "Reset Password", href: "/student/profile/reset-password" },
      { name: "Purchases", href: "/student/profile/purchases" },
      { name: "Booklet", href: "/student/profile/booklet" },
      // { name: "Accounting", href: "/student/accounting" },
    ],
  },

  {
    name: "Take Test ",
    icon: CiMemoPad,
    children: [{ name: "Take Test", href: "/student/test" }],
  },

  {
    name: "Academic Info",
    icon: HiAcademicCap,
    children: [
      { name: "Live Coding", href: "/student/academic-Info/live-coding" },
      { name: "Exam Topic", href: "/student/academic-Info/exam-topic" },
      {
        name: "Knowledge Sheets",
        href: "/student/academic-Info/knowledge-sheets",
      },
      { name: "Road Signs", href: "/student/academic-Info/road-signs" },
    ],
  },

  {
    name: "Account Info",
    icon: MdAccountTree,
    children: [{ name: "Invoice", href: "/student/accounting/invoice" }],
  },

  {
    name: "Driving Info",
    icon: FaCar,
    children: [
      {
        name: "Driving Dashboard",
        href: "/student/driving-info/driving-dashboard",
      },
      {
        name: "Planning",
        href: "/student/driving-info/planning",
      },
      {
        name: "Instructors",
        href: "/student/driving-info/instructors",
      },
      {
        name: "Location",
        href: "/student/driving-info/book-lesson",
      },
    ],
  },

  { name: "My History", href: "/student/my-history", icon: RiChatHistoryLine },
  { name: "Offers", href: "/student/offers", icon: FaTag },
  { name: "Driving Info", href: "/student/driving-info", icon: FaCar },
  { name: "Traffic Law", href: "/student/traffic-law", icon: MdOutlineTraffic },
  { name: "Book Driving", href: "/student/book-driving", icon: FaAddressBook },
  { name: "Referral", href: "/student/referral", icon: BsBook },
  { name: "Support", href: "/student/support", icon: MdSupportAgent },
  { name: "Chat", href: "/chat", icon: IoIosChatboxes },
  { name: "Logout", href: "/logout", icon: FaSignOutAlt },
];

export default function StudentSidebar() {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const navItems = useMemo(() => menu, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ================= MOBILE TOP BAR ================= */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileOpen(true)}>
            <FiMenu size={22} />
          </button>
          <h2 className="font-bold text-gray-800">Student Panel</h2>
        </div>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="fixed left-0 top-0 h-full w-72 bg-white z-50 p-4"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold">Menu</h2>
                <button onClick={() => setMobileOpen(false)}>
                  <FiX size={22} />
                </button>
              </div>

              <MobileNav items={navItems} pathname={pathname} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className={`hidden md:flex flex-col justify-between h-screen bg-white border-r transition-all duration-300 ${
          collapsed ? "w-20" : "w-72"
        }`}
      >
        <div>
          <div className="flex items-center justify-between p-4">
            {!collapsed && (
              <h2 className="font-bold text-gray-800">Student Panel</h2>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <FiMenu />
            </button>
          </div>

          <DesktopNav
            items={navItems}
            pathname={pathname}
            collapsed={collapsed}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          />
        </div>

        {!collapsed && (
          <div className="m-4 bg-blue-900 text-white rounded-2xl p-4 text-center">
            <p className="text-xs mb-1">Subscription</p>
            <p className="text-[11px] text-blue-100 mb-3">
              Explore Premium Features
            </p>

            <button className="bg-red-500 w-full py-2 rounded-lg text-sm">
              Upgrade Now
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

/* ================= DESKTOP NAV ================= */

function DesktopNav({ items, pathname, collapsed, openMenu, setOpenMenu }) {
  return (
    <nav className="px-2 space-y-1">
      {items.map((item) => {
        const Icon = item.icon;

        const isActive =
          pathname === item.href ||
          item.children?.some((c) => c.href === pathname);

        const isOpen = openMenu === item.name;

        // CASE 1: NO CHILDREN → LINK (FIXED DASHBOARD ISSUE)
        if (!item.children) {
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition ${
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

        // ✅ CASE 2: HAS CHILDREN → TOGGLE MENU
        return (
          <div key={item.name}>
            <button
              onClick={() => setOpenMenu(isOpen ? null : item.name)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition ${
                isActive
                  ? "bg-blue-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {Icon && <Icon size={18} />}

              {!collapsed && (
                <>
                  <span className="text-sm flex-1 text-left font-medium">
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
                    className={`block px-3 py-2 rounded-lg text-sm ${
                      pathname === child.href
                        ? "bg-blue-100 text-blue-900 font-medium"
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

/* ================= MOBILE NAV ================= */

function MobileNav({ items, pathname }) {
  const [open, setOpen] = useState(null);

  return (
    <nav className="space-y-2">
      {items.map((item) => {
        const Icon = item.icon;
        const isOpen = open === item.name;

        // ✅ NO CHILDREN → SIMPLE LINK
        if (!item.children) {
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm ${
                pathname === item.href
                  ? "bg-blue-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {Icon && <Icon size={18} />}
              <span>{item.name}</span>
            </Link>
          );
        }

        // ✅ WITH CHILDREN → EXPANDABLE
        return (
          <div key={item.name}>
            <button
              onClick={() => setOpen(isOpen ? null : item.name)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm ${
                isOpen
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
                    className={`block px-3 py-2 rounded-lg text-sm ${
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
