"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaCar,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaSearch,
  FaSpinner,
  FaSyncAlt,
  FaTimes,
  FaTrashAlt,
  FaUndo,
} from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import {
  deleteAdminTeacherVehicle,
  getAdminTeacherVehicles,
  updateAdminTeacherVehicleApproval,
} from "@/features/API";
import getMediaUrl from "@/utils/getMediaUrl";

const PAGE_SIZE = 10;
const STATUS_OPTIONS = ["all", "pending", "approved", "rejected"];

const STATUS_STYLES = {
  approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  rejected: "border-rose-200 bg-rose-50 text-rose-700",
};

function getErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong. Please try again."
  );
}

function normalizeVehicle(vehicle) {
  return {
    ...vehicle,
    approvalStatus:
      vehicle?.approvalStatus ||
      (vehicle?.status === "active" ? "approved" : "pending"),
  };
}

function formatDate(date) {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminTeacherVehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadVehicles = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params =
        statusFilter === "all" ? {} : { approvalStatus: statusFilter };

      const response = await getAdminTeacherVehicles(params);
      const records = Array.isArray(response?.data?.data)
        ? response.data.data.map(normalizeVehicle)
        : [];

      setVehicles(records);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  useEffect(() => {
    if (!toast) return undefined;

    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const filteredVehicles = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return vehicles;

    return vehicles.filter((vehicle) => {
      const searchableText = [
        vehicle.vehicleName,
        vehicle.brand,
        vehicle.model,
        vehicle.registrationNumber,
        vehicle.vehicleType,
        vehicle.teacher?.name,
        vehicle.teacher?.email,
        vehicle.teacher?.phone,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [vehicles, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredVehicles.length / PAGE_SIZE),
  );

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const paginatedVehicles = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredVehicles.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredVehicles, currentPage]);

  const pageNumbers = useMemo(() => {
    const visiblePages = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + visiblePages - 1);

    start = Math.max(1, end - visiblePages + 1);

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }, [currentPage, totalPages]);

  const updateApproval = async (vehicle, approvalStatus) => {
    try {
      setActionId(vehicle._id);
      setError("");

      const response = await updateAdminTeacherVehicleApproval(
        vehicle._id,
        approvalStatus,
      );

      const updatedVehicle = normalizeVehicle(response?.data?.data || {});

      setVehicles((current) => {
        if (statusFilter !== "all" && statusFilter !== approvalStatus) {
          return current.filter((item) => item._id !== vehicle._id);
        }

        return current.map((item) =>
          item._id === vehicle._id ? { ...item, ...updatedVehicle } : item,
        );
      });

      setSelectedVehicle((current) =>
        current?._id === vehicle._id
          ? { ...current, ...updatedVehicle }
          : current,
      );

      setToast(
        approvalStatus === "approved"
          ? "Vehicle approved successfully."
          : "Vehicle moved back to pending.",
      );
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setActionId("");
    }
  };

  const deleteVehicle = async () => {
    if (!deleteTarget?._id) return;

    try {
      setActionId(deleteTarget._id);
      setError("");

      await deleteAdminTeacherVehicle(deleteTarget._id);

      setVehicles((current) =>
        current.filter((vehicle) => vehicle._id !== deleteTarget._id),
      );

      if (selectedVehicle?._id === deleteTarget._id) {
        setSelectedVehicle(null);
      }

      setDeleteTarget(null);
      setToast("Vehicle deleted successfully.");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setActionId("");
    }
  };

  const firstRecord =
    filteredVehicles.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;

  const lastRecord = Math.min(currentPage * PAGE_SIZE, filteredVehicles.length);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6">
      {toast && (
        <div className="fixed right-4 top-4 z-[100] rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Teacher Vehicles
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Review and manage vehicle submissions.
            </p>
          </div>

          <button
            type="button"
            onClick={loadVehicles}
            disabled={loading}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaSyncAlt className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search vehicle or teacher..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold capitalize text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status === "all" ? "All status" : status}
                  </option>
                ))}
              </select>

              <span className="hidden whitespace-nowrap text-sm text-slate-500 sm:inline">
                {filteredVehicles.length} records
              </span>
            </div>
          </div>

          {error && (
            <div className="m-4 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-700">
              <IoWarningOutline className="mt-0.5 shrink-0 text-lg" />
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="flex min-h-72 items-center justify-center">
              <FaSpinner className="animate-spin text-3xl text-blue-700" />
            </div>
          ) : filteredVehicles.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="hidden overflow-x-auto lg:block">
                <table className="min-w-full">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <th className="px-5 py-3">Vehicle</th>
                      <th className="px-5 py-3">Teacher</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3">Submitted</th>
                      <th className="px-5 py-3 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {paginatedVehicles.map((vehicle) => (
                      <VehicleTableRow
                        key={vehicle._id}
                        vehicle={vehicle}
                        busy={actionId === vehicle._id}
                        onView={() => setSelectedVehicle(vehicle)}
                        onApprove={() => updateApproval(vehicle, "approved")}
                        onDeapprove={() => updateApproval(vehicle, "pending")}
                        onDelete={() => setDeleteTarget(vehicle)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-3 p-3 lg:hidden">
                {paginatedVehicles.map((vehicle) => (
                  <VehicleMobileCard
                    key={vehicle._id}
                    vehicle={vehicle}
                    busy={actionId === vehicle._id}
                    onView={() => setSelectedVehicle(vehicle)}
                    onApprove={() => updateApproval(vehicle, "approved")}
                    onDeapprove={() => updateApproval(vehicle, "pending")}
                    onDelete={() => setDeleteTarget(vehicle)}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageNumbers={pageNumbers}
                firstRecord={firstRecord}
                lastRecord={lastRecord}
                totalRecords={filteredVehicles.length}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>

      {selectedVehicle && (
        <VehicleViewModal
          vehicle={selectedVehicle}
          busy={actionId === selectedVehicle._id}
          onClose={() => setSelectedVehicle(null)}
          onApprove={() => updateApproval(selectedVehicle, "approved")}
          onDeapprove={() => updateApproval(selectedVehicle, "pending")}
          onDelete={() => setDeleteTarget(selectedVehicle)}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          vehicle={deleteTarget}
          busy={actionId === deleteTarget._id}
          onClose={() => setDeleteTarget(null)}
          onConfirm={deleteVehicle}
        />
      )}
    </div>
  );
}

function VehicleTableRow({
  vehicle,
  busy,
  onView,
  onApprove,
  onDeapprove,
  onDelete,
}) {
  return (
    <tr className="text-sm text-slate-600 transition hover:bg-slate-50">
      <td className="px-5 py-4">
        <div className="flex min-w-56 items-center gap-3">
          <VehicleImage vehicle={vehicle} className="h-12 w-16 rounded-lg" />

          <div className="min-w-0">
            <p className="truncate font-semibold text-slate-900">
              {vehicle.brand || "N/A"} {vehicle.model || ""}
            </p>
            <p className="mt-1 truncate text-xs text-slate-500">
              {vehicle.registrationNumber || "No registration number"}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <p className="font-medium text-slate-800">
          {vehicle.teacher?.name || "Unknown teacher"}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          {vehicle.teacher?.email || "No email"}
        </p>
      </td>

      <td className="px-5 py-4">
        <StatusBadge status={vehicle.approvalStatus} />
      </td>

      <td className="px-5 py-4 text-sm text-slate-500">
        {formatDate(vehicle.createdAt)}
      </td>

      <td className="px-5 py-4">
        <ActionButtons
          vehicle={vehicle}
          busy={busy}
          onView={onView}
          onApprove={onApprove}
          onDeapprove={onDeapprove}
          onDelete={onDelete}
          alignRight
        />
      </td>
    </tr>
  );
}

function VehicleMobileCard({
  vehicle,
  busy,
  onView,
  onApprove,
  onDeapprove,
  onDelete,
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex gap-3">
        <VehicleImage
          vehicle={vehicle}
          className="h-20 w-24 shrink-0 rounded-lg"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate font-semibold text-slate-900">
                {vehicle.brand || "N/A"} {vehicle.model || ""}
              </h3>
              <p className="mt-1 truncate text-xs text-slate-500">
                {vehicle.registrationNumber || "N/A"}
              </p>
            </div>

            <StatusBadge status={vehicle.approvalStatus} />
          </div>

          <p className="mt-3 truncate text-sm font-medium text-slate-700">
            {vehicle.teacher?.name || "Unknown teacher"}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {formatDate(vehicle.createdAt)}
          </p>
        </div>
      </div>

      <ActionButtons
        vehicle={vehicle}
        busy={busy}
        onView={onView}
        onApprove={onApprove}
        onDeapprove={onDeapprove}
        onDelete={onDelete}
      />
    </article>
  );
}

function ActionButtons({
  vehicle,
  busy,
  onView,
  onApprove,
  onDeapprove,
  onDelete,
  alignRight = false,
}) {
  const approved = vehicle.approvalStatus === "approved";

  return (
    <div
      className={`mt-3 flex flex-wrap gap-2 lg:mt-0 ${
        alignRight ? "lg:justify-end" : ""
      }`}
    >
      <button
        type="button"
        onClick={onView}
        disabled={busy}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
      >
        <FaEye />
        View
      </button>

      {approved ? (
        <button
          type="button"
          onClick={onDeapprove}
          disabled={busy}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 text-xs font-semibold text-amber-700 transition hover:bg-amber-100 disabled:opacity-50"
        >
          {busy ? <FaSpinner className="animate-spin" /> : <FaUndo />}
          De-approve
        </button>
      ) : (
        <button
          type="button"
          onClick={onApprove}
          disabled={busy}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50"
        >
          {busy ? <FaSpinner className="animate-spin" /> : <FaCheck />}
          Approve
        </button>
      )}

      <button
        type="button"
        onClick={onDelete}
        disabled={busy}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:opacity-50"
      >
        <FaTrashAlt />
        Delete
      </button>
    </div>
  );
}

function StatusBadge({ status = "pending" }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${
        STATUS_STYLES[status] || STATUS_STYLES.pending
      }`}
    >
      {status}
    </span>
  );
}

function VehicleImage({ vehicle, className }) {
  const imageUrl = vehicle.vehicleImage
    ? getMediaUrl(vehicle.vehicleImage)
    : "";

  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [imageUrl]);

  if (!imageUrl || imageFailed) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-100 text-slate-400 ${className}`}
      >
        <FaCar />
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={vehicle.vehicleName || "Vehicle"}
      onError={() => setImageFailed(true)}
      className={`border border-slate-200 object-cover ${className}`}
    />
  );
}

function Pagination({
  currentPage,
  totalPages,
  pageNumbers,
  firstRecord,
  lastRecord,
  totalRecords,
  onPageChange,
}) {
  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Showing {firstRecord}-{lastRecord} of {totalRecords}
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous page"
        >
          <FaChevronLeft className="text-xs" />
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`h-9 min-w-9 rounded-lg px-2 text-sm font-semibold transition ${
              currentPage === page
                ? "bg-blue-700 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Next page"
        >
          <FaChevronRight className="text-xs" />
        </button>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center px-5 py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl text-slate-400">
        <FaCar />
      </div>
      <h3 className="mt-4 font-semibold text-slate-800">No vehicle found</h3>
      <p className="mt-1 text-sm text-slate-500">
        Try changing the search or status filter.
      </p>
    </div>
  );
}

function VehicleViewModal({
  vehicle,
  busy,
  onClose,
  onApprove,
  onDeapprove,
  onDelete,
}) {
  const approved = vehicle.approvalStatus === "approved";

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Vehicle Details
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {vehicle.brand || "N/A"} {vehicle.model || ""}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-5">
          <VehicleImage
            vehicle={vehicle}
            className="h-56 w-full rounded-xl sm:h-72"
          />

          <div className="mt-4">
            <StatusBadge status={vehicle.approvalStatus} />
          </div>

          <div className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            <Detail label="Teacher" value={vehicle.teacher?.name} />
            <Detail label="Teacher email" value={vehicle.teacher?.email} />
            <Detail label="Teacher phone" value={vehicle.teacher?.phone} />
            <Detail label="Registration" value={vehicle.registrationNumber} />
            <Detail
              label="Vehicle type"
              value={vehicle.vehicleType}
              capitalize
            />
            <Detail label="Model year" value={vehicle.modelYear} />
            <Detail label="Submitted" value={formatDate(vehicle.createdAt)} />
            <Detail label="Approved" value={formatDate(vehicle.approvedAt)} />
          </div>

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onDelete}
              disabled={busy}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-rose-200 px-4 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 disabled:opacity-50"
            >
              <FaTrashAlt />
              Delete
            </button>

            <button
              type="button"
              onClick={approved ? onDeapprove : onApprove}
              disabled={busy}
              className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-white transition disabled:opacity-50 ${
                approved
                  ? "bg-amber-500 hover:bg-amber-600"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {busy ? (
                <FaSpinner className="animate-spin" />
              ) : approved ? (
                <FaUndo />
              ) : (
                <FaCheck />
              )}
              {approved ? "De-approve" : "Approve"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value, capitalize = false }) {
  return (
    <div className="border-b border-slate-100 pb-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p
        className={`mt-1 break-words text-sm font-medium text-slate-800 ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value || "N/A"}
      </p>
    </div>
  );
}

function DeleteModal({ vehicle, busy, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/55 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
        <h2 className="text-lg font-bold text-slate-900">Delete vehicle?</h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          This will permanently delete{" "}
          <span className="font-semibold text-slate-700">
            {vehicle.brand || "this"} {vehicle.model || "vehicle"}
          </span>
          .
        </p>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-rose-600 px-4 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50"
          >
            {busy ? <FaSpinner className="animate-spin" /> : <FaTrashAlt />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
