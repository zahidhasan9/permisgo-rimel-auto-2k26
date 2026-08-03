"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCaretDown } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";

import { getLessons, getMyBookletSkills, getStudentProfile } from "@/features/API";
import { getLessonLocation, unwrap } from "@/features/lessonHelpers";
import { BOOKLET_GROUPS } from "@/constants/bookletSkills";

const categories = [
  { code: "C1", title: "MASTERING", bg: "#AFC8F4", border: "#2869E8", bar: "#2869E8" },
  { code: "C2", title: "To Understand", bg: "#F4A5AF", border: "#F0182D", bar: "#F0182D" },
  { code: "C3", title: "Driving", bg: "#EFD9A1", border: "#C99E35", bar: "#D2AD43" },
  { code: "C4", title: "Practice", bg: "#91DFAF", border: "#05A850", bar: "#05A850" },
];

const skillGroups = BOOKLET_GROUPS;

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
  const [skillAssessments, setSkillAssessments] = useState([]);
  const [showReports, setShowReports] = useState(false);
  const [openSkillGroup, setOpenSkillGroup] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.allSettled([
      getLessons({ page: 1, limit: 100, status: "all", sortOrder: "desc" }),
      getStudentProfile(),
      getMyBookletSkills(),
    ])
      .then(([lessonResult, profileResult, skillResult]) => {
        if (!active) return;
        if (lessonResult.status === "fulfilled") setLessons(Array.isArray(unwrap(lessonResult.value, [])) ? unwrap(lessonResult.value, []) : []);
        if (profileResult.status === "fulfilled") setProfile(unwrap(profileResult.value));
        if (skillResult.status === "fulfilled") setSkillAssessments(Array.isArray(unwrap(skillResult.value, [])) ? unwrap(skillResult.value, []) : []);
        const failed = [lessonResult, profileResult, skillResult].find((result) => result.status === "rejected");
        if (failed) setError(failed.reason?.response?.data?.message || "Some booklet data could not be loaded. Please refresh.");
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
    () => [...new Set([...completed.flatMap((lesson) => lesson.lessonProgress?.skillsCovered || []), ...skillAssessments.map((item) => item.skill)])],
    [completed, skillAssessments],
  );
  const skillStatus = useMemo(() => ({ ...Object.fromEntries(coveredSkills.map((skill) => [skill, "acquired"])), ...Object.fromEntries(skillAssessments.map((item) => [item.skill, item.status])) }), [coveredSkills, skillAssessments]);
  const groupedSkills = useMemo(() => {
    return skillGroups.map((group) => {
      const standard = [...group.skills];
      const extras = skillAssessments.filter((item) => item.category === group.code && !standard.includes(item.skill)).map((item) => item.skill);
      return [...standard, ...extras];
    });
  }, [skillAssessments]);
  const categoryPercentages = useMemo(() => groupedSkills.map((skills) => skills.length ? Math.round((skills.filter((skill) => skillStatus[skill] === "acquired").length / skills.length) * 100) : 0), [groupedSkills, skillStatus]);

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
        {categories.map((item, index) => <button type="button" key={item.code} onClick={() => { setOpenSkillGroup(index); window.setTimeout(() => document.getElementById(`student-skill-group-${index}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 0); }} className="rounded-xl border p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#174a9b]" style={{ backgroundColor: item.bg, borderColor: item.border }}><div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white font-bold text-[#174a9b]">{item.code}</div><h3 className="mt-3 text-center text-sm font-bold text-[#174a9b]">{item.title}</h3><p className="mt-1 text-center text-[10px] text-slate-600">{skillGroups[index].text}</p><div className="mt-4 overflow-hidden rounded-full bg-white"><div className="h-3 rounded-full" style={{ width: `${categoryPercentages[index]}%`, backgroundColor: item.bar }} /></div><p className="mt-2 text-center text-xs font-bold">{categoryPercentages[index]}% Completed · View skills</p></button>)}
      </section>

      <section id="booklet-skills" className="mt-5 scroll-mt-4 rounded-xl bg-[#e8eef7] p-5">
        <div className="flex items-center justify-between gap-4"><h2 className="text-xl font-bold text-[#174a9b]">Skills</h2><p className="text-sm font-bold text-green-600">{completedHours.toFixed(completedHours % 1 ? 1 : 0)} hours Completed</p></div>
        <div className="mt-5 rounded-xl bg-white p-4 sm:p-5">
          <div className="space-y-3">{skillGroups.map((group, index) => {
            const open = openSkillGroup === index;
            const skills = groupedSkills[index];
            return <section id={`student-skill-group-${index}`} key={group.title} className="scroll-mt-4 overflow-hidden rounded-xl bg-[#e8eef7]">
              <button type="button" onClick={() => setOpenSkillGroup(open ? -1 : index)} aria-expanded={open} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-sm"><span><b>{group.title}</b> {group.text}</span><FaCaretDown className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} /></button>
              {open && <div className="mx-4 mb-4 space-y-3 rounded-xl bg-white p-3 sm:mx-5 sm:p-4">
                {skills.length ? skills.map((skill) => <div key={skill} className="grid items-center gap-3 rounded-lg bg-[#f8fafc] p-3 sm:grid-cols-[1fr_150px_150px_165px]">
                  <p className="text-xs text-slate-600">{skill}</p>
                  <span className={`rounded-lg px-4 py-2 text-center text-xs ${skillStatus[skill] === "not_acquired" || !skillStatus[skill] ? "bg-slate-600 font-semibold text-white" : "bg-[#e8eef7] text-slate-500"}`}>Not acquired</span>
                  <span className={`rounded-lg px-4 py-2 text-center text-xs ${skillStatus[skill] === "to_work" ? "bg-amber-500 font-semibold text-white" : "bg-[#e8eef7] text-slate-500"}`}>To work</span>
                  <span className={`rounded-lg px-4 py-2 text-center text-xs font-semibold ${skillStatus[skill] === "acquired" ? "bg-[#174a9b] text-white" : "bg-[#e8eef7] text-slate-500"}`}>Acquired</span>
                </div>) : <p className="p-4 text-center text-sm text-slate-500">No skill recorded in this category yet.</p>}
              </div>}
            </section>;
          })}</div>
        </div>
      </section>
    </main>
  );
}

function Row({ label, value }) {
  return <div className="flex flex-wrap gap-2"><b className="min-w-[120px] text-slate-900">{label}:</b><span>{value}</span></div>;
}
