"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  confirmAttendance,
  confirmLocationBooking,
  getTeacherDashboard,
  rejectLocationBooking,
  startLesson,
} from "@/features/API";
import {
  formatLessonDate,
  getErrorMessage,
  statusLabel,
  unwrap,
} from "@/features/lessonHelpers";

const STEP_CONFIG = [
  ["profile", "Complete your instructor profile", "/teacher/profile"],
  ["verified", "Get your teacher profile verified", "/teacher/documents"],
  ["vehicle", "Add an active admin-approved vehicle", "/teacher/vehicles"],
  ["location", "Select an active lesson location", "/teacher/locations"],
  ["availability", "Configure weekly availability", "/teacher/calendar"],
  ["documents", "Upload and approve required documents", "/teacher/documents"],
];

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [notice, setNotice] = useState("");

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getTeacherDashboard();
      setDashboard(unwrap(response, null));
    } catch (error) {
      setNotice(getErrorMessage(error, "Dashboard could not be loaded."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const profile = dashboard?.profile || {};
  const stats = dashboard?.stats || {};
  const todayLessons = dashboard?.todayLessons || [];
  const pendingBookings = dashboard?.pendingBookings || [];
  const readiness = dashboard?.readiness || { items: {}, percentage: 0 };
  const steps = STEP_CONFIG.map(([key, text, href], index) => ({
    key,
    text,
    href,
    step: `Step ${String(index + 1).padStart(2, "0")}`,
    done: Boolean(readiness.items?.[key]),
  }));
  const actionLessons = todayLessons.filter((lesson) =>
    ["in_progress", "awaiting_confirmation"].includes(lesson.status),
  );

  const bookingAction = async (booking, approve) => {
    setBusyId(booking._id);
    setNotice("");
    try {
      if (approve) {
        await confirmLocationBooking(booking._id);
        setNotice("Booking accepted and lesson scheduled.");
      } else {
        const reason = window.prompt("Reason for rejecting this booking:");
        if (!reason?.trim()) return;
        await rejectLocationBooking(booking._id, { reason: reason.trim() });
        setNotice("Booking request rejected.");
      }
      await loadDashboard();
    } catch (error) {
      setNotice(getErrorMessage(error, "Booking action failed."));
    } finally {
      setBusyId("");
    }
  };

  const lessonAction = async (lesson) => {
    setBusyId(lesson._id);
    setNotice("");
    try {
      if (lesson.status === "scheduled") {
        await startLesson(lesson._id);
        setNotice("Lesson started.");
      } else if (
        lesson.status === "in_progress" &&
        lesson.attendance?.teacherStatus !== "present"
      ) {
        await confirmAttendance(lesson._id, { status: "present" });
        setNotice("Attendance confirmed.");
      }
      await loadDashboard();
    } catch (error) {
      setNotice(getErrorMessage(error, "Lesson action failed."));
    } finally {
      setBusyId("");
    }
  };

  if (loading && !dashboard) {
    return (
      <div className="rounded-xl bg-slate-100 p-8 text-center text-sm font-semibold text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="mb-4">
        <h2 className="text-xl font-extrabold text-blue-900 sm:text-2xl">
          Welcome, {profile.user?.name || "Teacher"}
        </h2>
        <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
          Stay updated on lessons, booking requests, readiness and earnings—all
          in one place.
        </p>
      </div>

      <section className="mb-4 rounded-xl bg-slate-100 p-3 sm:p-4">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h5 className="text-sm font-extrabold text-slate-900 sm:text-base">
            Please complete the following steps:
          </h5>
          <h6 className="text-sm font-extrabold text-green-600">
            {readiness.percentage || 0}% Completed
          </h6>
        </div>

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          {steps.map((item) => (
            <StepItem key={item.key} item={item} />
          ))}
        </div>

        <ProgressTracker steps={steps} />

        <div className="mt-4 flex items-start gap-2 rounded-lg bg-blue-600 px-3 py-2.5 text-white">
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-extrabold text-blue-600">
            i
          </span>
          <p className="text-xs font-medium leading-5 sm:text-sm">
            {readiness.percentage === 100
              ? "Congratulations! Your instructor account is ready to accept bookings."
              : "Complete the remaining steps so students can find and book you without interruption."}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 2xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="min-w-0 rounded-xl bg-slate-100 p-3 sm:p-4">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h4 className="text-lg font-extrabold text-blue-900">
              Today&apos;s Lessons
            </h4>
            <span className="w-fit rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
              {new Date().toLocaleDateString("en-GB", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="rounded-xl bg-slate-200 p-2.5 sm:p-3">
            <div className="overflow-hidden rounded-lg bg-white">
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[650px] border-collapse text-left">
                  <thead>
                    <tr className="bg-blue-900 text-white">
                      <TableHead>Student</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status / Action</TableHead>
                    </tr>
                  </thead>
                  <tbody>
                    {todayLessons.map((lesson) => (
                      <tr
                        key={lesson._id}
                        className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
                      >
                        <TableData strong>
                          {lesson.student?.name || "Student"}
                        </TableData>
                        <TableData>
                          {formatLessonDate(lesson.lessonDate)}
                        </TableData>
                        <TableData>
                          {lesson.startTime}–{lesson.endTime}
                        </TableData>
                        <TableData>
                          <button
                            type="button"
                            disabled={busyId === lesson._id}
                            onClick={() => lessonAction(lesson)}
                            className="rounded-md bg-blue-900 px-2 py-1 font-bold text-white disabled:opacity-50"
                          >
                            {lesson.status === "scheduled"
                              ? "Start"
                              : lesson.status === "in_progress" &&
                                  lesson.attendance?.teacherStatus !== "present"
                                ? "Attendance"
                                : statusLabel(lesson.status)}
                          </button>
                        </TableData>
                      </tr>
                    ))}
                    {!todayLessons.length && (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-8 text-center text-xs text-slate-500"
                        >
                          No lesson scheduled for today.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <Link
              href="/teacher/lessons?tab=today"
              className="mt-3 inline-block rounded-lg bg-rose-600 px-4 py-2 text-xs font-extrabold text-white transition hover:bg-rose-700"
            >
              Show all
            </Link>
          </div>
        </section>

        <section className="min-w-0 rounded-xl bg-slate-100 p-3 sm:p-4">
          <h4 className="mb-3 text-lg font-extrabold text-blue-900">
            Action Required
          </h4>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-1">
            {pendingBookings.slice(0, 2).map((booking) => (
              <RequestCard
                key={booking._id}
                booking={booking}
                busy={busyId === booking._id}
                onAccept={() => bookingAction(booking, true)}
                onReject={() => bookingAction(booking, false)}
              />
            ))}
            {actionLessons.slice(0, 2).map((lesson, index) => (
              <LessonCard key={lesson._id} lesson={lesson} number={index + 1} />
            ))}
            {!pendingBookings.length && !actionLessons.length && (
              <div className="rounded-xl bg-white p-5 text-center text-xs text-slate-500 shadow-sm">
                No action is required right now.
              </div>
            )}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <StatChip label="Upcoming" value={stats.upcomingLessons || 0} />
            <StatChip label="Students" value={stats.activeStudents || 0} />
            <StatChip label="Completed" value={stats.completedLessons || 0} />
            <StatChip
              label="This month"
              value={`€${Number(stats.monthlyEarnings || 0).toFixed(0)}`}
            />
          </div>
        </section>
      </div>

      {notice && (
        <div className="mt-4 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-800">
          {notice}
        </div>
      )}
    </div>
  );
}

function StepItem({ item }) {
  return (
    <Link
      href={item.href}
      className="flex items-start gap-2 rounded-lg bg-slate-200 p-2.5 transition hover:bg-slate-300"
    >
      <span
        className={`shrink-0 rounded-md px-3 py-1.5 text-[11px] font-extrabold text-white ${
          item.done ? "bg-green-500" : "bg-amber-500"
        }`}
      >
        {item.step}
      </span>
      <span className="text-xs leading-5 text-slate-600 sm:text-[13px]">
        {item.done ? "Completed: " : ""}
        {item.text}
      </span>
    </Link>
  );
}

function ProgressTracker({ steps }) {
  return (
    <div className="mt-4 w-full overflow-x-auto pb-1">
      <div className="flex min-w-[560px] items-start">
        {steps.map((item, index) => (
          <div key={item.key} className="relative flex-1">
            <div
              className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${
                item.done ? "bg-blue-900" : "bg-slate-400"
              }`}
            >
              {item.done ? "✓" : index + 1}
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`absolute left-9 right-3 top-4 h-[2px] ${
                  item.done ? "bg-blue-900" : "bg-slate-300"
                }`}
              />
            )}
            <small className="mt-1.5 block text-[11px] font-bold text-slate-500">
              {item.step}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

function RequestCard({ booking, busy, onAccept, onReject }) {
  return (
    <div className="rounded-xl bg-white p-3 shadow-sm">
      <h6 className="text-sm font-extrabold text-slate-900">
        Booking request
      </h6>
      <p className="mt-1.5 text-xs text-slate-500">
        {booking.student?.name || "Student"} ·{" "}
        {formatLessonDate(booking.bookingDate)}
      </p>
      <strong className="mt-2 block text-xs text-blue-900">
        {booking.startTime}–{booking.endTime} · {booking.vehicleType}
      </strong>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={onAccept}
          className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-bold text-white disabled:opacity-50"
        >
          Accept
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={onReject}
          className="rounded-md bg-rose-600 px-3 py-1.5 text-xs font-bold text-white disabled:opacity-50"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

function LessonCard({ lesson, number }) {
  return (
    <Link
      href={`/teacher/lessons?lessonId=${lesson._id}`}
      className="block rounded-xl bg-white p-3 shadow-sm"
    >
      <h6 className="text-sm font-extrabold leading-5 text-slate-900">
        <span>{String(number).padStart(2, "0")}.</span>{" "}
        {lesson.student?.name || "Student"}
      </h6>
      <p className="mt-1.5 text-xs leading-5 text-slate-500">
        {lesson.startTime}–{lesson.endTime} · {statusLabel(lesson.status)}
      </p>
      <strong className="mt-2 block text-xs font-bold text-blue-900">
        Open lesson workspace
      </strong>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full w-2/3 rounded-full bg-blue-900" />
      </div>
    </Link>
  );
}

function StatChip({ label, value }) {
  return (
    <div className="rounded-lg bg-white p-2.5 shadow-sm">
      <p className="font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-extrabold text-blue-900">{value}</p>
    </div>
  );
}

function TableHead({ children }) {
  return (
    <th className="whitespace-nowrap px-3 py-2.5 text-[11px] font-extrabold sm:px-4">
      {children}
    </th>
  );
}

function TableData({ children, strong = false }) {
  return (
    <td
      className={`whitespace-nowrap px-3 py-2.5 text-[11px] sm:px-4 ${
        strong ? "font-bold text-slate-900" : "text-slate-500"
      }`}
    >
      {children}
    </td>
  );
}
