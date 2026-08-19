"use client";

import { usePathname } from "next/navigation";
import useCmsPageContent from "@/hooks/useCmsPageContent";
import { CmsRichText } from "@/components/cms/CmsContent";

const Support = ({ title, headPara, mainContent }) => {
  const pathname = usePathname();
  const slug = pathname
    .split("/")
    .filter(Boolean)
    .filter((part) => !["en", "bn", "fr"].includes(part))
    .join("/");
  const { page, content } = useCmsPageContent(slug);
  // Seeded records intentionally do not replace the original page. Once an
  // admin saves the record, updatedBy is set and CMS content becomes live.
  const settings = content?.settings || {};
  const displayTitle = settings.title || title;
  const displayHeadPara = settings.intro || headPara;
  const displayContent = settings.body || mainContent;
  return (
    <>
      {/* Header Section */}
      <section className="bg-blue-950 px-4 py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {displayTitle}
            </h1>

            <CmsRichText
              as="div"
              html={displayHeadPara}
              className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-white/80 sm:text-base"
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white px-4 py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-6xl">
          <CmsRichText
            as="article"
            html={displayContent}
            className="rounded-2xl border border-slate-100 bg-white p-5 text-sm font-medium leading-7 text-slate-700 shadow-sm sm:p-6 sm:text-base"
          />
        </div>
      </section>
    </>
  );
};

export default Support;
