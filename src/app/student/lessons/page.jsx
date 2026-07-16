// "use client";

// import { useEffect, useMemo, useState } from "react";
// import {
//   confirmAttendance,
//   confirmLessonCompletion,
//   getLessons,
//   requestLessonCancellation,
//   requestLessonReschedule,
//   submitLessonFeedback,
// } from "@/features/API";
// import {
//   formatLessonDate,
//   getErrorMessage,
//   getLessonLocation,
//   getVehicleType,
//   statusClass,
//   statusLabel,
//   unwrap,
// } from "../../../features/lessonHelpers";

// const FILTERS = [
//   { key: "upcoming", label: "Upcoming" },
//   { key: "active", label: "In progress" },
//   { key: "awaiting", label: "Awaiting confirmation" },
//   { key: "completed", label: "Completed" },
//   { key: "cancelled", label: "Cancelled / No-show" },
//   { key: "all", label: "All lessons" },
// ];

// const personName = (person, fallback) =>
//   person?.name ||
//   [person?.firstName, person?.lastName].filter(Boolean).join(" ") ||
//   fallback;

// const getLessonsFromResponse = (response) => {
//   const data = unwrap(response, []);
//   if (Array.isArray(data)) return data;
//   if (Array.isArray(data?.lessons)) return data.lessons;
//   return [];
// };

// const now = () => new Date();

// export default function StudentLessonsPage() {
//   const [lessons, setLessons] = useState([]);
//   const [filter, setFilter] = useState("upcoming");
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [busyId, setBusyId] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [feedbackLesson, setFeedbackLesson] = useState(null);
//   const [feedback, setFeedback] = useState({ rating: 5, studentNotes: "" });

//   const loadLessons = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const response = await getLessons({ limit: 100, sort: "lessonDate" });
//       setLessons(getLessonsFromResponse(response));
//     } catch (loadError) {
//       setError(getErrorMessage(loadError, "Could not load your lessons."));
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadLessons();
//   }, []);

//   const stats = useMemo(
//     () => ({
//       total: lessons.length,
//       scheduled: lessons.filter((lesson) => lesson.status === "scheduled")
//         .length,
//       completed: lessons.filter((lesson) => lesson.status === "completed")
//         .length,
//       awaiting: lessons.filter(
//         (lesson) => lesson.status === "awaiting_confirmation",
//       ).length,
//     }),
//     [lessons],
//   );

//   const nextLesson = useMemo(
//     () =>
//       lessons
//         .filter(
//           (lesson) =>
//             ["scheduled", "in_progress"].includes(lesson.status) &&
//             new Date(lesson.lessonDate).setHours(23, 59, 59, 999) >=
//               now().getTime(),
//         )
//         .sort((a, b) => new Date(a.lessonDate) - new Date(b.lessonDate))[0] ||
//       null,
//     [lessons],
//   );

//   const filteredLessons = useMemo(() => {
//     const needle = search.trim().toLowerCase();

//     return lessons
//       .filter((lesson) => {
//         if (filter === "upcoming") return lesson.status === "scheduled";
//         if (filter === "active") return lesson.status === "in_progress";
//         if (filter === "awaiting")
//           return lesson.status === "awaiting_confirmation";
//         if (filter === "completed") return lesson.status === "completed";
//         if (filter === "cancelled")
//           return ["cancelled", "no_show"].includes(lesson.status);
//         return true;
//       })
//       .filter((lesson) => {
//         if (!needle) return true;
//         const teacher = personName(lesson.teacher, "").toLowerCase();
//         const location = getLessonLocation(lesson).toLowerCase();
//         const vehicle = getVehicleType(lesson).toLowerCase();
//         return (
//           teacher.includes(needle) ||
//           location.includes(needle) ||
//           vehicle.includes(needle)
//         );
//       })
//       .sort((a, b) => new Date(a.lessonDate) - new Date(b.lessonDate));
//   }, [filter, lessons, search]);

//   const replaceLesson = (updatedLesson) => {
//     if (!updatedLesson?._id) return;
//     setLessons((current) =>
//       current.map((lesson) =>
//         lesson._id === updatedLesson._id ? updatedLesson : lesson,
//       ),
//     );
//   };

//   const runAction = async (lessonId, action, successMessage) => {
//     try {
//       setBusyId(lessonId);
//       setError("");
//       setMessage("");
//       const response = await action();
//       const updated = unwrap(response);
//       replaceLesson(updated);
//       setMessage(successMessage);
//       return updated;
//     } catch (actionError) {
//       setError(getErrorMessage(actionError));
//       return null;
//     } finally {
//       setBusyId("");
//     }
//   };

//   const handleAttendance = (lesson) => {
//     runAction(
//       lesson._id,
//       () => confirmAttendance(lesson._id, { status: "present" }),
//       "Your attendance has been confirmed.",
//     );
//   };

