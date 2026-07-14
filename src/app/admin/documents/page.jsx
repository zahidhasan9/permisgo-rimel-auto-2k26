// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";

// import {
//   IoCheckmarkCircle,
//   IoCheckmarkCircleOutline,
//   IoChevronBack,
//   IoChevronForward,
//   IoClose,
//   IoDocumentTextOutline,
//   IoDownloadOutline,
//   IoEyeOutline,
//   IoFilterOutline,
//   IoRefreshOutline,
//   IoSearchOutline,
//   IoTimeOutline,
//   IoTrashOutline,
//   IoWarningOutline,
// } from "react-icons/io5";

// import axios from "@/Apiutils/axiosInstance";

// /* =========================================
//    Filter options
// ========================================= */

// const DOCUMENT_TYPES = [
//   {
//     label: "All Types",
//     value: "all",
//   },
//   {
//     label: "Identity",
//     value: "identity",
//   },
//   {
//     label: "Driving Licence",
//     value: "license",
//   },
//   {
//     label: "Certificate",
//     value: "certificate",
//   },
//   {
//     label: "Insurance",
//     value: "insurance",
//   },
//   {
//     label: "Proof of Address",
//     value: "proof_address",
//   },
//   {
//     label: "Other",
//     value: "other",
//   },
// ];

// const STATUS_OPTIONS = [
//   {
//     label: "All Status",
//     value: "all",
//   },
//   {
//     label: "Pending",
//     value: "pending",
//   },
//   {
//     label: "Approved",
//     value: "approved",
//   },
//   {
//     label: "Rejected",
//     value: "rejected",
//   },
// ];

// /* =========================================
//    Document API
// ========================================= */

// const documentApi = {
//   getDocuments: (params = {}) => {
//     return axios.get("/documents", {
//       params,
//     });
//   },

//   getStatistics: () => {
//     return axios.get("/documents/stats");
//   },

//   reviewDocument: (documentId, data) => {
//     return axios.patch(`/documents/${documentId}/review`, data);
//   },

//   deleteDocument: (documentId) => {
//     return axios.delete(`/documents/${documentId}`);
//   },
// };

// /* =========================================
//    Helper functions
// ========================================= */

// function getDocumentId(document) {
//   return document?._id || document?.id || "";
// }

// function getErrorMessage(error, fallback = "Something went wrong.") {
//   return (
//     error?.response?.data?.message ||
//     error?.response?.data?.error ||
//     error?.message ||
//     fallback
//   );
// }

// function extractDocumentsResponse(response) {
//   const payload = response?.data?.data ?? response?.data;

//   if (Array.isArray(payload)) {
//     return {
//       documents: payload,

//       pagination: {
//         page: 1,
//         limit: payload.length || 10,
//         total: payload.length,
//         totalPages: 1,
//       },
//     };
//   }

//   return {
//     documents: Array.isArray(payload?.documents) ? payload.documents : [],

//     pagination: {
//       page: Number(payload?.pagination?.page || 1),

//       limit: Number(payload?.pagination?.limit || 10),

//       total: Number(payload?.pagination?.total || 0),

//       totalPages: Math.max(Number(payload?.pagination?.totalPages || 1), 1),
//     },
//   };
// }

// function extractStatistics(response) {
//   const payload = response?.data?.data ?? response?.data;

//   return {
//     total: Number(payload?.total || 0),
//     pending: Number(payload?.pending || 0),
//     approved: Number(payload?.approved || 0),
//     rejected: Number(payload?.rejected || 0),
//   };
// }

// function formatDate(value, includeTime = false) {
//   if (!value) {
//     return "-";
//   }

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return "-";
//   }

//   return date.toLocaleString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",

//     ...(includeTime
//       ? {
//           hour: "2-digit",
//           minute: "2-digit",
//         }
//       : {}),
//   });
// }

// function formatFileSize(value = 0) {
//   const bytes = Number(value || 0);

//   if (bytes < 1024) {
//     return `${bytes} B`;
//   }

//   if (bytes < 1024 * 1024) {
//     return `${(bytes / 1024).toFixed(1)} KB`;
//   }

//   return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
// }

// function formatText(value = "") {
//   return String(value || "-")
//     .replaceAll("_", " ")
//     .replace(/\b\w/g, (character) => character.toUpperCase());
// }

// function isPdfDocument(document) {
//   const fileType = document?.fileType?.toLowerCase();

//   const originalFileName = document?.originalFileName?.toLowerCase();

//   const fileUrl = document?.fileUrl?.toLowerCase();

//   return (
//     fileType === "application/pdf" ||
//     originalFileName?.endsWith(".pdf") ||
//     fileUrl?.includes(".pdf")
//   );
// }

// /* =========================================
//    Reusable UI
// ========================================= */

// function StatusBadge({ status = "pending" }) {
//   const statusClasses = {
//     pending: "border-amber-200 bg-amber-50 text-amber-700",

//     approved: "border-emerald-200 bg-emerald-50 text-emerald-700",

//     rejected: "border-rose-200 bg-rose-50 text-rose-700",
//   };

//   return (
//     <span
//       className={`inline-flex rounded-full border px-3 py-1 text-xs font-black capitalize ${
//         statusClasses[status] || statusClasses.pending
//       }`}
//     >
//       {status}
//     </span>
//   );
// }

