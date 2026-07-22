"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import { getLearningContents } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

export default function CodeEbookPage() {
  const router = useRouter(); const [lessons,setLessons]=useState([]); const [loading,setLoading]=useState(true); const [error,setError]=useState("");
  useEffect(() => { getLearningContents({type:"code-ebook"}).then(({data})=>setLessons(data?.data||[])).catch((e)=>setError(e.response?.data?.message||"Chapters could not be loaded.")).finally(()=>setLoading(false)); },[]);
  return <main className="min-h-screen bg-white px-3 py-6 sm:px-6"><div className="mx-auto max-w-[1084px]"><header className="flex items-center gap-4"><button onClick={()=>router.back()} className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8edf5]"><IoChevronBack size={25}/></button><h1 className="text-[22px] font-semibold text-[#173f87] sm:text-[25px]">Lesson List</h1></header>
    {loading&&<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{Array.from({length:8}).map((_,i)=><div key={i} className="h-52 animate-pulse rounded-xl bg-[#e8eef7]"/>)}</div>}{error&&<p className="mt-8 rounded-xl bg-red-50 p-5 text-red-700">{error}</p>}
    {!loading&&!error&&<section className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{lessons.map((lesson)=><Link key={lesson._id} href={`/student/code/code-ebook/lesson/${lesson._id}`} className="group flex min-h-[209px] flex-col rounded-xl bg-[#e8eef7] p-4 hover:-translate-y-1 hover:shadow-lg"><img src={mediaUrl(lesson.image)} alt={lesson.title} className="h-[108px] w-full rounded-xl bg-white object-cover"/><div className="flex flex-1 flex-col items-center justify-center pt-4"><h2 className="text-center text-base font-bold leading-6">{lesson.title}</h2>{lesson.category&&<p className="mt-1 text-center text-xs text-slate-500">{lesson.category}</p>}</div></Link>)}</section>}
  </div></main>;
}
