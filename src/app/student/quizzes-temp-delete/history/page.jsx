"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMyQuizAttempts } from "@/features/API";

export default function QuizHistoryPage() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAttempts = async () => {
      try {
        const res = await getMyQuizAttempts();
        setAttempts(res.data?.data || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to load quiz records");
      } finally {
        setLoading(false);
      }
    };
    loadAttempts();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">My Quiz Records</h2>
          <p className="text-muted mb-0">All previous quiz attempts and scores.</p>
        </div>
        <Link href="/student/quizzes" className="btn btn-outline-primary">Take Quiz</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? <div className="alert alert-info">Loading records...</div> : null}

      <div className="table-responsive card border-0 shadow-sm">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Quiz</th>
              <th>Date</th>
              <th>Score</th>
              <th>Correct</th>
              <th>Wrong</th>
              <th>Status</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((attempt) => (
              <tr key={attempt._id}>
                <td className="fw-semibold">{attempt.quiz?.title || "Quiz"}</td>
                <td>{new Date(attempt.createdAt).toLocaleString()}</td>
                <td>{attempt.percentage}%</td>
                <td className="text-success fw-semibold">{attempt.correctCount}</td>
                <td className="text-danger fw-semibold">{attempt.wrongCount}</td>
                <td><span className={`badge ${attempt.passed ? "bg-success" : "bg-danger"}`}>{attempt.passed ? "Passed" : "Failed"}</span></td>
                <td className="text-end">
                  <Link href={`/student/quizzes/review/${attempt._id}`} className="btn btn-sm btn-outline-primary">Review</Link>
                </td>
              </tr>
            ))}
            {!attempts.length && !loading && <tr><td colSpan="7" className="text-center py-4 text-muted">No record found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
