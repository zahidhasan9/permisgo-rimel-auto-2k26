// "use client";

// import { useState } from "react";
// import {
//   FaCalendarAlt,
//   FaCheck,
//   FaChevronLeft,
//   FaQuestionCircle,
//   FaSearch,
//   FaTimes,
// } from "react-icons/fa";
// import { useRouter } from "next/navigation";
// const filterGroups = [
//   {
//     title: "Income-generating lessons",
//     items: [
//       { key: "futureLessons", label: "Future lessons" },
//       { key: "lessonsLearned", label: "Lessons learned" },
//     ],
//   },
//   {
//     title: "Other lessons",
//     items: [
//       { key: "awaitingConfirmation", label: "Awaiting confirmation" },
//       { key: "canceledByYou", label: "Canceled by you" },
//       { key: "canceledByStudent", label: "Canceled by the student" },
//     ],
//   },
// ];

// export default function Lessons() {
//   const [search, setSearch] = useState("");
//   const [filters, setFilters] = useState({
//     futureLessons: true,
//     lessonsLearned: false,
//     awaitingConfirmation: false,
//     canceledByYou: false,
//     canceledByStudent: false,
//   });
// const router = useRouter();
//   const handleCheckbox = (name) => {
//     setFilters((prev) => ({
//       ...prev,
//       [name]: !prev[name],
//     }));
//   };

//   return (
//     <main className="min-h-screen bg-[#f8fafc] px-4 py-5 sm:px-6 lg:px-8">
//       <section className="mx-auto ">
//         {/* Header */}
//         {/* <header className="mb-5 flex items-center gap-3">
//           <button
//             type="button"
//             onClick={() => router.back()}
//             className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#16458f] shadow-sm transition hover:bg-blue-50"
//           >
//             <FaChevronLeft size={14} />
//           </button>

//           <div>
//             <h1 className="text-2xl font-bold text-[#16458f]">
//               List of Lessons
//             </h1>

//           </div>
//         </header> */}

//         {/* Header */}
//         <header className="mb-5 flex items-center gap-3">
//           <button
//             type="button"
//             onClick={() => router.back()}
//             className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#16458f] shadow-sm transition hover:bg-blue-50"
//           >
//             <FaChevronLeft size={14} />
//           </button>

//           <h1 className="text-2xl font-bold text-[#16458f]">List of Lessons</h1>
//         </header>

//         {/* Action Bar */}
//         <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
//           <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex h-11 w-full items-center gap-3 rounded-xl border border-slate-200 bg-[#f8fafc] px-4 transition focus-within:border-[#16458f] focus-within:ring-4 focus-within:ring-blue-50 lg:max-w-md">
//               <FaSearch size={14} className="text-slate-400" />

//               <input
//                 type="text"
//                 placeholder="Search students"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
//               />

//               {search && (
//                 <button
//                   type="button"
//                   onClick={() => setSearch("")}
//                   className="text-slate-400 transition hover:text-slate-700"
//                 >
//                   <FaTimes size={14} />
//                 </button>
//               )}
//             </div>

//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//               <button
//                 type="button"
//                 className="h-11 rounded-xl border border-[#e2233d] bg-white px-5 text-sm font-bold text-slate-900 transition hover:bg-red-50"
//               >
//                 Arrange Review
//               </button>

//               <button
//                 type="button"
//                 className="h-11 rounded-xl bg-[#e2233d] px-5 text-sm font-bold text-white transition hover:bg-[#c91f35]"
//               >
//                 Submit Lesson
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
//           {/* Filter Card */}
//           <aside className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
//             <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
//               <DateInput label="Start date" value="10/12/2025" />
//               <DateInput label="End date" value="10/12/2025" />
//             </div>

//             <div className="mt-5 space-y-5">
//               {filterGroups.map((group) => (
//                 <div key={group.title}>
//                   <h3 className="mb-3 text-sm font-extrabold text-slate-900">
//                     {group.title}
//                   </h3>

