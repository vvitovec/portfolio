import type { Metadata } from "next";

import type { Locale } from "@/i18n/routing";

export const SITE_URL = "https://vitovec.com";
export const SITE_NAME = "Viktor Vítovec";
export const SITE_ALTERNATE_NAME = "Viktor Vitovec";
export const DEFAULT_OG_IMAGE_PATH = "/images/ViktorVitovec.jpeg";

export const LANGUAGE_TAGS: Record<Locale, string> = {
  cs: "cs-CZ",
  en: "en-US",
};

export const OG_LOCALES: Record<Locale, string> = {
  cs: "cs_CZ",
  en: "en_US",
};

const normalizePathname = (pathname: string): string => {
  if (!pathname || pathname === "/") {
    return "/";
  }

  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash.slice(0, -1)
    : withLeadingSlash;
};

export const buildLocalePath = (locale: Locale, pathname = "/"): string => {
  const normalizedPathname = normalizePathname(pathname);
  return normalizedPathname === "/" ? `/${locale}` : `/${locale}${normalizedPathname}`;
};

export const toAbsoluteUrl = (pathname: string): string =>
  new URL(normalizePathname(pathname), SITE_URL).toString();

export const buildLocaleAlternates = (
  pathname = "/",
): NonNullable<Metadata["alternates"]>["languages"] => ({
  [LANGUAGE_TAGS.cs]: buildLocalePath("cs", pathname),
  [LANGUAGE_TAGS.en]: buildLocalePath("en", pathname),
  "x-default": buildLocalePath("cs", pathname),
});

type BuildPageMetadataInput = {
  locale: Locale;
  pathname?: string;
  title: string;
  description: string;
  type?: "website" | "article";
  images?: string[];
  noindex?: boolean;
};

export const buildPageMetadata = ({
  locale,
  pathname = "/",
  title,
  description,
  type = "website",
  images,
  noindex = false,
}: BuildPageMetadataInput): Metadata => {
  const canonical = buildLocalePath(locale, pathname);
  const imageUrls =
    images && images.length > 0 ? images : [DEFAULT_OG_IMAGE_PATH];
  const absoluteImages = imageUrls.map((imageUrl) => toAbsoluteUrl(imageUrl));

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: buildLocaleAlternates(pathname),
    },
    openGraph: {
      title,
      description,
      type,
      url: canonical,
      siteName: SITE_NAME,
      locale: OG_LOCALES[locale],
      images: absoluteImages.map((url) => ({
        url,
        width: 1200,
        height: 630,
        alt: title,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: absoluteImages,
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
            "max-image-preview": "none",
            "max-snippet": 0,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
};
