'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { CommentStatus } from '@/generated/prisma';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { trpc } from '@/trpc/react';

function formatDate(locale: string, value: Date | string | null) {
  if (!value) return '-';
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function statusVariant(status: CommentStatus) {
  if (status === CommentStatus.VISIBLE) return 'success';
  if (status === CommentStatus.PENDING_REVIEW || status === CommentStatus.BLOCKED) {
    return 'warning';
  }
  return 'default';
}

export default function AdminCommentsDashboard() {
  const t = useTranslations('admin.comments');
  const locale = useLocale();
  const utils = trpc.useUtils();
  const [status, setStatus] = useState<CommentStatus | 'ALL'>('ALL');
  const [search, setSearch] = useState('');
  const [replyTarget, setReplyTarget] = useState<{
    threadId: string;
    parentId: string;
  } | null>(null);
  const [replyBody, setReplyBody] = useState('');
  const [blockReason, setBlockReason] = useState('');

  const statuses = status === 'ALL' ? undefined : [status];
  const { data: comments, isLoading } = trpc.admin.comments.list.useQuery({
    statuses,
    limit: 150,
  });
  const { data: blocks } = trpc.admin.comments.blocks.useQuery();

  const invalidate = async () => {
    await Promise.all([
      utils.admin.comments.list.invalidate(),
      utils.admin.comments.blocks.invalidate(),
    ]);
  };

  const setStatusMutation = trpc.admin.comments.setStatus.useMutation({
    onSuccess: async () => {
      toast.success(t('toast.updated'));
      await invalidate();
    },
    onError: () => toast.error(t('toast.error')),
  });
  const hardDeleteMutation = trpc.admin.comments.hardDelete.useMutation({
    onSuccess: async () => {
      toast.success(t('toast.deleted'));
      await invalidate();
    },
    onError: () => toast.error(t('toast.error')),
  });
  const replyMutation = trpc.admin.comments.reply.useMutation({
    onSuccess: async () => {
      toast.success(t('toast.replied'));
      setReplyBody('');
      setReplyTarget(null);
      await invalidate();
    },
    onError: () => toast.error(t('toast.error')),
  });
  const blockIpMutation = trpc.admin.comments.blockIp.useMutation({
    onSuccess: async () => {
      toast.success(t('toast.blocked'));
      setBlockReason('');
      await invalidate();
    },
    onError: () => toast.error(t('toast.error')),
  });
  const unblockIpMutation = trpc.admin.comments.unblockIp.useMutation({
    onSuccess: async () => {
      toast.success(t('toast.unblocked'));
      await invalidate();
    },
    onError: () => toast.error(t('toast.error')),
  });

  const filteredComments = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!comments || !query) return comments ?? [];

    return comments.filter((comment) =>
      [
        comment.body,
        comment.authorName ?? '',
        comment.status,
        comment.thread.title,
        comment.thread.targetSlug,
        comment.moderationReason ?? '',
      ]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [comments, search]);

  const isMutating =
    setStatusMutation.isPending ||
    hardDeleteMutation.isPending ||
    replyMutation.isPending ||
    blockIpMutation.isPending ||
    unblockIpMutation.isPending;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-display text-foreground text-3xl font-semibold">{t('title')}</h1>
        <p className="text-muted-foreground">{t('subtitle')}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-[14rem_1fr]">
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as CommentStatus | 'ALL')}
          className="border-input bg-background h-11 rounded-xl border px-4 text-sm shadow-sm outline-none"
        >
          <option value="ALL">{t('filters.all')}</option>
          {Object.values(CommentStatus).map((item) => (
            <option key={item} value={item}>
              {t(`status.${item}`)}
            </option>
          ))}
        </select>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t('filters.search')}
        />
      </div>

      <div className="border-border bg-card/80 rounded-2xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('columns.comment')}</TableHead>
              <TableHead>{t('columns.thread')}</TableHead>
              <TableHead>{t('columns.status')}</TableHead>
              <TableHead>{t('columns.moderation')}</TableHead>
              <TableHead>{t('columns.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>{t('loading')}</TableCell>
              </TableRow>
            ) : filteredComments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>{t('empty')}</TableCell>
              </TableRow>
            ) : (
              filteredComments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell className="min-w-[18rem] align-top">
                    <p className="text-foreground font-medium">
                      {comment.authorName?.trim() || t('anonymous')}
                      {comment.isAdmin ? (
                        <span className="text-primary ml-2 text-xs tracking-[0.2em] uppercase">
                          {t('adminBadge')}
                        </span>
                      ) : null}
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {formatDate(locale, comment.createdAt)}
                    </p>
                    <p className="mt-3 line-clamp-4 text-sm whitespace-pre-wrap">{comment.body}</p>
                    {replyTarget?.parentId === comment.id ? (
                      <form
                        className="mt-4 space-y-3"
                        onSubmit={(event) => {
                          event.preventDefault();
                          replyMutation.mutate({
                            threadId: replyTarget.threadId,
                            parentId: replyTarget.parentId,
                            body: replyBody,
                          });
                        }}
                      >
                        <Textarea
                          value={replyBody}
                          onChange={(event) => setReplyBody(event.target.value)}
                          placeholder={t('reply.placeholder')}
                          className="min-h-24"
                        />
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" type="submit" disabled={isMutating}>
                            {t('reply.submit')}
                          </Button>
                          <Button
                            size="sm"
                            type="button"
                            variant="outline"
                            onClick={() => setReplyTarget(null)}
                          >
                            {t('reply.cancel')}
                          </Button>
                        </div>
                      </form>
                    ) : null}
                  </TableCell>
                  <TableCell className="align-top">
                    <p className="text-foreground font-medium">{comment.thread.title}</p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {comment.thread.targetType} / {comment.thread.targetSlug}
                    </p>
                    {comment.ipHash ? (
                      <p className="text-muted-foreground mt-2 max-w-[12rem] truncate text-xs">
                        {t('ipHash')}: {comment.ipHash}
                      </p>
                    ) : null}
                  </TableCell>
                  <TableCell className="align-top">
                    <Badge variant={statusVariant(comment.status)}>
                      {t(`status.${comment.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-[14rem] align-top text-xs">
                    <p>{comment.moderationStatus}</p>
                    {comment.moderationReason ? (
                      <p className="mt-1">{comment.moderationReason}</p>
                    ) : null}
                    {comment.moderationSource ? (
                      <p className="mt-1">{comment.moderationSource}</p>
                    ) : null}
                  </TableCell>
                  <TableCell className="align-top">
                    <div className="flex max-w-[18rem] flex-wrap gap-2">
                      {comment.status !== CommentStatus.VISIBLE ? (
                        <Button
                          size="sm"
                          type="button"
                          disabled={isMutating}
                          onClick={() =>
                            setStatusMutation.mutate({
                              id: comment.id,
                              status: CommentStatus.VISIBLE,
                            })
                          }
                        >
                          {t('actions.restore')}
                        </Button>
                      ) : null}
                      {comment.status !== CommentStatus.HIDDEN ? (
                        <Button
                          size="sm"
                          type="button"
                          variant="outline"
                          disabled={isMutating}
                          onClick={() =>
                            setStatusMutation.mutate({
                              id: comment.id,
                              status: CommentStatus.HIDDEN,
                            })
                          }
                        >
                          {t('actions.hide')}
                        </Button>
                      ) : null}
                      {comment.status !== CommentStatus.DELETED ? (
                        <Button
                          size="sm"
                          type="button"
                          variant="outline"
                          disabled={isMutating}
                          onClick={() =>
                            setStatusMutation.mutate({
                              id: comment.id,
                              status: CommentStatus.DELETED,
                            })
                          }
                        >
                          {t('actions.softDelete')}
                        </Button>
                      ) : null}
                      <Button
                        size="sm"
                        type="button"
                        variant="ghost"
                        disabled={isMutating}
                        onClick={() =>
                          setReplyTarget({
                            threadId: comment.threadId,
                            parentId: comment.id,
                          })
                        }
                      >
                        {t('actions.reply')}
                      </Button>
                      <Button
                        size="sm"
                        type="button"
                        variant="ghost"
                        disabled={isMutating || !comment.ipHash}
                        onClick={() =>
                          blockIpMutation.mutate({
                            commentId: comment.id,
                            reason: blockReason,
                          })
                        }
                      >
                        {t('actions.blockIp')}
                      </Button>
                      <Button
                        size="sm"
                        type="button"
                        variant="ghost"
                        disabled={isMutating}
                        onClick={() => hardDeleteMutation.mutate({ id: comment.id })}
                      >
                        {t('actions.hardDelete')}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <section className="grid gap-4 lg:grid-cols-[1fr_2fr]">
        <div className="border-border bg-card/80 rounded-2xl border p-5">
          <h2 className="font-display text-foreground text-2xl font-semibold">
            {t('blockReason.title')}
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">{t('blockReason.subtitle')}</p>
          <Input
            value={blockReason}
            onChange={(event) => setBlockReason(event.target.value)}
            placeholder={t('blockReason.placeholder')}
            className="mt-4"
          />
        </div>
        <div className="border-border bg-card/80 rounded-2xl border p-5">
          <h2 className="font-display text-foreground text-2xl font-semibold">
            {t('blocks.title')}
          </h2>
          <div className="mt-4 space-y-3">
            {!blocks || blocks.length === 0 ? (
              <p className="text-muted-foreground text-sm">{t('blocks.empty')}</p>
            ) : (
              blocks.map((block) => (
                <div
                  key={block.id}
                  className="border-border/60 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-mono text-xs">{block.ipHash}</p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {block.active ? t('blocks.active') : t('blocks.inactive')}
                      {block.reason ? ` - ${block.reason}` : ''}
                    </p>
                  </div>
                  {block.active ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={isMutating}
                      onClick={() => unblockIpMutation.mutate({ ipHash: block.ipHash })}
                    >
                      {t('blocks.unblock')}
                    </Button>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
