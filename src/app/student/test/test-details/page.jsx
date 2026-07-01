import Link from "next/link";
import {
  IoArrowForward,
  IoCarSportOutline,
  IoCheckmarkCircle,
  IoChevronBack,
  IoClipboardOutline,
  IoDocumentTextOutline,
  IoEyeOutline,
  IoFlagOutline,
  IoInformationCircleOutline,
  IoPlay,
  IoShieldCheckmarkOutline,
  IoSpeedometerOutline,
  IoTimeOutline,
  IoTrailSignOutline,
  IoWarningOutline,
} from "react-icons/io5";

const testTopics = [
  {
    title: "Road Signs",
    description:
      "Traffic signs, warning signs, parking signs and direction boards.",
    icon: <IoTrailSignOutline />,
  },
  {
    title: "Traffic Rules",
    description: "Lane rules, overtaking, right of way and road discipline.",
    icon: <IoFlagOutline />,
  },
  {
    title: "Hazard Awareness",
    description: "Identify danger situations and make safe driving decisions.",
    icon: <IoWarningOutline />,
  },
  {
    title: "Speed Control",
    description: "Speed limits, braking distance and safe speed judgement.",
    icon: <IoSpeedometerOutline />,
  },
  {
    title: "Vehicle Safety",
    description: "Seatbelt, mirrors, lights, tyres and basic vehicle checks.",
    icon: <IoCarSportOutline />,
  },
  {
    title: "Observation",
    description: "Mirror checking, blind spots and road scanning practice.",
    icon: <IoEyeOutline />,
  },
];

const testRules = [
  "Read every question carefully before selecting an answer.",
  "Some questions may include road images or traffic signs.",
  "You must complete the test within the given time.",
  "Minimum passing score is required to complete the assessment.",
];

