"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaCarSide,
  FaCheck,
  FaClock,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaSyncAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";

import {
  cancelLocationBooking,
  confirmLocationBooking,
  getLocationBookings,
  rejectLocationBooking,
} from "@/features/API";
import { getErrorMessage, unwrap } from "@/features/lessonHelpers";

const FILTERS = [
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "rejected", label: "Rejected" },
  { key: "cancelled", label: "Cancelled" },
  { key: "expired", label: "Expired" },
  { key: "all", label: "All" },
];

const STATUS_LABELS = {
  pending: "Waiting for approval",
  confirmed: "Lesson confirmed",
  rejected: "Rejected",
  cancelled: "Cancelled",
  expired: "Expired",
  completed: "Completed",
};

const STATUS_CLASSES = {
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  confirmed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  rejected: "border-rose-200 bg-rose-50 text-rose-700",
  cancelled: "border-slate-200 bg-slate-100 text-slate-700",
  expired: "border-orange-200 bg-orange-50 text-orange-700",
  completed: "border-blue-200 bg-blue-50 text-blue-700",
};

const getBookingId = (booking) => booking?._id || booking?.id || "";

const getPersonName = (person, fallback) =>
  person?.name || person?.fullName || person?.email || fallback;

const getBookingsArray = (response) => {
  const data = unwrap(response, []);
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.bookings)) return data.bookings;
  return [];
};

