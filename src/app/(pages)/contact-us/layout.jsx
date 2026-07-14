import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact Us",

  description:
    "Contact PermisGo for driving lesson bookings, course information and professional driving support.",

  path: "/contact-us",
});

export default function ContactLayout({ children }) {
  return children;
}
