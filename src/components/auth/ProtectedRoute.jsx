"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { fetchLoggedInUser } from "@/features/userSlice";
import { getDashboardRouteByRole } from "@/utils/roleRoutes";

export default function ProtectedRoute({ allowedRoles = [], children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const { user, token, role, isAuthenticated, authLoading, authChecked } =
    useSelector((state) => state.user);

  const currentRole = user?.role || role;

  useEffect(() => {
    if (!token) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (token && !authChecked) {
      dispatch(fetchLoggedInUser());
    }
  }, [token, authChecked, dispatch, router, pathname]);

  useEffect(() => {
    if (!authChecked) return;

    if (!isAuthenticated || !currentRole) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(currentRole)) {
      router.replace(getDashboardRouteByRole(currentRole));
    }
  }, [
    authChecked,
    isAuthenticated,
    currentRole,
    allowedRoles,
    router,
    pathname,
  ]);

  if (authLoading || !authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentRole)) {
    return null;
  }

  return children;
}
