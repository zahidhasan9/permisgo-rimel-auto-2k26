// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import {
//   IoChevronBack,
//   IoAlertCircleOutline,
//   IoBookOutline,
//   IoTimeOutline,
// } from "react-icons/io5";
// import { FaArrowRight } from "react-icons/fa6";
// import { getStudentCodeQuizzes } from "@/features/API";
// import { mediaUrl } from "@/utils/mediaUrl";

// function LoadingCard() {
//   return (
//     <div className="animate-pulse rounded-[16px] border border-slate-200 bg-white p-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
//       <div className="flex gap-3">
//         <div className="h-14 w-16 rounded-xl bg-slate-100" />

//         <div className="flex-1">
//           <div className="h-3.5 w-2/3 rounded bg-slate-100" />
//           <div className="mt-2 h-3 w-full rounded bg-slate-100" />

//           <div className="mt-3 grid grid-cols-3 gap-2">
//             <div className="h-8 rounded-xl bg-slate-100" />
//             <div className="h-8 rounded-xl bg-slate-100" />
//             <div className="h-8 rounded-xl bg-slate-100" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InfoBadge({ label, value }) {
//   return (
//     <div className="rounded-xl border border-slate-200 bg-[#f8f8fb] px-2.5 py-2">
//       <p className="text-[9.5px] font-bold uppercase tracking-wide text-slate-400">
//         {label}
//       </p>

//       <p className="mt-0.5 text-xs font-black text-slate-900">{value}</p>
//     </div>
//   );
// }

// function SeriesCard({ quiz, index }) {
//   const totalQuestions = quiz.totalQuestions || 0;
//   const duration = quiz.durationMinutes || 30;
//   const passingScore = quiz.passingScore || 60;

//   return (
//     <Link
//       href={`/student/code/code-challenge?quizId=${quiz._id}`}
//       className="group block rounded-[16px] border border-slate-200 bg-white p-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#0D4598]/40 hover:bg-[#fbfbfd] hover:shadow-[0_12px_28px_rgba(15,23,42,0.07)]"
//     >
//       <div className="flex gap-3">
//         <div className="shrink-0">
//           {quiz.coverImage ? (
//             <img
//               src={mediaUrl(quiz.coverImage)}
//               alt={quiz.title || "Quiz"}
//               className="h-16 w-20 rounded-xl border border-slate-200 object-cover"
//             />
//           ) : (
//             <div className="flex h-16 w-20 items-center justify-center rounded-xl border border-slate-200 bg-[#EAF1FB] text-sm font-black text-[#0D4598]">
//               {String(index + 1).padStart(2, "0")}
//             </div>
//           )}
//         </div>

//         <div className="min-w-0 flex-1">
//           <div className="flex items-start justify-between gap-2">
//             <div className="min-w-0 flex-1">
//               <div className="flex flex-wrap items-center gap-1.5">
//                 <span className="rounded-lg bg-[#EAF1FB] px-2 py-1 text-[10px] font-bold leading-none text-[#0D4598]">
//                   #{String(index + 1).padStart(2, "0")}
//                 </span>

//                 <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-bold leading-none text-emerald-700">
//                   Active
//                 </span>
//               </div>

//               <h3 className="mt-1.5 whitespace-normal break-words text-[13px] font-bold leading-[17px] text-slate-900">
//                 {quiz.title || `Series ${String(index + 1).padStart(2, "0")}`}
//               </h3>

//               <p className="mt-1 line-clamp-2 text-[11px] font-medium leading-4 text-slate-400">
//                 {quiz.description ||
//                   "Practice quiz series for code preparation."}
//               </p>
//             </div>

//             <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#EAF1FB] text-[#0D4598] transition group-hover:bg-[#0D4598] group-hover:text-white">
//               <FaArrowRight size={12} />
//             </div>
//           </div>

