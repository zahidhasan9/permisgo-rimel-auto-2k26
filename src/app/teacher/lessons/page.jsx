"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCalendarAlt, FaCheck, FaSearch, FaTimes } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";

import { confirmAttendance, confirmLocationBooking, getLessons, getLocationBookings, rejectLocationBooking, startLesson } from "@/features/API";
import { formatLessonDate, getErrorMessage, getLessonLocation, getVehicleType, statusLabel, unwrap } from "@/features/lessonHelpers";

const FILTERS = [
  { key: "future", label: "Future lessons" },
  { key: "learned", label: "Lessons Learned" },
  { key: "awaiting", label: "Awaiting confirmation" },
  { key: "teacher_cancelled", label: "Canceled by you" },
  { key: "student_cancelled", label: "Canceled by the student" },
];
const dateKey = (value) => value ? new Date(value).toISOString().slice(0, 10) : "";
const today = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const categoryOf = (lesson) => {
  if (lesson.status === "completed") return "learned";
  if (lesson.status === "awaiting_confirmation") return "awaiting";
  if (["scheduled", "in_progress"].includes(lesson.status) && dateKey(lesson.lessonDate) >= today()) return "future";
  if (lesson.status === "cancelled") return lesson.cancellationRequest?.requestedBy?.role === "student" ? "student_cancelled" : "teacher_cancelled";
  return "";
};

