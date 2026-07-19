"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { getLoggedInUser, logoutUser } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const PANEL_CONFIG = {
  student: {
    label: "Student",
    title: "Student Dashboard",
    subtitle: "Driving Learning System",
    dashboardHref: "/student/dashboard",
    profileHref: "/student/profile",
    settingsHref: "/student/settings",
    badgeClass: "bg-[#EAF1FB] text-[#0D4598]",
  },

  teacher: {
    label: "Teacher",
    title: "Teacher Dashboard",
    subtitle: "Instructor Management System",
    dashboardHref: "/teacher/dashboard",
    profileHref: "/teacher/profile",
    settingsHref: "/teacher/settings",
    badgeClass: "bg-purple-50 text-purple-700",
  },

  admin: {
    label: "Admin",
    title: "Admin Dashboard",
    subtitle: "PermisGo Management",
    dashboardHref: "/admin/dashboard",
    profileHref: "/admin/profile",
    settingsHref: "/admin/settings",
    badgeClass: "bg-slate-100 text-slate-700",
  },
};

function safeJsonParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function readUserFromStorage() {
  if (typeof window === "undefined") return null;

  const rawUser = localStorage.getItem("user");

  if (!rawUser) return null;

  const parsedUser = safeJsonParse(rawUser);

  if (parsedUser?.user) return parsedUser.user;
  if (parsedUser?.data?.user) return parsedUser.data.user;

  return parsedUser;
}

function getPanelType(pathname, role, panelType) {
  if (panelType && PANEL_CONFIG[panelType]) return panelType;

  if (pathname?.startsWith("/admin")) return "admin";
  if (pathname?.startsWith("/teacher")) return "teacher";
  if (pathname?.startsWith("/student")) return "student";

  const userRole = String(role || "").toLowerCase();

  if (userRole.includes("admin")) return "admin";
  if (userRole.includes("teacher") || userRole.includes("instructor")) {
    return "teacher";
  }

  return "student";
}

function getFreshUserFromResponse(res) {
  return res.data?.data?.user || res.data?.user || res.data?.data || null;
}

function getUserName(user, fallbackRole) {
  return (
    user?.name ||
    user?.fullName ||
    user?.firstName ||
    user?.username ||
    user?.email?.split("@")?.[0] ||
    fallbackRole ||
    "User"
  );
}

function getUserImage(user) {
  return (
    user?.image ||
    user?.avatar ||
    user?.photo ||
    user?.profileImage ||
    user?.profilePhoto ||
    user?.picture ||
    user?.profile?.image ||
    user?.studentProfile?.image ||
    user?.teacherProfile?.image ||
    ""
  );
}

function getInitial(name) {
  return String(name || "U")
    .trim()
    .charAt(0)
    .toUpperCase();
}

export default function DashboardTopbar({
  onMenuClick,
  user: userProp = null,
  panelType = "",
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(userProp || null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (userProp) {
      setUser(userProp);
    }
  }, [userProp]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const cachedUser = readUserFromStorage();

        if (cachedUser) {
          setUser(cachedUser);
        }

        const res = await getLoggedInUser();
        const freshUser = getFreshUserFromResponse(res);

        if (freshUser) {
          setUser(freshUser);
          localStorage.setItem("user", JSON.stringify(freshUser));
        }
      } catch (error) {
        console.log("Auth user not found");
      }
    };

    loadUser();
  }, []);

  const activePanelType = getPanelType(pathname, user?.role, panelType);
  const config = PANEL_CONFIG[activePanelType] || PANEL_CONFIG.student;

  const displayName = getUserName(user, config.label);
  const userEmail = user?.email || "";
  const userRole = user?.role || config.label;

  const rawImage = getUserImage(user);

  const imageSrc = useMemo(() => {
    if (!rawImage || imageError) return "";
    return mediaUrl(rawImage);
  }, [rawImage, imageError]);

  async function handleLogout() {
    try {
      await logoutUser();
    } catch (error) {
      console.log(
        error.response?.data?.message ||
          error.message ||
          "Backend logout failed",
      );
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setOpen(false);
      window.location.replace("/login");
    }
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-black/[0.06] bg-white/90 px-3 backdrop-blur-md md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl p-2 text-[#1D1D1F] transition hover:bg-[#F5F5F7] md:hidden"
          aria-label="Open sidebar"
        >
          <FiMenu size={22} />
        </button>

        <Link
          href={config.dashboardHref}
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#F5F5F7] text-sm font-bold text-[#1D1D1F] sm:flex"
        >
          PG
        </Link>

        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold tracking-[-0.01em] text-[#1D1D1F]">
            {config.title}
          </h1>

          <p className="truncate text-[11px] font-medium text-[#86868B]">
            {config.subtitle}
          </p>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-2xl px-2 py-1.5 transition hover:bg-[#F5F5F7] md:gap-3"
        >
          <div className="h-10 w-10 overflow-hidden rounded-full bg-[#F5F5F7] ring-1 ring-black/[0.06]">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={displayName}
                className="h-full w-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#EAF1FB] text-sm font-bold text-[#0D4598]">
                {getInitial(displayName)}
              </div>
            )}
          </div>

          <div className="hidden min-w-0 text-left md:block">
            <div className="flex items-center gap-2">
              <p className="max-w-[130px] truncate text-sm font-semibold text-[#1D1D1F]">
                {displayName}
              </p>

              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${config.badgeClass}`}
              >
                {userRole}
              </span>
            </div>

            <p className="max-w-[180px] truncate text-[11px] font-medium text-[#86868B]">
              {userEmail || config.subtitle}
            </p>
          </div>

          <FiChevronDown
            className={`text-[#86868B] transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open ? (
          <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_16px_40px_rgba(16,24,40,0.12)]">
            <div className="border-b border-black/[0.06] px-4 py-3">
              <p className="truncate text-sm font-semibold text-[#1D1D1F]">
                {displayName}
              </p>

              <p className="mt-0.5 truncate text-xs font-medium text-[#86868B]">
                {userEmail || config.label}
              </p>
            </div>

            <Link
              href={config.profileHref}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#1D1D1F] transition hover:bg-[#F5F5F7]"
              onClick={() => setOpen(false)}
            >
              <FaUser className="text-[#86868B]" />
              Profile
            </Link>

            <Link
              href={config.settingsHref}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#1D1D1F] transition hover:bg-[#F5F5F7]"
              onClick={() => setOpen(false)}
            >
              <FaCog className="text-[#86868B]" />
              Settings
            </Link>

            <div className="border-t border-black/[0.06]" />

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-[#B42318] transition hover:bg-[#FEF3F2]"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
