import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { siteConfig } from "@/lib/seo";
import HomePage from "../../page";
import LocalePreferenceSync from "@/components/LocalePreferenceSync";
import { legacyPublicPages } from "@/lib/legacyPublicPages";
import { createRouteMetadata } from "@/lib/seo";

const locales = ["en", "bn", "fr"];
const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://permisgo-backend.vercel.app/api";
const homeMetadata = {
  en: {
    title: "PermisGo | Professional Driving School",
    description:
      "Professional driving lessons, qualified instructors and practical driving test preparation with PermisGo.",
  },
  bn: {
    title: "PermisGo | পেশাদার ড্রাইভিং স্কুল",
    description:
      "PermisGo-এর পেশাদার ড্রাইভিং প্রশিক্ষণ, যোগ্য প্রশিক্ষক এবং ড্রাইভিং পরীক্ষার প্রস্তুতি।",
  },
  fr: {
    title: "PermisGo | Auto-école professionnelle",
    description:
      "Cours de conduite, moniteurs qualifiés et préparation pratique à l’examen avec PermisGo.",
  },
};

async function loadPage(slug, locale) {
  try {
    const response = await fetch(
      `${apiUrl}/cms-pages/${encodeURIComponent(slug)}?lang=${locale}`,
      {
        cache: "no-store",
      },
    );
    if (!response.ok) return null;
    return (await response.json())?.data || null;
  } catch {
    return null;
  }
}

async function resolveRoute(rawParams) {
  const { locale: firstSegment, slug: segments = [] } = await rawParams;
  if (locales.includes(firstSegment)) {
    return {
      locale: firstSegment,
      slug: segments.join("/") || "home",
      prefixed: true,
    };
  }
  const cookieStore = await cookies();
  const savedLanguage = cookieStore.get("permisgo-language")?.value;
  return {
    locale: locales.includes(savedLanguage) ? savedLanguage : "en",
    slug: [firstSegment, ...segments].filter(Boolean).join("/") || "home",
    prefixed: false,
  };
}

export async function generateMetadata({ params }) {
  const { locale, slug, prefixed } = await resolveRoute(params);
  const page = await loadPage(slug, locale);
  if (!page && slug === "home") {
    const content = homeMetadata[locale];
    const languages = Object.fromEntries(
      locales.map((lang) => [lang, `/${lang}`]),
    );
    return {
      title: content.title,
      description: content.description,
      alternates: {
        canonical: `/${locale}`,
        languages: { ...languages, "x-default": languages.en },
      },
      robots: { index: true, follow: true },
    };
  }
  if (!page && legacyPublicPages[slug]) {
    const fallback = createRouteMetadata(`/${slug}`);
    return {
      ...fallback,
      alternates: { canonical: `/${locale}/${slug}` },
      robots: { index: false, follow: true },
    };
  }
  if (!page) return { robots: { index: false, follow: false } };
  const content = page.translation || {};
  const path = prefixed
    ? `/${locale}${slug === "home" ? "" : `/${slug}`}`
    : `/${slug}`;
  const languages = Object.fromEntries(
    locales.map((lang) => [
      lang,
      `/${lang}${slug === "home" ? "" : `/${slug}`}`,
    ]),
  );
  return {
    title: content.seoTitle || content.title,
    description: content.seoDescription || content.excerpt,
    keywords: content.keywords,
    alternates: {
      canonical: path,
      languages: { ...languages, "x-default": languages.en },
    },
    robots: page.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: content.seoTitle || content.title,
      description: content.seoDescription || content.excerpt,
      url: path,
      siteName: siteConfig.name,
      locale,
      images: page.ogImage
        ? [{ url: page.ogImage, alt: content.imageAlt || content.title }]
        : undefined,
    },
  };
}

export default async function LocalizedCmsPage({ params }) {
  const { locale, slug, prefixed } = await resolveRoute(params);
  const page = await loadPage(slug, locale);
  // Preserve every existing page's purpose-built layout and data. CMS data
  // supplies localized SEO metadata without replacing the live component.
  if (legacyPublicPages[slug]) {
    const module = await legacyPublicPages[slug]();
    const LegacyPage = module.default;
    return (
      <>
        <LocalePreferenceSync locale={locale} />
        <LegacyPage />
      </>
    );
  }
  if (!page && slug === "home") {
    return (
      <>
        <LocalePreferenceSync locale={locale} />
        <HomePage />
      </>
    );
  }
  if (!page) notFound();
  const content = page.translation || {};
  const paragraphs = String(content.content || "")
    .split(/\n\s*\n/)
    .filter(Boolean);
  const template = page.pageTemplate || "modern";
  const accentColor = page.accentColor || "#123f88";
  const centered = page.contentAlignment === "center";
  const minimal = template === "minimal";
  const basePath = slug === "home" ? "" : `/${slug}`;
  const publicUrl = prefixed
    ? `${siteConfig.url}/${locale}${basePath}`
    : `${siteConfig.url}${basePath}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: content.title,
    description: content.seoDescription || content.excerpt,
    inLanguage: locale,
    url: publicUrl,
  };

  return (
    <article
      className={`min-h-[70vh] bg-white ${centered ? "text-center" : ""}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <header
        className={`relative overflow-hidden px-5 ${template === "modern" ? "py-20 md:py-28" : "py-14 md:py-18"} ${minimal ? "border-b bg-white text-slate-900" : "text-white"}`}
        style={
          minimal
            ? undefined
            : {
                background:
                  template === "modern"
                    ? `linear-gradient(135deg, ${accentColor}, ${accentColor}dd 55%, #0b1f46)`
                    : accentColor,
              }
        }
      >
        {template === "modern" && (
          <>
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          </>
        )}
        <div
          className={`relative mx-auto max-w-5xl ${centered ? "flex flex-col items-center" : ""}`}
        >
          {content.settings?.badge && (
            <span
              className={`mb-5 inline-flex rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] ${minimal ? "bg-slate-100" : "bg-white/15 text-white"}`}
            >
              {content.settings.badge}
            </span>
          )}
          <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            {content.title}
          </h1>
          {content.excerpt && (
            <p
              className={`mt-6 max-w-3xl text-base leading-8 md:text-lg ${minimal ? "text-slate-600" : "text-white/85"}`}
            >
              {content.excerpt}
            </p>
          )}
          {content.settings?.ctaLabel && page.ctaUrl && (
            <Link
              href={page.ctaUrl}
              className={`mt-8 inline-flex rounded-xl px-6 py-3 text-sm font-black shadow-lg transition hover:-translate-y-0.5 ${minimal ? "text-white" : "bg-white text-slate-900"}`}
              style={minimal ? { backgroundColor: accentColor } : undefined}
            >
              {content.settings.ctaLabel}
            </Link>
          )}
        </div>
      </header>
      <div
        className={`mx-auto max-w-5xl px-5 py-14 md:py-20 ${centered ? "flex flex-col items-center" : ""}`}
      >
        {page.ogImage && (
          <img
            src={page.ogImage}
            alt={content.imageAlt || content.title}
            className="mb-12 max-h-[540px] w-full rounded-3xl object-cover shadow-xl"
          />
        )}
        <div
          className={`space-y-6 text-base leading-8 text-slate-700 md:text-lg ${centered ? "max-w-3xl" : ""}`}
        >
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
