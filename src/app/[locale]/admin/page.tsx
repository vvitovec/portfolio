import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { FolderKanban, Globe, Mail, MessageCircle, NotebookText } from 'lucide-react';

import { SignOutButton } from '@/components/admin/AdminAuthButtons';
import { Link } from '@/i18n/navigation';
import Container from '@/components/layout/Container';
import { getServerAuthSession } from '@/server/auth';
import { routing, type Locale } from '@/i18n/routing';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;

  const session = await getServerAuthSession();

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  if (!session.user?.isAdmin) {
    redirect(`/${locale}/admin/forbidden`);
  }

  const t = await getTranslations({ locale, namespace: 'admin' });

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="border-border bg-card/80 max-w-4xl space-y-6 rounded-2xl border p-8">
          <div className="space-y-3">
            <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase">{t('label')}</p>
            <h1 className="font-display text-foreground text-3xl font-semibold">
              {t('dashboard.title')}
            </h1>
            <p className="text-muted-foreground">{t('dashboard.subtitle')}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Link
              href="/admin/projects"
              className="border-border/60 bg-background/70 hover:border-foreground/20 hover:bg-muted/30 rounded-2xl border p-6 transition-colors"
            >
              <div className="border-border/60 text-foreground mb-4 inline-flex rounded-full border p-3">
                <FolderKanban className="h-5 w-5" />
              </div>
              <h2 className="font-display text-foreground text-2xl font-semibold">
                {t('dashboard.sections.projects.title')}
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                {t('dashboard.sections.projects.description')}
              </p>
            </Link>
            <Link
              href="/admin/websites"
              className="border-border/60 bg-background/70 hover:border-foreground/20 hover:bg-muted/30 rounded-2xl border p-6 transition-colors"
            >
              <div className="border-border/60 text-foreground mb-4 inline-flex rounded-full border p-3">
                <Globe className="h-5 w-5" />
              </div>
              <h2 className="font-display text-foreground text-2xl font-semibold">
                {t('dashboard.sections.websites.title')}
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                {t('dashboard.sections.websites.description')}
              </p>
            </Link>
            <Link
              href="/admin/blog"
              className="border-border/60 bg-background/70 hover:border-foreground/20 hover:bg-muted/30 rounded-2xl border p-6 transition-colors"
            >
              <div className="border-border/60 text-foreground mb-4 inline-flex rounded-full border p-3">
                <NotebookText className="h-5 w-5" />
              </div>
              <h2 className="font-display text-foreground text-2xl font-semibold">
                {t('dashboard.sections.blog.title')}
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                {t('dashboard.sections.blog.description')}
              </p>
            </Link>
            <Link
              href="/admin/newsletter"
              className="border-border/60 bg-background/70 hover:border-foreground/20 hover:bg-muted/30 rounded-2xl border p-6 transition-colors"
            >
              <div className="border-border/60 text-foreground mb-4 inline-flex rounded-full border p-3">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="font-display text-foreground text-2xl font-semibold">
                {t('dashboard.sections.newsletter.title')}
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                {t('dashboard.sections.newsletter.description')}
              </p>
            </Link>
            <Link
              href="/admin/comments"
              className="border-border/60 bg-background/70 hover:border-foreground/20 hover:bg-muted/30 rounded-2xl border p-6 transition-colors"
            >
              <div className="border-border/60 text-foreground mb-4 inline-flex rounded-full border p-3">
                <MessageCircle className="h-5 w-5" />
              </div>
              <h2 className="font-display text-foreground text-2xl font-semibold">
                {t('dashboard.sections.comments.title')}
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                {t('dashboard.sections.comments.description')}
              </p>
            </Link>
          </div>
          <SignOutButton label={t('dashboard.signOut')} />
        </div>
      </Container>
    </section>
  );
}
