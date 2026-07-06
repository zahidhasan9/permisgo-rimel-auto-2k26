"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getAdminQuizAttempts } from "@/features/API";

const formatDateTime = (value) => {
  if (!value) return "—";

  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatType = (type = "") =>
  type
    .split("_")
    .filter(Boolean)
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");

const getResultLabel = (attempt) => {
  if (attempt.status !== "completed") return "In Progress";
  return attempt.passed ? "Passed" : "Failed";
};

export default function AdminQuizAttemptsPage() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [resultFilter, setResultFilter] = useState("all");

  const loadAttempts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getAdminQuizAttempts();
      setAttempts(res.data?.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load quiz attempts",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttempts();
  }, []);

  const filteredAttempts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return attempts.filter((attempt) => {
      const studentName = attempt.student?.name?.toLowerCase() || "";
      const studentEmail = attempt.student?.email?.toLowerCase() || "";
      const quizTitle = attempt.quiz?.title?.toLowerCase() || "";
      const quizType = attempt.quiz?.type?.toLowerCase() || "";

      const matchesSearch =
        !keyword ||
        studentName.includes(keyword) ||
        studentEmail.includes(keyword) ||
        quizTitle.includes(keyword) ||
        quizType.includes(keyword);

      const matchesStatus =
        statusFilter === "all" || attempt.status === statusFilter;

      let matchesResult = true;

      if (resultFilter === "passed") {
        matchesResult = attempt.status === "completed" && attempt.passed;
      }

      if (resultFilter === "failed") {
        matchesResult = attempt.status === "completed" && !attempt.passed;
      }

      if (resultFilter === "in_progress") {
        matchesResult = attempt.status !== "completed";
      }

      return matchesSearch && matchesStatus && matchesResult;
    });
  }, [attempts, search, statusFilter, resultFilter]);

  const stats = useMemo(() => {
    const total = attempts.length;
    const completed = attempts.filter(
      (attempt) => attempt.status === "completed",
    ).length;
    const passed = attempts.filter(
      (attempt) => attempt.status === "completed" && attempt.passed,
    ).length;
    const failed = attempts.filter(
      (attempt) => attempt.status === "completed" && !attempt.passed,
    ).length;

    const completedAttempts = attempts.filter(
      (attempt) => attempt.status === "completed",
    );

    const averagePercentage =
      completedAttempts.length > 0
        ? Math.round(
            completedAttempts.reduce(
              (sum, attempt) => sum + Number(attempt.percentage || 0),
              0,
            ) / completedAttempts.length,
          )
        : 0;

    return {
      total,
      completed,
      passed,
      failed,
      averagePercentage,
    };
  }, [attempts]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Quiz Attempts</h1>
            <p className="mt-2 text-slate-500">
              See students quiz attempts, scores, pass/fail result and review
              answers.
            </p>
          </div>

          <button
            onClick={loadAttempts}
            className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Refresh
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Attempts</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-800">
              {stats.total}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Completed</p>
            <h2 className="mt-3 text-3xl font-bold text-blue-700">
              {stats.completed}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Passed</p>
            <h2 className="mt-3 text-3xl font-bold text-green-700">
              {stats.passed}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Failed</p>
            <h2 className="mt-3 text-3xl font-bold text-red-700">
              {stats.failed}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Avg Score</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-800">
              {stats.averagePercentage}%
            </h2>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">
                Search
              </label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search student, email, quiz..."
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="all">All Status</option>
                <option value="started">Started</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">
                Result
              </label>
              <select
                value={resultFilter}
                onChange={(e) => setResultFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="all">All Results</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
                <option value="in_progress">In Progress</option>
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-lg font-bold text-slate-800">
              All Quiz Attempts
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Showing {filteredAttempts.length} attempts
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    Student
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    Quiz
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    Score
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    Correct
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    Wrong
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    Result
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    Status
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    Date
                  </th>
                  <th className="px-5 py-4 text-right text-sm font-semibold text-slate-600">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-5 py-10 text-center text-slate-500"
                    >
                      Loading attempts...
                    </td>
                  </tr>
                ) : filteredAttempts.length ? (
                  filteredAttempts.map((attempt) => (
                    <tr key={attempt._id} className="hover:bg-slate-50">
                      <td className="px-5 py-4">
                        <h3 className="font-semibold text-slate-800">
                          {attempt.student?.name || "Unknown Student"}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          {attempt.student?.email || "No email"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <h3 className="font-semibold text-slate-800">
                          {attempt.quiz?.title || "Deleted Quiz"}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          {formatType(attempt.quiz?.type)}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-bold text-slate-800">
                          {attempt.percentage || 0}%
                        </span>
                        <p className="mt-1 text-xs text-slate-500">
                          {attempt.score || 0} score
                        </p>
                      </td>

                      <td className="px-5 py-4 font-semibold text-green-700">
                        {attempt.correctCount || 0}
                      </td>

                      <td className="px-5 py-4 font-semibold text-red-700">
                        {attempt.wrongCount || 0}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            attempt.status !== "completed"
                              ? "bg-amber-100 text-amber-700"
                              : attempt.passed
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {getResultLabel(attempt)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {attempt.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {formatDateTime(attempt.createdAt)}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/admin/quizzes/quiz-attempts/${attempt._id}`}
                          className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-5 py-10 text-center text-slate-500"
                    >
                      No attempts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
