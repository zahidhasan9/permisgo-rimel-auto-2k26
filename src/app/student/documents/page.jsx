"use client";

import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";

const requirements = [
  {
    title: "IDENTITY & LEGAL STATUS",
    items: [
      "Valid ID (Passport or National ID)",
      "Valid residence permit (if non-EU)",
    ],
  },
  {
    title: "DRIVING LICENSE",
    items: ["Category B license", "Minimum 3 years of driving experience"],
  },
  {
    title: "INSTRUCTOR QUALIFICATION",
    items: ["Obtain Titre Professionnel ECSR (Driving Instructor Diploma)"],
  },
  {
    title: "TEACHING AUTHORIZATION",
    items: ["Apply for “Autorisation d’enseigner” from the Prefecture"],
  },
  {
    title: "MEDICAL CERTIFICATE",
    items: ["Get a medical fitness certificate from an approved doctor"],
  },
  {
    title: "CRIMINAL RECORD CHECK",
    items: ["Clean criminal record (Casier judiciaire – Bulletin nº2)"],
  },
  {
    title: "BUSINESS REGISTRATION",
    items: [
      "Register as auto-entrepreneur or company",
      "Get your SIRET number (via URSSAF/INSEE)",
    ],
  },
  {
    title: "PROFESSIONAL INSURANCE",
    items: ["Liability insurance (Responsabilité civile professionnelle)"],
  },
];

const downloadableFiles = [
  "DOWNLOAD THE FRONT OF THE PERMIT *",
  "DOWNLOAD THE BACK OF THE PERMIT *",
];

export default function Page() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white px-4 py-5 font-sans text-[#171717] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1040px]">
        {/* Header */}
        <header className="mb-7 flex items-start gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#EEF4FB] text-[24px] text-[#111827] transition hover:bg-[#dfe7f2]"
          >
            <IoChevronBack />
          </button>

          <div>
            <h1 className="text-[23px] font-bold leading-tight text-[#174A9B] sm:text-[25px]">
              Profile
            </h1>

            <p className="mt-2 text-[13px] font-medium leading-[1.5] text-[#6F737B] sm:text-[13.5px]">
              Update your information to ensure accurate lesson scheduling and
              communication.
            </p>
          </div>
        </header>

        {/* Requirement Cards */}
        <section className="space-y-4">
          {requirements.map((requirement) => (
            <div
              key={requirement.title}
              className="flex flex-col gap-4 rounded-[12px] bg-[#E8EEF8] p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5"
            >
              <div className="min-w-0">
                <h2 className="text-[14px] font-bold leading-tight text-[#174A9B] sm:text-[15px]">
                  {requirement.title}
                </h2>

                <ul className="mt-3 space-y-2 pl-1">
                  {requirement.items.map((item) => (
                    <li
                      key={item}
                      className="text-[14px] font-medium leading-[1.45] text-[#101010] before:mr-2 before:content-['•'] sm:text-[15px]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className="h-9 w-full shrink-0 rounded-[8px] bg-[#DF263C] px-4 text-[12px] font-bold text-white transition hover:bg-[#c91f33] sm:w-auto"
              >
                Upload Document
              </button>
            </div>
          ))}
        </section>

        {/* Downloadable Files */}
        <section className="mt-5 rounded-[12px] bg-[#E8EEF8] p-4 sm:p-5">
          <h2 className="text-[20px] font-bold leading-tight text-[#174A9B] sm:text-[22px]">
            Downloadable Files
          </h2>

          <p className="mt-3 text-[13px] font-medium leading-[1.5] text-[#6F737B] sm:text-[13.5px]">
            You will find below the list of your downloadable documents
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {downloadableFiles.map((file) => (
              <div
                key={file}
                className="flex min-h-[130px] flex-col items-center justify-center rounded-[12px] bg-white p-5"
              >
                <h3 className="text-center text-[14px] font-bold leading-[1.4] text-[#174A9B] sm:text-[15px]">
                  {file}
                </h3>

                <button
                  type="button"
                  className="mt-4 h-11 w-[112px] rounded-[10px] border-2 border-[#DF263C] bg-white text-[14px] font-bold text-[#111111] transition hover:bg-[#DF263C] hover:text-white"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
