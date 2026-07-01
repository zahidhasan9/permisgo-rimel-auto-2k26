"use client";
import Head from "next/head";

// Components
import Navbar from "../../components/student-auth-navbar";

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
        <Navbar />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
