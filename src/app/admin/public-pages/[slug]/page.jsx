"use client";

import { useParams } from "next/navigation";
import { PublicPagesCmsEditor } from "../page";
import { priorityCmsRouteSet } from "@/lib/priorityCmsRoutes";

export default function DedicatedPublicPageEditor() {
  const { slug } = useParams();
  const pageSlug = decodeURIComponent(String(slug || ""));
  return <PublicPagesCmsEditor initialSlug={pageSlug} focused designed={priorityCmsRouteSet.has(pageSlug)} />;
}
