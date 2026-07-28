"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCaretDown } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";

import { getLessons, getStudentProfile } from "@/features/API";
import { getLessonLocation, unwrap } from "@/features/lessonHelpers";

const categories = [
  { code: "C1", title: "MASTERING", bg: "#AFC8F4", border: "#2869E8", bar: "#2869E8" },
  { code: "C2", title: "To Understand", bg: "#F4A5AF", border: "#F0182D", bar: "#F0182D" },
  { code: "C3", title: "Driving", bg: "#EFD9A1", border: "#C99E35", bar: "#D2AD43" },
  { code: "C4", title: "Practice", bg: "#91DFAF", border: "#05A850", bar: "#05A850" },
];

const skillGroups = [
  ["MASTERING", "vehicle handling in light or no traffic"],
  ["To understand", "the road and drive under normal conditions"],
  ["Driving", "in difficult conditions and sharing the road with other users"],
  ["Practice", "autonomous, safe and economical driving"],
];

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

export default function LearningBookletPage() {
  const router = useRouter();
  const [lessons, setLessons] = useState([]);
  const [profile, setProfile] = useState(null);
  const [showReports, setShowReports] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([
      getLessons({ page: 1, limit: 100, status: "all", sortOrder: "desc" }),
      getStudentProfile(),
    ])
      .then(([lessonResponse, profileResponse]) => {
        if (!active) return;
        setLessons(Array.isArray(unwrap(lessonResponse, [])) ? unwrap(lessonResponse, []) : []);
        setProfile(unwrap(profileResponse));
      })
      .catch((requestError) => {
        if (active) setError(requestError.response?.data?.message || "Learning booklet could not be loaded.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const completed = useMemo(
    () => lessons.filter((lesson) => lesson.status === "completed"),
    [lessons],
  );
  const latest = completed[0] || lessons[0];
  const completedHours = useMemo(
    () => completed.reduce((total, lesson) => total + Number(lesson.duration || 0), 0) / 60,
    [completed],
  );
  const targetHours = 20;
  const percentage = Math.min(Math.round((completedHours / targetHours) * 100), 100);
  const coveredSkills = useMemo(
    () => [...new Set(completed.flatMap((lesson) => lesson.lessonProgress?.skillsCovered || []))],
    [completed],
  );

  return (
    <main className="min-h-screen bg-white px-3 py-6 sm:px-6">
      <header className="flex items-start gap-4">
        <button type="button" onClick={() => router.back()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef2f8]"><IoChevronBack size={25} /></button>
        <div><h1 className="text-[25px] font-bold text-[#174a9b]">Learning booklet</h1><p className="mt-2 text-sm text-slate-500">Track your real driving lessons, reports and acquired skills.</p></div>
      </header>

      {error && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}

      <section className="mt-8 rounded-xl bg-[#e8eef7] p-5">
        <h2 className="text-xl font-bold text-[#174a9b]">Your learning booklet</h2>
        <div className="mt-4 flex flex-wrap gap-4 text-sm"><p className="rounded-lg bg-white px-4 py-3">NEPH: <b>{profile?.nephNumber || "Not provided"}</b></p><p className="rounded-lg bg-white px-4 py-3">Completed lessons: <b>{completed.length}</b></p><p className="rounded-lg bg-white px-4 py-3">Completed hours: <b>{completedHours.toFixed(completedHours % 1 ? 1 : 0)}</b></p></div>
      </section>

      <section className="mt-5 rounded-xl bg-[#e8eef7] p-5">
        <h2 className="text-xl font-bold text-[#174a9b]">Tracking Sheet</h2>
        {loading ? <div className="mt-5 h-44 animate-pulse rounded-xl bg-white" /> : latest ? (
          <div className="mt-5 rounded-xl bg-white p-5">
            <div className="grid gap-3 text-sm text-slate-600"><Row label="Date" value={`${formatDate(latest.lessonDate)} · ${latest.duration || 0} minutes`} /><Row label="Location" value={getLessonLocation(latest)} /><Row label="Teacher" value={latest.teacher?.name || "Instructor"} /><Row label="Lesson summary" value={latest.lessonProgress?.teacherNotes || "No teacher report submitted yet."} /></div>
            <button type="button" onClick={() => setShowReports(!showReports)} className="mt-5 flex w-full items-center justify-between rounded-xl bg-[#e8eef7] px-5 py-4 font-semibold text-[#174a9b]">Previous reports <FaCaretDown className={`transition ${showReports ? "rotate-180" : ""}`} /></button>
            {showReports && <div className="mt-3 space-y-3">{completed.slice(1).map((lesson) => <div key={lesson._id} className="rounded-lg border border-slate-200 p-4 text-sm"><b>{formatDate(lesson.lessonDate)}</b><p className="mt-2 text-slate-500">{lesson.lessonProgress?.teacherNotes || `${lesson.duration || 0}-minute driving lesson`}</p></div>)}{completed.length <= 1 && <p className="p-4 text-center text-sm text-slate-500">No previous completed report.</p>}</div>}
          </div>
        ) : <div className="mt-5 rounded-xl bg-white p-8 text-center text-sm text-slate-500">No lesson has been booked yet.</div>}
      </section>

      <section className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {categories.map((item) => <div key={item.code} className="rounded-xl border p-5" style={{ backgroundColor: item.bg, borderColor: item.border }}><div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white font-bold text-[#174a9b]">{item.code}</div><h3 className="mt-3 text-center text-sm font-bold text-[#174a9b]">{item.title}</h3><div className="mt-4 overflow-hidden rounded-full bg-white"><div className="h-3 rounded-full" style={{ width: `${percentage}%`, backgroundColor: item.bar }} /></div><p className="mt-2 text-center text-xs font-bold">{percentage}% Completed</p></div>)}
      </section>

      <section className="mt-5 rounded-xl bg-[#e8eef7] p-5">
        <div className="flex items-center justify-between gap-4"><h2 className="text-xl font-bold text-[#174a9b]">Skills</h2><p className="text-sm font-bold text-green-600">{completedHours.toFixed(completedHours % 1 ? 1 : 0)} hours Completed</p></div>
        <div className="mt-5 rounded-xl bg-white p-5">
          <div className="space-y-3">{skillGroups.map(([title, text]) => <div key={title} className="rounded-xl bg-[#e8eef7] px-5 py-4 text-sm"><b>{title}</b> {text}</div>)}</div>
          <div className="mt-5"><h3 className="text-sm font-bold text-[#174a9b]">Skills recorded by your instructor</h3>{coveredSkills.length ? <div className="mt-3 flex flex-wrap gap-2">{coveredSkills.map((skill) => <span key={skill} className="rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">{skill}</span>)}</div> : <p className="mt-2 text-sm text-slate-500">No assessed skills recorded yet.</p>}</div>
        </div>
      </section>
    </main>
  );
}

function Row({ label, value }) {
  return <div className="flex flex-wrap gap-2"><b className="min-w-[120px] text-slate-900">{label}:</b><span>{value}</span></div>;
}