//                   <div className="space-y-2.5">
//                     {group.items.map((item) => (
//                       <CustomCheckbox
//                         key={item.key}
//                         label={item.label}
//                         checked={filters[item.key]}
//                         onChange={() => handleCheckbox(item.key)}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </aside>

//           {/* Result Card */}
//           <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
//             <div className="flex min-h-[360px] items-center justify-center rounded-2xl bg-[#eef4fb] p-6 text-center">
//               <div>
//                 <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#16458f] shadow-sm">
//                   <FaQuestionCircle size={24} />
//                 </div>

//                 <h3 className="text-lg font-extrabold text-slate-900">
//                   No Lessons Found
//                 </h3>

//                 <p className="mt-1 text-sm text-slate-500">
//                   You have no lessons in this filter range.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

// function DateInput({ label, value }) {
//   return (
//     <div>
//       <label className="mb-2 block text-sm font-bold text-slate-700">
//         {label}
//       </label>

//       <div className="flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-[#f8fafc] px-4">
//         <input
//           type="text"
//           value={value}
//           readOnly
//           className="w-full bg-transparent text-sm font-medium text-slate-600 outline-none"
//         />

//         <FaCalendarAlt size={15} className="text-[#16458f]" />
//       </div>
//     </div>
//   );
// }

// function CustomCheckbox({ label, checked, onChange }) {
//   return (
//     <button
//       type="button"
//       onClick={onChange}
//       className="flex w-full items-center gap-3 rounded-xl px-2 py-1.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
//     >
//       <span
//         className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[10px] transition ${
//           checked
//             ? "border-emerald-500 bg-emerald-500 text-white"
//             : "border-[#16458f] bg-white text-transparent"
//         }`}
//       >
//         <FaCheck />
//       </span>

//       <span>{label}</span>
//     </button>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  confirmAttendance,
  completeLesson,
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
  statusClass,
  statusLabel,
  unwrap,
} from "../../../features/lessonHelpers";

const FILTERS = [
  { key: "today", label: "Today" },
  { key: "upcoming", label: "Upcoming" },
  { key: "active", label: "In progress" },
  { key: "awaiting", label: "Awaiting confirmation" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled / No-show" },
  { key: "all", label: "All lessons" },
];

const EMPTY_REPORT = {
  skillsCovered: [],
  teacherNotes: "",
  performance: "good",
  areasToImprove: "",
  nextLessonRecommendation: "",
};

const startOfToday = () => {
  const value = new Date();
  value.setHours(0, 0, 0, 0);
  return value;
};

const endOfToday = () => {
  const value = new Date();
  value.setHours(23, 59, 59, 999);
  return value;
};

const personName = (person, fallback) =>
  person?.name ||
  [person?.firstName, person?.lastName].filter(Boolean).join(" ") ||
  fallback;

const getLessonsFromResponse = (response) => {
  const data = unwrap(response, []);
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.lessons)) return data.lessons;
  return [];
};

