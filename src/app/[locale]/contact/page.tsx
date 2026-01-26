import { useTranslations } from "next-intl";

import Container from "@/components/layout/Container";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,_1fr)_minmax(0,_1.1fr)] lg:items-start">
          <div className="max-w-2xl">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
