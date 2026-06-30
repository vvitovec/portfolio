import { redirect } from "next/navigation";

import AdminBackLink from "@/components/admin/AdminBackLink";
import NewsletterDashboard from "@/components/admin/newsletter/NewsletterDashboard";
import Container from "@/components/layout/Container";
import { routing, type Locale } from "@/i18n/routing";
import { getServerAuthSession } from "@/server/auth";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminNewsletterPage({ params }: PageProps) {
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

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="space-y-6">
          <AdminBackLink />
          <NewsletterDashboard />
        </div>
      </Container>
    </section>
  );
}
