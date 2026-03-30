"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ExternalLink, X } from "lucide-react";

export interface WebsiteShowcaseItem {
  id: string;
  name: string;
  url: string;
  category: string;
  description: string | null;
}

interface ModalState {
  open: boolean;
  site: WebsiteShowcaseItem | null;
  loaded: boolean;
}

type WebsitesShowcaseProps = {
  websites: WebsiteShowcaseItem[];
};

export default function WebsitesShowcase({ websites }: WebsitesShowcaseProps) {
  const t = useTranslations("websites");
  const [activeCategory, setActiveCategory] = useState("all");
  const [modal, setModal] = useState<ModalState>({ open: false, site: null, loaded: false });
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = ["all", ...Array.from(new Set(websites.map((w) => w.category)))];

  const filtered =
    activeCategory === "all"
      ? websites
      : websites.filter((w) => w.category === activeCategory);

  const scaleIframe = (card: HTMLElement) => {
    const preview = card.querySelector<HTMLElement>(".ws-preview");
    const iframe = card.querySelector<HTMLIFrameElement>("iframe");
    if (!preview || !iframe) return;
    const scale = preview.offsetWidth / 1440;
    iframe.style.transform = `scale(${scale})`;
    preview.style.height = `${900 * scale}px`;
  };

  function openModal(site: WebsiteShowcaseItem) {
    setModal({ open: true, site, loaded: false });
  }

  function closeModal() {
    setModal((prev) => ({ ...prev, open: false }));
  }

  useEffect(() => {
    document.body.style.overflow = modal.open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [modal.open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".ws-card");
    cards.forEach((card) => {
      scaleIframe(card);
    });
  }, [filtered]);

  useEffect(() => {
    function handleResize() {
      if (!gridRef.current) return;
      gridRef.current.querySelectorAll<HTMLElement>(".ws-card").forEach(scaleIframe);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categoryLabel = (cat: string) => (cat === "all" ? t("all") : cat);

  return (
    <>
      {websites.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-border/40 bg-card/60 p-8 text-sm text-muted-foreground">
          {t("empty")}
        </div>
      ) : null}

      {/* Filter chips */}
      {websites.length > 0 ? (
        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={[
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300",
                activeCategory === cat
                  ? "border-accent-gold/40 bg-accent-gold/15 text-accent-gold"
                  : "border-border/40 bg-card/60 text-muted-foreground hover:border-accent-gold/20 hover:text-foreground",
              ].join(" ")}
            >
              {categoryLabel(cat)}
            </button>
          ))}
        </div>
      ) : null}

      {/* Grid */}
      <div
        ref={gridRef}
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((site, i) => (
          <div
            key={site.url}
            className="ws-card group relative cursor-pointer overflow-hidden rounded-2xl border border-border/40 bg-card/60 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-accent-gold/20 hover:shadow-xl hover:shadow-accent-gold/5"
            style={{ animationDelay: `${i * 0.08}s` }}
            onClick={() => openModal(site)}
          >
            {/* Iframe preview */}
            <div className="ws-preview relative w-full overflow-hidden bg-muted">
              <div className="absolute inset-0 z-10" />
              <iframe
                src={site.url}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups"
                title={site.name}
                className="absolute left-0 top-0 h-[900px] w-[1440px] origin-top-left border-none"
                onLoad={(e) => {
                  const card = (e.target as HTMLIFrameElement).closest<HTMLElement>(".ws-card");
                  if (card) scaleIframe(card);
                  const loader = card?.querySelector(".ws-loader");
                  loader?.classList.add("opacity-0", "pointer-events-none");
                }}
              />
              {/* Loader */}
              <div className="ws-loader absolute inset-0 z-20 flex items-center justify-center bg-muted transition-opacity duration-500">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-accent-gold/20 border-t-accent-gold" />
              </div>
            </div>

            {/* Info bar */}
            <div className="space-y-3 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <span className="truncate text-sm font-semibold text-foreground">
                  {site.name}
                </span>
                <span className="shrink-0 rounded-full border border-accent-gold/20 bg-accent-gold/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-gold">
                  {site.category}
                </span>
              </div>
              {site.description ? (
                <p className="text-sm text-muted-foreground">
                  {site.description}
                </p>
              ) : null}
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
              <span className="flex translate-y-2 items-center gap-2 rounded-xl bg-accent-gold px-6 py-3 text-sm font-semibold text-accent-gold-foreground shadow-lg shadow-accent-gold/20 transition-transform duration-500 group-hover:translate-y-0">
                <ExternalLink className="h-4 w-4" />
                {t("explore")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen modal */}
      {modal.open && modal.site && (
        <div
          className="fixed inset-0 z-[1000] flex flex-col bg-black/80 backdrop-blur-xl"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          {/* Modal header */}
          <div className="flex shrink-0 items-center justify-between border-b border-border/20 bg-card/95 px-6 py-3 backdrop-blur-xl">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <span className="text-sm font-semibold text-foreground">
                {modal.site.name}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {modal.site.url}
              </span>
            </div>
            <div className="ml-4 flex shrink-0 items-center gap-2">
              <a
                href={modal.site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-card px-4 py-2 text-xs font-medium text-foreground transition-all duration-300 hover:border-accent-gold/30 hover:text-accent-gold"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                {t("openSite")}
              </a>
              <button
                onClick={closeModal}
                className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-xs font-medium text-destructive transition-colors duration-300 hover:bg-destructive/20"
              >
                <X className="h-3.5 w-3.5" />
                {t("close")}
              </button>
            </div>
          </div>

          {/* Modal iframe */}
          <div className="relative flex-1">
            {!modal.loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-card">
                <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-accent-gold/20 border-t-accent-gold" />
              </div>
            )}
            <iframe
              src={modal.site.url}
              className="h-full w-full border-none bg-white"
              onLoad={() => setModal((prev) => ({ ...prev, loaded: true }))}
            />
          </div>
        </div>
      )}
    </>
  );
}
