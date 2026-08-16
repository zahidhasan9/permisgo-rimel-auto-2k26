"use client";

import { FaWhatsapp } from "react-icons/fa";
import useSiteSettings from "@/hooks/useSiteSettings";

export default function FloatingWhatsApp() {
  const settings = useSiteSettings();
  const whatsappUrl =
    settings.whatsappUrl ||
    `https://wa.me/${String(settings.whatsappNumber).replace(/\D/g, "")}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with PermisGo on WhatsApp"
      className="fixed bottom-6 right-5 z-[998] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[29px] text-white shadow-[0_10px_30px_rgba(0,0,0,0.24)] transition hover:-translate-y-1 hover:scale-105 hover:bg-[#1fbd5a] max-[500px]:bottom-[118px]"
    >
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
}