//   const handleCompletionConfirmation = (lesson) => {
//     if (
//       !window.confirm(
//         "Confirm that this lesson took place and the teacher's report is correct?",
//       )
//     )
//       return;
//     runAction(
//       lesson._id,
//       () => confirmLessonCompletion(lesson._id),
//       "Lesson completion confirmed successfully.",
//     );
//   };

//   const handleRescheduleRequest = async (lesson) => {
//     const requestedDate = window.prompt("New date (YYYY-MM-DD):");
//     if (!requestedDate) return;
//     const requestedStartTime = window.prompt(
//       "New start time (HH:MM):",
//       lesson.startTime || "10:00",
//     );
//     if (!requestedStartTime) return;
//     const requestedEndTime = window.prompt(
//       "New end time (HH:MM):",
//       lesson.endTime || "11:00",
//     );
//     if (!requestedEndTime) return;
//     const reason = window.prompt("Reason for reschedule:");
//     if (!reason?.trim()) return;

//     await runAction(
//       lesson._id,
//       () =>
//         requestLessonReschedule(lesson._id, {
//           requestedDate,
//           requestedStartTime,
//           requestedEndTime,
//           reason: reason.trim(),
//         }),
//       "Reschedule request sent to the admin.",
//     );
//   };

//   const handleCancellationRequest = async (lesson) => {
//     const reason = window.prompt("Why do you want to cancel this lesson?");
//     if (!reason?.trim()) return;
//     await runAction(
//       lesson._id,
//       () => requestLessonCancellation(lesson._id, { reason: reason.trim() }),
//       "Cancellation request sent to the admin.",
//     );
//   };

//   const openFeedback = (lesson) => {
//     setFeedbackLesson(lesson);
//     setFeedback({
//       rating: lesson.lessonProgress?.rating || 5,
//       studentNotes: lesson.lessonProgress?.studentNotes || "",
//     });
//     setError("");
//     setMessage("");
//   };

//   const handleFeedbackSubmit = async (event) => {
//     event.preventDefault();
//     if (!feedbackLesson) return;
//     const updated = await runAction(
//       feedbackLesson._id,
//       () =>
//         submitLessonFeedback(feedbackLesson._id, {
//           rating: Number(feedback.rating),
//           studentNotes: feedback.studentNotes.trim(),
//         }),
//       "Thank you. Your feedback has been saved.",
//     );

//     if (updated) setFeedbackLesson(null);
//   };

//   const LessonDetails = ({ lesson }) => (
//     <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-4">
//       <p>
//         <span className="font-semibold text-slate-800">Date:</span>{" "}
//         {formatLessonDate(lesson.lessonDate)}
//       </p>
//       <p>
//         <span className="font-semibold text-slate-800">Time:</span>{" "}
//         {lesson.startTime}–{lesson.endTime}
//       </p>
//       <p>
//         <span className="font-semibold text-slate-800">Vehicle:</span>{" "}
//         {getVehicleType(lesson)}
//       </p>
//       <p>
//         <span className="font-semibold text-slate-800">Location:</span>{" "}
//         {getLessonLocation(lesson)}
//       </p>
//     </div>
//   );

//   return (
//     <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl space-y-6">
//         <header className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
//               Student dashboard
//             </p>
//             <h1 className="mt-1 text-3xl font-bold text-slate-900">
//               My driving lessons
//             </h1>
//             <p className="mt-2 text-sm text-slate-600">
//               View schedules, confirm attendance, read progress reports and rate
//               completed lessons.
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={loadLessons}
//             className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
//           >
//             Refresh
//           </button>
//         </header>

//         {nextLesson && (
//           <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-white shadow-lg">
//             <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//               <div>
//                 <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
//                   Next lesson
//                 </p>
//                 <h2 className="mt-2 text-3xl font-bold">
//                   {formatLessonDate(nextLesson.lessonDate)}
//                 </h2>
//                 <p className="mt-2 text-lg text-slate-200">
//                   {nextLesson.startTime}–{nextLesson.endTime}
//                 </p>
//                 <p className="mt-3 text-sm text-slate-300">
//                   Teacher:{" "}
//                   <strong className="text-white">
//                     {personName(nextLesson.teacher, "Teacher")}
//                   </strong>
//                 </p>
//               </div>
//               <div className="rounded-2xl bg-white/10 p-5 text-sm backdrop-blur-sm lg:min-w-80">
//                 <p>
//                   <span className="font-semibold">Vehicle:</span>{" "}
//                   {getVehicleType(nextLesson)}
//                 </p>
//                 <p className="mt-2">
//                   <span className="font-semibold">Location:</span>{" "}
//                   {getLessonLocation(nextLesson)}
//                 </p>
//                 <span
//                   className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusClass(nextLesson.status)}`}
//                 >
//                   {statusLabel(nextLesson.status)}
//                 </span>
//               </div>
//             </div>
//           </section>
//         )}

//         <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//           {[
//             ["Total lessons", stats.total],
//             ["Scheduled", stats.scheduled],
//             ["Awaiting confirmation", stats.awaiting],
//             ["Completed", stats.completed],
//           ].map(([label, value]) => (
//             <article key={label} className="rounded-2xl bg-white p-5 shadow-sm">
//               <p className="text-sm text-slate-500">{label}</p>
//               <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
//             </article>
//           ))}
//         </section>

