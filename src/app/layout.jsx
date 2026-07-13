// import "../globals.css";

// import ReduxProvider from "@/provider/provider";
// import AppToast from "@/components/common/AppToast";

// const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// export const metadata = {
//   metadataBase: new URL(siteUrl),

//   title: {
//     default: "PermisGo | Professional Driving School",
//     template: "%s | PermisGo",
//   },

//   description:
//     "Learn to drive confidently with PermisGo. Explore professional driving lessons, qualified instructors and driving test preparation.",

//   applicationName: "PermisGo",

//   authors: [
//     {
//       name: "PermisGo",
//     },
//   ],

//   creator: "PermisGo",
//   publisher: "PermisGo",

//   openGraph: {
//     type: "website",
//     locale: "en_GB",
//     siteName: "PermisGo",
//     title: "PermisGo | Professional Driving School",
//     description:
//       "Professional driving lessons, qualified instructors and practical driving test preparation.",
//     images: [
//       {
//         url: "../favicon.ico",
//         width: 1200,
//         height: 630,
//         alt: "PermisGo Professional Driving School",
//       },
//     ],
//   },

//   twitter: {
//     card: "summary_large_image",
//     title: "PermisGo | Professional Driving School",
//     description:
//       "Professional driving lessons, qualified instructors and practical driving test preparation.",
//     images: ["/images/permisgo-og.jpg"],
//   },

//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//       "max-video-preview": -1,
//     },
//   },

//   icons: {
//     icon: "/favicon.ico",
//   },
// };

// export const viewport = {
//   width: "device-width",
//   initialScale: 1,
//   themeColor: "#0D4598",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body suppressHydrationWarning>
//         <ReduxProvider>{children}</ReduxProvider>
//         <AppToast />
//       </body>
//     </html>
//   );
// }

import "../globals.css";

import ReduxProvider from "@/provider/provider";
import AppToast from "@/components/common/AppToast";

import { createMetadata, siteConfig } from "@/lib/seo";

const globalMetadata = createMetadata({
  title: "PermisGo | Professional Driving School",

  description:
    "Learn to drive confidently with PermisGo. Explore professional driving lessons, qualified instructors and driving test preparation.",

  image: "/image/permisgo-og.jpg",

  // Global metadata-তে path দেবেন না
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),

  ...globalMetadata,

  title: {
    default: "PermisGo | Professional Driving School",
    template: "%s | PermisGo",
  },

  applicationName: "PermisGo",

  authors: [
    {
      name: "PermisGo",
    },
  ],

  creator: "PermisGo",
  publisher: "PermisGo",

  openGraph: {
    ...globalMetadata.openGraph,
    locale: "en_GB",
  },

  icons: {
    icon: "/image/favicon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D4598",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ReduxProvider>{children}</ReduxProvider>

        <AppToast />
      </body>
    </html>
  );
}
