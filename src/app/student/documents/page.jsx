"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaCheckCircle,
  FaChevronLeft,
  FaDownload,
  FaExclamationTriangle,
  FaEye,
  FaFileAlt,
  FaRedo,
  FaSyncAlt,
  FaTimes,
  FaTrashAlt,
  FaUpload,
} from "react-icons/fa";
import {
  deleteDocument,
  getDocuments,
  resubmitDocument,
  uploadDocument,
} from "@/features/API";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const STUDENT_DOCUMENT_REQUIREMENTS = [
  {
    key: "identity_front",
    title: "Identity Document - Front",
    items: [
      "Valid passport or national identity card.",
      "Upload a clear copy of the front side.",
    ],
    type: "identity",
    documentSide: "front",
    required: true,
  },
  {
    key: "identity_back",
    title: "Identity Document - Back",
    items: [
      "Back side of your national identity card.",
      "All text and numbers must be clearly visible.",
    ],
    type: "identity",
    documentSide: "back",
    required: true,
  },
  {
    key: "license_front",
    title: "Driving Licence - Front",
    items: [
      "Upload a clear copy of the front side of your driving licence.",
      "The licence number and expiry date must be readable.",
    ],
    type: "license",
    documentSide: "front",
    required: true,
  },
  {
    key: "license_back",
    title: "Driving Licence - Back",
    items: [
      "Upload a clear copy of the back side of your driving licence.",
      "All categories and conditions must be visible.",
    ],
    type: "license",
    documentSide: "back",
    required: true,
  },
  {
    key: "proof_address",
    title: "Proof of Address",
    items: [
      "Recent utility bill, bank statement or residence certificate.",
      "The document must show your current residential address.",
    ],
    type: "proof_address",
    documentSide: "single",
    required: true,
  },
  {
    key: "medical_certificate",
    title: "Medical Certificate",
    items: [
      "Valid medical fitness certificate from an approved doctor.",
      "The certificate holder name and issue date must be visible.",
    ],
    type: "certificate",
    documentSide: "single",
    required: false,
  },
];

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

