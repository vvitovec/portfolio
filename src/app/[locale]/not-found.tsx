import { getTranslations } from "next-intl/server";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function NotFoundPage() {
  const t = await getTranslations("notFound");

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl space-y-6 rounded-2xl border border-border bg-card/80 p-8 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            404
          </p>
          <h1 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="text-muted-foreground">{t("description")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/">{t("primaryAction")}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/projects">{t("secondaryAction")}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
