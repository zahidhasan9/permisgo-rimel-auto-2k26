// const steps = [
//   {
//     step: "Step 01",
//     text: "Please complete your profile (Dob)",
//   },
//   {
//     step: "Step 02",
//     text: "Please complete (Ecsr Title, City, Department, Vehicle Type)",
//   },
//   {
//     step: "Step 03",
//     text: "Select a default vehicle (Must be approved by the administration)",
//   },
//   {
//     step: "Step 04",
//     text: "Your vehicle is not yet certified",
//   },
//   {
//     step: "Step 05",
//     text: "Select a default location",
//   },
//   {
//     step: "Step 06",
//     text: "Upload your identification documents (Driving Licence Back Document, Driving Licence Front Document)",
//   },
// ];

// const events = [
//   {
//     name: "Defensive Driving Course",
//     date: "Mon, March 2, 2026",
//     duration: "9:00 AM - 2:00 PM",
//     vehicle: "Automatic Car",
//   },
//   {
//     name: "Refresher Driving Lessons",
//     date: "Mon, March 2, 2026",
//     duration: "9:00 AM - 2:00 PM",
//     vehicle: "Motorcycle",
//   },
//   {
//     name: "Teen Driver Education Program",
//     date: "Mon, March 2, 2026",
//     duration: "9:00 AM - 2:00 PM",
//     vehicle: "Duration",
//   },
//   {
//     name: "Road Test Preparation Course",
//     date: "Mon, March 2, 2026",
//     duration: "9:00 AM - 2:00 PM",
//     vehicle: "Duration",
//   },
//   {
//     name: "Beginner Driving Course",
//     date: "Mon, March 2, 2026",
//     duration: "9:00 AM - 2:00 PM",
//     vehicle: "Duration",
//   },
// ];

// const lessons = [
//   {
//     number: "01.",
//     title: "Road Test Preparation Course",
//     text: "Focused training on test routes, examiner expectations, mock driving tests.",
//     progress: 20,
//   },
//   {
//     number: "02.",
//     title: "Road Test Preparation Course",
//     text: "Focused training on test routes, examiner expectations, mock driving tests.",
//     progress: 20,
//   },
// ];

// export default function Dashboard() {
//   return (
//     <>
//       <div className="welcome-section mb-4">
//         <h2>Welcome, Smith</h2>
//         <p>
//           Stay updated on academics, attendance, finances, and more—all in one
//           place.
//         </p>
//       </div>

//       <section className="teacher-status-card mb-4">
//         <h5 className="section-heading mb-3">
//           Please complete the following steps:
//         </h5>

//         <div className="step-list">
//           {steps.map((item, index) => (
//             <div className="teacher-step-item" key={index}>
//               <span className="teacher-step-badge">{item.step}</span>
//               <span className="step-text">{item.text}</span>
//             </div>
//           ))}
//         </div>

//         <div className="text-end mt-4">
//           <h6 className="completed-text mb-0">100% Completed</h6>
//         </div>

//         <div className="teacher-progress-wrapper mt-3">
//           {steps.map((item, index) => (
//             <div className="teacher-progress-step" key={index}>
//               <div className="progress-circle">✓</div>

//               {index !== steps.length - 1 && <div className="progress-line" />}

//               <small>{item.step}</small>
//             </div>
//           ))}
//         </div>

//         <div className="verified-alert mt-4">
//           <span className="info-icon">i</span>
//           <span>
//             Congratulations! Your profile has been successfully verified. You
//             are now an approved instructor.
//           </span>
//         </div>
//       </section>

//       <div className="row g-4">
//         <div className="col-12 col-xl-8">
//           <section className="dashboard-panel h-100">
//             <div className="d-flex justify-content-between align-items-center mb-4">
//               <h4 className="panel-title mb-0">Upcoming Events</h4>

//               <button type="button" className="date-btn">
//                 March, 2026 <span className="ms-1">▣</span>
//               </button>
//             </div>

