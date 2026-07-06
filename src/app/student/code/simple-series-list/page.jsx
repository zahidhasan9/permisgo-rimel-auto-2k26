// import { IoChevronBack } from "react-icons/io5";
// import { FaArrowRight } from "react-icons/fa6";
// import Link from "next/link";

// const seriesList = Array.from({ length: 18 }, (_, index) => ({
//   link: `/student/code/code-challenge`,
//   title: `Series ${String(index + 1).padStart(2, "0")}`,
//   progress: "54%",
// }));

// function SeriesCard({ title, progress, link }) {
//   return (
//     <Link href={link}>
//       <div className="flex h-[82px] items-center justify-between rounded-[9px] bg-[#E8EEF7] px-[24px]">
//         <div className="w-full pr-[18px]">
//           <h3 className="mb-[10px] text-[15px] font-bold text-[#111318]">
//             {title}
//           </h3>

//           <div className="h-[12px] w-full max-w-[230px] rounded-full bg-[#DCE5F2]">
//             <div
//               className="h-full rounded-full bg-[#154A9C]"
//               style={{ width: progress }}
//             />
//           </div>
//         </div>

//         <button
//           type="button"
//           className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#E7233D] text-white"
//         >
//           <FaArrowRight className="text-[18px]" />
//         </button>
//       </div>
//     </Link>
//   );
// }

// export default function SimpleSeriesList() {
//   return (
//     <main className="min-h-screen bg-white px-[24px] py-[24px]">
//       <div className="mx-auto max-w-[1084px]">
//         <header className="mb-[30px] flex items-center gap-[16px]">
//           <button
//             type="button"
//             className="flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-[#E8EEF7] text-black"
//           >
//             <IoChevronBack className="text-[25px]" />
//           </button>

//           <h1 className="text-[23px] font-bold leading-none text-[#0D4598]">
//             Simple Series List
//           </h1>
//         </header>

//         <section className="grid grid-cols-1 gap-x-[18px] gap-y-[18px] md:grid-cols-2 xl:grid-cols-3">
//           {seriesList.map((item) => (
//             <SeriesCard
//               key={item.title}
//               title={item.title}
//               progress={item.progress}
//               link={item.link}
//             />
//           ))}
//         </section>
//       </div>
//     </main>
//   );
// }

// backend apply

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { IoChevronBack } from "react-icons/io5";
// import { FaArrowRight } from "react-icons/fa6";
// import { getQuizzes } from "@/features/API";
// import { mediaUrl } from "@/utils/mediaUrl";

// function SeriesCard({ quiz, index }) {
//   const totalQuestions = quiz.totalQuestions || 0;
//   const duration = quiz.durationMinutes || 30;

//   return (
//     <Link
//       href={`/student/code/code-challenge?quizId=${quiz._id}`}
//       className="group block rounded-[18px] border border-[#E9EEF7] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
//     >
//       <div className="flex items-center justify-between gap-3">
//         <div className="flex items-center gap-3">
//           <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF5FF] text-lg font-bold text-[#0D4598]">
//             {String(index + 1).padStart(2, "0")}
//           </div>

//           <div>
//             <h3 className="text-[16px] font-bold text-[#151515]">
//               {quiz.title || `Series ${String(index + 1).padStart(2, "0")}`}
//             </h3>

//             <p className="mt-1 text-xs font-medium text-[#7B8190]">
//               {totalQuestions} questions • {duration} min • Pass{" "}
//               {quiz.passingScore || 60}%
//             </p>
//           </div>
//         </div>

//         <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D4598] text-white transition group-hover:bg-[#083777]">
//           <FaArrowRight size={14} />
//         </div>
//       </div>

//       {quiz.coverImage ? (
//         <img
//           src={mediaUrl(quiz.coverImage)}
//           alt={quiz.title}
//           className="mt-4 h-36 w-full rounded-xl object-cover"
//         />
//       ) : null}

//       <div className="mt-4">
//         <div className="mb-1 flex items-center justify-between text-xs font-semibold text-[#7B8190]">
//           <span>Progress</span>
//           <span>0%</span>
//         </div>

//         <div className="h-2 overflow-hidden rounded-full bg-[#EDF1F7]">
//           <div className="h-full w-0 rounded-full bg-[#0D4598]" />
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default function SimpleSeriesList() {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const loadQuizzes = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const res = await getQuizzes();
//         const allQuizzes = res.data?.data || [];

//         const simpleSeries = allQuizzes.filter(
//           (quiz) =>
//             quiz.status !== "deleted" &&
//             (!quiz.type || quiz.type === "simple_series"),
//         );

//         setQuizzes(simpleSeries);
//       } catch (err) {
//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             "Failed to load simple series",
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadQuizzes();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#F7F9FC] px-4 py-5 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-6xl">
//         <div className="mb-6 flex items-center gap-3">
//           <Link
//             href="/student/code"
//             className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0D4598] shadow-sm"
//           >
//             <IoChevronBack size={24} />
//           </Link>

//           <div>
//             <h1 className="text-2xl font-bold text-[#151515]">
//               Simple Series List
//             </h1>
//             <p className="mt-1 text-sm text-[#7B8190]">
//               Select a series and start your code quiz practice.
//             </p>
//           </div>
//         </div>

//         {loading ? (
//           <div className="rounded-2xl bg-white p-6 text-center text-[#0D4598] shadow-sm">
//             Loading simple series...
//           </div>
//         ) : null}

//         {error ? (
//           <div className="rounded-2xl bg-red-50 p-5 text-sm font-medium text-red-700">
//             {error}
//           </div>
//         ) : null}

//         {!loading && !error && quizzes.length === 0 ? (
//           <div className="rounded-2xl bg-white p-6 text-center text-[#7B8190] shadow-sm">
//             No simple series found. Admin থেকে আগে quiz create করুন।
//           </div>
//         ) : null}

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
//           {quizzes.map((quiz, index) => (
//             <SeriesCard key={quiz._id} quiz={quiz} index={index} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// apply backend code 2
import CodeQuizListPage from "../_components/CodeQuizListPage";

export default function SimpleSeriesListPage() {
  return (
    <CodeQuizListPage
      type="simple_series"
      title="Simple Series"
      subtitle="Practice simple code series questions."
    />
  );
}
