"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoChevronBack, IoClose } from "react-icons/io5";

const tabs = ["Mecanique", "Vision", "Autoroute", "Intersection", "Manoeuvre", "Voyant", "Signalisation", "Divers"];
const cards = [
  { title: "Deceleration", img: "/image/Deceleration.png", details: "Reduce speed progressively, check the mirrors and position the vehicle safely before taking an exit." },
  { title: "Insertion", img: "/image/Insertion.png", details: "Observe traffic, adapt your speed, signal early and merge smoothly without disturbing other road users." },
  { title: "Weaving", img: "/image/Weaving.png", details: "Keep a safe distance, check mirrors and blind spots, then change lanes progressively and safely." },
  { title: "3-lane highway", img: "/image/3-lane highway.png", details: "Use each lane correctly, maintain a safe speed and return to the right lane after overtaking." },
  { title: "Distanc. (Distance)", img: "/image/Distanc.png", details: "Maintain enough following distance to preserve reaction time and prevent sudden-braking collisions." },
];

export default function ChoiceSchemaPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Mecanique");
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const close = (event) => event.key === "Escape" && setSelectedCard(null);
    window.addEventListener("keydown", close);
    document.body.style.overflow = selectedCard ? "hidden" : "";
    return () => { window.removeEventListener("keydown", close); document.body.style.overflow = ""; };
  }, [selectedCard]);

  return <main className="min-h-screen bg-white px-3 py-4 text-[#171717] sm:px-5 sm:py-5">
    <div className="mx-auto w-full max-w-[1440px]">
      <header className="flex items-center gap-4">
        <button type="button" onClick={() => router.back()} aria-label="Go back" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#E8EEF7] text-[24px] text-black transition hover:bg-[#dfe7f2]"><IoChevronBack /></button>
        <h1 className="text-[23px] font-bold text-[#173F8F] sm:text-[25px]">Choice schémas</h1>
      </header>

      <section className="mt-8 rounded-[12px] bg-[#E8EEF7] px-5 py-8 sm:px-8 sm:py-10 lg:px-14">
        <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`h-12 shrink-0 rounded-[11px] px-6 text-[14px] font-semibold transition ${activeTab === tab ? "bg-[#AFC7EF] font-bold text-[#173F8F]" : "bg-white text-[#3f3f46] hover:bg-[#f8fafc]"}`}>{tab}</button>)}
        </div>

        <div className="mt-7 rounded-[12px] bg-white px-5 py-6 sm:px-6">
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
            {cards.map((card) => <button key={card.title} type="button" onClick={() => setSelectedCard(card)} className="group min-w-0 text-left">
              <div className="relative aspect-[0.61] w-full overflow-hidden rounded-[10px] bg-[#eef1f4]"><Image src={card.img} alt={card.title} fill sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw" className="object-cover transition duration-300 group-hover:scale-[1.02]" /></div>
              <p className="mt-3 truncate text-[14px] font-medium text-[#444] sm:text-[15px]">{card.title}</p>
            </button>)}
          </div>
        </div>
      </section>
    </div>

    {selectedCard && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedCard(null)}><div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}><button type="button" onClick={() => setSelectedCard(null)} aria-label="Close" className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow"><IoClose size={22} /></button><div className="grid md:grid-cols-2"><div className="relative min-h-[300px] bg-[#e8eef7]"><Image src={selectedCard.img} alt={selectedCard.title} fill className="object-contain" /></div><div className="p-6 sm:p-8"><h2 className="text-xl font-bold text-[#173f87]">{selectedCard.title}</h2><p className="mt-4 text-sm leading-7 text-slate-600">{selectedCard.details}</p></div></div></div></div>}
  </main>;
}