// function StatisticsCard({
//   title,
//   value,
//   icon: Icon,
//   iconClassName,
//   active,
//   onClick,
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
//         active ? "border-[#0D4598] ring-2 ring-blue-100" : "border-slate-200"
//       }`}
//     >
//       <div className="flex items-center justify-between gap-4">
//         <div>
//           <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
//             {title}
//           </p>

//           <p className="mt-2 text-2xl font-black text-slate-900">{value}</p>
//         </div>

//         <div
//           className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClassName}`}
//         >
//           <Icon className="text-xl" />
//         </div>
//       </div>
//     </button>
//   );
// }

// /* =========================================
//    Main Admin Documents Page
// ========================================= */

// export default function AdminDocumentsPage() {
//   const [documents, setDocuments] = useState([]);

//   const [statistics, setStatistics] = useState({
//     total: 0,
//     pending: 0,
//     approved: 0,
//     rejected: 0,
//   });

//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 1,
//   });

//   const [filters, setFilters] = useState({
//     search: "",
//     type: "all",
//     status: "all",
//   });

//   const [loading, setLoading] = useState(true);

//   const [statisticsLoading, setStatisticsLoading] = useState(true);

//   const [reviewing, setReviewing] = useState(false);

//   const [deletingId, setDeletingId] = useState("");

//   const [error, setError] = useState("");

//   const [successMessage, setSuccessMessage] = useState("");

//   const [selectedDocument, setSelectedDocument] = useState(null);

//   const [reviewDecision, setReviewDecision] = useState("approved");

//   const [rejectionReason, setRejectionReason] = useState("");

//   /* =========================================
//      Active filter count
//   ========================================= */

//   const activeFilterCount = useMemo(() => {
//     let count = 0;

//     if (filters.search.trim()) {
//       count += 1;
//     }

//     if (filters.type !== "all") {
//       count += 1;
//     }

//     if (filters.status !== "all") {
//       count += 1;
//     }

//     return count;
//   }, [filters]);

//   /* =========================================
//      Fetch statistics
//   ========================================= */

//   const loadStatistics = useCallback(async () => {
//     try {
//       setStatisticsLoading(true);

//       const response = await documentApi.getStatistics();

//       setStatistics(extractStatistics(response));
//     } catch (requestError) {
//       console.error("Document statistics error:", requestError);
//     } finally {
//       setStatisticsLoading(false);
//     }
//   }, []);

//   /* =========================================
//      Fetch documents
//   ========================================= */

//   const loadDocuments = useCallback(
//     async (
//       requestedPage = 1,
//       requestedFilters = {
//         search: "",
//         type: "all",
//         status: "all",
//       },
//     ) => {
//       try {
//         setLoading(true);
//         setError("");

//         const params = {
//           page: requestedPage,
//           limit: 10,
//         };

//         if (requestedFilters.search?.trim()) {
//           params.search = requestedFilters.search.trim();
//         }

//         if (requestedFilters.type && requestedFilters.type !== "all") {
//           params.type = requestedFilters.type;
//         }

//         if (requestedFilters.status && requestedFilters.status !== "all") {
//           params.status = requestedFilters.status;
//         }

//         const response = await documentApi.getDocuments(params);

//         const result = extractDocumentsResponse(response);

//         setDocuments(result.documents);
//         setPagination(result.pagination);
//       } catch (requestError) {
//         setError(getErrorMessage(requestError, "Failed to load documents."));
//       } finally {
//         setLoading(false);
//       }
//     },
//     [],
//   );

//   /* =========================================
//      Initial load
//   ========================================= */

//   useEffect(() => {
//     loadDocuments(1, {
//       search: "",
//       type: "all",
//       status: "all",
//     });

//     loadStatistics();
//   }, [loadDocuments, loadStatistics]);

//   /* =========================================
//      Success message timer
//   ========================================= */

//   useEffect(() => {
//     if (!successMessage) {
//       return undefined;
//     }

//     const timeoutId = window.setTimeout(() => {
//       setSuccessMessage("");
//     }, 3000);

//     return () => {
//       window.clearTimeout(timeoutId);
//     };
//   }, [successMessage]);

//   /* =========================================
//      Filter actions
//   ========================================= */

//   function updateFilter(name, value) {
//     setFilters((currentFilters) => ({
//       ...currentFilters,
//       [name]: value,
//     }));
//   }

//   function applyFilters(event) {
//     event?.preventDefault();

//     loadDocuments(1, filters);
//   }

//   function resetFilters() {
//     const clearedFilters = {
//       search: "",
//       type: "all",
//       status: "all",
//     };

//     setFilters(clearedFilters);

//     loadDocuments(1, clearedFilters);
//   }

//   function filterByStatus(status) {
//     const updatedFilters = {
//       ...filters,
//       status,
//     };

//     setFilters(updatedFilters);

//     loadDocuments(1, updatedFilters);
//   }

//   /* =========================================
//      Review modal
//   ========================================= */

//   function openReviewModal(document) {
//     if (!document?.fileUrl) {
//       setError("Cloudinary file URL was not found for this document.");
//     } else {
//       setError("");
//     }

//     setSelectedDocument(document);

