"use client";

import Image from "next/image";
import Link from "next/link";

// Image
import appoinHero from "../../../../public/image/appoin-hero.png";

// Components
import AppointmentBooking from "@/components/appointment-booking-calander";
import Testimonials from "@/components/testimonials";
import WhyChoose from "@/components/why-choose";

const Appointment = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="px-4 py-8 sm:px-6 md:px-8 lg:px-12 lg:py-14">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-2">
            {/* Left Content */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Book Your Driving Lesson
              </h1>

              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Schedule your driving lesson with our certified instructors.
                Choose your preferred date, time, and location to start your
                learning journey.
              </p>

              <Link
                href="#appointment-booking"
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-orange-500"
              >
                Book Appointment
              </Link>
            </div>

            {/* Right Image */}
            <div className="flex justify-center md:justify-end">
              <Image
                src={appoinHero}
                alt="Book driving lesson"
                priority
                // placeholder="blur"
                quality={85}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 50vw, 560px"
                className="h-auto w-full max-w-md object-contain sm:max-w-lg lg:max-w-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Booking */}
      <div id="appointment-booking">
        <AppointmentBooking />
      </div>

      <WhyChoose />

      <Testimonials />

      {/* Booking CTA Section */}
      <section className="bg-white px-4 py-8 sm:px-6 md:px-8 lg:px-12 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-blue-900 px-4 py-10 text-center sm:px-8 lg:py-14">
            <h3 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Start Your Driving Journey Today
            </h3>

            <Link
              href="#appointment-booking"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-orange-500"
            >
              Book Your Lesson
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Appointment;
