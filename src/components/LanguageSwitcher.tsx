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
      className="flex items-center gap-1 rounded-full border border-border bg-card/80 p-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
    >
      {routing.locales.map((item) => {
        const isActive = item === locale;

        return (
          <Link
            key={item}
            href={pathname}
            locale={item}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-full px-3 py-1 transition-colors motion-safe:duration-200 motion-safe:transition-colors motion-reduce:transition-none ${
              isActive
                ? "bg-foreground text-background"
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
