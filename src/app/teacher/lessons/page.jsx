// // "use client";

// // import { useState } from "react";
// // import {
// //   FaCalendarAlt,
// //   FaCheck,
// //   FaChevronLeft,
// //   FaQuestionCircle,
// //   FaSearch,
// //   FaTimes,
// // } from "react-icons/fa";
// // import { useRouter } from "next/navigation";
// // const filterGroups = [
// //   {
// //     title: "Income-generating lessons",
// //     items: [
// //       { key: "futureLessons", label: "Future lessons" },
// //       { key: "lessonsLearned", label: "Lessons learned" },
// //     ],
// //   },
// //   {
// //     title: "Other lessons",
// //     items: [
// //       { key: "awaitingConfirmation", label: "Awaiting confirmation" },
// //       { key: "canceledByYou", label: "Canceled by you" },
// //       { key: "canceledByStudent", label: "Canceled by the student" },
// //     ],
// //   },
// // ];

// // export default function Lessons() {
// //   const [search, setSearch] = useState("");
// //   const [filters, setFilters] = useState({
// //     futureLessons: true,
// //     lessonsLearned: false,
// //     awaitingConfirmation: false,
// //     canceledByYou: false,
// //     canceledByStudent: false,
// //   });
// // const router = useRouter();
// //   const handleCheckbox = (name) => {
// //     setFilters((prev) => ({
// //       ...prev,
// //       [name]: !prev[name],
// //     }));
// //   };

// //   return (
// //     <main className="min-h-screen bg-[#f8fafc] px-4 py-5 sm:px-6 lg:px-8">
// //       <section className="mx-auto ">
// //         {/* Header */}
// //         {/* <header className="mb-5 flex items-center gap-3">
// //           <button
// //             type="button"
// //             onClick={() => router.back()}
// //             className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#16458f] shadow-sm transition hover:bg-blue-50"
// //           >
// //             <FaChevronLeft size={14} />
// //           </button>

// //           <div>
// //             <h1 className="text-2xl font-bold text-[#16458f]">
// //               List of Lessons
// //             </h1>

// //           </div>
// //         </header> */}

// //         {/* Header */}
// //         <header className="mb-5 flex items-center gap-3">
// //           <button
// //             type="button"
// //             onClick={() => router.back()}
// //             className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#16458f] shadow-sm transition hover:bg-blue-50"
// //           >
// //             <FaChevronLeft size={14} />
// //           </button>

// //           <h1 className="text-2xl font-bold text-[#16458f]">List of Lessons</h1>
// //         </header>

// //         {/* Action Bar */}
// //         <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
// //           <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
// //             <div className="flex h-11 w-full items-center gap-3 rounded-xl border border-slate-200 bg-[#f8fafc] px-4 transition focus-within:border-[#16458f] focus-within:ring-4 focus-within:ring-blue-50 lg:max-w-md">
// //               <FaSearch size={14} className="text-slate-400" />

// //               <input
// //                 type="text"
// //                 placeholder="Search students"
// //                 value={search}
// //                 onChange={(e) => setSearch(e.target.value)}
// //                 className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
// //               />

// //               {search && (
// //                 <button
// //                   type="button"
// //                   onClick={() => setSearch("")}
// //                   className="text-slate-400 transition hover:text-slate-700"
// //                 >
// //                   <FaTimes size={14} />
// //                 </button>
// //               )}
// //             </div>

// //             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
// //               <button
// //                 type="button"
// //                 className="h-11 rounded-xl border border-[#e2233d] bg-white px-5 text-sm font-bold text-slate-900 transition hover:bg-red-50"
// //               >
// //                 Arrange Review
// //               </button>

// //               <button
// //                 type="button"
// //                 className="h-11 rounded-xl bg-[#e2233d] px-5 text-sm font-bold text-white transition hover:bg-[#c91f35]"
// //               >
// //                 Submit Lesson
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Content */}
// //         <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
// //           {/* Filter Card */}
// //           <aside className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
// //             <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
// //               <DateInput label="Start date" value="10/12/2025" />
// //               <DateInput label="End date" value="10/12/2025" />
// //             </div>

// //             <div className="mt-5 space-y-5">
// //               {filterGroups.map((group) => (
// //                 <div key={group.title}>
// //                   <h3 className="mb-3 text-sm font-extrabold text-slate-900">
// //                     {group.title}
// //                   </h3>

