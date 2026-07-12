"use client";

import { useState } from "react";

const tabs = ["Code", "To Drive", "CPF", "Accompanied", "Map"];
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";
const packages = [
  {
    title: "Traffic Laws",
    description:
      "An economical and comprehensive solution to effectively prepare you for the Highway Code, 100% online.",
    price: "30 USD",
    oldPrice: "20 USD",
    featured: false,
  },
  {
    title: "Accelerated Code Pack",
    description:
      "A comprehensive and intensive training program to quickly pass your driving theory test!",
    price: "30 USD",
    oldPrice: "20 USD",
    featured: true,
  },
  {
    title: "Fast Track Package + Sworn Translator",
    description:
      "A complete and suitable package for non-French-speaking candidates, with support in Bengali by a translator.",
    price: "30 USD",
    oldPrice: "500 USD",
    featured: false,
  },
];

const contents = [
  "Dual-control training cars",
  "Online theory preparation",
  "Practice test access",
  "Learning support included",
];

export default function OffersPage() {
  const [activeTab, setActiveTab] = useState("Code");
  const [transmission, setTransmission] = useState("Manual transmission");
  const router = useRouter();
  return (
    <main className="min-h-screen bg-white px-4 py-5 text-[#111827] sm:px-6">
      <div className="mx-auto ">
        {/* Header */}
        <header className="mb-7 flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#16458f] shadow-sm transition hover:bg-blue-50"
          >
            <FaChevronLeft size={14} />
          </button>

          <h1 className="text-2xl font-bold text-[#103f8f]">Offers</h1>
        </header>

        {/* Tabs */}
        <div className="mb-7 flex gap-3 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 rounded-xl border px-6 py-2.5 text-sm font-semibold transition ${
                activeTab === tab
                  ? "border-[#0f4599] bg-[#bdd5ff] text-[#104392]"
                  : "border-[#d8e2ef] bg-white text-[#171717] hover:bg-[#f8fafc]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Offer Area */}
        <section className="rounded-2xl bg-[#e8eef7] p-4 sm:p-5 lg:p-6">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-xl font-extrabold text-[#104392] sm:text-[22px]">
              Permisgo&apos;s Highway Code Packs
            </h2>

            <div className="flex w-full max-w-[390px] rounded-full bg-white p-1">
              {["Manual transmission", "Automatic transmission"].map((item) => (
                <button
                  key={item}
                  onClick={() => setTransmission(item)}
                  className={`flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                    transmission === item
                      ? "bg-[#104392] text-white"
                      : "text-[#111827]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((item) => (
              <OfferCard key={item.title} item={item} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function OfferCard({ item }) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl bg-white p-4 transition ${
        item.featured
          ? "border-b-4 border-[#104392] shadow-[0_18px_35px_rgba(43,75,190,0.22)]"
          : "shadow-sm"
      }`}
    >
      {/* Top Box */}
      <div className="rounded-2xl bg-[#e7edf6] p-4 text-center sm:p-5">
        <h3 className="mx-auto mb-3 min-h-[58px] max-w-[260px] text-[21px] font-extrabold leading-snug text-[#e5263d]">
          {item.title}
        </h3>

        <p className="mx-auto mb-6 min-h-[58px] max-w-[275px] text-sm leading-5 text-[#666666]">
          {item.description}
        </p>

        <div className="rounded-xl bg-white p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="text-left">
              <p className="text-[22px] font-extrabold leading-none text-[#104392]">
                {item.price}
              </p>
              <p className="mt-2 text-xs text-[#666666]">Super Sale</p>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-[#222222] line-through">
                {item.oldPrice}
              </p>
              <p className="mt-2 text-xs text-[#666666]">Retail Price</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contents */}
      <div className="mt-5 flex-1">
        <h4 className="mb-4 text-base font-bold text-[#222222]">
          Package Contents
        </h4>

        <ul className="space-y-3.5">
          {contents.map((text) => (
            <li
              key={text}
              className="flex items-center gap-3 text-[15px] text-black"
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#104392] text-[10px] font-bold text-white">
                ✓
              </span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <button
        className={`mt-6 h-12 w-full rounded-xl border-2 text-base font-bold transition ${
          item.featured
            ? "border-[#df263d] bg-[#df263d] text-white hover:bg-[#c92035]"
            : "border-[#104392] bg-white text-[#df263d] hover:bg-[#f5f8ff]"
        }`}
      >
        Buy Now
      </button>
    </div>
  );
}
