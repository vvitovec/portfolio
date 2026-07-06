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

const dashboardSections = [
  {
    href: '/admin/projects',
    key: 'projects',
    Icon: FolderKanban,
    className: 'lg:col-span-2',
  },
  {
    href: '/admin/websites',
    key: 'websites',
    Icon: Globe,
    className: 'lg:col-span-2',
  },
  {
    href: '/admin/blog',
    key: 'blog',
    Icon: NotebookText,
    className: 'lg:col-span-2',
  },
  {
    href: '/admin/newsletter',
    key: 'newsletter',
    Icon: Mail,
    className: 'lg:col-span-3',
  },
  {
    href: '/admin/comments',
    key: 'comments',
    Icon: MessageCircle,
    className: 'lg:col-span-3',
  },
] as const;

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
    <section className="py-12 sm:py-16 lg:py-20">
      <Container className="max-w-5xl">
        <div className="space-y-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase">
                {t('label')}
              </p>
              <h1 className="font-display text-foreground text-3xl font-semibold sm:text-4xl">
                {t('dashboard.title')}
              </h1>
              <p className="text-muted-foreground">{t('dashboard.subtitle')}</p>
            </div>
            <SignOutButton label={t('dashboard.signOut')} />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {dashboardSections.map(({ href, key, Icon, className }) => (
              <Link
                key={key}
                href={href}
                className={`${className} border-border/70 bg-card hover:border-foreground/25 hover:bg-muted/30 focus-visible:ring-ring/50 group flex min-h-40 gap-4 rounded-2xl border p-5 transition-colors focus-visible:ring-2 sm:p-6`}
              >
                <span className="border-border/70 text-foreground bg-background/80 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 space-y-2">
                  <span className="font-display text-foreground block text-xl font-semibold leading-tight sm:text-2xl">
                    {t(`dashboard.sections.${key}.title`)}
                  </span>
                  <span className="text-muted-foreground block text-sm leading-6">
                    {t(`dashboard.sections.${key}.description`)}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
