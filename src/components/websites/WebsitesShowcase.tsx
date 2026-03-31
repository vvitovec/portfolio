"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { WebsiteView } from "@/server/queries/websites";

interface ModalState {
  open: boolean;
  site: WebsiteView | null;
  loaded: boolean;
}

interface WebsitesShowcaseProps {
  websites: WebsiteView[];
  limit?: number;
}

const CATEGORY_LABEL_KEYS: Record<string, string> = {
  "Stavebnictví & reality": "constructionRealEstate",
  "E-shop": "eshop",
  Gastro: "gastro",
  Poradenství: "consulting",
  Aplikace: "apps",
};

export default function WebsitesShowcase({
  websites,
  limit,
}: WebsitesShowcaseProps) {
  const t = useTranslations("websites");
  const [activeCategory, setActiveCategory] = useState("all");
  const [modal, setModal] = useState<ModalState>({ open: false, site: null, loaded: false });
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = ["all", ...Array.from(new Set(websites.map((website) => website.category)))];

  const filtered = limit
    ? websites.slice(0, limit)
    : activeCategory === "all"
      ? websites
      : websites.filter((website) => website.category === activeCategory);

  function scaleIframe(card: HTMLElement) {
    const preview = card.querySelector<HTMLElement>(".ws-preview");
    const iframe = card.querySelector<HTMLIFrameElement>("iframe");
    if (!preview || !iframe) return;
    const scale = preview.offsetWidth / 1440;
    iframe.style.transform = `scale(${scale})`;
    preview.style.height = `${900 * scale}px`;
  }

  function openModal(site: WebsiteView) {
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

  const categoryLabel = (cat: string) => {
    if (cat === "all") return t("all");

    const key = CATEGORY_LABEL_KEYS[cat];
    return key ? t(`categories.${key}`) : cat;
  };

  return (
    <>
      {/* Filter chips — hidden when limit is set */}
      {!limit && (
        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={[
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                activeCategory === cat
                  ? "border-indigo-400 bg-indigo-100 text-indigo-950 shadow-[0_2px_10px_rgba(99,102,241,0.18)]"
                  : "border-white/10 bg-white/5 text-muted-foreground hover:border-indigo-400/40 hover:bg-indigo-100/60 hover:text-indigo-900",
              ].join(" ")}
            >
              {categoryLabel(cat)}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div
        ref={gridRef}
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((site, i) => (
          <div
            key={site.url}
            className="ws-card group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/25 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            style={{ animationDelay: `${i * 0.08}s` }}
            onClick={() => openModal(site)}
          >
            {/* Iframe preview */}
            <div className="ws-preview relative w-full overflow-hidden bg-[#111827]">
              {/* Transparent overlay blocks pointer events on the iframe */}
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
              <div className="ws-loader absolute inset-0 z-20 flex items-center justify-center bg-[#111827] transition-opacity duration-500">
                <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-indigo-500/20 border-t-indigo-400" />
              </div>
            </div>

            {/* Info bar */}
            <div className="flex items-center justify-between gap-3 px-5 py-4">
              <span className="truncate text-sm font-semibold text-foreground">
                {site.name}
              </span>
              <span className="shrink-0 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-indigo-300">
                {categoryLabel(site.category)}
              </span>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-[rgba(10,14,26,0.6)] opacity-0 backdrop-blur-[4px] transition-opacity duration-300 group-hover:opacity-100">
              <span className="translate-y-2 rounded-xl bg-indigo-500/90 px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(99,102,241,0.4)] transition-transform duration-300 group-hover:translate-y-0">
                {t("explore")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen modal */}
      {modal.open && modal.site && (
        <div
          className="fixed inset-0 z-[1000] flex flex-col bg-black/85 backdrop-blur-xl"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          {/* Modal header */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[rgba(15,23,42,0.95)] px-6 py-3">
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
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/6 px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-white/10"
              >
                ↗ {t("openSite")}
              </a>
              <button
                onClick={closeModal}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/25 bg-red-500/12 px-4 py-2 text-xs font-medium text-red-300 transition-colors hover:bg-red-500/25"
              >
                {t("close")}
              </button>
            </div>
          </div>

          {/* Modal iframe */}
          <div className="relative flex-1">
            {!modal.loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0f172a]">
                <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-indigo-500/20 border-t-indigo-400" />
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
