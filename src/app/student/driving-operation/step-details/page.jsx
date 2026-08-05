"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaCarSide, FaFlag } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { getStudentDashboard } from "@/features/API";

const STEPS = [
  { code: "registration", label: "Driving registration" },
  { code: "first_lesson", label: "First lesson" },
  {
    code: "driving_training",
    label: "Driving training",
    description:
      "This is the heart of your training! Each lesson allows you to develop the essential skills to drive safely and independently.",
  },
  {
    code: "exam_preparation",
    label: "Exam preparation",
    description:
      "Once your instructor registers you for the exam, the average wait time is 2 to 8 weeks, depending on your region. In the meantime, keep practicing.",
  },
  {
    code: "practical_exam",
    label: "Practical exam",
    description:
      "We’ve set aside two hours for your exam day. Your instructor will be there to accompany you to the exam center.",
  },
];

export default function StepDetailsPage() {
  const [journey, setJourney] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    getStudentDashboard()
      .then((response) => {
        if (mounted) setJourney(response?.data?.data?.licenseJourney || null);
      })
      .catch((requestError) => {
        if (mounted) setError(requestError?.response?.data?.message || "Journey details could not be loaded.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  const apiSteps = journey?.steps || [];
  const steps = STEPS.map((step) => ({
    ...step,
    ...(apiSteps.find((item) => item.code === step.code) || {}),
    label: step.label,
    description: step.description,
  }));

  return (
    <main className="min-h-screen bg-white px-4 py-[22px] text-[#171717]">
      <section className="mx-auto w-full rounded-[13px] bg-[#E8EEF7] px-[18px] pb-[18px] pt-[20px]">
        <h1 className="text-[17px] font-[700] leading-[22px] text-[#171717]">
          My road to getting my driver&apos;s license
        </h1>

        {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}

        {loading ? (
          <div className="mt-5 h-[650px] animate-pulse rounded-xl bg-white/70" />
        ) : (
          <div className="relative mt-[20px]">
            <div className="absolute bottom-[19px] left-[3px] top-[15px] w-[26px] rounded-sm bg-[#55585B] shadow-inner">
              <div className="absolute bottom-0 left-1/2 top-0 -translate-x-1/2 border-l border-dashed border-white/80" />
              <div className="absolute bottom-0 left-[4px] top-0 border-l border-white/25" />
              <div className="absolute bottom-0 right-[4px] top-0 border-r border-white/25" />
            </div>

            <div className="space-y-[22px]">
              {steps.map((step, index) => {
                const active = step.code === "driving_training" && !step.completed;
                return (
                  <article key={step.code} className="relative flex gap-[16px]">
                    <div className="relative z-10 flex w-[32px] shrink-0 justify-center">
                      <div className={`flex h-[31px] w-[31px] items-center justify-center rounded-full text-[18px] ${step.completed ? "bg-[#174A9B] text-white" : active ? "bg-white text-[#174A9B] shadow" : "bg-white text-transparent"}`}>
                        {step.completed ? <IoCheckmark /> : active ? <FaCarSide className="text-[16px]" /> : null}
                      </div>
                    </div>

                    <div className={`min-w-0 flex-1 rounded-[12px] px-[15px] ${active ? "min-h-[196px] bg-white py-[15px]" : "min-h-[69px] bg-[#DDE5F1] py-[15px]"}`}>
                      <p className={`text-[14px] font-[500] leading-[22px] ${active ? "w-fit rounded-[4px] bg-[#EEF2FA] px-[7px] py-[3px] font-[700] text-[#174A9B]" : "text-[#62656B]"}`}>
                        Step {String(index + 1).padStart(2, "0")} :
                      </p>
                      <h2 className={`${active ? "mt-[9px]" : "mt-[1px]"} text-[15px] font-[700] leading-[19px] text-[#171717]`}>{step.label}</h2>

                      {step.description && (
                        <p className={`${active ? "mt-[5px]" : "mt-[7px]"} text-[13px] font-[400] leading-[19px] text-[#666A72]`}>{step.description}</p>
                      )}

                      {active && step.code === "driving_training" && (
                        <div className="mt-[14px] grid grid-cols-1 gap-[18px] md:grid-cols-3">
                          <TrainingStatus href="/student/lessons" label="Driving hours" value={`${journey?.completedHours || 0}h/${journey?.targetHours || 20}h`} />
                          <TrainingStatus href="/student/profile/booklet" label="Skills acquired" value={`${journey?.skillsPercentage || 0}%/${journey?.targetSkillsPercentage || 60}%`} />
                          <TrainingStatus href="/student/code-learning" label="Mock exam" value="To do" muted />
                        </div>
                      )}
                    </div>

                    {index === steps.length - 1 && (
                      <div className="absolute bottom-[-47px] left-0 z-10 flex w-[32px] justify-center">
                        <span className="flex h-[31px] w-[31px] items-center justify-center rounded-full bg-white text-[20px] text-[#2CC747]">
                          <FaFlag />
                        </span>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
            <div className="h-8" />
          </div>
        )}
      </section>
    </main>
  );
}

function TrainingStatus({ href, label, value, muted = false }) {
  return (
    <div className="flex h-[69px] items-center justify-between rounded-[10px] bg-[#DDE5F1] px-[15px]">
      <div>
        <p className="text-[14px] font-[500] leading-[18px] text-[#656A72]">{label}</p>
        <Link href={href} className="mt-[2px] block text-[13px] font-[700] leading-[17px] text-[#174A9B] underline underline-offset-[1px]">See Details</Link>
      </div>
      <span className={`flex h-[41px] min-w-[42px] items-center justify-center rounded-[5px] px-[9px] text-[14px] font-[700] ${muted ? "bg-white text-[#555]" : "bg-[#3478DF] text-white"}`}>
        {value}
      </span>
    </div>
  );
}
