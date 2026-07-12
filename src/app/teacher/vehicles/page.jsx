"use client";

import Image from "next/image";
import { useState } from "react";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { IoChevronDown, IoClose, IoInformationCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";
const vehicles = [
  {
    brand: "Audi",
    model: "S4 Premium Plus",
    year: "2021",
    number: "789006655",
    type: "Automatic",
    image: "/image/car.jpg",
  },
  {
    brand: "Audi",
    model: "S4 Premium Plus",
    year: "2021",
    number: "789006655",
    type: "Automatic",
    image: "/image/car.jpg",
  },
];

export default function Vehicles() {
  const [isModalOpen, setIsModalOpen] = useState(false);
const router = useRouter();
  return (
    <>
      <section className="min-h-screen w-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto ">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 rounded-2xl  p-5  sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
                <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#16458f] shadow-sm transition hover:bg-blue-50"
          >
            <FaChevronLeft size={14} />
          </button>
              <h2 className="text-2xl font-bold text-blue-900 sm:text-3xl">
                List of Vehicles
              </h2>
              
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-md sm:w-auto"
            >
              <FaPlus className="text-sm" />
              Add New Vehicle
            </button>
          </div>

          {/* Vehicle List */}
          <div className="space-y-4">
            {vehicles.map((vehicle, index) => (
              <VehicleCard key={index} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      {isModalOpen && <AddVehicleModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

function VehicleCard({ vehicle }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-[220px_1fr] md:p-5">
        {/* Image */}
        <div className="overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.model}`}
            width={420}
            height={260}
            className="h-44 w-full object-cover transition duration-300 hover:scale-105 md:h-36"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <InfoItem label="Brand" value={vehicle.brand} />
            <InfoItem label="Model" value={vehicle.model} />
            <InfoItem label="Year" value={vehicle.year} />
            <InfoItem label="Vehicle Number" value={vehicle.number} />
            <InfoItem label="Vehicle Type" value={vehicle.type} />
          </div>
        </div>
      </div>
    </div>
  );
}

function AddVehicleModal({ onClose }) {
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 px-3 py-4">
      <div className="flex min-h-full items-start justify-center sm:items-center">
        <div className="relative w-full max-w-[520px] rounded-2xl bg-white shadow-2xl">
          <div className="max-h-[calc(100vh-32px)] overflow-y-auto rounded-2xl p-5 sm:p-6">
            {/* Header */}
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  Add a vehicle
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                  Update your vehicle information. You can add maximum 2
                  vehicles.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl text-slate-900 transition hover:bg-slate-100"
                aria-label="Close modal"
              >
                <IoClose />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Fields */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormInput label="Model" required placeholder="Write here" />
                <FormInput
                  label="Vehicle number"
                  required
                  placeholder="Write here"
                />
                <FormSelect label="Model Year" />
                <FormSelect label="Vehicle Type" />
              </div>

              {/* Upload */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Upload Vehicle Image
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-blue-100 bg-slate-50 px-4 py-6 text-center transition hover:border-blue-300 hover:bg-blue-50/50">
                  <FiUpload className="mb-3 text-2xl text-blue-900" />

                  <p className="text-sm font-bold text-slate-900 sm:text-base">
                    {fileName || "Choose a file or drag & drop it here"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    Image, PDF or MP4 formats, up to 100 MB
                  </p>

                  <span className="mt-4 rounded-lg border border-rose-600 px-4 py-2 text-xs font-semibold text-blue-900 transition hover:bg-rose-600 hover:text-white sm:text-sm">
                    Browse File
                  </span>

                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,application/pdf,video/mp4"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setFileName(file.name);
                    }}
                  />
                </label>
              </div>

              {/* Checkbox */}
              <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-600">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-blue-900 text-blue-900 focus:ring-blue-900"
                />
                Select this vehicle as the default vehicle
              </label>

              {/* Submit */}
              <button
                type="submit"
                className="mt-5 w-full rounded-xl bg-rose-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-rose-700 hover:shadow-md sm:text-base"
              >
                Submit
              </button>

              {/* Notice */}
              <div className="mt-5 rounded-xl bg-blue-100 p-4 text-blue-900">
                <div className="mb-3 flex items-center gap-2 font-bold">
                  <IoInformationCircle className="text-lg" />
                  <span>Noticed :</span>
                </div>

                <ol className="list-decimal space-y-3 pl-6 text-sm font-semibold leading-6">
                  <li>
                    Carefully check the model, model year, and vehicle
                    identification number. Accurate information is essential for
                    your driving lessons.
                  </li>
                  <li>
                    Once you add your vehicle, its status will be set to pending
                    and will need to be approved by an admin before being
                    activated.
                  </li>
                </ol>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormInput({ label, required = false, placeholder = "Write here" }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-600">
        {label} {required && <span className="text-rose-600">*</span>}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-blue-100 bg-slate-100 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
      />
    </div>
  );
}

function FormSelect({ label }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-600">
        {label}
      </label>

      <div className="relative">
        <select className="h-11 w-full appearance-none rounded-xl border border-blue-100 bg-slate-100 px-4 pr-10 text-sm text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100">
          <option value="">Write here</option>

          {label === "Model Year" ? (
            <>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </>
          ) : (
            <>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Electric">Electric</option>
            </>
          )}
        </select>

        <IoChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xl text-slate-900" />
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <h6 className="break-words text-sm font-bold text-slate-900 sm:text-[15px]">
        {value}
      </h6>
    </div>
  );
}

