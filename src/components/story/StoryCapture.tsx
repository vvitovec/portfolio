'use client';

import { useRef, useState } from 'react';
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

type StoryCaptureProps = {
  children: React.ReactNode;
  downloadName: string;
};

type Status = 'idle' | 'working' | 'downloaded' | 'error';

type ImageRestore = {
  image: HTMLImageElement;
  src: string | null;
  srcset: string | null;
  sizes: string | null;
};

const dataUrlToBlob = async (dataUrl: string) => {
  const response = await fetch(dataUrl);
  return response.blob();
};

const blobToDataUrl = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

const getFetchableImageUrl = (src: string) => {
  const url = new URL(src, window.location.href);

  if (url.protocol === 'data:' || url.protocol === 'blob:') {
    return null;
  }

  if (url.origin === window.location.origin) {
    return url.href;
  }

  return `/api/internal/story-image?url=${encodeURIComponent(url.href)}`;
};

export default function StoryCapture({
  children,
  downloadName,
}: StoryCaptureProps) {
  const t = useTranslations('story');
  const storyRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  const withInlinedImages = async <T,>(node: HTMLElement, action: () => Promise<T>) => {
    await document.fonts?.ready;

    const restores: ImageRestore[] = [];
    const images = Array.from(node.querySelectorAll('img'));

    await Promise.all(
      images.map(async (image) => {
        const src = image.currentSrc || image.src || image.getAttribute('src');
        if (!src) {
          return;
        }

        const fetchUrl = getFetchableImageUrl(src);
        if (!fetchUrl) {
          return;
        }

        try {
          const response = await fetch(fetchUrl, { cache: 'force-cache' });
          if (!response.ok) {
            throw new Error(`Image fetch failed: ${response.status}`);
          }

          const dataUrl = await blobToDataUrl(await response.blob());
          restores.push({
            image,
            src: image.getAttribute('src'),
            srcset: image.getAttribute('srcset'),
            sizes: image.getAttribute('sizes'),
          });

          image.removeAttribute('srcset');
          image.removeAttribute('sizes');
          image.src = dataUrl;
          await image.decode?.();
        } catch (error) {
          console.warn('Failed to inline story image before export', error);
          await image.decode?.().catch(() => undefined);
        }
      }),
    );

    try {
      return await action();
    } finally {
      restores.forEach(({ image, src, srcset, sizes }) => {
        if (src === null) {
          image.removeAttribute('src');
        } else {
          image.setAttribute('src', src);
        }

        if (srcset === null) {
          image.removeAttribute('srcset');
        } else {
          image.setAttribute('srcset', srcset);
        }

        if (sizes === null) {
          image.removeAttribute('sizes');
        } else {
          image.setAttribute('sizes', sizes);
        }
      });
    }
  };

  const createTransparentStoryFile = async () => {
    if (!storyRef.current) {
      return null;
    }

    const dataUrl = await withInlinedImages(storyRef.current, async () => {
      const { toPng } = await import('html-to-image');
      return toPng(storyRef.current!, {
        backgroundColor: 'transparent',
        cacheBust: true,
        pixelRatio: 3,
        preferredFontFormat: 'woff2',
      });
    });
    const blob = await dataUrlToBlob(dataUrl);

    return new File([blob], downloadName, { type: 'image/png' });
  };

  const downloadFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const downloadStory = async () => {
    setStatus('working');

    try {
      const file = await createTransparentStoryFile();
      if (!file) {
        setStatus('error');
        return;
      }
      downloadFile(file);
      setStatus('downloaded');
    } catch (error) {
      console.error('Failed to download story image', error);
      setStatus('error');
    }
  };

  const statusLabel =
    status === 'working'
      ? t('working')
      : status === 'downloaded'
        ? t('downloaded')
        : status === 'error'
          ? t('error')
          : null;

  return (
    <div data-story-page className="bg-background min-h-screen px-4 py-5 sm:px-6">
      <div className="mx-auto flex max-w-[28rem] flex-col gap-4">
        <div className="bg-muted/35 rounded-[1.75rem] border border-dashed border-border/70 p-4 sm:p-5">
          <div
            ref={storyRef}
            className="story-export mx-auto w-full overflow-visible rounded-2xl bg-transparent"
          >
            {children}
          </div>
        </div>

        <div className="border-border/70 bg-card/80 grid gap-2 rounded-2xl border p-3 shadow-sm">
          <Button
            type="button"
            onClick={downloadStory}
            disabled={status === 'working'}
            className="gap-2"
          >
            {status === 'working' ? (
              <span className="border-primary-foreground/30 border-t-primary-foreground h-4 w-4 animate-spin rounded-full border-2" />
            ) : (
              <Download className="h-4 w-4" aria-hidden="true" />
            )}
            {t('download')}
          </Button>
          {statusLabel ? (
            <p className="text-muted-foreground px-1 text-center text-xs">{statusLabel}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
