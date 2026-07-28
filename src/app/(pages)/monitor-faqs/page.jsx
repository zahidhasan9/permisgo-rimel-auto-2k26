import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";
import GuidePage, { SectionTitle } from "@/components/public/GuidePage";

export const metadata = { title: "Monitor FAQs", description: "Answers for PermisGo driving instructors and partners." };

const groups = [
  ["Getting started", [
    ["How do I become a PermisGo instructor?", "Complete the partnership request form with your contact details and professional credentials. Our team will review your application and contact you."],
    ["Which documents will I need?", "You will generally need proof of identity, your valid instructor authorisation, insurance and the documents for the vehicle you plan to use."],
  ]],
  ["Lessons & planning", [
    ["How do I manage my availability?", "Use your instructor calendar to add or update the time slots in which students can book lessons."],
    ["Can I change an accepted lesson?", "If a change is necessary, use the lesson management area as early as possible and follow the cancellation or rescheduling policy."],
    ["Where can I see my students?", "Your teacher dashboard lists assigned students, upcoming lessons and the information needed to prepare each session."],
  ]],
  ["Payments & support", [
    ["Where can I track my earnings?", "The earnings area shows completed lessons, payment status and your available balance."],
    ["How do I contact support?", "Send a request through the support area or contact the PermisGo team directly for urgent account issues."],
  ]],
];

export default function MonitorFaqsPage() {
  return (
    <GuidePage eyebrow="Instructor help centre" title="Monitor FAQs" description="Clear answers to the questions our instructors and partners ask most often." icon={<FaQuestionCircle />} highlights={["Quick answers", "Instructor guidance", "Dedicated support"]} currentPath="/monitor-faqs">
      <SectionTitle eyebrow="Frequently asked questions" title="How can we help?" description="Browse by topic. Select a question to reveal the answer." />
      <div className="space-y-8">
        {groups.map(([group, faqs], groupIndex) => (
          <section key={group}>
            <h2 className="mb-4 flex items-center gap-3 text-xl font-extrabold text-[#103677]"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-sm text-[#e2233d]">{groupIndex + 1}</span>{group}</h2>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              {faqs.map(([question, answer]) => (
                <details key={question} className="group border-b border-slate-200 last:border-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 font-bold text-slate-800 transition hover:bg-blue-50 [&::-webkit-details-marker]:hidden">
                    {question}<FaChevronDown className="shrink-0 text-sm text-[#103677] transition group-open:rotate-180" />
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-7 text-slate-600">{answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </GuidePage>
  );
}

