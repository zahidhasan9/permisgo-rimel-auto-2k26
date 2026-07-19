// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { FaChevronLeft, FaPlus } from "react-icons/fa";
// import { FiUpload } from "react-icons/fi";
// import { IoChevronDown, IoClose, IoInformationCircle } from "react-icons/io5";
// import { useRouter } from "next/navigation";
// const vehicles = [
//   {
//     brand: "Audi",
//     model: "S4 Premium Plus",
//     year: "2021",
//     number: "789006655",
//     type: "Automatic",
//     image: "/image/car.jpg",
//   },
//   {
//     brand: "Audi",
//     model: "S4 Premium Plus",
//     year: "2021",
//     number: "789006655",
//     type: "Automatic",
//     image: "/image/car.jpg",
//   },
// ];

// export default function Vehicles() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
// const router = useRouter();
//   return (
//     <>
//       <section className="min-h-screen w-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
//         <div className="mx-auto ">
//           {/* Header */}
//           <div className="mb-6 flex flex-col gap-4 rounded-2xl  p-5  sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex items-center gap-3">
//                 <button
//             type="button"
//             onClick={() => router.back()}
//             className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#16458f] shadow-sm transition hover:bg-blue-50"
//           >
//             <FaChevronLeft size={14} />
//           </button>
//               <h2 className="text-2xl font-bold text-blue-900 sm:text-3xl">
//                 List of Vehicles
//               </h2>

//             </div>

//             <button
//               type="button"
//               onClick={() => setIsModalOpen(true)}
//               className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-md sm:w-auto"
//             >
//               <FaPlus className="text-sm" />
//               Add New Vehicle
//             </button>
//           </div>

//           {/* Vehicle List */}
//           <div className="space-y-4">
//             {vehicles.map((vehicle, index) => (
//               <VehicleCard key={index} vehicle={vehicle} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {isModalOpen && <AddVehicleModal onClose={() => setIsModalOpen(false)} />}
//     </>
//   );
// }

// function VehicleCard({ vehicle }) {
//   return (
//     <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
//       <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-[220px_1fr] md:p-5">
//         {/* Image */}
//         <div className="overflow-hidden rounded-xl bg-slate-100">
//           <Image
//             src={vehicle.image}
//             alt={`${vehicle.brand} ${vehicle.model}`}
//             width={420}
//             height={260}
//             className="h-44 w-full object-cover transition duration-300 hover:scale-105 md:h-36"
//           />
//         </div>

//         {/* Details */}
//         <div className="flex flex-col justify-center">

//           <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
//             <InfoItem label="Brand" value={vehicle.brand} />
//             <InfoItem label="Model" value={vehicle.model} />
//             <InfoItem label="Year" value={vehicle.year} />
//             <InfoItem label="Vehicle Number" value={vehicle.number} />
//             <InfoItem label="Vehicle Type" value={vehicle.type} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function AddVehicleModal({ onClose }) {
//   const [fileName, setFileName] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 px-3 py-4">
//       <div className="flex min-h-full items-start justify-center sm:items-center">
//         <div className="relative w-full max-w-[520px] rounded-2xl bg-white shadow-2xl">
//           <div className="max-h-[calc(100vh-32px)] overflow-y-auto rounded-2xl p-5 sm:p-6">
//             {/* Header */}
//             <div className="mb-5 flex items-start justify-between gap-4">
//               <div>
//                 <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
//                   Add a vehicle
//                 </h3>
//                 <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
//                   Update your vehicle information. You can add maximum 2
//                   vehicles.
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl text-slate-900 transition hover:bg-slate-100"
//                 aria-label="Close modal"
//               >
//                 <IoClose />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit}>
//               {/* Fields */}
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <FormInput label="Model" required placeholder="Write here" />
//                 <FormInput
//                   label="Vehicle number"
//                   required
//                   placeholder="Write here"
//                 />
//                 <FormSelect label="Model Year" />
//                 <FormSelect label="Vehicle Type" />
//               </div>

//               {/* Upload */}
//               <div className="mt-5">
//                 <label className="mb-2 block text-sm font-semibold text-slate-600">
//                   Upload Vehicle Image
//                 </label>

//                 <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-blue-100 bg-slate-50 px-4 py-6 text-center transition hover:border-blue-300 hover:bg-blue-50/50">
//                   <FiUpload className="mb-3 text-2xl text-blue-900" />

//                   <p className="text-sm font-bold text-slate-900 sm:text-base">
//                     {fileName || "Choose a file or drag & drop it here"}
//                   </p>

//                   <p className="mt-1 text-xs text-slate-500 sm:text-sm">
//                     Image, PDF or MP4 formats, up to 100 MB
//                   </p>

//                   <span className="mt-4 rounded-lg border border-rose-600 px-4 py-2 text-xs font-semibold text-blue-900 transition hover:bg-rose-600 hover:text-white sm:text-sm">
//                     Browse File
//                   </span>

//                   <input
//                     type="file"
//                     className="hidden"
//                     accept="image/*,application/pdf,video/mp4"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0];
//                       if (file) setFileName(file.name);
//                     }}
//                   />
//                 </label>
//               </div>

//               {/* Checkbox */}
//               <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-600">
//                 <input
//                   type="checkbox"
//                   className="h-5 w-5 rounded border-blue-900 text-blue-900 focus:ring-blue-900"
//                 />
//                 Select this vehicle as the default vehicle
//               </label>

