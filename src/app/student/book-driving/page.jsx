// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import {
//   FaCalendarAlt,
//   FaCarSide,
//   FaClock,
//   FaStar,
//   FaWhatsapp,
// } from "react-icons/fa";

// import { FaMapMarkerAlt } from "react-icons/fa";
// import {
//   IoArrowForward,
//   IoCallOutline,
//   IoCarSportOutline,
//   IoCheckmarkCircle,
//   IoChevronBack,
//   IoLocationOutline,
//   IoPersonOutline,
//   IoShieldCheckmarkOutline,
// } from "react-icons/io5";

// const instructors = [
//   {
//     name: "Robert Fox",
//     phone: "089636789000",
//     experience: "05 Years+",
//     rating: "4.9",
//     lessons: "1200+",
//     avatar:
//       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
//   },
//   {
//     name: "Leslie Alexander",
//     phone: "089636789000",
//     experience: "06 Years+",
//     rating: "4.8",
//     lessons: "980+",
//     avatar:
//       "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
//   },
//   {
//     name: "Devon Lane",
//     phone: "089636789000",
//     experience: "04 Years+",
//     rating: "4.7",
//     lessons: "860+",
//     avatar:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
//   },
// ];

// export default function Page() {
//   const [selectedInstructor, setSelectedInstructor] = useState("Robert Fox");

//   return (
//     <main className="min-h-screen bg-[#F7F9FC] px-4 py-4 antialiased sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-[1120px]">
//         {/* Header */}
//         <header className="mb-5 flex items-center justify-between gap-4">
//           <div className="flex items-center gap-3">
//             <button
//               type="button"
//               onClick={() => window.history.back()}
//               className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white text-[#344054] shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] transition active:scale-95"
//             >
//               <IoChevronBack className="text-[21px]" />
//             </button>

//             <div>
//               <h1 className="text-[22px] font-semibold tracking-[-0.035em] text-[#1B3F73] sm:text-[26px]">
//                 Book Driving Lesson
//               </h1>
//               <p className="mt-0.5 text-xs text-[#7A8495]">
//                 Choose your lesson details and book with a verified instructor.
//               </p>
//             </div>
//           </div>

//           <div className="hidden items-center gap-2 rounded-[14px] bg-white px-3.5 py-2.5 text-xs font-medium text-[#667085] shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] sm:flex">
//             <IoShieldCheckmarkOutline className="text-[16px] text-[#477DBA]" />
//             Secure Booking
//           </div>
//         </header>

//         {/* Hero */}
//         <section className="mb-4 overflow-hidden rounded-[26px] bg-white p-3 shadow-[0_1px_3px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] sm:p-4">
//           <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#477DBA] via-[#245A97] to-[#163A63] p-5 text-white">
//             <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
//             <div className="absolute -bottom-20 left-20 h-52 w-52 rounded-full bg-[#B7D4FF]/20 blur-3xl" />

//             <div className="relative z-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
//               <div>
//                 <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/14 px-3 py-1.5 text-[11px] font-medium text-white/90 backdrop-blur-md">
//                   <FaCarSide className="text-[#F8D57E]" />
//                   Professional Driving Lesson
//                 </div>

//                 <h2 className="max-w-[620px] text-[28px] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[38px]">
//                   Book your next driving lesson with expert instructors.
//                 </h2>

//                 <p className="mt-2 max-w-[560px] text-xs leading-5 text-white/72 sm:text-[13px]">
//                   Select your vehicle type, preferred date, time, city and
//                   available instructor in one clean booking flow.
//                 </p>
//               </div>

//               <div className="grid grid-cols-3 gap-2">
//                 <HeroStat label="Instructors" value="03" />
//                 <HeroStat label="Pass Rate" value="95%" />
//                 <HeroStat label="Rating" value="4.9" />
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="grid gap-4 lg:grid-cols-[1fr_0.38fr]">
//           {/* Main Form */}
//           <div className="rounded-[26px] bg-white p-4 shadow-[0_1px_3px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04]">
//             <div className="mb-5 flex items-center justify-between gap-3">
//               <div>
//                 <h2 className="text-[18px] font-semibold tracking-[-0.03em] text-[#263241]">
//                   Lesson Booking Details
//                 </h2>
//                 <p className="mt-0.5 text-xs text-[#8A94A6]">
//                   Fill in your personal and lesson information.
//                 </p>
//               </div>

