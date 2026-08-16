"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoChevronBack } from "react-icons/io5";
import { toast } from "sonner";

import { changePassword } from "@/features/API";

const initialForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function ChangePasswordPage() {
  const router = useRouter();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  function handleBack() {
    router.back();
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function togglePassword(fieldName) {
    setShowPassword((currentState) => ({
      ...currentState,
      [fieldName]: !currentState[fieldName],
    }));
  }

  function validateForm() {
    if (
      !form.currentPassword.trim() ||
      !form.newPassword.trim() ||
      !form.confirmPassword.trim()
    ) {
      toast.error("Please fill in all password fields.");
      return false;
    }

    if (form.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return false;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return false;
    }

    if (form.currentPassword === form.newPassword) {
      toast.error("New password must be different from current password.");
      return false;
    }

    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm() || loading) {
      return;
    }

    try {
      setLoading(true);

      const response = await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });

      toast.success(
        response?.data?.message || "Password changed successfully.",
      );

      setForm(initialForm);

      setShowPassword({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to change password.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-2.5 py-4 pb-24 sm:px-6 sm:py-6 sm:pb-8">
      <div className="mx-auto w-full max-w-4xl min-w-0">
        {/* HEADER */}
        <header>
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={loading}
              aria-label="Go back"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E7ECF4] text-xl text-[#111827] transition hover:bg-[#DCE4F0] disabled:cursor-not-allowed disabled:opacity-60 sm:h-11 sm:w-11 sm:text-[25px]"
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

        {/* PASSWORD FORM */}
        <form
          onSubmit={handleSubmit}
          className="mt-5 min-w-0 rounded-[14px] bg-[#E7ECF4] p-3.5 sm:mt-8 sm:p-6"
        >
          {/* CURRENT PASSWORD */}
          <div>
            <label
              htmlFor="currentPassword"
              className="mb-2 block text-xs font-semibold text-[#5F5F5F] sm:mb-3 sm:text-[14px]"
            >
              Current Password
            </label>

            <PasswordInput
              id="currentPassword"
              name="currentPassword"
              value={form.currentPassword}
              show={showPassword.currentPassword}
              disabled={loading}
              onChange={handleInputChange}
              onToggle={() => togglePassword("currentPassword")}
            />

            <p className="mt-2 text-[11px] leading-4 text-[#686868] sm:mt-3 sm:text-[14px] sm:leading-5">
              If you don’t have a password, skip the old password field
            </p>
          </div>

          {/* NEW PASSWORDS */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-7 sm:grid-cols-2 sm:gap-6">
            <div>
              <label
                htmlFor="newPassword"
                className="mb-2 block text-xs font-semibold text-[#5F5F5F] sm:mb-3 sm:text-[14px]"
              >
                New Password
              </label>

              <PasswordInput
                id="newPassword"
                name="newPassword"
                value={form.newPassword}
                show={showPassword.newPassword}
                disabled={loading}
                onChange={handleInputChange}
                onToggle={() => togglePassword("newPassword")}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-xs font-semibold text-[#5F5F5F] sm:mb-3 sm:text-[14px]"
              >
                Confirm the New Password
              </label>

              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                show={showPassword.confirmPassword}
                disabled={loading}
                onChange={handleInputChange}
                onToggle={() => togglePassword("confirmPassword")}
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-[#D72638] px-5 text-base font-bold text-white transition hover:bg-[#C41F31] disabled:cursor-not-allowed disabled:opacity-60 sm:mt-12 sm:w-auto sm:min-w-[182px]"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </main>
  );
}

function PasswordInput({
  id,
  name,
  value,
  show,
  disabled,
  onChange,
  onToggle,
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        value={value}
        disabled={disabled}
        placeholder="Write here"
        autoComplete={
          name === "currentPassword" ? "current-password" : "new-password"
        }
        onChange={onChange}
        className="h-12 w-full rounded-xl border border-[#D4DDEA] bg-[#F6F8FB] px-3 pr-11 text-base text-[#333333] outline-none transition placeholder:text-[#969696] focus:border-[#174A9B] focus:bg-white disabled:cursor-not-allowed disabled:opacity-70 sm:h-11 sm:px-4 sm:pr-12 sm:text-[14px]"
      />

      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-lg text-[#222222] transition hover:text-[#174A9B] disabled:cursor-not-allowed disabled:opacity-60 sm:right-4 sm:text-[20px]"
      >
        {show ? <FiEye /> : <FiEyeOff />}
      </button>
    </div>
  );
}
