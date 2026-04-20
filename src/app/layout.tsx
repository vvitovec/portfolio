import type { Metadata, Viewport } from "next";
import "./globals.css";

import { routing } from "@/i18n/routing";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { PROFILE_IMAGE_PATH, SITE_NAME, SITE_URL } from "@/lib/seo";

const FAVICON_VERSION = "20260415";

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
        url: `/icon.png?v=${FAVICON_VERSION}`,
        type: "image/png",
        sizes: "512x512",
      },
    ],
    shortcut: [`/favicon.ico?v=${FAVICON_VERSION}`],
    apple: [
      {
        url: `/apple-icon.png?v=${FAVICON_VERSION}`,
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
  return (
    <html lang={routing.defaultLocale}>
      <body
        className={`${fontSans.variable} ${fontDisplay.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