//               <span className="hidden rounded-full bg-[#EEF5FF] px-3 py-1.5 text-[11px] font-medium text-[#477DBA] sm:inline-flex">
//                 Step 1 of 2
//               </span>
//             </div>

//             <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//               <FormField
//                 label="First Name"
//                 value="Robert"
//                 icon={<IoPersonOutline />}
//               />
//               <FormField
//                 label="Last Name"
//                 value="Fox"
//                 icon={<IoPersonOutline />}
//               />
//               <FormField
//                 label="Phone Number"
//                 value="+880 988 900"
//                 icon={<IoCallOutline />}
//               />
//               <SelectField
//                 label="Vehicle Type"
//                 value="Manual Car"
//                 icon={<IoCarSportOutline />}
//               />
//               <FormField
//                 label="Select Date"
//                 value="10/12/2025"
//                 icon={<FaCalendarAlt />}
//               />
//               <SelectField
//                 label="Select Time"
//                 value="10 AM - 12 PM"
//                 icon={<FaClock />}
//               />
//               <FormField
//                 label="Address"
//                 value="House no: 100, Dhaka"
//                 icon={<FaMapMarkerAlt />}
//               />
//               <FormField
//                 label="Your City"
//                 value="Dhaka"
//                 icon={<IoLocationOutline />}
//               />
//             </div>

//             {/* Instructor Section */}
//             <section className="mt-5 rounded-[24px] bg-[#F7F9FC] p-3.5 ring-1 ring-black/[0.04] sm:p-4">
//               <div className="mb-4 flex items-center justify-between gap-3">
//                 <div>
//                   <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-[#263241]">
//                     Available Instructors
//                   </h3>
//                   <p className="mt-0.5 text-xs text-[#8A94A6]">
//                     Select the instructor you want to book.
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
//                 {instructors.map((item) => (
//                   <InstructorCard
//                     key={item.name}
//                     item={item}
//                     selected={selectedInstructor === item.name}
//                     onSelect={() => setSelectedInstructor(item.name)}
//                   />
//                 ))}
//               </div>
//             </section>

//             <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
//               <button className="h-11 rounded-[15px] bg-[#F2F5F9] px-5 text-sm font-medium text-[#667085] transition hover:bg-[#EAF1FA] active:scale-[0.98]">
//                 Cancel
//               </button>

//               <Link href="/student/instructor">
//                 <button className="inline-flex h-11 items-center justify-center gap-2 rounded-[15px] bg-[#D92D20] px-6 text-sm font-medium text-white shadow-[0_10px_22px_rgba(217,45,32,0.16)] transition hover:bg-[#B42318] active:scale-[0.98]">
//                   Submit Booking
//                   <IoArrowForward className="text-[16px]" />
//                 </button>
//               </Link>
//             </div>
//           </div>

//           {/* Booking Summary */}
//           <aside className="space-y-4">
//             <div className="rounded-[26px] bg-white p-4 shadow-[0_1px_3px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04]">
//               <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-[#263241]">
//                 Booking Summary
//               </h3>
//               <p className="mt-0.5 text-xs text-[#8A94A6]">
//                 Your selected lesson information.
//               </p>

//               <div className="mt-4 space-y-2">
//                 <SummaryRow label="Student" value="Robert Fox" />
//                 <SummaryRow label="Vehicle" value="Manual Car" />
//                 <SummaryRow label="Date" value="10/12/2025" />
//                 <SummaryRow label="Time" value="10 AM - 12 PM" />
//                 <SummaryRow label="City" value="Dhaka" />
//                 <SummaryRow label="Instructor" value={selectedInstructor} />
//               </div>

//               <div className="mt-4 rounded-[18px] bg-[#ECFDF3] p-3 ring-1 ring-[#ABEFC6]">
//                 <div className="flex items-center gap-2">
//                   <IoCheckmarkCircle className="text-[18px] text-[#12A150]" />
//                   <p className="text-xs font-medium text-[#067647]">
//                     Instructor available for this slot
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="rounded-[26px] bg-[#EAF1FA] p-4 ring-1 ring-black/[0.03]">
//               <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white text-[#477DBA] shadow-sm">
//                 <IoShieldCheckmarkOutline className="text-[20px]" />
//               </div>

