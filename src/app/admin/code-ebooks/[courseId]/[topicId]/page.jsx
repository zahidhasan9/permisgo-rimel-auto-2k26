"use client";

import Link from "next/link";
import { use, useCallback, useEffect, useState } from "react";
import { deleteEbookLesson, getAdminEbookLessons, getEbookTopics } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

export default function TopicLessonsPage({ params }) {
  const { courseId, topicId } = use(params);
  const [course, setCourse] = useState(null);
  const [topic, setTopic] = useState(null);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [structure, lessons] = await Promise.all([
        getEbookTopics(courseId),
        getAdminEbookLessons({ courseId, topicId, page, limit: 10, search, status }),
      ]);
      setCourse(structure.data?.data?.course);
      setTopic((structure.data?.data?.topics || []).find((entry) => entry._id === topicId));
      setItems(lessons.data?.data?.items || []);
      setPagination(lessons.data?.data?.pagination || { page: 1, pages: 1, total: 0 });
    } catch (error) { setNotice(error.response?.data?.message || "Lessons could not be loaded."); }
    finally { setLoading(false); }
  }, [courseId, topicId, page, search, status]);
  useEffect(() => { const timer = setTimeout(load, 250); return () => clearTimeout(timer); }, [load]);

  const createHref = `/admin/code-ebooks/lesson-editor?courseId=${courseId}&topicId=${topicId}`;
  return <main className="min-h-screen bg-[#f6f8fc] p-4 sm:p-6"><div className="mx-auto max-w-7xl">
    <nav className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500"><Link href="/admin/code-ebooks">Courses</Link><span>/</span><Link href={`/admin/code-ebooks/${courseId}`}>{course?.title || "Course"}</Link><span>/</span><span className="text-[#173f87]">{topic?.title || "Lessons"}</span></nav>
    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-2xl font-bold">{topic?.title || "Lessons"}</h1><p className="mt-1 text-sm text-slate-500">{pagination.total} lessons</p></div><Link href={createHref} className="rounded-xl bg-[#173f87] px-5 py-3 text-sm font-bold text-white">+ Add Lesson</Link></div>
    <div className="mt-6 flex flex-col gap-3 rounded-xl border bg-white p-4 sm:flex-row"><input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search lessons..." className="flex-1 rounded-lg border px-3 py-2.5 text-sm"/><select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="rounded-lg border px-3 py-2.5 text-sm"><option value="">All statuses</option><option value="active">Published</option><option value="draft">Draft</option><option value="inactive">Inactive</option></select></div>
    {notice && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{notice}</p>}
    <section className="mt-4 overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="hidden grid-cols-[70px_1fr_130px_120px_160px] gap-4 border-b bg-slate-50 px-5 py-3 text-xs font-bold uppercase text-slate-500 md:grid"><span>Image</span><span>Lesson</span><span>Content</span><span>Status</span><span>Actions</span></div>
      {loading ? <div className="p-10 text-center text-sm text-slate-500">Loading lessons...</div> : items.map((lesson) => <article key={lesson._id} className="grid gap-4 border-b px-5 py-4 last:border-0 md:grid-cols-[70px_1fr_130px_120px_160px] md:items-center">
        <img src={mediaUrl(lesson.coverImage)} alt="" className="h-14 w-16 rounded-lg bg-slate-100 object-cover"/><div><h2 className="font-bold">{lesson.title}</h2><p className="mt-1 text-xs text-slate-500">Order #{lesson.order || 0}</p></div><span className="text-xs text-slate-600">{lesson.contentBlocks?.length || 0} blocks<br/>{lesson.videos?.length || 0} videos</span><span className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-bold ${lesson.status === "active" ? "bg-emerald-50 text-emerald-700" : lesson.status === "draft" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-500"}`}>{lesson.status}</span><div className="flex gap-2"><Link href={`/admin/code-ebooks/lesson-editor?lessonId=${lesson._id}`} className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">Edit</Link><button onClick={async () => { if (!confirm(`Deactivate "${lesson.title}"?`)) return; await deleteEbookLesson(lesson._id); await load(); }} className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600">Deactivate</button></div>
      </article>)}
      {!loading && !items.length && <div className="p-12 text-center text-sm text-slate-500">No lessons found.</div>}
    </section>
    <div className="mt-4 flex items-center justify-between rounded-xl bg-white px-4 py-3"><p className="text-xs text-slate-500">Page {pagination.page} of {pagination.pages}</p><div className="flex gap-2"><button disabled={page <= 1} onClick={() => setPage((value) => value - 1)} className="rounded-lg border px-4 py-2 text-xs font-bold disabled:opacity-40">Previous</button><button disabled={page >= pagination.pages} onClick={() => setPage((value) => value + 1)} className="rounded-lg bg-[#173f87] px-4 py-2 text-xs font-bold text-white disabled:opacity-40">Next</button></div></div>
  </div></main>;
}