//     setReviewDecision(document.status === "rejected" ? "rejected" : "approved");

//     setRejectionReason(document.rejectionReason || "");
//   }

//   function closeReviewModal() {
//     if (reviewing) {
//       return;
//     }

//     setSelectedDocument(null);
//     setReviewDecision("approved");
//     setRejectionReason("");
//   }

//   /* =========================================
//      Approve or reject
//   ========================================= */

//   async function submitReview() {
//     const documentId = getDocumentId(selectedDocument);

//     if (!documentId) {
//       setError("Document ID was not found.");

//       return;
//     }

//     if (reviewDecision === "rejected" && !rejectionReason.trim()) {
//       setError("Rejection reason is required.");

//       return;
//     }

//     try {
//       setReviewing(true);
//       setError("");

//       await documentApi.reviewDocument(documentId, {
//         status: reviewDecision,

//         rejectionReason:
//           reviewDecision === "rejected" ? rejectionReason.trim() : "",
//       });

//       setSuccessMessage(`Document ${reviewDecision} successfully.`);

//       setSelectedDocument(null);
//       setReviewDecision("approved");
//       setRejectionReason("");

//       await Promise.all([
//         loadDocuments(pagination.page, filters),

//         loadStatistics(),
//       ]);
//     } catch (requestError) {
//       setError(getErrorMessage(requestError, "Failed to review the document."));
//     } finally {
//       setReviewing(false);
//     }
//   }

//   /* =========================================
//      Open Cloudinary file
//   ========================================= */

//   function openDocument(document) {
//     if (!document?.fileUrl) {
//       setError("Document file URL was not found.");

//       return;
//     }

//     window.open(document.fileUrl, "_blank", "noopener,noreferrer");
//   }

//   /* =========================================
//      Delete document
//   ========================================= */

//   async function handleDelete(document) {
//     const documentId = getDocumentId(document);

//     if (!documentId) {
//       setError("Document ID was not found.");

//       return;
//     }

//     const confirmed = window.confirm(
//       `Permanently delete "${document.title || "this document"}"?`,
//     );

//     if (!confirmed) {
//       return;
//     }

//     try {
//       setDeletingId(documentId);
//       setError("");

//       await documentApi.deleteDocument(documentId);

//       setSuccessMessage("Document deleted successfully.");

//       const shouldGoPreviousPage =
//         documents.length === 1 && pagination.page > 1;

//       const nextPage = shouldGoPreviousPage
//         ? pagination.page - 1
//         : pagination.page;

//       await Promise.all([loadDocuments(nextPage, filters), loadStatistics()]);
//     } catch (requestError) {
//       setError(getErrorMessage(requestError, "Failed to delete the document."));
//     } finally {
//       setDeletingId("");
//     }
//   }

//   /* =========================================
//      Statistics cards
//   ========================================= */

//   const statisticCards = [
//     {
//       key: "all",
//       title: "All Documents",
//       value: statistics.total,
//       icon: IoDocumentTextOutline,
//       iconClassName: "bg-blue-50 text-blue-700",
//     },
//     {
//       key: "pending",
//       title: "Pending",
//       value: statistics.pending,
//       icon: IoTimeOutline,
//       iconClassName: "bg-amber-50 text-amber-600",
//     },
//     {
//       key: "approved",
//       title: "Approved",
//       value: statistics.approved,
//       icon: IoCheckmarkCircleOutline,
//       iconClassName: "bg-emerald-50 text-emerald-600",
//     },
//     {
//       key: "rejected",
//       title: "Rejected",
//       value: statistics.rejected,
//       icon: IoWarningOutline,
//       iconClassName: "bg-rose-50 text-rose-600",
//     },
//   ];

//   return (
//     <main className="min-h-screen bg-[#F4F7FB] px-4 py-5 sm:px-6 lg:px-8">
//       {/* Success notification */}

//       {successMessage ? (
//         <div className="fixed right-5 top-5 z-[200] flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-2xl">
//           <IoCheckmarkCircle className="text-xl text-emerald-400" />

//           {successMessage}
//         </div>
//       ) : null}

//       <div className="mx-auto max-w-[1500px]">
//         {/* Page header */}

//         <header className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
//           <div>
//             <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0D4598]">
//               Admin Panel / Documents
//             </p>

//             <h1 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
//               Student Documents
//             </h1>

//             <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
//               Review uploaded student documents and approve or reject every
//               submission.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={() => {
//               loadDocuments(pagination.page, filters);

//               loadStatistics();
//             }}
//             disabled={loading}
//             className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             <IoRefreshOutline
//               className={`text-lg ${loading ? "animate-spin" : ""}`}
//             />
//             Refresh
//           </button>
//         </header>

//         {/* Error message */}

//         {error ? (
//           <div className="mb-5 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
//             <IoWarningOutline className="mt-0.5 shrink-0 text-xl" />

//             <span>{error}</span>

//             <button
//               type="button"
//               onClick={() => setError("")}
//               className="ml-auto shrink-0 rounded-full p-1 hover:bg-rose-100"
//               aria-label="Close error"
//             >
//               <IoClose />
//             </button>
//           </div>
//         ) : null}

//         {/* Statistics */}

