// // "use client";

// // import { useRouter } from "next/navigation";
// // import { IoChevronBack } from "react-icons/io5";

// // const requirements = [
// //   {
// //     title: "IDENTITY & LEGAL STATUS",
// //     items: [
// //       "Valid ID (Passport or National ID)",
// //       "Valid residence permit (if non-EU)",
// //     ],
// //   },
// //   {
// //     title: "DRIVING LICENSE",
// //     items: ["Category B license", "Minimum 3 years of driving experience"],
// //   },
// //   {
// //     title: "INSTRUCTOR QUALIFICATION",
// //     items: ["Obtain Titre Professionnel ECSR (Driving Instructor Diploma)"],
// //   },
// //   {
// //     title: "TEACHING AUTHORIZATION",
// //     items: ["Apply for “Autorisation d’enseigner” from the Prefecture"],
// //   },
// //   {
// //     title: "MEDICAL CERTIFICATE",
// //     items: ["Get a medical fitness certificate from an approved doctor"],
// //   },
// //   {
// //     title: "CRIMINAL RECORD CHECK",
// //     items: ["Clean criminal record (Casier judiciaire – Bulletin nº2)"],
// //   },
// //   {
// //     title: "BUSINESS REGISTRATION",
// //     items: [
// //       "Register as auto-entrepreneur or company",
// //       "Get your SIRET number (via URSSAF/INSEE)",
// //     ],
// //   },
// //   {
// //     title: "PROFESSIONAL INSURANCE",
// //     items: ["Liability insurance (Responsabilité civile professionnelle)"],
// //   },
// // ];

// // const downloadableFiles = [
// //   "DOWNLOAD THE FRONT OF THE PERMIT *",
// //   "DOWNLOAD THE BACK OF THE PERMIT *",
// // ];

// // export default function Page() {
// //   const router = useRouter();

// //   return (
// //     <main className="min-h-screen bg-white px-4 py-5 font-sans text-[#171717] sm:px-6 lg:px-8">
// //       <div className="mx-auto w-full max-w-[1040px]">
// //         {/* Header */}
// //         <header className="mb-7 flex items-start gap-3 sm:gap-4">
// //           <button
// //             type="button"
// //             onClick={() => router.back()}
// //             aria-label="Go back"
// //             className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#EEF4FB] text-[24px] text-[#111827] transition hover:bg-[#dfe7f2]"
// //           >
// //             <IoChevronBack />
// //           </button>

// //           <div>
// //             <h1 className="text-[23px] font-bold leading-tight text-[#174A9B] sm:text-[25px]">
// //               Profile
// //             </h1>

// //             <p className="mt-2 text-[13px] font-medium leading-[1.5] text-[#6F737B] sm:text-[13.5px]">
// //               Update your information to ensure accurate lesson scheduling and
// //               communication.
// //             </p>
// //           </div>
// //         </header>

// //         {/* Requirement Cards */}
// //         <section className="space-y-4">
// //           {requirements.map((requirement) => (
// //             <div
// //               key={requirement.title}
// //               className="flex flex-col gap-4 rounded-[12px] bg-[#E8EEF8] p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5"
// //             >
// //               <div className="min-w-0">
// //                 <h2 className="text-[14px] font-bold leading-tight text-[#174A9B] sm:text-[15px]">
// //                   {requirement.title}
// //                 </h2>

// //                 <ul className="mt-3 space-y-2 pl-1">
// //                   {requirement.items.map((item) => (
// //                     <li
// //                       key={item}
// //                       className="text-[14px] font-medium leading-[1.45] text-[#101010] before:mr-2 before:content-['•'] sm:text-[15px]"
// //                     >
// //                       {item}
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>

// //               <button
// //                 type="button"
// //                 className="h-9 w-full shrink-0 rounded-[8px] bg-[#DF263C] px-4 text-[12px] font-bold text-white transition hover:bg-[#c91f33] sm:w-auto"
// //               >
// //                 Upload Document
// //               </button>
// //             </div>
// //           ))}
// //         </section>

// //         {/* Downloadable Files */}
// //         <section className="mt-5 rounded-[12px] bg-[#E8EEF8] p-4 sm:p-5">
// //           <h2 className="text-[20px] font-bold leading-tight text-[#174A9B] sm:text-[22px]">
// //             Downloadable Files
// //           </h2>

