"use client";
import Head from "next/head";

// Components
import Navbar from "../../components/student-auth-navbar";
import PublicOnlyRoute from "@/components/auth/PublicOnlyRoute";
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Head>
        <title>Home | One of the best Driving School</title>
        <meta name="description" content="Driving School" />
      </Head>
      <body suppressHydrationWarning={true}>
        <Navbar />
        <PublicOnlyRoute>{children}</PublicOnlyRoute>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
