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
//       alert("Marked as learned");
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
//             {contents.map((item) => (
//               <div
//                 key={item._id}
//                 className="overflow-hidden rounded-3xl bg-white shadow-sm"
//               >
//                 <div className="flex h-44 items-center justify-center bg-slate-100">
//                   {item.image ? (
//                     <img
//                       src={getFullFileUrl(item.image)}
//                       alt={item.title}
//                       className="h-full w-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-5xl">🚗</span>
//                   )}
//                 </div>

//                 <div className="p-5">
//                   <div className="mb-3 flex flex-wrap gap-2">
//                     {item.category && (
//                       <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-500">
//                         {item.category}
//                       </span>
//                     )}

//                     {item.topicCode && (
//                       <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">
//                         {item.topicCode}
//                       </span>
//                     )}
//                   </div>

//                   <h3 className="text-lg font-black text-slate-900">
//                     {item.title}
//                   </h3>

//                   <p className="mt-2 line-clamp-2 text-sm text-slate-500">
//                     {item.subtitle || item.description}
//                   </p>

//                   <div className="mt-4">
//                     <div className="mb-2 flex justify-between text-xs font-bold text-slate-500">
//                       <span>Progress</span>
//                       <span>{item.progress?.readPercent || 0}%</span>
//                     </div>

//                     <div className="h-2 rounded-full bg-slate-100">
//                       <div
//                         className="h-full rounded-full bg-red-500"
//                         style={{
//                           width: `${item.progress?.readPercent || 0}%`,
//                         }}
//                       ></div>
//                     </div>
//                   </div>

//                   <div className="mt-5 flex gap-2">
//                     <button
//                       onClick={() => setSelectedItem(item)}
//                       className="flex-1 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white"
//                     >
//                       View
//                     </button>

//                     <button
//                       onClick={() => markCompleted(item)}
//                       className="rounded-2xl bg-red-500 px-4 py-3 text-sm font-bold text-white"
//                     >
//                       Done
//                     </button>