// //           <p className="mt-3 text-[13px] font-medium leading-[1.5] text-[#6F737B] sm:text-[13.5px]">
// //             You will find below the list of your downloadable documents
// //           </p>

// //           <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
// //             {downloadableFiles.map((file) => (
// //               <div
// //                 key={file}
// //                 className="flex min-h-[130px] flex-col items-center justify-center rounded-[12px] bg-white p-5"
// //               >
// //                 <h3 className="text-center text-[14px] font-bold leading-[1.4] text-[#174A9B] sm:text-[15px]">
// //                   {file}
// //                 </h3>

// //                 <button
// //                   type="button"
// //                   className="mt-4 h-11 w-[112px] rounded-[10px] border-2 border-[#DF263C] bg-white text-[14px] font-bold text-[#111111] transition hover:bg-[#DF263C] hover:text-white"
// //                 >
// //                   Download
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         </section>
// //       </div>
// //     </main>
// //   );
// // }

// "use client";

// import { useRouter } from "next/navigation";
// import {
//   IoChevronBack,
//   IoCloudUploadOutline,
//   IoDownloadOutline,
//   IoDocumentTextOutline,
//   IoShieldCheckmarkOutline,
// } from "react-icons/io5";

// const requirements = [
//   {
//     title: "IDENTITY & LEGAL STATUS",
//     items: [
//       "Valid ID (Passport or National ID)",
//       "Valid residence permit (if non-EU)",
//     ],
//   },
//   {
//     title: "DRIVING LICENSE",
//     items: ["Category B license", "Minimum 3 years of driving experience"],
//   },
//   {
//     title: "INSTRUCTOR QUALIFICATION",
//     items: ["Obtain Titre Professionnel ECSR (Driving Instructor Diploma)"],
//   },
//   {
//     title: "TEACHING AUTHORIZATION",
//     items: ["Apply for “Autorisation d’enseigner” from the Prefecture"],
//   },
//   {
//     title: "MEDICAL CERTIFICATE",
//     items: ["Get a medical fitness certificate from an approved doctor"],
//   },
//   {
//     title: "CRIMINAL RECORD CHECK",
//     items: ["Clean criminal record (Casier judiciaire – Bulletin nº2)"],
//   },
//   {
//     title: "BUSINESS REGISTRATION",
//     items: [
//       "Register as auto-entrepreneur or company",
//       "Get your SIRET number (via URSSAF/INSEE)",
//     ],
//   },
//   {
//     title: "PROFESSIONAL INSURANCE",
//     items: ["Liability insurance (Responsabilité civile professionnelle)"],
//   },
// ];

// const downloadableFiles = [
//   "DOWNLOAD THE FRONT OF THE PERMIT *",
//   "DOWNLOAD THE BACK OF THE PERMIT *",
// ];

// export default function Page() {
//   const router = useRouter();

//   return (
//     <main className="min-h-screen bg-[#F7F9FC] px-4 py-4 sm:px-5 lg:px-6">
//       <div className="mx-auto max-w-5xl">
//         {/* Header */}
//         <header className="mb-4 rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex items-center gap-3">
//               <button
//                 type="button"
//                 onClick={() => router.back()}
//                 aria-label="Go back"
//                 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
//               >
//                 <IoChevronBack size={24} />
//               </button>

//               <div>
//                 <div className="mb-1 inline-flex rounded-md bg-[#EAF1FB] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#0D4598]">
//                   Admin Panel / Profile Documents
//                 </div>

//                 <h1 className="text-xl font-black text-[#151515]">Profile</h1>

//                 <p className="mt-1 text-sm text-[#7B8190]">
//                   Update your information for accurate lesson scheduling and
//                   communication.
//                 </p>
//               </div>
//             </div>

//             <div className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#DDE6F3] bg-white px-4 text-xs font-black text-[#0D4598]">
//               <IoShieldCheckmarkOutline size={17} />
//               Required Documents
//             </div>
//           </div>
//         </header>

//         {/* Summary Cards */}
//         <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
//           <SummaryBox label="Total Requirements" value={requirements.length} />
//           <SummaryBox label="Download Files" value={downloadableFiles.length} />
//           <SummaryBox label="Status" value="Pending" />
//         </section>

