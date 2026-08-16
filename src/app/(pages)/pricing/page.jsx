"use client";

import Image from "next/image";
import Link from "next/link";
import { FaTimesCircle } from "react-icons/fa";
import { FaSquareCheck } from "react-icons/fa6";

import offerHero from "../../../../public/image/offer.png";
import crownBadge from "../../../../public/image/traffic-two-price-batch.png";
import { useState } from "react";
import useOffers, { CATEGORY_BY_TAB, filterOffers } from "@/hooks/useOffers";
import useCmsPageContent from "@/hooks/useCmsPageContent";

const codePackages = [
  {
    title: "Eco Code",
    price: "FREE",
    features: ["Duration: Unlimited", "Access to the code app", "Video course and online manual", "5000 questions and 30 practice exams"],
  },
  {
    title: "Zen Code",
    price: "€9.99",
    oldPrice: "€19.99",
    best: true,
    badge: true,
    features: ["Duration: 12 month package", "Access to the code app", "Video course and online manual", "5000 questions and 30 practice exams", "Administrative procedures & Coaching"],
  },
  {
    title: "Success Code",
    price: "€33.99",
    oldPrice: "€43.99",
    badge: true,
    features: ["Duration: 12 month package", "Access to the code app", "Video course and online manual", "5000 questions and 30 practice exams", "A place for a highway code exam"],
  },
];

const cpfPackages = [
  { title: "Permis B Boîte Manuelle", price: "€850", oldPrice: "€870", hours: ["05 h", "10 hr", "15 hr"], features: ["Code + 10 heures de conduite", "Code + Examen + 10h"] },
  { title: "Permis B Boîte Manuelle", price: "€1570", oldPrice: "€1599", hours: ["20 hr", "25 hr", "30 hr"], features: ["Code + 25 heures de conduite"] },
  { title: "Permis B Boîte Manuelle", price: "€2350", oldPrice: "€2370", hours: ["35 hr", "40 hr", "50 hr"], features: ["Code + 40 heures de conduite"] },
];

const licensePackages = [
  {
    title: "Zen Permit",
    price: "€599",
    oldPrice: "€699",
    hours: ["05 hr", "10 hr", "20 hr", "30 hr"],
    note: "Most economical offer",
    features: ["20 driving lessons", "Initial assessment", "Code Training", "30 day training", "Support for the practical exam within 30 days"],
  },
  {
    title: "Premium License",
    price: "€599",
    oldPrice: "€699",
    hours: ["05 hr", "10 hr", "20 hr", "30 hr"],
    note: "Practical exam date within 30 days",
    features: ["20 driving lessons", "Initial assessment", "Code Training", "30 day training", "Support for the practical exam within 30 days"],
  },
  {
    title: "Accelerated Permit",
    price: "€599",
    oldPrice: "€699",
    hours: ["05 hr", "10 hr", "20 hr", "30 hr"],
    note: "30-day training course",
    features: ["20 driving lessons", "Initial assessment", "Code Training", "30 day training", "Support for the practical exam within 30 days"],
  },
];

const singleOffers = [
  ["Driving Lessons", "€54.90"],
  ["Automatic Driving course", "€59.90"],
  ["Prior appointment", "€89"],
  ["Educational Meeting", "€89"],
  ["Support for the practical test", "€70"],
];

function TransmissionSwitch({ value, onChange }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-[#cad5e5] bg-white p-1 !text-[12px] font-semibold">
      <button type="button" onClick={() => onChange("manual")} className={`rounded-full px-4 py-2 ${value === "manual" ? "bg-[#174a9b] text-white" : "text-[#5f6670]"}`}>Manual transmission</button>
      <button type="button" onClick={() => onChange("automatic")} className={`rounded-full px-4 py-2 ${value === "automatic" ? "bg-[#174a9b] text-white" : "text-[#5f6670]"}`}>Automatic transmission</button>
    </div>
  );
}

function FeatureList({ features, unavailableLast = false }) {
  return (
    <ul className="space-y-3">
      {features.map((feature, index) => {
        const unavailable = unavailableLast && index === features.length - 1;
        return (
          <li key={feature} className="flex gap-3 !text-[13px] leading-5 text-[#34383e]">
            {unavailable ? <FaTimesCircle className="mt-1 shrink-0 text-[#e4213c]" /> : <FaSquareCheck className="mt-1 shrink-0 text-[#174a9b]" />}
            <span>{feature}</span>
          </li>
        );
      })}
    </ul>
  );
}

