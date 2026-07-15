import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Documents",

  description:
    "Learn about PermisGo, our professional driving instructors, teaching approach and commitment to safer driving.",

  path: "/teacher/documents",

  image: "/image/permisgo-og.jp",
});

export default function Layout({ children }) {
  return children;
}
