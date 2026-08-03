"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import { Autoplay, FreeMode, Navigation } from "swiper/modules";

import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { getTestimonials } from "@/features/API";

const Testimonials = () => {
  const swiperRefTwo = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => { getTestimonials().then(({ data }) => setTestimonials(data?.data || [])).catch(() => setTestimonials([])); }, []);

  if (!testimonials.length) return null;

  return (
    <section className="relative overflow-hidden bg-slate-50 px-4 py-12 sm:px-6 lg:px-12">
      {/* Soft Background Shape */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-100 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-orange-100 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-orange-500 shadow-sm ring-1 ring-slate-100">
              Testimonials
            </span>

            <h2 className="mt-4 text-2xl font-bold leading-tight text-slate-950 sm:text-3xl lg:text-4xl">
              What Our Students Say
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Real feedback from learners who trusted our instructors and
              completed their driving journey with confidence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => swiperRefTwo.current?.slidePrev()}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              aria-label="Previous testimonial"
            >
              <FaArrowLeftLong className="text-sm" />
            </button>

            <button
              type="button"
              onClick={() => swiperRefTwo.current?.slideNext()}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              aria-label="Next testimonial"
            >
              <FaArrowRightLong className="text-sm" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <Swiper
          spaceBetween={18}
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 14,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 18,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 18,
            },
          }}
          autoplay={{
            delay: 2600,
            disableOnInteraction: false,
          }}
          freeMode
          loop
          modules={[FreeMode, Autoplay, Navigation]}
          onSwiper={(swiper) => {
            swiperRefTwo.current = swiper;
          }}
          className="w-full"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={item._id || index} className="!h-auto py-3">
              <article className="flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:border-blue-200 hover:shadow-xl">
                {/* User Info */}
                <div className="mb-5 flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-4 ring-blue-50">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      quality={90}
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <h4 className="truncate text-base font-bold text-slate-950">
                      {item.name}
                    </h4>

                    <p className="truncate text-sm text-slate-500">
                      {item.role}
                    </p>

                    <div className="mt-1 flex gap-1 text-sm text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar key={star} className={star <= item.rating ? "text-yellow-400" : "text-slate-200"} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="relative flex-1 rounded-2xl bg-slate-50 p-4">
                  <FaQuoteLeft className="mb-2 text-blue-600" />

                  <p className="text-sm leading-6 text-slate-600">
                    {item.message}
                  </p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Bottom Button */}
        <div className="mt-8 text-center sm:text-left">
          <Link
              href="/reviews"
              className="inline-flex min-h-[42px] items-center justify-center rounded-[8px] bg-[#E2233D] px-7 text-[13px] font-extrabold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#174A9B]"
            >
              View All Reviews
            </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
