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
      className="flex items-center gap-0.5 rounded-full border border-border/60 bg-card/60 p-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur-sm"
    >
      {routing.locales.map((item) => {
        const isActive = item === locale;

        return (
          <Link
            key={item}
            href={pathname}
            locale={item}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-full px-3 py-1 transition-all duration-300 ${
              isActive
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t(`language.${item}`)}
          </Link>
        );
      })}
    </nav>
  );
}
