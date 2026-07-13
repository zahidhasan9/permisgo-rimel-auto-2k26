// src/app/(pages)/pricing/layout.jsx

import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Driving Lesson Prices",

  description:
    "Explore PermisGo driving lesson prices, flexible packages and professional training options.",

  path: "/pricing",
});

export default function PricingLayout({ children }) {
  return children;
}