// //                   <div className="space-y-2.5">
// //                     {group.items.map((item) => (
// //                       <CustomCheckbox
// //                         key={item.key}
// //                         label={item.label}
// //                         checked={filters[item.key]}
// //                         onChange={() => handleCheckbox(item.key)}
// //                       />
// //                     ))}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </aside>

// //           {/* Result Card */}
// //           <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
// //             <div className="flex min-h-[360px] items-center justify-center rounded-2xl bg-[#eef4fb] p-6 text-center">
// //               <div>
// //                 <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#16458f] shadow-sm">
// //                   <FaQuestionCircle size={24} />
// //                 </div>

// //                 <h3 className="text-lg font-extrabold text-slate-900">
// //                   No Lessons Found
// //                 </h3>

// //                 <p className="mt-1 text-sm text-slate-500">
// //                   You have no lessons in this filter range.
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     </main>
// //   );
// // }

// // function DateInput({ label, value }) {
// //   return (
// //     <div>
// //       <label className="mb-2 block text-sm font-bold text-slate-700">
// //         {label}
// //       </label>

// //       <div className="flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-[#f8fafc] px-4">
// //         <input
// //           type="text"
// //           value={value}
// //           readOnly
// //           className="w-full bg-transparent text-sm font-medium text-slate-600 outline-none"
// //         />

// //         <FaCalendarAlt size={15} className="text-[#16458f]" />
// //       </div>
// //     </div>
// //   );
// // }

// // function CustomCheckbox({ label, checked, onChange }) {
// //   return (
// //     <button
// //       type="button"
// //       onClick={onChange}
// //       className="flex w-full items-center gap-3 rounded-xl px-2 py-1.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
// //     >
// //       <span
// //         className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[10px] transition ${
// //           checked
// //             ? "border-emerald-500 bg-emerald-500 text-white"
// //             : "border-[#16458f] bg-white text-transparent"
// //         }`}
// //       >
// //         <FaCheck />
// //       </span>

// //       <span>{label}</span>
// //     </button>
// //   );
// // }

// "use client";

// import { useEffect, useMemo, useState } from "react";
// import {
//   confirmAttendance,
//   completeLesson,
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
//   statusClass,
//   statusLabel,
//   unwrap,
// } from "../../../features/lessonHelpers";

// const FILTERS = [
//   { key: "today", label: "Today" },
//   { key: "upcoming", label: "Upcoming" },
//   { key: "active", label: "In progress" },
//   { key: "awaiting", label: "Awaiting confirmation" },
//   { key: "completed", label: "Completed" },
//   { key: "cancelled", label: "Cancelled / No-show" },
//   { key: "all", label: "All lessons" },
// ];

// const EMPTY_REPORT = {
//   skillsCovered: [],
//   teacherNotes: "",
//   performance: "good",
//   areasToImprove: "",
//   nextLessonRecommendation: "",
// };

// const startOfToday = () => {
//   const value = new Date();
//   value.setHours(0, 0, 0, 0);
//   return value;
// };

// const endOfToday = () => {
//   const value = new Date();
//   value.setHours(23, 59, 59, 999);
//   return value;
// };

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

// export default function TeacherLessonsPage() {
//   const [lessons, setLessons] = useState([]);
//   const [filter, setFilter] = useState("today");
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [busyId, setBusyId] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [reportLesson, setReportLesson] = useState(null);
//   const [report, setReport] = useState(EMPTY_REPORT);

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

//   const filteredLessons = useMemo(() => {
//     const todayStart = startOfToday();
//     const todayEnd = endOfToday();
//     const needle = search.trim().toLowerCase();

//     return lessons
//       .filter((lesson) => {
//         const lessonDate = new Date(lesson.lessonDate);
//         const status = lesson.status;

//         if (filter === "today") {
//           return lessonDate >= todayStart && lessonDate <= todayEnd;
//         }
//         if (filter === "upcoming") {
//           return status === "scheduled" && lessonDate > todayEnd;
//         }
//         if (filter === "active") return status === "in_progress";
//         if (filter === "awaiting") return status === "awaiting_confirmation";
//         if (filter === "completed") return status === "completed";
//         if (filter === "cancelled")
//           return ["cancelled", "no_show"].includes(status);
//         return true;
//       })
//       .filter((lesson) => {
//         if (!needle) return true;
//         const student = personName(lesson.student, "").toLowerCase();
//         const location = getLessonLocation(lesson).toLowerCase();
//         const vehicle = getVehicleType(lesson).toLowerCase();
//         return (
//           student.includes(needle) ||
//           location.includes(needle) ||
//           vehicle.includes(needle)
//         );
//       })
//       .sort((a, b) => new Date(a.lessonDate) - new Date(b.lessonDate));
//   }, [filter, lessons, search]);

