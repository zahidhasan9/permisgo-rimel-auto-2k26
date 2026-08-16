"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaExpandArrowsAlt } from "react-icons/fa";
import {
  IoArrowBack,
  IoArrowForward,
  IoChevronBack,
  IoVolumeHigh,
  IoVolumeMute,
} from "react-icons/io5";

import { getMyQuizMistakes } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const optionLetter = (index) => String.fromCharCode(65 + index);
const youtubeEmbed = (value) => {
  try {
    const url = new URL(value);
    const id = url.hostname.includes("youtu.be")
      ? url.pathname.split("/")[1]
      : url.searchParams.get("v") ||
        url.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1];
    return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0` : "";
  } catch {
    return "";
  }
};

export default function MyMistakesPage() {
  const router = useRouter();
  const panelRef = useRef(null);
  const [mistakes, setMistakes] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await getMyQuizMistakes();
        if (active) setMistakes(response.data?.data?.items || []);
      } catch (requestError) {
        if (active) {
          setError(
            requestError.response?.data?.message ||
              requestError.message ||
              "Mistakes could not be loaded.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
      window.speechSynthesis?.cancel();
    };
  }, []);

  const item = mistakes[index];
  const question = item?.question;
  const selectedIndexes = item
    ? (item.selectedIndexes?.length
        ? item.selectedIndexes
        : [item.selectedIndex]
      ).map(Number)
    : [];
  const correctIndexes = item
    ? (item.correctIndexes?.length
        ? item.correctIndexes
        : [item.correctIndex]
      ).map(Number)
    : [];

  const speak = () => {
    if (!question || !window.speechSynthesis) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const text = [
      question.voiceText || question.questionText,
      ...(question.secondaryQuestionText
        ? [question.secondaryQuestionText]
        : []),
      ...(question.options || []).map((option) => option.text),
    ].join(". ");
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const move = (nextIndex) => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
    setIndex(nextIndex);
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white p-6">
        <div className="mx-auto h-[720px] w-full animate-pulse rounded-xl bg-[#e8eef7]" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-3 py-6 text-[#171717] sm:px-6">
      <div ref={panelRef} className="mx-auto w-full max-w-[1084px]">
        <header className="mb-8 flex h-11 items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8edf5] text-black"
          >
            <IoChevronBack size={25} />
          </button>
          <div>
            <h1 className="text-[25px] font-semibold leading-none text-[#173f87]">
              Code Challenge
            </h1>
            <p className="mt-2 text-xs font-medium text-slate-500">
              My mistakes · Read-only review
            </p>
          </div>
        </header>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {!error && !item && (
          <section className="rounded-xl bg-[#e8eef7] p-12 text-center">
            <h2 className="text-xl font-bold text-[#173f87]">
              No mistakes found
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Wrong answers from completed quizzes will appear here.
            </p>
            <Link
              href="/student/code/simple-series-list"
              className="mt-5 inline-flex rounded-lg bg-[#173f87] px-5 py-2.5 text-xs font-bold text-white"
            >
              Take a Quiz
            </Link>
          </section>
        )}

        {!error && item && (
          <section className="min-h-[720px] rounded-xl bg-[#e8eef7] p-4 sm:p-6">
            <div className="mb-6 flex items-center justify-between text-[#123f88]">
              <div>
                <p className="text-[16px] font-bold">
                  Question {index + 1}/{mistakes.length}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  {item.quizTitle}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    !document.fullscreenElement
                      ? panelRef.current?.requestFullscreen?.()
                      : document.exitFullscreen?.()
                  }
                  title="Fullscreen"
                >
                  <FaExpandArrowsAlt size={22} />
                </button>
                <button type="button" onClick={speak} title="Read question">
                  {speaking ? (
                    <IoVolumeMute size={28} />
                  ) : (
                    <IoVolumeHigh size={28} />
                  )}
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl bg-white">
              {youtubeEmbed(question.questionVideoUrl) ? (
                <iframe
                  src={youtubeEmbed(question.questionVideoUrl)}
                  title="Question video"
                  className="aspect-video w-full"
                  allow="encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : question.questionVideoUrl ? (
                <video
                  src={question.questionVideoUrl}
                  controls
                  className="max-h-[439px] w-full bg-black"
                />
              ) : question.questionImage ? (
                <img
                  src={mediaUrl(question.questionImage)}
                  alt="Question"
                  className="h-[300px] w-full object-cover sm:h-[439px]"
                />
              ) : (
                <div className="flex h-[300px] items-center justify-center text-sm text-slate-500 sm:h-[439px]">
                  No question image available
                </div>
              )}
            </div>

            <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_330px]">
              <div>
                <h2 className="mb-4 text-[16px] font-bold leading-6">
                  {question.questionText}
                </h2>
                {Number(question.promptCount) === 2 && (
                  <h2 className="mb-4 mt-6 border-t border-slate-300 pt-5 text-[16px] font-bold leading-6">
                    2. {question.secondaryQuestionText}
                  </h2>
                )}
                <div className="space-y-3 text-[15px] leading-6 text-[#123f88]">
                  {question.options?.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 ${correctIndexes.includes(optionIndex) ? "border border-green-300 bg-green-50" : selectedIndexes.includes(optionIndex) ? "border border-red-300 bg-red-50" : ""}`}
                    >
                      <p className="min-w-0">– {option.text}</p>
                      <span className="min-w-8 flex-1 border-b border-dashed border-slate-500" />
                      <span className="font-bold text-slate-900">
                        {optionLetter(optionIndex)}
                      </span>
                    </div>
                  ))}
                </div>
                {question.explanationText && (
                  <p className="mt-5 rounded-lg bg-white/80 p-4 text-sm leading-6 text-[#123f88]">
                    <b>Explanation: </b>
                    {question.explanationText}
                  </p>
                )}
              </div>

              <aside className="flex flex-col justify-end">
                <div className="mb-5 rounded-xl bg-white p-4">
                  <p className="text-[11px] font-bold uppercase text-red-600">
                    Your answer
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    {selectedIndexes
                      .map(
                        (value) =>
                          `${optionLetter(value)}. ${question.options?.[value]?.text || ""}`,
                      )
                      .join("; ") || "No answer"}
                  </p>
                  <p className="mt-4 text-[11px] font-bold uppercase text-green-700">
                    Correct answer
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    {correctIndexes
                      .map(
                        (value) =>
                          `${optionLetter(value)}. ${question.options?.[value]?.text || ""}`,
                      )
                      .join("; ") || "Not available"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {question.options?.map((_, optionIndex) => (
                    <span
                      key={optionIndex}
                      className={`flex h-11 min-w-[58px] items-center justify-center rounded-lg border-2 px-4 font-bold ${correctIndexes.includes(optionIndex) ? "border-green-500 bg-green-500 text-white" : selectedIndexes.includes(optionIndex) ? "border-red-500 bg-red-500 text-white" : "border-white bg-white text-slate-700"}`}
                    >
                      {optionLetter(optionIndex)}
                    </span>
                  ))}
                </div>
              </aside>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-slate-300 pt-5">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => move(index - 1)}
                className="flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-[#123f88] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <IoArrowBack /> Previous
              </button>
              <p className="hidden text-xs font-semibold text-slate-500 sm:block">
                Review only — answers cannot be changed
              </p>
              <button
                type="button"
                disabled={index + 1 >= mistakes.length}
                onClick={() => move(index + 1)}
                className="flex h-11 items-center gap-2 rounded-xl bg-[#e3263c] px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next <IoArrowForward />
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
