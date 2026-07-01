import Image from "next/image";
import Link from "next/link";

// Icons
import { FaCheckCircle, FaEnvelope, FaShieldAlt } from "react-icons/fa";

// Image
import Logo from "../../../../public/image/logo2.png";

const StudentVerifyAccount = () => {
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
                    alt="Student Verify Account Logo"
                    priority
                    sizes="100px"
                    className="h-auto w-[100px] object-contain"
                  />
                </div>

                <h2 className="max-w-[320px] text-[24px] font-bold leading-tight">
                  Verify Your Student Account
                </h2>

                <p className="mt-3 max-w-[320px] text-[12.5px] leading-5 text-white/80">
                  Confirm your account using the verification code sent to your
                  registered email address.
                </p>
              </div>

              <div className="mt-5 rounded-[14px] border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
                <p className="text-[12.5px] leading-5 text-white/85">
                  “Account verification keeps your student dashboard safe and
                  protected.”
                </p>
              </div>
            </div>
          </div>

          {/* Right Verify Account Area */}
          <div className="flex items-center justify-center px-5 py-5 sm:px-6 lg:px-7">
            <div className="w-full max-w-[340px]">
              {/* Mobile Logo */}
              <div className="mb-4 text-center lg:hidden">
                <div className="mx-auto mb-3 w-[110px]">
                  <Image
                    src={Logo}
                    alt="Student Verify Account Logo"
                    priority
                    sizes="110px"
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>

              <div className="mb-4 text-center lg:text-left">
                <span className="mb-2 inline-flex rounded-full bg-[#eef4ff] px-3 py-1 text-[10.5px] font-bold text-[#103677]">
                  Account Verification
                </span>

                <h1 className="text-[23px] font-bold leading-tight text-slate-950 sm:text-[25px]">
                  Verify Account
                </h1>

                <p className="mt-1 text-[12.5px] leading-5 text-slate-500">
                  Enter the 6-digit verification code sent to your email.
                </p>
              </div>

              <div className="mb-4 rounded-lg border border-[#2563eb]/10 bg-[#eef4ff] px-3.5 py-2">
                <div className="flex items-start gap-2">
                  <FaEnvelope className="mt-1 text-[13px] text-[#103677]" />
                  <p className="text-[11.5px] leading-5 text-slate-600">
                    We sent a verification code to your registered student email
                    address.
                  </p>
                </div>
              </div>

              <form action="" className="space-y-3">
                <div>
                  <label
                    htmlFor="verificationCode"
                    className="mb-1.5 block text-[12.5px] font-bold text-slate-700"
                  >
                    Verification Code
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <FaShieldAlt className="text-[13px]" />
                    </span>

                    <input
                      id="verificationCode"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="Enter 6-digit code"
                      className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 pl-9 text-[13px] font-medium tracking-[0.18em] text-slate-900 outline-none transition-all duration-300 placeholder:tracking-normal placeholder:text-slate-400 focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#103677] px-4 py-2 text-[13.5px] font-bold text-white shadow-[0_9px_22px_rgba(16,54,119,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2563eb]"
                >
                  <FaCheckCircle className="text-[13px]" />
                  Verify Account
                </button>
              </form>

              <div className="my-3.5 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Didn&apos;t get code?
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <button
                type="button"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#eef4ff] hover:text-[#103677]"
              >
                Resend Verification Code
              </button>

              <p className="mt-4 text-center text-[12.5px] text-slate-600">
                Already verified?{" "}
                <Link
                  href="/login"
                  className="font-bold text-[#103677] transition hover:text-[#2563eb] hover:underline"
                >
                  Back to Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentVerifyAccount;
