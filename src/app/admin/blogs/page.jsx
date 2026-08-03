"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";

import {
  createBlog,
  deleteBlog,
  getAdminBlogs,
  updateBlog,
} from "@/features/API";
import BlogEditor from "@/components/blogs/BlogEditor";
import { showToast } from "@/utils/showToast";

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  status: "published",
  coverImage: null,
  removeCoverImage: false,
};

const errorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong.";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("all");

  const loadBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getAdminBlogs(
        filter === "all" ? {} : { status: filter },
      );
      setBlogs(data?.data || []);
    } catch (error) {
      showToast.error(errorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const preview = useMemo(
    () => (form.coverImage ? URL.createObjectURL(form.coverImage) : form.removeCoverImage ? "" : editing?.coverImage),
    [form.coverImage, form.removeCoverImage, editing],
  );

  const closeModal = () => {
    setOpen(false);
    setEditing(null);
    setForm(emptyForm);
  };

  const startCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const startEdit = (blog) => {
    setEditing(blog);
    setForm({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      status: blog.status || "draft",
      coverImage: null,
      removeCoverImage: false,
    });
    setOpen(true);
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      return showToast.warning("Title and content are required.");
    }
    if (!editing && !form.coverImage) {
      return showToast.warning("A cover image is required.");
    }

    const payload = new FormData();
    payload.append("title", form.title.trim());
    payload.append("excerpt", form.excerpt.trim());
    payload.append("content", form.content.trim());
    payload.append("status", form.status);
    if (form.coverImage) payload.append("coverImage", form.coverImage);
    if (form.removeCoverImage) payload.append("removeCoverImage", "true");

    try {
      setSaving(true);
      if (editing) {
        await updateBlog(editing._id, payload);
        showToast.success("Blog updated successfully.");
      } else {
        await createBlog(payload);
        showToast.success("Blog created successfully.");
      }
      closeModal();
      await loadBlogs();
    } catch (error) {
      showToast.error(errorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const remove = async (blog) => {
    if (!window.confirm(`Delete “${blog.title}”? This cannot be undone.`)) return;
    try {
      await deleteBlog(blog._id);
      showToast.success("Blog deleted successfully.");
      await loadBlogs();
    } catch (error) {
      showToast.error(errorMessage(error));
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#172033]">Blog Management</h1>
          <p className="mt-1 text-sm text-slate-500">Create and manage public blog articles.</p>
        </div>
        <button onClick={startCreate} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#174a9b] px-5 py-3 text-sm font-bold text-white hover:bg-[#123d82]">
          <FiPlus /> Create Blog
        </button>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#174a9b]">
          <option value="all">All blogs</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {loading ? (
          <p className="p-10 text-center text-slate-500">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="p-10 text-center text-slate-500">No blogs found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-[#174a9b] text-white">
                <tr><th className="px-5 py-4">Blog</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Updated</th><th className="px-5 py-4 text-right">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-slate-50">
                    <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="relative flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 text-[10px] text-slate-400">{blog.coverImage ? <Image src={blog.coverImage} alt="" fill sizes="80px" className="object-cover" /> : "No image"}</div><div><p className="max-w-md font-bold text-slate-800">{blog.title}</p><p className="mt-1 max-w-md truncate text-xs text-slate-500">/{blog.slug}</p></div></div></td>
                    <td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-bold ${blog.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{blog.status}</span></td>
                    <td className="px-5 py-4 text-slate-600">{new Date(blog.updatedAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4"><div className="flex justify-end gap-2"><button onClick={() => startEdit(blog)} aria-label="Edit blog" className="rounded-lg bg-blue-50 p-2.5 text-[#174a9b] hover:bg-blue-100"><FiEdit2 /></button><button onClick={() => remove(blog)} aria-label="Delete blog" className="rounded-lg bg-red-50 p-2.5 text-red-600 hover:bg-red-100"><FiTrash2 /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4"><h2 className="text-xl font-extrabold text-slate-800">{editing ? "Update Blog" : "Create Blog"}</h2><button onClick={closeModal} className="rounded-full p-2 text-slate-500 hover:bg-slate-100"><FiX /></button></div>
            <form onSubmit={submit} className="space-y-5 p-6">
              <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Title *</span><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} maxLength={180} className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-[#174a9b]" /></label>
              <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Short excerpt</span><textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={3} maxLength={320} className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-[#174a9b]" /></label>
              <div><span className="mb-2 block text-sm font-bold text-slate-700">Article content *</span><BlogEditor value={form.content} onChange={(content) => setForm((current) => ({ ...current, content }))} /></div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Status</span><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-[#174a9b]"><option value="published">Published</option><option value="draft">Draft</option></select></label>
                <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Cover image {editing ? "" : "*"}</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setForm({ ...form, coverImage: e.target.files?.[0] || null, removeCoverImage: false })} className="block w-full rounded-lg border border-slate-200 text-sm file:mr-3 file:border-0 file:bg-blue-50 file:px-4 file:py-3 file:font-bold file:text-[#174a9b]" /><span className="mt-1 block text-xs text-slate-500">Uploaded to Cloudinary. Max 5 MB.</span>{editing?.coverImage && !form.coverImage && <button type="button" onClick={() => setForm({ ...form, removeCoverImage: !form.removeCoverImage })} className={`mt-2 text-xs font-bold ${form.removeCoverImage ? "text-blue-700" : "text-red-600"}`}>{form.removeCoverImage ? "Undo image removal" : "Remove current image"}</button>}</label>
              </div>
              {preview && <div className="relative aspect-[2.55/1] overflow-hidden rounded-xl bg-slate-100"><Image src={preview} alt="Cover preview" fill sizes="700px" className="object-cover" unoptimized /></div>}
              <div className="flex justify-end gap-3 border-t pt-5"><button type="button" onClick={closeModal} className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600">Cancel</button><button disabled={saving} className="rounded-lg bg-[#e2233d] px-6 py-3 text-sm font-bold text-white disabled:opacity-60">{saving ? "Saving..." : editing ? "Update Blog" : "Publish Blog"}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
