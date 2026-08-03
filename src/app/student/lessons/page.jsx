"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";

import { getLessons } from "@/features/API";
import { getErrorMessage, getLessonLocation, getVehicleType, unwrap } from "@/features/lessonHelpers";

const FILTERS = [
  { key: "awaiting", label: "Exams awaiting monitor validation", statuses: ["awaiting_confirmation"] },
  { key: "past", label: "Past", statuses: ["completed"] },
  { key: "confirmed", label: "Confirmed", statuses: ["scheduled", "in_progress"] },
  { key: "cancelled", label: "Canceled", statuses: ["cancelled", "no_show"] },
];

const formatDate = (value) => value ? new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(value)) : "Date unavailable";
const formatTime = (value) => {
  if (!value) return "—";
  const [hour, minute] = value.split(":").map(Number);
  const suffix = hour >= 12 ? "pm" : "am";
  return `${hour % 12 || 12}${minute ? `:${String(minute).padStart(2, "0")}` : ""} ${suffix}`;
};
const statusText = (status) => ({ scheduled: "Confirmed", in_progress: "In progress", awaiting_confirmation: "Awaiting validation", completed: "Completed", cancelled: "Canceled", no_show: "No show" }[status] || status);
const statusColor = (status) => ({ completed: "text-[#26bd3d]", scheduled: "text-[#174a9b]", in_progress: "text-amber-600", awaiting_confirmation: "text-violet-600", cancelled: "text-[#df2339]", no_show: "text-slate-500" }[status] || "text-slate-600");

export default function StudentLessonsPage() {
  const router = useRouter();
  const [lessons, setLessons] = useState([]);
  const [selected, setSelected] = useState(["past"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getLessons({ page: 1, limit: 100, status: "all", sortOrder: "desc" })
      .then((response) => { if (active) setLessons(Array.isArray(unwrap(response, [])) ? unwrap(response, []) : []); })
      .catch((requestError) => { if (active) setError(getErrorMessage(requestError, "Lessons could not be loaded.")); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const visibleLessons = useMemo(() => {
    if (!selected.length) return lessons;
    const statuses = new Set(FILTERS.filter((filter) => selected.includes(filter.key)).flatMap((filter) => filter.statuses));
    return lessons.filter((lesson) => statuses.has(lesson.status));
  }, [lessons, selected]);
  const totalHours = visibleLessons.reduce((sum, lesson) => sum + Number(lesson.duration || 0), 0) / 60;

  const toggle = (key) => setSelected((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);

  return <main className="min-h-screen bg-[#edf1f8] p-2 sm:p-4">
    <div className="mx-auto rounded-xl bg-white p-4 sm:p-5">
      <header className="flex items-center gap-3"><button type="button" onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8edf5]"><IoChevronBack size={23} /></button><h1 className="text-[24px] font-bold text-[#123f88]">Driving Lesson</h1></header>

      {error && <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}

      <section className="mt-6 grid min-h-[660px] gap-4 rounded-xl bg-[#e8eef7] p-4 lg:grid-cols-[245px_minmax(0,1fr)]">
        <aside className="self-start">
          <div className="rounded-xl bg-white p-4">
            <h2 className="text-xs font-bold">Lessons</h2>
            <div className="mt-3 space-y-3">{FILTERS.map((filter) => <label key={filter.key} className="flex cursor-pointer items-start gap-2 text-xs"><input type="checkbox" checked={selected.includes(filter.key)} onChange={() => toggle(filter.key)} className="peer sr-only" /><span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-slate-500 bg-white text-[10px] font-black text-white peer-checked:border-[#28c53f] peer-checked:bg-[#28c53f]">✓</span><span>{filter.label}</span></label>)}</div>
          </div>
          <Link href="/student/driving-operation/book-lesson" className="mt-4 flex h-10 items-center justify-center rounded-lg bg-[#df2339] text-xs font-bold text-white">New lesson</Link>
        </aside>

        <div className="rounded-xl bg-white p-4">
          <p className="text-sm text-slate-600">{Number.isInteger(totalHours) ? totalHours : totalHours.toFixed(1)} hours in total on this page</p>
          <div className="mt-4 space-y-4">
            {loading ? Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-[140px] animate-pulse rounded-xl bg-[#e8eef7]" />) : visibleLessons.length ? visibleLessons.map((lesson) => {
              const isExam = String(lesson.booking?.offer?.category || lesson.booking?.offer?.title || "").toLowerCase().includes("exam");
              return <Link href={`/student/lessons/${lesson._id}`} key={lesson._id} className="grid min-h-[140px] gap-4 rounded-xl bg-[#e8eef7] p-4 transition hover:ring-2 hover:ring-[#174a9b]/30 sm:grid-cols-[1fr_220px]">
                <div><span className={`inline-flex rounded-lg px-3 py-2 text-xs font-bold text-white ${isExam ? "bg-[#267bd7]" : "bg-[#28c53f]"}`}>{isExam ? "Exam" : "Lesson"}</span><p className="mt-4 text-sm text-slate-600">{formatDate(lesson.lessonDate)}</p><p className="mt-2 text-sm text-slate-600">{formatTime(lesson.startTime)} to {formatTime(lesson.endTime)}</p><span className="mt-3 inline-flex rounded-lg bg-white px-2 py-1 text-[11px] font-semibold capitalize text-[#174a9b]">{getVehicleType(lesson)} transmission</span></div>
                <div className="text-left sm:text-right"><p className={`text-sm font-semibold ${statusColor(lesson.status)}`}>{statusText(lesson.status)}</p><p className="mt-8 flex items-center gap-2 text-sm font-bold text-slate-600 sm:justify-end"><FaMapMarkerAlt />{getLessonLocation(lesson)}</p><p className="mt-2 text-xs text-slate-600">{lesson.teacher?.name || "Teacher"}</p></div>
              </Link>;
            }) : <div className="rounded-xl bg-[#e8eef7] p-12 text-center"><p className="text-sm font-bold text-[#123f88]">No lessons found</p><p className="mt-2 text-xs text-slate-500">Choose another lesson filter or book a new lesson.</p></div>}
          </div>
        </div>
      </section>
    </div>
  </main>;
}