export default function DrivingTestPage() {
  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-4 antialiased sm:px-5 lg:px-6">
      <div className="mx-auto max-w-[1080px]">
        {/* Header */}
        <header className="mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/tests"
              className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white text-[#344054] shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] transition active:scale-95"
            >
              <IoChevronBack className="text-[21px]" />
            </Link>

            <div>
              <h1 className="text-[22px] font-semibold tracking-[-0.035em] text-[#1B3F73] sm:text-[26px]">
                Driving Theory Test
              </h1>
              <p className="mt-0.5 text-xs text-[#7A8495]">
                Road signs, rules, hazard awareness and safe driving practice.
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-[14px] bg-white px-3.5 py-2.5 text-xs font-medium text-[#667085] shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] sm:flex">
            <IoShieldCheckmarkOutline className="text-[16px] text-[#477DBA]" />
            Official Style Test
          </div>
        </header>

        {/* Hero */}
        <section className="mb-4 rounded-[24px] bg-[#EAF1FA] p-3 shadow-[0_10px_28px_rgba(16,24,40,0.05)] ring-1 ring-black/[0.03] sm:p-4">
          <div className="grid gap-3 lg:grid-cols-[1.28fr_0.72fr]">
            <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#4E83BD] via-[#245A97] to-[#163A63] p-5 text-white">
              <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-16 left-20 h-40 w-40 rounded-full bg-[#B7D4FF]/20 blur-3xl" />

              <div className="relative z-10">
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/14 px-2.5 py-1 text-[10px] font-medium text-white/90 backdrop-blur-md">
                  <IoCarSportOutline className="text-[#F8D57E]" />
                  Driving Assessment
                </div>

                <h2 className="max-w-[560px] text-[25px] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[34px]">
                  Prepare for your driving test with real exam-style practice.
                </h2>

                <p className="mt-2 max-w-[530px] text-xs leading-5 text-white/72 sm:text-[13px]">
                  This test covers road signs, parking rules, hazard judgement,
                  speed control, right of way and safe driving decisions.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href="/student/test/go-test"
                    className="inline-flex items-center gap-2 rounded-[14px] bg-white px-4 py-2.5 text-xs font-medium text-[#1D4E89] shadow-[0_8px_20px_rgba(0,0,0,0.10)] transition active:scale-[0.98]"
                  >
                    <IoPlay className="text-sm" />
                    Start Test
                  </Link>

                  <div className="inline-flex items-center gap-2 rounded-[14px] bg-white/12 px-4 py-2.5 text-xs text-white/90 backdrop-blur-md">
                    <IoTimeOutline className="text-sm" />
                    25 minutes
                  </div>
                </div>
              </div>
            </div>

            {/* Test Summary */}
            <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
              <SummaryCard
                icon={<IoDocumentTextOutline />}
                value="40"
                label="Questions"
              />
              <SummaryCard
                icon={<IoCheckmarkCircle />}
                value="80%"
                label="Pass Score"
              />
              <SummaryCard
                icon={<IoTimeOutline />}
                value="25m"
                label="Duration"
              />
            </div>
          </div>
        </section>

        {/* Test Details */}
        <section className="mb-4 grid gap-3 lg:grid-cols-[0.72fr_1.28fr]">
          {/* Left Info */}
          <div className="rounded-[22px] bg-white p-4 shadow-[0_1px_3px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04]">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-[13px] bg-[#EEF5FF] text-[#477DBA]">
                <IoInformationCircleOutline className="text-[19px]" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-[#263241]">
                  Test Information
                </h3>
                <p className="text-xs text-[#8A94A6]">
                  Before starting the exam
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              <InfoRow label="Test Type" value="Driving Theory" />
              <InfoRow label="Mode" value="MCQ + Image Based" />
              <InfoRow label="Difficulty" value="Beginner to Intermediate" />
              <InfoRow label="Result" value="Instant after submit" />
            </div>

            <Link
              href="/student/test/go-test"
              className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-[14px] bg-[#1D4E89] text-xs font-medium text-white shadow-[0_8px_18px_rgba(29,78,137,0.16)] transition active:scale-[0.98]"
            >
              Start Driving Test
              <IoArrowForward className="text-sm" />
            </Link>
          </div>

          {/* Right Rules */}
          <div className="rounded-[22px] bg-white p-4 shadow-[0_1px_3px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04]">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-[13px] bg-[#EEF5FF] text-[#477DBA]">
                <IoClipboardOutline className="text-[19px]" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-[#263241]">
                  Test Rules
                </h3>
                <p className="text-xs text-[#8A94A6]">
                  Follow these instructions during the test
                </p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {testRules.map((rule, index) => (
                <div
                  key={index}
                  className="flex gap-2 rounded-[16px] bg-[#FAFBFD] p-3 ring-1 ring-black/[0.04]"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EEF5FF] text-[#477DBA]">
                    <IoCheckmarkCircle className="text-[13px]" />
                  </span>
                  <p className="text-xs leading-5 text-[#667085]">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="rounded-[24px] bg-white p-3.5 shadow-[0_1px_3px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] sm:p-4">
          <div className="mb-4 px-1">
            <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-[#263241]">
              What This Driving Test Includes
            </h3>
            <p className="mt-0.5 text-xs text-[#8A94A6]">
              Main areas covered in the driving theory assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {testTopics.map((topic) => (
              <article
                key={topic.title}
                className="group rounded-[19px] bg-[#FAFBFD] p-4 ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_28px_rgba(16,24,40,0.07)]"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#EEF5FF] text-[21px] text-[#477DBA] transition group-hover:bg-[#E5F0FF]">
                  {topic.icon}
                </div>

                <h4 className="text-[15px] font-semibold tracking-[-0.02em] text-[#263241]">
                  {topic.title}
                </h4>

                <p className="mt-1.5 text-xs leading-5 text-[#7A8495]">
                  {topic.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({ icon, value, label }) {
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

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[15px] bg-[#FAFBFD] px-3 py-2.5 ring-1 ring-black/[0.04]">
      <p className="text-xs text-[#8A94A6]">{label}</p>
      <p className="text-xs font-medium text-[#344054]">{value}</p>
    </div>
  );
}
