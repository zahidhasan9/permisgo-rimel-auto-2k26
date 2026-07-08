"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaRedoAlt,
  FaSearch,
  FaTimesCircle,
  FaUnlockAlt,
} from "react-icons/fa";
import {
  getAdminQuizAttempts,
  getAdminRetakePermissions,
  grantQuizRetakePermission,
  revokeQuizRetakePermission,
} from "@/features/API";

function getMessage(error, fallback = "Something went wrong.") {
  return error?.response?.data?.message || error?.message || fallback;
}

function getId(value) {
  if (!value) return "";
  return typeof value === "string" ? value : value._id || value.id || "";
}

function StatusBadge({ children, tone = "slate" }) {
  const classes =
    tone === "green"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : tone === "red"
        ? "border-red-200 bg-red-50 text-red-700"
        : tone === "amber"
          ? "border-amber-200 bg-amber-50 text-amber-700"
          : "border-slate-200 bg-slate-50 text-slate-700";

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-black uppercase ${classes}`}
    >
      {children}
    </span>
  );
}

export default function AdminQuizRetakesPage() {
  const [attempts, setAttempts] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [attemptRes, permissionRes] = await Promise.all([
        getAdminQuizAttempts(),
        getAdminRetakePermissions(),
      ]);

      setAttempts(attemptRes.data?.data || []);
      setPermissions(permissionRes.data?.data || []);
    } catch (err) {
      setError(getMessage(err, "Failed to load retake data."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast("");
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

  const activePermissionByKey = useMemo(() => {
    const map = new Map();

    permissions.forEach((permission) => {
      if (permission.status !== "active") return;

      const studentId = getId(permission.student);
      const quizId = getId(permission.quiz);

      if (studentId && quizId) {
        map.set(`${studentId}-${quizId}`, permission);
      }
    });

    return map;
  }, [permissions]);

  const completedAttempts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return attempts
      .filter((attempt) => attempt.status === "completed")
      .filter((attempt) => {
        if (!keyword) return true;

        const studentName = attempt.student?.name || "";
        const studentEmail = attempt.student?.email || "";
        const quizTitle = attempt.quiz?.title || "";

        return `${studentName} ${studentEmail} ${quizTitle}`
          .toLowerCase()
          .includes(keyword);
      });
  }, [attempts, search]);

  // ✅ Same student + same quiz duplicate attempt থাকলে latest one only দেখাবে
  const groupedCompletedAttempts = useMemo(() => {
    const map = new Map();

    completedAttempts.forEach((attempt) => {
      const studentId = getId(attempt.student);
      const quizId = getId(attempt.quiz);

      if (!studentId || !quizId) return;

      const key = `${studentId}-${quizId}`;
      const oldAttempt = map.get(key);

      const oldTime = new Date(
        oldAttempt?.finishedAt || oldAttempt?.createdAt || 0,
      ).getTime();

      const newTime = new Date(
        attempt?.finishedAt || attempt?.createdAt || 0,
      ).getTime();

      if (!oldAttempt || newTime > oldTime) {
        map.set(key, attempt);
      }
    });

    return Array.from(map.values());
  }, [completedAttempts]);

  const activeRetakeCount = useMemo(() => {
    return permissions.filter((permission) => permission.status === "active")
      .length;
  }, [permissions]);

  const handleGrant = async (attempt) => {
    const studentId = getId(attempt.student);
    const quizId = getId(attempt.quiz);

    if (!studentId || !quizId) {
      setError("Student or quiz information missing.");
      return;
    }

    try {
      setActionLoadingId(attempt._id);
      setError("");

      await grantQuizRetakePermission({
        studentId,
        quizId,
        attemptId: attempt._id,
        reason: "Admin allowed retake from quiz retake panel.",
      });

      await loadData();
      setToast("Retake permission enabled.");
    } catch (err) {
      setError(getMessage(err, "Failed to enable retake."));
    } finally {
      setActionLoadingId("");
    }
  };

  const handleRevoke = async (permissionId) => {
    if (!permissionId) return;

    try {
      setActionLoadingId(permissionId);
      setError("");

      await revokeQuizRetakePermission(permissionId);

      await loadData();
      setToast("Retake permission revoked.");
    } catch (err) {
      setError(getMessage(err, "Failed to revoke retake permission."));
    } finally {
      setActionLoadingId("");
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-5 md:px-6">
      <section className="mx-auto max-w-7xl">
        <div className="mb-5 rounded-2xl border border-[#E5EAF2] bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Link
                href="/admin/quizzes"
                className="mb-2 inline-flex items-center gap-2 text-sm font-bold text-[#0D4598] hover:underline"
              >
                <FaArrowLeft />
                Back to Quizzes
              </Link>

              <h1 className="text-2xl font-black text-[#0D4598] md:text-3xl">
                Quiz Retake Control
              </h1>

              <p className="mt-1 text-sm font-medium text-[#6B7280]">
                Student normally cannot retake a completed quiz. Admin can allow
                one retake for a specific student and quiz.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:min-w-[320px]">
              <div className="rounded-xl bg-[#EEF4FB] px-4 py-3">
                <p className="text-[10px] font-black uppercase text-[#6B7280]">
                  Unique Completed
                </p>
                <p className="mt-1 text-2xl font-black text-[#0D4598]">
                  {loading ? "..." : groupedCompletedAttempts.length}
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 px-4 py-3">
                <p className="text-[10px] font-black uppercase text-emerald-700">
                  Active Retakes
                </p>
                <p className="mt-1 text-2xl font-black text-emerald-700">
                  {loading ? "..." : activeRetakeCount}
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-5">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A93A3]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name, email or quiz title..."
              className="h-12 w-full rounded-2xl border border-[#E5EAF2] bg-[#F7F9FC] pl-11 pr-4 text-sm font-bold text-[#111827] outline-none focus:border-[#0D4598] focus:bg-white"
            />
          </div>
        </div>

        {toast && (
          <div className="mb-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
            <FaCheckCircle className="mr-2 inline" />
            {toast}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            <FaTimesCircle className="mr-2 inline" />
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-[#E5EAF2] bg-white shadow-sm">
          <div className="border-b border-[#E5EAF2] px-5 py-4">
            <h2 className="text-lg font-black text-[#111827]">
              Completed Quiz Attempts
            </h2>

            <p className="text-sm font-medium text-[#6B7280]">
              Duplicate old attempts are hidden. Same student and same quiz will
              show only the latest completed attempt.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#F7F9FC] text-xs uppercase text-[#6B7280]">
                <tr>
                  <th className="px-5 py-3 font-black">Student</th>
                  <th className="px-5 py-3 font-black">Quiz</th>
                  <th className="px-5 py-3 font-black">Score</th>
                  <th className="px-5 py-3 font-black">Result</th>
                  <th className="px-5 py-3 font-black">Retake Status</th>
                  <th className="px-5 py-3 text-right font-black">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E5EAF2]">
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-10 text-center font-bold text-[#6B7280]"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : groupedCompletedAttempts.length ? (
                  groupedCompletedAttempts.map((attempt) => {
                    const studentId = getId(attempt.student);
                    const quizId = getId(attempt.quiz);
                    const key = `${studentId}-${quizId}`;
                    const activePermission = activePermissionByKey.get(key);
                    const hasActivePermission = Boolean(activePermission);

                    return (
                      <tr key={attempt._id} className="hover:bg-[#F9FBFE]">
                        <td className="px-5 py-4">
                          <p className="font-black text-[#111827]">
                            {attempt.student?.name || "Unknown Student"}
                          </p>

                          <p className="mt-0.5 text-xs font-medium text-[#6B7280]">
                            {attempt.student?.email || "No email"}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <p className="font-black text-[#111827]">
                            {attempt.quiz?.title || "Unknown Quiz"}
                          </p>

                          <p className="mt-0.5 text-xs font-medium uppercase text-[#6B7280]">
                            {attempt.quiz?.type || "quiz"}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <p className="font-black text-[#0D4598]">
                            {attempt.percentage || 0}%
                          </p>

                          <p className="text-xs font-medium text-[#6B7280]">
                            {attempt.correctCount || 0}/
                            {attempt.totalQuestions || 0} correct
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          {attempt.passed ? (
                            <StatusBadge tone="green">Passed</StatusBadge>
                          ) : (
                            <StatusBadge tone="red">Failed</StatusBadge>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          {hasActivePermission ? (
                            <StatusBadge tone="green">Retake On</StatusBadge>
                          ) : (
                            <StatusBadge tone="slate">Retake Off</StatusBadge>
                          )}
                        </td>

                        <td className="px-5 py-4 text-right">
                          {hasActivePermission ? (
                            <button
                              type="button"
                              onClick={() =>
                                handleRevoke(activePermission?._id)
                              }
                              disabled={
                                actionLoadingId === activePermission?._id
                              }
                              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-black text-red-700 hover:bg-red-100 disabled:opacity-60"
                            >
                              <FaTimesCircle />
                              {actionLoadingId === activePermission?._id
                                ? "Working..."
                                : "Turn Off"}
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleGrant(attempt)}
                              disabled={actionLoadingId === attempt._id}
                              className="inline-flex items-center gap-2 rounded-xl bg-[#0D4598] px-3 py-2 text-xs font-black text-white hover:bg-[#083777] disabled:opacity-60"
                            >
                              <FaUnlockAlt />
                              {actionLoadingId === attempt._id
                                ? "Working..."
                                : "Allow Retake"}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-sm font-bold text-[#6B7280]"
                    >
                      No completed quiz attempt found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm font-bold text-amber-800">
          <FaRedoAlt className="mr-2 inline" />
          Note: One active permission allows only one retake. When student
          starts the retake, permission becomes “used” automatically.
        </div>
      </section>
    </main>
  );
}
