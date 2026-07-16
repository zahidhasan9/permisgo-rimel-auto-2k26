"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  confirmAttendance,
  confirmLessonCompletion,
  getLesson,
  requestLessonCancellation,
  requestLessonReschedule,
  submitLessonFeedback,
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

const emptyReschedule = {
  lessonDate: "",
  startTime: "",
  endTime: "",
  reason: "",
};

const emptyFeedback = {
  rating: 5,
  studentNotes: "",
};

const getPersonName = (person, fallback) =>
  person?.name || person?.fullName || person?.email || fallback;

const getLessonId = (lesson) => lesson?._id || lesson?.id || "";

const isStudentPresent = (lesson) =>
  lesson?.attendance?.studentStatus === "present" ||
  lesson?.attendance?.studentConfirmed === true;

const teacherReportSubmitted = (lesson) =>
  Boolean(
    lesson?.lessonProgress?.teacherSubmittedAt ||
    lesson?.lessonProgress?.teacherNotes ||
    lesson?.lessonProgress?.skillsCovered?.length,
  );

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

const historyLabel = (value) =>
  ({
    lesson_scheduled: "Lesson scheduled",
    lesson_updated: "Lesson updated",
    lesson_started: "Lesson started",
    attendance_recorded: "Attendance recorded",
    teacher_report_submitted: "Teacher report submitted",
    lesson_completion_confirmed: "Completion confirmed",
    student_feedback_submitted: "Feedback submitted",
    reschedule_requested: "Reschedule requested",
    reschedule_approved: "Reschedule approved",
    reschedule_rejected: "Reschedule rejected",
    cancellation_requested: "Cancellation requested",
    cancellation_approved: "Cancellation approved",
    cancellation_rejected: "Cancellation rejected",
    lesson_cancelled: "Lesson cancelled",
    no_show_recorded: "No-show recorded",
  })[value] || String(value || "Activity").replaceAll("_", " ");

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

function DetailItem({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
        {value || "Not set"}
      </p>
    </div>
  );
}

