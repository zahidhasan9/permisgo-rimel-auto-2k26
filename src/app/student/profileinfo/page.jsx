"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FaCamera,
  FaCheckCircle,
  FaEnvelope,
  FaGraduationCap,
  FaKey,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSave,
  FaSpinner,
  FaUser,
} from "react-icons/fa";
import { getLoggedInUser, updateProfile, changePassword } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const emptyProfile = {
  name: "",
  email: "",
  phone: "",
  designation: "",
  gender: "",
  dateOfBirth: "",
  address: "",
  city: "",
  country: "",
  language: "",
  bio: "",
  avatar: "",
};

const emptyPassword = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function getPayloadUser(res) {
  return res?.data?.data?.user || res?.data?.user || res?.data?.data || null;
}

function formatDateInput(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  icon: Icon,
  disabled = false,
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-500">
        {label}
      </span>

      <div className="relative">
        {Icon ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon size={14} />
          </span>
        ) : null}

        <input
          type={type}
          name={name}
          value={value || ""}
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder}
          className={`h-11 w-full rounded-xl border border-slate-200 bg-[#F7F9FC] px-3 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-50 ${
            Icon ? "pl-9" : ""
          } ${disabled ? "cursor-not-allowed opacity-70" : ""}`}
        />
      </div>
    </label>
  );
}

function SelectField({ label, name, value, onChange, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-500">
        {label}
      </span>

      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        className="h-11 w-full rounded-xl border border-slate-200 bg-[#F7F9FC] px-3 text-sm font-bold text-slate-800 outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-50"
      >
        {children}
      </select>
    </label>
  );
}

function Alert({ type = "success", children }) {
  const className =
    type === "error"
      ? "border-rose-200 bg-rose-50 text-rose-700"
      : "border-emerald-200 bg-emerald-50 text-emerald-700";

  return (
    <div
      className={`mb-4 rounded-2xl border px-4 py-3 text-sm font-bold ${className}`}
    >
      {children}
    </div>
  );
}

