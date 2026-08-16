import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/seo";

const locales = ["en", "bn", "fr"];
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://permisgo-backend.vercel.app/api";

async function loadBlog(slug, locale) {
  const response = await fetch(`${apiUrl}/blogs/${encodeURIComponent(slug)}?lang=${locale}`, { next: { revalidate: 300 } });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Unable to load blog.");
  return (await response.json())?.data || null;
}

export async function generateMetadata({ params }) {
  const { locale, blog } = await params;
  if (!locales.includes(locale)) return {};
  const post = await loadBlog(blog, locale);
  if (!post) return { robots: { index: false, follow: false } };
  const languages = Object.fromEntries(locales.map((lang) => [lang, `/${lang}/blogs/${post.slug}`]));
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: languages[locale], languages: { ...languages, "x-default": languages.en } },
    openGraph: { title: post.title, description: post.excerpt, type: "article", url: languages[locale], images: post.coverImage ? [{ url: post.coverImage, alt: post.title }] : undefined },
  };
}

export default async function LocalizedBlogPage({ params }) {
  const { locale, blog } = await params;
  if (!locales.includes(locale)) notFound();
  const post = await loadBlog(blog, locale);
  if (!post) notFound();
  const jsonLd = { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.excerpt, image: post.coverImage, datePublished: post.publishedAt, dateModified: post.updatedAt, inLanguage: locale, mainEntityOfPage: `${siteConfig.url}/${locale}/blogs/${post.slug}` };
  return (
    <article className="mx-auto max-w-5xl px-5 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <p className="text-sm font-bold uppercase tracking-wider text-[#174a9b]">PermisGo Blog</p>
      <h1 className="mt-3 text-3xl font-black text-slate-900 md:text-5xl">{post.title}</h1>
      {post.excerpt && <p className="mt-5 text-lg leading-8 text-slate-600">{post.excerpt}</p>}
      {post.coverImage && <img src={post.coverImage} alt={post.title} className="mt-8 max-h-[520px] w-full rounded-2xl object-cover" />}
      <div className="blog-article mt-8 text-base leading-8 text-slate-700" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
