"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaChevronLeft,
  FaEnvelope,
  FaPhoneAlt,
  FaUserGraduate,
} from "react-icons/fa";

import Pagination from "@/components/Pagination";
import { getTeacherStudent } from "@/features/API";
import {
  formatLessonDate,
  getErrorMessage,
  statusClass,
  statusLabel,
  unwrap,
} from "@/features/lessonHelpers";
import { mediaUrl } from "@/utils/mediaUrl";

const INITIAL_META = { page: 1, limit: 10, total: 0, totalPages: 1 };

export default function TeacherStudentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState(INITIAL_META);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStudent = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError("");
    try {
      const response = await getTeacherStudent(id, { page, limit });
      setData(unwrap(response, null));
      setMeta({ ...INITIAL_META, ...(response?.data?.meta || {}) });
    } catch (requestError) {
      setData(null);
      setError(getErrorMessage(requestError, "Student details could not be loaded."));
    } finally {
      setLoading(false);
    }
  }, [id, limit, page]);

  useEffect(() => {
    loadStudent();
  }, [loadStudent]);

  if (loading && !data) {
    return <main className="min-h-screen bg-[#f8fafc] p-8 text-center text-sm font-semibold text-slate-500">Loading student details...</main>;
  }

  if (error && !data) {
    return (
      <main className="min-h-screen bg-[#f8fafc] p-6">
        <button type="button" onClick={() => router.back()} className="rounded-xl bg-white px-4 py-2 font-bold text-[#16458f] shadow-sm">Back</button>
        <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-700">{error}</div>
      </main>
    );
  }

  const student = data?.student || {};
  const stats = data?.stats || {};
  const progress = data?.latestProgress;
  const lessons = data?.lessons || [];

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <header className="flex items-center gap-3">
          <button type="button" onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#16458f] shadow-sm">
            <FaChevronLeft size={14} />
          </button>
          <div>
            <p className="text-xs font-bold uppercase text-slate-500">Student details</p>
            <h1 className="text-2xl font-bold text-[#16458f]">{student.name || "Student"}</h1>
          </div>
        </header>

        {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

        <section className="grid gap-4 lg:grid-cols-[320px_1fr]">
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-center gap-4">
              {student.avatar ? (
                <img src={mediaUrl(student.avatar)} alt="" className="h-16 w-16 rounded-full object-cover" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#16458f] text-2xl font-black text-white">
                  {(student.name || "S").charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h2 className="text-lg font-black text-slate-900">{student.name}</h2>
                <span className="mt-1 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold capitalize text-emerald-700">{student.status}</span>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <p className="flex items-center gap-3"><FaEnvelope className="text-[#16458f]" /> {student.email || "Not provided"}</p>
              <p className="flex items-center gap-3"><FaPhoneAlt className="text-[#16458f]" /> {student.phone || "Not provided"}</p>
            </div>
          </article>

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {[
              ["Total", stats.totalLessons || 0],
              ["Completed", stats.completedLessons || 0],
              ["Upcoming", stats.upcomingLessons || 0],
              ["No-show", stats.noShows || 0],
              ["Progress", `${stats.progress || 0}%`],
            ].map(([label, value]) => (
              <article key={label} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
                <p className="mt-2 text-2xl font-black text-[#16458f]">{value}</p>
              </article>
            ))}
          </section>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <h2 className="font-black text-[#16458f]">Latest performance</h2>
            {progress ? (
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p><strong className="block text-slate-900">Performance</strong><span className="capitalize">{String(progress.performance || "not assessed").replaceAll("_", " ")}</span></p>
                <p><strong className="block text-slate-900">Teacher notes</strong>{progress.teacherNotes || "No notes"}</p>
                <p><strong className="block text-slate-900">Next recommendation</strong>{progress.nextLessonRecommendation || "Not set"}</p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">No lesson report has been submitted yet.</p>
            )}
          </article>
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <h2 className="font-black text-[#16458f]">Skills & improvement</h2>
            <div className="mt-4">
              <p className="text-xs font-bold uppercase text-slate-500">Skills covered</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(progress?.skillsCovered || []).length ? progress.skillsCovered.map((skill) => <span key={skill} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{skill}</span>) : <span className="text-sm text-slate-500">No skills recorded.</span>}
              </div>
              <p className="mt-4 text-xs font-bold uppercase text-slate-500">Areas to improve</p>
              <p className="mt-2 text-sm text-slate-600">{progress?.areasToImprove?.join(", ") || "Not recorded."}</p>
            </div>
          </article>
        </section>

        <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
          <div className="border-b border-slate-100 p-4">
            <h2 className="font-black text-[#16458f]">Lesson history</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-[#16458f] text-xs uppercase text-white">
                <tr><th className="px-4 py-3">Date</th><th className="px-4 py-3">Time</th><th className="px-4 py-3">Performance</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Action</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {lessons.length ? lessons.map((lesson) => (
                  <tr key={lesson._id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-bold text-slate-800">{formatLessonDate(lesson.lessonDate)}</td>
                    <td className="px-4 py-3 text-slate-600">{lesson.startTime}–{lesson.endTime}</td>
                    <td className="px-4 py-3 capitalize text-slate-600">{String(lesson.lessonProgress?.performance || "not assessed").replaceAll("_", " ")}</td>
                    <td className="px-4 py-3"><span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(lesson.status)}`}>{statusLabel(lesson.status)}</span></td>
                    <td className="px-4 py-3 text-right"><Link href={`/teacher/lessons?lessonId=${lesson._id}`} className="rounded-lg bg-[#16458f] px-3 py-2 text-xs font-bold text-white">View lesson</Link></td>
                  </tr>
                )) : <tr><td colSpan={5} className="py-10 text-center text-slate-500">No lesson history.</td></tr>}
              </tbody>
            </table>
          </div>
          <Pagination page={meta.page} limit={meta.limit} total={meta.total} totalPages={meta.totalPages} loading={loading} onPageChange={setPage} onLimitChange={(value) => { setLimit(value); setPage(1); }} />
        </section>
      </div>
    </main>
  );
}
