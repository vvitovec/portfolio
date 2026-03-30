import { useTranslations } from "next-intl";
import { Github, Instagram, Linkedin } from "lucide-react";

import Container from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const nav = useTranslations("nav");
  const footer = useTranslations("footer");

  return (
    <footer className="border-t border-border/40 bg-background">
      <Container className="py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          {/* Brand column */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block font-display text-2xl font-semibold tracking-tight text-foreground transition-colors duration-300 hover:text-accent-gold"
            >
              {nav("brand")}
            </Link>
            <p className="text-sm font-medium text-foreground/80">
              {footer("title")}
            </p>
            <p className="max-w-xs text-sm text-muted-foreground">
              {footer("subtitle")}
            </p>
          </div>

          {/* Contact column */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-gold">
              {footer("contact.label")}
            </span>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="mailto:vvitovec27@gmail.com"
                className="group flex flex-col gap-0.5"
              >
                <span className="text-xs text-muted-foreground">
                  {footer("contact.email")}
                </span>
                <span className="font-medium text-foreground/90 transition-colors duration-200 group-hover:text-accent-gold">
                  vvitovec27@gmail.com
                </span>
              </a>
              <a
                href="tel:+420774943304"
                className="group flex flex-col gap-0.5"
              >
                <span className="text-xs text-muted-foreground">
                  {footer("contact.phone")}
                </span>
                <span className="font-medium text-foreground/90 transition-colors duration-200 group-hover:text-accent-gold">
                  +420 774 943 304
                </span>
              </a>
            </div>
          </div>

          {/* Social column */}
          <div className="flex flex-col gap-4 lg:items-end">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-gold">
              {footer("social.label")}
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/vvitovec"
                target="_blank"
                rel="me noreferrer"
                aria-label={footer("social.github")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-all duration-300 hover:border-accent-gold/40 hover:text-accent-gold hover:shadow-[0_0_12px_oklch(0.78_0.155_75/0.15)]"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/vitonovate"
                target="_blank"
                rel="me noreferrer"
                aria-label={footer("social.instagram")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-all duration-300 hover:border-accent-gold/40 hover:text-accent-gold hover:shadow-[0_0_12px_oklch(0.78_0.155_75/0.15)]"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/viktor-v%C3%ADtovec-15079a378/"
                target="_blank"
                rel="me noreferrer"
                aria-label={footer("social.linkedin")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-all duration-300 hover:border-accent-gold/40 hover:text-accent-gold hover:shadow-[0_0_12px_oklch(0.78_0.155_75/0.15)]"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex items-center justify-between border-t border-border/30 pt-6 text-xs text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} Viktor V&iacute;tovec</span>
          <span className="hidden text-[10px] uppercase tracking-[0.3em] sm:block">
            Design &bull; Develop &bull; Deploy
          </span>
        </div>
      </Container>
    </footer>
  );
}
