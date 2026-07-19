"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FaCamera,
  FaCheckCircle,
  FaKey,
  FaSave,
  FaSpinner,
} from "react-icons/fa";
import { changePassword, getLoggedInUser, updateProfile } from "@/features/API";
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

function getPayloadUser(response) {
  return (
    response?.data?.data?.user ||
    response?.data?.user ||
    response?.data?.data ||
    null
  );
}

function formatDateInput(value) {
  if (!value) return "";

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function getErrorMessage(error, fallback) {
  return error?.response?.data?.message || error?.message || fallback;
}

export default function AdminProfilePage() {
  const [profile, setProfile] = useState(emptyProfile);
  const [passwordForm, setPasswordForm] = useState(emptyPassword);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [profileMessage, setProfileMessage] = useState({
    type: "",
    text: "",
  });
  const [passwordMessage, setPasswordMessage] = useState({
    type: "",
    text: "",
  });

  const displayImage = useMemo(() => {
    if (avatarPreview) return avatarPreview;
    return profile.avatar ? mediaUrl(profile.avatar) : "";
  }, [avatarPreview, profile.avatar]);

  const initials = useMemo(() => {
    return String(profile.name || profile.email || "A")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [profile.name, profile.email]);

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  async function loadProfile() {
    try {
      setLoading(true);
      setProfileMessage({ type: "", text: "" });

      const response = await getLoggedInUser();
      const user = getPayloadUser(response);

      if (!user) {
        throw new Error("Profile data not found.");
      }

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
    } catch (error) {
      setProfileMessage({
        type: "error",
        text: getErrorMessage(error, "Failed to load profile."),
      });
    } finally {
      setLoading(false);
    }
  }

  function handleProfileChange(event) {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handlePasswordChange(event) {
    const { name, value } = event.target;

    setPasswordForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleAvatarChange(event) {
    const file = event.target.files?.[0];
    setProfileMessage({ type: "", text: "" });

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setProfileMessage({
        type: "error",
        text: "Only JPG, PNG and WEBP images are allowed.",
      });
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setProfileMessage({
        type: "error",
        text: "Image size must be less than 3MB.",
      });
      return;
    }

    if (avatarPreview) URL.revokeObjectURL(avatarPreview);

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleProfileSubmit(event) {
    event.preventDefault();

    if (!profile.name.trim()) {
      setProfileMessage({
        type: "error",
        text: "Name is required.",
      });
      return;
    }

    try {
      setSavingProfile(true);
      setProfileMessage({ type: "", text: "" });

      const formData = new FormData();

      [
        "name",
        "phone",
        "designation",
        "gender",
        "dateOfBirth",
        "address",
        "city",
        "country",
        "language",
        "bio",
      ].forEach((field) => {
        formData.append(field, profile[field] || "");
      });

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const response = await updateProfile(formData);
      const updatedUser = getPayloadUser(response);

      if (!updatedUser) {
        throw new Error("Profile update response not found.");
      }

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

      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
      setAvatarFile(null);
      setAvatarPreview("");

      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.dispatchEvent(
        new CustomEvent("profile-updated", {
          detail: updatedUser,
        }),
      );

      setProfileMessage({
        type: "success",
        text: "Profile updated successfully.",
      });
    } catch (error) {
      setProfileMessage({
        type: "error",
        text: getErrorMessage(error, "Failed to update profile."),
      });
    } finally {
      setSavingProfile(false);
    }
  }

  async function handlePasswordSubmit(event) {
    event.preventDefault();
    setPasswordMessage({ type: "", text: "" });

    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage({
        type: "error",
        text: "All password fields are required.",
      });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage({
        type: "error",
        text: "New password must be at least 6 characters.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({
        type: "error",
        text: "New password and confirmation do not match.",
      });
      return;
    }

    try {
      setSavingPassword(true);
      await changePassword(passwordForm);

      setPasswordForm(emptyPassword);
      setPasswordMessage({
        type: "success",
        text: "Password changed successfully.",
      });
    } catch (error) {
      setPasswordMessage({
        type: "error",
        text: getErrorMessage(error, "Failed to change password."),
      });
    } finally {
      setSavingPassword(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
          <FaSpinner className="animate-spin" />
          Loading profile...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-5 md:px-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-5">
          <h1 className="text-2xl font-bold text-slate-900">Admin Profile</h1>
          <p className="mt-1 text-sm text-slate-500">
            Update your personal information and account password.
          </p>
        </header>

        <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative w-fit">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt={profile.name || "Admin profile"}
                  className="h-24 w-24 rounded-2xl border border-slate-200 object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-900 text-2xl font-bold text-white">
                  {initials}
                </div>
              )}

              <label className="absolute -bottom-2 -right-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-slate-900 text-white shadow-sm transition hover:bg-slate-700">
                <FaCamera size={13} />
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-xl font-bold text-slate-900">
                {profile.name || "Admin User"}
              </h2>
              <p className="mt-1 truncate text-sm text-slate-500">
                {profile.email}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {profile.designation || "Administrator"}
              </p>
              <p className="mt-2 text-xs text-slate-400">
                JPG, PNG or WEBP · Maximum 3MB
              </p>
            </div>
          </div>
        </section>

        <div className="space-y-5">
          <form
            onSubmit={handleProfileSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-5">
              <h2 className="text-lg font-bold text-slate-900">
                Profile information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Basic account and contact details.
              </p>
            </div>

            <Message message={profileMessage} />

            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                label="Full name"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                placeholder="Enter full name"
              />

              <InputField
                label="Email"
                name="email"
                value={profile.email}
                disabled
              />

              <InputField
                label="Phone"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                placeholder="Enter phone number"
              />

              <InputField
                label="Designation"
                name="designation"
                value={profile.designation}
                onChange={handleProfileChange}
                placeholder="Administrator"
              />

              <SelectField
                label="Gender"
                name="gender"
                value={profile.gender}
                onChange={handleProfileChange}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </SelectField>

              <InputField
                label="Date of birth"
                name="dateOfBirth"
                type="date"
                value={profile.dateOfBirth}
                onChange={handleProfileChange}
              />

              <InputField
                label="City"
                name="city"
                value={profile.city}
                onChange={handleProfileChange}
                placeholder="Enter city"
              />

              <InputField
                label="Country"
                name="country"
                value={profile.country}
                onChange={handleProfileChange}
                placeholder="Enter country"
              />

              <InputField
                label="Language"
                name="language"
                value={profile.language}
                onChange={handleProfileChange}
                placeholder="English"
              />

              <InputField
                label="Address"
                name="address"
                value={profile.address}
                onChange={handleProfileChange}
                placeholder="Enter address"
              />
            </div>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Bio
              </span>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleProfileChange}
                rows={4}
                maxLength={500}
                placeholder="Write a short bio"
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
              <span className="mt-1 block text-right text-xs text-slate-400">
                {profile.bio.length}/500
              </span>
            </label>

            <div className="mt-5 flex justify-end">
              <button
                type="submit"
                disabled={savingProfile}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savingProfile ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaSave />
                )}
                {savingProfile ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>

          <form
            onSubmit={handlePasswordSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-5">
              <h2 className="text-lg font-bold text-slate-900">
                Change password
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Use a strong password for your account.
              </p>
            </div>

            <Message message={passwordMessage} />

            <div className="grid gap-4 md:grid-cols-3">
              <InputField
                label="Current password"
                name="currentPassword"
                type="password"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Current password"
              />

              <InputField
                label="New password"
                name="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                placeholder="New password"
              />

              <InputField
                label="Confirm password"
                name="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm password"
              />
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="submit"
                disabled={savingPassword}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savingPassword ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaKey />
                )}
                {savingPassword ? "Updating..." : "Update password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
      />
    </label>
  );
}

function SelectField({ label, name, value, onChange, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
      >
        {children}
      </select>
    </label>
  );
}

function Message({ message }) {
  if (!message.text) return null;

  const isError = message.type === "error";

  return (
    <div
      className={`mb-4 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium ${
        isError
          ? "border-rose-200 bg-rose-50 text-rose-700"
          : "border-emerald-200 bg-emerald-50 text-emerald-700"
      }`}
    >
      {!isError && <FaCheckCircle className="shrink-0" />}
      {message.text}
    </div>
  );
}
