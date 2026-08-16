import { siteConfig } from "@/lib/seo";

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin/", "/student/", "/teacher/", "/chat/"] },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
