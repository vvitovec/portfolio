import { useTranslations } from 'next-intl';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Link } from '@/i18n/navigation';
import Container from '@/components/layout/Container';
import PublicRoutePrefetcher from '@/components/layout/PublicRoutePrefetcher';

export default function Header() {
  const t = useTranslations('nav');

  return (
    <header className="border-border/60 bg-background/80 supports-[backdrop-filter]:bg-background/70 sticky top-0 z-50 border-b backdrop-blur-xl">
      <PublicRoutePrefetcher />
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-foreground hover:text-foreground/80 text-base font-semibold tracking-tight transition-colors motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none"
        >
          {t('brand')}
        </Link>
        <nav
          aria-label="Primary navigation"
          className="text-muted-foreground hidden items-center gap-6 text-sm sm:flex"
        >
          <Link
            href="/"
            className="hover:text-foreground transition-colors motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none"
          >
            {t('home')}
          </Link>
          <Link
            href="/websites"
            className="hover:text-foreground transition-colors motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none"
          >
            {t('websites')}
          </Link>
          <Link
            href="/projects"
            className="hover:text-foreground transition-colors motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none"
          >
            {t('projects')}
          </Link>
          <Link
            href="/blog"
            className="hover:text-foreground transition-colors motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none"
          >
            {t('blog')}
          </Link>
          <Link
            href="/community"
            className="hover:text-foreground transition-colors motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none"
          >
            {t('community')}
          </Link>
          <Link
            href="/contact"
            className="hover:text-foreground transition-colors motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none"
          >
            {t('contact')}
          </Link>
        </nav>
        <div className="flex items-center">
          <LanguageSwitcher />
        </div>
      </Container>
      <div className="border-border/60 border-t sm:hidden">
        <nav aria-label="Mobile navigation">
          <Container className="text-muted-foreground flex items-center gap-5 overflow-x-auto py-3 text-xs">
            <Link
              href="/"
              className="hover:text-foreground transition-colors motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none"
            >
              {t('home')}
            </Link>
            <Link
              href="/websites"
              className="hover:text-foreground transition-colors motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none"
            >
              {t('websites')}
            </Link>
            <Link
              href="/projects"
              className="hover:text-foreground transition-colors motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none"
            >
              {t('projects')}
            </Link>
            <Link
              href="/blog"
              className="hover:text-foreground transition-colors motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none"
            >
              {t('blog')}
            </Link>
            <Link
              href="/community"
              className="hover:text-foreground transition-colors motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none"
            >
              {t('community')}
            </Link>
            <Link
              href="/contact"
              className="hover:text-foreground transition-colors motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none"
            >
              {t('contact')}
            </Link>
          </Container>
        </nav>
      </div>
    </header>
  );
}
