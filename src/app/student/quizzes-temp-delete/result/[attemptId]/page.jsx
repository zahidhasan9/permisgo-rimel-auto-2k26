"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getQuizAttemptReview } from "@/features/API";

export default function QuizResultPage() {
  const { attemptId } = useParams();
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadResult = async () => {
      try {
        const res = await getQuizAttemptReview(attemptId);
        setAttempt(res.data?.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to load result");
      } finally {
        setLoading(false);
      }
    };
    if (attemptId) loadResult();
  }, [attemptId]);

  if (loading) return <div className="container py-5"><div className="alert alert-info">Loading result...</div></div>;
  if (error) return <div className="container py-5"><div className="alert alert-danger">{error}</div></div>;
  if (!attempt) return <div className="container py-5"><div className="alert alert-warning">Result not found.</div></div>;

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm text-center p-4">
        <h2 className="mb-2">{attempt.quiz?.title}</h2>
        <div className={`display-4 fw-bold ${attempt.passed ? "text-success" : "text-danger"}`}>{attempt.percentage}%</div>
        <h4 className={attempt.passed ? "text-success" : "text-danger"}>{attempt.passed ? "Passed ✅" : "Failed ❌"}</h4>

        <div className="row g-3 mt-4">
          <div className="col-md-3"><div className="border rounded p-3"><div className="text-muted">Total</div><h3>{attempt.totalQuestions}</h3></div></div>
          <div className="col-md-3"><div className="border rounded p-3"><div className="text-muted">Correct</div><h3 className="text-success">{attempt.correctCount}</h3></div></div>
          <div className="col-md-3"><div className="border rounded p-3"><div className="text-muted">Wrong</div><h3 className="text-danger">{attempt.wrongCount}</h3></div></div>
          <div className="col-md-3"><div className="border rounded p-3"><div className="text-muted">Time</div><h3>{Math.round((attempt.durationSeconds || 0) / 60)}m</h3></div></div>
        </div>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link href={`/student/quizzes/review/${attempt._id}`} className="btn btn-primary">Review Answers</Link>
          <Link href="/student/quizzes" className="btn btn-outline-primary">Back to Quizzes</Link>
          <Link href="/student/quizzes/history" className="btn btn-outline-secondary">My Records</Link>
        </div>
      </div>
    </div>
  );
}
