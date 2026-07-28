"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import { getLearningContentById, getStudentEbookLesson, updateStudentEbookLessonProgress } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

export default function LessonPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        let response;
        let isCurrentEbookLesson = true;
        try {
          response = await getStudentEbookLesson(id);
        } catch (requestError) {
          if (requestError.response?.status !== 404) throw requestError;
          isCurrentEbookLesson = false;
          response = await getLearningContentById(id);
        }
        let currentLesson = response.data?.data || null;
        if (isCurrentEbookLesson && currentLesson) {
          const currentPercent = Number(currentLesson.progress?.readPercent || 0);
          if (currentPercent < 100) {
            const progressResponse = await updateStudentEbookLessonProgress(id, {
              readPercent: Math.max(currentPercent, 10),
            });
            currentLesson = { ...currentLesson, progress: progressResponse.data?.data || currentLesson.progress };
          }
        }
        if (active) setLesson(currentLesson);
      } catch (requestError) {
        if (active) setError(requestError.response?.data?.message || "Lesson could not be loaded.");
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#f5f7fb] p-4 sm:p-6"><div className="mx-auto max-w-[1084px] rounded-2xl bg-white p-5 shadow-sm"><div className="h-12 w-2/3 animate-pulse rounded-xl bg-[#e7ecf4]" /><div className="mt-7 h-[620px] animate-pulse rounded-2xl bg-[#e7ecf4]" /></div></div>;

  const blocks = lesson?.contentBlocks?.length ? lesson.contentBlocks : [];
  const coverImage = lesson?.coverImage || lesson?.image || "";
  const progressPercent = Number(lesson?.progress?.readPercent || 0);

  const markCompleted = async () => {
    setCompleting(true);
    setError("");
    try {
      const response = await updateStudentEbookLessonProgress(id, { readPercent: 100, status: "completed" });
      setLesson((current) => ({ ...current, progress: response.data?.data }));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Progress could not be updated.");
    } finally {
      setCompleting(false);
    }
  };

  return <main className="min-h-screen bg-[#f5f7fb] px-3 py-4 sm:px-6 sm:py-7">
    <div className="mx-auto max-w-[1084px] rounded-2xl bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <header className="flex items-center gap-3 border-b border-slate-100 pb-5 sm:gap-4">
        <button aria-label="Go back" onClick={() => router.back()} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef2f8] text-[#173f87] transition hover:bg-[#dfe7f3]"><IoChevronBack size={22} /></button>
        <div className="min-w-0">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Code eBook Lesson</p>
          <h1 className="break-words text-lg font-bold leading-tight text-[#173f87] sm:text-2xl">{lesson?.title || "Lesson"}</h1>
        </div>
      </header>

      {error ? <p className="mt-6 rounded-xl border border-red-100 bg-red-50 p-5 text-sm text-red-700">{error}</p> : lesson && <>
        {(lesson.subtitle || lesson.description) && <div className="mt-6 rounded-xl border border-[#e2e8f2] bg-[#f8fafd] px-4 py-4 sm:px-5">
          <p className="text-sm leading-6 text-[#4d5665]">{lesson.subtitle || lesson.description}</p>
        </div>}

        {blocks.length ? <div className="mt-6 space-y-5">
          {blocks.map((block, index) => <article key={index} className="overflow-hidden rounded-2xl border border-[#dfe6f0] bg-[#eef2f8] p-3 sm:p-5">
            {block.title && <div className="mb-4 flex items-center gap-3 px-1">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#173f87] text-xs font-bold text-white">{index + 1}</span>
              <h2 className="text-sm font-bold leading-5 text-[#1d2939] sm:text-base">{block.title}</h2>
            </div>}
            {block.image && <div className="flex items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white p-2 sm:p-4">
              <img src={mediaUrl(block.image)} alt={block.title || lesson.title} className="max-h-[460px] w-full rounded-lg object-contain" />
            </div>}
            {(block.description || block.bulletPoints?.length) && <div className="mt-3 rounded-xl bg-white px-4 py-4 text-sm leading-6 text-[#4d5665] sm:px-5">
              {block.description && <p className="whitespace-pre-line">{block.description}</p>}
              {!!block.bulletPoints?.length && <ul className={`${block.description ? "mt-3" : ""} space-y-2`}>
                {block.bulletPoints.map((point, pointIndex) => <li key={pointIndex} className="flex gap-2.5"><span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#173f87]" /><span>{point}</span></li>)}
              </ul>}
            </div>}
            {block.footerText && <p className="mt-3 whitespace-pre-line rounded-xl border-l-4 border-[#173f87] bg-[#f8fafd] px-4 py-3 text-sm leading-6 text-[#4d5665]">{block.footerText}</p>}
          </article>)}
        </div> : <article className="mt-6 rounded-2xl border border-[#dfe6f0] bg-[#eef2f8] p-3 sm:p-5">
          {coverImage && <div className="overflow-hidden rounded-xl border border-slate-100 bg-white p-2 sm:p-4"><img src={mediaUrl(coverImage)} alt={lesson.title} className="max-h-[460px] w-full rounded-lg object-contain" /></div>}
          <div className="ebook-content mt-3 rounded-xl bg-white p-4 text-sm leading-7 text-slate-700 sm:p-6" dangerouslySetInnerHTML={{ __html: lesson.content || "<p>No lesson content available.</p>" }} />
        </article>}

        <div className="mt-7 border-t border-slate-100 pt-5">
          {lesson.coverImage !== undefined && <div className="mb-5 rounded-xl bg-[#f4f7fb] p-4">
            <div className="flex items-center justify-between gap-4 text-xs font-bold"><span className="text-slate-600">Lesson progress</span><span className={progressPercent >= 100 ? "text-emerald-600" : "text-[#173f87]"}>{progressPercent}%</span></div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white"><div className={`h-full rounded-full ${progressPercent >= 100 ? "bg-emerald-500" : "bg-[#173f87]"}`} style={{ width: `${progressPercent}%` }}/></div>
          </div>}
          <div className="flex flex-wrap gap-3">
            <button onClick={() => router.back()} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"><IoChevronBack size={18} />Back to lessons</button>
            {lesson.coverImage !== undefined && progressPercent < 100 && <button disabled={completing} onClick={markCompleted} className="rounded-xl bg-[#e3263c] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#c91f34] disabled:opacity-50">{completing ? "Saving..." : "Mark as completed"}</button>}
            {lesson.coverImage !== undefined && progressPercent >= 100 && <span className="rounded-xl bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-700">✓ Lesson completed</span>}
          </div>
        </div>
      </>}
      <style jsx global>{`.ebook-content h2{margin:0 0 .75rem;color:#173f87;font-size:1.1rem;font-weight:700;line-height:1.5}.ebook-content h3{margin:1.35rem 0 .55rem;color:#1d2939;font-size:1rem;font-weight:700}.ebook-content p{margin:.7rem 0}.ebook-content ul,.ebook-content ol{margin:.75rem 0;padding-left:1.5rem}.ebook-content li{margin:.3rem 0}.ebook-content img{display:block;max-width:100%;height:auto;margin:1rem auto;border-radius:.75rem}.ebook-content a{color:#173f87;text-decoration:underline}`}</style>
    </div>
  </main>;
}
