"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import { Autoplay, FreeMode, Navigation } from "swiper/modules";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Testimonials from "@/components/testimonials";

import blogImg from "../../public/image/blog.jpg";
import broomLogo from "../../public/image/broomLogo.png";
import carAnime from "../../public/image/car-animate.gif";
import googleLogo from "../../public/image/googleLogo.png";
import homePay from "../../public/image/home-pay.jpg";
import trustLogo from "../../public/image/trustLogo.png";

import payment1 from "../../public/image/payment1.jpg";
import payment2 from "../../public/image/payment2.jpg";
import payment3 from "../../public/image/payment3.jpg";
import payment4 from "../../public/image/payment4.jpg";
import payment5 from "../../public/image/payment5.jpg";
import payment6 from "../../public/image/payment6.jpg";
import payment7 from "../../public/image/payment7.jpg";
import payment8 from "../../public/image/payment8.jpg";

import instruc1 from "../../public/image/instrac1.png";
import instruc2 from "../../public/image/instrac2.png";
import instruc3 from "../../public/image/instrac3.png";
import instruc4 from "../../public/image/instrac4.png";

import hser1 from "../../public/image/hser1.png";
import hser2 from "../../public/image/hser2.png";
import hser3 from "../../public/image/hser3.png";
import hser4 from "../../public/image/hser4.png";
import hser5 from "../../public/image/hser5.png";
import hser6 from "../../public/image/hser6.png";
import hser7 from "../../public/image/hser7.png";
import hser8 from "../../public/image/hser8.png";
import hser9 from "../../public/image/hser9.png";

import indicator1 from "../../public/image/indicate1.png";
import indicator2 from "../../public/image/indicate2.png";
import indicator3 from "../../public/image/indicate3.png";
import indicator4 from "../../public/image/indicate4.png";

import batch from "../../public/image/hero-batch.png";

import { FaStar } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const container = "mx-auto max-w-6xl px-4 sm:px-5 lg:px-6";
const section = "py-9 md:py-12 lg:py-14";

const badge =
  "inline-flex items-center rounded-full bg-white px-3.5 py-1.5 text-xs font-bold tracking-wide text-orange-500 shadow-sm ring-1 ring-slate-100";

const primaryBtn =
  "inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition duration-300 hover:bg-blue-900 hover:shadow-md";

const outlineBtn =
  "inline-flex items-center justify-center rounded-full border border-blue-600 bg-white px-5 py-2.5 text-sm font-bold text-blue-900 transition duration-300 hover:bg-blue-600 hover:text-white hover:shadow-md";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 shadow-sm outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

const navBtn =
  "flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm text-blue-900 shadow-sm ring-1 ring-slate-100 transition duration-300 hover:bg-blue-600 hover:text-white hover:shadow-md";

const cardHover =
  "transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl";

const indicators = [
  { img: indicator1, title: "Moniteur diplômé" },
  { img: indicator2, title: "+ 500 d’élève réussites" },
  { img: indicator3, title: "Certifié Qualiopi" },
  { img: indicator4, title: "Écoles de conduite labellisées" },
];

const services = [
  { img: hser1, title: "Permis B Conduite Manuelle", price: "20hr - 990£" },
  { img: hser2, title: "Permis B Conduite Automatique", price: "20hr - 990£" },
  { img: hser3, title: "Conduite Accompagnee", price: "20hr - 990£" },
  { img: hser4, title: "Supervised driving (AAC)", price: "20hr - 990£" },
  { img: hser5, title: "Code en salle", price: "20hr - 990£" },
  { img: hser6, title: "Code en ligne", price: "20hr - 990£" },
  { img: hser7, title: "Conduite Supervisee", price: "20hr - 990£" },
  { img: hser8, title: "Permis Accelere", price: "20hr - 990£" },
  { img: hser9, title: "Code Accelere", price: "20hr - 990£" },
];

const instructors = [
  instruc1,
  instruc2,
  instruc3,
  instruc4,
  instruc2,
  instruc3,
  instruc1,
  instruc2,
  instruc3,
  instruc1,
];

const reviews = [
  { img: broomLogo, title: "VroomVroom" },
  { img: googleLogo, title: "Google Ratings" },
  { img: trustLogo, title: "Trustpilot Ratings" },
];

const payments = [
  payment1,
  payment2,
  payment3,
  payment4,
  payment5,
  payment6,
  payment7,
  payment8,
];

