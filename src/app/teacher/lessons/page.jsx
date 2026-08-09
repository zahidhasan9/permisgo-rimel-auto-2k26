"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCalendarAlt, FaCheck, FaSearch, FaTimes } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";

import Pagination from "@/components/Pagination";
import { confirmLocationBooking, getLessons, getLocationBookings, rejectLocationBooking, startLesson } from "@/features/API";
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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [notice, setNotice] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [lessonResponse, requestResponse] = await Promise.all([
        getLessons({ page: 1, limit: 100, status: "all", sortOrder: "asc" }),
        getLocationBookings({ status: "pending", page: 1, limit: 100 }),
      ]);
      const lessonData = unwrap(lessonResponse, []);
      const requestData = unwrap(requestResponse, []);
      setLessons(Array.isArray(lessonData) ? lessonData : []);
      setRequests(Array.isArray(requestData) ? requestData : []);
    } catch (error) {
      setNotice({ type: "error", text: getErrorMessage(error, "Lessons could not be loaded.") });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const visibleLessons = useMemo(() => lessons.filter((lesson) => {
    const category = categoryOf(lesson);
    const term = search.trim().toLowerCase();
    const matchesText = !term || [lesson.student?.name, lesson.student?.email, lesson.student?.phone].filter(Boolean).join(" ").toLowerCase().includes(term);
    const key = dateKey(lesson.lessonDate);
    return (!selected.length || selected.includes(category)) && matchesText && (!startDate || key >= startDate) && (!endDate || key <= endDate);
  }), [endDate, lessons, search, selected, startDate]);

  const visibleRequests = useMemo(() => (!selected.length || selected.includes("awaiting")) ? requests.filter((booking) => {
    const term = search.trim().toLowerCase();
    const key = dateKey(booking.bookingDate);
    return (!term || [booking.student?.name, booking.student?.email].filter(Boolean).join(" ").toLowerCase().includes(term)) && (!startDate || key >= startDate) && (!endDate || key <= endDate);
  }) : [], [endDate, requests, search, selected, startDate]);

  const entries = useMemo(() => [
    ...visibleRequests.map((data) => ({ type: "request", data })),
    ...visibleLessons.map((data) => ({ type: "lesson", data })),
  ], [visibleLessons, visibleRequests]);
  const totalPages = Math.max(Math.ceil(entries.length / limit), 1);
  const paginatedEntries = entries.slice((page - 1) * limit, page * limit);

  useEffect(() => { setPage(1); }, [search, startDate, endDate, selected, limit]);
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);

  const run = async (id, action, message) => {
    setBusyId(id); setNotice(null);
    try { await action(); setNotice({ type: "success", text: message }); await load(); }
    catch (error) { setNotice({ type: "error", text: getErrorMessage(error, "Action could not be completed.") }); }
    finally { setBusyId(""); }
  };
  const toggle = (key) => setSelected((old) => old.includes(key) ? old.filter((item) => item !== key) : [...old, key]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#edf1f8] p-2 pb-24 sm:p-4 sm:pb-8">
      <div className="mx-auto rounded-xl bg-white p-3 sm:p-5">
        <header className="flex min-w-0 items-center gap-3"><button type="button" onClick={() => router.back()} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8edf5]"><IoChevronBack size={23} /></button><h1 className="truncate text-xl font-bold text-[#123f88] sm:text-[24px]">List of Lessons</h1></header>
        <div className="mt-4 sm:mt-6"><label className="relative block w-full sm:max-w-[320px]"><FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search booked students" className="h-11 w-full rounded-lg bg-[#e8eaf0] pl-11 pr-10 text-xs outline-none" />{search && <button type="button" onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2"><FaTimes /></button>}</label></div>

        {notice?.text && <div className={`mt-4 flex items-start justify-between gap-3 rounded-xl p-3 text-xs font-semibold ${notice.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}><span>{notice.text}</span><button onClick={() => setNotice(null)} className="shrink-0"><FaTimes /></button></div>}

        <section className="mt-4 grid min-h-[350px] min-w-0 gap-3 rounded-xl bg-[#f2f4f8] p-2.5 sm:mt-5 sm:gap-4 sm:p-4 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="rounded-xl bg-white p-3.5 sm:p-4">
            <div className="grid gap-3 min-[420px]:grid-cols-2 lg:grid-cols-1">
              <label className="text-xs font-bold">Start date<input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-[#f4f6fa] px-3 font-normal" /></label>
              <label className="text-xs font-bold">End date<input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-[#f4f6fa] px-3 font-normal" /></label>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 lg:block lg:space-y-3"><h2 className="col-span-2 text-xs font-bold lg:mb-3">Lesson filters</h2>{FILTERS.map((filter) => <Check key={filter.key} filter={filter} selected={selected} toggle={toggle} />)}</div>
          </aside>

          <div className="min-w-0 rounded-xl bg-white p-2.5 sm:p-4">
            {loading ? (
              <div className="flex min-h-[300px] items-center justify-center text-sm text-slate-500">Loading lessons...</div>
            ) : !entries.length ? (
              <div className="flex min-h-[300px] items-center justify-center"><div className="w-full max-w-[380px] rounded-xl bg-[#e8eef7] p-8 text-center sm:p-14"><FaSearch className="mx-auto text-4xl text-[#174a9b] sm:text-5xl" /><h2 className="mt-5 text-lg font-black">No Lessons Found</h2><p className="mt-2 text-xs text-slate-500">You have no lessons in this filter range</p></div></div>
            ) : (
              <div className="space-y-3">
                {paginatedEntries.map(({ type, data }) => type === "request" ? (
                  <RequestCard key={`request-${data._id}`} booking={data} busyId={busyId} run={run} />
                ) : (
                  <LessonCard key={`lesson-${data._id}`} lesson={data} busyId={busyId} run={run} />
                ))}
              </div>
            )}
          </div>
        </section>

        {!loading && entries.length > 0 && <div className="mt-3 overflow-hidden rounded-xl"><Pagination page={page} limit={limit} total={entries.length} totalPages={totalPages} loading={loading} onPageChange={setPage} onLimitChange={(value) => setLimit(value)} /></div>}
      </div>
    </main>
  );
}

function RequestCard({ booking, busyId, run }) {
  return <article className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 sm:p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><span className="text-[10px] font-bold uppercase text-amber-700">Booking request</span><h3 className="mt-1 truncate font-bold">{booking.student?.name || "Student"}</h3><p className="mt-1 text-[11px] text-slate-500 sm:text-xs">{formatLessonDate(booking.bookingDate)} · {booking.startTime}–{booking.endTime}</p></div><div className="grid grid-cols-3 gap-2 sm:flex"><Link href={`/teacher/students/${booking.student?._id}/booklet`} className="rounded-lg bg-[#174a9b] px-2 py-2 text-center text-[10px] font-bold text-white sm:px-3 sm:text-xs">Booklet</Link><button disabled={busyId === booking._id} onClick={() => run(booking._id, () => rejectLocationBooking(booking._id, { reason: "Teacher declined the request." }), "Request declined.")} className="rounded-lg border border-red-300 px-2 py-2 text-[10px] font-bold text-red-600 sm:px-3 sm:text-xs">Reject</button><button disabled={busyId === booking._id} onClick={() => run(booking._id, () => confirmLocationBooking(booking._id), "Booking confirmed.")} className="rounded-lg bg-[#28c53f] px-2 py-2 text-[10px] font-bold text-white sm:px-3 sm:text-xs">Confirm</button></div></div></article>;
}

function LessonCard({ lesson, busyId, run }) {
  return <article className="rounded-xl bg-[#e8eef7] p-3.5 sm:p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><h3 className="truncate font-bold">{lesson.student?.name || "Student"}</h3><p className="mt-1 text-[11px] text-slate-500 sm:text-xs">{formatLessonDate(lesson.lessonDate)} · {lesson.startTime}–{lesson.endTime}</p><p className="mt-2 break-words text-[11px] text-slate-600 sm:text-xs">{getLessonLocation(lesson)} · {getVehicleType(lesson)}</p></div><div className="sm:text-right"><p className="text-xs font-bold text-[#174a9b]">{statusLabel(lesson.status)}</p><div className="mt-2 grid grid-cols-2 gap-2 sm:mt-3 sm:flex"><Link href={`/teacher/students/${lesson.student?._id}/booklet`} className="rounded-lg bg-[#174a9b] px-3 py-2 text-center text-xs font-bold text-white">Booklet</Link>{lesson.status === "scheduled" && <button disabled={busyId === lesson._id} onClick={() => run(lesson._id, () => startLesson(lesson._id), "Lesson completed and attendance recorded.")} className="rounded-lg bg-[#174a9b] px-3 py-2 text-xs font-bold text-white disabled:opacity-50">{busyId === lesson._id ? "Completing..." : "Start & Complete"}</button>}</div></div></div></article>;
}

function Check({ filter, selected, toggle }) {
  const checked = selected.includes(filter.key);
  return <label className="flex cursor-pointer items-start gap-2 text-[11px] leading-4 sm:text-xs"><input type="checkbox" checked={checked} onChange={() => toggle(filter.key)} className="sr-only" /><span className={`mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[9px] text-white ${checked ? "border-[#28c53f] bg-[#28c53f]" : "border-slate-500 bg-white"}`}>{checked && <FaCheck />}</span>{filter.label}</label>;
}
