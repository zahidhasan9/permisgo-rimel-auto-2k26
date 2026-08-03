"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createEbookCourse, deleteEbookCourse, getEbookCourses, updateEbookCourse } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const blank = { title: "", description: "", order: 0, status: "active" };

export default function EbookCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [cover, setCover] = useState(null);
  const [removeCover, setRemoveCover] = useState(false);
  const load = () => getEbookCourses().then(({ data }) => setCourses(data?.data || [])).catch((error) => setNotice(error.response?.data?.message || "Courses could not be loaded."));
  useEffect(() => { load(); }, []);

  const submit = async (event) => {
    event.preventDefault();
    if (!form.title.trim()) return setNotice("Course title is required.");
    if (!editing && !cover) return setNotice("Course cover image is required.");
    setBusy(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      if (cover) data.append("coverImage", cover);
      if (removeCover) data.append("removeCoverImage", "true");
      editing ? await updateEbookCourse(editing, data) : await createEbookCourse(data);
      setNotice(editing ? "Course updated." : "Course created.");
      setForm(blank); setCover(null); setRemoveCover(false); setEditing(""); setShowForm(false); await load();
    } catch (error) { setNotice(error.response?.data?.message || "Course could not be saved."); }
    finally { setBusy(false); }
  };

  return <main className="min-h-screen bg-[#f6f8fc] p-4 sm:p-6">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-xs font-bold uppercase tracking-widest text-blue-600">Code eBook</p><h1 className="mt-1 text-2xl font-bold text-slate-900">Courses</h1><p className="mt-1 text-sm text-slate-500">Organize your eBook into courses, topics and lessons.</p></div>
        <button onClick={()=>{setEditing("");setForm(blank);setCover(null);setRemoveCover(false);setShowForm(true);}} className="rounded-xl bg-[#173f87] px-5 py-3 text-sm font-bold text-white">+ Add Course</button>
      </div>
      {showForm&&<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4" onMouseDown={(e)=>e.target===e.currentTarget&&setShowForm(false)}><form onSubmit={submit} className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"><div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-bold text-slate-900">{editing?"Edit Course":"Create Course"}</h2><button type="button" onClick={()=>setShowForm(false)} className="text-2xl text-slate-400">×</button></div><div className="space-y-4">
        <Field label="Course title" value={form.title} onChange={(title) => setForm({ ...form, title })} placeholder="Legal provisions regarding road traffic" />
        <Field label="Short description" value={form.description} onChange={(description) => setForm({ ...form, description })} />
        <label className="text-xs font-bold text-slate-600">Course image {editing ? "" : "*"}<input type="file" accept="image/*" onChange={(e) => { setCover(e.target.files?.[0] || null); setRemoveCover(false); }} className="mt-2 block w-full rounded-lg border p-2 font-normal"/>{cover && <span className="mt-2 block font-normal text-emerald-700">{cover.name}</span>}{editing && !cover && <button type="button" onClick={() => setRemoveCover((value) => !value)} className={`mt-2 block text-xs font-bold ${removeCover ? "text-blue-700" : "text-red-600"}`}>{removeCover ? "Undo image removal" : "Remove current image"}</button>}</label>
        <Field label="Order" type="number" value={form.order} onChange={(order) => setForm({ ...form, order })} />
        <label className="text-xs font-bold text-slate-600">Status<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="mt-2 w-full rounded-lg border px-3 py-2.5 font-normal"><option value="active">Active</option><option value="inactive">Inactive</option></select></label>
        <button disabled={busy} className="w-full rounded-lg bg-[#173f87] px-5 py-3 text-sm font-bold text-white disabled:opacity-50">{busy ? "Saving..." : editing ? "Update Course" : "Create Course"}</button></div></form></div>}
      {notice && <p className="mt-3 rounded-lg bg-blue-50 px-4 py-3 text-sm font-semibold text-[#173f87]">{notice}</p>}

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => <article key={course._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="mb-4 flex h-40 items-center justify-center overflow-hidden rounded-xl bg-[#e8eef7]">{course.coverImage ? <img src={mediaUrl(course.coverImage)} alt={course.title} className="h-full w-full object-cover"/> : <img src="/image/code-ebook.png" alt="" className="h-16 w-16 object-contain"/>}</div>
          <div className="flex items-start justify-between gap-3"><div><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${course.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{course.status}</span><h2 className="mt-3 text-lg font-bold text-slate-900">{course.title}</h2></div><span className="rounded-lg bg-[#e8eef7] px-3 py-2 text-xs font-bold text-[#173f87]">#{course.order || 0}</span></div>
          <p className="mt-2 min-h-10 text-sm text-slate-500">{course.description || "No description added."}</p>
          <div className="mt-4 flex gap-5 border-y py-3 text-xs font-semibold text-slate-600"><span><b className="text-slate-900">{course.topicCount || 0}</b> Topics</span><span><b className="text-slate-900">{course.lessonCount || 0}</b> Lessons</span></div>
          <div className="mt-4 flex flex-wrap gap-2"><Link href={`/admin/code-ebooks/${course._id}`} className="rounded-lg bg-[#173f87] px-4 py-2 text-xs font-bold text-white">Open Course</Link><button onClick={() => { setEditing(course._id); setCover(null); setForm({ title: course.title, description: course.description || "", order: course.order || 0, status: course.status });setShowForm(true); }} className="rounded-lg bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700">Edit</button><button onClick={async () => { if (!confirm(`Delete "${course.title}"?`)) return; try { await deleteEbookCourse(course._id); await load(); } catch (error) { setNotice(error.response?.data?.message || "Could not delete course."); } }} className="rounded-lg bg-red-50 px-4 py-2 text-xs font-bold text-red-600">Delete</button></div>
        </article>)}
      </section>
      {!courses.length && <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">Create your first Code eBook course above.</div>}
    </div>
  </main>;
}

function Field({ label, value, onChange, type = "text", placeholder = "" }) { return <label className="text-xs font-bold text-slate-600">{label}<input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-lg border px-3 py-2.5 font-normal outline-none focus:border-blue-500" /></label>; }
