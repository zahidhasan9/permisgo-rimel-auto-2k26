"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getStudentCodeQuizzes } from "@/features/API";

export default function MockTestPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getStudentCodeQuizzes()
      .then((response) => {
        if (!active) return;

        const quiz = (response.data?.data || [])
          .filter(
            (item) =>
              item?.status === "active" &&
              item.type === "mock_test" &&
              Number(item.totalQuestions || 0) > 0,
          )
          .sort(
            (a, b) =>
              Number(a.order || 0) - Number(b.order || 0) ||
              new Date(a.createdAt) - new Date(b.createdAt),
          )[0];

        if (!quiz?._id) {
          setError("No active Mock Exam is available.");
          return;
        }

        router.replace(`/student/code/code-challenge?quizId=${quiz._id}`);
      })
      .catch((requestError) => {
        if (active) {
          setError(
            requestError.response?.data?.message ||
              "Mock Exam could not be loaded.",
          );
        }
      });

    return () => {
      active = false;
    };
  }, [router]);

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white p-6">
        <div className="w-full max-w-md rounded-xl bg-red-50 p-6 text-center">
          <p className="text-sm font-semibold text-red-700">{error}</p>
          <Link
            href="/student/code-learning"
            className="mt-5 inline-flex rounded-lg bg-[#173f87] px-5 py-2.5 text-xs font-bold text-white"
          >
            Back to Code Learning
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white p-6">
      <div className="rounded-xl bg-[#e8eef7] px-8 py-6 text-sm font-bold text-[#173f87]">
        Starting Mock Exam...
      </div>
    </main>
  );
}
