// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   completeLesson,
//   confirmAttendance,
//   getLessons,
//   markLessonNoShow,
//   requestLessonCancellation,
//   requestLessonReschedule,
//   startLesson,
// } from "@/features/API";
// import {
//   DRIVING_SKILLS,
//   formatLessonDate,
//   getErrorMessage,
//   getLessonLocation,
//   getVehicleType,
//   requestLabel,
//   statusClass,
//   statusLabel,
//   toDateInput,
//   unwrap,
// } from "@/features/lessonHelpers";

// const FILTERS = [
//   { key: "today", label: "Today" },
//   { key: "upcoming", label: "Upcoming" },
//   { key: "active", label: "In progress" },
//   { key: "awaiting", label: "Waiting for student" },
//   { key: "completed", label: "Completed" },
//   { key: "closed", label: "Cancelled / No-show" },
//   { key: "all", label: "All lessons" },
// ];

// const emptyReschedule = {
//   lessonDate: "",
//   startTime: "",
//   endTime: "",
//   reason: "",
// };

// const emptyReport = {
//   skillsCovered: [],
//   teacherNotes: "",
//   performance: "satisfactory",
//   areasToImprove: "",
//   nextLessonRecommendation: "",
// };

// const getPersonName = (person, fallback) =>
//   person?.name || person?.fullName || person?.email || fallback;

// const getLessonId = (lesson) => lesson?._id || lesson?.id || "";

// const getLessonsArray = (response) => {
//   const data = unwrap(response, []);
//   if (Array.isArray(data)) return data;
//   if (Array.isArray(data?.lessons)) return data.lessons;
//   return [];
// };

// const lessonTimestamp = (lesson) => {
//   const date = new Date(lesson?.lessonDate);
//   if (Number.isNaN(date.getTime())) return 0;

//   const [hours = "00", minutes = "00"] = String(
//     lesson?.startTime || "00:00",
//   ).split(":");

//   date.setHours(Number(hours), Number(minutes), 0, 0);
//   return date.getTime();
// };

// const isSameLocalDay = (value, comparison = new Date()) => {
//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return false;

//   return (
//     date.getFullYear() === comparison.getFullYear() &&
//     date.getMonth() === comparison.getMonth() &&
//     date.getDate() === comparison.getDate()
//   );
// };

// const getStartState = (lesson, now = Date.now()) => {
//   const startAt = lessonTimestamp(lesson);
//   if (!startAt) {
//     return {
//       allowed: false,
//       message: "Lesson time is not valid.",
//     };
//   }

//   const availableAt = startAt - 30 * 60 * 1000;
//   if (now < availableAt) {
//     return {
//       allowed: false,
//       message: `Start becomes available at ${new Date(
//         availableAt,
//       ).toLocaleString([], {
//         dateStyle: "medium",
//         timeStyle: "short",
//       })}.`,
//     };
//   }

//   return {
//     allowed: true,
//     message: "Lesson can be started now.",
//   };
// };

// const teacherPresent = (lesson) =>
//   lesson?.attendance?.teacherStatus === "present" ||
//   lesson?.attendance?.teacherConfirmed === true;

// const studentPresent = (lesson) =>
//   lesson?.attendance?.studentStatus === "present" ||
//   lesson?.attendance?.studentConfirmed === true;

// const formatPerformance = (value) =>
//   ({
//     not_assessed: "Not assessed",
//     needs_improvement: "Needs improvement",
//     satisfactory: "Satisfactory",
//     good: "Good",
//     excellent: "Excellent",
//   })[value] ||
//   value ||
//   "Not assessed";

// function Notice({ notice, onClose }) {
//   if (!notice?.text) return null;

//   const tone =
//     notice.type === "error"
//       ? "border-rose-200 bg-rose-50 text-rose-700"
//       : "border-emerald-200 bg-emerald-50 text-emerald-700";

//   return (
//     <div
//       className={`mb-5 flex items-start justify-between gap-4 rounded-xl border px-4 py-3 text-sm ${tone}`}
//     >
//       <span>{notice.text}</span>
//       <button
//         type="button"
//         className="font-bold"
//         onClick={onClose}
//         aria-label="Close message"
//       >
//         ×
//       </button>
//     </div>
//   );
// }

// function ModalShell({ title, children, onClose, maxWidth = "max-w-lg" }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
//       <div
//         className={`max-h-[92vh] w-full overflow-y-auto rounded-2xl bg-white shadow-2xl ${maxWidth}`}
//       >
//         <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-5 py-4">
//           <h2 className="text-lg font-bold text-slate-900">{title}</h2>
//           <button
//             type="button"
//             onClick={onClose}
//             className="rounded-lg px-3 py-1 text-2xl leading-none text-slate-500 hover:bg-slate-100"
//             aria-label="Close modal"
//           >
//             ×
//           </button>
//         </div>
//         <div className="p-5">{children}</div>
//       </div>
//     </div>
//   );
// }

// function RequestSummary({ lesson }) {
//   const reschedule = lesson?.rescheduleRequest;
//   const cancellation = lesson?.cancellationRequest;

//   if (
//     (!reschedule || reschedule.status === "none") &&
//     (!cancellation || cancellation.status === "none")
//   ) {
//     return null;
//   }

//   return (
//     <div className="mt-4 grid gap-3 md:grid-cols-2">
//       {reschedule?.status && reschedule.status !== "none" && (
//         <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
//           <p className="font-semibold text-slate-800">
//             Reschedule: {requestLabel(reschedule.status)}
//           </p>
//           {reschedule.requestedDate && (
//             <p className="mt-1 text-slate-600">
//               {formatLessonDate(reschedule.requestedDate)}{" "}
//               {reschedule.startTime || ""}–{reschedule.endTime || ""}
//             </p>
//           )}
//           {reschedule.reason && (
//             <p className="mt-1 text-slate-600">Reason: {reschedule.reason}</p>
//           )}
//           {reschedule.adminNote && (
//             <p className="mt-1 text-slate-600">
//               Admin note: {reschedule.adminNote}
//             </p>
//           )}
//         </div>
//       )}

