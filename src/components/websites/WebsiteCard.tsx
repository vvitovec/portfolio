'use client';

import Image from 'next/image';

import { Link } from '@/i18n/navigation';
import type { WebsiteView } from '@/server/queries/websites';

type WebsiteCardProps = {
  site: WebsiteView;
  categoryLabel: string;
  exploreLabel: string;
  href?: string;
  onOpen?: (site: WebsiteView) => void;
  animationDelay?: string;
};

export default function WebsiteCard({
  site,
  categoryLabel,
  exploreLabel,
  href,
  onOpen,
  animationDelay,
}: WebsiteCardProps) {
  const previewAlt = `${site.name} website preview`;
  const className =
    'ws-card group cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-card/80 text-left shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:duration-300 motion-safe:transition-transform motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg';

  const content = (
    <>
      <div className="ws-preview bg-muted relative aspect-[16/10] w-full overflow-hidden">
        {site.previewImageUrl ? (
          <Image
            src={site.previewImageUrl}
            alt={previewAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
          />
        ) : (
          <>
            <div className="absolute inset-0 z-10" />
            <iframe
              src={site.url}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups"
              title={site.name}
              className="absolute top-0 left-0 h-[900px] w-[1440px] origin-top-left border-none"
              onLoad={(event) => {
                const card = (event.target as HTMLIFrameElement).closest<HTMLElement>('.ws-card');
                if (card) {
                  const preview = card.querySelector<HTMLElement>('.ws-preview');
                  const iframe = card.querySelector<HTMLIFrameElement>('iframe');
                  if (preview && iframe) {
                    const scale = preview.offsetWidth / 1440;
                    iframe.style.transform = `scale(${scale})`;
                    preview.style.height = `${900 * scale}px`;
                  }
                }
                const loader = card?.querySelector('.ws-loader');
                loader?.classList.add('opacity-0', 'pointer-events-none');
              }}
            />
            <div className="ws-loader bg-muted absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-500">
              <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-indigo-500/20 border-t-indigo-400" />
            </div>
          </>
        )}

        <div className="absolute inset-0 z-30 flex items-end bg-black/45 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-xs font-semibold tracking-[0.2em] text-white/90 uppercase">
            {exploreLabel}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <span className="text-foreground min-w-0 truncate text-sm font-semibold">{site.name}</span>
        <span className="border-border bg-muted text-foreground shrink-0 rounded-full border px-3 py-1 text-[0.65rem] font-semibold tracking-wide uppercase">
          {categoryLabel}
        </span>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className} style={{ animationDelay }}>
        {content}
      </Link>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={className}
      style={{ animationDelay }}
      onClick={() => onOpen?.(site)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen?.(site);
        }
      }}
    >
      {content}
    </div>
  );
}
