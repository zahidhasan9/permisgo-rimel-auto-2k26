"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Fragment } from "react";
import { IoChevronBack, IoChevronForward, IoCheckmark } from "react-icons/io5";
import { FaCarSide, FaStar, FaWhatsapp } from "react-icons/fa";
import { getMyFavoriteTeachers, getStudentDashboard } from "@/features/API";

const steps = [
  { id: 1, label: "Step 01", type: "done" },
  { id: 2, label: "Step 02", type: "done" },
  { id: 3, label: "Step 03", type: "car" },
  { id: 4, label: "Step 04", type: "empty" },
  { id: 5, label: "Step 05", type: "empty" },
];

const lessonItems = [
  {
    id: 1,
    title: "Book a Lesson",
    image: "/image/book-lesson.png",
    link: "/student/driving-operation/book-lesson",
  },
  {
    id: 2,
    title: "Se my lessons",
    image: "/image/my-lessons.png",
    link: "/student/lessons",
  },
  {
    id: 3,
    title: "Rating note down my lessons",
    image: "/image/rating.png",
    link: "/student/driving-operation/rating-my-lessons",
  },
  {
    id: 4,
    title: "Buy Hours",
    image: "/image/buy-hours.png",
    link: "/student/driving-operation/buy-hour",
  },
];

const learningItems = [
  {
    id: 1,
    title: "My e-learning Videos",
    image: "/image/video.png",
    link: "/student/driving-operation/my-e-learning-video",
  },
  {
    id: 2,
    title: "See my learning booklet",
    image: "/image/booklet.png",
    link: "/student/profile/booklet",
  },
  {
    id: 3,
    title: "Questions asked in the exam",
    image: "/image/questions.png",
    link: "/student/driving-operation/questions-ask-exam",
  },
  {
    id: 4,
    title: "Choice schémas",
    image: "/image/choice.png",
    link: "/student/driving-operation/choice-schema",
  },
  {
    id: 5,
    title: "My Mock exam",
    image: "/image/mock-exam.png",
    link: "/student/code-learning",
  },
];

