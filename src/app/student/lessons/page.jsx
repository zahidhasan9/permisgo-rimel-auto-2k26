"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";

import { getLessons } from "@/features/API";
import {
  getErrorMessage,
  getLessonLocation,
  getVehicleType,
  unwrap,
} from "@/features/lessonHelpers";

const FILTERS = [
  {
    key: "awaiting",
    label: "Exams awaiting monitor validation",
    statuses: ["awaiting_confirmation"],
  },
  { key: "past", label: "Past", statuses: ["completed"] },
  {
    key: "confirmed",
    label: "Confirmed",
    statuses: ["scheduled", "in_progress"],
  },
  { key: "cancelled", label: "Canceled", statuses: ["cancelled", "no_show"] },
];

const formatDate = (value) =>
  value
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(value))
    : "Date unavailable";
const formatTime = (value) => {
  if (!value) return "—";
  const [hour, minute] = value.split(":").map(Number);
  const suffix = hour >= 12 ? "pm" : "am";
  return `${hour % 12 || 12}${minute ? `:${String(minute).padStart(2, "0")}` : ""} ${suffix}`;
};
const statusText = (status) =>
  ({
    scheduled: "Confirmed",
    in_progress: "In progress",
    awaiting_confirmation: "Awaiting validation",
    completed: "Completed",
    cancelled: "Canceled",
    no_show: "No show",
  })[status] || status;
const statusColor = (status) =>
  ({
    completed: "text-[#26bd3d]",
    scheduled: "text-[#174a9b]",
    in_progress: "text-amber-600",
    awaiting_confirmation: "text-violet-600",
    cancelled: "text-[#df2339]",
    no_show: "text-slate-500",
  })[status] || "text-slate-600";
const PAGE_SIZE = 5;

