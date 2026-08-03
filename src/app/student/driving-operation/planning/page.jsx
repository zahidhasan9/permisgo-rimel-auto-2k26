"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

import { getLessons } from "@/features/API";
import { getErrorMessage, unwrap } from "@/features/lessonHelpers";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const pad = (value) => String(value).padStart(2, "0");
const dateKey = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const addDays = (date, amount) => { const next = new Date(date); next.setDate(next.getDate() + amount); return next; };
const startOfWeek = (value) => { const date = new Date(value); date.setHours(0, 0, 0, 0); date.setDate(date.getDate() + (date.getDay() === 0 ? -6 : 1 - date.getDay())); return date; };
const lessonDateKey = (value) => { const date = new Date(value); return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`; };
const toMinutes = (value) => { const [hour, minute] = String(value || "00:00").split(":").map(Number); return hour * 60 + minute; };
const minutesToTime = (value) => `${pad(Math.floor(value / 60))}:${pad(value % 60)}`;
const formatTime = (value) => { const [hour, minute] = String(value || "00:00").split(":").map(Number); return `${hour % 12 || 12}:${pad(minute)} ${hour >= 12 ? "PM" : "AM"}`; };

export default function PlanningPage() {
  const router = useRouter();
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)), [weekStart]);

  const loadLessons = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getLessons({ page: 1, limit: 100, status: "all", dateFrom: dateKey(weekStart), dateTo: dateKey(addDays(weekStart, 6)), sortOrder: "asc" });
      const data = unwrap(response, []);
      setLessons((Array.isArray(data) ? data : []).filter((lesson) => !["cancelled", "no_show"].includes(lesson.status)));
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Booked lessons could not be loaded."));
    } finally {
      setLoading(false);
    }
  }, [weekStart]);

  useEffect(() => { loadLessons(); }, [loadLessons]);

  const timeRows = useMemo(() => {
    if (!lessons.length) return [];
    const start = Math.floor(Math.min(...lessons.map((lesson) => toMinutes(lesson.startTime))) / 30) * 30;
    const end = Math.ceil(Math.max(...lessons.map((lesson) => toMinutes(lesson.endTime))) / 30) * 30;
    const rows = [];
    for (let minute = start; minute < end; minute += 30) rows.push(minutesToTime(minute));
    return rows;
  }, [lessons]);
  const rangeLabel = `${weekStart.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })} – ${addDays(weekStart, 6).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`;

  return (
    <main className="min-h-screen bg-white p-3 sm:p-5">
      <h1 className="text-xl font-extrabold text-blue-900">Planning</h1>
      {error && <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
      <section className="mt-5 rounded-2xl bg-[#e8eef7] p-3 sm:p-5">
        <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3">
          <strong className="text-sm text-slate-800 sm:text-base">{rangeLabel}</strong>
          <div className="flex gap-2 text-blue-900">
            <button type="button" onClick={() => setWeekStart((current) => addDays(current, -7))} className="rounded-lg bg-slate-100 p-3"><FaChevronLeft /></button>
            <button type="button" onClick={() => setWeekStart((current) => addDays(current, 7))} className="rounded-lg bg-slate-100 p-3"><FaChevronRight /></button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl bg-white">
          <div className="min-w-[780px]">
            <div className="grid grid-cols-[110px_repeat(7,1fr)] border-b border-slate-200">
              <div className="flex h-20 items-center justify-center border-r font-bold text-blue-900">Time</div>
              {weekDays.map((day, index) => <div key={dateKey(day)} className="flex h-20 flex-col items-center justify-center border-r last:border-r-0"><b>{pad(day.getDate())}</b><span className="mt-1 font-semibold">{DAYS[index]}</span></div>)}
            </div>

            {loading ? <div className="h-40 animate-pulse bg-slate-50" /> : timeRows.length ? timeRows.map((time) => (
              <div key={time} className="grid grid-cols-[110px_repeat(7,1fr)] border-b border-slate-200 last:border-b-0">
                <div className="flex min-h-24 items-center justify-center border-r bg-slate-50 text-sm font-bold text-green-600">{formatTime(time)}</div>
                {weekDays.map((day) => {
                  const booked = lessons.filter((lesson) => lessonDateKey(lesson.lessonDate) === dateKey(day) && lesson.startTime === time);
                  return <div key={dateKey(day)} className="relative flex min-h-24 items-start justify-center border-r p-1 last:border-r-0">{booked.map((lesson) => {
                    const durationMinutes = Math.max(toMinutes(lesson.endTime) - toMinutes(lesson.startTime), Number(lesson.duration || 30), 30);
                    return <button type="button" key={lesson._id} onClick={() => router.push(`/student/lessons/${lesson._id}`)} style={{ height: `${(durationMinutes / 30) * 96 - 8}px` }} className="absolute left-1 right-1 top-1 z-10 overflow-hidden rounded-lg bg-[#174a9b] px-2 py-2 text-left text-xs font-bold text-white shadow-sm"><span className="block">Booked</span><span className="mt-1 block truncate text-[10px] font-medium opacity-90">{lesson.teacher?.name || "Instructor"}</span><span className="block text-[10px] font-medium opacity-80">{formatTime(lesson.startTime)}–{formatTime(lesson.endTime)}</span></button>;
                  })}</div>;
                })}
              </div>
            )) : <div className="p-12 text-center text-sm font-semibold text-slate-500">No booked lesson in this week.</div>}
          </div>
        </div>
      </section>
    </main>
  );
}
