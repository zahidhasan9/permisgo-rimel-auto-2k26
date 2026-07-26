"use client";

import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack, IoChevronForward, IoTime } from "react-icons/io5";
import { getEbookTopics, getStudentEbookLessons } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

export default function EbookCoursePage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [topics, setTopics] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const structure = await getEbookTopics(id);
        const currentCourse = structure.data?.data?.course;
        if (!active) return;
        setCourse(currentCourse);
        const currentTopics = structure.data?.data?.topics || [];
        setTopics(currentTopics);
        const responses = await Promise.all(currentTopics.map((topic) => getStudentEbookLessons(id, topic._id)));
        if (active) setLessons(responses.flatMap((response, index) => (response.data?.data || []).map((lesson) => ({ ...lesson, topicId: currentTopics[index]._id }))));
      } catch (requestError) {
        if (active) setError(requestError.response?.data?.message || "Course could not be loaded.");
      } finally { if (active) setLoading(false); }
    };
    load();
    return () => { active = false; };
  }, [id]);

  const visibleLessons = useMemo(() => lessons.filter((lesson) => filter === "all" || (filter === "progress" && lesson.progress?.status === "in_progress") || (filter === "completed" && lesson.progress?.status === "completed")), [lessons, filter]);
  const videos = lessons.flatMap((lesson) => (lesson.videos || []).map((video) => ({ ...video, lesson })));
  const materials = lessons.flatMap((lesson) => (lesson.materials || []).map((material) => ({ ...material, lesson })));

  return <main className="min-h-screen bg-white px-3 py-6 sm:px-6"><div className="mx-auto max-w-[1084px]">
    <header className="flex items-center gap-4"><button onClick={() => router.back()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8edf5]"><IoChevronBack size={25} /></button><h1 className="break-words text-xl font-semibold text-[#173f87] sm:text-2xl">{course?.title || "Code eBook Course"}</h1></header>
    {error && <p className="mt-8 rounded-xl bg-red-50 p-5 text-sm font-semibold text-red-700">{error}</p>}
    <section className="mt-8 rounded-xl bg-[#e8eef7] p-4 sm:p-5">
      <div className="flex gap-2">{[["all","All"],["progress","In Progress"],["completed","Completed"]].map(([key,label]) => <button key={key} onClick={() => setFilter(key)} className={`rounded-lg px-5 py-2 text-xs font-bold ${filter === key ? "border border-[#174a9b] bg-[#bdd5fa] text-[#173f87]" : "text-slate-700"}`}>{label}</button>)}<button type="button" disabled className="rounded-lg px-5 py-2 text-xs font-bold text-slate-400">Exam</button></div>
      {loading ? <div className="mt-6 h-72 animate-pulse rounded-xl bg-white" /> : topics.map((topic) => {
        const topicLessons = visibleLessons.filter((lesson) => lesson.topicId === topic._id);
        return <section key={topic._id} className="mt-7"><h2 className="text-lg font-bold text-[#173f87]">{topic.title}</h2><p className="mt-1 text-xs text-slate-500">{String(topicLessons.length).padStart(2,"0")} Courses</p><div className="mt-4 space-y-3">{topicLessons.map((lesson) => <Link key={lesson._id} href={`/student/code/code-ebook/lesson/${lesson._id}`} className="flex min-h-[66px] items-center justify-between rounded-xl bg-white px-5 py-4 text-sm text-[#4f535c]"><span>{lesson.title}</span><IoChevronForward /></Link>)}{!topicLessons.length && <div className="rounded-xl border border-dashed border-slate-300 px-5 py-6 text-center text-xs text-slate-500">No {filter === "all" ? "" : filter.replace("_"," ")} lesson in this topic.</div>}</div></section>;
      })}
    </section>
    <div className="mt-5 grid gap-5 lg:grid-cols-2"><Resource title="Lesson Videos">{videos.map((video,index) => <a key={`${video.url}-${index}`} href={video.url} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-xl bg-white p-3"><img src={video.thumbnail ? mediaUrl(video.thumbnail) : mediaUrl(video.lesson.coverImage)} alt="" className="h-20 w-24 rounded-lg object-cover"/><div><h3 className="font-bold">{video.title}</h3><p className="mt-2 flex items-center gap-1 text-sm text-slate-500"><IoTime className="text-[#174a9b]"/>{video.durationMinutes || 0} minutes</p></div></a>)}</Resource><Resource title="Training Materials">{materials.map((material,index) => <a key={`${material.fileUrl}-${index}`} href={mediaUrl(material.fileUrl)} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl bg-white p-4"><div><h3 className="font-bold">{material.title}</h3><p className="mt-2 flex items-center gap-1 text-sm text-slate-500"><IoTime className="text-[#174a9b]"/>{material.readMinutes || 0} minutes read</p></div><span className="rounded-lg border border-[#174a9b] px-5 py-2 text-xs font-bold text-[#174a9b]">Download</span></a>)}</Resource></div>
  </div></main>;
}

function Resource({ title, children }) { return <section className="rounded-xl bg-[#e8eef7] p-5"><h2 className="text-xl font-bold">{title}</h2><div className="mt-5 space-y-3">{children?.length ? children : <p className="rounded-xl bg-white p-6 text-sm text-slate-500">Nothing added yet.</p>}</div></section>; }
