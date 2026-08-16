import Link from "next/link";
import {
  FaAccessibleIcon,
  FaCarSide,
  FaClipboardCheck,
  FaHandsHelping,
  FaUserCheck,
} from "react-icons/fa";
import GuidePage, { SectionTitle } from "@/components/public/GuidePage";

export const metadata = {
  title: "Driving with a Disability",
  description:
    "Accessible driving lessons and personalised support at PermisGo.",
};

const steps = [
  {
    icon: <FaHandsHelping />,
    title: "Talk to us",
    text: "Tell us about your needs, experience and goals in a private, supportive conversation.",
  },
  {
    icon: <FaClipboardCheck />,
    title: "Review requirements",
    text: "We help you understand any medical, assessment or administrative steps relevant to your situation.",
  },
  {
    icon: <FaCarSide />,
    title: "Plan your training",
    text: "We match your learning plan with suitable teaching methods, scheduling and vehicle requirements.",
  },
  {
    icon: <FaUserCheck />,
    title: "Learn with confidence",
    text: "Progress at a pace that works for you, with clear feedback and consistent support.",
  },
];

export default function DisabilityPage() {
  return (
    <GuidePage
      eyebrow="Inclusive driver training"
      title="Driving with a disability"
      description="Your road to independence deserves a training plan built around you. We listen, adapt and help you move forward with confidence."
      icon={<FaAccessibleIcon />}
      highlights={[
        "Personalised guidance",
        "Respectful support",
        "Flexible learning",
      ]}
      currentPath="/person-with-a-disability"
    >
      <SectionTitle
        eyebrow="How we support you"
        title="A journey designed around your needs"
        description="Every learner is different. We begin by understanding what will make your training safe, comfortable and effective."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {steps.map((step, index) => (
          <article
            key={step.title}
            className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6"
          >
            <span className="absolute right-4 top-2 text-6xl font-black text-slate-50">
              0{index + 1}
            </span>
            <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl text-[#103677]">
              {step.icon}
            </span>
            <h2 className="relative mt-5 text-xl font-extrabold text-[#103677]">
              {step.title}
            </h2>
            <p className="relative mt-2 text-sm leading-7 text-slate-600">
              {step.text}
            </p>
          </article>
        ))}
      </div>
      <section className="mt-10 rounded-3xl bg-[#103677] p-7 text-white sm:p-9">
        <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-300">
              Start the conversation
            </p>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              Tell us how we can support you
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-blue-100">
              You do not need to have every answer before contacting us. Our
              team will help identify the appropriate next steps.
            </p>
          </div>
          <Link
            href="/contact-us"
            className="inline-flex justify-center rounded-xl bg-[#e2233d] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white hover:text-[#103677]"
          >
            Contact our team
          </Link>
        </div>
      </section>
    </GuidePage>
  );
}
