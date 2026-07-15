// "use client";

// import { useEffect, useMemo, useState } from "react";

// import {
//   FaCalendarAlt,
//   FaCheckCircle,
//   FaEdit,
//   FaPlay,
//   FaPlus,
//   FaSearch,
//   FaTimes,
//   FaTimesCircle,
// } from "react-icons/fa";

// import {
//   cancelLesson,
//   completeLesson,
//   createLesson,
//   getAdminUsers,
//   getLessons,
//   startLesson,
//   updateLesson,
// } from "@/features/API";

// const EMPTY_FORM = {
//   student: "",
//   teacher: "",
//   lessonDate: "",
//   startTime: "",
//   endTime: "",
//   vehicleType: "automatic",
//   address: "",
//   city: "",
// };

// const unwrap = (response, fallback = null) => {
//   return response?.data?.data ?? response?.data ?? fallback;
// };

// const getError = (error, fallback) => {
//   return error?.response?.data?.message || error?.message || fallback;
// };

// const formatDate = (value) => {
//   if (!value) {
//     return "Date not set";
//   }

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return "Invalid date";
//   }

//   return new Intl.DateTimeFormat("en-GB", {
//     day: "2-digit",

//     month: "short",

//     year: "numeric",
//   }).format(date);
// };

// const toDateInput = (value) => {
//   if (!value) {
//     return "";
//   }

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return "";
//   }

//   const year = date.getFullYear();

//   const month = String(date.getMonth() + 1).padStart(2, "0");

//   const day = String(date.getDate()).padStart(2, "0");

//   return `${year}-${month}-${day}`;
// };

// const statusText = (status) => {
//   const labels = {
//     scheduled: "Scheduled",

//     in_progress: "In Progress",

//     completed: "Completed",

//     cancelled: "Cancelled",
//   };

//   return labels[status] || "Unknown";
// };

// const statusClass = (status) => {
//   if (status === "completed") {
//     return "bg-green-100 text-green-700";
//   }

//   if (status === "in_progress") {
//     return "bg-amber-100 text-amber-700";
//   }

//   if (status === "cancelled") {
//     return "bg-red-100 text-red-700";
//   }

//   return "bg-blue-100 text-blue-700";
// };

// function StatCard({ label, value, icon }) {
//   return (
//     <div className="rounded-2xl bg-white p-5 shadow-sm">
//       <div className="flex items-center justify-between gap-4">
//         <div>
//           <p className="text-sm text-slate-500">{label}</p>

//           <p className="mt-2 text-3xl font-bold text-[#174A9B]">{value}</p>
//         </div>

//         <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8EEF8] text-[#174A9B]">
//           {icon}
//         </div>
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

//   const [showForm, setShowForm] = useState(false);

//   const [editingLesson, setEditingLesson] = useState(null);

//   const [form, setForm] = useState(EMPTY_FORM);

//   const loadData = async () => {
//     setLoading(true);
//     setError("");

//     const [lessonResult, studentResult, teacherResult] =
//       await Promise.allSettled([
//         getLessons(),

//         getAdminUsers({
//           role: "student",

//           status: "active",

//           limit: 100,
//         }),

//         getAdminUsers({
//           role: "teacher",

//           status: "active",

//           limit: 100,
//         }),
//       ]);

//     if (lessonResult.status === "fulfilled") {
//       const data = unwrap(lessonResult.value, []);

//       setLessons(Array.isArray(data) ? data : []);
//     } else {
//       setLessons([]);

//       setError(getError(lessonResult.reason, "Lessons load করা যায়নি।"));
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
//     if (!success) {
//       return undefined;
//     }

//     const timer = window.setTimeout(() => setSuccess(""), 4000);

//     return () => window.clearTimeout(timer);
//   }, [success]);

//   const stats = useMemo(
//     () => ({
//       total: lessons.length,

//       scheduled: lessons.filter((item) => item.status === "scheduled").length,

//       inProgress: lessons.filter((item) => item.status === "in_progress")
//         .length,

//       completed: lessons.filter((item) => item.status === "completed").length,

//       cancelled: lessons.filter((item) => item.status === "cancelled").length,
//     }),
//     [lessons],
//   );

//   const filteredLessons = useMemo(() => {
//     const keyword = search.trim().toLowerCase();

//     return lessons.filter((lesson) => {
//       const matchesStatus = status === "all" || lesson.status === status;

//       const studentName = lesson.student?.name?.toLowerCase() || "";