//               <h3 className="mt-3 text-[15px] font-semibold tracking-[-0.02em] text-[#263241]">
//                 Why book here?
//               </h3>

//               <ul className="mt-2 space-y-2 text-xs leading-5 text-[#667085]">
//                 <li>• Verified driving instructors</li>
//                 <li>• Flexible date and time selection</li>
//                 <li>• Manual and automatic vehicle options</li>
//                 <li>• Easy booking confirmation</li>
//               </ul>
//             </div>
//           </aside>
//         </section>
//       </div>
//     </main>
//   );
// }

// function HeroStat({ label, value }) {
//   return (
//     <div className="rounded-[18px] bg-white/12 p-3 text-white ring-1 ring-white/15 backdrop-blur-md">
//       <h3 className="text-[22px] font-semibold leading-none tracking-[-0.04em]">
//         {value}
//       </h3>
//       <p className="mt-1 text-[11px] text-white/70">{label}</p>
//     </div>
//   );
// }

// function FormField({ label, value, icon }) {
//   return (
//     <label className="block">
//       <span className="mb-1.5 block text-[11px] font-medium text-[#7A8495]">
//         {label}
//       </span>

//       <div className="flex h-12 items-center gap-2.5 rounded-[16px] bg-[#FAFBFD] px-3.5 ring-1 ring-black/[0.04] transition-within:ring-[#477DBA]">
//         <span className="text-[16px] text-[#477DBA]">{icon}</span>
//         <input
//           defaultValue={value}
//           className="h-full w-full bg-transparent text-sm font-medium text-[#344054] outline-none placeholder:text-[#A8B0BE]"
//         />
//       </div>
//     </label>
//   );
// }

// function SelectField({ label, value, icon }) {
//   return (
//     <label className="block">
//       <span className="mb-1.5 block text-[11px] font-medium text-[#7A8495]">
//         {label}
//       </span>

//       <div className="flex h-12 items-center gap-2.5 rounded-[16px] bg-[#FAFBFD] px-3.5 ring-1 ring-black/[0.04]">
//         <span className="text-[16px] text-[#477DBA]">{icon}</span>

//         <select
//           defaultValue={value}
//           className="h-full w-full bg-transparent text-sm font-medium text-[#344054] outline-none"
//         >
//           <option>{value}</option>
//           <option>Automatic Car</option>
//           <option>Manual Car</option>
//           <option>Motorbike</option>
//         </select>
//       </div>
//     </label>
//   );
// }

// function InstructorCard({ item, selected, onSelect }) {
//   return (
//     <button
//       type="button"
//       onClick={onSelect}
//       className={`group relative rounded-[22px] bg-white p-4 text-left transition-all duration-300 ${
//         selected
//           ? "shadow-[0_14px_34px_rgba(71,125,186,0.16)] ring-2 ring-[#477DBA]"
//           : "shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(16,24,40,0.07)]"
//       }`}
//     >
//       {selected && (
//         <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#477DBA] text-white">
//           <IoCheckmarkCircle className="text-[18px]" />
//         </span>
//       )}

//       <div className="flex items-center gap-3">
//         <img
//           src={item.avatar}
//           alt={item.name}
//           className="h-14 w-14 rounded-[18px] object-cover ring-4 ring-[#F2F5F9]"
//         />

//         <div className="min-w-0">
//           <h4 className="truncate text-[15px] font-semibold tracking-[-0.02em] text-[#263241]">
//             {item.name}
//           </h4>

//           <div className="mt-1 flex items-center gap-1.5 text-xs text-[#7A8495]">
//             <FaWhatsapp className="text-[#12B76A]" />
//             {item.phone}
//           </div>
//         </div>
//       </div>

//       <div className="mt-4 grid grid-cols-3 gap-2">
//         <MiniInfo label="Exp." value={item.experience} />
//         <MiniInfo label="Rating" value={item.rating} />
//         <MiniInfo label="Lessons" value={item.lessons} />
//       </div>

//       <div className="mt-4 flex items-center justify-between">
//         <div className="flex gap-1 text-[#F6B700]">
//           {Array.from({ length: 5 }).map((_, index) => (
//             <FaStar key={index} className="text-[13px]" />
//           ))}
//         </div>

