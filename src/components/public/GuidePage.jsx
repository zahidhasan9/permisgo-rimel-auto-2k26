"use client";

import Link from "next/link";
import { FaArrowRight, FaCheck, FaHeadset, FaRegCompass } from "react-icons/fa";
import useCmsPageContent from "@/hooks/useCmsPageContent";

const guideLinks = [
  { label: "Where are we?", href: "/where-are-we" },
  { label: "Monitor FAQs", href: "/monitor-faqs" },
  { label: "Highway Code Glossary", href: "/highway-code-glossary" },
  { label: "Driving Licence Glossary", href: "/driving-licence-glossary" },
  { label: "Disability Support", href: "/person-with-a-disability" },
];

export default function GuidePage({
  eyebrow,
  title,
  description,
  icon,
  highlights = [],
  children,
  currentPath,
}) {
  const slug = String(currentPath || "").replace(/^\/+|\/+$/g, "");
  const { page, content } = useCmsPageContent(slug);
  const settings = content?.settings || {};
  const displayTitle = settings.heroTitle || title;
  const displayDescription = settings.heroDescription || description;
  return (
    <div className="bg-[#f5f8fd] text-slate-900">
      <section className="relative overflow-hidden bg-[#103677] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#e2233d]/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-7 flex items-center gap-2 text-sm font-medium text-blue-100">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">{eyebrow}</span>
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_340px]">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-red-300">
                {eyebrow}
              </p>
              <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-[58px]">
                {displayTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
                {displayDescription}
              </p>
            </div>
            <div className="relative mx-auto flex h-52 w-52 items-center justify-center rounded-[38px] border border-white/15 bg-white/10 text-[88px] text-white shadow-2xl backdrop-blur sm:h-60 sm:w-60">
              <div className="absolute inset-4 rounded-[30px] border border-white/10" />
              <span className="relative">{icon || <FaRegCompass />}</span>
            </div>
          </div>
        </div>
      </section>

      {highlights.length > 0 && (
        <section className="relative z-10 mx-auto -mt-7 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_18px_50px_rgba(15,50,110,0.12)] sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 border-b border-slate-100 px-6 py-5 last:border-0 sm:border-b-0 sm:border-r"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-sm text-[#e2233d]">
                  <FaCheck />
                </span>
                <span className="text-sm font-bold text-[#103677]">{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <div>{children}</div>
        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <h2 className="px-3 pb-3 pt-2 text-lg font-extrabold text-[#103677]">
              Explore our guides
            </h2>
            <nav className="space-y-1">
              {guideLinks.map((link) => {
                const active = currentPath === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold transition ${
                      active
                        ? "bg-[#103677] text-white"
                        : "text-slate-600 hover:bg-blue-50 hover:text-[#103677]"
                    }`}
                  >
                    {link.label}
                    <FaArrowRight className="text-xs" />
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="rounded-2xl bg-[#e2233d] p-6 text-white shadow-lg">
            <FaHeadset className="text-3xl" />
            <h2 className="mt-5 text-2xl font-extrabold">Need more help?</h2>
            <p className="mt-2 text-sm leading-6 text-white/85">
              Our friendly team can help you choose the right next step.
            </p>
            <Link
              href="/contact-us"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#103677] transition hover:-translate-y-0.5"
            >
              Contact us <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}

export function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e2233d]">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-3xl font-extrabold leading-tight text-[#103677] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">{description}</p>
      )}
    </div>
  );
}
