"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import {
  IoArrowBack,
  IoCheckmarkCircle,
  IoCheckmarkCircleOutline,
  IoClose,
  IoDocumentTextOutline,
  IoDownloadOutline,
  IoEyeOutline,
  IoRefreshOutline,
  IoTimeOutline,
  IoTrashOutline,
  IoWarningOutline,
} from "react-icons/io5";

import axios from "@/Apiutils/axiosInstance";

const STUDENT_REQUIREMENTS = [
  {
    key: "identity_front",
    title: "Identity Document - Front",
    required: true,
  },
  {
    key: "identity_back",
    title: "Identity Document - Back",
    required: true,
  },
  {
    key: "license_front",
    title: "Driving Licence - Front",
    required: true,
  },
  {
    key: "license_back",
    title: "Driving Licence - Back",
    required: true,
  },
  {
    key: "proof_address",
    title: "Proof of Address",
    required: true,
  },
  {
    key: "medical_certificate",
    title: "Medical Certificate",
    required: false,
  },
];

const TEACHER_REQUIREMENTS = [
  {
    key: "teacher_identity_front",
    title: "Identity Document - Front",
    required: true,
  },
  {
    key: "teacher_identity_back",
    title: "Identity Document - Back",
    required: true,
  },
  {
    key: "teacher_license_front",
    title: "Driving Licence - Front",
    required: true,
  },
  {
    key: "teacher_license_back",
    title: "Driving Licence - Back",
    required: true,
  },
  {
    key: "teacher_qualification",
    title: "Instructor Qualification",
    required: true,
  },
  {
    key: "teacher_insurance",
    title: "Professional Insurance",
    required: true,
  },
  {
    key: "teacher_business_registration",
    title: "Business Registration",
    required: false,
  },
  {
    key: "teacher_proof_address",
    title: "Proof of Address",
    required: false,
  },
];

