// import Link from "next/link";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
// import { IoChevronBack } from "react-icons/io5";

// const progressLessons = Array.from({ length: 3 }, (_, index) => ({
//   id: index + 1,
//   title: "Legal provisions regarding road traffic",
//   date: "Monday, March 2, 2026, 10:00 AM",
//   progress: 20,
// }));

// const completedLessons = Array.from({ length: 3 }, (_, index) => ({
//   id: index + 1,
//   title: "Legal provisions regarding road traffic",
//   date: "Monday, March 2, 2026, 10:00 AM",
//   vehicle: "Automatic - Toyota Corolla",
//   progress: 100,
// }));

// const topicResultsLeft = [
//   { code: "L", value: 40, color: "#6ab4e4" },
//   { code: "C", value: 40, color: "#e5008a" },
//   { code: "R", value: 30, color: "#aaa0d1" },
//   { code: "U", value: 47, color: "#d84b2e" },
//   { code: "D", value: 36, color: "#ffc218" },
// ];

// const topicResultsRight = [
//   { code: "HAS", value: 40, color: "#ef3434" },
//   { code: "P", value: 47, color: "#565654" },
//   { code: "M", value: 21, color: "#f29100" },
//   { code: "S", value: 31, color: "#3c982b" },
//   { code: "E", value: 37, color: "#96ab18" },
// ];

// const topicListLeft = [
//   {
//     code: "L",
//     color: "#f2a300",
//     text: "Legal provisions regarding road traffic",
//   },
//   { code: "C", color: "#3aa0e5", text: "The Driver" },
//   { code: "R", color: "#ef3434", text: "The Road" },
//   { code: "U", color: "#7669b0", text: "Other road users" },
//   {
//     code: "D",
//     color: "#e5008a",
//     text: "General regulations and miscellaneous",
//   },
// ];

// const topicListRight = [
//   { code: "HAS", color: "#e83083", text: "First aid" },
//   {
//     code: "P",
//     color: "#565654",
//     text: "Precautions to take when leaving the vehicle",
//   },
//   {
//     code: "M",
//     color: "#39aaa9",
//     text: "Mechanical components and other safety-related equipment",
//   },
//   { code: "S", color: "#3c982b", text: "Vehicle safety equipment" },
//   {
//     code: "E",
//     color: "#96ab18",
//     text: "Rules for using the vehicle in relation to ecology",
//   },
// ];

// const SliderButtons = () => {
//   return (
//     <div className="flex items-center gap-2">
//       <button className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#dfe6f1] text-[#df2339]">
//         <FaArrowLeft className="text-[10px]" />
//       </button>

//       <button className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#df2339] text-white">
//         <FaArrowRight className="text-[10px]" />
//       </button>
//     </div>
//   );
// };

// const LessonCard = ({ item, completed = false }) => {
//   return (
//     <article className="rounded-[8px] bg-white p-3">
//       <Link
//         href="#"
//         className="block text-[12.5px] font-extrabold leading-[1.35] text-[#143f8d] underline underline-offset-2"
//       >
//         {item.title}
//       </Link>

//       <div className="mt-2 space-y-0.5 text-[10.5px] leading-relaxed text-[#666]">
//         <p>
//           Start Date <span className="font-bold text-[#111]">{item.date}</span>
//         </p>

//         {completed && (
//           <p>
//             Vehicle Type:{" "}
//             <span className="font-bold text-[#111]">{item.vehicle}</span>
//           </p>
//         )}
//       </div>

//       <div className="mt-2.5 h-[8px] w-full overflow-hidden rounded-full bg-[#d5dce7]">
//         <div
//           className="h-full rounded-full bg-[#174596]"
//           style={{ width: `${item.progress}%` }}
//         />
//       </div>

//       <p className="mt-1.5 text-[10.5px] font-extrabold text-[#13bf38]">
//         {completed ? "100% Completed" : "20% Progress"}
//       </p>
//     </article>
//   );
// };

// const SectionBox = ({ title, children, showSlider = false }) => {
//   return (
//     <section className="mt-4 rounded-[9px] bg-[#e8eef7] p-3">
//       {title && (
//         <div className="mb-3 flex items-center justify-between gap-3">
//           <h2 className="text-[16px] font-extrabold leading-none text-[#143f8d]">
//             {title}
//           </h2>

//           {showSlider && <SliderButtons />}
//         </div>
//       )}

//       {children}
//     </section>
//   );
// };

// const PerformanceCard = ({ title, description, lines, buttonText }) => {
//   return (
//     <article className="rounded-[9px] bg-white p-5">
//       <h3 className="text-[18px] font-extrabold leading-tight text-[#111]">
//         {title}
//       </h3>

