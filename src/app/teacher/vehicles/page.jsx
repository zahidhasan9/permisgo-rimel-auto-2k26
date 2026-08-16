"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaCar,
  FaCheckCircle,
  FaChevronLeft,
  FaClock,
  FaPen,
  FaPlus,
  FaSpinner,
} from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import {
  IoClose,
  IoInformationCircle,
  IoWarningOutline,
} from "react-icons/io5";
import {
  createTeacherVehicle,
  getMyTeacherVehicles,
  updateTeacherVehicle,
} from "@/features/API";
import getMediaUrl from "@/utils/getMediaUrl";

const MAX_VEHICLES = 2;

const EMPTY_FORM = {
  brand: "",
  model: "",
  modelYear: "",
  registrationNumber: "",
  vehicleType: "",
  isDefault: false,
};

const approvalStyles = {
  approved: {
    label: "Approved",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: FaCheckCircle,
  },
  rejected: {
    label: "Rejected",
    className: "border-rose-200 bg-rose-50 text-rose-700",
    icon: IoWarningOutline,
  },
  pending: {
    label: "Pending approval",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: FaClock,
  },
};

function getErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong. Please try again."
  );
}

function normalizeVehicle(vehicle) {
  const approvalStatus =
    vehicle?.approvalStatus ||
    (vehicle?.status === "active" ? "approved" : "pending");

  return {
    ...vehicle,
    approvalStatus,
  };
}