//         <span
//           className={`rounded-full px-3 py-1.5 text-[11px] font-medium ${
//             selected
//               ? "bg-[#EEF5FF] text-[#477DBA]"
//               : "bg-[#F2F5F9] text-[#7A8495]"
//           }`}
//         >
//           {selected ? "Selected" : "Choose"}
//         </span>
//       </div>
//     </button>
//   );
// }

// function MiniInfo({ label, value }) {
//   return (
//     <div className="rounded-[14px] bg-[#FAFBFD] p-2 ring-1 ring-black/[0.04]">
//       <p className="text-[9px] text-[#98A2B3]">{label}</p>
//       <p className="mt-0.5 truncate text-[11px] font-medium text-[#344054]">
//         {value}
//       </p>
//     </div>
//   );
// }

// function SummaryRow({ label, value }) {
//   return (
//     <div className="flex items-center justify-between gap-3 rounded-[15px] bg-[#FAFBFD] px-3 py-2.5 ring-1 ring-black/[0.04]">
//       <p className="text-xs text-[#8A94A6]">{label}</p>
//       <p className="truncate text-xs font-medium text-[#344054]">{value}</p>
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";

import {
  FaCalendarAlt,
  FaCarSide,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaStar,
  FaTimesCircle,
  FaUserTie,
} from "react-icons/fa";

import {
  cancelBooking,
  createBooking,
  getBookings,
  getPublicTeachers,
  getTeacherBookingAvailability,
} from "@/features/API";

const EMPTY_FORM = {
  teacher: "",
  vehicleType: "",
  locationId: "",
  bookingDate: "",
  startTime: "",
  endTime: "",
};

const unwrap = (response, fallback = null) => {
  return response?.data?.data ?? response?.data ?? fallback;
};

const getErrorMessage = (error, fallback) => {
  return error?.response?.data?.message || error?.message || fallback;
};

const getTodayInputValue = () => {
  const now = new Date();

  const offset = now.getTimezoneOffset();

  return new Date(now.getTime() - offset * 60 * 1000)
    .toISOString()
    .slice(0, 10);
};

const timeToMinutes = (value) => {
  if (!/^\d{2}:\d{2}$/.test(value || "")) {
    return null;
  }

  const [hours, minutes] = value.split(":").map(Number);

  return hours * 60 + minutes;
};

const calculateDuration = (startTime, endTime) => {
  const start = timeToMinutes(startTime);

  const end = timeToMinutes(endTime);

  if (start === null || end === null || end <= start) {
    return 0;
  }

  return end - start;
};

const formatDuration = (minutes) => {
  const safeMinutes = Number(minutes) || 0;

  const hours = Math.floor(safeMinutes / 60);

  const remaining = safeMinutes % 60;

  if (hours && remaining) {
    return `${hours}h ${remaining}m`;
  }

  if (hours) {
    return `${hours}h`;
  }

  return `${remaining}m`;
};