//             <div className="event-table-box">
//               <div className="table-responsive">
//                 <table className="table align-middle mb-0 custom-event-table">
//                   <thead>
//                     <tr>
//                       <th>Planned Event</th>
//                       <th>Date</th>
//                       <th>Duration</th>
//                       <th>Vehicle Type</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {events.map((event, index) => (
//                       <tr key={index}>
//                         <td className="fw-semibold">{event.name}</td>
//                         <td>{event.date}</td>
//                         <td>{event.duration}</td>
//                         <td>{event.vehicle}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <button type="button" className="show-all-btn mt-4">
//                 Show all
//               </button>
//             </div>
//           </section>
//         </div>

//         <div className="col-12 col-xl-4">
//           <section className="dashboard-panel h-100">
//             <h4 className="panel-title mb-4">Lesson In Progress</h4>

//             <div className="lesson-list">
//               {lessons.map((lesson, index) => (
//                 <div className="lesson-card" key={index}>
//                   <h6>
//                     <span>{lesson.number}</span> {lesson.title}
//                   </h6>

//                   <p>{lesson.text}</p>

//                   <strong>Duration: 3–5 Intensive Lessons</strong>

//                   <div className="progress lesson-progress mt-2">
//                     <div
//                       className="progress-bar"
//                       role="progressbar"
//                       style={{ width: `${lesson.progress}%` }}
//                       aria-valuenow={lesson.progress}
//                       aria-valuemin="0"
//                       aria-valuemax="100"
//                     ></div>
//                   </div>

//                   <h6 className="lesson-progress-text mt-2 mb-0">
//                     {lesson.progress}% Progress
//                   </h6>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>
//       </div>
//     </>
//   );
// }

const steps = [
  {
    step: "Step 01",
    text: "Please complete your profile (Dob)",
  },
  {
    step: "Step 02",
    text: "Please complete (Ecsr Title, City, Department, Vehicle Type)",
  },
  {
    step: "Step 03",
    text: "Select a default vehicle (Must be approved by the administration)",
  },
  {
    step: "Step 04",
    text: "Your vehicle is not yet certified",
  },
  {
    step: "Step 05",
    text: "Select a default location",
  },
  {
    step: "Step 06",
    text: "Upload your identification documents (Driving Licence Back Document, Driving Licence Front Document)",
  },
];

const events = [
  {
    name: "Defensive Driving Course",
    date: "Mon, March 2, 2026",
    duration: "9:00 AM - 2:00 PM",
    vehicle: "Automatic Car",
  },
  {
    name: "Refresher Driving Lessons",
    date: "Mon, March 2, 2026",
    duration: "9:00 AM - 2:00 PM",
    vehicle: "Motorcycle",
  },
  {
    name: "Teen Driver Education Program",
    date: "Mon, March 2, 2026",
    duration: "9:00 AM - 2:00 PM",
    vehicle: "Duration",
  },
  {
    name: "Road Test Preparation Course",
    date: "Mon, March 2, 2026",
    duration: "9:00 AM - 2:00 PM",
    vehicle: "Duration",
  },
  {
    name: "Beginner Driving Course",
    date: "Mon, March 2, 2026",
    duration: "9:00 AM - 2:00 PM",
    vehicle: "Duration",
  },
];

const lessons = [
  {
    number: "01.",
    title: "Road Test Preparation Course",
    text: "Focused training on test routes, examiner expectations, mock driving tests.",
    progress: 20,
  },
  {
    number: "02.",
    title: "Road Test Preparation Course",
    text: "Focused training on test routes, examiner expectations, mock driving tests.",
    progress: 20,
  },
];

