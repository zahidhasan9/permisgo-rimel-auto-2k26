"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getMyQuizAttempts, getMyTopicResults } from "@/features/API";

const practiceCards = [
  ["Simple series", "/image/simpleseries.png", "/student/code/simple-series-list"],
  ["Exam Mock Séries", "/image/exam-mock.png", "/student/code/mock-test"],
  ["Thématiques Séries", "/image/thematiques.png", "/student/code/thematiques-series"],
  ["Crash Test", "/image/crash-test.png", "/student/code/crash-test"],
  ["My mistakes", "/image/mistakes.png", "/student/code/my-mistakes", "09"],
  ["My History", "/image/history.png", "/student/code/my-history"],
];

const revisionCards = [
  ["Road Signs", "/image/road-signs.png", "/student/code/road-signs"],
  ["Code eBook", "/image/code-ebook.png", "/student/code/code-ebook"],
  ["Knowledge Sheets", "/image/knowledge-sheets.png", "/student/code/knowledge-sheets"],
  ["Our Live Coding Replays", "/image/live-replays.png", "/student/code/live-replays"],
];

const examCards = [
  ["Learn", "/image/learn.png", "/student/code-learning"],
  ["Evaluations", "/image/evaluations.png", "/student/code-learning?tab=evaluations"],
  ["Réserve Exam API", "/image/reserve-exam.png", "https://app.klaxo.fr/mon-compte/connecter"],
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
  ["L", "40%", "54%", "#67B4E3"], ["C", "40%", "54%", "#E60087"],
  ["R", "30%", "31%", "#B5A9D7"], ["U", "47%", "59%", "#D64D2F"],
  ["D", "36%", "46%", "#FFC017"],
];
const rightTopics = [
  ["HAS", "40%", "37%", "#EF2F2B"], ["P", "47%", "64%", "#555553"],
  ["M", "21%", "39%", "#FC9700"], ["S", "31%", "45%", "#3D962D"],
  ["E", "37%", "47%", "#90AA16"],
];
const leftTopicList = [
  ["L", "#67B4E3", "Legal provisions regarding road traffic"],
  ["C", "#E60087", "The Driver"], ["R", "#B5A9D7", "The Road"],
  ["U", "#D64D2F", "Other road users"], ["D", "#FFC017", "General regulations and miscellaneous"],
];
const rightTopicList = [
  ["HAS", "#EF2F2B", "First aid"], ["P", "#555553", "Precautions to take when leaving the vehicle"],
  ["M", "#FC9700", "Mechanical components and other safety-related equipment"],
  ["S", "#3D962D", "Vehicle safety equipment"],
  ["E", "#90AA16", "Rules for using the vehicle in relation to ecology"],
];

