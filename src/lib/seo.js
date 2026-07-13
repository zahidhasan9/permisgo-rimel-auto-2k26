const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const siteConfig = {
  name: "PermisGo",
  url: siteUrl,

  defaultTitle: "PermisGo | Professional Driving School",

  defaultDescription:
    "Professional driving lessons, qualified instructors and practical driving test preparation with PermisGo.",

  defaultImage: "/image/permisgo-og.jpg",
};

export function createMetadata({
  title = siteConfig.defaultTitle,
  description = siteConfig.defaultDescription,
  path,
  image = siteConfig.defaultImage,
  noIndex = false,
  type = "website",
}) {
  const normalizedPath = path
    ? path.startsWith("/")
      ? path
      : `/${path}`
    : null;

  const metadata = {
    title,
    description,

    openGraph: {
      title,
      description,
      siteName: siteConfig.name,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt:
            typeof title === "string"
              ? title
              : "PermisGo Professional Driving School",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },

    robots: noIndex
      ? {
          index: false,
          follow: false,
          noarchive: true,
          nocache: true,
        }
      : {
          index: true,
          follow: true,
        },
  };

  if (normalizedPath) {
    metadata.alternates = {
      canonical: normalizedPath,
    };

    metadata.openGraph.url = normalizedPath;
  }

  return metadata;
}
