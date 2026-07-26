"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { createEbookTopic, deleteEbookTopic, getEbookTopics, updateEbookTopic } from "@/features/API";

const blank = { title: "", description: "", order: 0, status: "active" };

export default function CourseTopicsPage({ params }) {
  const { courseId } = use(params);
  const [course, setCourse] = useState(null);
  const [topics, setTopics] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const load = () => getEbookTopics(courseId).then(({ data }) => { setCourse(data?.data?.course); setTopics(data?.data?.topics || []); }).catch((error) => setNotice(error.response?.data?.message || "Topics could not be loaded."));
  useEffect(() => { load(); }, [courseId]);

  const submit = async (event) => {
    event.preventDefault();
    if (!form.title.trim()) return setNotice("Topic title is required.");
    setBusy(true);
    try { editing ? await updateEbookTopic(editing, form) : await createEbookTopic(courseId, form); setForm(blank); setEditing(""); setShowForm(false); setNotice(editing ? "Topic updated." : "Topic created."); await load(); }
    catch (error) { setNotice(error.response?.data?.message || "Topic could not be saved."); }
    finally { setBusy(false); }
  };

  return <main className="min-h-screen bg-[#f6f8fc] p-4 sm:p-6"><div className="mx-auto max-w-6xl">
    <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500"><Link href="/admin/code-ebooks" className="hover:text-blue-700">Courses</Link><span>/</span><span className="text-[#173f87]">{course?.title || "Course"}</span></nav>
    <div className="mt-4 flex items-center justify-between gap-4"><div><h1 className="text-2xl font-bold text-slate-900">{course?.title || "Course Topics"}</h1><p className="mt-1 text-sm text-slate-500">Choose a topic to manage its lessons.</p></div><button onClick={()=>{setEditing("");setForm(blank);setShowForm(true);}} className="rounded-xl bg-[#173f87] px-5 py-3 text-sm font-bold text-white">+ Add Topic</button></div>

    {showForm&&<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4" onMouseDown={(e)=>e.target===e.currentTarget&&setShowForm(false)}><form onSubmit={submit} className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"><div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-bold">{editing?"Edit Topic":"Create Topic"}</h2><button type="button" onClick={()=>setShowForm(false)} className="text-2xl text-slate-400">×</button></div><div className="space-y-4">
      <Field label="Topic title" value={form.title} onChange={(title) => setForm({ ...form, title })} placeholder="Signs and placards" />
      <Field label="Description" value={form.description} onChange={(description) => setForm({ ...form, description })} />
      <Field label="Order" type="number" value={form.order} onChange={(order) => setForm({ ...form, order })} />
      <label className="text-xs font-bold text-slate-600">Status<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="mt-2 w-full rounded-lg border px-3 py-2.5 font-normal"><option value="active">Active</option><option value="inactive">Inactive</option></select></label>
      <button disabled={busy} className="w-full rounded-lg bg-[#173f87] px-5 py-3 text-sm font-bold text-white">{busy ? "Saving..." : editing ? "Update Topic" : "Create Topic"}</button></div></form></div>}
    {notice && <p className="mt-3 rounded-lg bg-blue-50 px-4 py-3 text-sm font-semibold text-[#173f87]">{notice}</p>}

    <section className="mt-6 space-y-3">{topics.map((topic, index) => <article key={topic._id} className="flex flex-col gap-4 rounded-2xl border bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8eef7] text-sm font-black text-[#173f87]">{String(index + 1).padStart(2, "0")}</span><div><h2 className="font-bold text-slate-900">{topic.title}</h2><p className="mt-1 text-xs text-slate-500">{topic.description || "No description"} · {topic.lessonCount || 0} lessons · {topic.status}</p></div></div>
      <div className="flex flex-wrap gap-2"><Link href={`/admin/code-ebooks/${courseId}/${topic._id}`} className="rounded-lg bg-[#173f87] px-4 py-2 text-xs font-bold text-white">Open Topic</Link><button onClick={() => { setEditing(topic._id); setForm({ title: topic.title, description: topic.description || "", order: topic.order || 0, status: topic.status });setShowForm(true); }} className="rounded-lg bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700">Edit</button><button onClick={async () => { if (!confirm(`Delete "${topic.title}"?`)) return; try { await deleteEbookTopic(topic._id); await load(); } catch (error) { setNotice(error.response?.data?.message || "Could not delete topic."); } }} className="rounded-lg bg-red-50 px-4 py-2 text-xs font-bold text-red-600">Delete</button></div>
    </article>)}</section>
    {!topics.length && <div className="mt-6 rounded-2xl border border-dashed bg-white p-12 text-center text-sm text-slate-500">No topics yet. Add the first topic above.</div>}
  </div></main>;
}

function Field({ label, value, onChange, type = "text", placeholder = "" }) { return <label className="text-xs font-bold text-slate-600">{label}<input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-lg border px-3 py-2.5 font-normal outline-none focus:border-blue-500" /></label>; }
