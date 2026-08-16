"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  getMyQuizAttempts,
  getMyQuizMistakes,
  getMyTopicResults,
} from "@/features/API";

const practiceCards = [
  [
    "Simple series",
    "/image/simpleseries.png",
    "/student/code/simple-series-list",
  ],
  ["Exam Mock Séries", "/image/exam-mock.png", "/student/code-learning"],
  [
    "Thématiques Séries",
    "/image/thematiques.png",
    "/student/code/thematiques-series",
  ],
  ["Crash Test", "/image/crash-test.png", "/student/code/crash-test"],
  ["My mistakes", "/image/mistakes.png", "/student/code/my-mistakes"],
  ["My History", "/image/history.png", "/student/code/my-history"],
];

const revisionCards = [
  ["Road Signs", "/image/road-signs.png", "/student/code/road-signs"],
  ["Code eBook", "/image/code-ebook.png", "/student/code/code-ebook"],
  [
    "Knowledge Sheets",
    "/image/knowledge-sheets.png",
    "/student/code/knowledge-sheets",
  ],
  [
    "Our Live Coding Replays",
    "/image/live-replays.png",
    "/student/code/live-replays",
  ],
];

const examCards = [
  ["Learn", "/image/learn.png", "/student/code-learning"],
  [
    "Evaluations",
    "/image/evaluations.png",
    "/student/code-learning?tab=evaluations",
  ],
  [
    "Réserve Exam API",
    "/image/reserve-exam.png",
    "https://app.klaxo.fr/mon-compte/connecter",
  ],
  ["FAQ", "/image/faq.png", "/student/code/faq"],
];

const quizTypeLabel = {
  simple_series: "Simple Series",
  mock_test: "Mock Exam",
  thematic_series: "Thematic Series",
  crash_test: "Crash Test",
};

const formatAttemptDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

const leftTopics = [
  ["L", "40%", "54%", "#67B4E3"],
  ["C", "40%", "54%", "#E60087"],
  ["R", "30%", "31%", "#B5A9D7"],
  ["U", "47%", "59%", "#D64D2F"],
  ["D", "36%", "46%", "#FFC017"],
];
const rightTopics = [
  ["HAS", "40%", "37%", "#EF2F2B"],
  ["P", "47%", "64%", "#555553"],
  ["M", "21%", "39%", "#FC9700"],
  ["S", "31%", "45%", "#3D962D"],
  ["E", "37%", "47%", "#90AA16"],
];
const leftTopicList = [
  ["L", "#67B4E3", "Legal provisions regarding road traffic"],
  ["C", "#E60087", "The Driver"],
  ["R", "#B5A9D7", "The Road"],
  ["U", "#D64D2F", "Other road users"],
  ["D", "#FFC017", "General regulations and miscellaneous"],
];
const rightTopicList = [
  ["HAS", "#EF2F2B", "First aid"],
  ["P", "#555553", "Precautions to take when leaving the vehicle"],
  ["M", "#FC9700", "Mechanical components and other safety-related equipment"],
  ["S", "#3D962D", "Vehicle safety equipment"],
  ["E", "#90AA16", "Rules for using the vehicle in relation to ecology"],
];

function Chevron({ back = false }) {
  return (
    <svg
      width={back ? 13 : 10}
      height={back ? 22 : 18}
      viewBox={back ? "0 0 13 22" : "0 0 10 18"}
      fill="none"
    >
      <path
        d={back ? "M10.5 2L2.5 11L10.5 20" : "M1.5 2L8 9L1.5 16"}
        stroke={back ? "#1F2937" : "#0D4598"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuCard({ item }) {
  const [title, icon, link, count] = item;
  const external = /^https?:\/\//i.test(link);
  return (
    <Link
      href={link}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex min-h-[112px] w-full min-w-0 flex-col items-center justify-center gap-2 rounded-[10px] border-[1.5px] border-[#0D55A7] bg-[#E8EEF7] px-2 py-3 text-center transition hover:bg-[#dfe8f5] sm:h-[94px] sm:min-h-0 sm:flex-row sm:justify-between sm:px-5 sm:py-0 sm:text-left lg:px-[28px]"
    >
      <span className="flex min-w-0 flex-col items-center gap-2 sm:flex-row sm:gap-[18px]">
        <img
          src={icon}
          alt=""
          className="h-9 w-9 shrink-0 object-contain sm:h-[45px] sm:w-[45px]"
        />
        <span className="break-words text-[13px] font-semibold leading-4 text-[#272A31] sm:text-[16px] sm:leading-5">
          {title}
          {count && <b className="ml-1 text-[#E71936]">({count})</b>}
        </span>
      </span>
      <span className="hidden sm:block">
        <Chevron />
      </span>
    </Link>
  );
}

function MenuGrid({ items }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <MenuCard key={item[0]} item={item} />
      ))}
    </div>
  );
}

