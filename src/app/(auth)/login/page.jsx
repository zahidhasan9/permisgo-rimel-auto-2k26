// "use client";

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter, useSearchParams } from "next/navigation";
// import { login } from "@/features/userSlice";
// import { getDashboardRouteByRole } from "@/utils/roleRoutes";

// export default function LoginPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const { loading, error } = useSelector((state) => state.user);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const result = await dispatch(login(formData)).unwrap();

//     const user = result?.data?.user || result?.user;
//     const role = user?.role;

//     const redirect = searchParams.get("redirect");

//     if (redirect) {
//       router.replace(redirect);
//       return;
//     }

//     router.replace(getDashboardRouteByRole(role));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//       />

//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleChange}
//       />

//       {error && <p className="text-red-500">{error}</p>}

//       <button type="submit" disabled={loading}>
//         {loading ? "Logging in..." : "Login"}
//       </button>
//     </form>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { FaApple, FaGoogle } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { clearUserState, login } from "@/features/userSlice";
import Logo from "../../../../public/image/logo2.png";

const getDashboardPath = (role) => {
  if (role === "admin") return "/admin";
  if (role === "teacher") return "/teacher/dashboard";

  return "/student/dashboard";
};

const getAuthPayload = (payload) => {
  return payload?.data || payload || {};
};

const StudentLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
      const user = authData?.user;

      toast.success(result?.message || "Login successful.");

      router.replace(getDashboardPath(user?.role));
    } catch (errorMessage) {
      toast.error(errorMessage || "Login failed. Please try again.");
    }
  };

  return (
    <section className="min-h-screen bg-[#f4f8ff] px-4 py-4 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-32px)] max-w-[880px] items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[18px] border border-white/70 bg-white shadow-[0_18px_45px_rgba(16,54,119,0.12)] lg:grid-cols-[0.95fr_0.9fr]">
          {/* LEFT SIDE */}
          <div className="relative hidden overflow-hidden bg-[#103677] p-5 text-white lg:block">
            <div className="absolute -left-14 -top-14 h-44 w-44 rounded-full bg-white/10 blur-2xl" />

            <div className="absolute -bottom-16 -right-14 h-48 w-48 rounded-full bg-[#2563eb]/50 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="mb-4 inline-flex rounded-xl bg-white p-2 shadow-lg">
                  <Image
                    src={Logo}
                    alt="Student Login Logo"
                    priority
                    sizes="100px"
                    className="h-auto w-[100px] object-contain"
                  />
                </div>

                <h2 className="max-w-[320px] text-[24px] font-bold leading-tight">
                  Welcome Back to Your Student Portal
                </h2>

                <p className="mt-3 max-w-[320px] text-[12.5px] leading-5 text-white/80">
                  Login to access your classes, learning materials, progress,
                  and student dashboard securely.
                </p>
              </div>

              <div className="mt-5 rounded-[14px] border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
                <p className="text-[12.5px] leading-5 text-white/85">
                  “Everything you need is available in one simple dashboard.”
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center justify-center px-5 py-5 sm:px-6 lg:px-7">
            <div className="w-full max-w-[340px]">
              {/* MOBILE LOGO */}
              <div className="mb-4 text-center lg:hidden">
                <div className="mx-auto mb-3 w-[110px]">
                  <Image
                    src={Logo}
                    alt="Student Login Logo"
                    priority
                    sizes="110px"
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>

              {/* LOGIN HEADER */}
              <div className="mb-4 text-center lg:text-left">
                <span className="mb-2 inline-flex rounded-full bg-[#eef4ff] px-3 py-1 text-[10.5px] font-bold text-[#103677]">
                  Account Access
                </span>

                <h1 className="text-[23px] font-bold leading-tight text-slate-950 sm:text-[25px]">
                  Login
                </h1>

                <p className="mt-1 text-[12.5px] text-slate-500">
                  Enter your credentials to continue.
                </p>
              </div>

              {/* LOGIN FORM */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-[12.5px] font-bold text-slate-700"
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
                    className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-[13px] font-medium text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-[12.5px] font-bold text-slate-700"
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
                      placeholder="Password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 pr-11 text-[13px] font-medium text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
                    />

                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-[18px] text-slate-500 transition hover:text-[#103677]"
                    >
                      {showPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                  </div>
                </div>

                {/* FORGOT PASSWORD */}
                <div className="flex justify-end">
                  <Link
                    href="/forget-password"
                    className="text-[12px] font-bold text-[#103677] transition hover:text-[#2563eb] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-[#103677] px-4 py-2 text-[13.5px] font-bold text-white shadow-[0_9px_22px_rgba(16,54,119,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2563eb] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:bg-[#103677]"
                >
                  {loading ? "Logging in..." : "Log in"}
                </button>
              </form>

              {/* DIVIDER */}
              <div className="my-3.5 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  OR
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* SOCIAL LOGIN */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  disabled
                  className="flex cursor-not-allowed items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12.5px] font-bold text-slate-400 shadow-sm"
                >
                  <FaGoogle className="text-[13px]" />
                  Google
                </button>

                <button
                  type="button"
                  disabled
                  className="flex cursor-not-allowed items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12.5px] font-bold text-slate-400 shadow-sm"
                >
                  <FaApple className="text-[15px]" />
                  Apple
                </button>
              </div>

              {/* REGISTER */}
              <p className="mt-4 text-center text-[12.5px] text-slate-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-bold text-[#103677] transition hover:text-[#2563eb] hover:underline"
                >
                  Register Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentLogin;
