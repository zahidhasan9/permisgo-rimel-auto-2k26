"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaCalendarAlt,
  FaCamera,
  FaCheckCircle,
  FaChevronDown,
  FaChevronLeft,
  FaExclamationCircle,
  FaSpinner,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { useRouter } from "next/navigation";

import {
  getTeacherProfile,
  updateProfile,
  updateTeacherProfile,
} from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  address: "",
  city: "",
  qualification: "",
  lessonType: "manual",
  availabilityStatus: "available",
  experienceYears: "0",
  hourlyRate: "0",
  bio: "",
  avatar: "",
};

const lessonTypeOptions = [
  {
    value: "manual",
    label: "Manual Car",
  },
  {
    value: "automatic",
    label: "Automatic Car",
  },
  {
    value: "code",
    label: "Code Lesson",
  },
  {
    value: "accompanied",
    label: "Accompanied Driving",
  },
  {
    value: "accelerated",
    label: "Accelerated Course",
  },
];

const availabilityOptions = [
  {
    value: "available",
    label: "Available",
  },
  {
    value: "unavailable",
    label: "Unavailable",
  },
];

const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#103f8f] focus:ring-4 focus:ring-blue-50";

const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

function formatDateForInput(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 10);
}

function splitFullName(fullName = "") {
  const nameParts = String(fullName).trim().split(/\s+/).filter(Boolean);

  if (nameParts.length === 0) {
    return {
      firstName: "",
      lastName: "",
    };
  }

  return {
    firstName: nameParts[0],
    lastName: nameParts.slice(1).join(" "),
  };
}

function getTeacherProfileData(response) {
  return response?.data?.data || response?.data?.profile || null;
}

function getUpdatedUser(response) {
  return response?.data?.data?.user || response?.data?.user || null;
}

function getErrorMessage(error, fallbackMessage) {
  return error?.response?.data?.message || error?.message || fallbackMessage;
}

