import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaStar, FaTimesCircle } from "react-icons/fa";
import { FaLocationDot, FaSquareCheck } from "react-icons/fa6";

import broomLogo from "../../../../public/image/broomLogo.png";
import googleLogo from "../../../../public/image/googleLogo.png";
import laws3 from "../../../../public/image/laws3.png";
import mapMarker from "../../../../public/image/map.png";
import priceBadge from "../../../../public/image/traffic-two-price-batch.png";
import road from "../../../../public/image/road.png";
import tes1 from "../../../../public/image/tes1.png";
import tes2 from "../../../../public/image/tes2.png";
import tes3 from "../../../../public/image/tes3.png";
import trafficHero from "../../../../public/image/traffic-hero.png";
import trustLogo from "../../../../public/image/trustLogo.png";

const packs = [
  {
    title: "Eco Code",
    subtitle: "Complete revision + Administrative procedures",
    price: "FREE",
    features: [
      "Duration: Unlimited",
      "Access to the code app",
      "Video course and online manual",
      "5000 questions and 30 practice exams",
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
      "Duration: 12 month package",
      "Access to the code app",
      "Video course and online manual",
      "5000 questions and 30 practice exams",
      "Administrative procedures & Coaching",
    ],
  },
  {
    title: "Success Code",
    subtitle: "Complete revision + Administrative procedures",
    price: "€33.99",
    oldPrice: "€43.99",
    badge: true,
    features: [
      "Duration: 12 month package",
      "Access to the code app",
      "Video course and online manual",
      "5000 questions and 30 practice exams",
      "A place for a highway code exam",
    ],
  },
];

const workSteps = [
  {
    title: "Traffic Laws",
    text: "Suitable for all profiles, our E-learning application accompanies you at every step towards success in coding.",
  },
  {
    title: "Driving Lessons",
    text: "Book online and take advantage of a dedicated e-learning program on our app to optimize every driving lesson.",
  },
  {
    title: "Personalized follow-up",
    text: "Book online and take advantage of a dedicated e-learning program on our app to optimize every driving lesson.",
  },
  {
    title: "Procedures and review",
    text: "Book online and take advantage of a dedicated e-learning program on our app to optimize every driving lesson.",
  },
];

const ratingCards = [
  { image: broomLogo, title: "VroomVroom" },
  { image: googleLogo, title: "Google Ratings" },
  { image: trustLogo, title: "Trustpilot Ratings" },
];

const testimonials = [
  { image: tes1, name: "Esther Howard" },
  { image: tes2, name: "Marvin McKinney" },
  { image: tes3, name: "Wade Warren" },
  { image: tes1, name: "Annette Black" },
];

