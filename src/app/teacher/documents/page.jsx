// "use client";

// import { FaChevronLeft, FaDownload, FaUpload } from "react-icons/fa";

// const documentSections = [
//   {
//     title: "Identity & Legal Status",
//     items: [
//       "Valid ID Passport or National ID",
//       "Valid residence permit if non-EU",
//     ],
//   },
//   {
//     title: "Driving License",
//     items: ["Category B license", "Minimum 3 years of driving experience"],
//   },
//   {
//     title: "Instructor Qualification",
//     items: ["Obtain Titre Professionnel ECSR Driving Instructor Diploma"],
//   },
//   {
//     title: "Teaching Authorization",
//     items: ["Apply for Autorisation d’enseigner from the Prefecture"],
//   },
//   {
//     title: "Medical Certificate",
//     items: ["Medical fitness certificate from an approved doctor"],
//   },
//   {
//     title: "Criminal Record Check",
//     items: ["Clean criminal record Casier judiciaire Bulletin n°2"],
//   },
//   {
//     title: "Business Registration",
//     items: [
//       "Register as auto-entrepreneur or company",
//       "Get your SIRET number via URSSAF/INSEE",
//     ],
//   },
//   {
//     title: "Professional Insurance",
//     items: ["Liability insurance Responsabilité civile professionnelle"],
//   },
// ];

// const downloadableDocs = [
//   { title: "Front of the permit" },
//   { title: "Back of the permit" },
// ];

// export default function MyDocument() {
//   return (
//     <main className="min-h-screen bg-[#f8fafc] px-4 py-5 sm:px-6 lg:px-8">
//       <section className="mx-auto max-w-6xl">
//         {/* Header */}
//         <header className="mb-5 flex items-start gap-3">
//           <button
//             type="button"
//             className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#16458f] shadow-sm transition hover:bg-blue-50"
//           >
//             <FaChevronLeft size={14} />
//           </button>

//           <div>
//             <h1 className="text-[24px] font-bold leading-tight text-[#16458f]">
//               Document
//             </h1>
//             <p className="mt-1 max-w-xl text-sm leading-5 text-slate-500">
//               Upload and manage your required verification documents.
//             </p>
//           </div>
//         </header>

//         {/* Required Documents */}
//         <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-5">
//           <div className="mb-4 flex items-center justify-between gap-3">
//             <div>
//               <h2 className="text-base font-bold text-slate-900">
//                 Required Documents
//               </h2>
//               <p className="text-xs text-slate-500">
//                 Please upload all necessary documents.
//               </p>
//             </div>

//             <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#16458f]">
//               {documentSections.length} Items
//             </span>
//           </div>

//           <div className="grid gap-3 md:grid-cols-2">
//             {documentSections.map((section, index) => (
//               <div
//                 key={index}
//                 className="rounded-xl border border-slate-100 bg-[#f1f6fc] p-4 transition hover:border-blue-100 hover:bg-[#eef4fb]"
//               >
//                 <div className="mb-3 flex items-start justify-between gap-3">
//                   <h3 className="text-[13px] font-extrabold uppercase tracking-wide text-[#16458f]">
//                     {section.title}
//                   </h3>

//                   <label className="inline-flex h-8 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#e2233d] px-3 text-xs font-bold text-white transition hover:bg-[#c91f35]">
//                     <FaUpload size={11} />
//                     Upload
//                     <input type="file" hidden />
//                   </label>
//                 </div>

//                 <ul className="space-y-1.5 pl-4 text-[13px] font-medium leading-5 text-slate-700">
//                   {section.items.map((item, i) => (
//                     <li key={i} className="list-disc">
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Download Documents */}
//         <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-5">
//           <div className="mb-4">
//             <h2 className="text-base font-bold text-slate-900">
//               Downloadable Documents
//             </h2>
//             <p className="text-xs text-slate-500">
//               You will find below the list of your downloadable documents.
//             </p>
//           </div>

//           <div className="grid gap-3 md:grid-cols-2">
//             {downloadableDocs.map((doc, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-[#f1f6fc] p-4 sm:flex-row sm:items-center sm:justify-between"
//               >
//                 <h3 className="text-sm font-extrabold uppercase text-[#16458f]">
//                   {doc.title}
//                 </h3>

//                 <button
//                   type="button"
//                   className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#e2233d] bg-white px-4 text-xs font-bold text-slate-900 transition hover:bg-[#e2233d] hover:text-white"
//                 >
//                   <FaDownload size={11} />
//                   Download
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaCheckCircle,
  FaChevronLeft,
  FaDownload,
  FaFileAlt,
  FaTimes,
  FaUpload,
} from "react-icons/fa";

const documentSections = [
  {
    id: "identity",
    title: "Identity & Legal Status",
    items: [
      "Valid passport or national identity card",
      "Valid residence permit for non-EU applicants",
    ],
  },
  {
    id: "driving-license",
    title: "Driving License",
    items: [
      "Valid Category B driving license",
      "Minimum three years of driving experience",
    ],
  },
  {
    id: "instructor-qualification",
    title: "Instructor Qualification",
    items: ["Titre Professionnel ECSR driving instructor diploma"],
  },
  {
    id: "teaching-authorization",
    title: "Teaching Authorization",
    items: ["Autorisation d’enseigner issued by the Prefecture"],
  },
  {
    id: "medical-certificate",
    title: "Medical Certificate",
    items: ["Medical fitness certificate issued by an approved doctor"],
  },
  {
    id: "criminal-record",
    title: "Criminal Record Check",
    items: ["Clean criminal record: Casier judiciaire Bulletin n°2"],
  },
  {
    id: "business-registration",
    title: "Business Registration",
    items: [
      "Auto-entrepreneur or company registration",
      "SIRET number issued through URSSAF or INSEE",
    ],
  },
  {
    id: "professional-insurance",
    title: "Professional Insurance",
    items: ["Responsabilité civile professionnelle insurance"],
  },
];

