"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowForward, IoChevronBack } from "react-icons/io5";

import { getMyQuizAttempts, getStudentCodeQuizzes } from "@/features/API";

const THEMES = [
  { letter: "L", title: "Legal provisions regarding road traffic", color: "#69A9DF" },
  { letter: "A", title: "First aid", color: "#EF2F2B" },
  { letter: "C", title: "The Driver", color: "#E6007E" },
  { letter: "P", title: "Precautions to take when leaving the vehicle", color: "#555553" },
  { letter: "R", title: "The Road", color: "#AAA2CC" },
  { letter: "M", title: "Mechanical components & safety equipment", color: "#F79500" },
  { letter: "U", title: "Other road users", color: "#DA4E2D" },
  { letter: "S", title: "Vehicle safety equipment", color: "#40962D" },
  { letter: "D", title: "General regulations and miscellaneous", color: "#FDBA12" },
  { letter: "E", title: "Rules for using the vehicle in relation to ecology", color: "#91A719" },
];

const attemptQuizId = (attempt) => typeof attempt?.quiz === "string" ? attempt.quiz : attempt?.quiz?._id || "";

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
        setQuizzes((quizResponse.data?.data || []).filter((quiz) => quiz?.status === "active" && quiz.type === "thematic_series"));
        setAttempts(attemptResponse.data?.data || []);
      } catch (requestError) {
        if (active) setError(requestError.response?.data?.message || requestError.message || "Thematic series could not be loaded.");
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, []);

  const latestAttempts = useMemo(() => {
    const map = new Map();
    attempts.forEach((attempt) => {
      const id = attemptQuizId(attempt);
      const saved = map.get(id);
      if (id && (!saved || new Date(attempt.createdAt) > new Date(saved.createdAt))) map.set(id, attempt);
    });
    return map;
  }, [attempts]);

  const series = useMemo(() => [...quizzes].sort((a, b) => Number(a.order || 0) - Number(b.order || 0) || new Date(a.createdAt) - new Date(b.createdAt)), [quizzes]);

  return (
    <main className="min-h-screen bg-white px-3 py-[26px] sm:px-6">
      <div className="mx-auto w-full max-w-[1084px]">
        <header className="flex h-11 items-center gap-[18px]">
          <button type="button" onClick={() => router.back()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8eef7] text-black"><IoChevronBack size={26} /></button>
          <h1 className="text-[24px] font-bold leading-none text-[#173f8f]">Thematic Series List</h1>
        </header>

        {error && <div className="mt-[34px] rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}

        <section className="mt-[34px] grid grid-cols-1 gap-5 lg:grid-cols-2">
          {loading ? Array.from({ length: 10 }).map((_, index) => <div key={index} className="h-[108px] animate-pulse rounded-[10px] bg-[#e8eef7]" />) : series.map((quiz, index) => {
            const theme = THEMES[index] || { letter: String(index + 1), title: quiz.title || `Thematic Series ${index + 1}`, color: "#69A9DF" };
            const attempt = latestAttempts.get(quiz._id);
            const total = Number(attempt?.totalQuestions || quiz.totalQuestions || 0);
            const answered = Number(attempt?.answers?.length || 0);
            const completed = attempt?.status === "completed";
            const progress = completed ? 100 : total ? Math.min(100, Math.round((answered / total) * 100)) : 0;
            const href = completed ? `/student/code/my-history?latest=${attempt?._id || ""}` : `/student/code/code-challenge?quizId=${quiz._id}`;

            return (
              <article key={quiz._id} className="relative h-[108px] rounded-[10px]" style={{ backgroundColor: theme.color }}>
                <div className="absolute left-7 top-[28px] flex h-[53px] w-[53px] items-center justify-center rounded-full bg-[#f7fbff] ring-4 ring-[#d9e5f0]">
                  <span className="text-[20px] font-bold leading-none text-[#174596]">{theme.letter}</span>
                </div>
                <div className="absolute left-[100px] top-[33px] w-[252px] max-w-[calc(100%_-_180px)]">
                  <h2 className="truncate text-[16px] font-bold leading-5 text-white">{quiz.questionText || theme.title}</h2>
                  <div className="mt-[11px] h-[15px] w-full overflow-hidden rounded-full bg-[#dde9f6]">
                    <div className="h-full rounded-full bg-[#174596] transition-[width] duration-300" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <Link href={href} aria-label={`Open ${quiz.questionText || theme.title}`} className="absolute right-[32px] top-[32px] flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white transition hover:scale-105">
                  <IoArrowForward size={28} style={{ color: theme.color }} />
                </Link>
              </article>
            );
          })}
        </section>

        {!loading && !error && series.length === 0 && <div className="mt-[34px] rounded-xl bg-[#e8eef7] p-10 text-center text-sm font-semibold text-slate-600">No thematic series is available.</div>}
      </div>
    </main>
  );
}
