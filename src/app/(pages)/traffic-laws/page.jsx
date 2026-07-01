"use client";

import Image from "next/image";
import Link from "next/link";

// Images
import broomLogo from "../../../../public/image/broomLogo.png";
import googleLogo from "../../../../public/image/googleLogo.png";
import laws3 from "../../../../public/image/laws3.png";
import map from "../../../../public/image/map.png";
import road from "../../../../public/image/road.png";
import trafficHero from "../../../../public/image/traffic-hero.png";
import priceBatch from "../../../../public/image/traffic-two-price-batch.png";
import trustLogo from "../../../../public/image/trustLogo.png";

// Icons
import { FaStar, FaTimesCircle } from "react-icons/fa";
import { FaLocationDot, FaSquareCheck } from "react-icons/fa6";

// Components
import Testimonials from "@/components/testimonials";

const packs = [
  {
    title: "Eco Code",
    subtitle: "Complete revision + Administrative procedures",
    price: "FREE",
    oldPrice: null,
    badge: false,
    bestValue: false,
    features: [
      { text: "Duration: Unlimited", active: true },
      { text: "Access to the code app", active: true },
      { text: "Video course and online manual", active: true },
      { text: "5000 questions and 30 practice exams", active: true },
    ],
  },
  {
    title: "Zen Code",
    subtitle: "Complete revision + Administrative procedures",
    price: "€9.99",
    oldPrice: "€19.99",
    badge: true,
    bestValue: true,
    features: [
      { text: "Duration: 12 month package", active: true },
      { text: "Access to the code app", active: true },
      { text: "Video course and online manual", active: true },
      { text: "5000 questions and 30 practice exams", active: true },
      { text: "Administrative procedures & Coaching", active: false },
    ],
  },
  {
    title: "Success Code",
    subtitle: "Complete revision + Administrative procedures",
    price: "€33.99",
    oldPrice: "€43.99",
    badge: true,
    bestValue: false,
    features: [
      { text: "Duration: Unlimited", active: true },
      { text: "Access to the code app", active: true },
      { text: "Video course and online manual", active: true },
      { text: "5000 questions and 30 practice exams", active: true },
      { text: "A place for a highway code exam", active: true },
    ],
  },
];

const workSteps = [
  {
    number: "01",
    title: "Traffic Laws",
    description:
      "Suitable for all profiles, our E-learning application accompanies you at every step towards success in coding.",
  },
  {
    number: "02",
    title: "Driving Lessons",
    description:
      "Book online and take advantage of a dedicated e-learning program on our app to optimize every driving lesson.",
  },
  {
    number: "03",
    title: "Personalized follow-up",
    description:
      "Book online and take advantage of a dedicated e-learning program on our app to optimize every driving lesson.",
  },
  {
    number: "04",
    title: "Procedures and review",
    description:
      "Suitable for all profiles, our E-learning application accompanies you at every step towards success in coding.",
  },
];

const reviews = [
  {
    logo: broomLogo,
    title: "VroomVroom",
    rating: "04 out of 05",
  },
  {
    logo: googleLogo,
    title: "Google Ratings",
    rating: "04 out of 05",
  },
  {
    logo: trustLogo,
    title: "Trustpilot Ratings",
    rating: "04 out of 05",
  },
];

