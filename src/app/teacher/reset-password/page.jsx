"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoChevronBack } from "react-icons/io5";
import { toast } from "sonner";

import { changePassword } from "@/features/API";

const inputClass =
  "h-12 w-full rounded-xl border border-[#D4DDEA] bg-[#F6F8FB] px-3 pr-11 text-base text-[#333333] outline-none transition placeholder:text-[#969696] focus:border-[#174A9B] focus:bg-white disabled:cursor-not-allowed disabled:opacity-70 sm:h-11 sm:px-4 sm:pr-12 sm:text-[14px]";

const labelClass =
  "mb-2 block text-xs font-semibold text-[#5F5F5F] sm:mb-3 sm:text-[14px]";

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
    <main className="min-h-screen overflow-x-hidden bg-white px-2.5 py-4 pb-24 sm:px-6 sm:py-6 sm:pb-8">
      <section className="mx-auto w-full max-w-4xl min-w-0">
        {/* Header */}

        <header>
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={loading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E7ECF4] text-xl text-[#111827] transition hover:bg-[#DCE4F0] disabled:cursor-not-allowed disabled:opacity-60 sm:h-11 sm:w-11 sm:text-[25px]"
              aria-label="Go back"
            >
              <IoChevronBack />
            </button>

            <h1 className="min-w-0 truncate text-xl font-bold text-[#174A9B] sm:text-[26px]">
              Reset Password
            </h1>
          </div>
          <p className="mt-2 text-xs font-normal leading-5 text-[#666666] sm:text-[15px]">
            Update your information to ensure accurate lesson scheduling and
            communication.
          </p>
        </header>

        {/* Card */}

        <form
          className="mt-5 min-w-0 rounded-[14px] bg-[#E7ECF4] p-3.5 sm:mt-8 sm:p-6"
          onSubmit={handleSubmit}
          noValidate
        >
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

            <p className="mt-2 text-[11px] leading-4 text-[#686868] sm:mt-3 sm:text-[14px] sm:leading-5">
              If you don&apos;t have a password, skip the old password field
            </p>
          </div>

          {/* New Password Fields */}

          <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-7 sm:grid-cols-2 sm:gap-6">
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

          <div>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#D72638] px-5 text-base font-bold text-white transition hover:bg-[#C41F31] disabled:cursor-not-allowed disabled:opacity-60 sm:mt-12 sm:w-auto sm:min-w-[182px]"
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
      </section>
    </main>
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
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-lg text-[#222222] transition hover:text-[#174A9B] disabled:cursor-not-allowed disabled:opacity-60 sm:right-4 sm:text-[20px]"
        aria-label={show ? "Hide password" : "Show password"}
        aria-pressed={show}
      >
        {show ? <FiEye /> : <FiEyeOff />}
      </button>
    </div>
  );
}
