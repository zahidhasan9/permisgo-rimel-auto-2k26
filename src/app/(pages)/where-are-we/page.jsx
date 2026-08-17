import Link from "next/link";
import {
  FaBuilding,
  FaBus,
  FaClock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTrain,
} from "react-icons/fa";
import GuidePage, { SectionTitle } from "@/components/public/GuidePage";

export const metadata = {
  title: "Where Are We?",
  description: "Find the PermisGo office and plan your visit.",
};

export default function WhereAreWePage() {
  return (
    <GuidePage
      eyebrow="Find PermisGo"
      title="Where are we?"
      description="Visit our team in Aubervilliers. Find our address, opening hours and the easiest ways to reach us."
      icon={<FaMapMarkerAlt />}
      highlights={["Easy to reach", "Friendly local team", "By appointment"]}
      currentPath="/where-are-we"
    >
      <SectionTitle
        eyebrow="Our location"
        title="Come and meet our team"
        description="Whether you need registration help, information about lessons or support with your file, our team is ready to welcome you."
      />
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="relative flex min-h-72 items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#dce9f9_0%,#eef4fb_50%,#d6e5f7_100%)] p-8">
          <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(#9fb9da_1px,transparent_1px),linear-gradient(90deg,#9fb9da_1px,transparent_1px)] [background-size:38px_38px]" />
          <div className="relative rounded-2xl bg-white p-5 text-center shadow-xl">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e2233d] text-2xl text-white">
              <FaMapMarkerAlt />
            </span>
            <p className="mt-3 font-extrabold text-[#103677]">
              PermisGo Auto École
            </p>
            <p className="mt-1 text-sm text-slate-500">
              100 rue Danielle Casanova
            </p>
          </div>
        </div>
        <div className="grid gap-px bg-slate-200 sm:grid-cols-3">
          {[
            [
              <FaBuilding key="i" />,
              "Address",
              "100 rue Danielle Casanova, 93300 Aubervilliers",
            ],
            [
              <FaClock key="i" />,
              "Opening hours",
              "Mon–Sat, 10am–1pm & 3pm–7pm",
            ],
            [<FaPhoneAlt key="i" />, "Call us", "09 56 73 63 33"],
          ].map(([icon, label, value]) => (
            <div key={label} className="bg-white p-6">
              <span className="text-xl text-[#e2233d]">{icon}</span>
              <h3 className="mt-3 font-extrabold text-[#103677]">{label}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12">
        <SectionTitle eyebrow="Plan your journey" title="Getting here" cms={false} />
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            {
              icon: <FaTrain />,
              title: "By metro or train",
              text: "Use the nearest public transport connection and allow a few extra minutes for your first visit.",
            },
            {
              icon: <FaBus />,
              title: "By bus",
              text: "Several local bus routes serve central Aubervilliers and the surrounding neighbourhoods.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl text-[#103677]">
                {item.icon}
              </span>
              <h3 className="mt-5 text-xl font-extrabold text-[#103677]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {item.text}
              </p>
            </article>
          ))}
        </div>
        <Link
          href="/appointment"
          className="mt-7 inline-flex rounded-xl bg-[#103677] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#e2233d]"
        >
          Book an appointment
        </Link>
      </div>
    </GuidePage>
  );
}
