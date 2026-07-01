"use client";

import { FaChevronLeft, FaDownload, FaUpload } from "react-icons/fa";

const documentSections = [
  {
    title: "Identity & Legal Status",
    items: [
      "Valid ID Passport or National ID",
      "Valid residence permit if non-EU",
    ],
  },
  {
    title: "Driving License",
    items: ["Category B license", "Minimum 3 years of driving experience"],
  },
  {
    title: "Instructor Qualification",
    items: ["Obtain Titre Professionnel ECSR Driving Instructor Diploma"],
  },
  {
    title: "Teaching Authorization",
    items: ["Apply for Autorisation d’enseigner from the Prefecture"],
  },
  {
    title: "Medical Certificate",
    items: ["Medical fitness certificate from an approved doctor"],
  },
  {
    title: "Criminal Record Check",
    items: ["Clean criminal record Casier judiciaire Bulletin n°2"],
  },
  {
    title: "Business Registration",
    items: [
      "Register as auto-entrepreneur or company",
      "Get your SIRET number via URSSAF/INSEE",
    ],
  },
  {
    title: "Professional Insurance",
    items: ["Liability insurance Responsabilité civile professionnelle"],
  },
];

const downloadableDocs = [
  { title: "Front of the permit" },
  { title: "Back of the permit" },
];

export default function MyDocument() {
  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-5 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-5 flex items-start gap-3">
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#16458f] shadow-sm transition hover:bg-blue-50"
          >
            <FaChevronLeft size={14} />
          </button>

          <div>
            <h1 className="text-[24px] font-bold leading-tight text-[#16458f]">
              Document
            </h1>
            <p className="mt-1 max-w-xl text-sm leading-5 text-slate-500">
              Upload and manage your required verification documents.
            </p>
          </div>
        </header>

        {/* Required Documents */}
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Required Documents
              </h2>
              <p className="text-xs text-slate-500">
                Please upload all necessary documents.
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#16458f]">
              {documentSections.length} Items
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {documentSections.map((section, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-100 bg-[#f1f6fc] p-4 transition hover:border-blue-100 hover:bg-[#eef4fb]"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-[13px] font-extrabold uppercase tracking-wide text-[#16458f]">
                    {section.title}
                  </h3>

                  <label className="inline-flex h-8 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#e2233d] px-3 text-xs font-bold text-white transition hover:bg-[#c91f35]">
                    <FaUpload size={11} />
                    Upload
                    <input type="file" hidden />
                  </label>
                </div>

                <ul className="space-y-1.5 pl-4 text-[13px] font-medium leading-5 text-slate-700">
                  {section.items.map((item, i) => (
                    <li key={i} className="list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Download Documents */}
        <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-5">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-900">
              Downloadable Documents
            </h2>
            <p className="text-xs text-slate-500">
              You will find below the list of your downloadable documents.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {downloadableDocs.map((doc, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-[#f1f6fc] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <h3 className="text-sm font-extrabold uppercase text-[#16458f]">
                  {doc.title}
                </h3>

                <button
                  type="button"
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#e2233d] bg-white px-4 text-xs font-bold text-slate-900 transition hover:bg-[#e2233d] hover:text-white"
                >
                  <FaDownload size={11} />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
