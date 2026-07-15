export const unwrap = (response, fallback = null) =>
  response?.data?.data ?? response?.data ?? fallback;

export const getErrorMessage = (error, fallback = "Something went wrong.") =>
  error?.response?.data?.message || error?.message || fallback;

export const formatLessonDate = (value) => {
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

export const toDateInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const statusLabel = (status) => {
  const labels = {
    scheduled: "Scheduled",
    in_progress: "In progress",
    awaiting_confirmation: "Awaiting confirmation",
    completed: "Completed",
    cancelled: "Cancelled",
    no_show: "No-show",
  };
  return labels[status] || status || "Unknown";
};

export const statusClass = (status) => {
  const classes = {
    scheduled: "bg-blue-100 text-blue-700",
    in_progress: "bg-amber-100 text-amber-700",
    awaiting_confirmation: "bg-violet-100 text-violet-700",
    completed: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-rose-100 text-rose-700",
    no_show: "bg-slate-200 text-slate-700",
  };
  return classes[status] || "bg-slate-100 text-slate-700";
};

export const requestLabel = (status) => {
  const labels = {
    none: "None",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
  };
  return labels[status] || "None";
};

export const getLessonLocation = (lesson) => {
  const location = lesson?.booking?.location || {};
  return [location.address, location.city].filter(Boolean).join(", ") || "Not set";
};

export const getVehicleType = (lesson) =>
  lesson?.booking?.vehicleType
    ? lesson.booking.vehicleType[0].toUpperCase() +
      lesson.booking.vehicleType.slice(1)
    : "Not set";

export const isFutureLesson = (lesson) => {
  const date = new Date(lesson?.lessonDate);
  if (Number.isNaN(date.getTime())) return false;
  date.setHours(23, 59, 59, 999);
  return date >= new Date();
};

export const DRIVING_SKILLS = [
  "Cockpit drill",
  "Moving off safely",
  "Steering control",
  "Clutch control",
  "Gear changing",
  "Braking",
  "Junctions",
  "Roundabouts",
  "Lane changing",
  "Parallel parking",
  "Bay parking",
  "Reversing",
  "Mirror observation",
  "Road signs",
  "Independent driving",
  "Emergency stop",
];
