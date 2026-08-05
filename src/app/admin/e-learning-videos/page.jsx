"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createLearningContent,
  getAdminLearningContents,
  permanentlyDeleteLearningContent,
  updateLearningContent,
} from "@/features/API";

const emptyForm = { title: "", videoUrl: "", category: "C1", readMinutes: 3, status: "active", order: 0 };
const sections = ["C1", "C2", "C3", "C4"];

export default function ELearningVideosAdminPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  const load = async () => {
    try {
      const { data } = await getAdminLearningContents({ type: "e-learning-video" });
      setItems(data?.data || []);
    } catch (error) {
      setNotice(error.response?.data?.message || "Could not load videos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);
  const reset = () => { setForm(emptyForm); setEditing(null); };

  const submit = async (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.videoUrl.trim()) return setNotice("Title and YouTube URL are required.");
    const data = new FormData();
    data.append("type", "e-learning-video");
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    setSaving(true);
    setNotice("");
    try {
      if (editing) await updateLearningContent(editing, data);
      else await createLearningContent(data);
      setNotice(editing ? "Video updated successfully." : "Video added successfully.");
      reset();
      await load();
    } catch (error) {
      setNotice(error.response?.data?.message || "Could not save video.");
    } finally { setSaving(false); }
  };

  const edit = (item) => {
    setEditing(item._id);
    setForm({ title: item.title || "", videoUrl: item.videoUrl || "", category: item.category || "C1", readMinutes: item.readMinutes || 0, status: item.status || "active", order: item.order || 0 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    try { await permanentlyDeleteLearningContent(item._id); if (editing === item._id) reset(); await load(); }
    catch (error) { setNotice(error.response?.data?.message || "Could not delete video."); }
  };

  const grouped = useMemo(() => sections.map((section) => ({ section, items: items.filter((item) => item.category === section) })), [items]);

  return <main className="min-h-screen bg-[#f5f7fb] p-4 sm:p-6"><div className="mx-auto max-w-7xl">
    <h1 className="text-2xl font-bold text-[#173f87]">E-learning Videos</h1>
    <p className="mt-1 text-sm text-slate-500">Add YouTube videos shown on the student E-learning page.</p>
    <form onSubmit={submit} className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <Field label="Video title *" className="xl:col-span-2"><input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
        <Field label="YouTube URL *" className="xl:col-span-2"><input type="url" className="input" placeholder="https://youtube.com/watch?v=..." value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} /></Field>
        <Field label="Section"><select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{sections.map((item) => <option key={item}>{item}</option>)}</select></Field>
        <Field label="Duration (minutes)"><input type="number" min="0" className="input" value={form.readMinutes} onChange={(e) => setForm({ ...form, readMinutes: e.target.value })} /></Field>
        <Field label="Display order"><input type="number" className="input" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} /></Field>
        <Field label="Status"><select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="active">Active</option><option value="inactive">Inactive</option><option value="draft">Draft</option></select></Field>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3"><button disabled={saving} className="rounded-lg bg-[#173f87] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50">{saving ? "Saving..." : editing ? "Update Video" : "Add Video"}</button>{editing && <button type="button" onClick={reset} className="rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-bold">Cancel edit</button>}{notice && <span className="text-sm font-semibold text-slate-600">{notice}</span>}</div>
    </form>
    <section className="mt-6 space-y-4">{loading ? <p>Loading...</p> : grouped.map(({ section, items: sectionItems }) => <div key={section} className="rounded-2xl bg-[#e8eef7] p-4"><h2 className="font-bold text-[#173f87]">{section} <span className="text-xs text-slate-500">({sectionItems.length})</span></h2><div className="mt-3 grid gap-3 md:grid-cols-2">{sectionItems.map((item) => <article key={item._id} className="rounded-xl bg-white p-4"><h3 className="font-bold">{item.title}</h3><p className="mt-1 truncate text-xs text-slate-500">{item.videoUrl}</p><p className="mt-2 text-xs font-semibold text-[#173f87]">{item.readMinutes || 0} min · {item.status}</p><div className="mt-3 flex gap-2"><button onClick={() => edit(item)} className="rounded bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">Edit</button><button onClick={() => remove(item)} className="rounded bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">Delete</button></div></article>)}</div>{!sectionItems.length && <p className="mt-3 text-sm text-slate-500">No videos added.</p>}</div>)}</section>
  </div></main>;
}

function Field({ label, className = "", children }) { return <label className={`block ${className}`}><span className="mb-1 block text-xs font-bold text-slate-600">{label}</span>{children}</label>; }
