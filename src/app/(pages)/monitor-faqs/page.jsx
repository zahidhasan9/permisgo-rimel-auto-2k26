"use client";

import { useEffect, useMemo, useState } from "react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";
import GuidePage, { SectionTitle } from "@/components/public/GuidePage";
import { getFaqs } from "@/features/API";

export default function MonitorFaqsPage() {
  const [faqs, setFaqs] = useState([]);
  useEffect(() => { getFaqs({ section: "instructors" }).then(({ data }) => setFaqs(data?.data || [])); }, []);
  const groups = useMemo(() => Object.entries(faqs.reduce((result, faq) => { const key = faq.category || "Instructor guidance"; (result[key] ||= []).push(faq); return result; }, {})), [faqs]);

  return <GuidePage eyebrow="Instructor help centre" title="Monitor FAQs" description="Clear answers to the questions our instructors and partners ask most often." icon={<FaQuestionCircle />} highlights={["Quick answers", "Instructor guidance", "Dedicated support"]} currentPath="/monitor-faqs">
    <SectionTitle eyebrow="Frequently asked questions" title="How can we help?" description="Browse by topic. Select a question to reveal the answer." />
    <div className="space-y-8">{groups.map(([group, items], groupIndex) => <section key={group}><h2 className="mb-4 flex items-center gap-3 text-xl font-extrabold text-[#103677]"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-sm text-[#e2233d]">{groupIndex + 1}</span>{group}</h2><div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">{items.map((faq) => <details key={faq._id} className="group border-b border-slate-200 last:border-0"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 font-bold text-slate-800 transition hover:bg-blue-50 [&::-webkit-details-marker]:hidden">{faq.question}<FaChevronDown className="shrink-0 text-sm text-[#103677] transition group-open:rotate-180" /></summary><p className="px-5 pb-5 text-sm leading-7 text-slate-600">{faq.answer}</p></details>)}</div></section>)}</div>
  </GuidePage>;
}
