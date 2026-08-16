"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  createTestimonial,
  deleteTestimonial,
  getAdminTestimonials,
  updateTestimonial,
} from "@/features/API";
import { showToast } from "@/utils/showToast";

const empty = {
  name: "",
  role: "PermisGo learner",
  message: "",
  role_bn: "",
  message_bn: "",
  role_fr: "",
  message_fr: "",
  rating: 5,
  status: "active",
  image: null,
};
const languages = [
  ["English", "role", "message", true],
  ["বাংলা", "role_bn", "message_bn", false],
  ["Français", "role_fr", "message_fr", false],
];

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const response = await getAdminTestimonials();
      setItems(response.data?.data || []);
    } catch (error) {
      showToast.error(
        error.response?.data?.message || "Testimonials could not be loaded.",
      );
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const close = () => {
    setOpen(false);
    setEditing(null);
    setForm(empty);
  };
  const edit = (item) => {
    setEditing(item);
    setForm({
      ...empty,
      ...item,
      role_bn: item.translations?.bn?.role || "",
      message_bn: item.translations?.bn?.message || "",
      role_fr: item.translations?.fr?.role || "",
      message_fr: item.translations?.fr?.message || "",
      image: null,
    });
    setOpen(true);
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.message.trim())
      return showToast.warning("Name and English message are required.");
    if (!editing && !form.image)
      return showToast.warning("Profile image is required.");
    const data = new FormData();
    [
      "name",
      "role",
      "message",
      "role_bn",
      "message_bn",
      "role_fr",
      "message_fr",
      "rating",
      "status",
    ].forEach((key) => data.append(key, form[key]));
    if (form.image) data.append("image", form.image);
    setSaving(true);
    try {
      if (editing) await updateTestimonial(editing._id, data);
      else await createTestimonial(data);
      showToast.success("Testimonial saved.");
      close();
      await load();
    } catch (error) {
      showToast.error(
        error.response?.data?.message || "Could not save testimonial.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">Testimonial Management</h1>
          <p className="text-sm text-slate-500">
            Manage English, Bangla and French learner stories.
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-[#174a9b] px-5 py-3 font-bold text-white"
        >
          Add Testimonial
        </button>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article
            key={item._id}
            className="flex gap-4 rounded-xl bg-white p-4 shadow"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-slate-100">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="min-w-0">
              <b>{item.name}</b>
              <p className="text-xs text-slate-500">{item.role}</p>
              <p className="mt-2 line-clamp-2 text-sm">{item.message}</p>
              <button
                onClick={() => edit(item)}
                className="mt-3 mr-4 font-bold text-blue-700"
              >
                Edit
              </button>
              <button
                onClick={async () => {
                  if (confirm("Delete testimonial?")) {
                    await deleteTestimonial(item._id);
                    await load();
                  }
                }}
                className="font-bold text-red-600"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={submit}
            className="max-h-[92vh] w-full max-w-2xl space-y-5 overflow-y-auto rounded-2xl bg-white p-6"
          >
            <h2 className="text-xl font-extrabold">
              {editing ? "Update" : "Add"} Testimonial
            </h2>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Learner name *"
              className="w-full rounded-lg border p-3"
            />
            {languages.map(([label, roleKey, messageKey, required]) => (
              <section
                key={roleKey}
                className="space-y-3 rounded-xl border p-4"
              >
                <h3 className="font-bold text-[#174a9b]">{label}</h3>
                <input
                  required={required}
                  value={form[roleKey]}
                  onChange={(e) =>
                    setForm({ ...form, [roleKey]: e.target.value })
                  }
                  placeholder={`Role / label${required ? " *" : ""}`}
                  className="w-full rounded-lg border p-3"
                />
                <textarea
                  required={required}
                  rows={4}
                  value={form[messageKey]}
                  onChange={(e) =>
                    setForm({ ...form, [messageKey]: e.target.value })
                  }
                  placeholder={`Testimonial message${required ? " *" : ""}`}
                  className="w-full rounded-lg border p-3"
                />
              </section>
            ))}
            <div className="grid gap-3 sm:grid-cols-3">
              <select
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
                className="rounded-lg border p-3"
              >
                {[5, 4, 3, 2, 1].map((number) => (
                  <option key={number} value={number}>
                    {number} stars
                  </option>
                ))}
              </select>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="rounded-lg border p-3"
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files?.[0] || null })
                }
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={close}
                className="rounded-lg border px-5 py-3"
              >
                Cancel
              </button>
              <button
                disabled={saving}
                className="rounded-lg bg-[#e2233d] px-6 py-3 font-bold text-white"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