function CodeCard({ item }) {
  return (
    <article className="relative flex min-h-[570px] flex-col rounded-[10px] border-2 border-[#174a9b] bg-[#f6f8fc] px-7 py-9 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl">
      {item.badge && <Image src={crownBadge} alt="Recommended" sizes="46px" className="absolute -right-2 -top-6 h-11 w-11 object-contain" />}
      <div className="text-center">
        {item.best && <p className="!text-[12px] font-semibold text-[#174a9b]">Best Value</p>}
        <h3 className="mt-1 text-[26px] font-bold text-[#e4213c]">{item.title}</h3>
        <p className="mt-2 !text-[12px] font-medium text-[#4771a7]">Complete revision + Administrative procedures</p>
        <div className="mx-auto mt-6 flex min-h-[42px] max-w-[180px] items-center justify-center rounded-full border border-[#174a9b] bg-white px-4">
          <span className="text-[18px] font-bold text-[#174a9b]">{item.price}</span>
          {item.oldPrice && <span className="ml-3 !text-[11px] text-[#737981] line-through">{item.oldPrice}</span>}
        </div>
      </div>
      <h4 className="mt-7 text-[17px] font-bold text-[#174a9b]">Package Contents</h4>
      <div className="mt-5 flex-1"><FeatureList features={item.features} unavailableLast={item.title === "Zen Code"} /></div>
      <Link href="/inscription" className="mx-auto mt-8 inline-flex min-h-[40px] min-w-[160px] items-center justify-center rounded-full bg-[#e4213c] px-6 !text-[12px] font-semibold uppercase text-white transition hover:bg-[#174a9b] hover:shadow-md">Sign Up</Link>
    </article>
  );
}

function RateCard({ item, license = false }) {
  return (
    <article className="flex min-h-[550px] flex-col rounded-[10px] border-2 border-[#174a9b] bg-[#f6f8fc] px-7 py-9 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl">
      <div className="text-center">
        <h3 className="text-[25px] font-bold text-[#e4213c]">{item.title}</h3>
        <p className="mt-2 !text-[12px] text-[#70757c]">{license ? "Theory test + 20 driving lessons" : "Code + 10 heures de conduite"}</p>
        {item.note && <p className="mt-1 !text-[12px] font-semibold text-[#174a9b]">{item.note}</p>}
        <div className="mt-6 flex justify-center gap-3">
          {item.hours.map((hour, index) => <span key={hour} className={`flex h-10 w-10 items-center justify-center rounded-full !text-[10px] font-bold ${index === Math.floor(item.hours.length / 2) ? "bg-[#174a9b] text-white" : "bg-[#dce6f5] text-[#59708f]"}`}>{hour}</span>)}
        </div>
      </div>
      <div className="mt-7 flex items-end justify-between rounded-[9px] bg-[#dfe8f5] px-5 py-4">
        <div><strong className="text-[25px] text-[#174a9b]">{item.price}</strong><p className="!text-[11px] text-[#757b83]">Super Sale</p></div>
        <div className="text-right"><span className="!text-[12px] text-[#747a82] line-through">{item.oldPrice}</span><p className="!text-[11px] text-[#757b83]">Retail Price</p></div>
      </div>
      <h4 className="mt-7 text-[17px] font-bold text-[#174a9b]">Package Contents</h4>
      <div className="mt-5 flex-1"><FeatureList features={item.features} /></div>
      <Link href="/inscription" className="mx-auto mt-8 inline-flex min-h-[40px] min-w-[160px] items-center justify-center rounded-full border border-[#174a9b] px-6 !text-[12px] font-semibold text-[#e4213c] transition hover:bg-[#174a9b] hover:text-white">Sign up</Link>
    </article>
  );
}