//       <p className="mt-3 max-w-[410px] text-[13px] leading-[1.55] text-[#222]">
//         {description}
//       </p>

//       <div className="mt-2 space-y-[2px] text-[12.5px] leading-relaxed text-[#111]">
//         {lines.map((line, index) => (
//           <p key={index}>{line}</p>
//         ))}
//       </div>

//       <button className="mt-4 rounded-[7px] bg-[#df2339] px-3.5 py-2 text-[11px] font-bold text-white">
//         {buttonText}
//       </button>
//     </article>
//   );
// };

// const TopicBar = ({ item }) => {
//   return (
//     <div className="h-[32px] overflow-hidden rounded-[4px] bg-white">
//       <div
//         className="flex h-full items-center justify-between rounded-[4px] px-3 text-white"
//         style={{
//           width: `${item.value}%`,
//           minWidth: "105px",
//           backgroundColor: item.color,
//         }}
//       >
//         <span className="text-[14px] font-extrabold">{item.code}</span>
//         <span className="text-[14px] font-extrabold">{item.value}%</span>
//       </div>
//     </div>
//   );
// };

// const TopicListItem = ({ item }) => {
//   return (
//     <div className="grid grid-cols-[42px_1fr] items-start gap-2">
//       <span
//         className="text-[15px] font-extrabold leading-none"
//         style={{ color: item.color }}
//       >
//         {item.code} :
//       </span>

//       <span className="text-[12px] leading-relaxed text-[#666]">
//         {item.text}
//       </span>
//     </div>
//   );
// };

// const MyHistoryPage = () => {
//   return (
//     <main className="min-h-screen bg-white px-5 py-5 font-sans text-[#111]">
//       <div className="mx-auto w-full max-w-[1000px]">
//         <header className="flex items-center justify-between gap-4">
//           <div className="flex items-center gap-3">
//             <Link
//               href="#"
//               className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#e7ebf2] text-[20px] text-black"
//             >
//               <IoChevronBack />
//             </Link>

//             <h1 className="text-[22px] font-extrabold text-[#143f8d]">
//               My History
//             </h1>
//           </div>

//           <button className="h-9 rounded-[7px] bg-[#df2339] px-4 text-[11px] font-bold text-white">
//             Download
//           </button>
//         </header>

//         <SectionBox title="Lesson Progress" showSlider>
//           <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
//             {progressLessons.map((lesson) => (
//               <LessonCard key={lesson.id} item={lesson} />
//             ))}
//           </div>
//         </SectionBox>

//         <SectionBox title="Lesson Completed" showSlider>
//           <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
//             {completedLessons.map((lesson) => (
//               <LessonCard key={lesson.id} item={lesson} completed />
//             ))}
//           </div>
//         </SectionBox>

//         <SectionBox>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             <PerformanceCard
//               title="Total Performance in Mock Exam"
//               description="See your overall score and track your progress in traffic rules knowledge."
//               lines={["Score: 85%", "Total Mock Test: 20", "Passed: 13"]}
//               buttonText="Take Practice Test"
//             />

//             <PerformanceCard
//               title="Recent Quiz Result"
//               description="See your latest score and track your progress in traffic rules knowledge."
//               lines={[
//                 "Latest Score: 85%",
//                 "Correct Answers: 17 / 20",
//                 "Status: Passed",
//               ]}
//               buttonText="Review Answers"
//             />
//           </div>
//         </SectionBox>

//         <SectionBox title="My result by topic">
//           <div className="mt-4 grid grid-cols-1 gap-x-5 gap-y-3 md:grid-cols-2">
//             <div className="space-y-3">
//               {topicResultsLeft.map((item) => (
//                 <TopicBar key={item.code} item={item} />
//               ))}
//             </div>

//             <div className="space-y-3">
//               {topicResultsRight.map((item) => (
//                 <TopicBar key={item.code} item={item} />
//               ))}
//             </div>
//           </div>

//           <div className="mt-5 rounded-[9px] bg-white p-5">
//             <h3 className="text-[14px] font-extrabold text-[#143f8d]">
//               List of topics:
//             </h3>

//             <div className="mt-5 grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
//               <div className="space-y-4">
//                 {topicListLeft.map((item) => (
//                   <TopicListItem key={item.code} item={item} />
//                 ))}
//               </div>

//               <div className="space-y-4">
//                 {topicListRight.map((item) => (
//                   <TopicListItem key={item.code} item={item} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </SectionBox>
//       </div>
//     </main>
//   );
// };

// export default MyHistoryPage;

