import type { Locale } from "@/i18n/routing";
import {
  GITHUB_URL,
  LANGUAGE_TAGS,
  LINKEDIN_URL,
  PROFILE_IMAGE_PATH,
  SITE_ALTERNATE_NAME,
  SITE_NAME,
  SITE_URL,
  buildLocalePath,
  toAbsoluteUrl,
} from "@/lib/seo";

type BreadcrumbItem = {
  name: string;
  pathname: string;
};

type BlogPostingSchemaInput = {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
  image?: string | null;
  datePublished?: Date | null;
  dateModified?: Date | null;
};

export const createBlogPostingSchema = ({
  locale,
  pathname,
  title,
  description,
  image,
  datePublished,
  dateModified,
}: BlogPostingSchemaInput) => {
  const url = toAbsoluteUrl(buildLocalePath(locale, pathname));

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#blog-posting`,
    url,
    headline: title,
    description,
    inLanguage: LANGUAGE_TAGS[locale],
    image: image ? toAbsoluteUrl(image) : toAbsoluteUrl(PROFILE_IMAGE_PATH),
    datePublished: (datePublished ?? dateModified)?.toISOString(),
    dateModified: (dateModified ?? datePublished)?.toISOString(),
    author: {
      "@id": `${SITE_URL}#person`,
    },
    publisher: {
      "@id": `${SITE_URL}#person`,
    },
    isPartOf: {
      "@id": `${SITE_URL}#website`,
    },
  };
};

const SOCIAL_PROFILES = [
  GITHUB_URL,
  LINKEDIN_URL,
  "https://www.instagram.com/vitonovate",
];

export const createPersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}#person`,
  name: SITE_NAME,
  alternateName: SITE_ALTERNATE_NAME,
  url: SITE_URL,
  image: toAbsoluteUrl(PROFILE_IMAGE_PATH),
  jobTitle: "Software and Data Engineer",
  worksFor: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
  knowsAbout: [
    "AI automation",
    "workflow automation",
    "data workflows",
    "self-hosting",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Prisma",
    "Vercel",
    "UX engineering",
    "web performance",
  ],
  sameAs: SOCIAL_PROFILES,
});

export const createWebsiteSchema = (locale: Locale) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: SITE_ALTERNATE_NAME,
  inLanguage: LANGUAGE_TAGS[locale],
});

export const createBreadcrumbSchema = (locale: Locale, items: BreadcrumbItem[]) => {
  const breadcrumbPath = items[items.length - 1]?.pathname ?? "/";
  const breadcrumbId = `${toAbsoluteUrl(buildLocalePath(locale, breadcrumbPath))}#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(buildLocalePath(locale, item.pathname)),
    })),
  };
};

type WebPageSchemaInput = {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
  includePerson?: boolean;
};

export const createWebPageSchema = ({
  locale,
  pathname,
  title,
  description,
  includePerson = false,
}: WebPageSchemaInput) => {
  const url = toAbsoluteUrl(buildLocalePath(locale, pathname));

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: LANGUAGE_TAGS[locale],
    isPartOf: {
      "@id": `${SITE_URL}#website`,
    },
    ...(includePerson
      ? {
          about: {
            "@id": `${SITE_URL}#person`,
          },
        }
      : {}),
  };
};

type ItemListItem = {
  name: string;
  pathname: string;
  description?: string | null;
};

export const createItemListSchema = (
  locale: Locale,
  pathname: string,
  name: string,
  items: ItemListItem[],
) => {
  const url = toAbsoluteUrl(buildLocalePath(locale, pathname));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}#item-list`,
    name,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: toAbsoluteUrl(buildLocalePath(locale, item.pathname)),
      name: item.name,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
};

type CreativeWorkSchemaInput = {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
  image?: string | null;
  keywords?: string[];
  url?: string | null;
  codeRepository?: string | null;
};

export const createProjectCreativeWorkSchema = ({
  locale,
  pathname,
  title,
  description,
  image,
  keywords = [],
  url,
  codeRepository,
}: CreativeWorkSchemaInput) => {
  const pageUrl = toAbsoluteUrl(buildLocalePath(locale, pathname));

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${pageUrl}#project`,
    name: title,
    headline: title,
    description,
    inLanguage: LANGUAGE_TAGS[locale],
    url: pageUrl,
    ...(image ? { image: toAbsoluteUrl(image) } : {}),
    ...(keywords.length > 0 ? { keywords } : {}),
    ...(url ? { workExample: url } : {}),
    ...(codeRepository ? { codeRepository } : {}),
    creator: {
      "@id": `${SITE_URL}#person`,
    },
    isPartOf: {
      "@id": `${SITE_URL}#website`,
    },
  };
};
