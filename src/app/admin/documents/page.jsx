"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import {
  IoCheckmarkCircleOutline,
  IoChevronBack,
  IoChevronForward,
  IoClose,
  IoDocumentTextOutline,
  IoEyeOutline,
  IoFilterOutline,
  IoPeopleOutline,
  IoRefreshOutline,
  IoSearchOutline,
  IoTimeOutline,
  IoWarningOutline,
} from "react-icons/io5";

import { getDocumentStats, getDocumentUsers } from "@/features/API";

const ROLE_OPTIONS = [
  {
    label: "All Users",
    value: "all",
  },
  {
    label: "Students",
    value: "student",
  },
  {
    label: "Teachers",
    value: "teacher",
  },
];

const STATUS_OPTIONS = [
  {
    label: "All Status",
    value: "all",
  },
  {
    label: "Has Pending",
    value: "pending",
  },
  {
    label: "Has Approved",
    value: "approved",
  },
  {
    label: "Has Rejected",
    value: "rejected",
  },
];

function getErrorMessage(error, fallback = "Something went wrong.") {
  return error?.response?.data?.message || error?.message || fallback;
}

function extractUsers(response) {
  const payload = response?.data?.data ?? response?.data;

  return {
    users: Array.isArray(payload?.users) ? payload.users : [],

    pagination: {
      page: Number(payload?.pagination?.page || 1),

      limit: Number(payload?.pagination?.limit || 10),

      total: Number(payload?.pagination?.total || 0),

      totalPages: Math.max(Number(payload?.pagination?.totalPages || 1), 1),
    },
  };
}

function extractStats(response) {
  const payload = response?.data?.data ?? response?.data;

  return {
    total: Number(payload?.total || 0),
    pending: Number(payload?.pending || 0),
    approved: Number(payload?.approved || 0),
    rejected: Number(payload?.rejected || 0),
  };
}

function formatDate(value) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function RoleBadge({ role }) {
  const className =
    role === "teacher"
      ? "border-violet-200 bg-violet-50 text-violet-700"
      : "border-blue-200 bg-blue-50 text-blue-700";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-black capitalize ${className}`}
    >
      {role}
    </span>
  );
}

function SummaryCard({
  label,
  value,
  icon: Icon,
  iconClassName,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        active ? "border-[#0D4598] ring-2 ring-blue-100" : "border-slate-200"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-2xl font-black text-slate-900">{value}</p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClassName}`}
        >
          <Icon className="text-xl" />
        </div>
      </div>
    </button>
  );
}

