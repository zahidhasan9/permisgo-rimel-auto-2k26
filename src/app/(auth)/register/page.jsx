"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { FaApple, FaGoogle } from "react-icons/fa";
import { clearUserState, register } from "@/features/userSlice";
import Logo from "../../../../public/image/logo2.png";

const getDashboardPath = (role) => {
  if (role === "teacher") return "/teacher/dashboard";
  return "/student/dashboard";
};

const getAuthPayload = (payload) => payload?.data || payload || {};

const StudentRegister = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(clearUserState());

    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;
    const role = formData.role;
    const name = `${firstName} ${lastName}`.trim();

    if (!name || !email || !password) {
      toast.error("Name, email and password are required.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password and confirm password do not match.");
      return;
    }

    try {
      const result = await dispatch(
        register({ name, email, phone, password, role }),
      ).unwrap();

      const authData = getAuthPayload(result);
      const user = authData?.user;

      toast.success(result?.message || "Registration successful.");
      router.replace(getDashboardPath(user?.role || role));
    } catch (errorMessage) {
      toast.error(errorMessage || "Registration failed. Please try again.");
    }
  };

  return (
    <section className="min-h-screen bg-[#f4f8ff] px-4 py-3 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-24px)] max-w-[860px] items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[16px] border border-white/70 bg-white shadow-[0_16px_40px_rgba(16,54,119,0.12)] lg:grid-cols-[0.9fr_0.95fr]">
          <div className="relative hidden overflow-hidden bg-[#103677] p-4 text-white lg:block">
            <div className="absolute -left-14 -top-14 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 -right-14 h-44 w-44 rounded-full bg-[#2563eb]/50 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="mb-3 inline-flex rounded-lg bg-white p-2 shadow-lg">
                  <Image
                    src={Logo}
                    alt="Student Register Logo"
                    priority
                    sizes="90px"
                    className="h-auto w-[90px] object-contain"
                  />
                </div>

                <h2 className="max-w-[300px] text-[22px] font-bold leading-tight">
                  Create Your Account
                </h2>

                <p className="mt-2 max-w-[300px] text-[12px] leading-5 text-white/80">
                  Register to access your dashboard, learning materials,
                  progress, and important updates.
                </p>
              </div>

              <div className="mt-4 rounded-[12px] border border-white/15 bg-white/10 p-3 backdrop-blur-md">
                <p className="text-[12px] leading-5 text-white/85">
                  “Start your learning journey with one simple account.”
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center px-4 py-4 sm:px-5 lg:px-6">
            <div className="w-full max-w-[390px]">
              <div className="mb-3 text-center lg:hidden">
                <div className="mx-auto mb-2 w-[100px]">
                  <Image
                    src={Logo}
                    alt="Student Register Logo"
                    priority
                    sizes="100px"
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>

              <div className="mb-3 text-center lg:text-left">
                <span className="mb-1.5 inline-flex rounded-full bg-[#eef4ff] px-3 py-1 text-[10px] font-bold text-[#103677]">
                  Account Registration
                </span>

                <h1 className="text-[22px] font-bold leading-tight text-slate-950 sm:text-[24px]">
                  Create Account
                </h1>

                <p className="mt-1 text-[12px] text-slate-500">
                  Fill in your details to register.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-1 block text-[12px] font-bold text-slate-700"
                    >
                      First Name
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      autoComplete="given-name"
                      required
                      className="block w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12.5px] font-medium text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-[#2563eb]/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-1 block text-[12px] font-bold text-slate-700"
                    >
                      Last Name
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12.5px] font-medium text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-[#2563eb]/10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-[12px] font-bold text-slate-700"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12.5px] font-medium text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-[#2563eb]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1 block text-[12px] font-bold text-slate-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    autoComplete="tel"
                    className="block w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12.5px] font-medium text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-[#2563eb]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="mb-1 block text-[12px] font-bold text-slate-700"
                  >
                    Register As
                  </label>

                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12.5px] font-medium text-slate-900 outline-none transition-all duration-300 focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-[#2563eb]/10"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-1 block text-[12px] font-bold text-slate-700"
                    >
                      Password
                    </label>

                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      autoComplete="new-password"
                      minLength={6}
                      required
                      className="block w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12.5px] font-medium text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-[#2563eb]/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-1 block text-[12px] font-bold text-slate-700"
                    >
                      Confirm Password
                    </label>

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm"
                      autoComplete="new-password"
                      minLength={6}
                      required
                      className="block w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12.5px] font-medium text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-[#2563eb]/10"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full rounded-md bg-[#103677] px-4 py-2 text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(16,54,119,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2563eb] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:bg-[#103677]"
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>

              <div className="my-3 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  OR
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled
                  className="flex cursor-not-allowed items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-bold text-slate-400 shadow-sm"
                >
                  <FaGoogle className="text-[12px]" />
                  Google
                </button>

                <button
                  type="button"
                  disabled
                  className="flex cursor-not-allowed items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-bold text-slate-400 shadow-sm"
                >
                  <FaApple className="text-[14px]" />
                  Apple
                </button>
              </div>

              <p className="mt-3 text-center text-[12px] text-slate-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-[#103677] transition hover:text-[#2563eb] hover:underline"
                >
                  Login Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentRegister;
