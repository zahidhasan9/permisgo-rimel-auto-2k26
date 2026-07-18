"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaCalendarAlt,
  FaCamera,
  FaCar,
  FaCheckCircle,
  FaChevronDown,
  FaChevronLeft,
  FaExclamationCircle,
  FaSave,
  FaSpinner,
  FaUser,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { useRouter } from "next/navigation";

import {
  getLoggedInUser,
  getStudentProfile,
  updateProfile,
  updateStudentProfile,
} from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  address: "",
  city: "",
  gender: "",
  postalCode: "",
  licenseType: "",
  currentLevel: "",
  preferredVehicleType: "automatic",
  previousExperience: "",
  bio: "",
  avatar: "",
};

const GENDER_OPTIONS = [
  { value: "", label: "Select Gender" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const VEHICLE_OPTIONS = [
  { value: "manual", label: "Manual Car" },
  { value: "automatic", label: "Automatic Car" },
];

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_IMAGE_SIZE = 3 * 1024 * 1024;

const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#103f8f] focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400";

const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

function getResponseData(response) {
  return response?.data?.data ?? response?.data ?? null;
}

function getUserData(response) {
  const data = getResponseData(response);
  return data?.user ?? data;
}

function getProfileData(response) {
  const data = getResponseData(response);
  return data?.profile ?? data;
}

function getErrorMessage(error, fallbackMessage) {
  return error?.response?.data?.message || error?.message || fallbackMessage;
}

function formatDateForInput(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 10);
}

function splitFullName(fullName = "") {
  const parts = String(fullName).trim().split(/\s+/).filter(Boolean);

  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" "),
  };
}

function createFormFromApi(studentProfile, loggedInUser) {
  const profileUser = studentProfile?.user || {};
  const user = {
    ...loggedInUser,
    ...profileUser,
  };

  const drivingInfo = studentProfile?.drivingInfo || {};
  const { firstName, lastName } = splitFullName(user.name);

  return {
    firstName,
    lastName,
    email: user.email || "",
    phone: user.phone || "",
    dateOfBirth: formatDateForInput(
      studentProfile?.dateOfBirth || user.dateOfBirth,
    ),
    address: studentProfile?.address || user.address || "",
    city: studentProfile?.city || user.city || "",
    gender: studentProfile?.gender || user.gender || "",
    postalCode: studentProfile?.postalCode || "",
    licenseType: drivingInfo.licenseType || "",
    currentLevel: drivingInfo.currentLevel || "",
    preferredVehicleType: drivingInfo.preferredVehicleType || "automatic",
    previousExperience: drivingInfo.previousExperience || "",
    bio: user.bio || "",
    avatar: user.avatar || "",
  };
}

