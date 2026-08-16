"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowForward, IoChevronBack } from "react-icons/io5";

import { getMyQuizAttempts, getStudentCodeQuizzes } from "@/features/API";

const THEMES = [
  {
    letter: "L",
    title: "Legal provisions regarding road traffic",
    color: "#69A9DF",
  },
  { letter: "A", title: "First aid", color: "#EF2F2B" },
  { letter: "C", title: "The Driver", color: "#E6007E" },
  {
    letter: "P",
    title: "Precautions to take when leaving the vehicle",
    color: "#555553",
  },
  { letter: "R", title: "The Road", color: "#AAA2CC" },
  {
    letter: "M",
    title: "Mechanical components & safety equipment",
    color: "#F79500",
  },
  { letter: "U", title: "Other road users", color: "#DA4E2D" },
  { letter: "S", title: "Vehicle safety equipment", color: "#40962D" },
  {
    letter: "D",
    title: "General regulations and miscellaneous",
    color: "#FDBA12",
  },
  {
    letter: "E",
    title: "Rules for using the vehicle in relation to ecology",
    color: "#91A719",
  },
];

const attemptQuizId = (attempt) =>
  typeof attempt?.quiz === "string" ? attempt.quiz : attempt?.quiz?._id || "";

export default function ThematiquesSeriesPage() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [quizResponse, attemptResponse] = await Promise.all([
          getStudentCodeQuizzes(),
          getMyQuizAttempts().catch(() => ({ data: { data: [] } })),
        ]);
        if (!active) return;
        setQuizzes(
          (quizResponse.data?.data || []).filter(
            (quiz) =>
              quiz?.status === "active" && quiz.type === "thematic_series",
          ),
        );
        setAttempts(attemptResponse.data?.data || []);
      } catch (requestError) {
        if (active)
          setError(
            requestError.response?.data?.message ||
              requestError.message ||
              "Thematic series could not be loaded.",
          );
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const latestAttempts = useMemo(() => {
    const map = new Map();
    attempts.forEach((attempt) => {
      const id = attemptQuizId(attempt);
      const saved = map.get(id);
      if (
        id &&
        (!saved || new Date(attempt.createdAt) > new Date(saved.createdAt))
      )
        map.set(id, attempt);
    });
    return map;
  }, [attempts]);

  const series = useMemo(
    () =>
      [...quizzes].sort(
        (a, b) =>
          Number(a.order || 0) - Number(b.order || 0) ||
          new Date(a.createdAt) - new Date(b.createdAt),
      ),
    [quizzes],
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-3 py-4 sm:px-6 sm:py-[26px]">
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="flex min-h-10 items-center gap-3 sm:h-11 sm:gap-[18px]">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#e8eef7] text-black sm:h-11 sm:w-11 sm:rounded-xl"
          >
            <IoChevronBack size={22} />
          </button>
          <h1 className="min-w-0 text-[20px] font-bold leading-6 text-[#173f8f] sm:text-[24px] sm:leading-none">
            Thematic Series List
          </h1>
        </header>

        {error && (
          <div className="mt-[34px] rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <section className="mt-6 grid grid-cols-1 gap-3 sm:mt-[34px] sm:gap-5 lg:grid-cols-2">
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[96px] animate-pulse rounded-[10px] bg-[#e8eef7] sm:h-[108px]"
                />
              ))
            : series.map((quiz, index) => {
                const theme = THEMES[index] || {
                  letter: String(index + 1),
                  title: quiz.title || `Thematic Series ${index + 1}`,
                  color: "#69A9DF",
                };
                const attempt = latestAttempts.get(quiz._id);
                const total = Number(
                  attempt?.totalQuestions || quiz.totalQuestions || 0,
                );
                const answered = Number(attempt?.answers?.length || 0);
                const completed = attempt?.status === "completed";
                const progress = completed
                  ? 100
                  : total
                    ? Math.min(100, Math.round((answered / total) * 100))
                    : 0;
                const href = `/student/code/code-challenge?quizId=${quiz._id}`;

                return (
                  <article
                    key={quiz._id}
                    className="flex min-h-[96px] items-center gap-3 overflow-hidden rounded-[10px] px-3 py-3 sm:h-[108px] sm:min-h-0 sm:gap-5 sm:px-7 sm:py-0"
                    style={{ backgroundColor: theme.color }}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f7fbff] ring-[3px] ring-[#d9e5f0] sm:h-[53px] sm:w-[53px] sm:ring-4">
                      <span className="text-[17px] font-bold leading-none text-[#174596] sm:text-[20px]">
                        {theme.letter}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="line-clamp-2 text-[13px] font-bold leading-[17px] text-white sm:truncate sm:text-[16px] sm:leading-5">
                        {quiz.questionText || theme.title}
                      </h2>
                      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#dde9f6] sm:mt-[11px] sm:h-[15px]">
                        <div
                          className="h-full rounded-full bg-[#174596] transition-[width] duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <Link
                      href={href}
                      aria-label={`Open ${quiz.questionText || theme.title}`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white transition hover:scale-105 sm:h-[34px] sm:w-[34px]"
                    >
                      <IoArrowForward
                        size={22}
                        style={{ color: theme.color }}
                      />
                    </Link>
                  </article>
                );
              })}
        </section>

        {!loading && !error && series.length === 0 && (
          <div className="mt-6 rounded-xl bg-[#e8eef7] p-6 text-center text-sm font-semibold text-slate-600 sm:mt-[34px] sm:p-10">
            No thematic series is available.
          </div>
        )}
      </div>
    </main>
  );
}
