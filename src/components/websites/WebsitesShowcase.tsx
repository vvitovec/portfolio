'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import WebsiteCard from '@/components/websites/WebsiteCard';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import type { WebsiteView } from '@/server/queries/websites';

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
  'Stavebnictví & reality': 'constructionRealEstate',
  'E-shop': 'eshop',
  Gastro: 'gastro',
  Poradenství: 'consulting',
  Aplikace: 'apps',
};

export default function WebsitesShowcase({ websites, limit }: WebsitesShowcaseProps) {
  const t = useTranslations('websites');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');
  const [modal, setModal] = useState<ModalState>(() => {
    if (limit) {
      return { open: false, site: null, loaded: false };
    }

    const siteId = searchParams.get('site');
    const site = siteId ? websites.find((website) => website.id === siteId) : null;
    return site ? { open: true, site, loaded: false } : { open: false, site: null, loaded: false };
  });
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = ['all', ...Array.from(new Set(websites.map((website) => website.category)))];

  const filtered = limit
    ? websites.slice(0, limit)
    : activeCategory === 'all'
      ? websites
      : websites.filter((website) => website.category === activeCategory);

  function scaleIframe(card: HTMLElement) {
    const preview = card.querySelector<HTMLElement>('.ws-preview');
    const iframe = card.querySelector<HTMLIFrameElement>('iframe');
    if (!preview || !iframe) return;
    const scale = preview.offsetWidth / 1440;
    iframe.style.transform = `scale(${scale})`;
    preview.style.height = `${900 * scale}px`;
  }

  const openModal = useCallback(
    (site: WebsiteView) => {
      setModal({ open: true, site, loaded: false });
      if (!limit) {
        const params = new URLSearchParams(searchParams.toString());
        params.set('site', site.id);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }
    },
    [limit, pathname, router, searchParams],
  );

  const closeModal = useCallback(() => {
    setModal((prev) => ({ ...prev, open: false }));
    if (!limit && searchParams.has('site')) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('site');
      const next = params.toString();
      router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    }
  }, [limit, pathname, router, searchParams]);

  useEffect(() => {
    document.body.style.overflow = modal.open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [modal.open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeModal]);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>('.ws-card');
    cards.forEach((card) => {
      scaleIframe(card);
    });
  }, [filtered]);

  useEffect(() => {
    function handleResize() {
      if (!gridRef.current) return;
      gridRef.current.querySelectorAll<HTMLElement>('.ws-card').forEach(scaleIframe);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categoryLabel = (cat: string) => {
    if (cat === 'all') return t('all');

    const key = CATEGORY_LABEL_KEYS[cat];
    return key ? t(`categories.${key}`) : cat;
  };

  return (
    <>
      {!limit && (
        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={[
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                activeCategory === cat
                  ? 'border-indigo-400 bg-indigo-100 text-indigo-950 shadow-[0_2px_10px_rgba(99,102,241,0.18)]'
                  : 'text-muted-foreground border-white/10 bg-white/5 hover:border-indigo-400/40 hover:bg-indigo-100/60 hover:text-indigo-900',
              ].join(' ')}
            >
              {categoryLabel(cat)}
            </button>
          ))}
        </div>
      )}

      <div ref={gridRef} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((site, i) => (
          <WebsiteCard
            key={site.id}
            site={site}
            categoryLabel={categoryLabel(site.category)}
            exploreLabel={t('explore')}
            onOpen={openModal}
            animationDelay={`${i * 0.08}s`}
          />
        ))}
      </div>

      {modal.open && modal.site && (
        <div
          className="fixed inset-0 z-[1000] flex flex-col bg-black/85 backdrop-blur-xl"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[rgba(15,23,42,0.95)] px-6 py-3">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <span className="text-sm font-semibold text-white">{modal.site.name}</span>
              <span className="truncate text-xs text-slate-300">{modal.site.url}</span>
            </div>
            <div className="ml-4 flex shrink-0 items-center gap-2">
              <Link
                href={`/story/website/${modal.site.id}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 bg-white/12 px-4 py-2 text-xs font-medium text-white transition-colors hover:border-white/35 hover:bg-white/20"
              >
                {t('story.shareCard')}
              </Link>
              <a
                href={modal.site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 bg-white/12 px-4 py-2 text-xs font-medium text-white transition-colors hover:border-white/35 hover:bg-white/20"
              >
                ↗ {t('openSite')}
              </a>
              <button
                onClick={closeModal}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-300/40 bg-red-500/20 px-4 py-2 text-xs font-medium text-red-100 transition-colors hover:border-red-200/60 hover:bg-red-500/30"
              >
                {t('close')}
              </button>
            </div>
          </div>

          <div className="relative flex-1">
            {modal.site.previewImageUrl ? (
              <div className="relative h-full w-full overflow-auto bg-white">
                <img
                  src={modal.site.previewImageUrl}
                  alt={`${modal.site.name} website preview`}
                  className="mx-auto h-auto w-full"
                />
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