//           <div className="mt-2.5 grid grid-cols-3 gap-1.5">
//             <InfoBadge label="Questions" value={totalQuestions} />
//             <InfoBadge label="Time" value={`${duration} min`} />
//             <InfoBadge label="Pass" value={`${passingScore}%`} />
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default function CodeQuizListPage({
//   type,
//   title,
//   subtitle = "Select a series and start your practice.",
// }) {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const loadQuizzes = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const res = await getStudentCodeQuizzes();
//         const allQuizzes = res.data?.data || [];

//         const filtered = allQuizzes.filter((quiz) => {
//           if (!quiz) return false;
//           if (quiz.status !== "active") return false;
//           return quiz.type === type;
//         });

//         setQuizzes(filtered);
//       } catch (err) {
//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             "Failed to load quizzes",
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadQuizzes();
//   }, [type]);

//   const sortedQuizzes = useMemo(() => {
//     return [...quizzes].sort((a, b) => {
//       const orderA = Number(a.order || 0);
//       const orderB = Number(b.order || 0);

//       if (orderA !== orderB) return orderA - orderB;

//       return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
//     });
//   }, [quizzes]);

//   return (
//     <main className="min-h-screen overflow-x-hidden bg-[#f8f8fb] px-3 py-3 md:px-4 lg:px-5">
//       <div className="mx-auto w-full max-w-[1320px]">
//         <div className="mb-3 rounded-[16px] border border-slate-200 bg-white p-3 shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex min-w-0 items-center gap-2.5">
//               <Link
//                 href="/student/code"
//                 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-[#f8f8fb] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
//               >
//                 <IoChevronBack size={20} />
//               </Link>

//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF1FB] text-[#0D4598]">
//                 <IoBookOutline size={19} />
//               </div>

//               <div className="min-w-0">
//                 <div className="mb-0.5 flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-slate-400">
//                   <span>Student</span>
//                   <span>/</span>
//                   <span>Code Practice</span>
//                   <span>/</span>
//                   <span className="text-slate-600">{title}</span>
//                 </div>

//                 <h1 className="whitespace-normal break-words text-xl font-bold leading-6 text-slate-900 md:text-2xl">
//                   {title}
//                 </h1>

//                 <p className="mt-0.5 text-xs font-medium leading-5 text-slate-500">
//                   {subtitle}
//                 </p>
//               </div>
//             </div>

//             <div className="flex w-fit items-center gap-2 rounded-xl border border-[#d7e2f2] bg-[#EAF1FB] px-3 py-2">
//               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#0D4598]">
//                 <IoTimeOutline size={16} />
//               </div>

//               <div>
//                 <p className="text-[10px] font-bold uppercase leading-none text-slate-400">
//                   Total Series
//                 </p>

//                 <p className="mt-1 text-base font-black leading-none text-[#0D4598]">
//                   {loading ? "..." : sortedQuizzes.length}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {loading && (
//           <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
//             <LoadingCard />
//             <LoadingCard />
//             <LoadingCard />
//             <LoadingCard />
//             <LoadingCard />
//             <LoadingCard />
//           </div>
//         )}

//         {error && (
//           <div className="flex items-start gap-2 rounded-[16px] border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs font-semibold text-rose-700">
//             <IoAlertCircleOutline size={18} className="shrink-0" />
//             <span>{error}</span>
//           </div>
//         )}

//         {!loading && !error && sortedQuizzes.length === 0 && (
//           <div className="rounded-[16px] border border-dashed border-slate-300 bg-white p-6 text-center shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
//             <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF1FB] text-[#0D4598]">
//               <IoAlertCircleOutline size={24} />
//             </div>

//             <h2 className="text-base font-bold text-slate-900">
//               No Quiz Found
//             </h2>

//             <p className="mt-1.5 text-sm text-slate-500">
//               Admin panel থেকে আগে{" "}
//               <span className="font-bold text-[#0D4598]">{type}</span> type দিয়ে
//               quiz create করুন।
//             </p>
//           </div>
//         )}

//         {!loading && !error && sortedQuizzes.length > 0 && (
//           <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
//             {sortedQuizzes.map((quiz, index) => (
//               <SeriesCard key={quiz._id} quiz={quiz} index={index} />
//             ))}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  IoAlertCircleOutline,
  IoBookOutline,
  IoChevronBack,
  IoTimeOutline,
} from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { getStudentCodeQuizzes } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

function LoadingCard() {
  return (
    <div className="animate-pulse rounded-[14px] border border-slate-200 bg-white p-2.5 shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
      <div className="flex gap-2.5">
        <div className="h-12 w-14 rounded-xl bg-slate-100" />

        <div className="min-w-0 flex-1">
          <div className="h-3 w-2/3 rounded bg-slate-100" />
          <div className="mt-2 h-2.5 w-full rounded bg-slate-100" />

          <div className="mt-2.5 grid grid-cols-3 gap-1.5">
            <div className="h-7 rounded-lg bg-slate-100" />
            <div className="h-7 rounded-lg bg-slate-100" />
            <div className="h-7 rounded-lg bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBadge({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-[#f8f8fb] px-2 py-1.5">
      <p className="text-[8.5px] font-bold uppercase leading-none text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-[11px] font-black leading-none text-slate-900">
        {value}
      </p>
    </div>
  );
}

function SeriesCard({ quiz, index }) {
  const totalQuestions = quiz.totalQuestions || 0;
  const duration = quiz.durationMinutes || 30;
  const passingScore = quiz.passingScore || 60;

  return (
    <Link
      href={`/student/code/code-challenge?quizId=${quiz._id}`}
      className="group block rounded-[14px] border border-slate-200 bg-white p-2.5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#0D4598]/40 hover:bg-[#fbfbfd] hover:shadow-[0_10px_24px_rgba(15,23,42,0.07)]"
    >
      <div className="flex gap-2.5">
        <div className="shrink-0">
          {quiz.coverImage ? (
            <img
              src={mediaUrl(quiz.coverImage)}
              alt={quiz.title || "Quiz"}
              className="h-14 w-16 rounded-xl border border-slate-200 object-cover"
            />
          ) : (
            <div className="flex h-14 w-16 items-center justify-center rounded-xl border border-slate-200 bg-[#EAF1FB] text-xs font-black text-[#0D4598]">
              {String(index + 1).padStart(2, "0")}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-1.5">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1">
                <span className="rounded-md bg-[#EAF1FB] px-1.5 py-0.5 text-[9px] font-bold leading-none text-[#0D4598]">
                  #{String(index + 1).padStart(2, "0")}
                </span>

                <span className="rounded-md border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold leading-none text-emerald-700">
                  Active
                </span>
              </div>

              <h3 className="mt-1.5 line-clamp-2 break-words text-[12px] font-bold leading-[15px] text-slate-900">
                {quiz.title || `Series ${String(index + 1).padStart(2, "0")}`}
              </h3>

              <p className="mt-0.5 line-clamp-1 text-[10px] font-medium leading-4 text-slate-400">
                {quiz.description ||
                  "Practice quiz series for code preparation."}
              </p>
            </div>

            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598] transition group-hover:bg-[#0D4598] group-hover:text-white">
              <FaArrowRight size={10} />
            </div>
          </div>

          <div className="mt-2 grid grid-cols-3 gap-1">
            <InfoBadge label="Q" value={totalQuestions} />
            <InfoBadge label="Time" value={`${duration}m`} />
            <InfoBadge label="Pass" value={`${passingScore}%`} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CodeQuizListPage({
  type,
  title,
  subtitle = "Select a series and start your practice.",
}) {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getStudentCodeQuizzes();
        const allQuizzes = res.data?.data || [];

        const filtered = allQuizzes.filter((quiz) => {
          if (!quiz) return false;
          if (quiz.status !== "active") return false;
          return quiz.type === type;
        });

        setQuizzes(filtered);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load quizzes",
        );
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, [type]);

  const sortedQuizzes = useMemo(() => {
    return [...quizzes].sort((a, b) => {
      const orderA = Number(a.order || 0);
      const orderB = Number(b.order || 0);

      if (orderA !== orderB) return orderA - orderB;

      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [quizzes]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8f8fb] px-3 py-3 md:px-4 lg:px-5">
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="mb-3 rounded-[14px] border border-slate-200 bg-white p-2.5 shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-2.5">
              <Link
                href="/student/code"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-[#f8f8fb] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
              >
                <IoChevronBack size={18} />
              </Link>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF1FB] text-[#0D4598]">
                <IoBookOutline size={17} />
              </div>

              <div className="min-w-0">
                <div className="mb-0.5 flex flex-wrap items-center gap-1 text-[10px] font-semibold text-slate-400">
                  <span>Student</span>
                  <span>/</span>
                  <span>Code Practice</span>
                  <span>/</span>
                  <span className="text-slate-600">{title}</span>
                </div>

                <h1 className="break-words text-lg font-bold leading-5 text-slate-900 md:text-xl">
                  {title}
                </h1>

                <p className="mt-0.5 text-[11px] font-medium leading-4 text-slate-500">
                  {subtitle}
                </p>
              </div>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-xl border border-[#d7e2f2] bg-[#EAF1FB] px-2.5 py-1.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#0D4598]">
                <IoTimeOutline size={14} />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase leading-none text-slate-400">
                  Total Series
                </p>

                <p className="mt-1 text-sm font-black leading-none text-[#0D4598]">
                  {loading ? "..." : sortedQuizzes.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 rounded-[14px] border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
            <IoAlertCircleOutline size={17} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && sortedQuizzes.length === 0 && (
          <div className="rounded-[14px] border border-dashed border-slate-300 bg-white p-5 text-center shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
            <div className="mx-auto mb-2.5 flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF1FB] text-[#0D4598]">
              <IoAlertCircleOutline size={22} />
            </div>

            <h2 className="text-sm font-bold text-slate-900">No Quiz Found</h2>

            <p className="mt-1.5 text-xs text-slate-500">
              Admin panel থেকে আগে{" "}
              <span className="font-bold text-[#0D4598]">{type}</span> type দিয়ে
              quiz create করুন।
            </p>
          </div>
        )}

        {!loading && !error && sortedQuizzes.length > 0 && (
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedQuizzes.map((quiz, index) => (
              <SeriesCard key={quiz._id} quiz={quiz} index={index} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
