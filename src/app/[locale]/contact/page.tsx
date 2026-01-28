import Image from "next/image";
import { useTranslations } from "next-intl";

import Container from "@/components/layout/Container";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="space-y-10">
          <div className="space-y-4">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t("title")}
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg">
              {t("subtitle")}
            </p>
          </div>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,_1fr)_minmax(0,_1.1fr)] lg:items-start">
            <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-sm sm:h-28 sm:w-28">
                  <Image
                    src="/images/ViktorVitovec.jpeg"
                    alt={t("details.photoAlt")}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {t("details.kicker")}
                  </p>
                  <h2 className="font-display text-2xl font-semibold text-foreground">
                    {t("details.title")}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {t("details.subtitle")}
                  </p>
                </div>
              </div>
              <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                <div className="space-y-1">
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {t("details.emailLabel")}
                  </dt>
                  <dd className="font-medium text-foreground">
                    <a
                      href="mailto:vvitovec27@gmail.com"
                      className="transition-colors motion-safe:duration-200 motion-safe:transition-colors motion-reduce:transition-none hover:text-foreground/80"
                    >
                      {t("details.emailValue")}
                    </a>
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {t("details.phoneLabel")}
                  </dt>
                  <dd className="font-medium text-foreground">
                    <a
                      href="tel:+420774943304"
                      className="transition-colors motion-safe:duration-200 motion-safe:transition-colors motion-reduce:transition-none hover:text-foreground/80"
                    >
                      {t("details.phoneValue")}
                    </a>
                  </dd>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {t("details.addressLabel")}
                  </dt>
                  <dd className="font-medium text-foreground">
                    {t("details.addressValue")}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {t("details.icoLabel")}
                  </dt>
                  <dd className="font-medium text-foreground">
                    {t("details.icoValue")}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-sm sm:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
