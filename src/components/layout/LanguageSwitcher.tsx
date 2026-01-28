"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav
      aria-label={t("language.label")}
      className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-1 py-1 text-xs font-medium"
    >
      {routing.locales.map((item) => {
        const isActive = item === locale;

        return (
          <Link
            key={item}
            href={pathname}
            locale={item}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-full px-3 py-1 transition-colors ${
              isActive
                ? "bg-zinc-900 text-white"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            {t(`language.${item}`)}
          </Link>
        );
      })}
    </nav>
  );
}