//   const stats = useMemo(
//     () => ({
//       today: lessons.filter((lesson) => {
//         const date = new Date(lesson.lessonDate);
//         return date >= startOfToday() && date <= endOfToday();
//       }).length,
//       upcoming: lessons.filter(
//         (lesson) =>
//           lesson.status === "scheduled" &&
//           new Date(lesson.lessonDate) > endOfToday(),
//       ).length,
//       active: lessons.filter((lesson) => lesson.status === "in_progress")
//         .length,
//       awaiting: lessons.filter(
//         (lesson) => lesson.status === "awaiting_confirmation",
//       ).length,
//     }),
//     [lessons],
//   );

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

//   const handleStart = (lesson) => {
//     if (!window.confirm("Start this lesson now?")) return;
//     runAction(
//       lesson._id,
//       () => startLesson(lesson._id),
//       "Lesson started successfully.",
//     );
//   };

//   const handleAttendance = (lesson) => {
//     runAction(
//       lesson._id,
//       () => confirmAttendance(lesson._id, { status: "present" }),
//       "Your attendance has been confirmed.",
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

//   const handleNoShow = async (lesson) => {
//     if (
//       !window.confirm(
//         "Mark the student as a no-show? This will end the lesson.",
//       )
//     )
//       return;
//     const note =
//       window.prompt(
//         "Optional note about the no-show:",
//         "Student did not attend.",
//       ) || "";
//     await runAction(
//       lesson._id,
//       () => markLessonNoShow(lesson._id, { participant: "student", note }),
//       "Student marked as a no-show.",
//     );
//   };

//   const openReport = (lesson) => {
//     setReportLesson(lesson);
//     setReport({
//       skillsCovered: lesson.lessonProgress?.skillsCovered || [],
//       teacherNotes: lesson.lessonProgress?.teacherNotes || "",
//       performance: lesson.lessonProgress?.performance || "good",
//       areasToImprove: (lesson.lessonProgress?.areasToImprove || []).join(", "),
//       nextLessonRecommendation:
//         lesson.lessonProgress?.nextLessonRecommendation || "",
//     });
//     setError("");
//     setMessage("");
//   };

//   const toggleSkill = (skill) => {
//     setReport((current) => ({
//       ...current,
//       skillsCovered: current.skillsCovered.includes(skill)
//         ? current.skillsCovered.filter((item) => item !== skill)
//         : [...current.skillsCovered, skill],
//     }));
//   };

//   const submitReport = async (event) => {
//     event.preventDefault();
//     if (!reportLesson) return;
//     if (!report.teacherNotes.trim()) {
//       setError("Please add a short lesson report.");
//       return;
//     }

//     const updated = await runAction(
//       reportLesson._id,
//       () =>
//         completeLesson(reportLesson._id, {
//           ...report,
//           teacherNotes: report.teacherNotes.trim(),
//           areasToImprove: report.areasToImprove.trim(),
//           nextLessonRecommendation: report.nextLessonRecommendation.trim(),
//         }),
//       "Lesson report submitted. Waiting for student confirmation.",
//     );

//     if (updated) {
//       setReportLesson(null);
//       setReport(EMPTY_REPORT);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl space-y-6">
//         <header className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
//               Teacher dashboard
//             </p>
//             <h1 className="mt-1 text-3xl font-bold text-slate-900">
//               My driving lessons
//             </h1>
//             <p className="mt-2 text-sm text-slate-600">
//               Start lessons, confirm attendance and submit each student&apos;s
//               progress report.
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

//         <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//           {[
//             ["Today", stats.today],
//             ["Upcoming", stats.upcoming],
//             ["In progress", stats.active],
//             ["Awaiting student", stats.awaiting],
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
//               placeholder="Search student, vehicle or location"
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
//                   Try another filter or refresh the page.
//                 </p>
//               </div>
//             ) : (
//               filteredLessons.map((lesson) => {
//                 const isBusy = busyId === lesson._id;
//                 const teacherAttendance =
//                   lesson.attendance?.teacherStatus ||
//                   (lesson.attendance?.teacherConfirmed ? "present" : "pending");

