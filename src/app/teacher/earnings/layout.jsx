import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Earnings",

  description:
    "Learn about PermisGo, our professional driving instructors, teaching approach and commitment to safer driving.",

  path: "/teacher/earnings",

  image: "/image/permisgo-og.jp",
});

export default function Layout({ children }) {
  return children;
}