export default function TeacherLessonsPage() {
  const router = useRouter();
  const [lessons, setLessons] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [notice, setNotice] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [lessonResponse, requestResponse] = await Promise.all([getLessons({ page: 1, limit: 100, status: "all", sortOrder: "asc" }), getLocationBookings({ status: "pending", page: 1, limit: 100 })]);
      setLessons(Array.isArray(unwrap(lessonResponse, [])) ? unwrap(lessonResponse, []) : []);
      setRequests(Array.isArray(unwrap(requestResponse, [])) ? unwrap(requestResponse, []) : []);
    } catch (error) { setNotice({ type: "error", text: getErrorMessage(error, "Lessons could not be loaded.") }); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const visibleLessons = useMemo(() => lessons.filter((lesson) => {
    const category = categoryOf(lesson);
    const term = search.trim().toLowerCase();
    const matchesText = !term || [lesson.student?.name, lesson.student?.email, lesson.student?.phone].filter(Boolean).join(" ").toLowerCase().includes(term);
    const key = dateKey(lesson.lessonDate);
    return (!selected.length || selected.includes(category)) && matchesText && (!startDate || key >= startDate) && (!endDate || key <= endDate);
  }), [endDate, lessons, search, selected, startDate]);
  const visibleRequests = useMemo(() => (!selected.length || selected.includes("awaiting")) ? requests.filter((booking) => !search.trim() || [booking.student?.name, booking.student?.email].filter(Boolean).join(" ").toLowerCase().includes(search.trim().toLowerCase())) : [], [requests, search, selected]);

  const run = async (id, action, message) => { setBusyId(id); setNotice(null); try { await action(); setNotice({ type: "success", text: message }); await load(); } catch (error) { setNotice({ type: "error", text: getErrorMessage(error, "Action could not be completed.") }); } finally { setBusyId(""); } };
  const toggle = (key) => setSelected((old) => old.includes(key) ? old.filter((item) => item !== key) : [...old, key]);

  return <main className="min-h-screen bg-[#edf1f8] p-2 sm:p-4">
    <div className="mx-auto rounded-xl bg-white p-4 sm:p-5">
      <header className="flex items-center gap-3"><button type="button" onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8edf5]"><IoChevronBack size={23} /></button><h1 className="text-[24px] font-bold text-[#123f88]">List of Lessons</h1></header>
      <div className="mt-6"><label className="relative block w-full sm:max-w-[320px]"><FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search booked students" className="h-11 w-full rounded-lg bg-[#e8eaf0] pl-11 pr-10 text-xs outline-none" />{search && <button type="button" onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2"><FaTimes /></button>}</label></div>

      {notice?.text && <div className={`mt-4 flex items-center justify-between rounded-xl p-3 text-xs font-semibold ${notice.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}><span>{notice.text}</span><button onClick={() => setNotice(null)}><FaTimes /></button></div>}

      <section className="mt-5 grid min-h-[350px] gap-4 rounded-xl bg-[#f2f4f8] p-4 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="rounded-xl bg-white p-4">
          <label className="text-xs font-bold">Start date<input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-[#f4f6fa] px-3 font-normal" /></label>
          <label className="mt-4 block text-xs font-bold">End date<input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-[#f4f6fa] px-3 font-normal" /></label>
          <h2 className="mt-5 text-xs font-bold">Income-generating lessons</h2><div className="mt-3 space-y-3">{FILTERS.slice(0, 2).map((filter) => <Check key={filter.key} filter={filter} selected={selected} toggle={toggle} />)}</div>
          <h2 className="mt-6 text-xs font-bold">Others lessons</h2><div className="mt-3 space-y-3">{FILTERS.slice(2).map((filter) => <Check key={filter.key} filter={filter} selected={selected} toggle={toggle} />)}</div>
        </aside>

        <div className="rounded-xl bg-white p-4">
          {loading ? <div className="flex h-full min-h-[300px] items-center justify-center text-sm text-slate-500">Loading lessons...</div> : !visibleLessons.length && !visibleRequests.length ? <div className="flex min-h-[300px] items-center justify-center"><div className="w-full max-w-[380px] rounded-xl bg-[#e8eef7] p-14 text-center"><FaSearch className="mx-auto text-5xl text-[#174a9b]" /><h2 className="mt-5 text-lg font-black">No Lessons Found</h2><p className="mt-2 text-xs text-slate-500">You have no lessons in this filter range</p></div></div> : <div className="space-y-3">
            {visibleRequests.map((booking) => <article key={booking._id} className="rounded-xl border border-amber-200 bg-amber-50 p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><span className="text-[10px] font-bold uppercase text-amber-700">Booking request</span><h3 className="mt-1 font-bold">{booking.student?.name || "Student"}</h3><p className="mt-1 text-xs text-slate-500">{formatLessonDate(booking.bookingDate)} · {booking.startTime}–{booking.endTime}</p></div><div className="flex gap-2"><Link href={`/teacher/students/${booking.student?._id}/booklet`} className="rounded-lg bg-[#174a9b] px-3 py-2 text-xs font-bold text-white">Booklet</Link><button disabled={busyId === booking._id} onClick={() => run(booking._id, () => rejectLocationBooking(booking._id, { reason: "Teacher declined the request." }), "Request declined.")} className="rounded-lg border border-red-300 px-3 py-2 text-xs font-bold text-red-600">Reject</button><button disabled={busyId === booking._id} onClick={() => run(booking._id, () => confirmLocationBooking(booking._id), "Booking confirmed.")} className="rounded-lg bg-[#28c53f] px-3 py-2 text-xs font-bold text-white">Confirm</button></div></div></article>)}
            {visibleLessons.map((lesson) => <article key={lesson._id} className="rounded-xl bg-[#e8eef7] p-4"><div className="flex flex-wrap items-center justify-between gap-4"><div><h3 className="font-bold">{lesson.student?.name || "Student"}</h3><p className="mt-1 text-xs text-slate-500">{formatLessonDate(lesson.lessonDate)} · {lesson.startTime}–{lesson.endTime}</p><p className="mt-2 text-xs text-slate-600">{getLessonLocation(lesson)} · {getVehicleType(lesson)}</p></div><div className="text-right"><p className="text-xs font-bold text-[#174a9b]">{statusLabel(lesson.status)}</p><div className="mt-3 flex gap-2"><Link href={`/teacher/students/${lesson.student?._id}/booklet`} className="rounded-lg bg-[#174a9b] px-3 py-2 text-xs font-bold text-white">Booklet</Link>{lesson.status === "scheduled" && <button onClick={() => run(lesson._id, () => startLesson(lesson._id), "Lesson started.")} className="rounded-lg bg-[#174a9b] px-3 py-2 text-xs font-bold text-white">Start</button>}{lesson.status === "in_progress" && !lesson.attendance?.teacherConfirmed && <button onClick={() => run(lesson._id, () => confirmAttendance(lesson._id, { status: "present" }), "Attendance confirmed.")} className="rounded-lg bg-[#28c53f] px-3 py-2 text-xs font-bold text-white">Attendance</button>}</div></div></div></article>)}
          </div>}
        </div>
      </section>
    </div>
  </main>;
}

function Check({ filter, selected, toggle }) { const checked = selected.includes(filter.key); return <label className="flex cursor-pointer items-center gap-2 text-xs"><input type="checkbox" checked={checked} onChange={() => toggle(filter.key)} className="sr-only" /><span className={`flex h-4 w-4 items-center justify-center rounded border text-[9px] text-white ${checked ? "border-[#28c53f] bg-[#28c53f]" : "border-slate-500 bg-white"}`}>{checked && <FaCheck />}</span>{filter.label}</label>; }