export default function TeacherProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(initialForm);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fullName = useMemo(() => {
    return `${form.firstName} ${form.lastName}`.trim();
  }, [form.firstName, form.lastName]);

  const avatarSource = useMemo(() => {
    if (avatarPreview) {
      return avatarPreview;
    }

    if (form.avatar) {
      return mediaUrl(form.avatar);
    }

    return "";
  }, [avatarPreview, form.avatar]);

  const nameInitial = useMemo(() => {
    return String(fullName || form.email || "T")
      .trim()
      .charAt(0)
      .toUpperCase();
  }, [fullName, form.email]);

  useEffect(() => {
    loadTeacherProfile();
  }, []);

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  async function loadTeacherProfile() {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await getTeacherProfile();
      const teacherProfile = getTeacherProfileData(response);

      if (!teacherProfile) {
        throw new Error("Teacher profile data not found.");
      }

      const user = teacherProfile.user || {};
      const { firstName, lastName } = splitFullName(user.name);

      setForm({
        firstName,
        lastName,
        email: user.email || "",
        phone: user.phone || "",
        dateOfBirth: formatDateForInput(user.dateOfBirth),
        address: user.address || "",
        city: user.city || "",
        qualification: teacherProfile.qualification || "",
        lessonType: teacherProfile.lessonTypes?.[0] || "manual",
        availabilityStatus: teacherProfile.availabilityStatus || "available",
        experienceYears: String(teacherProfile.experienceYears ?? 0),
        hourlyRate: String(teacherProfile.hourlyRate ?? 0),
        bio: teacherProfile.bio || user.bio || "",
        avatar: user.avatar || "",
      });
    } catch (loadError) {
      setError(
        getErrorMessage(loadError, "Failed to load the teacher profile."),
      );
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  }

  function handleAvatarButtonClick() {
    fileInputRef.current?.click();
  }

  function handleAvatarChange(event) {
    const selectedFile = event.target.files?.[0];

    setError("");
    setSuccess("");

    if (!selectedFile) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Only JPG, PNG and WEBP images are allowed.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > 3 * 1024 * 1024) {
      setError("Profile image size must be less than 3MB.");
      event.target.value = "";
      return;
    }

    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }

    const previewUrl = URL.createObjectURL(selectedFile);

    setAvatarFile(selectedFile);
    setAvatarPreview(previewUrl);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (saving) {
      return;
    }

    const name = `${form.firstName} ${form.lastName}`.trim();

    if (!name) {
      setError("Teacher name is required.");
      return;
    }

    const experienceYears = Number(form.experienceYears || 0);
    const hourlyRate = Number(form.hourlyRate || 0);

    if (Number.isNaN(experienceYears) || experienceYears < 0) {
      setError("Experience years must be a valid positive number.");
      return;
    }

    if (Number.isNaN(hourlyRate) || hourlyRate < 0) {
      setError("Hourly rate must be a valid positive number.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      /*
       * User collection update:
       * name, phone, date of birth, address, city, bio and avatar
       */
      const userFormData = new FormData();

      userFormData.append("name", name);
      userFormData.append("phone", form.phone || "");
      userFormData.append("dateOfBirth", form.dateOfBirth || "");
      userFormData.append("address", form.address || "");
      userFormData.append("city", form.city || "");
      userFormData.append("bio", form.bio || "");

      if (avatarFile) {
        userFormData.append("avatar", avatarFile);
      }

      const userResponse = await updateProfile(userFormData);
      const updatedUser = getUpdatedUser(userResponse);

      /*
       * TeacherProfile collection update:
       * qualification, lesson type, availability,
       * experience years, hourly rate and bio
       */
      const teacherResponse = await updateTeacherProfile({
        qualification: form.qualification.trim(),
        lessonTypes: [form.lessonType],
        availabilityStatus: form.availabilityStatus,
        experienceYears,
        hourlyRate,
        bio: form.bio.trim(),
      });

      const updatedTeacherProfile = getTeacherProfileData(teacherResponse);

      if (updatedUser) {
        localStorage.setItem("user", JSON.stringify(updatedUser));

        window.dispatchEvent(
          new CustomEvent("profile-updated", {
            detail: updatedUser,
          }),
        );
      }

      const updatedName = splitFullName(updatedUser?.name || name);

      setForm((currentForm) => ({
        ...currentForm,

        firstName: updatedName.firstName,
        lastName: updatedName.lastName,

        email: updatedUser?.email || currentForm.email,

        phone: updatedUser?.phone ?? currentForm.phone,

        dateOfBirth: formatDateForInput(
          updatedUser?.dateOfBirth || currentForm.dateOfBirth,
        ),

        address: updatedUser?.address ?? currentForm.address,

        city: updatedUser?.city ?? currentForm.city,

        avatar: updatedUser?.avatar ?? currentForm.avatar,

        qualification:
          updatedTeacherProfile?.qualification ?? currentForm.qualification,

        lessonType:
          updatedTeacherProfile?.lessonTypes?.[0] ?? currentForm.lessonType,

        availabilityStatus:
          updatedTeacherProfile?.availabilityStatus ??
          currentForm.availabilityStatus,

        experienceYears: String(
          updatedTeacherProfile?.experienceYears ?? currentForm.experienceYears,
        ),

        hourlyRate: String(
          updatedTeacherProfile?.hourlyRate ?? currentForm.hourlyRate,
        ),

        bio: updatedTeacherProfile?.bio ?? updatedUser?.bio ?? currentForm.bio,
      }));

      setAvatarFile(null);
      setAvatarPreview("");
      setSuccess("Teacher profile updated successfully.");
    } catch (saveError) {
      setError(
        getErrorMessage(saveError, "Failed to update the teacher profile."),
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f7f9fc]">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-[#103f8f] shadow-sm">
          <FaSpinner className="animate-spin" />

          <span className="text-sm font-semibold">
            Loading teacher profile...
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        {/* Page header */}
        <div className="mb-6 flex items-start gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#103f8f] shadow-sm transition hover:bg-blue-50"
          >
            <FaChevronLeft size={16} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-[#103f8f]">Profile</h1>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Update your information to ensure accurate lesson scheduling and
              communication.
            </p>
          </div>
        </div>

        {/* Profile card */}
        <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-6">
          {/* Teacher summary */}
          <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-[#eef4fb] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-center gap-4">
              <div className="relative h-[78px] w-[78px] shrink-0">
                {avatarSource ? (
                  <img
                    src={avatarSource}
                    alt={fullName || "Teacher profile"}
                    className="h-full w-full rounded-full border-4 border-white object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full border-4 border-white bg-[#103f8f] text-2xl font-bold text-white shadow-sm">
                    {nameInitial}
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={handleAvatarChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={handleAvatarButtonClick}
                  title="Change profile image"
                  aria-label="Change profile image"
                  className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#103f8f] text-white shadow-md transition hover:bg-[#0b3272]"
                >
                  <FaCamera size={13} />
                </button>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {fullName || "Teacher User"}
                </h2>

                <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                  <SiGmail className="text-[#e63946]" />

                  {form.email || "No email found"}
                </p>

                <p className="mt-1 text-xs font-semibold capitalize text-[#103f8f]">
                  {form.availabilityStatus}
                </p>
              </div>
            </div>
          </div>

          {/* Form section */}
          <div>
            <div className="mb-5">
              <h3 className="text-xl font-bold text-slate-900">
                Personal Details
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Manage your personal and driving instructor information.
              </p>
            </div>

            {error ? (
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">
                <FaExclamationCircle className="mt-0.5 shrink-0" />

                <span>{error}</span>
              </div>
            ) : null}

            {success ? (
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                <FaCheckCircle className="mt-0.5 shrink-0" />

                <span>{success}</span>
              </div>
            ) : null}

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-5 lg:grid-cols-2"
            >
              <Field
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
              />

              <Field
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
              />

              <div>
                <label className={labelClass}>Date of birth</label>

                <div className="relative">
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                    className={`${inputClass} pr-11`}
                  />

                  <FaCalendarAlt className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <Field
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter address"
              />

              <Field
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />

              <SelectField
                label="Vehicle / Lesson Type"
                name="lessonType"
                value={form.lessonType}
                onChange={handleChange}
                options={lessonTypeOptions}
              />

              <SelectField
                label="Availability Status"
                name="availabilityStatus"
                value={form.availabilityStatus}
                onChange={handleChange}
                options={availabilityOptions}
              />

              <Field
                label="Qualification / Department"
                name="qualification"
                value={form.qualification}
                onChange={handleChange}
                placeholder="Example: Certified driving instructor"
              />

              <Field
                label="Your City"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Enter city"
              />

              <Field
                label="Experience Years"
                name="experienceYears"
                value={form.experienceYears}
                onChange={handleChange}
                type="number"
                min="0"
                placeholder="0"
              />

              <Field
                label="Hourly Rate"
                name="hourlyRate"
                value={form.hourlyRate}
                onChange={handleChange}
                type="number"
                min="0"
                step="0.01"
                placeholder="0"
              />

              <div className="lg:col-span-2">
                <label className={labelClass}>About Teacher</label>

                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  maxLength={500}
                  rows={5}
                  placeholder="Write a short description about the teacher..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#103f8f] focus:ring-4 focus:ring-blue-50"
                />

                <span className="mt-1 block text-right text-xs font-semibold text-slate-400">
                  {form.bio.length}/500
                </span>
              </div>

              <div className="flex justify-end pt-2 lg:col-span-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex h-12 min-w-40 items-center justify-center gap-2 rounded-xl bg-[#103f8f] px-8 text-sm font-bold text-white shadow-sm transition hover:bg-[#0b3272] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  step,
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        step={step}
        className={inputClass}
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>

      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`${inputClass} appearance-none pr-11`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}
