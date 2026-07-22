"use client";

import { useEffect, useState } from "react";
import { createRoadSign, deleteRoadSign, getAdminRoadSigns, updateRoadSign } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const blank = { title: "", description: "", status: "active", sortOrder: 0 };

export default function AdminRoadSignsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(blank);
  const [file, setFile] = useState(null);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = () => getAdminRoadSigns().then(({ data }) => setItems(data?.data || [])).catch((e) => setMessage(e.response?.data?.message || "Could not load road signs.")).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const reset = () => { setForm(blank); setFile(null); setEditing(null); };
  const submit = async (event) => {
    event.preventDefault(); setMessage("");
    if (!form.title.trim() || (!editing && !file)) return setMessage("Title and image are required.");
    const data = new FormData(); Object.entries(form).forEach(([key, value]) => data.append(key, value)); if (file) data.append("image", file);
    setSaving(true);
    try { editing ? await updateRoadSign(editing, data) : await createRoadSign(data); setMessage(editing ? "Road sign updated." : "Road sign added."); reset(); await load(); }
    catch (e) { setMessage(e.response?.data?.message || "Could not save road sign."); }
    finally { setSaving(false); }
  };
  const edit = (item) => { setEditing(item._id); setForm({ title: item.title || "", description: item.description || "", status: item.status || "active", sortOrder: item.sortOrder || 0 }); setFile(null); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const remove = async (id) => { if (!window.confirm("Delete this road sign?")) return; await deleteRoadSign(id); setItems((current) => current.filter((item) => item._id !== id)); };

  return <main className="min-h-screen bg-[#f5f7fb] p-4 sm:p-6"><div className="mx-auto max-w-7xl"><div><h1 className="text-2xl font-bold text-[#173f87]">Road Signs</h1><p className="mt-1 text-sm text-slate-500">Manage the road signs shown to students.</p></div>
    <form onSubmit={submit} className="mt-6 rounded-2xl bg-white p-5 shadow-sm"><h2 className="font-bold text-[#173f87]">{editing ? "Edit Road Sign" : "Add Road Sign"}</h2><div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5"><label className="text-sm font-semibold">Title *<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-2 w-full rounded-lg border px-3 py-2.5 font-normal" /></label><label className="text-sm font-semibold xl:col-span-2">Description (optional)<input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-2 w-full rounded-lg border px-3 py-2.5 font-normal" /></label><label className="text-sm font-semibold">Image {editing ? "" : "*"}<input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mt-2 block w-full text-xs font-normal" /></label><label className="text-sm font-semibold">Order<input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} className="mt-2 w-full rounded-lg border px-3 py-2.5 font-normal" /></label></div><div className="mt-4 flex flex-wrap items-center gap-3"><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="rounded-lg border px-3 py-2 text-sm"><option value="active">Active</option><option value="inactive">Inactive</option></select><button disabled={saving} className="rounded-lg bg-[#173f87] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50">{saving ? "Saving..." : editing ? "Update Sign" : "Add Sign"}</button>{editing && <button type="button" onClick={reset} className="rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-bold">Cancel</button>} {message && <p className="text-sm font-semibold text-slate-600">{message}</p>}</div></form>
    <section className="mt-6 rounded-2xl bg-[#e8eef7] p-4 sm:p-5">{loading ? <p>Loading...</p> : !items.length ? <div className="rounded-xl bg-white p-10 text-center text-slate-500">No road signs added yet.</div> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{items.map((item) => <article key={item._id} className="rounded-xl bg-white p-4"><div className="flex h-36 items-center justify-center"><img src={mediaUrl(item.image)} alt={item.title} className="max-h-32 max-w-full object-contain" /></div><h3 className="mt-3 break-words font-bold text-[#173f87]">{item.title}</h3><p className="mt-1 min-h-5 break-words text-xs text-slate-500">{item.description}</p><div className="mt-3 flex items-center justify-between"><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${item.status === "active" ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"}`}>{item.status}</span><div className="flex gap-2"><button onClick={() => edit(item)} className="rounded-md bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">Edit</button><button onClick={() => remove(item._id)} className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">Delete</button></div></div></article>)}</div>}</section>
  </div></main>;
}