const mapTabs = [
  { key: "manual", title: "Manual Transmission" },
  { key: "auto", title: "Automatic Transmission" },
  { key: "accelerated", title: "Accelerated" },
  { key: "motorcycle", title: "Motorcycle" },
];

const faqs = [
  {
    q: "Accordion Item #1",
    a: "This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
  },
  {
    q: "Accordion Item #2",
    a: "This is the second item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
  },
  {
    q: "Accordion Item #3",
    a: "This is the third item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
  },
  {
    q: "Accordion Item #4",
    a: "This is the fourth item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
  },
  {
    q: "Accordion Item #5",
    a: "This is the fifth item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
  },
];

const mapSrc =
  "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d9627.36559924592!2d2.3512118557895323!3d48.86432615404459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1775120702448!5m2!1sen!2sbd";

function SectionHeading({ small, title, desc }) {
  return (
    <div className="mx-auto mb-7 max-w-2xl text-center md:mb-9">
      <h5 className={badge}>{small}</h5>

      <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight text-blue-900 sm:text-3xl lg:text-4xl">
        {title}
      </h2>

      {desc && (
        <p className="mx-auto mt-2 max-w-xl text-sm font-medium leading-6 text-slate-600">
          {desc}
        </p>
      )}
    </div>
  );
}

