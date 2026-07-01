"use client";

import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";

const tips = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  tag: "Tips 01",
  title: "Practice Mock Tests",
  desc: "Take practice theory tests to understand the exam format and identify areas where you need improvement.",
}));

const Page = () => {
  return (
    <main className="min-h-screen  px-5 py-5">
      {/* Header */}
      <header className="flex items-center gap-3">
        <Link
          href="#"
          className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#e7ebf2]"
        >
          <IoChevronBack className="text-[20px]" />
        </Link>

        <h1 className="text-[20px] font-bold text-[#0b3aa6]">
          Pass the exam Faster
        </h1>
      </header>

      {/* Content wrapper */}
      <section className="mx-auto mt-6 w-full max-w-[1100px] rounded-[14px] bg-[#e8edf6] p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          {tips.map((item) => (
            <div
              key={item.id}
              className="rounded-[12px] bg-white p-4 transition hover:shadow-md"
            >
              <p className="text-[13px] font-semibold text-green-500">
                {item.tag}
              </p>

              <h3 className="mt-1 text-[17px] font-bold text-[#123c9a]">
                {item.title}
              </h3>

              <p className="mt-2 text-[13px] leading-[1.5] text-[#444]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Page;
