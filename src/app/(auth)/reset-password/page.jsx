import Image from "next/image";
import Link from "next/link";

// Icons
import { FaLock, FaShieldAlt } from "react-icons/fa";

// Image
import Logo from "../../../../public/image/logo2.png";

const StudentResetPassword = () => {
  return (
    <section className="min-h-screen bg-[#f4f8ff] px-4 py-4 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-32px)] max-w-[880px] items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[18px] border border-white/70 bg-white shadow-[0_18px_45px_rgba(16,54,119,0.12)] lg:grid-cols-[0.95fr_0.9fr]">
          {/* Left Branding Area */}
          <div className="relative hidden overflow-hidden bg-[#103677] p-5 text-white lg:block">
            <div className="absolute -left-14 -top-14 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 -right-14 h-48 w-48 rounded-full bg-[#2563eb]/50 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="mb-4 inline-flex rounded-xl bg-white p-2 shadow-lg">
                  <Image
                    src={Logo}
                    alt="Student Reset Password Logo"
                    priority
                    sizes="100px"
                    className="h-auto w-[100px] object-contain"
                  />
                </div>

                <h2 className="max-w-[320px] text-[24px] font-bold leading-tight">
                  Create a New Secure Password
                </h2>

                <p className="mt-3 max-w-[320px] text-[12.5px] leading-5 text-white/80">
                  Set a strong new password to protect your student account and
                  continue accessing your learning dashboard securely.
                </p>
              </div>

              <div className="mt-5 rounded-[14px] border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
                <p className="text-[12.5px] leading-5 text-white/85">
                  “Use a strong password with letters, numbers, and special
                  characters.”
                </p>
              </div>
            </div>
          </div>

          {/* Right Reset Password Area */}
          <div className="flex items-center justify-center px-5 py-5 sm:px-6 lg:px-7">
            <div className="w-full max-w-[340px]">
              {/* Mobile Logo */}
              <div className="mb-4 text-center lg:hidden">
                <div className="mx-auto mb-3 w-[110px]">
                  <Image
                    src={Logo}
                    alt="Student Reset Password Logo"
                    priority
                    sizes="110px"
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>

              <div className="mb-4 text-center lg:text-left">
                <span className="mb-2 inline-flex rounded-full bg-[#eef4ff] px-3 py-1 text-[10.5px] font-bold text-[#103677]">
                  Reset Password
                </span>

                <h1 className="text-[23px] font-bold leading-tight text-slate-950 sm:text-[25px]">
                  Set New Password
                </h1>

                <p className="mt-1 text-[12.5px] leading-5 text-slate-500">
                  Enter your new password below and confirm it to complete the
                  reset process.
                </p>
              </div>

              <form action="" className="space-y-3">
                <div>
                  <label
                    htmlFor="newPassword"
                    className="mb-1.5 block text-[12.5px] font-bold text-slate-700"
                  >
                    New Password
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <FaLock className="text-[13px]" />
                    </span>

                    <input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 pl-9 text-[13px] font-medium text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-1.5 block text-[12.5px] font-bold text-slate-700"
                  >
                    Confirm Password
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <FaShieldAlt className="text-[13px]" />
                    </span>

                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 pl-9 text-[13px] font-medium text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-[#2563eb]/10 bg-[#eef4ff] px-3.5 py-2">
                  <p className="text-[11.5px] leading-5 text-slate-600">
                    Password should be at least 8 characters and include a mix
                    of uppercase, lowercase, number, and special character.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#103677] px-4 py-2 text-[13.5px] font-bold text-white shadow-[0_9px_22px_rgba(16,54,119,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2563eb]"
                >
                  Reset Password
                </button>
              </form>

              <div className="my-3.5 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Done?
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <Link
                href="/student-login"
                className="flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#eef4ff] hover:text-[#103677]"
              >
                Back to Login
              </Link>

              <p className="mt-4 text-center text-[12.5px] text-slate-600">
                Need another reset link?{" "}
                <Link
                  href="/student-forget-password"
                  className="font-bold text-[#103677] transition hover:text-[#2563eb] hover:underline"
                >
                  Forgot Password
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentResetPassword;