//       const studentEmail = lesson.student?.email?.toLowerCase() || "";

//       const teacherName = lesson.teacher?.name?.toLowerCase() || "";

//       const teacherEmail = lesson.teacher?.email?.toLowerCase() || "";

//       const matchesSearch =
//         !keyword ||
//         studentName.includes(keyword) ||
//         studentEmail.includes(keyword) ||
//         teacherName.includes(keyword) ||
//         teacherEmail.includes(keyword);

//       return matchesStatus && matchesSearch;
//     });
//   }, [lessons, search, status]);

//   const closeForm = () => {
//     setShowForm(false);

//     setEditingLesson(null);

//     setForm(EMPTY_FORM);
//   };

//   const openCreateForm = () => {
//     setEditingLesson(null);

//     setForm(EMPTY_FORM);

//     setShowForm(true);

//     setError("");

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   const openEditForm = (lesson) => {
//     if (["completed", "cancelled"].includes(lesson.status)) {
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

//       address: lesson.booking?.location?.address || "",

//       city: lesson.booking?.location?.city || "",
//     });

//     setShowForm(true);

//     setError("");

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   const updateField = (event) => {
//     const { name, value } = event.target;

//     setForm((current) => ({
//       ...current,
//       [name]: value,
//     }));
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

//       location: {
//         address: form.address,

//         city: form.city,
//       },
//     };

//     if (!editingLesson) {
//       payload.student = form.student;
//     }

//     try {
//       const response = editingLesson
//         ? await updateLesson(editingLesson._id, payload)
//         : await createLesson(payload);

//       const savedLesson = unwrap(response, null);

//       if (savedLesson?._id) {
//         setLessons((current) => {
//           const exists = current.some((item) => item._id === savedLesson._id);

//           if (exists) {
//             return current.map((item) =>
//               item._id === savedLesson._id ? savedLesson : item,
//             );
//           }

//           return [savedLesson, ...current];
//         });
//       } else {
//         await loadData();
//       }

//       setSuccess(
//         editingLesson
//           ? "Lesson updated successfully."
//           : "Lesson scheduled successfully.",
//       );

//       closeForm();
//     } catch (requestError) {
//       setError(getError(requestError, "Lesson save করা যায়নি।"));
//     } finally {
//       setSaving(false);
//     }
//   };

//   const runAction = async (action, successMessage) => {
//     setSaving(true);
//     setError("");
//     setSuccess("");

//     try {
//       const response = await action();

//       const updated = unwrap(response, null);

//       if (updated?._id) {
//         setLessons((current) =>
//           current.map((item) => (item._id === updated._id ? updated : item)),
//         );
//       } else {
//         await loadData();
//       }

//       setSuccess(successMessage);
//     } catch (requestError) {
//       setError(getError(requestError, "Action complete করা যায়নি।"));
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleStart = (lesson) => {
//     const confirmed = window.confirm(
//       `${lesson.student?.name || "Student"}-এর lesson start করবেন?`,
//     );

//     if (!confirmed) {
//       return;
//     }

//     runAction(
//       () => startLesson(lesson._id),

//       "Lesson started successfully.",
//     );
//   };

//   const handleComplete = (lesson) => {
//     const skillsText = window.prompt(
//       "Skills covered লিখুন। একাধিক skill comma দিয়ে আলাদা করুন:",

//       lesson.lessonProgress?.skillsCovered?.join(", ") || "",
//     );

//     if (skillsText === null) {
//       return;
//     }

//     const teacherNotes = window.prompt(
//       "Teacher notes লিখুন:",

//       lesson.lessonProgress?.teacherNotes || "",
//     );

//     if (teacherNotes === null) {
//       return;
//     }

//     runAction(
//       () =>
//         completeLesson(lesson._id, {
//           lessonProgress: {
//             skillsCovered: skillsText
//               .split(",")
//               .map((item) => item.trim())
//               .filter(Boolean),

//             teacherNotes,
//           },
//         }),

//       "Lesson completed successfully.",
//     );
//   };

//   const handleCancel = (lesson) => {
//     const reason = window.prompt("Lesson cancel করার কারণ লিখুন:");

//     if (!reason?.trim()) {
//       return;
//     }

//     runAction(
//       () =>
//         cancelLesson(lesson._id, {
//           reason: reason.trim(),
//         }),

//       "Lesson cancelled successfully.",
//     );
//   };

//   return (
//     <main className="min-h-screen bg-[#F5F7FB] p-4 sm:p-6 lg:p-8">
//       <div className="mx-auto max-w-7xl">
//         <header className="flex flex-wrap items-center justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-[#174A9B]">
//               Lesson Management
//             </h1>

//             <p className="mt-2 text-sm text-slate-500">
//               Schedule, update, start, complete and cancel student lessons.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={openCreateForm}
//             className="flex items-center gap-2 rounded-xl bg-[#174A9B] px-5 py-3 text-sm font-bold text-white"
//           >
//             <FaPlus />
//             Schedule Lesson
//           </button>
//         </header>

//         {error && (
//           <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
//             {error}
//           </p>
//         )}

//         {success && (
//           <p className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
//             {success}
//           </p>
//         )}

//         {showForm && (
//           <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
//             <div className="flex items-center justify-between gap-4">
//               <h2 className="text-xl font-bold text-[#174A9B]">
//                 {editingLesson ? "Edit Lesson" : "Schedule New Lesson"}
//               </h2>

//               <button
//                 type="button"
//                 onClick={closeForm}
//                 className="rounded-lg bg-slate-100 p-2 text-slate-600"
//                 aria-label="Close form"
//               >
//                 <FaTimes />
//               </button>
//             </div>

//             <form
//               onSubmit={submitForm}
//               className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
//             >
//               <label>
//                 <span className="mb-2 block text-sm font-semibold">
//                   Student
//                 </span>

//                 <select
//                   required
//                   name="student"
//                   value={form.student}
//                   onChange={updateField}
//                   disabled={Boolean(editingLesson)}
//                   className="w-full rounded-xl border border-slate-200 px-3 py-3 disabled:bg-slate-100"
//                 >
//                   <option value="">Select student</option>

//                   {students.map((student) => (
//                     <option key={student._id} value={student._id}>
//                       {student.name} ({student.email})
//                     </option>
//                   ))}
//                 </select>
//               </label>

//               <label>
//                 <span className="mb-2 block text-sm font-semibold">
//                   Teacher
//                 </span>

//                 <select
//                   required
//                   name="teacher"
//                   value={form.teacher}
//                   onChange={updateField}
//                   className="w-full rounded-xl border border-slate-200 px-3 py-3"
//                 >
//                   <option value="">Select teacher</option>

//                   {teachers.map((teacher) => (
//                     <option key={teacher._id} value={teacher._id}>
//                       {teacher.name} ({teacher.email})
//                     </option>
//                   ))}
//                 </select>
//               </label>

//               <label>
//                 <span className="mb-2 block text-sm font-semibold">Date</span>

//                 <input
//                   required
//                   type="date"
//                   name="lessonDate"
//                   value={form.lessonDate}
//                   onChange={updateField}
//                   className="w-full rounded-xl border border-slate-200 px-3 py-3"
//                 />
//               </label>

//               <label>
//                 <span className="mb-2 block text-sm font-semibold">
//                   Vehicle type
//                 </span>

//                 <select
//                   required
//                   name="vehicleType"
//                   value={form.vehicleType}
//                   onChange={updateField}
//                   className="w-full rounded-xl border border-slate-200 px-3 py-3"
//                 >
//                   <option value="automatic">Automatic</option>

//                   <option value="manual">Manual</option>
//                 </select>
//               </label>

//               <label>
//                 <span className="mb-2 block text-sm font-semibold">
//                   Start time
//                 </span>

//                 <input
//                   required
//                   type="time"
//                   name="startTime"
//                   value={form.startTime}
//                   onChange={updateField}
//                   className="w-full rounded-xl border border-slate-200 px-3 py-3"
//                 />
//               </label>

//               <label>
//                 <span className="mb-2 block text-sm font-semibold">
//                   End time
//                 </span>

//                 <input
//                   required
//                   type="time"
//                   name="endTime"
//                   value={form.endTime}
//                   onChange={updateField}
//                   className="w-full rounded-xl border border-slate-200 px-3 py-3"
//                 />
//               </label>

//               <label>
//                 <span className="mb-2 block text-sm font-semibold">
//                   Address
//                 </span>

//                 <input
//                   type="text"
//                   name="address"
//                   value={form.address}
//                   onChange={updateField}
//                   placeholder="Lesson address"
//                   className="w-full rounded-xl border border-slate-200 px-3 py-3"
//                 />
//               </label>

//               <label>
//                 <span className="mb-2 block text-sm font-semibold">City</span>

//                 <input
//                   type="text"
//                   name="city"
//                   value={form.city}
//                   onChange={updateField}
//                   placeholder="City"
//                   className="w-full rounded-xl border border-slate-200 px-3 py-3"
//                 />
//               </label>

//               <div className="flex gap-3 md:col-span-2 xl:col-span-4">
//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="rounded-xl bg-[#174A9B] px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
//                 >
//                   {saving
//                     ? "Saving..."
//                     : editingLesson
//                       ? "Save Changes"
//                       : "Schedule Lesson"}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={closeForm}
//                   disabled={saving}
//                   className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </section>
//         )}

//         <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
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
//             label="In Progress"
//             value={stats.inProgress}
//             icon={<FaPlay />}
//           />

//           <StatCard
//             label="Completed"
//             value={stats.completed}
//             icon={<FaCheckCircle />}
//           />

//           <StatCard
//             label="Cancelled"
//             value={stats.cancelled}
//             icon={<FaTimesCircle />}
//           />
//         </section>

//         <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
//           <div className="grid gap-3 md:grid-cols-[1fr_220px]">
//             <label className="relative">
//               <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

//               <input
//                 value={search}
//                 onChange={(event) => setSearch(event.target.value)}
//                 placeholder="Search student or teacher..."
//                 className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4"
//               />
//             </label>

//             <select
//               value={status}
//               onChange={(event) => setStatus(event.target.value)}
//               className="rounded-xl border border-slate-200 px-4 py-3"
//             >
//               <option value="all">All status</option>

//               <option value="scheduled">Scheduled</option>

//               <option value="in_progress">In progress</option>

//               <option value="completed">Completed</option>

//               <option value="cancelled">Cancelled</option>
//             </select>
//           </div>
//         </section>

//         <section className="mt-5 overflow-hidden rounded-2xl bg-white shadow-sm">
//           {loading ? (
//             <div className="p-10 text-center text-sm text-slate-500">
//               Loading lessons...
//             </div>
//           ) : filteredLessons.length === 0 ? (
//             <div className="p-10 text-center">
//               <p className="font-bold text-[#174A9B]">No lesson found</p>

//               <p className="mt-2 text-sm text-slate-500">
//                 নতুন lesson schedule করলে এখানে দেখাবে।
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[1120px] text-left text-sm">
//                 <thead className="bg-[#174A9B] text-white">
//                   <tr>
//                     <th className="px-5 py-4">Student</th>

//                     <th className="px-5 py-4">Teacher</th>

//                     <th className="px-5 py-4">Date & Time</th>

//                     <th className="px-5 py-4">Vehicle</th>

//                     <th className="px-5 py-4">Duration</th>

//                     <th className="px-5 py-4">Status</th>

//                     <th className="px-5 py-4 text-right">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-slate-100">
//                   {filteredLessons.map((lesson) => (
//                     <tr key={lesson._id} className="hover:bg-slate-50">
//                       <td className="px-5 py-4">
//                         <p className="font-bold text-slate-800">
//                           {lesson.student?.name || "Unknown student"}
//                         </p>

//                         <p className="mt-1 text-xs text-slate-500">
//                           {lesson.student?.email || "No email"}
//                         </p>
//                       </td>

//                       <td className="px-5 py-4">
//                         <p className="font-bold text-slate-800">
//                           {lesson.teacher?.name || "Not assigned"}
//                         </p>

//                         <p className="mt-1 text-xs text-slate-500">
//                           {lesson.teacher?.email || "No email"}
//                         </p>
//                       </td>

//                       <td className="px-5 py-4">
//                         <p className="font-semibold text-slate-800">
//                           {formatDate(lesson.lessonDate)}
//                         </p>

//                         <p className="mt-1 text-xs text-slate-500">
//                           {lesson.startTime || "--"} - {lesson.endTime || "--"}
//                         </p>
//                       </td>

//                       <td className="px-5 py-4 font-semibold capitalize">
//                         {lesson.booking?.vehicleType || "Not set"}
//                       </td>

//                       <td className="px-5 py-4 font-semibold">
//                         {Number(lesson.duration) || 0} minutes
//                       </td>

//                       <td className="px-5 py-4">
//                         <span
//                           className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(
//                             lesson.status,
//                           )}`}
//                         >
//                           {statusText(lesson.status)}
//                         </span>
//                       </td>

//                       <td className="px-5 py-4">
//                         <div className="flex justify-end gap-2">
//                           {!["completed", "cancelled"].includes(
//                             lesson.status,
//                           ) && (
//                             <button
//                               type="button"
//                               onClick={() => openEditForm(lesson)}
//                               disabled={saving}
//                               title="Edit"
//                               className="rounded-lg bg-slate-100 p-2 text-slate-700"
//                             >
//                               <FaEdit />
//                             </button>
//                           )}

//                           {lesson.status === "scheduled" && (
//                             <button
//                               type="button"
//                               onClick={() => handleStart(lesson)}
//                               disabled={saving}
//                               title="Start"
//                               className="rounded-lg bg-amber-100 p-2 text-amber-700"
//                             >
//                               <FaPlay />
//                             </button>
//                           )}

//                           {["scheduled", "in_progress"].includes(
//                             lesson.status,
//                           ) && (
//                             <button
//                               type="button"
//                               onClick={() => handleComplete(lesson)}
//                               disabled={saving}
//                               title="Complete"
//                               className="rounded-lg bg-green-100 p-2 text-green-700"
//                             >
//                               <FaCheckCircle />
//                             </button>
//                           )}

//                           {!["completed", "cancelled"].includes(
//                             lesson.status,
//                           ) && (
//                             <button
//                               type="button"
//                               onClick={() => handleCancel(lesson)}
//                               disabled={saving}
//                               title="Cancel"
//                               className="rounded-lg bg-red-100 p-2 text-red-700"
//                             >
//                               <FaTimesCircle />
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </section>
//       </div>
//     </main>
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
import { getAdminUsers } from "@/features/API";
import {
  cancelLesson,
  completeLesson,
  createLesson,
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

const STATUSES = [
  "all",
  "scheduled",
  "in_progress",
  "awaiting_confirmation",
  "completed",
  "cancelled",
  "no_show",
];

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
            className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
          >
            Approve
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={onReject}
            className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
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
    }

    if (teacherResult.status === "fulfilled") {
      const data = unwrap(teacherResult.value, []);
      setTeachers(Array.isArray(data) ? data : []);
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
      return true;
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Action could not be completed."));
      return false;
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
    if (["completed", "cancelled", "no_show"].includes(lesson.status)) return;

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

  const handleComplete = (lesson) => {
    const teacherNotes = window.prompt("Teacher notes:", "");
    if (teacherNotes === null) return;

    const skills = window.prompt(
      "Skills covered (comma separated):",
      lesson.lessonProgress?.skillsCovered?.join(", ") || "",
    );
    if (skills === null) return;

    runAction(
      () =>
        completeLesson(lesson._id, {
          finalize: true,
          lessonProgress: {
            teacherNotes,
            skillsCovered: skills
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),
          },
        }),
      "Lesson completed by admin.",
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

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
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
                className="rounded-xl bg-[#16458f] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
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
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700"
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
                      {lesson.lessonProgress?.rating && (
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">
                          Rating: {lesson.lessonProgress.rating}/5
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end">
                    {!["completed", "cancelled", "no_show"].includes(
                      lesson.status,
                    ) && (
                      <button
                        type="button"
                        onClick={() => openEditForm(lesson)}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
                      >
                        <FaEdit /> Edit
                      </button>
                    )}

                    {lesson.status === "scheduled" && (
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() =>
                          runAction(
                            () => startLesson(lesson._id),
                            "Lesson started.",
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                      >
                        <FaPlay /> Start
                      </button>
                    )}

                    {[
                      "scheduled",
                      "in_progress",
                      "awaiting_confirmation",
                    ].includes(lesson.status) && (
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => handleComplete(lesson)}
                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                      >
                        <FaCheck /> Complete
                      </button>
                    )}

                    {["scheduled", "in_progress"].includes(lesson.status) && (
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() =>
                          runAction(
                            () =>
                              markLessonNoShow(lesson._id, {
                                participant: "student",
                                reason: "Student did not attend.",
                              }),
                            "Student no-show recorded.",
                          )
                        }
                        className="rounded-lg bg-slate-700 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                      >
                        No-show
                      </button>
                    )}

                    {!["completed", "cancelled"].includes(lesson.status) && (
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => handleDirectCancel(lesson)}
                        className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
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
                  lesson.lessonProgress?.studentNotes) && (
                  <div className="mt-4 grid gap-3 rounded-xl bg-slate-50 p-4 text-sm md:grid-cols-2">
                    <div>
                      <p className="font-semibold text-slate-800">
                        Teacher report
                      </p>
                      <p className="mt-1 text-slate-600">
                        {lesson.lessonProgress?.teacherNotes || "No notes"}
                      </p>
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
