"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaTimes } from "react-icons/fa";
import { IoChevronBack, IoChevronForward, IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";

import {
  confirmLocationBooking,
  getLocationBookings,
  getLessons,
  getTeacherAvailability,
  rejectLocationBooking,
  updateTeacherAvailability,
} from "@/features/API";
import {
  getErrorMessage,
  getLessonLocation,
  statusClass,
  statusLabel,
  unwrap,
} from "@/features/lessonHelpers";
import { mediaUrl } from "@/utils/mediaUrl";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const pad = (value) => String(value).padStart(2, "0");
const toMinutes = (value) => {
  const [hours, minutes] = String(value || "00:00").split(":").map(Number);
  return hours * 60 + minutes;
};
const minutesToTime = (value) =>
  `${pad(Math.floor(value / 60))}:${pad(value % 60)}`;
const mergeSlots = (slots) => {
  const sorted = [...slots]
    .filter((slot) => toMinutes(slot.endTime) > toMinutes(slot.startTime))
    .sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));
  return sorted.reduce((result, slot) => {
    const previous = result[result.length - 1];
    if (!previous || toMinutes(slot.startTime) > toMinutes(previous.endTime)) {
      result.push({ ...slot });
    } else if (toMinutes(slot.endTime) > toMinutes(previous.endTime)) {
      previous.endTime = slot.endTime;
    }
    return result;
  }, []);
};
const removeRangeFromSlots = (slots, startTime, endTime) =>
  slots.flatMap((slot) => {
    const start = toMinutes(slot.startTime);
    const end = toMinutes(slot.endTime);
    const removeStart = toMinutes(startTime);
    const removeEnd = toMinutes(endTime);
    if (removeEnd <= start || removeStart >= end) return [slot];
    return [
      start < removeStart ? { startTime: slot.startTime, endTime: startTime } : null,
      removeEnd < end ? { startTime: endTime, endTime: slot.endTime } : null,
    ].filter(Boolean);
  });
