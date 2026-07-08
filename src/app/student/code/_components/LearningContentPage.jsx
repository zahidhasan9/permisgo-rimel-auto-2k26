// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import {
//   getLearningContents,
//   getLearningSummary,
//   toggleLearningFavorite,
//   updateLearningProgress,
// } from "@/features/API";

// const getFullFileUrl = (path) => {
//   if (!path) return "";
//   if (path.startsWith("http")) return path;

//   const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
//   const rootUrl = apiUrl.replace("/api", "");

//   return `${rootUrl}${path}`;
// };

// const getYoutubeEmbedUrl = (url) => {
//   if (!url) return "";

//   try {
//     const parsed = new URL(url);

//     if (parsed.hostname.includes("youtube.com")) {
//       const videoId = parsed.searchParams.get("v");
//       return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
//     }

//     if (parsed.hostname.includes("youtu.be")) {
//       const videoId = parsed.pathname.replace("/", "");
//       return `https://www.youtube.com/embed/${videoId}`;
//     }

//     return url;
//   } catch {
//     return url;
//   }
// };

// const getQuizId = (item) => {
//   if (!item?.relatedQuiz) return "";
//   if (typeof item.relatedQuiz === "object") return item.relatedQuiz._id || "";
//   return item.relatedQuiz;
// };

// export default function LearningContentPage({
//   type,
//   title,
//   subtitle,
//   heroIcon,
//   emptyText,
// }) {
//   const [contents, setContents] = useState([]);
//   const [summary, setSummary] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [topicCode, setTopicCode] = useState("");
//   const [loading, setLoading] = useState(false);

//   const currentSummary = summary.find((item) => item.type === type) || {
//     total: 0,
//     completed: 0,
//     percentage: 0,
//   };

//   const categories = useMemo(() => {
//     return [...new Set(contents.map((item) => item.category).filter(Boolean))];
//   }, [contents]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const params = { type };

//       if (search) params.search = search;
//       if (category) params.category = category;
//       if (topicCode) params.topicCode = topicCode;

//       const contentRes = await getLearningContents(params);
//       const summaryRes = await getLearningSummary();

//       setContents(contentRes?.data?.data || []);
//       setSummary(summaryRes?.data?.data || []);
//     } catch (error) {
//       alert(error?.response?.data?.message || "Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [type, category, topicCode]);

//   const markCompleted = async (item) => {
//     try {
//       await updateLearningProgress(item._id, {
//         status: "completed",
//         readPercent: 100,
//       });

//       fetchData();
//       alert("Marked as learned. Test unlocked.");
//     } catch (error) {
//       alert(error?.response?.data?.message || "Progress update failed");
//     }
//   };

//   const handleFavorite = async (item) => {
//     try {
//       await toggleLearningFavorite(item._id);
//       fetchData();
//     } catch (error) {
//       alert(error?.response?.data?.message || "Favorite update failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 md:p-6">
//       <div className="mx-auto max-w-7xl space-y-6">
//         <div className="rounded-3xl bg-white p-6 shadow-sm">
//           <Link href="/student/code" className="text-sm font-bold text-red-500">
//             ← Back to Code
//           </Link>

//           <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
//             <div className="flex items-center gap-4">
//               <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-red-50 text-3xl">
//                 {heroIcon}
//               </div>

//               <div>
//                 <h1 className="text-2xl font-black text-slate-900">{title}</h1>
//                 <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
//               </div>
//             </div>

//             <div className="rounded-3xl bg-slate-50 p-5">
//               <p className="text-sm font-semibold text-slate-500">
//                 Your Progress
//               </p>

//               <p className="mt-1 text-3xl font-black text-slate-900">
//                 {currentSummary.percentage}%
//               </p>

//               <p className="text-xs text-slate-500">
//                 {currentSummary.completed}/{currentSummary.total} completed
//               </p>

//               <div className="mt-3 h-2 w-40 rounded-full bg-white">
//                 <div
//                   className="h-full rounded-full bg-red-500"
//                   style={{ width: `${currentSummary.percentage}%` }}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-3xl bg-white p-4 shadow-sm">
//           <div className="grid gap-3 md:grid-cols-4">
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search..."
//               className="rounded-2xl border px-4 py-3 text-sm"
//             />

//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="rounded-2xl border px-4 py-3 text-sm"
//             >
//               <option value="">All Categories</option>
//               {categories.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={topicCode}
//               onChange={(e) => setTopicCode(e.target.value)}
//               className="rounded-2xl border px-4 py-3 text-sm"
//             >
//               <option value="">All Topics</option>
//               {["L", "C", "R", "U", "D", "HAS", "P", "M", "S", "E"].map(
//                 (topic) => (
//                   <option key={topic} value={topic}>
//                     {topic}
//                   </option>
//                 ),
//               )}
//             </select>

