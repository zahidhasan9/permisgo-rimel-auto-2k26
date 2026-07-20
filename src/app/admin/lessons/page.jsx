// "use client";

// import { useCallback, useEffect, useState } from "react";
// import {
//   FaCalendarAlt,
//   FaCheck,
//   FaEdit,
//   FaEye,
//   FaPlay,
//   FaPlus,
//   FaSearch,
//   FaTimes,
// } from "react-icons/fa";

// import AsyncUserSelect from "@/components/AsyncUserSelect";
// import Pagination from "@/components/Pagination";
// import {
//   cancelLesson,
//   completeLesson,
//   confirmAttendance,
//   confirmLessonCompletion,
//   createLesson,
//   getLessonStats,
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
// import useDebouncedValue from "@/hooks/useDebouncedValue";

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

// const EMPTY_REPORT = {
//   teacherNotes: "",
//   skillsCovered: "",
//   areasToImprove: "",
//   nextLessonRecommendation: "",
//   performance: "satisfactory",
//   adminNote: "",
// };

// const INITIAL_META = {
//   page: 1,
//   limit: 20,
//   total: 0,
//   totalPages: 1,
// };

// const INITIAL_STATS = {
//   total: 0,
//   scheduled: 0,
//   in_progress: 0,
//   awaiting_confirmation: 0,
//   completed: 0,
//   cancelled: 0,
//   no_show: 0,
//   pendingRequests: 0,
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

// const getUserLabel = (user, fallback) =>
//   user?.name || user?.email || user?.phone || fallback;

// function Modal({ title, children, onClose, maxWidth = "max-w-3xl" }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
//       <div
//         className={`max-h-[94vh] w-full overflow-y-auto rounded-2xl bg-white shadow-2xl ${maxWidth}`}
//       >
//         <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-5 py-4">
//           <h2 className="text-lg font-bold text-slate-900">{title}</h2>
//           <button
//             type="button"
//             onClick={onClose}
//             className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
//           >
//             <FaTimes />
//           </button>
//         </div>
//         <div className="p-5">{children}</div>
//       </div>
//     </div>
//   );
// }

// function Stat({ label, value }) {
//   return (
//     <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
//       <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
//         {label}
//       </p>
//       <p className="mt-2 text-2xl font-bold text-slate-900">{value || 0}</p>
//     </div>
//   );
// }

// function RequestPanel({ title, request, saving, onResolve }) {
//   if (!request || request.status === "none") return null;

//   return (
//     <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 text-sm">
//       <div className="flex justify-between gap-3">
//         <p className="font-bold text-violet-900">{title}</p>
//         <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-violet-700">
//           {requestLabel(request.status)}
//         </span>
//       </div>

//       {request.requestedDate && (
//         <p className="mt-2 text-violet-800">
//           Requested: {formatLessonDate(request.requestedDate)}{" "}
//           {request.startTime || ""}–{request.endTime || ""}
//         </p>
//       )}

//       {request.reason && (
//         <p className="mt-1 text-violet-800">Reason: {request.reason}</p>
//       )}

//       {request.adminNote && (
//         <p className="mt-1 text-violet-800">Admin note: {request.adminNote}</p>
//       )}

