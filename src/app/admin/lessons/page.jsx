// "use client";

// import { useEffect, useMemo, useState } from "react";
// import {
//   FaCalendarAlt,
//   FaCheck,
//   FaEdit,
//   FaExclamationTriangle,
//   FaPlay,
//   FaPlus,
//   FaSearch,
//   FaTimes,
//   FaUserClock,
// } from "react-icons/fa";
// import {
//   cancelLesson,
//   completeLesson,
//   confirmAttendance,
//   confirmLessonCompletion,
//   createLesson,
//   getAdminUsers,
//   getLessons,
//   markLessonNoShow,
//   resolveLessonCancellation,
//   resolveLessonReschedule,
//   startLesson,
//   updateLesson,
// } from "@/features/API";
// import {
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

// const EMPTY_FORM = {
//   student: "",
//   teacher: "",
//   lessonDate: "",
//   startTime: "",
//   endTime: "",
//   vehicleType: "automatic",
//   paymentStatus: "paid",
//   address: "",
//   city: "",
// };

// const EMPTY_COMPLETION_FORM = {
//   teacherNotes: "",
//   skillsCovered: "",
//   areasToImprove: "",
//   nextLessonRecommendation: "",
//   performance: "satisfactory",
//   studentAttendance: "present",
//   teacherAttendance: "present",
//   adminNote: "",
// };

// const STATUSES = [
//   "all",
//   "scheduled",
//   "in_progress",
//   "awaiting_confirmation",
//   "completed",
//   "cancelled",
//   "no_show",
// ];

// const splitTextList = (value) =>
//   String(value || "")
//     .split(/[,\n]/)
//     .map((item) => item.trim())
//     .filter(Boolean);

// function StatCard({ label, value, icon }) {
//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
//       <div className="flex items-center justify-between gap-4">
//         <div>
//           <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
//             {label}
//           </p>
//           <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
//         </div>
//         <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#16458f]">
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }

// function RequestBox({ title, request, onApprove, onReject, disabled }) {
//   if (!request || request.status === "none") return null;

//   return (
//     <div className="rounded-xl border border-violet-200 bg-violet-50 p-3 text-sm">
//       <div className="flex flex-wrap items-center justify-between gap-2">
//         <p className="font-semibold text-violet-900">{title}</p>
//         <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-violet-700">
//           {requestLabel(request.status)}
//         </span>
//       </div>

//       {request.requestedDate && (
//         <p className="mt-2 text-violet-800">
//           Requested: {formatLessonDate(request.requestedDate)} ·{" "}
//           {request.startTime}–{request.endTime}
//         </p>
//       )}

//       {request.reason && (
//         <p className="mt-1 text-violet-800">Reason: {request.reason}</p>
//       )}

//       {request.adminNote && (
//         <p className="mt-1 text-violet-800">Admin note: {request.adminNote}</p>
//       )}

//       {request.status === "pending" && (
//         <div className="mt-3 flex flex-wrap gap-2">
//           <button
//             type="button"
//             disabled={disabled}
//             onClick={onApprove}
//             className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             Approve
//           </button>
//           <button
//             type="button"
//             disabled={disabled}
//             onClick={onReject}
//             className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             Reject
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// function CompletionModal({ lesson, form, setForm, saving, onClose, onSubmit }) {
//   if (!lesson) return null;

//   const updateField = (event) => {
//     const { name, value } = event.target;
//     setForm((current) => ({ ...current, [name]: value }));
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
//       <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
//         <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
//           <div>
//             <h2 className="text-lg font-bold text-slate-900">
//               Submit Lesson Report
//             </h2>
//             <p className="mt-1 text-sm text-slate-500">
//               {lesson.student?.name || "Student"} ·{" "}
//               {formatLessonDate(lesson.lessonDate)} · {lesson.startTime}–
//               {lesson.endTime}
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={onClose}
//             disabled={saving}
//             className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-50"
//             aria-label="Close completion form"
//           >
//             <FaTimes />
//           </button>
//         </div>

//         <form onSubmit={onSubmit} className="space-y-5 p-5">
//           <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
//             This form records attendance and submits the lesson report. The
//             lesson will then move to <strong>Awaiting Confirmation</strong>.
//             Final completion can be confirmed separately by the student or an
//             admin.
//           </div>

//           <div className="grid gap-4 md:grid-cols-2">
//             <label className="text-sm font-medium text-slate-700">
//               Student attendance
//               <select
//                 name="studentAttendance"
//                 value={form.studentAttendance}
//                 onChange={updateField}
//                 className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5"
//               >
//                 <option value="present">Present</option>
//                 <option value="absent">Absent</option>
//                 <option value="disputed">Disputed</option>
//               </select>
//             </label>

//             <label className="text-sm font-medium text-slate-700">
//               Teacher attendance
//               <select
//                 name="teacherAttendance"
//                 value={form.teacherAttendance}
//                 onChange={updateField}
//                 className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5"
//               >
//                 <option value="present">Present</option>
//                 <option value="absent">Absent</option>
//                 <option value="disputed">Disputed</option>
//               </select>
//             </label>
//           </div>

//           <label className="block text-sm font-medium text-slate-700">
//             Performance
//             <select
//               name="performance"
//               value={form.performance}
//               onChange={updateField}
//               className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5"
//             >
//               <option value="not_assessed">Not assessed</option>
//               <option value="needs_improvement">Needs improvement</option>
//               <option value="satisfactory">Satisfactory</option>
//               <option value="good">Good</option>
//               <option value="excellent">Excellent</option>
//             </select>
//           </label>

//           <label className="block text-sm font-medium text-slate-700">
//             Skills covered
//             <textarea
//               required
//               name="skillsCovered"
//               value={form.skillsCovered}
//               onChange={updateField}
//               rows={3}
//               placeholder="Parking, lane changing, mirror checking"
//               className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
//             />
//             <span className="mt-1 block text-xs text-slate-500">
//               Separate multiple skills using commas or new lines.
//             </span>
//           </label>

//           <label className="block text-sm font-medium text-slate-700">
//             Teacher notes
//             <textarea
//               required
//               name="teacherNotes"
//               value={form.teacherNotes}
//               onChange={updateField}
//               rows={4}
//               placeholder="Write a short lesson summary and student progress."
//               className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
//             />
//           </label>

//           <label className="block text-sm font-medium text-slate-700">
//             Areas to improve
//             <textarea
//               name="areasToImprove"
//               value={form.areasToImprove}
//               onChange={updateField}
//               rows={3}
//               placeholder="Clutch control, observation, turning"
//               className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
//             />
//           </label>

//           <label className="block text-sm font-medium text-slate-700">
//             Next lesson recommendation
//             <textarea
//               name="nextLessonRecommendation"
//               value={form.nextLessonRecommendation}
//               onChange={updateField}
//               rows={3}
//               placeholder="Recommended focus for the next lesson."
//               className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
//             />
//           </label>

