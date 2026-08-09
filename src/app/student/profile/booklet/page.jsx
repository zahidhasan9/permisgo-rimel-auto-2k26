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
const STATUS_SCORE = { not_acquired: 0, to_work: 50, acquired: 100 };

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

const formatDuration = (minutesValue) => {
  const minutes = Number(minutesValue || 0);
  if (minutes < 60) return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  const hours = minutes / 60;
  const displayHours = Number.isInteger(hours) ? hours : Number(hours.toFixed(1));
  return `${displayHours} ${displayHours === 1 ? "hour" : "hours"}`;
};

export default function LearningBookletPage() {
  const router = useRouter();
  const [lessons, setLessons] = useState([]);
  const [profile, setProfile] = useState(null);
  const [skillAssessments, setSkillAssessments] = useState([]);
  const [showReports, setShowReports] = useState(true);
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
  const categoryPercentages = useMemo(() => groupedSkills.map((skills) => skills.length ? Math.round(skills.reduce((total, skill) => total + (STATUS_SCORE[skillStatus[skill]] || 0), 0) / skills.length) : 0), [groupedSkills, skillStatus]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-2.5 pb-24 pt-3 sm:px-6 sm:pb-8 sm:pt-6">
      <header className="flex min-w-0 items-start gap-2.5 sm:gap-4">
        <button type="button" onClick={() => router.back()} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#eef2f8] sm:h-11 sm:w-11 sm:rounded-xl"><IoChevronBack size={22} /></button>
        <div className="min-w-0"><h1 className="truncate text-lg font-bold text-[#174a9b] sm:text-[25px]">Learning booklet</h1><p className="mt-1 text-[10px] leading-4 text-slate-500 sm:mt-2 sm:text-sm">Track your real driving lessons, reports and acquired skills.</p></div>
      </header>

      {error && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}

      <section className="mt-4 min-w-0 rounded-xl bg-[#e8eef7] p-3 sm:mt-8 sm:p-5">
        <h2 className="text-base font-bold text-[#174a9b] sm:text-xl">Your learning booklet</h2>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] sm:mt-4 sm:flex sm:flex-wrap sm:gap-4 sm:text-sm"><p className="col-span-2 min-w-0 break-words rounded-lg bg-white px-3 py-2.5 sm:col-auto sm:px-4 sm:py-3">NEPH: <b>{profile?.nephNumber || "Not provided"}</b></p><p className="rounded-lg bg-white px-3 py-2.5 sm:px-4 sm:py-3">Completed lessons: <b className="block text-sm sm:inline">{completed.length}</b></p><p className="rounded-lg bg-white px-3 py-2.5 sm:px-4 sm:py-3">Completed hours: <b className="block text-sm sm:inline">{completedHours.toFixed(completedHours % 1 ? 1 : 0)}</b></p></div>
      </section>

      <section className="mt-3 min-w-0 rounded-xl bg-[#e8eef7] p-3 sm:mt-5 sm:p-5">
        <h2 className="text-base font-bold text-[#174a9b] sm:text-xl">Tracking Sheet</h2>
        {loading ? <div className="mt-5 h-44 animate-pulse rounded-xl bg-white" /> : latest ? (
          <div className="mt-3 rounded-xl bg-white p-3 sm:mt-5 sm:p-5">
            <div className="grid gap-3 text-sm text-slate-600"><Row label="Date" value={`${formatDate(latest.lessonDate)} · ${formatDuration(latest.duration)}`} /><Row label="Location" value={getLessonLocation(latest)} /><Row label="Teacher" value={latest.teacher?.name || "Instructor"} /><Row label="Lesson summary" value={latest.lessonProgress?.teacherNotes || "No teacher report submitted yet."} /></div>
          </div>
        ) : <div className="mt-5 rounded-xl bg-white p-8 text-center text-sm text-slate-500">No lesson has been booked yet.</div>}
      </section>

      <section className="mt-3 rounded-[12px] bg-[#E5ECF7] p-3 sm:mt-5 sm:px-5 sm:pb-5 sm:pt-[18px]">
        <button type="button" onClick={() => setShowReports((current) => !current)} className="flex w-full items-center justify-between text-left text-[17px] font-[500] leading-[22px] text-[#174A9B]">
          Previous reports
          <FaCaretDown className={`text-[17px] text-[#222] transition-transform ${showReports ? "rotate-180" : ""}`} />
        </button>

        {showReports && (
          <div className="mt-2.5 max-h-[520px] space-y-2.5 overflow-y-auto pr-0.5 sm:space-y-[15px]">
            {completed.map((lesson) => <ReportCard key={lesson._id} lesson={lesson} />)}
            {completed.length === 0 && <div className="rounded-[12px] bg-white px-5 py-8 text-center text-sm text-slate-500">No completed report.</div>}
          </div>
        )}
      </section>

      <section className="mt-3 flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-5 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible xl:grid-cols-4">
        {categories.map((item, index) => <button type="button" key={item.code} onClick={() => { setOpenSkillGroup(index); window.setTimeout(() => document.getElementById(`student-skill-group-${index}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 0); }} className="w-[78%] shrink-0 snap-start rounded-xl border p-3.5 text-left transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#174a9b] sm:w-auto sm:p-5" style={{ backgroundColor: item.bg, borderColor: item.border }}><div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-[#174a9b] sm:h-10 sm:w-10">{item.code}</div><h3 className="mt-2 text-center text-xs font-bold text-[#174a9b] sm:mt-3 sm:text-sm">{item.title}</h3><p className="mt-1 line-clamp-2 text-center text-[9px] text-slate-600 sm:text-[10px]">{skillGroups[index].text}</p><div className="mt-3 overflow-hidden rounded-full bg-white sm:mt-4"><div className="h-2.5 rounded-full sm:h-3" style={{ width: `${categoryPercentages[index]}%`, backgroundColor: item.bar }} /></div><p className="mt-2 text-center text-[10px] font-bold sm:text-xs">{categoryPercentages[index]}% Completed · View skills</p></button>)}
      </section>

      <section id="booklet-skills" className="mt-3 scroll-mt-4 rounded-xl bg-[#e8eef7] p-3 sm:mt-5 sm:p-5">
        <div className="flex items-center justify-between gap-3"><h2 className="text-base font-bold text-[#174a9b] sm:text-xl">Skills</h2><p className="text-right text-[10px] font-bold text-green-600 sm:text-sm">{completedHours.toFixed(completedHours % 1 ? 1 : 0)} hours Completed</p></div>
        <div className="mt-3 rounded-xl bg-white p-2.5 sm:mt-5 sm:p-5">
          <div className="space-y-3">{skillGroups.map((group, index) => {
            const open = openSkillGroup === index;
            const skills = groupedSkills[index];
            return <section id={`student-skill-group-${index}`} key={group.title} className="scroll-mt-4 overflow-hidden rounded-xl bg-[#e8eef7]">
              <button type="button" onClick={() => setOpenSkillGroup(open ? -1 : index)} aria-expanded={open} className="flex w-full items-center justify-between gap-3 px-3 py-3.5 text-left text-[11px] leading-4 sm:gap-4 sm:px-5 sm:py-5 sm:text-sm"><span><b>{group.title}</b> {group.text}</span><FaCaretDown className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} /></button>
              {open && <div className="mx-2 mb-2 space-y-2 rounded-xl bg-white p-2 sm:mx-5 sm:mb-4 sm:space-y-3 sm:p-4">
                {skills.length ? skills.map((skill) => <div key={skill} className="grid grid-cols-3 items-center gap-1.5 rounded-lg bg-[#f8fafc] p-2.5 sm:grid-cols-[1fr_150px_150px_165px] sm:gap-3 sm:p-3">
                  <p className="col-span-3 mb-1 text-[11px] leading-4 text-slate-600 sm:col-span-1 sm:mb-0 sm:text-xs">{skill}</p>
                  <span className={`rounded-lg px-1 py-2 text-center text-[9px] leading-3 sm:px-4 sm:text-xs ${skillStatus[skill] === "not_acquired" || !skillStatus[skill] ? "bg-slate-600 font-semibold text-white" : "bg-[#e8eef7] text-slate-500"}`}>Not acquired</span>
                  <span className={`rounded-lg px-1 py-2 text-center text-[9px] leading-3 sm:px-4 sm:text-xs ${skillStatus[skill] === "to_work" ? "bg-amber-500 font-semibold text-white" : "bg-[#e8eef7] text-slate-500"}`}>To work</span>
                  <span className={`rounded-lg px-1 py-2 text-center text-[9px] font-semibold leading-3 sm:px-4 sm:text-xs ${skillStatus[skill] === "acquired" ? "bg-[#174a9b] text-white" : "bg-[#e8eef7] text-slate-500"}`}>Acquired</span>
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
  return <div className="grid min-w-0 gap-1 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-2"><b className="text-slate-900">{label}:</b><span className="min-w-0 break-words">{value}</span></div>;
}

function ReportCard({ lesson }) {
  const durationLabel = formatDuration(lesson.duration);

  return (
    <article className="rounded-[12px] bg-white p-3.5 text-[11px] leading-[17px] text-[#66666D] sm:min-h-[164px] sm:px-5 sm:py-[19px] sm:text-[14px] sm:leading-5">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <strong className="text-[#171717]">Date:</strong>
        <span>{formatDate(lesson.lessonDate)}</span>
        <span className="rounded-[4px] bg-[#EEF2F8] px-[6px] py-[2px] text-[#174A9B]">{durationLabel}</span>
      </div>
      <p className="mt-2.5 break-words sm:mt-[14px]"><strong className="text-[#171717]">Location:</strong> {getLessonLocation(lesson)}</p>
      <p className="mt-2.5 break-words sm:mt-[14px]"><strong className="text-[#171717]">Teacher:</strong> {lesson.teacher?.name || "Instructor"}</p>
      <p className="mt-2.5 break-words sm:mt-[14px]"><strong className="text-[#171717]">Lesson summary:</strong> {lesson.lessonProgress?.teacherNotes || "No teacher report submitted yet."}</p>
    </article>
  );
}
