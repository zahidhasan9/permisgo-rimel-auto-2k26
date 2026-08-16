"use client";

import { useParams } from "next/navigation";
import { PublicPagesCmsEditor } from "../../public-pages/page";

export default function CustomPageEditor() {
  const { slug } = useParams();
  const value = decodeURIComponent(String(slug || ""));
  return <PublicPagesCmsEditor initialSlug={value === "new" ? "" : value} focused custom />;
}
