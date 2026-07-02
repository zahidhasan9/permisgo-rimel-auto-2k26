"use client";

import Image from "next/image";
import {
  FaArrowLeft,
  FaClock,
  FaPlay,
  FaCheckCircle,
  FaFilm,
  FaChevronRight,
} from "react-icons/fa";

/* ============================================================
   DESIGN TOKENS — shared "Route" system (matches the rest of the app)
   ============================================================ */

const tokens = {
  paper: "#F3F4EF",
  ink: "#14171C",
  inkSoft: "#5B6167",
  line: "#E2E5DE",
  card: "#FFFFFF",
  blue: "#1E3A8A",
  blueSoft: "#E9EEFC",
  red: "#D6483F",
  redSoft: "#FBE8E6",
  yellow: "#B9860A",
  yellowSoft: "#FDF1D6",
  green: "#146C43",
  greenSoft: "#E4F3EA",
};

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');
`;

const sections = [
  {
    title: "C1 — Mastering",
    subtitle: "Vehicle control basics",
    accent: tokens.blue,
    soft: tokens.blueSoft,
  },
  {
    title: "C2 — To Apprehend",
    subtitle: "Reading the road ahead",
    accent: tokens.red,
    soft: tokens.redSoft,
  },
  {
    title: "C3 — Mastering",
    subtitle: "Highway & intersections",
    accent: tokens.yellow,
    soft: tokens.yellowSoft,
  },
  {
    title: "C4 — Mastering",
    subtitle: "Signals & final review",
    accent: tokens.green,
    soft: tokens.greenSoft,
  },
];
const img =
  "https://static.vecteezy.com/system/resources/thumbnails/071/058/257/small/nature-background-nature-wallpaper-empty-asphalt-road-stretching-through-rolling-hills-under-a-cloudy-sky-with-golden-light-photo.jpg";
const videos = [
  {
    title: "Online code review",
    time: "3 min",
    thumb: img,
    progress: 100,
  },
  {
    title: "Reading intersections",
    time: "5 min",
    thumb: img,
    progress: 60,
  },
  {
    title: "Safe following distance",
    time: "4 min",
    thumb: img,
    progress: 0,
  },
  {
    title: "Highway merging basics",
    time: "6 min",
    thumb: img,
    progress: 30,
  },
];

/* ---------------- SMALL UI COMPONENTS ---------------- */

const Eyebrow = ({ children, color }) => (
  <span
    style={{
      fontFamily: "'JetBrains Mono', monospace",
      letterSpacing: "0.12em",
      color: color || tokens.inkSoft,
    }}
    className="text-[10px] font-medium uppercase"
  >
    {children}
  </span>
);

const StatTile = ({ value, label, accent }) => (
  <div
    className="rounded-2xl px-4 py-3 flex-1 min-w-[120px]"
    style={{ background: tokens.card, border: `1px solid ${tokens.line}` }}
  >
    <div
      style={{ fontFamily: "'JetBrains Mono', monospace", color: accent }}
      className="text-lg font-semibold leading-none"
    >
      {value}
    </div>
    <div className="text-[11px] mt-1" style={{ color: tokens.inkSoft }}>
      {label}
    </div>
  </div>
);

const VideoCard = ({ v, accent, soft }) => {
  const isDone = v.progress === 100;

  return (
    <div
      className="group bg-white rounded-2xl p-2.5 flex items-center gap-3.5 border transition duration-200 hover:-translate-y-0.5"
      style={{
        borderColor: tokens.line,
        boxShadow: "0 1px 2px rgba(20,23,28,0.04)",
      }}
    >
      {/* THUMBNAIL */}
      <div
        className="relative w-28 h-20 rounded-xl overflow-hidden flex-shrink-0"
        style={{ background: soft }}
      >
        <Image
          src={v.thumb}
          alt={v.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-110"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,23,28,0.05) 0%, rgba(20,23,28,0.45) 100%)",
          }}
        />

        {/* PLAY BUTTON */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition group-hover:scale-110"
            style={{ background: "rgba(255,255,255,0.9)", color: accent }}
          >
            <FaPlay size={10} className="ml-0.5" />
          </span>
        </div>

        {/* DURATION BADGE */}
        <span
          className="absolute bottom-1.5 right-1.5 text-[9px] font-semibold text-white px-1.5 py-0.5 rounded"
          style={{ background: "rgba(20,23,28,0.65)" }}
        >
          {v.time}
        </span>

        {/* DONE BADGE */}
        {isDone && (
          <span
            className="absolute top-1.5 left-1.5 flex h-5 w-5 items-center justify-center rounded-full"
            style={{ background: tokens.green, color: "#fff" }}
          >
            <FaCheckCircle size={10} />
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex-1 min-w-0">
        <h3
          style={{ fontFamily: "'Inter', sans-serif", color: tokens.ink }}
          className="text-sm font-semibold truncate transition group-hover:opacity-80"
        >
          {v.title}
        </h3>

        <div
          className="flex items-center gap-1.5 text-[11px] mt-1"
          style={{ color: tokens.inkSoft }}
        >
          <FaClock size={9} />
          {v.time}
        </div>

        {/* progress */}
        <div className="mt-2 flex items-center gap-2">
          <div
            className="h-1 flex-1 rounded-full overflow-hidden"
            style={{ background: tokens.paper }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${v.progress}%`,
                background: isDone ? tokens.green : accent,
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: tokens.inkSoft,
            }}
            className="text-[9px]"
          >
            {v.progress}%
          </span>
        </div>
      </div>

      <FaChevronRight
        size={12}
        className="shrink-0 transition group-hover:translate-x-0.5"
        style={{ color: tokens.inkSoft }}
      />
    </div>
  );
};

