"use client";

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
  "DOWNLOAD THE FONT OF THE PERMIT *",
  "DOWNLOAD THE BACK OF THE PERMIT *",
];

function RequirementCard({ title, items }) {
  return (
    <section className="flex min-h-[126px] items-start justify-between gap-5 rounded-[12px] bg-[#E8EEF8] px-[24px] py-[25px] sm:px-[28px]">
      <div className="min-w-0">
        <h2 className="text-[15px] font-[700] leading-none text-[#174A9B]">
          {title}
        </h2>

        <ul className="mt-[17px] space-y-[13px] pl-[12px]">
          {items.map((item) => (
            <li
              key={item}
              className="text-[15.5px] font-[500] leading-[18px] text-[#101010] before:mr-[10px] before:content-['•']"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <button className="mt-[1px] h-[31px] shrink-0 rounded-[8px] bg-[#DF263C] px-[13px] text-[11.5px] font-[700] text-white">
        Upload Document
      </button>
    </section>
  );
}

function DownloadCard({ title }) {
  return (
    <div className="flex min-h-[134px] flex-col items-center justify-center rounded-[12px] bg-white px-5 py-6">
      <h3 className="text-center text-[15px] font-[700] leading-[20px] text-[#174A9B]">
        {title}
      </h3>

      <button className="mt-[18px] h-[45px] w-[112px] rounded-[10px] border-[2px] border-[#DF263C] bg-white text-[14px] font-[700] text-[#111111]">
        Download
      </button>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          background: #ffffff;
          font-family: "Poppins", sans-serif;
        }
      `}</style>

      <main className="min-h-screen bg-white">
        <div className="mx-auto w-full max-w-[1080px] px-[22px] pb-[22px] pt-[24px]">
          <header className="mb-[34px] flex items-start gap-[16px]">
            <button className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[12px] bg-[#EEF4FB] text-[25px] text-[#111827]">
              <IoChevronBack />
            </button>

            <div>
              <h1 className="text-[25px] font-[700] leading-[29px] text-[#174A9B]">
                Profile
              </h1>

              <p className="mt-[12px] text-[13.5px] font-[500] leading-none text-[#6F737B]">
                Update your information to ensure accurate lesson scheduling and
                communication.
              </p>
            </div>
          </header>

          <div className="space-y-[19px]">
            {requirements.map((item) => (
              <RequirementCard
                key={item.title}
                title={item.title}
                items={item.items}
              />
            ))}
          </div>

          <section className="mt-[24px] rounded-[12px] bg-[#E8EEF8] px-[24px] py-[25px] sm:px-[28px]">
            <h2 className="text-[22px] font-[700] leading-none text-[#174A9B]">
              Downloadable Files
            </h2>

            <p className="mt-[24px] text-[13.5px] font-[500] leading-none text-[#6F737B]">
              You will find below the list of your downloadable documents
            </p>

            <div className="mt-[27px] grid grid-cols-1 gap-[18px] md:grid-cols-2">
              {downloadableFiles.map((file) => (
                <DownloadCard key={file} title={file} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
