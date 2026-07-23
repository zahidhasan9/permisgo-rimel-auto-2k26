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

  const instructorInfo = [
    {
      name: "Robert Fox",
      experience: "05 Years+",
    },
    {
      name: "Ronald Richards",
      experience: "05 Years+",
    },
    {
      name: "Arlene McCoy",
      experience: "05 Years+",
    },
    {
      name: "Bessie Cooper",
      experience: "05 Years+",
    },
  ];

  const [activeInstructor, setActiveInstructor] = useState(0);

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
      <section className="bg-white pb-20 pt-[72px]">
        <div className="mx-auto w-full max-w-[1260px] px-5 xl:px-0">
          {/* Trust Indicator label */}
          <div className="flex justify-center">
            <div className="flex h-[42px] items-center justify-center rounded-[10px] bg-[#E7ECF4] px-[18px]">
              <span className="text-[13px] font-semibold leading-none text-[#2BBF3A]">
                Trust Indicator
              </span>
            </div>
          </div>

          {/* Indicator cards */}
          <div className="mt-12 grid grid-cols-1 gap-6 px-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:px-0">
            {indicators.map((item, index) => (
              <div
                key={item.title || index}
                className="h-[112px] rounded-[18px] bg-[#E7ECF4] [transform:skewX(-8deg)]"
              >
                <div className="flex h-full items-center gap-4 px-8 [transform:skewX(8deg)] lg:px-10">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                    <Image
                      src={item.img}
                      alt={item.title}
                      sizes="48px"
                      className="h-auto max-h-12 w-auto max-w-12 object-contain"
                    />
                  </div>

                  <h4 className="text-[16px] font-semibold leading-[22px] text-[#111111]">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-[60px] md:py-[78px]">
        <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6">
          {/* Section heading */}
          <div className="text-center">
            <span className="inline-flex min-h-[30px] items-center justify-center rounded-[7px] bg-[#E7ECF4] px-[14px] text-[11px] font-semibold text-[#20C943]">
              Services
            </span>

            <h2 className="mt-5 text-[25px] font-extrabold leading-tight text-[#202020] md:text-[29px]">
              Your driving licence with Permisgo
            </h2>
          </div>

          {/* Services grid */}
          <div className="relative mt-[42px]">
            {/* Dotted connector line – second row */}
            <div className="pointer-events-none absolute left-[21%] right-[21%] top-[350px] z-0 hidden border-t-2 border-dotted border-[#168BFF] xl:block" />

            <div className="relative z-10 grid grid-cols-1 gap-[18px] sm:grid-cols-2 xl:grid-cols-3">
              {services.map((service, index) => (
                <div
                  key={service.title || index}
                  className={cn(
                    "group relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-[8px] bg-[#E7ECF4] px-5 py-8 text-center",
                    "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                  )}
                >
                  {/* Service icon */}
                  <div className="flex h-[70px] w-[78px] items-center justify-center">
                    <Image
                      src={service.img}
                      alt={service.title}
                      sizes="78px"
                      className="max-h-[70px] w-auto max-w-[78px] object-contain"
                    />
                  </div>

                  {/* Service title */}
                  <h4 className="mt-5 min-h-[42px] max-w-[240px] text-[15px] font-extrabold leading-[21px] text-[#101010]">
                    {service.title}
                  </h4>

                  {/* Price */}
                  <p className="mt-1 text-[15px] font-bold leading-5 text-[#16C53A]">
                    {service.price}
                  </p>

                  {/* Button */}
                  <Link
                    href={service.href || "#"}
                    className={cn(
                      "mt-5 inline-flex min-h-[38px] items-center justify-center rounded-[7px]",
                      "border border-[#064CB5] px-[18px]",
                      "text-[12px] font-bold text-[#F02036]",
                      "transition-all duration-300",
                      "hover:border-[#ED1F3B] hover:bg-[#ED1F3B] hover:text-white",
                      "focus:outline-none focus:ring-2 focus:ring-[#ED1F3B]/30",
                    )}
                  >
                    Learn more
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-[#F7F9FC] py-[60px] md:py-[80px]">
        <div className="mx-auto w-full max-w-[1300px] px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-[46px] text-center">
            <span className="inline-flex min-h-[28px] items-center justify-center rounded-[7px] bg-[#E8EDF4] px-[13px] text-[11px] font-semibold text-[#20C943]">
              Location
            </span>

            <h2 className="mt-5 text-[26px] font-extrabold leading-tight text-[#202020] md:text-[31px]">
              Permisgo near you
            </h2>

            <p className="mt-4 text-[12px] font-medium text-[#555B65] md:text-[13px]">
              Lessons near your home, your work, your school… we&apos;re
              everywhere!
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left side */}
            <div className="lg:col-span-5">
              {/* Search */}
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                      stroke="#68717E"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M16.5 16.5L21 21"
                      stroke="#68717E"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>

                <input
                  type="text"
                  placeholder="Search by address, city..."
                  className="h-[50px] w-full rounded-[10px] border-0 bg-[#E8EBF0] pl-12 pr-4 text-[13px] font-medium text-[#30343B] outline-none placeholder:text-[#707782] focus:ring-2 focus:ring-[#174FA5]/20"
                />
              </div>

              {/* Vehicle type */}
              <div className="mt-8">
                <h4 className="mb-4 text-[16px] font-extrabold leading-6 text-[#17191D]">
                  Find lessons based on your vehicle type
                </h4>

                <div className="rounded-[10px] bg-[#E9EDF5] p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {mapTabs.map((tab) => (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveTab(tab.key)}
                        className={cn(
                          "flex min-h-[39px] items-center justify-center rounded-[8px] border px-3",
                          "text-center text-[11px] font-bold leading-4 transition-all duration-300",
                          activeTab === tab.key
                            ? "border-[#174FA5] bg-[#B8C9E5] text-[#12458D]"
                            : "border-transparent bg-white text-[#17191D] hover:border-[#174FA5] hover:text-[#174FA5]",
                        )}
                      >
                        {tab.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Available teacher */}
              <div className="mt-8">
                <h4 className="mb-4 text-[16px] font-extrabold leading-6 text-[#17191D]">
                  Find lessons based on available teacher near you
                </h4>

                <div className="rounded-[10px] bg-[#E9EDF5] p-4">
                  <button
                    type="button"
                    className="flex h-[42px] w-full items-center justify-center rounded-[8px] border border-[#174FA5] bg-[#B8C9E5] px-4 text-[11px] font-bold text-[#123F7A] transition duration-300 hover:bg-[#174FA5] hover:text-white"
                  >
                    Start Searching
                  </button>
                </div>
              </div>
            </div>

            {/* Map side */}
            <div className="lg:col-span-7">
              <div className="relative min-h-[430px] overflow-hidden rounded-[8px] bg-[#DDE8EC]">
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="430"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-[430px] w-full border-0"
                  title="Permisgo location map"
                />

                {/* Teacher information card */}
                <div className="absolute bottom-5 right-5 w-[300px] max-w-[calc(100%-40px)] rounded-[12px] border-2 border-[#174FA5] bg-white p-3 shadow-[0_12px_35px_rgba(15,44,88,0.24)]">
                  {/* Card top */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D9E5F4] text-[12px] font-extrabold text-[#174FA5]">
                        RF
                      </div>

                      <div>
                        <h4 className="text-[13px] font-extrabold text-[#174FA5]">
                          Robert Fox
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="text-right">
                        <p className="text-[10px] font-semibold text-[#555B65]">
                          Experience 05 Years+
                        </p>

                        <div className="mt-1 text-[12px] leading-none tracking-[2px] text-[#174FA5]">
                          ★★★★★
                        </div>
                      </div>

                      <button
                        type="button"
                        aria-label="Close teacher card"
                        className="flex h-5 w-5 items-center justify-center text-[18px] font-medium leading-none text-[#272B30]"
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mt-3 rounded-[8px] bg-[#EEF1F6] px-3 py-3">
                    <p className="mb-3 text-[10px] font-medium text-[#7B828D]">
                      Available Time
                    </p>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-[7px]">
                      <p className="text-[9px] font-semibold text-[#333840]">
                        Mar&nbsp; 08h00 - 10h30
                      </p>

                      <p className="text-[9px] font-semibold text-[#333840]">
                        Apr&nbsp; 08h00 - 10h30
                      </p>

                      <p className="text-[9px] font-semibold text-[#333840]">
                        May&nbsp; 08h00 - 10h30
                      </p>

                      <p className="text-[9px] font-semibold text-[#333840]">
                        Jun&nbsp; 08h00 - 10h30
                      </p>

                      <p className="text-[9px] font-semibold text-[#333840]">
                        Nov&nbsp; 08h00 - 10h30
                      </p>

                      <p className="text-[9px] font-semibold text-[#333840]">
                        Dec&nbsp; 08h00 - 10h30
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-3 flex h-[40px] w-full items-center justify-center rounded-[7px] bg-[#E9243F] px-4 text-[10px] font-extrabold text-white transition duration-300 hover:bg-[#C91831]"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="overflow-hidden bg-[#F5F7FA] pb-[82px] pt-[10px]">
        <div className="mx-auto w-full max-w-[1210px] px-4 xl:px-0">
          {/* Heading */}
          <div className="mb-[54px] text-center">
            <span className="inline-flex h-[38px] min-w-[100px] items-center justify-center rounded-[8px] bg-[#E7ECF4] px-4 text-[11px] font-medium leading-none text-[#28C34B]">
              Instructors
            </span>

            <h2 className="mt-[22px] text-[27px] font-extrabold leading-[38px] text-[#171717] md:text-[31px]">
              You&apos;ll love our instructors
            </h2>
          </div>

          <Swiper
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={24}
            speed={600}
            watchOverflow={true}
            loop={instructors.length > 4}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              480: {
                slidesPerView: 2,
                spaceBetween: 18,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            modules={[Autoplay, Navigation]}
            onSwiper={(swiper) => {
              swiperRefOne.current = swiper;
              setActiveInstructor(swiper.realIndex);
            }}
            onSlideChange={(swiper) => {
              setActiveInstructor(swiper.realIndex);
            }}
            className="w-full"
          >
            {instructors.map((img, index) => {
              const info = instructorInfo[index % instructorInfo.length];
              const isActive = activeInstructor === index;

              return (
                <SwiperSlide key={index} className="h-auto">
                  <div
                    className={cn(
                      "box-border flex h-[308px] w-full flex-col items-center",
                      "rounded-[10px] border-2 bg-[#E7ECF4]",
                      "px-[24px] pb-[20px] pt-[24px] text-center",
                      "transition-colors duration-300",
                      isActive ? "border-[#245AA8]" : "border-transparent",
                    )}
                  >
                    {/* Fixed avatar wrapper */}
                    <div className="relative h-[64px] w-[64px] shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={img}
                        alt={info.name}
                        fill
                        sizes="64px"
                        priority={index < 4}
                        className="!h-full !w-full rounded-full object-cover"
                      />
                    </div>

                    {/* Name */}
                    <h4 className="mt-[22px] text-[15px] font-extrabold leading-[20px] text-[#123E8C]">
                      {info.name}
                    </h4>

                    {/* Experience box */}
                    <div className="mt-[17px] flex h-[88px] w-full shrink-0 flex-col items-center justify-center rounded-[8px] bg-white px-3">
                      <p className="text-[11px] font-normal leading-[16px] text-[#70747B]">
                        Experience{" "}
                        <span className="font-extrabold text-[#20242A]">
                          {info.experience}
                        </span>
                      </p>

                      <div className="mt-[10px] flex items-center justify-center gap-[7px] text-[12px] leading-none text-[#123E8C]">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-[15px] grid w-full grid-cols-2 gap-[13px]">
                      <Link
                        href="#"
                        className="flex h-[38px] items-center justify-center rounded-[6px] border border-[#D72638] bg-[#D72638] px-2 text-[10px] font-bold leading-none text-white transition-colors duration-300 hover:bg-[#B91F30]"
                      >
                        Book Now
                      </Link>

                      <Link
                        href="#"
                        className="flex h-[38px] items-center justify-center rounded-[6px] border border-[#D72638] bg-transparent px-2 text-[10px] font-bold leading-none text-[#123E8C] transition-colors duration-300 hover:bg-[#D72638] hover:text-white"
                      >
                        Message
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation */}
          <div className="mt-[48px] flex items-center justify-center gap-[12px]">
            <button
              type="button"
              aria-label="Previous instructor"
              onClick={() => swiperRefOne.current?.slidePrev()}
              className="flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-[#E7ECF4] text-[14px] text-[#D72638] transition-colors duration-300 hover:bg-[#DDE3EC]"
            >
              <FaArrowLeftLong />
            </button>

            <button
              type="button"
              aria-label="Next instructor"
              onClick={() => swiperRefOne.current?.slideNext()}
              className="flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-[#D72638] text-[14px] text-white transition-colors duration-300 hover:bg-[#B91F30]"
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
      {/* FAQ */}
      <section className="bg-white py-[70px] md:py-[86px]">
        <div className="mx-auto w-full max-w-[1220px] px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-[46px] text-center">
            <span className="inline-flex h-[30px] min-w-[54px] items-center justify-center rounded-[7px] bg-[#E8EDF4] px-[13px] text-[11px] font-semibold leading-none text-[#27BF43]">
              FAQ
            </span>

            <h2 className="mt-[19px] text-[27px] font-extrabold leading-[36px] text-[#1A1A1A] md:text-[31px]">
              Frequently Asked Question
            </h2>
          </div>

          {/* FAQ content */}
          <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-[460px_minmax(0,1fr)] lg:items-start">
            {/* Left side */}
            <div>
              <div className="mb-[27px]">
                <h3 className="max-w-[390px] text-[20px] font-extrabold leading-[24px] text-[#202020]">
                  Got a question about lessons,
                  <br />
                  courses, or documents?
                </h3>

                <p className="mt-[14px] text-[11px] font-medium leading-[18px] text-[#676D76]">
                  Fill out the form below and we&apos;ll respond as soon as
                  possible.
                </p>
              </div>

              {/* Form card */}
              <div className="rounded-[8px] bg-[#E7ECF4] px-[24px] pb-[32px] pt-[27px]">
                <h4 className="text-[15px] font-extrabold leading-[20px] text-[#202020]">
                  Get in touch
                </h4>

                <p className="mt-[13px] text-[11px] font-medium leading-[17px] text-[#646A73]">
                  Fill out this form with necessary information
                </p>

                <form className="mt-[24px]">
                  <div className="grid grid-cols-1 gap-x-[20px] gap-y-[18px] sm:grid-cols-2">
                    {/* First name */}
                    <div>
                      <label
                        htmlFor="first-name"
                        className="mb-[8px] block text-[10px] font-semibold leading-none text-[#25282D]"
                      >
                        First Name
                      </label>

                      <input
                        type="text"
                        id="first-name"
                        placeholder="Write name here"
                        className="h-[38px] w-full rounded-[8px] border border-[#C8D1DD] bg-white px-[13px] text-[10px] font-medium text-[#25282D] outline-none placeholder:text-[#A0A5AD] focus:border-[#174B9B] focus:ring-2 focus:ring-[#174B9B]/10"
                      />
                    </div>

                    {/* Last name */}
                    <div>
                      <label
                        htmlFor="last-name"
                        className="mb-[8px] block text-[10px] font-semibold leading-none text-[#25282D]"
                      >
                        Last Name
                      </label>

                      <input
                        type="text"
                        id="last-name"
                        placeholder="Write name here"
                        className="h-[38px] w-full rounded-[8px] border border-[#C8D1DD] bg-white px-[13px] text-[10px] font-medium text-[#25282D] outline-none placeholder:text-[#A0A5AD] focus:border-[#174B9B] focus:ring-2 focus:ring-[#174B9B]/10"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-[8px] block text-[10px] font-semibold leading-none text-[#25282D]"
                      >
                        Email address
                      </label>

                      <input
                        type="email"
                        id="email"
                        placeholder="Write Email address"
                        className="h-[38px] w-full rounded-[8px] border border-[#C8D1DD] bg-white px-[13px] text-[10px] font-medium text-[#25282D] outline-none placeholder:text-[#A0A5AD] focus:border-[#174B9B] focus:ring-2 focus:ring-[#174B9B]/10"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone-number"
                        className="mb-[8px] block text-[10px] font-semibold leading-none text-[#25282D]"
                      >
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        id="phone-number"
                        placeholder="Write phone number"
                        className="h-[38px] w-full rounded-[8px] border border-[#C8D1DD] bg-white px-[13px] text-[10px] font-medium text-[#25282D] outline-none placeholder:text-[#A0A5AD] focus:border-[#174B9B] focus:ring-2 focus:ring-[#174B9B]/10"
                      />
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="question"
                        className="mb-[8px] block text-[10px] font-semibold leading-none text-[#25282D]"
                      >
                        Message
                      </label>

                      <textarea
                        id="question"
                        placeholder="Write message"
                        className="h-[172px] w-full resize-none rounded-[8px] border border-[#C8D1DD] bg-white px-[13px] py-[12px] text-[10px] font-medium leading-[16px] text-[#25282D] outline-none placeholder:text-[#A0A5AD] focus:border-[#174B9B] focus:ring-2 focus:ring-[#174B9B]/10"
                      />
                    </div>

                    {/* Submit */}
                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        className="inline-flex h-[40px] min-w-[82px] items-center justify-center rounded-[7px] bg-[#E4223C] px-[20px] text-[11px] font-bold text-white transition-colors duration-300 hover:bg-[#C91830]"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Right accordion */}
            <div className="space-y-[20px]">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-[8px] bg-[#F4F6F9]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex min-h-[64px] w-full items-center justify-between gap-5 rounded-[8px] bg-[#194A99] px-[25px] py-[16px] text-left transition-colors duration-300 hover:bg-[#123F86]"
                    >
                      <span className="text-[13px] font-extrabold leading-[19px] text-white">
                        {faq.q}
                      </span>

                      <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center text-[18px] font-normal leading-none text-white">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="bg-[#F4F6F9] px-[16px] pb-[18px] pt-[14px]">
                        <p className="text-[11px] font-medium leading-[18px] text-[#4F555E]">
                          {faq.a}
                        </p>

                        {faq.link && (
                          <Link
                            href="#"
                            className="mt-[12px] inline-block text-[11px] font-medium text-[#194A99] underline underline-offset-2"
                          >
                            {faq.link}
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
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
