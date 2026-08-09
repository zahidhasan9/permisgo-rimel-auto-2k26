"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import PublicOnlyRoute from "@/components/auth/PublicOnlyRoute";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import StudentAuthNavbar from "@/components/student-auth-navbar";
import AdminSidebar from "@/components/layout/AdminSidebar";
import DashboardTopbar from "@/components/layout/DashboardTopbar";
import StudentSidebar from "@/components/layout/StudentSidebar";
import TeacherSidebar from "@/components/layout/TeacherSidebar";
import PresenceConnection from "@/components/chat/PresenceConnection";
import BottomMenu from "@/components/bottom-menu";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import HomeStaticTranslator from "@/components/HomeStaticTranslator";

const authRoots = [
  "/login",
  "/register/student",
  "/register/teacher",
  "/forget-password",
  "/reset-password",
  "/verify-account",
];

const isPathWithin = (pathname, root) =>
  pathname === root || pathname.startsWith(`${root}/`);

function DashboardShell({ children, role, Sidebar }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ProtectedRoute allowedRoles={[role]}>
      <div className="flex h-screen overflow-hidden bg-gray-100">
        {role !== "admin" && <PresenceConnection />}
        <Sidebar variant="desktop" />
        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopbar onMenuClick={() => setMobileOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
        {mobileOpen && (
          <>
            <button
              type="button"
              aria-label="Close navigation"
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <div className="fixed left-0 top-0 z-50 h-full w-72 bg-white shadow-xl md:hidden">
              <Sidebar variant="mobile" onClose={() => setMobileOpen(false)} />
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}

export default function AppShell({ children }) {
  const pathname = usePathname() || "/";

  if (isPathWithin(pathname, "/admin")) {
    return <DashboardShell role="admin" Sidebar={AdminSidebar}>{children}</DashboardShell>;
  }
  if (isPathWithin(pathname, "/student")) {
    return <DashboardShell role="student" Sidebar={StudentSidebar}>{children}</DashboardShell>;
  }
  if (isPathWithin(pathname, "/teacher")) {
    return <DashboardShell role="teacher" Sidebar={TeacherSidebar}>{children}</DashboardShell>;
  }
  if (authRoots.some((root) => isPathWithin(pathname, root))) {
    return <><StudentAuthNavbar /><PublicOnlyRoute>{children}</PublicOnlyRoute></>;
  }
  if (pathname === "/") {
    return <div data-public-site className="max-[500px]:pb-[68px]"><HomeStaticTranslator />{children}<FloatingWhatsApp /><BottomMenu /></div>;
  }
  if (isPathWithin(pathname, "/chat")) return children;
  return <div data-public-site className="max-[500px]:pb-[68px]"><HomeStaticTranslator /><Navbar /><main>{children}</main><Footer /><FloatingWhatsApp /><BottomMenu /></div>;
}
