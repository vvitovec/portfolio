import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

import { routing, type Locale } from "@/i18n/routing";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { PROFILE_IMAGE_PATH, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: `${SITE_NAME} | IT & Web Developer`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Portfolio a služby vývoje webů a digitálních produktů od Viktora Vítovce.",
  icons: {
    icon: [
      {
        url: "/images/Logo.png",
        type: "image/png",
        sizes: "64x64",
      },
    ],
    apple: [
      {
        url: "/images/Logo.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  openGraph: {
    siteName: SITE_NAME,
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const localeHeader = headersList.get("X-NEXT-INTL-LOCALE");
  const locale =
    localeHeader && routing.locales.includes(localeHeader as Locale)
      ? (localeHeader as Locale)
      : routing.defaultLocale;

  return (
    <html lang={locale}>
      <body
        className={`${fontSans.variable} ${fontDisplay.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
