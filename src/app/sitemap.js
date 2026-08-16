import { siteConfig } from "@/lib/seo";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://permisgo-backend.vercel.app/api";
const locales = ["en", "bn", "fr"];

export default async function sitemap() {
  try {
    const response = await fetch(`${apiUrl}/cms-pages/sitemap`, { next: { revalidate: 3600 } });
    const pages = response.ok ? (await response.json())?.data || [] : [];
    const cmsEntries = pages.flatMap((page) => {
      const suffix = page.slug === "home" ? "" : `/${page.slug}`;
      const languages = Object.fromEntries(locales.map((locale) => [locale, `${siteConfig.url}/${locale}${suffix}`]));
      return locales.map((locale) => ({
        url: languages[locale],
        lastModified: page.updatedAt,
        changeFrequency: "weekly",
        priority: page.slug === "home" ? 1 : 0.7,
        alternates: { languages: { ...languages, "x-default": languages.en } },
      }));
    });
    const blogResponse = await fetch(`${apiUrl}/blogs?limit=100`, { next: { revalidate: 3600 } });
    const blogs = blogResponse.ok ? (await blogResponse.json())?.data || [] : [];
    const blogEntries = blogs.flatMap((blog) => {
      const languages = Object.fromEntries(locales.map((locale) => [locale, `${siteConfig.url}/${locale}/blogs/${blog.slug}`]));
      return locales.map((locale) => ({ url: languages[locale], lastModified: blog.updatedAt, changeFrequency: "monthly", priority: 0.6, alternates: { languages: { ...languages, "x-default": languages.en } } }));
    });
    return [...cmsEntries, ...blogEntries];
  } catch {
    return [];
  }
}