//         {(message || error) && (
//           <div
//             className={`rounded-xl border px-4 py-3 text-sm ${
//               error
//                 ? "border-rose-200 bg-rose-50 text-rose-700"
//                 : "border-emerald-200 bg-emerald-50 text-emerald-700"
//             }`}
//           >
//             {error || message}
//           </div>
//         )}

//         <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
//           <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex flex-wrap gap-2">
//               {FILTERS.map((item) => (
//                 <button
//                   key={item.key}
//                   type="button"
//                   onClick={() => setFilter(item.key)}
//                   className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
//                     filter === item.key
//                       ? "bg-slate-900 text-white"
//                       : "bg-slate-100 text-slate-700 hover:bg-slate-200"
//                   }`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>
//             <input
//               value={search}
//               onChange={(event) => setSearch(event.target.value)}
//               placeholder="Search teacher, vehicle or location"
//               className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500 lg:max-w-sm"
//             />
//           </div>

//           <div className="mt-6 space-y-4">
//             {loading ? (
//               <div className="py-16 text-center text-slate-500">
//                 Loading lessons...
//               </div>
//             ) : filteredLessons.length === 0 ? (
//               <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">
//                 <p className="font-semibold text-slate-700">No lessons found</p>
//                 <p className="mt-1 text-sm text-slate-500">
//                   There are no lessons in this section yet.
//                 </p>
//               </div>
//             ) : (
//               filteredLessons.map((lesson) => {
//                 const isBusy = busyId === lesson._id;
//                 const studentAttendance =
//                   lesson.attendance?.studentStatus ||
//                   (lesson.attendance?.studentConfirmed ? "present" : "pending");
//                 const feedbackAdded = Boolean(lesson.lessonProgress?.rating);

//                 return (
//                   <article
//                     key={lesson._id}
//                     className="rounded-2xl border border-slate-200 p-5"
//                   >
//                     <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
//                       <div className="min-w-0 flex-1">
//                         <div className="flex flex-wrap items-center gap-2">
//                           <h2 className="text-xl font-bold text-slate-900">
//                             {personName(lesson.teacher, "Driving teacher")}
//                           </h2>
//                           <span
//                             className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(lesson.status)}`}
//                           >
//                             {statusLabel(lesson.status)}
//                           </span>
//                         </div>

//                         <LessonDetails lesson={lesson} />

//                         <div className="mt-4 flex flex-wrap gap-2 text-xs">
//                           <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700">
//                             Your attendance:{" "}
//                             <strong>{studentAttendance}</strong>
//                           </span>
//                           {lesson.rescheduleRequest?.status === "pending" && (
//                             <span className="rounded-full bg-amber-100 px-3 py-1.5 font-semibold text-amber-700">
//                               Reschedule request pending
//                             </span>
//                           )}
//                           {lesson.cancellationRequest?.status === "pending" && (
//                             <span className="rounded-full bg-rose-100 px-3 py-1.5 font-semibold text-rose-700">
//                               Cancellation request pending
//                             </span>
//                           )}
//                           {feedbackAdded && (
//                             <span className="rounded-full bg-yellow-100 px-3 py-1.5 font-semibold text-yellow-700">
//                               Your rating: {lesson.lessonProgress.rating}/5
//                             </span>
//                           )}
//                         </div>

//                         {lesson.lessonProgress?.teacherNotes && (
//                           <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
//                             <p className="font-semibold text-slate-900">
//                               Teacher&apos;s progress report
//                             </p>
//                             <p className="mt-2 whitespace-pre-wrap">
//                               {lesson.lessonProgress.teacherNotes}
//                             </p>
//                             {!!lesson.lessonProgress.skillsCovered?.length && (
//                               <p className="mt-3 text-xs text-slate-500">
//                                 <strong>Skills covered:</strong>{" "}
//                                 {lesson.lessonProgress.skillsCovered.join(", ")}
//                               </p>
//                             )}
//                             {lesson.lessonProgress.areasToImprove && (
//                               <p className="mt-2 text-xs text-slate-500">
//                                 <strong>Areas to improve:</strong>{" "}
//                                 {Array.isArray(
//                                   lesson.lessonProgress.areasToImprove,
//                                 )
//                                   ? lesson.lessonProgress.areasToImprove.join(
//                                       ", ",
//                                     )
//                                   : lesson.lessonProgress.areasToImprove}
//                               </p>
//                             )}
//                             {lesson.lessonProgress.nextLessonRecommendation && (
//                               <p className="mt-2 text-xs text-slate-500">
//                                 <strong>Next lesson:</strong>{" "}
//                                 {lesson.lessonProgress.nextLessonRecommendation}
//                               </p>
//                             )}
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex w-full flex-wrap gap-2 xl:w-64 xl:justify-end">
//                         {lesson.status === "scheduled" && (
//                           <>
//                             <button
//                               type="button"
//                               disabled={
//                                 isBusy ||
//                                 lesson.rescheduleRequest?.status === "pending"
//                               }
//                               onClick={() => handleRescheduleRequest(lesson)}
//                               className="rounded-xl border border-blue-300 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 disabled:opacity-50"
//                             >
//                               Request reschedule
//                             </button>
//                             <button
//                               type="button"
//                               disabled={
//                                 isBusy ||
//                                 lesson.cancellationRequest?.status === "pending"
//                               }
//                               onClick={() => handleCancellationRequest(lesson)}
//                               className="rounded-xl border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-50"
//                             >
//                               Request cancellation
//                             </button>
//                           </>
//                         )}

