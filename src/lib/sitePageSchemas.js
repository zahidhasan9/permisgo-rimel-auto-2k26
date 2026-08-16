const field = (key, label, type = "text") => ({ key, label, type });

const supportFields = [
  field("title", "Page heading"),
  field("intro", "Introduction", "textarea"),
  field("body", "Policy / page content", "longtext"),
];
const guideFields = [
  field("heroTitle", "Hero title"),
  field("heroDescription", "Hero description", "textarea"),
  field("sectionTitle", "Main section title"),
  field("sectionDescription", "Main section description", "textarea"),
  field("ctaTitle", "CTA title"),
  field("ctaText", "CTA description", "textarea"),
  field("ctaButton", "CTA button"),
];
const standardFields = [
  field("heroTitle", "Hero title"),
  field("heroDescription", "Hero description", "textarea"),
  field("heroButton", "Hero button"),
  field("sectionTitle", "Main section title"),
  field("sectionDescription", "Main section description", "textarea"),
  field("ctaTitle", "CTA title"),
  field("ctaButton", "CTA button"),
];

const supportSlugs = [
  "monitor-privacy-policy",
  "student-privacy-policy",
  "manage-my-cookies",
  "legal-notice",
  "privacy-policy",
  "general-terms-and-conditions",
  "terms-and-conditions",
  "privacy-and-cookies",
  "refund-policy",
  "disclaimer",
];
const guideSlugs = [
  "where-are-we",
  "monitor-faqs",
  "highway-code-glossary",
  "driving-licence-glossary",
  "person-with-a-disability",
  "driving-instructor-salary",
];

export const sitePageSchemas = Object.fromEntries([
  ...supportSlugs.map((slug) => [
    slug,
    { label: "Policy content", fields: supportFields },
  ]),
  ...guideSlugs.map((slug) => [
    slug,
    { label: "Guide content", fields: guideFields },
  ]),
  [
    "appointment",
    {
      label: "Appointment page",
      fields: [
        field("heroTitle", "Hero title"),
        field("heroDescription", "Hero description", "textarea"),
        field("heroButton", "Hero booking button"),
        field("bookingTitle", "Booking form title"),
        field("whyTitle", "Benefits section title"),
        field("benefit1", "Benefit 1"),
        field("benefit2", "Benefit 2"),
        field("benefit3", "Benefit 3"),
        field("benefit4", "Benefit 4"),
        field("finalTitle", "Final CTA title"),
        field("finalButton", "Final CTA button"),
      ],
    },
  ],
  [
    "pricing",
    {
      label: "Pricing page",
      fields: [
        field("heroTitle", "Hero title"),
        field("heroDescription", "Hero description", "textarea"),
        field("heroButton", "Hero button"),
        field("packagesTitle", "Packages section title"),
        field("trainingTitle", "Training CTA title"),
        field("trainingButton", "Training CTA button"),
        field("cpfTitle", "CPF rates title"),
        field("licenceOffersTitle", "Driving licence offers title"),
        field("supervisedTitle", "Supervised driving title"),
        field("carteTitle", "À la carte title"),
        field("carteDescription", "À la carte description", "textarea"),
      ],
    },
  ],
  [
    "driving-license",
    {
      label: "Driving license page",
      fields: [
        field("heroTitle", "Hero title"),
        field("heroButton", "Hero button"),
        field("packagesTitle", "Packages section title"),
        field("trainingTitle", "First training CTA title"),
        field("trainingButton", "First training CTA button"),
        field("cpfTitle", "CPF section title"),
        field("cpfDescription", "CPF description", "textarea"),
        field("cpfButton", "CPF button"),
        field("accompaniedTitle", "Accompanied section title"),
        field("accompaniedCardTitle", "Accompanied package name"),
        field("accompaniedCardSubtitle", "Accompanied package subtitle"),
        field("accompaniedPrice", "Accompanied sale price"),
        field("accompaniedOldPrice", "Accompanied old price"),
        field("accompaniedButton", "Accompanied signup button"),
        field("accompaniedContentsTitle", "Accompanied contents heading"),
        field(
          "accompaniedFeatures",
          "Accompanied features — one per line",
          "longtext",
        ),
        field("secondTrainingTitle", "Second training CTA title"),
        field("secondTrainingButton", "Second training CTA button"),
        field("carteTitle", "À la carte title"),
        field("carteDescription", "À la carte description", "textarea"),
        field("codePacksTitle", "Highway Code packs title"),
        field("codePacksDescription", "Highway Code packs description"),
        field("certificationTitle", "Certification title"),
        field(
          "certificationDescription",
          "Certification description",
          "textarea",
        ),
        field("servicesLabel", "Services label"),
        field("servicesTitle", "Services section title"),
        field("service1Title", "Service 1 title"),
        field("service1Price", "Service 1 price text"),
        field("service2Title", "Service 2 title"),
        field("service2Price", "Service 2 price text"),
        field("service3Title", "Service 3 title"),
        field("service3Price", "Service 3 price text"),
        field("serviceLearnMore", "Service card button"),
        field("servicesButton", "Services View All button"),
        field("rating1Title", "Rating card 1 title"),
        field("rating2Title", "Rating card 2 title"),
        field("rating3Title", "Rating card 3 title"),
        field("ratingScore", "Rating score text"),
      ],
    },
  ],
  ...[
    "traffic-laws",
    "contact-us",
    "helps",
    "who-are-we",
    "request-for-school-partnership",
    "b2b-partnership-request",
    "becoming-an-independent-instructor",
    "frequently-asked-questions",
  ].map((slug) => [
    slug,
    {
      label: `${slug
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ")} content`,
      fields: standardFields,
    },
  ]),
]);

export const getSitePageSchema = (slug) =>
  sitePageSchemas[slug] || { label: "Page content", fields: standardFields };
