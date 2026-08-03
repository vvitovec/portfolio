'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

type AdminQueryErrorProps = {
  isRetrying?: boolean;
  onRetry: () => void;
};

export default function AdminQueryError({ isRetrying = false, onRetry }: AdminQueryErrorProps) {
  const t = useTranslations('admin.queryError');

  return (
    <div
      className="border-destructive/30 bg-destructive/5 space-y-3 rounded-xl border p-4"
      role="alert"
    >
      <div className="space-y-1">
        <p className="text-foreground text-sm font-medium">{t('title')}</p>
        <p className="text-muted-foreground text-sm">{t('description')}</p>
      </div>
      <Button type="button" variant="outline" size="sm" onClick={onRetry} disabled={isRetrying}>
        {isRetrying ? t('retrying') : t('retry')}
      </Button>
    </div>
  );
}