export default function StudentProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(INITIAL_FORM);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const fullName = `${form.firstName} ${form.lastName}`.trim();

  const avatarSource =
    avatarPreview || (form.avatar ? mediaUrl(form.avatar) : "");

  const nameInitial = String(fullName || form.email || "S")
    .trim()
    .charAt(0)
    .toUpperCase();

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  function clearMessage() {
    setMessage({
      type: "",
      text: "",
    });
  }

  function showError(text) {
    setMessage({
      type: "error",
      text,
    });
  }

  function showSuccess(text) {
    setMessage({
      type: "success",
      text,
    });
  }

  async function fetchProfileForm() {
    const [profileResponse, userResponse] = await Promise.all([
      getStudentProfile(),
      getLoggedInUser(),
    ]);

    const studentProfile = getProfileData(profileResponse);
    const loggedInUser = getUserData(userResponse);

    if (!studentProfile && !loggedInUser) {
      throw new Error("Student profile data not found.");
    }

    return createFormFromApi(studentProfile, loggedInUser);
  }

  async function loadProfile() {
    try {
      setLoading(true);
      clearMessage();

      const profileForm = await fetchProfileForm();
      setForm(profileForm);
    } catch (error) {
      showError(getErrorMessage(error, "Failed to load the student profile."));
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

    clearMessage();
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function handleAvatarChange(event) {
    const file = event.target.files?.[0];

    clearMessage();

    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      event.target.value = "";
      showError("Only JPG, PNG and WEBP images are allowed.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      event.target.value = "";
      showError("Profile image size must be less than 3MB.");
      return;
    }

    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  function createUserFormData(name) {
    const userFormData = new FormData();

    userFormData.append("name", name);
    userFormData.append("phone", form.phone.trim());
    userFormData.append("dateOfBirth", form.dateOfBirth || "");
    userFormData.append("address", form.address.trim());
    userFormData.append("city", form.city.trim());
    userFormData.append("gender", form.gender);
    userFormData.append("bio", form.bio.trim());

    if (avatarFile) {
      userFormData.append("avatar", avatarFile);
    }

    return userFormData;
  }

  function createStudentPayload() {
    return {
      dateOfBirth: form.dateOfBirth || null,
      gender: form.gender,
      address: form.address.trim(),
      city: form.city.trim(),
      postalCode: form.postalCode.trim(),

      drivingInfo: {
        licenseType: form.licenseType.trim(),
        currentLevel: form.currentLevel.trim(),
        preferredVehicleType: form.preferredVehicleType,
        previousExperience: form.previousExperience.trim(),
      },
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (saving) return;

    const name = fullName;

    if (!name) {
      showError("Student name is required.");
      return;
    }

    try {
      setSaving(true);
      clearMessage();

      const userResponse = await updateProfile(createUserFormData(name));
      const updatedUser = getUserData(userResponse);

      await updateStudentProfile(createStudentPayload());

      if (updatedUser) {
        localStorage.setItem("user", JSON.stringify(updatedUser));

        window.dispatchEvent(
          new CustomEvent("profile-updated", {
            detail: updatedUser,
          }),
        );
      }

      const updatedForm = await fetchProfileForm();

      setForm(updatedForm);
      setAvatarFile(null);
      setAvatarPreview("");
      showSuccess("Student profile updated successfully.");
    } catch (error) {
      showError(
        getErrorMessage(error, "Failed to update the student profile."),
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <main className="min-h-screen bg-[#F6F8FC] px-3 py-5 sm:px-5 lg:px-7">
      <section className="mx-auto w-full max-w-6xl">
        {/* PAGE HEADER */}
        <header className="mb-5 flex items-start gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#103f8f] shadow-sm ring-1 ring-slate-100 transition hover:bg-blue-50"
          >
            <FaChevronLeft size={15} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-[#103f8f]">Profile</h1>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Update your personal and driving information.
            </p>
          </div>
        </header>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
          {/* PROFILE SUMMARY */}
          <div className="border-b border-slate-100 bg-[#EEF4FB] p-4 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative h-[82px] w-[82px] shrink-0">
                {avatarSource ? (
                  <img
                    src={avatarSource}
                    alt={fullName || "Student profile"}
                    onError={() =>
                      setForm((currentForm) => ({
                        ...currentForm,
                        avatar: "",
                      }))
                    }
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
                  onClick={openFilePicker}
                  aria-label="Change profile image"
                  title="Change profile image"
                  className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#103f8f] text-white shadow-md transition hover:bg-[#0B3272]"
                >
                  <FaCamera size={13} />
                </button>
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-xl font-bold text-slate-900">
                  {fullName || "Student User"}
                </h2>

                <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                  <SiGmail className="shrink-0 text-[#E63946]" />

                  <span className="truncate">
                    {form.email || "No email found"}
                  </span>
                </p>

                <span className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#103f8f] shadow-sm">
                  {form.currentLevel || "Driving Student"}
                </span>
              </div>
            </div>

            <p className="mt-3 text-xs font-medium text-slate-400">
              Profile image: JPG, PNG or WEBP · Maximum 3MB
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 p-4 sm:p-6">
            <StatusMessage message={message} />

            {/* PERSONAL INFORMATION */}
            <FormSection
              icon={FaUser}
              title="Personal Information"
              description="Basic account and contact information."
            >
              <Field
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                autoComplete="given-name"
              />

              <Field
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                autoComplete="family-name"
              />

              <DateField value={form.dateOfBirth} onChange={handleChange} />

              <Field
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                type="tel"
                autoComplete="tel"
              />

              <SelectField
                label="Gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                options={GENDER_OPTIONS}
              />

              <Field
                label="Postal Code"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                placeholder="Enter postal code"
                autoComplete="postal-code"
              />

              <Field
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Enter city"
                autoComplete="address-level2"
              />

              <Field
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter address"
                autoComplete="street-address"
              />
            </FormSection>

            {/* DRIVING INFORMATION */}
            <FormSection
              icon={FaCar}
              title="Driving Information"
              description="Permit, experience and vehicle preferences."
            >
              <Field
                label="License Type"
                name="licenseType"
                value={form.licenseType}
                onChange={handleChange}
                placeholder="Example: Learner permit"
              />

              <Field
                label="Current Level / Permit Type"
                name="currentLevel"
                value={form.currentLevel}
                onChange={handleChange}
                placeholder="Example: Beginner"
              />

              <SelectField
                label="Preferred Vehicle Type"
                name="preferredVehicleType"
                value={form.preferredVehicleType}
                onChange={handleChange}
                options={VEHICLE_OPTIONS}
              />

              <Field
                label="Previous Driving Experience"
                name="previousExperience"
                value={form.previousExperience}
                onChange={handleChange}
                placeholder="Example: 6 months"
              />
            </FormSection>

            {/* ABOUT STUDENT */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    About Student
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Add a short description about the student.
                  </p>
                </div>

                <span className="text-xs font-semibold text-slate-400">
                  {form.bio.length}/500
                </span>
              </div>

              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                maxLength={500}
                rows={4}
                placeholder="Write a short description..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#103f8f] focus:ring-4 focus:ring-blue-50"
              />
            </div>

            {/* SAVE BUTTON */}
            <div className="flex justify-end border-t border-slate-100 pt-5">
              <button
                type="submit"
                disabled={saving}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#103f8f] px-7 text-sm font-bold text-white shadow-sm transition hover:bg-[#0B3272] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-44"
              >
                {saving ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaSave size={13} />
                )}

                {saving ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

function LoadingScreen() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#F6F8FC]">
      <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-[#103f8f] shadow-sm ring-1 ring-slate-100">
        <FaSpinner className="animate-spin" />

        <span className="text-sm font-semibold">
          Loading student profile...
        </span>
      </div>
    </main>
  );
}

function StatusMessage({ message }) {
  if (!message.text) return null;

  const isSuccess = message.type === "success";

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-4 text-sm font-medium ${
        isSuccess
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-rose-200 bg-rose-50 text-rose-700"
      }`}
    >
      {isSuccess ? (
        <FaCheckCircle className="mt-0.5 shrink-0" />
      ) : (
        <FaExclamationCircle className="mt-0.5 shrink-0" />
      )}

      <span>{message.text}</span>
    </div>
  );
}

function FormSection({ icon: Icon, title, description, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-[#FBFCFE] p-4 sm:p-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF1FB] text-[#103f8f]">
          <Icon size={15} />
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900">{title}</h3>

          <p className="mt-0.5 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={inputClass}
      />
    </div>
  );
}

function DateField({ value, onChange }) {
  return (
    <div>
      <label htmlFor="dateOfBirth" className={labelClass}>
        Date of Birth
      </label>

      <div className="relative">
        <input
          id="dateOfBirth"
          type="date"
          name="dateOfBirth"
          value={value}
          onChange={onChange}
          className={`${inputClass} pr-11`}
        />

        <FaCalendarAlt className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>

      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`${inputClass} appearance-none pr-11`}
        >
          {options.map((option) => (
            <option key={`${name}-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}