//       {cancellation?.status && cancellation.status !== "none" && (
//         <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
//           <p className="font-semibold text-slate-800">
//             Cancellation: {requestLabel(cancellation.status)}
//           </p>
//           {cancellation.reason && (
//             <p className="mt-1 text-slate-600">Reason: {cancellation.reason}</p>
//           )}
//           {cancellation.adminNote && (
//             <p className="mt-1 text-slate-600">
//               Admin note: {cancellation.adminNote}
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default function TeacherLessonsPage() {
//   const [lessons, setLessons] = useState([]);
//   const [filter, setFilter] = useState("today");
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [busyId, setBusyId] = useState("");
//   const [notice, setNotice] = useState(null);
//   const [clock, setClock] = useState(Date.now());

//   const [startTarget, setStartTarget] = useState(null);

//   const [rescheduleLesson, setRescheduleLesson] = useState(null);
//   const [rescheduleForm, setRescheduleForm] = useState(emptyReschedule);

//   const [cancellationLesson, setCancellationLesson] = useState(null);
//   const [cancellationReason, setCancellationReason] = useState("");

//   const [noShowLesson, setNoShowLesson] = useState(null);
//   const [noShowReason, setNoShowReason] = useState("");

//   const [reportLesson, setReportLesson] = useState(null);
//   const [reportForm, setReportForm] = useState(emptyReport);

//   const loadLessons = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await getLessons({ limit: 200 });
//       setLessons(getLessonsArray(response));
//     } catch (error) {
//       setNotice({
//         type: "error",
//         text: getErrorMessage(error, "Could not load assigned lessons."),
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadLessons();
//   }, [loadLessons]);

//   useEffect(() => {
//     const timer = window.setInterval(() => setClock(Date.now()), 60 * 1000);
//     return () => window.clearInterval(timer);
//   }, []);

//   const replaceLesson = (updatedLesson) => {
//     const updatedId = getLessonId(updatedLesson);
//     if (!updatedId) return;

//     setLessons((current) =>
//       current.map((lesson) =>
//         getLessonId(lesson) === updatedId ? updatedLesson : lesson,
//       ),
//     );
//   };

//   const runLessonAction = async ({ lesson, action, successMessage, close }) => {
//     const lessonId = getLessonId(lesson);
//     if (!lessonId) return;

//     setBusyId(lessonId);
//     setNotice(null);

//     try {
//       const response = await action();
//       const updatedLesson = unwrap(response);
//       if (updatedLesson) replaceLesson(updatedLesson);

//       setNotice({
//         type: "success",
//         text:
//           response?.data?.message ||
//           successMessage ||
//           "The lesson was updated successfully.",
//       });

//       close?.();
//     } catch (error) {
//       setNotice({
//         type: "error",
//         text: getErrorMessage(error, "The action could not be completed."),
//       });
//     } finally {
//       setBusyId("");
//     }
//   };

//   const filteredLessons = useMemo(() => {
//     const query = search.trim().toLowerCase();
//     const now = new Date();

//     const matchesFilter = (lesson) => {
//       if (filter === "all") return true;

//       if (filter === "today") {
//         return (
//           isSameLocalDay(lesson.lessonDate, now) &&
//           !["cancelled", "no_show"].includes(lesson.status)
//         );
//       }

//       if (filter === "upcoming") {
//         return (
//           lesson.status === "scheduled" &&
//           lessonTimestamp(lesson) > now.getTime()
//         );
//       }

//       if (filter === "active") return lesson.status === "in_progress";
//       if (filter === "awaiting")
//         return lesson.status === "awaiting_confirmation";
//       if (filter === "completed") return lesson.status === "completed";
//       if (filter === "closed")
//         return ["cancelled", "no_show"].includes(lesson.status);

//       return true;
//     };

//     const matchesSearch = (lesson) => {
//       if (!query) return true;

//       const haystack = [
//         getPersonName(lesson.student, ""),
//         lesson.student?.phone,
//         lesson.booking?.offer?.title,
//         getLessonLocation(lesson),
//         getVehicleType(lesson),
//         lesson.status,
//       ]
//         .filter(Boolean)
//         .join(" ")
//         .toLowerCase();

//       return haystack.includes(query);
//     };

//     return [...lessons]
//       .filter((lesson) => matchesFilter(lesson) && matchesSearch(lesson))
//       .sort((a, b) => {
//         const aTime = lessonTimestamp(a);
//         const bTime = lessonTimestamp(b);

//         if (["completed", "closed", "all"].includes(filter)) {
//           return bTime - aTime;
//         }

//         return aTime - bTime;
//       });
//   }, [filter, lessons, search]);

//   const counts = useMemo(
//     () => ({
//       today: lessons.filter(
//         (lesson) =>
//           isSameLocalDay(lesson.lessonDate) &&
//           !["cancelled", "no_show"].includes(lesson.status),
//       ).length,
//       upcoming: lessons.filter((lesson) => lesson.status === "scheduled")
//         .length,
//       active: lessons.filter((lesson) => lesson.status === "in_progress")
//         .length,
//       awaiting: lessons.filter(
//         (lesson) => lesson.status === "awaiting_confirmation",
//       ).length,
//       completed: lessons.filter((lesson) => lesson.status === "completed")
//         .length,
//       closed: lessons.filter((lesson) =>
//         ["cancelled", "no_show"].includes(lesson.status),
//       ).length,
//       all: lessons.length,
//     }),
//     [lessons],
//   );

//   const openReschedule = (lesson) => {
//     setRescheduleLesson(lesson);
//     setRescheduleForm({
//       lessonDate: toDateInput(lesson.lessonDate),
//       startTime: lesson.startTime || "",
//       endTime: lesson.endTime || "",
//       reason: "",
//     });
//   };

//   const submitReschedule = (event) => {
//     event.preventDefault();
//     if (!rescheduleLesson) return;

//     runLessonAction({
//       lesson: rescheduleLesson,
//       action: () =>
//         requestLessonReschedule(getLessonId(rescheduleLesson), {
//           lessonDate: rescheduleForm.lessonDate,
//           startTime: rescheduleForm.startTime,
//           endTime: rescheduleForm.endTime,
//           reason: rescheduleForm.reason.trim(),
//         }),
//       successMessage: "The reschedule request was sent to the admin.",
//       close: () => {
//         setRescheduleLesson(null);
//         setRescheduleForm(emptyReschedule);
//       },
//     });
//   };

//   const submitCancellation = (event) => {
//     event.preventDefault();
//     if (!cancellationLesson) return;

//     runLessonAction({
//       lesson: cancellationLesson,
//       action: () =>
//         requestLessonCancellation(getLessonId(cancellationLesson), {
//           reason: cancellationReason.trim(),
//         }),
//       successMessage: "The cancellation request was sent to the admin.",
//       close: () => {
//         setCancellationLesson(null);
//         setCancellationReason("");
//       },
//     });
//   };

//   const confirmStart = () => {
//     if (!startTarget) return;

//     runLessonAction({
//       lesson: startTarget,
//       action: () => startLesson(getLessonId(startTarget)),
//       successMessage:
//         "Lesson started. Both participants can confirm attendance.",
//       close: () => setStartTarget(null),
//     });
//   };

//   const confirmTeacherAttendance = (lesson) => {
//     runLessonAction({
//       lesson,
//       action: () =>
//         confirmAttendance(getLessonId(lesson), {
//           status: "present",
//         }),
//       successMessage: "Your attendance was confirmed.",
//     });
//   };

//   const openReport = (lesson) => {
//     if (!teacherPresent(lesson)) {
//       setNotice({
//         type: "error",
//         text: "Confirm your attendance before submitting the lesson report.",
//       });
//       return;
//     }

//     setReportLesson(lesson);
//     setReportForm({
//       skillsCovered: lesson.lessonProgress?.skillsCovered || [],
//       teacherNotes: lesson.lessonProgress?.teacherNotes || "",
//       performance:
//         lesson.lessonProgress?.performance === "not_assessed"
//           ? "satisfactory"
//           : lesson.lessonProgress?.performance || "satisfactory",
//       areasToImprove: lesson.lessonProgress?.areasToImprove?.join("\n") || "",
//       nextLessonRecommendation:
//         lesson.lessonProgress?.nextLessonRecommendation || "",
//     });
//   };

//   const toggleSkill = (skill) => {
//     setReportForm((current) => ({
//       ...current,
//       skillsCovered: current.skillsCovered.includes(skill)
//         ? current.skillsCovered.filter((item) => item !== skill)
//         : [...current.skillsCovered, skill],
//     }));
//   };

//   const submitReport = (event) => {
//     event.preventDefault();
//     if (!reportLesson) return;

//     if (!reportForm.skillsCovered.length) {
//       setNotice({
//         type: "error",
//         text: "Select at least one skill covered in the lesson.",
//       });
//       return;
//     }

//     runLessonAction({
//       lesson: reportLesson,
//       action: () =>
//         completeLesson(getLessonId(reportLesson), {
//           lessonProgress: {
//             skillsCovered: reportForm.skillsCovered,
//             teacherNotes: reportForm.teacherNotes.trim(),
//             performance: reportForm.performance,
//             areasToImprove: reportForm.areasToImprove
//               .split(/\n|,/)
//               .map((item) => item.trim())
//               .filter(Boolean),
//             nextLessonRecommendation:
//               reportForm.nextLessonRecommendation.trim(),
//           },
//         }),
//       successMessage:
//         "Lesson report submitted. Waiting for student confirmation.",
//       close: () => {
//         setReportLesson(null);
//         setReportForm(emptyReport);
//       },
//     });
//   };

//   const submitNoShow = (event) => {
//     event.preventDefault();
//     if (!noShowLesson) return;

//     runLessonAction({
//       lesson: noShowLesson,
//       action: () =>
//         markLessonNoShow(getLessonId(noShowLesson), {
//           participant: "student",
//           reason: noShowReason.trim(),
//         }),
//       successMessage: "Student no-show was recorded.",
//       close: () => {
//         setNoShowLesson(null);
//         setNoShowReason("");
//       },
//     });
//   };

//   return (
//     <main className="min-h-screen bg-slate-50 px-4 py-6 md:px-8">
//       <div className="mx-auto max-w-7xl">
//         <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
//           <div>
//             <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
//               Teacher dashboard
//             </p>
//             <h1 className="mt-1 text-3xl font-bold text-slate-900">
//               Assigned lessons
//             </h1>
//             <p className="mt-2 max-w-3xl text-sm text-slate-600">
//               Start the lesson at the scheduled time, confirm your attendance,
//               submit the report, and then wait for the student to confirm
//               completion.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={loadLessons}
//             disabled={loading}
//             className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100 disabled:opacity-60"
//           >
//             {loading ? "Refreshing..." : "Refresh lessons"}
//           </button>
//         </div>

//         <Notice notice={notice} onClose={() => setNotice(null)} />

//         <section className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
//           {FILTERS.map((item) => (
//             <button
//               type="button"
//               key={item.key}
//               onClick={() => setFilter(item.key)}
//               className={`rounded-xl border p-3 text-left transition ${
//                 filter === item.key
//                   ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
//                   : "border-slate-200 bg-white hover:border-slate-300"
//               }`}
//             >
//               <span className="block text-xl font-bold text-slate-900">
//                 {counts[item.key] || 0}
//               </span>
//               <span className="mt-1 block text-xs font-medium text-slate-600">
//                 {item.label}
//               </span>
//             </button>
//           ))}
//         </section>

//         <div className="mb-5 rounded-xl border border-slate-200 bg-white p-3">
//           <input
//             type="search"
//             value={search}
//             onChange={(event) => setSearch(event.target.value)}
//             placeholder="Search student, phone, location, vehicle or status..."
//             className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//           />
//         </div>

//         {loading ? (
//           <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-600">
//             Loading assigned lessons...
//           </div>
//         ) : filteredLessons.length === 0 ? (
//           <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
//             <h2 className="text-lg font-bold text-slate-800">
//               No lessons found
//             </h2>
//             <p className="mt-2 text-sm text-slate-500">
//               Try another filter or clear the search.
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {filteredLessons.map((lesson) => {
//               const lessonId = getLessonId(lesson);
//               const busy = busyId === lessonId;
//               const teacherIsPresent = teacherPresent(lesson);
//               const studentIsPresent = studentPresent(lesson);
//               const startState = getStartState(lesson, clock);
//               const reschedulePending =
//                 lesson.rescheduleRequest?.status === "pending";
//               const cancellationPending =
//                 lesson.cancellationRequest?.status === "pending";

//               return (
//                 <article
//                   key={lessonId}
//                   className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
//                 >
//                   <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 md:flex-row md:items-start">
//                     <div>
//                       <div className="flex flex-wrap items-center gap-2">
//                         <span
//                           className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(
//                             lesson.status,
//                           )}`}
//                         >
//                           {statusLabel(lesson.status)}
//                         </span>

//                         {teacherIsPresent && (
//                           <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
//                             Teacher attendance confirmed
//                           </span>
//                         )}

//                         {studentIsPresent && (
//                           <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
//                             Student present
//                           </span>
//                         )}
//                       </div>

//                       <h2 className="mt-3 text-xl font-bold text-slate-900">
//                         {lesson.booking?.offer?.title || "Driving lesson"}
//                       </h2>
//                       <p className="mt-1 text-sm text-slate-600">
//                         Student:{" "}
//                         <span className="font-semibold text-slate-800">
//                           {getPersonName(lesson.student, "Student not found")}
//                         </span>
//                         {lesson.student?.phone
//                           ? ` · ${lesson.student.phone}`
//                           : ""}
//                       </p>
//                     </div>

//                     <div className="text-left md:text-right">
//                       <p className="font-bold text-slate-900">
//                         {formatLessonDate(lesson.lessonDate)}
//                       </p>
//                       <p className="mt-1 text-sm text-slate-600">
//                         {lesson.startTime || "Time not set"}–
//                         {lesson.endTime || "Time not set"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="grid gap-4 p-5 md:grid-cols-4">
//                     <div>
//                       <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
//                         Location
//                       </p>
//                       <p className="mt-1 text-sm font-medium text-slate-700">
//                         {getLessonLocation(lesson)}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
//                         Vehicle
//                       </p>
//                       <p className="mt-1 text-sm font-medium text-slate-700">
//                         {getVehicleType(lesson)}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
//                         Duration
//                       </p>
//                       <p className="mt-1 text-sm font-medium text-slate-700">
//                         {lesson.duration
//                           ? `${lesson.duration} minutes`
//                           : "Not set"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
//                         Student attendance
//                       </p>
//                       <p className="mt-1 text-sm font-medium capitalize text-slate-700">
//                         {lesson.attendance?.studentStatus || "pending"}
//                       </p>
//                     </div>
//                   </div>

//                   {lesson.status === "scheduled" && !startState.allowed && (
//                     <div className="mx-5 mb-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
//                       {startState.message}
//                     </div>
//                   )}

//                   {lesson.status === "awaiting_confirmation" && (
//                     <div className="mx-5 mb-5 rounded-xl border border-violet-200 bg-violet-50 p-4">
//                       <p className="font-bold text-violet-900">
//                         Waiting for student confirmation
//                       </p>
//                       <p className="mt-1 text-sm text-violet-700">
//                         Your report has been submitted. The student must review
//                         it and confirm completion.
//                       </p>
//                     </div>
//                   )}

//                   {lesson.status === "completed" && (
//                     <div className="mx-5 mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
//                       <p className="font-bold text-emerald-900">
//                         Lesson completed
//                       </p>
//                       <p className="mt-1 text-sm text-emerald-700">
//                         Performance:{" "}
//                         {formatPerformance(lesson.lessonProgress?.performance)}
//                       </p>
//                       {lesson.lessonProgress?.rating && (
//                         <p className="mt-2 text-sm font-semibold text-amber-600">
//                           Student rating:{" "}
//                           {"★".repeat(lesson.lessonProgress.rating)}
//                         </p>
//                       )}
//                       {lesson.lessonProgress?.studentNotes && (
//                         <p className="mt-2 rounded-lg bg-white/80 p-3 text-sm text-slate-700">
//                           {lesson.lessonProgress.studentNotes}
//                         </p>
//                       )}
//                     </div>
//                   )}

//                   <RequestSummary lesson={lesson} />

//                   <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4">
//                     {lesson.status === "scheduled" && (
//                       <>
//                         <button
//                           type="button"
//                           onClick={() => setStartTarget(lesson)}
//                           disabled={
//                             busy ||
//                             !startState.allowed ||
//                             reschedulePending ||
//                             cancellationPending
//                           }
//                           title={startState.message}
//                           className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
//                         >
//                           Start lesson
//                         </button>

//                         <button
//                           type="button"
//                           onClick={() => openReschedule(lesson)}
//                           disabled={
//                             busy || reschedulePending || cancellationPending
//                           }
//                           className="rounded-lg border border-blue-300 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 disabled:opacity-50"
//                         >
//                           {reschedulePending
//                             ? "Reschedule pending"
//                             : "Request reschedule"}
//                         </button>

//                         <button
//                           type="button"
//                           onClick={() => {
//                             setCancellationLesson(lesson);
//                             setCancellationReason("");
//                           }}
//                           disabled={
//                             busy || cancellationPending || reschedulePending
//                           }
//                           className="rounded-lg border border-rose-300 bg-white px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-50"
//                         >
//                           {cancellationPending
//                             ? "Cancellation pending"
//                             : "Request cancellation"}
//                         </button>
//                       </>
//                     )}

//                     {lesson.status === "in_progress" && !teacherIsPresent && (
//                       <button
//                         type="button"
//                         onClick={() => confirmTeacherAttendance(lesson)}
//                         disabled={busy}
//                         className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
//                       >
//                         {busy ? "Saving..." : "Confirm my attendance"}
//                       </button>
//                     )}

//                     {lesson.status === "in_progress" && (
//                       <>
//                         <button
//                           type="button"
//                           onClick={() => openReport(lesson)}
//                           disabled={busy || !teacherIsPresent}
//                           title={
//                             teacherIsPresent
//                               ? "Submit lesson report"
//                               : "Confirm your attendance first"
//                           }
//                           className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
//                         >
//                           Complete & submit report
//                         </button>

//                         <button
//                           type="button"
//                           onClick={() => {
//                             setNoShowLesson(lesson);
//                             setNoShowReason("");
//                           }}
//                           disabled={busy}
//                           className="rounded-lg border border-rose-300 bg-white px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-50"
//                         >
//                           Mark student no-show
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </article>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {startTarget && (
//         <ModalShell title="Start lesson" onClose={() => setStartTarget(null)}>
//           <div className="space-y-4">
//             <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
//               <p className="font-bold text-slate-900">
//                 {getPersonName(startTarget.student, "Student")}
//               </p>
//               <p className="mt-1">
//                 {formatLessonDate(startTarget.lessonDate)} ·{" "}
//                 {startTarget.startTime}–{startTarget.endTime}
//               </p>
//               <p className="mt-1">{getLessonLocation(startTarget)}</p>
//             </div>

//             <p className="text-sm text-slate-600">
//               Starting the lesson changes its status to In progress and allows
//               both participants to confirm attendance.
//             </p>

//             <div className="flex justify-end gap-2">
//               <button
//                 type="button"
//                 onClick={() => setStartTarget(null)}
//                 className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 onClick={confirmStart}
//                 disabled={busyId === getLessonId(startTarget)}
//                 className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
//               >
//                 {busyId === getLessonId(startTarget)
//                   ? "Starting..."
//                   : "Start now"}
//               </button>
//             </div>
//           </div>
//         </ModalShell>
//       )}

//       {rescheduleLesson && (
//         <ModalShell
//           title="Request lesson reschedule"
//           onClose={() => setRescheduleLesson(null)}
//         >
//           <form onSubmit={submitReschedule} className="space-y-4">
//             <label className="block text-sm font-semibold text-slate-700">
//               Requested date
//               <input
//                 type="date"
//                 required
//                 value={rescheduleForm.lessonDate}
//                 onChange={(event) =>
//                   setRescheduleForm((current) => ({
//                     ...current,
//                     lessonDate: event.target.value,
//                   }))
//                 }
//                 className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
//               />
//             </label>

//             <div className="grid grid-cols-2 gap-4">
//               <label className="text-sm font-semibold text-slate-700">
//                 Start time
//                 <input
//                   type="time"
//                   required
//                   value={rescheduleForm.startTime}
//                   onChange={(event) =>
//                     setRescheduleForm((current) => ({
//                       ...current,
//                       startTime: event.target.value,
//                     }))
//                   }
//                   className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
//                 />
//               </label>

//               <label className="text-sm font-semibold text-slate-700">
//                 End time
//                 <input
//                   type="time"
//                   required
//                   value={rescheduleForm.endTime}
//                   onChange={(event) =>
//                     setRescheduleForm((current) => ({
//                       ...current,
//                       endTime: event.target.value,
//                     }))
//                   }
//                   className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
//                 />
//               </label>
//             </div>

//             <label className="block text-sm font-semibold text-slate-700">
//               Reason
//               <textarea
//                 required
//                 rows={4}
//                 value={rescheduleForm.reason}
//                 onChange={(event) =>
//                   setRescheduleForm((current) => ({
//                     ...current,
//                     reason: event.target.value,
//                   }))
//                 }
//                 className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
//               />
//             </label>

//             <div className="flex justify-end gap-2">
//               <button
//                 type="button"
//                 onClick={() => setRescheduleLesson(null)}
//                 className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"
//               >
//                 Close
//               </button>
//               <button
//                 type="submit"
//                 disabled={busyId === getLessonId(rescheduleLesson)}
//                 className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
//               >
//                 {busyId === getLessonId(rescheduleLesson)
//                   ? "Submitting..."
//                   : "Submit request"}
//               </button>
//             </div>
//           </form>
//         </ModalShell>
//       )}

//       {cancellationLesson && (
//         <ModalShell
//           title="Request lesson cancellation"
//           onClose={() => setCancellationLesson(null)}
//         >
//           <form onSubmit={submitCancellation} className="space-y-4">
//             <p className="text-sm text-slate-600">
//               The lesson remains scheduled until an admin approves the
//               cancellation.
//             </p>

//             <label className="block text-sm font-semibold text-slate-700">
//               Reason
//               <textarea
//                 required
//                 rows={5}
//                 value={cancellationReason}
//                 onChange={(event) => setCancellationReason(event.target.value)}
//                 className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
//               />
//             </label>

//             <div className="flex justify-end gap-2">
//               <button
//                 type="button"
//                 onClick={() => setCancellationLesson(null)}
//                 className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"
//               >
//                 Close
//               </button>
//               <button
//                 type="submit"
//                 disabled={busyId === getLessonId(cancellationLesson)}
//                 className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
//               >
//                 {busyId === getLessonId(cancellationLesson)
//                   ? "Submitting..."
//                   : "Submit request"}
//               </button>
//             </div>
//           </form>
//         </ModalShell>
//       )}

//       {noShowLesson && (
//         <ModalShell
//           title="Mark student no-show"
//           onClose={() => setNoShowLesson(null)}
//         >
//           <form onSubmit={submitNoShow} className="space-y-4">
//             <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
//               This closes the lesson as No-show. Use it only when the student
//               did not attend.
//             </div>

//             <label className="block text-sm font-semibold text-slate-700">
//               Note
//               <textarea
//                 required
//                 rows={4}
//                 value={noShowReason}
//                 onChange={(event) => setNoShowReason(event.target.value)}
//                 placeholder="Example: Student did not arrive and could not be reached."
//                 className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
//               />
//             </label>

//             <div className="flex justify-end gap-2">
//               <button
//                 type="button"
//                 onClick={() => setNoShowLesson(null)}
//                 className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"
//               >
//                 Close
//               </button>
//               <button
//                 type="submit"
//                 disabled={busyId === getLessonId(noShowLesson)}
//                 className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
//               >
//                 {busyId === getLessonId(noShowLesson)
//                   ? "Saving..."
//                   : "Confirm no-show"}
//               </button>
//             </div>
//           </form>
//         </ModalShell>
//       )}

//       {reportLesson && (
//         <ModalShell
//           title="Complete lesson and submit report"
//           onClose={() => setReportLesson(null)}
//           maxWidth="max-w-3xl"
//         >
//           <form onSubmit={submitReport} className="space-y-5">
//             <div>
//               <p className="text-sm font-bold text-slate-800">
//                 Skills covered <span className="text-rose-500">*</span>
//               </p>
//               <div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
//                 {DRIVING_SKILLS.map((skill) => {
//                   const checked = reportForm.skillsCovered.includes(skill);
//                   return (
//                     <label
//                       key={skill}
//                       className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm ${
//                         checked
//                           ? "border-blue-400 bg-blue-50 text-blue-800"
//                           : "border-slate-200 bg-white text-slate-700"
//                       }`}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={checked}
//                         onChange={() => toggleSkill(skill)}
//                       />
//                       {skill}
//                     </label>
//                   );
//                 })}
//               </div>
//             </div>

//             <label className="block text-sm font-semibold text-slate-700">
//               Student performance
//               <select
//                 required
//                 value={reportForm.performance}
//                 onChange={(event) =>
//                   setReportForm((current) => ({
//                     ...current,
//                     performance: event.target.value,
//                   }))
//                 }
//                 className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
//               >
//                 <option value="needs_improvement">Needs improvement</option>
//                 <option value="satisfactory">Satisfactory</option>
//                 <option value="good">Good</option>
//                 <option value="excellent">Excellent</option>
//               </select>
//             </label>

//             <label className="block text-sm font-semibold text-slate-700">
//               Teacher notes <span className="text-rose-500">*</span>
//               <textarea
//                 required
//                 rows={5}
//                 value={reportForm.teacherNotes}
//                 onChange={(event) =>
//                   setReportForm((current) => ({
//                     ...current,
//                     teacherNotes: event.target.value,
//                   }))
//                 }
//                 placeholder="Describe the lesson, progress and important observations."
//                 className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
//               />
//             </label>

//             <label className="block text-sm font-semibold text-slate-700">
//               Areas to improve
//               <textarea
//                 rows={4}
//                 value={reportForm.areasToImprove}
//                 onChange={(event) =>
//                   setReportForm((current) => ({
//                     ...current,
//                     areasToImprove: event.target.value,
//                   }))
//                 }
//                 placeholder="Enter one item per line."
//                 className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
//               />
//             </label>

//             <label className="block text-sm font-semibold text-slate-700">
//               Next lesson recommendation
//               <textarea
//                 rows={3}
//                 value={reportForm.nextLessonRecommendation}
//                 onChange={(event) =>
//                   setReportForm((current) => ({
//                     ...current,
//                     nextLessonRecommendation: event.target.value,
//                   }))
//                 }
//                 placeholder="What should be covered next?"
//                 className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
//               />
//             </label>

//             <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 text-sm text-violet-700">
//               Submitting this report changes the lesson to Awaiting
//               confirmation. The student will then confirm completion.
//             </div>

//             <div className="flex justify-end gap-2">
//               <button
//                 type="button"
//                 onClick={() => setReportLesson(null)}
//                 className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"
//               >
//                 Close
//               </button>
//               <button
//                 type="submit"
//                 disabled={busyId === getLessonId(reportLesson)}
//                 className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
//               >
//                 {busyId === getLessonId(reportLesson)
//                   ? "Submitting..."
//                   : "Submit lesson report"}
//               </button>
//             </div>
//           </form>
//         </ModalShell>
//       )}
//     </main>
//   );
// }

"use client";

import { useCallback, useEffect, useState } from "react";
import { FaCheck, FaEye, FaPlay, FaSearch, FaTimes } from "react-icons/fa";

import Pagination from "@/components/Pagination";
import {
  completeLesson,
  confirmAttendance,
  getLessons,
  markLessonNoShow,
  startLesson,
} from "@/features/API";
import {
  DRIVING_SKILLS,
  formatLessonDate,
  getErrorMessage,
  getLessonLocation,
  getVehicleType,
  statusClass,
  statusLabel,
  unwrap,
} from "@/features/lessonHelpers";
import useDebouncedValue from "@/hooks/useDebouncedValue";

const INITIAL_META = {
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 1,
};

const STATUSES = [
  "all",
  "scheduled",
  "in_progress",
  "awaiting_confirmation",
  "completed",
  "cancelled",
  "no_show",
];

const EMPTY_REPORT = {
  skillsCovered: [],
  teacherNotes: "",
  performance: "satisfactory",
  areasToImprove: "",
  nextLessonRecommendation: "",
};

const teacherPresent = (lesson) =>
  lesson.attendance?.teacherStatus === "present" ||
  lesson.attendance?.teacherConfirmed === true;

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <FaTimes />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export default function TeacherLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [meta, setMeta] = useState(INITIAL_META);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [notice, setNotice] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const debouncedSearch = useDebouncedValue(search, 500);

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [reportLesson, setReportLesson] = useState(null);
  const [reportForm, setReportForm] = useState(EMPTY_REPORT);

  const loadLessons = useCallback(async () => {
    setLoading(true);

    try {
      const response = await getLessons({
        page,
        limit,
        status,
        search: debouncedSearch,
        sortOrder,
      });

      setLessons(
        Array.isArray(unwrap(response, [])) ? unwrap(response, []) : [],
      );
      setMeta({
        ...INITIAL_META,
        ...(response?.data?.meta || {}),
      });
    } catch (error) {
      setLessons([]);
      setNotice({
        type: "error",
        text: getErrorMessage(error, "Lessons could not be loaded."),
      });
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, limit, page, sortOrder, status]);

  useEffect(() => {
    loadLessons();
  }, [loadLessons]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, limit, sortOrder, status]);

  const runAction = async (lesson, action, message) => {
    setBusyId(lesson._id);
    setNotice(null);

    try {
      await action();
      setNotice({ type: "success", text: message });
      await loadLessons();
    } catch (error) {
      setNotice({
        type: "error",
        text: getErrorMessage(error, "Action could not be completed."),
      });
    } finally {
      setBusyId("");
    }
  };

  const openReport = (lesson) => {
    if (!teacherPresent(lesson)) {
      setNotice({
        type: "error",
        text: "Confirm your attendance before submitting the report.",
      });
      return;
    }

    setReportLesson(lesson);
    setReportForm({
      skillsCovered: lesson.lessonProgress?.skillsCovered || [],
      teacherNotes: lesson.lessonProgress?.teacherNotes || "",
      performance:
        lesson.lessonProgress?.performance === "not_assessed"
          ? "satisfactory"
          : lesson.lessonProgress?.performance || "satisfactory",
      areasToImprove: lesson.lessonProgress?.areasToImprove?.join("\n") || "",
      nextLessonRecommendation:
        lesson.lessonProgress?.nextLessonRecommendation || "",
    });
  };

  const toggleSkill = (skill) => {
    setReportForm((current) => ({
      ...current,
      skillsCovered: current.skillsCovered.includes(skill)
        ? current.skillsCovered.filter((item) => item !== skill)
        : [...current.skillsCovered, skill],
    }));
  };

  const submitReport = async (event) => {
    event.preventDefault();

    if (!reportLesson) return;

    if (!reportForm.skillsCovered.length || !reportForm.teacherNotes.trim()) {
      setNotice({
        type: "error",
        text: "Teacher notes and at least one covered skill are required.",
      });
      return;
    }

    setBusyId(reportLesson._id);

    try {
      await completeLesson(reportLesson._id, {
        finalize: false,
        lessonProgress: {
          skillsCovered: reportForm.skillsCovered,
          teacherNotes: reportForm.teacherNotes.trim(),
          performance: reportForm.performance,
          areasToImprove: reportForm.areasToImprove
            .split(/\n|,/)
            .map((item) => item.trim())
            .filter(Boolean),
          nextLessonRecommendation: reportForm.nextLessonRecommendation.trim(),
        },
      });

      setReportLesson(null);
      setReportForm(EMPTY_REPORT);
      setNotice({
        type: "success",
        text: "Report submitted. Waiting for student confirmation.",
      });
      await loadLessons();
    } catch (error) {
      setNotice({
        type: "error",
        text: getErrorMessage(error, "Report could not be submitted."),
      });
    } finally {
      setBusyId("");
    }
  };

  const markNoShow = async (lesson) => {
    const reason = window.prompt(
      "No-show note:",
      "Student did not attend the lesson.",
    );

    if (!reason?.trim()) return;

    await runAction(
      lesson,
      () =>
        markLessonNoShow(lesson._id, {
          participant: "student",
          reason: reason.trim(),
        }),
      "Student no-show recorded.",
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-[1400px] space-y-5">
        <header>
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Teacher dashboard
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Assigned lessons
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            The server sends only the selected page instead of loading every
            historical lesson.
          </p>
        </header>

        {notice?.text && (
          <div
            className={`flex justify-between rounded-xl border px-4 py-3 text-sm ${
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

        <section className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[1fr_220px_180px]">
          <label className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search student name, email or phone"
              className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-3 text-sm"
            />
          </label>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm"
          >
            {STATUSES.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "All statuses" : statusLabel(item)}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm"
          >
            <option value="asc">Oldest first</option>
            <option value="desc">Newest first</option>
          </select>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[1050px] w-full text-left text-sm">
              <thead className="bg-slate-100 text-xs uppercase text-slate-600">
                <tr>
                  <th className="px-4 py-3">Date & time</th>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Vehicle / location</th>
                  <th className="px-4 py-3">Attendance</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-14 text-center text-slate-500"
                    >
                      Loading lessons...
                    </td>
                  </tr>
                ) : lessons.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-14 text-center text-slate-500"
                    >
                      No lessons found.
                    </td>
                  </tr>
                ) : (
                  lessons.map((lesson) => {
                    const present = teacherPresent(lesson);
                    const busy = busyId === lesson._id;

                    return (
                      <tr key={lesson._id} className="hover:bg-slate-50">
                        <td className="px-4 py-4">
                          <p className="font-bold text-slate-900">
                            {formatLessonDate(lesson.lessonDate)}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {lesson.startTime}–{lesson.endTime}
                          </p>
                        </td>

                        <td className="px-4 py-4">
                          <p className="font-semibold text-slate-800">
                            {lesson.student?.name || "Student"}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {lesson.student?.email ||
                              lesson.student?.phone ||
                              ""}
                          </p>
                        </td>

                        <td className="px-4 py-4">
                          <p className="font-semibold text-slate-800">
                            {getVehicleType(lesson)}
                          </p>
                          <p className="mt-1 max-w-56 truncate text-xs text-slate-500">
                            {getLessonLocation(lesson)}
                          </p>
                        </td>

                        <td className="px-4 py-4 capitalize">
                          {lesson.attendance?.teacherStatus ||
                            (present ? "present" : "pending")}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(
                              lesson.status,
                            )}`}
                          >
                            {statusLabel(lesson.status)}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedLesson(lesson)}
                              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white"
                            >
                              <FaEye /> View
                            </button>

                            {lesson.status === "scheduled" && (
                              <button
                                type="button"
                                disabled={busy}
                                onClick={() =>
                                  runAction(
                                    lesson,
                                    () => startLesson(lesson._id),
                                    "Lesson started.",
                                  )
                                }
                                className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
                              >
                                <FaPlay /> Start
                              </button>
                            )}

                            {lesson.status === "in_progress" && !present && (
                              <button
                                type="button"
                                disabled={busy}
                                onClick={() =>
                                  runAction(
                                    lesson,
                                    () =>
                                      confirmAttendance(lesson._id, {
                                        status: "present",
                                      }),
                                    "Attendance confirmed.",
                                  )
                                }
                                className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
                              >
                                Attendance
                              </button>
                            )}

                            {lesson.status === "in_progress" && (
                              <button
                                type="button"
                                disabled={busy || !present}
                                onClick={() => openReport(lesson)}
                                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
                              >
                                <FaCheck /> Report
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            page={meta.page}
            limit={meta.limit}
            total={meta.total}
            totalPages={meta.totalPages}
            loading={loading}
            onPageChange={setPage}
            onLimitChange={(value) => {
              setLimit(value);
              setPage(1);
            }}
          />
        </section>
      </div>

      {selectedLesson && (
        <Modal title="Lesson details" onClose={() => setSelectedLesson(null)}>
          <div className="space-y-4">
            <div className="flex justify-between gap-4">
              <div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(
                    selectedLesson.status,
                  )}`}
                >
                  {statusLabel(selectedLesson.status)}
                </span>
                <h3 className="mt-3 text-2xl font-bold text-slate-900">
                  {selectedLesson.student?.name || "Student"}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {selectedLesson.student?.email ||
                    selectedLesson.student?.phone ||
                    ""}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold">
                  {formatLessonDate(selectedLesson.lessonDate)}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {selectedLesson.startTime}–{selectedLesson.endTime}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase text-slate-400">
                  Vehicle
                </p>
                <p className="mt-1 font-semibold">
                  {getVehicleType(selectedLesson)}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase text-slate-400">
                  Location
                </p>
                <p className="mt-1 font-semibold">
                  {getLessonLocation(selectedLesson)}
                </p>
              </div>
            </div>

            {selectedLesson.status === "in_progress" && (
              <div className="flex flex-wrap gap-2">
                {!teacherPresent(selectedLesson) && (
                  <button
                    type="button"
                    onClick={() =>
                      runAction(
                        selectedLesson,
                        () =>
                          confirmAttendance(selectedLesson._id, {
                            status: "present",
                          }),
                        "Attendance confirmed.",
                      )
                    }
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white"
                  >
                    Confirm attendance
                  </button>
                )}

                <button
                  type="button"
                  disabled={!teacherPresent(selectedLesson)}
                  onClick={() => openReport(selectedLesson)}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
                >
                  Submit report
                </button>

                <button
                  type="button"
                  onClick={() => markNoShow(selectedLesson)}
                  className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white"
                >
                  Student no-show
                </button>
              </div>
            )}

            {selectedLesson.lessonProgress?.teacherNotes && (
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="font-bold text-slate-900">Teacher report</p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
                  {selectedLesson.lessonProgress.teacherNotes}
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}

      {reportLesson && (
        <Modal
          title="Complete lesson and submit report"
          onClose={() => setReportLesson(null)}
        >
          <form onSubmit={submitReport} className="space-y-5">
            <div>
              <p className="text-sm font-bold text-slate-800">
                Skills covered *
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {DRIVING_SKILLS.map((skill) => (
                  <label
                    key={skill}
                    className={`flex cursor-pointer gap-2 rounded-lg border p-3 text-sm ${
                      reportForm.skillsCovered.includes(skill)
                        ? "border-blue-400 bg-blue-50"
                        : "border-slate-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={reportForm.skillsCovered.includes(skill)}
                      onChange={() => toggleSkill(skill)}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>

            <label className="block text-sm font-semibold text-slate-700">
              Teacher notes *
              <textarea
                required
                rows={5}
                value={reportForm.teacherNotes}
                onChange={(event) =>
                  setReportForm((current) => ({
                    ...current,
                    teacherNotes: event.target.value,
                  }))
                }
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Performance
              <select
                value={reportForm.performance}
                onChange={(event) =>
                  setReportForm((current) => ({
                    ...current,
                    performance: event.target.value,
                  }))
                }
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5"
              >
                <option value="needs_improvement">Needs improvement</option>
                <option value="satisfactory">Satisfactory</option>
                <option value="good">Good</option>
                <option value="excellent">Excellent</option>
              </select>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Areas to improve
              <textarea
                rows={3}
                value={reportForm.areasToImprove}
                onChange={(event) =>
                  setReportForm((current) => ({
                    ...current,
                    areasToImprove: event.target.value,
                  }))
                }
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Next lesson recommendation
              <textarea
                rows={3}
                value={reportForm.nextLessonRecommendation}
                onChange={(event) =>
                  setReportForm((current) => ({
                    ...current,
                    nextLessonRecommendation: event.target.value,
                  }))
                }
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
              />
            </label>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setReportLesson(null)}
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={busyId === reportLesson._id}
                className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
              >
                {busyId === reportLesson._id
                  ? "Submitting..."
                  : "Submit report"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </main>
  );
}
