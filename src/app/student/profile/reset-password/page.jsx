// "use client";

// import { useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   FaCheckCircle,
//   FaChevronLeft,
//   FaEye,
//   FaEyeSlash,
//   FaKey,
//   FaLock,
//   FaShieldAlt,
//   FaSpinner,
// } from "react-icons/fa";
// import { toast } from "sonner";

// import { changePassword } from "@/features/API";

// const INITIAL_FORM = {
//   currentPassword: "",
//   newPassword: "",
//   confirmPassword: "",
// };

// const INITIAL_VISIBILITY = {
//   currentPassword: false,
//   newPassword: false,
//   confirmPassword: false,
// };

// const inputClass =
//   "h-9 w-full rounded-lg border border-[#DDE6F3] bg-white px-3 pr-10 text-sm font-semibold text-[#151515] outline-none transition placeholder:text-[11px] placeholder:font-medium placeholder:text-[#9AA3B2] focus:border-[#0D4598] focus:ring-2 focus:ring-[#EAF1FB] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400";

// const labelClass =
//   "mb-1.5 block text-[11px] font-black uppercase tracking-wide text-[#7B8190]";

// function getErrorMessage(error) {
//   return (
//     error?.response?.data?.message ||
//     error?.message ||
//     "Failed to change password."
//   );
// }

// export default function ResetPassword() {
//   const router = useRouter();

//   const [form, setForm] = useState(INITIAL_FORM);
//   const [showPassword, setShowPassword] = useState(INITIAL_VISIBILITY);
//   const [submitting, setSubmitting] = useState(false);

//   const passwordRules = useMemo(() => {
//     return {
//       minimumLength: form.newPassword.length >= 6,

//       hasUppercase: /[A-Z]/.test(form.newPassword),

//       hasLowercase: /[a-z]/.test(form.newPassword),

//       hasNumberOrSymbol: /[0-9!@#$%^&*(),.?":{}|<>]/.test(form.newPassword),

//       passwordsMatch:
//         Boolean(form.confirmPassword) &&
//         form.newPassword === form.confirmPassword,
//     };
//   }, [form.newPassword, form.confirmPassword]);

//   function handleBack() {
//     router.back();
//   }

//   function handleChange(event) {
//     const { name, value } = event.target;

//     setForm((previousForm) => ({
//       ...previousForm,
//       [name]: value,
//     }));
//   }

//   function togglePassword(field) {
//     setShowPassword((previousState) => ({
//       ...previousState,
//       [field]: !previousState[field],
//     }));
//   }

//   function validateForm() {
//     if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
//       toast.error("All password fields are required.");
//       return false;
//     }

//     if (form.newPassword.length < 6) {
//       toast.error("New password must be at least 6 characters long.");
//       return false;
//     }

//     if (form.newPassword !== form.confirmPassword) {
//       toast.error("New password and confirm password do not match.");
//       return false;
//     }

//     if (form.currentPassword === form.newPassword) {
//       toast.error("New password must be different from the current password.");
//       return false;
//     }

//     return true;
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       setSubmitting(true);

//       const response = await changePassword({
//         currentPassword: form.currentPassword,
//         newPassword: form.newPassword,
//         confirmPassword: form.confirmPassword,
//       });

//       toast.success(
//         response?.data?.message || "Password changed successfully.",
//       );

//       setForm(INITIAL_FORM);
//       setShowPassword(INITIAL_VISIBILITY);
//     } catch (error) {
//       toast.error(getErrorMessage(error));
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <main className="min-h-[calc(100vh-64px)] bg-[#F7F9FC] px-3 py-3 sm:px-4 lg:px-5">
//       <section className="mx-auto max-w-4xl">
//         <header className="mb-3 rounded-xl border border-[#E5EAF2] bg-white p-3 shadow-sm">
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex items-center gap-3">
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 disabled={submitting}
//                 aria-label="Go back"
//                 className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 <FaChevronLeft size={13} />
//               </button>

//               <div>
//                 <div className="mb-1 inline-flex rounded-md bg-[#EAF1FB] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-[#0D4598]">
//                   Account Security
//                 </div>

//                 <h1 className="text-lg font-black text-[#151515]">
//                   Change Password
//                 </h1>