export default function VehiclesPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [modalVehicle, setModalVehicle] = useState(undefined);

  const loadVehicles = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getMyTeacherVehicles();
      const responseVehicles = Array.isArray(response?.data?.data)
        ? response.data.data.map(normalizeVehicle)
        : [];
      setVehicles(responseVehicles);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  useEffect(() => {
    if (!success) return undefined;
    const timer = setTimeout(() => setSuccess(""), 3000);
    return () => clearTimeout(timer);
  }, [success]);

  const canAddVehicle = vehicles.length < MAX_VEHICLES;

  const approvedCount = useMemo(
    () =>
      vehicles.filter((vehicle) => vehicle.approvalStatus === "approved")
        .length,
    [vehicles],
  );

  const openCreateModal = () => {
    if (!canAddVehicle) return;
    setModalVehicle(null);
  };

  const handleSaved = async (message) => {
    setModalVehicle(undefined);
    setSuccess(message);
    await loadVehicles();
  };

  return (
    <div className="min-h-full bg-white px-0 pb-8">
      <div className="min-h-screen bg-[#f8fafc] px-4 py-5 sm:px-6 lg:px-8">
        {success && (
          <div className="fixed right-5 top-5 z-[80] rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-xl">
            {success}
          </div>
        )}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8edf5] text-lg text-slate-950 transition hover:bg-[#dce4f0]"
              aria-label="Go back"
            >
              <FaChevronLeft />
            </button>

            <div>
              <h1 className="text-[25px] font-extrabold text-[#16458f]">
                List of Vehicles
              </h1>
              <p className="sr-only">
                {vehicles.length}/{MAX_VEHICLES} vehicles added ·{" "}
                {approvedCount} approved
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            disabled={!canAddVehicle}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#dc263d] px-6 text-[15px] font-extrabold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c91e34] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:w-auto"
          >
            {canAddVehicle ? "Add new vehicles" : "Maximum 2 Vehicles"}
          </button>
        </div>

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">
            <IoWarningOutline className="mt-0.5 shrink-0 text-lg" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex min-h-64 items-center justify-center rounded-xl bg-[#e8edf5]">
            <FaSpinner className="animate-spin text-3xl text-[#16458f]" />
          </div>
        ) : vehicles.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-xl bg-[#e8edf5] p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-[#16458f]">
              <FaCar />
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-800">
              No vehicle added yet
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              Add your lesson vehicle. It will remain pending until an admin
              reviews and approves it.
            </p>
            <button
              type="button"
              onClick={openCreateModal}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white hover:bg-rose-700"
            >
              <FaPlus /> Add Vehicle
            </button>
          </div>
        ) : (
          <div className="space-y-5 rounded-xl bg-[#e8edf5] p-4">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle._id}
                vehicle={vehicle}
                onEdit={() => setModalVehicle(vehicle)}
              />
            ))}
          </div>
        )}

        <div className="sr-only">
          <div className="flex gap-3">
            <IoInformationCircle className="mt-0.5 shrink-0 text-xl" />
            <div>
              <p className="font-bold">Vehicle approval rule</p>
              <p className="mt-1 leading-6 text-blue-700">
                You may edit a pending or rejected vehicle. After admin
                approval, editing is locked. An admin can de-approve it to make
                it editable again.
              </p>
            </div>
          </div>
        </div>
      </div>

      {modalVehicle !== undefined && (
        <VehicleModal
          vehicle={modalVehicle}
          onClose={() => setModalVehicle(undefined)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}

function VehicleCard({ vehicle, onEdit }) {
  const status =
    approvalStyles[vehicle.approvalStatus] || approvalStyles.pending;
  const StatusIcon = status.icon;
  const canEdit = vehicle.approvalStatus !== "approved";

  return (
    <article className="relative rounded-[20px] border border-[#a9c0e5] bg-white px-5 py-[22px] transition hover:shadow-sm sm:px-6">
      {canEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-[#e8edf5] text-xs text-[#16458f] transition hover:bg-[#16458f] hover:text-white"
          aria-label="Edit vehicle"
          title="Edit vehicle"
        >
          <FaPen />
        </button>
      )}

      <div className="grid items-center gap-5 md:grid-cols-[200px_minmax(0,1fr)]">
        <div className="relative h-[94px] overflow-hidden rounded-[8px] bg-slate-100">
          <img
            src={getMediaUrl(vehicle.vehicleImage)}
            alt={vehicle.vehicleName || "Teacher vehicle"}
            className="h-full w-full object-cover"
          />

          <div className="absolute bottom-2 left-2 flex gap-1">
            <span
              className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[9px] font-bold ${status.className}`}
            >
              <StatusIcon /> {status.label}
            </span>
            {vehicle.isDefault && (
              <span className="rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-[9px] font-bold text-blue-700">
                Default
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3 lg:grid-cols-[0.8fr_1.4fr_0.7fr_1.25fr_0.9fr] lg:items-center">
          <InfoItem label="Brand" value={vehicle.brand || "N/A"} />
          <InfoItem
            label="Model"
            value={vehicle.model || vehicle.vehicleName || "N/A"}
          />
          <InfoItem label="Year" value={vehicle.modelYear || "N/A"} />
          <InfoItem
            label="Vehicle Number"
            value={vehicle.registrationNumber || "N/A"}
          />
          <InfoItem label="Vehicle Type" value={vehicle.vehicleType || "N/A"} />
        </div>
      </div>

      {vehicle.approvalStatus === "rejected" && vehicle.adminNote && (
        <div className="mt-4 rounded-xl border border-rose-100 bg-rose-50 p-3 text-sm text-rose-700">
          <span className="font-bold">Admin note:</span> {vehicle.adminNote}
        </div>
      )}
    </article>
  );
}

function VehicleModal({ vehicle, onClose, onSaved }) {
  const isEditing = Boolean(vehicle?._id);
  const [form, setForm] = useState(() => ({
    ...EMPTY_FORM,
    brand: vehicle?.brand || "",
    model: vehicle?.model || "",
    modelYear: vehicle?.modelYear ? String(vehicle.modelYear) : "",
    registrationNumber: vehicle?.registrationNumber || "",
    vehicleType: vehicle?.vehicleType || "",
    isDefault: Boolean(vehicle?.isDefault),
  }));
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    vehicle?.vehicleImage ? getMediaUrl(vehicle.vehicleImage) : "",
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear() + 1;
    return Array.from({ length: currentYear - 1989 }, (_, index) =>
      String(currentYear - index),
    );
  }, []);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please upload a JPG, PNG or WebP image.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Vehicle image must be 5 MB or smaller.");
      return;
    }

    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setError("");
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const formData = new FormData();
      formData.append("brand", form.brand.trim());
      formData.append("model", form.model.trim());
      formData.append("vehicleName", `${form.brand} ${form.model}`.trim());
      formData.append("modelYear", form.modelYear);
      formData.append(
        "registrationNumber",
        form.registrationNumber.trim().toUpperCase(),
      );
      formData.append("vehicleType", form.vehicleType);
      formData.append("isDefault", String(form.isDefault));

      if (file) formData.append("vehicleImage", file);

      if (isEditing) {
        await updateTeacherVehicle(vehicle._id, formData);
        await onSaved("Vehicle updated and sent for approval.");
      } else {
        await createTeacherVehicle(formData);
        await onSaved("Vehicle added and sent for approval.");
      }
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/55 p-3 backdrop-blur-sm sm:p-6">
      <div className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-100 bg-white px-5 py-5 sm:px-7">
          <div>
            <h2 className="text-xl font-bold text-[#16458f] sm:text-2xl">
              {isEditing ? "Edit vehicle" : "Add a vehicle"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              You can add a maximum of 2 vehicles.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close modal"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-7">
          {error && (
            <div className="mb-5 flex gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">
              <IoWarningOutline className="mt-0.5 shrink-0 text-lg" />
              {error}
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <FormInput
              label="Brand"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="e.g. Audi"
              required
            />
            <FormInput
              label="Model"
              name="model"
              value={form.model}
              onChange={handleChange}
              placeholder="e.g. S4 Premium Plus"
              required
            />
            <FormSelect
              label="Model Year"
              name="modelYear"
              value={form.modelYear}
              onChange={handleChange}
              options={years}
              required
            />
            <FormSelect
              label="Vehicle Type"
              name="vehicleType"
              value={form.vehicleType}
              onChange={handleChange}
              options={["automatic", "manual", "electric"]}
              required
            />
            <div className="sm:col-span-2">
              <FormInput
                label="Vehicle number"
                name="registrationNumber"
                value={form.registrationNumber}
                onChange={handleChange}
                placeholder="Write registration / identification number"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Upload Vehicle Image
            </label>

            <label className="group flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-5 text-center transition hover:border-blue-300 hover:bg-blue-50/40">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Vehicle preview"
                  className="mb-4 h-44 w-full rounded-xl object-cover"
                />
              ) : (
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl text-[#16458f] shadow-sm">
                  <FiUpload />
                </div>
              )}
              <p className="font-semibold text-slate-700">
                {file?.name ||
                  (previewUrl
                    ? "Choose a different vehicle image"
                    : "Choose a vehicle image")}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                JPG, PNG or WebP, up to 5 MB
              </p>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-4">
            <input
              type="checkbox"
              name="isDefault"
              checked={form.isDefault}
              onChange={handleChange}
              className="h-5 w-5 rounded border-slate-300 text-[#16458f] focus:ring-[#16458f]"
            />
            <span className="text-sm font-semibold text-slate-700">
              Select this vehicle as the default vehicle
            </span>
          </label>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting && <FaSpinner className="animate-spin" />}
              {submitting
                ? "Saving..."
                : isEditing
                  ? "Update Vehicle"
                  : "Submit Vehicle"}
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
            <div className="flex gap-3">
              <IoInformationCircle className="mt-0.5 shrink-0 text-xl" />
              <div>
                <p className="font-bold">Notice</p>
                <ol className="mt-1 list-decimal space-y-1 pl-4">
                  <li>
                    Carefully check the model, year and vehicle number before
                    submitting.
                  </li>
                  <li>
                    New and edited vehicles remain inactive until an admin
                    approves them.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormInput({ label, required = false, ...inputProps }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label} {required && <span className="text-rose-600">*</span>}
      </span>
      <input
        {...inputProps}
        required={required}
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
      />
    </label>
  );
}

function FormSelect({ label, options, required = false, ...selectProps }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label} {required && <span className="text-rose-600">*</span>}
      </span>
      <select
        {...selectProps}
        required={required}
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium capitalize text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="text-[14px] font-medium text-[#606060]">{label}</p>
      <p className="mt-2 truncate text-[15px] font-extrabold capitalize text-[#161616]">
        {value}
      </p>
    </div>
  );
}
