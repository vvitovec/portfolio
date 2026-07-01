'use client';

import { useRef, useState } from 'react';
import { Check, Copy, Download, ExternalLink, Share2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

type StoryCaptureProps = {
  children: React.ReactNode;
  title: string;
  targetUrl: string;
  downloadName: string;
};

type Status = 'idle' | 'working' | 'shared' | 'downloaded' | 'copied' | 'error';

const dataUrlToBlob = async (dataUrl: string) => {
  const response = await fetch(dataUrl);
  return response.blob();
};

export default function StoryCapture({
  children,
  title,
  targetUrl,
  downloadName,
}: StoryCaptureProps) {
  const t = useTranslations('story');
  const storyRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  const createStoryFile = async () => {
    if (!storyRef.current) {
      return null;
    }

    const { toPng } = await import('html-to-image');
    const dataUrl = await toPng(storyRef.current, {
      backgroundColor: '#faf7ef',
      cacheBust: true,
      pixelRatio: 3,
      preferredFontFormat: 'woff2',
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

  const shareStory = async () => {
    setStatus('working');

    try {
      const file = await createStoryFile();
      if (!file) {
        setStatus('error');
        return;
      }

      const shareData = {
        title,
        text: targetUrl,
        url: targetUrl,
        files: [file],
      };

      if (navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
        setStatus('shared');
        return;
      }

      downloadFile(file);
      await navigator.clipboard?.writeText(targetUrl);
      setStatus('downloaded');
    } catch (error) {
      console.error('Failed to share story image', error);
      setStatus('error');
    }
  };

  const downloadStory = async () => {
    setStatus('working');

    try {
      const file = await createStoryFile();
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

  const copyTarget = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl);
      setStatus('copied');
    } catch (error) {
      console.error('Failed to copy target URL', error);
      setStatus('error');
    }
  };

  const statusLabel =
    status === 'working'
      ? t('working')
      : status === 'shared'
        ? t('shared')
        : status === 'downloaded'
          ? t('downloaded')
          : status === 'copied'
            ? t('copied')
            : status === 'error'
              ? t('error')
              : null;

  return (
    <div className="bg-background min-h-screen px-4 py-5 sm:px-6">
      <div className="mx-auto flex max-w-[30rem] flex-col gap-4">
        <div
          ref={storyRef}
          className="border-border/70 bg-background relative aspect-[9/16] w-full overflow-hidden rounded-[2rem] border p-6 shadow-sm"
        >
          <div className="flex h-full items-center">{children}</div>
        </div>

        <div className="border-border/70 bg-card/80 grid gap-2 rounded-2xl border p-3 shadow-sm">
          <Button
            type="button"
            onClick={shareStory}
            disabled={status === 'working'}
            className="gap-2"
          >
            {status === 'working' ? (
              <span className="border-primary-foreground/30 border-t-primary-foreground h-4 w-4 animate-spin rounded-full border-2" />
            ) : (
              <Share2 className="h-4 w-4" aria-hidden="true" />
            )}
            {t('share')}
          </Button>
          <div className="grid grid-cols-3 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={downloadStory}
              disabled={status === 'working'}
              className="gap-2"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {t('download')}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={copyTarget}
              className="gap-2"
            >
              {status === 'copied' ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Copy className="h-4 w-4" aria-hidden="true" />
              )}
              {t('copy')}
            </Button>
            <Button asChild variant="outline" size="sm" className="gap-2">
              <a href={targetUrl}>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                {t('open')}
              </a>
            </Button>
          </div>
          {statusLabel ? (
            <p className="text-muted-foreground px-1 text-center text-xs">{statusLabel}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