const formatDate = (value) => {
  if (!value) {
    return "Date not set";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const statusLabel = (status) => {
  const labels = {
    pending: "Waiting for teacher",

    confirmed: "Confirmed",

    cancelled: "Cancelled",

    completed: "Completed",
  };

  return labels[status] || "Unknown";
};

const statusClass = (status) => {
  if (status === "confirmed") {
    return "bg-green-100 text-green-700";
  }

  if (status === "completed") {
    return "bg-blue-100 text-blue-700";
  }

  if (status === "cancelled") {
    return "bg-red-100 text-red-700";
  }

  return "bg-amber-100 text-amber-700";
};

const overlapsOccupiedSlot = (startTime, endTime, occupiedSlots) => {
  const start = timeToMinutes(startTime);

  const end = timeToMinutes(endTime);

  if (start === null || end === null || end <= start) {
    return false;
  }

  return occupiedSlots.some((slot) => {
    const occupiedStart = timeToMinutes(slot.startTime);

    const occupiedEnd = timeToMinutes(slot.endTime);

    if (occupiedStart === null || occupiedEnd === null) {
      return false;
    }

    return start < occupiedEnd && end > occupiedStart;
  });
};

function TeacherCard({ teacher, selected, onSelect }) {
  const user = teacher?.user || {};

  const vehicleTypes = [
    ...new Set((teacher?.vehicles || []).map((vehicle) => vehicle.vehicleType)),
  ];

  return (
    <button
      type="button"
      onClick={() => onSelect(user._id)}
      disabled={!user._id}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-[#174A9B] bg-blue-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-blue-300"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#174A9B] text-lg font-bold text-white">
          {(user.name || "T").charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-bold text-slate-900">
                {user.name || "Teacher"}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {teacher.experienceYears || 0} years experience
              </p>
            </div>

            {selected && <FaCheckCircle className="shrink-0 text-[#174A9B]" />}
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-amber-700">
              <FaStar />

              {Number(teacher?.rating?.average || 0).toFixed(1)}
            </span>

            {vehicleTypes.map((type) => (
              <span
                key={type}
                className="rounded-full bg-slate-100 px-2 py-1 capitalize text-slate-600"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

function BookingCard({ booking, cancellingId, onCancel }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-bold text-slate-900">
            {booking?.teacher?.name || "Teacher"}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {formatDate(booking.bookingDate)}
            {" · "}
            {booking.startTime}
            {" - "}
            {booking.endTime}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(
            booking.status,
          )}`}
        >
          {statusLabel(booking.status)}
        </span>
      </div>

      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Vehicle</p>

          <p className="mt-1 font-semibold capitalize">{booking.vehicleType}</p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Duration</p>

          <p className="mt-1 font-semibold">
            {formatDuration(booking.duration)}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Location</p>

          <p className="mt-1 truncate font-semibold">
            {[booking?.location?.address, booking?.location?.city]
              .filter(Boolean)
              .join(", ") || "Not set"}
          </p>
        </div>
      </div>

      {["pending", "confirmed"].includes(booking.status) && (
        <button
          type="button"
          onClick={() => onCancel(booking)}
          disabled={cancellingId === booking._id}
          className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-700 disabled:opacity-50"
        >
          <FaTimesCircle />

          {cancellingId === booking._id ? "Cancelling..." : "Cancel request"}
        </button>
      )}
    </article>
  );
}

export default function BookDrivingPage() {
  const [teachers, setTeachers] = useState([]);

  const [bookings, setBookings] = useState([]);

  const [occupiedSlots, setOccupiedSlots] = useState([]);

  const [form, setForm] = useState(EMPTY_FORM);

  const [loading, setLoading] = useState(true);

  const [checkingAvailability, setCheckingAvailability] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [cancellingId, setCancellingId] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const selectedTeacher = useMemo(() => {
    return (
      teachers.find((teacher) => teacher?.user?._id === form.teacher) || null
    );
  }, [teachers, form.teacher]);

  const vehicleTypes = useMemo(() => {
    return [
      ...new Set(
        (selectedTeacher?.vehicles || [])
          .filter((vehicle) => vehicle.status !== "inactive")
          .map((vehicle) => vehicle.vehicleType),
      ),
    ];
  }, [selectedTeacher]);

  const locations = selectedTeacher?.locations || [];

  const duration = calculateDuration(form.startTime, form.endTime);

  const hasTimeConflict = overlapsOccupiedSlot(
    form.startTime,
    form.endTime,
    occupiedSlots,
  );

  const loadInitialData = async () => {
    setLoading(true);
    setError("");

    const [teacherResult, bookingResult] = await Promise.allSettled([
      getPublicTeachers(),
      getBookings(),
    ]);

    if (teacherResult.status === "fulfilled") {
      const data = unwrap(teacherResult.value, []);

      setTeachers(Array.isArray(data) ? data : []);
    } else {
      setTeachers([]);

      setError(
        getErrorMessage(
          teacherResult.reason,
          "Available teachers could not be loaded.",
        ),
      );
    }

    if (bookingResult.status === "fulfilled") {
      const data = unwrap(bookingResult.value, []);

      setBookings(Array.isArray(data) ? data : []);
    } else {
      setBookings([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (!form.teacher || !form.bookingDate) {
      setOccupiedSlots([]);

      return;
    }

    let active = true;

    const loadAvailability = async () => {
      setCheckingAvailability(true);

      try {
        const response = await getTeacherBookingAvailability({
          teacher: form.teacher,

          date: form.bookingDate,
        });

        const data = unwrap(response, {});

        if (active) {
          setOccupiedSlots(
            Array.isArray(data?.occupiedSlots) ? data.occupiedSlots : [],
          );
        }
      } catch (requestError) {
        if (active) {
          setOccupiedSlots([]);

          setError(
            getErrorMessage(
              requestError,
              "Teacher availability could not be checked.",
            ),
          );
        }
      } finally {
        if (active) {
          setCheckingAvailability(false);
        }
      }
    };

    loadAvailability();

    return () => {
      active = false;
    };
  }, [form.teacher, form.bookingDate]);

  useEffect(() => {
    if (!success) {
      return undefined;
    }

    const timer = window.setTimeout(() => setSuccess(""), 5000);

    return () => window.clearTimeout(timer);
  }, [success]);

  const selectTeacher = (teacherId) => {
    const teacher = teachers.find((item) => item?.user?._id === teacherId);

    const firstVehicleType = teacher?.vehicles?.[0]?.vehicleType || "";

    const firstLocationId = teacher?.locations?.[0]?._id || "";

    setForm((current) => ({
      ...current,

      teacher: teacherId,

      vehicleType: firstVehicleType,

      locationId: firstLocationId,
    }));

    setError("");
  };

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const submitBooking = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.teacher) {
      setError("Please select a teacher.");

      return;
    }

    if (!form.vehicleType) {
      setError("The selected teacher has no active vehicle.");

      return;
    }

    if (!form.locationId) {
      setError("The selected teacher has no active lesson location.");

      return;
    }

    if (!duration || duration < 30 || duration > 240) {
      setError("Lesson duration must be between 30 minutes and 4 hours.");

      return;
    }

    if (hasTimeConflict) {
      setError("The teacher already has a booking during the selected time.");

      return;
    }

    setSubmitting(true);

    try {
      const response = await createBooking(form);

      const newBooking = unwrap(response, null);

      if (newBooking?._id) {
        setBookings((current) => [newBooking, ...current]);
      }

      setSuccess(
        "Booking request submitted. A lesson will be created after the teacher confirms it.",
      );

      setForm((current) => ({
        ...EMPTY_FORM,

        teacher: current.teacher,

        vehicleType: current.vehicleType,

        locationId: current.locationId,
      }));

      setOccupiedSlots([]);
    } catch (requestError) {
      setError(
        getErrorMessage(requestError, "Booking request could not be created."),
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async (booking) => {
    const reason = window.prompt("Why do you want to cancel this booking?");

    if (!reason?.trim()) {
      return;
    }

    setCancellingId(booking._id);

    setError("");

    try {
      const response = await cancelBooking(booking._id, {
        reason: reason.trim(),
      });

      const updatedBooking = unwrap(response, null);

      setBookings((current) =>
        current.map((item) =>
          item._id === booking._id
            ? updatedBooking || {
                ...item,
                status: "cancelled",
              }
            : item,
        ),
      );

      setSuccess("Booking cancelled successfully.");
    } catch (requestError) {
      setError(
        getErrorMessage(requestError, "Booking could not be cancelled."),
      );
    } finally {
      setCancellingId("");
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F7FB] px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header>
          <h1 className="text-3xl font-bold text-[#174A9B]">
            Book Driving Lesson
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            Select a verified teacher, lesson location, vehicle and time. Your
            request remains pending until the teacher confirms it. The lesson is
            created automatically after confirmation.
          </p>
        </header>

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
            {success}
          </div>
        )}

        {loading ? (
          <div className="mt-7 grid animate-pulse gap-5 lg:grid-cols-[1fr_0.8fr]">
            <div className="h-[620px] rounded-2xl bg-slate-200" />

            <div className="h-[620px] rounded-2xl bg-slate-200" />
          </div>
        ) : (
          <>
            <section className="mt-7 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
              <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8EEF8] text-[#174A9B]">
                    <FaUserTie />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-[#174A9B]">
                      1. Choose a verified teacher
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Only verified and currently available teachers are shown.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {teachers.length ? (
                    teachers.map((teacher) => (
                      <TeacherCard
                        key={teacher._id}
                        teacher={teacher}
                        selected={teacher?.user?._id === form.teacher}
                        onSelect={selectTeacher}
                      />
                    ))
                  ) : (
                    <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 sm:col-span-2">
                      No verified and available teacher was found.
                    </div>
                  )}
                </div>
              </div>

              <form
                onSubmit={submitBooking}
                className="rounded-2xl bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8EEF8] text-[#174A9B]">
                    <FaCalendarAlt />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-[#174A9B]">
                      2. Choose lesson details
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      All fields are required.
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                      Vehicle type
                    </span>

                    <div className="relative">
                      <FaCarSide className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <select
                        required
                        name="vehicleType"
                        value={form.vehicleType}
                        onChange={updateField}
                        disabled={!selectedTeacher}
                        className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 disabled:bg-slate-100"
                      >
                        <option value="">Select vehicle</option>

                        {vehicleTypes.map((type) => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                      Lesson location
                    </span>

                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <select
                        required
                        name="locationId"
                        value={form.locationId}
                        onChange={updateField}
                        disabled={!selectedTeacher}
                        className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 disabled:bg-slate-100"
                      >
                        <option value="">Select location</option>

                        {locations.map((location) => (
                          <option key={location._id} value={location._id}>
                            {location.title || location.address}

                            {location.city ? `, ${location.city}` : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                      Lesson date
                    </span>

                    <div className="relative">
                      <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        required
                        type="date"
                        name="bookingDate"
                        min={getTodayInputValue()}
                        value={form.bookingDate}
                        onChange={updateField}
                        disabled={!selectedTeacher}
                        className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 disabled:bg-slate-100"
                      />
                    </div>
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label>
                      <span className="mb-2 block text-sm font-semibold text-slate-700">
                        Start time
                      </span>

                      <div className="relative">
                        <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                        <input
                          required
                          type="time"
                          name="startTime"
                          value={form.startTime}
                          onChange={updateField}
                          disabled={!form.bookingDate}
                          className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-3 disabled:bg-slate-100"
                        />
                      </div>
                    </label>

                    <label>
                      <span className="mb-2 block text-sm font-semibold text-slate-700">
                        End time
                      </span>

                      <div className="relative">
                        <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                        <input
                          required
                          type="time"
                          name="endTime"
                          value={form.endTime}
                          onChange={updateField}
                          disabled={!form.bookingDate}
                          className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-3 disabled:bg-slate-100"
                        />
                      </div>
                    </label>
                  </div>

                  {form.bookingDate && (
                    <div className="rounded-xl bg-slate-50 p-4 text-sm">
                      {checkingAvailability ? (
                        <p className="text-slate-500">
                          Checking teacher availability...
                        </p>
                      ) : occupiedSlots.length ? (
                        <>
                          <p className="font-semibold text-slate-700">
                            Already occupied:
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2">
                            {occupiedSlots.map((slot) => (
                              <span
                                key={`${slot.startTime}-${slot.endTime}`}
                                className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700"
                              >
                                {slot.startTime} - {slot.endTime}
                              </span>
                            ))}
                          </div>
                        </>
                      ) : (
                        <p className="font-semibold text-green-700">
                          No existing booking was found for this teacher on the
                          selected date.
                        </p>
                      )}
                    </div>
                  )}

                  <div className="rounded-xl bg-[#E8EEF8] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-slate-600">
                        Lesson duration
                      </span>

                      <strong className="text-[#174A9B]">
                        {duration ? formatDuration(duration) : "--"}
                      </strong>
                    </div>

                    {hasTimeConflict && (
                      <p className="mt-2 text-xs font-semibold text-red-700">
                        This time overlaps with an occupied slot.
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || !selectedTeacher || hasTimeConflict}
                    className="w-full rounded-xl bg-[#174A9B] px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting
                      ? "Submitting request..."
                      : "Submit booking request"}
                  </button>
                </div>
              </form>
            </section>

            <section className="mt-7 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[#174A9B]">
                    My Booking Requests
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Pending requests become lessons only after teacher
                    confirmation.
                  </p>
                </div>

                <span className="rounded-full bg-[#E8EEF8] px-4 py-2 text-xs font-bold text-[#174A9B]">
                  {bookings.length} requests
                </span>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {bookings.length ? (
                  bookings.map((booking) => (
                    <BookingCard
                      key={booking._id}
                      booking={booking}
                      cancellingId={cancellingId}
                      onCancel={handleCancel}
                    />
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-300 p-9 text-center lg:col-span-2">
                    <p className="font-bold text-[#174A9B]">
                      No booking request yet
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      Select a teacher and submit your first booking request.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
