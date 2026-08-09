"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const isDashboard = (pathname) =>
  ["/admin", "/student", "/teacher"].some(
    (root) => pathname === root || pathname?.startsWith(`${root}/`),
  );

export default function TawkChat() {
  const pathname = usePathname() || "/";
  if (isDashboard(pathname)) return null;

  return (
    <Script id="permisgo-tawk-chat" strategy="afterInteractive">
      {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      Tawk_API.customStyle={visibility:{desktop:{position:"br",xOffset:20,yOffset:95},mobile:{position:"br",xOffset:16,yOffset:155}}};
      (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src="https://embed.tawk.to/6a771b15c010c21d4b631f9e/1jvgk3jf1";
        s1.charset="UTF-8";
        s1.setAttribute("crossorigin","*");
        s0.parentNode.insertBefore(s1,s0);
      })();`}
    </Script>
  );
}