function ProgressSteps({ status }) {
  const steps = [
    { key: "scheduled", label: "Scheduled" },
    { key: "in_progress", label: "Lesson started" },
    { key: "awaiting_confirmation", label: "Report submitted" },
    { key: "completed", label: "Completed" },
  ];

  const currentIndex = steps.findIndex((step) => step.key === status);
  const terminal = ["cancelled", "no_show"].includes(status);

  return (
    <div className="grid gap-2 sm:grid-cols-4">
      {steps.map((step, index) => {
        const active = !terminal && currentIndex >= index;
        return (
          <div
            key={step.key}
            className={`rounded-xl border p-3 text-center text-xs font-bold ${
              active
                ? "border-blue-300 bg-blue-50 text-blue-700"
                : "border-slate-200 bg-white text-slate-400"
            }`}
          >
            <span
              className={`mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full ${
                active
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              {index + 1}
            </span>
            {step.label}
          </div>
        );
      })}
    </div>
  );
}

export default function StudentLessonDetailsPage() {
  const params = useParams();
  const lessonId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null);

  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduleForm, setRescheduleForm] = useState(emptyReschedule);

  const [showCancellation, setShowCancellation] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");

  const [showCompletion, setShowCompletion] = useState(false);

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState(emptyFeedback);

  const loadLesson = useCallback(async () => {
    if (!lessonId) return;

    setLoading(true);
    try {
      const response = await getLesson(lessonId);
      setLesson(unwrap(response));
      setNotice(null);
    } catch (error) {
      setNotice({
        type: "error",
        text: getErrorMessage(error, "Could not load this lesson."),
      });
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    loadLesson();
  }, [loadLesson]);

  const runAction = async ({ action, successMessage, close }) => {
    setBusy(true);
    setNotice(null);

    try {
      const response = await action();
      const updatedLesson = unwrap(response);
      if (updatedLesson) setLesson(updatedLesson);

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
      setBusy(false);
    }
  };

  const openReschedule = () => {
    if (!lesson) return;

    setRescheduleForm({
      lessonDate: toDateInput(lesson.lessonDate),
      startTime: lesson.startTime || "",
      endTime: lesson.endTime || "",
      reason: "",
    });
    setShowReschedule(true);
  };

  const submitReschedule = (event) => {
    event.preventDefault();

    runAction({
      action: () =>
        requestLessonReschedule(lessonId, {
          lessonDate: rescheduleForm.lessonDate,
          startTime: rescheduleForm.startTime,
          endTime: rescheduleForm.endTime,
          reason: rescheduleForm.reason.trim(),
        }),
      successMessage: "Your reschedule request was submitted.",
      close: () => setShowReschedule(false),
    });
  };

  const submitCancellation = (event) => {
    event.preventDefault();

    runAction({
      action: () =>
        requestLessonCancellation(lessonId, {
          reason: cancellationReason.trim(),
        }),
      successMessage: "Your cancellation request was submitted.",
      close: () => setShowCancellation(false),
    });
  };

  const confirmMyAttendance = () => {
    runAction({
      action: () =>
        confirmAttendance(lessonId, {
          status: "present",
        }),
      successMessage: "Your attendance was confirmed.",
    });
  };

  const confirmCompletion = () => {
    runAction({
      action: () => confirmLessonCompletion(lessonId),
      successMessage: "Lesson completion was confirmed.",
      close: () => setShowCompletion(false),
    });
  };

  const submitFeedback = (event) => {
    event.preventDefault();

    runAction({
      action: () =>
        submitLessonFeedback(lessonId, {
          rating: Number(feedbackForm.rating),
          studentNotes: feedbackForm.studentNotes.trim(),
        }),
      successMessage: "Your feedback was saved.",
      close: () => setShowFeedback(false),
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-600">
          Loading lesson details...
        </div>
      </main>
    );
  }

  if (!lesson) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-rose-200 bg-white p-10 text-center">
          <h1 className="text-xl font-bold text-slate-900">
            Lesson not available
          </h1>
          <p className="mt-2 text-sm text-rose-600">
            {notice?.text || "The requested lesson could not be found."}
          </p>
          <Link
            href="/student/lessons"
            className="mt-5 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Back to lessons
          </Link>
        </div>
      </main>
    );
  }

  const studentPresent = isStudentPresent(lesson);
  const reportSubmitted = teacherReportSubmitted(lesson);
  const reschedulePending = lesson.rescheduleRequest?.status === "pending";
  const cancellationPending = lesson.cancellationRequest?.status === "pending";
  const feedbackSubmitted = Boolean(lesson.lessonProgress?.feedbackSubmittedAt);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/student/lessons"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            ← Back to lessons
          </Link>

          <button
            type="button"
            onClick={loadLesson}
            disabled={loading || busy}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
          >
            Refresh
          </button>
        </div>

        {notice?.text && (
          <div
            className={`mb-5 flex justify-between gap-4 rounded-xl border px-4 py-3 text-sm ${
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

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-6 md:flex-row">
            <div>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusClass(
                  lesson.status,
                )}`}
              >
                {statusLabel(lesson.status)}
              </span>
              <h1 className="mt-3 text-3xl font-bold text-slate-900">
                {lesson.booking?.offer?.title || "Driving lesson"}
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Lesson reference: {getLessonId(lesson)}
              </p>
            </div>

            <div className="text-left md:text-right">
              <p className="text-lg font-bold text-slate-900">
                {formatLessonDate(lesson.lessonDate)}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {lesson.startTime}–{lesson.endTime}
              </p>
            </div>
          </div>

          <div className="p-6">
            <ProgressSteps status={lesson.status} />

            {["cancelled", "no_show"].includes(lesson.status) && (
              <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                This lesson is closed with status:{" "}
                <strong>{statusLabel(lesson.status)}</strong>.
                {lesson.cancellation?.reason && (
                  <span> Reason: {lesson.cancellation.reason}</span>
                )}
              </div>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <DetailItem
                label="Teacher"
                value={getPersonName(lesson.teacher, "Not assigned")}
              />
              <DetailItem
                label="Teacher phone"
                value={lesson.teacher?.phone || "Not available"}
              />
              <DetailItem label="Location" value={getLessonLocation(lesson)} />
              <DetailItem label="Vehicle" value={getVehicleType(lesson)} />
              <DetailItem
                label="Duration"
                value={
                  lesson.duration ? `${lesson.duration} minutes` : "Not set"
                }
              />
              <DetailItem
                label="Student attendance"
                value={
                  lesson.attendance?.studentStatus ||
                  (lesson.attendance?.studentConfirmed ? "present" : "pending")
                }
              />
              <DetailItem
                label="Teacher attendance"
                value={
                  lesson.attendance?.teacherStatus ||
                  (lesson.attendance?.teacherConfirmed ? "present" : "pending")
                }
              />
              <DetailItem
                label="Payment"
                value={lesson.booking?.paymentStatus || "Not available"}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {lesson.status === "in_progress" && !studentPresent && (
                <button
                  type="button"
                  onClick={confirmMyAttendance}
                  disabled={busy}
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {busy ? "Saving..." : "Confirm my attendance"}
                </button>
              )}

              {lesson.status === "awaiting_confirmation" && !studentPresent && (
                <button
                  type="button"
                  onClick={confirmMyAttendance}
                  disabled={busy}
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {busy ? "Saving..." : "Confirm attendance first"}
                </button>
              )}

              {lesson.status === "awaiting_confirmation" && reportSubmitted && (
                <button
                  type="button"
                  onClick={() => setShowCompletion(true)}
                  disabled={busy || !studentPresent}
                  title={
                    studentPresent
                      ? "Confirm completion"
                      : "Confirm attendance before completion"
                  }
                  className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Confirm lesson completion
                </button>
              )}

              {lesson.status === "scheduled" && (
                <>
                  <button
                    type="button"
                    onClick={openReschedule}
                    disabled={busy || reschedulePending || cancellationPending}
                    className="rounded-lg border border-blue-300 bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50 disabled:opacity-50"
                  >
                    {reschedulePending
                      ? "Reschedule pending"
                      : "Request reschedule"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCancellationReason("");
                      setShowCancellation(true);
                    }}
                    disabled={busy || cancellationPending || reschedulePending}
                    className="rounded-lg border border-rose-300 bg-white px-4 py-2.5 text-sm font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-50"
                  >
                    {cancellationPending
                      ? "Cancellation pending"
                      : "Request cancellation"}
                  </button>
                </>
              )}

              {lesson.status === "completed" && (
                <button
                  type="button"
                  onClick={() => {
                    setFeedbackForm({
                      rating: lesson.lessonProgress?.rating || 5,
                      studentNotes: lesson.lessonProgress?.studentNotes || "",
                    });
                    setShowFeedback(true);
                  }}
                  disabled={busy}
                  className="rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-50"
                >
                  {feedbackSubmitted ? "Edit feedback" : "Give feedback"}
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Teacher lesson report
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                This report becomes available after the teacher completes the
                lesson.
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                reportSubmitted
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {reportSubmitted ? "Report submitted" : "Not submitted"}
            </span>
          </div>

          {reportSubmitted ? (
            <div className="mt-5 space-y-5">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  Teacher notes
                </h3>
                <p className="mt-2 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  {lesson.lessonProgress?.teacherNotes ||
                    "No teacher note was added."}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  Skills covered
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {lesson.lessonProgress?.skillsCovered?.length ? (
                    lesson.lessonProgress.skillsCovered.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">
                      No skills recorded.
                    </span>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <DetailItem
                  label="Performance"
                  value={formatPerformance(lesson.lessonProgress?.performance)}
                />
                <DetailItem
                  label="Next lesson recommendation"
                  value={
                    lesson.lessonProgress?.nextLessonRecommendation ||
                    "No recommendation"
                  }
                />
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  Areas to improve
                </h3>
                {lesson.lessonProgress?.areasToImprove?.length ? (
                  <ul className="mt-2 list-inside list-disc rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                    {lesson.lessonProgress.areasToImprove.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">
                    No improvement areas recorded.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
              The teacher has not submitted the lesson report yet.
            </div>
          )}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Schedule requests
            </h2>

            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="font-bold text-slate-800">
                  Reschedule: {requestLabel(lesson.rescheduleRequest?.status)}
                </p>
                {lesson.rescheduleRequest?.requestedDate && (
                  <p className="mt-2 text-sm text-slate-600">
                    {formatLessonDate(lesson.rescheduleRequest.requestedDate)}{" "}
                    {lesson.rescheduleRequest.startTime}–
                    {lesson.rescheduleRequest.endTime}
                  </p>
                )}
                {lesson.rescheduleRequest?.reason && (
                  <p className="mt-1 text-sm text-slate-600">
                    Reason: {lesson.rescheduleRequest.reason}
                  </p>
                )}
                {lesson.rescheduleRequest?.adminNote && (
                  <p className="mt-1 text-sm text-slate-600">
                    Admin note: {lesson.rescheduleRequest.adminNote}
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <p className="font-bold text-slate-800">
                  Cancellation:{" "}
                  {requestLabel(lesson.cancellationRequest?.status)}
                </p>
                {lesson.cancellationRequest?.reason && (
                  <p className="mt-2 text-sm text-slate-600">
                    Reason: {lesson.cancellationRequest.reason}
                  </p>
                )}
                {lesson.cancellationRequest?.adminNote && (
                  <p className="mt-1 text-sm text-slate-600">
                    Admin note: {lesson.cancellationRequest.adminNote}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Student feedback
            </h2>

            {feedbackSubmitted ? (
              <div className="mt-4">
                <p className="text-2xl font-bold text-amber-500">
                  {"★".repeat(lesson.lessonProgress?.rating || 0)}
                  <span className="text-slate-300">
                    {"★".repeat(5 - (lesson.lessonProgress?.rating || 0))}
                  </span>
                </p>
                <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">
                  {lesson.lessonProgress?.studentNotes || "No written comment."}
                </p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">
                Feedback becomes available after lesson completion.
              </p>
            )}
          </div>
        </section>

        {!!lesson.history?.length && (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Lesson activity
            </h2>
            <div className="mt-4 space-y-3">
              {[...lesson.history].reverse().map((item, index) => (
                <div
                  key={`${item.action}-${item.createdAt}-${index}`}
                  className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
                >
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-sm font-semibold capitalize text-slate-800">
                      {historyLabel(item.action)}
                    </p>
                    {item.note && (
                      <p className="mt-1 text-sm text-slate-600">{item.note}</p>
                    )}
                    {item.createdAt && (
                      <p className="mt-1 text-xs text-slate-400">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {showReschedule && (
        <ModalShell
          title="Request lesson reschedule"
          onClose={() => setShowReschedule(false)}
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
                onClick={() => setShowReschedule(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={busy}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {busy ? "Submitting..." : "Submit request"}
              </button>
            </div>
          </form>
        </ModalShell>
      )}

      {showCancellation && (
        <ModalShell
          title="Request lesson cancellation"
          onClose={() => setShowCancellation(false)}
        >
          <form onSubmit={submitCancellation} className="space-y-4">
            <p className="text-sm text-slate-600">
              The lesson will remain scheduled until an admin approves this
              request.
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
                onClick={() => setShowCancellation(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={busy}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {busy ? "Submitting..." : "Submit request"}
              </button>
            </div>
          </form>
        </ModalShell>
      )}

      {showCompletion && (
        <ModalShell
          title="Confirm lesson completion"
          onClose={() => setShowCompletion(false)}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4">
            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-bold">Teacher notes</p>
              <p className="mt-2 whitespace-pre-wrap">
                {lesson.lessonProgress?.teacherNotes ||
                  "No teacher note was provided."}
              </p>
            </div>

            <p className="text-sm text-slate-600">
              Confirming changes this lesson to Completed. Confirm only when the
              lesson took place and the report is correct.
            </p>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCompletion(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"
              >
                Not yet
              </button>
              <button
                type="button"
                onClick={confirmCompletion}
                disabled={busy}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {busy ? "Confirming..." : "Confirm completion"}
              </button>
            </div>
          </div>
        </ModalShell>
      )}

      {showFeedback && (
        <ModalShell
          title="Lesson feedback"
          onClose={() => setShowFeedback(false)}
        >
          <form onSubmit={submitFeedback} className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">
              Rating
              <select
                value={feedbackForm.rating}
                onChange={(event) =>
                  setFeedbackForm((current) => ({
                    ...current,
                    rating: Number(event.target.value),
                  }))
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value={5}>5 — Excellent</option>
                <option value={4}>4 — Very good</option>
                <option value={3}>3 — Good</option>
                <option value={2}>2 — Fair</option>
                <option value={1}>1 — Poor</option>
              </select>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Comments
              <textarea
                rows={5}
                value={feedbackForm.studentNotes}
                onChange={(event) =>
                  setFeedbackForm((current) => ({
                    ...current,
                    studentNotes: event.target.value,
                  }))
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowFeedback(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={busy}
                className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {busy ? "Saving..." : "Save feedback"}
              </button>
            </div>
          </form>
        </ModalShell>
      )}
    </main>
  );
}
