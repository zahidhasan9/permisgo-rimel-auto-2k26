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

import { useCallback, useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCheck,
  FaEdit,
  FaEye,
  FaPlay,
  FaPlus,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

import AsyncUserSelect from "@/components/AsyncUserSelect";
import Pagination from "@/components/Pagination";
import {
  cancelLesson,
  completeLesson,
  confirmAttendance,
  confirmLessonCompletion,
  createLesson,
  getLessonStats,
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
import useDebouncedValue from "@/hooks/useDebouncedValue";

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

const EMPTY_REPORT = {
  teacherNotes: "",
  skillsCovered: "",
  areasToImprove: "",
  nextLessonRecommendation: "",
  performance: "satisfactory",
  adminNote: "",
};

const INITIAL_META = {
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 1,
};

const INITIAL_STATS = {
  total: 0,
  scheduled: 0,
  in_progress: 0,
  awaiting_confirmation: 0,
  completed: 0,
  cancelled: 0,
  no_show: 0,
  pendingRequests: 0,
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

const getUserLabel = (user, fallback) =>
  user?.name || user?.email || user?.phone || fallback;

function Modal({ title, children, onClose, maxWidth = "max-w-3xl" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div
        className={`max-h-[94vh] w-full overflow-y-auto rounded-2xl bg-white shadow-2xl ${maxWidth}`}
      >
        <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-5 py-4">
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

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value || 0}</p>
    </div>
  );
}

function RequestPanel({ title, request, saving, onResolve }) {
  if (!request || request.status === "none") return null;

  return (
    <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 text-sm">
      <div className="flex justify-between gap-3">
        <p className="font-bold text-violet-900">{title}</p>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-violet-700">
          {requestLabel(request.status)}
        </span>
      </div>

      {request.requestedDate && (
        <p className="mt-2 text-violet-800">
          Requested: {formatLessonDate(request.requestedDate)}{" "}
          {request.startTime || ""}–{request.endTime || ""}
        </p>
      )}

      {request.reason && (
        <p className="mt-1 text-violet-800">Reason: {request.reason}</p>
      )}

      {request.adminNote && (
        <p className="mt-1 text-violet-800">Admin note: {request.adminNote}</p>
      )}

      {request.status === "pending" && (
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => onResolve(true)}
            className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
          >
            Approve
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => onResolve(false)}
            className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdminLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [meta, setMeta] = useState(INITIAL_META);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [notice, setNotice] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [status, setStatus] = useState("all");
  const [requestType, setRequestType] = useState("all");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const debouncedSearch = useDebouncedValue(search, 500);

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const [reportLesson, setReportLesson] = useState(null);
  const [reportForm, setReportForm] = useState(EMPTY_REPORT);

  const loadStats = useCallback(async () => {
    try {
      const response = await getLessonStats();
      setStats({ ...INITIAL_STATS, ...(unwrap(response, {}) || {}) });
    } catch {
      setStats(INITIAL_STATS);
    }
  }, []);

  const loadLessons = useCallback(async () => {
    setLoading(true);

    try {
      const response = await getLessons({
        page,
        limit,
        status,
        requestType,
        requestStatus: requestType === "all" ? "all" : "pending",
        search: debouncedSearch,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
        sortOrder,
      });

      const data = unwrap(response, []);
      setLessons(Array.isArray(data) ? data : []);
      setMeta({
        ...INITIAL_META,
        ...(response?.data?.meta || {}),
      });
    } catch (error) {
      setLessons([]);
      setMeta(INITIAL_META);
      setNotice({
        type: "error",
        text: getErrorMessage(error, "Lessons could not be loaded."),
      });
    } finally {
      setLoading(false);
    }
  }, [
    dateFrom,
    dateTo,
    debouncedSearch,
    limit,
    page,
    requestType,
    sortOrder,
    status,
  ]);

  useEffect(() => {
    loadLessons();
  }, [loadLessons]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  useEffect(() => {
    setPage(1);
  }, [
    debouncedSearch,
    status,
    requestType,
    dateFrom,
    dateTo,
    sortOrder,
    limit,
  ]);

  const refresh = async () => {
    await Promise.all([loadLessons(), loadStats()]);
  };

  const replaceLesson = (updatedLesson) => {
    if (!updatedLesson?._id) return;

    setLessons((current) =>
      current.map((lesson) =>
        lesson._id === updatedLesson._id ? updatedLesson : lesson,
      ),
    );

    setSelectedLesson((current) =>
      current?._id === updatedLesson._id ? updatedLesson : current,
    );
  };

  const runAction = async (lesson, action, successMessage) => {
    setSavingId(lesson._id);
    setNotice(null);

    try {
      const response = await action();
      const updatedLesson = unwrap(response);

      if (updatedLesson?._id) replaceLesson(updatedLesson);
      else await refresh();

      setNotice({ type: "success", text: successMessage });
      await loadStats();
      return updatedLesson;
    } catch (error) {
      setNotice({
        type: "error",
        text: getErrorMessage(error, "The action could not be completed."),
      });
      return null;
    } finally {
      setSavingId("");
    }
  };

  const openCreateForm = () => {
    setEditingLesson(null);
    setSelectedStudent(null);
    setSelectedTeacher(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEditForm = (lesson) => {
    if (lesson.status !== "scheduled") {
      setNotice({
        type: "error",
        text: "Only a scheduled lesson can be edited.",
      });
      return;
    }

    setEditingLesson(lesson);
    setSelectedStudent(lesson.student || null);
    setSelectedTeacher(lesson.teacher || null);
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
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const lessonForSaving = editingLesson || { _id: "new" };
    setSavingId(lessonForSaving._id);
    setNotice(null);

    try {
      const payload = {
        teacher: form.teacher,
        lessonDate: form.lessonDate,
        startTime: form.startTime,
        endTime: form.endTime,
        vehicleType: form.vehicleType,
        paymentStatus: form.paymentStatus,
        location: {
          address: form.address.trim(),
          city: form.city.trim(),
        },
      };

      if (!editingLesson) payload.student = form.student;

      await (editingLesson
        ? updateLesson(editingLesson._id, payload)
        : createLesson(payload));

      setShowForm(false);
      setEditingLesson(null);
      setForm(EMPTY_FORM);
      setSelectedStudent(null);
      setSelectedTeacher(null);
      setNotice({
        type: "success",
        text: editingLesson ? "Lesson updated." : "Lesson scheduled.",
      });
      await refresh();
    } catch (error) {
      setNotice({
        type: "error",
        text: getErrorMessage(error, "Lesson could not be saved."),
      });
    } finally {
      setSavingId("");
    }
  };

  const openReportForm = (lesson) => {
    setReportLesson(lesson);
    setReportForm({
      teacherNotes: lesson.lessonProgress?.teacherNotes || "",
      skillsCovered: lesson.lessonProgress?.skillsCovered?.join(", ") || "",
      areasToImprove: lesson.lessonProgress?.areasToImprove?.join(", ") || "",
      nextLessonRecommendation:
        lesson.lessonProgress?.nextLessonRecommendation || "",
      performance:
        lesson.lessonProgress?.performance === "not_assessed"
          ? "satisfactory"
          : lesson.lessonProgress?.performance || "satisfactory",
      adminNote: lesson.attendance?.adminNote || "",
    });
  };

  const submitReport = async (event) => {
    event.preventDefault();

    if (!reportLesson) return;

    const skillsCovered = splitTextList(reportForm.skillsCovered);

    if (!skillsCovered.length || !reportForm.teacherNotes.trim()) {
      setNotice({
        type: "error",
        text: "Teacher notes and at least one covered skill are required.",
      });
      return;
    }

    setSavingId(reportLesson._id);
    setNotice(null);

    try {
      await confirmAttendance(reportLesson._id, {
        participant: "student",
        status: "present",
        adminNote: reportForm.adminNote.trim(),
      });

      await confirmAttendance(reportLesson._id, {
        participant: "teacher",
        status: "present",
        adminNote: reportForm.adminNote.trim(),
      });

      const response = await completeLesson(reportLesson._id, {
        finalize: false,
        lessonProgress: {
          teacherNotes: reportForm.teacherNotes.trim(),
          skillsCovered,
          areasToImprove: splitTextList(reportForm.areasToImprove),
          nextLessonRecommendation: reportForm.nextLessonRecommendation.trim(),
          performance: reportForm.performance,
        },
      });

      const updated = unwrap(response);
      if (updated?._id) replaceLesson(updated);

      setReportLesson(null);
      setReportForm(EMPTY_REPORT);
      setNotice({
        type: "success",
        text: "Report submitted. Waiting for completion confirmation.",
      });
      await refresh();
    } catch (error) {
      setNotice({
        type: "error",
        text: getErrorMessage(error, "Report could not be submitted."),
      });
    } finally {
      setSavingId("");
    }
  };

  const resolveRequest = async (lesson, type, approve) => {
    const adminNote = window.prompt(
      approve ? "Approval note (optional):" : "Rejection reason:",
      "",
    );

    if (adminNote === null) return;

    await runAction(
      lesson,
      () =>
        type === "reschedule"
          ? resolveLessonReschedule(lesson._id, { approve, adminNote })
          : resolveLessonCancellation(lesson._id, { approve, adminNote }),
      approve ? "Request approved." : "Request rejected.",
    );

    await refresh();
  };

  const directCancel = async (lesson) => {
    const reason = window.prompt("Cancellation reason:");
    if (!reason?.trim()) return;

    await runAction(
      lesson,
      () => cancelLesson(lesson._id, { reason: reason.trim() }),
      "Lesson cancelled.",
    );

    await refresh();
  };

  const noShow = async (lesson) => {
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

    await refresh();
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-[1500px] space-y-5">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Scalable lesson management
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Lessons</h1>
            <p className="mt-2 text-sm text-slate-600">
              Only the current page is loaded from MongoDB. Search, filters and
              pagination run on the server.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={refresh}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={openCreateForm}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white"
            >
              <FaPlus /> Schedule lesson
            </button>
          </div>
        </header>

        {notice?.text && (
          <div
            className={`flex justify-between gap-4 rounded-xl border px-4 py-3 text-sm ${
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

        <section className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
          <Stat label="Total" value={stats.total} />
          <Stat label="Scheduled" value={stats.scheduled} />
          <Stat label="In progress" value={stats.in_progress} />
          <Stat label="Awaiting" value={stats.awaiting_confirmation} />
          <Stat label="Completed" value={stats.completed} />
          <Stat label="Cancelled" value={stats.cancelled} />
          <Stat label="No-show" value={stats.no_show} />
          <Stat label="Pending requests" value={stats.pendingRequests} />
        </section>

        <section className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2 xl:grid-cols-7">
          <label className="relative md:col-span-2 xl:col-span-2">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Student or teacher name, email, phone, lesson ID"
              className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
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

          <input
            type="date"
            value={dateFrom}
            onChange={(event) => setDateFrom(event.target.value)}
            className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
            title="Date from"
          />

          <input
            type="date"
            value={dateTo}
            onChange={(event) => setDateTo(event.target.value)}
            className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
            title="Date to"
          />

          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm"
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full text-left text-sm">
              <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
                <tr>
                  <th className="px-4 py-3">Date & time</th>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Teacher</th>
                  <th className="px-4 py-3">Vehicle / location</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Request</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-14 text-center text-slate-500"
                    >
                      Loading lessons...
                    </td>
                  </tr>
                ) : lessons.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-14 text-center text-slate-500"
                    >
                      No lessons matched the current filters.
                    </td>
                  </tr>
                ) : (
                  lessons.map((lesson) => {
                    const pendingRequest =
                      lesson.rescheduleRequest?.status === "pending"
                        ? "Reschedule"
                        : lesson.cancellationRequest?.status === "pending"
                          ? "Cancellation"
                          : "—";

                    return (
                      <tr key={lesson._id} className="hover:bg-slate-50">
                        <td className="px-4 py-4">
                          <p className="font-bold text-slate-900">
                            {formatLessonDate(lesson.lessonDate)}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {lesson.startTime || "--"}–{lesson.endTime || "--"}
                          </p>
                        </td>

                        <td className="px-4 py-4">
                          <p className="font-semibold text-slate-800">
                            {getUserLabel(lesson.student, "Student")}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {lesson.student?.email ||
                              lesson.student?.phone ||
                              ""}
                          </p>
                        </td>

                        <td className="px-4 py-4">
                          <p className="font-semibold text-slate-800">
                            {getUserLabel(lesson.teacher, "Teacher")}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {lesson.teacher?.email ||
                              lesson.teacher?.phone ||
                              ""}
                          </p>
                        </td>

                        <td className="px-4 py-4">
                          <p className="font-semibold text-slate-800">
                            {getVehicleType(lesson)}
                          </p>
                          <p className="mt-1 max-w-52 truncate text-xs text-slate-500">
                            {getLessonLocation(lesson)}
                          </p>
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
                          <span
                            className={
                              pendingRequest === "—"
                                ? "text-slate-400"
                                : "font-semibold text-violet-700"
                            }
                          >
                            {pendingRequest}
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
                                onClick={() => openEditForm(lesson)}
                                className="rounded-lg border border-slate-300 p-2 text-slate-700"
                                title="Edit"
                              >
                                <FaEdit />
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

      {showForm && (
        <Modal
          title={editingLesson ? "Edit lesson" : "Schedule lesson"}
          onClose={() => setShowForm(false)}
        >
          <form onSubmit={submitForm} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              {!editingLesson && (
                <AsyncUserSelect
                  role="student"
                  label="Student"
                  required
                  value={form.student}
                  selectedUser={selectedStudent}
                  onChange={(user) => {
                    setSelectedStudent(user);
                    setForm((current) => ({
                      ...current,
                      student: user._id,
                    }));
                  }}
                />
              )}

              <AsyncUserSelect
                role="teacher"
                label="Teacher"
                required
                value={form.teacher}
                selectedUser={selectedTeacher}
                onChange={(user) => {
                  setSelectedTeacher(user);
                  setForm((current) => ({
                    ...current,
                    teacher: user._id,
                  }));
                }}
              />

              <label className="text-sm font-semibold text-slate-700">
                Lesson date *
                <input
                  type="date"
                  required
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

              <label className="text-sm font-semibold text-slate-700">
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

              <label className="text-sm font-semibold text-slate-700">
                Start time *
                <input
                  type="time"
                  required
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

              <label className="text-sm font-semibold text-slate-700">
                End time *
                <input
                  type="time"
                  required
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

              <label className="text-sm font-semibold text-slate-700">
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
                />
              </label>

              <label className="text-sm font-semibold text-slate-700">
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
                />
              </label>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={Boolean(savingId)}
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
              >
                {savingId
                  ? "Saving..."
                  : editingLesson
                    ? "Save changes"
                    : "Schedule"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {selectedLesson && (
        <Modal
          title="Lesson details"
          onClose={() => setSelectedLesson(null)}
          maxWidth="max-w-5xl"
        >
          <div className="space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(
                    selectedLesson.status,
                  )}`}
                >
                  {statusLabel(selectedLesson.status)}
                </span>
                <h3 className="mt-3 text-2xl font-bold text-slate-900">
                  {getUserLabel(selectedLesson.student, "Student")}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Teacher:{" "}
                  {getUserLabel(selectedLesson.teacher, "Not assigned")}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-slate-900">
                  {formatLessonDate(selectedLesson.lessonDate)}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {selectedLesson.startTime}–{selectedLesson.endTime}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Vehicle", getVehicleType(selectedLesson)],
                ["Location", getLessonLocation(selectedLesson)],
                [
                  "Student attendance",
                  selectedLesson.attendance?.studentStatus || "pending",
                ],
                [
                  "Teacher attendance",
                  selectedLesson.attendance?.teacherStatus || "pending",
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-xs font-bold uppercase text-slate-400">
                    {label}
                  </p>
                  <p className="mt-1 font-semibold capitalize text-slate-800">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedLesson.status === "scheduled" && (
                <>
                  <button
                    type="button"
                    disabled={Boolean(savingId)}
                    onClick={() =>
                      runAction(
                        selectedLesson,
                        () => startLesson(selectedLesson._id),
                        "Lesson started.",
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
                  >
                    <FaPlay /> Start
                  </button>

                  <button
                    type="button"
                    onClick={() => openEditForm(selectedLesson)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700"
                  >
                    <FaEdit /> Edit
                  </button>
                </>
              )}

              {selectedLesson.status === "in_progress" && (
                <button
                  type="button"
                  onClick={() => openReportForm(selectedLesson)}
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white"
                >
                  <FaCheck /> Submit report
                </button>
              )}

              {selectedLesson.status === "awaiting_confirmation" && (
                <button
                  type="button"
                  disabled={Boolean(savingId)}
                  onClick={() =>
                    runAction(
                      selectedLesson,
                      () => confirmLessonCompletion(selectedLesson._id),
                      "Lesson completion confirmed.",
                    )
                  }
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
                >
                  Confirm completion
                </button>
              )}

              {["scheduled", "in_progress"].includes(selectedLesson.status) && (
                <button
                  type="button"
                  onClick={() => noShow(selectedLesson)}
                  className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-bold text-white"
                >
                  Student no-show
                </button>
              )}

              {!["completed", "cancelled", "no_show"].includes(
                selectedLesson.status,
              ) && (
                <button
                  type="button"
                  onClick={() => directCancel(selectedLesson)}
                  className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white"
                >
                  Cancel lesson
                </button>
              )}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <RequestPanel
                title="Reschedule request"
                request={selectedLesson.rescheduleRequest}
                saving={Boolean(savingId)}
                onResolve={(approve) =>
                  resolveRequest(selectedLesson, "reschedule", approve)
                }
              />
              <RequestPanel
                title="Cancellation request"
                request={selectedLesson.cancellationRequest}
                saving={Boolean(savingId)}
                onResolve={(approve) =>
                  resolveRequest(selectedLesson, "cancellation", approve)
                }
              />
            </div>

            {(selectedLesson.lessonProgress?.teacherNotes ||
              selectedLesson.lessonProgress?.skillsCovered?.length ||
              selectedLesson.lessonProgress?.studentNotes) && (
              <div className="grid gap-4 rounded-xl bg-slate-50 p-4 lg:grid-cols-2">
                <div>
                  <p className="font-bold text-slate-900">Teacher report</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
                    {selectedLesson.lessonProgress?.teacherNotes || "No notes"}
                  </p>
                  {!!selectedLesson.lessonProgress?.skillsCovered?.length && (
                    <p className="mt-3 text-sm text-slate-700">
                      <strong>Skills:</strong>{" "}
                      {selectedLesson.lessonProgress.skillsCovered.join(", ")}
                    </p>
                  )}
                </div>
                <div>
                  <p className="font-bold text-slate-900">Student feedback</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
                    {selectedLesson.lessonProgress?.studentNotes ||
                      "No feedback submitted."}
                  </p>
                  {selectedLesson.lessonProgress?.rating && (
                    <p className="mt-3 font-bold text-amber-600">
                      Rating: {selectedLesson.lessonProgress.rating}/5
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {reportLesson && (
        <Modal
          title="Submit lesson report"
          onClose={() => setReportLesson(null)}
        >
          <form onSubmit={submitReport} className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">
              Skills covered *
              <textarea
                required
                rows={3}
                value={reportForm.skillsCovered}
                onChange={(event) =>
                  setReportForm((current) => ({
                    ...current,
                    skillsCovered: event.target.value,
                  }))
                }
                placeholder="Parking, steering, junctions"
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
              />
            </label>

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

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700">
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

              <label className="text-sm font-semibold text-slate-700">
                Admin note
                <input
                  value={reportForm.adminNote}
                  onChange={(event) =>
                    setReportForm((current) => ({
                      ...current,
                      adminNote: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
                />
              </label>
            </div>

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
                disabled={Boolean(savingId)}
                className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
              >
                {savingId ? "Submitting..." : "Submit report"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </main>
  );
}