export default function Dashboard() {
  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Welcome */}
      <div className="mb-4">
        <h2 className="text-xl font-extrabold text-blue-900 sm:text-2xl">
          Welcome, Smith
        </h2>
        <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
          Stay updated on academics, attendance, finances, and more—all in one
          place.
        </p>
      </div>

      {/* Status Card */}
      <section className="mb-4 rounded-xl bg-slate-100 p-3 sm:p-4">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h5 className="text-sm font-extrabold text-slate-900 sm:text-base">
            Please complete the following steps:
          </h5>

          <h6 className="text-sm font-extrabold text-green-600">
            100% Completed
          </h6>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          {steps.map((item, index) => (
            <StepItem key={index} step={item.step} text={item.text} />
          ))}
        </div>

        <ProgressTracker steps={steps} />

        <div className="mt-4 flex items-start gap-2 rounded-lg bg-blue-600 px-3 py-2.5 text-white">
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-extrabold text-blue-600">
            i
          </span>

          <p className="text-xs font-medium leading-5 sm:text-sm">
            Congratulations! Your profile has been successfully verified. You
            are now an approved instructor.
          </p>
        </div>
      </section>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 gap-4 2xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* Upcoming Events */}
        <section className="min-w-0 rounded-xl bg-slate-100 p-3 sm:p-4">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h4 className="text-lg font-extrabold text-blue-900">
              Upcoming Events
            </h4>

            <button
              type="button"
              className="w-fit rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              March, 2026 <span className="ml-1">▣</span>
            </button>
          </div>

          <div className="rounded-xl bg-slate-200 p-2.5 sm:p-3">
            <div className="overflow-hidden rounded-lg bg-white">
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[650px] border-collapse text-left">
                  <thead>
                    <tr className="bg-blue-900 text-white">
                      <TableHead>Planned Event</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Vehicle Type</TableHead>
                    </tr>
                  </thead>

                  <tbody>
                    {events.map((event, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
                      >
                        <TableData strong>{event.name}</TableData>
                        <TableData>{event.date}</TableData>
                        <TableData>{event.duration}</TableData>
                        <TableData>{event.vehicle}</TableData>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <button
              type="button"
              className="mt-3 rounded-lg bg-rose-600 px-4 py-2 text-xs font-extrabold text-white transition hover:bg-rose-700"
            >
              Show all
            </button>
          </div>
        </section>

        {/* Lesson In Progress */}
        <section className="min-w-0 rounded-xl bg-slate-100 p-3 sm:p-4">
          <h4 className="mb-3 text-lg font-extrabold text-blue-900">
            Lesson In Progress
          </h4>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-1">
            {lessons.map((lesson, index) => (
              <LessonCard key={index} lesson={lesson} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function StepItem({ step, text }) {
  return (
    <div className="flex items-start gap-2 rounded-lg bg-slate-200 p-2.5">
      <span className="shrink-0 rounded-md bg-green-500 px-3 py-1.5 text-[11px] font-extrabold text-white">
        {step}
      </span>

      <span className="text-xs leading-5 text-slate-600 sm:text-[13px]">
        {text}
      </span>
    </div>
  );
}

function ProgressTracker({ steps }) {
  return (
    <div className="mt-4 w-full overflow-x-auto pb-1">
      <div className="flex min-w-[560px] items-start">
        {steps.map((item, index) => (
          <div key={index} className="relative flex-1">
            <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-900 text-sm font-bold text-white">
              ✓
            </div>

            {index !== steps.length - 1 && (
              <div className="absolute left-9 right-3 top-4 h-[2px] bg-blue-900" />
            )}

            <small className="mt-1.5 block text-[11px] font-bold text-slate-500">
              {item.step}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

function LessonCard({ lesson }) {
  return (
    <div className="rounded-xl bg-white p-3 shadow-sm">
      <h6 className="text-sm font-extrabold leading-5 text-slate-900">
        <span>{lesson.number}</span> {lesson.title}
      </h6>

      <p className="mt-1.5 text-xs leading-5 text-slate-500">{lesson.text}</p>

      <strong className="mt-2 block text-xs font-bold text-blue-900">
        Duration: 3–5 Intensive Lessons
      </strong>

      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-900"
          style={{ width: `${lesson.progress}%` }}
        />
      </div>

      <h6 className="mt-1.5 text-xs font-extrabold text-green-600">
        {lesson.progress}% Progress
      </h6>
    </div>
  );
}

function TableHead({ children }) {
  return (
    <th className="whitespace-nowrap px-3 py-2.5 text-[11px] font-extrabold sm:px-4">
      {children}
    </th>
  );
}

function TableData({ children, strong = false }) {
  return (
    <td
      className={`whitespace-nowrap px-3 py-2.5 text-[11px] sm:px-4 ${
        strong ? "font-bold text-slate-900" : "text-slate-500"
      }`}
    >
      {children}
    </td>
  );
}