//                 <p className="mt-0.5 text-xs font-medium text-[#7B8190]">
//                   Update your password to keep your account secure.
//                 </p>
//               </div>
//             </div>

//             <div className="inline-flex h-9 items-center gap-2 self-start rounded-lg border border-[#DDE6F3] bg-white px-3 text-xs font-black text-[#0D4598] sm:self-auto">
//               <FaShieldAlt size={13} />
//               Secure Account
//             </div>
//           </div>
//         </header>

//         <div className="overflow-hidden rounded-xl border border-[#E5EAF2] bg-white shadow-sm">
//           <div className="grid grid-cols-1 lg:grid-cols-12">
//             <aside className="border-b border-[#E5EAF2] bg-[#F8FAFD] p-4 lg:col-span-4 lg:border-b-0 lg:border-r">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF1FB] text-[#0D4598]">
//                 <FaLock size={16} />
//               </div>

//               <h2 className="mt-3 text-sm font-black text-[#151515]">
//                 Password Guidelines
//               </h2>

//               <p className="mt-1.5 text-xs leading-5 text-[#7B8190]">
//                 Choose a password that is difficult for other people to guess.
//               </p>

//               <div className="mt-4 space-y-2">
//                 <GuideItem
//                   title="Use at least 6 characters"
//                   completed={passwordRules.minimumLength}
//                 />

//                 <GuideItem
//                   title="Add uppercase and lowercase letters"
//                   completed={
//                     passwordRules.hasUppercase && passwordRules.hasLowercase
//                   }
//                 />

//                 <GuideItem
//                   title="Use a number or special character"
//                   completed={passwordRules.hasNumberOrSymbol}
//                 />

//                 <GuideItem
//                   title="Both new passwords match"
//                   completed={passwordRules.passwordsMatch}
//                 />
//               </div>
//             </aside>

//             <section className="p-4 lg:col-span-8">
//               <div className="mb-3 rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] px-3 py-2.5">
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598]">
//                     <FaKey size={14} />
//                   </div>

//                   <div>
//                     <h2 className="text-sm font-black text-[#151515]">
//                       Password Information
//                     </h2>

//                     <p className="mt-0.5 text-xs font-medium text-[#7B8190]">
//                       Enter your current password and choose a new one.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-3">
//                 <div>
//                   <label htmlFor="currentPassword" className={labelClass}>
//                     Current Password
//                   </label>

//                   <PasswordInput
//                     id="currentPassword"
//                     name="currentPassword"
//                     value={form.currentPassword}
//                     show={showPassword.currentPassword}
//                     disabled={submitting}
//                     placeholder="Enter current password"
//                     onChange={handleChange}
//                     onToggle={() => togglePassword("currentPassword")}
//                   />
//                 </div>

//                 <div className="grid gap-3 md:grid-cols-2">
//                   <div>
//                     <label htmlFor="newPassword" className={labelClass}>
//                       New Password
//                     </label>

//                     <PasswordInput
//                       id="newPassword"
//                       name="newPassword"
//                       value={form.newPassword}
//                       show={showPassword.newPassword}
//                       disabled={submitting}
//                       placeholder="Enter new password"
//                       onChange={handleChange}
//                       onToggle={() => togglePassword("newPassword")}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="confirmPassword" className={labelClass}>
//                       Confirm New Password
//                     </label>

