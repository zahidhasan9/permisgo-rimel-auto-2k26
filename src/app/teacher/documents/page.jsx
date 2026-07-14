// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   FaCheckCircle,
//   FaChevronLeft,
//   FaDownload,
//   FaFileAlt,
//   FaTimes,
//   FaUpload,
// } from "react-icons/fa";

// const documentSections = [
//   {
//     id: "identity",
//     title: "Identity & Legal Status",
//     items: [
//       "Valid passport or national identity card",
//       "Valid residence permit for non-EU applicants",
//     ],
//   },
//   {
//     id: "driving-license",
//     title: "Driving License",
//     items: [
//       "Valid Category B driving license",
//       "Minimum three years of driving experience",
//     ],
//   },
//   {
//     id: "instructor-qualification",
//     title: "Instructor Qualification",
//     items: ["Titre Professionnel ECSR driving instructor diploma"],
//   },
//   {
//     id: "teaching-authorization",
//     title: "Teaching Authorization",
//     items: ["Autorisation d’enseigner issued by the Prefecture"],
//   },
//   {
//     id: "medical-certificate",
//     title: "Medical Certificate",
//     items: ["Medical fitness certificate issued by an approved doctor"],
//   },
//   {
//     id: "criminal-record",
//     title: "Criminal Record Check",
//     items: ["Clean criminal record: Casier judiciaire Bulletin n°2"],
//   },
//   {
//     id: "business-registration",
//     title: "Business Registration",
//     items: [
//       "Auto-entrepreneur or company registration",
//       "SIRET number issued through URSSAF or INSEE",
//     ],
//   },
//   {
//     id: "professional-insurance",
//     title: "Professional Insurance",
//     items: ["Responsabilité civile professionnelle insurance"],
//   },
// ];

// const downloadableDocuments = [
//   {
//     id: "permit-front",
//     title: "Front of the Permit",
//     description: "Download the front copy of your driving permit.",
//     fileUrl: "/documents/front-of-permit.pdf",
//   },
//   {
//     id: "permit-back",
//     title: "Back of the Permit",
//     description: "Download the back copy of your driving permit.",
//     fileUrl: "/documents/back-of-permit.pdf",
//   },
// ];

// function RequiredDocumentCard({
//   section,
//   selectedFile,
//   onFileChange,
//   onRemove,
// }) {
//   return (
//     <article className="group rounded-2xl border border-slate-200 bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-5">
//       <div className="mb-4 flex items-start justify-between gap-3">
//         <div className="flex w-full items-center justify-between gap-4">
//           <h3 className="min-w-0 text-sm font-extrabold uppercase leading-5 tracking-wide text-[#16458f]">
//             {section.title}
//           </h3>

//           <label className="flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#e2233d] px-4 text-xs font-bold text-white shadow-sm transition hover:bg-[#c91f35] active:scale-[0.99]">
//             <FaUpload size={12} />

//             <span>Select Document</span>

//             <input
//               type="file"
//               accept=".pdf,.jpg,.jpeg,.png"
//               className="hidden"
//               onChange={(event) => onFileChange(section.id, event)}
//             />
//           </label>
//         </div>

//         {selectedFile && (
//           <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
//             <FaCheckCircle size={10} />
//             Added
//           </span>
//         )}
//       </div>

//       <ul className="mb-5 space-y0-.5 ml-2">
//         {section.items.map((item) => (
//           <li
//             key={item}
//             className="flex items-start gap-2 text-[13px] font-medium leading-5 text-slate-600"
//           >
//             <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#16458f]" />
//             <span>{item}</span>
//           </li>
//         ))}
//       </ul>

//       {selectedFile ? (
//         <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 p-3">
//           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
//             <FaFileAlt size={14} />
//           </div>

//           <div className="min-w-0 flex-1">
//             <p className="truncate text-xs font-bold text-slate-800">
//               {selectedFile.name}
//             </p>

