"use client";
import { FaIdCard } from "react-icons/fa";
import GuidePage, { SectionTitle } from "@/components/public/GuidePage";
import useCmsPageContent from "@/hooks/useCmsPageContent";
import { CmsRichText } from "@/components/cms/CmsContent";

const defaultTerms = [
  [
    "Accompanied driving",
    "A learning route that allows supervised driving practice before taking the practical test.",
  ],
  [
    "Candidate number",
    "The unique reference used to identify a learner in the licensing and test system.",
  ],
  [
    "Category B",
    "The standard licence category for driving a car within the applicable weight and passenger limits.",
  ],
  [
    "Driving test",
    "The practical assessment of vehicle control, observation, judgement and safe road use.",
  ],
  [
    "Learner driver",
    "A person who is learning to drive and has not yet obtained a full licence.",
  ],
  [
    "Penalty points",
    "Points added following certain offences that can affect the validity of a licence.",
  ],
  [
    "Probationary licence",
    "The initial period after passing when special rules or lower point thresholds may apply.",
  ],
  [
    "Theory test",
    "An assessment of road rules, signs, safety knowledge and hazard awareness.",
  ],
  [
    "Training record",
    "A record of lessons, skills covered and progress made during driver training.",
  ],
  [
    "Valid licence",
    "A licence that is current, appropriate for the vehicle category and not suspended or revoked.",
  ],
];

export default function DrivingLicenceGlossaryPage() {
  const { content } = useCmsPageContent("driving-licence-glossary");
  const settings = content?.settings || {};
  const copy = (key, fallback) => settings[key]?.trim?.() || fallback;
  const terms = defaultTerms.map(([term, definition], index) => [copy(`term${index + 1}Title`, term), copy(`term${index + 1}Definition`, definition)]).filter(([term]) => term);
  return (
    <GuidePage
      eyebrow="Licence essentials"
      title="Driving Licence Glossary"
      description="A simple guide to the terms you may encounter from registration through to passing your test."
      icon={<FaIdCard />}
      highlights={[
        "Learner-friendly",
        "Test terminology",
        "Licence essentials",
      ]}
      currentPath="/driving-licence-glossary"
    >
      <SectionTitle
        eyebrow={copy("sectionEyebrow", "Key definitions")}
        title="Licence language, made simple"
        description="These concise explanations help you understand your learning journey and the documents around it."
      />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ backgroundColor: settings.termListBackground || "#ffffff" }}>
        {terms.map(([term, definition], index) => (
          <article
            key={term}
            className="grid gap-3 border-b border-slate-200 p-5 last:border-0 sm:grid-cols-[220px_1fr] sm:p-6"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#103677] font-extrabold text-white" style={{ backgroundColor: settings.numberBadgeColor || "#103677" }}>
                {index + 1}
              </span>
              <h2 className="font-extrabold text-[#103677]">{term}</h2>
            </div>
            <CmsRichText as="div" html={definition} className="text-sm leading-7 text-slate-600" />
          </article>
        ))}
      </div>
      <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-[#103677]" style={{ backgroundColor: settings.noticeBackground || "#eff6ff" }}><strong>{copy("noticeTitle", "Good to know:")}</strong><CmsRichText as="div" html={settings.noticeText} fallback="Requirements can vary by licence category and personal situation. Contact our team if you are unsure which path applies to you." className="mt-1" /></div>
    </GuidePage>
  );
}
