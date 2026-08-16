"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

import { getLessons } from "@/features/API";
import { getErrorMessage, unwrap } from "@/features/lessonHelpers";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const pad = (value) => String(value).padStart(2, "0");
const dateKey = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const addDays = (date, amount) => {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
};
const startOfWeek = (value) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + (date.getDay() === 0 ? -6 : 1 - date.getDay()));
  return date;
};
const lessonDateKey = (value) => {
  const date = new Date(value);
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
};
const toMinutes = (value) => {
  const [hour, minute] = String(value || "00:00")
    .split(":")
    .map(Number);
  return hour * 60 + minute;
};
const minutesToTime = (value) =>
  `${pad(Math.floor(value / 60))}:${pad(value % 60)}`;
const formatTime = (value) => {
  const [hour, minute] = String(value || "00:00")
    .split(":")
    .map(Number);
  return `${hour % 12 || 12}:${pad(minute)} ${hour >= 12 ? "PM" : "AM"}`;
};

export default function PlanningPage() {
  const router = useRouter();
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)),
    [weekStart],
  );

  const loadLessons = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getLessons({
        page: 1,
        limit: 100,
        status: "all",
        dateFrom: dateKey(weekStart),
        dateTo: dateKey(addDays(weekStart, 6)),
        sortOrder: "asc",
      });
      const data = unwrap(response, []);
      setLessons(
        (Array.isArray(data) ? data : []).filter(
          (lesson) => !["cancelled", "no_show"].includes(lesson.status),
        ),
      );
    } catch (requestError) {
      setError(
        getErrorMessage(requestError, "Booked lessons could not be loaded."),
      );
    } finally {
      setLoading(false);
    }
  }, [weekStart]);

  useEffect(() => {
    loadLessons();
  }, [loadLessons]);

  const timeRows = useMemo(() => {
    if (!lessons.length) return [];
    const start =
      Math.floor(
        Math.min(...lessons.map((lesson) => toMinutes(lesson.startTime))) / 30,
      ) * 30;
    const end =
      Math.ceil(
        Math.max(...lessons.map((lesson) => toMinutes(lesson.endTime))) / 30,
      ) * 30;
    const rows = [];
    for (let minute = start; minute < end; minute += 30)
      rows.push(minutesToTime(minute));
    return rows;
  }, [lessons]);
  const mobileSchedule = useMemo(
    () =>
      weekDays
        .map((day) => ({
          day,
          lessons: lessons
            .filter(
              (lesson) => lessonDateKey(lesson.lessonDate) === dateKey(day),
            )
            .sort((first, second) =>
              String(first.startTime || "").localeCompare(
                String(second.startTime || ""),
              ),
            ),
        }))
        .filter((item) => item.lessons.length),
    [lessons, weekDays],
  );
  const rangeLabel = `${weekStart.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })} – ${addDays(weekStart, 6).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`;

  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-2.5 pb-24 pt-3 sm:p-5 sm:pb-8">
      <h1 className="text-lg font-extrabold text-blue-900 sm:text-xl">
        Planning
      </h1>
      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}
      <section className="mt-3 rounded-xl bg-[#e8eef7] p-2.5 sm:mt-5 sm:rounded-2xl sm:p-5">
        <div className="flex min-w-0 items-center justify-between gap-2 rounded-xl bg-white px-3 py-2.5 sm:px-4 sm:py-3">
          <strong className="min-w-0 text-[12px] text-slate-800 sm:text-base">
            {rangeLabel}
          </strong>
          <div className="flex gap-2 text-blue-900">
            <button
              type="button"
              aria-label="Previous week"
              onClick={() => setWeekStart((current) => addDays(current, -7))}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-sm sm:h-10 sm:w-10"
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              aria-label="Next week"
              onClick={() => setWeekStart((current) => addDays(current, 7))}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-sm sm:h-10 sm:w-10"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="mt-2.5 md:hidden">
          {loading ? (
            <div className="space-y-2.5">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-24 animate-pulse rounded-xl bg-white"
                />
              ))}
            </div>
          ) : mobileSchedule.length ? (
            <div className="space-y-3">
              {mobileSchedule.map(({ day, lessons: dayLessons }) => (
                <section
                  key={dateKey(day)}
                  className="overflow-hidden rounded-xl bg-white"
                >
                  <header className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-3 py-2.5">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wide text-[#174a9b]">
                        {day.toLocaleDateString("en-US", { weekday: "long" })}
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-500">
                        {day.toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#e8eef7] px-2.5 py-1 text-[10px] font-bold text-[#174a9b]">
                      {dayLessons.length}{" "}
                      {dayLessons.length === 1 ? "lesson" : "lessons"}
                    </span>
                  </header>
                  <div className="divide-y divide-slate-100">
                    {dayLessons.map((lesson) => (
                      <button
                        type="button"
                        key={lesson._id}
                        onClick={() =>
                          router.push(`/student/lessons/${lesson._id}`)
                        }
                        className="flex w-full min-w-0 items-center gap-3 px-3 py-3 text-left active:bg-slate-50"
                      >
                        <div className="flex w-[74px] shrink-0 flex-col items-center rounded-lg bg-[#174a9b] px-2 py-2 text-white">
                          <span className="text-[11px] font-bold">
                            {formatTime(lesson.startTime)}
                          </span>
                          <span className="mt-1 text-[9px] opacity-80">
                            to {formatTime(lesson.endTime)}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-bold text-slate-800">
                            Booked lesson
                          </p>
                          <p className="mt-1 truncate text-[11px] font-semibold text-[#174a9b]">
                            {lesson.teacher?.name || "Instructor"}
                          </p>
                          <p className="mt-1 truncate text-[10px] text-slate-500">
                            {lesson.booking?.location?.address ||
                              lesson.location?.address ||
                              "Lesson location"}
                          </p>
                        </div>
                        <FaChevronRight className="shrink-0 text-xs text-slate-400" />
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white px-4 py-10 text-center text-xs font-semibold text-slate-500">
              No booked lesson in this week.
            </div>
          )}
        </div>

        <div className="mt-4 hidden overflow-x-auto rounded-xl bg-white md:block">
          <div className="min-w-[780px]">
            <div className="grid grid-cols-[110px_repeat(7,1fr)] border-b border-slate-200">
              <div className="flex h-20 items-center justify-center border-r font-bold text-blue-900">
                Time
              </div>
              {weekDays.map((day, index) => (
                <div
                  key={dateKey(day)}
                  className="flex h-20 flex-col items-center justify-center border-r last:border-r-0"
                >
                  <b>{pad(day.getDate())}</b>
                  <span className="mt-1 font-semibold">{DAYS[index]}</span>
                </div>
              ))}
            </div>

            {loading ? (
              <div className="h-40 animate-pulse bg-slate-50" />
            ) : timeRows.length ? (
              timeRows.map((time) => (
                <div
                  key={time}
                  className="grid grid-cols-[110px_repeat(7,1fr)] border-b border-slate-200 last:border-b-0"
                >
                  <div className="flex min-h-24 items-center justify-center border-r bg-slate-50 text-sm font-bold text-green-600">
                    {formatTime(time)}
                  </div>
                  {weekDays.map((day) => {
                    const booked = lessons.filter(
                      (lesson) =>
                        lessonDateKey(lesson.lessonDate) === dateKey(day) &&
                        lesson.startTime === time,
                    );
                    return (
                      <div
                        key={dateKey(day)}
                        className="relative flex min-h-24 items-start justify-center border-r p-1 last:border-r-0"
                      >
                        {booked.map((lesson) => {
                          const durationMinutes = Math.max(
                            toMinutes(lesson.endTime) -
                              toMinutes(lesson.startTime),
                            Number(lesson.duration || 30),
                            30,
                          );
                          return (
                            <button
                              type="button"
                              key={lesson._id}
                              onClick={() =>
                                router.push(`/student/lessons/${lesson._id}`)
                              }
                              style={{
                                height: `${(durationMinutes / 30) * 96 - 8}px`,
                              }}
                              className="absolute left-1 right-1 top-1 z-10 overflow-hidden rounded-lg bg-[#174a9b] px-2 py-2 text-left text-xs font-bold text-white shadow-sm"
                            >
                              <span className="block">Booked</span>
                              <span className="mt-1 block truncate text-[10px] font-medium opacity-90">
                                {lesson.teacher?.name || "Instructor"}
                              </span>
                              <span className="block text-[10px] font-medium opacity-80">
                                {formatTime(lesson.startTime)}–
                                {formatTime(lesson.endTime)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-sm font-semibold text-slate-500">
                No booked lesson in this week.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
