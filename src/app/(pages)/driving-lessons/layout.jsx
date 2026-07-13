// src/app/(pages)/driving-lessons/layout.jsx

import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Professional Driving Lessons",

  description:
    "Book professional driving lessons with qualified PermisGo instructors and prepare confidently for your driving test.",

  path: "/driving-lessons",
});

export default function DrivingLessonsLayout({ children }) {
  return children;
}
