"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack, IoCheckmark, IoCarSport } from "react-icons/io5";
import { FaFlag } from "react-icons/fa";

import { getStudentDashboard } from "@/features/API";

const STEP_META = {
  registration: { description: "Complete your student registration and upload the required documents.", link: "/student/profile" },
  code_training: { description: "Study the highway code and complete your quizzes to prepare for driving lessons.", link: "/student/code-learning" },
  driving_lessons: { description: "Complete practical lessons with your instructor and build the skills required to drive independently.", link: "/student/lessons" },
  driving_exam: { description: "Request and prepare for your practical driving examination.", link: "/student/driving-operation/demand-driving-exam" },
  license: { description: "Your licence journey is complete after you pass the practical driving exam.", link: "/student/driving-operation/demand-driving-exam" },
};

const FALLBACK_STEPS = ["Registration", "Code Training", "Driving Lessons", "Driving Exam", "License Completed"].map((label, index) => ({ code: Object.keys(STEP_META)[index], label, progress: 0, completed: false }));

export default function StepDetailsPage() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getStudentDashboard()
      .then((response) => { if (active) setDashboard(response?.data?.data ?? response?.data ?? null); })
      .catch((requestError) => { if (active) setError(requestError.response?.data?.message || "Journey details could not be loaded."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const journey = dashboard?.licenseJourney;
  const steps = journey?.steps?.length ? journey.steps : FALLBACK_STEPS;
  const currentStep = journey?.currentStep || 1;
  const quiz = dashboard?.progressStatistics || {};

  const cardsFor = (step) => {
    if (step.code === "registration") return [{ title: "Documents uploaded", value: journey?.documentsUploaded || 0 }, { title: "Registration", value: step.completed ? "Complete" : "To do" }];
    if (step.code === "code_training") return [{ title: "Quiz attempts", value: quiz.totalAttempts || 0 }, { title: "Quiz average", value: `${quiz.average || 0}%` }, { title: "Code progress", value: `${step.progress || 0}%` }];
    if (step.code === "driving_lessons") return [{ title: "Driving hours", value: `${journey?.completedHours || 0}h` }, { title: "Target hours", value: `${journey?.targetHours || 20}h` }, { title: "Lesson progress", value: `${step.progress || 0}%` }];
    if (step.code === "driving_exam") return [{ title: "Exam status", value: String(step.status || "not scheduled").replaceAll("_", " ") }, { title: "Exam progress", value: `${step.progress || 0}%` }];
    return [{ title: "Licence status", value: step.completed ? "Completed" : "To do" }];
  };

  return (
    <main className="min-h-screen bg-white px-4 py-4 text-[#171717] sm:px-5 lg:px-6">
      <div className="mx-auto w-full max-w-[1020px]">
        <header className="flex items-center gap-3"><button type="button" onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#E8EEF7] text-[22px]"><IoChevronBack /></button><h1 className="text-[23px] font-bold text-[#173F8F]">Step Details</h1></header>
        {error && <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
        <section className="mt-6 rounded-[12px] bg-[#E8EEF7] p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-bold">My road to getting my driver&apos;s license</h2><strong className="text-sm text-[#20BF3A]">{journey?.overallProgress || 0}% Complete</strong></div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-[#20BF3A]" style={{ width: `${journey?.overallProgress || 0}%` }} /></div>
          {loading ? <div className="mt-5 h-96 animate-pulse rounded-xl bg-white" /> : <div className="relative mt-6">
            <div className="absolute left-[8px] top-0 h-full w-[24px] rounded-full bg-[#4F5356]"><div className="mx-auto h-full w-[2px] border-l border-dashed border-white/80" /></div>
            <div className="space-y-4">{steps.map((step, index) => {
              const active = index + 1 === currentStep;
              const meta = STEP_META[step.code] || {};
              return <div key={step.code || index} className="relative flex gap-4 sm:gap-5">
                <div className="relative z-10 flex w-[40px] shrink-0 justify-center"><div className={`flex h-[30px] w-[30px] items-center justify-center rounded-full text-[17px] ${step.completed ? "bg-[#174596] text-white" : active ? "bg-white text-[#174596] ring-[3px] ring-white" : "bg-white text-slate-300"}`}>{step.completed ? <IoCheckmark /> : active ? <IoCarSport /> : null}</div></div>
                <div className={`min-w-0 flex-1 rounded-[11px] ${active ? "bg-white" : "bg-[#DDE6F2]"} p-4`}>
                  <div className="flex flex-wrap items-center justify-between gap-2"><span className="text-[13px] font-bold text-[#174596]">Step {padStep(index + 1)}</span><span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#174596]">{step.progress || 0}%</span></div>
                  <h3 className="mt-2 text-sm font-bold">{step.label}</h3><p className="mt-2 text-[12.5px] leading-5 text-[#666]">{meta.description}</p>
                  {active && <div className="mt-4 grid gap-3 sm:grid-cols-3">{cardsFor(step).map((card) => <div key={card.title} className="rounded-[9px] bg-[#DDE6F2] p-3"><p className="text-xs text-[#666]">{card.title}</p><p className="mt-2 font-bold capitalize text-[#174596]">{card.value}</p></div>)}</div>}
                  {active && <button type="button" onClick={() => router.push(meta.link)} className="mt-4 rounded-lg bg-[#174596] px-4 py-2 text-xs font-bold text-white">Continue this step</button>}
                </div>
                {index === steps.length - 1 && <div className="absolute bottom-[-38px] left-0 z-10 flex w-[40px] justify-center"><div className={`flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white ${step.completed ? "text-[#20BF3A]" : "text-slate-300"}`}><FaFlag /></div></div>}
              </div>;
            })}</div><div className="h-7" />
          </div>}
        </section>
      </div>
    </main>
  );
}

function padStep(value) { return String(value).padStart(2, "0"); }
