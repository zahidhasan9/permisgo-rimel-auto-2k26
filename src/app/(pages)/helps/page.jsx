import Image from "next/image";
import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";

import helpFirst from "../../../../public/image/help-first.png";
import helpSecond1 from "../../../../public/image/help-second1.png";
import helpSecond2 from "../../../../public/image/help-second2.png";
import helpSecond3 from "../../../../public/image/help-second3.png";
import helpThird1 from "../../../../public/image/help-third1.png";
import helpThird2 from "../../../../public/image/help-third2.png";

const drivingTips = [
  {
    image: helpSecond1,
    title: "Discover By Car Permisgo",
    description:
      "Find out who we are, the services we offer, and the different ways to contact us.",
    href: "/who-are-we",
  },
  {
    image: helpSecond2,
    title: "My driving school file",
    description:
      "All the essential information you need to manage your driving school file and easily register with the administration!",
    href: "/appointment",
  },
  {
    image: helpSecond3,
    title: "My payments and lesson credits",
    description:
      "All the information you need to manage your payments, resolve a problem, or request a refund.",
    href: "/pricing",
  },
];

export default function HelpsPage() {
  return (
    <div className="bg-[#eef3fb] text-[#1d1d1f]">
      {/* Hero */}
      <section className="overflow-hidden bg-gradient-to-b from-[#174a9b] via-[#0b3066] to-[#020f25]">
        <div className="mx-auto grid min-h-[638px] w-full max-w-[1360px] grid-cols-[minmax(0,1fr)] items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:py-0">
          <div className="min-w-0 text-center md:text-left">
            <h1 className="max-w-[550px] text-[34px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white sm:text-[40px] lg:text-[42px]">
              Need help? We&apos;re here to
              <br className="hidden md:block" /> help!
            </h1>
            <p className="mx-auto mt-6 max-w-[600px] !text-[20px] font-bold leading-[1.35] text-white md:mx-0 sm:!text-[22px] lg:!text-[24px]">
              Ask us all your questions about driving lessons, exams or
              licenses!
            </p>

            <label htmlFor="help-search" className="sr-only">
              Search help resources
            </label>
            <div className="relative mx-auto mt-10 max-w-[660px] md:mx-0">
              <FaMagnifyingGlass
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[18px] text-[#777d87]"
              />
              <input
                id="help-search"
                type="search"
                placeholder="Search"
                className="h-12 w-full rounded-[9px] border border-[#cbd2dc] bg-[#f5f6f8] pl-12 pr-4 !text-[14px] font-medium text-[#1d1d1f] outline-none transition-all duration-300 [&::placeholder]:!text-[13px] [&::placeholder]:text-[#858a92] focus:border-[#e2233d] focus:bg-white focus:ring-4 focus:ring-[#e2233d]/15"
              />
            </div>
          </div>

          <div className="flex min-w-0 justify-center md:justify-end">
            <Image
              src={helpFirst}
              alt="Happy learner driver with her instructor"
              priority
              sizes="(max-width: 767px) 92vw, 500px"
              className="h-auto w-full min-w-0 max-w-[530px] lg:-translate-x-9"
            />
          </div>
        </div>
      </section>

      {/* Resources and support */}
      <section className="bg-[#eef3fb] px-5 pt-20 sm:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-[1280px]">
          <header className="text-center">
            <h2 className="text-[30px] font-extrabold tracking-[-0.02em] text-[#202020] sm:text-[36px]">
              Latest driving tips
            </h2>
            <p className="mt-3 !text-[14px] font-medium text-[#84878d]">
              Newly updated resources for students
            </p>
          </header>

          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-3">
            {drivingTips.map((tip) => (
              <article
                key={tip.title}
                className="group flex min-h-[504px] min-w-0 flex-col items-center rounded-[12px] bg-white px-8 pb-[60px] pt-14 text-center shadow-[0_2px_10px_rgba(20,55,105,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:px-10"
              >
                <Image
                  src={tip.image}
                  alt=""
                  sizes="86px"
                  className="h-[86px] w-[86px] object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <h3 className="mt-9 max-w-[330px] text-[26px] font-extrabold leading-[1.15] text-[#174a9b] sm:text-[28px] lg:text-[30px]">
                  {tip.title}
                </h3>
                <p className="mt-9 max-w-[330px] !text-[14px] font-medium leading-[1.55] text-[#33363b]">
                  {tip.description}
                </p>
                <Link
                  href={tip.href}
                  className="mt-auto flex h-12 w-full items-center justify-center rounded-[9px] bg-[#e2233d] px-6 !text-[14px] font-extrabold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#174a9b] hover:shadow-lg"
                >
                  Read now
                </Link>
              </article>
            ))}
          </div>

          <aside className="relative mt-20 flex min-h-[340px] items-center justify-center overflow-hidden rounded-[12px] bg-[#174a9b] px-6 py-12 text-center">
            <Image
              src={helpThird1}
              alt=""
              sizes="220px"
              className="pointer-events-none absolute left-0 top-0 hidden h-auto w-[220px] object-contain md:block"
            />
            <Image
              src={helpThird2}
              alt=""
              sizes="220px"
              className="pointer-events-none absolute -bottom-2 -right-3 hidden h-auto w-[220px] object-contain md:block"
            />

            <div className="relative z-10">
              <h2 className="text-[28px] font-extrabold leading-tight text-white sm:text-[32px]">
                Do you still have any questions ?
              </h2>
              <p className="mt-5 !text-[14px] font-medium text-white/80">
                Our friendly team is here to help you pass your driving test!
              </p>
              <Link
                href="/contact-us"
                className="mt-6 inline-flex h-12 items-center justify-center rounded-[9px] bg-white px-7 !text-[14px] font-extrabold text-[#e2233d] transition-all duration-300 hover:-translate-y-1 hover:bg-[#e2233d] hover:text-white hover:shadow-lg"
              >
                Chat with support
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
