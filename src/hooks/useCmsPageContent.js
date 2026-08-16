"use client";

import { useEffect, useState } from "react";
import { getCmsPage } from "@/features/API";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";

export default function useCmsPageContent(slug) {
  const language = useCurrentLanguage();
  const [page, setPage] = useState(null);

  useEffect(() => {
    if (!slug || !language) return;
    let active = true;
    const selectedRequest = getCmsPage(slug, language);
    const englishRequest = language === "en" ? selectedRequest : getCmsPage(slug, "en");
    Promise.all([selectedRequest, englishRequest])
      .then(([selectedResponse, englishResponse]) => {
        if (!active) return;
        const selectedPage = selectedResponse?.data?.data || null;
        const englishPage = englishResponse?.data?.data || null;
        if (!selectedPage) return setPage(englishPage);
        const selectedTranslation = selectedPage.translation || {};
        const englishTranslation = englishPage?.translation || {};
        setPage({
          ...selectedPage,
          translation: {
            ...englishTranslation,
            ...selectedTranslation,
            settings: {
              ...(englishTranslation.settings || {}),
              ...(selectedTranslation.settings || {}),
            },
          },
        });
      })
      .catch(() => { if (active) setPage(null); });
    return () => { active = false; };
  }, [language, slug]);

  return { page, content: page?.translation || null, language };
}