//                         {["in_progress", "awaiting_confirmation"].includes(
//                           lesson.status,
//                         ) &&
//                           !lesson.attendance?.studentConfirmed && (
//                             <button
//                               type="button"
//                               disabled={isBusy}
//                               onClick={() => handleAttendance(lesson)}
//                               className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
//                             >
//                               Confirm attendance
//                             </button>
//                           )}

//                         {lesson.status === "awaiting_confirmation" && (
//                           <button
//                             type="button"
//                             disabled={isBusy}
//                             onClick={() => handleCompletionConfirmation(lesson)}
//                             className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
//                           >
//                             Confirm completion
//                           </button>
//                         )}

//                         {["awaiting_confirmation", "completed"].includes(
//                           lesson.status,
//                         ) && (
//                           <button
//                             type="button"
//                             disabled={isBusy}
//                             onClick={() => openFeedback(lesson)}
//                             className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
//                           >
//                             {feedbackAdded ? "Update feedback" : "Rate lesson"}
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </article>
//                 );
//               })
//             )}
//           </div>
//         </section>
//       </div>

//       {feedbackLesson && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
//           <form
//             onSubmit={handleFeedbackSubmit}
//             className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
//           >
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
//                   Lesson feedback
//                 </p>
//                 <h2 className="mt-1 text-2xl font-bold text-slate-900">
//                   {personName(feedbackLesson.teacher, "Driving teacher")}
//                 </h2>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setFeedbackLesson(null)}
//                 className="rounded-lg px-3 py-1 text-xl text-slate-500 hover:bg-slate-100"
//               >
//                 ×
//               </button>
//             </div>

//             <label className="mt-6 block text-sm font-semibold text-slate-700">
//               Rating
//               <select
//                 value={feedback.rating}
//                 onChange={(event) =>
//                   setFeedback((current) => ({
//                     ...current,
//                     rating: Number(event.target.value),
//                   }))
//                 }
//                 className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-orange-500"
//               >
//                 <option value={5}>5 — Excellent</option>
//                 <option value={4}>4 — Very good</option>
//                 <option value={3}>3 — Good</option>
//                 <option value={2}>2 — Fair</option>
//                 <option value={1}>1 — Poor</option>
//               </select>
//             </label>

//             <label className="mt-4 block text-sm font-semibold text-slate-700">
//               Your comments
//               <textarea
//                 value={feedback.studentNotes}
//                 onChange={(event) =>
//                   setFeedback((current) => ({
//                     ...current,
//                     studentNotes: event.target.value,
//                   }))
//                 }
//                 rows={5}
//                 placeholder="Tell us about the lesson and your teacher."
//                 className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-orange-500"
//               />
//             </label>

//             <div className="mt-6 flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => setFeedbackLesson(null)}
//                 className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={busyId === feedbackLesson._id}
//                 className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
//               >
//                 {busyId === feedbackLesson._id ? "Saving..." : "Save feedback"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </main>
//   );
// }

"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  confirmAttendance,
  confirmLessonCompletion,
  getLessons,
  requestLessonCancellation,
  requestLessonReschedule,
  submitLessonFeedback,
} from "@/features/API";
import {
  formatLessonDate,
  getErrorMessage,
  getLessonLocation,
  getVehicleType,
  requestLabel,
  statusClass,
  statusLabel,
  toDateInput,
  unwrap,
} from "@/features/lessonHelpers";

const FILTERS = [
  { key: "upcoming", label: "Upcoming" },
  { key: "active", label: "In progress" },
  { key: "awaiting", label: "Awaiting confirmation" },
  { key: "completed", label: "Completed" },
  { key: "closed", label: "Cancelled / No-show" },
  { key: "all", label: "All lessons" },
];

const emptyReschedule = {
  lessonDate: "",
  startTime: "",
  endTime: "",
  reason: "",
};

const emptyFeedback = {
  rating: 5,
  studentNotes: "",
};

const getPersonName = (person, fallback) =>
  person?.name || person?.fullName || person?.email || fallback;

const getLessonId = (lesson) => lesson?._id || lesson?.id || "";

const getLessonsArray = (response) => {
  const data = unwrap(response, []);
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.lessons)) return data.lessons;
  return [];
};

