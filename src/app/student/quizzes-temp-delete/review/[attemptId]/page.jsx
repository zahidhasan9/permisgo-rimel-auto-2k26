"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getQuizAttemptReview } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const letter = (index) => String.fromCharCode(65 + Number(index || 0));

export default function QuizReviewPage() {
  const { attemptId } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReview = async () => {
      try {
        const res = await getQuizAttemptReview(attemptId);
        setReview(res.data?.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to load review");
      } finally {
        setLoading(false);
      }
    };
    if (attemptId) loadReview();
  }, [attemptId]);

  if (loading) return <div className="container py-5"><div className="alert alert-info">Loading review...</div></div>;
  if (error) return <div className="container py-5"><div className="alert alert-danger">{error}</div></div>;
  if (!review) return <div className="container py-5"><div className="alert alert-warning">Review not found.</div></div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Review: {review.quiz?.title}</h2>
          <p className="text-muted mb-0">Score {review.percentage}% • Correct {review.correctCount} • Wrong {review.wrongCount}</p>
        </div>
        <Link href="/student/quizzes/history" className="btn btn-outline-primary">Back Records</Link>
      </div>

      <div className="d-flex flex-column gap-4">
        {review.answers.map((answer, index) => {
          const question = answer.question;
          return (
            <div key={`${question?._id}-${index}`} className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="mb-0">Q{index + 1}. {question?.questionText}</h5>
                  <span className={`badge ${answer.isCorrect ? "bg-success" : "bg-danger"}`}>{answer.isCorrect ? "Correct" : "Wrong"}</span>
                </div>

                {question?.questionImage && <img src={mediaUrl(question.questionImage)} alt="Question" className="rounded border mb-3" style={{ width: "100%", maxHeight: 300, objectFit: "contain" }} />}

                <div className="row g-3">
                  {question?.options?.map((option, optionIndex) => {
                    const isCorrect = optionIndex === answer.correctOptionIndex;
                    const isSelectedWrong = optionIndex === answer.selectedOptionIndex && !answer.isCorrect;
                    const className = isCorrect ? "border-success bg-success-subtle" : isSelectedWrong ? "border-danger bg-danger-subtle" : "border-light";
                    return (
                      <div key={optionIndex} className="col-md-6">
                        <div className={`border rounded p-3 ${className}`}>
                          <span className="fw-bold me-2">{letter(optionIndex)}.</span>{option.text}
                          {option.image && <img src={mediaUrl(option.image)} alt="Option" className="d-block rounded border mt-2" style={{ maxWidth: "100%", maxHeight: 140, objectFit: "contain" }} />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 small">
                  <div>Your Answer: <strong>{letter(answer.selectedOptionIndex)}</strong></div>
                  <div>Correct Answer: <strong>{letter(answer.correctOptionIndex)}</strong></div>
                </div>

                {question?.explanationText && <div className="alert alert-info mt-3 mb-0">{question.explanationText}</div>}

                <div className="row g-3 mt-2">
                  {question?.markedAnswerImage && <div className="col-md-6"><img src={mediaUrl(question.markedAnswerImage)} alt="Marked" className="rounded border" style={{ width: "100%", maxHeight: 280, objectFit: "contain" }} /></div>}
                  {question?.explanationImage && <div className="col-md-6"><img src={mediaUrl(question.explanationImage)} alt="Explanation" className="rounded border" style={{ width: "100%", maxHeight: 280, objectFit: "contain" }} /></div>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
