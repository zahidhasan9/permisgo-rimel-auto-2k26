import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

import hser1 from "../../../../public/image/hser1.png";
import hser2 from "../../../../public/image/hser2.png";
import hser3 from "../../../../public/image/hser3.png";
import hser4 from "../../../../public/image/hser4.png";
import hser5 from "../../../../public/image/hser5.png";
import hser6 from "../../../../public/image/hser6.png";
import hser7 from "../../../../public/image/hser7.png";
import hser8 from "../../../../public/image/hser8.png";
import hser9 from "../../../../public/image/hser9.png";

export const metadata = {
  title: "Our Services",
  description:
    "Explore PermisGo driving lessons, licence training and Highway Code services.",
};

const services = [
  [
    hser1,
    "Manual Driving Licence",
    "Learn complete vehicle control with structured manual-transmission lessons.",
    "From €749",
  ],
  [
    hser2,
    "Automatic Driving Licence",
    "A comfortable, focused learning path using an automatic vehicle.",
    "From €749",
  ],
  [
    hser3,
    "Accompanied Driving",
    "Build valuable experience with supervised practice before your practical test.",
    "Custom plan",
  ],
  [
    hser4,
    "Supervised Driving (AAC)",
    "Continue developing confidence and road awareness with an approved companion.",
    "Custom plan",
  ],
  [
    hser5,
    "Highway Code in Class",
    "Prepare for the theory test with guided sessions and clear explanations.",
    "From €30",
  ],
  [
    hser6,
    "Highway Code Online",
    "Study road rules and practise questions anywhere, at your own pace.",
    "From €30",
  ],
  [
    hser7,
    "Refresher Lessons",
    "Return to driving, strengthen specific skills or rebuild your confidence.",
    "Flexible hours",
  ],
  [
    hser8,
    "Accelerated Licence",
    "An intensive programme designed to help eligible learners progress faster.",
    "On request",
  ],
  [
    hser9,
    "Accelerated Highway Code",
    "Focused theory preparation for learners working towards an earlier test date.",
    "On request",
  ],
];

export default function ServicesPage() {
  return (
    <div className="bg-[#f6f8fc]">
      <section className="relative overflow-hidden bg-[#103677] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#e2233d]/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-red-300">
            Training for every learner
          </p>
          <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl">
            Explore our driving services
          </h1>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-blue-100">
            From your first Highway Code session to practical test preparation,
            choose the support that matches your experience and goals.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([image, title, description, price]) => (
            <article
              key={title}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#e7ecf4] p-3">
                <Image
                  src={image}
                  alt=""
                  className="max-h-14 w-auto object-contain"
                />
              </div>
              <h2 className="mt-6 text-xl font-extrabold text-[#103677]">
                {title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                {description}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
                <span className="font-extrabold text-[#20a83c]">{price}</span>
                <Link
                  href="/contact-us"
                  aria-label={`Learn more about ${title}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#103677] text-sm text-white transition group-hover:bg-[#e2233d]"
                >
                  <FaArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 grid items-center gap-8 rounded-3xl bg-white p-7 shadow-sm sm:p-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e2233d]">
              Not sure where to begin?
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#103677]">
              We’ll help you choose the right training
            </h2>
            <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold text-slate-600">
              {[
                "Personalised plan",
                "Flexible scheduling",
                "Qualified instructors",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#20a83c]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <Link
            href="/contact-us"
            className="inline-flex justify-center rounded-xl bg-[#e2233d] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#103677]"
          >
            Talk to our team
          </Link>
        </div>
      </section>
    </div>
  );
}
