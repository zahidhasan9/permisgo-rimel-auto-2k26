"use client";

import { useEffect, useState } from "react";

export default function useCurrentLanguage() {
  const [language, setLanguage] = useState(null);
  useEffect(() => {
    setLanguage(localStorage.getItem("permisgo-language") || "en");
    const change = (event) => setLanguage(event.detail || "en");
    window.addEventListener("permisgo-language-change", change);
    return () => window.removeEventListener("permisgo-language-change", change);
  }, []);
  return language;
}
