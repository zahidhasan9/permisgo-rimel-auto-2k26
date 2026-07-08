// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import {
//   IoAlertCircleOutline,
//   IoBookOutline,
//   IoChevronBack,
//   IoTimeOutline,
// } from "react-icons/io5";
// import { FaArrowRight } from "react-icons/fa6";
// import { getStudentCodeQuizzes } from "@/features/API";
// import { mediaUrl } from "@/utils/mediaUrl";

// function LoadingCard() {
//   return (
//     <div className="animate-pulse rounded-[14px] border border-slate-200 bg-white p-2.5 shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
//       <div className="flex gap-2.5">
//         <div className="h-12 w-14 rounded-xl bg-slate-100" />

//         <div className="min-w-0 flex-1">
//           <div className="h-3 w-2/3 rounded bg-slate-100" />
//           <div className="mt-2 h-2.5 w-full rounded bg-slate-100" />

//           <div className="mt-2.5 grid grid-cols-3 gap-1.5">
//             <div className="h-7 rounded-lg bg-slate-100" />
//             <div className="h-7 rounded-lg bg-slate-100" />
//             <div className="h-7 rounded-lg bg-slate-100" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InfoBadge({ label, value }) {
//   return (
//     <div className="rounded-lg border border-slate-200 bg-[#f8f8fb] px-2 py-1.5">
//       <p className="text-[8.5px] font-bold uppercase leading-none text-slate-400">
//         {label}
//       </p>

//       <p className="mt-1 text-[11px] font-black leading-none text-slate-900">
//         {value}
//       </p>
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
//       className="group block rounded-[14px] border border-slate-200 bg-white p-2.5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#0D4598]/40 hover:bg-[#fbfbfd] hover:shadow-[0_10px_24px_rgba(15,23,42,0.07)]"
//     >
//       <div className="flex gap-2.5">
//         <div className="shrink-0">
//           {quiz.coverImage ? (
//             <img
//               src={mediaUrl(quiz.coverImage)}
//               alt={quiz.title || "Quiz"}
//               className="h-14 w-16 rounded-xl border border-slate-200 object-cover"
//             />
//           ) : (
//             <div className="flex h-14 w-16 items-center justify-center rounded-xl border border-slate-200 bg-[#EAF1FB] text-xs font-black text-[#0D4598]">
//               {String(index + 1).padStart(2, "0")}
//             </div>
//           )}
//         </div>

//         <div className="min-w-0 flex-1">
//           <div className="flex items-start justify-between gap-1.5">
//             <div className="min-w-0 flex-1">
//               <div className="flex flex-wrap items-center gap-1">
//                 <span className="rounded-md bg-[#EAF1FB] px-1.5 py-0.5 text-[9px] font-bold leading-none text-[#0D4598]">
//                   #{String(index + 1).padStart(2, "0")}
//                 </span>

//                 <span className="rounded-md border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold leading-none text-emerald-700">
//                   Active
//                 </span>
//               </div>

//               <h3 className="mt-1.5 line-clamp-2 break-words text-[12px] font-bold leading-[15px] text-slate-900">
//                 {quiz.title || `Series ${String(index + 1).padStart(2, "0")}`}
//               </h3>

//               <p className="mt-0.5 line-clamp-1 text-[10px] font-medium leading-4 text-slate-400">
//                 {quiz.description ||
//                   "Practice quiz series for code preparation."}
//               </p>
//             </div>

//             <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598] transition group-hover:bg-[#0D4598] group-hover:text-white">
//               <FaArrowRight size={10} />
//             </div>
//           </div>

//           <div className="mt-2 grid grid-cols-3 gap-1">
//             <InfoBadge label="Q" value={totalQuestions} />
//             <InfoBadge label="Time" value={`${duration}m`} />
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
//         <div className="mb-3 rounded-[14px] border border-slate-200 bg-white p-2.5 shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
//           <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex min-w-0 items-center gap-2.5">
//               <Link
//                 href="/student/code"
//                 className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-[#f8f8fb] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
//               >
//                 <IoChevronBack size={18} />
//               </Link>

//               <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF1FB] text-[#0D4598]">
//                 <IoBookOutline size={17} />
//               </div>

