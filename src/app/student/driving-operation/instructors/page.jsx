// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { FaCalendarAlt, FaClock, FaSearch } from "react-icons/fa";
// import { IoChevronBack, IoChevronForward } from "react-icons/io5";

// import { getBookings } from "@/features/API";
// import { getErrorMessage, unwrap } from "@/features/lessonHelpers";
// import { mediaUrl } from "@/utils/mediaUrl";

// const LIMIT = 10;
// const teacherId = (booking) => typeof booking?.teacher === "string" ? booking.teacher : booking?.teacher?._id || "";
// const formatDate = (value) => value ? new Intl.DateTimeFormat("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" }).format(new Date(value)) : "—";
// const locationText = (booking) => booking.teacherLocation?.city || booking.location?.city || booking.teacherLocation?.address || booking.location?.address || "Location unavailable";
// const vehicleText = (booking) => {
//   const vehicle = booking.teacherVehicle;
//   const type = vehicle?.vehicleType || booking.vehicleType;
//   return type ? `${type.charAt(0).toUpperCase()}${type.slice(1)} car` : "Vehicle unavailable";
// };

// export default function InstructorsPage() {
//   const router = useRouter();
//   const [bookings, setBookings] = useState([]);
//   const [draft, setDraft] = useState({ location: "", date: "", time: "" });
//   const [filters, setFilters] = useState({ location: "", date: "", time: "" });
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let active = true;
//     getBookings({ limit: 100 })
//       .then((response) => { if (active) setBookings(unwrap(response, [])); })
//       .catch((requestError) => { if (active) setError(getErrorMessage(requestError, "Your booked instructors could not be loaded.")); })
//       .finally(() => { if (active) setLoading(false); });
//     return () => { active = false; };
//   }, []);

//   const instructors = useMemo(() => {
//     const location = filters.location.trim().toLowerCase();
//     const matching = [...bookings].filter((booking) => {
//       const searchable = [booking.teacher?.name, booking.teacher?.fullName, locationText(booking)].filter(Boolean).join(" ").toLowerCase();
//       const date = booking.bookingDate ? new Date(booking.bookingDate).toISOString().slice(0, 10) : "";
//       return (!location || searchable.includes(location)) && (!filters.date || date === filters.date) && (!filters.time || booking.startTime === filters.time);
//     });
//     const unique = new Map();
//     matching.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)).forEach((booking) => {
//       const id = teacherId(booking);
//       if (id && !unique.has(id)) unique.set(id, booking);
//     });
//     return [...unique.values()];
//   }, [bookings, filters]);

//   const totalPages = Math.max(1, Math.ceil(instructors.length / LIMIT));
//   const visible = instructors.slice((page - 1) * LIMIT, page * LIMIT);
//   const first = instructors.length ? (page - 1) * LIMIT + 1 : 0;
//   const last = Math.min(page * LIMIT, instructors.length);

//   const search = () => { setFilters(draft); setPage(1); };

//   return <main className="min-h-screen bg-[#edf1f8] px-2 py-2 sm:px-4 sm:py-4">
//     <div className="mx-auto rounded-xl bg-white p-3 sm:p-5">
//       <header className="flex items-center gap-3">
//         <button type="button" onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8edf5]"><IoChevronBack size={23} /></button>
//         <h1 className="text-[24px] font-bold text-[#123f88]">Instructors</h1>
//       </header>

//       <section className="mt-6 rounded-xl bg-[#e8eef7] p-4 sm:p-5">
//         <h2 className="text-sm font-bold">Find an Instructor</h2>
//         <label className="mt-3 flex h-11 items-center gap-3 rounded-xl bg-white px-4 text-slate-500"><FaSearch /><input value={draft.location} onChange={(event) => setDraft((old) => ({ ...old, location: event.target.value }))} onKeyDown={(event) => { if (event.key === "Enter") search(); }} placeholder="Location or instructor name" className="w-full bg-transparent text-xs outline-none" /></label>
//         <div className="mt-2 grid gap-2 sm:grid-cols-2">
//           <label className="flex h-11 items-center rounded-xl bg-white px-4"><input type="date" value={draft.date} onChange={(event) => setDraft((old) => ({ ...old, date: event.target.value }))} className="min-w-0 flex-1 bg-transparent text-xs outline-none" /><FaCalendarAlt /></label>
//           <label className="flex h-11 items-center rounded-xl bg-white px-4"><input type="time" value={draft.time} onChange={(event) => setDraft((old) => ({ ...old, time: event.target.value }))} className="min-w-0 flex-1 bg-transparent text-xs outline-none" /><FaClock /></label>
//         </div>
//         <button type="button" onClick={search} className="mt-3 h-10 min-w-[145px] rounded-lg bg-[#df2339] px-6 text-xs font-bold text-white">Search</button>
//       </section>

