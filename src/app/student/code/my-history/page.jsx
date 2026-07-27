"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack, IoArrowForward, IoChevronBack } from "react-icons/io5";

import { getLearningContents, getLessons, getMyQuizAttempts, getMyTopicResults } from "@/features/API";

const topics = [
  ["L", "Legal provisions regarding road traffic", "#67B4E3"], ["HAS", "First aid", "#EF2F2B"],
  ["C", "The Driver", "#E60087"], ["P", "Precautions to take when leaving the vehicle", "#555553"],
  ["R", "The Road", "#AAA2CC"], ["M", "Mechanical components and other safety-related equipment", "#F79500"],
  ["U", "Other road users", "#DA4E2D"], ["S", "Vehicle safety equipment", "#40962D"],
  ["D", "General regulations and miscellaneous", "#FDBA12"], ["E", "Rules for using the vehicle in relation to ecology", "#91A719"],
];

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(date);
};

function TopicBar({ topic, result }) {
  const percentage = Number(result?.percentage || 0);
  return <div className="relative h-[45px] overflow-hidden rounded-md bg-white">
    <div className="absolute inset-y-0 left-0 rounded-md opacity-95 transition-[width] duration-500" style={{ width: `${percentage}%`, backgroundColor: topic[2] }} />
    <div className="absolute inset-0 flex items-center justify-between px-4 text-[17px] font-bold"><span style={{ color: percentage >= 25 ? "white" : topic[2] }}>{topic[0]}</span><span className={percentage >= 25 ? "text-white" : "text-[#173f87]"}>{percentage}%</span></div>
  </div>;
}

function LessonHistorySection({ title, items, page, setPage, loading, completed }) {
  const pageSize = 3;
  const pages = Math.max(Math.ceil(items.length / pageSize), 1);
  const visibleItems = items.slice(page * pageSize, page * pageSize + pageSize);
  return <section className="mt-8 rounded-xl bg-[#e8eef7] p-5">
    <div className="mb-5 flex items-center justify-between"><h2 className="text-[20px] font-bold text-[#123f88]">{title}</h2><div className="flex gap-3"><button type="button" disabled={page === 0} onClick={() => setPage((value) => value - 1)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#dce6f4] text-[#e3263c] disabled:opacity-40"><IoArrowBack /></button><button type="button" disabled={page + 1 >= pages} onClick={() => setPage((value) => value + 1)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e3263c] text-white disabled:opacity-40"><IoArrowForward /></button></div></div>
    <div className="grid gap-5 lg:grid-cols-3">{loading ? Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-[155px] animate-pulse rounded-xl bg-white"/>) : visibleItems.length ? visibleItems.map((lesson) => {
      const progress = completed ? 100 : Math.max(Math.min(Number(lesson.progress?.readPercent || 0), 100), 0);
      return <Link key={`${lesson.historyType || "ebook"}-${lesson._id}`} href={lesson.historyHref || `/student/code/code-ebook/lesson/${lesson._id}`} className="rounded-xl bg-white p-5 shadow-sm"><h3 className="truncate text-[15px] font-bold text-[#123f88] underline">{lesson.title}</h3><p className="mt-3 text-[11px] text-slate-600">Start Date: {formatDate(lesson.progress?.createdAt || lesson.createdAt)}</p><p className="mt-1 text-[11px] text-slate-600">Duration {lesson.readMinutes || 0} Minutes</p><div className="mt-5 h-3 overflow-hidden rounded-full bg-[#d8e0ec]"><div className="h-full rounded-full bg-[#174596]" style={{ width: `${progress}%` }}/></div><p className={`mt-2 text-[11px] font-semibold ${completed ? "text-green-600" : "text-[#24a84a]"}`}>{progress}% {completed ? "Completed" : "Progress"}</p></Link>;
    }) : <div className="col-span-3 rounded-xl bg-white p-8 text-center text-sm text-slate-500">No {title.toLowerCase()} yet.</div>}</div>
  </section>;
}

