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
        if (active) setError(requestError.response?.data?.message || "Lesson details could not be loaded.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [lessonId]);

  if (loading) return <main className="min-h-screen bg-white p-6"><div className="h-[570px] animate-pulse rounded-xl bg-[#e8eef7]" /></main>;
  if (!lesson) return <main className="min-h-screen bg-white p-6"><div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-sm font-semibold text-red-700">{error || "Lesson not found."}</div></main>;

  const booking = lesson.booking || {};
  const location = booking.location || {};
  const vehicle = booking.vehicleSnapshot || {};
  const teacher = lesson.teacher || {};
  const transmission = booking.vehicleType || vehicle.vehicleType || "Not set";
  const address = [location.address, location.city, location.postalCode].filter(Boolean).join(", ") || "Meeting point not set";

  return (
    <main className="min-h-screen bg-white px-3 py-6 sm:px-6">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => router.push("/student/driving-operation/my-lessons")} className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef2f8]"><IoChevronBack size={25} /></button>
          <h1 className="text-[25px] font-bold text-[#123f88]">Lesson Details</h1>
        </div>
        <span className={`rounded-full px-4 py-2 text-xs font-bold ${statusClass(lesson.status)}`}>{statusLabel(lesson.status)}</span>
      </header>

      {error && <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}

      <section className="mt-8 rounded-xl bg-[#e8eef7] p-5 sm:p-6">
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-xl bg-white p-5 sm:p-6">
            <h2 className="flex items-center gap-3 text-lg font-bold"><FaMapMarkerAlt className="text-[#174a9b]" />Appointment</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <Info label="Date" value={formatDate(lesson.lessonDate)} />
              <Info label="Time" value={`${lesson.startTime || "--"} – ${lesson.endTime || "--"}`} />
              <Info label="Duration" value={`${lesson.duration || 0} minutes`} />
              <Info label="Address" value={address} link />
              <Info label="Teacher’s Contact Number" value={teacher.phone || "Not provided"} link={Boolean(teacher.phone)} />
            </dl>
          </article>

          <article className="rounded-xl bg-white p-5 sm:p-6">
            <h2 className="flex items-center gap-3 text-lg font-bold"><FaMapMarkerAlt className="text-[#174a9b]" />Your Teacher</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <Info label="Name" value={teacher.name || teacher.email || "Instructor"} />
              <Info label="Phone Number" value={teacher.phone || "Not provided"} link={Boolean(teacher.phone)} />
            </dl>
            <h2 className="mt-6 flex items-center gap-3 text-lg font-bold"><FaCarSide className="text-[#174a9b]" />Vehicle</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <Info label="Brand" value={vehicle.brand || "Not provided"} />
              <Info label="Model" value={vehicle.model || vehicle.vehicleName || "Not provided"} />
              <Info label="Registration number" value={vehicle.registrationNumber || "Not provided"} />
              <div className="flex flex-wrap items-center gap-2"><dt className="text-slate-500">Transmission:</dt><dd className="rounded-lg bg-[#e8eef7] px-5 py-2 font-semibold text-[#174a9b]">{titleCase(transmission)} transmission</dd></div>
            </dl>
          </article>
        </div>

        <article className="mt-5 rounded-xl bg-white p-5 sm:p-6">
          <h2 className="flex items-center gap-3 text-lg font-bold"><FaClipboardList className="text-[#174a9b]" />Your Documents</h2>
          <Link href="/student/profile/booklet" className="mt-5 inline-flex rounded-lg bg-[#df2339] px-5 py-3 text-xs font-bold text-white">Check Learning Booklet</Link>
          <p className="mt-4 text-sm text-slate-500">NEPH: <b className="text-slate-800">{profile?.nephNumber || "Not provided"}</b></p>
        </article>
      </section>
    </main>
  );
}

function Info({ label, value, link = false }) {
  return <div className="flex flex-wrap gap-2"><dt className="text-slate-500">{label}:</dt><dd className={`font-semibold ${link ? "text-[#174a9b] underline" : "text-slate-900"}`}>{value}</dd></div>;
}
