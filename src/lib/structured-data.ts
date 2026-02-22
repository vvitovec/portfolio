import type { Locale } from "@/i18n/routing";
import {
  LANGUAGE_TAGS,
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

const SOCIAL_PROFILES = [
  "https://github.com/vvitovec",
  "https://www.instagram.com/vitonovate",
];

export const createPersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}#person`,
  name: SITE_NAME,
  alternateName: SITE_ALTERNATE_NAME,
  url: SITE_URL,
  image: toAbsoluteUrl("/images/ViktorVitovec.jpeg"),
  jobTitle: "IT / Web developer",
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
