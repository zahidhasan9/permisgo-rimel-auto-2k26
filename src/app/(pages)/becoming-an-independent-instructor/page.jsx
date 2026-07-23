import Image from "next/image";
import Link from "next/link";
import {
  FaCarSide,
  FaCoins,
  FaHandSparkles,
  FaRegHandPeace,
} from "react-icons/fa";

import indicate1 from "../../../../public/image/indicate1.png";
import indicate2 from "../../../../public/image/indicate2.png";
import indicate3 from "../../../../public/image/indicate3.png";
import indicate4 from "../../../../public/image/indicate4.png";
import instructorHero from "../../../../public/image/offer.png";

const benefitGroups = [
  {
    title: "Freedom",
    icon: FaRegHandPeace,
    iconColor: "text-[#15c7ae]",
    items: [
      "Be your own boss with no constraints",
      "Set your own schedule and working hours",
      "Teach where you want, when you want",
      "Use your own teaching style",
    ],
  },
  {
    title: "Earnings",
    icon: FaCoins,
    iconColor: "text-[#e6a831]",
    items: [
      "Attractive pay: earn up to €37/hour",
      "Get paid weekly",
      "Competitive vehicle leasing options",
      "No need for sales prospecting",
    ],
  },
  {
    title: "Simplicity",
    icon: FaHandSparkles,
    iconColor: "text-[#ffbd78]",
    items: [
      "Full support with administrative processes",
      "Manage your schedule easily",
      "Choose your preferred meeting locations",
      "Enjoy dedicated insurance coverage",
    ],
  },
];

const statistics = [
  { image: indicate1, text: "€3,500 net/month" },
  { image: indicate2, text: "2K+ instructors partnered" },
  { image: indicate3, text: "5M+ students" },
  { image: indicate4, text: "91% instructor satisfaction" },
];

export default function IndependentInstructorPage() {
  return (
    <main className="overflow-hidden bg-white text-[#202124]">
      <section className="bg-[#eaf0f9]">
        <div className="mx-auto grid min-h-[560px] max-w-[1280px] grid-cols-[minmax(0,1fr)] items-center gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:px-10">
          <div className="max-w-[630px]">
            <h1 className="text-[34px] font-bold leading-[1.2] tracking-[-0.025em] text-[#202124] sm:text-[40px] lg:text-[42px]">
              Learn with a driving school you
              <br className="hidden sm:block" /> can trust.
              <br />
              Instructors, let&apos;s partner up!
            </h1>
            <p className="mt-7 max-w-[620px] !text-[16px] leading-7 text-[#72777d]">
              Enjoy a more affordable and convenient path to your driving license with our
              online driving school. To make this possible, we are committed to delivering the
              highest quality training for our students.
            </p>
            <Link
              href="#join-us"
              className="mt-10 inline-flex min-h-[49px] items-center justify-center rounded-[9px] bg-[#e4213c] px-7 !text-[16px] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#174a9b] hover:shadow-lg"
            >
              Join us a driving instructor
            </Link>
          </div>

          <div className="flex justify-center md:justify-end">
            <Image
              src={instructorHero}
              alt="Driving instructor helping a student"
              priority
              sizes="(max-width: 768px) 92vw, 560px"
              className="h-auto w-full max-w-[540px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-center text-[34px] font-bold tracking-[-0.025em] text-[#222] lg:text-[38px]">
            Why Join Our Driving School?
          </h2>

          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-3">
            {benefitGroups.map(({ title, icon: Icon, iconColor, items }) => (
              <article
                key={title}
                className="rounded-[10px] bg-[#e8eef8] px-5 py-7 text-center transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Icon className={`mx-auto text-[42px] ${iconColor}`} />
                <h3 className="mt-3 text-[21px] font-bold text-[#174a9b]">{title}</h3>
                <ul className="mt-6 space-y-4">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex min-h-[59px] items-center justify-center rounded-[10px] bg-white px-4 py-3 !text-[15px] text-[#4b4e53] shadow-sm transition duration-300 hover:bg-[#174a9b] hover:text-white"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div
            id="join-us"
            className="mt-20 scroll-mt-24 rounded-[10px] bg-[#174a9b] px-5 py-14 text-center sm:py-16"
          >
            <h2 className="text-[25px] font-bold text-white sm:text-[28px]">
              Ready to join the teaching team?
            </h2>
            <Link
              href="/login-to-my-partner-area"
              className="mt-8 inline-flex min-h-[48px] min-w-[190px] items-center justify-center rounded-[9px] bg-[#e4213c] px-8 !text-[15px] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#174a9b] hover:shadow-lg"
            >
              Join now
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-[minmax(0,1fr)] gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statistics.map((stat) => (
              <div
                key={stat.text}
                className="flex min-h-[114px] skew-x-[-8deg] items-center justify-center gap-5 rounded-[18px] bg-[#e8eef8] px-6 transition duration-300 hover:-translate-y-1 hover:bg-[#dce7f7] hover:shadow-lg"
              >
                <Image
                  src={stat.image}
                  alt=""
                  sizes="50px"
                  className="h-12 w-12 skew-x-[8deg] object-contain"
                />
                <span className="skew-x-[8deg] !text-[16px] font-bold text-[#26292d]">
                  {stat.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eaf0f9] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto grid min-h-[430px] max-w-[1280px] grid-cols-[minmax(0,1fr)] items-center gap-12 md:grid-cols-[44%_56%]">
          <div className="relative flex min-h-[330px] items-center justify-center">
            <span className="absolute h-[315px] w-[315px] rounded-full bg-white" />
            <FaCarSide className="relative z-10 text-[260px] text-[#1555b4] drop-shadow-[0_12px_0_rgba(12,48,111,0.18)] sm:text-[310px]" />
          </div>

          <div>
            <h2 className="text-[34px] font-bold leading-tight tracking-[-0.025em] text-[#202124] lg:text-[39px]">
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
