"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Fragment } from "react";
import { IoChevronBack, IoChevronForward, IoCheckmark } from "react-icons/io5";
import { FaCarSide, FaStar, FaWhatsapp } from "react-icons/fa";

const teachers = [
  {
    id: 1,
    name: "Wade Warren",
    phone: "089636789000",
    experience: "05 Years+",
    image: "/image/teacher-1.png",
  },
  {
    id: 2,
    name: "Marvin McKinney",
    phone: "089636789000",
    experience: "05 Years+",
    image: "/image/teacher-2.png",
  },
  {
    id: 3,
    name: "Guy Hawkins",
    phone: "089636789000",
    experience: "05 Years+",
    image: "/image/teacher-3.png",
  },
  {
    id: 4,
    name: "Ronald Richards",
    phone: "089636789000",
    experience: "05 Years+",
    image: "/image/teacher-4.png",
  },
];

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
    link: "/student/driving-operation/my-lessons",
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
    link: "#",
  },
];

export default function Page() {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  return (
    <main className="min-h-screen bg-white px-4 py-5 font-sans text-[#171717] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1080px]">
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

          <h1 className="text-[22px] font-bold leading-none text-[#173F8F] sm:text-[24px]">
            Driving
          </h1>
        </header>

        {/* License Progress */}
        <section className="mt-7 rounded-[13px] bg-[#E8EEF7] p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-[16px] font-bold text-[#171717]">
                My road to getting my driver&apos;s license
              </h2>

              <p className="mt-2 text-[13px] font-medium text-[#667085]">
                Step 3: Driver Training
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 sm:items-end">
              <Link
                href="/student/driving-operation/step-details"
                className="text-[14px] font-bold text-[#174596] underline"
              >
                Details
              </Link>

              <p className="text-[15px] font-bold text-[#20BF3A]">
                50 hours worked
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto pb-2">
            <div className="flex min-w-[760px] items-center">
              {steps.map((step, index) => (
                <Fragment key={step.id}>
                  <div className="flex shrink-0 flex-col items-center">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full text-[18px] ${
                        step.type === "empty"
                          ? "bg-white text-[#174596]"
                          : step.type === "car"
                            ? "bg-white text-[#174596]"
                            : "bg-[#174596] text-white"
                      }`}
                    >
                      {step.type === "done" && <IoCheckmark />}
                      {step.type === "car" && (
                        <FaCarSide className="text-[20px]" />
                      )}
                    </div>

                    <span className="mt-3 whitespace-nowrap text-[11px] font-bold text-[#667085]">
                      {step.label}
                    </span>
                  </div>

                  {index !== steps.length - 1 && (
                    <div className="mb-7 h-[2px] flex-1 bg-[#174596]" />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Teachers */}
        <section className="mt-7">
          <h2 className="text-[21px] font-bold text-[#174596]">
            My Favorite Teachers
          </h2>

          <div className="mt-5 rounded-[13px] bg-[#E8EEF7] p-4 sm:p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {teachers.map((teacher) => (
                <article
                  key={teacher.id}
                  className="rounded-[12px] bg-white p-4 text-center transition hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(23,69,150,0.13)]"
                >
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="mx-auto h-[66px] w-[66px] rounded-full object-cover"
                  />

                  <h3 className="mt-4 text-[20px] font-bold leading-tight text-[#174596]">
                    {teacher.name}
                  </h3>

                  <div className="mt-2 flex items-center justify-center gap-1.5 text-[13px] text-[#667085]">
                    <FaWhatsapp className="text-[15px] text-[#19C463]" />
                    <span>{teacher.phone}</span>
                  </div>

                  <div className="mt-4 rounded-[10px] bg-[#E8EEF7] px-3 py-3">
                    <p className="text-[12px] text-[#667085]">
                      Experience{" "}
                      <span className="font-bold text-[#171717]">
                        {teacher.experience}
                      </span>
                    </p>

                    <div className="mt-3 flex justify-center gap-3 text-[#174596]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar key={star} className="text-[16px]" />
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-4 h-10 w-full rounded-[8px] border border-[#DF2339] text-[12px] font-bold text-[#174596] transition hover:bg-[#DF2339] hover:text-white"
                  >
                    Message
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Lessons */}
        <section className="mt-7">
          <h2 className="text-[20px] font-bold text-[#174596]">Lessons</h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lessonItems.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="group flex min-h-[88px] items-center justify-between gap-4 rounded-[10px] border border-[#174596] bg-[#E8EEF7] px-5 py-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_25px_rgba(23,69,150,0.12)]"
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
        <section className="mt-7">
          <h2 className="text-[20px] font-bold text-[#174596]">Learning</h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {learningItems.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="group flex min-h-[88px] items-center justify-between gap-4 rounded-[10px] border border-[#174596] bg-[#E8EEF7] px-5 py-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_25px_rgba(23,69,150,0.12)]"
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
        <section className="mt-7">
          <h2 className="text-[20px] font-bold text-[#174596]">Driving test</h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/student/driving-operation/demand-driving-exam"
              className="group flex min-h-[88px] items-center justify-between gap-4 rounded-[10px] border border-[#174596] bg-[#E8EEF7] px-5 py-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_25px_rgba(23,69,150,0.12)]"
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
