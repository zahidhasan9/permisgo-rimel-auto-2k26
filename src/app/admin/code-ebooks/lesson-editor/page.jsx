"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createEbookLesson, getAdminEbookLesson, getEbookTopics, updateEbookLesson } from "@/features/API";

const blank = { title: "", subtitle: "", order: 0, status: "draft" };

function Editor() {
  const query = useSearchParams();
  const router = useRouter();
  const lessonId = query.get("lessonId");
  const [courseId, setCourseId] = useState(query.get("courseId") || "");
  const [topicId, setTopicId] = useState(query.get("topicId") || "");
  const [course, setCourse] = useState(null);
  const [topic, setTopic] = useState(null);
  const [form, setForm] = useState(blank);
  const [cover, setCover] = useState(null);
  const [existingCover, setExistingCover] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [videos, setVideos] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [existingMaterials, setExistingMaterials] = useState([]);
  const [step, setStep] = useState(1);
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!lessonId) return;
    getAdminEbookLesson(lessonId).then(({ data }) => {
      const lesson = data?.data;
      setCourseId(lesson.course?._id || lesson.course);
      setTopicId(lesson.topic?._id || lesson.topic);
      setCourse(lesson.course); setTopic(lesson.topic);
      setForm({ title: lesson.title || "", subtitle: lesson.subtitle || "", order: lesson.order || 0, status: lesson.status || "draft" });
      setExistingCover(lesson.coverImage || "");
      setBlocks(lesson.contentBlocks || []);
      setVideos(lesson.videos || []);
      setExistingMaterials(lesson.materials || []);
    }).catch((error) => setNotice(error.response?.data?.message || "Lesson could not be loaded."));
  }, [lessonId]);

  useEffect(() => {
    if (!courseId) return;
    let active = true;
    getEbookTopics(courseId).then(({ data }) => {
      if (!active) return;
      setCourse(data?.data?.course);
      setTopic((data?.data?.topics || []).find((item) => item._id === topicId));
    }).catch(() => {});
    return () => { active = false; };
  }, [courseId, topicId]);

  const validate = () => {
    if (!courseId || !topicId) return "Open this editor from a Course Topic.";
    if (!form.title.trim()) return "Lesson title is required.";
    if (!lessonId && !cover) return "Cover image is required.";
    return "";
  };
  const next = (target) => { const error = target > 1 ? validate() : ""; if (error) { setNotice(error); setStep(1); } else { setNotice(""); setStep(target); } };

  const submit = async (event) => {
    event.preventDefault();
    const error = validate();
    if (error) { setNotice(error); setStep(1); return; }
    const data = new FormData();
    data.append("courseId", courseId); data.append("topicId", topicId);
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (cover) data.append("coverImage", cover);
    const blockMeta = blocks.map((block) => { const item = { ...block }; delete item.file; if (block.file) { item.fileIndex = data.getAll("blockImages").length; data.append("blockImages", block.file); } return item; });
    data.append("contentBlocks", JSON.stringify(blockMeta));
    data.append("videos", JSON.stringify(videos));
    data.append("existingMaterials", JSON.stringify(existingMaterials));
    materials.forEach((material) => { if (material.file) data.append("materials", material.file); });
    data.append("materialMeta", JSON.stringify(materials.filter((item) => item.file).map(({ title, readMinutes }) => ({ title, readMinutes }))));
    setSaving(true);
    try {
      lessonId ? await updateEbookLesson(lessonId, data) : await createEbookLesson(data);
      router.replace(`/admin/code-ebooks/${courseId}/${topicId}`);
    } catch (requestError) { setNotice(requestError.response?.data?.message || "Lesson could not be saved."); }
    finally { setSaving(false); }
  };

  const addBlock = () => setBlocks((list) => [...list, { title: "", image: "", description: "", bulletPoints: [], footerText: "", file: null }]);
  return <main className="min-h-screen bg-[#f6f8fc] p-4 sm:p-6"><div className="mx-auto max-w-5xl">
    <nav className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500"><Link href="/admin/code-ebooks">Courses</Link><span>/</span>{courseId && <Link href={`/admin/code-ebooks/${courseId}`}>{course?.title || "Course"}</Link>}<span>/</span><span className="text-[#173f87]">{lessonId ? "Edit Lesson" : "New Lesson"}</span></nav>
    <div className="mt-5"><h1 className="text-2xl font-bold">{lessonId ? "Edit Lesson" : "Create Lesson"}</h1><p className="mt-1 text-sm text-slate-500">{course?.title || "Course"} · {topic?.title || "Topic"}</p></div>
    <form onSubmit={submit} className="mt-6 rounded-2xl border bg-white p-5 shadow-sm sm:p-6">
      <div className="grid grid-cols-4 gap-2">{["Basic","Content","Media","Publish"].map((label,index) => <button type="button" key={label} onClick={() => next(index + 1)} className={`rounded-lg px-2 py-3 text-xs font-bold ${step === index + 1 ? "bg-[#173f87] text-white" : "bg-slate-100 text-slate-500"}`}>{index + 1}. {label}</button>)}</div>
      {step === 1 && <div className="mt-7 grid gap-4 md:grid-cols-2"><ReadOnly label="Course" value={course?.title}/><ReadOnly label="Topic" value={topic?.title}/><Field label="Lesson title *" value={form.title} onChange={(title) => setForm({ ...form, title })}/><Field label="Subtitle" value={form.subtitle} onChange={(subtitle) => setForm({ ...form, subtitle })}/><Field type="number" label="Display order" value={form.order} onChange={(order) => setForm({ ...form, order })}/><label className="text-xs font-bold">Cover image {lessonId ? "" : "*"}<input type="file" accept="image/*" onChange={(e) => setCover(e.target.files?.[0] || null)} className="mt-2 block w-full rounded-lg border p-2 font-normal"/>{(cover || existingCover) && <span className="mt-2 block font-normal text-emerald-700">{cover ? cover.name : "Current cover retained"}</span>}</label></div>}
      {step === 2 && <div className="mt-7"><div className="flex items-center justify-between"><div><h2 className="font-bold">Content blocks</h2><p className="text-xs text-slate-500">Each block becomes one visual section on the student page.</p></div><button type="button" onClick={addBlock} className="rounded-lg bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700">+ Add Block</button></div><div className="mt-4 space-y-4">{blocks.map((block,index) => <div key={index} className="rounded-xl border bg-slate-50 p-4"><div className="grid gap-3 md:grid-cols-2"><Field label="Block title" value={block.title} onChange={(title) => setBlocks((list) => list.map((item,i) => i === index ? { ...item, title } : item))}/><label className="text-xs font-bold">Image<input type="file" accept="image/*" onChange={(e) => setBlocks((list) => list.map((item,i) => i === index ? { ...item, file: e.target.files?.[0] || null } : item))} className="mt-2 block w-full"/></label></div><Area label="Description" value={block.description} onChange={(description) => setBlocks((list) => list.map((item,i) => i === index ? { ...item, description } : item))}/><Area label="Bullet points (one per line)" value={(block.bulletPoints || []).join("\n")} onChange={(value) => setBlocks((list) => list.map((item,i) => i === index ? { ...item, bulletPoints: value.split("\n").filter(Boolean) } : item))}/><Area label="Footer text" value={block.footerText} onChange={(footerText) => setBlocks((list) => list.map((item,i) => i === index ? { ...item, footerText } : item))}/><button type="button" onClick={() => setBlocks((list) => list.filter((_,i) => i !== index))} className="mt-3 text-xs font-bold text-red-600">Remove block</button></div>)}{!blocks.length && <div className="rounded-xl border border-dashed p-12 text-center text-sm text-slate-500">No blocks yet.</div>}</div></div>}
      {step === 3 && <div className="mt-7 grid gap-5 lg:grid-cols-2"><Collection title="Videos" action={() => setVideos((list) => [...list, { title: "", url: "", durationMinutes: 0 }])}>{videos.map((video,index) => <div key={index} className="space-y-3 rounded-xl bg-slate-50 p-4"><Field label="Title" value={video.title} onChange={(title) => setVideos((list) => list.map((item,i) => i === index ? { ...item, title } : item))}/><Field label="Video URL" value={video.url} onChange={(url) => setVideos((list) => list.map((item,i) => i === index ? { ...item, url } : item))}/><button type="button" onClick={() => setVideos((list) => list.filter((_,i) => i !== index))} className="text-xs font-bold text-red-600">Remove</button></div>)}</Collection><Collection title="Materials" action={() => setMaterials((list) => [...list, { title: "", readMinutes: 0, file: null }])}>{existingMaterials.map((item,index) => <div key={index} className="flex justify-between rounded-lg bg-slate-50 p-3 text-xs"><span>{item.title}</span><button type="button" onClick={() => setExistingMaterials((list) => list.filter((_,i) => i !== index))} className="font-bold text-red-600">Remove</button></div>)}{materials.map((item,index) => <div key={`new-${index}`} className="space-y-3 rounded-xl bg-slate-50 p-4"><Field label="Title" value={item.title} onChange={(title) => setMaterials((list) => list.map((entry,i) => i === index ? { ...entry, title } : entry))}/><input type="file" onChange={(e) => setMaterials((list) => list.map((entry,i) => i === index ? { ...entry, file: e.target.files?.[0] || null } : entry))}/></div>)}</Collection></div>}
      {step === 4 && <div className="mx-auto mt-7 max-w-lg rounded-xl bg-slate-50 p-5"><h2 className="font-bold">Review</h2><div className="mt-4 space-y-2 text-sm text-slate-600"><p><b>Lesson:</b> {form.title}</p><p><b>Content:</b> {blocks.length} blocks</p><p><b>Media:</b> {videos.length} videos, {existingMaterials.length + materials.length} files</p></div><label className="mt-5 block text-xs font-bold">Status<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="mt-2 w-full rounded-lg border px-3 py-2.5 font-normal"><option value="draft">Draft</option><option value="active">Published</option><option value="inactive">Inactive</option></select></label><button disabled={saving} className="mt-4 w-full rounded-lg bg-[#173f87] px-5 py-3 text-sm font-bold text-white disabled:opacity-50">{saving ? "Saving..." : lessonId ? "Update Lesson" : "Create Lesson"}</button></div>}
      {notice && <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{notice}</p>}
      <div className="mt-7 flex justify-between border-t pt-4"><button type="button" disabled={step === 1} onClick={() => next(step - 1)} className="rounded-lg border px-4 py-2 text-sm font-bold disabled:opacity-30">Previous</button>{step < 4 && <button type="button" onClick={() => next(step + 1)} className="rounded-lg bg-[#173f87] px-5 py-2 text-sm font-bold text-white">Next</button>}</div>
    </form>
  </div></main>;
}

export default function LessonEditorPage() { return <Suspense fallback={<div className="p-10">Loading editor...</div>}><Editor/></Suspense>; }
function Field({ label, value, onChange, type = "text" }) { return <label className="text-xs font-bold">{label}<input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-lg border px-3 py-2.5 font-normal"/></label>; }
function ReadOnly({ label, value }) { return <label className="text-xs font-bold">{label}<div className="mt-2 rounded-lg border bg-slate-50 px-3 py-2.5 font-normal text-slate-600">{value || "Loading..."}</div></label>; }
function Area({ label, value, onChange }) { return <label className="mt-3 block text-xs font-bold">{label}<textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={3} className="mt-2 w-full rounded-lg border p-3 font-normal"/></label>; }
function Collection({ title, action, children }) { return <section className="rounded-xl border p-4"><div className="flex justify-between"><h2 className="font-bold">{title}</h2><button type="button" onClick={action} className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">+ Add</button></div><div className="mt-4 space-y-3">{children}</div></section>; }