//           <label className="block text-sm font-medium text-slate-700">
//             Admin attendance note
//             <textarea
//               name="adminNote"
//               value={form.adminNote}
//               onChange={updateField}
//               rows={2}
//               placeholder="Optional note about attendance or verification."
//               className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
//             />
//           </label>

//           <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               disabled={saving}
//               className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={saving}
//               className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {saving ? "Submitting..." : "Submit Report"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default function AdminLessonsPage() {
//   const [lessons, setLessons] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("all");
//   const [requestType, setRequestType] = useState("all");
//   const [showForm, setShowForm] = useState(false);
//   const [editingLesson, setEditingLesson] = useState(null);
//   const [form, setForm] = useState(EMPTY_FORM);
//   const [completionLesson, setCompletionLesson] = useState(null);
//   const [completionForm, setCompletionForm] = useState(EMPTY_COMPLETION_FORM);

//   const loadData = async () => {
//     setLoading(true);
//     setError("");

//     const [lessonResult, studentResult, teacherResult] =
//       await Promise.allSettled([
//         getLessons({ limit: 200 }),
//         getAdminUsers({ role: "student", status: "active", limit: 100 }),
//         getAdminUsers({ role: "teacher", status: "active", limit: 100 }),
//       ]);

//     if (lessonResult.status === "fulfilled") {
//       const data = unwrap(lessonResult.value, []);
//       setLessons(Array.isArray(data) ? data : []);
//     } else {
//       setLessons([]);
//       setError(
//         getErrorMessage(lessonResult.reason, "Lessons could not be loaded."),
//       );
//     }

//     if (studentResult.status === "fulfilled") {
//       const data = unwrap(studentResult.value, []);
//       setStudents(Array.isArray(data) ? data : []);
//     } else {
//       setStudents([]);
//     }