//             <p className="mt-0.5 text-[11px] text-slate-500">
//               {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={() => onRemove(section.id)}
//             className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm transition hover:bg-red-50 hover:text-red-600"
//             aria-label={`Remove ${section.title} file`}
//           >
//             <FaTimes size={12} />
//           </button>
//         </div>
//       ) : (
//         <></>
//       )}
//     </article>
//   );
// }

// function DownloadDocumentCard({ document }) {
//   return (
//     <article className="flex flex-row gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition duration-200 hover:border-blue-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-5">
//       <div className="flex min-w-0 justify-center items-center gap-3">
//         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#16458f]">
//           <FaFileAlt size={17} />
//         </div>

//         <div className="min-w-0">
//           <h3 className="text-sm font-extrabold uppercase tracking-wide text-[#16458f]">
//             {document.title}
//           </h3>

//           <p className="mt-1 text-xs leading-5 text-slate-500">
//             {document.description}
//           </p>
//         </div>
//       </div>

//       <a
//         href={document.fileUrl}
//         download
//         className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#e2233d] bg-white px-5 text-xs font-bold text-[#e2233d] transition hover:bg-[#e2233d] hover:text-white"
//       >
//         <FaDownload size={12} />
//         Download
//       </a>
//     </article>
//   );
// }

// export default function MyDocumentPage() {
//   const router = useRouter();

//   const [uploadedFiles, setUploadedFiles] = useState({});

//   const handleFileChange = (sectionId, event) => {
//     const file = event.target.files?.[0];

//     if (!file) {
//       return;
//     }

//     setUploadedFiles((previousFiles) => ({
//       ...previousFiles,
//       [sectionId]: file,
//     }));

//     event.target.value = "";
//   };

//   const handleRemoveFile = (sectionId) => {
//     setUploadedFiles((previousFiles) => {
//       const updatedFiles = { ...previousFiles };
//       delete updatedFiles[sectionId];
//       return updatedFiles;
//     });
//   };

//   const uploadedCount = Object.keys(uploadedFiles).length;
//   const totalDocuments = documentSections.length;

//   const uploadProgress = Math.round((uploadedCount / totalDocuments) * 100);

//   return (
//     <main className="min-h-screen bg-[#f8fafc] px-4 py-6 sm:px-6 lg:px-8">
//       <section className="mx-auto w-full ">
//         {/* Page header */}
//         <header className="mb-6 flex items-start gap-3 sm:items-center">
//           <button
//             type="button"
//             onClick={() => router.back()}
//             className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#16458f] shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
//             aria-label="Go back"
//           >
//             <FaChevronLeft size={14} />
//           </button>

//           <div className="min-w-0">
//             <h1 className="text-2xl font-extrabold leading-tight text-[#16458f] sm:text-[28px]">
//               My Documents
//             </h1>

//             <p className="mt-1 text-sm leading-5 text-slate-500">
//               Upload and manage the documents required for verification.
//             </p>
//           </div>
//         </header>

//         {/* Progress */}
//         <section className="mb-5 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-[#16458f] to-[#2763b7] p-5 text-white shadow-sm sm:p-6">
//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-100">
//                 Verification progress
//               </p>

//               <h2 className="mt-1 text-xl font-extrabold">
//                 {uploadedCount} of {totalDocuments} documents added
//               </h2>

//               <p className="mt-1 text-xs leading-5 text-blue-100">
//                 Add all required documents before submitting your application.
//               </p>
//             </div>

//             <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-white/30 bg-white/10 text-lg font-extrabold">
//               {uploadProgress}%
//             </div>
//           </div>

//           <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/20">
//             <div
//               className="h-full rounded-full bg-white transition-all duration-500"
//               style={{ width: `${uploadProgress}%` }}
//             />
//           </div>
//         </section>

//         {/* Required documents */}
//         <section className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm sm:p-5 lg:p-6">
//           <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//             {/* <div>
//               <h2 className="text-lg font-extrabold text-slate-900">
//                 Required Documents
//               </h2>

//               <p className="mt-1 text-xs leading-5 text-slate-500">
//                 Accepted formats are PDF, JPG, JPEG and PNG.
//               </p>
//             </div> */}