//         <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//           {statisticCards.map((card) => (
//             <StatisticsCard
//               key={card.key}
//               title={card.title}
//               value={statisticsLoading ? "..." : card.value}
//               icon={card.icon}
//               iconClassName={card.iconClassName}
//               active={filters.status === card.key}
//               onClick={() => filterByStatus(card.key)}
//             />
//           ))}
//         </section>

//         {/* Filters */}

//         <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//           <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
//             <div>
//               <h2 className="flex items-center gap-2 font-black text-slate-900">
//                 <IoFilterOutline className="text-xl text-[#0D4598]" />
//                 Filter documents
//               </h2>

//               <p className="mt-1 text-sm text-slate-500">
//                 {activeFilterCount > 0
//                   ? `${activeFilterCount} active filter${
//                       activeFilterCount > 1 ? "s" : ""
//                     }`
//                   : "Search by student or document information."}
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={resetFilters}
//               className="text-sm font-black text-[#0D4598] transition hover:underline"
//             >
//               Clear filters
//             </button>
//           </div>

//           <form
//             onSubmit={applyFilters}
//             className="grid gap-3 lg:grid-cols-[1fr_220px_220px_auto]"
//           >
//             <div className="relative">
//               <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400" />

//               <input
//                 type="search"
//                 value={filters.search}
//                 onChange={(event) => updateFilter("search", event.target.value)}
//                 placeholder="Student name, email or document..."
//                 className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#0D4598] focus:bg-white"
//               />
//             </div>

//             <select
//               value={filters.type}
//               onChange={(event) => updateFilter("type", event.target.value)}
//               className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-700 outline-none focus:border-[#0D4598]"
//             >
//               {DOCUMENT_TYPES.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={filters.status}
//               onChange={(event) => updateFilter("status", event.target.value)}
//               className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-700 outline-none focus:border-[#0D4598]"
//             >
//               {STATUS_OPTIONS.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>

//             <button
//               type="submit"
//               className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0D4598] px-5 text-sm font-black text-white transition hover:bg-[#083777]"
//             >
//               <IoSearchOutline className="text-lg" />
//               Apply
//             </button>
//           </form>
//         </section>

//         {/* Documents table */}

//         <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//           <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
//             <div>
//               <h2 className="font-black text-slate-900">Document records</h2>

//               <p className="mt-1 text-sm text-slate-500">
//                 {pagination.total} document
//                 {pagination.total !== 1 ? "s" : ""} found
//               </p>
//             </div>

//             <p className="text-xs font-bold text-slate-400">
//               Page {pagination.page} of {pagination.totalPages}
//             </p>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[1120px] divide-y divide-slate-200">
//               <thead className="bg-slate-50">
//                 <tr className="text-left text-xs font-black uppercase tracking-[0.08em] text-slate-500">
//                   <th className="px-5 py-3">Student</th>

//                   <th className="px-5 py-3">Document</th>

//                   <th className="px-5 py-3">Type</th>

//                   <th className="px-5 py-3">Uploaded</th>

//                   <th className="px-5 py-3">Status</th>

//                   <th className="px-5 py-3 text-right">Actions</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-slate-100">
//                 {loading ? (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       className="px-5 py-14 text-center text-sm font-bold text-slate-500"
//                     >
//                       <IoRefreshOutline className="mx-auto mb-2 animate-spin text-2xl text-[#0D4598]" />
//                       Loading documents...
//                     </td>
//                   </tr>
//                 ) : documents.length === 0 ? (
//                   <tr>
//                     <td colSpan={6} className="px-5 py-14 text-center">
//                       <IoDocumentTextOutline className="mx-auto text-4xl text-slate-300" />

//                       <p className="mt-3 text-sm font-bold text-slate-600">
//                         No document found.
//                       </p>
//                     </td>
//                   </tr>
//                 ) : (
//                   documents.map((document) => {
//                     const documentId = getDocumentId(document);

//                     return (
//                       <tr
//                         key={documentId}
//                         className="text-sm text-slate-600 transition hover:bg-slate-50/60"
//                       >
//                         {/* Student */}

//                         <td className="px-5 py-4">
//                           <p className="font-black text-slate-900">
//                             {document.user?.name || "Unknown student"}
//                           </p>

//                           <p className="mt-1 text-xs text-slate-400">
//                             {document.user?.email || "-"}
//                           </p>

//                           {document.user?.phone ? (
//                             <p className="mt-1 text-xs text-slate-400">
//                               {document.user.phone}
//                             </p>
//                           ) : null}
//                         </td>

//                         {/* Document */}

//                         <td className="px-5 py-4">
//                           <p className="font-black text-slate-900">
//                             {document.title || "Untitled document"}
//                           </p>

//                           <p className="mt-1 max-w-[280px] truncate text-xs text-slate-400">
//                             {document.originalFileName || "-"}
//                           </p>

//                           <p className="mt-1 text-xs text-slate-400">
//                             {formatFileSize(document.fileSize)} · Version{" "}
//                             {document.version || 1}
//                           </p>
//                         </td>

//                         {/* Type */}

//                         <td className="px-5 py-4">
//                           <p className="font-bold text-slate-700">
//                             {formatText(document.type)}
//                           </p>

//                           <p className="mt-1 text-xs text-slate-400">
//                             {formatText(document.documentSide)}
//                           </p>
//                         </td>