//                 return (
//                   <article
//                     key={lesson._id}
//                     className="rounded-2xl border border-slate-200 p-5"
//                   >
//                     <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
//                       <div className="min-w-0 flex-1">
//                         <div className="flex flex-wrap items-center gap-2">
//                           <h2 className="text-xl font-bold text-slate-900">
//                             {personName(lesson.student, "Student")}
//                           </h2>
//                           <span
//                             className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(lesson.status)}`}
//                           >
//                             {statusLabel(lesson.status)}
//                           </span>
//                         </div>

//                         <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-4">
//                           <p>
//                             <span className="font-semibold text-slate-800">
//                               Date:
//                             </span>{" "}
//                             {formatLessonDate(lesson.lessonDate)}
//                           </p>
//                           <p>
//                             <span className="font-semibold text-slate-800">
//                               Time:
//                             </span>{" "}
//                             {lesson.startTime}–{lesson.endTime}
//                           </p>
//                           <p>
//                             <span className="font-semibold text-slate-800">
//                               Vehicle:
//                             </span>{" "}
//                             {getVehicleType(lesson)}
//                           </p>
//                           <p>
//                             <span className="font-semibold text-slate-800">
//                               Location:
//                             </span>{" "}
//                             {getLessonLocation(lesson)}
//                           </p>
//                         </div>

//                         <div className="mt-4 flex flex-wrap gap-2 text-xs">
//                           <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700">
//                             Your attendance:{" "}
//                             <strong>{teacherAttendance}</strong>
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
//                         </div>

//                         {lesson.lessonProgress?.teacherNotes && (
//                           <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
//                             <p className="font-semibold text-slate-900">
//                               Your report
//                             </p>
//                             <p className="mt-1 whitespace-pre-wrap">
//                               {lesson.lessonProgress.teacherNotes}
//                             </p>
//                             {!!lesson.lessonProgress.skillsCovered?.length && (
//                               <p className="mt-2 text-xs text-slate-500">
//                                 Skills:{" "}
//                                 {lesson.lessonProgress.skillsCovered.join(", ")}
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
//                               disabled={isBusy}
//                               onClick={() => handleStart(lesson)}
//                               className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
//                             >
//                               Start lesson
//                             </button>
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

//                         {lesson.status === "in_progress" && (
//                           <>
//                             {!lesson.attendance?.teacherConfirmed && (
//                               <button
//                                 type="button"
//                                 disabled={isBusy}
//                                 onClick={() => handleAttendance(lesson)}
//                                 className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
//                               >
//                                 Confirm attendance
//                               </button>
//                             )}
//                             <button
//                               type="button"
//                               disabled={isBusy}
//                               onClick={() => openReport(lesson)}
//                               className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
//                             >
//                               Complete & report
//                             </button>
//                             <button
//                               type="button"
//                               disabled={isBusy}
//                               onClick={() => handleNoShow(lesson)}
//                               className="rounded-xl border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-50"
//                             >
//                               Student no-show
//                             </button>
//                           </>
//                         )}

//                         {lesson.status === "awaiting_confirmation" && (
//                           <span className="rounded-xl bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700">
//                             Waiting for student confirmation
//                           </span>
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

//       {reportLesson && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
//           <form
//             onSubmit={submitReport}
//             className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
//           >
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
//                   Lesson report
//                 </p>
//                 <h2 className="mt-1 text-2xl font-bold text-slate-900">
//                   {personName(reportLesson.student, "Student")}
//                 </h2>
//                 <p className="mt-1 text-sm text-slate-500">
//                   {formatLessonDate(reportLesson.lessonDate)},{" "}
//                   {reportLesson.startTime}–{reportLesson.endTime}
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setReportLesson(null)}
//                 className="rounded-lg px-3 py-1 text-xl text-slate-500 hover:bg-slate-100"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="mt-6">
//               <p className="mb-3 text-sm font-semibold text-slate-800">
//                 Skills covered
//               </p>
//               <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
//                 {DRIVING_SKILLS.map((skill) => (
//                   <label
//                     key={skill}
//                     className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 p-3 text-sm"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={report.skillsCovered.includes(skill)}
//                       onChange={() => toggleSkill(skill)}
//                     />
//                     {skill}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-5 grid gap-4 sm:grid-cols-2">
//               <label className="text-sm font-semibold text-slate-700">
//                 Student performance
//                 <select
//                   value={report.performance}
//                   onChange={(event) =>
//                     setReport((current) => ({
//                       ...current,
//                       performance: event.target.value,
//                     }))
//                   }
//                   className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-orange-500"
//                 >
//                   <option value="needs_improvement">Needs improvement</option>
//                   <option value="satisfactory">Satisfactory</option>
//                   <option value="good">Good / Very good</option>
//                   <option value="excellent">Excellent</option>
//                 </select>
//               </label>
//               <label className="text-sm font-semibold text-slate-700">
//                 Next lesson recommendation
//                 <input
//                   value={report.nextLessonRecommendation}
//                   onChange={(event) =>
//                     setReport((current) => ({
//                       ...current,
//                       nextLessonRecommendation: event.target.value,
//                     }))
//                   }
//                   placeholder="Example: practise roundabouts"
//                   className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-orange-500"
//                 />
//               </label>
//             </div>

