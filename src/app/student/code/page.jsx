"use client";
import Link from "next/link";

const practiceCards = [
  {
    title: "Simple series",
    icon: "/image/simpleseries.png",
    link: "/student/code/simple-series-list",
  },
  {
    title: "Exam Mock Séries",
    icon: "/image/exam-mock.png",
    link: "/student/code/exam-mock-series",
  },
  {
    title: "Thématiques Séries",
    icon: "/image/thematiques.png",
    link: "/student/code/thematiques-series",
  },
  {
    title: "Crash Test",
    icon: "/image/crash-test.png",
    link: "/student/code/crash-test",
  },
  {
    title: "My mistakes",
    count: "09",
    icon: "/image/mistakes.png",
    link: "/student/code/my-mistakes",
  },
  {
    title: "My History",
    icon: "/image/history.png",
    link: "/student/code/my-history",
  },
];

const revisionCards = [
  {
    title: "Road Signs",
    icon: "/image/road-signs.png",
    link: "/student/code/road-signs",
  },
  {
    title: "Code eBook",
    icon: "/image/code-ebook.png",
    link: "/student/code/code-ebook",
  },
  {
    title: "Knowledge Sheets",
    icon: "/image/knowledge-sheets.png",
    link: "/student/code/knowledge-sheets",
  },
  {
    title: "Our Live Coding Replays",
    icon: "/image/live-replays.png",
    link: "/student/code/live-replays",
  },
];

const examCards = [
  { title: "Learn", icon: "/image/learn.png", link: "/student/code/learn" },
  {
    title: "Evaluations",
    icon: "/image/evaluations.png",
    link: "/student/code/evaluations",
  },
  {
    title: "Réserve Exam API",
    icon: "/image/reserve-exam.png",
    link: "/student/code/reserve-exam",
  },
  { title: "FAQ", icon: "/image/faq.png", link: "/student/code/faq" },
];

const latestSeries = [
  {
    date: "23 March, 2025",
    type: "Simple Series",
    score: "-/50",
    action: "Take The Exam",
    variant: "red",
  },
  {
    date: "23 March, 2025",
    type: "Mock Exam",
    score: "-/50",
    action: "Take The Exam",
    variant: "red",
  },
  {
    date: "23 March, 2025",
    type: "Simple Series",
    score: "-/50",
    action: "Take The Exam",
    variant: "red",
  },
  {
    date: "23 March, 2025",
    type: "Simple Series",
    score: "-/50",
    action: "Take The Exam",
    variant: "red",
  },
  {
    date: "23 March, 2025",
    type: "Mock Exam",
    score: "40/50",
    action: "Goodbye",
    variant: "blue",
  },
];

const leftTopics = [
  { code: "L", value: "40%", width: "54%", color: "#67B4E3" },
  { code: "C", value: "40%", width: "54%", color: "#E60087" },
  { code: "R", value: "30%", width: "31%", color: "#B5A9D7" },
  { code: "U", value: "47%", width: "59%", color: "#D64D2F" },
  { code: "D", value: "36%", width: "46%", color: "#FFC017" },
];

const rightTopics = [
  { code: "HAS", value: "40%", width: "37%", color: "#EF2F2B" },
  { code: "P", value: "47%", width: "64%", color: "#4B4B4B" },
  { code: "M", value: "21%", width: "39%", color: "#FC9700" },
  { code: "S", value: "31%", width: "45%", color: "#3D962D" },
  { code: "E", value: "37%", width: "47%", color: "#90AA16" },
];

const topicListLeft = [
  {
    code: "L",
    color: "#67B4E3",
    text: "Legal provisions regarding road traffic",
  },
  {
    code: "C",
    color: "#E60087",
    text: "The Driver",
  },
  {
    code: "R",
    color: "#B5A9D7",
    text: "The Road",
  },
  {
    code: "U",
    color: "#D64D2F",
    text: "Other road users",
  },
  {
    code: "D",
    color: "#FFC017",
    text: "General regulations and miscellaneous",
  },
];

const topicListRight = [
  {
    code: "HAS",
    color: "#EF2F2B",
    text: "First aid",
  },
  {
    code: "P",
    color: "#4B4B4B",
    text: "Precautions to take when leaving the vehicle",
  },
  {
    code: "M",
    color: "#FC9700",
    text: "Mechanical components and other safety-related equipment",
  },
  {
    code: "S",
    color: "#3D962D",
    text: "Vehicle safety equipment",
  },
  {
    code: "E",
    color: "#90AA16",
    text: "Rules for using the vehicle in relation to ecology",
  },
];