export default function TrafficLawsPage() {
  return (
    <main className="overflow-hidden bg-white text-[#202124]">
      <section className="bg-[#eaf0f9]">
        <div className="mx-auto grid min-h-[560px] max-w-[1280px] grid-cols-[minmax(0,1fr)] items-center gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:px-10">
          <div className="max-w-[620px]">
            <h1 className="text-[35px] font-bold leading-tight tracking-[-0.025em] text-[#202124] sm:text-[40px] lg:text-[43px]">
              Your <span className="text-[#e4213c]">FREE</span> Highway code
            </h1>
            <p className="mt-7 max-w-[620px] !text-[16px] leading-7 text-[#70757b]">
              Sign up for the code, and while you are practicing, start driving. It&apos;s the winning
              combo for the rapid progress.
            </p>
            <div className="mt-10 grid max-w-[540px] grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2">
              <Link
                href="/register"
                className="inline-flex min-h-[48px] items-center justify-center rounded-[9px] bg-[#e4213c] px-6 !text-[15px] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#174a9b] hover:shadow-lg"
              >
                Register for FREE
              </Link>
              <Link
                href="/offers"
                className="inline-flex min-h-[48px] items-center justify-center rounded-[9px] border-2 border-[#174a9b] px-6 !text-[15px] font-semibold text-[#e4213c] transition duration-300 hover:-translate-y-0.5 hover:bg-[#174a9b] hover:text-white hover:shadow-lg"
              >
                Discover all our offers
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src={trafficHero}
              alt="Driving instructor teaching highway code"
              priority
              sizes="(max-width: 768px) 92vw, 560px"
              className="h-auto w-full max-w-[560px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#eaf0f9] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center">
            <h2 className="text-[34px] font-bold tracking-[-0.025em] text-[#222] lg:text-[38px]">
              Permisgo&apos;s Highway Code Packs
            </h2>
            <p className="mt-4 !text-[14px] text-[#6b7077]">What is your need?</p>
          </div>

          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-3">
            {packs.map((pack) => (
              <article
                key={pack.title}
                className="relative flex min-h-[620px] flex-col rounded-[10px] border-2 border-[#174a9b] bg-white px-7 py-10 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {pack.badge && (
                  <Image
                    src={priceBadge}
                    alt="Recommended package"
                    sizes="48px"
                    className="absolute -right-2 -top-7 h-12 w-12 object-contain"
                  />
                )}
                <div className="text-center">
                  {pack.bestValue && (
                    <p className="mb-1 !text-[13px] font-semibold text-[#174a9b]">Best Value</p>
                  )}
                  <h3 className="text-[28px] font-bold text-[#e4213c]">{pack.title}</h3>
                  <p className="mt-2 !text-[13px] font-medium text-[#3e69a4]">{pack.subtitle}</p>
                  <div className="mx-auto mt-6 flex min-h-[44px] max-w-[190px] items-center justify-center rounded-full border border-[#174a9b] px-5">
                    <span className="text-[20px] font-bold text-[#174a9b]">{pack.price}</span>
                    {pack.oldPrice && (
                      <span className="ml-3 !text-[12px] font-semibold text-[#67717f] line-through">
                        {pack.oldPrice}
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="mt-7 text-center text-[18px] font-bold text-[#174a9b]">
                  Package Contents
                </h4>
                <ul className="mt-6 flex-1 space-y-4">
                  {pack.features.map((feature, index) => {
                    const inactive = pack.title === "Zen Code" && index === pack.features.length - 1;
                    return (
                      <li key={feature} className="flex gap-3 !text-[14px] leading-6 text-[#34383e]">
                        {inactive ? (
                          <FaTimesCircle className="mt-1 shrink-0 text-[#e4213c]" />
                        ) : (
                          <FaSquareCheck className="mt-1 shrink-0 text-[#174a9b]" />
                        )}
                        <span>{feature}</span>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href="/register"
                  className="mx-auto mt-8 inline-flex min-h-[42px] min-w-[160px] items-center justify-center rounded-full bg-[#e4213c] px-6 !text-[13px] font-semibold uppercase text-white transition duration-300 hover:bg-[#174a9b] hover:shadow-md"
                >
                  Sign Up
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1280px] rounded-[55px] bg-[#174a9b] px-8 py-12 sm:rounded-[110px] lg:px-[180px]">
          <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 md:grid-cols-[1fr_230px]">
            <div>
              <h2 className="text-[27px] font-bold text-white lg:text-[31px]">
                écoles de conduite labellisées
              </h2>
              <p className="mt-5 !text-[15px] text-white/85">
                Des centres de formation agréés, respectant des standards de qualité élevés.
              </p>
            </div>
            <Image
              src={laws3}
              alt="Qualiopi certified driving school"
              sizes="200px"
              className="mx-auto h-auto w-[190px] rounded-[6px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#eaf0f9] pb-20 pt-20 lg:pb-24">
        <div className="text-center">
          <h2 className="text-[34px] font-bold tracking-[-0.025em] text-[#222] lg:text-[38px]">
            How It Works
          </h2>
          <p className="mt-4 !text-[14px] text-[#73777d]">
            Driving licence learning transformed by permisgo
          </p>
        </div>

        <div className="relative mt-10">
          <Image src={road} alt="Learning journey road" sizes="100vw" className="h-[96px] w-full object-cover" />
          <div className="absolute inset-0 mx-auto grid max-w-[1280px] grid-cols-4 items-center px-8">
            {workSteps.map((step, index) => (
              <div key={step.title} className="relative flex justify-center">
                <Image src={mapMarker} alt="" sizes="34px" className="h-[34px] w-[34px] object-contain" />
                <span className="absolute top-[8px] !text-[9px] font-bold text-[#174a9b]">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto grid max-w-[1280px] grid-cols-[minmax(0,1fr)] gap-6 px-5 pt-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {workSteps.map((step) => (
            <article
              key={step.title}
              className="rounded-[10px] bg-[#174a9b] px-5 py-7 text-center text-white transition duration-300 hover:-translate-y-1 hover:bg-[#e4213c] hover:shadow-xl"
            >
              <h3 className="text-[18px] font-bold">{step.title}</h3>
              <p className="mt-4 !text-[13px] leading-6 text-white/90">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1280px] rounded-[10px] bg-[#174a9b] px-5 py-14 text-center sm:px-10 lg:py-20">
          <h2 className="text-[32px] font-bold text-white lg:text-[37px]">And After your code?</h2>
          <p className="mt-4 !text-[14px] text-white/85">Discover Our License Offers Starting at $500</p>
          <Link
            href="/offers"
            className="mt-7 inline-flex min-h-[46px] min-w-[360px] max-w-full items-center justify-center rounded-[9px] bg-[#e4213c] px-7 !text-[14px] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#174a9b] hover:shadow-lg"
          >
            Discover All Our Offers
          </Link>
          <div className="mx-auto mt-10 grid max-w-[900px] grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-2">
            <div className="flex min-h-[94px] items-center justify-center gap-4 rounded-[9px] bg-white px-6">
              <FaLocationDot className="text-[30px] text-[#174a9b]" />
              <span className="!text-[15px] font-semibold text-[#292d33]">71 Approved Agencies</span>
            </div>
            <div className="flex min-h-[94px] items-center justify-center gap-4 rounded-[9px] bg-white px-6">
              <FaStar className="text-[30px] text-[#174a9b]" />
              <span className="!text-[15px] font-semibold text-[#292d33]">
                100% of our students are satisfied
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#174a9b] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1280px] grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-3">
          {ratingCards.map((rating) => (
            <article
              key={rating.title}
              className="flex min-h-[165px] flex-col items-center justify-center rounded-[20px] bg-[#f6f8fb] px-6 py-6 text-center transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
            >
              <Image src={rating.image} alt="" sizes="40px" className="h-10 w-10 object-contain" />
              <h3 className="mt-2 text-[18px] font-bold text-[#292929]">{rating.title}</h3>
              <div className="mt-2 flex gap-3 text-[#ffc52c]">
                {[0, 1, 2, 3, 4].map((star) => (
                  <FaStar key={star} className="text-[17px]" />
                ))}
              </div>
              <p className="mt-2 !text-[13px] text-[#303030]">04 out of 05</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f5f7fa] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex items-end justify-between gap-5">
            <div>
              <span className="inline-flex rounded-[5px] bg-[#e7f7ec] px-4 py-2 !text-[12px] font-semibold text-[#20a657]">
                Testimonials
              </span>
              <h2 className="mt-5 text-[34px] font-bold tracking-[-0.025em] text-[#222] lg:text-[38px]">
                What Our Students Say
              </h2>
            </div>
            <div className="flex gap-3">
              <button type="button" aria-label="Previous testimonial" className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#e7edf6] text-[#174a9b] transition hover:bg-[#174a9b] hover:text-white">
                <FaArrowLeft />
              </button>
              <button type="button" aria-label="Next testimonial" className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#e4213c] text-white transition hover:bg-[#174a9b]">
                <FaArrowRight />
              </button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="rounded-[10px] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <p className="!text-[14px] leading-6 text-[#50545a]">
                  Thanks to the instructors, I passed my driving test on the first try. The lessons were clear and very helpful!
                </p>
                <div className="mt-5 flex gap-2 text-[#ffc52c]">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <FaStar key={star} />
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <Image src={testimonial.image} alt={testimonial.name} sizes="42px" className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <h3 className="text-[13px] font-bold text-[#303238]">{testimonial.name}</h3>
                    <p className="!text-[12px] text-[#747981]">Web Designer</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <Link href="/reviews" className="mt-10 inline-flex rounded-[8px] bg-[#e4213c] px-6 py-3 !text-[14px] font-semibold text-white transition hover:bg-[#174a9b] hover:shadow-md">
            View All
          </Link>
        </div>
      </section>
    </main>
  );
}
