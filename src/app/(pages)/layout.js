// "use client";
// import Head from "next/head";

// // Components
// import Footer from "@/components/footer";
// import Navbar from "@/components/navbar";

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" suppressHydrationWarning={true}>
//       <Head>
//         <title>Home | One of the best Driving School</title>
//         <meta name="description" content="Driving School" />
//       </Head>
//       <body suppressHydrationWarning={true}>
//         <Navbar />
//         {children}
//         <Footer />
//       </body>
//     </html>
//   );
// }

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PublicPagesLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