//                         {/* Uploaded */}

//                         <td className="px-5 py-4">
//                           {formatDate(
//                             document.uploadedAt || document.createdAt,
//                             true,
//                           )}
//                         </td>

//                         {/* Status */}

//                         <td className="px-5 py-4">
//                           <StatusBadge status={document.status} />

//                           {document.reviewedAt ? (
//                             <p className="mt-2 text-xs text-slate-400">
//                               Reviewed {formatDate(document.reviewedAt)}
//                             </p>
//                           ) : null}
//                         </td>

//                         {/* Actions */}

//                         <td className="px-5 py-4">
//                           <div className="flex justify-end gap-2">
//                             <button
//                               type="button"
//                               onClick={() => openReviewModal(document)}
//                               className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-black text-blue-700 transition hover:bg-blue-100"
//                             >
//                               <IoEyeOutline className="text-base" />
//                               Review
//                             </button>

//                             <button
//                               type="button"
//                               onClick={() => openDocument(document)}
//                               className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
//                               title="Open document"
//                             >
//                               <IoDownloadOutline className="text-lg" />
//                             </button>

//                             <button
//                               type="button"
//                               onClick={() => handleDelete(document)}
//                               disabled={deletingId === documentId}
//                               className="rounded-xl border border-rose-200 bg-rose-50 p-2 text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
//                               title="Delete document"
//                             >
//                               {deletingId === documentId ? (
//                                 <IoRefreshOutline className="animate-spin text-lg" />
//                               ) : (
//                                 <IoTrashOutline className="text-lg" />
//                               )}
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}

//           {pagination.totalPages > 1 ? (
//             <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-5 py-4">
//               <p className="text-sm font-bold text-slate-500">
//                 Showing page {pagination.page} of {pagination.totalPages}
//               </p>

//               <div className="flex gap-2">
//                 <button
//                   type="button"
//                   onClick={() => loadDocuments(pagination.page - 1, filters)}
//                   disabled={loading || pagination.page <= 1}
//                   className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
//                 >
//                   <IoChevronBack />
//                   Previous
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => loadDocuments(pagination.page + 1, filters)}
//                   disabled={loading || pagination.page >= pagination.totalPages}
//                   className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
//                 >
//                   Next
//                   <IoChevronForward />
//                 </button>
//               </div>
//             </div>
//           ) : null}
//         </section>
//       </div>

//       {/* ======================================
//           Review modal
//       ====================================== */}

//       {selectedDocument ? (
//         <div className="fixed inset-0 z-[160] flex items-center justify-center bg-slate-950/75 p-3 backdrop-blur-sm sm:p-5">
//           <div className="flex max-h-[95vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
//             {/* Modal header */}

//             <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
//               <div className="min-w-0">
//                 <p className="text-xs font-black uppercase tracking-[0.15em] text-[#0D4598]">
//                   Review document
//                 </p>

//                 <h2 className="mt-1 truncate text-xl font-black text-slate-900">
//                   {selectedDocument.title || "Document review"}
//                 </h2>
//               </div>

//               <button
//                 type="button"
//                 onClick={closeReviewModal}
//                 disabled={reviewing}
//                 className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 disabled:opacity-50"
//                 aria-label="Close review"
//               >
//                 <IoClose className="text-xl" />
//               </button>
//             </div>

//             <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1fr)_400px]">
//               {/* Document preview */}

//               <div className="min-h-[480px] overflow-auto bg-slate-100 p-3 sm:p-5">
//                 {!selectedDocument.fileUrl ? (
//                   <div className="flex h-full min-h-[450px] flex-col items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-700">
//                     <IoWarningOutline className="text-4xl" />

//                     <p className="mt-3 font-black">
//                       Document preview unavailable
//                     </p>

//                     <p className="mt-1 text-sm">
//                       No Cloudinary file URL was found.
//                     </p>
//                   </div>
//                 ) : isPdfDocument(selectedDocument) ? (
//                   <iframe
//                     title={selectedDocument.title || "Document preview"}
//                     src={selectedDocument.fileUrl}
//                     className="h-full min-h-[72vh] w-full rounded-xl border-0 bg-white"
//                   />
//                 ) : (
//                   <img
//                     src={selectedDocument.fileUrl}
//                     alt={selectedDocument.title || "Document preview"}
//                     className="mx-auto max-h-[75vh] max-w-full rounded-xl bg-white object-contain shadow-sm"
//                   />
//                 )}
//               </div>

//               {/* Review sidebar */}

//               <aside className="overflow-y-auto border-l border-slate-200 p-5">
//                 {/* Student details */}

//                 <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
//                   <p className="text-xs font-black uppercase tracking-[0.1em] text-slate-400">
//                     Student information
//                   </p>

//                   <p className="mt-3 font-black text-slate-900">
//                     {selectedDocument.user?.name || "Unknown student"}
//                   </p>

//                   <p className="mt-1 text-sm text-slate-500">
//                     {selectedDocument.user?.email || "-"}
//                   </p>

//                   {selectedDocument.user?.phone ? (
//                     <p className="mt-1 text-sm text-slate-500">
//                       {selectedDocument.user.phone}
//                     </p>
//                   ) : null}
//                 </div>

//                 {/* Document details */}

