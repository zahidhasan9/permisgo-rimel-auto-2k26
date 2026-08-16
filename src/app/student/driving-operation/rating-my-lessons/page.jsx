"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import {
  getLatestLessonForFeedback,
  submitLessonFeedback,
} from "@/features/API";
import { formatLessonDate, getLessonLocation } from "@/features/lessonHelpers";

const ratings = [
  { label: "Very Satisfied", emoji: "😄", stars: 5 },
  { label: "Satisfied", emoji: "🙂", stars: 4 },
  { label: "Neutral", emoji: "😐", stars: 3 },
  { label: "Unsatisfied", emoji: "😕", stars: 2 },
  { label: "Very Unsatisfied", emoji: "😞", stars: 1 },
];

export default function RatingMyLessonsPage() {
  const router = useRouter();
  const [lesson, setLesson] = useState(null);
  const [canReview, setCanReview] = useState(false);
  const [selected, setSelected] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getLatestLessonForFeedback()
      .then((response) => {
        const data = response?.data?.data || {};
        setLesson(data.lesson || null);
        setCanReview(Boolean(data.canReview));
      })
      .catch((requestError) =>
        setError(
          requestError?.response?.data?.message ||
            "Latest lesson could not be loaded.",
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  const submit = async () => {
    if (!lesson?._id || !canReview) return;
    if (!selected) {
      setError("Please choose a rating.");
      return;
    }
    if (!comment.trim()) {
      setError("Please write your review.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      await submitLessonFeedback(lesson._id, {
        rating: selected,
        studentNotes: comment.trim(),
      });
      setCanReview(false);
      setSuccess("Your rating and review were submitted successfully.");
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Review could not be submitted.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-3 text-[11px] sm:p-5">
      <header className="mb-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-900"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-base font-semibold text-blue-900">
          Rating note down my lessons
        </h1>
      </header>

      {error && (
        <div className="mb-3 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-3 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-xs font-semibold text-green-700">
          <FaCheckCircle />
          {success}
        </div>
      )}

      <section className="rounded-xl bg-gray-200 p-3">
        {loading ? (
          <div className="h-72 animate-pulse rounded-xl bg-white" />
        ) : !lesson ? (
          <div className="rounded-xl bg-white p-10 text-center text-sm text-gray-500">
            No completed lesson is available for review.
          </div>
        ) : !canReview ? (
          <div className="rounded-xl bg-white p-10 text-center">
            <FaCheckCircle className="mx-auto text-4xl text-green-500" />
            <h2 className="mt-4 text-sm font-bold text-blue-900">
              Latest lesson already reviewed
            </h2>
            <p className="mt-2 text-xs text-gray-500">
              You can submit another review after your next lesson is completed.
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-xl bg-white p-4 text-center">
              <h2 className="text-sm font-semibold text-blue-900">
                Give ratings to your latest lesson
              </h2>
              <p className="mt-2 text-[10px] text-gray-500">
                {formatLessonDate(lesson.lessonDate)} ·{" "}
                {lesson.teacher?.name || "Instructor"} ·{" "}
                {getLessonLocation(lesson)}
              </p>
              <p className="mt-3 text-[10px] font-medium">
                Please choose one option
              </p>

              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
                {ratings.map((rating) => (
                  <button
                    key={rating.stars}
                    type="button"
                    onClick={() => setSelected(rating.stars)}
                    className="flex flex-col items-center rounded-xl p-2 transition hover:bg-slate-50"
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full text-xl ${selected === rating.stars ? "bg-blue-900" : "bg-gray-200"}`}
                    >
                      {rating.emoji}
                    </span>
                    <span className="mt-1 text-[9px] text-yellow-400">
                      {"★".repeat(rating.stars)}
                    </span>
                    <span className="mt-1 text-center text-[9px]">
                      {rating.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <label className="mb-1 block text-[11px] font-semibold">
                Write down your comment here *
              </label>
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Write Here"
                className="h-24 w-full rounded-lg border p-3 text-xs outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={submit}
                disabled={saving}
                className="mt-3 rounded-lg bg-[#df2339] px-6 py-3 text-xs font-bold text-white disabled:opacity-50"
              >
                {saving ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
