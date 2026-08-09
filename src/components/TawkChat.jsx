"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";

const isDashboard = (pathname) =>
  ["/admin", "/student", "/teacher"].some(
    (root) => pathname === root || pathname?.startsWith(`${root}/`),
  );

export default function TawkChat() {
  const pathname = usePathname() || "/";
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const hiddenOnLoad = window.sessionStorage.getItem("permisgo_tawk_hidden") === "1";
    setHidden(hiddenOnLoad);
    if (!loaded) return;
    if (hiddenOnLoad) {
      window.Tawk_API?.hideWidget?.();
      return;
    }
    window.Tawk_API?.showWidget?.();
  }, [loaded, pathname]);

  const hideWidget = () => {
    window.sessionStorage.setItem("permisgo_tawk_hidden", "1");
    setHidden(true);
    window.Tawk_API?.hideWidget?.();
  };

  if (isDashboard(pathname)) return null;

  return (
    <>
      {!hidden && (
        <button
          type="button"
          onClick={hideWidget}
          aria-label="Hide chat widget"
          className="fixed bottom-[178px] right-3 z-[99998] flex h-9 w-9 items-center justify-center rounded-full bg-[#174a9b] text-white shadow-lg transition hover:bg-[#123c82] sm:right-4"
        >
          <IoClose className="text-lg" />
        </button>
      )}
      <Script id="permisgo-tawk-chat" strategy="afterInteractive">
        {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      Tawk_API.customStyle={visibility:{desktop:{position:"br",xOffset:20,yOffset:95},mobile:{position:"br",xOffset:16,yOffset:205}}};
      (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src="https://embed.tawk.to/6a771b15c010c21d4b631f9e/1jvgk3jf1";
        s1.charset="UTF-8";
        s1.setAttribute("crossorigin","*");
        s0.parentNode.insertBefore(s1,s0);
      })();`}
      </Script>
    </>
  );
}
