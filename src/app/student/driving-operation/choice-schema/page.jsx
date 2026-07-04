"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaInfoCircle, FaTimes } from "react-icons/fa";

const tabs = [
  "Mecanique",
  "Vision",
  "Autoroute",
  "Intersection",
  "Manoeuvre",
  "Voyant",
  "Signalisation",
  "Divers",
];

const cards = [
  {
    title: "Deceleration",
    desc: "Reduce speed safely before exit",
    details:
      "Once your instructor registers you for the exam, the average wait time is 2 to 8 weeks, depending on your region. In the meantime, keep practicing. This schema helps you understand how to reduce speed safely before taking an exit.",
    img: "/image/deceleration.png",
    tag: "Safety",
  },
  {
    title: "Insertion",
    desc: "Merge smoothly into traffic flow",
    details:
      "This schema explains how to enter a road or highway safely. Check mirrors, observe traffic speed, use indicators, and merge smoothly without disturbing other vehicles.",
    img: "/image/insertion.png",
    tag: "Merge",
  },
  {
    title: "Weaving",
    desc: "Change lanes efficiently on highway",
    details:
      "This lesson helps you understand lane changing behavior in active traffic. Keep a safe distance, check blind spots, signal early, and avoid sudden movement.",
    img: "/image/weaving.png",
    tag: "Traffic",
  },
  {
    title: "3-lane highway",
    desc: "Maintain lane discipline & speed",
    details:
      "Learn how to use each lane correctly on a three-lane highway. Maintain a safe speed, respect lane discipline, and avoid unnecessary lane changes.",
    img: "/image/3-lane highway.png",
    tag: "Core",
  },
  {
    title: "Distance",
    desc: "Keep safe following distance",
    details:
      "This schema teaches safe following distance. Keeping proper distance gives you enough reaction time and helps prevent accidents in sudden braking situations.",
    img: "/image/Distanc.png",
    tag: "Important",
  },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState("Mecanique");
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setSelectedCard(null);
      }
    };

    window.addEventListener("keydown", handleEsc);

    if (selectedCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [selectedCard]);

  return (
    <main className="min-h-screen bg-white px-4 py-5 font-sans text-[#171717] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1120px]">
        {/* Header */}
        <header className="flex items-center gap-3 sm:gap-4">
          <Link
            href="#"
            aria-label="Go back"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#E8EEF7] text-[18px] text-black transition hover:bg-[#dfe7f2] sm:h-11 sm:w-11"
          >
            <FaArrowLeft />
          </Link>

          <div>
            <h1 className="text-[22px] font-bold leading-tight text-[#173F8F] sm:text-[24px]">
              Choice schémas
            </h1>

            <p className="mt-1 flex items-center gap-1.5 text-[13px] font-medium text-[#667085]">
              <FaInfoCircle className="text-[#174596]" />
              Learn driving scenarios step by step
            </p>
          </div>
        </header>

        {/* Main Wrapper */}
        <section className="mt-7 rounded-[16px] bg-[#E8EEF7] p-4 shadow-[0_10px_30px_rgba(23,69,150,0.08)] sm:p-5">
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 rounded-full px-4 py-2 text-[12px] font-bold transition ${
                  activeTab === tab
                    ? "bg-[#174596] text-white shadow-md"
                    : "bg-white text-[#667085] hover:bg-[#f5f7fb] hover:text-[#174596]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cards.map((card) => (
              <article
                key={card.title}
                className="overflow-hidden rounded-[16px] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(23,69,150,0.14)]"
              >
                {/* Image Click Area */}
                <button
                  type="button"
                  onClick={() => setSelectedCard(card)}
                  className="group relative block aspect-[4/3] w-full overflow-hidden text-left"
                >
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />

                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white">
                    {card.tag}
                  </span>

                  <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#174596] opacity-0 shadow-md transition group-hover:opacity-100">
                    View Details
                  </span>
                </button>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-[15px] font-bold text-[#171717]">
                    {card.title}
                  </h3>

                  <p className="mt-1.5 text-[13px] leading-[1.45] text-[#667085]">
                    {card.desc}
                  </p>

                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#E8EEF7]">
                    <div className="h-full w-2/3 rounded-full bg-[#174596]" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6 backdrop-blur-sm"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="relative w-full max-w-[860px] overflow-hidden rounded-[18px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedCard(null)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#174596] shadow-md transition hover:bg-[#DF2339] hover:text-white"
            >
              <FaTimes />
            </button>

            <div className="grid grid-cols-1 gap-0 md:grid-cols-[1.15fr_0.85fr]">
              {/* Details */}
              <div className="p-6 sm:p-8">
                <span className="inline-flex rounded-full bg-[#E8EEF7] px-3 py-1 text-[11px] font-bold text-[#174596]">
                  {selectedCard.tag}
                </span>

                <h2 className="mt-4 text-[20px] font-bold text-[#174596] sm:text-[22px]">
                  Details Description :
                </h2>

                <h3 className="mt-4 text-[18px] font-bold text-[#171717]">
                  {selectedCard.title}
                </h3>

                <p className="mt-3 text-[14px] leading-[1.75] text-[#666666]">
                  {selectedCard.details}
                </p>

                <p className="mt-4 text-[14px] leading-[1.75] text-[#666666]">
                  Continue practicing this scenario regularly so that you can
                  understand the road situation clearly and respond safely
                  during real driving.
                </p>
              </div>

              {/* Modal Image */}
              <div className="relative min-h-[260px] bg-[#E8EEF7] md:min-h-[420px]">
                <Image
                  src={selectedCard.img}
                  alt={selectedCard.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
