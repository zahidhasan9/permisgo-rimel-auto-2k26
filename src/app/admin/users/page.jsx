"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaBan,
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
  FaEye,
  FaExclamationTriangle,
  FaPhoneAlt,
  FaSearch,
  FaSyncAlt,
  FaTimes,
  FaTrashAlt,
  FaUserClock,
  FaUsers,
} from "react-icons/fa";
import {
  deleteAdminUser,
  getAdminUsers,
  updateUserRole,
  updateUserStatus,
} from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const PAGE_SIZE = 20;
const roleOptions = ["all", "student", "teacher", "admin"];
const statusOptions = ["all", "active", "inactive", "blocked"];

const roleStyles = {
  admin: "border-violet-200 bg-violet-50 text-violet-700",
  teacher: "border-sky-200 bg-sky-50 text-sky-700",
  student: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const statusStyles = {
  active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  inactive: "border-amber-200 bg-amber-50 text-amber-700",
  blocked: "border-rose-200 bg-rose-50 text-rose-700",
};

function getMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong. Please try again."
  );
}

function getInitials(name = "User") {
  return String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(date) {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getPaginationItems(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items = [1];

  if (currentPage > 4) items.push("left-ellipsis");

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let page = start; page <= end; page += 1) {
    items.push(page);
  }

  if (currentPage < totalPages - 3) items.push("right-ellipsis");

  items.push(totalPages);
  return items;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 1,
    stats: {
      total: 0,
      active: 0,
      inactive: 0,
      blocked: 0,
    },
  });
  const [filters, setFilters] = useState({
    search: "",
    role: "all",
    status: "all",
  });

  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchUsers = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        setError("");

        const params = {
          page,
          limit: PAGE_SIZE,
        };

        if (filters.search.trim()) params.search = filters.search.trim();
        if (filters.role !== "all") params.role = filters.role;
        if (filters.status !== "all") params.status = filters.status;

        const response = await getAdminUsers(params);
        const responseUsers = Array.isArray(response?.data?.data)
          ? response.data.data
          : [];
        const responseMeta = response?.data?.meta || {};
        const responseStats = responseMeta?.stats || {};

        setUsers(responseUsers);
        setMeta({
          page: Number(responseMeta.page) || page,
          limit: Number(responseMeta.limit) || PAGE_SIZE,
          total: Number(responseMeta.total) || 0,
          totalPages: Math.max(Number(responseMeta.totalPages) || 1, 1),
          stats: {
            total: Number(responseStats.total) || 0,
            active: Number(responseStats.active) || 0,
            inactive: Number(responseStats.inactive) || 0,
            blocked: Number(responseStats.blocked) || 0,
          },
        });
      } catch (requestError) {
        setError(getMessage(requestError));
      } finally {
        setLoading(false);
      }
    },
    [filters],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(1);
    }, 350);

    return () => clearTimeout(timer);
  }, [fetchUsers]);

  useEffect(() => {
    if (!toast) return undefined;

    const timer = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const hasActiveFilters =
    Boolean(filters.search.trim()) ||
    filters.role !== "all" ||
    filters.status !== "all";

  const currentPage = Math.min(meta.page, meta.totalPages);
  const paginationItems = useMemo(
    () => getPaginationItems(currentPage, meta.totalPages),
    [currentPage, meta.totalPages],
  );

  const recordStart = meta.total > 0 ? (currentPage - 1) * meta.limit + 1 : 0;
  const recordEnd =
    meta.total > 0 ? Math.min(currentPage * meta.limit, meta.total) : 0;

  const updateFilter = (field, value) => {
    setFilters((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      role: "all",
      status: "all",
    });
  };

  const handleRoleChange = async (userId, role) => {
    try {
      setActionId(userId);
      setError("");
      await updateUserRole(userId, role);
      setToast("User role updated.");
      await fetchUsers(currentPage);
    } catch (requestError) {
      setError(getMessage(requestError));
    } finally {
      setActionId("");
    }
  };

  const handleStatusChange = async (userId, status) => {
    try {
      setActionId(userId);
      setError("");
      await updateUserStatus(userId, status);
      setToast("User status updated.");
      await fetchUsers(currentPage);
    } catch (requestError) {
      setError(getMessage(requestError));
    } finally {
      setActionId("");
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteTarget?._id) return;

    try {
      setActionId(deleteTarget._id);
      setError("");

      await deleteAdminUser(deleteTarget._id);

      const nextPage =
        users.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;

      setDeleteTarget(null);
      setToast("User deleted successfully.");
      await fetchUsers(nextPage);
    } catch (requestError) {
      setError(getMessage(requestError));
    } finally {
      setActionId("");
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-5 md:px-6 lg:px-8">
      {toast && (
        <div className="fixed right-4 top-4 z-[70] rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-700 shadow-lg">
          {toast}
        </div>
      )}

      <div className="mx-auto max-w-[1450px]">
        <header className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                User Management
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage registered users and account access.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <SummaryItem
                icon={FaUsers}
                label="Total"
                value={meta.stats.total}
              />
              <SummaryItem
                icon={FaCheckCircle}
                label="Active"
                value={meta.stats.active}
                tone="emerald"
              />
              <SummaryItem
                icon={FaUserClock}
                label="Inactive"
                value={meta.stats.inactive}
                tone="amber"
              />
              <SummaryItem
                icon={FaBan}
                label="Blocked"
                value={meta.stats.blocked}
                tone="rose"
              />
            </div>
          </div>
        </header>

        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[minmax(260px,1fr)_170px_170px_auto_auto]">
            <label className="relative block">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />
              <input
                type="search"
                value={filters.search}
                onChange={(event) => updateFilter("search", event.target.value)}
                placeholder="Search name, email or phone"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
              />
            </label>

            <select
              value={filters.role}
              onChange={(event) => updateFilter("role", event.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold capitalize text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
            >
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role === "all" ? "All roles" : role}
                </option>
              ))}
            </select>

            <select
              value={filters.status}
              onChange={(event) => updateFilter("status", event.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold capitalize text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === "all" ? "All statuses" : status}
                </option>
              ))}
            </select>

            {hasActiveFilters ? (
              <button
                type="button"
                onClick={resetFilters}
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Clear
              </button>
            ) : (
              <div className="hidden lg:block" />
            )}

            <button
              type="button"
              onClick={() => fetchUsers(currentPage)}
              disabled={loading}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaSyncAlt className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            <FaExclamationTriangle className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="font-bold text-slate-900">Users</h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Showing {recordStart}-{recordEnd} of {meta.total}
              </p>
            </div>

            <span className="text-sm font-semibold text-slate-500">
              Page {currentPage} of {meta.totalPages}
            </span>
          </div>

          {loading ? (
            <LoadingState />
          ) : users.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[1000px] text-left">
                  <thead className="border-b border-slate-100 bg-slate-50">
                    <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <th className="px-5 py-3.5">User</th>
                      <th className="px-5 py-3.5">Contact</th>
                      <th className="px-5 py-3.5">Role</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5">Joined</th>
                      <th className="px-5 py-3.5 text-right">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {users.map((user) => (
                      <UserTableRow
                        key={user._id}
                        user={user}
                        busy={actionId === user._id}
                        onRoleChange={(role) =>
                          handleRoleChange(user._id, role)
                        }
                        onStatusChange={(status) =>
                          handleStatusChange(user._id, status)
                        }
                        onViewHref={`/admin/users/${user._id}`}
                        onDelete={() => setDeleteTarget(user)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-3 p-3 lg:hidden">
                {users.map((user) => (
                  <UserMobileCard
                    key={user._id}
                    user={user}
                    busy={actionId === user._id}
                    onRoleChange={(role) => handleRoleChange(user._id, role)}
                    onStatusChange={(status) =>
                      handleStatusChange(user._id, status)
                    }
                    onViewHref={`/admin/users/${user._id}`}
                    onDelete={() => setDeleteTarget(user)}
                  />
                ))}
              </div>
            </>
          )}

          {!loading && users.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={meta.totalPages}
              items={paginationItems}
              onPageChange={fetchUsers}
            />
          )}
        </div>
      </div>

      {deleteTarget && (
        <DeleteModal
          user={deleteTarget}
          busy={actionId === deleteTarget._id}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDeleteUser}
        />
      )}
    </section>
  );
}

