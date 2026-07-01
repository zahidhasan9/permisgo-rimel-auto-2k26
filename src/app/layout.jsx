"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Script from "next/script";
import "../globals.css";

// export const metadata = {
//   title: "Home | One of the best Driving School",
//   description: "Driving School",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Head>
        <title>Home | One of the best Driving School</title>
        <meta name="description" content="Driving School" />
      </Head>
      <body suppressHydrationWarning={true}>
        {children}

        <Script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
          integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
          crossorigin="anonymous"
        ></Script>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.min.js"
          integrity="sha384-RuyvpeZCxMJCqVUGFI0Do1mQrods/hhxYlcVfGPOfQtPJh0JCw12tUAZ/Mv10S7D"
          crossorigin="anonymous"
        ></Script>
      </body>
    </html>
  );
}
