// "use client";

// export default function CrashTestPage() {
//   const options = [
//     { text: "before the sign only", answer: "HAS" },
//     { text: "only after the sign", answer: "B" },
//     { text: "before and after the sign", answer: "C" },
//   ];

//   return (
//     <main className="min-h-screen bg-white p-6 font-sans">
//       {/* Header */}
//       <header className="flex items-center gap-4">
//         <button
//           type="button"
//           onClick={() => window.history.back()}
//           aria-label="Go back"
//           className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8EEF7] text-black transition active:scale-95"
//         >
//           <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
//             <path
//               d="M15 18L9 12L15 6"
//               stroke="currentColor"
//               strokeWidth="2.4"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </button>

//         <h1 className="text-[26px] font-bold leading-none tracking-[-0.02em] text-[#153F8A]">
//           Crash Test
//         </h1>
//       </header>

//       {/* Main Card */}
//       <section className="mt-8 rounded-[10px] bg-[#E6ECF5] px-6 pb-6 pt-7">
//         <h2 className="text-[16px] font-bold text-[#0B3F95]">Question 1/40</h2>

//         {/* Road Image */}
//         <div className="mt-[30px] overflow-hidden rounded-[10px]">
//           <img
//             src="/crash-road.png"
//             alt="Crash test question"
//             className="h-[438px] w-full object-cover"
//           />
//         </div>

//         {/* Bottom Content */}
//         <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr]">
//           {/* Left Options */}
//           <div>
//             <h3 className="mb-5 text-[17px] font-bold text-[#1D1D1F]">
//               Parking is prohibited
//             </h3>

//             <div className="space-y-4">
//               {options.map((item, index) => (
//                 <div
//                   key={index}
//                   className="grid grid-cols-[230px_1fr_55px] items-center"
//                 >
//                   <p className="text-[17px] font-semibold leading-none text-[#0B3F95]">
//                     - {item.text}
//                   </p>

//                   <div className="mx-2 border-t border-dashed border-[#1D1D1F]" />

//                   <p className="text-[15px] font-semibold text-[#1D1D1F]">
//                     {item.answer}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Answer */}
//           <div className="flex flex-col justify-end">
//             <h3 className="mb-4 text-[17px] font-bold text-[#1D1D1F]">
//               An answer
//             </h3>

//             <div className="mb-6 ml-1">
//               <AnswerSignIcon />
//             </div>

//             <div className="flex flex-wrap items-center gap-4">
//               {["HAS", "B", "C", "D"].map((btn) => (
//                 <button
//                   key={btn}
//                   className="h-[42px] min-w-[66px] rounded-[8px] bg-white px-6 text-[15px] font-semibold text-[#1D1D1F] transition hover:bg-[#F8FAFC] active:scale-95"
//                 >
//                   {btn}
//                 </button>
//               ))}

//               <button className="h-[42px] rounded-[8px] bg-[#22C43B] px-6 text-[12px] font-bold uppercase text-white transition hover:bg-[#1EB333] active:scale-95">
//                 To Validate
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

// function AnswerSignIcon() {
//   return (
//     <div className="relative h-[68px] w-[68px]">
//       {/* top arrows */}
//       <div className="absolute left-[10px] top-[6px] h-[18px] w-[22px] rotate-[-35deg] border-l-[5px] border-t-[5px] border-[#202124]" />
//       <div className="absolute right-[12px] top-[1px] h-[18px] w-[17px] border-r-[5px] border-t-[5px] border-[#202124]" />

//       {/* sign circle */}
//       <div className="absolute bottom-0 left-1/2 flex h-[55px] w-[55px] -translate-x-1/2 items-center justify-center rounded-full border-[4px] border-[#202124] bg-white">
//         <div className="relative h-[43px] w-[43px] overflow-hidden rounded-full border-[3px] border-[#275EA7] bg-[#275EA7]">
//           <div className="absolute left-[-7px] top-[18px] h-[8px] w-[58px] rotate-[-45deg] bg-white" />
//         </div>
//       </div>
//     </div>
//   );
// }

