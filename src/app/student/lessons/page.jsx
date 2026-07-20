// "use client";

// import Link from "next/link";
// import { useCallback, useEffect, useState } from "react";
// import { FaEye, FaSearch } from "react-icons/fa";

// import Pagination from "@/components/Pagination";
// import {
//   confirmAttendance,
//   confirmLessonCompletion,
//   getLessons,
// } from "@/features/API";
// import {
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

// const studentPresent = (lesson) =>
//   lesson.attendance?.studentStatus === "present" ||
//   lesson.attendance?.studentConfirmed === true;

// export default function StudentLessonsPage() {
//   const [lessons, setLessons] = useState([]);
//   const [meta, setMeta] = useState(INITIAL_META);
//   const [loading, setLoading] = useState(true);
//   const [busyId, setBusyId] = useState("");
//   const [notice, setNotice] = useState(null);

//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(20);
//   const [status, setStatus] = useState("all");
//   const [search, setSearch] = useState("");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const debouncedSearch = useDebouncedValue(search, 500);

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

//   return (
//     <main className="min-h-screen bg-slate-50 p-4 md:p-6">
//       <div className="mx-auto max-w-7xl space-y-5">
//         <header>
//           <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
//             Student dashboard
//           </p>
//           <h1 className="mt-1 text-3xl font-bold text-slate-900">My lessons</h1>
//           <p className="mt-2 text-sm text-slate-600">
//             Lessons are loaded page by page, so the page remains fast even after
//             many years of lesson history.
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
//               placeholder="Search teacher name, email or phone"
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
//             <option value="desc">Newest first</option>
//             <option value="asc">Oldest first</option>
//           </select>
//         </section>

//         <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="min-w-[900px] w-full text-left text-sm">
//               <thead className="bg-slate-100 text-xs uppercase text-slate-600">
//                 <tr>
//                   <th className="px-4 py-3">Date & time</th>
//                   <th className="px-4 py-3">Teacher</th>
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
//                     const present = studentPresent(lesson);
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
//                             {lesson.teacher?.name || "Teacher"}
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
//                           <p className="mt-1 max-w-56 truncate text-xs text-slate-500">
//                             {getLessonLocation(lesson)}
//                           </p>
//                         </td>

//                         <td className="px-4 py-4 capitalize">
//                           {lesson.attendance?.studentStatus ||
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
//                             <Link
//                               href={`/student/lessons/${lesson._id}`}
//                               className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white"
//                             >
//                               <FaEye /> View
//                             </Link>

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
//                                 Confirm attendance
//                               </button>
//                             )}

//                             {lesson.status === "awaiting_confirmation" && (
//                               <button
//                                 type="button"
//                                 disabled={busy || !present}
//                                 onClick={() =>
//                                   runAction(
//                                     lesson,
//                                     () => confirmLessonCompletion(lesson._id),
//                                     "Lesson completion confirmed.",
//                                   )
//                                 }
//                                 className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
//                               >
//                                 Confirm completion
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
//     </main>
//   );
// }

"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FaEye, FaSearch } from "react-icons/fa";

import BookingWorkspace from "@/components/lessons/BookingWorkspace";
import Pagination from "@/components/Pagination";
import {
  confirmAttendance,
  confirmLessonCompletion,
  getLessons,
} from "@/features/API";
import {
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

const studentPresent = (lesson) =>
  lesson.attendance?.studentStatus === "present" ||
  lesson.attendance?.studentConfirmed === true;

export default function StudentLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [meta, setMeta] = useState(INITIAL_META);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [notice, setNotice] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const debouncedSearch = useDebouncedValue(search, 500);

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

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-5">
        <header>
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Student dashboard
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">My lessons</h1>
          <p className="mt-2 text-sm text-slate-600">
            Lessons are loaded page by page, so the page remains fast even after
            many years of lesson history.
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

        <BookingWorkspace role="student" />

        <section className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[1fr_220px_180px]">
          <label className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search teacher name, email or phone"
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
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full text-left text-sm">
              <thead className="bg-slate-100 text-xs uppercase text-slate-600">
                <tr>
                  <th className="px-4 py-3">Date & time</th>
                  <th className="px-4 py-3">Teacher</th>
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
                    const present = studentPresent(lesson);
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
                            {lesson.teacher?.name || "Teacher"}
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
                          <p className="mt-1 max-w-56 truncate text-xs text-slate-500">
                            {getLessonLocation(lesson)}
                          </p>
                        </td>

                        <td className="px-4 py-4 capitalize">
                          {lesson.attendance?.studentStatus ||
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
                            <Link
                              href={`/student/lessons/${lesson._id}`}
                              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white"
                            >
                              <FaEye /> View
                            </Link>

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
                                Confirm attendance
                              </button>
                            )}

                            {lesson.status === "awaiting_confirmation" && (
                              <button
                                type="button"
                                disabled={busy || !present}
                                onClick={() =>
                                  runAction(
                                    lesson,
                                    () => confirmLessonCompletion(lesson._id),
                                    "Lesson completion confirmed.",
                                  )
                                }
                                className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
                              >
                                Confirm completion
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
    </main>
  );
}
