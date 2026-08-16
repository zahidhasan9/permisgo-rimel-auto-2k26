import { FaBookOpen } from "react-icons/fa";
import GuidePage, { SectionTitle } from "@/components/public/GuidePage";

export const metadata = {
  title: "Highway Code Glossary",
  description: "Essential highway code terms explained simply.",
};

const terms = [
  [
    "Blind spot",
    "An area around a vehicle that cannot be seen directly in the mirrors.",
  ],
  [
    "Carriageway",
    "The part of a road used by vehicles, excluding pavements and verges.",
  ],
  [
    "Contraflow",
    "A temporary traffic arrangement where vehicles travel against the normal direction.",
  ],
  ["Give way", "An instruction to let other road users proceed before you."],
  [
    "Hazard perception",
    "The ability to identify developing risks early and respond safely.",
  ],
  [
    "Hard shoulder",
    "The emergency lane at the side of a motorway or major road.",
  ],
  [
    "Priority road",
    "A road on which traffic normally has priority at junctions until indicated otherwise.",
  ],
  [
    "Stopping distance",
    "The combined distance travelled while reacting and braking to a complete stop.",
  ],
  [
    "Traffic island",
    "A raised or marked area that separates traffic or provides pedestrian refuge.",
  ],
  [
    "Zebra crossing",
    "A pedestrian crossing marked by black and white stripes where drivers must give way.",
  ],
];

export default function HighwayCodeGlossaryPage() {
  return (
    <GuidePage
      eyebrow="Learning resources"
      title="Highway Code Glossary"
      description="Understand the road vocabulary that appears in lessons, theory tests and everyday driving."
      icon={<FaBookOpen />}
      highlights={[
        "Plain-language definitions",
        "Theory test support",
        "Essential road terms",
      ]}
      currentPath="/highway-code-glossary"
    >
      <SectionTitle
        eyebrow="A–Z road terms"
        title="Build your road vocabulary"
        description="Use this quick reference while studying the Highway Code or preparing for a lesson."
      />
      <div className="mb-7 flex flex-wrap gap-2">
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
          <span
            key={letter}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold ${terms.some(([term]) => term.startsWith(letter)) ? "bg-[#103677] text-white" : "bg-slate-200 text-slate-400"}`}
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {terms.map(([term, definition]) => (
          <article
            key={term}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 font-extrabold text-[#e2233d]">
                {term[0]}
              </span>
              <div>
                <h2 className="text-lg font-extrabold text-[#103677]">
                  {term}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {definition}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </GuidePage>
  );
}
