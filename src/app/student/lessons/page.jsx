"use client";

import { useEffect, useMemo, useState } from "react";
import {
  confirmAttendance,
  confirmLessonCompletion,
  getLessons,
  requestLessonCancellation,
  requestLessonReschedule,
  submitLessonFeedback,
} from "@/features/API";
import {
  formatLessonDate,
  getErrorMessage,
  getLessonLocation,
  getVehicleType,
  statusClass,
  statusLabel,
  unwrap,
} from "../../../features/lessonHelpers";

const FILTERS = [
  { key: "upcoming", label: "Upcoming" },
  { key: "active", label: "In progress" },
  { key: "awaiting", label: "Awaiting confirmation" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled / No-show" },
  { key: "all", label: "All lessons" },
];

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

const now = () => new Date();

export default function StudentLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [filter, setFilter] = useState("upcoming");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [feedbackLesson, setFeedbackLesson] = useState(null);
  const [feedback, setFeedback] = useState({ rating: 5, studentNotes: "" });

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

  const stats = useMemo(
    () => ({
      total: lessons.length,
      scheduled: lessons.filter((lesson) => lesson.status === "scheduled")
        .length,
      completed: lessons.filter((lesson) => lesson.status === "completed")
        .length,
      awaiting: lessons.filter(
        (lesson) => lesson.status === "awaiting_confirmation",
      ).length,
    }),
    [lessons],
  );

  const nextLesson = useMemo(
    () =>
      lessons
        .filter(
          (lesson) =>
            ["scheduled", "in_progress"].includes(lesson.status) &&
            new Date(lesson.lessonDate).setHours(23, 59, 59, 999) >=
              now().getTime(),
        )
        .sort((a, b) => new Date(a.lessonDate) - new Date(b.lessonDate))[0] ||
      null,
    [lessons],
  );

  const filteredLessons = useMemo(() => {
    const needle = search.trim().toLowerCase();

    return lessons
      .filter((lesson) => {
        if (filter === "upcoming") return lesson.status === "scheduled";
        if (filter === "active") return lesson.status === "in_progress";
        if (filter === "awaiting")
          return lesson.status === "awaiting_confirmation";
        if (filter === "completed") return lesson.status === "completed";
        if (filter === "cancelled")
          return ["cancelled", "no_show"].includes(lesson.status);
        return true;
      })
      .filter((lesson) => {
        if (!needle) return true;
        const teacher = personName(lesson.teacher, "").toLowerCase();
        const location = getLessonLocation(lesson).toLowerCase();
        const vehicle = getVehicleType(lesson).toLowerCase();
        return (
          teacher.includes(needle) ||
          location.includes(needle) ||
          vehicle.includes(needle)
        );
      })
      .sort((a, b) => new Date(a.lessonDate) - new Date(b.lessonDate));
  }, [filter, lessons, search]);

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

  const handleAttendance = (lesson) => {
    runAction(
      lesson._id,
      () => confirmAttendance(lesson._id, { status: "present" }),
      "Your attendance has been confirmed.",
    );
  };

  const handleCompletionConfirmation = (lesson) => {
    if (
      !window.confirm(
        "Confirm that this lesson took place and the teacher's report is correct?",
      )
    )
      return;
    runAction(
      lesson._id,
      () => confirmLessonCompletion(lesson._id),
      "Lesson completion confirmed successfully.",
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

  const openFeedback = (lesson) => {
    setFeedbackLesson(lesson);
    setFeedback({
      rating: lesson.lessonProgress?.rating || 5,
      studentNotes: lesson.lessonProgress?.studentNotes || "",
    });
    setError("");
    setMessage("");
  };

  const handleFeedbackSubmit = async (event) => {
    event.preventDefault();
    if (!feedbackLesson) return;
    const updated = await runAction(
      feedbackLesson._id,
      () =>
        submitLessonFeedback(feedbackLesson._id, {
          rating: Number(feedback.rating),
          studentNotes: feedback.studentNotes.trim(),
        }),
      "Thank you. Your feedback has been saved.",
    );

    if (updated) setFeedbackLesson(null);
  };

  const LessonDetails = ({ lesson }) => (
    <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-4">
      <p>
        <span className="font-semibold text-slate-800">Date:</span>{" "}
        {formatLessonDate(lesson.lessonDate)}
      </p>
      <p>
        <span className="font-semibold text-slate-800">Time:</span>{" "}
        {lesson.startTime}–{lesson.endTime}
      </p>
      <p>
        <span className="font-semibold text-slate-800">Vehicle:</span>{" "}
        {getVehicleType(lesson)}
      </p>
      <p>
        <span className="font-semibold text-slate-800">Location:</span>{" "}
        {getLessonLocation(lesson)}
      </p>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
              Student dashboard
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              My driving lessons
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              View schedules, confirm attendance, read progress reports and rate
              completed lessons.
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

        {nextLesson && (
          <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-white shadow-lg">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
                  Next lesson
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                  {formatLessonDate(nextLesson.lessonDate)}
                </h2>
                <p className="mt-2 text-lg text-slate-200">
                  {nextLesson.startTime}–{nextLesson.endTime}
                </p>
                <p className="mt-3 text-sm text-slate-300">
                  Teacher:{" "}
                  <strong className="text-white">
                    {personName(nextLesson.teacher, "Teacher")}
                  </strong>
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-5 text-sm backdrop-blur-sm lg:min-w-80">
                <p>
                  <span className="font-semibold">Vehicle:</span>{" "}
                  {getVehicleType(nextLesson)}
                </p>
                <p className="mt-2">
                  <span className="font-semibold">Location:</span>{" "}
                  {getLessonLocation(nextLesson)}
                </p>
                <span
                  className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusClass(nextLesson.status)}`}
                >
                  {statusLabel(nextLesson.status)}
                </span>
              </div>
            </div>
          </section>
        )}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Total lessons", stats.total],
            ["Scheduled", stats.scheduled],
            ["Awaiting confirmation", stats.awaiting],
            ["Completed", stats.completed],
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
              placeholder="Search teacher, vehicle or location"
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
                  There are no lessons in this section yet.
                </p>
              </div>
            ) : (
              filteredLessons.map((lesson) => {
                const isBusy = busyId === lesson._id;
                const studentAttendance =
                  lesson.attendance?.studentStatus ||
                  (lesson.attendance?.studentConfirmed ? "present" : "pending");
                const feedbackAdded = Boolean(lesson.lessonProgress?.rating);

                return (
                  <article
                    key={lesson._id}
                    className="rounded-2xl border border-slate-200 p-5"
                  >
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl font-bold text-slate-900">
                            {personName(lesson.teacher, "Driving teacher")}
                          </h2>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(lesson.status)}`}
                          >
                            {statusLabel(lesson.status)}
                          </span>
                        </div>

                        <LessonDetails lesson={lesson} />

                        <div className="mt-4 flex flex-wrap gap-2 text-xs">
                          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700">
                            Your attendance:{" "}
                            <strong>{studentAttendance}</strong>
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
                          {feedbackAdded && (
                            <span className="rounded-full bg-yellow-100 px-3 py-1.5 font-semibold text-yellow-700">
                              Your rating: {lesson.lessonProgress.rating}/5
                            </span>
                          )}
                        </div>

                        {lesson.lessonProgress?.teacherNotes && (
                          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                            <p className="font-semibold text-slate-900">
                              Teacher&apos;s progress report
                            </p>
                            <p className="mt-2 whitespace-pre-wrap">
                              {lesson.lessonProgress.teacherNotes}
                            </p>
                            {!!lesson.lessonProgress.skillsCovered?.length && (
                              <p className="mt-3 text-xs text-slate-500">
                                <strong>Skills covered:</strong>{" "}
                                {lesson.lessonProgress.skillsCovered.join(", ")}
                              </p>
                            )}
                            {lesson.lessonProgress.areasToImprove && (
                              <p className="mt-2 text-xs text-slate-500">
                                <strong>Areas to improve:</strong>{" "}
                                {Array.isArray(
                                  lesson.lessonProgress.areasToImprove,
                                )
                                  ? lesson.lessonProgress.areasToImprove.join(
                                      ", ",
                                    )
                                  : lesson.lessonProgress.areasToImprove}
                              </p>
                            )}
                            {lesson.lessonProgress.nextLessonRecommendation && (
                              <p className="mt-2 text-xs text-slate-500">
                                <strong>Next lesson:</strong>{" "}
                                {lesson.lessonProgress.nextLessonRecommendation}
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

                        {["in_progress", "awaiting_confirmation"].includes(
                          lesson.status,
                        ) &&
                          !lesson.attendance?.studentConfirmed && (
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => handleAttendance(lesson)}
                              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                              Confirm attendance
                            </button>
                          )}

                        {lesson.status === "awaiting_confirmation" && (
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => handleCompletionConfirmation(lesson)}
                            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                          >
                            Confirm completion
                          </button>
                        )}

                        {["awaiting_confirmation", "completed"].includes(
                          lesson.status,
                        ) && (
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => openFeedback(lesson)}
                            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                          >
                            {feedbackAdded ? "Update feedback" : "Rate lesson"}
                          </button>
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

      {feedbackLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <form
            onSubmit={handleFeedbackSubmit}
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
                  Lesson feedback
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  {personName(feedbackLesson.teacher, "Driving teacher")}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setFeedbackLesson(null)}
                className="rounded-lg px-3 py-1 text-xl text-slate-500 hover:bg-slate-100"
              >
                ×
              </button>
            </div>

            <label className="mt-6 block text-sm font-semibold text-slate-700">
              Rating
              <select
                value={feedback.rating}
                onChange={(event) =>
                  setFeedback((current) => ({
                    ...current,
                    rating: Number(event.target.value),
                  }))
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-orange-500"
              >
                <option value={5}>5 — Excellent</option>
                <option value={4}>4 — Very good</option>
                <option value={3}>3 — Good</option>
                <option value={2}>2 — Fair</option>
                <option value={1}>1 — Poor</option>
              </select>
            </label>

            <label className="mt-4 block text-sm font-semibold text-slate-700">
              Your comments
              <textarea
                value={feedback.studentNotes}
                onChange={(event) =>
                  setFeedback((current) => ({
                    ...current,
                    studentNotes: event.target.value,
                  }))
                }
                rows={5}
                placeholder="Tell us about the lesson and your teacher."
                className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-orange-500"
              />
            </label>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setFeedbackLesson(null)}
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={busyId === feedbackLesson._id}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
              >
                {busyId === feedbackLesson._id ? "Saving..." : "Save feedback"}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