function Stars({ center = true }) {
  return (
    <ul
      className={cn(
        "flex gap-1 text-sm text-yellow-400",
        center && "justify-center",
      )}
    >
      {[1, 2, 3, 4, 5].map((item) => (
        <li key={item}>
          <FaStar />
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const swiperRefOne = useRef(null);
  const swiperRefThree = useRef(null);

  const [activeTab, setActiveTab] = useState("manual");
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-blue-950 bg-[url('/image/hero-bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900/90 to-blue-800/60" />
        <div className="absolute -left-20 top-20 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -right-20 bottom-8 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className={cn(container, "relative")}>
          <div className="grid min-h-[520px] grid-cols-1 items-center gap-8 py-10 md:py-12 lg:grid-cols-12 lg:py-14">
            <div className="lg:col-span-5">
              <div className="max-w-lg">
                <h5 className="inline-flex rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm ring-1 ring-white/20">
                  Approved by the prefecture E 25 093 0029 0
                </h5>

                <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Conduisez vers la liberté, Per|
                </h1>

                <p className="mt-4 max-w-md text-base font-medium leading-7 text-white/85">
                  Comprehensive training, guaranteed safety.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="#" className={primaryBtn}>
                    Start the courses
                  </Link>

                  <Link
                    href="#"
                    className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition duration-300 hover:bg-white hover:text-blue-900"
                  >
                    Inscription
                  </Link>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {[
                    {
                      title: "Driving License 13H From",
                      oldPrice: "€850",
                      price: "€749",
                    },
                    {
                      title: "Highway code from",
                      oldPrice: "€50",
                      price: "€30",
                    },
                  ].map((offer, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white shadow-lg backdrop-blur transition duration-300 hover:bg-white/15"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-bold leading-5 text-white">
                            {offer.title}
                          </h4>

                          <p className="mt-1 text-base font-bold text-orange-400 line-through">
                            {offer.oldPrice}
                          </p>
                        </div>

                        <Image
                          src={batch}
                          alt="Offer badge"
                          sizes="48px"
                          className="h-auto w-10"
                        />
                      </div>

                      <div className="mt-4 flex items-end justify-between gap-3">
                        <div>
                          <small className="text-xs font-medium text-white/70">
                            of the
                          </small>
                          <h3 className="text-3xl font-black leading-none text-white">
                            {offer.price}
                          </h3>
                        </div>

                        <Link
                          href="#"
                          className="rounded-full bg-white px-3.5 py-2 text-xs font-bold text-blue-900 transition hover:bg-blue-600 hover:text-white"
                        >
                          Permit Offer
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Image
                src={carAnime}
                alt="Driving car animation"
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="ml-auto h-auto w-full max-w-2xl object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Indicators */}
      <section className={cn(section, "bg-white")}>
        <div className={container}>
          <SectionHeading
            small="Services"
            title="Your driving licence with Permisgo"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {indicators.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-2xl border border-slate-100 bg-white p-4 shadow-sm ring-1 ring-slate-50",
                  cardHover,
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <Image
                      src={item.img}
                      alt={item.title}
                      sizes="40px"
                      className="h-auto w-8"
                    />
                  </div>

                  <h4 className="text-sm font-black leading-5 text-blue-900">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className={cn(section, "bg-slate-50")}>
        <div className={container}>
          <SectionHeading
            small="Services"
            title="Professional driving courses"
            desc="Choose the right package and start your driving journey with confidence."
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm ring-1 ring-slate-50",
                  cardHover,
                )}
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                  <Image
                    src={service.img}
                    alt={service.title}
                    sizes="48px"
                    className="h-auto w-11"
                  />
                </div>

                <h4 className="mt-4 min-h-11 text-base font-black leading-6 text-blue-900">
                  {service.title}
                </h4>

                <h3 className="mt-1 text-xl font-black text-orange-500">
                  {service.price}
                </h3>

                <div className="mt-5">
                  <Link href="#" className={outlineBtn}>
                    Learn more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className={cn(section, "bg-white")}>
        <div className={container}>
          <SectionHeading
            small="Location"
            title="Permisgo near you"
            desc="Lessons near your home, your work, your school… we're everywhere!"
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200/70">
                <input
                  type="text"
                  placeholder="🔍 Search by address, city ..."
                  className={inputClass}
                />

                <div className="mt-5">
                  <h4 className="mb-3 text-lg font-black leading-6 text-blue-900">
                    Find lessons based on your vehicle type
                  </h4>

                  <div className="grid gap-2.5">
                    {mapTabs.map((tab) => (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveTab(tab.key)}
                        className={cn(
                          "rounded-xl px-3.5 py-2.5 text-left text-sm font-bold transition duration-300",
                          activeTab === tab.key
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-slate-50 text-blue-900 hover:bg-blue-50",
                        )}
                      >
                        {tab.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <h4 className="mb-3 text-lg font-black leading-6 text-blue-900">
                    Find available teacher near you
                  </h4>

                  <button type="button" className={cn(primaryBtn, "w-full")}>
                    Start Searching
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-1.5 shadow-lg shadow-slate-200/70">
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="430"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                  title="Permisgo location map"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className={cn(section, "bg-slate-50")}>
        <div className={container}>
          <SectionHeading
            small="Instructors"
            title="You'll love our instructors"
          />

          <Swiper
            spaceBetween={18}
            breakpoints={{
              300: { slidesPerView: 1 },
              540: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
              1440: { slidesPerView: 5 },
            }}
            autoplay={{
              delay: 2200,
              disableOnInteraction: false,
            }}
            freeMode
            loop
            modules={[FreeMode, Autoplay, Navigation]}
            onSwiper={(swiper) => (swiperRefOne.current = swiper)}
            className="w-full"
          >
            {instructors.map((img, index) => (
              <SwiperSlide key={index}>
                <div
                  className={cn(
                    "rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm ring-1 ring-slate-50",
                    cardHover,
                  )}
                >
                  <Image
                    src={img}
                    alt="Instructor"
                    sizes="80px"
                    className="mx-auto h-20 w-20 rounded-full object-cover ring-4 ring-blue-50"
                  />

                  <h4 className="mt-3 text-lg font-black text-blue-900">
                    Robert Fox
                  </h4>

                  <div className="mt-3 rounded-xl bg-slate-50 p-3">
                    <p className="mb-2 text-xs font-medium text-slate-600">
                      Experience{" "}
                      <span className="font-black text-blue-900">
                        05 Years+
                      </span>
                    </p>

                    <Stars />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2.5">
                    <Link href="#" className={primaryBtn}>
                      Book
                    </Link>

                    <Link href="#" className={outlineBtn}>
                      Message
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-7 flex justify-center gap-3">
            <button
              type="button"
              className={navBtn}
              onClick={() => swiperRefOne.current?.slidePrev()}
            >
              <FaArrowLeftLong />
            </button>

            <button
              type="button"
              className={navBtn}
              onClick={() => swiperRefOne.current?.slideNext()}
            >
              <FaArrowRightLong />
            </button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className={cn(section, "bg-blue-900")}>
        <div className={container}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white p-5 text-center shadow-lg"
              >
                <Image
                  src={review.img}
                  alt={review.title}
                  sizes="72px"
                  className="mx-auto h-auto w-16"
                />

                <h4 className="mt-4 text-xl font-black text-blue-900">
                  {review.title}
                </h4>

                <div className="mt-2">
                  <Stars />
                </div>

                <p className="mt-2 text-sm font-bold text-slate-600">
                  04 out of 05
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Instructor CTA */}
      <section className="relative overflow-hidden bg-slate-900 bg-[url('/image/driving-instructor.webp')] bg-cover bg-top bg-no-repeat">
        <div className="absolute inset-0 bg-black/70" />

        <div
          className={cn(
            container,
            "relative flex min-h-[430px] items-end justify-center py-12 lg:min-h-[560px]",
          )}
        >
          <div className="max-w-2xl text-center">
            <h3 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
              Are you a driving instructor? And super friendly?
            </h3>

            <p className="mt-3 text-base font-medium text-white/85">
              Become a freelance driving instructor.
            </p>

            <div className="mt-6">
              <Link href="#" className={primaryBtn}>
                Join us a driving instructor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={cn(section, "bg-white")}>
        <div className={container}>
          <SectionHeading small="FAQ" title="Frequently Asked Question" />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-sm">
                <h3 className="text-xl font-black leading-tight text-blue-900">
                  Got a question about lessons, courses, or documents?
                </h3>

                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                  Fill out the form below and we’ll respond as soon as possible.
                </p>

                <form className="mt-5">
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="first-name"
                        className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-700"
                      >
                        First Name
                      </label>

                      <input
                        type="text"
                        id="first-name"
                        className={inputClass}
                        placeholder="Write name here"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="last-name"
                        className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-700"
                      >
                        Last Name
                      </label>

                      <input
                        type="text"
                        id="last-name"
                        className={inputClass}
                        placeholder="Write name here"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-700"
                      >
                        Email
                      </label>

                      <input
                        type="email"
                        id="email"
                        className={inputClass}
                        placeholder="Write email address"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone-number"
                        className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-700"
                      >
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        id="phone-number"
                        className={inputClass}
                        placeholder="Write phone number"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="question"
                        className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-700"
                      >
                        Ask your questions
                      </label>

                      <textarea
                        rows={4}
                        id="question"
                        className={inputClass}
                        placeholder="Write question here"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        className={cn(primaryBtn, "w-full sm:w-auto")}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-2.5">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                      className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-sm font-black text-blue-900 transition hover:bg-slate-50"
                    >
                      <span>{faq.q}</span>
                      <span className="text-xl leading-none">
                        {openFaq === index ? "−" : "+"}
                      </span>
                    </button>

                    {openFaq === index && (
                      <div className="border-t border-slate-100 px-4 py-3.5 text-sm font-medium leading-6 text-slate-600">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment */}
      <section className={cn(section, "bg-slate-50")}>
        <div className={container}>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="mb-6 max-w-xl">
                <h5 className={badge}>Payment System</h5>

                <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight text-blue-900 sm:text-3xl lg:text-4xl">
                  Secure & Flexible Payment System
                </h2>
              </div>

              <Swiper
                spaceBetween={14}
                breakpoints={{
                  300: { slidesPerView: 2 },
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 5 },
                  1440: { slidesPerView: 6 },
                }}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                freeMode
                loop
                modules={[FreeMode, Autoplay, Navigation]}
                onSwiper={(swiper) => (swiperRefThree.current = swiper)}
                className="w-full"
              >
                {payments.map((payment, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex h-20 items-center justify-center rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
                      <Image
                        src={payment}
                        alt={`Payment method ${index + 1}`}
                        sizes="96px"
                        className="max-h-10 w-auto object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  className={navBtn}
                  onClick={() => swiperRefThree.current?.slidePrev()}
                >
                  <FaArrowLeftLong />
                </button>

                <button
                  type="button"
                  className={navBtn}
                  onClick={() => swiperRefThree.current?.slideNext()}
                >
                  <FaArrowRightLong />
                </button>
              </div>
            </div>

            <div className="hidden lg:col-span-4 lg:block">
              <Image
                src={homePay}
                alt="Secure payment"
                sizes="33vw"
                className="h-auto w-full rounded-2xl object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className={cn(section, "bg-white")}>
        <div className={container}>
          <SectionHeading small="Blog" title="News and Insights" />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className={cn(
                  "overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm",
                  cardHover,
                )}
              >
                <Image
                  src={blogImg}
                  alt="Blog thumbnail"
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="h-40 w-full object-cover"
                />

                <div className="p-4">
                  <h4 className="text-base font-black leading-6 text-blue-900">
                    <Link href="#">
                      10 Tips to Pass Your Driving Test on the First Try
                    </Link>
                  </h4>

                  <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                    Nervous about your road test? Discover practical tips,
                    common...
                  </p>

                  <div className="mt-4">
                    <Link href="#" className={outlineBtn}>
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/blogs" className={primaryBtn}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
