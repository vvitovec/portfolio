import { useTranslations } from "next-intl";

import Container from "@/components/layout/Container";

export default function Footer() {
  const nav = useTranslations("nav");
  const footer = useTranslations("footer");

  return (
    <footer className="border-t border-border/70 bg-background/80">
      <Container className="flex flex-col gap-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="font-medium text-foreground">{nav("brand")}</p>
          <p className="text-foreground/80">{footer("title")}</p>
          <p>{footer("subtitle")}</p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {footer("social.label")}
          </span>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="transition-colors motion-safe:duration-200 motion-safe:transition-colors motion-reduce:transition-none hover:text-foreground"
            >
              {footer("social.linkedin")}
            </a>
            <a
              href="#"
              className="transition-colors motion-safe:duration-200 motion-safe:transition-colors motion-reduce:transition-none hover:text-foreground"
            >
              {footer("social.github")}
            </a>
            <a
              href="#"
              className="transition-colors motion-safe:duration-200 motion-safe:transition-colors motion-reduce:transition-none hover:text-foreground"
            >
              {footer("social.dribbble")}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
