import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Appontment",

  description:
    "Learn about PermisGo, our professional driving instructors, teaching approach and commitment to safer driving.",

  path: "/appontment",

  image: "/image/permisgo-og.jp",
});

export default function RootLayout({ children }) {
  return <>{children}</>;
}