const downloadableDocuments = [
  {
    id: "permit-front",
    title: "Front of the Permit",
    description: "Download the front copy of your driving permit.",
    fileUrl: "/documents/front-of-permit.pdf",
  },
  {
    id: "permit-back",
    title: "Back of the Permit",
    description: "Download the back copy of your driving permit.",
    fileUrl: "/documents/back-of-permit.pdf",
  },
];

function RequiredDocumentCard({
  section,
  selectedFile,
  onFileChange,
  onRemove,
}) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex w-full items-center justify-between gap-4">
  <h3 className="min-w-0 text-sm font-extrabold uppercase leading-5 tracking-wide text-[#16458f]">
    {section.title}
  </h3>

  <label className="flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#e2233d] px-4 text-xs font-bold text-white shadow-sm transition hover:bg-[#c91f35] active:scale-[0.99]">
    <FaUpload size={12} />

    <span>Select Document</span>

    <input
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      className="hidden"
      onChange={(event) => onFileChange(section.id, event)}
    />
  </label>
</div>

        {selectedFile && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
            <FaCheckCircle size={10} />
            Added
          </span>
        )}
      </div>

      <ul className="mb-5 space-y0-.5 ml-2">
        {section.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-[13px] font-medium leading-5 text-slate-600"
          >
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#16458f]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {selectedFile ? (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
            <FaFileAlt size={14} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-slate-800">
              {selectedFile.name}
            </p>

            <p className="mt-0.5 text-[11px] text-slate-500">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <button
            type="button"
            onClick={() => onRemove(section.id)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm transition hover:bg-red-50 hover:text-red-600"
            aria-label={`Remove ${section.title} file`}
          >
            <FaTimes size={12} />
          </button>
        </div>
      ) : (
        <></>
      )}
    </article>
  );
}

function DownloadDocumentCard({ document }) {
  return (
    <article className="flex flex-row gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition duration-200 hover:border-blue-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="flex min-w-0 justify-center items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#16458f]">
          <FaFileAlt size={17} />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-extrabold uppercase tracking-wide text-[#16458f]">
            {document.title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {document.description}
          </p>
        </div>
      </div>

      <a
        href={document.fileUrl}
        download
        className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#e2233d] bg-white px-5 text-xs font-bold text-[#e2233d] transition hover:bg-[#e2233d] hover:text-white"
      >
        <FaDownload size={12} />
        Download
      </a>
    </article>
  );
}

export default function MyDocumentPage() {
  const router = useRouter();

  const [uploadedFiles, setUploadedFiles] = useState({});

  const handleFileChange = (sectionId, event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadedFiles((previousFiles) => ({
      ...previousFiles,
      [sectionId]: file,
    }));

    event.target.value = "";
  };

  const handleRemoveFile = (sectionId) => {
    setUploadedFiles((previousFiles) => {
      const updatedFiles = { ...previousFiles };
      delete updatedFiles[sectionId];
      return updatedFiles;
    });
  };

  const uploadedCount = Object.keys(uploadedFiles).length;
  const totalDocuments = documentSections.length;

  const uploadProgress = Math.round((uploadedCount / totalDocuments) * 100);

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto w-full ">
        {/* Page header */}
        <header className="mb-6 flex items-start gap-3 sm:items-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#16458f] shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
            aria-label="Go back"
          >
            <FaChevronLeft size={14} />
          </button>

          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold leading-tight text-[#16458f] sm:text-[28px]">
              My Documents
            </h1>

            <p className="mt-1 text-sm leading-5 text-slate-500">
              Upload and manage the documents required for verification.
            </p>
          </div>
        </header>

        {/* Progress */}
        <section className="mb-5 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-[#16458f] to-[#2763b7] p-5 text-white shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-100">
                Verification progress
              </p>

              <h2 className="mt-1 text-xl font-extrabold">
                {uploadedCount} of {totalDocuments} documents added
              </h2>

              <p className="mt-1 text-xs leading-5 text-blue-100">
                Add all required documents before submitting your application.
              </p>
            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-white/30 bg-white/10 text-lg font-extrabold">
              {uploadProgress}%
            </div>
          </div>

          <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </section>

        {/* Required documents */}
        <section className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm sm:p-5 lg:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                Required Documents
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Accepted formats are PDF, JPG, JPEG and PNG.
              </p>
            </div> */}

            {/* <span className="inline-flex w-fit items-center rounded-full bg-blue-100 px-3 py-1.5 text-xs font-extrabold text-[#16458f]">
              {totalDocuments} requirements
            </span> */}
          </div>

          <div className="grid gap-4 md:grid-cols-1">
            {documentSections.map((section) => (
              <RequiredDocumentCard
                key={section.id}
                section={section}
                selectedFile={uploadedFiles[section.id]}
                onFileChange={handleFileChange}
                onRemove={handleRemoveFile}
              />
            ))}
          </div>
        </section>

        {/* Downloadable documents */}
        <section className="mt-5 rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm sm:p-5 lg:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-extrabold text-slate-900">
              Downloadable Documents
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Download the available copies of your submitted documents.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
            {downloadableDocuments.map((document) => (
              <DownloadDocumentCard key={document.id} document={document} />
            ))}
          </div>
        </section>

        {/* Bottom action */}
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            disabled={uploadedCount !== totalDocuments}
            className="h-11 w-full rounded-xl bg-[#16458f] px-7 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#123a78] disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
          >
            {uploadedCount === totalDocuments
              ? "Submit Documents"
              : `${totalDocuments - uploadedCount} Documents Remaining`}
          </button>
        </div>
      </section>
    </main>
  );
}