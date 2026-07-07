"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FaBookOpen,
  FaCheckCircle,
  FaClock,
  FaEdit,
  FaExclamationTriangle,
  FaFilter,
  FaLayerGroup,
  FaPlus,
  FaRegStar,
  FaSearch,
  FaSyncAlt,
  FaTimes,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa";
import { MdOutlineQuiz } from "react-icons/md";
import {
  getAdminLearningContents,
  getAdminQuizzes,
  updateLearningContent,
} from "@/features/API";

const contentTypes = [
  { value: "road-sign", label: "Road Signs" },
  { value: "code-ebook", label: "Code eBook" },
  { value: "knowledge-sheet", label: "Knowledge Sheets" },
  { value: "live-replay", label: "Live Replays" },
];

const statusFilters = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "inactive", label: "Inactive" },
];

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

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function AdminLearningContentListPage() {
  const [contents, setContents] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState("");

  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [notice, setNotice] = useState({
    show: false,
    type: "info",
    message: "",
  });

  const safeContents = useMemo(
    () => (Array.isArray(contents) ? contents : []),
    [contents],
  );

  const safeQuizzes = useMemo(
    () => (Array.isArray(quizzes) ? quizzes : []),
    [quizzes],
  );

  const stats = useMemo(() => {
    return {
      total: safeContents.length,
      active: safeContents.filter((item) => item.status === "active").length,
      draft: safeContents.filter((item) => item.status === "draft").length,
      inactive: safeContents.filter((item) => item.status === "inactive")
        .length,
      quizLinked: safeContents.filter((item) => item.relatedQuiz).length,
    };
  }, [safeContents]);

  const filteredContents = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    const filtered = safeContents.filter((item) => {
      const status = String(item.status || "").toLowerCase();

      const matchedStatus =
        filterStatus === "all" ? true : status === filterStatus;

      const matchedSearch = !keyword
        ? true
        : [
            item.title,
            item.subtitle,
            item.type,
            item.category,
            item.status,
            item.topicCode,
            item.difficulty,
            Array.isArray(item.tags) ? item.tags.join(" ") : item.tags,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(keyword);

      return matchedStatus && matchedSearch;
    });

    return [...filtered].sort((a, b) => {
      const orderA = Number(a.order || 0);
      const orderB = Number(b.order || 0);

      if (orderA !== orderB) return orderA - orderB;

      return (
        new Date(b.updatedAt || b.createdAt || 0) -
        new Date(a.updatedAt || a.createdAt || 0)
      );
    });
  }, [safeContents, searchTerm, filterStatus]);

  const showNotice = (type, message) => {
    setNotice({
      show: true,
      type,
      message,
    });
  };

  const fetchContents = async () => {
    try {
      setLoading(true);

      const params = {};
      if (filterType) params.type = filterType;

      const res = await getAdminLearningContents(params);

      const contentList = getArrayFromResponse(res, [
        "contents",
        "learningContents",
        "learningContent",
        "data",
      ]);

      setContents(contentList);
    } catch (error) {
      console.log("Content Load Error:", error);
      setContents([]);

      showNotice(
        "error",
        error?.response?.data?.message ||
          "Unable to load learning content. Please try again.",
      );
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
    fetchContents();
  }, [filterType]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const getTypeLabel = (value) => {
    return (
      contentTypes.find((type) => type.value === value)?.label || value || "-"
    );
  };

  const getQuizTitle = (relatedQuiz) => {
    if (!relatedQuiz) return "No quiz linked";

    if (typeof relatedQuiz === "object") {
      return relatedQuiz.title || relatedQuiz.name || "Quiz linked";
    }

    const foundQuiz = safeQuizzes.find(
      (quiz) => quiz._id === relatedQuiz || quiz.id === relatedQuiz,
    );

    return foundQuiz?.title || foundQuiz?.name || "Quiz linked";
  };

  const handleStatusChange = async (item, nextStatus) => {
    const id = item._id || item.id;
    const currentStatus = String(item.status || "draft").toLowerCase();

    if (!id) {
      showNotice("error", "A valid content ID was not found for this content.");
      return;
    }

    try {
      setActionLoadingId(id);

      const formData = new FormData();
      formData.append("status", nextStatus);

      await updateLearningContent(id, formData);
      await fetchContents();

      showNotice(
        "success",
        `Content status has been changed from ${currentStatus} to ${nextStatus}.`,
      );
    } catch (error) {
      console.log("Status Update Error:", error);

      showNotice(
        "error",
        error?.response?.data?.message ||
          "Unable to update content status. Please try again.",
      );
    } finally {
      setActionLoadingId("");
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f6fb] px-4 py-5 text-[#1D1D1F] md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1360px]">
        <header className="mb-4 rounded-[20px] border border-black/[0.06] bg-white px-5 py-4 shadow-[0_8px_24px_rgba(16,24,40,0.04)]">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold text-[#86868B]">
                <span>Admin</span>
                <span>/</span>
                <span className="text-[#174A9B]">Learning Content</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-[#E8EEF8] text-[#174A9B]">
                  <FaBookOpen className="text-[18px]" />
                </div>

                <div className="min-w-0">
                  <h1 className="text-[24px] font-[700] leading-tight tracking-[-0.03em] text-[#1D1D1F]">
                    Learning Content
                  </h1>

                  <p className="mt-1 max-w-3xl text-[13px] font-medium leading-5 text-[#6D6F76]">
                    Manage road signs, code eBook, knowledge sheets and live
                    replay content in one clean list.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={fetchContents}
                disabled={loading}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-[12px] border border-black/[0.06] bg-white px-4 text-[12px] font-[700] text-[#174A9B] transition hover:bg-[#F8FAFC] disabled:opacity-60"
              >
                <FaSyncAlt className={loading ? "animate-spin" : ""} />
                Refresh
              </button>

              <Link
                href="/admin/learning-content/create"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-[12px] bg-[#174A9B] px-4 text-[12px] font-[700] text-white transition hover:bg-[#123c80]"
              >
                <FaPlus />
                Create Content
              </Link>
            </div>
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

        <section className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-5">
          <StatCard label="Total" value={stats.total} icon={FaLayerGroup} />

          <StatCard
            label="Active"
            value={stats.active}
            icon={FaCheckCircle}
            tone="green"
          />

          <StatCard
            label="Draft"
            value={stats.draft}
            icon={FaClock}
            tone="amber"
          />

          <StatCard
            label="Inactive"
            value={stats.inactive}
            icon={FaToggleOff}
            tone="red"
          />

          <StatCard
            label="Quiz Linked"
            value={stats.quizLinked}
            icon={MdOutlineQuiz}
            tone="blue"
          />
        </section>

        <section className="rounded-[20px] border border-black/[0.06] bg-white shadow-[0_8px_24px_rgba(16,24,40,0.04)]">
          <div className="border-b border-black/[0.06] px-5 py-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-[17px] font-[700] leading-none text-[#1D1D1F]">
                  All Learning Content
                </h2>

                <p className="mt-2 text-[12px] font-medium leading-5 text-[#86868B]">
                  Search, filter, edit, activate or inactive content from this
                  table.
                </p>
              </div>

              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <div className="relative">
                  <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-[#A1A1AA]" />

                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search content..."
                    className="h-10 w-full rounded-[12px] border border-black/[0.06] bg-[#F8FAFC] pl-9 pr-3 text-[12px] font-[600] text-[#1D1D1F] outline-none transition placeholder:text-[#A1A1AA] focus:border-[#174A9B]/30 focus:bg-white md:w-[240px]"
                  />
                </div>

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="h-10 rounded-[12px] border border-black/[0.06] bg-[#F8FAFC] px-3 text-[12px] font-[700] text-[#1D1D1F] outline-none transition focus:border-[#174A9B]/30 focus:bg-white"
                >
                  <option value="">All Types</option>

                  {contentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 text-[12px] font-[700] text-[#6D6F76]">
                <FaFilter className="text-[11px]" />
                Status:
              </span>

              {statusFilters.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFilterStatus(item.value)}
                  className={`h-8 rounded-full px-3 text-[11px] font-[700] transition ${
                    filterStatus === item.value
                      ? "bg-[#174A9B] text-white"
                      : "bg-[#F1F5F9] text-[#6D6F76] hover:bg-[#E8EEF8] hover:text-[#174A9B]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {filteredContents.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] text-left">
                  <thead className="bg-[#F8FAFC] text-[11px] uppercase tracking-[0.06em] text-[#86868B]">
                    <tr>
                      <th className="px-5 py-3 font-[700]">Content</th>
                      <th className="px-4 py-3 font-[700]">Type</th>
                      <th className="px-4 py-3 font-[700]">Quiz</th>
                      <th className="px-4 py-3 font-[700]">Status</th>
                      <th className="px-4 py-3 font-[700]">Updated</th>
                      <th className="px-5 py-3 text-right font-[700]">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-black/[0.05]">
                    {filteredContents.map((item) => {
                      const id = item._id || item.id;
                      const status = String(
                        item.status || "draft",
                      ).toLowerCase();
                      const isInactive = status === "inactive";
                      const nextStatus = isInactive ? "active" : "inactive";

                      const tags = Array.isArray(item.tags)
                        ? item.tags
                        : String(item.tags || "")
                            .split(",")
                            .map((tag) => tag.trim())
                            .filter(Boolean);

                      return (
                        <tr
                          key={id}
                          className="bg-white transition hover:bg-[#F8FAFC]"
                        >
                          <td className="px-5 py-4">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="max-w-[360px] truncate text-[14px] font-[700] text-[#1D1D1F]">
                                  {item.title || "Untitled Content"}
                                </p>

                                {item.isFeatured ? (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF7E6] px-2 py-0.5 text-[10px] font-[700] text-[#B7791F]">
                                    <FaRegStar className="text-[9px]" />
                                    Featured
                                  </span>
                                ) : null}
                              </div>

                              <p className="mt-1 max-w-[420px] truncate text-[12px] font-medium text-[#86868B]">
                                {item.subtitle ||
                                  item.description ||
                                  "No description added"}
                              </p>

                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {item.topicCode ? (
                                  <MiniBadge text={`Topic ${item.topicCode}`} />
                                ) : null}

                                <MiniBadge text={`Order ${item.order || 0}`} />

                                {tags.slice(0, 2).map((tag) => (
                                  <MiniBadge key={tag} text={`#${tag}`} />
                                ))}
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <div>
                              <span className="inline-flex rounded-full bg-[#E8EEF8] px-3 py-1 text-[11px] font-[700] text-[#174A9B]">
                                {getTypeLabel(item.type)}
                              </span>

                              <p className="mt-2 max-w-[170px] truncate text-[12px] font-[600] text-[#86868B]">
                                {item.category || "No category"}
                              </p>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <p className="max-w-[190px] truncate text-[12px] font-[700] text-[#1D1D1F]">
                              {getQuizTitle(item.relatedQuiz)}
                            </p>

                            <p className="mt-1 text-[11px] font-[600] text-[#86868B]">
                              {item.relatedQuiz ? "Connected" : "Not connected"}
                            </p>
                          </td>

                          <td className="px-4 py-4">
                            <div className="space-y-2">
                              <StatusBadge status={item.status} />
                              <DifficultyBadge difficulty={item.difficulty} />
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <p className="text-[12px] font-[700] text-[#1D1D1F]">
                              {formatDate(item.updatedAt || item.createdAt)}
                            </p>

                            <p className="mt-1 text-[11px] font-[600] text-[#86868B]">
                              Created {formatDate(item.createdAt)}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex justify-end gap-2">
                              <Link
                                href={`/admin/learning-content/edit/${id}`}
                                className="inline-flex h-9 items-center gap-1.5 rounded-[10px] bg-[#E8EEF8] px-3 text-[11px] font-[700] text-[#174A9B] transition hover:bg-[#dbe6f7]"
                              >
                                <FaEdit />
                                Edit
                              </Link>

                              <button
                                type="button"
                                disabled={actionLoadingId === id}
                                onClick={() =>
                                  handleStatusChange(item, nextStatus)
                                }
                                className={`inline-flex h-9 items-center gap-1.5 rounded-[10px] px-3 text-[11px] font-[700] transition disabled:cursor-not-allowed disabled:opacity-60 ${
                                  isInactive
                                    ? "bg-[#ECFDF3] text-[#027A48] hover:bg-[#D1FADF]"
                                    : "bg-[#FEF3F2] text-[#B42318] hover:bg-[#FEE4E2]"
                                }`}
                              >
                                {isInactive ? <FaToggleOn /> : <FaToggleOff />}
                                {actionLoadingId === id
                                  ? "Updating..."
                                  : isInactive
                                    ? "Activate"
                                    : "Inactive"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value, icon: Icon, tone = "blue" }) {
  const toneClass =
    tone === "green"
      ? "bg-[#ECFDF3] text-[#027A48]"
      : tone === "red"
        ? "bg-[#FEF3F2] text-[#B42318]"
        : tone === "amber"
          ? "bg-[#FFFAEB] text-[#B54708]"
          : "bg-[#E8EEF8] text-[#174A9B]";

  return (
    <div className="rounded-[16px] border border-black/[0.06] bg-white px-4 py-4 shadow-[0_6px_18px_rgba(16,24,40,0.035)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-[700] uppercase tracking-[0.08em] text-[#86868B]">
            {label}
          </p>

          <p className="mt-2 text-[24px] font-[700] leading-none tracking-[-0.03em] text-[#1D1D1F]">
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-[12px] ${toneClass}`}
        >
          <Icon className="text-[16px]" />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const normalized = String(status || "draft").toLowerCase();

  const className =
    normalized === "active"
      ? "bg-[#ECFDF3] text-[#027A48]"
      : normalized === "inactive"
        ? "bg-[#FEF3F2] text-[#B42318]"
        : "bg-[#FFFAEB] text-[#B54708]";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[10px] font-[700] uppercase leading-none ${className}`}
    >
      {normalized}
    </span>
  );
}

function DifficultyBadge({ difficulty }) {
  const normalized = String(difficulty || "beginner").toLowerCase();

  const className =
    normalized === "hard"
      ? "bg-[#FEF3F2] text-[#B42318]"
      : normalized === "medium"
        ? "bg-[#FFFAEB] text-[#B54708]"
        : normalized === "exam-focus"
          ? "bg-[#F4F3FF] text-[#5925DC]"
          : "bg-[#E8EEF8] text-[#174A9B]";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[10px] font-[700] uppercase leading-none ${className}`}
    >
      {normalized}
    </span>
  );
}

function MiniBadge({ text }) {
  return (
    <span className="rounded-full bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-[700] text-[#6D6F76]">
      {text}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[330px] items-center justify-center bg-white px-4 py-10">
      <div className="max-w-sm text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#E8EEF8] text-[#174A9B]">
          <FaLayerGroup className="text-xl" />
        </div>

        <h3 className="text-[16px] font-[700] text-[#1D1D1F]">
          No content found
        </h3>

        <p className="mt-2 text-[13px] font-medium leading-6 text-[#86868B]">
          Clear the search/filter or add new content using the Create Content
          button.
        </p>
      </div>
    </div>
  );
}