//             {/* <span className="inline-flex w-fit items-center rounded-full bg-blue-100 px-3 py-1.5 text-xs font-extrabold text-[#16458f]">
//               {totalDocuments} requirements
//             </span> */}
//           </div>

//           <div className="grid gap-4 md:grid-cols-1">
//             {documentSections.map((section) => (
//               <RequiredDocumentCard
//                 key={section.id}
//                 section={section}
//                 selectedFile={uploadedFiles[section.id]}
//                 onFileChange={handleFileChange}
//                 onRemove={handleRemoveFile}
//               />
//             ))}
//           </div>
//         </section>

//         {/* Downloadable documents */}
//         <section className="mt-5 rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm sm:p-5 lg:p-6">
//           <div className="mb-5">
//             <h2 className="text-lg font-extrabold text-slate-900">
//               Downloadable Documents
//             </h2>

//             <p className="mt-1 text-xs leading-5 text-slate-500">
//               Download the available copies of your submitted documents.
//             </p>
//           </div>

//           <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
//             {downloadableDocuments.map((document) => (
//               <DownloadDocumentCard key={document.id} document={document} />
//             ))}
//           </div>
//         </section>

//         {/* Bottom action */}
//         <div className="mt-5 flex justify-end">
//           <button
//             type="button"
//             disabled={uploadedCount !== totalDocuments}
//             className="h-11 w-full rounded-xl bg-[#16458f] px-7 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#123a78] disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
//           >
//             {uploadedCount === totalDocuments
//               ? "Submit Documents"
//               : `${totalDocuments - uploadedCount} Documents Remaining`}
//           </button>
//         </div>
//       </section>
//     </main>
//   );
// }

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import {
  IoArrowBack,
  IoBusinessOutline,
  IoCheckmarkCircle,
  IoCheckmarkCircleOutline,
  IoClose,
  IoCloudUploadOutline,
  IoDocumentTextOutline,
  IoDownloadOutline,
  IoEyeOutline,
  IoIdCardOutline,
  IoRefreshOutline,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
  IoTrashOutline,
  IoWarningOutline,
} from "react-icons/io5";

import axios from "@/Apiutils/axiosInstance";

/* =====================================================
   Upload settings
===================================================== */

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
];

/* =====================================================
   Teacher required documents
===================================================== */

const TEACHER_DOCUMENT_REQUIREMENTS = [
  {
    key: "teacher_identity_front",
    title: "Identity Document - Front",
    description:
      "Upload the front side of your passport or national identity document.",
    type: "identity",
    documentSide: "front",
    required: true,
    icon: IoIdCardOutline,
  },
  {
    key: "teacher_identity_back",
    title: "Identity Document - Back",
    description: "Upload the back side of your national identity document.",
    type: "identity",
    documentSide: "back",
    required: true,
    icon: IoIdCardOutline,
  },
  {
    key: "teacher_license_front",
    title: "Driving Licence - Front",
    description:
      "Upload a clear copy of the front side of your valid driving licence.",
    type: "license",
    documentSide: "front",
    required: true,
    icon: IoDocumentTextOutline,
  },
  {
    key: "teacher_license_back",
    title: "Driving Licence - Back",
    description:
      "Upload a clear copy of the back side of your valid driving licence.",
    type: "license",
    documentSide: "back",
    required: true,
    icon: IoDocumentTextOutline,
  },
  {
    key: "teacher_qualification",
    title: "Instructor Qualification",
    description:
      "Upload your driving instructor qualification, accreditation or teaching certificate.",
    type: "certificate",
    documentSide: "single",
    required: true,
    icon: IoCheckmarkCircleOutline,
  },
  {
    key: "teacher_insurance",
    title: "Professional Insurance",
    description:
      "Upload proof of your current professional or instructor insurance.",
    type: "insurance",
    documentSide: "single",
    required: true,
    icon: IoShieldCheckmarkOutline,
  },
  {
    key: "teacher_business_registration",
    title: "Business Registration",
    description:
      "Upload your business registration or self-employment document, when applicable.",
    type: "other",
    documentSide: "single",
    required: false,
    icon: IoBusinessOutline,
  },
  {
    key: "teacher_proof_address",
    title: "Proof of Address",
    description:
      "Upload a recent utility bill, bank statement or official residence certificate.",
    type: "proof_address",
    documentSide: "single",
    required: false,
    icon: IoDocumentTextOutline,
  },
];