//                     <button
//                       onClick={() => handleFavorite(item)}
//                       className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold"
//                     >
//                       {item.progress?.isFavorite ? "★" : "☆"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
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

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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

  const currentSummary = summary.find((item) => item.type === type) || {
    total: 0,
    completed: 0,
    percentage: 0,
  };

  const categories = useMemo(() => {
    return [...new Set(contents.map((item) => item.category).filter(Boolean))];
  }, [contents]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const params = { type };

      if (search) params.search = search;
      if (category) params.category = category;
      if (topicCode) params.topicCode = topicCode;

      const contentRes = await getLearningContents(params);
      const summaryRes = await getLearningSummary();

      setContents(contentRes?.data?.data || []);
      setSummary(summaryRes?.data?.data || []);
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type, category, topicCode]);

  const markCompleted = async (item) => {
    try {
      await updateLearningProgress(item._id, {
        status: "completed",
        readPercent: 100,
      });

      fetchData();
      alert("Marked as learned. Test unlocked.");
    } catch (error) {
      alert(error?.response?.data?.message || "Progress update failed");
    }
  };

  const handleFavorite = async (item) => {
    try {
      await toggleLearningFavorite(item._id);
      fetchData();
    } catch (error) {
      alert(error?.response?.data?.message || "Favorite update failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <Link href="/student/code" className="text-sm font-bold text-red-500">
            ← Back to Code
          </Link>

          <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-red-50 text-3xl">
                {heroIcon}
              </div>

              <div>
                <h1 className="text-2xl font-black text-slate-900">{title}</h1>
                <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">
                Your Progress
              </p>

              <p className="mt-1 text-3xl font-black text-slate-900">
                {currentSummary.percentage}%
              </p>

              <p className="text-xs text-slate-500">
                {currentSummary.completed}/{currentSummary.total} completed
              </p>

              <div className="mt-3 h-2 w-40 rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-red-500"
                  style={{ width: `${currentSummary.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="rounded-2xl border px-4 py-3 text-sm"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-2xl border px-4 py-3 text-sm"
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
              className="rounded-2xl border px-4 py-3 text-sm"
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
              onClick={fetchData}
              className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white"
            >
              Search
            </button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center text-sm text-slate-500">
            Loading...
          </div>
        ) : contents.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center text-sm text-slate-500">
            {emptyText}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {contents.map((item) => {
              const isCompleted = item.progress?.status === "completed";
              const quizId = getQuizId(item);

              return (
                <div
                  key={item._id}
                  className="overflow-hidden rounded-3xl bg-white shadow-sm"
                >
                  <div className="flex h-44 items-center justify-center bg-slate-100">
                    {item.image ? (
                      <img
                        src={getFullFileUrl(item.image)}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-5xl">🚗</span>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {item.category && (
                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-500">
                          {item.category}
                        </span>
                      )}

                      {item.topicCode && (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">
                          {item.topicCode}
                        </span>
                      )}

                      {item.relatedQuiz && (
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600">
                          Test Available
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-black text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                      {item.subtitle || item.description}
                    </p>

                    <div className="mt-4">
                      <div className="mb-2 flex justify-between text-xs font-bold text-slate-500">
                        <span>
                          {isCompleted ? "Learned" : "Learning Progress"}
                        </span>
                        <span>{item.progress?.readPercent || 0}%</span>
                      </div>

                      <div className="h-2 rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-red-500"
                          style={{
                            width: `${item.progress?.readPercent || 0}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="flex-1 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white"
                      >
                        View
                      </button>

                      {isCompleted ? (
                        <>
                          {quizId ? (
                            <Link
                              href={`/student/code/test?quizId=${quizId}&contentId=${item._id}`}
                              className="rounded-2xl bg-red-500 px-4 py-3 text-sm font-bold text-white"
                            >
                              Start Test
                            </Link>
                          ) : (
                            <button
                              disabled
                              className="rounded-2xl bg-slate-200 px-4 py-3 text-sm font-bold text-slate-500"
                            >
                              No Test
                            </button>
                          )}

                          {quizId && (
                            <Link
                              href={`/student/code/results?quizId=${quizId}`}
                              className="rounded-2xl bg-green-600 px-4 py-3 text-sm font-bold text-white"
                            >
                              Result
                            </Link>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={() => markCompleted(item)}
                          className="rounded-2xl bg-red-500 px-4 py-3 text-sm font-bold text-white"
                        >
                          Mark Learned
                        </button>
                      )}

                      <button
                        onClick={() => handleFavorite(item)}
                        className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold"
                      >
                        {item.progress?.isFavorite ? "★" : "☆"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedItem && (
        <DetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onComplete={() => markCompleted(selectedItem)}
        />
      )}
    </div>
  );
}

function DetailsModal({ item, onClose, onComplete }) {
  const videoUrl = getYoutubeEmbedUrl(item.videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-red-500">
              {item.category || item.type}
            </p>
            <h2 className="mt-1 text-2xl font-black">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-500">{item.description}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold"
          >
            Close
          </button>
        </div>

        {item.image && (
          <img
            src={getFullFileUrl(item.image)}
            alt={item.title}
            className="mb-5 max-h-[350px] w-full rounded-3xl object-contain"
          />
        )}

        {videoUrl && (
          <iframe
            src={videoUrl}
            title={item.title}
            className="mb-5 aspect-video w-full rounded-3xl"
            allowFullScreen
          />
        )}

        {item.content && (
          <div className="whitespace-pre-line rounded-3xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
            {item.content}
          </div>
        )}

        {item.fileUrl && (
          <a
            href={getFullFileUrl(item.fileUrl)}
            target="_blank"
            className="mt-5 inline-block rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
          >
            Open / Download File
          </a>
        )}

        <div className="mt-6 text-right">
          <button
            onClick={onComplete}
            className="rounded-2xl bg-red-500 px-6 py-3 text-sm font-black text-white"
          >
            Mark as Learned
          </button>
        </div>
      </div>
    </div>
  );
}