const lessonTimestamp = (lesson) => {
  const date = new Date(lesson?.lessonDate);
  if (Number.isNaN(date.getTime())) return 0;

  const [hours = "00", minutes = "00"] = String(
    lesson?.startTime || "00:00",
  ).split(":");

  date.setHours(Number(hours), Number(minutes), 0, 0);
  return date.getTime();
};

const isStudentPresent = (lesson) =>
  lesson?.attendance?.studentStatus === "present" ||
  lesson?.attendance?.studentConfirmed === true;

const teacherReportSubmitted = (lesson) =>
  Boolean(
    lesson?.lessonProgress?.teacherSubmittedAt ||
    lesson?.lessonProgress?.teacherNotes ||
    lesson?.lessonProgress?.skillsCovered?.length,
  );

const formatPerformance = (value) =>
  ({
    not_assessed: "Not assessed",
    needs_improvement: "Needs improvement",
    satisfactory: "Satisfactory",
    good: "Good",
    excellent: "Excellent",
  })[value] ||
  value ||
  "Not assessed";

function Notice({ notice, onClose }) {
  if (!notice?.text) return null;

  const tone =
    notice.type === "error"
      ? "border-rose-200 bg-rose-50 text-rose-700"
      : "border-emerald-200 bg-emerald-50 text-emerald-700";

  return (
    <div
      className={`mb-5 flex items-start justify-between gap-4 rounded-xl border px-4 py-3 text-sm ${tone}`}
    >
      <span>{notice.text}</span>
      <button
        type="button"
        className="font-bold"
        onClick={onClose}
        aria-label="Close message"
      >
        ×
      </button>
    </div>
  );
}

