"use client";

import Navbar from "../../components/student-auth-navbar";
import PublicOnlyRoute from "@/components/auth/PublicOnlyRoute";

export default function AuthLayout({ children }) {
  return (
    <>
      <Navbar />
      <PublicOnlyRoute>{children}</PublicOnlyRoute>
    </>
  );
}