//       {request.status === "pending" && (
//         <div className="mt-3 flex gap-2">
//           <button
//             type="button"
//             disabled={saving}
//             onClick={() => onResolve(true)}
//             className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
//           >
//             Approve
//           </button>
//           <button
//             type="button"
//             disabled={saving}
//             onClick={() => onResolve(false)}
//             className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
//           >
//             Reject
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default function AdminLessonsPage() {
//   const [lessons, setLessons] = useState([]);
//   const [meta, setMeta] = useState(INITIAL_META);
//   const [stats, setStats] = useState(INITIAL_STATS);
//   const [loading, setLoading] = useState(true);
//   const [savingId, setSavingId] = useState("");
//   const [notice, setNotice] = useState(null);

//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(20);
//   const [status, setStatus] = useState("all");
//   const [requestType, setRequestType] = useState("all");
//   const [search, setSearch] = useState("");
//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const debouncedSearch = useDebouncedValue(search, 500);

//   const [selectedLesson, setSelectedLesson] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [editingLesson, setEditingLesson] = useState(null);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [selectedTeacher, setSelectedTeacher] = useState(null);
//   const [form, setForm] = useState(EMPTY_FORM);

//   const [reportLesson, setReportLesson] = useState(null);
//   const [reportForm, setReportForm] = useState(EMPTY_REPORT);

//   const loadStats = useCallback(async () => {
//     try {
//       const response = await getLessonStats();
//       setStats({ ...INITIAL_STATS, ...(unwrap(response, {}) || {}) });
//     } catch {
//       setStats(INITIAL_STATS);
//     }
//   }, []);

//   const loadLessons = useCallback(async () => {
//     setLoading(true);

//     try {
//       const response = await getLessons({
//         page,
//         limit,
//         status,
//         requestType,
//         requestStatus: requestType === "all" ? "all" : "pending",
//         search: debouncedSearch,
//         dateFrom: dateFrom || undefined,
//         dateTo: dateTo || undefined,
//         sortOrder,
//       });

//       const data = unwrap(response, []);
//       setLessons(Array.isArray(data) ? data : []);
//       setMeta({
//         ...INITIAL_META,
//         ...(response?.data?.meta || {}),
//       });
//     } catch (error) {
//       setLessons([]);
//       setMeta(INITIAL_META);
//       setNotice({
//         type: "error",
//         text: getErrorMessage(error, "Lessons could not be loaded."),
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, [
//     dateFrom,
//     dateTo,
//     debouncedSearch,
//     limit,
//     page,
//     requestType,
//     sortOrder,
//     status,
//   ]);

//   useEffect(() => {
//     loadLessons();
//   }, [loadLessons]);

//   useEffect(() => {
//     loadStats();
//   }, [loadStats]);

//   useEffect(() => {
//     setPage(1);
//   }, [
//     debouncedSearch,
//     status,
//     requestType,
//     dateFrom,
//     dateTo,
//     sortOrder,
//     limit,
//   ]);

//   const refresh = async () => {
//     await Promise.all([loadLessons(), loadStats()]);
//   };

//   const replaceLesson = (updatedLesson) => {
//     if (!updatedLesson?._id) return;

//     setLessons((current) =>
//       current.map((lesson) =>
//         lesson._id === updatedLesson._id ? updatedLesson : lesson,
//       ),
//     );

//     setSelectedLesson((current) =>
//       current?._id === updatedLesson._id ? updatedLesson : current,
//     );
//   };

//   const runAction = async (lesson, action, successMessage) => {
//     setSavingId(lesson._id);
//     setNotice(null);

//     try {
//       const response = await action();
//       const updatedLesson = unwrap(response);

//       if (updatedLesson?._id) replaceLesson(updatedLesson);
//       else await refresh();

//       setNotice({ type: "success", text: successMessage });
//       await loadStats();
//       return updatedLesson;
//     } catch (error) {
//       setNotice({
//         type: "error",
//         text: getErrorMessage(error, "The action could not be completed."),
//       });
//       return null;
//     } finally {
//       setSavingId("");
//     }
//   };

//   const openCreateForm = () => {
//     setEditingLesson(null);
//     setSelectedStudent(null);
//     setSelectedTeacher(null);
//     setForm(EMPTY_FORM);
//     setShowForm(true);
//   };

//   const openEditForm = (lesson) => {
//     if (lesson.status !== "scheduled") {
//       setNotice({
//         type: "error",
//         text: "Only a scheduled lesson can be edited.",
//       });
//       return;
//     }

//     setEditingLesson(lesson);
//     setSelectedStudent(lesson.student || null);
//     setSelectedTeacher(lesson.teacher || null);
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
//   };

//   const submitForm = async (event) => {
//     event.preventDefault();

//     const lessonForSaving = editingLesson || { _id: "new" };
//     setSavingId(lessonForSaving._id);
//     setNotice(null);

//     try {
//       const payload = {
//         teacher: form.teacher,
//         lessonDate: form.lessonDate,
//         startTime: form.startTime,
//         endTime: form.endTime,
//         vehicleType: form.vehicleType,
//         paymentStatus: form.paymentStatus,
//         location: {
//           address: form.address.trim(),
//           city: form.city.trim(),
//         },
//       };

//       if (!editingLesson) payload.student = form.student;

//       await (editingLesson
//         ? updateLesson(editingLesson._id, payload)
//         : createLesson(payload));

//       setShowForm(false);
//       setEditingLesson(null);
//       setForm(EMPTY_FORM);
//       setSelectedStudent(null);
//       setSelectedTeacher(null);
//       setNotice({
//         type: "success",
//         text: editingLesson ? "Lesson updated." : "Lesson scheduled.",
//       });
//       await refresh();
//     } catch (error) {
//       setNotice({
//         type: "error",
//         text: getErrorMessage(error, "Lesson could not be saved."),
//       });
//     } finally {
//       setSavingId("");
//     }
//   };

//   const openReportForm = (lesson) => {
//     setReportLesson(lesson);
//     setReportForm({
//       teacherNotes: lesson.lessonProgress?.teacherNotes || "",
//       skillsCovered: lesson.lessonProgress?.skillsCovered?.join(", ") || "",
//       areasToImprove: lesson.lessonProgress?.areasToImprove?.join(", ") || "",
//       nextLessonRecommendation:
//         lesson.lessonProgress?.nextLessonRecommendation || "",
//       performance:
//         lesson.lessonProgress?.performance === "not_assessed"
//           ? "satisfactory"
//           : lesson.lessonProgress?.performance || "satisfactory",
//       adminNote: lesson.attendance?.adminNote || "",
//     });
//   };

//   const submitReport = async (event) => {
//     event.preventDefault();

//     if (!reportLesson) return;

//     const skillsCovered = splitTextList(reportForm.skillsCovered);

//     if (!skillsCovered.length || !reportForm.teacherNotes.trim()) {
//       setNotice({
//         type: "error",
//         text: "Teacher notes and at least one covered skill are required.",
//       });
//       return;
//     }

//     setSavingId(reportLesson._id);
//     setNotice(null);

//     try {
//       await confirmAttendance(reportLesson._id, {
//         participant: "student",
//         status: "present",
//         adminNote: reportForm.adminNote.trim(),
//       });

//       await confirmAttendance(reportLesson._id, {
//         participant: "teacher",
//         status: "present",
//         adminNote: reportForm.adminNote.trim(),
//       });

//       const response = await completeLesson(reportLesson._id, {
//         finalize: false,
//         lessonProgress: {
//           teacherNotes: reportForm.teacherNotes.trim(),
//           skillsCovered,
//           areasToImprove: splitTextList(reportForm.areasToImprove),
//           nextLessonRecommendation: reportForm.nextLessonRecommendation.trim(),
//           performance: reportForm.performance,
//         },
//       });

//       const updated = unwrap(response);
//       if (updated?._id) replaceLesson(updated);

//       setReportLesson(null);
//       setReportForm(EMPTY_REPORT);
//       setNotice({
//         type: "success",
//         text: "Report submitted. Waiting for completion confirmation.",
//       });
//       await refresh();
//     } catch (error) {
//       setNotice({
//         type: "error",
//         text: getErrorMessage(error, "Report could not be submitted."),
//       });
//     } finally {
//       setSavingId("");
//     }
//   };

//   const resolveRequest = async (lesson, type, approve) => {
//     const adminNote = window.prompt(
//       approve ? "Approval note (optional):" : "Rejection reason:",
//       "",
//     );

//     if (adminNote === null) return;

//     await runAction(
//       lesson,
//       () =>
//         type === "reschedule"
//           ? resolveLessonReschedule(lesson._id, { approve, adminNote })
//           : resolveLessonCancellation(lesson._id, { approve, adminNote }),
//       approve ? "Request approved." : "Request rejected.",
//     );

//     await refresh();
//   };

//   const directCancel = async (lesson) => {
//     const reason = window.prompt("Cancellation reason:");
//     if (!reason?.trim()) return;

//     await runAction(
//       lesson,
//       () => cancelLesson(lesson._id, { reason: reason.trim() }),
//       "Lesson cancelled.",
//     );

//     await refresh();
//   };

//   const noShow = async (lesson) => {
//     const reason = window.prompt(
//       "No-show note:",
//       "Student did not attend the lesson.",
//     );
//     if (!reason?.trim()) return;

//     await runAction(
//       lesson,
//       () =>
//         markLessonNoShow(lesson._id, {
//           participant: "student",
//           reason: reason.trim(),
//         }),
//       "Student no-show recorded.",
//     );

//     await refresh();
//   };

//   return (
//     <main className="min-h-screen bg-slate-50 p-4 md:p-6">
//       <div className="mx-auto max-w-[1500px] space-y-5">
//         <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
//           <div>
//             <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
//               Scalable lesson management
//             </p>
//             <h1 className="mt-1 text-3xl font-bold text-slate-900">Lessons</h1>
//             <p className="mt-2 text-sm text-slate-600">
//               Only the current page is loaded from MongoDB. Search, filters and
//               pagination run on the server.
//             </p>
//           </div>

//           <div className="flex gap-2">
//             <button
//               type="button"
//               onClick={refresh}
//               className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700"
//             >
//               Refresh
//             </button>
//             <button
//               type="button"
//               onClick={openCreateForm}
//               className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white"
//             >
//               <FaPlus /> Schedule lesson
//             </button>
//           </div>
//         </header>

//         {notice?.text && (
//           <div
//             className={`flex justify-between gap-4 rounded-xl border px-4 py-3 text-sm ${
//               notice.type === "error"
//                 ? "border-rose-200 bg-rose-50 text-rose-700"
//                 : "border-emerald-200 bg-emerald-50 text-emerald-700"
//             }`}
//           >
//             <span>{notice.text}</span>
//             <button type="button" onClick={() => setNotice(null)}>
//               ×
//             </button>
//           </div>
//         )}

//         <section className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
//           <Stat label="Total" value={stats.total} />
//           <Stat label="Scheduled" value={stats.scheduled} />
//           <Stat label="In progress" value={stats.in_progress} />
//           <Stat label="Awaiting" value={stats.awaiting_confirmation} />
//           <Stat label="Completed" value={stats.completed} />
//           <Stat label="Cancelled" value={stats.cancelled} />
//           <Stat label="No-show" value={stats.no_show} />
//           <Stat label="Pending requests" value={stats.pendingRequests} />
//         </section>

//         <section className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2 xl:grid-cols-7">
//           <label className="relative md:col-span-2 xl:col-span-2">
//             <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//             <input
//               value={search}
//               onChange={(event) => setSearch(event.target.value)}
//               placeholder="Student or teacher name, email, phone, lesson ID"
//               className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
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

//           <input
//             type="date"
//             value={dateFrom}
//             onChange={(event) => setDateFrom(event.target.value)}
//             className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
//             title="Date from"
//           />

//           <input
//             type="date"
//             value={dateTo}
//             onChange={(event) => setDateTo(event.target.value)}
//             className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
//             title="Date to"
//           />

//           <select
//             value={sortOrder}
//             onChange={(event) => setSortOrder(event.target.value)}
//             className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm"
//           >
//             <option value="desc">Newest first</option>
//             <option value="asc">Oldest first</option>
//           </select>
//         </section>

//         <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="min-w-[1100px] w-full text-left text-sm">
//               <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
//                 <tr>
//                   <th className="px-4 py-3">Date & time</th>
//                   <th className="px-4 py-3">Student</th>
//                   <th className="px-4 py-3">Teacher</th>
//                   <th className="px-4 py-3">Vehicle / location</th>
//                   <th className="px-4 py-3">Status</th>
//                   <th className="px-4 py-3">Request</th>
//                   <th className="px-4 py-3 text-right">Action</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-slate-100">
//                 {loading ? (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       className="px-4 py-14 text-center text-slate-500"
//                     >
//                       Loading lessons...
//                     </td>
//                   </tr>
//                 ) : lessons.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       className="px-4 py-14 text-center text-slate-500"
//                     >
//                       No lessons matched the current filters.
//                     </td>
//                   </tr>
//                 ) : (
//                   lessons.map((lesson) => {
//                     const pendingRequest =
//                       lesson.rescheduleRequest?.status === "pending"
//                         ? "Reschedule"
//                         : lesson.cancellationRequest?.status === "pending"
//                           ? "Cancellation"
//                           : "—";

//                     return (
//                       <tr key={lesson._id} className="hover:bg-slate-50">
//                         <td className="px-4 py-4">
//                           <p className="font-bold text-slate-900">
//                             {formatLessonDate(lesson.lessonDate)}
//                           </p>
//                           <p className="mt-1 text-xs text-slate-500">
//                             {lesson.startTime || "--"}–{lesson.endTime || "--"}
//                           </p>
//                         </td>

//                         <td className="px-4 py-4">
//                           <p className="font-semibold text-slate-800">
//                             {getUserLabel(lesson.student, "Student")}
//                           </p>
//                           <p className="mt-1 text-xs text-slate-500">
//                             {lesson.student?.email ||
//                               lesson.student?.phone ||
//                               ""}
//                           </p>
//                         </td>

//                         <td className="px-4 py-4">
//                           <p className="font-semibold text-slate-800">
//                             {getUserLabel(lesson.teacher, "Teacher")}
//                           </p>
//                           <p className="mt-1 text-xs text-slate-500">
//                             {lesson.teacher?.email ||
//                               lesson.teacher?.phone ||
//                               ""}
//                           </p>
//                         </td>

//                         <td className="px-4 py-4">
//                           <p className="font-semibold text-slate-800">
//                             {getVehicleType(lesson)}
//                           </p>
//                           <p className="mt-1 max-w-52 truncate text-xs text-slate-500">
//                             {getLessonLocation(lesson)}
//                           </p>
//                         </td>

//                         <td className="px-4 py-4">
//                           <span
//                             className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(
//                               lesson.status,
//                             )}`}
//                           >
//                             {statusLabel(lesson.status)}
//                           </span>
//                         </td>

//                         <td className="px-4 py-4">
//                           <span
//                             className={
//                               pendingRequest === "—"
//                                 ? "text-slate-400"
//                                 : "font-semibold text-violet-700"
//                             }
//                           >
//                             {pendingRequest}
//                           </span>
//                         </td>

//                         <td className="px-4 py-4">
//                           <div className="flex justify-end gap-2">
//                             <button
//                               type="button"
//                               onClick={() => setSelectedLesson(lesson)}
//                               className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white"
//                             >
//                               <FaEye /> View
//                             </button>

//                             {lesson.status === "scheduled" && (
//                               <button
//                                 type="button"
//                                 onClick={() => openEditForm(lesson)}
//                                 className="rounded-lg border border-slate-300 p-2 text-slate-700"
//                                 title="Edit"
//                               >
//                                 <FaEdit />
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <Pagination
//             page={meta.page}
//             limit={meta.limit}
//             total={meta.total}
//             totalPages={meta.totalPages}
//             loading={loading}
//             onPageChange={setPage}
//             onLimitChange={(value) => {
//               setLimit(value);
//               setPage(1);
//             }}
//           />
//         </section>
//       </div>

//       {showForm && (
//         <Modal
//           title={editingLesson ? "Edit lesson" : "Schedule lesson"}
//           onClose={() => setShowForm(false)}
//         >
//           <form onSubmit={submitForm} className="space-y-5">
//             <div className="grid gap-4 md:grid-cols-2">
//               {!editingLesson && (
//                 <AsyncUserSelect
//                   role="student"
//                   label="Student"
//                   required
//                   value={form.student}
//                   selectedUser={selectedStudent}
//                   onChange={(user) => {
//                     setSelectedStudent(user);
//                     setForm((current) => ({
//                       ...current,
//                       student: user._id,
//                     }));
//                   }}
//                 />
//               )}

//               <AsyncUserSelect
//                 role="teacher"
//                 label="Teacher"
//                 required
//                 value={form.teacher}
//                 selectedUser={selectedTeacher}
//                 onChange={(user) => {
//                   setSelectedTeacher(user);
//                   setForm((current) => ({
//                     ...current,
//                     teacher: user._id,
//                   }));
//                 }}
//               />

//               <label className="text-sm font-semibold text-slate-700">
//                 Lesson date *
//                 <input
//                   type="date"
//                   required
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

//               <label className="text-sm font-semibold text-slate-700">
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

//               <label className="text-sm font-semibold text-slate-700">
//                 Start time *
//                 <input
//                   type="time"
//                   required
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

//               <label className="text-sm font-semibold text-slate-700">
//                 End time *
//                 <input
//                   type="time"
//                   required
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

//               <label className="text-sm font-semibold text-slate-700">
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
//                 />
//               </label>

//               <label className="text-sm font-semibold text-slate-700">
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
//                 />
//               </label>
//             </div>

//             <div className="flex justify-end gap-2">
//               <button
//                 type="button"
//                 onClick={() => setShowForm(false)}
//                 className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700"
//               >
//                 Close
//               </button>
//               <button
//                 type="submit"
//                 disabled={Boolean(savingId)}
//                 className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
//               >
//                 {savingId
//                   ? "Saving..."
//                   : editingLesson
//                     ? "Save changes"
//                     : "Schedule"}
//               </button>
//             </div>
//           </form>
//         </Modal>
//       )}

//       {selectedLesson && (
//         <Modal
//           title="Lesson details"
//           onClose={() => setSelectedLesson(null)}
//           maxWidth="max-w-5xl"
//         >
//           <div className="space-y-5">
//             <div className="flex flex-wrap items-start justify-between gap-4">
//               <div>
//                 <span
//                   className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(
//                     selectedLesson.status,
//                   )}`}
//                 >
//                   {statusLabel(selectedLesson.status)}
//                 </span>
//                 <h3 className="mt-3 text-2xl font-bold text-slate-900">
//                   {getUserLabel(selectedLesson.student, "Student")}
//                 </h3>
//                 <p className="mt-1 text-sm text-slate-600">
//                   Teacher:{" "}
//                   {getUserLabel(selectedLesson.teacher, "Not assigned")}
//                 </p>
//               </div>

//               <div className="text-right">
//                 <p className="font-bold text-slate-900">
//                   {formatLessonDate(selectedLesson.lessonDate)}
//                 </p>
//                 <p className="mt-1 text-sm text-slate-600">
//                   {selectedLesson.startTime}–{selectedLesson.endTime}
//                 </p>
//               </div>
//             </div>

//             <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
//               {[
//                 ["Vehicle", getVehicleType(selectedLesson)],
//                 ["Location", getLessonLocation(selectedLesson)],
//                 [
//                   "Student attendance",
//                   selectedLesson.attendance?.studentStatus || "pending",
//                 ],
//                 [
//                   "Teacher attendance",
//                   selectedLesson.attendance?.teacherStatus || "pending",
//                 ],
//               ].map(([label, value]) => (
//                 <div
//                   key={label}
//                   className="rounded-xl border border-slate-200 bg-slate-50 p-4"
//                 >
//                   <p className="text-xs font-bold uppercase text-slate-400">
//                     {label}
//                   </p>
//                   <p className="mt-1 font-semibold capitalize text-slate-800">
//                     {value}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {selectedLesson.status === "scheduled" && (
//                 <>
//                   <button
//                     type="button"
//                     disabled={Boolean(savingId)}
//                     onClick={() =>
//                       runAction(
//                         selectedLesson,
//                         () => startLesson(selectedLesson._id),
//                         "Lesson started.",
//                       )
//                     }
//                     className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
//                   >
//                     <FaPlay /> Start
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() => openEditForm(selectedLesson)}
//                     className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700"
//                   >
//                     <FaEdit /> Edit
//                   </button>
//                 </>
//               )}

//               {selectedLesson.status === "in_progress" && (
//                 <button
//                   type="button"
//                   onClick={() => openReportForm(selectedLesson)}
//                   className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white"
//                 >
//                   <FaCheck /> Submit report
//                 </button>
//               )}

//               {selectedLesson.status === "awaiting_confirmation" && (
//                 <button
//                   type="button"
//                   disabled={Boolean(savingId)}
//                   onClick={() =>
//                     runAction(
//                       selectedLesson,
//                       () => confirmLessonCompletion(selectedLesson._id),
//                       "Lesson completion confirmed.",
//                     )
//                   }
//                   className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
//                 >
//                   Confirm completion
//                 </button>
//               )}

//               {["scheduled", "in_progress"].includes(selectedLesson.status) && (
//                 <button
//                   type="button"
//                   onClick={() => noShow(selectedLesson)}
//                   className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-bold text-white"
//                 >
//                   Student no-show
//                 </button>
//               )}

//               {!["completed", "cancelled", "no_show"].includes(
//                 selectedLesson.status,
//               ) && (
//                 <button
//                   type="button"
//                   onClick={() => directCancel(selectedLesson)}
//                   className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white"
//                 >
//                   Cancel lesson
//                 </button>
//               )}
//             </div>

//             <div className="grid gap-4 lg:grid-cols-2">
//               <RequestPanel
//                 title="Reschedule request"
//                 request={selectedLesson.rescheduleRequest}
//                 saving={Boolean(savingId)}
//                 onResolve={(approve) =>
//                   resolveRequest(selectedLesson, "reschedule", approve)
//                 }
//               />
//               <RequestPanel
//                 title="Cancellation request"
//                 request={selectedLesson.cancellationRequest}
//                 saving={Boolean(savingId)}
//                 onResolve={(approve) =>
//                   resolveRequest(selectedLesson, "cancellation", approve)
//                 }
//               />
//             </div>

//             {(selectedLesson.lessonProgress?.teacherNotes ||
//               selectedLesson.lessonProgress?.skillsCovered?.length ||
//               selectedLesson.lessonProgress?.studentNotes) && (
//               <div className="grid gap-4 rounded-xl bg-slate-50 p-4 lg:grid-cols-2">
//                 <div>
//                   <p className="font-bold text-slate-900">Teacher report</p>
//                   <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
//                     {selectedLesson.lessonProgress?.teacherNotes || "No notes"}
//                   </p>
//                   {!!selectedLesson.lessonProgress?.skillsCovered?.length && (
//                     <p className="mt-3 text-sm text-slate-700">
//                       <strong>Skills:</strong>{" "}
//                       {selectedLesson.lessonProgress.skillsCovered.join(", ")}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <p className="font-bold text-slate-900">Student feedback</p>
//                   <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
//                     {selectedLesson.lessonProgress?.studentNotes ||
//                       "No feedback submitted."}
//                   </p>
//                   {selectedLesson.lessonProgress?.rating && (
//                     <p className="mt-3 font-bold text-amber-600">
//                       Rating: {selectedLesson.lessonProgress.rating}/5
//                     </p>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </Modal>
//       )}

//       {reportLesson && (
//         <Modal
//           title="Submit lesson report"
//           onClose={() => setReportLesson(null)}
//         >
//           <form onSubmit={submitReport} className="space-y-4">
//             <label className="block text-sm font-semibold text-slate-700">
//               Skills covered *
//               <textarea
//                 required
//                 rows={3}
//                 value={reportForm.skillsCovered}
//                 onChange={(event) =>
//                   setReportForm((current) => ({
//                     ...current,
//                     skillsCovered: event.target.value,
//                   }))
//                 }
//                 placeholder="Parking, steering, junctions"
//                 className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
//               />
//             </label>

//             <label className="block text-sm font-semibold text-slate-700">
//               Teacher notes *
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
//                 className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
//               />
//             </label>

//             <div className="grid gap-4 md:grid-cols-2">
//               <label className="text-sm font-semibold text-slate-700">
//                 Performance
//                 <select
//                   value={reportForm.performance}
//                   onChange={(event) =>
//                     setReportForm((current) => ({
//                       ...current,
//                       performance: event.target.value,
//                     }))
//                   }
//                   className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5"
//                 >
//                   <option value="needs_improvement">Needs improvement</option>
//                   <option value="satisfactory">Satisfactory</option>
//                   <option value="good">Good</option>
//                   <option value="excellent">Excellent</option>
//                 </select>
//               </label>

//               <label className="text-sm font-semibold text-slate-700">
//                 Admin note
//                 <input
//                   value={reportForm.adminNote}
//                   onChange={(event) =>
//                     setReportForm((current) => ({
//                       ...current,
//                       adminNote: event.target.value,
//                     }))
//                   }
//                   className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
//                 />
//               </label>
//             </div>

//             <label className="block text-sm font-semibold text-slate-700">
//               Areas to improve
//               <textarea
//                 rows={3}
//                 value={reportForm.areasToImprove}
//                 onChange={(event) =>
//                   setReportForm((current) => ({
//                     ...current,
//                     areasToImprove: event.target.value,
//                   }))
//                 }
//                 className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
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
//                 className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
//               />
//             </label>

//             <div className="flex justify-end gap-2">
//               <button
//                 type="button"
//                 onClick={() => setReportLesson(null)}
//                 className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold"
//               >
//                 Close
//               </button>
//               <button
//                 type="submit"
//                 disabled={Boolean(savingId)}
//                 className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
//               >
//                 {savingId ? "Submitting..." : "Submit report"}
//               </button>
//             </div>
//           </form>
//         </Modal>
//       )}
//     </main>
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
import BookingWorkspace from "@/components/lessons/BookingWorkspace";
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

        <BookingWorkspace role="admin" onLessonCreated={refresh} />

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