export default function StudentLessonsPage() {
  const router = useRouter();
  const [lessons, setLessons] = useState([]);
  const [selected, setSelected] = useState(["past"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let active = true;
    getLessons({ page: 1, limit: 100, status: "all", sortOrder: "desc" })
      .then((response) => {
        if (active)
          setLessons(
            Array.isArray(unwrap(response, [])) ? unwrap(response, []) : [],
          );
      })
      .catch((requestError) => {
        if (active)
          setError(
            getErrorMessage(requestError, "Lessons could not be loaded."),
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const visibleLessons = useMemo(() => {
    if (!selected.length) return lessons;
    const statuses = new Set(
      FILTERS.filter((filter) => selected.includes(filter.key)).flatMap(
        (filter) => filter.statuses,
      ),
    );
    return lessons.filter((lesson) => statuses.has(lesson.status));
  }, [lessons, selected]);
  const totalPages = Math.max(1, Math.ceil(visibleLessons.length / PAGE_SIZE));
  const paginatedLessons = visibleLessons.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );
  const totalHours =
    paginatedLessons.reduce(
      (sum, lesson) => sum + Number(lesson.duration || 0),
      0,
    ) / 60;

  const toggle = (key) => {
    setSelected((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key],
    );
    setPage(1);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#edf1f8] p-2 sm:p-4">
      <div className="mx-auto w-full max-w-[1440px] rounded-xl bg-white p-3 sm:p-5">
        <header className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#e8edf5] sm:rounded-xl"
          >
            <IoChevronBack size={22} />
          </button>
          <h1 className="text-[20px] font-bold text-[#123f88] sm:text-[24px]">
            Driving Lesson
          </h1>
        </header>

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <section className="mt-4 grid gap-3 rounded-xl bg-[#e8eef7] p-2.5 sm:mt-6 sm:min-h-[660px] sm:gap-4 sm:p-4 lg:grid-cols-[245px_minmax(0,1fr)]">
          <aside className="self-start">
            <div className="rounded-xl bg-white p-3 sm:p-4">
              <h2 className="text-xs font-bold">Lessons</h2>
              <div className="mt-3 space-y-3">
                {FILTERS.map((filter) => (
                  <label
                    key={filter.key}
                    className="flex cursor-pointer items-start gap-2 text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(filter.key)}
                      onChange={() => toggle(filter.key)}
                      className="peer sr-only"
                    />
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-slate-500 bg-white text-[10px] font-black text-white peer-checked:border-[#28c53f] peer-checked:bg-[#28c53f]">
                      ✓
                    </span>
                    <span>{filter.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <Link
              href="/student/driving-operation/book-lesson"
              className="mt-3 flex h-10 items-center justify-center rounded-lg bg-[#df2339] text-xs font-bold text-white sm:mt-4"
            >
              New lesson
            </Link>
          </aside>

          <div className="min-w-0 rounded-xl bg-white p-3 sm:p-4">
            <p className="text-[12px] text-slate-600 sm:text-sm">
              {Number.isInteger(totalHours)
                ? totalHours
                : totalHours.toFixed(1)}{" "}
              hours in total on this page
            </p>
            <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[140px] animate-pulse rounded-xl bg-[#e8eef7]"
                  />
                ))
              ) : paginatedLessons.length ? (
                paginatedLessons.map((lesson) => {
                  const isExam = String(
                    lesson.booking?.offer?.category ||
                      lesson.booking?.offer?.title ||
                      "",
                  )
                    .toLowerCase()
                    .includes("exam");
                  return (
                    <Link
                      href={`/student/lessons/${lesson._id}`}
                      key={lesson._id}
                      className="grid min-h-[140px] min-w-0 gap-3 rounded-xl bg-[#e8eef7] p-3 transition hover:ring-2 hover:ring-[#174a9b]/30 sm:grid-cols-[1fr_220px] sm:gap-4 sm:p-4"
                    >
                      <div>
                        <span
                          className={`inline-flex rounded-lg px-3 py-2 text-xs font-bold text-white ${isExam ? "bg-[#267bd7]" : "bg-[#28c53f]"}`}
                        >
                          {isExam ? "Exam" : "Lesson"}
                        </span>
                        <p className="mt-4 text-sm text-slate-600">
                          {formatDate(lesson.lessonDate)}
                        </p>
                        <p className="mt-2 text-sm text-slate-600">
                          {formatTime(lesson.startTime)} to{" "}
                          {formatTime(lesson.endTime)}
                        </p>
                        <span className="mt-3 inline-flex rounded-lg bg-white px-2 py-1 text-[11px] font-semibold capitalize text-[#174a9b]">
                          {getVehicleType(lesson)} transmission
                        </span>
                      </div>
                      <div className="min-w-0 border-t border-slate-300/70 pt-3 text-left sm:border-0 sm:pt-0 sm:text-right">
                        <p
                          className={`text-sm font-semibold ${statusColor(lesson.status)}`}
                        >
                          {statusText(lesson.status)}
                        </p>
                        <p className="mt-3 flex min-w-0 items-start gap-2 text-[12px] font-bold leading-4 text-slate-600 sm:mt-8 sm:justify-end sm:text-sm">
                          <FaMapMarkerAlt className="mt-0.5 shrink-0" />
                          <span className="min-w-0 break-words">
                            {getLessonLocation(lesson)}
                          </span>
                        </p>
                        <p className="mt-1.5 text-xs text-slate-600 sm:mt-2">
                          {lesson.teacher?.name || "Teacher"}
                        </p>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="rounded-xl bg-[#e8eef7] p-6 text-center sm:p-12">
                  <p className="text-sm font-bold text-[#123f88]">
                    No lessons found
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Choose another lesson filter or book a new lesson.
                  </p>
                </div>
              )}
            </div>

            {!loading && visibleLessons.length > PAGE_SIZE && (
              <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-center text-[11px] font-medium text-slate-500 sm:text-left sm:text-xs">
                  Showing {(page - 1) * PAGE_SIZE + 1}–
                  {Math.min(page * PAGE_SIZE, visibleLessons.length)} of{" "}
                  {visibleLessons.length} lessons
                </p>
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() =>
                      setPage((current) => Math.max(1, current - 1))
                    }
                    className="h-9 rounded-lg border border-[#174a9b] px-3 text-xs font-bold text-[#174a9b] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <span className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-[#174a9b] px-2 text-xs font-bold text-white">
                    {page} / {totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={page === totalPages}
                    onClick={() =>
                      setPage((current) => Math.min(totalPages, current + 1))
                    }
                    className="h-9 rounded-lg border border-[#174a9b] px-3 text-xs font-bold text-[#174a9b] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
