"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { getPublicContactConfig } from "@/features/API";

export default function FloatingWhatsApp() {
  const [number, setNumber] = useState("");

  useEffect(() => {
    getPublicContactConfig()
      .then((response) => setNumber(String(response.data?.data?.whatsappNumber || "").replace(/\D/g, "")))
      .catch(() => setNumber(""));
  }, []);

  if (!number) return null;

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with PermisGo on WhatsApp"
      className="fixed bottom-6 right-5 z-[998] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[29px] text-white shadow-[0_10px_30px_rgba(0,0,0,0.24)] transition hover:-translate-y-1 hover:scale-105 hover:bg-[#1fbd5a] max-[500px]:bottom-[82px]"
    >
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
}