const displayTime = (value) => {
  const [hours, minutes] = value.split(":").map(Number);
  const hour = hours % 12 || 12;
  return `${hour}:${pad(minutes)} ${hours >= 12 ? "PM" : "AM"}`;
};
const dateKey = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const startOfWeek = (value) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  const offset = date.getDay() === 0 ? -6 : 1 - date.getDay();
  date.setDate(date.getDate() + offset);
  return date;
};
const addDays = (date, amount) => {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
};
const lessonDateKey = (value) => {
  const date = new Date(value);
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(
    date.getUTCDate(),
  )}`;
};
const formatRange = (start) => {
  const end = addDays(start, 6);
  return `${start.toLocaleDateString("en-GB", {
    month: "short",
    day: "2-digit",
  })} - ${end.toLocaleDateString("en-GB", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })}`;
};
const getInitial = (name = "Student") => name.trim().charAt(0).toUpperCase();
const FULL_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const toEditorSchedule = (availability) =>
  FULL_DAYS.map((_, dayOfWeek) => {
    const day = availability?.weeklySchedule?.find(
      (item) => Number(item.dayOfWeek) === dayOfWeek,
    );
    const slot = day?.slots?.[0];
    return {
      dayOfWeek,
      enabled: Boolean(day?.enabled),
      startTime: slot?.startTime || "09:00",
      endTime: slot?.endTime || "18:00",
    };
  });

export default function AvailabilityCalendar() {
  const [search, setSearch] = useState("");
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [lessons, setLessons] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [availability, setAvailability] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAvailabilityEditor, setShowAvailabilityEditor] = useState(false);
  const [editorSchedule, setEditorSchedule] = useState([]);
  const [notice, setNotice] = useState("");
  const router = useRouter();

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)),
    [weekStart],
  );

  const miniDays = useMemo(() => {
    const monthStart = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1,
    );
    const gridStart = addDays(monthStart, -monthStart.getDay());
    return Array.from({ length: 35 }, (_, index) => {
      const date = addDays(gridStart, index);
      return {
        date,
        day: pad(date.getDate()),
        muted: date.getMonth() !== selectedDate.getMonth(),
        active: dateKey(date) === dateKey(selectedDate),
      };
    });
  }, [selectedDate]);

  const loadCalendar = useCallback(async () => {
    setLoading(true);
    setNotice("");
    try {
      const [lessonResponse, bookingResponse, availabilityResponse] =
        await Promise.all([
        getLessons({
          dateFrom: dateKey(weekStart),
          dateTo: dateKey(addDays(weekStart, 6)),
          limit: 100,
          sortOrder: "asc",
        }),
        getLocationBookings({
          dateFrom: dateKey(weekStart),
          dateTo: dateKey(addDays(weekStart, 6)),
          status: "pending",
          page: 1,
          limit: 100,
        }),
        getTeacherAvailability(),
      ]);
      const lessonData = unwrap(lessonResponse, []);
      const bookingData = unwrap(bookingResponse, []);
      setLessons(Array.isArray(lessonData) ? lessonData : []);
      setBookings(Array.isArray(bookingData) ? bookingData : []);
      setAvailability(unwrap(availabilityResponse, null));
    } catch (error) {
      setNotice(getErrorMessage(error, "Calendar could not be loaded."));
    } finally {
      setLoading(false);
    }
  }, [weekStart]);

  useEffect(() => {
    loadCalendar();
  }, [loadCalendar]);

  const students = useMemo(() => {
    const unique = new Map();
    [...lessons, ...bookings].forEach((item) => {
      const student = item.student;
      if (student?._id && !unique.has(student._id)) unique.set(student._id, student);
    });
    const query = search.trim().toLowerCase();
    return [...unique.values()].filter((student) =>
      [student.name, student.email]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query)),
    );
  }, [bookings, lessons, search]);

  const lessonsForCell = (time, day) =>
    lessons.filter(
      (lesson) =>
        lessonDateKey(lesson.lessonDate) === dateKey(day) &&
        Math.floor(toMinutes(lesson.startTime) / 30) * 30 === toMinutes(time) &&
        !["cancelled", "no_show"].includes(lesson.status),
    );

  const bookingsForCell = (time, day) =>
    bookings.filter(
      (booking) =>
        lessonDateKey(booking.bookingDate) === dateKey(day) &&
        Math.floor(toMinutes(booking.startTime) / 30) * 30 === toMinutes(time),
    );

  const timeValues = useMemo(() => {
    const values = [];
    const effectiveSlots = (availability?.weeklySchedule || [])
      .filter((day) => day.enabled)
      .flatMap((day) => day.slots || []);
    const availabilityTimes = effectiveSlots
      .flatMap((slot) => [slot.startTime, slot.endTime])
      .filter(Boolean);
    const eventStarts = [
      ...lessons.map((item) => item.startTime),
      ...bookings.map((item) => item.startTime),
    ].filter(Boolean);
    const eventStartMinutes = eventStarts.map(
      (value) => Math.floor(toMinutes(value) / 30) * 30,
    );
    const allStartTimes = [
      ...effectiveSlots.map((slot) => slot.startTime),
      ...eventStartMinutes.map(minutesToTime),
    ].filter(Boolean);
    const minimum = allStartTimes.length
      ? Math.max(0, Math.floor(Math.min(...allStartTimes.map(toMinutes)) / 30) * 30)
      : 9 * 60;
    const availabilityLastStarts = availabilityTimes.length
      ? effectiveSlots.map((slot) => Math.max(toMinutes(slot.startTime), toMinutes(slot.endTime) - 30))
      : [];
    const maximumStart = [...availabilityLastStarts, ...eventStartMinutes].length
      ? Math.min(23 * 60 + 30, Math.max(...availabilityLastStarts, ...eventStartMinutes))
      : 17 * 60 + 30;
    for (let value = minimum; value <= maximumStart; value += 30) {
      values.push(minutesToTime(value));
    }
    return values;
  }, [availability, bookings, lessons]);

  const isAvailableCell = (time, day) => {
    const key = dateKey(day);
    const exception = (availability?.dateExceptions || []).find(
      (item) => lessonDateKey(item.date) === key,
    );
    const slots = exception
      ? exception.unavailable
        ? []
        : exception.slots || []
      : availability?.weeklySchedule?.find(
            (item) => Number(item.dayOfWeek) === day.getDay(),
          )?.slots || [];
    const minute = toMinutes(time);
    return slots.some(
      (slot) =>
        minute >= toMinutes(slot.startTime) &&
        minute < toMinutes(slot.endTime),
    );
  };

  const resolveBooking = async (booking, approve) => {
    setSaving(true);
    setNotice("");
    try {
      if (approve) {
        await confirmLocationBooking(booking._id);
        setNotice("Booking accepted and lesson scheduled.");
      } else {
        const reason = window.prompt("Reason for rejecting this request:");
        if (!reason?.trim()) return;
        await rejectLocationBooking(booking._id, { reason: reason.trim() });
        setNotice("Booking request rejected.");
      }
      setSelectedEvent(null);
      await loadCalendar();
    } catch (error) {
      setNotice(getErrorMessage(error, "Booking action could not be completed."));
    } finally {
      setSaving(false);
    }
  };

  const copyForNextWeek = async () => {
    if (!availability || saving) return;
    if (
      !window.confirm(
        "Copy this week's effective availability to next week? Existing custom slots for next week will be replaced.",
      )
    ) {
      return;
    }

    setSaving(true);
    setNotice("");
    try {
      const nextKeys = new Set(
        weekDays.map((day) => dateKey(addDays(day, 7))),
      );
      const retained = (availability.dateExceptions || []).filter(
        (item) => !nextKeys.has(lessonDateKey(item.date)),
      );
      const copied = weekDays.map((day) => {
        const existing = (availability.dateExceptions || []).find(
          (item) => lessonDateKey(item.date) === dateKey(day),
        );
        const recurring = availability.weeklySchedule?.find(
          (item) => Number(item.dayOfWeek) === day.getDay(),
        );
        const slots = existing
          ? existing.unavailable
            ? []
            : existing.slots || []
          : recurring?.enabled
            ? recurring.slots || []
            : [];
        return {
          date: dateKey(addDays(day, 7)),
          unavailable: slots.length === 0,
          slots,
          note: "Copied from previous week",
        };
      });

      const response = await updateTeacherAvailability({
        timezone: availability.timezone || "Europe/Paris",
        bufferMinutes: availability.bufferMinutes ?? 15,
        slotIntervalMinutes: availability.slotIntervalMinutes ?? 30,
        lessonDurationOptions:
          availability.lessonDurationOptions || [30, 60, 90, 120],
        weeklySchedule: availability.weeklySchedule,
        dateExceptions: [...retained, ...copied],
      });
      setAvailability(unwrap(response, availability));
      setNotice("Availability copied to next week successfully.");
    } catch (error) {
      setNotice(getErrorMessage(error, "Availability could not be copied."));
    } finally {
      setSaving(false);
    }
  };

  const openAvailabilityEditor = () => {
    setEditorSchedule(toEditorSchedule(availability));
    setNotice("");
    setShowAvailabilityEditor(true);
  };

  const updateEditorDay = (dayOfWeek, field, value) => {
    setEditorSchedule((current) =>
      current.map((day) =>
        day.dayOfWeek === dayOfWeek ? { ...day, [field]: value } : day,
      ),
    );
  };

  const saveWeeklyAvailability = async () => {
    const invalidDay = editorSchedule.find(
      (day) => day.enabled && day.endTime <= day.startTime,
    );
    if (invalidDay) {
      setNotice(`${FULL_DAYS[invalidDay.dayOfWeek]} end time must be after start time.`);
      return;
    }

    setSaving(true);
    setNotice("");
    try {
      const response = await updateTeacherAvailability({
        timezone: availability?.timezone || "Europe/Paris",
        bufferMinutes: availability?.bufferMinutes ?? 15,
        slotIntervalMinutes: availability?.slotIntervalMinutes ?? 30,
        lessonDurationOptions: availability?.lessonDurationOptions || [30, 60, 90, 120],
        // A newly saved weekly schedule becomes the single source of truth.
        // Remove older copied/custom overrides that could keep stale hours visible.
        dateExceptions: [],
        weeklySchedule: editorSchedule.map((day) => ({
          dayOfWeek: day.dayOfWeek,
          enabled: day.enabled,
          slots: day.enabled
            ? [{ startTime: day.startTime, endTime: day.endTime }]
            : [],
        })),
      });
      setAvailability(unwrap(response, availability));
      setShowAvailabilityEditor(false);
      setNotice("Weekly availability saved successfully.");
    } catch (error) {
      setNotice(getErrorMessage(error, "Availability could not be saved."));
    } finally {
      setSaving(false);
    }
  };

  const setCellAvailability = async (day, time, makeFree) => {
    if (!availability || saving) return;
    const endTime = minutesToTime(toMinutes(time) + 30);
    const key = dateKey(day);
    const existingException = (availability.dateExceptions || []).find(
      (item) => lessonDateKey(item.date) === key,
    );
    const recurring = (availability.weeklySchedule || []).find(
      (item) => Number(item.dayOfWeek) === day.getDay(),
    );
    const effectiveSlots = existingException
      ? existingException.unavailable
        ? []
        : existingException.slots || []
      : recurring?.enabled
        ? recurring.slots || []
        : [];
    const nextSlots = makeFree
      ? mergeSlots([...effectiveSlots, { startTime: time, endTime }])
      : removeRangeFromSlots(effectiveSlots, time, endTime);
    const retained = (availability.dateExceptions || []).filter(
      (item) => lessonDateKey(item.date) !== key,
    );
    const nextExceptions = [
      ...retained,
      {
        date: key,
        unavailable: nextSlots.length === 0,
        slots: nextSlots,
        note: "Updated from teacher calendar",
      },
    ];

    setSaving(true);
    setNotice("");
    try {
      const response = await updateTeacherAvailability({
        timezone: availability.timezone || "Europe/Paris",
        bufferMinutes: availability.bufferMinutes ?? 15,
        slotIntervalMinutes: availability.slotIntervalMinutes ?? 30,
        lessonDurationOptions: availability.lessonDurationOptions || [30, 60, 90, 120],
        weeklySchedule: availability.weeklySchedule,
        dateExceptions: nextExceptions,
      });
      setAvailability(unwrap(response, availability));
      setNotice(`${key} at ${displayTime(time)} marked ${makeFree ? "free" : "busy"}.`);
    } catch (error) {
      setNotice(getErrorMessage(error, "This time slot could not be updated."));
    } finally {
      setSaving(false);
    }
  };

  const moveMonth = (amount) => {
    const next = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + amount,
      1,
    );
    setSelectedDate(next);
    setWeekStart(startOfWeek(next));
  };

  return (
    <section className="min-h-screen w-full max-w-full overflow-hidden bg-white px-2.5 py-3 pb-24 sm:px-5 sm:py-4 sm:pb-10 lg:px-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl text-slate-900 transition hover:bg-slate-200"
          >
            <FaChevronLeft size={14} />
          </button>
          <h1 className="truncate text-xl font-extrabold text-blue-900 sm:text-2xl">
            Availability Calendar
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row">
          <button
            type="button"
            onClick={copyForNextWeek}
            disabled={loading || saving}
            className="min-w-0 rounded-xl border-2 border-blue-900 bg-white px-2 py-2.5 text-[11px] font-bold text-blue-900 transition hover:bg-blue-50 disabled:opacity-50 sm:px-5 sm:text-sm"
          >
            {saving ? "Copying..." : "Copy for next week"}
          </button>
          <button
            type="button"
            onClick={openAvailabilityEditor}
            disabled={loading || !availability}
            className="min-w-0 rounded-xl bg-rose-600 px-2 py-2.5 text-[11px] font-bold text-white transition hover:bg-rose-700 sm:px-5 sm:text-sm"
          >
            Set availability
          </button>
        </div>
      </div>

      {notice && (
        <div className="mb-5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-800">
          {notice}
        </div>
      )}

      <div className="grid w-full max-w-full grid-cols-1 gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="order-2 rounded-2xl bg-slate-100 p-3 sm:p-4 xl:order-1">
          <div className="rounded-xl bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                {selectedDate.toLocaleDateString("en-GB", {
                  month: "long",
                  year: "numeric",
                })}
              </h3>
              <div className="flex items-center gap-2 text-blue-900">
                <button type="button" onClick={() => moveMonth(-1)} className="text-lg">
                  <IoChevronBack />
                </button>
                <button type="button" onClick={() => moveMonth(1)} className="text-lg">
                  <IoChevronForward />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <span key={index} className="text-xs font-semibold text-slate-900">
                  {day}
                </span>
              ))}
              {miniDays.map((item) => (
                <button
                  key={dateKey(item.date)}
                  type="button"
                  onClick={() => {
                    setSelectedDate(item.date);
                    setWeekStart(startOfWeek(item.date));
                  }}
                  className={`flex h-7 items-center justify-center rounded-md text-xs transition ${
                    item.active
                      ? "bg-slate-200 text-slate-900"
                      : item.muted
                        ? "text-slate-400 hover:bg-slate-100"
                        : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.day}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <h4 className="mb-3 text-sm font-extrabold text-slate-900">Student</h4>
            <div className="mb-4 flex h-11 items-center gap-3 rounded-xl bg-white px-4">
              <IoSearch className="text-xl text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search students"
                className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
            <div className="space-y-4">
              {students.length ? (
                students.map((student) => (
                  <StudentItem key={student._id} student={student} />
                ))
              ) : (
                <p className="text-xs text-slate-500">
                  {loading ? "Loading students..." : "No student in this week."}
                </p>
              )}
            </div>
          </div>
        </aside>

        <main className="order-1 min-w-0 rounded-2xl bg-slate-100 p-2.5 sm:p-4 xl:order-2">
          <div className="mb-3 flex items-center justify-between rounded-xl bg-white px-3 py-3 sm:mb-4 sm:px-4">
            <h3 className="text-sm font-bold text-slate-900 sm:text-base">
              {formatRange(weekStart)}
            </h3>
            <div className="flex items-center gap-3 text-blue-900">
              <button
                type="button"
                onClick={() => setWeekStart((current) => addDays(current, -7))}
                className="text-lg"
              >
                <IoChevronBack />
              </button>
              <button
                type="button"
                onClick={() => setWeekStart((current) => addDays(current, 7))}
                className="text-lg"
              >
                <IoChevronForward />
              </button>
            </div>
          </div>

          <p className="mb-2 text-[10px] font-semibold text-slate-500 sm:hidden">Swipe sideways to see the full week. Tap an empty or busy slot to change it.</p>
          <div className="w-full max-w-full overflow-x-auto overscroll-x-contain rounded-xl bg-white">
            <div className="min-w-[612px] sm:min-w-[760px]">
              <div className="grid [grid-template-columns:80px_repeat(7,76px)] border-b border-slate-200 sm:grid-cols-[110px_repeat(7,minmax(85px,1fr))]">
                <div className="sticky left-0 z-40 flex h-14 items-center justify-center border-r border-slate-200 bg-white text-xs font-extrabold text-blue-900 sm:h-20 sm:text-sm">
                  Time
                </div>
                {weekDays.map((day) => (
                  <div
                    key={dateKey(day)}
                    className="flex h-14 flex-col items-center justify-center border-r border-slate-200 text-center last:border-r-0 sm:h-20"
                  >
                    <span className="text-xs font-extrabold text-slate-900 sm:text-base">
                      {pad(day.getDate())}
                    </span>
                    <span className="mt-0.5 text-[10px] font-bold text-slate-900 sm:mt-1 sm:text-sm">
                      {DAYS[day.getDay()]}
                    </span>
                  </div>
                ))}
              </div>

              {timeValues.map((time) => (
                <div
                  key={time}
                  className="grid [grid-template-columns:80px_repeat(7,76px)] border-b border-slate-200 last:border-b-0 sm:grid-cols-[110px_repeat(7,minmax(85px,1fr))]"
                >
                  <div className="sticky left-0 z-30 flex h-[68px] items-center justify-center border-r border-slate-200 bg-slate-50 text-[11px] font-extrabold text-green-500 sm:h-[84px] sm:text-base">
                    {displayTime(time)}
                  </div>
                  {weekDays.map((day) => {
                    const items = lessonsForCell(time, day);
                    const requests = bookingsForCell(time, day);
                    const available = isAvailableCell(time, day);
                    const occupied = items.length > 0 || requests.length > 0;
                    return (
                      <div
                        key={dateKey(day)}
                        onClick={() => !occupied && setCellAvailability(day, time, available ? false : true)}
                        role={!occupied ? "button" : undefined}
                        tabIndex={!occupied ? 0 : undefined}
                        className={`group relative flex h-[68px] [--calendar-cell-height:68px] items-center justify-center border-r border-slate-200 last:border-r-0 sm:h-[84px] sm:[--calendar-cell-height:84px] ${!occupied ? "cursor-pointer" : ""} ${
                          available ? "bg-emerald-50/50" : "bg-slate-50/60"
                        }`}
                      >
                        {items.map((lesson) => (
                          <button
                            type="button"
                            key={lesson._id}
                            onClick={() =>
                              setSelectedEvent({ type: "lesson", data: lesson })
                            }
                            title={`${lesson.student?.name || "Student"} · ${lesson.startTime}-${lesson.endTime}`}
                            className={`absolute left-1 right-1 top-1 z-10 overflow-hidden rounded-lg px-2 py-1.5 text-xs font-extrabold text-white shadow-sm ${
                              lesson.status === "in_progress"
                                ? "bg-amber-600"
                                : lesson.status === "awaiting_confirmation"
                                  ? "bg-violet-600"
                                  : lesson.status === "completed"
                                    ? "bg-slate-500"
                                    : "bg-blue-900"
                            }`}
                            style={{
                              height: `max(34px, calc(var(--calendar-cell-height) * ${Number(lesson.duration || 30) / 30} - 8px))`,
                            }}
                          >
                            <span className="block truncate">Booked</span>
                            <span className="block truncate text-[10px] font-semibold opacity-80">
                              {lesson.student?.name || "Student"}
                            </span>
                          </button>
                        ))}
                        {requests.map((booking) => (
                          <button
                            type="button"
                            key={booking._id}
                            onClick={() =>
                              setSelectedEvent({ type: "booking", data: booking })
                            }
                            className="absolute bottom-1 left-1 right-1 z-20 rounded-lg bg-amber-500 px-2 py-1.5 text-xs font-extrabold text-white shadow-sm"
                          >
                            Request
                          </button>
                        ))}
                        {!occupied && (
                          <>
                            {!available && (
                              <span className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-extrabold text-white shadow-sm transition group-hover:opacity-0">
                                Busy
                              </span>
                            )}
                            <div className="absolute inset-0 z-30 hidden items-center justify-center bg-white/90 px-1 sm:group-hover:flex">
                              {available ? (
                                <button
                                  type="button"
                                  onClick={() => setCellAvailability(day, time, false)}
                                  disabled={saving}
                                  className="rounded-md bg-slate-800 px-3 py-1.5 text-[10px] font-extrabold text-white disabled:opacity-40"
                                >
                                  Mark Busy
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setCellAvailability(day, time, true)}
                                  disabled={saving}
                                  className="rounded-md bg-emerald-600 px-3 py-1.5 text-[10px] font-extrabold text-white disabled:opacity-40"
                                >
                                  Mark Free
                                </button>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          saving={saving}
          onClose={() => setSelectedEvent(null)}
          onAccept={() => resolveBooking(selectedEvent.data, true)}
          onReject={() => resolveBooking(selectedEvent.data, false)}
          onOpenLesson={() =>
            router.push(`/teacher/lessons?lessonId=${selectedEvent.data._id}`)
          }
        />
      )}
      {showAvailabilityEditor && (
        <AvailabilityEditor
          schedule={editorSchedule}
          saving={saving}
          onChange={updateEditorDay}
          onClose={() => setShowAvailabilityEditor(false)}
          onSave={saveWeeklyAvailability}
        />
      )}
    </section>
  );
}

function AvailabilityEditor({ schedule, saving, onChange, onClose, onSave }) {
  const firstEnabled = schedule.find((day) => day.enabled) || schedule[0];
  const applyTimeToEnabledDays = (field, value) => {
    schedule.forEach((day) => {
      if (day.enabled) onChange(day.dayOfWeek, field, value);
    });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-blue-900">Set weekly availability</h2>
            <p className="mt-1 text-sm text-slate-500">Students can only book inside these saved hours.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl bg-slate-100 p-3 text-slate-600"><FaTimes /></button>
        </div>
        <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm font-extrabold text-blue-900">Apply time to all available days</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-bold text-slate-600">
              Start time
              <input type="time" value={firstEnabled?.startTime || "09:00"} onChange={(event) => applyTimeToEnabledDays("startTime", event.target.value)} className="mt-1 block w-full rounded-xl border border-blue-200 bg-white px-3 py-2.5 text-sm" />
            </label>
            <label className="text-xs font-bold text-slate-600">
              End time
              <input type="time" value={firstEnabled?.endTime || "18:00"} onChange={(event) => applyTimeToEnabledDays("endTime", event.target.value)} className="mt-1 block w-full rounded-xl border border-blue-200 bg-white px-3 py-2.5 text-sm" />
            </label>
          </div>
        </div>
        <div className="mt-5 space-y-3">
          {schedule.map((day) => (
            <div key={day.dayOfWeek} className="grid items-center gap-3 rounded-xl border border-slate-200 p-3 sm:grid-cols-[130px_110px_1fr_1fr]">
              <strong className="text-sm text-slate-800">{FULL_DAYS[day.dayOfWeek]}</strong>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <input type="checkbox" checked={day.enabled} onChange={(event) => onChange(day.dayOfWeek, "enabled", event.target.checked)} className="h-4 w-4 accent-blue-900" />
                Available
              </label>
              <input type="time" value={day.startTime} disabled={!day.enabled} onChange={(event) => onChange(day.dayOfWeek, "startTime", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold disabled:bg-slate-100" />
              <input type="time" value={day.endTime} disabled={!day.enabled} onChange={(event) => onChange(day.dayOfWeek, "endTime", event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold disabled:bg-slate-100" />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} disabled={saving} className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700">Cancel</button>
          <button type="button" onClick={onSave} disabled={saving} className="rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50">{saving ? "Saving..." : "Save availability"}</button>
        </div>
      </div>
    </div>
  );
}

function StudentItem({ student }) {
  const avatar = student.avatar || student.profileImage || student.image;
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-blue-900 bg-blue-100 text-sm font-extrabold text-blue-900">
        {getInitial(student.name)}
        {avatar ? (
          <img
            src={mediaUrl(avatar)}
            alt={student.name || "Student"}
            className="absolute inset-0 h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : null}
      </div>
      <div className="min-w-0">
        <h5 className="truncate text-sm font-extrabold text-slate-900">
          {student.name || "Student"}
        </h5>
        <p className="truncate text-xs text-slate-500">{student.email || ""}</p>
      </div>
    </div>
  );
}

function EventModal({
  event,
  saving,
  onClose,
  onAccept,
  onReject,
  onOpenLesson,
}) {
  const item = event.data;
  const isBooking = event.type === "booking";
  const date = new Date(item.lessonDate || item.bookingDate);
  const person = item.student || {};
  const location = isBooking
    ? [item.location?.address, item.location?.city].filter(Boolean).join(", ")
    : getLessonLocation(item);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-blue-700">
              {isBooking ? "Pending booking request" : "Lesson details"}
            </p>
            <h2 className="mt-1 text-xl font-extrabold text-blue-900">
              {person.name || "Student"}
            </h2>
            <p className="text-sm text-slate-500">
              {person.email || person.phone || ""}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-100 p-3 text-slate-600"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mt-5 grid gap-3 rounded-xl bg-slate-100 p-4 text-sm text-slate-700 sm:grid-cols-2">
          <p>
            <strong className="block text-slate-900">Date</strong>
            {date.toLocaleDateString("en-GB", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p>
            <strong className="block text-slate-900">Time</strong>
            {item.startTime}–{item.endTime} ({item.duration} min)
          </p>
          <p>
            <strong className="block text-slate-900">Vehicle</strong>
            <span className="capitalize">{item.booking?.vehicleType || item.vehicleType || "Not set"}</span>
          </p>
          <p>
            <strong className="block text-slate-900">Status</strong>
            <span
              className={
                isBooking
                  ? "font-bold capitalize text-amber-700"
                  : `rounded-full px-2 py-1 text-xs font-bold ${statusClass(item.status)}`
              }
            >
              {isBooking ? item.status : statusLabel(item.status)}
            </span>
          </p>
          <p className="sm:col-span-2">
            <strong className="block text-slate-900">Location</strong>
            {location || "Not set"}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700"
          >
            Close
          </button>
          {isBooking ? (
            <>
              <button
                type="button"
                onClick={onReject}
                disabled={saving}
                className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={onAccept}
                disabled={saving}
                className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
              >
                {saving ? "Saving..." : "Accept & schedule"}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onOpenLesson}
              className="rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-bold text-white"
            >
              Open lesson
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
