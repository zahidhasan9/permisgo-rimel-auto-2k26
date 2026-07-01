import Image from "next/image";
import Link from "next/link";

// Icons
import { FaApple, FaGoogle } from "react-icons/fa";

// Image
import Logo from "../../../../public/image/logo2.png";

const StudentRegister = () => {
  return (
    <section className="min-h-screen bg-[#f4f8ff] px-4 py-3 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-24px)] max-w-[860px] items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[16px] border border-white/70 bg-white shadow-[0_16px_40px_rgba(16,54,119,0.12)] lg:grid-cols-[0.9fr_0.95fr]">
          {/* Left Branding Area */}
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
                  Create Your Student Account
                </h2>

                <p className="mt-2 max-w-[300px] text-[12px] leading-5 text-white/80">
                  Register to access your student dashboard, learning materials,
                  progress, and important updates.
                </p>
              </div>

              <div className="mt-4 rounded-[12px] border border-white/15 bg-white/10 p-3 backdrop-blur-md">
                <p className="text-[12px] leading-5 text-white/85">
                  “Start your learning journey with one simple student account.”
                </p>
              </div>
            </div>
          </div>

          {/* Right Register Area */}
          <div className="flex items-center justify-center px-4 py-4 sm:px-5 lg:px-6">
            <div className="w-full max-w-[390px]">
              {/* Mobile Logo */}
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
                  Student Registration
                </span>

                <h1 className="text-[22px] font-bold leading-tight text-slate-950 sm:text-[24px]">
                  Create Account
                </h1>

                <p className="mt-1 text-[12px] text-slate-500">
                  Fill in your details to register.
                </p>
              </div>

              <form action="" className="space-y-2">
                {/* First Name + Last Name */}
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
                      type="text"
                      placeholder="First name"
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
                      type="text"
                      placeholder="Last name"
                      className="block w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12.5px] font-medium text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-[#2563eb]/10"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-[12px] font-bold text-slate-700"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="block w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12.5px] font-medium text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-[#2563eb]/10"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1 block text-[12px] font-bold text-slate-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    className="block w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12.5px] font-medium text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-[#2563eb]/10"
                  />
                </div>

                {/* Password + Confirm Password */}
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
                      type="password"
                      placeholder="Password"
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
                      type="password"
                      placeholder="Confirm"
                      className="block w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12.5px] font-medium text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-[#2563eb]/10"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-md bg-[#103677] px-4 py-2 text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(16,54,119,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2563eb]"
                >
                  Register
                </button>
              </form>

              {/* Divider */}
              <div className="my-3 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  OR
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Social Register */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="#"
                  className="flex items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#eef4ff] hover:text-[#103677]"
                >
                  <FaGoogle className="text-[12px]" />
                  Google
                </Link>

                <Link
                  href="#"
                  className="flex items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#eef4ff] hover:text-[#103677]"
                >
                  <FaApple className="text-[14px]" />
                  Apple
                </Link>
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