const TrafficLaws = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-emerald-50 px-4 py-10 sm:px-6 lg:px-12 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="mb-5 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Your <span className="text-orange-500">FREE</span> Highway code
              </h1>

              <p className="max-w-xl text-base leading-7 text-slate-700 sm:text-lg">
                Sign up for the code, and while you are practicing, start
                driving. It’s the winning combo for the practicing, start
                driving. It’s the winning rapid progress.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Link
                  href="#"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-amber-600"
                >
                  Register for FREE
                </Link>

                <Link
                  href="#"
                  className="inline-flex w-full items-center justify-center rounded-lg border-2 border-emerald-700 px-6 py-3 text-base font-semibold text-orange-500 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  Discover all our offers
                </Link>
              </div>
            </div>

            <div>
              <Image
                src={trafficHero}
                alt="Highway code learning illustration"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white px-4 py-10 sm:px-6 lg:px-12 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-emerald-700 sm:text-4xl">
              Permisgo’s Highway Code Packs
            </h2>
            <p className="mt-3 text-slate-600">What is your need?</p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {packs.map((pack) => (
              <div
                key={pack.title}
                className="relative rounded-3xl border-2 border-emerald-700 bg-white px-5 py-10 shadow-sm transition hover:shadow-xl"
              >
                {pack.badge && (
                  <Image
                    src={priceBatch}
                    alt="Best value badge"
                    width={70}
                    height={70}
                    sizes="70px"
                    className="absolute -top-10 right-5 h-auto w-[70px]"
                  />
                )}

                <div className="text-center">
                  {pack.bestValue && (
                    <h6 className="mb-2 font-semibold text-emerald-700">
                      Best Value
                    </h6>
                  )}

                  <h3 className="text-3xl font-bold text-orange-500 sm:text-4xl">
                    {pack.title}
                  </h3>

                  <p className="mt-3 text-slate-600">{pack.subtitle}</p>
                </div>

                <div className="mx-auto my-7 w-full max-w-[240px] rounded-full border border-emerald-700 px-4 py-2 text-center">
                  <h4 className="text-2xl font-bold text-emerald-700 sm:text-3xl">
                    {pack.price}{" "}
                    {pack.oldPrice && (
                      <sub className="text-base font-medium text-slate-500 line-through">
                        {pack.oldPrice}
                      </sub>
                    )}
                  </h4>
                </div>

                <h5 className="text-center text-2xl font-semibold text-emerald-700">
                  Package Contents
                </h5>

                <div className="mt-8 h-[250px] overflow-y-auto pr-2">
                  <ul className="space-y-3">
                    {pack.features.map((feature) => (
                      <li
                        key={feature.text}
                        className="flex gap-3 text-base leading-7 text-slate-700 sm:text-lg"
                      >
                        {feature.active ? (
                          <FaSquareCheck className="mt-1 shrink-0 text-xl text-emerald-700" />
                        ) : (
                          <FaTimesCircle className="mt-1 shrink-0 text-xl text-orange-500" />
                        )}
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 text-center">
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-7 py-3 text-base font-semibold text-white transition hover:bg-amber-600"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Labelled Driving Schools */}
      <section className="bg-white px-4 py-10 sm:px-6 lg:px-12 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-emerald-700 px-6 py-10 lg:rounded-[120px] lg:px-16 lg:py-14">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_300px]">
              <div>
                <h3 className="text-3xl font-bold text-white sm:text-4xl">
                  écoles de conduite labellisées
                </h3>
                <p className="mt-4 max-w-2xl text-white/90">
                  Des centres de formation agréés, respectant des standards de
                  qualité élevés.
                </p>
              </div>

              <Image
                src={laws3}
                alt="Approved driving school illustration"
                sizes="(max-width: 1024px) 180px, 300px"
                className="mx-auto h-auto w-[180px] lg:w-[300px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-10 lg:py-14">
        <div className="mb-10 px-4 text-center">
          <h3 className="text-3xl font-bold text-slate-950 sm:text-4xl">
            How It Works
          </h3>
          <p className="mt-3 text-slate-600">
            Driving licence learning transformed by permisgo
          </p>
        </div>

        <Image
          src={road}
          alt="Road process line"
          sizes="100vw"
          className="h-auto w-full"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:-mt-16 lg:grid-cols-4">
            {workSteps.map((step) => (
              <div key={step.number}>
                <div className="relative mx-auto w-[70px]">
                  <div className="absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-full bg-emerald-700 px-2 py-1">
                    <h5 className="text-xs font-bold text-white">
                      {step.number}
                    </h5>
                  </div>

                  <Image
                    src={map}
                    alt={`${step.title} icon`}
                    width={60}
                    height={60}
                    sizes="60px"
                    className="mx-auto h-auto w-[60px]"
                  />
                </div>

                <div className="mt-4 rounded-xl bg-emerald-700 p-5 text-center">
                  <h4 className="text-xl font-bold text-white">{step.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-white/90">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* After Code Section */}
      <section className="bg-white px-4 py-10 sm:px-6 lg:px-12 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-emerald-700 px-5 py-10 text-center sm:px-8 lg:py-14">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              And After your code?
            </h2>
            <p className="mt-3 text-white/90">
              Discover Our Lisence Offers Starting at $500
            </p>

            <div className="mt-7">
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-7 py-3 text-base font-semibold text-white transition hover:bg-amber-600"
              >
                Discover All Our Offers
              </Link>
            </div>

            <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-white p-6">
                <FaLocationDot className="mx-auto mb-4 text-4xl text-emerald-700" />
                <h4 className="text-xl font-semibold text-slate-950">
                  71 Approved Agencies
                </h4>
              </div>

              <div className="rounded-xl bg-white p-6">
                <FaStar className="mx-auto mb-4 text-4xl text-emerald-700" />
                <h4 className="text-xl font-semibold text-slate-950">
                  100% of our students are satisfied
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Logo Section */}
      <section className="bg-emerald-700 px-4 py-10 sm:px-6 lg:px-12 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review.title}
                className="rounded-2xl border-4 border-slate-200 bg-white p-6 text-center"
              >
                <Image
                  src={review.logo}
                  alt={`${review.title} logo`}
                  width={70}
                  height={70}
                  sizes="70px"
                  className="mx-auto mb-5 h-auto w-[70px]"
                />

                <h4 className="text-2xl font-bold text-emerald-700 sm:text-3xl">
                  {review.title}
                </h4>

                <ul className="mt-4 flex justify-center gap-2 text-xl text-amber-400">
                  {[...Array(5)].map((_, index) => (
                    <li key={index}>
                      <FaStar />
                    </li>
                  ))}
                </ul>

                <p className="mt-3 mb-0 text-slate-600">{review.rating}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
};

export default TrafficLaws;
