"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";

import { getLessons } from "@/features/API";
import {
  formatLessonDate,
  getLessonLocation,
  getVehicleType,
  statusClass,
  statusLabel,
  unwrap,
} from "@/features/lessonHelpers";

const filters = [
  ["all", "All lessons"],
  ["scheduled", "Confirmed"],
  ["in_progress", "In progress"],
  ["completed", "Completed"],
  ["cancelled", "Cancelled"],
];

export default function MyDrivingLessonsPage() {
  const router = useRouter();
  const [lessons, setLessons] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getLessons({ page: 1, limit: 100, status: "all", sortOrder: "desc" })
      .then((response) => {
        if (active) setLessons(Array.isArray(unwrap(response, [])) ? unwrap(response, []) : []);
      })
      .catch((requestError) => {
        if (active) setError(requestError.response?.data?.message || "Lessons could not be loaded.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const visibleLessons = useMemo(
    () => lessons.filter((lesson) => {
      if (filter === "all") return true;
      if (filter === "scheduled") return ["scheduled", "awaiting_confirmation"].includes(lesson.status);
      if (filter === "cancelled") return ["cancelled", "no_show"].includes(lesson.status);
      return lesson.status === filter;
    }),
    [filter, lessons],
  );

  const totalHours = useMemo(
    () => lessons.reduce((total, lesson) => total + Number(lesson.duration || 0), 0) / 60,
    [lessons],
  );

  return (
    <main className="min-h-screen bg-white px-3 py-6 sm:px-6">
      <header className="flex items-center gap-4">
        <button type="button" onClick={() => router.back()} className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef2f8]"><IoChevronBack size={24} /></button>
        <div><h1 className="text-[24px] font-bold text-[#123f88]">Driving Lessons</h1><p className="mt-1 text-xs text-slate-500">Your confirmed and completed driving lesson history</p></div>
      </header>

      <div className="mt-8 grid gap-5 lg:grid-cols-[250px_1fr]">
        <aside className="h-fit rounded-xl bg-[#e8eef7] p-5">
          <h2 className="font-bold text-[#123f88]">Lessons</h2>
          <div className="mt-4 space-y-2">
            {filters.map(([value, label]) => (
              <button key={value} type="button" onClick={() => setFilter(value)} className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-semibold ${filter === value ? "bg-[#174a9b] text-white" : "bg-white text-slate-700"}`}>
                <span>{label}</span><span>{lessons.filter((lesson) => value === "all" || lesson.status === value || (value === "scheduled" && lesson.status === "awaiting_confirmation") || (value === "cancelled" && lesson.status === "no_show")).length}</span>
              </button>
            ))}
          </div>
          <Link href="/student/driving-operation/book-lesson" className="mt-5 flex w-full justify-center rounded-lg bg-[#df2339] py-3 text-xs font-bold text-white">New lesson</Link>
        </aside>

        <section>
          <p className="mb-4 text-sm font-semibold text-slate-500">{totalHours.toFixed(totalHours % 1 ? 1 : 0)} hours in total on this page</p>
          {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
          {loading ? <div className="space-y-4">{Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-36 animate-pulse rounded-xl bg-[#e8eef7]" />)}</div> : visibleLessons.length ? (
            <div className="space-y-4">
              {visibleLessons.map((lesson) => (
                <article key={lesson._id} className="flex flex-col justify-between gap-5 rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
                  <div>
                    <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold ${statusClass(lesson.status)}`}>{statusLabel(lesson.status)}</span>
                    <h2 className="mt-3 text-lg font-bold text-[#123f88]">{lesson.booking?.offer?.title || "Driving Lesson"}</h2>
                    <p className="mt-2 text-sm font-semibold">{formatLessonDate(lesson.lessonDate)}</p>
                    <p className="mt-1 text-xs text-slate-500">{lesson.startTime} – {lesson.endTime} · {lesson.duration || 0} minutes</p>
                    <span className="mt-3 inline-flex rounded-md bg-[#e8eef7] px-3 py-1.5 text-xs font-semibold text-[#174a9b]">{getVehicleType(lesson)} transmission</span>
                  </div>
                  <div className="sm:text-right">
                    <p className="flex items-center gap-2 text-sm text-slate-600 sm:justify-end"><FaMapMarkerAlt className="text-[#174a9b]" />{getLessonLocation(lesson)}</p>
                    <p className="mt-2 text-sm font-semibold">{lesson.teacher?.name || "Instructor"}</p>
                    <Link href={`/student/lessons/${lesson._id}`} className="mt-4 inline-flex rounded-lg bg-[#df2339] px-5 py-2.5 text-xs font-bold text-white">View lesson</Link>
                  </div>
                </article>
              ))}
            </div>
          ) : <div className="rounded-xl bg-[#e8eef7] p-12 text-center text-sm text-slate-500">No lessons found in this section.</div>}
        </section>
      </div>
    </main>
  );
}
