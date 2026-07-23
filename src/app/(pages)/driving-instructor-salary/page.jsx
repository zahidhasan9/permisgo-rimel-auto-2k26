import Image from "next/image";
import Link from "next/link";
import { FaCarSide } from "react-icons/fa";

import indicate1 from "../../../../public/image/indicate1.png";
import indicate2 from "../../../../public/image/indicate2.png";
import indicate3 from "../../../../public/image/indicate3.png";
import indicate4 from "../../../../public/image/indicate4.png";
import instructorHero from "../../../../public/image/offer.png";

const statistics = [
  { image: indicate1, text: "€3,500 net/month" },
  { image: indicate2, text: "2K+ instructors partnered" },
  { image: indicate3, text: "5M+ students" },
  { image: indicate4, text: "91% instructor satisfaction" },
];

export default function DrivingInstructorSalaryPage() {
  return (
    <main className="overflow-hidden bg-white text-[#202124]">
      <section className="bg-[#eaf0f9]">
        <div className="mx-auto grid min-h-[560px] max-w-[1280px] grid-cols-[minmax(0,1fr)] items-center gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:px-10">
          <div className="max-w-[650px]">
            <h1 className="text-[35px] font-bold leading-[1.2] tracking-[-0.025em] text-[#202124] sm:text-[41px] lg:text-[44px]">
              Calculate your salary as a
              <br className="hidden sm:block" /> driving instructor
            </h1>
            <p className="mt-7 max-w-[650px] !text-[16px] leading-7 text-[#70757b]">
              Are you looking for information on the salary of a driving instructor? Do you want
              to accurately estimate your income as a self-employed individual? You&apos;ve come
              to the right place.
            </p>
            <Link
              href="/becoming-an-independent-instructor"
              className="mt-10 inline-flex min-h-[49px] items-center justify-center rounded-[9px] bg-[#e4213c] px-7 !text-[16px] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#174a9b] hover:shadow-lg"
            >
              Join us a driving instructor
            </Link>
          </div>

          <div className="flex justify-center md:justify-end">
            <Image
              src={instructorHero}
              alt="Professional driving instructor"
              priority
              sizes="(max-width: 768px) 92vw, 560px"
              className="h-auto w-full max-w-[540px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-[90px]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-[minmax(0,1fr)] gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat) => (
            <article
              key={stat.text}
              className="flex min-h-[112px] skew-x-[-8deg] items-center justify-center gap-5 rounded-[18px] bg-[#e8eef8] px-6 transition duration-300 hover:-translate-y-1 hover:bg-[#dce7f7] hover:shadow-lg"
            >
              <Image
                src={stat.image}
                alt=""
                sizes="50px"
                className="h-12 w-12 skew-x-[8deg] object-contain"
              />
              <span className="skew-x-[8deg] !text-[16px] font-bold text-[#272a2f]">
                {stat.text}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#eaf0f9] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto grid min-h-[420px] max-w-[1280px] grid-cols-[minmax(0,1fr)] items-center gap-12 md:grid-cols-[42%_58%]">
          <div className="relative flex min-h-[340px] items-center justify-center">
            <span className="absolute h-[320px] w-[320px] rounded-full bg-white" />
            <FaCarSide className="relative z-10 text-[270px] text-[#1555b4] drop-shadow-[0_12px_0_rgba(12,48,111,0.18)] sm:text-[320px]" />
          </div>

          <div>
            <h2 className="text-[34px] font-bold leading-tight tracking-[-0.025em] text-[#202124] lg:text-[40px]">
              Estimate your income with Permis Go
            </h2>
            <p className="mt-6 max-w-[710px] !text-[16px] leading-7 text-[#656a72]">
              Estimate your earnings as a partner instructor in one click with our simulator.
              Earn up to €37/hour and 50% more income compared to traditional driving schools.
            </p>
            <Link
              href="/login-to-my-partner-area"
              className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-[9px] bg-[#e4213c] px-6 !text-[15px] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#174a9b] hover:shadow-lg"
            >
              Simulate my income
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
