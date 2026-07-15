"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { toast, Toaster } from "sonner";

import { changePassword } from "@/features/API";

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 pr-11 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#16458f] focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500";

const labelClass = "mb-2 block text-sm font-bold text-slate-600";

const initialFormData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function getErrorMessage(error, fallback = "Failed to change password.") {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
}

export default function ResetPassword() {
  const router = useRouter();

  const [formData, setFormData] = useState(initialFormData);

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function togglePassword(field) {
    setShowPassword((previousState) => ({
      ...previousState,
      [field]: !previousState[field],
    }));
  }

  function validateForm() {
    const currentPassword = formData.currentPassword.trim();
    const newPassword = formData.newPassword.trim();
    const confirmPassword = formData.confirmPassword.trim();

    if (!currentPassword) {
      toast.error("Please enter your current password.");
      return false;
    }

    if (!newPassword) {
      toast.error("Please enter a new password.");
      return false;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");

      return false;
    }

    if (!confirmPassword) {
      toast.error("Please confirm your new password.");
      return false;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");

      return false;
    }

    if (currentPassword === newPassword) {
      toast.error("New password must be different from current password.");

      return false;
    }

    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading || !validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const response = await changePassword({
        currentPassword: formData.currentPassword.trim(),
        newPassword: formData.newPassword.trim(),
        confirmPassword: formData.confirmPassword.trim(),
      });

      toast.success(
        response?.data?.message || "Password changed successfully.",
      );

      setFormData(initialFormData);

      setShowPassword({
        current: false,
        new: false,
        confirm: false,
      });
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Failed to change password. Please try again."),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* <Toaster position="top-right" richColors closeButton duration={3500} /> */}

      <main className="min-h-screen bg-[#f8fafc] px-4 py-5 sm:px-6 lg:px-8">
        <section className="mx-auto">
          {/* Header */}

          <header className="mb-5 flex items-start gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={loading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#16458f] shadow-sm transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Go back"
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
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              {/* Current Password */}

              <div>
                <label htmlFor="currentPassword" className={labelClass}>
                  Current Password
                </label>

                <PasswordInput
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  show={showPassword.current}
                  onChange={handleChange}
                  onToggle={() => togglePassword("current")}
                  placeholder="Enter current password"
                  autoComplete="current-password"
                  disabled={loading}
                />

                <p className="mt-2 text-xs font-medium text-slate-500">
                  Enter your existing password to verify your identity.
                </p>
              </div>

              {/* New Password Fields */}

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="newPassword" className={labelClass}>
                    New Password
                  </label>

                  <PasswordInput
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    show={showPassword.new}
                    onChange={handleChange}
                    onToggle={() => togglePassword("new")}
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    disabled={loading}
                  />

                  <p className="mt-2 text-xs font-medium text-slate-500">
                    Password must contain at least 6 characters.
                  </p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className={labelClass}>
                    Confirm New Password
                  </label>

                  <PasswordInput
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    show={showPassword.confirm}
                    onChange={handleChange}
                    onToggle={() => togglePassword("confirm")}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Button */}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#e2233d] px-6 text-sm font-bold text-white transition hover:bg-[#c91f35] disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" size={14} />
                      Changing Password...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

function PasswordInput({
  id,
  name,
  value,
  show,
  onChange,
  onToggle,
  placeholder,
  autoComplete,
  disabled,
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        value={value}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={onChange}
        disabled={disabled}
        className={inputClass}
      />

      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center text-slate-500 transition hover:text-[#16458f] disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={show ? "Hide password" : "Show password"}
        aria-pressed={show}
      >
        {show ? <FaEyeSlash size={17} /> : <FaEye size={17} />}
      </button>
    </div>
  );
}
