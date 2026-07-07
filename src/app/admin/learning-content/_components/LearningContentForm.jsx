"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaBookOpen,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import {
  createLearningContent,
  getAdminLearningContents,
  getAdminQuizzes,
  updateLearningContent,
} from "@/features/API";

const emptyForm = {
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
  { value: "code-ebook", label: "Code eBook" },
  { value: "knowledge-sheet", label: "Knowledge Sheets" },
  { value: "live-replay", label: "Live Replays" },
];

const topicCodes = ["L", "C", "R", "U", "D", "HAS", "P", "M", "S", "E"];

const getArrayFromResponse = (res, possibleKeys = []) => {
  const root = res?.data;
  const data = res?.data?.data;

  if (Array.isArray(root)) return root;
  if (Array.isArray(data)) return data;

  for (const key of possibleKeys) {
    if (Array.isArray(data?.[key])) return data[key];
    if (Array.isArray(root?.[key])) return root[key];
  }

  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.docs)) return data.docs;
  if (Array.isArray(root?.items)) return root.items;
  if (Array.isArray(root?.results)) return root.results;
  if (Array.isArray(root?.docs)) return root.docs;

  return [];
};

export default function LearningContentForm({
  mode = "create",
  contentId = "",
}) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [form, setForm] = useState(emptyForm);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(Boolean(isEdit && contentId));

  const [notice, setNotice] = useState({
    show: false,
    type: "info",
    message: "",
  });

  const safeQuizzes = useMemo(
    () => (Array.isArray(quizzes) ? quizzes : []),
    [quizzes],
  );

  const showNotice = (type, message) => {
    setNotice({
      show: true,
      type,
      message,
    });
  };

  const fetchQuizzes = async () => {
    try {
      const res = await getAdminQuizzes();

      const quizList = getArrayFromResponse(res, [
        "quizzes",
        "quizList",
        "quiz",
        "results",
        "items",
        "docs",
      ]);

      setQuizzes(quizList);
    } catch (error) {
      console.log("Quiz Load Error:", error);
      setQuizzes([]);
    }
  };

  const fetchEditContent = async () => {
    if (!isEdit) {
      setPageLoading(false);
      return;
    }

    if (!contentId) {
      setPageLoading(false);
      showNotice("error", "Content ID was not found for editing.");
      return;
    }

    try {
      setPageLoading(true);

      const res = await getAdminLearningContents();

      const contentList = getArrayFromResponse(res, [
        "contents",
        "learningContents",
        "learningContent",
        "data",
      ]);

      const found = contentList.find(
        (item) => String(item._id || item.id) === String(contentId),
      );

      if (!found) {
        showNotice("error", "This content was not found for editing.");
        return;
      }

      setForm({
        title: found.title || "",
        subtitle: found.subtitle || "",
        type: found.type || "road-sign",
        category: found.category || "",
        topicCode: found.topicCode || "",
        difficulty: found.difficulty || "beginner",
        status: found.status || "active",
        description: found.description || "",
        content: found.content || "",
        videoUrl: found.videoUrl || "",
        relatedQuiz:
          typeof found.relatedQuiz === "object"
            ? found.relatedQuiz?._id || ""
            : found.relatedQuiz || "",
        tags: Array.isArray(found.tags)
          ? found.tags.join(", ")
          : found.tags || "",
        order: found.order || 0,
        isFeatured: found.isFeatured || false,
        image: null,
        file: null,
      });
    } catch (error) {
      console.log("Edit Content Load Error:", error);

      showNotice(
        "error",
        error?.response?.data?.message ||
          "Unable to load edit content. Please try again.",
      );
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();

    if (isEdit) {
      fetchEditContent();
    } else {
      setPageLoading(false);
    }
  }, [contentId, isEdit]);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "file"
          ? files?.[0] || null
          : type === "checkbox"
            ? checked
            : value,
    }));
  };

  const makeFormData = () => {
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title?.trim()) {
      showNotice("error", "Title is required to save the content.");
      return;
    }

    if (!form.type) {
      showNotice("error", "Please select a learning content type.");
      return;
    }

    try {
      setLoading(true);

      const formData = makeFormData();

      if (isEdit) {
        await updateLearningContent(contentId, formData);

        showNotice(
          "success",
          "Learning content has been updated successfully. Redirecting to the list page...",
        );

        setTimeout(() => {
          router.push("/admin/learning-content");
        }, 700);
      } else {
        await createLearningContent(formData);

        setForm(emptyForm);

        showNotice(
          "success",
          "New learning content has been created successfully.",
        );
      }
    } catch (error) {
      console.log("Save Error:", error);

      showNotice(
        "error",
        error?.response?.data?.message ||
          "Unable to save content. Please check the information and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <main className="min-h-screen bg-[#f5f6fb] px-4 py-5 md:px-6 lg:px-8">
        <div className="mx-auto max-w-[1180px]">
          <div className="rounded-[20px] border border-black/[0.06] bg-white p-6 shadow-[0_8px_24px_rgba(16,24,40,0.04)]">
            <div className="animate-pulse space-y-4">
              <div className="h-5 w-48 rounded-full bg-slate-100" />
              <div className="h-11 rounded-[12px] bg-slate-100" />
              <div className="h-11 rounded-[12px] bg-slate-100" />
              <div className="h-28 rounded-[12px] bg-slate-100" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f6fb] px-4 py-5 text-[#1D1D1F] md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1180px]">
        <header className="mb-4 rounded-[20px] border border-black/[0.06] bg-white px-5 py-4 shadow-[0_8px_24px_rgba(16,24,40,0.04)]">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold text-[#86868B]">
                <Link
                  href="/admin/learning-content"
                  className="transition hover:text-[#174A9B]"
                >
                  Learning Content
                </Link>
                <span>/</span>
                <span className="text-[#174A9B]">
                  {isEdit ? "Edit Content" : "Create Content"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-[#E8EEF8] text-[#174A9B]">
                  <FaBookOpen className="text-[18px]" />
                </div>

                <div className="min-w-0">
                  <h1 className="text-[24px] font-[700] leading-tight tracking-[-0.03em] text-[#1D1D1F]">
                    {isEdit ? "Edit Learning Content" : "Create New Content"}
                  </h1>

                  <p className="mt-1 max-w-3xl text-[13px] font-medium leading-5 text-[#6D6F76]">
                    {isEdit
                      ? "Update content details, visibility, media, and quiz connection from this clean form."
                      : "Create a new learning item with clear information, optional media, and quiz connection."}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/admin/learning-content"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-[12px] border border-black/[0.06] bg-white px-4 text-[12px] font-[700] text-[#174A9B] transition hover:bg-[#F8FAFC]"
            >
              <FaArrowLeft />
              Back to List
            </Link>
          </div>
        </header>

        {notice.show ? (
          <div
            className={`mb-4 flex items-start justify-between gap-3 rounded-[16px] border px-4 py-3 text-[13px] font-[700] ${
              notice.type === "success"
                ? "border-[#A6F4C5] bg-[#ECFDF3] text-[#027A48]"
                : "border-[#FECDCA] bg-[#FEF3F2] text-[#B42318]"
            }`}
          >
            <div className="flex items-start gap-2">
              {notice.type === "success" ? (
                <FaCheckCircle className="mt-0.5 shrink-0" />
              ) : (
                <FaExclamationTriangle className="mt-0.5 shrink-0" />
              )}

              <span>{notice.message}</span>
            </div>

            <button
              type="button"
              onClick={() =>
                setNotice({
                  show: false,
                  type: "info",
                  message: "",
                })
              }
              className="shrink-0 rounded-full p-1 transition hover:bg-white/60"
            >
              <FaTimes />
            </button>
          </div>
        ) : null}

        <div className="grid gap-4 xl:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <div className="rounded-[20px] border border-black/[0.06] bg-white p-5 shadow-[0_8px_24px_rgba(16,24,40,0.04)]">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[16px] bg-[#E8EEF8] text-[#174A9B]">
                <FaInfoCircle />
              </div>

              <h2 className="text-[17px] font-[700] text-[#1D1D1F]">
                Setup Guide
              </h2>

              <p className="mt-2 text-[13px] font-medium leading-6 text-[#6D6F76]">
                Fill the form section by section. Keep the title clear, choose a
                proper type, then connect media or quiz when needed.
              </p>

              <div className="mt-5 space-y-3">
                <GuideStep
                  number="01"
                  title="Basic details"
                  text="Add title, subtitle, category, topic and order."
                />
                <GuideStep
                  number="02"
                  title="Learning setup"
                  text="Set difficulty, publish status and related quiz."
                />
                <GuideStep
                  number="03"
                  title="Media and content"
                  text="Attach files, video links and full learning content."
                />
              </div>
            </div>

            <div className="rounded-[20px] border border-black/[0.06] bg-[#174A9B] p-5 text-white shadow-[0_8px_24px_rgba(16,24,40,0.04)]">
              <p className="text-[12px] font-[700] uppercase tracking-[0.08em] text-white/65">
                Current Mode
              </p>

              <h3 className="mt-2 text-[22px] font-[700] tracking-[-0.03em]">
                {isEdit ? "Edit Mode" : "Create Mode"}
              </h3>

              <p className="mt-2 text-[13px] font-medium leading-6 text-white/75">
                {isEdit
                  ? "Changes will update the selected learning content."
                  : "After saving, the form will reset for another content."}
              </p>
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-[20px] border border-black/[0.06] bg-white shadow-[0_8px_24px_rgba(16,24,40,0.04)]"
          >
            <FormSection
              title="Basic Information"
              subtitle="Use clear naming so students can understand this content easily."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Example: Road Warning Signs"
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
                >
                  {contentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Select>

                <Input
                  label="Category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Warning / Chapter 1"
                />

                <Select
                  label="Topic Code"
                  name="topicCode"
                  value={form.topicCode}
                  onChange={handleChange}
                >
                  <option value="">No Topic</option>

                  {topicCodes.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </Select>

                <Input
                  label="Display Order"
                  name="order"
                  type="number"
                  value={form.order}
                  onChange={handleChange}
                />
              </div>
            </FormSection>

            <FormSection
              title="Learning Setup"
              subtitle="Control visibility, difficulty level and quiz connection."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Select
                  label="Difficulty"
                  name="difficulty"
                  value={form.difficulty}
                  onChange={handleChange}
                >
                  <option value="beginner">Beginner</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="exam-focus">Exam Focus</option>
                </Select>

                <Select
                  label="Status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="inactive">Inactive</option>
                </Select>

                <div className="md:col-span-2">
                  <Select
                    label="Related Quiz"
                    name="relatedQuiz"
                    value={form.relatedQuiz}
                    onChange={handleChange}
                  >
                    <option value="">No Quiz Selected</option>

                    {safeQuizzes.length === 0 ? (
                      <option value="" disabled>
                        No quiz found
                      </option>
                    ) : (
                      safeQuizzes.map((quiz) => (
                        <option
                          key={quiz._id || quiz.id}
                          value={quiz._id || quiz.id}
                        >
                          {quiz.title || quiz.name || "Untitled Quiz"} (
                          {quiz.type || "quiz"}) -{" "}
                          {quiz.totalQuestions ||
                            quiz.questionCount ||
                            quiz.questionsCount ||
                            0}{" "}
                          Q
                        </option>
                      ))
                    )}
                  </Select>
                </div>

                <Input
                  label="Tags"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="exam, road, important"
                />

                <label className="flex h-[74px] cursor-pointer items-center justify-between rounded-[14px] border border-black/[0.06] bg-[#F8FAFC] px-4 transition hover:bg-white">
                  <div>
                    <span className="block text-[11px] font-[700] uppercase tracking-[0.08em] text-[#86868B]">
                      Featured
                    </span>
                    <span className="mt-1 block text-[13px] font-[700] text-[#1D1D1F]">
                      Highlight this content
                    </span>
                  </div>

                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={form.isFeatured}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-slate-300 text-[#174A9B] focus:ring-[#174A9B]"
                  />
                </label>
              </div>
            </FormSection>

            <FormSection
              title="Media Resources"
              subtitle="Attach optional video, image thumbnail or PDF file."
            >
              <div className="grid gap-4 md:grid-cols-3">
                <div className="md:col-span-3">
                  <Input
                    label="Video URL"
                    name="videoUrl"
                    value={form.videoUrl}
                    onChange={handleChange}
                    placeholder="YouTube or video link"
                  />
                </div>

                <Input
                  label="Image / Thumbnail"
                  name="image"
                  type="file"
                  onChange={handleChange}
                />

                <Input
                  label="PDF / File"
                  name="file"
                  type="file"
                  onChange={handleChange}
                />
              </div>
            </FormSection>

            <FormSection
              title="Content Details"
              subtitle="Keep the short description simple and use full content for detailed learning material."
              last
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Textarea
                  label="Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Short explanation for student..."
                />

                <Textarea
                  label="Full Content"
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Detailed learning content..."
                />
              </div>
            </FormSection>

            <div className="flex flex-col justify-between gap-3 border-t border-black/[0.06] bg-[#F8FAFC] px-5 py-4 sm:flex-row sm:items-center">
              <p className="text-[12px] font-medium text-[#86868B]">
                Review all information before saving.
              </p>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Link
                  href="/admin/learning-content"
                  className="inline-flex h-10 items-center justify-center rounded-[12px] border border-black/[0.08] bg-white px-5 text-[12px] font-[700] text-[#6D6F76] transition hover:bg-[#F1F5F9]"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-[12px] bg-[#174A9B] px-5 text-[12px] font-[700] text-white transition hover:bg-[#123c80] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FaSave />
                  {loading
                    ? "Saving..."
                    : isEdit
                      ? "Update Content"
                      : "Create Content"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function GuideStep({ number, title, text }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#E8EEF8] text-[11px] font-[700] text-[#174A9B]">
        {number}
      </div>

      <div>
        <h3 className="text-[13px] font-[700] text-[#1D1D1F]">{title}</h3>
        <p className="mt-1 text-[12px] font-medium leading-5 text-[#86868B]">
          {text}
        </p>
      </div>
    </div>
  );
}

function FormSection({ title, subtitle, children, last = false }) {
  return (
    <section
      className={`px-5 py-5 ${last ? "" : "border-b border-black/[0.06]"}`}
    >
      <div className="mb-4">
        <h2 className="text-[17px] font-[700] leading-none text-[#1D1D1F]">
          {title}
        </h2>

        {subtitle ? (
          <p className="mt-2 text-[12px] font-medium leading-5 text-[#86868B]">
            {subtitle}
          </p>
        ) : null}
      </div>

      {children}
    </section>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-[700] uppercase tracking-[0.08em] text-[#86868B]">
        {label}
      </span>

      <input
        {...props}
        className="h-11 w-full rounded-[14px] border border-black/[0.06] bg-[#F8FAFC] px-4 text-[13px] font-[600] text-[#1D1D1F] outline-none transition placeholder:text-[#A1A1AA] focus:border-[#174A9B]/30 focus:bg-white"
      />
    </label>
  );
}

function Select({ label, children, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-[700] uppercase tracking-[0.08em] text-[#86868B]">
        {label}
      </span>

      <select
        {...props}
        className="h-11 w-full rounded-[14px] border border-black/[0.06] bg-[#F8FAFC] px-4 text-[13px] font-[700] text-[#1D1D1F] outline-none transition focus:border-[#174A9B]/30 focus:bg-white"
      >
        {children}
      </select>
    </label>
  );
}

function Textarea({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-[700] uppercase tracking-[0.08em] text-[#86868B]">
        {label}
      </span>

      <textarea
        {...props}
        rows={5}
        className="w-full resize-none rounded-[14px] border border-black/[0.06] bg-[#F8FAFC] px-4 py-3 text-[13px] font-[600] text-[#1D1D1F] outline-none transition placeholder:text-[#A1A1AA] focus:border-[#174A9B]/30 focus:bg-white"
      />
    </label>
  );
}