/* =====================================================
   Document API
===================================================== */

const documentApi = {
  getDocuments: (params = {}) => {
    return axios.get("/documents", {
      params,
    });
  },

  uploadDocument: (formData) => {
    return axios.post("/documents", formData);
  },

  resubmitDocument: (documentId, formData) => {
    return axios.patch(`/documents/${documentId}/resubmit`, formData);
  },

  deleteDocument: (documentId) => {
    return axios.delete(`/documents/${documentId}`);
  },
};

/* =====================================================
   Helper functions
===================================================== */

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

function formatDateTime(value) {
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

function formatText(value = "") {
  return String(value || "-")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function isPdfDocument(document) {
  const fileType = document?.fileType?.toLowerCase();

  const originalFileName = document?.originalFileName?.toLowerCase();

  const fileUrl = document?.fileUrl?.toLowerCase();

  return (
    fileType === "application/pdf" ||
    originalFileName?.endsWith(".pdf") ||
    fileUrl?.includes(".pdf")
  );
}

/* =====================================================
   Status badge
===================================================== */

function StatusBadge({ status = "not_uploaded" }) {
  const styles = {
    not_uploaded: "border-slate-200 bg-slate-50 text-slate-600",

    pending: "border-amber-200 bg-amber-50 text-amber-700",

    approved: "border-emerald-200 bg-emerald-50 text-emerald-700",

    rejected: "border-rose-200 bg-rose-50 text-rose-700",
  };

  const labels = {
    not_uploaded: "Not uploaded",
    pending: "Pending review",
    approved: "Approved",
    rejected: "Rejected",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${
        styles[status] || styles.not_uploaded
      }`}
    >
      {labels[status] || status}
    </span>
  );
}

/* =====================================================
   Statistics card
===================================================== */

function StatisticsCard({ title, value, icon: Icon, iconClassName }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
            {title}
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

/* =====================================================
   Main page
===================================================== */

export default function TeacherDocumentPage() {
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

  /* ===================================================
     Load teacher documents
  =================================================== */

  const loadDocuments = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await documentApi.getDocuments({
        page: 1,
        limit: 100,
      });

      const allDocuments = extractDocuments(response);

      /*
       * শুধু teacher requirement documents দেখাবে।
       * পুরোনো teacher documents-ও type অনুযায়ী table-এ থাকতে পারে।
       */
      const teacherDocuments = allDocuments.filter((document) => {
        if (document.requirementKey?.startsWith("teacher_")) {
          return true;
        }

        /*
         * পুরোনো record-এ requirementKey না থাকলে
         * teacher-এর নিজের document table-এ দেখাবে।
         */
        return !document.requirementKey;
      });

      setDocuments(teacherDocuments);
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Failed to load your documents."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  /* ===================================================
     Success notification timeout
  =================================================== */

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

  /* ===================================================
     Latest document for every requirement
  =================================================== */

  const latestDocumentByRequirement = useMemo(() => {
    const result = new Map();

    documents.forEach((document) => {
      const requirementKey = document.requirementKey;

      if (!requirementKey) {
        return;
      }

      const existingDocument = result.get(requirementKey);

      if (!existingDocument) {
        result.set(requirementKey, document);

        return;
      }

      const existingDate = new Date(
        existingDocument.updatedAt || existingDocument.createdAt || 0,
      ).getTime();

      const currentDate = new Date(
        document.updatedAt || document.createdAt || 0,
      ).getTime();

      if (currentDate > existingDate) {
        result.set(requirementKey, document);
      }
    });

    return result;
  }, [documents]);

  /* ===================================================
     Verification progress
  =================================================== */

  const requiredRequirements = TEACHER_DOCUMENT_REQUIREMENTS.filter(
    (requirement) => requirement.required,
  );

  const approvedRequiredCount = requiredRequirements.filter((requirement) => {
    return (
      latestDocumentByRequirement.get(requirement.key)?.status === "approved"
    );
  }).length;

  const progress =
    requiredRequirements.length > 0
      ? Math.round((approvedRequiredCount / requiredRequirements.length) * 100)
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

  /* ===================================================
     Upload modal
  =================================================== */

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

  /* ===================================================
     File selection validation
  =================================================== */

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

  /* ===================================================
     Upload/resubmit
  =================================================== */

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
        await documentApi.resubmitDocument(
          getDocumentId(currentDocument),
          formData,
        );

        setSuccessMessage("Document resubmitted successfully.");
      } else {
        await documentApi.uploadDocument(formData);

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

  /* ===================================================
     Preview/open file
  =================================================== */

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

  /* ===================================================
     Delete document
  =================================================== */

  async function handleDelete(document) {
    const documentId = getDocumentId(document);

    if (!documentId) {
      setError("Document ID was not found.");

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

      await documentApi.deleteDocument(documentId);

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
      {/* Success message */}

      {successMessage ? (
        <div className="fixed right-5 top-5 z-[200] flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-2xl">
          <IoCheckmarkCircle className="text-xl text-emerald-400" />

          {successMessage}
        </div>
      ) : null}

      <div className="mx-auto max-w-7xl">
        {/* Page header */}

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
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0D4598]">
                Teacher Panel / Documents
              </p>

              <h1 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                Instructor Document Verification
              </h1>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                Upload your identity, driving licence, qualification and
                professional documents for admin verification.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={loadDocuments}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <IoRefreshOutline
              className={`text-lg ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </header>

        {/* Error message */}

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

        {/* Verification progress */}

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-black text-slate-900">
                Verification progress
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {approvedRequiredCount} of {requiredRequirements.length}{" "}
                required documents approved
              </p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-black text-[#0D4598]">{progress}%</p>

              {progress === 100 ? (
                <p className="mt-1 text-xs font-black text-emerald-600">
                  Verification completed
                </p>
              ) : (
                <p className="mt-1 text-xs font-bold text-slate-400">
                  Verification in progress
                </p>
              )}
            </div>
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

        {/* Statistics */}

        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatisticsCard
            title="Uploaded"
            value={statistics.total}
            icon={IoDocumentTextOutline}
            iconClassName="bg-blue-50 text-blue-700"
          />

          <StatisticsCard
            title="Pending"
            value={statistics.pending}
            icon={IoTimeOutline}
            iconClassName="bg-amber-50 text-amber-600"
          />

          <StatisticsCard
            title="Approved"
            value={statistics.approved}
            icon={IoCheckmarkCircleOutline}
            iconClassName="bg-emerald-50 text-emerald-600"
          />

          <StatisticsCard
            title="Rejected"
            value={statistics.rejected}
            icon={IoWarningOutline}
            iconClassName="bg-rose-50 text-rose-600"
          />
        </section>

        {/* Required documents */}

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Instructor documents
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Accepted formats: JPG, PNG, WEBP and PDF. Maximum size: 5 MB.
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-[#0D4598]">
              {TEACHER_DOCUMENT_REQUIREMENTS.length} documents
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {TEACHER_DOCUMENT_REQUIREMENTS.map((requirement, index) => {
              const currentDocument = latestDocumentByRequirement.get(
                requirement.key,
              );

              const status = currentDocument?.status || "not_uploaded";

              const canUpload =
                !currentDocument || currentDocument.status === "rejected";

              const RequirementIcon = requirement.icon;

              return (
                <article
                  key={requirement.key}
                  className="flex min-h-[285px] flex-col rounded-2xl border border-slate-200 bg-[#FBFCFE] p-5 transition hover:border-blue-200 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0D4598]">
                      <RequirementIcon className="text-xl" />
                    </div>

                    <StatusBadge status={status} />
                  </div>

                  <div className="mt-4 flex-1">
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 text-xs font-black text-slate-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>

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
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {requirement.description}
                    </p>

                    {currentDocument ? (
                      <div className="mt-3 rounded-xl border border-slate-200 bg-white px-3 py-2">
                        <p className="truncate text-xs font-black text-slate-700">
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
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-700 transition hover:bg-slate-50"
                      >
                        <IoEyeOutline className="text-base" />
                        View
                      </button>
                    ) : null}

                    {canUpload ? (
                      <button
                        type="button"
                        onClick={() => openUploadModal(requirement)}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#0D4598] px-3 py-2 text-xs font-black text-white transition hover:bg-[#083777]"
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
                        className="cursor-not-allowed rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-400"
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

        {/* Uploaded document table */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-lg font-black text-slate-900">
              My uploaded documents
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View your uploaded documents and current verification status.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-black uppercase tracking-[0.08em] text-slate-500">
                  <th className="px-5 py-3">Document</th>

                  <th className="px-5 py-3">Type</th>

                  <th className="px-5 py-3">Uploaded</th>

                  <th className="px-5 py-3">Version</th>

                  <th className="px-5 py-3">Size</th>

                  <th className="px-5 py-3">Status</th>

                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-14 text-center text-sm font-black text-slate-500"
                    >
                      <IoRefreshOutline className="mx-auto mb-2 animate-spin text-2xl text-[#0D4598]" />
                      Loading documents...
                    </td>
                  </tr>
                ) : documents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-14 text-center">
                      <IoDocumentTextOutline className="mx-auto text-4xl text-slate-300" />

                      <p className="mt-3 text-sm font-black text-slate-600">
                        No document uploaded yet.
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Upload your first instructor document above.
                      </p>
                    </td>
                  </tr>
                ) : (
                  documents.map((document) => {
                    const documentId = getDocumentId(document);

                    return (
                      <tr
                        key={documentId}
                        className="text-sm text-slate-600 transition hover:bg-slate-50/60"
                      >
                        <td className="px-5 py-4">
                          <p className="font-black text-slate-900">
                            {document.title || "Untitled document"}
                          </p>

                          <p className="mt-1 max-w-[280px] truncate text-xs text-slate-400">
                            {document.originalFileName || "-"}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <p className="font-bold text-slate-700">
                            {formatText(document.type)}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {formatText(document.documentSide)}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          {formatDateTime(
                            document.uploadedAt || document.createdAt,
                          )}
                        </td>

                        <td className="px-5 py-4 font-black text-slate-700">
                          v{document.version || 1}
                        </td>

                        <td className="px-5 py-4">
                          {formatFileSize(document.fileSize)}
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge status={document.status} />

                          {document.reviewedAt ? (
                            <p className="mt-2 text-xs text-slate-400">
                              Reviewed {formatDate(document.reviewedAt)}
                            </p>
                          ) : null}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handlePreview(document)}
                              className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
                              title="Preview document"
                            >
                              <IoEyeOutline className="text-lg" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDownload(document)}
                              className="rounded-xl border border-blue-200 bg-blue-50 p-2 text-blue-700 transition hover:bg-blue-100"
                              title="Open document"
                            >
                              <IoDownloadOutline className="text-lg" />
                            </button>

                            {document.status !== "approved" ? (
                              <button
                                type="button"
                                onClick={() => handleDelete(document)}
                                disabled={deletingId === documentId}
                                className="rounded-xl border border-rose-200 bg-rose-50 p-2 text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
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

      {/* =================================================
          Upload modal
      ================================================= */}

      {uploadModal ? (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.15em] text-[#0D4598]">
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

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-black text-slate-800">
                  {uploadModal.requirement.title}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {uploadModal.requirement.description}
                </p>
              </div>

              <label className="mt-5 block text-sm font-black text-slate-800">
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
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!selectedFile || uploading}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0D4598] px-5 py-2.5 text-sm font-black text-white transition hover:bg-[#083777] disabled:cursor-not-allowed disabled:opacity-50"
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

      {/* =================================================
          Preview modal
      ================================================= */}

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