//         {/* Requirement Cards */}
//         <section className="rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
//           <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h2 className="text-lg font-black text-[#151515]">
//                 Document Requirements
//               </h2>

//               <p className="mt-1 text-sm text-[#7B8190]">
//                 Upload the required documents for profile verification.
//               </p>
//             </div>

//             <span className="rounded-lg bg-[#EAF1FB] px-3 py-2 text-xs font-black text-[#0D4598]">
//               {requirements.length} Items
//             </span>
//           </div>

//           <div className="grid gap-3 md:grid-cols-2">
//             {requirements.map((requirement, index) => (
//               <RequirementCard
//                 key={requirement.title}
//                 index={index}
//                 requirement={requirement}
//               />
//             ))}
//           </div>
//         </section>

//         {/* Downloadable Files */}
//         <section className="mt-4 rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
//           <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h2 className="text-lg font-black text-[#151515]">
//                 Downloadable Files
//               </h2>

//               <p className="mt-1 text-sm text-[#7B8190]">
//                 You will find below the list of your downloadable documents.
//               </p>
//             </div>

//             <span className="rounded-lg bg-[#F1F4F8] px-3 py-2 text-xs font-black text-[#667085]">
//               {downloadableFiles.length} Files
//             </span>
//           </div>

//           <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//             {downloadableFiles.map((file) => (
//               <DownloadCard key={file} file={file} />
//             ))}
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

// function SummaryBox({ label, value }) {
//   return (
//     <div className="rounded-xl border border-[#E5EAF2] bg-white px-4 py-3 shadow-sm">
//       <p className="text-[10px] font-black uppercase tracking-wide text-[#7B8190]">
//         {label}
//       </p>
//       <p className="mt-1 text-lg font-black text-[#0D4598]">{value}</p>
//     </div>
//   );
// }

// function RequirementCard({ requirement, index }) {
//   return (
//     <div className="rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] p-3 transition hover:border-[#0D4598]">
//       <div className="flex items-start justify-between gap-3">
//         <div className="flex min-w-0 gap-3">
//           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-xs font-black text-[#0D4598]">
//             {String(index + 1).padStart(2, "0")}
//           </div>

//           <div className="min-w-0">
//             <h3 className="text-sm font-black text-[#151515]">
//               {requirement.title}
//             </h3>

//             <ul className="mt-2 space-y-1.5">
//               {requirement.items.map((item) => (
//                 <li
//                   key={item}
//                   className="flex gap-2 text-xs font-medium leading-5 text-[#667085]"
//                 >
//                   <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0D4598]" />
//                   <span>{item}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <button
//         type="button"
//         className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#0D4598] px-4 text-xs font-black text-white transition hover:bg-[#083777]"
//       >
//         <IoCloudUploadOutline size={16} />
//         Upload Document
//       </button>
//     </div>
//   );
// }

// function DownloadCard({ file }) {
//   return (
//     <div className="flex items-center justify-between gap-3 rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] p-3 transition hover:border-[#0D4598]">
//       <div className="flex min-w-0 items-center gap-3">
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598]">
//           <IoDocumentTextOutline size={20} />
//         </div>

//         <div className="min-w-0">
//           <h3 className="line-clamp-1 text-sm font-black text-[#151515]">
//             {file}
//           </h3>
//           <p className="mt-0.5 text-xs font-medium text-[#7B8190]">
//             Click download to get this document.
//           </p>
//         </div>
//       </div>

//       <button
//         type="button"
//         className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-[#DDE6F3] bg-white px-3 text-xs font-black text-[#0D4598] transition hover:bg-[#EAF1FB]"
//       >
//         <IoDownloadOutline size={16} />
//         Download
//       </button>
//     </div>
//   );
// }

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import {
  IoArrowBack,
  IoCheckmarkCircle,
  IoCheckmarkCircleOutline,
  IoClose,
  IoCloudUploadOutline,
  IoDocumentTextOutline,
  IoDownloadOutline,
  IoEyeOutline,
  IoRefreshOutline,
  IoTimeOutline,
  IoTrashOutline,
  IoWarningOutline,
} from "react-icons/io5";

