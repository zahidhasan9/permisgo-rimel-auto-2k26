"use client";

import {} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  IoChevronBack,
  IoCheckmarkCircle,
  IoTimeOutline,
  IoCardOutline,
  IoCalendarOutline,
  IoTrophyOutline,
} from "react-icons/io5";

const tabs = [
  "Registration",
  "Credits",
  "Reservation",
  "Examination",
  "Results",
];

export default function Page() {
  const [activeTab, setActiveTab] = useState("Registration");

  const router = useRouter();

  function handleBack() {
    router.back();
  }
  return (
    <main className="min-h-screen bg-white px-4 py-4 font-sans text-[#171717] sm:px-5 lg:px-6">
      <div className="mx-auto w-full max-w-[1040px]">
        {/* Header */}
        <header className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#E8EEF7] text-[22px] text-black transition hover:bg-[#dfe7f2] sm:h-10 sm:w-10"
          >
            <IoChevronBack />
          </button>
          <div>
            <h1 className="text-[21px] font-bold leading-tight text-[#173F8F] sm:text-[23px]">
              Demand for your driving Exam
            </h1>
            <p className="mt-1 text-[12.5px] font-medium text-[#667085]">
              Manage your exam registration, credits, reservation and results.
            </p>
          </div>
        </header>

        {/* Main Box */}
        <section className="mt-6 rounded-[13px] bg-[#E8EEF7] p-3.5 sm:p-4">
          {/* Tabs */}
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`h-[40px] rounded-[9px] text-[13px] font-bold transition ${
                  activeTab === tab
                    ? "bg-[#B7C8E8] text-[#174596] shadow-sm"
                    : "bg-white text-[#666666] hover:bg-[#F5F7FB] hover:text-[#174596]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Registration Tab */}
          {activeTab === "Registration" && (
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
              {/* Card 1 */}
              <div className="rounded-[11px] bg-white p-4">
                <h2 className="text-[15.5px] font-bold text-[#174596]">
                  Details of your registration :
                </h2>

                <div className="mt-3 space-y-2 text-[13px] leading-[1.5] text-[#666666]">
                  <p>
                    Teacher :{" "}
                    <span className="font-bold text-[#171717]">
                      Robart Smith
                    </span>
                  </p>
                  <p>
                    Vehicle Type :{" "}
                    <span className="font-bold text-[#171717]">Automatic</span>
                  </p>
                  <p>
                    End Date of Training :{" "}
                    <span className="font-bold text-[#171717]">
                      16 January 2025
                    </span>
                  </p>
                </div>

                <h3 className="mt-3 text-[14px] font-bold text-[#174596]">
                  Requested Exam Centers :
                </h3>

                <p className="mt-1.5 text-[13px] leading-[1.5] text-[#666666]">
                  The deadlines are counted from the end date to take the
                  training.
                </p>

                <div className="mt-3 rounded-[9px] bg-[#E8EEF7] p-3 text-[13px] leading-[1.5] text-[#666666]">
                  Wait times are currently shorter at this center{" "}
                  <span className="font-bold text-[#174596]">Center Name</span>.
                  Ask your instructor to add it to your preferences for a faster
                  exam slot.
                </div>

                <div className="mt-3 space-y-3 text-[13px] leading-[1.4]">
                  {[
                    ["Nanterre B :", "Queue of the 48", "2–4 weeks"],
                    ["Argenteuil B :", "Queue of the 95", "2–4 weeks"],
                    ["Cergy-Pontoise :", "Queue of the 95", "2–4 weeks"],
                  ].map((item) => (
                    <div
                      key={item[0]}
                      className="grid grid-cols-1 gap-1 sm:grid-cols-[110px_1fr] lg:grid-cols-1 xl:grid-cols-[110px_1fr]"
                    >
                      <p className="font-bold text-[#171717]">{item[0]}</p>
                      <p className="text-[#666666]">
                        {item[1]}{" "}
                        <span className="block">
                          Estimated Wait Time {item[2]}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-[11px] bg-white p-4">
                <h2 className="text-[15.5px] font-bold text-[#174596]">
                  Booking Status :
                </h2>

                <p className="mt-3 text-[13px] text-[#666666]">
                  Current Status :
                </p>

                <p className="mt-1.5 text-[13px] font-bold leading-[1.45] text-[#174596]">
                  Searching for an Available Exam Slot
                </p>

                <p className="mt-4 text-[13px] leading-[1.55] text-[#666666]">
                  Exam dates are assigned by local authorities, so availability
                  may vary depending on demand in your area.
                </p>

                <div className="mt-4 rounded-[9px] bg-[#E8EEF7] p-3">
                  <h3 className="text-[14px] font-bold text-[#174596]">
                    What’s happening now:
                  </h3>

                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[13px] leading-[1.5] text-[#666666]">
                    <li>Our system checks available exam slots daily.</li>
                    <li>We prioritize the earliest possible date for you.</li>
                  </ul>
                </div>

                <p className="mt-4 text-[13px] leading-[1.55] text-[#174596]">
                  You will receive your invitation by email about 2 to 6 weeks
                  before the exam day.
                </p>
              </div>

              {/* Card 3 */}
              <div className="rounded-[11px] bg-white p-4">
                <h2 className="text-[15.5px] font-bold text-[#174596]">
                  What to expect :
                </h2>

                <p className="mt-3 text-[13px] leading-[1.55] text-[#666666]">
                  Be prepared by bringing the required documents and following
                  the exam guidelines.
                </p>

                <div className="mt-3 grid grid-cols-1 gap-2.5">
                  {[
                    {
                      title: "Exam Invitation",
                      points: [
                        "Download confirmation from dashboard",
                        "Print and bring a physical copy",
                      ],
                    },
                    {
                      title: "Valid Proof of Identity",
                      points: [
                        "Bring original valid ID",
                        "Must not be expired",
                      ],
                    },
                    {
                      title: "Additional Documents",
                      points: [
                        "Required envelopes or forms",
                        "Fill all details correctly",
                      ],
                    },
                    {
                      title: "Driving License",
                      points: ["Bring any license you already hold"],
                    },
                  ].map((box) => (
                    <div
                      key={box.title}
                      className="rounded-[9px] bg-[#E8EEF7] p-3"
                    >
                      <h3 className="text-[13px] font-bold text-[#174596]">
                        {box.title}
                      </h3>

                      <ul className="mt-2 list-disc space-y-1 pl-5 text-[12.5px] leading-[1.45] text-[#666666]">
                        {box.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Credits Tab */}
          {activeTab === "Credits" && (
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="rounded-[11px] bg-white p-4 lg:col-span-2">
                <h2 className="text-[15.5px] font-bold text-[#174596]">
                  Your Driving Credits
                </h2>

                <p className="mt-2.5 text-[13px] leading-[1.55] text-[#666666]">
                  Credits are used to book lessons, reserve training hours and
                  prepare for your exam.
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    ["Available Credits", "12 Hours"],
                    ["Used Credits", "38 Hours"],
                    ["Total Hours", "50 Hours"],
                  ].map((item) => (
                    <div
                      key={item[0]}
                      className="rounded-[9px] bg-[#E8EEF7] p-3"
                    >
                      <p className="text-[12px] font-semibold text-[#667085]">
                        {item[0]}
                      </p>
                      <p className="mt-1.5 text-[20px] font-bold text-[#174596]">
                        {item[1]}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-[9px] bg-[#E8EEF7] p-3">
                  <div className="flex items-center justify-between text-[12.5px] font-bold">
                    <span className="text-[#174596]">Training Progress</span>
                    <span className="text-[#20BF3A]">76%</span>
                  </div>

                  <div className="mt-2.5 h-[8px] overflow-hidden rounded-full bg-white">
                    <div className="h-full w-[76%] rounded-full bg-[#20BF3A]" />
                  </div>
                </div>
              </div>

              <div className="rounded-[11px] bg-white p-4">
                <h2 className="text-[15.5px] font-bold text-[#174596]">
                  Buy More Credits
                </h2>

                <div className="mt-3 space-y-2.5">
                  {["1 Hour", "5 Hours", "10 Hours"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="flex w-full items-center justify-between rounded-[9px] bg-[#E8EEF7] px-3.5 py-2.5 text-[13px] font-bold text-[#174596] transition hover:bg-[#174596] hover:text-white"
                    >
                      <span>{item}</span>
                      <IoCardOutline className="text-[18px]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reservation Tab */}
          {activeTab === "Reservation" && (
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-[11px] bg-white p-4">
                <h2 className="text-[15.5px] font-bold text-[#174596]">
                  Reservation Information
                </h2>

                <p className="mt-2.5 text-[13px] leading-[1.55] text-[#666666]">
                  Your reservation request is active. You will be notified when
                  a suitable exam slot becomes available.
                </p>

                <div className="mt-4 space-y-2.5">
                  {[
                    ["Preferred Center", "Nanterre B"],
                    ["Preferred Date", "As soon as possible"],
                    ["Reservation Status", "Waiting for confirmation"],
                    ["Notification", "Email and dashboard alert"],
                  ].map((item) => (
                    <div
                      key={item[0]}
                      className="flex items-start justify-between gap-4 rounded-[9px] bg-[#E8EEF7] p-3"
                    >
                      <span className="text-[12.5px] font-bold text-[#174596]">
                        {item[0]}
                      </span>
                      <span className="text-right text-[12.5px] font-semibold text-[#666666]">
                        {item[1]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[11px] bg-white p-4">
                <h2 className="text-[15.5px] font-bold text-[#174596]">
                  Reservation Timeline
                </h2>

                <div className="mt-4 space-y-3">
                  {[
                    "Registration submitted",
                    "Center preference added",
                    "Searching available slot",
                    "Exam invitation pending",
                  ].map((item, index) => (
                    <div key={item} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                          index < 3
                            ? "bg-[#174596] text-white"
                            : "bg-[#E8EEF7] text-[#174596]"
                        }`}
                      >
                        {index < 3 ? <IoCheckmarkCircle /> : <IoTimeOutline />}
                      </span>

                      <div>
                        <p className="text-[13px] font-bold text-[#171717]">
                          {item}
                        </p>
                        <p className="mt-0.5 text-[12.5px] text-[#666666]">
                          Step {index + 1} of 4
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Examination Tab */}
          {activeTab === "Examination" && (
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="rounded-[11px] bg-white p-4 lg:col-span-2">
                <h2 className="text-[15.5px] font-bold text-[#174596]">
                  Examination Preparation
                </h2>

                <p className="mt-2.5 text-[13px] leading-[1.55] text-[#666666]">
                  Before the exam day, make sure your documents are ready and
                  you understand the examination process.
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    "Arrive at least 20 minutes early",
                    "Bring valid proof of identity",
                    "Carry your exam invitation",
                    "Review important safety rules",
                    "Stay calm and follow examiner instructions",
                    "Check mirrors and seat position",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 rounded-[9px] bg-[#E8EEF7] p-3"
                    >
                      <IoCheckmarkCircle className="mt-0.5 shrink-0 text-[18px] text-[#20BF3A]" />
                      <p className="text-[13px] leading-[1.4] text-[#666666]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[11px] bg-white p-4">
                <h2 className="text-[15.5px] font-bold text-[#174596]">
                  Exam Day
                </h2>

                <div className="mt-3 rounded-[9px] bg-[#E8EEF7] p-4 text-center">
                  <IoCalendarOutline className="mx-auto text-[38px] text-[#174596]" />
                  <p className="mt-2 text-[12.5px] font-semibold text-[#667085]">
                    Expected invitation
                  </p>
                  <p className="mt-1 text-[19px] font-bold text-[#174596]">
                    2–6 Weeks
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Results Tab */}
          {activeTab === "Results" && (
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="rounded-[11px] bg-white p-4 lg:col-span-2">
                <h2 className="text-[15.5px] font-bold text-[#174596]">
                  Exam Results
                </h2>

                <p className="mt-2.5 text-[13px] leading-[1.55] text-[#666666]">
                  Your final result will appear here once the examination has
                  been completed and validated by the authority.
                </p>

                <div className="mt-4 rounded-[9px] bg-[#E8EEF7] p-4 text-center">
                  <IoTrophyOutline className="mx-auto text-[42px] text-[#174596]" />
                  <h3 className="mt-2 text-[17px] font-bold text-[#174596]">
                    Result Not Published Yet
                  </h3>
                  <p className="mt-1.5 text-[13px] text-[#666666]">
                    Please check again after your driving exam.
                  </p>
                </div>
              </div>

              <div className="rounded-[11px] bg-white p-4">
                <h2 className="text-[15.5px] font-bold text-[#174596]">
                  After Result
                </h2>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-[13px] leading-[1.5] text-[#666666]">
                  <li>Download your result from dashboard.</li>
                  <li>Contact support if you need correction.</li>
                  <li>Follow next steps after passing.</li>
                  <li>Retake guidance will appear if needed.</li>
                </ul>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
