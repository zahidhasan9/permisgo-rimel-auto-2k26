"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa6";

import AppointmentBooking from "@/components/appointment-booking-calander";

import appoinHero from "../../../../public/image/appoin-hero.png";
import indicate1 from "../../../../public/image/indicate1.png";
import indicate2 from "../../../../public/image/indicate2.png";
import indicate3 from "../../../../public/image/indicate3.png";
import indicate4 from "../../../../public/image/indicate4.png";
import tes1 from "../../../../public/image/tes1.png";
import tes2 from "../../../../public/image/tes2.png";
import tes3 from "../../../../public/image/tes3.png";

const benefits = [
  { image: indicate1, title: "Moniteur diplômé" },
  { image: indicate2, title: "+ 500 d’élève réussites" },
  { image: indicate3, title: "Certifié Qualiopi" },
  { image: indicate4, title: "Écoles de conduite labellisées" },
];

const testimonialItems = [
  { image: tes1, name: "Esther Howard", role: "Web Designer" },
  { image: tes2, name: "Marvin McKinney", role: "Web Designer" },
  { image: tes3, name: "Wade Warren", role: "Web Designer" },
  { image: tes1, name: "Annette Black", role: "Web Designer" },
];

const testimonialText =
  "Thanks to the instructors, I passed my driving test on the first try. The lessons were clear and very helpful!";

export default function AppointmentPage() {
  const [testimonialStart, setTestimonialStart] = useState(0);

  const visibleTestimonials = useMemo(
    () =>
      testimonialItems.map(
        (_, index) =>
          testimonialItems[(testimonialStart + index) % testimonialItems.length],
      ),
    [testimonialStart],
  );

  const moveTestimonials = (direction) => {
    setTestimonialStart((current) => {
      const next = current + direction;
      return (next + testimonialItems.length) % testimonialItems.length;
    });
  };

  return (
    <div className="bg-[#eef3fb] text-[#1d1d1f]">
      {/* Hero */}
      <section className="border-b border-[#dfe6f1] bg-[#eef3fb]">
        <div className="mx-auto grid min-h-[600px] w-full max-w-[1360px] grid-cols-[minmax(0,1fr)] items-center gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:min-h-[628px] lg:px-10 lg:py-0">
          <div className="order-1 min-w-0 text-center md:text-left lg:translate-y-1">
            <h1 className="text-[28px] font-extrabold leading-[1.15] tracking-[-0.02em] sm:text-[36px] lg:text-[38px]">
              Book Your Driving Lesson
            </h1>
            <p className="mx-auto mt-6 max-w-[570px] !text-[15px] font-medium leading-[1.6] text-[#62656b] md:mx-0">
              Schedule your driving lesson with our certified instructors.
              Choose your preferred date, time, and location to start your
              learning journey.
            </p>
            <Link
              href="#appointment-booking"
              className="mt-10 inline-flex h-12 w-full max-w-[300px] items-center justify-center rounded-[10px] bg-[#e2233d] px-8 !text-[14px] font-extrabold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#174a9b] hover:shadow-lg"
            >
              Book Appointment
            </Link>
          </div>

          <div className="order-2 flex min-w-0 justify-center md:justify-end">
            <Image
              src={appoinHero}
              alt="Learner driver receiving guidance from an instructor"
              priority
              sizes="(max-width: 767px) 88vw, 500px"
              className="h-auto w-full min-w-0 max-w-[640px] lg:translate-x-5 lg:translate-y-2 lg:scale-[1.035]"
            />
          </div>
        </div>
      </section>

      {/* Booking and benefits */}
      <section className="bg-[#eef3fb] px-5 pb-20 pt-20 sm:px-8 lg:px-10 lg:pt-[74px]">
        <AppointmentBooking />

        <div className="mx-auto mt-28 w-full max-w-[1280px] lg:mt-[170px]">
          <h2 className="text-center text-[30px] font-extrabold tracking-[-0.02em] text-[#1d1d1f] sm:text-[36px]">
            Why choose Permisgo
          </h2>

          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="group min-h-[110px] -skew-x-[5deg] rounded-[18px] bg-white px-7 py-5 shadow-[0_2px_12px_rgba(18,53,101,0.02)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#174a9b] hover:shadow-xl"
              >
                <div className="flex h-full skew-x-[5deg] items-center justify-center gap-5">
                  <Image
                    src={benefit.image}
                    alt=""
                    sizes="48px"
                    className="h-12 w-12 shrink-0 object-contain"
                  />
                  <h3 className="!font-sans !text-[14px] font-bold leading-5 text-[#242424] transition-colors duration-300 group-hover:text-white">
                    {benefit.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-[1280px]">
          <span className="inline-flex rounded-[8px] bg-[#eef9ef] px-4 py-2 !text-[13px] font-bold text-[#43b968]">
            Testimonials
          </span>

          <div className="mt-5 flex items-center justify-between gap-6">
            <h2 className="text-[30px] font-extrabold tracking-[-0.02em] sm:text-[36px]">
              What Our Students Say
            </h2>
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={() => moveTestimonials(-1)}
                aria-label="Previous testimonials"
                className="flex h-10 w-10 items-center justify-center rounded-[9px] bg-[#e6ebf3] text-[#e2233d] transition-all duration-300 hover:-translate-y-1 hover:bg-[#174a9b] hover:text-white"
              >
                <FaArrowLeft />
              </button>
              <button
                type="button"
                onClick={() => moveTestimonials(1)}
                aria-label="Next testimonials"
                className="flex h-10 w-10 items-center justify-center rounded-[9px] bg-[#e2233d] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#174a9b]"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>

          <div className="mt-12 rounded-[12px] bg-[#dce4f1] p-5 sm:p-6">
            <div className="grid grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {visibleTestimonials.map((item, index) => (
                <article
                  key={`${item.name}-${index}`}
                  className={`${
                    index === 0
                      ? "flex"
                      : index === 1
                        ? "hidden sm:flex"
                        : "hidden lg:flex"
                  } min-h-[282px] flex-col rounded-[10px] bg-white p-6 shadow-[0_2px_10px_rgba(15,44,89,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                >
                  <p className="!text-[14px] font-medium leading-[1.5] text-[#44484f]">
                    {testimonialText}
                  </p>

                  <div className="mt-4 flex gap-2 text-[20px] text-[#ffc52f]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} />
                    ))}
                  </div>

                  <div className="mt-auto flex items-center gap-3 pt-5">
                    <Image
                      src={item.image}
                      alt={item.name}
                      sizes="42px"
                      className="h-[42px] w-[42px] rounded-full object-cover"
                    />
                    <div>
                      <h3 className="!font-sans !text-[13px] font-extrabold text-[#292929]">
                        {item.name}
                      </h3>
                      <p className="mt-0.5 !text-[12px] text-[#686b72]">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <Link
            href="/reviews"
            className="mt-12 inline-flex h-12 items-center justify-center rounded-[10px] bg-[#e2233d] px-6 !text-[14px] font-extrabold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#174a9b] hover:shadow-lg"
          >
            View All
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#eef3fb] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto flex min-h-[205px] w-full max-w-[1280px] flex-col items-center justify-center rounded-[12px] bg-[#174a9b] px-6 py-10 text-center">
          <h2 className="text-[24px] font-bold text-white sm:text-[26px]">
            Start Your Driving Journey Today
          </h2>
          <Link
            href="#appointment-booking"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-[10px] bg-[#e2233d] px-7 !text-[14px] font-extrabold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#174a9b] hover:shadow-lg"
          >
            Book Your Lesson
          </Link>
        </div>
      </section>
    </div>
  );
}
