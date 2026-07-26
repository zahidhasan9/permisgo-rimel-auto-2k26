"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { getEbookCourses } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

export default function CodeEbookPage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getEbookCourses()
      .then((courseResponse) => setCourses(courseResponse.data?.data || []))
      .catch((requestError) => setError(requestError.response?.data?.message || "Courses could not be loaded."))
      .finally(() => setLoading(false));
  }, []);

  return <main className="min-h-screen bg-white px-3 py-6 sm:px-6">
    <div className="mx-auto w-full max-w-[1084px]">
      <header className="flex items-center gap-4">
        <button onClick={() => router.back()} className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8edf5]"><IoChevronBack size={25} /></button>
        <div><h1 className="text-[22px] font-semibold text-[#173f87] sm:text-[25px]">Code eBook</h1><p className="mt-1 text-xs text-slate-500">Choose a course to start learning</p></div>
      </header>

      {error && <p className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700">{error}</p>}
      {loading ? <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-[210px] animate-pulse rounded-xl bg-[#e8eef7]" />)}</section>
        : <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => <Link key={course._id} href={`/student/code/code-ebook/${course._id}`} className="group overflow-hidden rounded-xl bg-[#e8eef7] p-4 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-[120px] items-center justify-center overflow-hidden rounded-xl bg-white">
              {course.coverImage ? <img src={mediaUrl(course.coverImage)} alt={course.title} className="h-full w-full object-cover"/> : <img src="/image/code-ebook.png" alt="" className="h-16 w-16 object-contain" />}
            </div>
            <div className="flex min-h-[92px] items-center justify-between gap-3 px-2 pt-4">
              <div><h2 className="font-bold leading-5 text-[#173f87]">{course.title}</h2><p className="mt-2 text-xs text-slate-500">{course.topicCount || 0} topics · {course.lessonCount || 0} lessons</p></div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#173f87]"><IoChevronForward /></span>
            </div>
          </Link>)}
        </section>}
      {!loading && !error && !courses.length && <div className="mt-8 rounded-xl bg-[#e8eef7] p-12 text-center text-sm text-slate-500">No active Code eBook course is available.</div>}
    </div>
  </main>;
}
