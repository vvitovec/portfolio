import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

import { routing, type Locale } from "@/i18n/routing";
import { fontDisplay, fontSans } from "@/lib/fonts";

export const metadata: Metadata = {
  icons: {
    icon: [
      {
        url: "/images/Logo.png",
        type: "image/png",
        sizes: "64x64",
      },
    ],
  },
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
      <head>
        <link rel="icon" href="/images/Logo.png" type="image/png" sizes="64x64" />
      </head>
      <body
        className={`${fontSans.variable} ${fontDisplay.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
