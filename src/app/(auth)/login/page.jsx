// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";

// import { FaApple, FaGoogle } from "react-icons/fa";
// import { FiEye, FiEyeOff } from "react-icons/fi";

// import { clearUserState, fetchLoggedInUser, login } from "@/features/userSlice";
// import Logo from "../../../../public/image/logo2.png";

// const getDashboardPath = (role) => {
//   if (role === "admin") return "/admin/dashboard";
//   if (role === "teacher") return "/teacher/dashboard";

//   return "/student/dashboard";
// };

// const getAuthPayload = (payload) => {
//   return payload?.data || payload || {};
// };

// const StudentLogin = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const {
//     loading,
//     token,
//     user,
//     role,
//     isAuthenticated,
//     authLoading,
//     authChecked,
//   } = useSelector((state) => state.user);

//   const currentRole = user?.role || role;

//   useEffect(() => {
//     if (token && !authChecked && !authLoading) {
//       dispatch(fetchLoggedInUser());
//     }
//   }, [token, authChecked, authLoading, dispatch]);

//   useEffect(() => {
//     if (isAuthenticated && currentRole) {
//       router.replace(getDashboardPath(currentRole));
//     }
//   }, [isAuthenticated, currentRole, router]);

//   const [showPassword, setShowPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormData((currentData) => ({
//       ...currentData,
//       [name]: value,
//     }));
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((currentState) => !currentState);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     dispatch(clearUserState());

//     const email = formData.email.trim().toLowerCase();
//     const password = formData.password;

//     if (!email || !password) {
//       toast.error("Email and password are required.");
//       return;
//     }

//     try {
//       const result = await dispatch(
//         login({
//           email,
//           password,
//         }),
//       ).unwrap();

//       const authData = getAuthPayload(result);
//       const user = authData?.user;

//       toast.success(result?.message || "Login successful.");

//       router.replace(getDashboardPath(user?.role));
//     } catch (errorMessage) {
//       toast.error(errorMessage || "Login failed. Please try again.");
//     }
//   };

//   if (token && (!authChecked || authLoading)) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#f4f8ff]">
//         <p className="text-sm font-semibold text-slate-600">
//           Checking authentication...
//         </p>
//       </div>
//     );
//   }

//   if (isAuthenticated && currentRole) {
//     return null;
//   }

//   return (
//     <section className="min-h-screen bg-[#f4f8ff] px-4 py-4 sm:px-6">
//       <div className="mx-auto flex min-h-[calc(100vh-32px)] max-w-[880px] items-center justify-center">
//         <div className="grid w-full overflow-hidden rounded-[18px] border border-white/70 bg-white shadow-[0_18px_45px_rgba(16,54,119,0.12)] lg:grid-cols-[0.95fr_0.9fr]">
//           {/* LEFT SIDE */}
//           <div className="relative hidden overflow-hidden bg-[#103677] p-5 text-white lg:block">
//             <div className="absolute -left-14 -top-14 h-44 w-44 rounded-full bg-white/10 blur-2xl" />

//             <div className="absolute -bottom-16 -right-14 h-48 w-48 rounded-full bg-[#2563eb]/50 blur-3xl" />

//             <div className="relative z-10 flex h-full flex-col justify-between">
//               <div>
//                 <div className="mb-4 inline-flex rounded-xl bg-white p-2 shadow-lg">
//                   <Image
//                     src={Logo}
//                     alt="Student Login Logo"
//                     priority
//                     sizes="100px"
//                     className="h-auto w-[100px] object-contain"
//                   />
//                 </div>

//                 <h2 className="max-w-[320px] text-[24px] font-bold leading-tight">
//                   Welcome Back to Your Student Portal
//                 </h2>

//                 <p className="mt-3 max-w-[320px] text-[12.5px] leading-5 text-white/80">
//                   Login to access your classes, learning materials, progress,
//                   and student dashboard securely.
//                 </p>
//               </div>

//               <div className="mt-5 rounded-[14px] border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
//                 <p className="text-[12.5px] leading-5 text-white/85">
//                   “Everything you need is available in one simple dashboard.”
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="flex items-center justify-center px-5 py-5 sm:px-6 lg:px-7">
//             <div className="w-full max-w-[340px]">
//               {/* MOBILE LOGO */}
//               <div className="mb-4 text-center lg:hidden">
//                 <div className="mx-auto mb-3 w-[110px]">
//                   <Image
//                     src={Logo}
//                     alt="Student Login Logo"
//                     priority
//                     sizes="110px"
//                     className="h-auto w-full object-contain"
//                   />
//                 </div>
//               </div>