function ArrowRight() {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
      <path
        d="M1.5 2L8 9L1.5 16"
        stroke="#0D4598"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackArrow() {
  return (
    <svg width="13" height="22" viewBox="0 0 13 22" fill="none">
      <path
        d="M10.5 2L2.5 11L10.5 20"
        stroke="#1F2937"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuCard({ title, icon, count, link }) {
  return (
    <Link href={link}>
      <button className="h-[94px] w-full rounded-[10px] border-[1.5px] border-[#0D55A7] bg-[#E8EEF7] px-[28px]">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-[18px]">
            <img
              src={icon}
              alt=""
              className="h-[45px] w-[45px] object-contain"
            />

            <p className="text-left text-[16px] font-semibold text-[#272A31]">
              {title}
              {count ? (
                <span className="ml-1 text-[#E71936]">({count})</span>
              ) : null}
            </p>
          </div>

          <ArrowRight />
        </div>
      </button>
    </Link>
  );
}

function SectionTitle({ title }) {
  return (
    <h2 className="mb-[22px] mt-[34px] text-[22px] font-bold text-[#0D4598]">
      {title}
    </h2>
  );
}

function TopicBar({ code, value, width, color }) {
  return (
    <div className="relative h-[45px] overflow-hidden rounded-[4px] bg-white">
      <div
        className="absolute left-0 top-0 flex h-full min-w-[132px] items-center justify-between rounded-[4px] px-[18px] text-[20px] font-bold text-white"
        style={{
          width,
          backgroundColor: color,
        }}
      >
        <span>{code}</span>
        <span>{value}</span>
      </div>
    </div>
  );
}

function TopicText({ code, color, text }) {
  return (
    <p className="text-[13px] font-medium text-[#7B7F89]">
      <span className="mr-1 text-[18px] font-bold" style={{ color }}>
        {code} :
      </span>
      {text}
    </p>
  );
}

export default function CodePracticePage() {
  return (
    <main className="min-h-screen bg-white px-[24px] py-[31px]">
      <div className="mx-auto max-w-[1030px]">
        <header className="mb-[34px] flex items-center gap-[18px]">
          <button className="flex h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-[#EEF2F8]">
            <BackArrow />
          </button>

          <h1 className="text-[25px] font-bold text-[#0D4598]">
            Code Practice
          </h1>
        </header>

        <section className="grid grid-cols-1 gap-[20px] md:grid-cols-2 xl:grid-cols-3">
          {practiceCards.map((item) => (
            <MenuCard key={item.title} {...item} />
          ))}
        </section>

        <SectionTitle title="Code Revisions" />

        <section className="grid grid-cols-1 gap-[20px] md:grid-cols-2 xl:grid-cols-3">
          {revisionCards.map((item) => (
            <MenuCard key={item.title} {...item} />
          ))}
        </section>

        <SectionTitle title="Exam" />

        <section className="grid grid-cols-1 gap-[20px] md:grid-cols-2 xl:grid-cols-3">
          {examCards.map((item) => (
            <MenuCard key={item.title} {...item} />
          ))}
        </section>

        <section className="mt-[32px] rounded-[10px] bg-[#E8EEF7] px-[22px] pb-[24px] pt-[22px]">
          <h2 className="text-[22px] font-bold text-[#0D4598]">
            My Latest Series
          </h2>

          <div className="mt-[20px] overflow-hidden rounded-[8px] bg-white px-[24px]">
            {latestSeries.map((item, index) => (
              <div
                key={`${item.type}-${index}`}
                className="grid min-h-[62px] grid-cols-1 items-center gap-3 border-b border-[#E3E7EE] py-3 last:border-b-0 md:grid-cols-[190px_1fr_170px_140px]"
              >
                <div>
                  <span className="inline-flex h-[31px] w-[120px] items-center justify-center rounded-[4px] bg-[#BFCBE2] text-[12px] font-bold text-[#0D4598]">
                    {item.date}
                  </span>
                </div>

                <p className="text-[12px] font-semibold text-[#24262B]">
                  {item.type}
                </p>

                <p className="text-[12px] font-medium text-[#878B94]">
                  Last Score: {item.score}
                </p>

                <button
                  className={`h-[36px] w-[120px] justify-self-start rounded-[8px] text-[12px] font-bold text-white md:justify-self-end ${
                    item.variant === "red" ? "bg-[#E9223D]" : "bg-[#0C3B78]"
                  }`}
                >
                  {item.action}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-[18px] rounded-[7px] bg-[#E8EEF7] px-[12px] pb-[14px] pt-[12px]">
          <h2 className="text-[14px] font-bold text-[#0D4598]">
            My result by topic
          </h2>

          <div className="mt-[10px] grid grid-cols-1 gap-x-[12px] gap-y-[8px] lg:grid-cols-2">
            <div className="space-y-[8px]">
              {leftTopics.map((topic) => (
                <TopicBar key={topic.code} {...topic} />
              ))}
            </div>

            <div className="space-y-[8px]">
              {rightTopics.map((topic) => (
                <TopicBar key={topic.code} {...topic} />
              ))}
            </div>
          </div>

          <div className="mt-[10px] rounded-[6px] bg-white px-[12px] py-[12px]">
            <h3 className="mb-[10px] text-[11px] font-bold text-[#0D4598]">
              List of topics:
            </h3>

            <div className="grid grid-cols-1 gap-x-[35px] gap-y-[8px] lg:grid-cols-2">
              <div className="space-y-[8px]">
                {topicListLeft.map((topic) => (
                  <TopicText key={topic.code} {...topic} />
                ))}
              </div>

              <div className="space-y-[8px]">
                {topicListRight.map((topic) => (
                  <TopicText key={topic.code} {...topic} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
