import { useTranslations } from "next-intl";

import Container from "@/components/layout/Container";

export default function Footer() {
  const nav = useTranslations("nav");
  const footer = useTranslations("footer");

  return (
    <footer className="border-t border-border/70 bg-background/80">
      <Container className="grid gap-8 py-10 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-2">
          <p className="font-medium text-foreground">{nav("brand")}</p>
          <p className="text-foreground/80">{footer("title")}</p>
          <p>{footer("subtitle")}</p>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {footer("contact.label")}
          </span>
          <div className="flex flex-col gap-2">
            <a
              href="mailto:vvitovec27@gmail.com"
              className="font-medium text-foreground/80 transition-colors motion-safe:duration-200 motion-safe:transition-colors motion-reduce:transition-none hover:text-foreground"
            >
              {footer("contact.email")}
              <span className="ml-2 text-foreground/60">
                vvitovec27@gmail.com
              </span>
            </a>
            <a
              href="tel:+420774943304"
              className="font-medium text-foreground/80 transition-colors motion-safe:duration-200 motion-safe:transition-colors motion-reduce:transition-none hover:text-foreground"
            >
              {footer("contact.phone")}
              <span className="ml-2 text-foreground/60">
                +420 774 943 304
              </span>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:items-end">
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {footer("social.label")}
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/vvitovec"
              target="_blank"
              rel="noreferrer"
              className="transition-colors motion-safe:duration-200 motion-safe:transition-colors motion-reduce:transition-none hover:text-foreground"
            >
              {footer("social.github")}
            </a>
            <a
              href="https://www.instagram.com/vitonovate"
              target="_blank"
              rel="noreferrer"
              className="transition-colors motion-safe:duration-200 motion-safe:transition-colors motion-reduce:transition-none hover:text-foreground"
            >
              {footer("social.instagram")}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
