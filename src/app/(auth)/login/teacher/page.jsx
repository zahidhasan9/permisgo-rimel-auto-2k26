"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { clearUserState, fetchLoggedInUser, login } from "@/features/userSlice";

import Logo from "../../../../../public/image/logo2.png";

const getDashboardPath = (role) => {
  if (role === "admin") return "/admin/dashboard";
  if (role === "teacher") return "/teacher/dashboard";

  return "/student/dashboard";
};

const getAuthPayload = (payload) => {
  return payload?.data || payload || {};
};

const StudentLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    loading,
    token,
    user,
    role,
    isAuthenticated,
    authLoading,
    authChecked,
  } = useSelector((state) => state.user);

  const currentRole = user?.role || role;

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token && !authChecked && !authLoading) {
      dispatch(fetchLoggedInUser());
    }
  }, [token, authChecked, authLoading, dispatch]);

  useEffect(() => {
    if (isAuthenticated && currentRole) {
      router.replace(getDashboardPath(currentRole));
    }
  }, [isAuthenticated, currentRole, router]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((currentState) => !currentState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(clearUserState());

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    try {
      const result = await dispatch(
        login({
          email,
          password,
        }),
      ).unwrap();

      const authData = getAuthPayload(result);
      const loggedInUser = authData?.user;

      toast.success(result?.message || "Login successful.");

      router.replace(getDashboardPath(loggedInUser?.role));
    } catch (errorMessage) {
      toast.error(errorMessage || "Login failed. Please try again.");
    }
  };

  if (token && (!authChecked || authLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#eef2fb]">
        <p className="text-sm font-semibold text-slate-600">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (isAuthenticated && currentRole) {
    return null;
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#eef2fb] px-4 py-8 sm:px-6">
      {/* OUTER WHITE BOX */}
      <div className="w-full max-w-[864px] rounded-[12px] bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.02)] sm:p-[28px]">
        {/* LIGHT BLUE BORDER AREA */}
        <div className="rounded-[12px] bg-[#e7edf7] p-3 sm:p-[20px]">
          {/* LOGIN CONTENT BOX */}
          <div className="min-h-[540px] rounded-[12px] bg-white px-5 py-5 sm:px-[20px] sm:py-[20px]">
            {/* LOGO AND TITLE */}
            <div className="flex flex-col items-center">
              <Image
                src={Logo}
                alt="Permis Go Auto Ecole"
                priority
                sizes="180px"
                className="h-[70px] w-[180px] object-contain"
              />

              <h1 className="mt-[22px] text-center text-[28px] font-bold leading-none text-[#1f1f1f] sm:text-[29px]">
                Teacher Login
              </h1>
            </div>

            {/* LOGIN FORM */}
            <form onSubmit={handleSubmit} className="mt-[54px]">
              {/* USERNAME */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-[12px] block text-[14px] font-medium text-[#3f3f46]"
                >
                  Username
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Write name here"
                  autoComplete="email"
                  required
                  className="h-[44px] w-full rounded-[12px] border border-[#bcc5d1] bg-white px-[16px] text-[14px] text-[#27272a] outline-none transition placeholder:text-[#8b8b8b] focus:border-[#8da2bd] focus:ring-2 focus:ring-[#8da2bd]/15"
                />
              </div>

              {/* PASSWORD */}
              <div className="mt-[25px]">
                <label
                  htmlFor="password"
                  className="mb-[12px] block text-[14px] font-medium text-[#3f3f46]"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Write here"
                    autoComplete="current-password"
                    required
                    className="h-[44px] w-full rounded-[12px] border border-[#d5d7dc] bg-white px-[16px] pr-[52px] text-[14px] text-[#27272a] outline-none transition placeholder:text-[#8b8b8b] focus:border-[#8da2bd] focus:ring-2 focus:ring-[#8da2bd]/15"
                  />

                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-[16px] top-1/2 flex -translate-y-1/2 items-center justify-center text-[20px] text-[#222222] transition hover:opacity-70"
                  >
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                  </button>
                </div>
              </div>

              {/* FORGET PASSWORD */}
              <div className="mt-[22px]">
                <Link
                  href="/forget-password"
                  className="text-[14px] font-semibold text-[#173d73] underline underline-offset-2 transition hover:text-[#0d2b52]"
                >
                  Forget Password
                </Link>
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="mt-[54px] flex h-[48px] w-full items-center justify-center rounded-[12px] bg-[#df2738] px-4 text-[15px] font-semibold text-white transition hover:bg-[#c91f30] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentLogin;
