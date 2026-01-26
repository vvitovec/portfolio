import { useTranslations } from "next-intl";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "@/i18n/navigation";
import Container from "@/components/layout/Container";

export default function Header() {
  const t = useTranslations("nav");

  return (
    <header className="border-b border-border/70 bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-base font-semibold tracking-tight text-foreground transition-colors motion-safe:duration-200 motion-safe:transition-colors motion-reduce:transition-none hover:text-foreground/80"
        >
          {t("brand")}
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
          <Link
            href="/"
            className="transition-colors motion-safe:duration-200 motion-safe:transition-colors motion-reduce:transition-none hover:text-foreground"
          >
            {t("home")}
          </Link>
          <Link
            href="/projects"
            className="transition-colors motion-safe:duration-200 motion-safe:transition-colors motion-reduce:transition-none hover:text-foreground"
          >
            {t("projects")}
          </Link>
          <Link
            href="/contact"
            className="transition-colors motion-safe:duration-200 motion-safe:transition-colors motion-reduce:transition-none hover:text-foreground"
          >
            {t("contact")}
          </Link>
        </nav>
        <div className="flex items-center">
          <LanguageSwitcher />
        </div>
      </Container>
      <div className="border-t border-border/60 sm:hidden">
        <Container className="flex items-center gap-6 py-3 text-xs text-muted-foreground">
          <Link
            href="/"
            className="transition-colors motion-safe:duration-200 motion-safe:transition-colors motion-reduce:transition-none hover:text-foreground"
          >
            {t("home")}
          </Link>
          <Link
            href="/projects"
            className="transition-colors motion-safe:duration-200 motion-safe:transition-colors motion-reduce:transition-none hover:text-foreground"
          >
            {t("projects")}
          </Link>
          <Link
            href="/contact"
            className="transition-colors motion-safe:duration-200 motion-safe:transition-colors motion-reduce:transition-none hover:text-foreground"
          >
            {t("contact")}
          </Link>
        </Container>
      </div>
    </header>
  );
}
