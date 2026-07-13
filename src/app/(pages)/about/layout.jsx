import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Us",

  description:
    "Learn about PermisGo, our professional driving instructors, teaching approach and commitment to safer driving.",

  path: "/about",

  image: "/image/permisgo-og.jp",
});

export default function AboutLayout({ children }) {
  return children;
}
