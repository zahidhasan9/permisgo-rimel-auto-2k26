"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import { getLearningContentById, getStudentEbookLesson } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

export default function LessonPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        let response;
        try {
          response = await getStudentEbookLesson(id);
        } catch (requestError) {
          if (requestError.response?.status !== 404) throw requestError;
          response = await getLearningContentById(id);
        }
        if (active) setLesson(response.data?.data || null);
      } catch (requestError) {
        if (active) setError(requestError.response?.data?.message || "Lesson could not be loaded.");
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, [id]);

  if (loading) return <div className="min-h-screen bg-white p-6"><div className="mx-auto h-[700px] max-w-[1084px] animate-pulse rounded-xl bg-[#e1e7f1]" /></div>;

  const blocks = lesson?.contentBlocks?.length ? lesson.contentBlocks : [];
  const coverImage = lesson?.coverImage || lesson?.image || "";

  return <main className="min-h-screen bg-white px-3 py-6 sm:px-6">
    <div className="mx-auto max-w-[1084px]">
      <header className="flex items-center gap-4">
        <button onClick={() => router.back()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8edf5]"><IoChevronBack size={25} /></button>
        <h1 className="break-words text-xl font-semibold text-[#173f87] sm:text-2xl">{lesson?.title || "Lesson"}</h1>
      </header>

      {error ? <p className="mt-8 rounded-xl bg-red-50 p-5 text-red-700">{error}</p> : lesson && <>
        <p className="mt-8 text-[13px] text-[#31343b]">{lesson.subtitle || lesson.description}</p>

        {blocks.length ? <div className="mt-6 space-y-7">
          {blocks.map((block, index) => <article key={index} className="rounded-xl bg-[#dfe6f1] p-4 sm:p-5">
            <h2 className="mb-4 text-[13px] font-medium text-[#22252a]">{block.title}</h2>
            {block.image && <div className="flex min-h-[270px] items-center justify-center overflow-hidden rounded-xl bg-white">
              <img src={mediaUrl(block.image)} alt={block.title || lesson.title} className="max-h-[430px] w-full object-contain" />
            </div>}
            {(block.description || block.bulletPoints?.length) && <div className="mt-4 rounded-xl bg-white px-5 py-4 text-[13px] leading-6 text-[#4d525b]">
              {block.description && <p>{block.description}</p>}
              {!!block.bulletPoints?.length && <ul className="mt-1 list-disc pl-5">
                {block.bulletPoints.map((point, pointIndex) => <li key={pointIndex}>{point}</li>)}
              </ul>}
            </div>}
            {block.footerText && <p className="mt-4 whitespace-pre-line text-[13px] leading-6 text-[#4d525b]">{block.footerText}</p>}
          </article>)}
        </div> : <article className="mt-6 rounded-xl bg-[#dfe6f1] p-4 sm:p-5">
          {coverImage && <img src={mediaUrl(coverImage)} alt={lesson.title} className="max-h-[430px] w-full rounded-xl bg-white object-contain" />}
          <div className="ebook-content mt-4 rounded-xl bg-white p-5 leading-7 text-slate-700" dangerouslySetInnerHTML={{ __html: lesson.content || "<p>No lesson content available.</p>" }} />
        </article>}

        <button onClick={() => router.back()} className="mt-6 rounded-lg bg-[#e3263c] px-6 py-3 text-sm font-bold text-white">Back to lessons</button>
      </>}
      <style jsx global>{`.ebook-content h2{margin:0 0 .65rem;font-size:1rem;font-weight:700}.ebook-content h3{margin:1.2rem 0 .5rem;font-size:.95rem;font-weight:700}.ebook-content p{margin:.65rem 0}.ebook-content ul,.ebook-content ol{margin:.65rem 0;padding-left:1.5rem}.ebook-content img{max-width:100%;height:auto;border-radius:.75rem}`}</style>
    </div>
  </main>;
}
