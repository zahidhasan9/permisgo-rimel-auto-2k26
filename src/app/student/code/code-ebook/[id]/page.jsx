"use client";

import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack, IoArrowForward, IoChevronBack, IoChevronForward, IoTime } from "react-icons/io5";
import { getEbookTopics, getLessons, getStudentEbookLessons } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const PROGRESS_PAGE_SIZE = 3;
const ACTIVE_LESSON_STATUSES = ["scheduled", "in_progress", "awaiting_confirmation"];

const formatProgressDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

export default function EbookCoursePage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [topics, setTopics] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [drivingLessons, setDrivingLessons] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [progressPage, setProgressPage] = useState(0);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [structure, drivingLessonResponse] = await Promise.all([
          getEbookTopics(id),
          getLessons({ page: 1, limit: 100, status: "all", sortOrder: "desc" }),
        ]);
        const currentCourse = structure.data?.data?.course;
        if (!active) return;
        setCourse(currentCourse);
        setDrivingLessons(drivingLessonResponse.data?.data || []);
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

  const visibleLessons = useMemo(() => lessons.filter((lesson) => filter === "all" || (filter === "progress" && ["in-progress", "in_progress"].includes(lesson.progress?.status)) || (filter === "completed" && lesson.progress?.status === "completed")), [lessons, filter]);
  const inProgressLessons = useMemo(
    () => lessons.filter((lesson) => ["in-progress", "in_progress"].includes(lesson.progress?.status)),
    [lessons],
  );
  const activeDrivingLessons = useMemo(
    () => drivingLessons.filter((lesson) => ACTIVE_LESSON_STATUSES.includes(lesson.status)),
    [drivingLessons],
  );
  const completedDrivingLessons = useMemo(
    () => drivingLessons.filter((lesson) => lesson.status === "completed"),
    [drivingLessons],
  );
  const completedEbookLessons = useMemo(
    () => lessons.filter((lesson) => lesson.progress?.status === "completed"),
    [lessons],
  );
  const progressItems = activeDrivingLessons.length ? activeDrivingLessons : inProgressLessons;
  const completedItems = completedDrivingLessons.length ? completedDrivingLessons : completedEbookLessons;
  const cardItems = filter === "completed" ? completedItems : progressItems;
  const progressPages = Math.max(Math.ceil(cardItems.length / PROGRESS_PAGE_SIZE), 1);
  const visibleProgressLessons = cardItems.slice(
    progressPage * PROGRESS_PAGE_SIZE,
    progressPage * PROGRESS_PAGE_SIZE + PROGRESS_PAGE_SIZE,
  );
  const topicById = useMemo(
    () => Object.fromEntries(topics.map((topic) => [topic._id, topic])),
    [topics],
  );
  const videos = lessons.flatMap((lesson) => (lesson.videos || []).map((video) => ({ ...video, lesson })));
  const materials = lessons.flatMap((lesson) => (lesson.materials || []).map((material) => ({ ...material, lesson })));

  return <main className="min-h-screen bg-white px-3 py-6 sm:px-6"><div className="mx-auto max-w-[1084px]">
    <header className="flex items-center gap-4"><button onClick={() => router.back()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8edf5]"><IoChevronBack size={25} /></button><h1 className="break-words text-xl font-semibold text-[#173f87] sm:text-2xl">{course?.title || "Code eBook Course"}</h1></header>
    {error && <p className="mt-8 rounded-xl bg-red-50 p-5 text-sm font-semibold text-red-700">{error}</p>}
    <section className="mt-8 rounded-xl bg-[#e8eef7] p-4 sm:p-5">
      {["progress", "completed"].includes(filter) && <p className="mb-5 text-[17px] font-semibold text-[#173f87]">Total {String(cardItems.length).padStart(2, "0")} Topics</p>}
      <div className="flex flex-wrap gap-2">{[["all","All"],["progress","In Progress"],["completed","Completed"]].map(([key,label]) => <button key={key} onClick={() => { setFilter(key); setProgressPage(0); }} className={`rounded-xl px-6 py-2.5 text-xs font-bold ${filter === key ? "border border-[#174a9b] bg-[#bdd5fa] text-[#173f87]" : "border border-transparent bg-[#e7edf6] text-slate-800"}`}>{label}</button>)}<button type="button" onClick={() => { window.location.href = "https://app.klaxo.fr/mon-compte/connecter"; }} className="rounded-xl border border-transparent bg-[#e7edf6] px-6 py-2.5 text-xs font-bold text-slate-800">Exam</button></div>
      {loading ? <div className="mt-6 h-72 animate-pulse rounded-xl bg-white" /> : ["progress", "completed"].includes(filter) ? (
        <section className="mt-6">
          <div className="mb-5 flex justify-end gap-3">
            <button type="button" aria-label="Previous page" disabled={progressPage === 0} onClick={() => setProgressPage((page) => page - 1)} className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e1e8f2] text-[#e3263c] disabled:cursor-not-allowed disabled:opacity-40"><IoArrowBack size={20}/></button>
            <button type="button" aria-label="Next page" disabled={progressPage + 1 >= progressPages} onClick={() => setProgressPage((page) => page + 1)} className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e3263c] text-white disabled:cursor-not-allowed disabled:opacity-40"><IoArrowForward size={20}/></button>
          </div>
          {visibleProgressLessons.length ? <div className="grid gap-6 lg:grid-cols-3">
            {visibleProgressLessons.map((lesson) => {
              const isDrivingLesson = Boolean(lesson.lessonDate);
              const statusProgress = { scheduled: 20, in_progress: 50, awaiting_confirmation: 80, completed: 100 };
              const percentage = isDrivingLesson
                ? statusProgress[lesson.status] || 20
                : Math.max(0, Math.min(Number(lesson.progress?.readPercent || 0), 100));
              const vehicleType = lesson.booking?.vehicleType
                ? lesson.booking.vehicleType.charAt(0).toUpperCase() + lesson.booking.vehicleType.slice(1)
                : "Not set";
              return <Link key={lesson._id} href={isDrivingLesson ? `/student/lessons/${lesson._id}` : `/student/code/code-ebook/lesson/${lesson._id}`} className="rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <h2 className="truncate text-[17px] font-bold text-[#173f87] underline">{isDrivingLesson ? (lesson.booking?.offer?.title || "City Driving Practice") : lesson.title}</h2>
                <p className="mt-3 text-xs text-slate-600">Start Date: <b className="text-slate-800">{formatProgressDate(isDrivingLesson ? lesson.lessonDate : lesson.progress?.createdAt || lesson.progress?.lastViewedAt || lesson.createdAt)}</b></p>
                <p className="mt-2 text-xs text-slate-600">Duration <b className="text-slate-800">{isDrivingLesson ? lesson.duration : lesson.readMinutes || 0} Minutes</b></p>
                {isDrivingLesson ? <>
                  <p className="mt-2 truncate text-xs text-slate-600">Vehicle Type: <b className="text-slate-800">{vehicleType}</b></p>
                  <p className="mt-2 truncate text-xs text-slate-600">Instructor: <b className="text-[#173f87]">{lesson.teacher?.name || "Not assigned"}</b></p>
                </> : <p className="mt-2 truncate text-xs text-slate-600">Topic: <b className="text-[#173f87]">{topicById[lesson.topicId]?.title || "Code eBook"}</b></p>}
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#d9e0eb]"><div className="h-full rounded-full bg-[#174596]" style={{ width: `${percentage}%` }}/></div>
                <p className="mt-2 text-xs font-semibold text-[#24aa4b]">{percentage}% {filter === "completed" ? "Completed" : "Progress"}</p>
              </Link>;
            })}
          </div> : <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center text-sm text-slate-500">No {filter === "completed" ? "completed" : "in-progress"} lessons found.</div>}
        </section>
      ) : topics.map((topic) => {
        const topicLessons = visibleLessons.filter((lesson) => lesson.topicId === topic._id);
        return <section key={topic._id} className="mt-7"><h2 className="text-lg font-bold text-[#173f87]">{topic.title}</h2><p className="mt-1 text-xs text-slate-500">{String(topicLessons.length).padStart(2,"0")} Courses</p><div className="mt-4 space-y-3">{topicLessons.map((lesson) => <Link key={lesson._id} href={`/student/code/code-ebook/lesson/${lesson._id}`} className="flex min-h-[66px] items-center justify-between rounded-xl bg-white px-5 py-4 text-sm text-[#4f535c]"><span>{lesson.title}</span><IoChevronForward /></Link>)}{!topicLessons.length && <div className="rounded-xl border border-dashed border-slate-300 px-5 py-6 text-center text-xs text-slate-500">No {filter === "all" ? "" : filter.replace("_"," ")} lesson in this topic.</div>}</div></section>;
      })}
    </section>
    <div className="mt-5 grid gap-5 lg:grid-cols-2"><Resource title="Lesson Videos">{videos.map((video,index) => <a key={`${video.url}-${index}`} href={video.url} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-xl bg-white p-3"><img src={video.thumbnail ? mediaUrl(video.thumbnail) : mediaUrl(video.lesson.coverImage)} alt="" className="h-20 w-24 rounded-lg object-cover"/><div><h3 className="font-bold">{video.title}</h3><p className="mt-2 flex items-center gap-1 text-sm text-slate-500"><IoTime className="text-[#174a9b]"/>{video.durationMinutes || 0} minutes</p></div></a>)}</Resource><Resource title="Training Materials">{materials.map((material,index) => <a key={`${material.fileUrl}-${index}`} href={mediaUrl(material.fileUrl)} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl bg-white p-4"><div><h3 className="font-bold">{material.title}</h3><p className="mt-2 flex items-center gap-1 text-sm text-slate-500"><IoTime className="text-[#174a9b]"/>{material.readMinutes || 0} minutes read</p></div><span className="rounded-lg border border-[#174a9b] px-5 py-2 text-xs font-bold text-[#174a9b]">Download</span></a>)}</Resource></div>
  </div></main>;
}

function Resource({ title, children }) { return <section className="rounded-xl bg-[#e8eef7] p-5"><h2 className="text-xl font-bold">{title}</h2><div className="mt-5 space-y-3">{children?.length ? children : <p className="rounded-xl bg-white p-6 text-sm text-slate-500">Nothing added yet.</p>}</div></section>; }