function SummaryItem({ icon: Icon, label, value, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-700",
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-700",
  };

  return (
    <div className="flex min-w-[125px] items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          tones[tone] || tones.slate
        }`}
      >
        <Icon className="text-sm" />
      </span>
      <span>
        <span className="block text-xs font-medium text-slate-500">
          {label}
        </span>
        <span className="block text-lg font-bold leading-5 text-slate-900">
          {value}
        </span>
      </span>
    </div>
  );
}

function UserTableRow({
  user,
  busy,
  onRoleChange,
  onStatusChange,
  onViewHref,
  onDelete,
}) {
  return (
    <tr className="text-sm text-slate-600 transition hover:bg-slate-50/70">
      <td className="px-5 py-4">
        <UserIdentity user={user} />
      </td>

      <td className="px-5 py-4">
        <div className="space-y-1">
          <p className="flex items-center gap-2">
            <FaEnvelope className="shrink-0 text-xs text-slate-300" />
            <span className="max-w-[230px] truncate">
              {user.email || "No email"}
            </span>
          </p>
          <p className="flex items-center gap-2 text-xs text-slate-500">
            <FaPhoneAlt className="shrink-0 text-slate-300" />
            {user.phone || "No phone"}
          </p>
        </div>
      </td>

      <td className="px-5 py-4">
        <RoleSelect
          value={user.role || "student"}
          disabled={busy}
          onChange={onRoleChange}
        />
      </td>

      <td className="px-5 py-4">
        <StatusSelect
          value={user.status || "active"}
          disabled={busy}
          onChange={onStatusChange}
        />
      </td>

      <td className="px-5 py-4">
        <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm">
          <FaCalendarAlt className="text-xs text-slate-300" />
          {formatDate(user.createdAt)}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center justify-end gap-2">
          <ViewButton href={onViewHref} />
          <DeleteButton busy={busy} onClick={onDelete} />
        </div>
      </td>
    </tr>
  );
}

function UserMobileCard({
  user,
  busy,
  onRoleChange,
  onStatusChange,
  onViewHref,
  onDelete,
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4">
      <UserIdentity user={user} />

      <div className="mt-4 space-y-2 border-y border-slate-100 py-3 text-sm text-slate-600">
        <p className="flex items-center gap-2 break-all">
          <FaEnvelope className="shrink-0 text-xs text-slate-300" />
          {user.email || "No email"}
        </p>
        <p className="flex items-center gap-2">
          <FaPhoneAlt className="shrink-0 text-xs text-slate-300" />
          {user.phone || "No phone"}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <label>
          <span className="mb-1.5 block text-xs font-semibold text-slate-500">
            Role
          </span>
          <RoleSelect
            value={user.role || "student"}
            disabled={busy}
            onChange={onRoleChange}
            fullWidth
          />
        </label>

        <label>
          <span className="mb-1.5 block text-xs font-semibold text-slate-500">
            Status
          </span>
          <StatusSelect
            value={user.status || "active"}
            disabled={busy}
            onChange={onStatusChange}
            fullWidth
          />
        </label>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="flex items-center gap-2 text-xs text-slate-500">
          <FaCalendarAlt className="text-slate-300" />
          {formatDate(user.createdAt)}
        </span>
        <div className="flex items-center gap-2">
          <ViewButton href={onViewHref} />
          <DeleteButton busy={busy} onClick={onDelete} />
        </div>
      </div>
    </article>
  );
}

function UserIdentity({ user }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <UserAvatar user={user} />

      <div className="min-w-0">
        <p className="truncate font-semibold text-slate-900">
          {user.name || "Unnamed user"}
        </p>
        <p className="mt-0.5 truncate text-xs capitalize text-slate-500">
          {user.role || "No role"}
        </p>
      </div>
    </div>
  );
}

function UserAvatar({ user }) {
  const [failed, setFailed] = useState(false);
  const src = user?.avatar ? mediaUrl(user.avatar) : "";

  if (!src || failed) {
    return (
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
        {getInitials(user?.name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={user?.name || "User profile"}
      onError={() => setFailed(true)}
      className="h-11 w-11 shrink-0 rounded-full border border-slate-200 bg-slate-100 object-cover"
    />
  );
}

function RoleSelect({ value, disabled, onChange, fullWidth = false }) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
      className={`h-9 rounded-lg border px-2.5 text-xs font-semibold capitalize outline-none transition focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-60 ${
        fullWidth ? "w-full" : "w-28"
      } ${roleStyles[value] || "border-slate-200 bg-slate-50 text-slate-700"}`}
    >
      <option value="student">Student</option>
      <option value="teacher">Teacher</option>
      <option value="admin">Admin</option>
    </select>
  );
}

function StatusSelect({ value, disabled, onChange, fullWidth = false }) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
      className={`h-9 rounded-lg border px-2.5 text-xs font-semibold capitalize outline-none transition focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-60 ${
        fullWidth ? "w-full" : "w-28"
      } ${
        statusStyles[value] || "border-slate-200 bg-slate-50 text-slate-700"
      }`}
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
      <option value="blocked">Blocked</option>
    </select>
  );
}

function ViewButton({ href }) {
  return (
    <Link
      href={href}
      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
    >
      <FaEye />
      View
    </Link>
  );
}

function DeleteButton({ busy, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-rose-200 bg-white px-3 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {busy ? <FaSyncAlt className="animate-spin" /> : <FaTrashAlt />}
      Delete
    </button>
  );
}

function Pagination({ currentPage, totalPages, items, onPageChange }) {
  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Page <span className="font-semibold text-slate-800">{currentPage}</span>{" "}
        of <span className="font-semibold text-slate-800">{totalPages}</span>
      </p>

      <div className="flex flex-wrap items-center gap-1.5">
        <PaginationButton
          label={<FaChevronLeft />}
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          ariaLabel="Previous page"
        />

        {items.map((item) =>
          typeof item === "number" ? (
            <PaginationButton
              key={item}
              label={item}
              active={item === currentPage}
              onClick={() => onPageChange(item)}
              ariaLabel={`Page ${item}`}
            />
          ) : (
            <span
              key={item}
              className="flex h-9 min-w-7 items-center justify-center text-sm text-slate-400"
            >
              ...
            </span>
          ),
        )}

        <PaginationButton
          label={<FaChevronRight />}
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          ariaLabel="Next page"
        />
      </div>
    </div>
  );
}

function PaginationButton({
  label,
  onClick,
  active = false,
  disabled = false,
  ariaLabel,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

function LoadingState() {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-3">
      <FaSyncAlt className="animate-spin text-2xl text-slate-500" />
      <p className="text-sm font-medium text-slate-500">Loading users...</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center p-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-500">
        <FaUsers />
      </div>
      <h3 className="mt-4 font-bold text-slate-900">No users found</h3>
      <p className="mt-1 text-sm text-slate-500">
        Try changing the search or filter.
      </p>
    </div>
  );
}

function DeleteModal({ user, busy, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Delete user?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              <span className="font-semibold text-slate-800">
                {user.name || "This user"}
              </span>{" "}
              will be permanently removed.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            aria-label="Close"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? <FaSyncAlt className="animate-spin" /> : <FaTrashAlt />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
