// "use client";

// import { useCallback, useEffect, useState } from "react";
// import { FaCheck, FaEye, FaPlay, FaSearch, FaTimes } from "react-icons/fa";

// import Pagination from "@/components/Pagination";
// import {
//   completeLesson,
//   confirmAttendance,
//   getLessons,
//   markLessonNoShow,
//   startLesson,
// } from "@/features/API";
// import {
//   DRIVING_SKILLS,
//   formatLessonDate,
//   getErrorMessage,
//   getLessonLocation,
//   getVehicleType,
//   statusClass,
//   statusLabel,
//   unwrap,
// } from "@/features/lessonHelpers";
// import useDebouncedValue from "@/hooks/useDebouncedValue";

// const INITIAL_META = {
//   page: 1,
//   limit: 20,
//   total: 0,
//   totalPages: 1,
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

// const EMPTY_REPORT = {
//   skillsCovered: [],
//   teacherNotes: "",
//   performance: "satisfactory",
//   areasToImprove: "",
//   nextLessonRecommendation: "",
// };

// const teacherPresent = (lesson) =>
//   lesson.attendance?.teacherStatus === "present" ||
//   lesson.attendance?.teacherConfirmed === true;

// function Modal({ title, children, onClose }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
//       <div className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
//         <div className="sticky top-0 flex items-center justify-between border-b bg-white px-5 py-4">
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

// export default function TeacherLessonsPage() {
//   const [lessons, setLessons] = useState([]);
//   const [meta, setMeta] = useState(INITIAL_META);
//   const [loading, setLoading] = useState(true);
//   const [busyId, setBusyId] = useState("");
//   const [notice, setNotice] = useState(null);

//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(20);
//   const [status, setStatus] = useState("all");
//   const [search, setSearch] = useState("");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const debouncedSearch = useDebouncedValue(search, 500);

//   const [selectedLesson, setSelectedLesson] = useState(null);
//   const [reportLesson, setReportLesson] = useState(null);
//   const [reportForm, setReportForm] = useState(EMPTY_REPORT);

//   const loadLessons = useCallback(async () => {
//     setLoading(true);

//     try {
//       const response = await getLessons({
//         page,
//         limit,
//         status,
//         search: debouncedSearch,
//         sortOrder,
//       });

//       setLessons(
//         Array.isArray(unwrap(response, [])) ? unwrap(response, []) : [],
//       );
//       setMeta({
//         ...INITIAL_META,
//         ...(response?.data?.meta || {}),
//       });
//     } catch (error) {
//       setLessons([]);
//       setNotice({
//         type: "error",
//         text: getErrorMessage(error, "Lessons could not be loaded."),
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, [debouncedSearch, limit, page, sortOrder, status]);

//   useEffect(() => {
//     loadLessons();
//   }, [loadLessons]);

//   useEffect(() => {
//     setPage(1);
//   }, [debouncedSearch, limit, sortOrder, status]);

//   const runAction = async (lesson, action, message) => {
//     setBusyId(lesson._id);
//     setNotice(null);

//     try {
//       await action();
//       setNotice({ type: "success", text: message });
//       await loadLessons();
//     } catch (error) {
//       setNotice({
//         type: "error",
//         text: getErrorMessage(error, "Action could not be completed."),
//       });
//     } finally {
//       setBusyId("");
//     }
//   };

//   const openReport = (lesson) => {
//     if (!teacherPresent(lesson)) {
//       setNotice({
//         type: "error",
//         text: "Confirm your attendance before submitting the report.",
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

//   const submitReport = async (event) => {
//     event.preventDefault();

//     if (!reportLesson) return;

//     if (!reportForm.skillsCovered.length || !reportForm.teacherNotes.trim()) {
//       setNotice({
//         type: "error",
//         text: "Teacher notes and at least one covered skill are required.",
//       });
//       return;
//     }

//     setBusyId(reportLesson._id);

//     try {
//       await completeLesson(reportLesson._id, {
//         finalize: false,
//         lessonProgress: {
//           skillsCovered: reportForm.skillsCovered,
//           teacherNotes: reportForm.teacherNotes.trim(),
//           performance: reportForm.performance,
//           areasToImprove: reportForm.areasToImprove
//             .split(/\n|,/)
//             .map((item) => item.trim())
//             .filter(Boolean),
//           nextLessonRecommendation: reportForm.nextLessonRecommendation.trim(),
//         },
//       });

//       setReportLesson(null);
//       setReportForm(EMPTY_REPORT);
//       setNotice({
//         type: "success",
//         text: "Report submitted. Waiting for student confirmation.",
//       });
//       await loadLessons();
//     } catch (error) {
//       setNotice({
//         type: "error",
//         text: getErrorMessage(error, "Report could not be submitted."),
//       });
//     } finally {
//       setBusyId("");
//     }
//   };