//     if (teacherResult.status === "fulfilled") {
//       const data = unwrap(teacherResult.value, []);
//       setTeachers(Array.isArray(data) ? data : []);
//     } else {
//       setTeachers([]);
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   useEffect(() => {
//     if (!success) return undefined;
//     const timer = window.setTimeout(() => setSuccess(""), 4000);
//     return () => window.clearTimeout(timer);
//   }, [success]);

//   const stats = useMemo(
//     () => ({
//       total: lessons.length,
//       scheduled: lessons.filter((item) => item.status === "scheduled").length,
//       active: lessons.filter((item) => item.status === "in_progress").length,
//       awaiting: lessons.filter(
//         (item) => item.status === "awaiting_confirmation",
//       ).length,
//       completed: lessons.filter((item) => item.status === "completed").length,
//       requests: lessons.filter(
//         (item) =>
//           item.rescheduleRequest?.status === "pending" ||
//           item.cancellationRequest?.status === "pending",
//       ).length,
//     }),
//     [lessons],
//   );

//   const filteredLessons = useMemo(() => {
//     const keyword = search.trim().toLowerCase();

//     return lessons.filter((lesson) => {
//       const matchesStatus = status === "all" || lesson.status === status;
//       const matchesRequest =
//         requestType === "all" ||
//         (requestType === "reschedule" &&
//           lesson.rescheduleRequest?.status === "pending") ||
//         (requestType === "cancellation" &&
//           lesson.cancellationRequest?.status === "pending");

//       const haystack = [
//         lesson.student?.name,
//         lesson.student?.email,
//         lesson.teacher?.name,
//         lesson.teacher?.email,
//         getLessonLocation(lesson),
//       ]
//         .filter(Boolean)
//         .join(" ")
//         .toLowerCase();

//       return (
//         matchesStatus &&
//         matchesRequest &&
//         (!keyword || haystack.includes(keyword))
//       );
//     });
//   }, [lessons, requestType, search, status]);

//   const replaceLesson = (updated) => {
//     if (!updated?._id) return;
//     setLessons((current) =>
//       current.map((item) => (item._id === updated._id ? updated : item)),
//     );
//   };

//   const runAction = async (action, message) => {
//     setSaving(true);
//     setError("");
//     setSuccess("");

//     try {
//       const response = await action();
//       const updated = unwrap(response, null);

//       if (updated?._id) replaceLesson(updated);
//       else await loadData();

//       setSuccess(message);
//       return updated;
//     } catch (requestError) {
//       setError(getErrorMessage(requestError, "Action could not be completed."));
//       return null;
//     } finally {
//       setSaving(false);
//     }
//   };

//   const openCreateForm = () => {
//     setEditingLesson(null);
//     setForm(EMPTY_FORM);
//     setShowForm(true);
//     setError("");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const openEditForm = (lesson) => {
//     if (
//       [
//         "in_progress",
//         "awaiting_confirmation",
//         "completed",
//         "cancelled",
//         "no_show",
//       ].includes(lesson.status)
//     ) {
//       setError("Only a scheduled lesson can be edited.");
//       return;
//     }

//     setEditingLesson(lesson);
//     setForm({
//       student: lesson.student?._id || "",
//       teacher: lesson.teacher?._id || "",
//       lessonDate: toDateInput(lesson.lessonDate),
//       startTime: lesson.startTime || "",
//       endTime: lesson.endTime || "",
//       vehicleType: lesson.booking?.vehicleType || "automatic",
//       paymentStatus: lesson.booking?.paymentStatus || "paid",
//       address: lesson.booking?.location?.address || "",
//       city: lesson.booking?.location?.city || "",
//     });
//     setShowForm(true);
//     setError("");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const closeForm = () => {
//     setShowForm(false);
//     setEditingLesson(null);
//     setForm(EMPTY_FORM);
//   };

//   const submitForm = async (event) => {
//     event.preventDefault();
//     setSaving(true);
//     setError("");
//     setSuccess("");

//     const payload = {
//       teacher: form.teacher,
//       lessonDate: form.lessonDate,
//       startTime: form.startTime,
//       endTime: form.endTime,
//       vehicleType: form.vehicleType,
//       paymentStatus: form.paymentStatus,
//       location: {
//         address: form.address,
//         city: form.city,
//       },
//     };

//     if (!editingLesson) payload.student = form.student;

//     try {
//       const response = editingLesson
//         ? await updateLesson(editingLesson._id, payload)
//         : await createLesson(payload);
//       const saved = unwrap(response, null);

//       if (saved?._id) {
//         setLessons((current) => {
//           const exists = current.some((item) => item._id === saved._id);
//           return exists
//             ? current.map((item) => (item._id === saved._id ? saved : item))
//             : [saved, ...current];
//         });
//       } else {
//         await loadData();
//       }

//       setSuccess(editingLesson ? "Lesson updated." : "Lesson scheduled.");
//       closeForm();
//     } catch (requestError) {
//       setError(getErrorMessage(requestError, "Lesson could not be saved."));
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleStart = async (lesson) => {
//     await runAction(() => startLesson(lesson._id), "Lesson started.");
//   };

//   const openCompletionModal = (lesson) => {
//     if (lesson.status !== "in_progress") {
//       setError("Start the lesson before submitting the completion report.");
//       return;
//     }

//     setCompletionLesson(lesson);
//     setCompletionForm({
//       teacherNotes: lesson.lessonProgress?.teacherNotes || "",
//       skillsCovered: lesson.lessonProgress?.skillsCovered?.join(", ") || "",
//       areasToImprove: lesson.lessonProgress?.areasToImprove?.join(", ") || "",
//       nextLessonRecommendation:
//         lesson.lessonProgress?.nextLessonRecommendation || "",
//       performance: lesson.lessonProgress?.performance || "satisfactory",
//       studentAttendance: ["present", "absent", "disputed"].includes(
//         lesson.attendance?.studentStatus,
//       )
//         ? lesson.attendance.studentStatus
//         : "present",
//       teacherAttendance: ["present", "absent", "disputed"].includes(
//         lesson.attendance?.teacherStatus,
//       )
//         ? lesson.attendance.teacherStatus
//         : "present",
//       adminNote: lesson.attendance?.adminNote || "",
//     });
//     setError("");
//   };

//   const closeCompletionModal = () => {
//     if (saving) return;
//     setCompletionLesson(null);
//     setCompletionForm(EMPTY_COMPLETION_FORM);
//   };

//   const submitCompletion = async (event) => {
//     event.preventDefault();

//     if (!completionLesson?._id) return;

//     const skillsCovered = splitTextList(completionForm.skillsCovered);
//     const areasToImprove = splitTextList(completionForm.areasToImprove);

//     if (!skillsCovered.length) {
//       setError("At least one covered skill is required.");
//       return;
//     }

//     if (!completionForm.teacherNotes.trim()) {
//       setError("Teacher notes are required.");
//       return;
//     }

//     if (
//       completionForm.studentAttendance !== "present" ||
//       completionForm.teacherAttendance !== "present"
//     ) {
//       setError(
//         "A lesson report can only be submitted when both student and teacher attendance are Present. Use No-show for absence or resolve a dispute first.",
//       );
//       return;
//     }

//     setSaving(true);
//     setError("");
//     setSuccess("");

//     try {
//       await confirmAttendance(completionLesson._id, {
//         participant: "student",
//         status: completionForm.studentAttendance,
//         adminNote: completionForm.adminNote.trim(),
//       });

//       await confirmAttendance(completionLesson._id, {
//         participant: "teacher",
//         status: completionForm.teacherAttendance,
//         adminNote: completionForm.adminNote.trim(),
//       });

//       const response = await completeLesson(completionLesson._id, {
//         finalize: false,
//         lessonProgress: {
//           teacherNotes: completionForm.teacherNotes.trim(),
//           skillsCovered,
//           areasToImprove,
//           nextLessonRecommendation:
//             completionForm.nextLessonRecommendation.trim(),
//           performance: completionForm.performance,
//         },
//       });

//       const updated = unwrap(response, null);
//       if (updated?._id) replaceLesson(updated);
//       else await loadData();

//       setCompletionLesson(null);
//       setCompletionForm(EMPTY_COMPLETION_FORM);
//       setSuccess(
//         "Lesson report submitted. It is now waiting for completion confirmation.",
//       );
//     } catch (requestError) {
//       setError(
//         getErrorMessage(requestError, "Lesson report could not be submitted."),
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleFinalize = async (lesson) => {
//     if (lesson.status !== "awaiting_confirmation") {
//       setError("Only a lesson awaiting confirmation can be finalized.");
//       return;
//     }

//     await runAction(
//       () => confirmLessonCompletion(lesson._id),
//       "Lesson completion confirmed.",
//     );
//   };

//   const handleDirectCancel = (lesson) => {
//     const reason = window.prompt("Cancellation reason:");
//     if (!reason?.trim()) return;

//     runAction(
//       () => cancelLesson(lesson._id, { reason: reason.trim() }),
//       "Lesson cancelled.",
//     );
//   };

//   const resolveRequest = (lesson, type, approve) => {
//     const adminNote = window.prompt(
//       approve ? "Approval note (optional):" : "Rejection reason:",
//       "",
//     );
//     if (adminNote === null) return;

//     if (type === "reschedule") {
//       runAction(
//         () =>
//           resolveLessonReschedule(lesson._id, {
//             approve,
//             adminNote,
//           }),
//         approve ? "Reschedule approved." : "Reschedule rejected.",
//       );
//       return;
//     }

//     runAction(
//       () =>
//         resolveLessonCancellation(lesson._id, {
//           approve,
//           adminNote,
//         }),
//       approve ? "Cancellation approved." : "Cancellation rejected.",
//     );
//   };

//   const handleNoShow = async (lesson) => {
//     await runAction(
//       () =>
//         markLessonNoShow(lesson._id, {
//           participant: "student",
//           reason: "Student did not attend.",
//         }),
//       "Student no-show recorded.",
//     );
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 md:p-6">
//       <CompletionModal
//         lesson={completionLesson}
//         form={completionForm}
//         setForm={setCompletionForm}
//         saving={saving}
//         onClose={closeCompletionModal}
//         onSubmit={submitCompletion}
//       />

//       <div className="mx-auto max-w-7xl space-y-6">
//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">
//               Lesson Management
//             </h1>
//             <p className="mt-1 text-sm text-slate-500">
//               Schedule lessons, manage requests, attendance and completion.
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={openCreateForm}
//             className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#16458f] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#103873]"
//           >
//             <FaPlus /> Schedule Lesson
//           </button>
//         </div>

//         {error && (
//           <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
//             {error}
//           </div>
//         )}

//         {success && (
//           <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
//             {success}
//           </div>
//         )}

//         {showForm && (
//           <form
//             onSubmit={submitForm}
//             className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
//           >
//             <div className="mb-5 flex items-center justify-between">
//               <h2 className="text-lg font-bold text-slate-900">
//                 {editingLesson ? "Edit Lesson" : "Schedule New Lesson"}
//               </h2>
//               <button
//                 type="button"
//                 onClick={closeForm}
//                 className="text-slate-500"
//               >
//                 <FaTimes />
//               </button>
//             </div>

//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//               {!editingLesson && (
//                 <label className="text-sm font-medium text-slate-700">
//                   Student
//                   <select
//                     required
//                     value={form.student}
//                     onChange={(event) =>
//                       setForm((current) => ({
//                         ...current,
//                         student: event.target.value,
//                       }))
//                     }
//                     className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5"
//                   >
//                     <option value="">Select student</option>
//                     {students.map((student) => (
//                       <option key={student._id} value={student._id}>
//                         {student.name} ({student.email})
//                       </option>
//                     ))}
//                   </select>
//                 </label>
//               )}

//               <label className="text-sm font-medium text-slate-700">
//                 Teacher
//                 <select
//                   required
//                   value={form.teacher}
//                   onChange={(event) =>
//                     setForm((current) => ({
//                       ...current,
//                       teacher: event.target.value,
//                     }))
//                   }
//                   className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5"
//                 >
//                   <option value="">Select teacher</option>
//                   {teachers.map((teacher) => (
//                     <option key={teacher._id} value={teacher._id}>
//                       {teacher.name} ({teacher.email})
//                     </option>
//                   ))}
//                 </select>
//               </label>

//               <label className="text-sm font-medium text-slate-700">
//                 Date
//                 <input
//                   required
//                   type="date"
//                   value={form.lessonDate}
//                   onChange={(event) =>
//                     setForm((current) => ({
//                       ...current,
//                       lessonDate: event.target.value,
//                     }))
//                   }
//                   className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
//                 />
//               </label>

//               <label className="text-sm font-medium text-slate-700">
//                 Vehicle type
//                 <select
//                   value={form.vehicleType}
//                   onChange={(event) =>
//                     setForm((current) => ({
//                       ...current,
//                       vehicleType: event.target.value,
//                     }))
//                   }
//                   className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5"
//                 >
//                   <option value="automatic">Automatic</option>
//                   <option value="manual">Manual</option>
//                 </select>
//               </label>

//               <label className="text-sm font-medium text-slate-700">
//                 Start time
//                 <input
//                   required
//                   type="time"
//                   value={form.startTime}
//                   onChange={(event) =>
//                     setForm((current) => ({
//                       ...current,
//                       startTime: event.target.value,
//                     }))
//                   }
//                   className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
//                 />
//               </label>

//               <label className="text-sm font-medium text-slate-700">
//                 End time
//                 <input
//                   required
//                   type="time"
//                   value={form.endTime}
//                   onChange={(event) =>
//                     setForm((current) => ({
//                       ...current,
//                       endTime: event.target.value,
//                     }))
//                   }
//                   className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
//                 />
//               </label>

//               <label className="text-sm font-medium text-slate-700">
//                 Payment status
//                 <select
//                   value={form.paymentStatus}
//                   onChange={(event) =>
//                     setForm((current) => ({
//                       ...current,
//                       paymentStatus: event.target.value,
//                     }))
//                   }
//                   className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5"
//                 >
//                   <option value="paid">Paid</option>
//                   <option value="unpaid">Unpaid</option>
//                 </select>
//               </label>

//               <label className="text-sm font-medium text-slate-700">
//                 Address
//                 <input
//                   value={form.address}
//                   onChange={(event) =>
//                     setForm((current) => ({
//                       ...current,
//                       address: event.target.value,
//                     }))
//                   }
//                   className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
//                   placeholder="Pickup address"
//                 />
//               </label>

//               <label className="text-sm font-medium text-slate-700">
//                 City
//                 <input
//                   value={form.city}
//                   onChange={(event) =>
//                     setForm((current) => ({
//                       ...current,
//                       city: event.target.value,
//                     }))
//                   }
//                   className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
//                   placeholder="City"
//                 />
//               </label>
//             </div>

//             <div className="mt-5 flex flex-wrap gap-3">
//               <button
//                 type="submit"
//                 disabled={saving}
//                 className="rounded-xl bg-[#16458f] px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 {saving
//                   ? "Saving..."
//                   : editingLesson
//                     ? "Save Changes"
//                     : "Schedule Lesson"}
//               </button>
//               <button
//                 type="button"
//                 onClick={closeForm}
//                 disabled={saving}
//                 className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         )}

//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
//           <StatCard
//             label="Total"
//             value={stats.total}
//             icon={<FaCalendarAlt />}
//           />
//           <StatCard
//             label="Scheduled"
//             value={stats.scheduled}
//             icon={<FaCalendarAlt />}
//           />
//           <StatCard
//             label="In progress"
//             value={stats.active}
//             icon={<FaPlay />}
//           />
//           <StatCard
//             label="Awaiting"
//             value={stats.awaiting}
//             icon={<FaUserClock />}
//           />
//           <StatCard
//             label="Completed"
//             value={stats.completed}
//             icon={<FaCheck />}
//           />
//           <StatCard
//             label="Requests"
//             value={stats.requests}
//             icon={<FaExclamationTriangle />}
//           />
//         </div>

//         <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_220px_220px]">
//           <label className="flex items-center gap-3 rounded-xl border border-slate-300 px-3 py-2.5">
//             <FaSearch className="text-slate-400" />
//             <input
//               value={search}
//               onChange={(event) => setSearch(event.target.value)}
//               placeholder="Search student, teacher or location"
//               className="w-full bg-transparent text-sm outline-none"
//             />
//           </label>

//           <select
//             value={status}
//             onChange={(event) => setStatus(event.target.value)}
//             className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm"
//           >
//             {STATUSES.map((item) => (
//               <option key={item} value={item}>
//                 {item === "all" ? "All statuses" : statusLabel(item)}
//               </option>
//             ))}
//           </select>

//           <select
//             value={requestType}
//             onChange={(event) => setRequestType(event.target.value)}
//             className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm"
//           >
//             <option value="all">All requests</option>
//             <option value="reschedule">Pending reschedules</option>
//             <option value="cancellation">Pending cancellations</option>
//           </select>
//         </div>

//         {loading ? (
//           <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
//             Loading lessons...
//           </div>
//         ) : filteredLessons.length === 0 ? (
//           <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
//             No lessons found.
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {filteredLessons.map((lesson) => (
//               <article
//                 key={lesson._id}
//                 className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
//               >
//                 <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
//                   <div className="space-y-3">
//                     <div className="flex flex-wrap items-center gap-2">
//                       <h2 className="text-lg font-bold text-slate-900">
//                         {lesson.student?.name || "Student"}
//                       </h2>
//                       <span
//                         className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(lesson.status)}`}
//                       >
//                         {statusLabel(lesson.status)}
//                       </span>
//                     </div>

//                     <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-3">
//                       <p>
//                         <span className="font-semibold text-slate-800">
//                           Teacher:
//                         </span>{" "}
//                         {lesson.teacher?.name || "Not assigned"}
//                       </p>
//                       <p>
//                         <span className="font-semibold text-slate-800">
//                           Date:
//                         </span>{" "}
//                         {formatLessonDate(lesson.lessonDate)}
//                       </p>
//                       <p>
//                         <span className="font-semibold text-slate-800">
//                           Time:
//                         </span>{" "}
//                         {lesson.startTime}–{lesson.endTime}
//                       </p>
//                       <p>
//                         <span className="font-semibold text-slate-800">
//                           Vehicle:
//                         </span>{" "}
//                         {getVehicleType(lesson)}
//                       </p>
//                       <p>
//                         <span className="font-semibold text-slate-800">
//                           Location:
//                         </span>{" "}
//                         {getLessonLocation(lesson)}
//                       </p>
//                       <p>
//                         <span className="font-semibold text-slate-800">
//                           Payment:
//                         </span>{" "}
//                         {lesson.booking?.paymentStatus || "unknown"}
//                       </p>
//                     </div>

//                     <div className="flex flex-wrap gap-2 text-xs">
//                       <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
//                         Student attendance:{" "}
//                         {lesson.attendance?.studentStatus || "pending"}
//                       </span>
//                       <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
//                         Teacher attendance:{" "}
//                         {lesson.attendance?.teacherStatus || "pending"}
//                       </span>
//                       {lesson.lessonProgress?.performance && (
//                         <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
//                           Performance:{" "}
//                           {lesson.lessonProgress.performance.replaceAll(
//                             "_",
//                             " ",
//                           )}
//                         </span>
//                       )}
//                       {lesson.lessonProgress?.rating && (
//                         <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">
//                           Rating: {lesson.lessonProgress.rating}/5
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
//                     {lesson.status === "scheduled" && (
//                       <button
//                         type="button"
//                         disabled={saving}
//                         onClick={() => openEditForm(lesson)}
//                         className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 disabled:opacity-50"
//                       >
//                         <FaEdit /> Edit
//                       </button>
//                     )}

//                     {lesson.status === "scheduled" && (
//                       <button
//                         type="button"
//                         disabled={saving}
//                         onClick={() => handleStart(lesson)}
//                         className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
//                       >
//                         <FaPlay /> Start
//                       </button>
//                     )}

//                     {lesson.status === "in_progress" && (
//                       <button
//                         type="button"
//                         disabled={saving}
//                         onClick={() => openCompletionModal(lesson)}
//                         className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
//                       >
//                         <FaCheck /> Submit Report
//                       </button>
//                     )}

//                     {lesson.status === "awaiting_confirmation" && (
//                       <button
//                         type="button"
//                         disabled={saving}
//                         onClick={() => handleFinalize(lesson)}
//                         className="inline-flex items-center gap-2 rounded-lg bg-[#16458f] px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
//                       >
//                         <FaCheck /> Confirm Complete
//                       </button>
//                     )}

//                     {["scheduled", "in_progress"].includes(lesson.status) && (
//                       <button
//                         type="button"
//                         disabled={saving}
//                         onClick={() => handleNoShow(lesson)}
//                         className="rounded-lg bg-slate-700 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
//                       >
//                         No-show
//                       </button>
//                     )}

//                     {!["completed", "cancelled", "no_show"].includes(
//                       lesson.status,
//                     ) && (
//                       <button
//                         type="button"
//                         disabled={saving}
//                         onClick={() => handleDirectCancel(lesson)}
//                         className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
//                       >
//                         <FaTimes /> Cancel
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 <div className="mt-4 grid gap-3 lg:grid-cols-2">
//                   <RequestBox
//                     title="Reschedule request"
//                     request={lesson.rescheduleRequest}
//                     disabled={saving}
//                     onApprove={() => resolveRequest(lesson, "reschedule", true)}
//                     onReject={() => resolveRequest(lesson, "reschedule", false)}
//                   />
//                   <RequestBox
//                     title="Cancellation request"
//                     request={lesson.cancellationRequest}
//                     disabled={saving}
//                     onApprove={() =>
//                       resolveRequest(lesson, "cancellation", true)
//                     }
//                     onReject={() =>
//                       resolveRequest(lesson, "cancellation", false)
//                     }
//                   />
//                 </div>

//                 {(lesson.lessonProgress?.teacherNotes ||
//                   lesson.lessonProgress?.studentNotes ||
//                   lesson.lessonProgress?.skillsCovered?.length > 0 ||
//                   lesson.lessonProgress?.areasToImprove?.length > 0 ||
//                   lesson.lessonProgress?.nextLessonRecommendation) && (
//                   <div className="mt-4 grid gap-4 rounded-xl bg-slate-50 p-4 text-sm md:grid-cols-2">
//                     <div className="space-y-2">
//                       <p className="font-semibold text-slate-800">
//                         Teacher report
//                       </p>
//                       <p className="text-slate-600">
//                         {lesson.lessonProgress?.teacherNotes || "No notes"}
//                       </p>

//                       {lesson.lessonProgress?.skillsCovered?.length > 0 && (
//                         <p className="text-slate-600">
//                           <span className="font-semibold text-slate-700">
//                             Skills:
//                           </span>{" "}
//                           {lesson.lessonProgress.skillsCovered.join(", ")}
//                         </p>
//                       )}

//                       {lesson.lessonProgress?.areasToImprove?.length > 0 && (
//                         <p className="text-slate-600">
//                           <span className="font-semibold text-slate-700">
//                             Improve:
//                           </span>{" "}
//                           {lesson.lessonProgress.areasToImprove.join(", ")}
//                         </p>
//                       )}

//                       {lesson.lessonProgress?.nextLessonRecommendation && (
//                         <p className="text-slate-600">
//                           <span className="font-semibold text-slate-700">
//                             Next lesson:
//                           </span>{" "}
//                           {lesson.lessonProgress.nextLessonRecommendation}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <p className="font-semibold text-slate-800">
//                         Student feedback
//                       </p>
//                       <p className="mt-1 text-slate-600">
//                         {lesson.lessonProgress?.studentNotes || "No feedback"}
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </article>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaCheck,
  FaEdit,
  FaExclamationTriangle,
  FaPlay,
  FaPlus,
  FaSearch,
  FaTimes,
  FaUserClock,
} from "react-icons/fa";
import {
  cancelLesson,
  completeLesson,
  confirmAttendance,
  confirmLessonCompletion,
  createLesson,
  getAdminUsers,
  getLessons,
  markLessonNoShow,
  resolveLessonCancellation,
  resolveLessonReschedule,
  startLesson,
  updateLesson,
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

const EMPTY_FORM = {
  student: "",
  teacher: "",
  lessonDate: "",
  startTime: "",
  endTime: "",
  vehicleType: "automatic",
  paymentStatus: "paid",
  address: "",
  city: "",
};

const EMPTY_COMPLETION_FORM = {
  teacherNotes: "",
  skillsCovered: "",
  areasToImprove: "",
  nextLessonRecommendation: "",
  performance: "satisfactory",
  studentAttendance: "present",
  teacherAttendance: "present",
  adminNote: "",
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

const splitTextList = (value) =>
  String(value || "")
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);

function StatCard({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#16458f]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function RequestBox({ title, request, onApprove, onReject, disabled }) {
  if (!request || request.status === "none") return null;

  return (
    <div className="rounded-xl border border-violet-200 bg-violet-50 p-3 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold text-violet-900">{title}</p>
        <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-violet-700">
          {requestLabel(request.status)}
        </span>
      </div>

      {request.requestedDate && (
        <p className="mt-2 text-violet-800">
          Requested: {formatLessonDate(request.requestedDate)} ·{" "}
          {request.startTime}–{request.endTime}
        </p>
      )}

      {request.reason && (
        <p className="mt-1 text-violet-800">Reason: {request.reason}</p>
      )}

      {request.adminNote && (
        <p className="mt-1 text-violet-800">Admin note: {request.adminNote}</p>
      )}

      {request.status === "pending" && (
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={disabled}
            onClick={onApprove}
            className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Approve
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={onReject}
            className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

function CompletionModal({ lesson, form, setForm, saving, onClose, onSubmit }) {
  if (!lesson) return null;

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Submit Lesson Report
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {lesson.student?.name || "Student"} ·{" "}
              {formatLessonDate(lesson.lessonDate)} · {lesson.startTime}–
              {lesson.endTime}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-50"
            aria-label="Close completion form"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 p-5">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
            This form records attendance and submits the lesson report. The
            lesson will then move to <strong>Awaiting Confirmation</strong>.
            Final completion can be confirmed separately by the student or an
            admin.
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Student attendance
              <select
                name="studentAttendance"
                value={form.studentAttendance}
                onChange={updateField}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5"
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="disputed">Disputed</option>
              </select>
            </label>

            <label className="text-sm font-medium text-slate-700">
              Teacher attendance
              <select
                name="teacherAttendance"
                value={form.teacherAttendance}
                onChange={updateField}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5"
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="disputed">Disputed</option>
              </select>
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Performance
            <select
              name="performance"
              value={form.performance}
              onChange={updateField}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5"
            >
              <option value="not_assessed">Not assessed</option>
              <option value="needs_improvement">Needs improvement</option>
              <option value="satisfactory">Satisfactory</option>
              <option value="good">Good</option>
              <option value="excellent">Excellent</option>
            </select>
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Skills covered
            <textarea
              required
              name="skillsCovered"
              value={form.skillsCovered}
              onChange={updateField}
              rows={3}
              placeholder="Parking, lane changing, mirror checking"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
            />
            <span className="mt-1 block text-xs text-slate-500">
              Separate multiple skills using commas or new lines.
            </span>
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Teacher notes
            <textarea
              required
              name="teacherNotes"
              value={form.teacherNotes}
              onChange={updateField}
              rows={4}
              placeholder="Write a short lesson summary and student progress."
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Areas to improve
            <textarea
              name="areasToImprove"
              value={form.areasToImprove}
              onChange={updateField}
              rows={3}
              placeholder="Clutch control, observation, turning"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Next lesson recommendation
            <textarea
              name="nextLessonRecommendation"
              value={form.nextLessonRecommendation}
              onChange={updateField}
              rows={3}
              placeholder="Recommended focus for the next lesson."
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Admin attendance note
            <textarea
              name="adminNote"
              value={form.adminNote}
              onChange={updateField}
              rows={2}
              placeholder="Optional note about attendance or verification."
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
            />
          </label>

          <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [requestType, setRequestType] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [completionLesson, setCompletionLesson] = useState(null);
  const [completionForm, setCompletionForm] = useState(EMPTY_COMPLETION_FORM);

  const loadData = async () => {
    setLoading(true);
    setError("");

    const [lessonResult, studentResult, teacherResult] =
      await Promise.allSettled([
        getLessons({ limit: 200 }),
        getAdminUsers({ role: "student", status: "active", limit: 100 }),
        getAdminUsers({ role: "teacher", status: "active", limit: 100 }),
      ]);

    if (lessonResult.status === "fulfilled") {
      const data = unwrap(lessonResult.value, []);
      setLessons(Array.isArray(data) ? data : []);
    } else {
      setLessons([]);
      setError(
        getErrorMessage(lessonResult.reason, "Lessons could not be loaded."),
      );
    }

    if (studentResult.status === "fulfilled") {
      const data = unwrap(studentResult.value, []);
      setStudents(Array.isArray(data) ? data : []);
    } else {
      setStudents([]);
    }

    if (teacherResult.status === "fulfilled") {
      const data = unwrap(teacherResult.value, []);
      setTeachers(Array.isArray(data) ? data : []);
    } else {
      setTeachers([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!success) return undefined;
    const timer = window.setTimeout(() => setSuccess(""), 4000);
    return () => window.clearTimeout(timer);
  }, [success]);

  const stats = useMemo(
    () => ({
      total: lessons.length,
      scheduled: lessons.filter((item) => item.status === "scheduled").length,
      active: lessons.filter((item) => item.status === "in_progress").length,
      awaiting: lessons.filter(
        (item) => item.status === "awaiting_confirmation",
      ).length,
      completed: lessons.filter((item) => item.status === "completed").length,
      requests: lessons.filter(
        (item) =>
          item.rescheduleRequest?.status === "pending" ||
          item.cancellationRequest?.status === "pending",
      ).length,
    }),
    [lessons],
  );

  const filteredLessons = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return lessons.filter((lesson) => {
      const matchesStatus = status === "all" || lesson.status === status;
      const matchesRequest =
        requestType === "all" ||
        (requestType === "reschedule" &&
          lesson.rescheduleRequest?.status === "pending") ||
        (requestType === "cancellation" &&
          lesson.cancellationRequest?.status === "pending");

      const haystack = [
        lesson.student?.name,
        lesson.student?.email,
        lesson.teacher?.name,
        lesson.teacher?.email,
        getLessonLocation(lesson),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        matchesStatus &&
        matchesRequest &&
        (!keyword || haystack.includes(keyword))
      );
    });
  }, [lessons, requestType, search, status]);

  const replaceLesson = (updated) => {
    if (!updated?._id) return;
    setLessons((current) =>
      current.map((item) => (item._id === updated._id ? updated : item)),
    );
  };

  const runAction = async (action, message) => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await action();
      const updated = unwrap(response, null);

      if (updated?._id) replaceLesson(updated);
      else await loadData();

      setSuccess(message);
      return updated;
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Action could not be completed."));
      return null;
    } finally {
      setSaving(false);
    }
  };

  const openCreateForm = () => {
    setEditingLesson(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openEditForm = (lesson) => {
    if (
      [
        "in_progress",
        "awaiting_confirmation",
        "completed",
        "cancelled",
        "no_show",
      ].includes(lesson.status)
    ) {
      setError("Only a scheduled lesson can be edited.");
      return;
    }

    setEditingLesson(lesson);
    setForm({
      student: lesson.student?._id || "",
      teacher: lesson.teacher?._id || "",
      lessonDate: toDateInput(lesson.lessonDate),
      startTime: lesson.startTime || "",
      endTime: lesson.endTime || "",
      vehicleType: lesson.booking?.vehicleType || "automatic",
      paymentStatus: lesson.booking?.paymentStatus || "paid",
      address: lesson.booking?.location?.address || "",
      city: lesson.booking?.location?.city || "",
    });
    setShowForm(true);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingLesson(null);
    setForm(EMPTY_FORM);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      teacher: form.teacher,
      lessonDate: form.lessonDate,
      startTime: form.startTime,
      endTime: form.endTime,
      vehicleType: form.vehicleType,
      paymentStatus: form.paymentStatus,
      location: {
        address: form.address,
        city: form.city,
      },
    };

    if (!editingLesson) payload.student = form.student;

    try {
      const response = editingLesson
        ? await updateLesson(editingLesson._id, payload)
        : await createLesson(payload);
      const saved = unwrap(response, null);

      if (saved?._id) {
        setLessons((current) => {
          const exists = current.some((item) => item._id === saved._id);
          return exists
            ? current.map((item) => (item._id === saved._id ? saved : item))
            : [saved, ...current];
        });
      } else {
        await loadData();
      }

      setSuccess(editingLesson ? "Lesson updated." : "Lesson scheduled.");
      closeForm();
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Lesson could not be saved."));
    } finally {
      setSaving(false);
    }
  };

  const handleStart = async (lesson) => {
    await runAction(() => startLesson(lesson._id), "Lesson started.");
  };

  const openCompletionModal = (lesson) => {
    if (lesson.status !== "in_progress") {
      setError("Start the lesson before submitting the completion report.");
      return;
    }

    setCompletionLesson(lesson);
    setCompletionForm({
      teacherNotes: lesson.lessonProgress?.teacherNotes || "",
      skillsCovered: lesson.lessonProgress?.skillsCovered?.join(", ") || "",
      areasToImprove: lesson.lessonProgress?.areasToImprove?.join(", ") || "",
      nextLessonRecommendation:
        lesson.lessonProgress?.nextLessonRecommendation || "",
      performance: lesson.lessonProgress?.performance || "satisfactory",
      studentAttendance: ["present", "absent", "disputed"].includes(
        lesson.attendance?.studentStatus,
      )
        ? lesson.attendance.studentStatus
        : "present",
      teacherAttendance: ["present", "absent", "disputed"].includes(
        lesson.attendance?.teacherStatus,
      )
        ? lesson.attendance.teacherStatus
        : "present",
      adminNote: lesson.attendance?.adminNote || "",
    });
    setError("");
  };

  const closeCompletionModal = () => {
    if (saving) return;
    setCompletionLesson(null);
    setCompletionForm(EMPTY_COMPLETION_FORM);
  };

  const submitCompletion = async (event) => {
    event.preventDefault();

    if (!completionLesson?._id) return;

    const skillsCovered = splitTextList(completionForm.skillsCovered);
    const areasToImprove = splitTextList(completionForm.areasToImprove);

    if (!skillsCovered.length) {
      setError("At least one covered skill is required.");
      return;
    }

    if (!completionForm.teacherNotes.trim()) {
      setError("Teacher notes are required.");
      return;
    }

    if (
      completionForm.studentAttendance !== "present" ||
      completionForm.teacherAttendance !== "present"
    ) {
      setError(
        "A lesson report can only be submitted when both student and teacher attendance are Present. Use No-show for absence or resolve a dispute first.",
      );
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await confirmAttendance(completionLesson._id, {
        participant: "student",
        status: completionForm.studentAttendance,
        adminNote: completionForm.adminNote.trim(),
      });

      await confirmAttendance(completionLesson._id, {
        participant: "teacher",
        status: completionForm.teacherAttendance,
        adminNote: completionForm.adminNote.trim(),
      });

      const response = await completeLesson(completionLesson._id, {
        finalize: false,
        lessonProgress: {
          teacherNotes: completionForm.teacherNotes.trim(),
          skillsCovered,
          areasToImprove,
          nextLessonRecommendation:
            completionForm.nextLessonRecommendation.trim(),
          performance: completionForm.performance,
        },
      });

      const updated = unwrap(response, null);
      if (updated?._id) replaceLesson(updated);
      else await loadData();

      setCompletionLesson(null);
      setCompletionForm(EMPTY_COMPLETION_FORM);
      setSuccess(
        "Lesson report submitted. It is now waiting for completion confirmation.",
      );
    } catch (requestError) {
      setError(
        getErrorMessage(requestError, "Lesson report could not be submitted."),
      );
    } finally {
      setSaving(false);
    }
  };

  const handleFinalize = async (lesson) => {
    if (lesson.status !== "awaiting_confirmation") {
      setError("Only a lesson awaiting confirmation can be finalized.");
      return;
    }

    await runAction(
      () => confirmLessonCompletion(lesson._id),
      "Lesson completion confirmed.",
    );
  };

  const handleDirectCancel = (lesson) => {
    const reason = window.prompt("Cancellation reason:");
    if (!reason?.trim()) return;

    runAction(
      () => cancelLesson(lesson._id, { reason: reason.trim() }),
      "Lesson cancelled.",
    );
  };

  const resolveRequest = (lesson, type, approve) => {
    const adminNote = window.prompt(
      approve ? "Approval note (optional):" : "Rejection reason:",
      "",
    );
    if (adminNote === null) return;

    if (type === "reschedule") {
      runAction(
        () =>
          resolveLessonReschedule(lesson._id, {
            approve,
            adminNote,
          }),
        approve ? "Reschedule approved." : "Reschedule rejected.",
      );
      return;
    }

    runAction(
      () =>
        resolveLessonCancellation(lesson._id, {
          approve,
          adminNote,
        }),
      approve ? "Cancellation approved." : "Cancellation rejected.",
    );
  };

  const handleNoShow = async (lesson) => {
    await runAction(
      () =>
        markLessonNoShow(lesson._id, {
          participant: "student",
          reason: "Student did not attend.",
        }),
      "Student no-show recorded.",
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <CompletionModal
        lesson={completionLesson}
        form={completionForm}
        setForm={setCompletionForm}
        saving={saving}
        onClose={closeCompletionModal}
        onSubmit={submitCompletion}
      />

      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Lesson Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Schedule lessons, manage requests, attendance and completion.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#16458f] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#103873]"
          >
            <FaPlus /> Schedule Lesson
          </button>
        </div>

        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {showForm && (
          <form
            onSubmit={submitForm}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                {editingLesson ? "Edit Lesson" : "Schedule New Lesson"}
              </h2>
              <button
                type="button"
                onClick={closeForm}
                className="text-slate-500"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {!editingLesson && (
                <label className="text-sm font-medium text-slate-700">
                  Student
                  <select
                    required
                    value={form.student}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        student: event.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5"
                  >
                    <option value="">Select student</option>
                    {students.map((student) => (
                      <option key={student._id} value={student._id}>
                        {student.name} ({student.email})
                      </option>
                    ))}
                  </select>
                </label>
              )}

              <label className="text-sm font-medium text-slate-700">
                Teacher
                <select
                  required
                  value={form.teacher}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      teacher: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5"
                >
                  <option value="">Select teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.name} ({teacher.email})
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm font-medium text-slate-700">
                Date
                <input
                  required
                  type="date"
                  value={form.lessonDate}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      lessonDate: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
                />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Vehicle type
                <select
                  value={form.vehicleType}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      vehicleType: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5"
                >
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </label>

              <label className="text-sm font-medium text-slate-700">
                Start time
                <input
                  required
                  type="time"
                  value={form.startTime}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      startTime: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
                />
              </label>

              <label className="text-sm font-medium text-slate-700">
                End time
                <input
                  required
                  type="time"
                  value={form.endTime}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      endTime: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
                />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Payment status
                <select
                  value={form.paymentStatus}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      paymentStatus: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5"
                >
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </label>

              <label className="text-sm font-medium text-slate-700">
                Address
                <input
                  value={form.address}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      address: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
                  placeholder="Pickup address"
                />
              </label>

              <label className="text-sm font-medium text-slate-700">
                City
                <input
                  value={form.city}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      city: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
                  placeholder="City"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-[#16458f] px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingLesson
                    ? "Save Changes"
                    : "Schedule Lesson"}
              </button>
              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <StatCard
            label="Total"
            value={stats.total}
            icon={<FaCalendarAlt />}
          />
          <StatCard
            label="Scheduled"
            value={stats.scheduled}
            icon={<FaCalendarAlt />}
          />
          <StatCard
            label="In progress"
            value={stats.active}
            icon={<FaPlay />}
          />
          <StatCard
            label="Awaiting"
            value={stats.awaiting}
            icon={<FaUserClock />}
          />
          <StatCard
            label="Completed"
            value={stats.completed}
            icon={<FaCheck />}
          />
          <StatCard
            label="Requests"
            value={stats.requests}
            icon={<FaExclamationTriangle />}
          />
        </div>

        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_220px_220px]">
          <label className="flex items-center gap-3 rounded-xl border border-slate-300 px-3 py-2.5">
            <FaSearch className="text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search student, teacher or location"
              className="w-full bg-transparent text-sm outline-none"
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
            value={requestType}
            onChange={(event) => setRequestType(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm"
          >
            <option value="all">All requests</option>
            <option value="reschedule">Pending reschedules</option>
            <option value="cancellation">Pending cancellations</option>
          </select>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
            Loading lessons...
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
            No lessons found.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLessons.map((lesson) => (
              <article
                key={lesson._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-900">
                        {lesson.student?.name || "Student"}
                      </h2>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(lesson.status)}`}
                      >
                        {statusLabel(lesson.status)}
                      </span>
                    </div>

                    <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-3">
                      <p>
                        <span className="font-semibold text-slate-800">
                          Teacher:
                        </span>{" "}
                        {lesson.teacher?.name || "Not assigned"}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-800">
                          Date:
                        </span>{" "}
                        {formatLessonDate(lesson.lessonDate)}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-800">
                          Time:
                        </span>{" "}
                        {lesson.startTime}–{lesson.endTime}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-800">
                          Vehicle:
                        </span>{" "}
                        {getVehicleType(lesson)}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-800">
                          Location:
                        </span>{" "}
                        {getLessonLocation(lesson)}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-800">
                          Payment:
                        </span>{" "}
                        {lesson.booking?.paymentStatus || "unknown"}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                        Student attendance:{" "}
                        {lesson.attendance?.studentStatus || "pending"}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                        Teacher attendance:{" "}
                        {lesson.attendance?.teacherStatus || "pending"}
                      </span>
                      {lesson.lessonProgress?.performance && (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
                          Performance:{" "}
                          {lesson.lessonProgress.performance.replaceAll(
                            "_",
                            " ",
                          )}
                        </span>
                      )}
                      {lesson.lessonProgress?.rating && (
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">
                          Rating: {lesson.lessonProgress.rating}/5
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
                    {lesson.status === "scheduled" && (
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => openEditForm(lesson)}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 disabled:opacity-50"
                      >
                        <FaEdit /> Edit
                      </button>
                    )}

                    {lesson.status === "scheduled" && (
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => handleStart(lesson)}
                        className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <FaPlay /> Start
                      </button>
                    )}

                    {lesson.status === "in_progress" && (
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => openCompletionModal(lesson)}
                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <FaCheck /> Submit Report
                      </button>
                    )}

                    {lesson.status === "awaiting_confirmation" && (
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => handleFinalize(lesson)}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#16458f] px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <FaCheck /> Confirm Complete
                      </button>
                    )}

                    {["scheduled", "in_progress"].includes(lesson.status) && (
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => handleNoShow(lesson)}
                        className="rounded-lg bg-slate-700 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        No-show
                      </button>
                    )}

                    {!["completed", "cancelled", "no_show"].includes(
                      lesson.status,
                    ) && (
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => handleDirectCancel(lesson)}
                        className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <FaTimes /> Cancel
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 lg:grid-cols-2">
                  <RequestBox
                    title="Reschedule request"
                    request={lesson.rescheduleRequest}
                    disabled={saving}
                    onApprove={() => resolveRequest(lesson, "reschedule", true)}
                    onReject={() => resolveRequest(lesson, "reschedule", false)}
                  />
                  <RequestBox
                    title="Cancellation request"
                    request={lesson.cancellationRequest}
                    disabled={saving}
                    onApprove={() =>
                      resolveRequest(lesson, "cancellation", true)
                    }
                    onReject={() =>
                      resolveRequest(lesson, "cancellation", false)
                    }
                  />
                </div>

                {(lesson.lessonProgress?.teacherNotes ||
                  lesson.lessonProgress?.studentNotes ||
                  lesson.lessonProgress?.skillsCovered?.length > 0 ||
                  lesson.lessonProgress?.areasToImprove?.length > 0 ||
                  lesson.lessonProgress?.nextLessonRecommendation) && (
                  <div className="mt-4 grid gap-4 rounded-xl bg-slate-50 p-4 text-sm md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="font-semibold text-slate-800">
                        Teacher report
                      </p>
                      <p className="text-slate-600">
                        {lesson.lessonProgress?.teacherNotes || "No notes"}
                      </p>

                      {lesson.lessonProgress?.skillsCovered?.length > 0 && (
                        <p className="text-slate-600">
                          <span className="font-semibold text-slate-700">
                            Skills:
                          </span>{" "}
                          {lesson.lessonProgress.skillsCovered.join(", ")}
                        </p>
                      )}

                      {lesson.lessonProgress?.areasToImprove?.length > 0 && (
                        <p className="text-slate-600">
                          <span className="font-semibold text-slate-700">
                            Improve:
                          </span>{" "}
                          {lesson.lessonProgress.areasToImprove.join(", ")}
                        </p>
                      )}

                      {lesson.lessonProgress?.nextLessonRecommendation && (
                        <p className="text-slate-600">
                          <span className="font-semibold text-slate-700">
                            Next lesson:
                          </span>{" "}
                          {lesson.lessonProgress.nextLessonRecommendation}
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-800">
                        Student feedback
                      </p>
                      <p className="mt-1 text-slate-600">
                        {lesson.lessonProgress?.studentNotes || "No feedback"}
                      </p>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
