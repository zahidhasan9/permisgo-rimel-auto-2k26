"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaCheckCircle,
  FaChevronLeft,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaLock,
  FaShieldAlt,
  FaSpinner,
} from "react-icons/fa";
import { toast } from "sonner";

import { changePassword } from "@/features/API";

const INITIAL_FORM = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const INITIAL_VISIBILITY = {
  currentPassword: false,
  newPassword: false,
  confirmPassword: false,
};

const inputClass =
  "h-9 w-full rounded-lg border border-[#DDE6F3] bg-white px-3 pr-10 text-sm font-semibold text-[#151515] outline-none transition placeholder:text-[11px] placeholder:font-medium placeholder:text-[#9AA3B2] focus:border-[#0D4598] focus:ring-2 focus:ring-[#EAF1FB] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400";

const labelClass =
  "mb-1.5 block text-[11px] font-black uppercase tracking-wide text-[#7B8190]";

function getErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Failed to change password."
  );
}

export default function ResetPassword() {
  const router = useRouter();

  const [form, setForm] = useState(INITIAL_FORM);
  const [showPassword, setShowPassword] = useState(INITIAL_VISIBILITY);
  const [submitting, setSubmitting] = useState(false);

  const passwordRules = useMemo(() => {
    return {
      minimumLength: form.newPassword.length >= 6,

      hasUppercase: /[A-Z]/.test(form.newPassword),

      hasLowercase: /[a-z]/.test(form.newPassword),

      hasNumberOrSymbol: /[0-9!@#$%^&*(),.?":{}|<>]/.test(form.newPassword),

      passwordsMatch:
        Boolean(form.confirmPassword) &&
        form.newPassword === form.confirmPassword,
    };
  }, [form.newPassword, form.confirmPassword]);

  function handleBack() {
    router.back();
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
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
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      toast.error("All password fields are required.");
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
      toast.error("New password must be different from the current password.");
      return false;
    }

    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);

      const response = await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });

      toast.success(
        response?.data?.message || "Password changed successfully.",
      );

      setForm(INITIAL_FORM);
      setShowPassword(INITIAL_VISIBILITY);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#F7F9FC] px-3 py-3 sm:px-4 lg:px-5">
      <section className="mx-auto max-w-4xl">
        <header className="mb-3 rounded-xl border border-[#E5EAF2] bg-white p-3 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleBack}
                disabled={submitting}
                aria-label="Go back"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaChevronLeft size={13} />
              </button>

              <div>
                <div className="mb-1 inline-flex rounded-md bg-[#EAF1FB] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-[#0D4598]">
                  Account Security
                </div>

                <h1 className="text-lg font-black text-[#151515]">
                  Change Password
                </h1>

                <p className="mt-0.5 text-xs font-medium text-[#7B8190]">
                  Update your password to keep your account secure.
                </p>
              </div>
            </div>

            <div className="inline-flex h-9 items-center gap-2 self-start rounded-lg border border-[#DDE6F3] bg-white px-3 text-xs font-black text-[#0D4598] sm:self-auto">
              <FaShieldAlt size={13} />
              Secure Account
            </div>
          </div>
        </header>

        <div className="overflow-hidden rounded-xl border border-[#E5EAF2] bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <aside className="border-b border-[#E5EAF2] bg-[#F8FAFD] p-4 lg:col-span-4 lg:border-b-0 lg:border-r">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF1FB] text-[#0D4598]">
                <FaLock size={16} />
              </div>

              <h2 className="mt-3 text-sm font-black text-[#151515]">
                Password Guidelines
              </h2>

              <p className="mt-1.5 text-xs leading-5 text-[#7B8190]">
                Choose a password that is difficult for other people to guess.
              </p>

              <div className="mt-4 space-y-2">
                <GuideItem
                  title="Use at least 6 characters"
                  completed={passwordRules.minimumLength}
                />

                <GuideItem
                  title="Add uppercase and lowercase letters"
                  completed={
                    passwordRules.hasUppercase && passwordRules.hasLowercase
                  }
                />

                <GuideItem
                  title="Use a number or special character"
                  completed={passwordRules.hasNumberOrSymbol}
                />

                <GuideItem
                  title="Both new passwords match"
                  completed={passwordRules.passwordsMatch}
                />
              </div>
            </aside>

            <section className="p-4 lg:col-span-8">
              <div className="mb-3 rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] px-3 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598]">
                    <FaKey size={14} />
                  </div>

                  <div>
                    <h2 className="text-sm font-black text-[#151515]">
                      Password Information
                    </h2>

                    <p className="mt-0.5 text-xs font-medium text-[#7B8190]">
                      Enter your current password and choose a new one.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label htmlFor="currentPassword" className={labelClass}>
                    Current Password
                  </label>

                  <PasswordInput
                    id="currentPassword"
                    name="currentPassword"
                    value={form.currentPassword}
                    show={showPassword.currentPassword}
                    disabled={submitting}
                    placeholder="Enter current password"
                    onChange={handleChange}
                    onToggle={() => togglePassword("currentPassword")}
                  />
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label htmlFor="newPassword" className={labelClass}>
                      New Password
                    </label>

                    <PasswordInput
                      id="newPassword"
                      name="newPassword"
                      value={form.newPassword}
                      show={showPassword.newPassword}
                      disabled={submitting}
                      placeholder="Enter new password"
                      onChange={handleChange}
                      onToggle={() => togglePassword("newPassword")}
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className={labelClass}>
                      Confirm New Password
                    </label>

                    <PasswordInput
                      id="confirmPassword"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      show={showPassword.confirmPassword}
                      disabled={submitting}
                      placeholder="Confirm new password"
                      onChange={handleChange}
                      onToggle={() => togglePassword("confirmPassword")}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap justify-end gap-2 border-t border-[#E5EAF2] pt-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={submitting}
                    className="inline-flex h-9 items-center justify-center rounded-lg border border-[#DDE6F3] bg-white px-4 text-xs font-black text-[#0D4598] transition hover:bg-[#EAF1FB] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex h-9 min-w-[155px] items-center justify-center gap-2 rounded-lg bg-[#0D4598] px-4 text-xs font-black text-white transition hover:bg-[#083777] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <FaSpinner size={13} className="animate-spin" />
                    ) : (
                      <FaKey size={13} />
                    )}

                    {submitting ? "Changing..." : "Change Password"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

function PasswordInput({
  id,
  name,
  value,
  show,
  disabled,
  placeholder,
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
        autoComplete={
          name === "currentPassword" ? "current-password" : "new-password"
        }
        placeholder={placeholder}
        onChange={onChange}
        className={inputClass}
      />

      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center text-[#7B8190] transition hover:text-[#0D4598] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {show ? <FaEye size={15} /> : <FaEyeSlash size={15} />}
      </button>
    </div>
  );
}

function GuideItem({ title, completed = false }) {
  return (
    <div
      className={[
        "flex items-center gap-2 rounded-lg border px-3 py-2 transition",
        completed
          ? "border-green-200 bg-green-50"
          : "border-[#E5EAF2] bg-white",
      ].join(" ")}
    >
      <FaCheckCircle
        size={12}
        className={completed ? "text-green-600" : "text-slate-300"}
      />

      <p
        className={[
          "text-[11px] font-bold",
          completed ? "text-green-700" : "text-[#151515]",
        ].join(" ")}
      >
        {title}
      </p>
    </div>
  );
}
