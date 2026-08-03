"use client";

import { useEffect, useMemo, useState } from "react";
import { FaCloudUploadAlt, FaImage, FaSave } from "react-icons/fa";
import { mediaUrl } from "@/utils/mediaUrl";

const defaultForm = {
  title: "",
  type: "simple_series",
  description: "",
  durationMinutes: 30,
  passingScore: 60,
  status: "active",
  order: 0,
  isPaid: false,
};

const quizTypes = [
  { label: "Simple Series", value: "simple_series" },
  { label: "Mock Test", value: "mock_test" },
  { label: "Thematic Series", value: "thematic_series" },
  { label: "Crash Test", value: "crash_test" },
];

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-[#f8f8fb] px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50";

function Label({ children }) {
  return <label className="mb-2 block text-xs font-bold text-slate-600">{children}</label>;
}

export default function QuizForm({
  initialValues = null,
  onSubmit,
  loading = false,
  submitText = "Save Quiz",
}) {
  const [form, setForm] = useState(defaultForm);
  const [coverImage, setCoverImage] = useState(null);
  const [removeCoverImage, setRemoveCoverImage] = useState(false);

  useEffect(() => {
    if (!initialValues) return;
    setForm({
      title: initialValues.title || "",
      type: initialValues.type || "simple_series",
      description: initialValues.description || "",
      durationMinutes: initialValues.durationMinutes || 30,
      passingScore: initialValues.passingScore || 60,
      status: initialValues.status || "active",
      order: initialValues.order || 0,
      isPaid: Boolean(initialValues.isPaid),
    });
  }, [initialValues]);

  const previewUrl = useMemo(() => {
    if (coverImage) return URL.createObjectURL(coverImage);
    return !removeCoverImage && initialValues?.coverImage ? mediaUrl(initialValues.coverImage) : "";
  }, [coverImage, initialValues?.coverImage, removeCoverImage]);

  useEffect(() => {
    return () => {
      if (coverImage && previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [coverImage, previewUrl]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (coverImage) formData.append("coverImage", coverImage);
    if (removeCoverImage) formData.append("removeCoverImage", "true");
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <section className="p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-base font-bold text-slate-900">Basic information</h2>
          <p className="mt-1 text-xs text-slate-500">Name the quiz and choose where it will appear.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label>Quiz title *</Label>
            <input name="title" value={form.title} onChange={handleChange} required className={inputClass} placeholder="Example: Simple Series 01" />
          </div>

          <div className="md:col-span-2">
            <Label>Quiz type</Label>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {initialValues?.type === "road_sign" ? (
                <div className="rounded-xl border border-[#173f87] bg-blue-50 px-4 py-3 text-sm font-bold text-[#173f87]">Road Sign (Legacy)</div>
              ) : quizTypes.map((item) => (
                <button
                  type="button"
                  key={item.value}
                  onClick={() => setForm((current) => ({ ...current, type: item.value }))}
                  className={`rounded-xl border px-3 py-3 text-left text-xs font-bold transition ${
                    form.type === item.value
                      ? "border-[#173f87] bg-[#eef3fb] text-[#173f87] ring-1 ring-[#173f87]"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <Label>Description</Label>
            <textarea rows={4} name="description" value={form.description} onChange={handleChange} placeholder="What will students practise in this quiz?" className="min-h-[100px] w-full resize-y rounded-xl border border-slate-200 bg-[#f8f8fb] px-3 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50" />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-[#fbfcfe] p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-base font-bold text-slate-900">Exam settings</h2>
          <p className="mt-1 text-xs text-slate-500">Set the time, pass mark and publishing options.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Label>Duration (minutes)</Label>
            <input type="number" min={1} name="durationMinutes" value={form.durationMinutes} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <Label>Passing score (%)</Label>
            <input type="number" min={0} max={100} name="passingScore" value={form.passingScore} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <Label>Display order</Label>
            <input type="number" name="order" value={form.order} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <Label>Status</Label>
            <select name="status" value={form.status} onChange={handleChange} className={`${inputClass} cursor-pointer`}>
              <option value="active">Active — visible to students</option>
              <option value="inactive">Inactive — hidden</option>
            </select>
          </div>
          <div>
            <Label>Access</Label>
            <label className="flex h-11 cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-white px-3">
              <span className="text-xs font-bold text-slate-700">{form.isPaid ? "Paid quiz" : "Free quiz"}</span>
              <input type="checkbox" name="isPaid" checked={form.isPaid} onChange={handleChange} className="h-4 w-4 accent-[#173f87]" />
            </label>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 p-5 sm:p-6">
        <div className="mb-4">
          <h2 className="text-base font-bold text-slate-900">Cover image</h2>
          <p className="mt-1 text-xs text-slate-500">Optional. Use a clear landscape JPG, PNG or WEBP image.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_200px]">
          <label className="flex min-h-[110px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-[#f8f8fb] px-3 py-3 text-center transition hover:border-blue-300 hover:bg-blue-50/40">
            <FaCloudUploadAlt className="mb-2 text-xl text-[#173f87]" />
            <p className="max-w-full truncate text-xs font-bold text-slate-700">{coverImage ? coverImage.name : "Choose cover image"}</p>
            <input type="file" accept="image/*" onChange={(event) => { setCoverImage(event.target.files?.[0] || null); setRemoveCoverImage(false); }} className="hidden" />
          </label>

          <div className="flex h-[110px] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            {previewUrl ? <img src={previewUrl} alt="Cover" className="h-full w-full object-cover" /> : <div className="text-center"><FaImage className="mx-auto mb-1 text-lg text-slate-300" /><p className="text-[11px] font-bold text-slate-400">Preview</p></div>}
          </div>
        </div>
        {initialValues?.coverImage && !coverImage && <button type="button" onClick={() => setRemoveCoverImage((value) => !value)} className={`mt-3 text-xs font-bold ${removeCoverImage ? "text-blue-700" : "text-red-600"}`}>{removeCoverImage ? "Undo image removal" : "Remove current cover image"}</button>}
      </section>

      <footer className="flex flex-col justify-between gap-3 border-t border-slate-200 bg-[#fbfcfe] px-5 py-4 sm:flex-row sm:items-center sm:px-6">
        <p className="text-xs text-slate-500">Questions can be added after creating the quiz.</p>
        <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173f87] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#12346f] disabled:cursor-not-allowed disabled:opacity-60">
          <FaSave />
          {loading ? "Saving..." : submitText}
        </button>
      </footer>
    </form>
  );
}
