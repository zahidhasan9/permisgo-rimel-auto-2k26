"use client";

import { useEffect } from "react";

export default function LocalePreferenceSync({ locale }) {
  useEffect(() => {
    localStorage.setItem("permisgo-language", locale);
    document.cookie = `permisgo-language=${locale}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = locale;
    window.dispatchEvent(
      new CustomEvent("permisgo-language-change", { detail: locale }),
    );
  }, [locale]);

  return null;
}