export default function AdminDocumentsPage() {
  const router = useRouter();

  const [users, setUsers] = useState([]);

  const [statistics, setStatistics] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const [filters, setFilters] = useState({
    search: "",
    role: "all",
    status: "all",
  });

  const [loading, setLoading] = useState(true);

  const [statsLoading, setStatsLoading] = useState(true);

  const [error, setError] = useState("");

  const activeFilterCount = useMemo(() => {
    let count = 0;

    if (filters.search.trim()) {
      count += 1;
    }

    if (filters.role !== "all") {
      count += 1;
    }

    if (filters.status !== "all") {
      count += 1;
    }

    return count;
  }, [filters]);

  const loadStatistics = useCallback(async () => {
    try {
      setStatsLoading(true);

      const response = await getDocumentStats();

      setStatistics(extractStats(response));
    } catch (requestError) {
      console.error("Statistics error:", requestError);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const loadUsers = useCallback(
    async (
      requestedPage = 1,
      requestedFilters = {
        search: "",
        role: "all",
        status: "all",
      },
    ) => {
      try {
        setLoading(true);
        setError("");

        const params = {
          page: requestedPage,
          limit: 10,
        };

        if (requestedFilters.search?.trim()) {
          params.search = requestedFilters.search.trim();
        }

        if (requestedFilters.role !== "all") {
          params.role = requestedFilters.role;
        }

        if (requestedFilters.status !== "all") {
          params.status = requestedFilters.status;
        }

        const response = await getDocumentUsers(params);

        const result = extractUsers(response);

        setUsers(result.users);
        setPagination(result.pagination);
      } catch (requestError) {
        setError(getErrorMessage(requestError, "Failed to load users."));
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    loadUsers(1, filters);
    loadStatistics();
  }, [loadStatistics, loadUsers]);

  function updateFilter(name, value) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  }

  function applyFilters(event) {
    event?.preventDefault();

    loadUsers(1, filters);
  }

  function resetFilters() {
    const clearedFilters = {
      search: "",
      role: "all",
      status: "all",
    };

    setFilters(clearedFilters);

    loadUsers(1, clearedFilters);
  }

  function filterByStatus(status) {
    const updatedFilters = {
      ...filters,
      status,
    };

    setFilters(updatedFilters);

    loadUsers(1, updatedFilters);
  }

  function viewUserDocuments(userId) {
    router.push(`/admin/documents/${userId}`);
  }

  const cards = [
    {
      key: "all",
      label: "All Documents",
      value: statistics.total,
      icon: IoDocumentTextOutline,
      iconClassName: "bg-blue-50 text-blue-700",
    },
    {
      key: "pending",
      label: "Pending",
      value: statistics.pending,
      icon: IoTimeOutline,
      iconClassName: "bg-amber-50 text-amber-600",
    },
    {
      key: "approved",
      label: "Approved",
      value: statistics.approved,
      icon: IoCheckmarkCircleOutline,
      iconClassName: "bg-emerald-50 text-emerald-600",
    },
    {
      key: "rejected",
      label: "Rejected",
      value: statistics.rejected,
      icon: IoWarningOutline,
      iconClassName: "bg-rose-50 text-rose-600",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F4F7FB] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0D4598]">
              Admin Panel / Documents
            </p>

            <h1 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
              User Document Verification
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Select a student or teacher to review all submitted documents in
              one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              loadUsers(pagination.page, filters);

              loadStatistics();
            }}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
          >
            <IoRefreshOutline
              className={`text-lg ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </header>

        {error ? (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
            <IoWarningOutline className="mt-0.5 shrink-0 text-xl" />

            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto"
            >
              <IoClose />
            </button>
          </div>
        ) : null}

        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <SummaryCard
              key={card.key}
              {...card}
              value={statsLoading ? "..." : card.value}
              active={filters.status === card.key}
              onClick={() => filterByStatus(card.key)}
            />
          ))}
        </section>

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="flex items-center gap-2 font-black text-slate-900">
                <IoFilterOutline className="text-xl text-[#0D4598]" />
                Filter users
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {activeFilterCount
                  ? `${activeFilterCount} active filter`
                  : "Search students and teachers."}
              </p>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-black text-[#0D4598]"
            >
              Clear filters
            </button>
          </div>

          <form
            onSubmit={applyFilters}
            className="grid gap-3 lg:grid-cols-[1fr_220px_220px_auto]"
          >
            <div className="relative">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400" />

              <input
                type="search"
                value={filters.search}
                onChange={(event) => updateFilter("search", event.target.value)}
                placeholder="Name, email or phone..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-semibold outline-none focus:border-[#0D4598]"
              />
            </div>

            <select
              value={filters.role}
              onChange={(event) => updateFilter("role", event.target.value)}
              className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold"
            >
              {ROLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={filters.status}
              onChange={(event) => updateFilter("status", event.target.value)}
              className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0D4598] px-5 text-sm font-black text-white hover:bg-[#083777]"
            >
              <IoSearchOutline />
              Apply
            </button>
          </form>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="font-black text-slate-900">
                Users with documents
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {pagination.total} users found
              </p>
            </div>

            <IoPeopleOutline className="text-2xl text-[#0D4598]" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-black uppercase tracking-[0.08em] text-slate-500">
                  <th className="px-5 py-3">User</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Documents</th>
                  <th className="px-5 py-3">Pending</th>
                  <th className="px-5 py-3">Approved</th>
                  <th className="px-5 py-3">Rejected</th>
                  <th className="px-5 py-3">Progress</th>
                  <th className="px-5 py-3">Last Upload</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-5 py-14 text-center font-bold text-slate-500"
                    >
                      <IoRefreshOutline className="mx-auto mb-2 animate-spin text-2xl text-[#0D4598]" />
                      Loading users...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-5 py-14 text-center font-bold text-slate-500"
                    >
                      No user document found.
                    </td>
                  </tr>
                ) : (
                  users.map((item) => {
                    const completion =
                      item.totalDocuments > 0
                        ? Math.round(
                            (item.approvedDocuments / item.totalDocuments) *
                              100,
                          )
                        : 0;

                    return (
                      <tr
                        key={item._id}
                        className="text-sm text-slate-600 hover:bg-slate-50/60"
                      >
                        <td className="px-5 py-4">
                          <p className="font-black text-slate-900">
                            {item.user?.name || "Unknown User"}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {item.user?.email || "-"}
                          </p>

                          {item.user?.phone ? (
                            <p className="mt-1 text-xs text-slate-400">
                              {item.user.phone}
                            </p>
                          ) : null}
                        </td>

                        <td className="px-5 py-4">
                          <RoleBadge role={item.user?.role} />
                        </td>

                        <td className="px-5 py-4 font-black text-slate-800">
                          {item.totalDocuments}
                        </td>

                        <td className="px-5 py-4 font-black text-amber-600">
                          {item.pendingDocuments}
                        </td>

                        <td className="px-5 py-4 font-black text-emerald-600">
                          {item.approvedDocuments}
                        </td>

                        <td className="px-5 py-4 font-black text-rose-600">
                          {item.rejectedDocuments}
                        </td>

                        <td className="px-5 py-4">
                          <div className="w-28">
                            <div className="mb-1 flex justify-between text-xs font-bold">
                              <span>{completion}%</span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-[#0D4598]"
                                style={{
                                  width: `${completion}%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          {formatDate(item.latestUpload)}
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => viewUserDocuments(item.user._id)}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#0D4598] px-4 py-2.5 text-xs font-black text-white hover:bg-[#083777]"
                          >
                            <IoEyeOutline className="text-base" />
                            View Documents
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 ? (
            <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
              <p className="text-sm font-bold text-slate-500">
                Page {pagination.page} of {pagination.totalPages}
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => loadUsers(pagination.page - 1, filters)}
                  disabled={loading || pagination.page <= 1}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-black disabled:opacity-40"
                >
                  <IoChevronBack />
                  Previous
                </button>

                <button
                  type="button"
                  onClick={() => loadUsers(pagination.page + 1, filters)}
                  disabled={loading || pagination.page >= pagination.totalPages}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-black disabled:opacity-40"
                >
                  Next
                  <IoChevronForward />
                </button>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
