import { redirect } from "next/navigation";

import ProjectCreate from "@/components/admin/projects/ProjectCreate";
import Container from "@/components/layout/Container";
import { getServerAuthSession } from "@/server/auth";
import { routing, type Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminProjectsNewPage({ params }: PageProps) {
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
        <ProjectCreate />
      </Container>
    </section>
  );
}