// ======================================================================================
import Link from "next/link";
import {
  IoArrowForward,
  IoCheckmarkCircle,
  IoChevronBack,
  IoCodeSlash,
  IoDocumentTextOutline,
  IoFlashOutline,
  IoGridOutline,
  IoPlay,
  IoSearch,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
  IoTrophyOutline,
} from "react-icons/io5";

const tests = [
  {
    title: "Crash Test",
    description:
      "Practice visual road-sign based questions and improve your driving awareness.",
    level: "Beginner",
    questions: 40,
    duration: "25 min",
    score: "80%",
    href: "/student/test/test-details",
    skills: ["Road Signs", "Driving Rules", "Safety"],
    featured: true,
  },
  {
    title: "Live Coding Challenge",
    description:
      "Solve real frontend problems with clean logic, structure and best practices.",
    level: "Intermediate",
    questions: 18,
    duration: "45 min",
    score: "70%",
    href: "/student/test/test-detail",
    skills: ["React", "Next.js", "Logic"],
    featured: false,
  },
  {
    title: "JavaScript Fundamentals",
    description:
      "Test your core JavaScript knowledge with practical MCQ and logic questions.",
    level: "Beginner",
    questions: 30,
    duration: "35 min",
    score: "75%",
    href: "/student/test/test-detail",
    skills: ["Variables", "Functions", "Arrays"],
    featured: false,
  },
  {
    title: "Frontend UI Assessment",
    description:
      "Evaluate your ability to build responsive, clean and user-friendly interfaces.",
    level: "Advanced",
    questions: 22,
    duration: "50 min",
    score: "85%",
    href: "/student/test/test-detail",
    skills: ["Tailwind", "Layout", "UX"],
    featured: false,
  },
];