//             <label className="mt-4 block text-sm font-semibold text-slate-700">
//               Lesson notes <span className="text-rose-600">*</span>
//               <textarea
//                 value={report.teacherNotes}
//                 onChange={(event) =>
//                   setReport((current) => ({
//                     ...current,
//                     teacherNotes: event.target.value,
//                   }))
//                 }
//                 rows={4}
//                 placeholder="Describe what was practised and how the student performed."
//                 className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-orange-500"
//               />
//             </label>

//             <label className="mt-4 block text-sm font-semibold text-slate-700">
//               Areas to improve
//               <textarea
//                 value={report.areasToImprove}
//                 onChange={(event) =>
//                   setReport((current) => ({
//                     ...current,
//                     areasToImprove: event.target.value,
//                   }))
//                 }
//                 rows={3}
//                 placeholder="Mention specific areas for improvement."
//                 className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-orange-500"
//               />
//             </label>

//             <div className="mt-6 flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => setReportLesson(null)}
//                 className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={busyId === reportLesson._id}
//                 className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
//               >
//                 {busyId === reportLesson._id
//                   ? "Submitting..."
//                   : "Submit lesson report"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </main>
//   );
// }

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  completeLesson,
  confirmAttendance,
  getLessons,
  markLessonNoShow,
  requestLessonCancellation,
  requestLessonReschedule,
  startLesson,
} from "@/features/API";
import {
  DRIVING_SKILLS,
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
  { key: "today", label: "Today" },
  { key: "upcoming", label: "Upcoming" },
  { key: "active", label: "In progress" },
  { key: "awaiting", label: "Waiting for student" },
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

const emptyReport = {
  skillsCovered: [],
  teacherNotes: "",
  performance: "satisfactory",
  areasToImprove: "",
  nextLessonRecommendation: "",
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

const isSameLocalDay = (value, comparison = new Date()) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;

  return (
    date.getFullYear() === comparison.getFullYear() &&
    date.getMonth() === comparison.getMonth() &&
    date.getDate() === comparison.getDate()
  );
};

const getStartState = (lesson, now = Date.now()) => {
  const startAt = lessonTimestamp(lesson);
  if (!startAt) {
    return {
      allowed: false,
      message: "Lesson time is not valid.",
    };
  }

  const availableAt = startAt - 30 * 60 * 1000;
  if (now < availableAt) {
    return {
      allowed: false,
      message: `Start becomes available at ${new Date(
        availableAt,
      ).toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short",
      })}.`,
    };
  }

  return {
    allowed: true,
    message: "Lesson can be started now.",
  };
};

const teacherPresent = (lesson) =>
  lesson?.attendance?.teacherStatus === "present" ||
  lesson?.attendance?.teacherConfirmed === true;

const studentPresent = (lesson) =>
  lesson?.attendance?.studentStatus === "present" ||
  lesson?.attendance?.studentConfirmed === true;

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
              {formatLessonDate(reschedule.requestedDate)}{" "}
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

export default function TeacherLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [filter, setFilter] = useState("today");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [notice, setNotice] = useState(null);
  const [clock, setClock] = useState(Date.now());

  const [startTarget, setStartTarget] = useState(null);

  const [rescheduleLesson, setRescheduleLesson] = useState(null);
  const [rescheduleForm, setRescheduleForm] = useState(emptyReschedule);

  const [cancellationLesson, setCancellationLesson] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");

  const [noShowLesson, setNoShowLesson] = useState(null);
  const [noShowReason, setNoShowReason] = useState("");

  const [reportLesson, setReportLesson] = useState(null);
  const [reportForm, setReportForm] = useState(emptyReport);

  const loadLessons = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getLessons({ limit: 200 });
      setLessons(getLessonsArray(response));
    } catch (error) {
      setNotice({
        type: "error",
        text: getErrorMessage(error, "Could not load assigned lessons."),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLessons();
  }, [loadLessons]);

  useEffect(() => {
    const timer = window.setInterval(() => setClock(Date.now()), 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

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
    const now = new Date();

    const matchesFilter = (lesson) => {
      if (filter === "all") return true;

      if (filter === "today") {
        return (
          isSameLocalDay(lesson.lessonDate, now) &&
          !["cancelled", "no_show"].includes(lesson.status)
        );
      }

      if (filter === "upcoming") {
        return (
          lesson.status === "scheduled" &&
          lessonTimestamp(lesson) > now.getTime()
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
        getPersonName(lesson.student, ""),
        lesson.student?.phone,
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
      today: lessons.filter(
        (lesson) =>
          isSameLocalDay(lesson.lessonDate) &&
          !["cancelled", "no_show"].includes(lesson.status),
      ).length,
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
      successMessage: "The reschedule request was sent to the admin.",
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
      successMessage: "The cancellation request was sent to the admin.",
      close: () => {
        setCancellationLesson(null);
        setCancellationReason("");
      },
    });
  };

  const confirmStart = () => {
    if (!startTarget) return;

    runLessonAction({
      lesson: startTarget,
      action: () => startLesson(getLessonId(startTarget)),
      successMessage:
        "Lesson started. Both participants can confirm attendance.",
      close: () => setStartTarget(null),
    });
  };

  const confirmTeacherAttendance = (lesson) => {
    runLessonAction({
      lesson,
      action: () =>
        confirmAttendance(getLessonId(lesson), {
          status: "present",
        }),
      successMessage: "Your attendance was confirmed.",
    });
  };

  const openReport = (lesson) => {
    if (!teacherPresent(lesson)) {
      setNotice({
        type: "error",
        text: "Confirm your attendance before submitting the lesson report.",
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

  const submitReport = (event) => {
    event.preventDefault();
    if (!reportLesson) return;

    if (!reportForm.skillsCovered.length) {
      setNotice({
        type: "error",
        text: "Select at least one skill covered in the lesson.",
      });
      return;
    }

    runLessonAction({
      lesson: reportLesson,
      action: () =>
        completeLesson(getLessonId(reportLesson), {
          lessonProgress: {
            skillsCovered: reportForm.skillsCovered,
            teacherNotes: reportForm.teacherNotes.trim(),
            performance: reportForm.performance,
            areasToImprove: reportForm.areasToImprove
              .split(/\n|,/)
              .map((item) => item.trim())
              .filter(Boolean),
            nextLessonRecommendation:
              reportForm.nextLessonRecommendation.trim(),
          },
        }),
      successMessage:
        "Lesson report submitted. Waiting for student confirmation.",
      close: () => {
        setReportLesson(null);
        setReportForm(emptyReport);
      },
    });
  };

  const submitNoShow = (event) => {
    event.preventDefault();
    if (!noShowLesson) return;

    runLessonAction({
      lesson: noShowLesson,
      action: () =>
        markLessonNoShow(getLessonId(noShowLesson), {
          participant: "student",
          reason: noShowReason.trim(),
        }),
      successMessage: "Student no-show was recorded.",
      close: () => {
        setNoShowLesson(null);
        setNoShowReason("");
      },
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Teacher dashboard
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Assigned lessons
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Start the lesson at the scheduled time, confirm your attendance,
              submit the report, and then wait for the student to confirm
              completion.
            </p>
          </div>

          <button
            type="button"
            onClick={loadLessons}
            disabled={loading}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100 disabled:opacity-60"
          >
            {loading ? "Refreshing..." : "Refresh lessons"}
          </button>
        </div>

        <Notice notice={notice} onClose={() => setNotice(null)} />

        <section className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
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
            placeholder="Search student, phone, location, vehicle or status..."
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-600">
            Loading assigned lessons...
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <h2 className="text-lg font-bold text-slate-800">
              No lessons found
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Try another filter or clear the search.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLessons.map((lesson) => {
              const lessonId = getLessonId(lesson);
              const busy = busyId === lessonId;
              const teacherIsPresent = teacherPresent(lesson);
              const studentIsPresent = studentPresent(lesson);
              const startState = getStartState(lesson, clock);
              const reschedulePending =
                lesson.rescheduleRequest?.status === "pending";
              const cancellationPending =
                lesson.cancellationRequest?.status === "pending";

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

                        {teacherIsPresent && (
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                            Teacher attendance confirmed
                          </span>
                        )}

                        {studentIsPresent && (
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                            Student present
                          </span>
                        )}
                      </div>

                      <h2 className="mt-3 text-xl font-bold text-slate-900">
                        {lesson.booking?.offer?.title || "Driving lesson"}
                      </h2>
                      <p className="mt-1 text-sm text-slate-600">
                        Student:{" "}
                        <span className="font-semibold text-slate-800">
                          {getPersonName(lesson.student, "Student not found")}
                        </span>
                        {lesson.student?.phone
                          ? ` · ${lesson.student.phone}`
                          : ""}
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

                  <div className="grid gap-4 p-5 md:grid-cols-4">
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
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Student attendance
                      </p>
                      <p className="mt-1 text-sm font-medium capitalize text-slate-700">
                        {lesson.attendance?.studentStatus || "pending"}
                      </p>
                    </div>
                  </div>

                  {lesson.status === "scheduled" && !startState.allowed && (
                    <div className="mx-5 mb-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
                      {startState.message}
                    </div>
                  )}

                  {lesson.status === "awaiting_confirmation" && (
                    <div className="mx-5 mb-5 rounded-xl border border-violet-200 bg-violet-50 p-4">
                      <p className="font-bold text-violet-900">
                        Waiting for student confirmation
                      </p>
                      <p className="mt-1 text-sm text-violet-700">
                        Your report has been submitted. The student must review
                        it and confirm completion.
                      </p>
                    </div>
                  )}

                  {lesson.status === "completed" && (
                    <div className="mx-5 mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                      <p className="font-bold text-emerald-900">
                        Lesson completed
                      </p>
                      <p className="mt-1 text-sm text-emerald-700">
                        Performance:{" "}
                        {formatPerformance(lesson.lessonProgress?.performance)}
                      </p>
                      {lesson.lessonProgress?.rating && (
                        <p className="mt-2 text-sm font-semibold text-amber-600">
                          Student rating:{" "}
                          {"★".repeat(lesson.lessonProgress.rating)}
                        </p>
                      )}
                      {lesson.lessonProgress?.studentNotes && (
                        <p className="mt-2 rounded-lg bg-white/80 p-3 text-sm text-slate-700">
                          {lesson.lessonProgress.studentNotes}
                        </p>
                      )}
                    </div>
                  )}

                  <RequestSummary lesson={lesson} />

                  <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4">
                    {lesson.status === "scheduled" && (
                      <>
                        <button
                          type="button"
                          onClick={() => setStartTarget(lesson)}
                          disabled={
                            busy ||
                            !startState.allowed ||
                            reschedulePending ||
                            cancellationPending
                          }
                          title={startState.message}
                          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Start lesson
                        </button>

                        <button
                          type="button"
                          onClick={() => openReschedule(lesson)}
                          disabled={
                            busy || reschedulePending || cancellationPending
                          }
                          className="rounded-lg border border-blue-300 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 disabled:opacity-50"
                        >
                          {reschedulePending
                            ? "Reschedule pending"
                            : "Request reschedule"}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setCancellationLesson(lesson);
                            setCancellationReason("");
                          }}
                          disabled={
                            busy || cancellationPending || reschedulePending
                          }
                          className="rounded-lg border border-rose-300 bg-white px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-50"
                        >
                          {cancellationPending
                            ? "Cancellation pending"
                            : "Request cancellation"}
                        </button>
                      </>
                    )}

                    {lesson.status === "in_progress" && !teacherIsPresent && (
                      <button
                        type="button"
                        onClick={() => confirmTeacherAttendance(lesson)}
                        disabled={busy}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        {busy ? "Saving..." : "Confirm my attendance"}
                      </button>
                    )}

                    {lesson.status === "in_progress" && (
                      <>
                        <button
                          type="button"
                          onClick={() => openReport(lesson)}
                          disabled={busy || !teacherIsPresent}
                          title={
                            teacherIsPresent
                              ? "Submit lesson report"
                              : "Confirm your attendance first"
                          }
                          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Complete & submit report
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setNoShowLesson(lesson);
                            setNoShowReason("");
                          }}
                          disabled={busy}
                          className="rounded-lg border border-rose-300 bg-white px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-50"
                        >
                          Mark student no-show
                        </button>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {startTarget && (
        <ModalShell title="Start lesson" onClose={() => setStartTarget(null)}>
          <div className="space-y-4">
            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-bold text-slate-900">
                {getPersonName(startTarget.student, "Student")}
              </p>
              <p className="mt-1">
                {formatLessonDate(startTarget.lessonDate)} ·{" "}
                {startTarget.startTime}–{startTarget.endTime}
              </p>
              <p className="mt-1">{getLessonLocation(startTarget)}</p>
            </div>

            <p className="text-sm text-slate-600">
              Starting the lesson changes its status to In progress and allows
              both participants to confirm attendance.
            </p>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setStartTarget(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={confirmStart}
                disabled={busyId === getLessonId(startTarget)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {busyId === getLessonId(startTarget)
                  ? "Starting..."
                  : "Start now"}
              </button>
            </div>
          </div>
        </ModalShell>
      )}

      {rescheduleLesson && (
        <ModalShell
          title="Request lesson reschedule"
          onClose={() => setRescheduleLesson(null)}
        >
          <form onSubmit={submitReschedule} className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">
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
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
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
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
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
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
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
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRescheduleLesson(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={busyId === getLessonId(rescheduleLesson)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
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
              The lesson remains scheduled until an admin approves the
              cancellation.
            </p>

            <label className="block text-sm font-semibold text-slate-700">
              Reason
              <textarea
                required
                rows={5}
                value={cancellationReason}
                onChange={(event) => setCancellationReason(event.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setCancellationLesson(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={busyId === getLessonId(cancellationLesson)}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {busyId === getLessonId(cancellationLesson)
                  ? "Submitting..."
                  : "Submit request"}
              </button>
            </div>
          </form>
        </ModalShell>
      )}

      {noShowLesson && (
        <ModalShell
          title="Mark student no-show"
          onClose={() => setNoShowLesson(null)}
        >
          <form onSubmit={submitNoShow} className="space-y-4">
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              This closes the lesson as No-show. Use it only when the student
              did not attend.
            </div>

            <label className="block text-sm font-semibold text-slate-700">
              Note
              <textarea
                required
                rows={4}
                value={noShowReason}
                onChange={(event) => setNoShowReason(event.target.value)}
                placeholder="Example: Student did not arrive and could not be reached."
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setNoShowLesson(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={busyId === getLessonId(noShowLesson)}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {busyId === getLessonId(noShowLesson)
                  ? "Saving..."
                  : "Confirm no-show"}
              </button>
            </div>
          </form>
        </ModalShell>
      )}

      {reportLesson && (
        <ModalShell
          title="Complete lesson and submit report"
          onClose={() => setReportLesson(null)}
          maxWidth="max-w-3xl"
        >
          <form onSubmit={submitReport} className="space-y-5">
            <div>
              <p className="text-sm font-bold text-slate-800">
                Skills covered <span className="text-rose-500">*</span>
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {DRIVING_SKILLS.map((skill) => {
                  const checked = reportForm.skillsCovered.includes(skill);
                  return (
                    <label
                      key={skill}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm ${
                        checked
                          ? "border-blue-400 bg-blue-50 text-blue-800"
                          : "border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleSkill(skill)}
                      />
                      {skill}
                    </label>
                  );
                })}
              </div>
            </div>

            <label className="block text-sm font-semibold text-slate-700">
              Student performance
              <select
                required
                value={reportForm.performance}
                onChange={(event) =>
                  setReportForm((current) => ({
                    ...current,
                    performance: event.target.value,
                  }))
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value="needs_improvement">Needs improvement</option>
                <option value="satisfactory">Satisfactory</option>
                <option value="good">Good</option>
                <option value="excellent">Excellent</option>
              </select>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Teacher notes <span className="text-rose-500">*</span>
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
                placeholder="Describe the lesson, progress and important observations."
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Areas to improve
              <textarea
                rows={4}
                value={reportForm.areasToImprove}
                onChange={(event) =>
                  setReportForm((current) => ({
                    ...current,
                    areasToImprove: event.target.value,
                  }))
                }
                placeholder="Enter one item per line."
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
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
                placeholder="What should be covered next?"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>

            <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 text-sm text-violet-700">
              Submitting this report changes the lesson to Awaiting
              confirmation. The student will then confirm completion.
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setReportLesson(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={busyId === getLessonId(reportLesson)}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {busyId === getLessonId(reportLesson)
                  ? "Submitting..."
                  : "Submit lesson report"}
              </button>
            </div>
          </form>
        </ModalShell>
      )}
    </main>
  );
}
