"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaEnvelope,
  FaExclamationTriangle,
  FaFileAlt,
  FaIdBadge,
  FaSave,
  FaSyncAlt,
  FaTimes,
  FaTrashAlt,
  FaUser,
} from "react-icons/fa";
import {
  deleteAdminUser,
  getAdminUserById,
  updateUserRole,
  updateUserStatus,
} from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const roleOptions = ["student", "teacher", "admin"];
const statusOptions = ["active", "inactive", "blocked"];

const statusStyles = {
  active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  inactive: "border-amber-200 bg-amber-50 text-amber-700",
  blocked: "border-rose-200 bg-rose-50 text-rose-700",
};

function getMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong. Please try again."
  );
}

function getInitials(name = "User") {
  return String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(date, includeTime = false) {
  if (!date) return "N/A";

  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(includeTime
      ? {
          hour: "2-digit",
          minute: "2-digit",
        }
      : {}),
  });
}

function formatBoolean(value) {
  return value ? "Verified" : "Not verified";
}

function displayValue(value) {
  if (value === null || value === undefined || value === "") return "N/A";
  if (Array.isArray(value)) return value.length ? value.join(", ") : "N/A";
  return String(value);
}

export default function AdminUserDetailsPage() {
  const params = useParams();
  const router = useRouter();

  // Supports both folder names: [userId] and [id]
  const userId = params?.userId || params?.id;

  const [user, setUser] = useState(null);
  const [role, setRole] = useState("student");
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(true);
  const [savingField, setSavingField] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const loadUser = useCallback(async () => {
    if (!userId) {
      setError("User ID was not found in the route.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await getAdminUserById(userId);
      const responseUser = response?.data?.data || null;

      setUser(responseUser);
      setRole(responseUser?.role || "student");
      setStatus(responseUser?.status || "active");
    } catch (requestError) {
      setError(getMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    if (!toast) return undefined;

    const timer = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const profile = user?.profile || null;
  const documents = Array.isArray(user?.documents) ? user.documents : [];

  const accountFields = useMemo(
    () => [
      { label: "User ID", value: user?._id },
      { label: "Designation", value: user?.designation },
      { label: "Gender", value: user?.gender, capitalize: true },
      { label: "Date of birth", value: formatDate(user?.dateOfBirth) },
      { label: "Language", value: user?.language },
      { label: "Joined", value: formatDate(user?.createdAt, true) },
      { label: "Last updated", value: formatDate(user?.updatedAt, true) },
      { label: "Last login", value: formatDate(user?.lastLoginAt, true) },
    ],
    [user],
  );

  const contactFields = useMemo(
    () => [
      { label: "Email", value: user?.email },
      { label: "Phone", value: user?.phone },
      { label: "Address", value: user?.address },
      { label: "City", value: user?.city },
      { label: "Country", value: user?.country },
      {
        label: "Email verification",
        value: formatBoolean(user?.isEmailVerified),
      },
      {
        label: "Phone verification",
        value: formatBoolean(user?.isPhoneVerified),
      },
    ],
    [user],
  );

  const handleRoleUpdate = async () => {
    if (!user || role === user.role) return;

    try {
      setSavingField("role");
      setError("");

      await updateUserRole(user._id, role);
      await loadUser();
      setToast("User role updated.");
    } catch (requestError) {
      setRole(user.role);
      setError(getMessage(requestError));
    } finally {
      setSavingField("");
    }
  };

  const handleStatusUpdate = async () => {
    if (!user || status === user.status) return;

    try {
      setSavingField("status");
      setError("");

      const response = await updateUserStatus(user._id, status);
      const updatedUser = response?.data?.data;

      setUser((current) => ({
        ...current,
        status: updatedUser?.status || status,
      }));
      setToast("User status updated.");
    } catch (requestError) {
      setStatus(user.status);
      setError(getMessage(requestError));
    } finally {
      setSavingField("");
    }
  };

  const handleDelete = async () => {
    if (!user?._id) return;

    try {
      setDeleting(true);
      setError("");

      await deleteAdminUser(user._id);
      router.replace("/admin/users");
      router.refresh();
    } catch (requestError) {
      setError(getMessage(requestError));
      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (!user) {
    return (
      <section className="min-h-screen bg-slate-50 px-4 py-6 md:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <FaExclamationTriangle className="mx-auto text-3xl text-amber-500" />
          <h1 className="mt-4 text-xl font-bold text-slate-900">
            User not found
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {error || "The requested user record is unavailable."}
          </p>
          <Link
            href="/admin/users"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
          >
            <FaArrowLeft />
            Back to users
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-5 md:px-6 lg:px-8">
      {toast && (
        <div className="fixed right-4 top-4 z-[70] rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-700 shadow-lg">
          {toast}
        </div>
      )}

      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          >
            <FaArrowLeft />
            Back to users
          </Link>

          <button
            type="button"
            onClick={loadUser}
            disabled={loading}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
          >
            <FaSyncAlt className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-4 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            <FaExclamationTriangle className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <UserAvatar user={user} />

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="truncate text-2xl font-bold text-slate-900">
                    {user.name || "Unnamed user"}
                  </h1>
                  <StatusBadge status={user.status} />
                </div>

                <p className="mt-1 truncate text-sm text-slate-500">
                  {user.email || "No email address"}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {user.role}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:w-[440px]">
              <ActionSelect
                label="Role"
                value={role}
                options={roleOptions}
                busy={savingField === "role"}
                changed={role !== user.role}
                onChange={setRole}
                onSave={handleRoleUpdate}
              />

              <ActionSelect
                label="Account status"
                value={status}
                options={statusOptions}
                busy={savingField === "status"}
                changed={status !== user.status}
                onChange={setStatus}
                onSave={handleStatusUpdate}
              />
            </div>
          </div>
        </header>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <InfoSection
            icon={FaUser}
            title="Account information"
            fields={accountFields}
          />

          <InfoSection
            icon={FaEnvelope}
            title="Contact information"
            fields={contactFields}
          />
        </div>

        {user.bio && (
          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-slate-900">Bio</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
              {user.bio}
            </p>
          </section>
        )}

        {profile && (
          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <FaIdBadge />
              </span>
              <div>
                <h2 className="font-bold text-slate-900">
                  {user.role === "teacher"
                    ? "Teacher profile"
                    : "Student profile"}
                </h2>
                <p className="text-xs text-slate-500">
                  Role-specific profile information
                </p>
              </div>
            </div>

            <ProfileDetails role={user.role} profile={profile} />
          </section>
        )}

        <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <FaFileAlt />
              </span>
              <div>
                <h2 className="font-bold text-slate-900">Documents</h2>
                <p className="text-xs text-slate-500">
                  {documents.length} uploaded document(s)
                </p>
              </div>
            </div>
          </div>

          {documents.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-slate-500">
              No documents uploaded.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {documents.map((document) => (
                <div
                  key={document._id}
                  className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {document.title || "Untitled document"}
                    </p>
                    <p className="mt-1 text-xs capitalize text-slate-500">
                      {document.type || "other"} ·{" "}
                      {formatDate(document.uploadedAt || document.createdAt)}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
                      document.status === "approved"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : document.status === "rejected"
                          ? "border-rose-200 bg-rose-50 text-rose-700"
                          : "border-amber-200 bg-amber-50 text-amber-700"
                    }`}
                  >
                    {document.status || "pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-5 flex flex-col gap-3 rounded-2xl border border-rose-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-slate-900">Delete user</h2>
            <p className="mt-1 text-sm text-slate-500">
              Permanently remove this user and their account access.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            <FaTrashAlt />
            Delete user
          </button>
        </section>
      </div>

      {showDeleteModal && (
        <DeleteModal
          user={user}
          busy={deleting}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </section>
  );
}

function UserAvatar({ user }) {
  const [failed, setFailed] = useState(false);
  const src = user?.avatar ? mediaUrl(user.avatar) : "";

  if (!src || failed) {
    return (
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-xl font-bold text-white">
        {getInitials(user?.name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={user?.name || "User profile"}
      onError={() => setFailed(true)}
      className="h-20 w-20 shrink-0 rounded-2xl border border-slate-200 bg-slate-100 object-cover"
    />
  );
}

function StatusBadge({ status = "inactive" }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
        statusStyles[status] || statusStyles.inactive
      }`}
    >
      {status}
    </span>
  );
}

function ActionSelect({
  label,
  value,
  options,
  busy,
  changed,
  onChange,
  onSave,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <label className="block text-xs font-semibold text-slate-500">
        {label}
      </label>
      <div className="mt-2 flex gap-2">
        <select
          value={value}
          disabled={busy}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold capitalize text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:opacity-60"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={onSave}
          disabled={!changed || busy}
          aria-label={`Save ${label}`}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {busy ? <FaSyncAlt className="animate-spin" /> : <FaSave />}
        </button>
      </div>
    </div>
  );
}

function InfoSection({ icon: Icon, title, fields }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Icon />
        </span>
        <h2 className="font-bold text-slate-900">{title}</h2>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <Detail
            key={field.label}
            label={field.label}
            value={field.value}
            capitalize={field.capitalize}
          />
        ))}
      </div>
    </section>
  );
}

function Detail({ label, value, capitalize = false }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p
        className={`mt-1 break-words text-sm font-medium text-slate-700 ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {displayValue(value)}
      </p>
    </div>
  );
}

function ProfileDetails({ role, profile }) {
  if (role === "teacher") {
    const fields = [
      ["Experience", `${profile.experienceYears || 0} year(s)`],
      ["Qualification", profile.qualification],
      ["Verification", profile.verificationStatus],
      ["Availability", profile.availabilityStatus],
      ["Hourly rate", profile.hourlyRate],
      ["Average rating", profile.rating?.average],
      ["Total reviews", profile.rating?.totalReviews],
      ["Lesson types", profile.lessonTypes],
      ["Vehicles", profile.vehicles?.length || 0],
      ["Locations", profile.locations?.length || 0],
      ["Profile created", formatDate(profile.createdAt, true)],
    ];

    return (
      <>
        {profile.bio && (
          <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
            {profile.bio}
          </p>
        )}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fields.map(([label, value]) => (
            <Detail key={label} label={label} value={value} capitalize />
          ))}
        </div>
      </>
    );
  }

  const fields = [
    ["Date of birth", formatDate(profile.dateOfBirth)],
    ["Gender", profile.gender],
    ["Address", profile.address],
    ["City", profile.city],
    ["Postal code", profile.postalCode],
    ["License type", profile.drivingInfo?.licenseType],
    ["Current level", profile.drivingInfo?.currentLevel],
    ["Preferred vehicle", profile.drivingInfo?.preferredVehicleType],
    ["Previous experience", profile.drivingInfo?.previousExperience],
    ["Total lessons", profile.progress?.totalLessons],
    ["Completed lessons", profile.progress?.completedLessons],
    ["Remaining lessons", profile.progress?.remainingLessons],
    ["Code progress", `${profile.progress?.codeProgress || 0}%`],
    ["Driving progress", `${profile.progress?.drivingProgress || 0}%`],
    ["Profile created", formatDate(profile.createdAt, true)],
  ];

  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {fields.map(([label, value]) => (
        <Detail key={label} label={label} value={value} capitalize />
      ))}
    </div>
  );
}

function LoadingState() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <FaSyncAlt className="mx-auto animate-spin text-3xl text-slate-500" />
        <p className="mt-3 text-sm font-medium text-slate-500">
          Loading user details...
        </p>
      </div>
    </section>
  );
}

function DeleteModal({ user, busy, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Delete user?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              <span className="font-semibold text-slate-800">
                {user.name || "This user"}
              </span>{" "}
              will be permanently deleted. This action cannot be undone.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            aria-label="Close"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-60"
          >
            {busy ? <FaSyncAlt className="animate-spin" /> : <FaTrashAlt />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