import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoChevronBack } from "react-icons/io5";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const progressLessons = Array.from({ length: 3 }, (_, index) => ({
  id: index + 1,
  title: "Legal provisions regarding road traffic",
  date: "Mon, Mar 2 · 10:00 AM",
  progress: 20,
}));

const completedLessons = Array.from({ length: 3 }, (_, index) => ({
  id: index + 1,
  title: "Legal provisions regarding road traffic",
  date: "Mon, Mar 2 · 10:00 AM",
  vehicle: "Automatic · Toyota Corolla",
  progress: 100,
}));

const topicResultsLeft = [
  { code: "L", value: 40, color: "#5AA9E6" },
  { code: "C", value: 40, color: "#D6408F" },
  { code: "R", value: 30, color: "#9C8FCB" },
  { code: "U", value: 47, color: "#D1503A" },
  { code: "D", value: 36, color: "#E0AC12" },
];

const topicResultsRight = [
  { code: "HAS", value: 40, color: "#E24444" },
  { code: "P", value: 47, color: "#6E6E73" },
  { code: "M", value: 21, color: "#E08A1E" },
  { code: "S", value: 31, color: "#3F9142" },
  { code: "E", value: 37, color: "#8FA023" },
];

const topicListLeft = [
  {
    code: "L",
    color: "#E0AC12",
    text: "Legal provisions regarding road traffic",
  },
  { code: "C", color: "#3AA0E5", text: "The Driver" },
  { code: "R", color: "#D1503A", text: "The Road" },
  { code: "U", color: "#7669B0", text: "Other road users" },
  {
    code: "D",
    color: "#D6408F",
    text: "General regulations and miscellaneous",
  },
];

const topicListRight = [
  { code: "HAS", color: "#E24444", text: "First aid" },
  {
    code: "P",
    color: "#6E6E73",
    text: "Precautions to take when leaving the vehicle",
  },
  {
    code: "M",
    color: "#3A9C9B",
    text: "Mechanical components and other safety-related equipment",
  },
  { code: "S", color: "#3F9142", text: "Vehicle safety equipment" },
  {
    code: "E",
    color: "#8FA023",
    text: "Rules for using the vehicle in relation to ecology",
  },
];

/* ------------------------------------------------------------------ */
/*  Shared primitives                                                  */
/* ------------------------------------------------------------------ */

const SliderButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Previous"
        className="flex h-7 w-7 items-center justify-center rounded-full border border-black/[0.06] bg-white text-[#1d1d1f] transition-colors hover:bg-black/[0.03]"
      >
        <FaArrowLeft className="text-[9px]" />
      </button>

      <button
        aria-label="Next"
        className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1d1d1f] text-white transition-opacity hover:opacity-80"
      >
        <FaArrowRight className="text-[9px]" />
      </button>
    </div>
  );
};

const LessonCard = ({ item, completed = false }) => {
  return (
    <article className="rounded-[14px] border border-black/[0.06] bg-white p-4 transition-shadow hover:shadow-[0_2px_14px_rgba(0,0,0,0.05)]">
      <Link
        href="#"
        className="block text-[13px] font-medium leading-[1.4] tracking-[-0.01em] text-[#1d1d1f]"
      >
        {item.title}
      </Link>

      <div className="mt-2 space-y-[3px] text-[11.5px] leading-relaxed text-[#86868b]">
        <p>{item.date}</p>
        {completed && <p>{item.vehicle}</p>}
      </div>

      <div className="mt-3 flex items-center gap-2.5">
        <div className="h-[4px] flex-1 overflow-hidden rounded-full bg-[#f0f0f2]">
          <div
            className={`h-full rounded-full ${
              completed ? "bg-[#30a852]" : "bg-[#0071e3]"
            }`}
            style={{ width: `${item.progress}%` }}
          />
        </div>
        <span
          className={`text-[11px] font-medium tabular-nums ${
            completed ? "text-[#30a852]" : "text-[#0071e3]"
          }`}
        >
          {item.progress}%
        </span>
      </div>
    </article>
  );
};

