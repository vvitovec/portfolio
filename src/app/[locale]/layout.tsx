import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LocaleHtmlAttrs from "@/components/layout/LocaleHtmlAttrs";
import { routing, type Locale } from "@/i18n/routing";
import Providers from "@/app/[locale]/providers";
import { OG_LOCALES, PROFILE_IMAGE_PATH, SITE_NAME } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;

  const defaultsByLocale: Record<Locale, { title: string; description: string }> = {
    cs: {
      title: `${SITE_NAME} | IT & Web Developer`,
      description:
        "Navrhuji a vyvíjím rychlé weby a digitální produkty. Portfolio, služby a kontakt.",
    },
    en: {
      title: `${SITE_NAME} | IT & Web Developer`,
      description:
        "I design and build fast websites and digital products. Portfolio, services, and contact.",
    },
  };
  const localeDefaults = defaultsByLocale[locale];

  return {
    title: {
      default: localeDefaults.title,
      template: `%s | ${SITE_NAME}`,
    },
    description: localeDefaults.description,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: OG_LOCALES[locale],
      images: [
        {
          url: PROFILE_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers>
        <LocaleHtmlAttrs locale={locale} />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
}
