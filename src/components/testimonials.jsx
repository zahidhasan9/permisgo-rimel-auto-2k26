"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import { Autoplay, FreeMode, Navigation } from "swiper/modules";

import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

import tes1 from "../../public/image/tes1.png";
import tes2 from "../../public/image/tes2.png";
import tes3 from "../../public/image/tes3.png";

const testimonials = [
  {
    img: tes1,
    name: "Esther Howard",
    role: "Web Designer",
    text: "Thanks to the instructors, I passed my driving test on the first try. The lessons were clear and very helpful! I passed my driving test on the first try.",
  },
  {
    img: tes2,
    name: "Esther Howard",
    role: "Web Designer",
    text: "Thanks to the instructors, I passed my driving test on the first try. The lessons were clear and very helpful! I passed my driving test on the first try.",
  },
  {
    img: tes3,
    name: "Esther Howard",
    role: "Web Designer",
    text: "Thanks to the instructors, I passed my driving test on the first try. The lessons were clear and very helpful! I passed my driving test on the first try.",
  },
  {
    img: tes1,
    name: "Esther Howard",
    role: "Web Designer",
    text: "Thanks to the instructors, I passed my driving test on the first try. The lessons were clear and very helpful! I passed my driving test on the first try.",
  },
  {
    img: tes2,
    name: "Esther Howard",
    role: "Web Designer",
    text: "Thanks to the instructors, I passed my driving test on the first try. The lessons were clear and very helpful! I passed my driving test on the first try.",
  },
  {
    img: tes3,
    name: "Esther Howard",
    role: "Web Designer",
    text: "Thanks to the instructors, I passed my driving test on the first try. The lessons were clear and very helpful! I passed my driving test on the first try.",
  },
  {
    img: tes1,
    name: "Esther Howard",
    role: "Web Designer",
    text: "Thanks to the instructors, I passed my driving test on the first try. The lessons were clear and very helpful! I passed my driving test on the first try.",
  },
  {
    img: tes2,
    name: "Esther Howard",
    role: "Web Designer",
    text: "Thanks to the instructors, I passed my driving test on the first try. The lessons were clear and very helpful! I passed my driving test on the first try.",
  },
  {
    img: tes3,
    name: "Esther Howard",
    role: "Web Designer",
    text: "Thanks to the instructors, I passed my driving test on the first try. The lessons were clear and very helpful! I passed my driving test on the first try.",
  },
  {
    img: tes1,
    name: "Esther Howard",
    role: "Web Designer",
    text: "Thanks to the instructors, I passed my driving test on the first try. The lessons were clear and very helpful! I passed my driving test on the first try.",
  },
];

const Testimonials = () => {
  const swiperRefTwo = useRef(null);

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
            <SwiperSlide key={index} className="!h-auto py-3">
              <article className="flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:border-blue-200 hover:shadow-xl">
                {/* User Info */}
                <div className="mb-5 flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-4 ring-blue-50">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      placeholder="blur"
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
                        <FaStar key={star} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="relative flex-1 rounded-2xl bg-slate-50 p-4">
                  <FaQuoteLeft className="mb-2 text-blue-600" />

                  <p className="text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Bottom Button */}
        <div className="mt-8 text-center sm:text-left">
          <Link
            href="#"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-950"
          >
            View All Reviews
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
