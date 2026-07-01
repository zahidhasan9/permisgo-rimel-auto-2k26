"use client";

import { useState } from "react";
import {
  FaCheckCircle,
  FaLocationArrow,
  FaMapMarkerAlt,
  FaSearch,
} from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";

const tabs = ["Code", "To Drive", "CPF", "Accompanied", "Map"];

const codePackages = [
  {
    title: "Traffic Laws",
    description:
      "An economical and comprehensive solution to effectively prepare you for the Highway Code, 100% online.",
    sale: "30 USD",
    retail: "20 USD",
    active: false,
  },
  {
    title: "Accelerated Code Pack",
    description:
      "A comprehensive and intensive training program to quickly pass your driving theory test!",
    sale: "30 USD",
    retail: "20 USD",
    active: true,
  },
  {
    title: "Fast Track Package + Sworn Translator",
    description:
      "A complete and suitable package for non-French-speaking candidates, with support in Bengali by a translator",
    sale: "30 USD",
    retail: "500 USD",
    active: false,
  },
];

const drivePackages = [
  {
    title: "Pack for License B",
    subtitle: "Theory Test + 1 Hour of driving",
    sale: "200 USD",
    retail: "500 USD",
    active: false,
  },
  {
    title: "Pack for License B",
    subtitle: "Theory Test + 1 Hour of driving",
    sale: "200 USD",
    retail: "500 USD",
    active: true,
  },
  {
    title: "Pack for License B",
    subtitle: "Theory Test + 1 Hour of driving",
    sale: "200 USD",
    retail: "500 USD",
    active: false,
  },
];

const cpfPackages = [
  {
    title: "Permis B Boîte Manuelle",
    subtitle: "Theory Test + 1 Hour of driving",
    sale: "300 USD",
    retail: "500 USD",
    active: false,
  },
  {
    title: "Permis B Boîte Manuelle",
    subtitle: "Theory Test + 1 Hour of driving",
    sale: "300 USD",
    retail: "500 USD",
    active: true,
  },
  {
    title: "Permis B Boîte Manuelle",
    subtitle: "Theory Test + 1 Hour of driving",
    sale: "300 USD",
    retail: "500 USD",
    active: false,
  },
];

const Accompanied = [
  {
    title: "Accompanied Driving",
    description: "Code + Driving Lesson.",
    sale: "200 USD",
    retail: "500 USD",
    active: false,
  },
  {
    title: "Accelerated Code Pack",
    description:
      "A comprehensive and intensive training program to quickly pass your driving theory test!",
    sale: "30 USD",
    retail: "20 USD",
    active: true,
  },
  {
    title: "Fast Track Package + Sworn Translator",
    description:
      "A complete and suitable package for non-French-speaking candidates, with support in Bengali by a translator",
    sale: "30 USD",
    retail: "500 USD",
    active: false,
  },
];

const packageContents = [
  "Duel- control training cars",
  "Duel- control training cars trainin",
  "Duel- control training cars",
  "Duel- control training cars",
];

