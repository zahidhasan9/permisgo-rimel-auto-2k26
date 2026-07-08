// "use client";

// import { useRouter } from "next/navigation";
// import { IoChevronBack } from "react-icons/io5";

// const requirements = [
//   {
//     title: "IDENTITY & LEGAL STATUS",
//     items: [
//       "Valid ID (Passport or National ID)",
//       "Valid residence permit (if non-EU)",
//     ],
//   },
//   {
//     title: "DRIVING LICENSE",
//     items: ["Category B license", "Minimum 3 years of driving experience"],
//   },
//   {
//     title: "INSTRUCTOR QUALIFICATION",
//     items: ["Obtain Titre Professionnel ECSR (Driving Instructor Diploma)"],
//   },
//   {
//     title: "TEACHING AUTHORIZATION",
//     items: ["Apply for “Autorisation d’enseigner” from the Prefecture"],
//   },
//   {
//     title: "MEDICAL CERTIFICATE",
//     items: ["Get a medical fitness certificate from an approved doctor"],
//   },
//   {
//     title: "CRIMINAL RECORD CHECK",
//     items: ["Clean criminal record (Casier judiciaire – Bulletin nº2)"],
//   },
//   {
//     title: "BUSINESS REGISTRATION",
//     items: [
//       "Register as auto-entrepreneur or company",
//       "Get your SIRET number (via URSSAF/INSEE)",
//     ],
//   },
//   {
//     title: "PROFESSIONAL INSURANCE",
//     items: ["Liability insurance (Responsabilité civile professionnelle)"],
//   },
// ];

// const downloadableFiles = [
//   "DOWNLOAD THE FRONT OF THE PERMIT *",
//   "DOWNLOAD THE BACK OF THE PERMIT *",
// ];

// export default function Page() {
//   const router = useRouter();

//   return (
//     <main className="min-h-screen bg-white px-4 py-5 font-sans text-[#171717] sm:px-6 lg:px-8">
//       <div className="mx-auto w-full max-w-[1040px]">
//         {/* Header */}
//         <header className="mb-7 flex items-start gap-3 sm:gap-4">
//           <button
//             type="button"
//             onClick={() => router.back()}
//             aria-label="Go back"
//             className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#EEF4FB] text-[24px] text-[#111827] transition hover:bg-[#dfe7f2]"
//           >
//             <IoChevronBack />
//           </button>

//           <div>
//             <h1 className="text-[23px] font-bold leading-tight text-[#174A9B] sm:text-[25px]">
//               Profile
//             </h1>

//             <p className="mt-2 text-[13px] font-medium leading-[1.5] text-[#6F737B] sm:text-[13.5px]">
//               Update your information to ensure accurate lesson scheduling and
//               communication.
//             </p>
//           </div>
//         </header>

//         {/* Requirement Cards */}
//         <section className="space-y-4">
//           {requirements.map((requirement) => (
//             <div
//               key={requirement.title}
//               className="flex flex-col gap-4 rounded-[12px] bg-[#E8EEF8] p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5"
//             >
//               <div className="min-w-0">
//                 <h2 className="text-[14px] font-bold leading-tight text-[#174A9B] sm:text-[15px]">
//                   {requirement.title}
//                 </h2>

//                 <ul className="mt-3 space-y-2 pl-1">
//                   {requirement.items.map((item) => (
//                     <li
//                       key={item}
//                       className="text-[14px] font-medium leading-[1.45] text-[#101010] before:mr-2 before:content-['•'] sm:text-[15px]"
//                     >
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <button
//                 type="button"
//                 className="h-9 w-full shrink-0 rounded-[8px] bg-[#DF263C] px-4 text-[12px] font-bold text-white transition hover:bg-[#c91f33] sm:w-auto"
//               >
//                 Upload Document
//               </button>
//             </div>
//           ))}
//         </section>

//         {/* Downloadable Files */}
//         <section className="mt-5 rounded-[12px] bg-[#E8EEF8] p-4 sm:p-5">
//           <h2 className="text-[20px] font-bold leading-tight text-[#174A9B] sm:text-[22px]">
//             Downloadable Files
//           </h2>

//           <p className="mt-3 text-[13px] font-medium leading-[1.5] text-[#6F737B] sm:text-[13.5px]">
//             You will find below the list of your downloadable documents
//           </p>