const formatDate = (value) => {
  if (!value) return "Date not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Invalid date";

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatMoney = (booking) => {
  const amount = Number(booking?.pricingSnapshot?.subtotal || 0);
  const currency = booking?.pricingSnapshot?.currency || "EUR";

  try {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
};

const formatVehicle = (booking) => {
  const vehicle = booking?.teacherVehicle || booking?.vehicleSnapshot || {};
  return (
    [vehicle.vehicleName, vehicle.brand, vehicle.model]
      .filter(Boolean)
      .join(" · ") ||
    booking?.vehicleType ||
    "Vehicle not set"
  );
};

const formatLocation = (booking) => {
  const location = booking?.location || {};
  return (
    [location.address, location.city, location.postalCode]
      .filter(Boolean)
      .join(", ") || "Location not set"
  );
};

const mapLink = (booking) => {
  const lat = Number(booking?.location?.lat);
  const lng = Number(booking?.location?.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return "";
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
};

const requestSubtitle = (role) => {
  if (role === "student") {
    return "Track every map booking request here. Confirmed requests automatically become lessons below.";
  }
  if (role === "teacher") {
    return "Accept or reject map-based requests. Accepting creates one scheduled lesson automatically.";
  }
  return "Review all map-based requests. Admin confirmation creates the linked scheduled lesson.";
};

export default function BookingWorkspace({ role, onLessonCreated }) {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState(role === "student" ? "all" : "pending");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [notice, setNotice] = useState(null);
  const [highlightedId, setHighlightedId] = useState("");

  const canApprove = role === "teacher" || role === "admin";

  const loadBookings = useCallback(async () => {
    setLoading(true);

    try {
      const response = await getLocationBookings({ status: "all" });
      setBookings(getBookingsArray(response));
    } catch (error) {
      setBookings([]);
      setNotice({
        type: "error",
        text: getErrorMessage(error, "Booking requests could not be loaded."),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedTab = params.get("tab");
    const bookingId = params.get("bookingId") || "";

    if (requestedTab === "requests") {
      setFilter("all");
    }
    setHighlightedId(bookingId);
  }, []);

  const counts = useMemo(() => {
    const result = { all: bookings.length };
    FILTERS.forEach((item) => {
      if (item.key !== "all") {
        result[item.key] = bookings.filter(
          (booking) => booking.status === item.key,
        ).length;
      }
    });
    return result;
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    const list =
      filter === "all"
        ? bookings
        : bookings.filter((booking) => booking.status === filter);

    return [...list].sort((a, b) => {
      const aDate = new Date(a.bookingDate || a.createdAt || 0).getTime();
      const bDate = new Date(b.bookingDate || b.createdAt || 0).getTime();

      if (filter === "pending") return aDate - bDate;
      return bDate - aDate;
    });
  }, [bookings, filter]);

  const replaceBooking = (updatedBooking) => {
    const updatedId = getBookingId(updatedBooking);
    if (!updatedId) return;

    setBookings((current) =>
      current.map((booking) =>
        getBookingId(booking) === updatedId ? updatedBooking : booking,
      ),
    );
  };

  const acceptBooking = async (booking) => {
    const bookingId = getBookingId(booking);
    if (!bookingId) return;

    setBusyId(bookingId);
    setNotice(null);

    try {
      const response = await confirmLocationBooking(bookingId);
      const result = unwrap(response, {});

      if (result?.booking) replaceBooking(result.booking);
      else await loadBookings();

      setNotice({
        type: "success",
        text:
          response?.data?.message ||
          "Booking confirmed and scheduled lesson created.",
      });

      if (result?.lesson && onLessonCreated) {
        await onLessonCreated(result.lesson);
      }
    } catch (error) {
      setNotice({
        type: "error",
        text: getErrorMessage(error, "Booking could not be confirmed."),
      });
    } finally {
      setBusyId("");
    }
  };

  const rejectBooking = async (booking) => {
    const bookingId = getBookingId(booking);
    const reason = window.prompt(
      "Reason for rejecting this booking:",
      "The requested time is no longer available.",
    );

    if (!bookingId || !reason?.trim()) return;

    setBusyId(bookingId);
    setNotice(null);

    try {
      const response = await rejectLocationBooking(bookingId, {
        reason: reason.trim(),
      });
      const updated = unwrap(response);
      if (updated) replaceBooking(updated);
      else await loadBookings();

      setNotice({
        type: "success",
        text: response?.data?.message || "Booking rejected.",
      });
    } catch (error) {
      setNotice({
        type: "error",
        text: getErrorMessage(error, "Booking could not be rejected."),
      });
    } finally {
      setBusyId("");
    }
  };

  const cancelBooking = async (booking) => {
    const bookingId = getBookingId(booking);
    const reason = window.prompt("Cancellation reason:");

    if (!bookingId || !reason?.trim()) return;

    setBusyId(bookingId);
    setNotice(null);

    try {
      const response = await cancelLocationBooking(bookingId, {
        reason: reason.trim(),
      });
      const updated = unwrap(response);
      if (updated) replaceBooking(updated);
      else await loadBookings();

      setNotice({
        type: "success",
        text: response?.data?.message || "Booking cancelled.",
      });
    } catch (error) {
      setNotice({
        type: "error",
        text: getErrorMessage(error, "Booking could not be cancelled."),
      });
    } finally {
      setBusyId("");
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-white p-4 md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              Booking workflow
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">
              {role === "student" ? "My booking requests" : "Booking inbox"}
            </h2>
            <p className="mt-1 max-w-3xl text-sm text-slate-600">
              {requestSubtitle(role)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {role === "student" && (
              <Link
                href="/student/driving-operation/book-lesson"
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
              >
                Book from map
              </Link>
            )}
            <button
              type="button"
              onClick={loadBookings}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 disabled:opacity-50"
            >
              <FaSyncAlt className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        {notice?.text && (
          <div
            className={`mt-4 flex items-start justify-between gap-4 rounded-xl border px-4 py-3 text-sm ${
              notice.type === "error"
                ? "border-rose-200 bg-rose-50 text-rose-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            <span>{notice.text}</span>
            <button type="button" onClick={() => setNotice(null)}>
              ×
            </button>
          </div>
        )}
      </div>

      <div className="border-b border-slate-200 p-3 md:p-4">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <button
              type="button"
              key={item.key}
              onClick={() => setFilter(item.key)}
              className={`rounded-xl border px-3 py-2 text-xs font-bold transition ${
                filter === item.key
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"
              }`}
            >
              {item.label} ({counts[item.key] || 0})
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 md:p-5">
        {loading ? (
          <div className="py-12 text-center text-sm text-slate-500">
            Loading booking requests...
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
            <h3 className="font-bold text-slate-800">No booking found</h3>
            <p className="mt-1 text-sm text-slate-500">
              There is no booking under this status.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {filteredBookings.map((booking) => {
              const bookingId = getBookingId(booking);
              const busy = busyId === bookingId;
              const status = booking.status || "pending";
              const person =
                role === "student" ? booking.teacher : booking.student;
              const personLabel = role === "student" ? "Teacher" : "Student";
              const locationUrl = mapLink(booking);
              const linkedLessonId =
                booking.lesson?._id || booking.lesson || "";

              return (
                <article
                  key={bookingId}
                  className={`rounded-2xl border bg-white p-4 transition md:p-5 ${
                    highlightedId === bookingId
                      ? "border-blue-500 ring-4 ring-blue-100"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-bold ${
                            STATUS_CLASSES[status] ||
                            "border-slate-200 bg-slate-100 text-slate-700"
                          }`}
                        >
                          {STATUS_LABELS[status] || status}
                        </span>
                        <span className="text-xs text-slate-400">
                          #{bookingId.slice(-8).toUpperCase()}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-bold text-slate-900">
                        {booking.offer?.title || "Driving lesson request"}
                      </h3>
                      <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                        <FaUser className="text-slate-400" />
                        {personLabel}: {getPersonName(person, "Not available")}
                      </p>
                    </div>

                    <p className="text-lg font-black text-slate-900">
                      {formatMoney(booking)}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-3 rounded-xl bg-slate-50 p-4 text-sm sm:grid-cols-2">
                    <p className="flex items-start gap-2 text-slate-700">
                      <FaCalendarAlt className="mt-0.5 shrink-0 text-blue-600" />
                      <span>
                        <strong className="block text-slate-900">
                          {formatDate(booking.bookingDate)}
                        </strong>
                        Requested date
                      </span>
                    </p>
                    <p className="flex items-start gap-2 text-slate-700">
                      <FaClock className="mt-0.5 shrink-0 text-blue-600" />
                      <span>
                        <strong className="block text-slate-900">
                          {booking.startTime || "--"}–{booking.endTime || "--"}
                        </strong>
                        {booking.duration || 0} minutes
                      </span>
                    </p>
                    <p className="flex items-start gap-2 text-slate-700">
                      <FaCarSide className="mt-0.5 shrink-0 text-blue-600" />
                      <span>
                        <strong className="block capitalize text-slate-900">
                          {booking.vehicleType || "Not set"}
                        </strong>
                        {formatVehicle(booking)}
                      </span>
                    </p>
                    <p className="flex items-start gap-2 text-slate-700">
                      <FaMapMarkerAlt className="mt-0.5 shrink-0 text-blue-600" />
                      <span>
                        <strong className="block text-slate-900">
                          {booking.location?.meetingType === "student_pickup"
                            ? "Student pickup"
                            : "Teacher meeting point"}
                        </strong>
                        {formatLocation(booking)}
                      </span>
                    </p>
                  </div>

                  {Number.isFinite(Number(booking.distanceKm)) && (
                    <p className="mt-3 text-xs font-semibold text-slate-500">
                      Map distance: {Number(booking.distanceKm).toFixed(1)} km
                    </p>
                  )}

                  {status === "pending" && booking.expiresAt && (
                    <p className="mt-2 text-xs text-amber-700">
                      Teacher response deadline: {formatDate(booking.expiresAt)}{" "}
                      {new Date(booking.expiresAt).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}

                  {booking.rejection?.reason && (
                    <p className="mt-3 rounded-xl border border-rose-100 bg-rose-50 p-3 text-sm text-rose-700">
                      Rejection reason: {booking.rejection.reason}
                    </p>
                  )}

                  {booking.cancellation?.reason && (
                    <p className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                      Cancellation reason: {booking.cancellation.reason}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {locationUrl && (
                      <a
                        href={locationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                      >
                        <FaExternalLinkAlt /> Open map
                      </a>
                    )}

                    {linkedLessonId && (
                      <span className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
                        Linked lesson created
                      </span>
                    )}

                    {canApprove && status === "pending" && (
                      <>
                        <button
                          type="button"
                          onClick={() => acceptBooking(booking)}
                          disabled={busy}
                          className="ml-auto inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white disabled:opacity-50"
                        >
                          <FaCheck /> {busy ? "Saving..." : "Accept & schedule"}
                        </button>
                        <button
                          type="button"
                          onClick={() => rejectBooking(booking)}
                          disabled={busy}
                          className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white disabled:opacity-50"
                        >
                          <FaTimes /> Reject
                        </button>
                      </>
                    )}

                    {role === "student" && status === "pending" && (
                      <button
                        type="button"
                        onClick={() => cancelBooking(booking)}
                        disabled={busy}
                        className="ml-auto rounded-xl border border-rose-300 px-4 py-2 text-xs font-bold text-rose-700 disabled:opacity-50"
                      >
                        {busy ? "Cancelling..." : "Cancel request"}
                      </button>
                    )}

                    {canApprove && status === "confirmed" && (
                      <button
                        type="button"
                        onClick={() => cancelBooking(booking)}
                        disabled={busy}
                        className="ml-auto rounded-xl border border-rose-300 px-4 py-2 text-xs font-bold text-rose-700 disabled:opacity-50"
                      >
                        Cancel confirmed booking
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
