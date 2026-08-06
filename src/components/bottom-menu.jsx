"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCar, FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import {
  MdDashboard,
  MdLocalOffer,
  MdOutlineDirections,
  MdSettings,
} from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";
import { fetchLoggedInUser } from "@/features/userSlice";

const menus = {
  student: [
    { title: "Code", href: "/student/code", icon: MdOutlineDirections },
    {
      title: "Conduite",
      href: "/student/driving-operation/driving-dashboard",
      icon: FaCar,
    },
    { title: "Offer", href: "/student/offers", icon: MdLocalOffer },
    { title: "Profile", href: "/student/profile", icon: RiProfileLine },
  ],
  teacher: [
    { title: "Dashboard", href: "/teacher/dashboard", icon: MdDashboard },
    { title: "Lessons", href: "/teacher/lessons", icon: FaChalkboardTeacher },
    { title: "Offers", href: "/teacher/offers", icon: MdLocalOffer },
    { title: "Profile", href: "/teacher/profile", icon: RiProfileLine },
  ],
  admin: [
    { title: "Dashboard", href: "/admin/dashboard", icon: MdDashboard },
    { title: "Users", href: "/admin/users", icon: FaUsers },
    { title: "Settings", href: "/admin/settings", icon: MdSettings },
    { title: "Profile", href: "/admin/profile", icon: RiProfileLine },
  ],
  guest: [
    { title: "Code", href: "/traffic-laws", icon: MdOutlineDirections },
    { title: "Conduite", href: "/appointment", icon: FaCar },
    { title: "Offer", href: "/pricing", icon: MdLocalOffer },
    { title: "Profile", href: "/login/student", icon: RiProfileLine },
  ],
};

const isActiveRoute = (pathname, href) =>
  pathname === href || pathname.startsWith(`${href}/`);

export default function BottomMenu() {
  const pathname = usePathname() || "/";
  const dispatch = useDispatch();
  const { token, user, role, authLoading } = useSelector((state) => state.user);
  const resolvedRole = user?.role || role;
  const menuItems = menus[resolvedRole] || menus.guest;
  const rolePending = Boolean(token && !resolvedRole && authLoading);

  useEffect(() => {
    if (token && !resolvedRole && !authLoading) dispatch(fetchLoggedInUser());
  }, [token, resolvedRole, authLoading, dispatch]);

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-[999] hidden rounded-t-2xl border-t border-slate-200/80 bg-white/95 px-3 pt-2 shadow-[0_-5px_22px_rgba(15,23,42,0.12)] backdrop-blur-md max-[500px]:block"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-md items-center justify-between">
        {menuItems.map(({ title, href, icon: Icon }) => {
          const active = isActiveRoute(pathname, href);
          return (
            <Link
              key={title}
              href={href}
              aria-label={title}
              aria-current={active ? "page" : undefined}
              className={`relative flex min-h-[50px] flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 no-underline transition-colors ${active ? "text-[#174a9b]" : "text-slate-800 hover:text-[#174a9b]"} ${rolePending ? "opacity-60" : ""}`}
            >
              {active && (
                <span className="absolute top-0 h-0.5 w-7 rounded-full bg-[#174a9b]" />
              )}
              <Icon aria-hidden="true" className="text-[20px]" />
              <span className="max-w-full truncate text-[11px] font-semibold leading-none">
                {title}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