export default function StudentProfilePage() {
  const [profile, setProfile] = useState(emptyProfile);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [passwordForm, setPasswordForm] = useState(emptyPassword);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const displayImage = useMemo(() => {
    if (avatarPreview) return avatarPreview;
    if (profile.avatar) return mediaUrl(profile.avatar);
    return "";
  }, [avatarPreview, profile.avatar]);

  const initial = useMemo(() => {
    return String(profile.name || profile.email || "S")
      .trim()
      .charAt(0)
      .toUpperCase();
  }, [profile.name, profile.email]);

  async function loadProfile() {
    try {
      setLoading(true);
      setError("");

      const res = await getLoggedInUser();
      const user = getPayloadUser(res);

      if (!user) throw new Error("Profile data not found.");

      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        designation: user.designation || "",
        gender: user.gender || "",
        dateOfBirth: formatDateInput(user.dateOfBirth),
        address: user.address || "",
        city: user.city || "",
        country: user.country || "",
        language: user.language || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
      });

      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to load profile.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  function handleProfileChange(e) {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handlePasswordChange(e) {
    const { name, value } = e.target;

    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];

    setError("");
    setSuccess("");

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG and WEBP image files are allowed.");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setError("Image size must be less than 3MB.");
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (!profile.name.trim()) {
        setError("Name is required.");
        return;
      }

      const formData = new FormData();

      formData.append("name", profile.name);
      formData.append("phone", profile.phone || "");
      formData.append("designation", profile.designation || "");
      formData.append("gender", profile.gender || "");
      formData.append("dateOfBirth", profile.dateOfBirth || "");
      formData.append("address", profile.address || "");
      formData.append("city", profile.city || "");
      formData.append("country", profile.country || "");
      formData.append("language", profile.language || "");
      formData.append("bio", profile.bio || "");

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const res = await updateProfile(formData);
      const updatedUser = getPayloadUser(res);

      if (!updatedUser) throw new Error("Profile update response not found.");

      setProfile({
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        phone: updatedUser.phone || "",
        designation: updatedUser.designation || "",
        gender: updatedUser.gender || "",
        dateOfBirth: formatDateInput(updatedUser.dateOfBirth),
        address: updatedUser.address || "",
        city: updatedUser.city || "",
        country: updatedUser.country || "",
        language: updatedUser.language || "",
        bio: updatedUser.bio || "",
        avatar: updatedUser.avatar || "",
      });

      setAvatarFile(null);
      setAvatarPreview("");

      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.dispatchEvent(
        new CustomEvent("profile-updated", { detail: updatedUser }),
      );

      setSuccess("Student profile updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update profile.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();

    try {
      setPasswordSaving(true);
      setPasswordError("");
      setPasswordSuccess("");

      if (
        !passwordForm.currentPassword ||
        !passwordForm.newPassword ||
        !passwordForm.confirmPassword
      ) {
        setPasswordError("All password fields are required.");
        return;
      }

      if (passwordForm.newPassword.length < 6) {
        setPasswordError("New password must be at least 6 characters.");
        return;
      }

      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        setPasswordError("New password and confirm password do not match.");
        return;
      }

      await changePassword(passwordForm);

      setPasswordForm(emptyPassword);
      setPasswordSuccess("Password changed successfully.");
    } catch (err) {
      setPasswordError(
        err.response?.data?.message ||
          err.message ||
          "Failed to change password.",
      );
    } finally {
      setPasswordSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F9FC] p-4">
        <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center gap-3 text-sm font-black text-emerald-700">
            <FaSpinner className="animate-spin" />
            Loading student profile...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F9FC] p-3 md:p-4 lg:p-5">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-1 text-xs font-bold text-slate-400">
              <span>Student</span>
              <span>/</span>
              <span className="text-slate-600">Edit Profile</span>
            </div>

            <h1 className="text-2xl font-black text-slate-900">
              Edit Student Profile
            </h1>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Update student information, profile image and password.
            </p>
          </div>

          <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700">
            {profile.email}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                {displayImage ? (
                  <img
                    src={displayImage}
                    alt="Student profile"
                    className="h-36 w-36 rounded-3xl border border-slate-200 object-cover"
                  />
                ) : (
                  <div className="flex h-36 w-36 items-center justify-center rounded-3xl bg-emerald-600 text-5xl font-black text-white">
                    {initial}
                  </div>
                )}

                <label className="absolute -bottom-2 -right-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border-4 border-white bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700">
                  <FaCamera size={16} />
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>

              <h2 className="mt-4 text-xl font-black text-slate-900">
                {profile.name || "Student User"}
              </h2>

              <p className="mt-1 text-sm font-semibold text-slate-500">
                {profile.designation || "Student"}
              </p>

              <div className="mt-4 w-full rounded-2xl bg-[#F7F9FC] p-3 text-left">
                <div className="mb-3 flex items-center gap-3 text-sm font-bold text-slate-600">
                  <FaEnvelope className="text-emerald-600" />
                  <span className="truncate">{profile.email || "-"}</span>
                </div>

                <div className="mb-3 flex items-center gap-3 text-sm font-bold text-slate-600">
                  <FaPhoneAlt className="text-emerald-600" />
                  <span>{profile.phone || "-"}</span>
                </div>

                <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                  <FaMapMarkerAlt className="text-emerald-600" />
                  <span>
                    {[profile.city, profile.country]
                      .filter(Boolean)
                      .join(", ") || "-"}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-xs font-semibold leading-5 text-slate-400">
                Image limit: JPG, PNG or WEBP. Maximum size 3MB.
              </p>
            </div>
          </aside>

          <section className="space-y-4">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <FaGraduationCap />
                </div>

                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    Student Information
                  </h2>
                  <p className="text-sm font-medium text-slate-500">
                    Basic student account details.
                  </p>
                </div>
              </div>

              {error ? <Alert type="error">{error}</Alert> : null}

              {success ? (
                <Alert>
                  <span className="inline-flex items-center gap-2">
                    <FaCheckCircle /> {success}
                  </span>
                </Alert>
              ) : null}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field
                  label="Full Name"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  placeholder="Enter full name"
                  icon={FaUser}
                />

                <Field
                  label="Email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  placeholder="Email"
                  icon={FaEnvelope}
                  disabled
                />

                <Field
                  label="Phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  placeholder="Enter phone number"
                  icon={FaPhoneAlt}
                />

                <Field
                  label="Student Type / Batch"
                  name="designation"
                  value={profile.designation}
                  onChange={handleProfileChange}
                  placeholder="Beginner / Driving Student / HSC Batch"
                  icon={FaGraduationCap}
                />

                <SelectField
                  label="Gender"
                  name="gender"
                  value={profile.gender}
                  onChange={handleProfileChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </SelectField>

                <Field
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={handleProfileChange}
                />

                <Field
                  label="City"
                  name="city"
                  value={profile.city}
                  onChange={handleProfileChange}
                  placeholder="Enter city"
                />

                <Field
                  label="Country"
                  name="country"
                  value={profile.country}
                  onChange={handleProfileChange}
                  placeholder="Enter country"
                />

                <Field
                  label="Language"
                  name="language"
                  value={profile.language}
                  onChange={handleProfileChange}
                  placeholder="English / Bangla / French"
                />

                <Field
                  label="Address"
                  name="address"
                  value={profile.address}
                  onChange={handleProfileChange}
                  placeholder="Enter address"
                  icon={FaMapMarkerAlt}
                />
              </div>

              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-500">
                  Bio
                </span>

                <textarea
                  name="bio"
                  value={profile.bio || ""}
                  onChange={handleProfileChange}
                  rows={4}
                  maxLength={500}
                  placeholder="Write short student profile bio..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-[#F7F9FC] px-3 py-3 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-50"
                />

                <span className="mt-1 block text-right text-xs font-semibold text-slate-400">
                  {(profile.bio || "").length}/500
                </span>
              </label>

              <div className="mt-5 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
                  {saving ? "Saving..." : "Save Student Profile"}
                </button>
              </div>
            </form>

            <form
              onSubmit={handlePasswordSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <FaKey />
                </div>

                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    Change Password
                  </h2>
                  <p className="text-sm font-medium text-slate-500">
                    Keep student account secure.
                  </p>
                </div>
              </div>

              {passwordError ? (
                <Alert type="error">{passwordError}</Alert>
              ) : null}

              {passwordSuccess ? <Alert>{passwordSuccess}</Alert> : null}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Field
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Current password"
                  icon={FaKey}
                />

                <Field
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="New password"
                  icon={FaKey}
                />

                <Field
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm password"
                  icon={FaKey}
                />
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="submit"
                  disabled={passwordSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {passwordSaving ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaKey />
                  )}
                  {passwordSaving ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