import axios from "@/Apiutils/axiosInstance";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const DOCUMENT_REQUIREMENTS = [
  {
    key: "identity_front",
    title: "Identity Document - Front",
    description:
      "Upload the front side of your passport or national identity card.",
    type: "identity",
    documentSide: "front",
    required: true,
  },
  {
    key: "identity_back",
    title: "Identity Document - Back",
    description: "Upload the back side of your national identity card.",
    type: "identity",
    documentSide: "back",
    required: true,
  },
  {
    key: "license_front",
    title: "Driving Licence - Front",
    description:
      "Upload a clear copy of the front side of your driving licence.",
    type: "license",
    documentSide: "front",
    required: true,
  },
  {
    key: "license_back",
    title: "Driving Licence - Back",
    description:
      "Upload a clear copy of the back side of your driving licence.",
    type: "license",
    documentSide: "back",
    required: true,
  },
  {
    key: "proof_address",
    title: "Proof of Address",
    description:
      "Upload a recent utility bill, bank statement or residence certificate.",
    type: "proof_address",
    documentSide: "single",
    required: true,
  },
  {
    key: "medical_certificate",
    title: "Medical Certificate",
    description:
      "Upload a valid medical fitness certificate from an approved doctor.",
    type: "certificate",
    documentSide: "single",
    required: false,
  },
];

const documentApi = {
  list: (params = {}) =>
    axios.get("/documents", {
      params,
    }),

  upload: (formData) =>
    axios.post("/documents", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  resubmit: (documentId, formData) =>
    axios.patch(`/documents/${documentId}/resubmit`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  remove: (documentId) => axios.delete(`/documents/${documentId}`),
};

function getDocumentId(document) {
  return document?._id || document?.id || "";
}

function getErrorMessage(error, fallback = "Something went wrong.") {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
}

function extractDocuments(response) {
  const payload = response?.data?.data ?? response?.data;

  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.documents)) {
    return payload.documents;
  }

  return [];
}

