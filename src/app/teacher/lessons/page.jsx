"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCheck,
  FaEllipsisV,
  FaEye,
  FaFilter,
  FaPlay,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

import BookingWorkspace from "@/components/lessons/BookingWorkspace";
import Pagination from "@/components/Pagination";
import {
  completeLesson,
  confirmAttendance,
  getLesson,
  getLessonStats,
  getLessons,
  getLocationBookings,
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

const TABS = [
  { key: "requests", label: "Requests" },
  { key: "today", label: "Today" },
  { key: "upcoming", label: "Upcoming" },
  { key: "history", label: "History" },
];
const INITIAL_META = { page: 1, limit: 10, total: 0, totalPages: 1 };
const INITIAL_STATS = {
  scheduled: 0,
  in_progress: 0,
  awaiting_confirmation: 0,
  completed: 0,
};
const EMPTY_REPORT = {
  skillsCovered: [],
  teacherNotes: "",
  performance: "satisfactory",
  areasToImprove: "",
  nextLessonRecommendation: "",
};

const todayKey = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
};
const teacherPresent = (lesson) =>
  lesson.attendance?.teacherStatus === "present" ||
  lesson.attendance?.teacherConfirmed === true;

export default function TeacherLessonsPage() {
  const [activeTab, setActiveTab] = useState("today");
  const [lessons, setLessons] = useState([]);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [meta, setMeta] = useState(INITIAL_META);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [reportLesson, setReportLesson] = useState(null);
  const [report, setReport] = useState(EMPTY_REPORT);
  const [menuId, setMenuId] = useState("");
  const [busyId, setBusyId] = useState("");
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState(null);
  const debouncedSearch = useDebouncedValue(search, 400);

  const loadSummary = useCallback(async () => {
    try {
      const [statsResponse, bookingResponse] = await Promise.all([
        getLessonStats(),
        getLocationBookings({ status: "pending", page: 1, limit: 1 }),
      ]);
      setStats({ ...INITIAL_STATS, ...(unwrap(statsResponse, {}) || {}) });
      setPendingRequests(Number(bookingResponse?.data?.meta?.total) || 0);
    } catch {
      setStats(INITIAL_STATS);
      setPendingRequests(0);
    }
  }, []);

  const loadLessons = useCallback(async () => {
    if (activeTab === "requests") return;
    setLoading(true);
    try {
      const today = todayKey();
      const params = {
        page,
        limit,
        search: debouncedSearch,
        sortOrder,
      };
      if (activeTab === "today") {
        params.dateFrom = today;
        params.dateTo = today;
      } else if (activeTab === "upcoming") {
        params.status = "scheduled";
        params.dateFrom = today;
      } else {
        params.view = "history";
      }
      const response = await getLessons(params);
      const data = unwrap(response, []);
      setLessons(Array.isArray(data) ? data : []);
      setMeta({ ...INITIAL_META, ...(response?.data?.meta || {}) });
    } catch (error) {
      setLessons([]);
      setNotice({
        type: "error",
        text: getErrorMessage(error, "Lessons could not be loaded."),
      });
    } finally {
      setLoading(false);
    }
  }, [activeTab, debouncedSearch, limit, page, sortOrder]);

  useEffect(() => {
    const requestedTab = new URLSearchParams(window.location.search).get("tab");
    if (TABS.some((tab) => tab.key === requestedTab)) setActiveTab(requestedTab);
    const lessonId = new URLSearchParams(window.location.search).get("lessonId");
    if (lessonId) {
      getLesson(lessonId)
        .then((response) => setSelectedLesson(unwrap(response, null)))
        .catch(() => {});
    }
    loadSummary();
  }, [loadSummary]);

  useEffect(() => {
    loadLessons();
  }, [loadLessons]);

  useEffect(() => {
    setPage(1);
  }, [activeTab, debouncedSearch, limit, sortOrder]);

  const runAction = async (lesson, action, successMessage) => {
    setBusyId(lesson._id);
    setMenuId("");
    setNotice(null);
    try {
      await action();
      setNotice({ type: "success", text: successMessage });
      setSelectedLesson(null);
      await Promise.all([loadLessons(), loadSummary()]);
    } catch (error) {
      setNotice({
        type: "error",
        text: getErrorMessage(error, "Action could not be completed."),
      });
    } finally {
      setBusyId("");
    }
  };

  const primaryAction = (lesson) => {
    const busy = busyId === lesson._id;
    if (lesson.status === "scheduled") {
      return (
        <button
          type="button"
          disabled={busy}
          onClick={() =>
            runAction(lesson, () => startLesson(lesson._id), "Lesson started.")
          }
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
        >
          <FaPlay /> Start
        </button>
      );
    }
    if (lesson.status === "in_progress" && !teacherPresent(lesson)) {
      return (
        <button
          type="button"
          disabled={busy}
          onClick={() =>
            runAction(
              lesson,
              () => confirmAttendance(lesson._id, { status: "present" }),
              "Attendance confirmed.",
            )
          }
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
        >
          <FaCheck /> Attendance
        </button>
      );
    }
    if (lesson.status === "in_progress") {
      return (
        <button
          type="button"
          onClick={() => openReport(lesson)}
          className="rounded-lg bg-violet-600 px-3 py-2 text-xs font-bold text-white"
        >
          Complete
        </button>
      );
    }
    return (
      <button
        type="button"
        onClick={() => setSelectedLesson(lesson)}
        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white"
      >
        <FaEye /> View
      </button>
    );
  };

  const openReport = (lesson) => {
    setReportLesson(lesson);
    setReport({
      skillsCovered: lesson.lessonProgress?.skillsCovered || [],
      teacherNotes: lesson.lessonProgress?.teacherNotes || "",
      performance: lesson.lessonProgress?.performance || "satisfactory",
      areasToImprove: lesson.lessonProgress?.areasToImprove?.join("\n") || "",
      nextLessonRecommendation:
        lesson.lessonProgress?.nextLessonRecommendation || "",
    });
  };

  const submitReport = async (event) => {
    event.preventDefault();
    if (!report.skillsCovered.length || !report.teacherNotes.trim()) {
      setNotice({
        type: "error",
        text: "Teacher notes and at least one skill are required.",
      });
      return;
    }
    await runAction(
      reportLesson,
      () =>
        completeLesson(reportLesson._id, {
          lessonProgress: {
            ...report,
            areasToImprove: report.areasToImprove
              .split(/\n|,/)
              .map((item) => item.trim())
              .filter(Boolean),
          },
        }),
      "Report submitted. Waiting for student confirmation.",
    );
    setReportLesson(null);
    setReport(EMPTY_REPORT);
  };

  const noShow = (lesson) => {
    const reason = window.prompt("Reason for student no-show:", "Student did not attend.");
    if (!reason?.trim()) return;
    runAction(
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
      <div className="mx-auto max-w-7xl space-y-5">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Teacher workspace
            </p>
            <h1 className="mt-1 text-3xl font-black text-slate-900">Lessons</h1>
            <p className="mt-1 text-sm text-slate-500">
              Today’s schedule and actions, without the clutter.
            </p>
          </div>
          <Link
            href="/teacher/calendar"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white"
          >
            <FaCalendarAlt /> Open calendar
          </Link>
        </header>

        {notice?.text && (
          <div
            className={`flex justify-between rounded-xl border px-4 py-3 text-sm font-semibold ${
              notice.type === "error"
                ? "border-rose-200 bg-rose-50 text-rose-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {notice.text}
            <button type="button" onClick={() => setNotice(null)}>
              <FaTimes />
            </button>
          </div>
        )}

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Pending requests", pendingRequests, "bg-amber-50 text-amber-800"],
            [
              "Action required",
              stats.in_progress + stats.awaiting_confirmation,
              "bg-violet-50 text-violet-800",
            ],
            ["Upcoming", stats.scheduled, "bg-blue-50 text-blue-800"],
            ["Completed", stats.completed, "bg-emerald-50 text-emerald-800"],
          ].map(([label, value, color]) => (
            <article key={label} className={`rounded-2xl border border-slate-200 p-4 ${color}`}>
              <p className="text-xs font-bold uppercase tracking-wider">{label}</p>
              <p className="mt-2 text-3xl font-black">{value}</p>
            </article>
          ))}
        </section>

        <nav className="flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2">
          {TABS.map((tab) => (
            <button
              type="button"
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setPage(1);
                window.history.replaceState(null, "", `/teacher/lessons?tab=${tab.key}`);
              }}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-bold ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
              {tab.key === "requests" && pendingRequests > 0
                ? ` (${pendingRequests})`
                : ""}
            </button>
          ))}
        </nav>

        {activeTab === "requests" ? (
          <BookingWorkspace role="teacher" onLessonCreated={loadSummary} />
        ) : (
          <>
            <section className="rounded-2xl border border-slate-200 bg-white p-3">
              <div className="flex gap-2">
                <label className="relative min-w-0 flex-1">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search student name, email or phone"
                    className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-3 text-sm"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setShowFilters((current) => !current)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700"
                >
                  <FaFilter /> Filter
                </button>
              </div>
              {showFilters && (
                <div className="mt-3 flex justify-end border-t border-slate-100 pt-3">
                  <select
                    value={sortOrder}
                    onChange={(event) => setSortOrder(event.target.value)}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                  >
                    <option value="asc">Earliest first</option>
                    <option value="desc">Latest first</option>
                  </select>
                </div>
              )}
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[780px] text-left text-sm">
                  <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Time</th>
                      <th className="px-4 py-3">Student</th>
                      <th className="px-4 py-3">Location</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      <tr><td colSpan={5} className="py-14 text-center text-slate-500">Loading lessons...</td></tr>
                    ) : lessons.length === 0 ? (
                      <tr><td colSpan={5} className="py-14 text-center text-slate-500">No lesson found in this view.</td></tr>
                    ) : (
                      lessons.map((lesson) => (
                        <tr key={lesson._id} className="hover:bg-slate-50">
                          <td className="px-4 py-4">
                            <p className="font-bold text-slate-900">{lesson.startTime}–{lesson.endTime}</p>
                            <p className="mt-1 text-xs text-slate-500">{formatLessonDate(lesson.lessonDate)}</p>
                          </td>
                          <td className="px-4 py-4">
                            <p className="font-bold text-slate-900">{lesson.student?.name || "Student"}</p>
                            <p className="mt-1 text-xs text-slate-500">{lesson.student?.email || lesson.student?.phone || ""}</p>
                          </td>
                          <td className="max-w-64 px-4 py-4">
                            <p className="truncate font-semibold text-slate-700">{getLessonLocation(lesson)}</p>
                            <p className="mt-1 text-xs text-slate-500">{getVehicleType(lesson)}</p>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(lesson.status)}`}>
                              {statusLabel(lesson.status)}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="relative flex justify-end gap-2">
                              {primaryAction(lesson)}
                              <button
                                type="button"
                                onClick={() => setMenuId(menuId === lesson._id ? "" : lesson._id)}
                                className="rounded-lg border border-slate-300 p-2.5 text-slate-600"
                              >
                                <FaEllipsisV />
                              </button>
                              {menuId === lesson._id && (
                                <div className="absolute right-0 top-11 z-20 w-40 rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
                                  <button type="button" onClick={() => { setSelectedLesson(lesson); setMenuId(""); }} className="w-full rounded-lg px-3 py-2 text-left text-xs font-bold text-slate-700 hover:bg-slate-100">View details</button>
                                  {["scheduled", "in_progress"].includes(lesson.status) && (
                                    <button type="button" onClick={() => noShow(lesson)} className="w-full rounded-lg px-3 py-2 text-left text-xs font-bold text-rose-700 hover:bg-rose-50">Mark no-show</button>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
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
                onLimitChange={(value) => { setLimit(value); setPage(1); }}
              />
            </section>
          </>
        )}
      </div>

      {selectedLesson && (
        <DetailsModal lesson={selectedLesson} onClose={() => setSelectedLesson(null)} />
      )}
      {reportLesson && (
        <ReportModal
          lesson={reportLesson}
          report={report}
          setReport={setReport}
          busy={busyId === reportLesson._id}
          onClose={() => setReportLesson(null)}
          onSubmit={submitReport}
        />
      )}
    </main>
  );
}

function DetailsModal({ lesson, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex justify-between gap-4">
          <div>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(lesson.status)}`}>{statusLabel(lesson.status)}</span>
            <h2 className="mt-3 text-2xl font-black text-slate-900">{lesson.student?.name || "Student"}</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl bg-slate-100 p-3 text-slate-600"><FaTimes /></button>
        </div>
        <div className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
          <p><strong className="block text-slate-900">Date & time</strong>{formatLessonDate(lesson.lessonDate)} · {lesson.startTime}–{lesson.endTime}</p>
          <p><strong className="block text-slate-900">Location</strong>{getLessonLocation(lesson)}</p>
          <p><strong className="block text-slate-900">Vehicle</strong>{getVehicleType(lesson)}</p>
          <p><strong className="block text-slate-900">Attendance</strong>Teacher: {lesson.attendance?.teacherStatus || "pending"} · Student: {lesson.attendance?.studentStatus || "pending"}</p>
          {lesson.lessonProgress?.teacherNotes && <p><strong className="block text-slate-900">Report</strong>{lesson.lessonProgress.teacherNotes}</p>}
        </div>
      </div>
    </div>
  );
}

function ReportModal({ lesson, report, setReport, busy, onClose, onSubmit }) {
  const toggleSkill = (skill) =>
    setReport((current) => ({
      ...current,
      skillsCovered: current.skillsCovered.includes(skill)
        ? current.skillsCovered.filter((item) => item !== skill)
        : [...current.skillsCovered, skill],
    }));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <form onSubmit={onSubmit} className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex justify-between gap-4">
          <div><p className="text-xs font-bold uppercase text-violet-600">Complete lesson</p><h2 className="text-2xl font-black text-slate-900">{lesson.student?.name || "Student"} report</h2></div>
          <button type="button" onClick={onClose} className="rounded-xl bg-slate-100 p-3 text-slate-600"><FaTimes /></button>
        </div>
        <div className="mt-5">
          <p className="mb-2 text-sm font-bold text-slate-700">Skills covered</p>
          <div className="flex flex-wrap gap-2">
            {DRIVING_SKILLS.map((skill) => (
              <button key={skill} type="button" onClick={() => toggleSkill(skill)} className={`rounded-full px-3 py-1.5 text-xs font-bold ${report.skillsCovered.includes(skill) ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>{skill}</button>
            ))}
          </div>
        </div>
        <label className="mt-5 block text-sm font-bold text-slate-700">Teacher notes<textarea required value={report.teacherNotes} onChange={(event) => setReport((current) => ({ ...current, teacherNotes: event.target.value }))} className="mt-2 min-h-28 w-full rounded-xl border border-slate-300 p-3 font-normal" /></label>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-bold text-slate-700">Performance<select value={report.performance} onChange={(event) => setReport((current) => ({ ...current, performance: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal"><option value="needs_improvement">Needs improvement</option><option value="satisfactory">Satisfactory</option><option value="good">Good</option><option value="excellent">Excellent</option></select></label>
          <label className="text-sm font-bold text-slate-700">Areas to improve<textarea value={report.areasToImprove} onChange={(event) => setReport((current) => ({ ...current, areasToImprove: event.target.value }))} className="mt-2 min-h-24 w-full rounded-xl border border-slate-300 p-3 font-normal" /></label>
        </div>
        <label className="mt-4 block text-sm font-bold text-slate-700">Next lesson recommendation<input value={report.nextLessonRecommendation} onChange={(event) => setReport((current) => ({ ...current, nextLessonRecommendation: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal" /></label>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-300 px-5 py-2.5 font-bold text-slate-700">Cancel</button>
          <button type="submit" disabled={busy} className="rounded-xl bg-violet-600 px-5 py-2.5 font-bold text-white disabled:opacity-50">{busy ? "Submitting..." : "Submit report"}</button>
        </div>
      </form>
    </div>
  );
}