//             <button
//               onClick={fetchData}
//               className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white"
//             >
//               Search
//             </button>
//           </div>
//         </div>

//         {loading ? (
//           <div className="rounded-3xl bg-white p-10 text-center text-sm text-slate-500">
//             Loading...
//           </div>
//         ) : contents.length === 0 ? (
//           <div className="rounded-3xl bg-white p-10 text-center text-sm text-slate-500">
//             {emptyText}
//           </div>
//         ) : (
//           <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
//             {contents.map((item) => {
//               const isCompleted = item.progress?.status === "completed";
//               const quizId = getQuizId(item);

//               return (
//                 <div
//                   key={item._id}
//                   className="overflow-hidden rounded-3xl bg-white shadow-sm"
//                 >
//                   <div className="flex h-44 items-center justify-center bg-slate-100">
//                     {item.image ? (
//                       <img
//                         src={getFullFileUrl(item.image)}
//                         alt={item.title}
//                         className="h-full w-full object-cover"
//                       />
//                     ) : (
//                       <span className="text-5xl">🚗</span>
//                     )}
//                   </div>

//                   <div className="p-5">
//                     <div className="mb-3 flex flex-wrap gap-2">
//                       {item.category && (
//                         <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-500">
//                           {item.category}
//                         </span>
//                       )}

//                       {item.topicCode && (
//                         <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">
//                           {item.topicCode}
//                         </span>
//                       )}

//                       {item.relatedQuiz && (
//                         <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600">
//                           Test Available
//                         </span>
//                       )}
//                     </div>

//                     <h3 className="text-lg font-black text-slate-900">
//                       {item.title}
//                     </h3>

//                     <p className="mt-2 line-clamp-2 text-sm text-slate-500">
//                       {item.subtitle || item.description}
//                     </p>

//                     <div className="mt-4">
//                       <div className="mb-2 flex justify-between text-xs font-bold text-slate-500">
//                         <span>
//                           {isCompleted ? "Learned" : "Learning Progress"}
//                         </span>
//                         <span>{item.progress?.readPercent || 0}%</span>
//                       </div>

//                       <div className="h-2 rounded-full bg-slate-100">
//                         <div
//                           className="h-full rounded-full bg-red-500"
//                           style={{
//                             width: `${item.progress?.readPercent || 0}%`,
//                           }}
//                         ></div>
//                       </div>
//                     </div>

//                     <div className="mt-5 flex flex-wrap gap-2">
//                       <button
//                         onClick={() => setSelectedItem(item)}
//                         className="flex-1 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white"
//                       >
//                         View
//                       </button>

//                       {isCompleted ? (
//                         <>
//                           {quizId ? (
//                             <Link
//                               href={`/student/code/test?quizId=${quizId}&contentId=${item._id}`}
//                               className="rounded-2xl bg-red-500 px-4 py-3 text-sm font-bold text-white"
//                             >
//                               Start Test
//                             </Link>
//                           ) : (
//                             <button
//                               disabled
//                               className="rounded-2xl bg-slate-200 px-4 py-3 text-sm font-bold text-slate-500"
//                             >
//                               No Test
//                             </button>
//                           )}

//                           {quizId && (
//                             <Link
//                               href={`/student/code/results?quizId=${quizId}`}
//                               className="rounded-2xl bg-green-600 px-4 py-3 text-sm font-bold text-white"
//                             >
//                               Result
//                             </Link>
//                           )}
//                         </>
//                       ) : (
//                         <button
//                           onClick={() => markCompleted(item)}
//                           className="rounded-2xl bg-red-500 px-4 py-3 text-sm font-bold text-white"
//                         >
//                           Mark Learned
//                         </button>
//                       )}

//                       <button
//                         onClick={() => handleFavorite(item)}
//                         className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold"
//                       >
//                         {item.progress?.isFavorite ? "★" : "☆"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {selectedItem && (
//         <DetailsModal
//           item={selectedItem}
//           onClose={() => setSelectedItem(null)}
//           onComplete={() => markCompleted(selectedItem)}
//         />
//       )}
//     </div>
//   );
// }

// function DetailsModal({ item, onClose, onComplete }) {
//   const videoUrl = getYoutubeEmbedUrl(item.videoUrl);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//       <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-6">
//         <div className="mb-5 flex items-start justify-between gap-4">
//           <div>
//             <p className="text-sm font-bold text-red-500">
//               {item.category || item.type}
//             </p>
//             <h2 className="mt-1 text-2xl font-black">{item.title}</h2>
//             <p className="mt-2 text-sm text-slate-500">{item.description}</p>
//           </div>

