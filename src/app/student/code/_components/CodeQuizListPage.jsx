"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { IoChevronBack, IoAlertCircleOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { getStudentCodeQuizzes } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

function LoadingCard() {
  return (
    <div className="animate-pulse rounded-xl border border-[#E5EAF2] bg-white p-4">
      <div className="flex gap-4">
        <div className="h-16 w-20 rounded-lg bg-slate-200" />
        <div className="flex-1">
          <div className="h-4 w-2/3 rounded bg-slate-200" />
          <div className="mt-3 h-3 w-full rounded bg-slate-200" />
          <div className="mt-4 flex gap-2">
            <div className="h-6 w-20 rounded bg-slate-200" />
            <div className="h-6 w-20 rounded bg-slate-200" />
            <div className="h-6 w-20 rounded bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBadge({ label, value }) {
  return (
    <div className="rounded-lg border border-[#E5EAF2] bg-[#F8FAFD] px-3 py-2">
      <p className="text-[10px] font-bold uppercase tracking-wide text-[#7B8190]">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-bold text-[#151515]">{value}</p>
    </div>
  );
}

function SeriesCard({ quiz, index }) {
  const totalQuestions = quiz.totalQuestions || 0;
  const duration = quiz.durationMinutes || 30;
  const passingScore = quiz.passingScore || 60;

  return (
    <Link
      href={`/student/code/code-challenge?quizId=${quiz._id}`}
      className="group block rounded-xl border border-[#E5EAF2] bg-white p-4 transition hover:border-[#0D4598] hover:shadow-sm"
    >
      <div className="flex gap-4">
        <div className="shrink-0">
          {quiz.coverImage ? (
            <img
              src={mediaUrl(quiz.coverImage)}
              alt={quiz.title || "Quiz"}
              className="h-20 w-24 rounded-lg border border-[#E5EAF2] object-cover"
            />
          ) : (
            <div className="flex h-20 w-24 items-center justify-center rounded-lg border border-[#E5EAF2] bg-[#F3F7FC] text-sm font-black text-[#0D4598]">
              {String(index + 1).padStart(2, "0")}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#EAF1FB] px-2 py-1 text-[11px] font-bold text-[#0D4598]">
                  #{String(index + 1).padStart(2, "0")}
                </span>

                <span className="rounded-md bg-green-50 px-2 py-1 text-[11px] font-bold text-green-700">
                  Active
                </span>
              </div>

              <h3 className="mt-2 line-clamp-1 text-[16px] font-bold text-[#151515]">
                {quiz.title || `Series ${String(index + 1).padStart(2, "0")}`}
              </h3>

              <p className="mt-1 line-clamp-1 text-sm text-[#7B8190]">
                {quiz.description ||
                  "Practice quiz series for code preparation."}
              </p>
            </div>

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598] transition group-hover:bg-[#0D4598] group-hover:text-white">
              <FaArrowRight size={14} />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <InfoBadge label="Questions" value={totalQuestions} />
            <InfoBadge label="Time" value={`${duration} min`} />
            <InfoBadge label="Pass" value={`${passingScore}%`} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CodeQuizListPage({
  type,
  title,
  subtitle = "Select a series and start your practice.",
}) {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getStudentCodeQuizzes();
        const allQuizzes = res.data?.data || [];

        const filtered = allQuizzes.filter((quiz) => {
          if (!quiz) return false;
          if (quiz.status !== "active") return false;
          return quiz.type === type;
        });

        setQuizzes(filtered);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load quizzes",
        );
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, [type]);

  const sortedQuizzes = useMemo(() => {
    return [...quizzes].sort((a, b) => {
      const orderA = Number(a.order || 0);
      const orderB = Number(b.order || 0);

      if (orderA !== orderB) return orderA - orderB;

      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [quizzes]);

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 rounded-xl border border-[#E5EAF2] bg-white p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/student/code"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
              >
                <IoChevronBack size={24} />
              </Link>

              <div>
                <h1 className="text-xl font-bold text-[#151515]">{title}</h1>
                <p className="mt-1 text-sm text-[#7B8190]">{subtitle}</p>
              </div>
            </div>

            <div className="rounded-lg border border-[#E5EAF2] bg-[#F8FAFD] px-4 py-2">
              <p className="text-[11px] font-bold uppercase text-[#7B8190]">
                Total Series
              </p>
              <p className="text-lg font-black text-[#0D4598]">
                {loading ? "..." : sortedQuizzes.length}
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        ) : null}

        {error ? (
          <div className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
            <IoAlertCircleOutline size={22} />
            <span>{error}</span>
          </div>
        ) : null}

        {!loading && !error && sortedQuizzes.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#B8C7DD] bg-white p-8 text-center">
            <h2 className="text-lg font-bold text-[#151515]">No Quiz Found</h2>

            <p className="mt-2 text-sm text-[#7B8190]">
              Admin panel থেকে আগে{" "}
              <span className="font-bold text-[#0D4598]">{type}</span> type দিয়ে
              quiz create করুন।
            </p>
          </div>
        ) : null}

        {!loading && !error && sortedQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {sortedQuizzes.map((quiz, index) => (
              <SeriesCard key={quiz._id} quiz={quiz} index={index} />
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}