function ModalShell({ title, children, onClose, maxWidth = "max-w-lg" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div
        className={`max-h-[92vh] w-full overflow-y-auto rounded-2xl bg-white shadow-2xl ${maxWidth}`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-2xl leading-none text-slate-500 hover:bg-slate-100"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function RequestSummary({ lesson }) {
  const reschedule = lesson?.rescheduleRequest;
  const cancellation = lesson?.cancellationRequest;

  if (
    (!reschedule || reschedule.status === "none") &&
    (!cancellation || cancellation.status === "none")
  ) {
    return null;
  }

  return (
    <div className="mt-4 grid gap-3 md:grid-cols-2">
      {reschedule?.status && reschedule.status !== "none" && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
          <p className="font-semibold text-slate-800">
            Reschedule: {requestLabel(reschedule.status)}
          </p>
          {reschedule.requestedDate && (
            <p className="mt-1 text-slate-600">
              Requested: {formatLessonDate(reschedule.requestedDate)}{" "}
              {reschedule.startTime || ""}–{reschedule.endTime || ""}
            </p>
          )}
          {reschedule.reason && (
            <p className="mt-1 text-slate-600">Reason: {reschedule.reason}</p>
          )}
          {reschedule.adminNote && (
            <p className="mt-1 text-slate-600">
              Admin note: {reschedule.adminNote}
            </p>
          )}
        </div>
      )}

      {cancellation?.status && cancellation.status !== "none" && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
          <p className="font-semibold text-slate-800">
            Cancellation: {requestLabel(cancellation.status)}
          </p>
          {cancellation.reason && (
            <p className="mt-1 text-slate-600">Reason: {cancellation.reason}</p>
          )}
          {cancellation.adminNote && (
            <p className="mt-1 text-slate-600">
              Admin note: {cancellation.adminNote}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function StudentLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [filter, setFilter] = useState("upcoming");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [notice, setNotice] = useState(null);

  const [rescheduleLesson, setRescheduleLesson] = useState(null);
  const [rescheduleForm, setRescheduleForm] = useState(emptyReschedule);

  const [cancellationLesson, setCancellationLesson] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");

  const [completionLesson, setCompletionLesson] = useState(null);

  const [feedbackLesson, setFeedbackLesson] = useState(null);
  const [feedbackForm, setFeedbackForm] = useState(emptyFeedback);

  const loadLessons = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getLessons({ limit: 200 });
      setLessons(getLessonsArray(response));
    } catch (error) {
      setNotice({
        type: "error",
        text: getErrorMessage(error, "Could not load your lessons."),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLessons();
  }, [loadLessons]);

  const replaceLesson = (updatedLesson) => {
    const updatedId = getLessonId(updatedLesson);
    if (!updatedId) return;

    setLessons((current) =>
      current.map((lesson) =>
        getLessonId(lesson) === updatedId ? updatedLesson : lesson,
      ),
    );
  };

  const runLessonAction = async ({ lesson, action, successMessage, close }) => {
    const lessonId = getLessonId(lesson);
    if (!lessonId) return;

    setBusyId(lessonId);
    setNotice(null);

    try {
      const response = await action();
      const updatedLesson = unwrap(response);
      if (updatedLesson) replaceLesson(updatedLesson);

      setNotice({
        type: "success",
        text:
          response?.data?.message ||
          successMessage ||
          "The lesson was updated successfully.",
      });

      close?.();
    } catch (error) {
      setNotice({
        type: "error",
        text: getErrorMessage(error, "The action could not be completed."),
      });
    } finally {
      setBusyId("");
    }
  };

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    const now = Date.now();

    const matchesFilter = (lesson) => {
      if (filter === "all") return true;

      if (filter === "upcoming") {
        return (
          lesson.status === "scheduled" &&
          lessonTimestamp(lesson) >= now - 24 * 60 * 60 * 1000
        );
      }

      if (filter === "active") return lesson.status === "in_progress";
      if (filter === "awaiting")
        return lesson.status === "awaiting_confirmation";
      if (filter === "completed") return lesson.status === "completed";
      if (filter === "closed")
        return ["cancelled", "no_show"].includes(lesson.status);

      return true;
    };

    const matchesSearch = (lesson) => {
      if (!query) return true;

      const haystack = [
        getPersonName(lesson.teacher, ""),
        lesson.booking?.offer?.title,
        getLessonLocation(lesson),
        getVehicleType(lesson),
        lesson.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    };

    return [...lessons]
      .filter((lesson) => matchesFilter(lesson) && matchesSearch(lesson))
      .sort((a, b) => {
        const aTime = lessonTimestamp(a);
        const bTime = lessonTimestamp(b);

        if (["completed", "closed", "all"].includes(filter)) {
          return bTime - aTime;
        }

        return aTime - bTime;
      });
  }, [filter, lessons, search]);

  const counts = useMemo(
    () => ({
      upcoming: lessons.filter((lesson) => lesson.status === "scheduled")
        .length,
      active: lessons.filter((lesson) => lesson.status === "in_progress")
        .length,
      awaiting: lessons.filter(
        (lesson) => lesson.status === "awaiting_confirmation",
      ).length,
      completed: lessons.filter((lesson) => lesson.status === "completed")
        .length,
      closed: lessons.filter((lesson) =>
        ["cancelled", "no_show"].includes(lesson.status),
      ).length,
      all: lessons.length,
    }),
    [lessons],
  );

  const openReschedule = (lesson) => {
    setRescheduleLesson(lesson);
    setRescheduleForm({
      lessonDate: toDateInput(lesson.lessonDate),
      startTime: lesson.startTime || "",
      endTime: lesson.endTime || "",
      reason: "",
    });
  };

  const submitReschedule = (event) => {
    event.preventDefault();
    if (!rescheduleLesson) return;

    runLessonAction({
      lesson: rescheduleLesson,
      action: () =>
        requestLessonReschedule(getLessonId(rescheduleLesson), {
          lessonDate: rescheduleForm.lessonDate,
          startTime: rescheduleForm.startTime,
          endTime: rescheduleForm.endTime,
          reason: rescheduleForm.reason.trim(),
        }),
      successMessage: "Your reschedule request was sent to the admin.",
      close: () => {
        setRescheduleLesson(null);
        setRescheduleForm(emptyReschedule);
      },
    });
  };

  const submitCancellation = (event) => {
    event.preventDefault();
    if (!cancellationLesson) return;

    runLessonAction({
      lesson: cancellationLesson,
      action: () =>
        requestLessonCancellation(getLessonId(cancellationLesson), {
          reason: cancellationReason.trim(),
        }),
      successMessage: "Your cancellation request was sent to the admin.",
      close: () => {
        setCancellationLesson(null);
        setCancellationReason("");
      },
    });
  };

  const confirmMyAttendance = (lesson) => {
    runLessonAction({
      lesson,
      action: () =>
        confirmAttendance(getLessonId(lesson), {
          status: "present",
        }),
      successMessage: "Your attendance was confirmed.",
    });
  };

  const confirmCompletion = () => {
    if (!completionLesson) return;

    runLessonAction({
      lesson: completionLesson,
      action: () => confirmLessonCompletion(getLessonId(completionLesson)),
      successMessage: "Lesson completion was confirmed.",
      close: () => setCompletionLesson(null),
    });
  };

  const submitFeedback = (event) => {
    event.preventDefault();
    if (!feedbackLesson) return;

    runLessonAction({
      lesson: feedbackLesson,
      action: () =>
        submitLessonFeedback(getLessonId(feedbackLesson), {
          rating: Number(feedbackForm.rating),
          studentNotes: feedbackForm.studentNotes.trim(),
        }),
      successMessage: "Thank you. Your feedback was submitted.",
      close: () => {
        setFeedbackLesson(null);
        setFeedbackForm(emptyFeedback);
      },
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Student dashboard
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              My driving lessons
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Confirm attendance after the teacher starts the lesson. When the
              teacher submits the report, review it and confirm completion.
            </p>
          </div>

          <button
            type="button"
            onClick={loadLessons}
            disabled={loading}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Refreshing..." : "Refresh lessons"}
          </button>
        </div>

        <Notice notice={notice} onClose={() => setNotice(null)} />

        <section className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {FILTERS.map((item) => (
            <button
              type="button"
              key={item.key}
              onClick={() => setFilter(item.key)}
              className={`rounded-xl border p-3 text-left transition ${
                filter === item.key
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <span className="block text-xl font-bold text-slate-900">
                {counts[item.key] || 0}
              </span>
              <span className="mt-1 block text-xs font-medium text-slate-600">
                {item.label}
              </span>
            </button>
          ))}
        </section>

        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-3">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by teacher, location, vehicle or status..."
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-600">
            Loading lessons...
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <h2 className="text-lg font-bold text-slate-800">
              No lessons found
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Try another filter or clear the search box.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLessons.map((lesson) => {
              const lessonId = getLessonId(lesson);
              const busy = busyId === lessonId;
              const studentPresent = isStudentPresent(lesson);
              const reportSubmitted = teacherReportSubmitted(lesson);
              const reschedulePending =
                lesson.rescheduleRequest?.status === "pending";
              const cancellationPending =
                lesson.cancellationRequest?.status === "pending";
              const feedbackSubmitted = Boolean(
                lesson.lessonProgress?.feedbackSubmittedAt,
              );

              return (
                <article
                  key={lessonId}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 md:flex-row md:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(
                            lesson.status,
                          )}`}
                        >
                          {statusLabel(lesson.status)}
                        </span>
                        {studentPresent && (
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                            Attendance confirmed
                          </span>
                        )}
                      </div>

                      <h2 className="mt-3 text-xl font-bold text-slate-900">
                        {lesson.booking?.offer?.title || "Driving lesson"}
                      </h2>
                      <p className="mt-1 text-sm text-slate-600">
                        Teacher:{" "}
                        <span className="font-semibold text-slate-800">
                          {getPersonName(
                            lesson.teacher,
                            "Teacher not assigned",
                          )}
                        </span>
                      </p>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="font-bold text-slate-900">
                        {formatLessonDate(lesson.lessonDate)}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {lesson.startTime || "Time not set"}–
                        {lesson.endTime || "Time not set"}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 p-5 md:grid-cols-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Location
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {getLessonLocation(lesson)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Vehicle
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {getVehicleType(lesson)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Duration
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {lesson.duration
                          ? `${lesson.duration} minutes`
                          : "Not set"}
                      </p>
                    </div>
                  </div>

                  {lesson.status === "awaiting_confirmation" && (
                    <div className="mx-5 mb-5 rounded-xl border border-violet-200 bg-violet-50 p-4">
                      <p className="font-bold text-violet-900">
                        Teacher report is ready
                      </p>
                      <p className="mt-1 text-sm text-violet-700">
                        Review the report in lesson details, confirm your
                        attendance if needed, then confirm completion.
                      </p>

                      {lesson.lessonProgress?.teacherNotes && (
                        <p className="mt-3 rounded-lg bg-white/80 p-3 text-sm text-slate-700">
                          {lesson.lessonProgress.teacherNotes}
                        </p>
                      )}

                      <p className="mt-3 text-xs font-semibold text-violet-800">
                        Performance:{" "}
                        {formatPerformance(lesson.lessonProgress?.performance)}
                      </p>
                    </div>
                  )}

                  <RequestSummary lesson={lesson} />

                  <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4">
                    <Link
                      href={`/student/lessons/${lessonId}`}
                      className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                    >
                      View details
                    </Link>

                    {lesson.status === "in_progress" && !studentPresent && (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => confirmMyAttendance(lesson)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {busy ? "Saving..." : "Confirm attendance"}
                      </button>
                    )}

                    {lesson.status === "awaiting_confirmation" &&
                      !studentPresent && (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => confirmMyAttendance(lesson)}
                          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {busy ? "Saving..." : "Confirm attendance first"}
                        </button>
                      )}

                    {lesson.status === "awaiting_confirmation" &&
                      reportSubmitted && (
                        <button
                          type="button"
                          disabled={busy || !studentPresent}
                          onClick={() => setCompletionLesson(lesson)}
                          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                          title={
                            studentPresent
                              ? "Confirm lesson completion"
                              : "Confirm attendance before completion"
                          }
                        >
                          Confirm completion
                        </button>
                      )}

                    {lesson.status === "scheduled" && (
                      <>
                        <button
                          type="button"
                          disabled={
                            busy || reschedulePending || cancellationPending
                          }
                          onClick={() => openReschedule(lesson)}
                          className="rounded-lg border border-blue-300 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {reschedulePending
                            ? "Reschedule pending"
                            : "Request reschedule"}
                        </button>

                        <button
                          type="button"
                          disabled={
                            busy || cancellationPending || reschedulePending
                          }
                          onClick={() => {
                            setCancellationLesson(lesson);
                            setCancellationReason("");
                          }}
                          className="rounded-lg border border-rose-300 bg-white px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {cancellationPending
                            ? "Cancellation pending"
                            : "Request cancellation"}
                        </button>
                      </>
                    )}

                    {lesson.status === "completed" && (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => {
                          setFeedbackLesson(lesson);
                          setFeedbackForm({
                            rating: lesson.lessonProgress?.rating || 5,
                            studentNotes:
                              lesson.lessonProgress?.studentNotes || "",
                          });
                        }}
                        className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {feedbackSubmitted ? "Edit feedback" : "Give feedback"}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {rescheduleLesson && (
        <ModalShell
          title="Request lesson reschedule"
          onClose={() => setRescheduleLesson(null)}
        >
          <form onSubmit={submitReschedule} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
                Requested date
                <input
                  type="date"
                  required
                  value={rescheduleForm.lessonDate}
                  onChange={(event) =>
                    setRescheduleForm((current) => ({
                      ...current,
                      lessonDate: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                />
              </label>

              <label className="text-sm font-semibold text-slate-700">
                Start time
                <input
                  type="time"
                  required
                  value={rescheduleForm.startTime}
                  onChange={(event) =>
                    setRescheduleForm((current) => ({
                      ...current,
                      startTime: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                />
              </label>

              <label className="text-sm font-semibold text-slate-700">
                End time
                <input
                  type="time"
                  required
                  value={rescheduleForm.endTime}
                  onChange={(event) =>
                    setRescheduleForm((current) => ({
                      ...current,
                      endTime: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                />
              </label>
            </div>

            <label className="block text-sm font-semibold text-slate-700">
              Reason
              <textarea
                required
                rows={4}
                value={rescheduleForm.reason}
                onChange={(event) =>
                  setRescheduleForm((current) => ({
                    ...current,
                    reason: event.target.value,
                  }))
                }
                placeholder="Explain why you need a different schedule."
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
              />
            </label>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRescheduleLesson(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={busyId === getLessonId(rescheduleLesson)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {busyId === getLessonId(rescheduleLesson)
                  ? "Submitting..."
                  : "Submit request"}
              </button>
            </div>
          </form>
        </ModalShell>
      )}

      {cancellationLesson && (
        <ModalShell
          title="Request lesson cancellation"
          onClose={() => setCancellationLesson(null)}
        >
          <form onSubmit={submitCancellation} className="space-y-4">
            <p className="text-sm text-slate-600">
              The admin will review this request. The lesson remains scheduled
              until the request is approved.
            </p>

            <label className="block text-sm font-semibold text-slate-700">
              Cancellation reason
              <textarea
                required
                rows={5}
                value={cancellationReason}
                onChange={(event) => setCancellationReason(event.target.value)}
                placeholder="Write a clear reason."
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-rose-500"
              />
            </label>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setCancellationLesson(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={busyId === getLessonId(cancellationLesson)}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {busyId === getLessonId(cancellationLesson)
                  ? "Submitting..."
                  : "Submit request"}
              </button>
            </div>
          </form>
        </ModalShell>
      )}

      {completionLesson && (
        <ModalShell
          title="Confirm lesson completion"
          onClose={() => setCompletionLesson(null)}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-800">Teacher report</p>
              <p className="mt-2 text-sm text-slate-700">
                {completionLesson.lessonProgress?.teacherNotes ||
                  "No teacher note was provided."}
              </p>

              {!!completionLesson.lessonProgress?.skillsCovered?.length && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {completionLesson.lessonProgress.skillsCovered.map(
                    (skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700"
                      >
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              )}
            </div>

            <p className="text-sm text-slate-600">
              Confirm only after the lesson took place and the report is
              accurate. This action changes the lesson status to Completed.
            </p>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setCompletionLesson(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Not yet
              </button>
              <button
                type="button"
                onClick={confirmCompletion}
                disabled={busyId === getLessonId(completionLesson)}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {busyId === getLessonId(completionLesson)
                  ? "Confirming..."
                  : "Yes, confirm completion"}
              </button>
            </div>
          </div>
        </ModalShell>
      )}

      {feedbackLesson && (
        <ModalShell
          title="Lesson feedback"
          onClose={() => setFeedbackLesson(null)}
        >
          <form onSubmit={submitFeedback} className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">
              Rating
              <select
                value={feedbackForm.rating}
                onChange={(event) =>
                  setFeedbackForm((current) => ({
                    ...current,
                    rating: Number(event.target.value),
                  }))
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-amber-500"
              >
                <option value={5}>5 — Excellent</option>
                <option value={4}>4 — Very good</option>
                <option value={3}>3 — Good</option>
                <option value={2}>2 — Fair</option>
                <option value={1}>1 — Poor</option>
              </select>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Comments
              <textarea
                rows={5}
                value={feedbackForm.studentNotes}
                onChange={(event) =>
                  setFeedbackForm((current) => ({
                    ...current,
                    studentNotes: event.target.value,
                  }))
                }
                placeholder="Share your lesson experience."
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-amber-500"
              />
            </label>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setFeedbackLesson(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={busyId === getLessonId(feedbackLesson)}
                className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {busyId === getLessonId(feedbackLesson)
                  ? "Saving..."
                  : "Save feedback"}
              </button>
            </div>
          </form>
        </ModalShell>
      )}
    </main>
  );
}
