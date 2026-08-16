"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaCarSide, FaClipboardList, FaMapMarkerAlt } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";

import { getLesson, getStudentProfile } from "@/features/API";
import { statusClass, statusLabel, unwrap } from "@/features/lessonHelpers";

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

const titleCase = (value) =>
  String(value || "")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

export default function StudentLessonDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [lesson, setLesson] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([getLesson(lessonId), getStudentProfile()])
      .then(([lessonResponse, profileResponse]) => {
        if (!active) return;
        setLesson(unwrap(lessonResponse));
        setProfile(unwrap(profileResponse));
      })
      .catch((requestError) => {
        if (active)
          setError(
            requestError.response?.data?.message ||
              "Lesson details could not be loaded.",
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [lessonId]);

  if (loading)
    return (
      <main className="min-h-screen bg-white px-2.5 pb-24 pt-3 sm:p-6">
        <div className="h-[420px] animate-pulse rounded-xl bg-[#e8eef7] sm:h-[570px]" />
      </main>
    );
  if (!lesson)
    return (
      <main className="min-h-screen bg-white px-2.5 pb-24 pt-3 sm:p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-8 text-center text-xs font-semibold text-red-700 sm:p-8 sm:text-sm">
          {error || "Lesson not found."}
        </div>
      </main>
    );

  const booking = lesson.booking || {};
  const location = booking.location || {};
  const vehicle = booking.vehicleSnapshot || {};
  const teacher = lesson.teacher || {};
  const transmission = booking.vehicleType || vehicle.vehicleType || "Not set";
  const address =
    [location.address, location.city, location.postalCode]
      .filter(Boolean)
      .join(", ") || "Meeting point not set";
  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/student/lessons");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-2.5 pb-24 pt-3 sm:px-6 sm:pb-8 sm:pt-6">
      <header className="flex min-w-0 items-center justify-between gap-2.5 sm:gap-4">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-4">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#eef2f8] sm:h-12 sm:w-12 sm:rounded-xl"
          >
            <IoChevronBack size={22} />
          </button>
          <h1 className="truncate text-lg font-bold text-[#123f88] sm:text-[25px]">
            Lesson Details
          </h1>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1.5 text-[10px] font-bold sm:px-4 sm:py-2 sm:text-xs ${statusClass(lesson.status)}`}
        >
          {statusLabel(lesson.status)}
        </span>
      </header>

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      <section className="mt-4 min-w-0 rounded-xl bg-[#e8eef7] p-2.5 sm:mt-8 sm:p-6">
        <div className="grid min-w-0 gap-3 sm:gap-5 lg:grid-cols-2">
          <article className="min-w-0 rounded-xl bg-white p-3.5 sm:p-6">
            <h2 className="flex items-center gap-2.5 text-base font-bold sm:gap-3 sm:text-lg">
              <FaMapMarkerAlt className="shrink-0 text-[#174a9b]" />
              Appointment
            </h2>
            <dl className="mt-4 space-y-3 text-xs sm:mt-5 sm:text-sm">
              <Info label="Date" value={formatDate(lesson.lessonDate)} />
              <Info
                label="Time"
                value={`${lesson.startTime || "--"} – ${lesson.endTime || "--"}`}
              />
              <Info
                label="Duration"
                value={`${lesson.duration || 0} minutes`}
              />
              <Info label="Address" value={address} link />
              <Info
                label="Teacher’s Contact Number"
                value={teacher.phone || "Not provided"}
                link={Boolean(teacher.phone)}
              />
            </dl>
          </article>

          <article className="min-w-0 rounded-xl bg-white p-3.5 sm:p-6">
            <h2 className="flex items-center gap-2.5 text-base font-bold sm:gap-3 sm:text-lg">
              <FaMapMarkerAlt className="shrink-0 text-[#174a9b]" />
              Your Teacher
            </h2>
            <dl className="mt-4 space-y-3 text-xs sm:mt-5 sm:text-sm">
              <Info
                label="Name"
                value={teacher.name || teacher.email || "Instructor"}
              />
              <Info
                label="Phone Number"
                value={teacher.phone || "Not provided"}
                link={Boolean(teacher.phone)}
              />
            </dl>
            <h2 className="mt-5 flex items-center gap-2.5 text-base font-bold sm:mt-6 sm:gap-3 sm:text-lg">
              <FaCarSide className="shrink-0 text-[#174a9b]" />
              Vehicle
            </h2>
            <dl className="mt-4 space-y-3 text-xs sm:mt-5 sm:text-sm">
              <Info label="Brand" value={vehicle.brand || "Not provided"} />
              <Info
                label="Model"
                value={vehicle.model || vehicle.vehicleName || "Not provided"}
              />
              <Info
                label="Registration number"
                value={vehicle.registrationNumber || "Not provided"}
              />
              <div className="grid min-w-0 gap-1.5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-2">
                <dt className="text-slate-500">Transmission:</dt>
                <dd className="w-fit max-w-full break-words rounded-lg bg-[#e8eef7] px-3 py-2 font-semibold text-[#174a9b] sm:px-5">
                  {titleCase(transmission)} transmission
                </dd>
              </div>
            </dl>
          </article>
        </div>

        <article className="mt-3 min-w-0 rounded-xl bg-white p-3.5 sm:mt-5 sm:p-6">
          <h2 className="flex items-center gap-2.5 text-base font-bold sm:gap-3 sm:text-lg">
            <FaClipboardList className="shrink-0 text-[#174a9b]" />
            Your Documents
          </h2>
          <Link
            href="/student/profile/booklet"
            className="mt-4 flex min-h-11 w-full items-center justify-center rounded-lg bg-[#df2339] px-4 py-3 text-center text-xs font-bold text-white sm:mt-5 sm:inline-flex sm:w-auto sm:px-5"
          >
            Check Learning Booklet
          </Link>
          <p className="mt-4 break-words text-xs text-slate-500 sm:text-sm">
            NEPH:{" "}
            <b className="text-slate-800">
              {profile?.nephNumber || "Not provided"}
            </b>
          </p>
        </article>
      </section>
    </main>
  );
}

function Info({ label, value, link = false }) {
  return (
    <div className="grid min-w-0 gap-1 sm:grid-cols-[minmax(100px,auto)_minmax(0,1fr)] sm:gap-2">
      <dt className="text-slate-500">{label}:</dt>
      <dd
        className={`min-w-0 break-words font-semibold ${link ? "text-[#174a9b] underline" : "text-slate-900"}`}
      >
        {value}
      </dd>
    </div>
  );
}