export default function Page() {
  const router = useRouter();
  const [teachers, setTeachers] = useState([]);
  const [teachersLoading, setTeachersLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    let active = true;
    getMyFavoriteTeachers()
      .then((response) => {
        const data = response?.data?.data ?? response?.data ?? [];
        if (active) setTeachers(Array.isArray(data) ? data : []);
      })
      .catch(() => { if (active) setTeachers([]); })
      .finally(() => { if (active) setTeachersLoading(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    getStudentDashboard()
      .then((response) => { if (active) setDashboard(response?.data?.data ?? response?.data ?? null); })
      .catch(() => { if (active) setDashboard(null); });
    return () => { active = false; };
  }, []);

  const journey = dashboard?.licenseJourney;
  const journeySteps = journey?.steps?.length
    ? journey.steps.map((step, index) => ({
        id: index + 1,
        label: step.label,
        progress: step.progress,
        type: step.completed ? "done" : index + 1 === journey.currentStep ? "car" : "empty",
      }))
    : steps;

  function handleBack() {
    router.back();
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-3 py-4 font-sans text-[#171717] sm:px-6 sm:py-5 lg:px-8">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Header */}
        <header className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#E8EEF7] text-[23px] text-black transition hover:bg-[#dfe7f2] sm:h-11 sm:w-11"
          >
            <IoChevronBack />
          </button>

          <h1 className="text-[20px] font-bold leading-none text-[#173F8F] sm:text-[24px]">
            Driving
          </h1>
        </header>

        {/* License Progress */}
        <section className="mt-5 rounded-[13px] bg-[#E8EEF7] p-3 sm:mt-7 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-[15px] font-bold leading-5 text-[#171717] sm:text-[16px]">
                My road to getting my driver&apos;s license
              </h2>

              <p className="mt-2 text-[13px] font-medium text-[#667085]">
                Step {journey?.currentStep || 1}: {journey?.currentStepLabel || "Registration"}
              </p>
            </div>

            <div className="flex flex-row items-center justify-between gap-3 sm:flex-col sm:items-end">
              <Link
                href="/student/driving-operation/step-details"
                className="text-[14px] font-bold text-[#174596] underline"
              >
                Details
              </Link>

              <p className="text-right text-[12px] font-bold leading-4 text-[#20BF3A] sm:text-[15px]">
                {journey?.completedHours || 0} / {journey?.targetHours || 20} hours completed
              </p>
            </div>
          </div>

          <div className="mt-5 w-full pb-1 sm:mt-6 sm:overflow-x-auto sm:pb-2">
            <div className="flex w-full items-start sm:min-w-[760px] sm:items-center">
              {journeySteps.map((step, index) => (
                <Fragment key={step.id}>
                  <div className="flex min-w-0 flex-[0_0_38px] flex-col items-center sm:shrink-0 sm:flex-none">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-[14px] sm:h-11 sm:w-11 sm:text-[18px] ${
                        step.type === "empty"
                          ? "bg-white text-[#174596]"
                          : step.type === "car"
                            ? "bg-white text-[#174596]"
                            : "bg-[#174596] text-white"
                      }`}
                    >
                      {step.type === "done" && <IoCheckmark />}
                      {step.type === "car" && (
                        <FaCarSide className="text-[15px] sm:text-[20px]" />
                      )}
                    </div>

                    <span className="mt-2 max-w-[54px] text-center text-[8px] font-bold leading-[10px] text-[#667085] sm:mt-3 sm:max-w-none sm:whitespace-nowrap sm:text-[11px] sm:leading-normal">
                      {step.label}
                    </span>
                    <span className="mt-1 text-[8px] font-semibold text-[#174596] sm:text-[10px]">{step.progress ?? 0}%</span>
                  </div>

                  {index !== journeySteps.length - 1 && (
                    <div className={`mt-[15px] h-[2px] min-w-0 flex-1 sm:mb-7 sm:mt-0 ${journeySteps[index + 1]?.type === "done" || journeySteps[index + 1]?.type === "car" ? "bg-[#174596]" : "bg-slate-300"}`} />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Teachers */}
        <section className="mt-6 sm:mt-7">
          <h2 className="text-[19px] font-bold text-[#174596] sm:text-[21px]">
            My Favorite Teachers
          </h2>

          <div className="mt-4 rounded-[13px] bg-[#E8EEF7] p-3 sm:mt-5 sm:p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {teachers.map((teacher) => {
                const user = teacher.user || {};
                const rating = Math.max(0, Math.min(5, Number(teacher.rating?.average || 0)));
                return (
                <article
                  key={teacher._id}
                  className="rounded-[12px] bg-white p-3 text-center transition hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(23,69,150,0.13)] sm:p-4"
                >
                  {user.avatar ? <img src={user.avatar} alt={user.name || "Teacher"} className="mx-auto h-[66px] w-[66px] rounded-full object-cover" /> : <div className="mx-auto flex h-[66px] w-[66px] items-center justify-center rounded-full bg-[#174596] text-2xl font-bold text-white">{(user.name || "T").charAt(0).toUpperCase()}</div>}

                  <h3 className="mt-3 break-words text-[18px] font-bold leading-tight text-[#174596] sm:mt-4 sm:text-[20px]">
                    {user.name || user.fullName || "Teacher"}
                  </h3>

                  <div className="mt-2 flex min-w-0 items-center justify-center gap-1.5 text-[12px] text-[#667085] sm:text-[13px]">
                    <FaWhatsapp className="text-[15px] text-[#19C463]" />
                    <span className="min-w-0 break-all">{user.phone || "Phone not provided"}</span>
                  </div>

                  <div className="mt-4 rounded-[10px] bg-[#E8EEF7] px-3 py-3">
                    <p className="text-[12px] text-[#667085]">
                      Experience{" "}
                      <span className="font-bold text-[#171717]">
                        {teacher.experienceYears || 0} Years+
                      </span>
                    </p>

                    <div className="mt-3 flex justify-center gap-3 text-[#174596]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar key={star} className={`text-[16px] ${star <= Math.round(rating) ? "text-[#174596]" : "text-slate-300"}`} />
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => router.push(`/student/chat?userId=${user._id}`)}
                    className="mt-4 h-10 w-full rounded-[8px] border border-[#DF2339] text-[12px] font-bold text-[#174596] transition hover:bg-[#DF2339] hover:text-white"
                  >
                    Message
                  </button>
                </article>
              );})}
              {!teachersLoading && !teachers.length && <div className="col-span-full rounded-xl bg-white p-8 text-center text-sm font-semibold text-slate-500">You have not added any favorite teacher yet.</div>}
              {teachersLoading && <div className="col-span-full h-52 animate-pulse rounded-xl bg-white" />}
            </div>
          </div>
        </section>

        {/* Lessons */}
        <section className="mt-6 sm:mt-7">
          <h2 className="text-[20px] font-bold text-[#174596]">Lessons</h2>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {lessonItems.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="group flex min-h-[76px] items-center justify-between gap-3 rounded-[10px] border border-[#174596] bg-[#E8EEF7] px-3 py-3 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_25px_rgba(23,69,150,0.12)] sm:min-h-[88px] sm:gap-4 sm:px-5 sm:py-4"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-white">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-[34px] w-[34px] object-contain"
                    />
                  </div>

                  <h3 className="text-[15px] font-bold leading-[1.35] text-[#171717]">
                    {item.title}
                  </h3>
                </div>

                <IoChevronForward className="shrink-0 text-[23px] text-[#174596]" />
              </Link>
            ))}
          </div>
        </section>

        {/* Learning */}
        <section className="mt-6 sm:mt-7">
          <h2 className="text-[20px] font-bold text-[#174596]">Learning</h2>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {learningItems.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="group flex min-h-[76px] items-center justify-between gap-3 rounded-[10px] border border-[#174596] bg-[#E8EEF7] px-3 py-3 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_25px_rgba(23,69,150,0.12)] sm:min-h-[88px] sm:gap-4 sm:px-5 sm:py-4"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-white">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-[34px] w-[34px] object-contain"
                    />
                  </div>

                  <h3 className="text-[15px] font-bold leading-[1.35] text-[#171717]">
                    {item.title}
                  </h3>
                </div>

                <IoChevronForward className="shrink-0 text-[23px] text-[#174596]" />
              </Link>
            ))}
          </div>
        </section>

        {/* Driving Test */}
        <section className="mt-6 sm:mt-7">
          <h2 className="text-[20px] font-bold text-[#174596]">Driving test</h2>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            <Link
              href="/student/driving-operation/demand-driving-exam"
              className="group flex min-h-[76px] items-center justify-between gap-3 rounded-[10px] border border-[#174596] bg-[#E8EEF7] px-3 py-3 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_25px_rgba(23,69,150,0.12)] sm:min-h-[88px] sm:gap-4 sm:px-5 sm:py-4"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-white text-[29px] text-[#174596] transition group-hover:bg-[#174596] group-hover:text-white">
                  <FaCarSide />
                </div>

                <h3 className="text-[15px] font-bold leading-[1.35] text-[#171717]">
                  Demand for your driving Exam
                </h3>
              </div>

              <IoChevronForward className="shrink-0 text-[23px] text-[#174596]" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
