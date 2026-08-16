"use client";

import { useParams } from "next/navigation";
import { PublicPagesCmsEditor } from "../../public-pages/page";

export default function DesignedPageEditor() {
  const { slug } = useParams();
  return (
    <PublicPagesCmsEditor
      initialSlug={decodeURIComponent(String(slug || ""))}
      focused
      designed
    />
  );
}