//           <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
//             {downloadableFiles.map((file) => (
//               <div
//                 key={file}
//                 className="flex min-h-[130px] flex-col items-center justify-center rounded-[12px] bg-white p-5"
//               >
//                 <h3 className="text-center text-[14px] font-bold leading-[1.4] text-[#174A9B] sm:text-[15px]">
//                   {file}
//                 </h3>

//                 <button
//                   type="button"
//                   className="mt-4 h-11 w-[112px] rounded-[10px] border-2 border-[#DF263C] bg-white text-[14px] font-bold text-[#111111] transition hover:bg-[#DF263C] hover:text-white"
//                 >
//                   Download
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import {
  IoChevronBack,
  IoCloudUploadOutline,
  IoDownloadOutline,
  IoDocumentTextOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

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
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-4 sm:px-5 lg:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="mb-4 rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                aria-label="Go back"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598] transition hover:bg-[#0D4598] hover:text-white"
              >
                <IoChevronBack size={24} />
              </button>

              <div>
                <div className="mb-1 inline-flex rounded-md bg-[#EAF1FB] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#0D4598]">
                  Admin Panel / Profile Documents
                </div>

                <h1 className="text-xl font-black text-[#151515]">Profile</h1>

                <p className="mt-1 text-sm text-[#7B8190]">
                  Update your information for accurate lesson scheduling and
                  communication.
                </p>
              </div>
            </div>

            <div className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#DDE6F3] bg-white px-4 text-xs font-black text-[#0D4598]">
              <IoShieldCheckmarkOutline size={17} />
              Required Documents
            </div>
          </div>
        </header>

        {/* Summary Cards */}
        <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <SummaryBox label="Total Requirements" value={requirements.length} />
          <SummaryBox label="Download Files" value={downloadableFiles.length} />
          <SummaryBox label="Status" value="Pending" />
        </section>

        {/* Requirement Cards */}
        <section className="rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-black text-[#151515]">
                Document Requirements
              </h2>

              <p className="mt-1 text-sm text-[#7B8190]">
                Upload the required documents for profile verification.
              </p>
            </div>

            <span className="rounded-lg bg-[#EAF1FB] px-3 py-2 text-xs font-black text-[#0D4598]">
              {requirements.length} Items
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {requirements.map((requirement, index) => (
              <RequirementCard
                key={requirement.title}
                index={index}
                requirement={requirement}
              />
            ))}
          </div>
        </section>

        {/* Downloadable Files */}
        <section className="mt-4 rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-black text-[#151515]">
                Downloadable Files
              </h2>

              <p className="mt-1 text-sm text-[#7B8190]">
                You will find below the list of your downloadable documents.
              </p>
            </div>

            <span className="rounded-lg bg-[#F1F4F8] px-3 py-2 text-xs font-black text-[#667085]">
              {downloadableFiles.length} Files
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {downloadableFiles.map((file) => (
              <DownloadCard key={file} file={file} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryBox({ label, value }) {
  return (
    <div className="rounded-xl border border-[#E5EAF2] bg-white px-4 py-3 shadow-sm">
      <p className="text-[10px] font-black uppercase tracking-wide text-[#7B8190]">
        {label}
      </p>
      <p className="mt-1 text-lg font-black text-[#0D4598]">{value}</p>
    </div>
  );
}

function RequirementCard({ requirement, index }) {
  return (
    <div className="rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] p-3 transition hover:border-[#0D4598]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-xs font-black text-[#0D4598]">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-black text-[#151515]">
              {requirement.title}
            </h3>

            <ul className="mt-2 space-y-1.5">
              {requirement.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-xs font-medium leading-5 text-[#667085]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0D4598]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#0D4598] px-4 text-xs font-black text-white transition hover:bg-[#083777]"
      >
        <IoCloudUploadOutline size={16} />
        Upload Document
      </button>
    </div>
  );
}

function DownloadCard({ file }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] p-3 transition hover:border-[#0D4598]">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FB] text-[#0D4598]">
          <IoDocumentTextOutline size={20} />
        </div>

        <div className="min-w-0">
          <h3 className="line-clamp-1 text-sm font-black text-[#151515]">
            {file}
          </h3>
          <p className="mt-0.5 text-xs font-medium text-[#7B8190]">
            Click download to get this document.
          </p>
        </div>
      </div>

      <button
        type="button"
        className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-[#DDE6F3] bg-white px-3 text-xs font-black text-[#0D4598] transition hover:bg-[#EAF1FB]"
      >
        <IoDownloadOutline size={16} />
        Download
      </button>
    </div>
  );
}
