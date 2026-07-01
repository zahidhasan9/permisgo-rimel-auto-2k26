"use client";

import { IoCall, IoChevronBack } from "react-icons/io5";
import { RiMessage2Fill } from "react-icons/ri";

function BackHeader() {
  return (
    <header className="flex items-center gap-[16px]">
      <button className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[12px] bg-[#EEF4FB] text-[27px] text-black">
        <IoChevronBack />
      </button>

      <h1 className="text-[26px] font-[700] leading-none text-[#174A9B]">
        Help and Support
      </h1>
    </header>
  );
}

function SupportCard({ type, title, primaryText, secondaryText }) {
  return (
    <div className="flex h-[298px] flex-col items-center rounded-[10px] bg-[#E8EEF8] pt-[40px]">
      {type === "message" ? (
        <RiMessage2Fill className="text-[68px] leading-none text-[#174A9B]" />
      ) : (
        <div className="flex h-[59px] w-[59px] items-center justify-center rounded-[15px] bg-[#174A9B]">
          <IoCall className="text-[34px] text-white" />
        </div>
      )}

      <h2 className="mt-[25px] max-w-[420px] text-center text-[22px] font-[700] leading-[30px] text-[#282828]">
        {title}
      </h2>

      <div className="mt-[34px] flex items-center gap-[12px]">
        <button className="h-[40px] w-[101px] rounded-[7px] bg-[#E5273D] text-[12px] font-[700] text-white">
          {primaryText}
        </button>

        <button className="h-[40px] w-[101px] rounded-[7px] border border-[#E5273D] bg-transparent text-[12px] font-[700] text-[#174A9B]">
          {secondaryText}
        </button>
      </div>
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
          overflow-x: hidden;
        }
      `}</style>

      <main className="min-h-screen bg-white">
        <div className="mx-auto w-full max-w-[1132px] px-[24px] pt-[24px]">
          <BackHeader />

          <section className="mt-[32px] grid grid-cols-1 gap-[24px] md:grid-cols-2">
            <SupportCard
              type="message"
              title="Would you like to send a message to an advisor?"
              primaryText="Message"
              secondaryText="Not Now"
            />

            <SupportCard
              type="call"
              title="Would you like to be called back by an advisor?"
              primaryText="Yes"
              secondaryText="Not Now"
            />
          </section>
        </div>
      </main>
    </>
  );
}
