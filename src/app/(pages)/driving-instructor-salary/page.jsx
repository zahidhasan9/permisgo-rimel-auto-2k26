"use client";

import Image from "next/image";
import Link from "next/link";
import { FaCarSide } from "react-icons/fa";

import indicate1 from "../../../../public/image/indicate1.png";
import indicate2 from "../../../../public/image/indicate2.png";
import indicate3 from "../../../../public/image/indicate3.png";
import indicate4 from "../../../../public/image/indicate4.png";
import instructorHero from "../../../../public/image/offer.png";
import useCmsPageContent from "@/hooks/useCmsPageContent";
import { cmsButtonProps, CmsRichText } from "@/components/cms/CmsContent";

const defaultStatistics = [
  { image: indicate1, text: "€3,500 net/month" },
  { image: indicate2, text: "2K+ instructors partnered" },
  { image: indicate3, text: "5M+ students" },
  { image: indicate4, text: "91% instructor satisfaction" },
];

export default function DrivingInstructorSalaryPage() {
  const { content } = useCmsPageContent("driving-instructor-salary");
  const settings = content?.settings || {};
  const copy = (key, fallback) => settings[key]?.trim?.() || fallback;
  const statistics = defaultStatistics.map((stat, index) => ({
    text: copy(`stat${index + 1}`, stat.text),
    image: copy(`stat${index + 1}Image`, stat.image),
  }));
  return (
    <main className="overflow-hidden bg-white text-[#202124]">
      <section className="bg-[#eaf0f9]" style={{ backgroundColor: copy("heroBackground", "#eaf0f9") }}>
        <div className="mx-auto grid min-h-[560px] max-w-[1280px] grid-cols-[minmax(0,1fr)] items-center gap-10 px-5 py-14  md:grid-cols-2 ">
          <div className="max-w-[650px]">
            <h1 className="text-[35px] font-bold leading-[1.2] tracking-[-0.025em] text-[#202124] sm:text-[41px] lg:text-[44px]">
              {copy("heroTitle", "Calculate your salary as a driving instructor")}
            </h1>
            <CmsRichText as="div" className="mt-7 max-w-[650px] !text-[16px] leading-7 text-[#70757b]" html={settings.heroDescription} fallback="Estimate your potential income as a self-employed driving instructor and discover the benefits of partnering with PermisGo." />
            <Link
              {...cmsButtonProps(settings, "heroButton", { href: "/becoming-an-independent-instructor" })}
              className="mt-10 inline-flex min-h-[49px] items-center justify-center rounded-[9px] bg-[#e4213c] px-7 !text-[16px] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#174a9b] hover:shadow-lg"
            >
              {copy("heroButton", "Join us as a driving instructor")}
            </Link>
          </div>

          <div className="flex justify-center md:justify-end">
            <Image
              src={copy("heroImage", instructorHero)}
              width={540}
              height={420}
              alt={copy("heroImageAlt", "Professional driving instructor")}
              priority
              sizes="(max-width: 768px) 92vw, 560px"
              className="h-auto w-full max-w-[540px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-[90px]" style={{ backgroundColor: copy("statisticsBackground", "#ffffff") }}>
        <div className="mx-auto grid max-w-[1280px] grid-cols-[minmax(0,1fr)] gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat) => (
            <article
              key={stat.text}
              className="flex min-h-[112px] skew-x-[-8deg] items-center justify-center gap-5 rounded-[18px] bg-[#e8eef8] px-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ backgroundColor: copy("statCardBackground", "#e8eef8") }}
            >
              <Image
                src={stat.image}
                width={50}
                height={50}
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

      <section className="bg-[#eaf0f9] px-5 py-20 sm:px-8 lg:py-24" style={{ backgroundColor: copy("simulatorBackground", "#eaf0f9") }}>
        <div className="mx-auto grid min-h-[420px] max-w-[1280px] grid-cols-[minmax(0,1fr)] items-center gap-12 md:grid-cols-[42%_58%]">
          <div className="relative flex min-h-[340px] items-center justify-center">
            <span className="absolute h-[320px] w-[320px] rounded-full bg-white" style={{ backgroundColor: copy("simulatorCircleColor", "#ffffff") }} />
            <FaCarSide className="relative z-10 text-[270px] text-[#1555b4] drop-shadow-[0_12px_0_rgba(12,48,111,0.18)] sm:text-[320px]" style={{ color: copy("simulatorCarColor", "#1555b4") }} />
          </div>

          <div>
            <h2 className="text-[34px] font-bold leading-tight tracking-[-0.025em] text-[#202124] lg:text-[40px]">
              {copy("sectionTitle", "Estimate your income with Permis Go")}
            </h2>
            <CmsRichText as="div" className="mt-6 max-w-[710px] !text-[16px] leading-7 text-[#656a72]" html={settings.sectionDescription} fallback="Estimate your earnings as a partner instructor in one click with our simulator and discover your earning potential." />
            <Link
              {...cmsButtonProps(settings, "ctaButton", { href: "/login-to-my-partner-area" })}
              className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-[9px] bg-[#e4213c] px-6 !text-[15px] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#174a9b] hover:shadow-lg"
            >
              {copy("ctaButton", "Simulate my income")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