//   const markNoShow = async (lesson) => {
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
//   };

//   return (
//     <main className="min-h-screen bg-slate-50 p-4 md:p-6">
//       <div className="mx-auto max-w-[1400px] space-y-5">
//         <header>
//           <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
//             Teacher dashboard
//           </p>
//           <h1 className="mt-1 text-3xl font-bold text-slate-900">
//             Assigned lessons
//           </h1>
//           <p className="mt-2 text-sm text-slate-600">
//             The server sends only the selected page instead of loading every
//             historical lesson.
//           </p>
//         </header>

//         {notice?.text && (
//           <div
//             className={`flex justify-between rounded-xl border px-4 py-3 text-sm ${
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

//         <section className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[1fr_220px_180px]">
//           <label className="relative">
//             <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//             <input
//               value={search}
//               onChange={(event) => setSearch(event.target.value)}
//               placeholder="Search student name, email or phone"
//               className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-3 text-sm"
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
//             value={sortOrder}
//             onChange={(event) => setSortOrder(event.target.value)}
//             className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm"
//           >
//             <option value="asc">Oldest first</option>
//             <option value="desc">Newest first</option>
//           </select>
//         </section>

//         <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="min-w-[1050px] w-full text-left text-sm">
//               <thead className="bg-slate-100 text-xs uppercase text-slate-600">
//                 <tr>
//                   <th className="px-4 py-3">Date & time</th>
//                   <th className="px-4 py-3">Student</th>
//                   <th className="px-4 py-3">Vehicle / location</th>
//                   <th className="px-4 py-3">Attendance</th>
//                   <th className="px-4 py-3">Status</th>
//                   <th className="px-4 py-3 text-right">Action</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-slate-100">
//                 {loading ? (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       className="px-4 py-14 text-center text-slate-500"
//                     >
//                       Loading lessons...
//                     </td>
//                   </tr>
//                 ) : lessons.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       className="px-4 py-14 text-center text-slate-500"
//                     >
//                       No lessons found.
//                     </td>
//                   </tr>
//                 ) : (
//                   lessons.map((lesson) => {
//                     const present = teacherPresent(lesson);
//                     const busy = busyId === lesson._id;

//                     return (
//                       <tr key={lesson._id} className="hover:bg-slate-50">
//                         <td className="px-4 py-4">
//                           <p className="font-bold text-slate-900">
//                             {formatLessonDate(lesson.lessonDate)}
//                           </p>
//                           <p className="mt-1 text-xs text-slate-500">
//                             {lesson.startTime}–{lesson.endTime}
//                           </p>
//                         </td>

//                         <td className="px-4 py-4">
//                           <p className="font-semibold text-slate-800">
//                             {lesson.student?.name || "Student"}
//                           </p>
//                           <p className="mt-1 text-xs text-slate-500">
//                             {lesson.student?.email ||
//                               lesson.student?.phone ||
//                               ""}
//                           </p>
//                         </td>

//                         <td className="px-4 py-4">
//                           <p className="font-semibold text-slate-800">
//                             {getVehicleType(lesson)}
//                           </p>
//                           <p className="mt-1 max-w-56 truncate text-xs text-slate-500">
//                             {getLessonLocation(lesson)}
//                           </p>
//                         </td>

//                         <td className="px-4 py-4 capitalize">
//                           {lesson.attendance?.teacherStatus ||
//                             (present ? "present" : "pending")}
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
//                                 disabled={busy}
//                                 onClick={() =>
//                                   runAction(
//                                     lesson,
//                                     () => startLesson(lesson._id),
//                                     "Lesson started.",
//                                   )
//                                 }
//                                 className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
//                               >
//                                 <FaPlay /> Start
//                               </button>
//                             )}

//                             {lesson.status === "in_progress" && !present && (
//                               <button
//                                 type="button"
//                                 disabled={busy}
//                                 onClick={() =>
//                                   runAction(
//                                     lesson,
//                                     () =>
//                                       confirmAttendance(lesson._id, {
//                                         status: "present",
//                                       }),
//                                     "Attendance confirmed.",
//                                   )
//                                 }
//                                 className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
//                               >
//                                 Attendance
//                               </button>
//                             )}

//                             {lesson.status === "in_progress" && (
//                               <button
//                                 type="button"
//                                 disabled={busy || !present}
//                                 onClick={() => openReport(lesson)}
//                                 className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
//                               >
//                                 <FaCheck /> Report
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