function SectionHeading({ children, switcher = true, transmission, onTransmissionChange }) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <h2 className="text-[32px] font-bold tracking-[-0.02em]">{children}</h2>
      {switcher && <TransmissionSwitch value={transmission} onChange={onTransmissionChange} />}
    </div>
  );
}

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState("Code");
  const [transmission, setTransmission] = useState("manual");
  const { cards, loading, error } = useOffers();
  const selectedOffers = filterOffers(cards, CATEGORY_BY_TAB[activeTab], transmission);
  const cpfOffers = filterOffers(cards, "cpf", transmission);
  const drivingOffers = filterOffers(cards, "to drive", transmission);
  const otherOffers = filterOffers(cards, "other", transmission);
  const { page, content } = useCmsPageContent("pricing");
  const settings = content?.settings || {};
  const copy = (key, fallback) => settings[key]?.trim?.() || fallback;
  return (
    <main className="overflow-hidden bg-white text-[#202124]">
      <section className="bg-[#eaf0f9]">
        <div className="mx-auto grid min-h-[560px] max-w-[1280px] grid-cols-[minmax(0,1fr)] items-center gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:px-10">
          <div>
            <h1 className="text-[36px] font-bold tracking-[-0.025em] sm:text-[43px]">{copy("heroTitle", "Best Driving Lesson Offers")}</h1>
            <p className="mt-6 !text-[16px] text-[#71767d]">{copy("heroDescription", "Choose the perfect package that fits your learning needs and budget.")}</p>
            <Link href="#packages" className="mt-10 inline-flex min-h-[48px] min-w-[300px] items-center justify-center rounded-[9px] bg-[#e4213c] px-7 !text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#174a9b] hover:shadow-lg">{copy("heroButton", "View Packages")}</Link>
          </div>
          <Image src={offerHero} alt="Driving lesson offer" priority sizes="(max-width: 768px) 92vw, 560px" className="h-auto w-full max-w-[540px] justify-self-end" />
        </div>
      </section>

      <section id="packages" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeading transmission={transmission} onTransmissionChange={setTransmission}>{copy("packagesTitle", "Our Packages")}</SectionHeading>
          <div className="mt-8 flex flex-wrap gap-3">{["Code", "Driving License", "CPF Offers", "Accompanied Driving", "À la carte"].map((tab) => <button type="button" onClick={() => setActiveTab(tab)} key={tab} className={`rounded-[7px] border px-5 py-2 !text-[12px] font-semibold ${activeTab === tab ? "border-[#174a9b] bg-[#dce8fb] text-[#174a9b]" : "border-[#d6deea]"}`}>{tab}</button>)}</div>
          <div className="mt-10 grid gap-9 lg:grid-cols-3">{selectedOffers.map((item) => activeTab === "Code" || activeTab === "Accompanied Driving" ? <CodeCard key={item._id} item={item} /> : <RateCard key={item._id} item={item} license={activeTab === "Driving License"} />)}</div>
          {loading && <p className="mt-8 text-center text-sm text-gray-500">Loading offers...</p>}{error && <p className="mt-8 text-center text-sm text-red-600">{error}</p>}
          <div className="mt-16 rounded-[10px] bg-[#eaf0f9] px-6 py-10 text-center"><h3 className="text-[20px] font-bold">{copy("trainingTitle", "Manage your entire online training at the best price")}</h3><Link href="/appointment" className="mt-6 inline-flex min-w-[340px] max-w-full justify-center rounded-[8px] bg-[#e4213c] px-7 py-3 !text-[13px] font-semibold text-white transition hover:bg-[#174a9b]">{copy("trainingButton", "Book Appointment")}</Link></div>
        </div>
      </section>

      <section className="bg-[#eaf0f9] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1280px]"><SectionHeading transmission={transmission} onTransmissionChange={setTransmission}>{copy("cpfTitle", "Permisgo's CPF rates")}</SectionHeading><div className="mt-12 grid gap-8 lg:grid-cols-3">{cpfOffers.map((item) => <RateCard key={item._id} item={item} />)}</div></div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1280px]"><SectionHeading transmission={transmission} onTransmissionChange={setTransmission}>{copy("licenceOffersTitle", "Our driving licence offers")}</SectionHeading><div className="mt-12 grid gap-8 lg:grid-cols-3">{drivingOffers.map((item) => <RateCard key={item._id} item={item} license />)}</div></div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:pb-24">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-center text-[34px] font-bold">{copy("supervisedTitle", "Our supervised driving package")}</h2>
          <div className="mt-10 rounded-[10px] bg-[#f0f3f8] p-7 lg:p-12">
            <h3 className="text-center text-[25px] font-bold text-[#e4213c]">Accompanied Driving</h3><p className="mt-2 text-center !text-[12px] text-[#757a81]">Code + driving lessons</p>
            <div className="mx-auto mt-8 grid max-w-[900px] gap-10 md:grid-cols-2">
              <div className="rounded-[10px] bg-[#e3eaf5] p-7"><div className="flex items-end justify-between rounded-[8px] bg-white px-5 py-4"><div><strong className="text-[24px] text-[#174a9b]">€0</strong><p className="!text-[11px]">Super Sale</p></div><div className="text-right"><span className="!text-[12px] line-through">€0</span><p className="!text-[11px]">Retail Price</p></div></div><Link href="/inscription" className="mt-5 inline-flex w-full justify-center rounded-[8px] bg-[#e4213c] px-6 py-3 !text-[12px] font-semibold text-white transition hover:bg-[#174a9b]">Sign up</Link></div>
              <div><h4 className="text-[17px] font-bold text-[#174a9b]">Package Contents</h4><div className="mt-5"><FeatureList features={["13 Cours de séances personnalisées", "L'évaluation de départ initiale", "Formation au Code de la route 2025"]} /></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:pb-28">
        <div className="mx-auto max-w-[850px] text-center"><h2 className="text-[34px] font-bold">{copy("carteTitle", "Discover our à la carte offers")}</h2><p className="mt-4 !text-[13px] text-[#777c82]">{copy("carteDescription", "It is possible to choose your training program à la carte.")}</p>
          <div className="mt-10 space-y-4 text-left">{otherOffers.map((item) => <div key={item._id} className="flex min-h-[62px] items-center rounded-[9px] bg-[#eaf0f9] px-5"><span className="flex-1 !text-[14px] font-semibold">{item.title}</span><span className="mr-7 !text-[13px] font-bold text-[#20ae55]">{item.price}</span><button type="button" className="rounded-full bg-[#e4213c] px-5 py-2 !text-[12px] font-semibold text-white transition hover:bg-[#174a9b]">Add</button></div>)}</div>
        </div>
      </section>
    </main>
  );
}
