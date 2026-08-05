"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createExamQuestion, updateExamQuestion } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const blank = { number: "", title: "", category: "General", mediaType: "image", videoUrl: "", order: 0, status: "active", items: [{ question: "", answer: "" }] };

export default function ExamQuestionForm({ question = null }) {
  const router = useRouter();
  const [form, setForm] = useState(question ? { number: question.number, title: question.title || "", category: question.category || "General", mediaType: question.videoUrl ? "video" : "image", videoUrl: question.videoUrl || "", order: question.order || 0, status: question.status || "active", items: question.items?.map(({ question: text, answer }) => ({ question: text, answer })) || blank.items } : blank);
  const [image, setImage] = useState(null);
  const [existingImage] = useState(question?.image || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const changePair = (index, field, value) => setForm((current) => ({ ...current, items: current.items.map((item, i) => i === index ? { ...item, [field]: value } : item) }));

  const submit = async (event) => {
    event.preventDefault(); setMessage("");
    if (!form.number || form.items.some((item) => !item.question.trim() || !item.answer.trim())) return setMessage("Number and every question-answer pair are required.");
    if (form.mediaType === "image" && !image && !existingImage) return setMessage("Please upload a question image.");
    if (form.mediaType === "video" && !form.videoUrl.trim()) return setMessage("Please enter a video URL.");
    const data = new FormData();
    ["number", "title", "category", "order", "status"].forEach((key) => data.append(key, form[key]));
    data.append("videoUrl", form.mediaType === "video" ? form.videoUrl : "");
    data.append("removeImage", form.mediaType === "video" ? "true" : "false");
    data.append("items", JSON.stringify(form.items));
    if (form.mediaType === "image" && image) data.append("image", image);
    setSaving(true);
    try { if (question) await updateExamQuestion(question._id, data); else await createExamQuestion(data); router.push("/admin/exam-questions"); router.refresh(); }
    catch (error) { setMessage(error.response?.data?.message || "Question could not be saved."); }
    finally { setSaving(false); }
  };

  return <form onSubmit={submit} className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5"><Field label="Number *"><input type="number" min="1" max="999" value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} className="input" /></Field><Field label="Title"><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" /></Field><Field label="Category"><input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input" /></Field><Field label="Order"><input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className="input" /></Field><Field label="Status"><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input"><option value="active">Active</option><option value="inactive">Inactive</option></select></Field></div>
    <section className="mt-6 rounded-xl border border-[#dbe4f1] bg-[#f7f9fc] p-4"><h2 className="font-bold text-[#173f87]">Question media *</h2><p className="mt-1 text-xs text-slate-500">Select either image or video.</p><div className="mt-3 grid max-w-sm grid-cols-2 gap-2 rounded-xl bg-[#e8eef7] p-1.5"><MediaButton active={form.mediaType === "image"} onClick={() => setForm({ ...form, mediaType: "image", videoUrl: "" })}>Image</MediaButton><MediaButton active={form.mediaType === "video"} onClick={() => { setForm({ ...form, mediaType: "video" }); setImage(null); }}>Video</MediaButton></div><div className="mt-4 max-w-2xl">{form.mediaType === "image" ? <Field label={existingImage ? "Replace image" : "Upload image *"}><input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} className="mt-2 block w-full rounded-lg border border-dashed border-slate-300 bg-white p-3 text-xs" />{existingImage && !image && <img src={mediaUrl(existingImage)} alt="Current" className="mt-3 h-24 w-40 rounded-lg object-cover" />}</Field> : <Field label="YouTube, Vimeo or direct video URL *"><input type="url" value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} placeholder="https://youtube.com/watch?v=..." className="input" /></Field>}</div></section>
    <section className="mt-6"><div className="flex items-center justify-between"><h2 className="font-bold text-[#173f87]">Questions and answers</h2><button type="button" onClick={() => setForm({ ...form, items: [...form.items, { question: "", answer: "" }] })} className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">+ Add pair</button></div><div className="mt-3 space-y-3">{form.items.map((pair, index) => <div key={index} className="grid gap-3 rounded-xl bg-[#e8eef7] p-3 md:grid-cols-2"><textarea rows="3" value={pair.question} onChange={(e) => changePair(index, "question", e.target.value)} placeholder={`Question ${index + 1}`} className="rounded-lg border p-3 text-sm" /><div className="flex gap-2"><textarea rows="3" value={pair.answer} onChange={(e) => changePair(index, "answer", e.target.value)} placeholder="Answer" className="min-w-0 flex-1 rounded-lg border p-3 text-sm" />{form.items.length > 1 && <button type="button" onClick={() => setForm({ ...form, items: form.items.filter((_, i) => i !== index) })} className="self-start rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-700">Remove</button>}</div></div>)}</div></section>
    {message && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{message}</p>}<div className="mt-6 flex justify-end gap-3"><Link href="/admin/exam-questions" className="rounded-lg border px-5 py-2.5 text-sm font-bold text-slate-600">Cancel</Link><button disabled={saving} className="rounded-lg bg-[#173f87] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50">{saving ? "Saving..." : question ? "Update Question" : "Create Question"}</button></div>
    <style jsx>{`.input{margin-top:.5rem;width:100%;border:1px solid #e2e8f0;border-radius:.5rem;padding:.625rem .75rem;font-weight:400}`}</style>
  </form>;
}
function Field({ label, children }) { return <label className="block text-sm font-semibold text-slate-700">{label}{children}</label>; }
function MediaButton({ active, onClick, children }) { return <button type="button" onClick={onClick} className={`rounded-lg px-4 py-2.5 text-sm font-bold ${active ? "bg-[#173f87] text-white shadow" : "text-slate-600"}`}>{children}</button>; }