function Header() {
  return (
    <header className="flex items-center gap-[16px]">
      <button className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[12px] bg-[#EEF4FB] text-[27px] text-black">
        <IoChevronBack />
      </button>

      <h1 className="text-[25px] font-[700] leading-none text-[#174A9B]">
        Offers
      </h1>
    </header>
  );
}

function Tabs({ activeTab, setActiveTab }) {
  return (
    <nav className="mt-[33px] flex flex-wrap gap-[12px]">
      {tabs.map((tab) => {
        const active = activeTab === tab;

        return (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={[
              "h-[40px] rounded-[10px] border px-[25px] text-[14px] font-[700] leading-none transition",
              active
                ? "border-[#174A9B] bg-[#BFD8FF] text-[#174A9B]"
                : "border-[#CFD8E8] bg-white text-[#111111]",
            ].join(" ")}
          >
            {tab}
          </button>
        );
      })}
    </nav>
  );
}

function TransmissionToggle() {
  return (
    <div className="flex h-[39px] w-full max-w-[384px] overflow-hidden rounded-full bg-white">
      <button className="h-full w-[181px] rounded-full bg-[#174A9B] text-[14px] font-[500] text-white">
        Manual transmission
      </button>

      <button className="h-full flex-1 rounded-full bg-white text-[14px] font-[500] text-[#111111]">
        Automatic transmission
      </button>
    </div>
  );
}

function PriceBox({ sale, retail, className = "" }) {
  return (
    <div
      className={`flex h-[73px] items-center justify-between rounded-[10px] bg-white px-[12px] ${className}`}
    >
      <div>
        <p className="text-[22px] font-[700] leading-none text-[#174A9B]">
          {sale}
        </p>
        <p className="mt-[8px] text-[12px] font-[500] leading-none text-[#666666]">
          Super Sale
        </p>
      </div>

      <div className="text-right">
        <p className="text-[14px] font-[500] leading-none text-[#111111] line-through">
          {retail}
        </p>
        <p className="mt-[8px] text-[12px] font-[500] leading-none text-[#666666]">
          Retail Price
        </p>
      </div>
    </div>
  );
}

function PackageList() {
  return (
    <div className="mt-[28px]">
      <h3 className="text-[17px] font-[700] leading-none text-[#222222]">
        Package Contents
      </h3>

      <ul className="mt-[20px] space-y-[17px]">
        {packageContents.map((content, index) => (
          <li key={index} className="flex items-start gap-[10px]">
            <FaCheckCircle className="mt-[2px] h-[13px] w-[13px] shrink-0 text-[#174A9B]" />
            <span className="text-[15.5px] font-[500] leading-[18px] text-[#101010]">
              {content}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BuyButton({ active }) {
  return (
    <button
      className={[
        "absolute bottom-[20px] left-[20px] right-[20px] h-[48px] rounded-[10px] text-[15px] font-[700]",
        active
          ? "bg-[#E5273D] text-white"
          : "border-[2px] border-[#174A9B] bg-white text-[#E5273D]",
      ].join(" ")}
    >
      Buy Now
    </button>
  );
}

function CodeCard({ item }) {
  return (
    <article
      className={[
        "relative min-h-[566px] rounded-[11px] bg-white px-[20px] pb-[20px] pt-[20px]",
        item.active
          ? "shadow-[0_24px_42px_rgba(23,74,155,0.20)] after:absolute after:bottom-0 after:left-0 after:h-[6px] after:w-full after:rounded-b-[11px] after:bg-[#174A9B]"
          : "",
      ].join(" ")}
    >
      <div className="rounded-[11px] bg-[#E8EEF8] px-[16px] pb-[26px] pt-[28px]">
        <h2 className="mx-auto max-w-[250px] text-center text-[21px] font-[700] leading-[29px] text-[#E5273D]">
          {item.title}
        </h2>

        <p className="mx-auto mt-[12px] min-h-[54px] max-w-[260px] text-center text-[13px] font-[500] leading-[18px] text-[#707070]">
          {item.description}
        </p>

        <PriceBox sale={item.sale} retail={item.retail} className="mt-[25px]" />
      </div>

      <PackageList />
      <BuyButton active={item.active} />
    </article>
  );
}

function HourBadge({ value, active = false }) {
  return (
    <div
      className={[
        "flex items-center justify-center rounded-full font-[700]",
        active
          ? "h-[60px] w-[60px] bg-[#174A9B] text-[16px] text-white"
          : "h-[41px] w-[41px] bg-[#B9CAE8] text-[12px] text-[#174A9B]",
      ].join(" ")}
    >
      {value}
    </div>
  );
}

function DriveCard({ item }) {
  return (
    <article
      className={[
        "relative min-h-[568px] rounded-[11px] bg-white px-[20px] pb-[20px] pt-[20px]",
        item.active
          ? "shadow-[0_28px_46px_rgba(23,74,155,0.25)] after:absolute after:bottom-0 after:left-0 after:h-[6px] after:w-full after:rounded-b-[11px] after:bg-[#174A9B]"
          : "",
      ].join(" ")}
    >
      <div className="rounded-[11px] bg-[#E8EEF8] px-[16px] pb-[14px] pt-[17px]">
        <h2 className="text-center text-[21px] font-[700] leading-[25px] text-[#E5273D]">
          {item.title}
        </h2>

        <p className="mt-[9px] text-center text-[12.5px] font-[500] leading-none text-[#666666]">
          {item.subtitle}
        </p>

        <div className="mt-[24px] flex items-center justify-center gap-[8px]">
          <HourBadge value="01 hr" />
          <HourBadge value="05 hr" active />
          <HourBadge value="10 hr" />
        </div>

        <PriceBox sale={item.sale} retail={item.retail} className="mt-[20px]" />
      </div>

      <PackageList />
      <BuyButton active={item.active} />
    </article>
  );
}

function CodeTab() {
  return (
    <section className="mt-[28px] rounded-[10px] bg-[#E8EEF8] px-[24px] pb-[24px] pt-[25px]">
      <div className="flex items-center justify-between gap-[20px] max-md:flex-col max-md:items-start">
        <h2 className="text-[21px] font-[700] leading-none text-[#174A9B]">
          Permisgo&apos;s Highway Code Packs
        </h2>

        <TransmissionToggle />
      </div>

      <div className="mt-[32px] grid grid-cols-1 gap-[23px] md:grid-cols-2 xl:grid-cols-3">
        {codePackages.map((item) => (
          <CodeCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}

function ToDriveTab() {
  return (
    <section className="mt-[28px] rounded-[10px] bg-[#E8EEF8] px-[24px] pb-[24px] pt-[24px]">
      <div className="flex items-center justify-between gap-[20px] max-md:flex-col max-md:items-start">
        <h2 className="text-[22px] font-[700] leading-none text-[#174A9B]">
          Our driving license offers
        </h2>

        <TransmissionToggle />
      </div>

      <div className="mt-[32px] grid grid-cols-1 gap-[24px] md:grid-cols-2 xl:grid-cols-3">
        {drivePackages.map((item, index) => (
          <DriveCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
}

function CpfTab() {
  return (
    <section className="mt-[28px] rounded-[10px] bg-[#E8EEF8] px-[24px] pb-[24px] pt-[24px]">
      <div className="flex items-center justify-between gap-[20px] max-md:flex-col max-md:items-start">
        <h2 className="text-[22px] font-[700] leading-none text-[#174A9B]">
          CPF rates
        </h2>

        <TransmissionToggle />
      </div>

      <div className="mt-[32px] grid grid-cols-1 gap-[24px] md:grid-cols-2 xl:grid-cols-3">
        {cpfPackages.map((item, index) => (
          <DriveCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
}

function AccompanieTab({ item }) {
  return (
    <section className="mt-[28px] rounded-[10px] bg-[#E8EEF8] px-[24px] pb-[24px] pt-[25px]">
      <div className="flex items-center justify-between gap-[20px] max-md:flex-col max-md:items-start">
        <h2 className="text-[21px] font-[700] leading-none text-[#174A9B]">
          Permisgo&apos;s Highway Code Packs
        </h2>

        <TransmissionToggle />
      </div>

      <div className="mt-[32px] grid grid-cols-1 gap-[23px] md:grid-cols-2 xl:grid-cols-3">
        {Accompanied.map((item) => (
          <CodeCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}

function MapTab() {
  const locations = [
    {
      name: "Paris Driving Center",
      address: "12 Rue de Rivoli, Paris",
      distance: "1.2 km",
      active: true,
    },
    {
      name: "Permisgo Training Point",
      address: "25 Avenue Victor Hugo",
      distance: "2.8 km",
      active: false,
    },
    {
      name: "Highway Code Office",
      address: "8 Boulevard Saint-Michel",
      distance: "4.1 km",
      active: false,
    },
  ];

  return (
    <section className="mt-[28px] rounded-[10px] bg-[#E8EEF8] px-[24px] pb-[24px] pt-[24px]">
      <div className="flex items-center justify-between gap-[20px] max-md:flex-col max-md:items-start">
        <div>
          <h2 className="text-[22px] font-[700] leading-none text-[#174A9B]">
            Training Center Map
          </h2>
          <p className="mt-[12px] text-[13px] font-[500] text-[#666666]">
            Find nearby driving schools and lesson centers
          </p>
        </div>

        <div className="flex h-[42px] w-full max-w-[330px] items-center gap-[10px] rounded-[10px] bg-white px-[14px]">
          <FaSearch className="text-[14px] text-[#174A9B]" />
          <input
            placeholder="Search location"
            className="w-full bg-transparent text-[13px] font-[500] text-[#111111] outline-none placeholder:text-[#8A8A8A]"
          />
        </div>
      </div>

      <div className="mt-[24px] grid grid-cols-1 gap-[20px] lg:grid-cols-[340px_1fr]">
        <div className="space-y-[14px]">
          {locations.map((location) => (
            <div
              key={location.name}
              className={[
                "rounded-[12px] bg-white px-[16px] py-[15px]",
                location.active
                  ? "border-[2px] border-[#174A9B]"
                  : "border border-transparent",
              ].join(" ")}
            >
              <div className="flex items-start gap-[12px]">
                <div
                  className={[
                    "flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px]",
                    location.active
                      ? "bg-[#174A9B] text-white"
                      : "bg-[#E8EEF8] text-[#174A9B]",
                  ].join(" ")}
                >
                  <FaMapMarkerAlt />
                </div>

                <div className="min-w-0">
                  <h3 className="text-[14px] font-[700] leading-[18px] text-[#111111]">
                    {location.name}
                  </h3>
                  <p className="mt-[6px] text-[12px] font-[500] leading-[17px] text-[#666666]">
                    {location.address}
                  </p>
                  <p className="mt-[8px] text-[12px] font-[700] text-[#2DBE42]">
                    {location.distance} away
                  </p>
                </div>
              </div>
            </div>
          ))}

          <button className="flex h-[46px] w-full items-center justify-center gap-[9px] rounded-[10px] bg-[#E5273D] text-[14px] font-[700] text-white">
            <FaLocationArrow className="text-[13px]" />
            Use Current Location
          </button>
        </div>

        <div className="relative min-h-[430px] overflow-hidden rounded-[14px] bg-white">
          <div className="absolute inset-0 bg-[#DDE7F5]">
            <div className="absolute left-[8%] top-[18%] h-[3px] w-[88%] rotate-[14deg] rounded-full bg-white" />
            <div className="absolute left-[5%] top-[55%] h-[3px] w-[92%] rotate-[-10deg] rounded-full bg-white" />
            <div className="absolute left-[18%] top-[2%] h-[96%] w-[3px] rotate-[8deg] rounded-full bg-white" />
            <div className="absolute left-[48%] top-[-8%] h-[116%] w-[3px] rotate-[-8deg] rounded-full bg-white" />
            <div className="absolute left-[75%] top-[0%] h-[100%] w-[3px] rotate-[11deg] rounded-full bg-white" />

            <div className="absolute left-[11%] top-[22%] h-[90px] w-[145px] rounded-[16px] bg-[#C7D6EB]" />
            <div className="absolute right-[9%] top-[18%] h-[105px] w-[155px] rounded-[16px] bg-[#C7D6EB]" />
            <div className="absolute bottom-[12%] left-[20%] h-[115px] w-[170px] rounded-[16px] bg-[#C7D6EB]" />
            <div className="absolute bottom-[18%] right-[17%] h-[95px] w-[140px] rounded-[16px] bg-[#C7D6EB]" />
          </div>

          <div className="absolute left-[46%] top-[42%] flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#174A9B] text-[24px] text-white shadow-[0_18px_35px_rgba(23,74,155,0.35)]">
            <FaMapMarkerAlt />
          </div>

          <div className="absolute left-[52%] top-[30%] flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#E5273D] text-[15px] text-white">
            <FaMapMarkerAlt />
          </div>

          <div className="absolute left-[25%] top-[58%] flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#2DBE42] text-[15px] text-white">
            <FaMapMarkerAlt />
          </div>

          <div className="absolute bottom-[18px] left-[18px] rounded-[12px] bg-white px-[16px] py-[12px] shadow-[0_15px_35px_rgba(0,0,0,0.12)]">
            <p className="text-[13px] font-[700] text-[#174A9B]">
              Paris Driving Center
            </p>
            <p className="mt-[5px] text-[12px] font-[500] text-[#666666]">
              Selected center · 1.2 km away
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmptyTab({ title }) {
  return (
    <section className="mt-[28px] rounded-[10px] bg-[#E8EEF8] px-[24px] py-[60px] text-center">
      <h2 className="text-[22px] font-[700] text-[#174A9B]">{title}</h2>
      <p className="mt-[12px] text-[14px] font-[500] text-[#666666]">
        Ei tab er design/content pore add korben.
      </p>
    </section>
  );
}

export default function Page() {
  const [activeTab, setActiveTab] = useState("Code");

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          background: #ffffff;
          font-family: "Poppins", sans-serif;
          overflow-x: hidden;
        }
      `}</style>

      <main className="min-h-screen bg-white">
        <div className="mx-auto w-full max-w-[1132px] px-[24px] pb-[28px] pt-[24px]">
          <Header />

          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "Code" && <CodeTab />}
          {activeTab === "To Drive" && <ToDriveTab />}
          {activeTab === "CPF" && <CpfTab />}
          {activeTab === "Accompanied" && <AccompanieTab />}
          {activeTab === "Map" && <MapTab />}

          {/* {activeTab === "Accompanied" && (
            <EmptyTab title="Accompanied Offers" />
          )} */}

          {activeTab === "Map" && <EmptyTab title="Map Offers" />}
        </div>
      </main>
    </>
  );
}
