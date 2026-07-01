'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { MessageCircle, Reply } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { CommentView } from '@/server/queries/comments';

type CommentsClientProps = {
  targetType: 'BLOG_POST' | 'PROJECT';
  targetSlug: string;
  initialComments: CommentView[];
};

type CommentsTranslator = ReturnType<typeof useTranslations>;

const AUTHOR_NAME_STORAGE_KEY = 'portfolio.commentAuthorName';

function formatDate(locale: string, value: Date | string) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function CommentsClient({
  targetType,
  targetSlug,
  initialComments,
}: CommentsClientProps) {
  const t = useTranslations('comments');
  const locale = useLocale();
  const [authorName, setAuthorName] = useState('');
  const [body, setBody] = useState('');
  const [website, setWebsite] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setAuthorName(localStorage.getItem(AUTHOR_NAME_STORAGE_KEY) ?? '');
  }, []);

  const commentCount = useMemo(() => countComments(initialComments), [initialComments]);

  async function submitComment({
    event,
    parentId,
  }: {
    event: FormEvent<HTMLFormElement>;
    parentId?: string | null;
  }) {
    event.preventDefault();
    const nextBody = parentId ? replyBody : body;

    if (nextBody.trim().length < 2) {
      toast.error(t('form.errorTooShort'));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetType,
          targetSlug,
          parentId,
          authorName,
          body: nextBody,
          locale,
          website,
        }),
      });
      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        status?: 'VISIBLE' | 'REVIEW' | 'RECEIVED';
        error?: { code?: string };
      } | null;

      if (!response.ok || !payload?.ok) {
        if (response.status === 429 || payload?.error?.code === 'rate_limited') {
          toast.error(t('form.errorRateLimit'));
        } else if (response.status === 403) {
          toast.error(t('form.errorBlocked'));
        } else {
          toast.error(t('form.errorGeneric'));
        }
        return;
      }

      const trimmedName = authorName.trim();
      if (trimmedName) {
        localStorage.setItem(AUTHOR_NAME_STORAGE_KEY, trimmedName);
      } else {
        localStorage.removeItem(AUTHOR_NAME_STORAGE_KEY);
      }

      if (parentId) {
        setReplyBody('');
        setReplyingTo(null);
      } else {
        setBody('');
      }

      if (payload.status === 'VISIBLE') {
        toast.success(t('form.successVisible'));
      } else {
        toast.success(t('form.successReview'));
      }

      router.refresh();
    } catch {
      toast.error(t('form.errorGeneric'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="border-border/70 mt-12 border-t pt-10" id="comments">
      <div className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-muted-foreground flex items-center gap-2 text-xs tracking-[0.2em] uppercase">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t('label')}
            </p>
            <h2 className="font-display text-foreground text-3xl font-semibold tracking-tight">
              {t('title')}
            </h2>
          </div>
          <Badge>{t('count', { count: commentCount })}</Badge>
        </div>

        <CommentForm
          t={t}
          authorName={authorName}
          body={body}
          website={website}
          isSubmitting={isSubmitting}
          submitLabel={t('form.submit')}
          submittingLabel={t('form.submitting')}
          onAuthorNameChange={setAuthorName}
          onBodyChange={setBody}
          onWebsiteChange={setWebsite}
          onSubmit={(event) => submitComment({ event })}
        />

        {initialComments.length === 0 ? (
          <div className="border-border/60 bg-card/70 text-muted-foreground rounded-2xl border p-6 text-sm">
            {t('empty')}
          </div>
        ) : (
          <div className="space-y-4">
            {initialComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                locale={locale}
                t={t}
                authorName={authorName}
                replyingTo={replyingTo}
                replyBody={replyBody}
                isSubmitting={isSubmitting}
                onReplyingToChange={setReplyingTo}
                onReplyBodyChange={setReplyBody}
                onAuthorNameChange={setAuthorName}
                onSubmitReply={(event, parentId) => submitComment({ event, parentId })}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CommentItem({
  comment,
  locale,
  t,
  authorName,
  replyingTo,
  replyBody,
  isSubmitting,
  onReplyingToChange,
  onReplyBodyChange,
  onAuthorNameChange,
  onSubmitReply,
}: {
  comment: CommentView;
  locale: string;
  t: CommentsTranslator;
  authorName: string;
  replyingTo: string | null;
  replyBody: string;
  isSubmitting: boolean;
  onReplyingToChange: (id: string | null) => void;
  onReplyBodyChange: (value: string) => void;
  onAuthorNameChange: (value: string) => void;
  onSubmitReply: (event: FormEvent<HTMLFormElement>, parentId: string) => void;
}) {
  const isReplying = replyingTo === comment.id;

  return (
    <div className="border-border/60 bg-card/70 rounded-2xl border p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-foreground font-medium">
            {comment.authorName?.trim() || t('anonymous')}
          </span>
          {comment.isAdmin ? <Badge variant="success">{t('adminBadge')}</Badge> : null}
        </div>
        <time className="text-muted-foreground text-xs">
          {formatDate(locale, comment.createdAt)}
        </time>
      </div>
      <p className="text-foreground/90 mt-3 text-sm leading-6 whitespace-pre-wrap">
        {comment.body}
      </p>
      <div className="mt-4">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onReplyingToChange(isReplying ? null : comment.id)}
        >
          <Reply className="mr-2 h-4 w-4" aria-hidden="true" />
          {t('reply')}
        </Button>
      </div>

      {isReplying ? (
        <form
          onSubmit={(event) => onSubmitReply(event, comment.id)}
          className="border-border/60 mt-4 space-y-4 border-t pt-4"
        >
          <div className="grid gap-4 sm:grid-cols-[14rem_1fr]">
            <Input
              value={authorName}
              onChange={(event) => onAuthorNameChange(event.target.value)}
              placeholder={t('form.namePlaceholder')}
              maxLength={80}
            />
            <Textarea
              value={replyBody}
              onChange={(event) => onReplyBodyChange(event.target.value)}
              placeholder={t('form.replyPlaceholder')}
              maxLength={2000}
              className="min-h-24"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="submit" size="sm" disabled={isSubmitting}>
              {isSubmitting ? t('form.submitting') : t('form.submitReply')}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => onReplyingToChange(null)}
            >
              {t('form.cancel')}
            </Button>
          </div>
        </form>
      ) : null}

      {comment.replies.length > 0 ? (
        <div className="border-border/60 mt-5 space-y-4 border-l pl-4 sm:pl-6">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              locale={locale}
              t={t}
              authorName={authorName}
              replyingTo={replyingTo}
              replyBody={replyBody}
              isSubmitting={isSubmitting}
              onReplyingToChange={onReplyingToChange}
              onReplyBodyChange={onReplyBodyChange}
              onAuthorNameChange={onAuthorNameChange}
              onSubmitReply={onSubmitReply}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CommentForm({
  t,
  authorName,
  body,
  website,
  isSubmitting,
  submitLabel,
  submittingLabel,
  onAuthorNameChange,
  onBodyChange,
  onWebsiteChange,
  onSubmit,
}: {
  t: CommentsTranslator;
  authorName: string;
  body: string;
  website: string;
  isSubmitting: boolean;
  submitLabel: string;
  submittingLabel: string;
  onAuthorNameChange: (value: string) => void;
  onBodyChange: (value: string) => void;
  onWebsiteChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="border-border/60 bg-card/80 rounded-2xl border p-5 shadow-sm"
    >
      <div className="grid gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="comment-author-name">
            {t('form.nameLabel')}
          </label>
          <Input
            id="comment-author-name"
            value={authorName}
            onChange={(event) => onAuthorNameChange(event.target.value)}
            placeholder={t('form.namePlaceholder')}
            maxLength={80}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="comment-body">
            {t('form.bodyLabel')}
          </label>
          <Textarea
            id="comment-body"
            value={body}
            onChange={(event) => onBodyChange(event.target.value)}
            placeholder={t('form.bodyPlaceholder')}
            maxLength={2000}
          />
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="comment-website">{t('form.websiteLabel')}</label>
          <input
            id="comment-website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => onWebsiteChange(event.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs">{t('form.helper')}</p>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? submittingLabel : submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}

function countComments(comments: CommentView[]): number {
  return comments.reduce((total, comment) => total + 1 + countComments(comment.replies), 0);
}
