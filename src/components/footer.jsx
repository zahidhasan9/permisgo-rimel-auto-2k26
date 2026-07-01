"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Components
import BottomMenu from "./bottom-menu";

// Icons
import {
  FaInstagram,
  FaLinkedin,
  FaPhoneSquareAlt,
  FaPinterestSquare,
  FaYoutube,
} from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import { IoChevronDown } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

// Images
import downCar from "../../public/image/down-car.png";
import Logo from "../../public/image/logo.png";

const Footer = () => {
  const date = new Date().getFullYear();
  const [openTime, setOpenTime] = useState(false);

  const socialLinks = [
    { icon: <FaFacebook />, href: "" },
    { icon: <FaInstagram />, href: "" },
    { icon: <FaLinkedin />, href: "" },
    { icon: <FaPinterestSquare />, href: "" },
    { icon: <FaYoutube />, href: "" },
  ];

  const openingTimes = [
    "Monday 10am - 1pm and 3pm - 7pm",
    "Tuesday 10am - 1pm and 3pm - 7pm",
    "Wednesday 10am - 1pm and 3pm - 7pm",
    "Thursday 10am - 1pm and 3pm - 7pm",
    "Friday 10am - 1pm and 3pm - 7pm",
    "Saturday 10am - 1pm and 3pm - 7pm",
    "Sunday By Appointment",
  ];

  const aboutLinks = [
    { name: "Who are we?", href: "/who-are-we" },
    { name: "Where are we?", href: "/where-are-we" },
    { name: "Monitor Privacy Policy", href: "/monitor-privacy-policy" },
    { name: "Student Privacy Policy", href: "/student-privacy-policy" },
    { name: "Manage my cookies", href: "/manage-my-cookies" },
    { name: "Legal Notice", href: "/legal-notice" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    {
      name: "General terms & conditions",
      href: "/general-terms-and-conditions",
    },
  ];

  const partnershipLinks = [
    { name: "Log in to my partner area", href: "/login-to-my-partner-area" },
    {
      name: "Request for school partnership",
      href: "/request-for-school-partnership",
    },
    { name: "B2B partnership request", href: "/b2b-partnership-request" },
    {
      name: "Becoming an independent instructor",
      href: "/becoming-an-independent-instructor",
    },
    { name: "Driving instructor salary", href: "/driving-instructor-salary" },
    { name: "Monitor FAQs", href: "/monitor-faqs" },
  ];

  const serviceLinks = [
    {
      name: "Frequently Asked Questions",
      href: "/frequently-asked-questions",
    },
    { name: "Highway Code Glossary", href: "/highway-code-glossary" },
    { name: "Driving licence glossary", href: "/driving-licence-glossary" },
    { name: "Person with a disability", href: "/person-with-a-disability" },
  ];

  const supportLinks = [
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
    { name: "Privacy & Cookies", href: "/privacy-and-cookies" },
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "Disclaimer", href: "/disclaimer" },
  ];

  const footerLinkClass =
    "text-[15px] leading-6 text-white/75 transition-all duration-300 hover:pl-1 hover:text-white";

  return (
    <>
      <BottomMenu />

      {/* Car Image */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-7xl justify-end px-4 pt-8 sm:px-6 lg:px-8 lg:pt-12">
          <Image
            src={downCar}
            alt="Car"
            priority
            className="h-auto w-[190px] sm:w-[230px] md:w-[270px] lg:w-[300px]"
          />
        </div>
      </section>

      <footer className="overflow-hidden bg-[#103677]">
        {/* Main Footer */}
        <div className="relative px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {/* Soft background effect */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[var(--second-color)]/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-[1.35fr_1fr_1.15fr_1fr] xl:gap-12">
              {/* Company Info */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-lg backdrop-blur-sm">
                <Link href="/" className="inline-block">
                  <Image
                    src={Logo}
                    alt="Permisgo Logo"
                    priority
                    className="mb-5 h-auto w-[165px] sm:w-[185px]"
                  />
                </Link>

                <p className="max-w-sm text-[15px] leading-7 text-white/75">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quidem.
                </p>

                {/* Contact Info */}
                <ul className="mt-6 space-y-4 text-[15px] text-white/80">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                      <FaPhoneSquareAlt />
                    </span>
                    <span className="leading-7">+61 4584 5887</span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                      <MdOutlineEmail />
                    </span>
                    <span className="break-all leading-7">
                      info@permisgoautoecole.com
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                      <GrLocation />
                    </span>
                    <span className="leading-7">
                      Road no-2, Sector-6, Uttara, Dhaka, Bangladesh
                    </span>
                  </li>
                </ul>

                {/* Social */}
                <div className="mt-7">
                  <ul className="flex flex-wrap items-center gap-3">
                    {socialLinks.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[18px] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--second-color)] hover:text-white"
                        >
                          {item.icon}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Opening Time */}
                <div className="mt-7">
                  <button
                    type="button"
                    onClick={() => setOpenTime(!openTime)}
                    className="flex w-full items-center justify-between rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-left text-[14px] leading-6 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15"
                  >
                    <span>{openingTimes[0]}</span>
                    <IoChevronDown
                      className={`ml-3 shrink-0 text-xl transition-transform duration-300 ${
                        openTime ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openTime && (
                    <ul className="mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#0b285b] text-[14px] text-white/80 shadow-xl">
                      {openingTimes.map((time, index) => (
                        <li
                          key={index}
                          onClick={() => setOpenTime(false)}
                          className="cursor-pointer px-4 py-2.5 transition-all duration-300 hover:bg-white/10 hover:text-white"
                        >
                          {time}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* About */}
              <div className="pt-1">
                <h4 className="relative mb-6 text-[20px] font-semibold text-white after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-10 after:rounded-full after:bg-[var(--second-color)]">
                  About
                </h4>

                <ul className="space-y-3">
                  {aboutLinks.map((link, index) => (
                    <li key={index}>
                      <Link href={link.href} className={footerLinkClass}>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Partnership */}
              <div className="pt-1">
                <h4 className="relative mb-6 text-[20px] font-semibold text-white after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-10 after:rounded-full after:bg-[var(--second-color)]">
                  Partnership Request
                </h4>

                <ul className="space-y-3">
                  {partnershipLinks.map((link, index) => (
                    <li key={index}>
                      <Link href={link.href} className={footerLinkClass}>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="pt-1">
                <h4 className="relative mb-6 text-[20px] font-semibold text-white after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-10 after:rounded-full after:bg-[var(--second-color)]">
                  Our Services
                </h4>

                <ul className="space-y-3">
                  {serviceLinks.map((link, index) => (
                    <li key={index}>
                      <Link href={link.href} className={footerLinkClass}>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 bg-[#0b2b60] px-4 py-5 pb-20 sm:px-6 md:pb-5 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-white/70 transition-all duration-300 hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="text-center text-[14px] leading-6 text-white/70 lg:text-right">
                &copy; {date} Permisgo Auto Ecole | All Right Reserved. Design &
                Development By{" "}
                <Link
                  href="https://www.digitalmarketingbd.com/"
                  className="font-medium text-white transition-all duration-300 hover:text-[var(--second-color)]"
                >
                  Digital Marketing Solution (Pvt.) Ltd.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