export default function MyHistoryPage() {
  const router = useRouter();
  const [attempts, setAttempts] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [drivingLessons, setDrivingLessons] = useState([]);
  const [topicResults, setTopicResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [progressPage, setProgressPage] = useState(0);
  const [completedPage, setCompletedPage] = useState(0);

  useEffect(() => {
    let active = true;
    Promise.all([
      getMyQuizAttempts(),
      getMyTopicResults(),
      getLearningContents({ type: "code-ebook" }),
      getLessons({ status: "completed", page: 1, limit: 100, sortOrder: "desc" }),
    ])
      .then(([attemptResponse, topicResponse, lessonResponse, drivingLessonResponse]) => {
        if (!active) return;
        setAttempts(attemptResponse.data?.data || []);
        setLessons(lessonResponse.data?.data || []);
        setDrivingLessons(drivingLessonResponse.data?.data || []);
        const map = {};
        (topicResponse.data?.data || []).forEach((item) => { map[item.code] = item; });
        setTopicResults(map);
      })
      .catch((requestError) => { if (active) setError(requestError.response?.data?.message || requestError.message || "Quiz history could not be loaded."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const completed = useMemo(() => attempts.filter((item) => item.status === "completed").sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)), [attempts]);
  const latest = completed[0];
  const lessonsInProgress = useMemo(() => lessons.filter((item) => item.progress && item.progress.status !== "completed"), [lessons]);
  const lessonsCompleted = useMemo(() => {
    const ebookLessons = lessons.filter((item) => item.progress?.status === "completed");
    const completedDrivingLessons = drivingLessons.map((item) => ({
      ...item,
      historyType: "driving",
      historyHref: `/student/lessons/${item._id}`,
      title: item.booking?.offer?.title || "Driving Lesson",
      readMinutes: item.duration || 0,
      createdAt: item.completedAt || item.lessonDate || item.createdAt,
      progress: {
        status: "completed",
        readPercent: 100,
        createdAt: item.completedAt || item.lessonDate || item.createdAt,
      },
    }));

    return [...completedDrivingLessons, ...ebookLessons].sort(
      (a, b) =>
        new Date(b.progress?.createdAt || b.createdAt) -
        new Date(a.progress?.createdAt || a.createdAt),
    );
  }, [drivingLessons, lessons]);
  const summary = useMemo(() => ({
    average: completed.length ? Math.round(completed.reduce((sum, item) => sum + Number(item.percentage || 0), 0) / completed.length) : 0,
    passed: completed.filter((item) => item.passed).length,
  }), [completed]);

  const download = () => {
    const rows = [["Type", "Title", "Date", "Progress / Score", "Status"], ...lessons.map((item) => ["Code eBook Lesson", item.title, item.progress?.lastViewedAt || item.createdAt, `${item.progress?.readPercent || 0}%`, item.progress?.status || "not started"]), ...drivingLessons.map((item) => ["Driving Lesson", item.booking?.offer?.title || "Driving Lesson", item.completedAt || item.lessonDate, "100%", "completed"]), ...completed.map((item) => ["Quiz", item.quiz?.title || "Quiz", item.createdAt, `${item.score || 0}/${item.totalQuestions || 0}`, item.passed ? "Passed" : "Failed"])];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "quiz-history.csv"; anchor.click(); URL.revokeObjectURL(url);
  };

  return <main className="min-h-screen bg-white px-3 py-6 sm:px-6">
    <div className="mx-auto w-full ">
      <header className="flex h-11 items-center justify-between">
        <div className="flex items-center gap-4"><button type="button" onClick={() => router.back()} className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8edf5] text-black"><IoChevronBack size={25} /></button><h1 className="text-[25px] font-semibold text-[#173f87]">My History</h1></div>
        <button type="button" disabled={!completed.length && !lessons.length && !drivingLessons.length} onClick={download} className="h-10 rounded-lg bg-[#dc2338] px-5 text-xs font-bold text-white disabled:opacity-50">Download</button>
      </header>

      {error && <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}

      <LessonHistorySection title="Lesson Progress" items={lessonsInProgress} page={progressPage} setPage={setProgressPage} loading={loading} completed={false} />
      <LessonHistorySection title="Lesson Completed" items={lessonsCompleted} page={completedPage} setPage={setCompletedPage} loading={loading} completed />

      <section className="mt-8 grid gap-5 rounded-2xl bg-[#e8eef7] p-5 lg:grid-cols-2">
        <article className="rounded-xl bg-white p-5"><h2 className="text-[20px] font-bold">Total Performance in All Tests</h2><p className="mt-2 text-sm text-slate-500">See your overall score and track your progress in traffic rules knowledge.</p><div className="mt-5 grid grid-cols-3 gap-2"><div className="rounded-lg bg-blue-50 p-3 text-center"><b className="block text-xl text-[#173f87]">{summary.average}%</b><span className="text-[10px] text-slate-500">Score</span></div><div className="rounded-lg bg-slate-50 p-3 text-center"><b className="block text-xl">{completed.length}</b><span className="text-[10px] text-slate-500">Tests</span></div><div className="rounded-lg bg-green-50 p-3 text-center"><b className="block text-xl text-green-700">{summary.passed}</b><span className="text-[10px] text-slate-500">Passed</span></div></div><Link href="/student/code/simple-series-list" className="mt-5 inline-flex rounded-lg bg-[#dc2338] px-3 py-2 text-xs font-bold text-white">Take Practice Test</Link></article>
        <article className="rounded-xl bg-white p-5"><h2 className="text-[20px] font-bold">Recent Quiz Result</h2><p className="mt-2 text-sm text-slate-500">Your latest completed quiz result.</p><div className="mt-5 rounded-xl bg-slate-50 p-4"><div className="flex items-center justify-between"><span className="text-sm text-slate-500">Latest score</span><b className="text-2xl text-[#173f87]">{latest?.percentage || 0}%</b></div><div className="mt-3 flex justify-between text-sm"><span>Correct: <b className="text-green-700">{latest?.correctCount || 0}/{latest?.totalQuestions || 0}</b></span><span className={latest?.passed ? "text-green-700" : "text-red-700"}>{latest ? (latest.passed ? "Passed" : "Failed") : "No result"}</span></div></div>{latest && <Link href={`/student/code/results?attemptId=${latest._id}`} className="mt-5 inline-flex rounded-lg bg-[#dc2338] px-3 py-2 text-xs font-bold text-white">Review Answers</Link>}</article>
      </section>

      <section className="mt-8 rounded-2xl bg-[#e8eef7] p-5">
        <h2 className="text-[21px] font-bold text-[#123f88]">My result by topic</h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-2"><div className="space-y-5">{[0,2,4,6,8].map((index) => <TopicBar key={topics[index][0]} topic={topics[index]} result={topicResults[topics[index][0]]} />)}</div><div className="space-y-5">{[1,3,5,7,9].map((index) => <TopicBar key={topics[index][0]} topic={topics[index]} result={topicResults[topics[index][0]]} />)}</div></div>
        <div className="mt-5 rounded-xl bg-white p-5"><h3 className="mb-5 text-[15px] font-bold text-[#123f88]">List of topics:</h3><div className="grid gap-x-8 gap-y-5 lg:grid-cols-2">{topics.map((topic) => <p key={topic[0]} className="text-sm text-slate-500"><b className="mr-2 text-[18px]" style={{ color: topic[2] }}>{topic[0]} :</b>{topic[1]}</p>)}</div></div>
      </section>
    </div>
  </main>;
}
