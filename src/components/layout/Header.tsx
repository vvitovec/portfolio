import { useTranslations } from "next-intl";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "@/i18n/navigation";
import Container from "@/components/layout/Container";

export default function Header() {
  const t = useTranslations("nav");

  const navLinkClass =
    "relative py-1 text-muted-foreground transition-colors duration-300 hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent-gold after:transition-all after:duration-300 hover:after:w-full";

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between gap-8">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-foreground transition-colors duration-300 hover:text-accent-gold"
        >
          {t("brand")}
        </Link>
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 text-sm font-medium sm:flex"
        >
          <Link href="/" className={navLinkClass}>
            {t("home")}
          </Link>
          <Link href="/websites" className={navLinkClass}>
            {t("websites")}
          </Link>
          <Link href="/projects" className={navLinkClass}>
            {t("projects")}
          </Link>
          <Link href="/contact" className={navLinkClass}>
            {t("contact")}
          </Link>
        </nav>
        <div className="flex items-center">
          <LanguageSwitcher />
        </div>
      </Container>
      {/* Mobile nav row */}
      <div className="border-t border-border/30 sm:hidden">
        <nav aria-label="Mobile navigation">
          <Container className="flex items-center gap-6 py-2.5 text-xs font-medium text-muted-foreground">
            <Link
              href="/"
              className="transition-colors duration-200 hover:text-foreground"
            >
              {t("home")}
            </Link>
            <Link
              href="/websites"
              className="transition-colors duration-200 hover:text-foreground"
            >
              {t("websites")}
            </Link>
            <Link
              href="/projects"
              className="transition-colors duration-200 hover:text-foreground"
            >
              {t("projects")}
            </Link>
            <Link
              href="/contact"
              className="transition-colors duration-200 hover:text-foreground"
            >
              {t("contact")}
            </Link>
          </Container>
        </nav>
      </div>
    </header>
  );
}
