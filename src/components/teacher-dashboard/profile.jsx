"use client";

import { useState } from "react";
import {
  FaCalendarAlt,
  FaCamera,
  FaChevronDown,
  FaChevronLeft,
  FaChevronUp,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const statusOptions = [
  "Independent Driving Instructor",
  "Salaried Driving Instructor",
  "Driving Instructor Job Seeker",
  "ESCR Student",
  "Driving School Manager",
  "Others",
];

const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#103f8f] focus:ring-4 focus:ring-blue-50";

const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

export default function Profile() {
  const [statusOpen, setStatusOpen] = useState(false);
  const [status, setStatus] = useState("ESCR Student");
  const [vehicleType, setVehicleType] = useState("Manual Car");

  return (
    <main className="min-h-screen bg-[#f7f9fc] px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex items-start gap-4">
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#103f8f] shadow-sm transition hover:bg-blue-50"
          >
            <FaChevronLeft size={16} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-[#103f8f]">Profile</h1>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Update your information to ensure accurate lesson scheduling and
              communication.
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-6">
          {/* User Info */}
          <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-[#eef4fb] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-center gap-4">
              <div className="relative h-[78px] w-[78px] shrink-0">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0dW491TS8p25zqH1JdG1fj-NRldx_t-MfzWk68jQEBw&s=10"
                  alt="Profile"
                  className="h-full w-full rounded-full border-4 border-white object-cover shadow-sm"
                />

                <button
                  type="button"
                  className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#103f8f] text-white shadow-md transition hover:bg-[#0b3272]"
                >
                  <FaCamera size={13} />
                </button>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Jenny Smith
                </h2>
                <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                  <SiGmail className="text-[#e63946]" />
                  yourmail@mail.com
                </p>
              </div>
            </div>

            <button
              type="button"
              className="h-11 rounded-xl bg-[#103f8f] px-7 text-sm font-semibold text-white transition hover:bg-[#0b3272]"
            >
              Edit
            </button>
          </div>

          {/* Form */}
          <div>
            <div className="mb-5">
              <h3 className="text-xl font-bold text-slate-900">
                Personal Details
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Manage your personal and driving profile information.
              </p>
            </div>

            <form className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <Field label="First Name" defaultValue="Jenny" />
              <Field label="Last Name" defaultValue="Smith" />

              <div>
                <label className={labelClass}>Date of birth</label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="Date"
                    className={`${inputClass} pr-11`}
                  />
                  <FaCalendarAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <Field label="Address" defaultValue="House no : 100, Dhaka" />

              <div>
                <label className={labelClass}>Phone Number</label>
                <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-[#103f8f] focus-within:ring-4 focus-within:ring-blue-50">
                  <span className="mr-3 text-lg">🇧🇩</span>
                  <input
                    type="text"
                    defaultValue="+880988900"
                    className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Vehicle type</label>
                <div className="relative">
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className={`${inputClass} appearance-none pr-11`}
                  >
                    <option>Manual Car</option>
                    <option>Automatic Car</option>
                    <option>Motorcycle</option>
                  </select>
                  <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div className="relative">
                <label className={labelClass}>Select your current status</label>

                <button
                  type="button"
                  onClick={() => setStatusOpen(!statusOpen)}
                  className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 text-left text-sm font-medium text-slate-800 transition hover:bg-slate-50 focus:border-[#103f8f] focus:outline-none focus:ring-4 focus:ring-blue-50"
                >
                  <span>{status}</span>
                  {statusOpen ? (
                    <FaChevronUp className="text-slate-400" />
                  ) : (
                    <FaChevronDown className="text-slate-400" />
                  )}
                </button>

                {statusOpen && (
                  <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl">
                    {statusOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setStatus(item);
                          setStatusOpen(false);
                        }}
                        className={`block w-full px-4 py-3 text-left text-sm transition ${
                          status === item
                            ? "bg-blue-50 font-semibold text-[#103f8f]"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Field label="Department" defaultValue="Write phone number" />
              <Field label="Your City" defaultValue="Dhaka" />

              <div className="flex justify-end pt-2 lg:col-span-2">
                <button
                  type="button"
                  className="h-12 rounded-xl bg-[#103f8f] px-8 text-sm font-bold text-white shadow-sm transition hover:bg-[#0b3272]"
                >
                  To update
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({ label, defaultValue }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input type="text" defaultValue={defaultValue} className={inputClass} />
    </div>
  );
}