//                 <dl className="mt-5 grid grid-cols-2 gap-4">
//                   <div>
//                     <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">
//                       Type
//                     </dt>

//                     <dd className="mt-1 text-sm font-black text-slate-800">
//                       {formatText(selectedDocument.type)}
//                     </dd>
//                   </div>

//                   <div>
//                     <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">
//                       Side
//                     </dt>

//                     <dd className="mt-1 text-sm font-black text-slate-800">
//                       {formatText(selectedDocument.documentSide)}
//                     </dd>
//                   </div>

//                   <div>
//                     <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">
//                       File size
//                     </dt>

//                     <dd className="mt-1 text-sm font-black text-slate-800">
//                       {formatFileSize(selectedDocument.fileSize)}
//                     </dd>
//                   </div>

//                   <div>
//                     <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">
//                       Version
//                     </dt>

//                     <dd className="mt-1 text-sm font-black text-slate-800">
//                       {selectedDocument.version || 1}
//                     </dd>
//                   </div>

//                   <div className="col-span-2">
//                     <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">
//                       Original file
//                     </dt>

//                     <dd className="mt-1 break-all text-sm font-black text-slate-800">
//                       {selectedDocument.originalFileName || "-"}
//                     </dd>
//                   </div>

//                   <div className="col-span-2">
//                     <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">
//                       Uploaded
//                     </dt>

//                     <dd className="mt-1 text-sm font-black text-slate-800">
//                       {formatDate(
//                         selectedDocument.uploadedAt ||
//                           selectedDocument.createdAt,
//                         true,
//                       )}
//                     </dd>
//                   </div>
//                 </dl>

//                 {/* Open file */}

//                 <button
//                   type="button"
//                   onClick={() => openDocument(selectedDocument)}
//                   disabled={!selectedDocument.fileUrl}
//                   className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-black text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   <IoDownloadOutline className="text-lg" />
//                   Open original file
//                 </button>

//                 {/* Review decision */}

//                 <div className="mt-6 border-t border-slate-200 pt-5">
//                   <label className="text-sm font-black text-slate-800">
//                     Review decision
//                   </label>

//                   <div className="mt-3 grid grid-cols-2 gap-3">
//                     <button
//                       type="button"
//                       onClick={() => setReviewDecision("approved")}
//                       className={`rounded-xl border px-3 py-3 text-sm font-black transition ${
//                         reviewDecision === "approved"
//                           ? "border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-100"
//                           : "border-slate-200 text-slate-600 hover:bg-slate-50"
//                       }`}
//                     >
//                       <IoCheckmarkCircleOutline className="mx-auto mb-1 text-xl" />
//                       Approve
//                     </button>

//                     <button
//                       type="button"
//                       onClick={() => setReviewDecision("rejected")}
//                       className={`rounded-xl border px-3 py-3 text-sm font-black transition ${
//                         reviewDecision === "rejected"
//                           ? "border-rose-500 bg-rose-50 text-rose-700 ring-2 ring-rose-100"
//                           : "border-slate-200 text-slate-600 hover:bg-slate-50"
//                       }`}
//                     >
//                       <IoWarningOutline className="mx-auto mb-1 text-xl" />
//                       Reject
//                     </button>
//                   </div>

//                   {/* Rejection reason */}

//                   {reviewDecision === "rejected" ? (
//                     <div className="mt-4">
//                       <label className="text-sm font-black text-slate-800">
//                         Rejection reason{" "}
//                         <span className="text-rose-600">*</span>
//                       </label>

//                       <textarea
//                         value={rejectionReason}
//                         onChange={(event) =>
//                           setRejectionReason(event.target.value)
//                         }
//                         rows={5}
//                         maxLength={1000}
//                         placeholder="Explain what the student needs to correct..."
//                         className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-rose-400 focus:bg-white"
//                       />

//                       <p className="mt-1 text-right text-xs text-slate-400">
//                         {rejectionReason.length}
//                         /1000
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold leading-6 text-emerald-700">
//                       Confirm that the document is clear, valid and belongs to
//                       the selected student.
//                     </div>
//                   )}

//                   {/* Existing rejection */}

//                   {selectedDocument.status === "rejected" &&
//                   selectedDocument.rejectionReason ? (
//                     <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
//                       <p className="font-black">Previous rejection reason</p>

//                       <p className="mt-1 leading-6">
//                         {selectedDocument.rejectionReason}
//                       </p>
//                     </div>
//                   ) : null}

//                   {/* Save review */}

//                   <button
//                     type="button"
//                     onClick={submitReview}
//                     disabled={reviewing}
//                     className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
//                       reviewDecision === "approved"
//                         ? "bg-emerald-600 hover:bg-emerald-700"
//                         : "bg-rose-600 hover:bg-rose-700"
//                     }`}
//                   >
//                     {reviewing ? (
//                       <IoRefreshOutline className="animate-spin text-lg" />
//                     ) : reviewDecision === "approved" ? (
//                       <IoCheckmarkCircleOutline className="text-lg" />
//                     ) : (
//                       <IoWarningOutline className="text-lg" />
//                     )}