/* ---------------- MAIN PAGE ---------------- */

export default function Page() {
  const totalVideos = sections.length * videos.length;
  const watched =
    sections.length * videos.filter((v) => v.progress === 100).length;
  const totalMinutes =
    sections.length * videos.reduce((s, v) => s + parseInt(v.time), 0);

  return (
    <div
      style={{ background: tokens.paper, fontFamily: "'Inter', sans-serif" }}
      className="min-h-screen p-5 sm:p-8"
    >
      <style>{FONT_IMPORT}</style>

      <div className="mx-auto max-w-5xl">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <div>
            <Eyebrow>E-learning</Eyebrow>
            <h1
              style={{ fontFamily: "'Oswald', sans-serif", color: tokens.blue }}
              className="text-xl sm:text-2xl font-semibold tracking-tight -mt-0.5"
            >
              My E-learning Videos
            </h1>
            <p className="text-xs mt-1" style={{ color: tokens.inkSoft }}>
              Structured learning modules for better progress
            </p>
          </div>
        </div>

        {/* STATS STRIP */}
        <div className="flex flex-wrap gap-3 mb-8">
          <StatTile
            value={totalVideos}
            label="Total videos"
            accent={tokens.blue}
          />
          <StatTile value={watched} label="Watched" accent={tokens.green} />
          <StatTile
            value={`${totalMinutes}m`}
            label="Total length"
            accent={tokens.yellow}
          />
          <StatTile
            value={sections.length}
            label="Modules"
            accent={tokens.red}
          />
        </div>

        {/* SECTIONS */}
        <div className="space-y-6">
          {sections.map((sec, i) => {
            const secWatched = videos.filter((v) => v.progress === 100).length;
            return (
              <div
                key={i}
                className="rounded-3xl border p-5 sm:p-6"
                style={{
                  background: tokens.card,
                  borderColor: tokens.line,
                  boxShadow: "0 1px 3px rgba(20,23,28,0.04)",
                }}
              >
                {/* SECTION HEADER */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0"
                      style={{ background: sec.soft, color: sec.accent }}
                    >
                      <FaFilm size={15} />
                    </span>
                    <div>
                      <h2
                        style={{
                          fontFamily: "'Oswald', sans-serif",
                          color: tokens.ink,
                        }}
                        className="text-sm sm:text-base font-semibold tracking-wide"
                      >
                        {sec.title}
                      </h2>
                      <p
                        className="text-[11px]"
                        style={{ color: tokens.inkSoft }}
                      >
                        {sec.subtitle}
                      </p>
                    </div>
                  </div>

                  <span
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap"
                    style={{ background: sec.soft, color: sec.accent }}
                  >
                    {secWatched}/{videos.length} done
                  </span>
                </div>

                {/* VIDEO GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {videos.map((v, j) => (
                    <VideoCard
                      key={j}
                      v={v}
                      accent={sec.accent}
                      soft={sec.soft}
                    />
                  ))}
                </div>

                {/* FOOTER BUTTON */}
                <div className="mt-5 flex justify-end">
                  <button
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
                    style={{ background: sec.accent }}
                  >
                    View all
                    <FaChevronRight size={11} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