//       {error && <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}

//       <section className="mt-5 rounded-xl bg-[#e8eef7] p-3 sm:p-4">
//         <div className="overflow-x-auto rounded-xl">
//           <div className="min-w-[760px] overflow-hidden rounded-xl bg-white">
//             <div className="grid grid-cols-[1.15fr_1fr_1.05fr_1fr_.9fr_70px] bg-[#174a9b] px-4 py-3 text-[10px] font-bold text-white"><div>Instructor Name</div><div>Location</div><div>Date</div><div>Duration</div><div>Vehicle Type</div><div className="text-right">Action</div></div>
//             {loading ? <div className="p-12 text-center text-sm text-slate-500">Loading your instructors...</div> : visible.length ? visible.map((booking) => {
//               const teacher = booking.teacher || {};
//               return <div key={teacherId(booking)} className="grid min-h-[48px] grid-cols-[1.15fr_1fr_1.05fr_1fr_.9fr_70px] items-center border-b border-slate-100 px-4 py-2 text-[10px] text-slate-600 last:border-0 hover:bg-slate-50">
//                 <div className="flex items-center gap-2 font-semibold text-slate-800">{teacher.avatar ? <img src={mediaUrl(teacher.avatar)} alt="" className="h-7 w-7 rounded-full object-cover" /> : <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8eef7] font-bold text-[#174a9b]">{(teacher.name || teacher.fullName || "I").charAt(0)}</span>}<span className="truncate">{teacher.name || teacher.fullName || "Instructor"}</span></div>
//                 <div className="truncate pr-3" title={locationText(booking)}>{locationText(booking)}</div>
//                 <div>{formatDate(booking.bookingDate)}</div>
//                 <div>{booking.startTime || "—"} – {booking.endTime || "—"}</div>
//                 <div>{vehicleText(booking)}</div>
//                 <div className="text-right"><Link href={`/student/driving-operation/instructors/${teacherId(booking)}`} className="inline-flex rounded-md bg-[#df2339] px-3 py-1.5 font-bold text-white">View</Link></div>
//               </div>;
//             }) : <div className="p-12 text-center"><p className="text-sm font-bold text-[#123f88]">No booked instructor found</p><p className="mt-1 text-xs text-slate-500">Only instructors you have booked will appear here.</p></div>}
//           </div>
//         </div>

//         <div className="mt-4 flex items-center justify-between gap-3 text-[10px] text-slate-600"><p>Showing {first}-{last} of {instructors.length} instructors</p><div className="flex items-center gap-2"><button type="button" disabled={page <= 1} onClick={() => setPage((value) => value - 1)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white disabled:opacity-40"><IoChevronBack /></button><span className="font-semibold">Page {page}</span><button type="button" disabled={page >= totalPages} onClick={() => setPage((value) => value + 1)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#dbe6f7] text-[#174a9b] disabled:opacity-40"><IoChevronForward /></button></div></div>
//       </section>
//     </div>
//   </main>;
// }

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCalendarAlt, FaClock, FaSearch } from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import { getBookings } from "@/features/API";
import { getErrorMessage, unwrap } from "@/features/lessonHelpers";
import { mediaUrl } from "@/utils/mediaUrl";

const LIMIT = 10;

const teacherId = (booking) =>
  typeof booking?.teacher === "string"
    ? booking.teacher
    : booking?.teacher?._id || "";

const formatDate = (value) =>
  value
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(value))
    : "—";

const locationText = (booking) =>
  booking.teacherLocation?.city ||
  booking.location?.city ||
  booking.teacherLocation?.address ||
  booking.location?.address ||
  "Location unavailable";

const vehicleText = (booking) => {
  const vehicle = booking.teacherVehicle;
  const type = vehicle?.vehicleType || booking.vehicleType;

  return type
    ? `${type.charAt(0).toUpperCase()}${type.slice(1)} car`
    : "Vehicle unavailable";
};