//               <div className="min-w-0">
//                 <div className="mb-0.5 flex flex-wrap items-center gap-1 text-[10px] font-semibold text-slate-400">
//                   <span>Student</span>
//                   <span>/</span>
//                   <span>Code Practice</span>
//                   <span>/</span>
//                   <span className="text-slate-600">{title}</span>
//                 </div>

//                 <h1 className="break-words text-lg font-bold leading-5 text-slate-900 md:text-xl">
//                   {title}
//                 </h1>

//                 <p className="mt-0.5 text-[11px] font-medium leading-4 text-slate-500">
//                   {subtitle}
//                 </p>
//               </div>
//             </div>

//             <div className="flex w-fit items-center gap-2 rounded-xl border border-[#d7e2f2] bg-[#EAF1FB] px-2.5 py-1.5">
//               <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#0D4598]">
//                 <IoTimeOutline size={14} />
//               </div>

//               <div>
//                 <p className="text-[9px] font-bold uppercase leading-none text-slate-400">
//                   Total Series
//                 </p>

//                 <p className="mt-1 text-sm font-black leading-none text-[#0D4598]">
//                   {loading ? "..." : sortedQuizzes.length}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {loading && (
//           <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             <LoadingCard />
//             <LoadingCard />
//             <LoadingCard />
//             <LoadingCard />
//             <LoadingCard />
//             <LoadingCard />
//             <LoadingCard />
//             <LoadingCard />
//           </div>
//         )}

//         {error && (
//           <div className="flex items-start gap-2 rounded-[14px] border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
//             <IoAlertCircleOutline size={17} className="shrink-0" />
//             <span>{error}</span>
//           </div>
//         )}

//         {!loading && !error && sortedQuizzes.length === 0 && (
//           <div className="rounded-[14px] border border-dashed border-slate-300 bg-white p-5 text-center shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
//             <div className="mx-auto mb-2.5 flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF1FB] text-[#0D4598]">
//               <IoAlertCircleOutline size={22} />
//             </div>

//             <h2 className="text-sm font-bold text-slate-900">No Quiz Found</h2>

//             <p className="mt-1.5 text-xs text-slate-500">
//               Admin panel থেকে আগে{" "}
//               <span className="font-bold text-[#0D4598]">{type}</span> type দিয়ে
//               quiz create করুন।
//             </p>
//           </div>
//         )}

//         {!loading && !error && sortedQuizzes.length > 0 && (
//           <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
} from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import {
  getMyQuizAttempts,
  getMyRetakePermissions,
  getStudentCodeQuizzes,
} from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

function LoadingCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
      <div className="h-32 rounded-xl bg-slate-100" />
      <div className="mt-4 h-4 w-3/4 rounded bg-slate-100" />
      <div className="mt-2 h-3 w-full rounded bg-slate-100" />
      <div className="mt-2 h-3 w-2/3 rounded bg-slate-100" />
    </div>
  );
}