export default function TeacherLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [filter, setFilter] = useState("today");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [reportLesson, setReportLesson] = useState(null);
  const [report, setReport] = useState(EMPTY_REPORT);

  const loadLessons = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getLessons({ limit: 100, sort: "lessonDate" });
      setLessons(getLessonsFromResponse(response));
    } catch (loadError) {
      setError(getErrorMessage(loadError, "Could not load your lessons."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLessons();
  }, []);

  const filteredLessons = useMemo(() => {
    const todayStart = startOfToday();
    const todayEnd = endOfToday();
    const needle = search.trim().toLowerCase();

    return lessons
      .filter((lesson) => {
        const lessonDate = new Date(lesson.lessonDate);
        const status = lesson.status;

        if (filter === "today") {
          return lessonDate >= todayStart && lessonDate <= todayEnd;
        }
        if (filter === "upcoming") {
          return status === "scheduled" && lessonDate > todayEnd;
        }
        if (filter === "active") return status === "in_progress";
        if (filter === "awaiting") return status === "awaiting_confirmation";
        if (filter === "completed") return status === "completed";
        if (filter === "cancelled")
          return ["cancelled", "no_show"].includes(status);
        return true;
      })
      .filter((lesson) => {
        if (!needle) return true;
        const student = personName(lesson.student, "").toLowerCase();
        const location = getLessonLocation(lesson).toLowerCase();
        const vehicle = getVehicleType(lesson).toLowerCase();
        return (
          student.includes(needle) ||
          location.includes(needle) ||
          vehicle.includes(needle)
        );
      })
      .sort((a, b) => new Date(a.lessonDate) - new Date(b.lessonDate));
  }, [filter, lessons, search]);

  const stats = useMemo(
    () => ({
      today: lessons.filter((lesson) => {
        const date = new Date(lesson.lessonDate);
        return date >= startOfToday() && date <= endOfToday();
      }).length,
      upcoming: lessons.filter(
        (lesson) =>
          lesson.status === "scheduled" &&
          new Date(lesson.lessonDate) > endOfToday(),
      ).length,
      active: lessons.filter((lesson) => lesson.status === "in_progress")
        .length,
      awaiting: lessons.filter(
        (lesson) => lesson.status === "awaiting_confirmation",
      ).length,
    }),
    [lessons],
  );

  const replaceLesson = (updatedLesson) => {
    if (!updatedLesson?._id) return;
    setLessons((current) =>
      current.map((lesson) =>
        lesson._id === updatedLesson._id ? updatedLesson : lesson,
      ),
    );
  };

  const runAction = async (lessonId, action, successMessage) => {
    try {
      setBusyId(lessonId);
      setError("");
      setMessage("");
      const response = await action();
      const updated = unwrap(response);
      replaceLesson(updated);
      setMessage(successMessage);
      return updated;
    } catch (actionError) {
      setError(getErrorMessage(actionError));
      return null;
    } finally {
      setBusyId("");
    }
  };

  const handleStart = (lesson) => {
    if (!window.confirm("Start this lesson now?")) return;
    runAction(
      lesson._id,
      () => startLesson(lesson._id),
      "Lesson started successfully.",
    );
  };

  const handleAttendance = (lesson) => {
    runAction(
      lesson._id,
      () => confirmAttendance(lesson._id, { status: "present" }),
      "Your attendance has been confirmed.",
    );
  };

  const handleRescheduleRequest = async (lesson) => {
    const requestedDate = window.prompt("New date (YYYY-MM-DD):");
    if (!requestedDate) return;
    const requestedStartTime = window.prompt(
      "New start time (HH:MM):",
      lesson.startTime || "10:00",
    );
    if (!requestedStartTime) return;
    const requestedEndTime = window.prompt(
      "New end time (HH:MM):",
      lesson.endTime || "11:00",
    );
    if (!requestedEndTime) return;
    const reason = window.prompt("Reason for reschedule:");
    if (!reason?.trim()) return;

    await runAction(
      lesson._id,
      () =>
        requestLessonReschedule(lesson._id, {
          requestedDate,
          requestedStartTime,
          requestedEndTime,
          reason: reason.trim(),
        }),
      "Reschedule request sent to the admin.",
    );
  };

  const handleCancellationRequest = async (lesson) => {
    const reason = window.prompt("Why do you want to cancel this lesson?");
    if (!reason?.trim()) return;
    await runAction(
      lesson._id,
      () => requestLessonCancellation(lesson._id, { reason: reason.trim() }),
      "Cancellation request sent to the admin.",
    );
  };

  const handleNoShow = async (lesson) => {
    if (
      !window.confirm(
        "Mark the student as a no-show? This will end the lesson.",
      )
    )
      return;
    const note =
      window.prompt(
        "Optional note about the no-show:",
        "Student did not attend.",
      ) || "";
    await runAction(
      lesson._id,
      () => markLessonNoShow(lesson._id, { participant: "student", note }),
      "Student marked as a no-show.",
    );
  };

  const openReport = (lesson) => {
    setReportLesson(lesson);
    setReport({
      skillsCovered: lesson.lessonProgress?.skillsCovered || [],
      teacherNotes: lesson.lessonProgress?.teacherNotes || "",
      performance: lesson.lessonProgress?.performance || "good",
      areasToImprove: (lesson.lessonProgress?.areasToImprove || []).join(", "),
      nextLessonRecommendation:
        lesson.lessonProgress?.nextLessonRecommendation || "",
    });
    setError("");
    setMessage("");
  };

  const toggleSkill = (skill) => {
    setReport((current) => ({
      ...current,
      skillsCovered: current.skillsCovered.includes(skill)
        ? current.skillsCovered.filter((item) => item !== skill)
        : [...current.skillsCovered, skill],
    }));
  };

  const submitReport = async (event) => {
    event.preventDefault();
    if (!reportLesson) return;
    if (!report.teacherNotes.trim()) {
      setError("Please add a short lesson report.");
      return;
    }

    const updated = await runAction(
      reportLesson._id,
      () =>
        completeLesson(reportLesson._id, {
          ...report,
          teacherNotes: report.teacherNotes.trim(),
          areasToImprove: report.areasToImprove.trim(),
          nextLessonRecommendation: report.nextLessonRecommendation.trim(),
        }),
      "Lesson report submitted. Waiting for student confirmation.",
    );

    if (updated) {
      setReportLesson(null);
      setReport(EMPTY_REPORT);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
              Teacher dashboard
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              My driving lessons
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Start lessons, confirm attendance and submit each student&apos;s
              progress report.
            </p>
          </div>
          <button
            type="button"
            onClick={loadLessons}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Refresh
          </button>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Today", stats.today],
            ["Upcoming", stats.upcoming],
            ["In progress", stats.active],
            ["Awaiting student", stats.awaiting],
          ].map(([label, value]) => (
            <article key={label} className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
            </article>
          ))}
        </section>

        {(message || error) && (
          <div
            className={`rounded-xl border px-4 py-3 text-sm ${
              error
                ? "border-rose-200 bg-rose-50 text-rose-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {error || message}
          </div>
        )}

        <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setFilter(item.key)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    filter === item.key
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search student, vehicle or location"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500 lg:max-w-sm"
            />
          </div>

          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="py-16 text-center text-slate-500">
                Loading lessons...
              </div>
            ) : filteredLessons.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">
                <p className="font-semibold text-slate-700">No lessons found</p>
                <p className="mt-1 text-sm text-slate-500">
                  Try another filter or refresh the page.
                </p>
              </div>
            ) : (
              filteredLessons.map((lesson) => {
                const isBusy = busyId === lesson._id;
                const teacherAttendance =
                  lesson.attendance?.teacherStatus ||
                  (lesson.attendance?.teacherConfirmed ? "present" : "pending");

                return (
                  <article
                    key={lesson._id}
                    className="rounded-2xl border border-slate-200 p-5"
                  >
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl font-bold text-slate-900">
                            {personName(lesson.student, "Student")}
                          </h2>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(lesson.status)}`}
                          >
                            {statusLabel(lesson.status)}
                          </span>
                        </div>

                        <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-4">
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
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 text-xs">
                          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700">
                            Your attendance:{" "}
                            <strong>{teacherAttendance}</strong>
                          </span>
                          {lesson.rescheduleRequest?.status === "pending" && (
                            <span className="rounded-full bg-amber-100 px-3 py-1.5 font-semibold text-amber-700">
                              Reschedule request pending
                            </span>
                          )}
                          {lesson.cancellationRequest?.status === "pending" && (
                            <span className="rounded-full bg-rose-100 px-3 py-1.5 font-semibold text-rose-700">
                              Cancellation request pending
                            </span>
                          )}
                        </div>

                        {lesson.lessonProgress?.teacherNotes && (
                          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                            <p className="font-semibold text-slate-900">
                              Your report
                            </p>
                            <p className="mt-1 whitespace-pre-wrap">
                              {lesson.lessonProgress.teacherNotes}
                            </p>
                            {!!lesson.lessonProgress.skillsCovered?.length && (
                              <p className="mt-2 text-xs text-slate-500">
                                Skills:{" "}
                                {lesson.lessonProgress.skillsCovered.join(", ")}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex w-full flex-wrap gap-2 xl:w-64 xl:justify-end">
                        {lesson.status === "scheduled" && (
                          <>
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => handleStart(lesson)}
                              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                            >
                              Start lesson
                            </button>
                            <button
                              type="button"
                              disabled={
                                isBusy ||
                                lesson.rescheduleRequest?.status === "pending"
                              }
                              onClick={() => handleRescheduleRequest(lesson)}
                              className="rounded-xl border border-blue-300 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 disabled:opacity-50"
                            >
                              Request reschedule
                            </button>
                            <button
                              type="button"
                              disabled={
                                isBusy ||
                                lesson.cancellationRequest?.status === "pending"
                              }
                              onClick={() => handleCancellationRequest(lesson)}
                              className="rounded-xl border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-50"
                            >
                              Request cancellation
                            </button>
                          </>
                        )}

                        {lesson.status === "in_progress" && (
                          <>
                            {!lesson.attendance?.teacherConfirmed && (
                              <button
                                type="button"
                                disabled={isBusy}
                                onClick={() => handleAttendance(lesson)}
                                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                              >
                                Confirm attendance
                              </button>
                            )}
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => openReport(lesson)}
                              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                            >
                              Complete & report
                            </button>
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => handleNoShow(lesson)}
                              className="rounded-xl border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-50"
                            >
                              Student no-show
                            </button>
                          </>
                        )}

                        {lesson.status === "awaiting_confirmation" && (
                          <span className="rounded-xl bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700">
                            Waiting for student confirmation
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>
      </div>

      {reportLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <form
            onSubmit={submitReport}
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
                  Lesson report
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  {personName(reportLesson.student, "Student")}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {formatLessonDate(reportLesson.lessonDate)},{" "}
                  {reportLesson.startTime}–{reportLesson.endTime}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setReportLesson(null)}
                className="rounded-lg px-3 py-1 text-xl text-slate-500 hover:bg-slate-100"
              >
                ×
              </button>
            </div>

            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-slate-800">
                Skills covered
              </p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {DRIVING_SKILLS.map((skill) => (
                  <label
                    key={skill}
                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 p-3 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={report.skillsCovered.includes(skill)}
                      onChange={() => toggleSkill(skill)}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700">
                Student performance
                <select
                  value={report.performance}
                  onChange={(event) =>
                    setReport((current) => ({
                      ...current,
                      performance: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-orange-500"
                >
                  <option value="needs_improvement">Needs improvement</option>
                  <option value="satisfactory">Satisfactory</option>
                  <option value="good">Good / Very good</option>
                  <option value="excellent">Excellent</option>
                </select>
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Next lesson recommendation
                <input
                  value={report.nextLessonRecommendation}
                  onChange={(event) =>
                    setReport((current) => ({
                      ...current,
                      nextLessonRecommendation: event.target.value,
                    }))
                  }
                  placeholder="Example: practise roundabouts"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-orange-500"
                />
              </label>
            </div>

            <label className="mt-4 block text-sm font-semibold text-slate-700">
              Lesson notes <span className="text-rose-600">*</span>
              <textarea
                value={report.teacherNotes}
                onChange={(event) =>
                  setReport((current) => ({
                    ...current,
                    teacherNotes: event.target.value,
                  }))
                }
                rows={4}
                placeholder="Describe what was practised and how the student performed."
                className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-orange-500"
              />
            </label>

            <label className="mt-4 block text-sm font-semibold text-slate-700">
              Areas to improve
              <textarea
                value={report.areasToImprove}
                onChange={(event) =>
                  setReport((current) => ({
                    ...current,
                    areasToImprove: event.target.value,
                  }))
                }
                rows={3}
                placeholder="Mention specific areas for improvement."
                className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-orange-500"
              />
            </label>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setReportLesson(null)}
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={busyId === reportLesson._id}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
              >
                {busyId === reportLesson._id
                  ? "Submitting..."
                  : "Submit lesson report"}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