function getErrorMessage(error, fallback = "Something went wrong.") {
  return error?.response?.data?.message || error?.message || fallback;
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

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isPdfDocument(document) {
  return (
    document?.fileType === "application/pdf" ||
    document?.originalFileName?.toLowerCase().endsWith(".pdf") ||
    document?.fileUrl?.toLowerCase().includes(".pdf")
  );
}

function StatusBadge({ status = "not_uploaded" }) {
  const styles = {
    not_uploaded: "border-slate-200 bg-slate-50 text-slate-600",
    pending: "border-amber-200 bg-amber-50 text-amber-700",
    approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
    rejected: "border-rose-200 bg-rose-50 text-rose-700",
  };

  const labels = {
    not_uploaded: "Not Uploaded",
    pending: "Pending",
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

function SummaryCard({ title, value, icon: Icon, className }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
            {title}
          </p>

          <p className="mt-2 text-2xl font-black text-slate-900">{value}</p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${className}`}
        >
          <Icon className="text-xl" />
        </div>
      </div>
    </div>
  );
}

export default function UserDocumentsPage() {
  const params = useParams();
  const router = useRouter();

  const userId = params?.userId;

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [selectedDocument, setSelectedDocument] = useState(null);

  const [reviewDecision, setReviewDecision] = useState("approved");

  const [rejectionReason, setRejectionReason] = useState("");

  const [reviewing, setReviewing] = useState(false);

  const [deletingId, setDeletingId] = useState("");

  const loadUserDocuments = useCallback(async () => {
    if (!userId) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`/documents/user/${userId}`);

      setData(response?.data?.data ?? response?.data);
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Failed to load user documents."));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadUserDocuments();
  }, [loadUserDocuments]);

  useEffect(() => {
    if (!successMessage) {
      return undefined;
    }

    const timer = window.setTimeout(() => setSuccessMessage(""), 3000);

    return () => window.clearTimeout(timer);
  }, [successMessage]);

  const user = data?.user;
  const documents = data?.documents || [];

  const requirements =
    user?.role === "teacher" ? TEACHER_REQUIREMENTS : STUDENT_REQUIREMENTS;

  const latestByRequirement = useMemo(() => {
    const map = new Map();

    documents.forEach((document) => {
      if (document.requirementKey && !map.has(document.requirementKey)) {
        map.set(document.requirementKey, document);
      }
    });

    return map;
  }, [documents]);

  const requirementKeys = new Set(
    requirements.map((requirement) => requirement.key),
  );

  const extraDocuments = documents.filter(
    (document) => !requirementKeys.has(document.requirementKey),
  );

  function openReview(document) {
    setSelectedDocument(document);

    setReviewDecision(document.status === "rejected" ? "rejected" : "approved");

    setRejectionReason(document.rejectionReason || "");

    setError("");
  }

  function closeReview() {
    if (reviewing) {
      return;
    }

    setSelectedDocument(null);
    setReviewDecision("approved");
    setRejectionReason("");
  }

  function openFile(document) {
    if (!document?.fileUrl) {
      setError("Document URL was not found.");

      return;
    }

    window.open(document.fileUrl, "_blank", "noopener,noreferrer");
  }

  async function submitReview() {
    if (!selectedDocument?._id) {
      return;
    }

    if (reviewDecision === "rejected" && !rejectionReason.trim()) {
      setError("Please enter the reason for rejection.");

      return;
    }

    try {
      setReviewing(true);
      setError("");

      await axios.patch(`/documents/${selectedDocument._id}/review`, {
        status: reviewDecision,

        rejectionReason:
          reviewDecision === "rejected" ? rejectionReason.trim() : "",
      });

      setSuccessMessage(
        reviewDecision === "approved"
          ? "Document approved successfully."
          : "Document rejected with reason.",
      );

      closeReview();

      await loadUserDocuments();
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Failed to review document."));
    } finally {
      setReviewing(false);
    }
  }

  async function deleteDocument(document) {
    const confirmed = window.confirm(
      `Delete "${document.title || "this document"}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(document._id);
      setError("");

      await axios.delete(`/documents/${document._id}`);

      setSuccessMessage("Document deleted successfully.");

      await loadUserDocuments();
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Failed to delete document."));
    } finally {
      setDeletingId("");
    }
  }

  function renderDocumentRow(requirement, document) {
    const status = document?.status || "not_uploaded";

    return (
      <tr key={requirement.key} className="text-sm text-slate-600">
        <td className="px-5 py-4">
          <p className="font-black text-slate-900">
            {requirement.title}

            {requirement.required ? (
              <span className="ml-1 text-rose-600">*</span>
            ) : (
              <span className="ml-2 text-xs text-slate-400">Optional</span>
            )}
          </p>

          {document ? (
            <p className="mt-1 max-w-[300px] truncate text-xs text-slate-400">
              {document.originalFileName || document.title}
            </p>
          ) : null}
        </td>

        <td className="px-5 py-4">
          {document
            ? formatDate(document.uploadedAt || document.createdAt, true)
            : "-"}
        </td>

        <td className="px-5 py-4">
          {document ? formatFileSize(document.fileSize) : "-"}
        </td>

        <td className="px-5 py-4">
          <StatusBadge status={status} />

          {document?.status === "rejected" && document.rejectionReason ? (
            <div className="mt-2 max-w-sm rounded-lg border border-rose-200 bg-rose-50 p-2 text-xs font-semibold leading-5 text-rose-700">
              <strong>Rejection reason:</strong> {document.rejectionReason}
            </div>
          ) : null}
        </td>

        <td className="px-5 py-4 text-right">
          {document ? (
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => openReview(document)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0D4598] px-3 py-2 text-xs font-black text-white"
              >
                <IoEyeOutline />
                Preview & Review
              </button>

              <button
                type="button"
                onClick={() => openFile(document)}
                className="rounded-xl border border-blue-200 bg-blue-50 p-2 text-blue-700"
                title="Open or download"
              >
                <IoDownloadOutline />
              </button>

              <button
                type="button"
                onClick={() => deleteDocument(document)}
                disabled={deletingId === document._id}
                className="rounded-xl border border-rose-200 bg-rose-50 p-2 text-rose-700 disabled:opacity-50"
              >
                {deletingId === document._id ? (
                  <IoRefreshOutline className="animate-spin" />
                ) : (
                  <IoTrashOutline />
                )}
              </button>
            </div>
          ) : (
            <span className="text-xs font-bold text-slate-400">
              Waiting for upload
            </span>
          )}
        </td>
      </tr>
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F4F7FB]">
        <div className="text-center">
          <IoRefreshOutline className="mx-auto animate-spin text-4xl text-[#0D4598]" />

          <p className="mt-3 font-bold text-slate-600">
            Loading user documents...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F7FB] px-4 py-5 sm:px-6 lg:px-8">
      {successMessage ? (
        <div className="fixed right-5 top-5 z-[200] flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-2xl">
          <IoCheckmarkCircle className="text-xl text-emerald-400" />

          {successMessage}
        </div>
      ) : null}

      <div className="mx-auto max-w-[1500px]">
        <header className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => router.push("/admin/documents")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl text-[#0D4598]"
            >
              <IoArrowBack />
            </button>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0D4598]">
                Admin / User Documents
              </p>

              <h1 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                {user?.name || "User Documents"}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {user?.email} · <span className="capitalize">{user?.role}</span>
                {user?.phone ? ` · ${user.phone}` : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`rounded-full border px-4 py-2 text-sm font-black capitalize ${
                data?.overallStatus === "verified"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : data?.overallStatus === "action_required"
                    ? "border-rose-200 bg-rose-50 text-rose-700"
                    : "border-amber-200 bg-amber-50 text-amber-700"
              }`}
            >
              {String(data?.overallStatus || "incomplete").replaceAll("_", " ")}
            </span>

            <button
              type="button"
              onClick={loadUserDocuments}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-black"
            >
              <IoRefreshOutline />
              Refresh
            </button>
          </div>
        </header>

        {error ? (
          <div className="mb-5 flex gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
            <IoWarningOutline className="text-xl" />
            {error}
          </div>
        ) : null}

        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Uploaded"
            value={data?.summary?.total || 0}
            icon={IoDocumentTextOutline}
            className="bg-blue-50 text-blue-700"
          />

          <SummaryCard
            title="Pending"
            value={data?.summary?.pending || 0}
            icon={IoTimeOutline}
            className="bg-amber-50 text-amber-600"
          />

          <SummaryCard
            title="Approved"
            value={data?.summary?.approved || 0}
            icon={IoCheckmarkCircleOutline}
            className="bg-emerald-50 text-emerald-600"
          />

          <SummaryCard
            title="Rejected"
            value={data?.summary?.rejected || 0}
            icon={IoWarningOutline}
            className="bg-rose-50 text-rose-600"
          />
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-lg font-black text-slate-900">
              Required Documents
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Preview each document before approving or rejecting it.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-black uppercase tracking-[0.08em] text-slate-500">
                  <th className="px-5 py-3">Document</th>
                  <th className="px-5 py-3">Uploaded</th>
                  <th className="px-5 py-3">Size</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {requirements.map((requirement) =>
                  renderDocumentRow(
                    requirement,
                    latestByRequirement.get(requirement.key),
                  ),
                )}

                {extraDocuments.map((document) =>
                  renderDocumentRow(
                    {
                      key: document._id,
                      title: document.title || "Other Document",
                      required: false,
                    },
                    document,
                  ),
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {selectedDocument ? (
        <div className="fixed inset-0 z-[160] flex items-center justify-center bg-slate-950/75 p-3 backdrop-blur-sm sm:p-5">
          <div className="flex max-h-[95vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.15em] text-[#0D4598]">
                  Preview & Review
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-900">
                  {selectedDocument.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeReview}
                disabled={reviewing}
                className="rounded-xl border border-slate-200 p-2"
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1fr)_400px]">
              <div className="min-h-[500px] overflow-auto bg-slate-100 p-4">
                {isPdfDocument(selectedDocument) ? (
                  <iframe
                    title={selectedDocument.title}
                    src={selectedDocument.fileUrl}
                    className="h-full min-h-[72vh] w-full rounded-xl bg-white"
                  />
                ) : (
                  <img
                    src={selectedDocument.fileUrl}
                    alt={selectedDocument.title}
                    className="mx-auto max-h-[75vh] max-w-full rounded-xl bg-white object-contain"
                  />
                )}
              </div>

              <aside className="overflow-y-auto border-l border-slate-200 p-5">
                <StatusBadge status={selectedDocument.status} />

                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="text-xs font-bold uppercase text-slate-400">
                      File Name
                    </dt>
                    <dd className="mt-1 break-all text-sm font-black text-slate-800">
                      {selectedDocument.originalFileName}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs font-bold uppercase text-slate-400">
                      Uploaded
                    </dt>
                    <dd className="mt-1 text-sm font-black text-slate-800">
                      {formatDate(
                        selectedDocument.uploadedAt ||
                          selectedDocument.createdAt,
                        true,
                      )}
                    </dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={() => openFile(selectedDocument)}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-black text-blue-700"
                >
                  <IoDownloadOutline />
                  Open / Download
                </button>

                <div className="mt-6 border-t border-slate-200 pt-5">
                  <p className="text-sm font-black text-slate-800">
                    Review Decision
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setReviewDecision("approved")}
                      className={`rounded-xl border px-3 py-3 text-sm font-black ${
                        reviewDecision === "approved"
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-100"
                          : "border-slate-200"
                      }`}
                    >
                      Approve
                    </button>

                    <button
                      type="button"
                      onClick={() => setReviewDecision("rejected")}
                      className={`rounded-xl border px-3 py-3 text-sm font-black ${
                        reviewDecision === "rejected"
                          ? "border-rose-500 bg-rose-50 text-rose-700 ring-2 ring-rose-100"
                          : "border-slate-200"
                      }`}
                    >
                      Reject
                    </button>
                  </div>

                  {reviewDecision === "rejected" ? (
                    <div className="mt-4">
                      <label className="text-sm font-black text-slate-800">
                        Why are you rejecting this document?{" "}
                        <span className="text-rose-600">*</span>
                      </label>

                      <textarea
                        value={rejectionReason}
                        onChange={(event) =>
                          setRejectionReason(event.target.value)
                        }
                        rows={5}
                        maxLength={1000}
                        placeholder="Example: The uploaded image is unclear. Please upload a clearer copy."
                        className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-rose-400"
                      />

                      <p className="mt-1 text-right text-xs text-slate-400">
                        {rejectionReason.length}
                        /1000
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
                      Confirm that you have previewed and verified the document.
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={submitReview}
                    disabled={reviewing}
                    className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black text-white disabled:opacity-50 ${
                      reviewDecision === "approved"
                        ? "bg-emerald-600"
                        : "bg-rose-600"
                    }`}
                  >
                    {reviewing ? (
                      <IoRefreshOutline className="animate-spin" />
                    ) : null}

                    {reviewing
                      ? "Saving..."
                      : reviewDecision === "approved"
                        ? "Approve Document"
                        : "Reject Document"}
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