function formatDate(value, includeTime = false) {
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

    ...(includeTime
      ? {
          hour: "2-digit",
          minute: "2-digit",
        }
      : {}),
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

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
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

function StatusBadge({ status = "not_uploaded" }) {
  const styles = {
    not_uploaded: "bg-slate-100 text-slate-600",
    selected: "bg-blue-50 text-[#16458f]",
    pending: "bg-amber-50 text-amber-700",
    approved: "bg-emerald-50 text-emerald-700",
    rejected: "bg-rose-50 text-rose-700",
  };

  const labels = {
    not_uploaded: "Not Uploaded",
    selected: "Added",
    pending: "Pending Review",
    approved: "Approved",
    rejected: "Rejected",
  };

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${
        styles[status] || styles.not_uploaded
      }`}
    >
      {status === "approved" || status === "selected" ? (
        <FaCheckCircle size={10} />
      ) : null}

      {status === "rejected" ? <FaExclamationTriangle size={10} /> : null}

      {labels[status] || status}
    </span>
  );
}

function RequiredDocumentCard({
  requirement,
  currentDocument,
  selectedFile,
  uploading,
  deleting,
  onFileChange,
  onRemoveSelectedFile,
  onPreview,
  onDownload,
  onDelete,
}) {
  const status = selectedFile
    ? "selected"
    : currentDocument?.status || "not_uploaded";

  const canSelect = !currentDocument || currentDocument.status === "rejected";

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="min-w-0 text-sm font-extrabold uppercase leading-5 tracking-wide text-[#16458f]">
              {requirement.title}
            </h3>

            {requirement.required ? (
              <span className="text-xs font-extrabold text-[#e2233d]">*</span>
            ) : (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                Optional
              </span>
            )}

            <StatusBadge status={status} />
          </div>
        </div>

        <label
          className={`flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-4 text-xs font-bold text-white shadow-sm transition active:scale-[0.99] ${
            canSelect && !uploading
              ? "cursor-pointer bg-[#e2233d] hover:bg-[#c91f35]"
              : "cursor-not-allowed bg-slate-300"
          }`}
        >
          {currentDocument?.status === "rejected" ? (
            <FaRedo size={12} />
          ) : (
            <FaUpload size={12} />
          )}

          <span>
            {currentDocument?.status === "rejected"
              ? "Select Replacement"
              : currentDocument
                ? currentDocument.status === "approved"
                  ? "Verified"
                  : "Under Review"
                : "Select Document"}
          </span>

          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.webp"
            className="hidden"
            disabled={!canSelect || uploading}
            onChange={(event) => onFileChange(requirement.key, event)}
          />
        </label>
      </div>

      <ul className="mb-5 ml-2 space-y-1">
        {requirement.items.map((item) => (
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
        <div className="flex flex-col gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 p-3 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
              <FaFileAlt size={14} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-800">
                {selectedFile.name}
              </p>

              <p className="mt-0.5 text-[11px] text-slate-500">
                {formatFileSize(selectedFile.size)} · Ready to upload
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onRemoveSelectedFile(requirement.key)}
            disabled={uploading}
            className="flex h-8 w-8 shrink-0 items-center justify-center self-end rounded-lg bg-white text-slate-400 shadow-sm transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50 sm:self-auto"
            aria-label={`Remove ${requirement.title} file`}
          >
            <FaTimes size={12} />
          </button>
        </div>
      ) : currentDocument ? (
        <div
          className={`rounded-xl border p-3 ${
            currentDocument.status === "rejected"
              ? "border-rose-200 bg-rose-50/70"
              : currentDocument.status === "approved"
                ? "border-emerald-100 bg-emerald-50/60"
                : "border-amber-100 bg-amber-50/60"
          }`}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ${
                  currentDocument.status === "rejected"
                    ? "text-rose-600"
                    : currentDocument.status === "approved"
                      ? "text-emerald-600"
                      : "text-amber-600"
                }`}
              >
                <FaFileAlt size={14} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-slate-800">
                  {currentDocument.originalFileName || currentDocument.title}
                </p>

                <p className="mt-0.5 text-[11px] text-slate-500">
                  {formatFileSize(currentDocument.fileSize)} · Uploaded{" "}
                  {formatDate(
                    currentDocument.uploadedAt || currentDocument.createdAt,
                  )}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => onPreview(currentDocument)}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[11px] font-bold text-[#16458f] transition hover:border-blue-200 hover:bg-blue-50"
              >
                <FaEye size={11} />
                Preview
              </button>

              <button
                type="button"
                onClick={() => onDownload(currentDocument)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#16458f] transition hover:border-blue-200 hover:bg-blue-50"
                title="Open or download"
              >
                <FaDownload size={11} />
              </button>

              {currentDocument.status !== "approved" ? (
                <button
                  type="button"
                  onClick={() => onDelete(currentDocument)}
                  disabled={deleting || uploading}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-rose-200 bg-white text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                  title="Delete document"
                >
                  {deleting ? (
                    <FaSyncAlt className="animate-spin" size={11} />
                  ) : (
                    <FaTrashAlt size={11} />
                  )}
                </button>
              ) : null}
            </div>
          </div>

          {currentDocument.status === "rejected" &&
          currentDocument.rejectionReason ? (
            <div className="mt-3 rounded-lg border border-rose-200 bg-white/80 p-3">
              <p className="flex items-center gap-2 text-xs font-extrabold text-rose-700">
                <FaExclamationTriangle size={11} />
                Admin rejection reason
              </p>

              <p className="mt-1 text-xs font-medium leading-5 text-rose-700">
                {currentDocument.rejectionReason}
              </p>

              <p className="mt-2 text-[11px] font-semibold text-rose-500">
                Select a corrected document and upload it again.
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

function DownloadDocumentCard({ document, onPreview, onDownload }) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition duration-200 hover:border-blue-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#16458f]">
          <FaFileAlt size={17} />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-extrabold uppercase tracking-wide text-[#16458f]">
              {document.title || "Submitted Document"}
            </h3>

            <StatusBadge status={document.status} />
          </div>

          <p className="mt-1 truncate text-xs leading-5 text-slate-500">
            {document.originalFileName || "Uploaded document"}
          </p>

          <p className="mt-0.5 text-[11px] text-slate-400">
            {formatDate(document.uploadedAt || document.createdAt, true)} ·{" "}
            {formatFileSize(document.fileSize)}
          </p>

          {document.status === "rejected" && document.rejectionReason ? (
            <p className="mt-2 text-xs font-semibold leading-5 text-rose-600">
              Reason: {document.rejectionReason}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => onPreview(document)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#16458f] bg-white px-4 text-xs font-bold text-[#16458f] transition hover:bg-[#16458f] hover:text-white"
        >
          <FaEye size={12} />
          Preview
        </button>

        <button
          type="button"
          onClick={() => onDownload(document)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#e2233d] bg-white px-4 text-xs font-bold text-[#e2233d] transition hover:bg-[#e2233d] hover:text-white"
        >
          <FaDownload size={12} />
          Download
        </button>
      </div>
    </article>
  );
}

export default function StudentDocumentsPage() {
  const router = useRouter();

  const [documents, setDocuments] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [previewDocument, setPreviewDocument] = useState(null);

  const loadDocuments = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDocuments({
        page: 1,
        limit: 100,
      });

      const allDocuments = extractDocuments(response);

      const requirementKeys = new Set(
        STUDENT_DOCUMENT_REQUIREMENTS.map((requirement) => requirement.key),
      );

      const studentDocuments = allDocuments.filter(
        (document) =>
          requirementKeys.has(document.requirementKey) ||
          !document.requirementKey,
      );

      setDocuments(studentDocuments);
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
    }, 3500);

    return () => window.clearTimeout(timeoutId);
  }, [successMessage]);

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

  const requiredRequirements = STUDENT_DOCUMENT_REQUIREMENTS.filter(
    (requirement) => requirement.required,
  );

  const approvedRequiredCount = requiredRequirements.filter(
    (requirement) =>
      latestDocumentByRequirement.get(requirement.key)?.status === "approved",
  ).length;

  const submittedRequiredCount = requiredRequirements.filter((requirement) =>
    latestDocumentByRequirement.has(requirement.key),
  ).length;

  const verificationProgress =
    requiredRequirements.length > 0
      ? Math.round((approvedRequiredCount / requiredRequirements.length) * 100)
      : 0;

  const selectedCount = Object.keys(selectedFiles).length;

  const remainingRequiredCount = requiredRequirements.filter(
    (requirement) =>
      !latestDocumentByRequirement.has(requirement.key) &&
      !selectedFiles[requirement.key],
  ).length;

  function handleFileChange(requirementKey, event) {
    const file = event.target.files?.[0];

    event.target.value = "";
    setError("");

    if (!file) {
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError("Only PDF, JPG, JPEG, PNG and WEBP files are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("The selected file cannot be larger than 5 MB.");
      return;
    }

    setSelectedFiles((previousFiles) => ({
      ...previousFiles,
      [requirementKey]: file,
    }));
  }

  function handleRemoveSelectedFile(requirementKey) {
    if (uploading) {
      return;
    }

    setSelectedFiles((previousFiles) => {
      const updatedFiles = {
        ...previousFiles,
      };

      delete updatedFiles[requirementKey];

      return updatedFiles;
    });
  }

  async function uploadRequirement(requirement, file) {
    const currentDocument = latestDocumentByRequirement.get(requirement.key);

    const formData = new FormData();

    formData.append("file", file);
    formData.append("title", requirement.title);
    formData.append("type", requirement.type);
    formData.append("documentSide", requirement.documentSide);
    formData.append("requirementKey", requirement.key);

    if (currentDocument?.status === "rejected") {
      await resubmitDocument(getDocumentId(currentDocument), formData);
    } else {
      await uploadDocument(formData);
    }

    return documentApi.uploadDocument(formData);
  }

  async function handleUploadSelectedDocuments() {
    const selectedEntries = Object.entries(selectedFiles);

    if (selectedEntries.length === 0) {
      setError("Please select at least one document before uploading.");
      return;
    }

    const successfulKeys = [];
    const failedUploads = [];

    try {
      setUploading(true);
      setError("");

      for (const [requirementKey, file] of selectedEntries) {
        const requirement = STUDENT_DOCUMENT_REQUIREMENTS.find(
          (item) => item.key === requirementKey,
        );

        if (!requirement) {
          continue;
        }

        try {
          await uploadRequirement(requirement, file);

          successfulKeys.push(requirementKey);
        } catch (uploadError) {
          failedUploads.push({
            requirementKey,

            message: getErrorMessage(
              uploadError,
              `Failed to upload ${requirement.title}.`,
            ),
          });
        }
      }

      if (successfulKeys.length > 0) {
        setSelectedFiles((previousFiles) => {
          const updatedFiles = {
            ...previousFiles,
          };

          successfulKeys.forEach((key) => {
            delete updatedFiles[key];
          });

          return updatedFiles;
        });

        await loadDocuments();
      }

      if (failedUploads.length > 0) {
        setError(failedUploads[0].message);

        if (successfulKeys.length > 0) {
          setSuccessMessage(
            `${successfulKeys.length} document${
              successfulKeys.length === 1 ? "" : "s"
            } uploaded successfully. Please retry the failed document.`,
          );
        }

        return;
      }

      setSuccessMessage(
        `${successfulKeys.length} document${
          successfulKeys.length === 1 ? "" : "s"
        } uploaded successfully.`,
      );
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

      await deleteDocument(documentId);

      setSuccessMessage("Document deleted successfully.");

      await loadDocuments();
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Failed to delete the document."));
    } finally {
      setDeletingId("");
    }
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-6 sm:px-6 lg:px-8">
      {successMessage ? (
        <div className="fixed right-5 top-5 z-[200] flex max-w-md items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-2xl">
          <FaCheckCircle className="shrink-0 text-emerald-400" />

          <span>{successMessage}</span>
        </div>
      ) : null}

      <section className="mx-auto w-full">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 sm:items-center">
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
          </div>

          <button
            type="button"
            onClick={loadDocuments}
            disabled={loading || uploading}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-[#16458f] shadow-sm transition hover:border-blue-200 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaSyncAlt className={loading ? "animate-spin" : ""} size={12} />
            Refresh
          </button>
        </header>

        {error ? (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
            <FaExclamationTriangle className="mt-0.5 shrink-0" />

            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition hover:bg-rose-100"
              aria-label="Close error"
            >
              <FaTimes size={11} />
            </button>
          </div>
        ) : null}

        {/* <section className="mb-5 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-[#16458f] to-[#2763b7] p-5 text-white shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-100">
                Verification progress
              </p>

              <h2 className="mt-1 text-xl font-extrabold">
                {approvedRequiredCount} of {requiredRequirements.length}{" "}
                required documents approved
              </h2>

              <p className="mt-1 text-xs leading-5 text-blue-100">
                {submittedRequiredCount} required documents submitted. Admin
                will verify each document separately.
              </p>
            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-white/30 bg-white/10 text-lg font-extrabold">
              {verificationProgress}%
            </div>
          </div>

          <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{
                width: `${verificationProgress}%`,
              }}
            />
          </div>
        </section> */}

        <section className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm sm:p-5 lg:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                Required Documents
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Accepted formats are PDF, JPG, JPEG, PNG and WEBP. Maximum file
                size is 5 MB.
              </p>
            </div>

            <span className="inline-flex w-fit items-center rounded-full bg-blue-100 px-3 py-1.5 text-xs font-extrabold text-[#16458f]">
              {STUDENT_DOCUMENT_REQUIREMENTS.length} requirements
            </span>
          </div>

          {loading ? (
            <div className="flex min-h-[250px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white">
              <FaSyncAlt className="animate-spin text-2xl text-[#16458f]" />

              <p className="mt-3 text-sm font-bold text-slate-500">
                Loading documents...
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-1">
              {STUDENT_DOCUMENT_REQUIREMENTS.map((requirement) => {
                const currentDocument = latestDocumentByRequirement.get(
                  requirement.key,
                );

                return (
                  <RequiredDocumentCard
                    key={requirement.key}
                    requirement={requirement}
                    currentDocument={currentDocument}
                    selectedFile={selectedFiles[requirement.key]}
                    uploading={uploading}
                    deleting={
                      Boolean(currentDocument) &&
                      deletingId === getDocumentId(currentDocument)
                    }
                    onFileChange={handleFileChange}
                    onRemoveSelectedFile={handleRemoveSelectedFile}
                    onPreview={handlePreview}
                    onDownload={handleDownload}
                    onDelete={handleDelete}
                  />
                );
              })}
            </div>
          )}
        </section>

        {documents.length > 0 ? (
          <section className="mt-5 rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm sm:p-5 lg:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-extrabold text-slate-900">
                Downloadable Documents
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Preview or download the available copies of your submitted
                documents.
              </p>
            </div>

            <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
              {documents.map((document) => (
                <DownloadDocumentCard
                  key={getDocumentId(document)}
                  document={document}
                  onPreview={handlePreview}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-5 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-xs font-semibold text-slate-500">
            {selectedCount > 0
              ? `${selectedCount} document${
                  selectedCount === 1 ? "" : "s"
                } ready to upload.`
              : remainingRequiredCount > 0
                ? `${remainingRequiredCount} required document${
                    remainingRequiredCount === 1 ? "" : "s"
                  } still need to be submitted.`
                : verificationProgress === 100
                  ? "All required documents have been approved."
                  : "All required documents have been submitted for verification."}
          </p>

          <button
            type="button"
            onClick={handleUploadSelectedDocuments}
            disabled={selectedCount === 0 || uploading}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#16458f] px-7 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#123a78] disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
          >
            {uploading ? (
              <FaSyncAlt className="animate-spin" size={12} />
            ) : (
              <FaUpload size={12} />
            )}

            {uploading
              ? "Uploading Documents..."
              : selectedCount > 0
                ? `Upload ${selectedCount} Selected Document${
                    selectedCount === 1 ? "" : "s"
                  }`
                : remainingRequiredCount > 0
                  ? `${remainingRequiredCount} Documents Remaining`
                  : verificationProgress === 100
                    ? "Verification Completed"
                    : "Documents Under Review"}
          </button>
        </div>
      </section>

      {previewDocument ? (
        <div className="fixed inset-0 z-[160] flex items-center justify-center bg-slate-950/75 p-3 backdrop-blur-sm sm:p-5">
          <div className="flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
              <div className="min-w-0">
                <h2 className="truncate font-extrabold text-[#16458f]">
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
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#e2233d] bg-white px-4 text-xs font-bold text-[#e2233d] transition hover:bg-[#e2233d] hover:text-white"
                >
                  <FaDownload size={12} />
                  Download
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewDocument(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-100"
                  aria-label="Close preview"
                >
                  <FaTimes size={13} />
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