function InfoBadge({ label, value }) {
  return (
    <div className="rounded-xl border border-[#E5EAF2] bg-[#F7F9FC] px-3 py-2">
      <p className="text-[10px] font-bold uppercase tracking-wide text-[#7B8190]">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-black text-[#0D4598]">{value}</p>
    </div>
  );
}

function getAttemptStatus(attempt) {
  if (!attempt) return "not_started";
  if (attempt.status === "completed") return "completed";
  if (attempt.status === "in_progress") return "in_progress";
  return "not_started";
}

function getQuizIdFromAttempt(attempt) {
  if (!attempt?.quiz) return "";
  return typeof attempt.quiz === "string"
    ? attempt.quiz
    : attempt.quiz?._id || attempt.quiz?.id || "";
}

function getQuizIdFromPermission(permission) {
  if (!permission?.quiz) return "";
  return typeof permission.quiz === "string"
    ? permission.quiz
    : permission.quiz?._id || permission.quiz?.id || "";
}

function SeriesCard({ quiz, index, attempt, retakePermission }) {
  const totalQuestions = quiz.totalQuestions || 0;
  const duration = quiz.durationMinutes || 30;
  const passingScore = quiz.passingScore || 60;
  const status = getAttemptStatus(attempt);

  const isCompleted = status === "completed";
  const isInProgress = status === "in_progress";
  const hasRetakePermission = Boolean(retakePermission);

  const href =
    isCompleted && !hasRetakePermission
      ? `/student/code/my-history?latest=${attempt?._id || ""}`
      : `/student/code/code-challenge?quizId=${quiz._id}`;

  const buttonText =
    isCompleted && hasRetakePermission
      ? "RETAKE APPROVED"
      : isCompleted
        ? "VIEW RESULT"
        : isInProgress
          ? "RESUME"
          : "START QUIZ";

  const badgeText =
    isCompleted && hasRetakePermission
      ? "Retake On"
      : isCompleted
        ? "Completed"
        : isInProgress
          ? "In Progress"
          : "Active";

  const badgeClass =
    isCompleted && hasRetakePermission
      ? "bg-emerald-50 text-emerald-700"
      : isCompleted
        ? "bg-amber-50 text-amber-700"
        : isInProgress
          ? "bg-blue-50 text-[#0D4598]"
          : "bg-blue-50 text-[#0D4598]";

  const buttonClass =
    isCompleted && hasRetakePermission
      ? "bg-emerald-600 text-white hover:bg-emerald-700"
      : isCompleted
        ? "bg-[#0D4598] text-white hover:bg-[#083777]"
        : "bg-[#0D4598] text-white hover:bg-[#083777]";

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5EAF2] bg-white shadow-[0_10px_30px_rgba(13,69,152,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(13,69,152,0.12)]">
      <div className="relative h-36 bg-[#EEF4FB]">
        {quiz.coverImage ? (
          <img
            src={mediaUrl(quiz.coverImage)}
            alt={quiz.title || "Quiz"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#EEF4FB] to-[#DCEBFA]">
            <span className="text-4xl font-black text-[#0D4598]">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}

        <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-black uppercase text-[#0D4598] shadow-sm">
          #{String(index + 1).padStart(2, "0")}
        </div>

        <div
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-black uppercase shadow-sm ${badgeClass}`}
        >
          {badgeText}
        </div>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 text-lg font-black text-[#151515]">
          {quiz.title || `Series ${String(index + 1).padStart(2, "0")}`}
        </h3>

        <p className="mt-1 line-clamp-2 min-h-[40px] text-sm font-medium text-[#6B7280]">
          {quiz.description || "Practice quiz series for code preparation."}
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <InfoBadge label="Questions" value={totalQuestions} />
          <InfoBadge label="Time" value={`${duration}m`} />
          <InfoBadge label="Pass" value={`${passingScore}%`} />
        </div>

        {isCompleted && hasRetakePermission && (
          <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
            Admin allowed retake. You can retake this quiz one time.
          </div>
        )}

        {isCompleted && !hasRetakePermission && (
          <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700">
            Retake is locked. Contact admin for retake permission.
          </div>
        )}

        {isInProgress && (
          <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-bold text-[#0D4598]">
            You have an unfinished attempt. Continue from where you left.
          </div>
        )}

        <Link
          href={href}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black transition ${buttonClass}`}
        >
          {buttonText}
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
}

export default function CodeQuizListPage({
  type,
  title,
  subtitle = "Select a series and start your practice.",
}) {
  const [quizzes, setQuizzes] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [retakePermissions, setRetakePermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        setLoading(true);
        setError("");

        const [quizRes, attemptRes, retakeRes] = await Promise.all([
          getStudentCodeQuizzes(),
          getMyQuizAttempts().catch(() => ({ data: { data: [] } })),
          getMyRetakePermissions().catch(() => ({ data: { data: [] } })),
        ]);

        const allQuizzes = quizRes.data?.data || [];
        const myAttempts = attemptRes.data?.data || [];
        const myRetakePermissions = retakeRes.data?.data || [];

        const filtered = allQuizzes.filter((quiz) => {
          if (!quiz) return false;
          if (quiz.status !== "active") return false;
          return quiz.type === type;
        });

        setQuizzes(filtered);
        setAttempts(myAttempts);
        setRetakePermissions(myRetakePermissions);
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

  const latestAttemptByQuizId = useMemo(() => {
    const map = new Map();

    attempts.forEach((attempt) => {
      const quizId = getQuizIdFromAttempt(attempt);
      if (!quizId) return;

      const oldAttempt = map.get(quizId);
      const oldTime = new Date(oldAttempt?.createdAt || 0).getTime();
      const newTime = new Date(attempt?.createdAt || 0).getTime();

      if (!oldAttempt || newTime > oldTime) {
        map.set(quizId, attempt);
      }
    });

    return map;
  }, [attempts]);

  const activeRetakeByQuizId = useMemo(() => {
    const map = new Map();

    retakePermissions.forEach((permission) => {
      const quizId = getQuizIdFromPermission(permission);

      if (quizId && permission.status === "active") {
        map.set(quizId, permission);
      }
    });

    return map;
  }, [retakePermissions]);

  const sortedQuizzes = useMemo(() => {
    return [...quizzes].sort((a, b) => {
      const orderA = Number(a.order || 0);
      const orderB = Number(b.order || 0);

      if (orderA !== orderB) return orderA - orderB;

      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [quizzes]);

  const completedCount = useMemo(() => {
    return sortedQuizzes.filter((quiz) => {
      const attempt = latestAttemptByQuizId.get(quiz._id);
      return attempt?.status === "completed";
    }).length;
  }, [sortedQuizzes, latestAttemptByQuizId]);

  const retakeOnCount = useMemo(() => {
    return sortedQuizzes.filter((quiz) => {
      return activeRetakeByQuizId.has(quiz._id);
    }).length;
  }, [sortedQuizzes, activeRetakeByQuizId]);

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-5 md:px-6">
      <section className="mx-auto max-w-6xl">
        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-[#E5EAF2] bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-bold text-[#7B8190]">
              <Link
                href="/student/code"
                className="inline-flex items-center gap-1 text-[#0D4598] hover:underline"
              >
                <IoChevronBack />
                Student
              </Link>
              <span>/</span>
              <span>Code Practice</span>
              <span>/</span>
              <span>{title}</span>
            </div>

            <h1 className="text-2xl font-black text-[#0D4598] md:text-3xl">
              {title}
            </h1>

            <p className="mt-1 text-sm font-medium text-[#6B7280]">
              {subtitle}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 md:min-w-[390px]">
            <div className="rounded-xl bg-[#EEF4FB] px-4 py-3">
              <p className="text-[10px] font-black uppercase text-[#7B8190]">
                Total
              </p>
              <p className="mt-1 text-2xl font-black text-[#0D4598]">
                {loading ? "..." : sortedQuizzes.length}
              </p>
            </div>

            <div className="rounded-xl bg-[#EEF4FB] px-4 py-3">
              <p className="text-[10px] font-black uppercase text-[#7B8190]">
                Completed
              </p>
              <p className="mt-1 text-2xl font-black text-[#0D4598]">
                {loading ? "..." : completedCount}
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50 px-4 py-3">
              <p className="text-[10px] font-black uppercase text-emerald-700">
                Retake On
              </p>
              <p className="mt-1 text-2xl font-black text-emerald-700">
                {loading ? "..." : retakeOnCount}
              </p>
            </div>
          </div>
        </div>

        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-700">
            <IoAlertCircleOutline className="mr-2 inline text-lg" />
            {error}
          </div>
        )}

        {!loading && !error && sortedQuizzes.length === 0 && (
          <div className="rounded-2xl border border-[#E5EAF2] bg-white p-10 text-center shadow-sm">
            <IoBookOutline className="mx-auto text-5xl text-[#0D4598]" />

            <h2 className="mt-4 text-xl font-black text-[#151515]">
              No Quiz Found
            </h2>

            <p className="mt-2 text-sm font-medium text-[#6B7280]">
              Admin panel থেকে আগে{" "}
              <span className="font-black text-[#0D4598]">{type}</span> type
              দিয়ে quiz create করুন।
            </p>
          </div>
        )}

        {!loading && !error && sortedQuizzes.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedQuizzes.map((quiz, index) => (
              <SeriesCard
                key={quiz._id || index}
                quiz={quiz}
                index={index}
                attempt={latestAttemptByQuizId.get(quiz._id)}
                retakePermission={activeRetakeByQuizId.get(quiz._id)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
