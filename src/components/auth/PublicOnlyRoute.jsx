"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getDashboardRouteByRole } from "@/utils/roleRoutes";

export default function PublicOnlyRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated, user, role } = useSelector((state) => state.user);

  const currentRole = user?.role || role;

  useEffect(() => {
    if (isAuthenticated && currentRole) {
      router.replace(getDashboardRouteByRole(currentRole));
    }
  }, [isAuthenticated, currentRole, router]);

  if (isAuthenticated && currentRole) return null;

  return children;
}
