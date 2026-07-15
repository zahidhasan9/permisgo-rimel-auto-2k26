"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { BsBook } from "react-icons/bs";
import { CiMemoPad } from "react-icons/ci";
import {
  FaThLarge,
  FaUser,
  FaBookOpen,
  FaCalendarAlt,
  FaGraduationCap,
  FaFileAlt,
  FaUniversity,
  FaTruck,
  FaMapMarkerAlt,
  FaUserFriends,
  FaFileInvoiceDollar,
  FaSignOutAlt,
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
  // {
  //   name: "Logout",
  //   href: "/logout",
  //   icon: FaSignOutAlt,
  // },
];

export default function TeacherSidebar({ variant = "desktop", onClose }) {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [hoverExpanded, setHoverExpanded] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

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
          <MobileNav items={navItems} pathname={pathname} onClose={onClose} />
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

function DesktopNav({ items, pathname, collapsed, openMenu, setOpenMenu }) {
  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;

        const isActive =
          pathname === item.href ||
          item.children?.some((child) => pathname === child.href);

        const isOpen = openMenu === item.name;

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

function MobileNav({ items, pathname, onClose }) {
  const [open, setOpen] = useState(null);

  return (
    <nav className="space-y-2">
      {items.map((item) => {
        const Icon = item.icon;
        const isOpen = open === item.name;

        const isActive =
          pathname === item.href ||
          item.children?.some((child) => pathname === child.href);

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
