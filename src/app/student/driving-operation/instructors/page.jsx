"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaCalendarAlt, FaClock, FaSearch } from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import { getBookings } from "@/features/API";
import { getErrorMessage, unwrap } from "@/features/lessonHelpers";
import { mediaUrl } from "@/utils/mediaUrl";

const LIMIT = 10;
const teacherId = (booking) => typeof booking?.teacher === "string" ? booking.teacher : booking?.teacher?._id || "";
const formatDate = (value) => value ? new Intl.DateTimeFormat("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" }).format(new Date(value)) : "—";
const locationText = (booking) => booking.teacherLocation?.city || booking.location?.city || booking.teacherLocation?.address || booking.location?.address || "Location unavailable";
const vehicleText = (booking) => {
  const vehicle = booking.teacherVehicle;
  const type = vehicle?.vehicleType || booking.vehicleType;
  return type ? `${type.charAt(0).toUpperCase()}${type.slice(1)} car` : "Vehicle unavailable";
};

export default function InstructorsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [draft, setDraft] = useState({ location: "", date: "", time: "" });
  const [filters, setFilters] = useState({ location: "", date: "", time: "" });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getBookings({ limit: 100 })
      .then((response) => { if (active) setBookings(unwrap(response, [])); })
      .catch((requestError) => { if (active) setError(getErrorMessage(requestError, "Your booked instructors could not be loaded.")); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const instructors = useMemo(() => {
    const location = filters.location.trim().toLowerCase();
    const matching = [...bookings].filter((booking) => {
      const searchable = [booking.teacher?.name, booking.teacher?.fullName, locationText(booking)].filter(Boolean).join(" ").toLowerCase();
      const date = booking.bookingDate ? new Date(booking.bookingDate).toISOString().slice(0, 10) : "";
      return (!location || searchable.includes(location)) && (!filters.date || date === filters.date) && (!filters.time || booking.startTime === filters.time);
    });
    const unique = new Map();
    matching.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)).forEach((booking) => {
      const id = teacherId(booking);
      if (id && !unique.has(id)) unique.set(id, booking);
    });
    return [...unique.values()];
  }, [bookings, filters]);

  const totalPages = Math.max(1, Math.ceil(instructors.length / LIMIT));
  const visible = instructors.slice((page - 1) * LIMIT, page * LIMIT);
  const first = instructors.length ? (page - 1) * LIMIT + 1 : 0;
  const last = Math.min(page * LIMIT, instructors.length);

  const search = () => { setFilters(draft); setPage(1); };

  return <main className="min-h-screen bg-[#edf1f8] px-2 py-2 sm:px-4 sm:py-4">
    <div className="mx-auto rounded-xl bg-white p-3 sm:p-5">
      <header className="flex items-center gap-3">
        <button type="button" onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8edf5]"><IoChevronBack size={23} /></button>
        <h1 className="text-[24px] font-bold text-[#123f88]">Instructors</h1>
      </header>

      <section className="mt-6 rounded-xl bg-[#e8eef7] p-4 sm:p-5">
        <h2 className="text-sm font-bold">Find an Instructor</h2>
        <label className="mt-3 flex h-11 items-center gap-3 rounded-xl bg-white px-4 text-slate-500"><FaSearch /><input value={draft.location} onChange={(event) => setDraft((old) => ({ ...old, location: event.target.value }))} onKeyDown={(event) => { if (event.key === "Enter") search(); }} placeholder="Location or instructor name" className="w-full bg-transparent text-xs outline-none" /></label>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <label className="flex h-11 items-center rounded-xl bg-white px-4"><input type="date" value={draft.date} onChange={(event) => setDraft((old) => ({ ...old, date: event.target.value }))} className="min-w-0 flex-1 bg-transparent text-xs outline-none" /><FaCalendarAlt /></label>
          <label className="flex h-11 items-center rounded-xl bg-white px-4"><input type="time" value={draft.time} onChange={(event) => setDraft((old) => ({ ...old, time: event.target.value }))} className="min-w-0 flex-1 bg-transparent text-xs outline-none" /><FaClock /></label>
        </div>
        <button type="button" onClick={search} className="mt-3 h-10 min-w-[145px] rounded-lg bg-[#df2339] px-6 text-xs font-bold text-white">Search</button>
      </section>

      {error && <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}

      <section className="mt-5 rounded-xl bg-[#e8eef7] p-3 sm:p-4">
        <div className="overflow-x-auto rounded-xl">
          <div className="min-w-[760px] overflow-hidden rounded-xl bg-white">
            <div className="grid grid-cols-[1.15fr_1fr_1.05fr_1fr_.9fr_70px] bg-[#174a9b] px-4 py-3 text-[10px] font-bold text-white"><div>Instructor Name</div><div>Location</div><div>Date</div><div>Duration</div><div>Vehicle Type</div><div className="text-right">Action</div></div>
            {loading ? <div className="p-12 text-center text-sm text-slate-500">Loading your instructors...</div> : visible.length ? visible.map((booking) => {
              const teacher = booking.teacher || {};
              return <div key={teacherId(booking)} className="grid min-h-[48px] grid-cols-[1.15fr_1fr_1.05fr_1fr_.9fr_70px] items-center border-b border-slate-100 px-4 py-2 text-[10px] text-slate-600 last:border-0 hover:bg-slate-50">
                <div className="flex items-center gap-2 font-semibold text-slate-800">{teacher.avatar ? <img src={mediaUrl(teacher.avatar)} alt="" className="h-7 w-7 rounded-full object-cover" /> : <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8eef7] font-bold text-[#174a9b]">{(teacher.name || teacher.fullName || "I").charAt(0)}</span>}<span className="truncate">{teacher.name || teacher.fullName || "Instructor"}</span></div>
                <div className="truncate pr-3" title={locationText(booking)}>{locationText(booking)}</div>
                <div>{formatDate(booking.bookingDate)}</div>
                <div>{booking.startTime || "—"} – {booking.endTime || "—"}</div>
                <div>{vehicleText(booking)}</div>
                <div className="text-right"><Link href={`/student/driving-operation/instructors/${teacherId(booking)}`} className="inline-flex rounded-md bg-[#df2339] px-3 py-1.5 font-bold text-white">View</Link></div>
              </div>;
            }) : <div className="p-12 text-center"><p className="text-sm font-bold text-[#123f88]">No booked instructor found</p><p className="mt-1 text-xs text-slate-500">Only instructors you have booked will appear here.</p></div>}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 text-[10px] text-slate-600"><p>Showing {first}-{last} of {instructors.length} instructors</p><div className="flex items-center gap-2"><button type="button" disabled={page <= 1} onClick={() => setPage((value) => value - 1)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white disabled:opacity-40"><IoChevronBack /></button><span className="font-semibold">Page {page}</span><button type="button" disabled={page >= totalPages} onClick={() => setPage((value) => value + 1)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#dbe6f7] text-[#174a9b] disabled:opacity-40"><IoChevronForward /></button></div></div>
      </section>
    </div>
  </main>;
}
