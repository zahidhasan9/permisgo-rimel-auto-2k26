"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import QuestionForm from "@/components/quiz/QuestionForm";
import { getQuestionById, updateQuizQuestion } from "@/features/API";

export default function EditQuestionPage() {
  const { id, questionId } = useParams();
  const router = useRouter();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadQuestion = async () => {
      try {
        const res = await getQuestionById(questionId);
        setQuestion(res.data?.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to load question");
      }
    };
    if (questionId) loadQuestion();
  }, [questionId]);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError("");
      await updateQuizQuestion(questionId, formData);
      router.push(`/admin/quizzes/${id}/questions`);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to update question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h2>Edit Question</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {question ? <QuestionForm initialValues={question} onSubmit={handleSubmit} loading={loading} submitText="Update Question" /> : <div className="alert alert-info">Loading...</div>}
    </div>
  );
}
