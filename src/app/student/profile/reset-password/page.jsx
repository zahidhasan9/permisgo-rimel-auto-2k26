// "use client";

// import { FaChevronLeft, FaEye, FaEyeSlash } from "react-icons/fa";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const inputClass =
//   "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 pr-11 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#16458f] focus:ring-4 focus:ring-blue-50";

// const labelClass = "mb-2 block text-sm font-bold text-slate-600";

// export default function ResetPassword() {
//   const router = useRouter();

//   function handleBack() {
//     router.back();
//   }

//   const [showPassword, setShowPassword] = useState({
//     current: false,
//     new: false,
//     confirm: false,
//   });

//   const togglePassword = (field) => {
//     setShowPassword((prev) => ({
//       ...prev,
//       [field]: !prev[field],
//     }));
//   };

//   return (
//     <main className="min-h-screen bg-[#E8EEF8] px-4 py-5 sm:px-6 lg:px-8">
//       <section className="mx-auto max-w-4xl">
//         {/* Header */}
//         <header className="mb-5 flex items-start gap-3">
//           <button
//             type="button"
//             onClick={handleBack}
//             className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#16458f] shadow-sm transition hover:bg-blue-50"
//           >
//             <FaChevronLeft size={14} />
//           </button>

//           <div>
//             <h1 className="text-[24px] font-bold leading-tight text-[#16458f]">
//               Reset Password
//             </h1>
//             <p className="mt-1 max-w-xl text-sm leading-5 text-slate-500">
//               Update your password to keep your account secure.
//             </p>
//           </div>
//         </header>

//         {/* Card */}
//         <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-5">
//           <form className="space-y-5">
//             {/* Current Password */}
//             <div>
//               <label className={labelClass}>Current Password</label>

//               <PasswordInput
//                 show={showPassword.current}
//                 onToggle={() => togglePassword("current")}
//               />

//               <p className="mt-2 text-xs font-medium text-slate-500">
//                 If you don&apos;t have a password, skip the old password field.
//               </p>
//             </div>

//             {/* New Password Fields */}
//             <div className="grid gap-4 md:grid-cols-2">
//               <div>
//                 <label className={labelClass}>New Password</label>
//                 <PasswordInput
//                   show={showPassword.new}
//                   onToggle={() => togglePassword("new")}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Confirm New Password</label>
//                 <PasswordInput
//                   show={showPassword.confirm}
//                   onToggle={() => togglePassword("confirm")}
//                 />
//               </div>
//             </div>

//             {/* Button */}
//             <div className="flex justify-end pt-2">
//               <button
//                 type="button"
//                 className="h-11 w-full rounded-xl bg-[#e2233d] px-6 text-sm font-bold text-white transition hover:bg-[#c91f35] sm:w-auto"
//               >
//                 Change Password
//               </button>
//             </div>
//           </form>
//         </div>
//       </section>
//     </main>
//   );
// }

// function PasswordInput({ show, onToggle }) {
//   return (
//     <div className="relative">
//       <input
//         type={show ? "text" : "password"}
//         placeholder="Write here"
//         className={inputClass}
//       />

//       <button
//         type="button"
//         onClick={onToggle}
//         className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center text-slate-500 transition hover:text-[#16458f]"
//       >
//         {show ? <FaEye size={17} /> : <FaEyeSlash size={17} />}
//       </button>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaChevronLeft,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaLock,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

const inputClass =
  "h-9 w-full rounded-lg border border-[#DDE6F3] bg-white px-3 pr-10 text-sm font-semibold text-[#151515] outline-none transition placeholder:text-[11px] placeholder:font-medium placeholder:text-[#9AA3B2] focus:border-[#0D4598] focus:ring-3 focus:ring-[#EAF1FB]";

const labelClass =
  "mb-1.5 block text-[11px] font-black uppercase tracking-wide text-[#7B8190]";

export default function ResetPassword() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleBack = () => {
    router.back();
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-3 sm:px-5 lg:px-6">
      <section className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-3 rounded-xl border border-[#E5EAF2] bg-white p-3 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
              >
                <FaChevronLeft size={13} />
              </button>

              <div>
                <div className="mb-1 inline-flex rounded-md bg-[#EAF1FB] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-[#0D4598]">
                  Admin Panel / Account Security
                </div>

                <h1 className="text-lg font-black text-[#151515]">
                  Reset Password
                </h1>

                <p className="mt-0.5 text-xs font-medium text-[#7B8190]">
                  Update your password to keep your account secure.
                </p>
              </div>
            </div>

            <div className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#DDE6F3] bg-white px-3 text-xs font-black text-[#0D4598]">
              <FaShieldAlt size={13} />
              Secure Account
            </div>
          </div>
        </header>

        {/* Main Card */}
        <div className="overflow-hidden rounded-xl border border-[#E5EAF2] bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Info Panel */}
            <aside className="border-b border-[#E5EAF2] bg-[#F8FAFD] p-4 lg:col-span-4 lg:border-b-0 lg:border-r">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF1FB] text-[#0D4598]">
                <FaLock size={16} />
              </div>

              <h2 className="mt-3 text-sm font-black text-[#151515]">
                Password Guidelines
              </h2>

              <p className="mt-1.5 text-xs leading-5 text-[#7B8190]">
                Use a strong password to protect your account and keep your
                information safe.
              </p>

              <div className="mt-4 space-y-2">
                <GuideItem title="Use 8+ characters" />
                <GuideItem title="Add uppercase and lowercase letters" />
                <GuideItem title="Use number or special character" />
              </div>
            </aside>

            {/* Form Panel */}
            <section className="p-4 lg:col-span-8">
              <div className="mb-3 rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] px-3 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598]">
                    <FaKey size={14} />
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-[#151515]">
                      Change Password
                    </h3>
                    <p className="mt-0.5 text-xs font-medium text-[#7B8190]">
                      Enter current password and set a new password.
                    </p>
                  </div>
                </div>
              </div>

              <form className="space-y-3">
                {/* Current Password */}
                <div>
                  <label className={labelClass}>Current Password</label>

                  <PasswordInput
                    show={showPassword.current}
                    onToggle={() => togglePassword("current")}
                  />

                  <p className="mt-1 text-[11px] font-medium text-[#7B8190]">
                    If you don&apos;t have a password, skip this field.
                  </p>
                </div>

                {/* New Password Fields */}
                <div className="grid gap-3 md:grid-cols-2">
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
                <div className="flex flex-wrap justify-end gap-2 border-t border-[#E5EAF2] pt-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex h-9 items-center justify-center rounded-lg border border-[#DDE6F3] bg-white px-4 text-xs font-black text-[#0D4598] transition hover:bg-[#EAF1FB]"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#0D4598] px-4 text-xs font-black text-white transition hover:bg-[#083777]"
                  >
                    <FaKey size={13} />
                    Change Password
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
        className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center text-[#7B8190] transition hover:text-[#0D4598]"
      >
        {show ? <FaEye size={15} /> : <FaEyeSlash size={15} />}
      </button>
    </div>
  );
}

function GuideItem({ title }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-[#E5EAF2] bg-white px-3 py-2">
      <FaCheckCircle size={12} className="text-green-600" />
      <p className="text-[11px] font-bold text-[#151515]">{title}</p>
    </div>
  );
}