//           <button
//             onClick={onClose}
//             className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold"
//           >
//             Close
//           </button>
//         </div>

//         {item.image && (
//           <img
//             src={getFullFileUrl(item.image)}
//             alt={item.title}
//             className="mb-5 max-h-[350px] w-full rounded-3xl object-contain"
//           />
//         )}

//         {videoUrl && (
//           <iframe
//             src={videoUrl}
//             title={item.title}
//             className="mb-5 aspect-video w-full rounded-3xl"
//             allowFullScreen
//           />
//         )}

//         {item.content && (
//           <div className="whitespace-pre-line rounded-3xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
//             {item.content}
//           </div>
//         )}

//         {item.fileUrl && (
//           <a
//             href={getFullFileUrl(item.fileUrl)}
//             target="_blank"
//             className="mt-5 inline-block rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
//           >
//             Open / Download File
//           </a>
//         )}

//         <div className="mt-6 text-right">
//           <button
//             onClick={onComplete}
//             className="rounded-2xl bg-red-500 px-6 py-3 text-sm font-black text-white"
//           >
//             Mark as Learned
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  IoAlertCircleOutline,
  IoBookOutline,
  IoCheckmarkCircleOutline,
  IoChevronBack,
  IoCloseOutline,
  IoDocumentTextOutline,
  IoEyeOutline,
  IoOpenOutline,
  IoPlayCircleOutline,
  IoRefreshOutline,
  IoSearchOutline,
  IoStar,
  IoStarOutline,
} from "react-icons/io5";
import {
  getLearningContents,
  getLearningSummary,
  toggleLearningFavorite,
  updateLearningProgress,
} from "@/features/API";

const getFullFileUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const rootUrl = apiUrl.replace("/api", "");

  return `${rootUrl}${path}`;
};

const getYoutubeEmbedUrl = (url) => {
  if (!url) return "";

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }

    if (parsed.hostname.includes("youtu.be")) {
      const videoId = parsed.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  } catch {
    return url;
  }
};

const getQuizId = (item) => {
  if (!item?.relatedQuiz) return "";
  if (typeof item.relatedQuiz === "object") return item.relatedQuiz._id || "";
  return item.relatedQuiz;
};