//                     {reviewing
//                       ? "Saving review..."
//                       : reviewDecision === "approved"
//                         ? "Approve Document"
//                         : "Reject Document"}
//                   </button>
//                 </div>
//               </aside>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </main>
//   );
// }

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import {
  IoCheckmarkCircleOutline,
  IoChevronBack,
  IoChevronForward,
  IoClose,
  IoDocumentTextOutline,
  IoEyeOutline,
  IoFilterOutline,
  IoPeopleOutline,
  IoRefreshOutline,
  IoSearchOutline,
  IoTimeOutline,
  IoWarningOutline,
} from "react-icons/io5";

import axios from "@/Apiutils/axiosInstance";

const ROLE_OPTIONS = [
  {
    label: "All Users",
    value: "all",
  },
  {
    label: "Students",
    value: "student",
  },
  {
    label: "Teachers",
    value: "teacher",
  },
];

const STATUS_OPTIONS = [
  {
    label: "All Status",
    value: "all",
  },
  {
    label: "Has Pending",
    value: "pending",
  },
  {
    label: "Has Approved",
    value: "approved",
  },
  {
    label: "Has Rejected",
    value: "rejected",
  },
];

function getErrorMessage(error, fallback = "Something went wrong.") {
  return error?.response?.data?.message || error?.message || fallback;
}

function extractUsers(response) {
  const payload = response?.data?.data ?? response?.data;

  return {
    users: Array.isArray(payload?.users) ? payload.users : [],

    pagination: {
      page: Number(payload?.pagination?.page || 1),

      limit: Number(payload?.pagination?.limit || 10),

      total: Number(payload?.pagination?.total || 0),

      totalPages: Math.max(Number(payload?.pagination?.totalPages || 1), 1),
    },
  };
}

function extractStats(response) {
  const payload = response?.data?.data ?? response?.data;

  return {
    total: Number(payload?.total || 0),
    pending: Number(payload?.pending || 0),
    approved: Number(payload?.approved || 0),
    rejected: Number(payload?.rejected || 0),
  };
}

