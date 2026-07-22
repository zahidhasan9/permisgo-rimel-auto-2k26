"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaBookOpen,
  FaCheckCircle,
  FaExclamationCircle,
  FaSave,
} from "react-icons/fa";
import { createLearningContent, getAdminQuizzes } from "@/features/API";

const defaultForm = {
  title: "",
  subtitle: "",
  type: "road-sign",
  category: "",
  topicCode: "",
  difficulty: "beginner",
  status: "active",
  description: "",
  content: "",
  videoUrl: "",
  relatedQuiz: "",
  tags: "",
  order: 0,
  isFeatured: false,
  image: null,
  file: null,
};

const contentTypes = [
  { value: "road-sign", label: "Road Signs" },
];

const difficulties = [
  { value: "beginner", label: "Beginner" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
  { value: "exam-focus", label: "Exam Focus" },
];

const statuses = [
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "inactive", label: "Inactive" },
];

const topicCodes = ["L", "C", "R", "U", "D", "HAS", "P", "M", "S", "E"];

export default function LearningContentForm() {
  const [form, setForm] = useState(defaultForm);
  const [quizzes, setQuizzes] = useState([]);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    loadQuizzes();
  }, []);

  async function loadQuizzes() {
    try {
      const res = await getAdminQuizzes();

      const quizList =
        res?.data?.data?.quizzes ||
        res?.data?.quizzes ||
        res?.data?.data ||
        res?.data ||
        [];

      setQuizzes(Array.isArray(quizList) ? quizList : []);
    } catch (error) {
      console.log("Quiz Load Error:", error);
      setQuizzes([]);
    }
  }

  function handleChange(e) {
    const { name, value, type, checked, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "file"
          ? files?.[0] || null
          : type === "checkbox"
            ? checked
            : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim()) {
      setNotice({ type: "error", message: "Title is required." });
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      await createLearningContent(formData);

      setForm(defaultForm);
      setResetKey((prev) => prev + 1);
      setNotice({
        type: "success",
        message: "Learning content created successfully.",
      });
    } catch (error) {
      console.log("Create Learning Content Error:", error);

      setNotice({
        type: "error",
        message:
          error?.response?.data?.message ||
          "Unable to create learning content.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F7FB] px-3 py-3">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-3 flex items-center justify-between rounded-2xl border border-black/[0.06] bg-white px-4 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#174A9B]/10 text-[#174A9B]">
              <FaBookOpen size={18} />
            </div>

            <div>
              <p className="text-[10px] font-[800] uppercase tracking-[0.14em] text-[#8A8F98]">
                Admin / Learning Content
              </p>

              <h1 className="text-[20px] font-[850] leading-6 text-[#111827]">
                Create New Content
              </h1>
            </div>
          </div>

          <Link
            href="/admin/learning-content"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-black/[0.08] bg-[#F9FAFB] px-4 text-xs font-[800] text-[#374151] transition hover:bg-white"
          >
            <FaArrowLeft />
            Back
          </Link>
        </div>

        <Notice notice={notice} onClose={() => setNotice(null)} />

        <form
          key={resetKey}
          onSubmit={handleSubmit}
          className="rounded-2xl border border-black/[0.06] bg-white p-3 shadow-sm"
        >
          <div className="grid gap-3 lg:grid-cols-12">
            <Section
              className="lg:col-span-5"
              title="Basic Information"
              subtitle="Main content setup"
            >
              <div className="grid grid-cols-2 gap-3">
                <Input
                  required
                  label="Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Content title"
                />

                <Input
                  label="Subtitle"
                  name="subtitle"
                  value={form.subtitle}
                  onChange={handleChange}
                  placeholder="Short subtitle"
                />

                <Select
                  label="Type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  options={contentTypes}
                />

                <Input
                  label="Category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Road Rules"
                />

                <Select
                  label="Topic"
                  name="topicCode"
                  value={form.topicCode}
                  onChange={handleChange}
                  options={[
                    { value: "", label: "No Topic" },
                    ...topicCodes.map((code) => ({
                      value: code,
                      label: code,
                    })),
                  ]}
                />

                <Select
                  label="Difficulty"
                  name="difficulty"
                  value={form.difficulty}
                  onChange={handleChange}
                  options={difficulties}
                />

                <Select
                  label="Status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  options={statuses}
                />

                <Input
                  label="Order"
                  name="order"
                  type="number"
                  value={form.order}
                  onChange={handleChange}
                />
              </div>
            </Section>

            <Section
              className="lg:col-span-4"
              title="Content Details"
              subtitle="Description and full text"
            >
              <div className="grid gap-3">
                <Textarea
                  label="Short Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Short summary..."
                  rows={3}
                />

                <Textarea
                  label="Full Content"
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Full learning content..."
                  rows={7}
                />

                <Input
                  label="Tags"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="road, sign, beginner"
                />
              </div>
            </Section>

            <Section
              className="lg:col-span-3"
              title="Media & Quiz"
              subtitle="Attach resources"
            >
              <div className="grid gap-3">
                <Input
                  label="Video URL"
                  name="videoUrl"
                  value={form.videoUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                />

                <Select
                  label="Related Quiz"
                  name="relatedQuiz"
                  value={form.relatedQuiz}
                  onChange={handleChange}
                  options={[
                    { value: "", label: "No Quiz" },
                    ...quizzes.map((quiz) => ({
                      value: quiz._id || quiz.id,
                      label: quiz.title || quiz.name || "Untitled Quiz",
                    })),
                  ]}
                />

                <FileInput
                  label="Image"
                  name="image"
                  file={form.image}
                  onChange={handleChange}
                />

                <FileInput
                  label="File"
                  name="file"
                  file={form.file}
                  onChange={handleChange}
                />

                <label className="flex cursor-pointer items-start gap-2 rounded-xl border border-dashed border-[#174A9B]/20 bg-[#174A9B]/[0.03] p-3">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={form.isFeatured}
                    onChange={handleChange}
                    className="mt-0.5 h-4 w-4 accent-[#174A9B]"
                  />

                  <span>
                    <span className="block text-xs font-[850] text-[#111827]">
                      Featured Content
                    </span>
                    <span className="mt-0.5 block text-[11px] font-medium leading-4 text-[#6B7280]">
                      Show this content as highlighted.
                    </span>
                  </span>
                </label>
              </div>
            </Section>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl bg-[#F9FAFB] px-4 py-3">
            <p className="text-xs font-semibold text-[#6B7280]">
              Check information before saving.
            </p>

            <div className="flex items-center gap-2">
              <Link
                href="/admin/learning-content"
                className="inline-flex h-9 items-center justify-center rounded-xl border border-black/[0.08] bg-white px-5 text-xs font-[800] text-[#4B5563] transition hover:bg-[#F3F4F6]"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-[#174A9B] px-5 text-xs font-[850] text-white transition hover:bg-[#123D82] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaSave />
                {saving ? "Saving..." : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

function Section({ title, subtitle, className = "", children }) {
  return (
    <section
      className={`rounded-2xl border border-black/[0.06] bg-white p-3 shadow-[0_1px_0_rgba(0,0,0,0.03)] ${className}`}
    >
      <div className="mb-3 border-b border-black/[0.06] pb-2">
        <h2 className="text-sm font-[850] text-[#111827]">{title}</h2>
        <p className="mt-0.5 text-[11px] font-medium text-[#8A8F98]">
          {subtitle}
        </p>
      </div>

      {children}
    </section>
  );
}

function Notice({ notice, onClose }) {
  if (!notice) return null;

  const isSuccess = notice.type === "success";

  return (
    <div
      className={`mb-3 flex items-center justify-between rounded-xl border px-3 py-2 text-xs font-semibold ${
        isSuccess
          ? "border-green-200 bg-green-50 text-green-700"
          : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      <div className="flex items-center gap-2">
        {isSuccess ? <FaCheckCircle /> : <FaExclamationCircle />}
        <span>{notice.message}</span>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="rounded-md px-2 font-black opacity-70 hover:opacity-100"
      >
        ✕
      </button>
    </div>
  );
}

function Input({ label, required, ...props }) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />

      <input
        {...props}
        className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F9FAFB] px-3 text-[11px] font-[650] text-[#111827] outline-none transition placeholder:text-[11px] placeholder:text-[#A0A7B2] hover:bg-white focus:border-[#174A9B]/40 focus:bg-white focus:shadow-[0_0_0_3px_rgba(23,74,155,0.08)]"
      />
    </label>
  );
}

function Select({ label, required, options = [], ...props }) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />

      <select
        {...props}
        className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F9FAFB] px-3 text-xs font-[650] text-[#111827] outline-none transition hover:bg-white focus:border-[#174A9B]/40 focus:bg-white focus:shadow-[0_0_0_3px_rgba(23,74,155,0.08)]"
      >
        {options.map((option) => (
          <option key={`${option.value}-${option.label}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Textarea({ label, required, rows = 3, ...props }) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />

      <textarea
        {...props}
        rows={rows}
        className="w-full resize-none rounded-xl border border-black/[0.08] bg-[#F9FAFB] px-3 py-2 text-xs font-[650] leading-5 text-[#111827] outline-none transition placeholder:text-[#A0A7B2] hover:bg-white focus:border-[#174A9B]/40 focus:bg-white focus:shadow-[0_0_0_3px_rgba(23,74,155,0.08)]"
      />
    </label>
  );
}

function FileInput({ label, name, file, onChange }) {
  return (
    <label className="block">
      <FieldLabel label={label} />

      <div className="relative rounded-xl border border-dashed border-black/[0.14] bg-[#F9FAFB] px-3 py-2 transition hover:border-[#174A9B]/40 hover:bg-white">
        <input
          type="file"
          name={name}
          onChange={onChange}
          className="absolute inset-0 cursor-pointer opacity-0"
        />

        <p className="truncate text-xs font-[800] text-[#111827]">
          {file?.name || "Choose file"}
        </p>

        <p className="mt-0.5 text-[10px] font-medium text-[#8A8F98]">
          Click to upload
        </p>
      </div>
    </label>
  );
}

function FieldLabel({ label, required }) {
  return (
    <span className="mb-1 block text-[10px] font-[850] uppercase tracking-[0.08em] text-[#6B7280]">
      {label}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </span>
  );
}