export default function TestsPage() {
  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-4 antialiased sm:px-5 lg:px-6">
      <div className="mx-auto max-w-[1080px]">
        {/* Header */}
        <header className="mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white text-[#344054] shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] transition active:scale-95"
            >
              <IoChevronBack className="text-[21px]" />
            </Link>

            <div>
              <h1 className="text-[22px] font-semibold tracking-[-0.035em] text-[#1B3F73] sm:text-[26px]">
                Test Center
              </h1>
              <p className="mt-0.5 text-xs text-[#7A8495]">
                Choose a test, review details and start your assessment.
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-[14px] bg-white px-3.5 py-2.5 text-xs font-medium text-[#667085] shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] sm:flex">
            <IoShieldCheckmarkOutline className="text-[16px] text-[#477DBA]" />
            Pro Assessment
          </div>
        </header>

        {/* Hero */}
        <section className="mb-4 rounded-[24px] bg-[#EAF1FA] p-3 shadow-[0_10px_28px_rgba(16,24,40,0.05)] ring-1 ring-black/[0.03] sm:p-4">
          <div className="grid gap-3 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#477DBA] via-[#245A97] to-[#163A63] p-5 text-white">
              <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-16 left-20 h-40 w-40 rounded-full bg-[#B7D4FF]/20 blur-3xl" />

              <div className="relative z-10 max-w-[620px]">
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/14 px-2.5 py-1 text-[10px] font-medium text-white/90 backdrop-blur-md">
                  <IoTrophyOutline className="text-[#F8D57E]" />
                  Skill Based Testing
                </div>

                <h2 className="text-[24px] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[32px]">
                  Practice smarter with professional test modules.
                </h2>

                <p className="mt-2 max-w-[520px] text-xs leading-5 text-white/72 sm:text-[13px]">
                  Each test includes duration, question count, difficulty level
                  and required passing score — just like a real assessment
                  platform.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href="#available-tests"
                    className="inline-flex items-center gap-2 rounded-[14px] bg-white px-4 py-2.5 text-xs font-medium text-[#1D4E89] shadow-[0_8px_20px_rgba(0,0,0,0.10)] transition active:scale-[0.98]"
                  >
                    <IoPlay className="text-sm" />
                    Explore Tests
                  </a>

                  <div className="inline-flex items-center gap-2 rounded-[14px] bg-white/12 px-4 py-2.5 text-xs text-white/90 backdrop-blur-md">
                    <IoFlashOutline className="text-sm" />
                    Fast & Simple
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
              <StatCard icon={<IoGridOutline />} value="04" label="Tests" />
              <StatCard
                icon={<IoDocumentTextOutline />}
                value="110"
                label="Questions"
              />
              <StatCard
                icon={<IoCheckmarkCircle />}
                value="80%"
                label="Avg Pass"
              />
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="mb-4 flex h-11 items-center gap-2.5 rounded-[16px] bg-white px-3.5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04]">
          <IoSearch className="text-[17px] text-[#98A2B3]" />
          <input
            type="text"
            placeholder="Search test by name, skill or difficulty..."
            className="h-full w-full bg-transparent text-xs text-[#344054] outline-none placeholder:text-[#A8B0BE]"
          />
        </section>

        {/* Tests */}
        <section
          id="available-tests"
          className="rounded-[24px] bg-white p-3.5 shadow-[0_1px_3px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] sm:p-4"
        >
          <div className="mb-4 flex items-end justify-between gap-3 px-1">
            <div>
              <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-[#263241]">
                Available Tests
              </h3>
              <p className="mt-0.5 text-xs text-[#8A94A6]">
                Select a test and continue to the assessment page.
              </p>
            </div>

            <span className="hidden rounded-full bg-[#EEF5FF] px-3 py-1.5 text-[11px] font-medium text-[#477DBA] sm:inline-flex">
              HackerRank style
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {tests.map((test) => (
              <article
                key={test.title}
                className="group rounded-[20px] bg-[#FAFBFD] p-4 ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_14px_32px_rgba(16,24,40,0.07)]"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-[#EEF5FF] text-[#477DBA]">
                      <IoCodeSlash className="text-[21px]" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-[16px] font-semibold tracking-[-0.02em] text-[#263241]">
                          {test.title}
                        </h4>

                        {test.featured && (
                          <span className="rounded-full bg-[#ECFDF3] px-2 py-0.5 text-[10px] font-medium text-[#12A150]">
                            Recommended
                          </span>
                        )}
                      </div>

                      <p className="mt-1 max-w-[420px] text-xs leading-5 text-[#7A8495]">
                        {test.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-3 flex flex-wrap gap-1.5">
                  {test.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-[#667085] ring-1 ring-black/[0.04]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 rounded-[16px] bg-white p-2.5 ring-1 ring-black/[0.04]">
                  <InfoItem label="Level" value={test.level} />
                  <InfoItem label="Questions" value={test.questions} />
                  <InfoItem label="Pass Score" value={test.score} />
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-[#7A8495]">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EEF5FF] text-[#477DBA]">
                      <IoTimeOutline className="text-[14px]" />
                    </span>
                    {test.duration}
                  </div>

                  <Link
                    href={test.href}
                    className="inline-flex h-9 items-center gap-2 rounded-[13px] bg-[#1D4E89] px-4 text-xs font-medium text-white shadow-[0_8px_18px_rgba(29,78,137,0.16)] transition hover:bg-[#193F70] active:scale-[0.98]"
                  >
                    Start Test
                    <IoArrowForward className="text-sm transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="rounded-[17px] bg-white/70 p-3 text-[#263241] shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-white/60 backdrop-blur-md">
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-[12px] bg-[#EEF5FF] text-[16px] text-[#477DBA]">
        {icon}
      </div>
      <h3 className="text-[20px] font-semibold leading-none tracking-[-0.04em]">
        {value}
      </h3>
      <p className="mt-1 text-[11px] text-[#7A8495]">{label}</p>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-[10px] text-[#98A2B3]">{label}</p>
      <p className="mt-0.5 truncate text-xs font-medium text-[#344054]">
        {value}
      </p>
    </div>
  );
}
