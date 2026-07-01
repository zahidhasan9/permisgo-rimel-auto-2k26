"use client";

import { useState } from "react";
import { FaChevronLeft, FaEye, FaEyeSlash } from "react-icons/fa";

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 pr-11 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#16458f] focus:ring-4 focus:ring-blue-50";

const labelClass = "mb-2 block text-sm font-bold text-slate-600";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <main className="min-h-screen bg-[#E8EEF8] px-4 py-5 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-5 flex items-start gap-3">
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#16458f] shadow-sm transition hover:bg-blue-50"
          >
            <FaChevronLeft size={14} />
          </button>

          <div>
            <h1 className="text-[24px] font-bold leading-tight text-[#16458f]">
              Reset Password
            </h1>
            <p className="mt-1 max-w-xl text-sm leading-5 text-slate-500">
              Update your password to keep your account secure.
            </p>
          </div>
        </header>

        {/* Card */}
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-5">
          <form className="space-y-5">
            {/* Current Password */}
            <div>
              <label className={labelClass}>Current Password</label>

              <PasswordInput
                show={showPassword.current}
                onToggle={() => togglePassword("current")}
              />

              <p className="mt-2 text-xs font-medium text-slate-500">
                If you don&apos;t have a password, skip the old password field.
              </p>
            </div>

            {/* New Password Fields */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass}>New Password</label>
                <PasswordInput
                  show={showPassword.new}
                  onToggle={() => togglePassword("new")}
                />
              </div>

              <div>
                <label className={labelClass}>Confirm New Password</label>
                <PasswordInput
                  show={showPassword.confirm}
                  onToggle={() => togglePassword("confirm")}
                />
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                className="h-11 w-full rounded-xl bg-[#e2233d] px-6 text-sm font-bold text-white transition hover:bg-[#c91f35] sm:w-auto"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

function PasswordInput({ show, onToggle }) {
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder="Write here"
        className={inputClass}
      />

      <button
        type="button"
        onClick={onToggle}
        className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center text-slate-500 transition hover:text-[#16458f]"
      >
        {show ? <FaEye size={17} /> : <FaEyeSlash size={17} />}
      </button>
    </div>
  );
}
