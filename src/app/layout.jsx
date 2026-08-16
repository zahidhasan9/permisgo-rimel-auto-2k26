import "../globals.css";

import ReduxProvider from "@/provider/provider";
import AppToast from "@/components/common/AppToast";
import AppShell from "@/components/layout/AppShell";
import TawkChat from "@/components/TawkChat";
import { headers } from "next/headers";

import { createMetadata, createRouteMetadata, siteConfig } from "@/lib/seo";

const globalMetadata = createMetadata({
  title: "PermisGo | Professional Driving School",

  description:
    "Learn to drive confidently with PermisGo. Explore professional driving lessons, qualified instructors and driving test preparation.",

  image: "/image/permisgo-og.jpg",

  // Global metadata-তে path দেবেন না
});

const legacyMetadata = {
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

export async function generateMetadata() {
  const headerStore = await headers();
  const pathname = headerStore.get("x-permisgo-pathname") || "/";
  const routeMetadata = createRouteMetadata(pathname);

  return {
    metadataBase: new URL(siteConfig.url),
    ...routeMetadata,
    title: {
      default: routeMetadata.title,
      template: "%s | PermisGo",
    },
    applicationName: "PermisGo",
    authors: [{ name: "PermisGo" }],
    creator: "PermisGo",
    publisher: "PermisGo",
    openGraph: {
      ...routeMetadata.openGraph,
      locale: "en_GB",
    },
    icons: {
      icon: "/image/favicon.png",
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D4598",
};

export default async function RootLayout({ children }) {
  const headerStore = await headers();
  const language = headerStore.get("x-permisgo-locale") || "en";
  return (
    <html lang={language} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ReduxProvider>
          <AppShell>{children}</AppShell>
        </ReduxProvider>
        <TawkChat />

        <AppToast />
      </body>
    </html>
  );
}