//                     <PasswordInput
//                       id="confirmPassword"
//                       name="confirmPassword"
//                       value={form.confirmPassword}
//                       show={showPassword.confirmPassword}
//                       disabled={submitting}
//                       placeholder="Confirm new password"
//                       onChange={handleChange}
//                       onToggle={() => togglePassword("confirmPassword")}
//                     />
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap justify-end gap-2 border-t border-[#E5EAF2] pt-3">
//                   <button
//                     type="button"
//                     onClick={handleBack}
//                     disabled={submitting}
//                     className="inline-flex h-9 items-center justify-center rounded-lg border border-[#DDE6F3] bg-white px-4 text-xs font-black text-[#0D4598] transition hover:bg-[#EAF1FB] disabled:cursor-not-allowed disabled:opacity-60"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     disabled={submitting}
//                     className="inline-flex h-9 min-w-[155px] items-center justify-center gap-2 rounded-lg bg-[#0D4598] px-4 text-xs font-black text-white transition hover:bg-[#083777] disabled:cursor-not-allowed disabled:opacity-60"
//                   >
//                     {submitting ? (
//                       <FaSpinner size={13} className="animate-spin" />
//                     ) : (
//                       <FaKey size={13} />
//                     )}

//                     {submitting ? "Changing..." : "Change Password"}
//                   </button>
//                 </div>
//               </form>
//             </section>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

// function PasswordInput({
//   id,
//   name,
//   value,
//   show,
//   disabled,
//   placeholder,
//   onChange,
//   onToggle,
// }) {
//   return (
//     <div className="relative">
//       <input
//         id={id}
//         name={name}
//         type={show ? "text" : "password"}
//         value={value}
//         disabled={disabled}
//         autoComplete={
//           name === "currentPassword" ? "current-password" : "new-password"
//         }
//         placeholder={placeholder}
//         onChange={onChange}
//         className={inputClass}
//       />

//       <button
//         type="button"
//         onClick={onToggle}
//         disabled={disabled}
//         aria-label={show ? "Hide password" : "Show password"}
//         className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center text-[#7B8190] transition hover:text-[#0D4598] disabled:cursor-not-allowed disabled:opacity-50"
//       >
//         {show ? <FaEye size={15} /> : <FaEyeSlash size={15} />}
//       </button>
//     </div>
//   );
// }

// function GuideItem({ title, completed = false }) {
//   return (
//     <div
//       className={[
//         "flex items-center gap-2 rounded-lg border px-3 py-2 transition",
//         completed
//           ? "border-green-200 bg-green-50"
//           : "border-[#E5EAF2] bg-white",
//       ].join(" ")}
//     >
//       <FaCheckCircle
//         size={12}
//         className={completed ? "text-green-600" : "text-slate-300"}
//       />

//       <p
//         className={[
//           "text-[11px] font-bold",
//           completed ? "text-green-700" : "text-[#151515]",
//         ].join(" ")}
//       >
//         {title}
//       </p>
//     </div>
//   );
// }

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
    <main className="min-h-screen bg-white px-4 py-5 sm:px-6 sm:py-6">
      <div className="mx-auto w-full max-w-[1160px]">
        {/* HEADER */}
        <header>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={loading}
              aria-label="Go back"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E7ECF4] text-[25px] text-[#111827] transition hover:bg-[#DCE4F0] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <IoChevronBack />
            </button>

            <h1 className="text-[24px] font-bold text-[#174A9B] sm:text-[26px]">
              Reset Password
            </h1>
          </div>

          <p className="mt-2 text-[14px] font-normal leading-5 text-[#666666] sm:text-[15px]">
            Update your information to ensure accurate lesson scheduling and
            communication.
          </p>
        </header>

        {/* PASSWORD FORM */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-[14px] bg-[#E7ECF4] p-5 sm:p-6"
        >
          {/* CURRENT PASSWORD */}
          <div>
            <label
              htmlFor="currentPassword"
              className="mb-3 block text-[14px] font-semibold text-[#5F5F5F]"
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

            <p className="mt-3 text-[14px] leading-5 text-[#686868]">
              If you don’t have a password, skip the old password field
            </p>
          </div>

          {/* NEW PASSWORDS */}
          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            <div>
              <label
                htmlFor="newPassword"
                className="mb-3 block text-[14px] font-semibold text-[#5F5F5F]"
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
                className="mb-3 block text-[14px] font-semibold text-[#5F5F5F]"
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
            className="mt-12 flex h-12 min-w-[182px] items-center justify-center rounded-xl bg-[#D72638] px-5 text-[16px] font-bold text-white transition hover:bg-[#C41F31] disabled:cursor-not-allowed disabled:opacity-60"
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
        className="h-11 w-full rounded-xl border border-[#D4DDEA] bg-[#F6F8FB] px-4 pr-12 text-[14px] text-[#333333] outline-none transition placeholder:text-[#969696] focus:border-[#174A9B] focus:bg-white disabled:cursor-not-allowed disabled:opacity-70"
      />

      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center text-[20px] text-[#222222] transition hover:text-[#174A9B] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {show ? <FiEye /> : <FiEyeOff />}
      </button>
    </div>
  );
}