//       {selectedLesson && (
//         <Modal title="Lesson details" onClose={() => setSelectedLesson(null)}>
//           <div className="space-y-4">
//             <div className="flex justify-between gap-4">
//               <div>
//                 <span
//                   className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(
//                     selectedLesson.status,
//                   )}`}
//                 >
//                   {statusLabel(selectedLesson.status)}
//                 </span>
//                 <h3 className="mt-3 text-2xl font-bold text-slate-900">
//                   {selectedLesson.student?.name || "Student"}
//                 </h3>
//                 <p className="mt-1 text-sm text-slate-600">
//                   {selectedLesson.student?.email ||
//                     selectedLesson.student?.phone ||
//                     ""}
//                 </p>
//               </div>

//               <div className="text-right">
//                 <p className="font-bold">
//                   {formatLessonDate(selectedLesson.lessonDate)}
//                 </p>
//                 <p className="mt-1 text-sm text-slate-600">
//                   {selectedLesson.startTime}–{selectedLesson.endTime}
//                 </p>
//               </div>
//             </div>

//             <div className="grid gap-3 sm:grid-cols-2">
//               <div className="rounded-xl bg-slate-50 p-4">
//                 <p className="text-xs font-bold uppercase text-slate-400">
//                   Vehicle
//                 </p>
//                 <p className="mt-1 font-semibold">
//                   {getVehicleType(selectedLesson)}
//                 </p>
//               </div>
//               <div className="rounded-xl bg-slate-50 p-4">
//                 <p className="text-xs font-bold uppercase text-slate-400">
//                   Location
//                 </p>
//                 <p className="mt-1 font-semibold">
//                   {getLessonLocation(selectedLesson)}
//                 </p>
//               </div>
//             </div>

//             {selectedLesson.status === "in_progress" && (
//               <div className="flex flex-wrap gap-2">
//                 {!teacherPresent(selectedLesson) && (
//                   <button
//                     type="button"
//                     onClick={() =>
//                       runAction(
//                         selectedLesson,
//                         () =>
//                           confirmAttendance(selectedLesson._id, {
//                             status: "present",
//                           }),
//                         "Attendance confirmed.",
//                       )
//                     }
//                     className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white"
//                   >
//                     Confirm attendance
//                   </button>
//                 )}

//                 <button
//                   type="button"
//                   disabled={!teacherPresent(selectedLesson)}
//                   onClick={() => openReport(selectedLesson)}
//                   className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
//                 >
//                   Submit report
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => markNoShow(selectedLesson)}
//                   className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white"
//                 >
//                   Student no-show
//                 </button>
//               </div>
//             )}

//             {selectedLesson.lessonProgress?.teacherNotes && (
//               <div className="rounded-xl bg-slate-50 p-4">
//                 <p className="font-bold text-slate-900">Teacher report</p>
//                 <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
//                   {selectedLesson.lessonProgress.teacherNotes}
//                 </p>
//               </div>
//             )}
//           </div>
//         </Modal>
//       )}

//       {reportLesson && (
//         <Modal
//           title="Complete lesson and submit report"
//           onClose={() => setReportLesson(null)}
//         >
//           <form onSubmit={submitReport} className="space-y-5">
//             <div>
//               <p className="text-sm font-bold text-slate-800">
//                 Skills covered *
//               </p>
//               <div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
//                 {DRIVING_SKILLS.map((skill) => (
//                   <label
//                     key={skill}
//                     className={`flex cursor-pointer gap-2 rounded-lg border p-3 text-sm ${
//                       reportForm.skillsCovered.includes(skill)
//                         ? "border-blue-400 bg-blue-50"
//                         : "border-slate-200"
//                     }`}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={reportForm.skillsCovered.includes(skill)}
//                       onChange={() => toggleSkill(skill)}
//                     />
//                     {skill}
//                   </label>
//                 ))}
//               </div>
//             </div>

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

//             <label className="block text-sm font-semibold text-slate-700">
//               Performance
//               <select
//                 value={reportForm.performance}
//                 onChange={(event) =>
//                   setReportForm((current) => ({
//                     ...current,
//                     performance: event.target.value,
//                   }))
//                 }
//                 className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5"
//               >
//                 <option value="needs_improvement">Needs improvement</option>
//                 <option value="satisfactory">Satisfactory</option>
//                 <option value="good">Good</option>
//                 <option value="excellent">Excellent</option>
//               </select>
//             </label>

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
//                 disabled={busyId === reportLesson._id}
//                 className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
//               >
//                 {busyId === reportLesson._id
//                   ? "Submitting..."
//                   : "Submit report"}
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
import { FaCheck, FaEye, FaPlay, FaSearch, FaTimes } from "react-icons/fa";

import BookingWorkspace from "@/components/lessons/BookingWorkspace";
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

        <BookingWorkspace role="teacher" onLessonCreated={loadLessons} />

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
