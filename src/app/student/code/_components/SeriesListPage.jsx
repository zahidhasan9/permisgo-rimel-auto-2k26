"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";
import { IoChevronBack } from "react-icons/io5";

import { getMyQuizAttempts, getStudentCodeQuizzes } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const quizIdFrom = (value) =>
  typeof value?.quiz === "string" ? value.quiz : value?.quiz?._id || "";

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
        setQuizzes(
          (quizResponse.data?.data || []).filter(
            (quiz) => quiz?.status === "active" && quiz.type === type,
          ),
        );
        setAttempts(attemptResponse.data?.data || []);
      })
      .catch((requestError) => {
        if (active)
          setError(
            requestError.response?.data?.message ||
              requestError.message ||
              "Series could not be loaded.",
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [type]);

  const latestAttempts = useMemo(() => {
    const map = new Map();
    attempts.forEach((attempt) => {
      const quizId = quizIdFrom(attempt);
      const current = map.get(quizId);
      if (
        quizId &&
        (!current || new Date(attempt.createdAt) > new Date(current.createdAt))
      )
        map.set(quizId, attempt);
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
    <main className="min-h-screen overflow-x-hidden bg-white px-3 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="flex min-h-10 items-center gap-3 sm:h-11 sm:gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#e8edf5] text-black sm:h-11 sm:w-11 sm:rounded-xl"
          >
            <IoChevronBack size={22} />
          </button>
          <h1 className="min-w-0 text-[20px] font-semibold leading-6 tracking-[-0.02em] text-[#173f87] sm:text-[25px] sm:leading-none">
            {title}
          </h1>
        </header>

        {error && (
          <div className="mt-[34px] rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <section className="mt-6 grid grid-cols-1 gap-3 sm:mt-[34px] sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 18 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[106px] animate-pulse rounded-xl bg-[#e8edf5] sm:h-[105px]"
                />
              ))
            : series.map((quiz, index) => {
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
                const seriesNumber = String(index + 1).padStart(2, "0");
                const seriesTitle =
                  String(quiz.title || "").trim() || `Series ${seriesNumber}`;
                return (
                  <article
                    key={quiz._id}
                    className="relative flex min-h-[106px] overflow-hidden rounded-xl bg-[#e8edf5] pl-[94px] pr-[52px] sm:h-[105px] sm:min-h-0 sm:pl-[118px] sm:pr-[68px]"
                  >
                    {quiz.coverImage ? (
                      <img
                        src={mediaUrl(quiz.coverImage)}
                        alt=""
                        className="absolute inset-y-0 left-0 h-full w-[78px] object-cover sm:w-[98px]"
                      />
                    ) : (
                      <div className="absolute inset-y-0 left-0 flex w-[78px] items-center justify-center text-[11px] font-bold text-[#17479a] sm:w-[98px]">
                        {/* {seriesNumber} */}
                      </div>
                    )}
                    <div className="my-auto min-w-0 w-full">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-[#17479a]">
                        Series {seriesNumber}
                      </p>
                      <h2
                        className="line-clamp-2 text-[14px] font-semibold leading-[18px] text-[#171717] sm:truncate sm:text-[16px] sm:leading-5"
                        title={seriesTitle}
                      >
                        {seriesTitle}
                      </h2>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#d9e2f0] sm:h-[10px]">
                        <div
                          className="h-full rounded-full bg-[#17479a] transition-[width] duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <Link
                      href={href}
                      aria-label={`Open ${seriesTitle}`}
                      className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#e9283d] text-white transition hover:scale-105 hover:bg-[#cf2034] sm:right-5 sm:h-[34px] sm:w-[34px]"
                    >
                      <FaArrowRight size={18} />
                    </Link>
                  </article>
                );
              })}
        </section>

        {!loading && !error && series.length === 0 && (
          <div className="mt-6 rounded-xl bg-[#e8edf5] p-6 text-center text-sm font-semibold text-slate-600 sm:mt-[34px] sm:p-10">
            {emptyText}
          </div>
        )}
      </div>
    </main>
  );
}
