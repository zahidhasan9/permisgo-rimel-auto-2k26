"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { clearUserState, register } from "@/features/userSlice";
import Logo from "../../../public/image/logo2.png";
import BangladeshFlag from "../../../public/image/ban-flag.png";
import GoogleLogo from "../../../public/image/googleLogo.png";

const fieldClass =
  "h-11 w-full rounded-[9px] border border-[#d8dce5] bg-white px-4 text-[13px] text-slate-800 outline-none transition placeholder:text-[#a3a8b2] focus:border-[#174a9b] focus:ring-2 focus:ring-[#174a9b]/10";

function PasswordField({ name, label, value, onChange }) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="Write here"
          autoComplete="new-password"
          minLength={6}
          required
          className={`${fieldClass} pr-11`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={`${visible ? "Hide" : "Show"} ${label}`}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-[#252a32]"
        >
          {visible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
}

export default function RegistrationForm({ role }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state) => state.user);
  const roleLabel = role === "teacher" ? "Teacher" : "Student";
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: "",
    offers: false,
    terms: false,
  });

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(clearUserState());
    const name = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
    if (!name || !form.email.trim() || !form.gender || !form.password) {
      toast.error("Name, email, gender and password are required.");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Password and confirm password do not match.");
      return;
    }
    if (!form.terms) {
      toast.error("Please accept the Terms & Conditions and Privacy Policy.");
      return;
    }
    try {
      const result = await dispatch(
        register({
          name,
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          password: form.password,
          gender: form.gender,
          role,
        }),
      ).unwrap();
      const user = (result?.data || result)?.user;
      toast.success(result?.message || `${roleLabel} registration successful.`);
      router.replace(
        (user?.role || role) === "teacher"
          ? "/teacher/dashboard"
          : "/student/dashboard",
      );
    } catch (message) {
      toast.error(message || "Registration failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#e9eef8] px-4 py-10 sm:px-6">
      <section className="mx-auto max-w-[890px] rounded-[14px] bg-white p-5 shadow-sm sm:p-8">
        <div className="rounded-[12px] bg-[#f4f7fd] p-4 sm:p-5">
          <div className="rounded-[11px] bg-white px-5 pb-5 pt-5 sm:px-6">
            <div className="text-center">
              <Image
                src={Logo}
                alt="Permis Go"
                priority
                className="mx-auto h-auto w-[145px]"
              />
              <h1 className="mt-5 text-2xl font-semibold text-[#202126]">
                Registration {roleLabel}
              </h1>
            </div>
            <form
              id="registration-form"
              onSubmit={handleSubmit}
              className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2"
            >
              <TextField
                name="firstName"
                label="Name"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Write name here"
                required
              />
              <TextField
                name="lastName"
                label="Last Name"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Write name here"
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Write email here"
                required
              />
              <div>
                <label htmlFor="phone" className="mb-2 block text-xs">
                  Phone Number
                </label>
                <div className="relative">
                  <Image
                    src={BangladeshFlag}
                    alt=""
                    className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full object-cover"
                  />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+880988900"
                    autoComplete="tel"
                    className={`${fieldClass} pl-11`}
                  />
                </div>
              </div>
              <fieldset>
                <legend className="mb-3 text-xs">Select Gender</legend>
                <div className="flex gap-6 text-xs">
                  {["male", "female"].map((gender) => (
                    <label
                      key={gender}
                      className="flex cursor-pointer items-center gap-2 capitalize"
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={form.gender === gender}
                        onChange={handleChange}
                        required
                        className="h-4 w-4 accent-[#25c849]"
                      />
                      {gender}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="hidden sm:block" aria-hidden="true" />
              <PasswordField
                name="password"
                label="Password"
                value={form.password}
                onChange={handleChange}
              />
              <PasswordField
                name="confirmPassword"
                label="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </form>
          </div>

          <div className="mt-7 space-y-3 text-[11px] text-[#4f535c]">
            <Check name="offers" checked={form.offers} onChange={handleChange}>
              I wish to benefit from the advice and offers from permisgo to
              obtain my license
            </Check>
            <Check
              name="terms"
              checked={form.terms}
              onChange={handleChange}
              required
            >
              By clicking Sign up, you agree to our{" "}
              <Link href="/terms" className="font-medium text-[#25b947]">
                Terms &amp; Condition
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="font-medium text-[#25b947]"
              >
                Privacy Policy
              </Link>
            </Check>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-[#173f86]">Sign Up</h2>
            <p className="mt-1 text-[13px]">Or continue with</p>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <button
              type="button"
              disabled
              className="flex h-[46px] items-center justify-center gap-1 rounded-[9px] border border-[#d3d9e4] bg-white text-[17px] text-black"
            >
              <FaApple /> iPhone
            </button>
            <button
              type="button"
              disabled
              className="flex h-[46px] items-center justify-center rounded-[9px] border border-[#d3d9e4] bg-white"
            >
              <Image
                src={GoogleLogo}
                alt="Google"
                className="h-auto w-[20px]"
              />
            </button>
          </div>
          <button
            form="registration-form"
            type="submit"
            disabled={loading}
            className="mt-6 h-12 w-full rounded-[9px] bg-[#df263d] text-[13px] font-semibold text-white transition hover:bg-[#c91f35] disabled:opacity-65"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </section>
    </main>
  );
}

function TextField({ name, label, type = "text", ...props }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={name}
        className={fieldClass}
        {...props}
      />
    </div>
  );
}

function Check({ name, checked, onChange, required, children }) {
  return (
    <label className="flex items-start gap-2">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        required={required}
        className="mt-px h-4 w-4 accent-[#174a9b]"
      />
      <span>{children}</span>
    </label>
  );
}