function formatDate(value) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatFileSize(value = 0) {
  const bytes = Number(value || 0);

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDocumentType(value = "") {
  return String(value || "other")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function isPdfDocument(document) {
  return (
    document?.fileType === "application/pdf" ||
    document?.resourceType === "raw" ||
    document?.originalFileName?.toLowerCase().endsWith(".pdf")
  );
}

function StatusBadge({ status = "not_uploaded" }) {
  const statusClasses = {
    not_uploaded: "border-slate-200 bg-slate-50 text-slate-600",
    pending: "border-amber-200 bg-amber-50 text-amber-700",
    approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
    rejected: "border-rose-200 bg-rose-50 text-rose-700",
  };

  const labels = {
    not_uploaded: "Not uploaded",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${
        statusClasses[status] || statusClasses.not_uploaded
      }`}
    >
      {labels[status] || status}
    </span>
  );
}

function SummaryCard({ label, value, icon: Icon, iconClassName }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
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
    </div>
  );
}

export default function StudentDocumentsPage() {
  const router = useRouter();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [uploadModal, setUploadModal] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [previewDocument, setPreviewDocument] = useState(null);

  const loadDocuments = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await documentApi.list({
        page: 1,
        limit: 100,
      });

      setDocuments(extractDocuments(response));
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Failed to load your documents."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  useEffect(() => {
    if (!successMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [successMessage]);

  const latestDocumentByRequirement = useMemo(() => {
    const result = new Map();

    documents.forEach((document) => {
      const requirementKey = document.requirementKey;

      if (!requirementKey) {
        return;
      }

      const currentDocument = result.get(requirementKey);

      if (!currentDocument) {
        result.set(requirementKey, document);
        return;
      }

      const currentDate = new Date(
        currentDocument.updatedAt || currentDocument.createdAt || 0,
      ).getTime();

      const newDate = new Date(
        document.updatedAt || document.createdAt || 0,
      ).getTime();

      if (newDate > currentDate) {
        result.set(requirementKey, document);
      }
    });

    return result;
  }, [documents]);

  const requiredDocuments = DOCUMENT_REQUIREMENTS.filter(
    (requirement) => requirement.required,
  );

  const approvedRequiredCount = requiredDocuments.filter(
    (requirement) =>
      latestDocumentByRequirement.get(requirement.key)?.status === "approved",
  ).length;

  const progress =
    requiredDocuments.length > 0
      ? Math.round((approvedRequiredCount / requiredDocuments.length) * 100)
      : 0;

  const statistics = useMemo(
    () => ({
      total: documents.length,

      pending: documents.filter((document) => document.status === "pending")
        .length,

      approved: documents.filter((document) => document.status === "approved")
        .length,

      rejected: documents.filter((document) => document.status === "rejected")
        .length,
    }),
    [documents],
  );

  function openUploadModal(requirement) {
    const currentDocument =
      latestDocumentByRequirement.get(requirement.key) || null;

    setError("");
    setSelectedFile(null);

    setUploadModal({
      requirement,
      currentDocument,
    });
  }

  function closeUploadModal() {
    if (uploading) {
      return;
    }

    setUploadModal(null);
    setSelectedFile(null);
  }

  function handleFileSelection(event) {
    const file = event.target.files?.[0] || null;

    setError("");

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError("Only JPG, PNG, WEBP and PDF files are allowed.");

      setSelectedFile(null);
      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("The selected file cannot be larger than 5 MB.");

      setSelectedFile(null);
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
  }

  async function handleUpload(event) {
    event.preventDefault();

    const requirement = uploadModal?.requirement;
    const currentDocument = uploadModal?.currentDocument;

    if (!requirement) {
      return;
    }

    if (!selectedFile) {
      setError("Please select a document file.");
      return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);
    formData.append("title", requirement.title);
    formData.append("type", requirement.type);

    formData.append("documentSide", requirement.documentSide);

    formData.append("requirementKey", requirement.key);

    try {
      setUploading(true);
      setError("");

      if (currentDocument && currentDocument.status === "rejected") {
        await documentApi.resubmit(getDocumentId(currentDocument), formData);

        setSuccessMessage("Document resubmitted successfully.");
      } else {
        await documentApi.upload(formData);

        setSuccessMessage("Document uploaded successfully.");
      }

      setUploadModal(null);
      setSelectedFile(null);

      await loadDocuments();
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Failed to upload the document."));
    } finally {
      setUploading(false);
    }
  }

  function handlePreview(document) {
    if (!document?.fileUrl) {
      setError("Document file URL was not found.");
      return;
    }

    setError("");
    setPreviewDocument(document);
  }

  function handleDownload(document) {
    if (!document?.fileUrl) {
      setError("Document file URL was not found.");
      return;
    }

    window.open(document.fileUrl, "_blank", "noopener,noreferrer");
  }

  async function handleDelete(document) {
    const documentId = getDocumentId(document);

    if (!documentId) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${document.title || "this document"}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(documentId);
      setError("");

      await documentApi.remove(documentId);

      setSuccessMessage("Document deleted successfully.");

      await loadDocuments();
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Failed to delete the document."));
    } finally {
      setDeletingId("");
    }
  }

  return (
    <main className="min-h-screen bg-[#F4F7FB] px-4 py-5 sm:px-6 lg:px-8">
      {successMessage ? (
        <div className="fixed right-5 top-5 z-[200] flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-2xl">
          <IoCheckmarkCircle className="text-xl text-emerald-400" />
          {successMessage}
        </div>
      ) : null}

      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl text-[#0D4598] shadow-sm transition hover:bg-[#0D4598] hover:text-white"
            >
              <IoArrowBack />
            </button>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0D4598]">
                Student Panel / Documents
              </p>

              <h1 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                Document Verification
              </h1>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                Upload your required documents and monitor their verification
                status.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={loadDocuments}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
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
              className="ml-auto shrink-0 rounded-full p-1 hover:bg-rose-100"
              aria-label="Close error"
            >
              <IoClose />
            </button>
          </div>
        ) : null}

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-black text-slate-900">
                Verification progress
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {approvedRequiredCount} of {requiredDocuments.length} required
                documents approved
              </p>
            </div>

            <p className="text-2xl font-black text-[#0D4598]">{progress}%</p>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-[#0D4598] transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </section>

        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Uploaded"
            value={statistics.total}
            icon={IoDocumentTextOutline}
            iconClassName="bg-blue-50 text-blue-700"
          />

          <SummaryCard
            label="Pending"
            value={statistics.pending}
            icon={IoTimeOutline}
            iconClassName="bg-amber-50 text-amber-600"
          />

          <SummaryCard
            label="Approved"
            value={statistics.approved}
            icon={IoCheckmarkCircleOutline}
            iconClassName="bg-emerald-50 text-emerald-600"
          />

          <SummaryCard
            label="Rejected"
            value={statistics.rejected}
            icon={IoWarningOutline}
            iconClassName="bg-rose-50 text-rose-600"
          />
        </section>

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Required documents
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Accepted formats: JPG, PNG, WEBP and PDF. Maximum file size: 5
                MB.
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#0D4598]">
              {DOCUMENT_REQUIREMENTS.length} documents
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {DOCUMENT_REQUIREMENTS.map((requirement, index) => {
              const currentDocument = latestDocumentByRequirement.get(
                requirement.key,
              );

              const status = currentDocument?.status || "not_uploaded";

              const canUpload =
                !currentDocument || currentDocument.status === "rejected";

              return (
                <article
                  key={requirement.key}
                  className="flex min-h-[260px] flex-col rounded-2xl border border-slate-200 bg-[#FBFCFE] p-5 transition hover:border-blue-200 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-sm font-black text-[#0D4598]">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <StatusBadge status={status} />
                  </div>

                  <div className="mt-4 flex-1">
                    <h3 className="font-black text-slate-900">
                      {requirement.title}

                      {requirement.required ? (
                        <span className="ml-1 text-rose-600">*</span>
                      ) : (
                        <span className="ml-2 text-xs font-semibold text-slate-400">
                          Optional
                        </span>
                      )}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {requirement.description}
                    </p>

                    {currentDocument ? (
                      <div className="mt-3 rounded-xl border border-slate-200 bg-white px-3 py-2">
                        <p className="truncate text-xs font-bold text-slate-700">
                          {currentDocument.originalFileName ||
                            currentDocument.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Uploaded{" "}
                          {formatDate(
                            currentDocument.uploadedAt ||
                              currentDocument.createdAt,
                          )}
                        </p>
                      </div>
                    ) : null}

                    {currentDocument?.status === "rejected" &&
                    currentDocument.rejectionReason ? (
                      <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold leading-5 text-rose-700">
                        <strong>Admin reason:</strong>{" "}
                        {currentDocument.rejectionReason}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {currentDocument ? (
                      <button
                        type="button"
                        onClick={() => handlePreview(currentDocument)}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                      >
                        <IoEyeOutline className="text-base" />
                        View
                      </button>
                    ) : null}

                    {canUpload ? (
                      <button
                        type="button"
                        onClick={() => openUploadModal(requirement)}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#0D4598] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#083777]"
                      >
                        <IoCloudUploadOutline className="text-base" />

                        {currentDocument?.status === "rejected"
                          ? "Resubmit"
                          : "Upload"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="cursor-not-allowed rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-400"
                      >
                        {currentDocument?.status === "approved"
                          ? "Verified"
                          : "Under review"}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-lg font-black text-slate-900">
              My uploaded documents
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View your document details and current verification status.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-black uppercase tracking-[0.08em] text-slate-500">
                  <th className="px-5 py-3">Document</th>

                  <th className="px-5 py-3">Type</th>

                  <th className="px-5 py-3">Uploaded</th>

                  <th className="px-5 py-3">Size</th>

                  <th className="px-5 py-3">Status</th>

                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-sm font-bold text-slate-500"
                    >
                      <IoRefreshOutline className="mx-auto mb-2 animate-spin text-2xl text-[#0D4598]" />
                      Loading documents...
                    </td>
                  </tr>
                ) : documents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center">
                      <IoDocumentTextOutline className="mx-auto text-4xl text-slate-300" />

                      <p className="mt-3 text-sm font-bold text-slate-600">
                        No document uploaded yet.
                      </p>
                    </td>
                  </tr>
                ) : (
                  documents.map((document) => {
                    const documentId = getDocumentId(document);

                    return (
                      <tr key={documentId} className="text-sm text-slate-600">
                        <td className="px-5 py-4">
                          <p className="font-black text-slate-900">
                            {document.title || "Untitled document"}
                          </p>

                          <p className="mt-1 max-w-[280px] truncate text-xs text-slate-400">
                            {document.originalFileName || "-"}
                          </p>
                        </td>

                        <td className="px-5 py-4 font-semibold">
                          {formatDocumentType(document.type)}
                        </td>

                        <td className="px-5 py-4">
                          {formatDate(
                            document.uploadedAt || document.createdAt,
                          )}
                        </td>

                        <td className="px-5 py-4">
                          {formatFileSize(document.fileSize)}
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge status={document.status} />
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handlePreview(document)}
                              className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
                              title="View document"
                            >
                              <IoEyeOutline className="text-lg" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDownload(document)}
                              className="rounded-lg border border-blue-200 bg-blue-50 p-2 text-blue-700 transition hover:bg-blue-100"
                              title="Open or download"
                            >
                              <IoDownloadOutline className="text-lg" />
                            </button>

                            {document.status !== "approved" ? (
                              <button
                                type="button"
                                onClick={() => handleDelete(document)}
                                disabled={deletingId === documentId}
                                className="rounded-lg border border-rose-200 bg-rose-50 p-2 text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
                                title="Delete document"
                              >
                                {deletingId === documentId ? (
                                  <IoRefreshOutline className="animate-spin text-lg" />
                                ) : (
                                  <IoTrashOutline className="text-lg" />
                                )}
                              </button>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {uploadModal ? (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#0D4598]">
                  {uploadModal.currentDocument?.status === "rejected"
                    ? "Resubmit document"
                    : "Upload document"}
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-900">
                  {uploadModal.requirement.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeUploadModal}
                disabled={uploading}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 disabled:opacity-50"
                aria-label="Close upload modal"
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="p-6">
              {uploadModal.currentDocument?.status === "rejected" &&
              uploadModal.currentDocument.rejectionReason ? (
                <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                  <p className="font-black">Rejection reason</p>

                  <p className="mt-1 leading-6">
                    {uploadModal.currentDocument.rejectionReason}
                  </p>
                </div>
              ) : null}

              <label className="block text-sm font-black text-slate-800">
                Select document
              </label>

              <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center transition hover:border-[#0D4598] hover:bg-blue-50/30">
                <IoCloudUploadOutline className="text-4xl text-[#0D4598]" />

                <span className="mt-3 text-sm font-black text-slate-800">
                  Click to select a file
                </span>

                <span className="mt-1 text-xs text-slate-500">
                  JPG, PNG, WEBP or PDF up to 5 MB
                </span>

                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,.pdf"
                  onChange={handleFileSelection}
                  className="hidden"
                />
              </label>

              {selectedFile ? (
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                  <IoCheckmarkCircle className="shrink-0 text-xl text-emerald-600" />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-slate-800">
                      {selectedFile.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeUploadModal}
                  disabled={uploading}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!selectedFile || uploading}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0D4598] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#083777] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {uploading ? (
                    <IoRefreshOutline className="animate-spin text-lg" />
                  ) : (
                    <IoCloudUploadOutline className="text-lg" />
                  )}

                  {uploading
                    ? "Uploading..."
                    : uploadModal.currentDocument?.status === "rejected"
                      ? "Resubmit"
                      : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {previewDocument ? (
        <div className="fixed inset-0 z-[160] flex items-center justify-center bg-slate-950/75 p-3 backdrop-blur-sm sm:p-5">
          <div className="flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
              <div className="min-w-0">
                <h2 className="truncate font-black text-slate-900">
                  {previewDocument.title || "Document preview"}
                </h2>

                <p className="mt-1 truncate text-xs text-slate-500">
                  {previewDocument.originalFileName || "-"}
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => handleDownload(previewDocument)}
                  className="rounded-xl border border-blue-200 bg-blue-50 p-2 text-blue-700 transition hover:bg-blue-100"
                  title="Open document"
                >
                  <IoDownloadOutline className="text-xl" />
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewDocument(null)}
                  className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100"
                  aria-label="Close preview"
                >
                  <IoClose className="text-xl" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto bg-slate-100 p-3 sm:p-5">
              {isPdfDocument(previewDocument) ? (
                <iframe
                  title={previewDocument.title || "Document preview"}
                  src={previewDocument.fileUrl}
                  className="h-full min-h-[70vh] w-full rounded-xl border-0 bg-white"
                />
              ) : (
                <img
                  src={previewDocument.fileUrl}
                  alt={previewDocument.title || "Document preview"}
                  className="mx-auto max-h-full max-w-full rounded-xl bg-white object-contain shadow-sm"
                />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