function TopicBar({ item }) {
  const [code, value, width, color] = item;
  return (
    <div className="relative h-[48px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div
        className="absolute inset-y-0 left-0 rounded-r-lg opacity-90 transition-[width] duration-500"
        style={{ width, backgroundColor: color }}
      />
      <div className="absolute inset-0 flex items-center justify-between px-3">
        <span
          className="rounded-md bg-white/95 px-2.5 py-1 text-[15px] font-extrabold shadow-sm"
          style={{ color }}
        >
          {code}
        </span>
        <span className="min-w-[58px] rounded-md bg-white/95 px-2.5 py-1 text-center text-[15px] font-extrabold text-[#173f87] shadow-sm">
          {value}
        </span>
      </div>
    </div>
  );
}

function TopicText({ item }) {
  return (
    <p className="flex items-start gap-2 text-[12px] font-medium leading-5 text-[#4b5563] sm:text-[13px] sm:leading-6">
      <b
        className="min-w-[34px] shrink-0 text-[15px] sm:min-w-[38px] sm:text-[17px]"
        style={{ color: item[1] }}
      >
        {item[0]} :
      </b>
      <span>{item[2]}</span>
    </p>
  );
}

export default function CodePracticePage() {
  const router = useRouter();
  const [latestSeries, setLatestSeries] = useState([]);
  const [latestLoading, setLatestLoading] = useState(true);
  const [topicResults, setTopicResults] = useState({});
  const [mistakeCount, setMistakeCount] = useState(0);

  useEffect(() => {
    let active = true;
    getMyQuizAttempts()
      .then((response) => {
        if (!active) return;
        const attempts = response.data?.data || [];
        setLatestSeries(attempts.slice(0, 5));
      })
      .catch(() => {
        if (active) {
          setLatestSeries([]);
        }
      })
      .finally(() => {
        if (active) setLatestLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    getMyQuizMistakes()
      .then((response) => {
        if (active) setMistakeCount(Number(response.data?.data?.count || 0));
      })
      .catch(() => {
        if (active) setMistakeCount(0);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    getMyTopicResults()
      .then((response) => {
        if (!active) return;
        const map = {};
        (response.data?.data || []).forEach((item) => {
          map[item.code] = item;
        });
        setTopicResults(map);
      })
      .catch(() => {
        if (active) setTopicResults({});
      });
    return () => {
      active = false;
    };
  }, []);

  const liveTopic = (item) => {
    const percentage = Number(topicResults[item[0]]?.percentage || 0);
    return [item[0], `${percentage}%`, `${percentage}%`, item[3]];
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-3 py-4 sm:px-6 sm:py-[31px]">
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="mb-5 flex items-center gap-3 sm:mb-[34px] sm:gap-[18px]">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#EEF2F8] sm:h-[48px] sm:w-[48px] sm:rounded-[12px]"
          >
            <Chevron back />
          </button>
          <h1 className="text-[21px] font-bold text-[#0D4598] sm:text-[25px]">
            Code Practice
          </h1>
        </header>

        <MenuGrid
          items={practiceCards.map((item) =>
            item[0] === "My mistakes" ? [...item, String(mistakeCount)] : item,
          )}
        />
        <h2 className="mb-4 mt-7 text-[19px] font-bold text-[#0D4598] sm:mb-[22px] sm:mt-[34px] sm:text-[22px]">
          Code Revisions
        </h2>
        <MenuGrid items={revisionCards} />
        <h2 className="mb-4 mt-7 text-[19px] font-bold text-[#0D4598] sm:mb-[22px] sm:mt-[34px] sm:text-[22px]">
          Exam
        </h2>
        <MenuGrid items={examCards} />

        <section className="mt-7 rounded-[10px] bg-[#E8EEF7] px-3 pb-4 pt-4 sm:mt-[32px] sm:px-[22px] sm:pb-[24px] sm:pt-[22px]">
          <h2 className="text-[19px] font-bold text-[#0D4598] sm:text-[22px]">
            My Latest Series
          </h2>
          <div className="mt-4 overflow-hidden rounded-[8px] bg-white px-3 sm:mt-5 sm:px-6">
            {latestLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[62px] animate-pulse border-b border-[#E3E7EE] bg-slate-50 last:border-0"
                />
              ))
            ) : latestSeries.length ? (
              latestSeries.map((attempt) => {
                const quiz = attempt.quiz || {};
                const completed = attempt.status === "completed";
                const href = completed
                  ? `/student/code/results?attemptId=${attempt._id}`
                  : `/student/code/code-challenge?quizId=${quiz._id || quiz}`;
                return (
                  <div
                    key={attempt._id}
                    className="grid min-h-[62px] grid-cols-[1fr_auto] items-center gap-x-2 gap-y-2 border-b border-[#E3E7EE] py-3 last:border-0 md:grid-cols-[190px_1fr_170px_140px] md:gap-3"
                  >
                    <span className="inline-flex h-[28px] w-fit items-center justify-center rounded-[4px] bg-[#BFCBE2] px-2 text-[10px] font-bold text-[#0D4598] sm:text-[12px] md:h-[31px] md:w-[120px] md:px-0">
                      {formatAttemptDate(attempt.createdAt)}
                    </span>
                    <p className="text-right text-[11px] font-semibold text-[#24262B] md:text-left md:text-[12px]">
                      {quizTypeLabel[quiz.type] || quiz.title || "Quiz Series"}
                    </p>
                    <p className="text-[11px] font-medium text-[#878B94] md:text-[12px]">
                      Last Score:{" "}
                      {completed
                        ? `${attempt.score || 0}/${attempt.totalQuestions || 0}`
                        : `-/${attempt.totalQuestions || 0}`}
                    </p>
                    <Link
                      href={href}
                      className={`flex h-8 w-[104px] items-center justify-center justify-self-end rounded-[7px] text-[10px] font-bold text-white md:h-9 md:w-[120px] md:rounded-[8px] md:text-[12px] ${completed ? "bg-[#0C3B78]" : "bg-[#E9223D]"}`}
                    >
                      {completed ? "Goodbye" : "Take The Exam"}
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="flex min-h-[90px] items-center justify-center text-[13px] font-medium text-[#878B94]">
                No quiz attempt yet.
              </div>
            )}
          </div>
        </section>

        <section className="mt-5 rounded-[7px] bg-[#E8EEF7] px-3 pb-4 pt-4 sm:mt-[30px] sm:px-[22px] sm:pb-[22px] sm:pt-[22px]">
          <h2 className="text-[19px] font-bold text-[#0D4598] sm:text-[22px]">
            My result by topic
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-x-5 gap-y-3 sm:mt-5 sm:gap-y-5 lg:grid-cols-2">
            <div className="space-y-3 sm:space-y-5">
              {leftTopics.map((item) => (
                <TopicBar key={item[0]} item={liveTopic(item)} />
              ))}
            </div>
            <div className="space-y-3 sm:space-y-5">
              {rightTopics.map((item) => (
                <TopicBar key={item[0]} item={liveTopic(item)} />
              ))}
            </div>
          </div>
          <div className="mt-4 rounded-[6px] bg-white px-3 py-4 sm:mt-5 sm:px-[18px] sm:py-[20px]">
            <h3 className="mb-4 text-[15px] font-bold text-[#0D4598] sm:mb-[18px]">
              List of topics:
            </h3>
            <div className="grid grid-cols-1 gap-x-[35px] gap-y-3 sm:gap-y-[15px] lg:grid-cols-2">
              <div className="space-y-3 sm:space-y-[15px]">
                {leftTopicList.map((item) => (
                  <TopicText key={item[0]} item={item} />
                ))}
              </div>
              <div className="space-y-3 sm:space-y-[15px]">
                {rightTopicList.map((item) => (
                  <TopicText key={item[0]} item={item} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