function formatDate(value) {
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

function RoleBadge({ role }) {
  const className =
    role === "teacher"
      ? "border-violet-200 bg-violet-50 text-violet-700"
      : "border-blue-200 bg-blue-50 text-blue-700";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-black capitalize ${className}`}
    >
      {role}
    </span>
  );
}

function SummaryCard({
  label,
  value,
  icon: Icon,
  iconClassName,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        active ? "border-[#0D4598] ring-2 ring-blue-100" : "border-slate-200"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
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
    </button>
  );
}

export default function AdminDocumentsPage() {
  const router = useRouter();

  const [users, setUsers] = useState([]);

  const [statistics, setStatistics] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const [filters, setFilters] = useState({
    search: "",
    role: "all",
    status: "all",
  });

  const [loading, setLoading] = useState(true);

  const [statsLoading, setStatsLoading] = useState(true);

  const [error, setError] = useState("");

  const activeFilterCount = useMemo(() => {
    let count = 0;

    if (filters.search.trim()) {
      count += 1;
    }

    if (filters.role !== "all") {
      count += 1;
    }

    if (filters.status !== "all") {
      count += 1;
    }

    return count;
  }, [filters]);

  const loadStatistics = useCallback(async () => {
    try {
      setStatsLoading(true);

      const response = await axios.get("/documents/stats");

      setStatistics(extractStats(response));
    } catch (requestError) {
      console.error("Statistics error:", requestError);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const loadUsers = useCallback(
    async (
      requestedPage = 1,
      requestedFilters = {
        search: "",
        role: "all",
        status: "all",
      },
    ) => {
      try {
        setLoading(true);
        setError("");

        const params = {
          page: requestedPage,
          limit: 10,
        };

        if (requestedFilters.search?.trim()) {
          params.search = requestedFilters.search.trim();
        }

        if (requestedFilters.role !== "all") {
          params.role = requestedFilters.role;
        }

        if (requestedFilters.status !== "all") {
          params.status = requestedFilters.status;
        }

        const response = await axios.get("/documents/users", {
          params,
        });

        const result = extractUsers(response);

        setUsers(result.users);
        setPagination(result.pagination);
      } catch (requestError) {
        setError(getErrorMessage(requestError, "Failed to load users."));
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    loadUsers(1, filters);
    loadStatistics();
  }, [loadStatistics, loadUsers]);

  function updateFilter(name, value) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  }

  function applyFilters(event) {
    event?.preventDefault();

    loadUsers(1, filters);
  }

  function resetFilters() {
    const clearedFilters = {
      search: "",
      role: "all",
      status: "all",
    };

    setFilters(clearedFilters);

    loadUsers(1, clearedFilters);
  }

  function filterByStatus(status) {
    const updatedFilters = {
      ...filters,
      status,
    };

    setFilters(updatedFilters);

    loadUsers(1, updatedFilters);
  }

  function viewUserDocuments(userId) {
    router.push(`/admin/documents/${userId}`);
  }

  const cards = [
    {
      key: "all",
      label: "All Documents",
      value: statistics.total,
      icon: IoDocumentTextOutline,
      iconClassName: "bg-blue-50 text-blue-700",
    },
    {
      key: "pending",
      label: "Pending",
      value: statistics.pending,
      icon: IoTimeOutline,
      iconClassName: "bg-amber-50 text-amber-600",
    },
    {
      key: "approved",
      label: "Approved",
      value: statistics.approved,
      icon: IoCheckmarkCircleOutline,
      iconClassName: "bg-emerald-50 text-emerald-600",
    },
    {
      key: "rejected",
      label: "Rejected",
      value: statistics.rejected,
      icon: IoWarningOutline,
      iconClassName: "bg-rose-50 text-rose-600",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F4F7FB] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0D4598]">
              Admin Panel / Documents
            </p>

            <h1 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
              User Document Verification
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Select a student or teacher to review all submitted documents in
              one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              loadUsers(pagination.page, filters);

              loadStatistics();
            }}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
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
              className="ml-auto"
            >
              <IoClose />
            </button>
          </div>
        ) : null}

        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <SummaryCard
              key={card.key}
              {...card}
              value={statsLoading ? "..." : card.value}
              active={filters.status === card.key}
              onClick={() => filterByStatus(card.key)}
            />
          ))}
        </section>

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="flex items-center gap-2 font-black text-slate-900">
                <IoFilterOutline className="text-xl text-[#0D4598]" />
                Filter users
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {activeFilterCount
                  ? `${activeFilterCount} active filter`
                  : "Search students and teachers."}
              </p>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-black text-[#0D4598]"
            >
              Clear filters
            </button>
          </div>

          <form
            onSubmit={applyFilters}
            className="grid gap-3 lg:grid-cols-[1fr_220px_220px_auto]"
          >
            <div className="relative">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400" />

              <input
                type="search"
                value={filters.search}
                onChange={(event) => updateFilter("search", event.target.value)}
                placeholder="Name, email or phone..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-semibold outline-none focus:border-[#0D4598]"
              />
            </div>

            <select
              value={filters.role}
              onChange={(event) => updateFilter("role", event.target.value)}
              className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold"
            >
              {ROLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={filters.status}
              onChange={(event) => updateFilter("status", event.target.value)}
              className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0D4598] px-5 text-sm font-black text-white hover:bg-[#083777]"
            >
              <IoSearchOutline />
              Apply
            </button>
          </form>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="font-black text-slate-900">
                Users with documents
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {pagination.total} users found
              </p>
            </div>

            <IoPeopleOutline className="text-2xl text-[#0D4598]" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-black uppercase tracking-[0.08em] text-slate-500">
                  <th className="px-5 py-3">User</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Documents</th>
                  <th className="px-5 py-3">Pending</th>
                  <th className="px-5 py-3">Approved</th>
                  <th className="px-5 py-3">Rejected</th>
                  <th className="px-5 py-3">Progress</th>
                  <th className="px-5 py-3">Last Upload</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-5 py-14 text-center font-bold text-slate-500"
                    >
                      <IoRefreshOutline className="mx-auto mb-2 animate-spin text-2xl text-[#0D4598]" />
                      Loading users...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-5 py-14 text-center font-bold text-slate-500"
                    >
                      No user document found.
                    </td>
                  </tr>
                ) : (
                  users.map((item) => {
                    const completion =
                      item.totalDocuments > 0
                        ? Math.round(
                            (item.approvedDocuments / item.totalDocuments) *
                              100,
                          )
                        : 0;

                    return (
                      <tr
                        key={item._id}
                        className="text-sm text-slate-600 hover:bg-slate-50/60"
                      >
                        <td className="px-5 py-4">
                          <p className="font-black text-slate-900">
                            {item.user?.name || "Unknown User"}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {item.user?.email || "-"}
                          </p>

                          {item.user?.phone ? (
                            <p className="mt-1 text-xs text-slate-400">
                              {item.user.phone}
                            </p>
                          ) : null}
                        </td>

                        <td className="px-5 py-4">
                          <RoleBadge role={item.user?.role} />
                        </td>

                        <td className="px-5 py-4 font-black text-slate-800">
                          {item.totalDocuments}
                        </td>

                        <td className="px-5 py-4 font-black text-amber-600">
                          {item.pendingDocuments}
                        </td>

                        <td className="px-5 py-4 font-black text-emerald-600">
                          {item.approvedDocuments}
                        </td>

                        <td className="px-5 py-4 font-black text-rose-600">
                          {item.rejectedDocuments}
                        </td>

                        <td className="px-5 py-4">
                          <div className="w-28">
                            <div className="mb-1 flex justify-between text-xs font-bold">
                              <span>{completion}%</span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-[#0D4598]"
                                style={{
                                  width: `${completion}%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          {formatDate(item.latestUpload)}
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => viewUserDocuments(item.user._id)}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#0D4598] px-4 py-2.5 text-xs font-black text-white hover:bg-[#083777]"
                          >
                            <IoEyeOutline className="text-base" />
                            View Documents
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 ? (
            <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
              <p className="text-sm font-bold text-slate-500">
                Page {pagination.page} of {pagination.totalPages}
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => loadUsers(pagination.page - 1, filters)}
                  disabled={loading || pagination.page <= 1}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-black disabled:opacity-40"
                >
                  <IoChevronBack />
                  Previous
                </button>

                <button
                  type="button"
                  onClick={() => loadUsers(pagination.page + 1, filters)}
                  disabled={loading || pagination.page >= pagination.totalPages}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-black disabled:opacity-40"
                >
                  Next
                  <IoChevronForward />
                </button>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
