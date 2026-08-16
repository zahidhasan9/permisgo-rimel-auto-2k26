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
    <main className="min-h-screen overflow-x-hidden bg-[#EDF1F8] px-2 py-2 sm:px-[18px] sm:py-[18px]">
      <div className="mx-auto w-full max-w-[1440px] rounded-[14px] bg-white p-3 sm:p-[22px]">
        <header className="flex items-center gap-[14px]">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#E8EDF5] text-[#111111] transition hover:bg-[#DDE5F0] sm:h-[44px] sm:w-[44px] sm:rounded-[12px]"
          >
            <IoChevronBack size={24} />
          </button>

          <h1 className="text-[20px] font-[700] leading-none text-[#123F88] sm:text-[26px]">
            Instructors
          </h1>
        </header>

        <section className="mt-4 rounded-[12px] bg-[#E8EEF7] p-3 sm:mt-[24px] sm:p-[20px]">
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

        <section className="mt-4 rounded-[12px] bg-[#E8EEF7] p-2.5 sm:mt-[20px] sm:p-[16px]">
          <div className="space-y-3 md:hidden">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[180px] animate-pulse rounded-xl bg-white"
                />
              ))
            ) : visible.length ? (
              visible.map((booking) => {
                const teacher = booking.teacher || {};
                const teacherName =
                  teacher.name || teacher.fullName || "Instructor";
                return (
                  <article
                    key={teacherId(booking)}
                    className="rounded-xl bg-white p-3.5 shadow-sm"
                  >
                    <div className="flex min-w-0 items-center gap-3 border-b border-slate-100 pb-3">
                      {teacher.avatar ? (
                        <img
                          src={mediaUrl(teacher.avatar)}
                          alt={teacherName}
                          className="h-11 w-11 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8EEF7] text-base font-bold text-[#174A9B]">
                          {teacherName.charAt(0)}
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-bold text-slate-800">
                          {teacherName}
                        </h3>
                        <p className="mt-1 truncate text-[11px] text-slate-500">
                          {locationText(booking)}
                        </p>
                      </div>
                      <Link
                        href={`/student/driving-operation/instructors/${teacherId(booking)}`}
                        className="inline-flex h-8 shrink-0 items-center justify-center rounded-lg bg-[#DF2339] px-3 text-[11px] font-bold text-white"
                      >
                        View
                      </Link>
                    </div>
                    <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3 text-xs">
                      <div>
                        <dt className="text-[10px] font-semibold uppercase text-slate-400">
                          Date
                        </dt>
                        <dd className="mt-1 font-semibold text-slate-700">
                          {formatDate(booking.bookingDate)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] font-semibold uppercase text-slate-400">
                          Duration
                        </dt>
                        <dd className="mt-1 font-semibold text-slate-700">
                          {booking.startTime || "—"} – {booking.endTime || "—"}
                        </dd>
                      </div>
                      <div className="col-span-2">
                        <dt className="text-[10px] font-semibold uppercase text-slate-400">
                          Vehicle type
                        </dt>
                        <dd className="mt-1 font-semibold text-slate-700">
                          {vehicleText(booking)}
                        </dd>
                      </div>
                    </dl>
                  </article>
                );
              })
            ) : (
              <div className="rounded-xl bg-white p-7 text-center">
                <p className="text-sm font-bold text-[#123F88]">
                  No booked instructor found
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Only instructors you have booked will appear here.
                </p>
              </div>
            )}
          </div>

          <div className="hidden overflow-x-auto rounded-[12px] md:block">
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