const SectionBox = ({ title, children, showSlider = false }) => {
  return (
    <section className="mt-6">
      {title && (
        <div className="mb-3.5 flex items-center justify-between gap-3">
          <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-[#1d1d1f]">
            {title}
          </h2>

          {showSlider && <SliderButtons />}
        </div>
      )}

      <div className="rounded-[18px] bg-[#f5f5f7] p-4">{children}</div>
    </section>
  );
};

const PerformanceCard = ({ title, description, lines, buttonText }) => {
  return (
    <article className="rounded-[16px] border border-black/[0.06] bg-white p-5">
      <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-[#1d1d1f]">
        {title}
      </h3>

      <p className="mt-2 max-w-[420px] text-[12.5px] leading-[1.55] text-[#6e6e73]">
        {description}
      </p>

      <dl className="mt-4 space-y-1.5 border-t border-black/[0.06] pt-3">
        {lines.map((line, index) => {
          const [label, value] = line.split(":");
          return (
            <div
              key={index}
              className="flex items-center justify-between text-[12.5px]"
            >
              <dt className="text-[#86868b]">{label?.trim()}</dt>
              <dd className="font-medium tabular-nums text-[#1d1d1f]">
                {value?.trim()}
              </dd>
            </div>
          );
        })}
      </dl>

      <button className="mt-4 rounded-full bg-[#1d1d1f] px-4 py-2 text-[12px] font-medium text-white transition-opacity hover:opacity-85">
        {buttonText}
      </button>
    </article>
  );
};

/* Informative, low-key horizontal bar — label / track / value, in the
   spirit of Apple Health & Screen Time breakdowns rather than a bold
   filled block. */
const TopicBar = ({ item }) => {
  return (
    <div className="flex items-center gap-3">
      <span
        className="w-[34px] shrink-0 text-[11px] font-semibold tracking-[-0.01em]"
        style={{ color: item.color }}
      >
        {item.code}
      </span>

      <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-black/[0.06]">
        <div
          className="h-full rounded-full"
          style={{ width: `${item.value}%`, backgroundColor: item.color }}
        />
      </div>

      <span className="w-[30px] shrink-0 text-right text-[11.5px] font-medium tabular-nums text-[#1d1d1f]">
        {item.value}%
      </span>
    </div>
  );
};

const TopicListItem = ({ item }) => {
  return (
    <div className="flex items-start gap-2.5">
      <span
        className="mt-[3px] h-[7px] w-[7px] shrink-0 rounded-full"
        style={{ backgroundColor: item.color }}
      />

      <div className="flex flex-wrap items-baseline gap-x-1.5">
        <span
          className="text-[11.5px] font-semibold"
          style={{ color: item.color }}
        >
          {item.code}
        </span>
        <span className="text-[12px] leading-relaxed text-[#6e6e73]">
          {item.text}
        </span>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

const MyHistoryPage = () => {
  return (
    <main
      className="min-h-screen bg-white px-5 py-6 text-[#1d1d1f]"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div className="mx-auto w-full max-w-[1000px]">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f5f7] text-[18px] text-[#1d1d1f] transition-colors hover:bg-black/[0.06]"
            >
              <IoChevronBack />
            </Link>

            <h1 className="text-[20px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
              My History
            </h1>
          </div>

          <button className="h-9 rounded-full bg-[#df2339] px-4 text-[12px] font-medium text-white transition-opacity hover:opacity-85">
            Download
          </button>
        </header>

        <SectionBox title="Lesson Progress" showSlider>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {progressLessons.map((lesson) => (
              <LessonCard key={lesson.id} item={lesson} />
            ))}
          </div>
        </SectionBox>

        <SectionBox title="Lesson Completed" showSlider>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {completedLessons.map((lesson) => (
              <LessonCard key={lesson.id} item={lesson} completed />
            ))}
          </div>
        </SectionBox>

        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <PerformanceCard
            title="Total Performance"
            description="Your overall score across every mock exam attempted so far."
            lines={["Score: 85%", "Total Mock Tests: 20", "Passed: 13"]}
            buttonText="Take Practice Test"
          />

          <PerformanceCard
            title="Recent Quiz Result"
            description="Your latest attempt and how it compares to a passing score."
            lines={[
              "Latest Score: 85%",
              "Correct Answers: 17 / 20",
              "Status: Passed",
            ]}
            buttonText="Review Answers"
          />
        </section>

        <SectionBox title="Result by Topic">
          <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 md:grid-cols-2">
            <div className="space-y-2.5">
              {topicResultsLeft.map((item) => (
                <TopicBar key={item.code} item={item} />
              ))}
            </div>

            <div className="space-y-2.5">
              {topicResultsRight.map((item) => (
                <TopicBar key={item.code} item={item} />
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-[14px] border border-black/[0.06] bg-white p-5">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#86868b]">
              List of Topics
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-x-10 gap-y-3.5 md:grid-cols-2">
              <div className="space-y-3.5">
                {topicListLeft.map((item) => (
                  <TopicListItem key={item.code} item={item} />
                ))}
              </div>

              <div className="space-y-3.5">
                {topicListRight.map((item) => (
                  <TopicListItem key={item.code} item={item} />
                ))}
              </div>
            </div>
          </div>
        </SectionBox>
      </div>
    </main>
  );
};

export default MyHistoryPage;
