"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack, IoArrowForward, IoChevronBack } from "react-icons/io5";

import { getMyQuizAttempts, getMyTopicResults } from "@/features/API";

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

export default function MyHistoryPage() {
  const router = useRouter();
  const [attempts, setAttempts] = useState([]);
  const [topicResults, setTopicResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    let active = true;
    Promise.all([getMyQuizAttempts(), getMyTopicResults()])
      .then(([attemptResponse, topicResponse]) => {
        if (!active) return;
        setAttempts(attemptResponse.data?.data || []);
        const map = {};
        (topicResponse.data?.data || []).forEach((item) => { map[item.code] = item; });
        setTopicResults(map);
      })
      .catch((requestError) => { if (active) setError(requestError.response?.data?.message || requestError.message || "Quiz history could not be loaded."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const completed = useMemo(() => attempts.filter((item) => item.status === "completed").sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)), [attempts]);
  const visible = completed.slice(page * 3, page * 3 + 3);
  const totalPages = Math.max(Math.ceil(completed.length / 3), 1);
  const latest = completed[0];
  const summary = useMemo(() => ({
    average: completed.length ? Math.round(completed.reduce((sum, item) => sum + Number(item.percentage || 0), 0) / completed.length) : 0,
    passed: completed.filter((item) => item.passed).length,
  }), [completed]);

  const download = () => {
    const rows = [["Quiz", "Date", "Score", "Correct", "Wrong", "Status"], ...completed.map((item) => [item.quiz?.title || "Quiz", item.createdAt, `${item.score || 0}/${item.totalQuestions || 0}`, item.correctCount || 0, item.wrongCount || 0, item.passed ? "Passed" : "Failed"])];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "quiz-history.csv"; anchor.click(); URL.revokeObjectURL(url);
  };

  return <main className="min-h-screen bg-white px-3 py-6 sm:px-6">
    <div className="mx-auto w-full max-w-[1084px]">
      <header className="flex h-11 items-center justify-between">
        <div className="flex items-center gap-4"><button type="button" onClick={() => router.back()} className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8edf5] text-black"><IoChevronBack size={25} /></button><h1 className="text-[25px] font-semibold text-[#173f87]">My History</h1></div>
        <button type="button" disabled={!completed.length} onClick={download} className="h-10 rounded-lg bg-[#dc2338] px-5 text-xs font-bold text-white disabled:opacity-50">Download</button>
      </header>

      {error && <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}

      <section className="mt-8 rounded-2xl bg-[#e8eef7] p-5">
        <div className="mb-4 flex items-center justify-between"><h2 className="text-[21px] font-bold text-[#123f88]">Quiz History</h2><div className="flex gap-4"><button type="button" disabled={page === 0} onClick={() => setPage((value) => value - 1)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dce6f4] text-[#e3263c] disabled:opacity-40"><IoArrowBack /></button><button type="button" disabled={page + 1 >= totalPages} onClick={() => setPage((value) => value + 1)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e3263c] text-white disabled:opacity-40"><IoArrowForward /></button></div></div>
        <div className="grid gap-5 lg:grid-cols-3">
          {loading ? Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-[190px] animate-pulse rounded-xl bg-white" />) : visible.length ? visible.map((attempt) => <article key={attempt._id} className="flex min-h-[190px] flex-col rounded-xl bg-white p-5 shadow-[0_2px_8px_rgba(13,69,152,0.05)]">
            <div className="flex items-start justify-between gap-3"><Link href={`/student/code/results?attemptId=${attempt._id}`} className="line-clamp-2 text-[16px] font-bold leading-6 text-[#123f88] hover:underline">{attempt.quiz?.title || "Quiz Series"}</Link><span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${attempt.passed ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{attempt.passed ? "Passed" : "Failed"}</span></div>
            <p className="mt-2 text-xs font-medium text-slate-500">{formatDate(attempt.createdAt)}</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center"><div className="rounded-lg bg-slate-50 p-2"><b className="block text-[#173f87]">{attempt.score || 0}/{attempt.totalQuestions || 0}</b><span className="text-[10px] text-slate-500">Score</span></div><div className="rounded-lg bg-green-50 p-2"><b className="block text-green-700">{attempt.correctCount || 0}</b><span className="text-[10px] text-slate-500">Correct</span></div><div className="rounded-lg bg-red-50 p-2"><b className="block text-red-700">{attempt.wrongCount || 0}</b><span className="text-[10px] text-slate-500">Wrong</span></div></div>
            <div className="mt-auto pt-4"><div className="h-2.5 overflow-hidden rounded-full bg-[#d9e2f0]"><div className="h-full rounded-full bg-[#17479a]" style={{ width: `${attempt.percentage || 0}%` }} /></div><p className="mt-1 text-right text-[11px] font-bold text-[#173f87]">{attempt.percentage || 0}%</p></div>
          </article>) : <div className="col-span-3 rounded-xl bg-white p-10 text-center text-sm text-slate-500">No completed quiz history yet.</div>}
        </div>
      </section>

      <section className="mt-8 grid gap-5 rounded-2xl bg-[#e8eef7] p-5 lg:grid-cols-2">
        <article className="rounded-xl bg-white p-5"><h2 className="text-[20px] font-bold">Total Quiz Performance</h2><p className="mt-2 text-sm text-slate-500">Your overall performance across completed quizzes.</p><div className="mt-5 grid grid-cols-3 gap-2"><div className="rounded-lg bg-blue-50 p-3 text-center"><b className="block text-xl text-[#173f87]">{summary.average}%</b><span className="text-[10px] text-slate-500">Average</span></div><div className="rounded-lg bg-slate-50 p-3 text-center"><b className="block text-xl">{completed.length}</b><span className="text-[10px] text-slate-500">Attempts</span></div><div className="rounded-lg bg-green-50 p-3 text-center"><b className="block text-xl text-green-700">{summary.passed}</b><span className="text-[10px] text-slate-500">Passed</span></div></div><Link href="/student/code/simple-series-list" className="mt-5 inline-flex rounded-lg bg-[#dc2338] px-3 py-2 text-xs font-bold text-white">Take Practice Test</Link></article>
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