function Chevron({ back = false }) {
  return <svg width={back ? 13 : 10} height={back ? 22 : 18} viewBox={back ? "0 0 13 22" : "0 0 10 18"} fill="none"><path d={back ? "M10.5 2L2.5 11L10.5 20" : "M1.5 2L8 9L1.5 16"} stroke={back ? "#1F2937" : "#0D4598"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function MenuCard({ item }) {
  const [title, icon, link, count] = item;
  return <Link href={link} className="flex h-[94px] w-full items-center justify-between rounded-[10px] border-[1.5px] border-[#0D55A7] bg-[#E8EEF7] px-[28px] transition hover:bg-[#dfe8f5]">
    <span className="flex min-w-0 items-center gap-[18px]"><img src={icon} alt="" className="h-[45px] w-[45px] shrink-0 object-contain" /><span className="text-[16px] font-semibold text-[#272A31]">{title}{count && <b className="ml-1 text-[#E71936]">({count})</b>}</span></span><Chevron />
  </Link>;
}

function MenuGrid({ items }) {
  return <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{items.map((item) => <MenuCard key={item[0]} item={item} />)}</div>;
}

function TopicBar({ item }) {
  const [code, value, width, color] = item;
  return <div className="relative h-[45px] overflow-hidden rounded-[4px] bg-white"><div className="absolute inset-y-0 left-0 flex items-center justify-between overflow-hidden rounded-[4px] px-[18px] text-[20px] font-bold text-white transition-[width] duration-500" style={{ width, minWidth: width === "0%" ? 0 : 132, backgroundColor: color }}><span>{code}</span><span>{value}</span></div></div>;
}

function TopicText({ item }) {
  return <p className="text-[13px] font-medium text-[#7B7F89]"><b className="mr-1 text-[18px]" style={{ color: item[1] }}>{item[0]} :</b>{item[2]}</p>;
}

export default function CodePracticePage() {
  const router = useRouter();
  const [latestSeries, setLatestSeries] = useState([]);
  const [latestLoading, setLatestLoading] = useState(true);
  const [topicResults, setTopicResults] = useState({});

  useEffect(() => {
    let active = true;
    getMyQuizAttempts()
      .then((response) => {
        if (active) setLatestSeries((response.data?.data || []).slice(0, 5));
      })
      .catch(() => {
        if (active) setLatestSeries([]);
      })
      .finally(() => {
        if (active) setLatestLoading(false);
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    getMyTopicResults()
      .then((response) => {
        if (!active) return;
        const map = {};
        (response.data?.data || []).forEach((item) => { map[item.code] = item; });
        setTopicResults(map);
      })
      .catch(() => { if (active) setTopicResults({}); });
    return () => { active = false; };
  }, []);

  const liveTopic = (item) => {
    const percentage = Number(topicResults[item[0]]?.percentage || 0);
    return [item[0], `${percentage}%`, `${percentage}%`, item[3]];
  };

  return <main className="min-h-screen bg-white px-3 py-[31px] sm:px-6">
    <div className="mx-auto w-full max-w-[1030px]">
      <header className="mb-[34px] flex items-center gap-[18px]"><button type="button" onClick={() => router.back()} className="flex h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-[#EEF2F8]"><Chevron back /></button><h1 className="text-[25px] font-bold text-[#0D4598]">Code Practice</h1></header>

      <MenuGrid items={practiceCards} />
      <h2 className="mb-[22px] mt-[34px] text-[22px] font-bold text-[#0D4598]">Code Revisions</h2>
      <MenuGrid items={revisionCards} />
      <h2 className="mb-[22px] mt-[34px] text-[22px] font-bold text-[#0D4598]">Exam</h2>
      <MenuGrid items={examCards} />

      <section className="mt-[32px] rounded-[10px] bg-[#E8EEF7] px-[22px] pb-[24px] pt-[22px]">
        <h2 className="text-[22px] font-bold text-[#0D4598]">My Latest Series</h2>
        <div className="mt-5 overflow-hidden rounded-[8px] bg-white px-6">
          {latestLoading ? Array.from({ length: 5 }).map((_, index) => <div key={index} className="h-[62px] animate-pulse border-b border-[#E3E7EE] bg-slate-50 last:border-0" />) : latestSeries.length ? latestSeries.map((attempt) => {
            const quiz = attempt.quiz || {};
            const completed = attempt.status === "completed";
            const href = completed ? `/student/code/my-history?latest=${attempt._id}` : `/student/code/code-challenge?quizId=${quiz._id || quiz}`;
            return <div key={attempt._id} className="grid min-h-[62px] grid-cols-1 items-center gap-3 border-b border-[#E3E7EE] py-3 last:border-0 md:grid-cols-[190px_1fr_170px_140px]">
              <span className="inline-flex h-[31px] w-[120px] items-center justify-center rounded-[4px] bg-[#BFCBE2] text-[12px] font-bold text-[#0D4598]">{formatAttemptDate(attempt.createdAt)}</span>
              <p className="text-[12px] font-semibold text-[#24262B]">{quizTypeLabel[quiz.type] || quiz.title || "Quiz Series"}</p>
              <p className="text-[12px] font-medium text-[#878B94]">Last Score: {completed ? `${attempt.score || 0}/${attempt.totalQuestions || 0}` : `-/${attempt.totalQuestions || 0}`}</p>
              <Link href={href} className={`flex h-9 w-[120px] items-center justify-center justify-self-start rounded-[8px] text-[12px] font-bold text-white md:justify-self-end ${completed ? "bg-[#0C3B78]" : "bg-[#E9223D]"}`}>{completed ? "View Result" : "Take The Exam"}</Link>
            </div>;
          }) : <div className="flex min-h-[90px] items-center justify-center text-[13px] font-medium text-[#878B94]">No quiz attempt yet.</div>}
        </div>
      </section>

      <section className="mt-[30px] rounded-[7px] bg-[#E8EEF7] px-[22px] pb-[22px] pt-[22px]">
        <h2 className="text-[22px] font-bold text-[#0D4598]">My result by topic</h2>
        <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-5 lg:grid-cols-2"><div className="space-y-5">{leftTopics.map((item) => <TopicBar key={item[0]} item={liveTopic(item)} />)}</div><div className="space-y-5">{rightTopics.map((item) => <TopicBar key={item[0]} item={liveTopic(item)} />)}</div></div>
        <div className="mt-5 rounded-[6px] bg-white px-[18px] py-[20px]"><h3 className="mb-[18px] text-[15px] font-bold text-[#0D4598]">List of topics:</h3><div className="grid grid-cols-1 gap-x-[35px] gap-y-[15px] lg:grid-cols-2"><div className="space-y-[15px]">{leftTopicList.map((item) => <TopicText key={item[0]} item={item} />)}</div><div className="space-y-[15px]">{rightTopicList.map((item) => <TopicText key={item[0]} item={item} />)}</div></div></div>
      </section>
    </div>
  </main>;
}
