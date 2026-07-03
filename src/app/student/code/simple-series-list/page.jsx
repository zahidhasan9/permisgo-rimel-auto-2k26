import { IoChevronBack } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

const seriesList = Array.from({ length: 18 }, (_, index) => ({
  link: `/student/code/code-challenge`,
  title: `Series ${String(index + 1).padStart(2, "0")}`,
  progress: "54%",
}));

function SeriesCard({ title, progress, link }) {
  return (
    <Link href={link}>
      <div className="flex h-[82px] items-center justify-between rounded-[9px] bg-[#E8EEF7] px-[24px]">
        <div className="w-full pr-[18px]">
          <h3 className="mb-[10px] text-[15px] font-bold text-[#111318]">
            {title}
          </h3>

          <div className="h-[12px] w-full max-w-[230px] rounded-full bg-[#DCE5F2]">
            <div
              className="h-full rounded-full bg-[#154A9C]"
              style={{ width: progress }}
            />
          </div>
        </div>

        <button
          type="button"
          className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#E7233D] text-white"
        >
          <FaArrowRight className="text-[18px]" />
        </button>
      </div>
    </Link>
  );
}

export default function SimpleSeriesList() {
  return (
    <main className="min-h-screen bg-white px-[24px] py-[24px]">
      <div className="mx-auto max-w-[1084px]">
        <header className="mb-[30px] flex items-center gap-[16px]">
          <button
            type="button"
            className="flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-[#E8EEF7] text-black"
          >
            <IoChevronBack className="text-[25px]" />
          </button>

          <h1 className="text-[23px] font-bold leading-none text-[#0D4598]">
            Simple Series List
          </h1>
        </header>

        <section className="grid grid-cols-1 gap-x-[18px] gap-y-[18px] md:grid-cols-2 xl:grid-cols-3">
          {seriesList.map((item) => (
            <SeriesCard
              key={item.title}
              title={item.title}
              progress={item.progress}
              link={item.link}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