//               {/* LOGIN HEADER */}
//               <div className="mb-4 text-center lg:text-left">
//                 <span className="mb-2 inline-flex rounded-full bg-[#eef4ff] px-3 py-1 text-[10.5px] font-bold text-[#103677]">
//                   Account Access
//                 </span>

//                 <h1 className="text-[23px] font-bold leading-tight text-slate-950 sm:text-[25px]">
//                   Login
//                 </h1>

//                 <p className="mt-1 text-[12.5px] text-slate-500">
//                   Enter your credentials to continue.
//                 </p>
//               </div>

//               {/* LOGIN FORM */}
//               <form onSubmit={handleSubmit} className="space-y-3">
//                 {/* EMAIL */}
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="mb-1.5 block text-[12.5px] font-bold text-slate-700"
//                   >
//                     Email
//                   </label>

//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Enter your email"
//                     autoComplete="email"
//                     required
//                     className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-[13px] font-medium text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
//                   />
//                 </div>

//                 {/* PASSWORD */}
//                 <div>
//                   <label
//                     htmlFor="password"
//                     className="mb-1.5 block text-[12.5px] font-bold text-slate-700"
//                   >
//                     Password
//                   </label>

//                   <div className="relative">
//                     <input
//                       id="password"
//                       name="password"
//                       type={showPassword ? "text" : "password"}
//                       value={formData.password}
//                       onChange={handleChange}
//                       placeholder="Password"
//                       autoComplete="current-password"
//                       required
//                       className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 pr-11 text-[13px] font-medium text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
//                     />

//                     <button
//                       type="button"
//                       onClick={togglePasswordVisibility}
//                       aria-label={
//                         showPassword ? "Hide password" : "Show password"
//                       }
//                       className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-[18px] text-slate-500 transition hover:text-[#103677]"
//                     >
//                       {showPassword ? <FiEye /> : <FiEyeOff />}
//                     </button>
//                   </div>
//                 </div>

//                 {/* FORGOT PASSWORD */}
//                 <div className="flex justify-end">
//                   <Link
//                     href="/forget-password"
//                     className="text-[12px] font-bold text-[#103677] transition hover:text-[#2563eb] hover:underline"
//                   >
//                     Forgot Password?
//                   </Link>
//                 </div>

//                 {/* LOGIN BUTTON */}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full rounded-lg bg-[#103677] px-4 py-2 text-[13.5px] font-bold text-white shadow-[0_9px_22px_rgba(16,54,119,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2563eb] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:bg-[#103677]"
//                 >
//                   {loading ? "Logging in..." : "Log in"}
//                 </button>
//               </form>

//               {/* DIVIDER */}
//               <div className="my-3.5 flex items-center gap-3">
//                 <div className="h-px flex-1 bg-slate-200" />

//                 <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
//                   OR
//                 </span>

//                 <div className="h-px flex-1 bg-slate-200" />
//               </div>

//               {/* SOCIAL LOGIN */}
//               <div className="grid grid-cols-2 gap-2.5">
//                 <button
//                   type="button"
//                   disabled
//                   className="flex cursor-not-allowed items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12.5px] font-bold text-slate-400 shadow-sm"
//                 >
//                   <FaGoogle className="text-[13px]" />
//                   Google
//                 </button>

//                 <button
//                   type="button"
//                   disabled
//                   className="flex cursor-not-allowed items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12.5px] font-bold text-slate-400 shadow-sm"
//                 >
//                   <FaApple className="text-[15px]" />
//                   Apple
//                 </button>
//               </div>

//               {/* REGISTER */}
//               <p className="mt-4 text-center text-[12.5px] text-slate-600">
//                 Don&apos;t have an account?{" "}
//                 <Link
//                   href="/register"
//                   className="font-bold text-[#103677] transition hover:text-[#2563eb] hover:underline"
//                 >
//                   Register Now
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StudentLogin;
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { clearUserState, fetchLoggedInUser, login } from "@/features/userSlice";

import Logo from "../../../../public/image/logo2.png";

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
                Student Login
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
