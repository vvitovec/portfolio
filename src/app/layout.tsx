import { Fraunces, JetBrains_Mono, Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

import { routing, type Locale } from "@/i18n/routing";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

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
        className={`${manrope.variable} ${fraunces.variable} ${jetBrainsMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
