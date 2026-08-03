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

// Add or edit a route here to change its metadata without creating another layout file.
export const routeTitles = {
  "/": "Professional Driving School",
  "/blogs": "Driving School Blog",
  "/reviews": "Student Reviews",
  "/services": "Driving Lessons & Services",
  "/offers": "Driving Licence Offers",
  "/pricing": "Driving Lesson Pricing",
  "/where-are-we": "Where Are We?",
  "/monitor-faqs": "Instructor FAQs",
  "/highway-code-glossary": "Highway Code Glossary",
  "/driving-licence-glossary": "Driving Licence Glossary",
  "/person-with-a-disability": "Driving with a Disability",
  "/frequently-asked-questions": "Frequently Asked Questions",
  "/contact-us": "Contact Us",
  "/who-are-we": "Who Are We?",
  "/about": "About Us",
  "/user-login": "Student Login",
  "/user-registration": "Student Registration",
  "/login": "Admin Login",
  "/login/student": "Student Login",
  "/login/teacher": "Instructor Login",
  "/register/student": "Student Registration",
  "/register/teacher": "Instructor Registration",
};

const segmentLabels = {
  admin: "Admin",
  student: "Student",
  teacher: "Instructor",
  faq: "FAQs",
  faqs: "FAQs",
  cpf: "CPF",
  b2b: "B2B",
  ebooks: "eBooks",
  ebook: "eBook",
  quizzes: "Quizzes",
  "code-learning": "Code Learning",
  "academic-info": "Academic Information",
};

function titleFromSegment(segment) {
  return segment
    .split("-")
    .map(
      (word) =>
        segmentLabels[word] ||
        `${word.charAt(0).toUpperCase()}${word.slice(1)}`,
    )
    .join(" ");
}

export function createRouteMetadata(pathname = "/") {
  const cleanPath = `/${pathname
    .split("?")[0]
    .split("#")[0]
    .split("/")
    .filter(Boolean)
    .join("/")}`;
  const normalizedPath = cleanPath === "/" ? "/" : cleanPath.replace(/\/$/, "");
  const segments = normalizedPath.split("/").filter(Boolean);
  const isPrivate = ["admin", "student", "teacher", "chat"].includes(
    segments[0],
  );
  const isAuth = [
    "/login",
    "/register",
    "/user-login",
    "/user-registration",
    "/inscription",
    "/forget-password",
    "/reset-password",
    "/verify-account",
    "/login-to-my-partner-area",
  ].includes(normalizedPath);

  let title = routeTitles[normalizedPath];

  if (!title) {
    const lastSegment = segments.at(-1);
    const isIdentifier =
      !lastSegment ||
      /^\d+$/.test(lastSegment) ||
      /^[a-f\d]{24}$/i.test(lastSegment) ||
      ["create", "edit"].includes(lastSegment);
    const meaningfulSegment = isIdentifier ? segments.at(-2) : lastSegment;

    title = meaningfulSegment
      ? titleFromSegment(meaningfulSegment)
      : routeTitles["/"];

    if (segments[0] === "blogs" && isIdentifier) {
      title = "Driving School Article";
    }
  }

  const area = segments[0] ? titleFromSegment(segments[0]) : "PermisGo";
  const description = isPrivate
    ? `Manage ${title.toLowerCase()} securely in your PermisGo ${area.toLowerCase()} area.`
    : `${title} from PermisGo — professional driving lessons, qualified instructors and practical support for confident learners.`;

  return createMetadata({
    title,
    description,
    path: normalizedPath,
    noIndex: isPrivate || isAuth,
  });
}