function SummaryBox({ label, value, subText }) {
  return (
    <div className="rounded-xl border border-[#E5EAF2] bg-white px-4 py-3 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-wide text-[#7B8190]">
        {label}
      </p>

      <p className="mt-1 text-xl font-black text-[#0D4598]">{value}</p>

      {subText && <p className="mt-0.5 text-xs text-[#7B8190]">{subText}</p>}
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-[#E5EAF2] bg-white shadow-sm">
      <div className="h-36 bg-slate-200" />

      <div className="p-4">
        <div className="mb-3 flex gap-2">
          <div className="h-6 w-20 rounded bg-slate-200" />
          <div className="h-6 w-16 rounded bg-slate-200" />
        </div>

        <div className="h-4 w-3/4 rounded bg-slate-200" />
        <div className="mt-3 h-3 w-full rounded bg-slate-200" />
        <div className="mt-2 h-3 w-2/3 rounded bg-slate-200" />

        <div className="mt-4 h-9 rounded bg-slate-200" />
      </div>
    </div>
  );
}

function LearningCard({ item, onView, onComplete, onFavorite }) {
  const isCompleted = item.progress?.status === "completed";
  const quizId = getQuizId(item);
  const progressPercent = item.progress?.readPercent || 0;

  return (
    <div className="overflow-hidden rounded-xl border border-[#E5EAF2] bg-white shadow-sm transition hover:border-[#0D4598]">
      <div className="relative flex h-36 items-center justify-center bg-[#F8FAFD]">
        {item.image ? (
          <img
            src={getFullFileUrl(item.image)}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#EAF1FB] text-[#0D4598]">
            <IoBookOutline size={30} />
          </div>
        )}

        <button
          type="button"
          onClick={() => onFavorite(item)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#0D4598] shadow-sm transition hover:bg-[#EAF1FB]"
        >
          {item.progress?.isFavorite ? (
            <IoStar size={18} />
          ) : (
            <IoStarOutline size={18} />
          )}
        </button>
      </div>

      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {item.category && (
            <span className="inline-flex h-7 items-center rounded-md bg-[#EAF1FB] px-3 text-[11px] font-black text-[#0D4598]">
              {item.category}
            </span>
          )}

          {item.topicCode && (
            <span className="inline-flex h-7 items-center rounded-md bg-[#F1F4F8] px-3 text-[11px] font-black text-[#667085]">
              {item.topicCode}
            </span>
          )}

          {item.relatedQuiz && (
            <span className="inline-flex h-7 items-center rounded-md bg-green-50 px-3 text-[11px] font-black text-green-700">
              Test Available
            </span>
          )}
        </div>

        <h3 className="line-clamp-1 text-[16px] font-black text-[#151515]">
          {item.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#7B8190]">
          {item.subtitle || item.description || "No description available."}
        </p>

        <div className="mt-4">
          <div className="mb-2 flex justify-between text-xs font-bold text-[#7B8190]">
            <span>{isCompleted ? "Learned" : "Learning Progress"}</span>
            <span>{progressPercent}%</span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-[#EDF1F7]">
            <div
              className={`h-full rounded-full ${
                isCompleted ? "bg-green-600" : "bg-[#0D4598]"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onView(item)}
            className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-[#0D4598] px-4 text-xs font-black text-white transition hover:bg-[#083777]"
          >
            <IoEyeOutline size={16} />
            View
          </button>

          {isCompleted ? (
            <>
              {quizId ? (
                <Link
                  href={`/student/code/test?quizId=${quizId}&contentId=${item._id}`}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#DDE6F3] bg-white px-4 text-xs font-black text-[#0D4598] transition hover:bg-[#EAF1FB]"
                >
                  <IoPlayCircleOutline size={16} />
                  Test
                </Link>
              ) : (
                <button
                  disabled
                  className="inline-flex h-10 items-center rounded-lg bg-slate-200 px-4 text-xs font-black text-slate-500"
                >
                  No Test
                </button>
              )}

              {quizId && (
                <Link
                  href={`/student/code/results?quizId=${quizId}`}
                  className="inline-flex h-10 items-center rounded-lg bg-green-600 px-4 text-xs font-black text-white transition hover:bg-green-700"
                >
                  Result
                </Link>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={() => onComplete(item)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-green-100 bg-green-50 px-4 text-xs font-black text-green-700 transition hover:bg-green-100"
            >
              <IoCheckmarkCircleOutline size={16} />
              Learned
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LearningContentPage({
  type,
  title,
  subtitle,
  heroIcon,
  emptyText,
}) {
  const [contents, setContents] = useState([]);
  const [summary, setSummary] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [topicCode, setTopicCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentSummary = summary.find((item) => item.type === type) || {
    total: 0,
    completed: 0,
    percentage: 0,
  };

  const categories = useMemo(() => {
    return [...new Set(contents.map((item) => item.category).filter(Boolean))];
  }, [contents]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = { type };

      if (search) params.search = search;
      if (category) params.category = category;
      if (topicCode) params.topicCode = topicCode;

      const contentRes = await getLearningContents(params);
      const summaryRes = await getLearningSummary();

      setContents(contentRes?.data?.data || []);
      setSummary(summaryRes?.data?.data || []);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Failed to load data",
      );
    } finally {
      setLoading(false);
    }
  }, [type, search, category, topicCode]);

  useEffect(() => {
    fetchData();
  }, [type, category, topicCode]);

  const markCompleted = async (item) => {
    try {
      await updateLearningProgress(item._id, {
        status: "completed",
        readPercent: 100,
      });

      await fetchData();
      setSelectedItem(null);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Progress update failed",
      );
    }
  };

  const handleFavorite = async (item) => {
    try {
      await toggleLearningFavorite(item._id);
      await fetchData();
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Favorite update failed",
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-4 rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/student/code"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
              >
                <IoChevronBack size={24} />
              </Link>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF1FB] text-[#0D4598]">
                {heroIcon || <IoBookOutline size={26} />}
              </div>

              <div>
                <div className="mb-1 inline-flex rounded-md bg-[#EAF1FB] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#0D4598]">
                  Student Panel / Learning
                </div>

                <h1 className="text-xl font-black text-[#151515]">{title}</h1>

                <p className="mt-1 text-sm text-[#7B8190]">{subtitle}</p>
              </div>
            </div>

            <div className="w-full max-w-xs rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wide text-[#7B8190]">
                    Your Progress
                  </p>

                  <p className="mt-0.5 text-xl font-black text-[#0D4598]">
                    {currentSummary.percentage}%
                  </p>
                </div>

                <p className="text-xs font-bold text-[#7B8190]">
                  {currentSummary.completed}/{currentSummary.total} completed
                </p>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-[#0D4598]"
                  style={{ width: `${currentSummary.percentage}%` }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <SummaryBox label="Total Content" value={currentSummary.total} />
          <SummaryBox label="Completed" value={currentSummary.completed} />
          <SummaryBox
            label="Progress"
            value={`${currentSummary.percentage}%`}
            subText="Overall learning progress"
          />
        </section>

        {/* Filters */}
        <section className="mb-4 rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-4">
            <div className="relative">
              <IoSearchOutline
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7B8190]"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") fetchData();
                }}
                placeholder="Search content..."
                className="h-10 w-full rounded-lg border border-[#DDE6F3] bg-white pl-10 pr-3 text-sm font-semibold text-[#151515] outline-none transition placeholder:text-[#9AA3B2] focus:border-[#0D4598]"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-10 rounded-lg border border-[#DDE6F3] bg-white px-3 text-sm font-semibold text-[#151515] outline-none transition focus:border-[#0D4598]"
            >
              <option value="">All Categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={topicCode}
              onChange={(e) => setTopicCode(e.target.value)}
              className="h-10 rounded-lg border border-[#DDE6F3] bg-white px-3 text-sm font-semibold text-[#151515] outline-none transition focus:border-[#0D4598]"
            >
              <option value="">All Topics</option>
              {["L", "C", "R", "U", "D", "HAS", "P", "M", "S", "E"].map(
                (topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ),
              )}
            </select>

            <button
              type="button"
              onClick={fetchData}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0D4598] px-4 text-xs font-black text-white transition hover:bg-[#083777]"
            >
              <IoRefreshOutline size={17} />
              Search / Refresh
            </button>
          </div>
        </section>

        {/* Error */}
        {error && (
          <div className="mb-4 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
            <IoAlertCircleOutline size={22} />
            <span>{error}</span>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </section>
        ) : contents.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#B8C7DD] bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF1FB] text-[#0D4598]">
              <IoBookOutline size={24} />
            </div>

            <h2 className="mt-4 text-lg font-black text-[#151515]">
              No content found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#7B8190]">
              {emptyText}
            </p>
          </div>
        ) : (
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {contents.map((item) => (
              <LearningCard
                key={item._id}
                item={item}
                onView={setSelectedItem}
                onComplete={markCompleted}
                onFavorite={handleFavorite}
              />
            ))}
          </section>
        )}
      </div>

      {selectedItem && (
        <DetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onComplete={() => markCompleted(selectedItem)}
        />
      )}
    </main>
  );
}

function DetailsModal({ item, onClose, onComplete }) {
  const videoUrl = getYoutubeEmbedUrl(item.videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-[#E5EAF2] bg-white shadow-2xl">
        <div className="sticky top-0 z-10 border-b border-[#E5EAF2] bg-white px-5 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 inline-flex rounded-md bg-[#EAF1FB] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#0D4598]">
                {item.category || item.type || "Learning Content"}
              </div>

              <h2 className="text-xl font-black text-[#151515]">
                {item.title}
              </h2>

              <p className="mt-1 text-sm leading-6 text-[#7B8190]">
                {item.description}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
            >
              <IoCloseOutline size={24} />
            </button>
          </div>
        </div>

        <div className="p-5">
          {item.image && (
            <div className="mb-4 rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] p-3">
              <img
                src={getFullFileUrl(item.image)}
                alt={item.title}
                className="max-h-[320px] w-full rounded-lg object-contain"
              />
            </div>
          )}

          {videoUrl && (
            <div className="mb-4 overflow-hidden rounded-xl border border-[#E5EAF2]">
              <iframe
                src={videoUrl}
                title={item.title}
                className="aspect-video w-full"
                allowFullScreen
              />
            </div>
          )}

          {item.content && (
            <div className="mb-4 rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] p-4 text-sm leading-7 text-[#667085]">
              <div className="mb-2 flex items-center gap-2 font-black text-[#151515]">
                <IoDocumentTextOutline size={17} />
                Content
              </div>

              <div className="whitespace-pre-line">{item.content}</div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3">
            {item.fileUrl ? (
              <a
                href={getFullFileUrl(item.fileUrl)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#DDE6F3] bg-white px-4 text-xs font-black text-[#0D4598] transition hover:bg-[#EAF1FB]"
              >
                <IoOpenOutline size={16} />
                Open / Download File
              </a>
            ) : (
              <span />
            )}

            <button
              type="button"
              onClick={onComplete}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0D4598] px-5 text-xs font-black text-white transition hover:bg-[#083777]"
            >
              <IoCheckmarkCircleOutline size={17} />
              Mark as Learned
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
