"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";
import { IoChevronBack } from "react-icons/io5";

import { getMyQuizAttempts, getStudentCodeQuizzes } from "@/features/API";

const quizIdFrom = (value) => typeof value?.quiz === "string" ? value.quiz : value?.quiz?._id || "";

export default function SeriesListPage({ type, title, emptyText }) {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([
      getStudentCodeQuizzes(),
      getMyQuizAttempts().catch(() => ({ data: { data: [] } })),
    ])
      .then(([quizResponse, attemptResponse]) => {
        if (!active) return;
        setQuizzes((quizResponse.data?.data || []).filter((quiz) => quiz?.status === "active" && quiz.type === type));
        setAttempts(attemptResponse.data?.data || []);
      })
      .catch((requestError) => {
        if (active) setError(requestError.response?.data?.message || requestError.message || "Series could not be loaded.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [type]);

  const latestAttempts = useMemo(() => {
    const map = new Map();
    attempts.forEach((attempt) => {
      const quizId = quizIdFrom(attempt);
      const current = map.get(quizId);
      if (quizId && (!current || new Date(attempt.createdAt) > new Date(current.createdAt))) map.set(quizId, attempt);
    });
    return map;
  }, [attempts]);

  const series = useMemo(() => [...quizzes].sort((a, b) => Number(a.order || 0) - Number(b.order || 0) || new Date(a.createdAt) - new Date(b.createdAt)), [quizzes]);

  return <main className="min-h-screen bg-white px-3 py-6 sm:px-6">
    <div className="mx-auto w-full max-w-[1084px]">
      <header className="flex h-11 items-center gap-4">
        <button type="button" onClick={() => router.back()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8edf5] text-black"><IoChevronBack size={25} /></button>
        <h1 className="text-[25px] font-semibold leading-none tracking-[-0.02em] text-[#173f87]">{title}</h1>
      </header>

      {error && <div className="mt-[34px] rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}

      <section className="mt-[34px] grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
        {loading ? Array.from({ length: 18 }).map((_, index) => <div key={index} className="h-[105px] animate-pulse rounded-xl bg-[#e8edf5]" />) : series.map((quiz, index) => {
          const attempt = latestAttempts.get(quiz._id);
          const total = Number(attempt?.totalQuestions || quiz.totalQuestions || 0);
          const answered = Number(attempt?.answers?.length || 0);
          const completed = attempt?.status === "completed";
          const progress = completed ? 100 : total ? Math.min(100, Math.round((answered / total) * 100)) : 0;
          const href = completed ? `/student/code/my-history?latest=${attempt?._id || ""}` : `/student/code/code-challenge?quizId=${quiz._id}`;
          return <article key={quiz._id} className="relative h-[105px] rounded-xl bg-[#e8edf5] px-7 pt-[32px]">
            <div className="w-[252px] max-w-[calc(100%_-_40px)]">
              <h2 className="truncate text-[16px] font-semibold leading-5 text-[#171717]">Series {String(index + 1).padStart(2, "0")}</h2>
              <div className="mt-[11px] h-[15px] w-full overflow-hidden rounded-full bg-[#d9e2f0]"><div className="h-full rounded-full bg-[#17479a] transition-[width] duration-300" style={{ width: `${progress}%` }} /></div>
            </div>
            <Link href={href} aria-label={`Open Series ${index + 1}`} className="absolute right-[31px] top-[32px] flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#e9283d] text-white transition hover:scale-105 hover:bg-[#cf2034]"><FaArrowRight size={21} /></Link>
          </article>;
        })}
      </section>

      {!loading && !error && series.length === 0 && <div className="mt-[34px] rounded-xl bg-[#e8edf5] p-10 text-center text-sm font-semibold text-slate-600">{emptyText}</div>}
    </div>
  </main>;
}