const openNativePicker = (inputRef) => {
  const input = inputRef.current;

  if (!input) return;

  try {
    if (typeof input.showPicker === "function") {
      input.showPicker();
      return;
    }

    input.focus();
    input.click();
  } catch {
    input.focus();
  }
};

function PickerField({ type, value, onChange, inputRef, icon, ariaLabel }) {
  return (
    <div className="flex h-[48px] min-w-0 items-center rounded-[10px] bg-white px-[15px] text-[#174A9B]">
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={onChange}
        onClick={() => openNativePicker(inputRef)}
        aria-label={ariaLabel}
        className="
          min-w-0 flex-1 appearance-none bg-transparent
          pr-[10px] text-[14px] font-[500] text-[#222222] outline-none
          [&::-webkit-calendar-picker-indicator]:hidden
          [&::-webkit-calendar-picker-indicator]:appearance-none
        "
      />

      <button
        type="button"
        onClick={() => openNativePicker(inputRef)}
        aria-label={`Open ${ariaLabel.toLowerCase()} picker`}
        className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[8px] text-[17px] transition hover:bg-[#E8EEF7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174A9B]/30"
      >
        {icon}
      </button>
    </div>
  );
}

export default function InstructorsPage() {
  const router = useRouter();
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  const [bookings, setBookings] = useState([]);
  const [draft, setDraft] = useState({ location: "", date: "", time: "" });
  const [filters, setFilters] = useState({
    location: "",
    date: "",
    time: "",
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getBookings({ limit: 100 })
      .then((response) => {
        if (active) setBookings(unwrap(response, []));
      })
      .catch((requestError) => {
        if (active) {
          setError(
            getErrorMessage(
              requestError,
              "Your booked instructors could not be loaded.",
            ),
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const instructors = useMemo(() => {
    const location = filters.location.trim().toLowerCase();

    const matching = [...bookings].filter((booking) => {
      const searchable = [
        booking.teacher?.name,
        booking.teacher?.fullName,
        locationText(booking),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const date = booking.bookingDate
        ? new Date(booking.bookingDate).toISOString().slice(0, 10)
        : "";

      return (
        (!location || searchable.includes(location)) &&
        (!filters.date || date === filters.date) &&
        (!filters.time || booking.startTime === filters.time)
      );
    });

    const unique = new Map();

    matching
      .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))
      .forEach((booking) => {
        const id = teacherId(booking);
        if (id && !unique.has(id)) unique.set(id, booking);
      });

    return [...unique.values()];
  }, [bookings, filters]);

  const totalPages = Math.max(1, Math.ceil(instructors.length / LIMIT));
  const visible = instructors.slice((page - 1) * LIMIT, page * LIMIT);
  const first = instructors.length ? (page - 1) * LIMIT + 1 : 0;
  const last = Math.min(page * LIMIT, instructors.length);

  const search = () => {
    setFilters(draft);
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-[#EDF1F8] px-[10px] py-[10px] sm:px-[18px] sm:py-[18px]">
      <div className="mx-auto w-full rounded-[14px] bg-white p-[16px] sm:p-[22px]">
        <header className="flex items-center gap-[14px]">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[12px] bg-[#E8EDF5] text-[#111111] transition hover:bg-[#DDE5F0]"
          >
            <IoChevronBack size={24} />
          </button>

          <h1 className="text-[24px] font-[700] leading-none text-[#123F88] sm:text-[26px]">
            Instructors
          </h1>
        </header>

        <section className="mt-[24px] rounded-[12px] bg-[#E8EEF7] p-[16px] sm:p-[20px]">
          <h2 className="text-[16px] font-[700] text-[#222222]">
            Find an Instructor
          </h2>

          <div className="mt-[14px] flex h-[48px] items-center gap-[12px] rounded-[10px] bg-white px-[15px] text-[#174A9B]">
            <FaSearch className="shrink-0 text-[16px]" />
            <input
              value={draft.location}
              onChange={(event) =>
                setDraft((old) => ({
                  ...old,
                  location: event.target.value,
                }))
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") search();
              }}
              placeholder="Location or instructor name"
              className="min-w-0 w-full bg-transparent text-[14px] font-[500] text-[#222222] outline-none placeholder:text-[#7A8494]"
            />
          </div>

          <div className="mt-[10px] grid grid-cols-1 gap-[10px] sm:grid-cols-2">
            <PickerField
              type="date"
              value={draft.date}
              inputRef={dateInputRef}
              ariaLabel="Date"
              icon={<FaCalendarAlt />}
              onChange={(event) =>
                setDraft((old) => ({ ...old, date: event.target.value }))
              }
            />

            <PickerField
              type="time"
              value={draft.time}
              inputRef={timeInputRef}
              ariaLabel="Time"
              icon={<FaClock />}
              onChange={(event) =>
                setDraft((old) => ({ ...old, time: event.target.value }))
              }
            />
          </div>

          <button
            type="button"
            onClick={search}
            className="mt-[14px] h-[44px] w-full rounded-[9px] bg-[#DF2339] px-[28px] text-[14px] font-[700] text-white transition hover:bg-[#C91F33] sm:w-auto sm:min-w-[150px]"
          >
            Search
          </button>
        </section>

        {error && (
          <div className="mt-[20px] rounded-[12px] border border-red-200 bg-red-50 p-[15px] text-[14px] font-[600] text-red-700">
            {error}
          </div>
        )}

        <section className="mt-[20px] rounded-[12px] bg-[#E8EEF7] p-[12px] sm:p-[16px]">
          <div className="overflow-x-auto rounded-[12px]">
            <div className="min-w-[900px] overflow-hidden rounded-[12px] bg-white">
              <div className="grid grid-cols-[1.2fr_1fr_1.15fr_1fr_.9fr_86px] items-center bg-[#174A9B] px-[18px] py-[14px] text-[13px] font-[700] text-white">
                <div>Instructor Name</div>
                <div>Location</div>
                <div>Date</div>
                <div>Duration</div>
                <div>Vehicle Type</div>
                <div className="text-right">Action</div>
              </div>

              {loading ? (
                <div className="p-[48px] text-center text-[14px] text-slate-500">
                  Loading your instructors...
                </div>
              ) : visible.length ? (
                visible.map((booking) => {
                  const teacher = booking.teacher || {};
                  const teacherName =
                    teacher.name || teacher.fullName || "Instructor";

                  return (
                    <div
                      key={teacherId(booking)}
                      className="grid min-h-[64px] grid-cols-[1.2fr_1fr_1.15fr_1fr_.9fr_86px] items-center border-b border-slate-100 px-[18px] py-[10px] text-[13px] font-[500] text-slate-600 last:border-0 hover:bg-slate-50"
                    >
                      <div className="flex min-w-0 items-center gap-[10px] font-[600] text-slate-800">
                        {teacher.avatar ? (
                          <img
                            src={mediaUrl(teacher.avatar)}
                            alt={teacherName}
                            className="h-[36px] w-[36px] shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#E8EEF7] text-[14px] font-[700] text-[#174A9B]">
                            {teacherName.charAt(0)}
                          </span>
                        )}

                        <span className="truncate">{teacherName}</span>
                      </div>

                      <div
                        className="truncate pr-[14px]"
                        title={locationText(booking)}
                      >
                        {locationText(booking)}
                      </div>

                      <div>{formatDate(booking.bookingDate)}</div>

                      <div>
                        {booking.startTime || "—"} – {booking.endTime || "—"}
                      </div>

                      <div>{vehicleText(booking)}</div>

                      <div className="text-right">
                        <Link
                          href={`/student/driving-operation/instructors/${teacherId(booking)}`}
                          className="inline-flex h-[34px] items-center justify-center rounded-[7px] bg-[#DF2339] px-[15px] text-[12px] font-[700] text-white transition hover:bg-[#C91F33]"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-[48px] text-center">
                  <p className="text-[15px] font-[700] text-[#123F88]">
                    No booked instructor found
                  </p>
                  <p className="mt-[5px] text-[13px] text-slate-500">
                    Only instructors you have booked will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-[16px] flex flex-col gap-[12px] text-[13px] font-[500] text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing {first}-{last} of {instructors.length} instructors
            </p>

            <div className="flex items-center gap-[9px]">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((value) => value - 1)}
                aria-label="Previous page"
                className="flex h-[36px] w-[36px] items-center justify-center rounded-[8px] bg-white text-[#174A9B] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <IoChevronBack />
              </button>

              <span className="font-[600]">Page {page}</span>

              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((value) => value + 1)}
                aria-label="Next page"
                className="flex h-[36px] w-[36px] items-center justify-center rounded-[8px] bg-[#DBE6F7] text-[#174A9B] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <IoChevronForward />
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