//               {/* Submit */}
//               <button
//                 type="submit"
//                 className="mt-5 w-full rounded-xl bg-rose-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-rose-700 hover:shadow-md sm:text-base"
//               >
//                 Submit
//               </button>

//               {/* Notice */}
//               <div className="mt-5 rounded-xl bg-blue-100 p-4 text-blue-900">
//                 <div className="mb-3 flex items-center gap-2 font-bold">
//                   <IoInformationCircle className="text-lg" />
//                   <span>Noticed :</span>
//                 </div>

//                 <ol className="list-decimal space-y-3 pl-6 text-sm font-semibold leading-6">
//                   <li>
//                     Carefully check the model, model year, and vehicle
//                     identification number. Accurate information is essential for
//                     your driving lessons.
//                   </li>
//                   <li>
//                     Once you add your vehicle, its status will be set to pending
//                     and will need to be approved by an admin before being
//                     activated.
//                   </li>
//                 </ol>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function FormInput({ label, required = false, placeholder = "Write here" }) {
//   return (
//     <div>
//       <label className="mb-2 block text-sm font-semibold text-slate-600">
//         {label} {required && <span className="text-rose-600">*</span>}
//       </label>

//       <input
//         type="text"
//         placeholder={placeholder}
//         className="h-11 w-full rounded-xl border border-blue-100 bg-slate-100 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
//       />
//     </div>
//   );
// }

// function FormSelect({ label }) {
//   return (
//     <div>
//       <label className="mb-2 block text-sm font-semibold text-slate-600">
//         {label}
//       </label>

//       <div className="relative">
//         <select className="h-11 w-full appearance-none rounded-xl border border-blue-100 bg-slate-100 px-4 pr-10 text-sm text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100">
//           <option value="">Write here</option>

//           {label === "Model Year" ? (
//             <>
//               <option value="2024">2024</option>
//               <option value="2023">2023</option>
//               <option value="2022">2022</option>
//               <option value="2021">2021</option>
//             </>
//           ) : (
//             <>
//               <option value="Automatic">Automatic</option>
//               <option value="Manual">Manual</option>
//               <option value="Electric">Electric</option>
//             </>
//           )}
//         </select>

//         <IoChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xl text-slate-900" />
//       </div>
//     </div>
//   );
// }

// function InfoItem({ label, value }) {
//   return (
//     <div className="rounded-xl bg-slate-50 p-4">
//       <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
//         {label}
//       </p>
//       <h6 className="break-words text-sm font-bold text-slate-900 sm:text-[15px]">
//         {value}
//       </h6>
//     </div>
//   );
// }

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
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {success && (
          <div className="fixed right-5 top-5 z-[80] rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-xl">
            {success}
          </div>
        )}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#16458f] shadow-sm transition hover:bg-blue-50"
              aria-label="Go back"
            >
              <FaChevronLeft />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-[#16458f] sm:text-3xl">
                List of Vehicles
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {vehicles.length}/{MAX_VEHICLES} vehicles added ·{" "}
                {approvedCount} approved
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            disabled={!canAddVehicle}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:w-auto"
          >
            <FaPlus />
            {canAddVehicle ? "Add New Vehicle" : "Maximum 2 Vehicles"}
          </button>
        </div>

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">
            <IoWarningOutline className="mt-0.5 shrink-0 text-lg" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex min-h-64 items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
            <FaSpinner className="animate-spin text-3xl text-[#16458f]" />
          </div>
        ) : vehicles.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
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
          <div className="grid gap-5 lg:grid-cols-2">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle._id}
                vehicle={vehicle}
                onEdit={() => setModalVehicle(vehicle)}
              />
            ))}
          </div>
        )}

        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
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
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-52 bg-slate-100">
        <img
          src={getMediaUrl(vehicle.vehicleImage)}
          alt={vehicle.vehicleName || "Teacher vehicle"}
          className="h-full w-full object-cover"
        />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${status.className}`}
          >
            <StatusIcon /> {status.label}
          </span>
          {vehicle.isDefault && (
            <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
              Default
            </span>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              {vehicle.brand || "Vehicle"}
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">
              {vehicle.model || vehicle.vehicleName || "Unnamed vehicle"}
            </h2>
          </div>

          {canEdit ? (
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-blue-200 px-3 text-sm font-bold text-[#16458f] transition hover:bg-blue-50"
            >
              <FaPen className="text-xs" /> Edit
            </button>
          ) : (
            <span className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500">
              Edit locked
            </span>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-slate-100 pt-5 sm:grid-cols-4">
          <InfoItem label="Model Year" value={vehicle.modelYear || "N/A"} />
          <InfoItem
            label="Vehicle Number"
            value={vehicle.registrationNumber || "N/A"}
          />
          <InfoItem label="Vehicle Type" value={vehicle.vehicleType || "N/A"} />
          <InfoItem
            label="Status"
            value={vehicle.status === "active" ? "Active" : "Inactive"}
          />
        </div>

        {vehicle.approvalStatus === "rejected" && vehicle.adminNote && (
          <div className="mt-5 rounded-2xl border border-rose-100 bg-rose-50 p-3 text-sm text-rose-700">
            <span className="font-bold">Admin note:</span> {vehicle.adminNote}
          </div>
        )}
      </div>
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
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-bold capitalize text-slate-800">
        {value}
      </p>
    </div>
  );
}
