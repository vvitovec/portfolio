"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/trpc/react";

function formatDate(locale: string, value: Date | string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function NewsletterDashboard() {
  const t = useTranslations("admin.newsletter");
  const locale = useLocale();
  const [search, setSearch] = useState("");
  const { data: summary } = trpc.admin.newsletter.summary.useQuery();
  const { data: subscribers, isLoading: subscribersLoading } =
    trpc.admin.newsletter.subscribers.useQuery({ limit: 100 });
  const { data: sends } = trpc.admin.newsletter.sends.useQuery({ limit: 20 });
  const { data: events } = trpc.admin.newsletter.events.useQuery({ limit: 40 });

  const filteredSubscribers = useMemo(() => {
    if (!subscribers) return [];
    const query = search.trim().toLowerCase();
    if (!query) return subscribers;

    return subscribers.filter((subscriber) =>
      [subscriber.email, subscriber.status, subscriber.locale, subscriber.source ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [search, subscribers]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-foreground">
          {t("title")}
        </h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <SummaryCard label={t("summary.confirmed")} value={summary?.confirmed ?? 0} />
        <SummaryCard label={t("summary.pending")} value={summary?.pending ?? 0} />
        <SummaryCard
          label={t("summary.unsubscribed")}
          value={summary?.unsubscribed ?? 0}
        />
        <SummaryCard label={t("summary.sent")} value={summary?.sent ?? 0} />
        <SummaryCard label={t("summary.failed")} value={summary?.failed ?? 0} />
      </div>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              {t("subscribers.title")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("subscribers.subtitle")}
            </p>
          </div>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("subscribers.searchPlaceholder")}
            className="max-w-sm"
          />
        </div>
        <div className="rounded-2xl border border-border bg-card/80">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("subscribers.columns.email")}</TableHead>
                <TableHead>{t("subscribers.columns.status")}</TableHead>
                <TableHead>{t("subscribers.columns.locale")}</TableHead>
                <TableHead>{t("subscribers.columns.confirmedAt")}</TableHead>
                <TableHead>{t("subscribers.columns.lastSentAt")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribersLoading ? (
                <TableRow>
                  <TableCell colSpan={5}>{t("loading")}</TableCell>
                </TableRow>
              ) : filteredSubscribers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>{t("subscribers.empty")}</TableCell>
                </TableRow>
              ) : (
                filteredSubscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell className="font-medium">{subscriber.email}</TableCell>
                    <TableCell>
                      <StatusBadge status={subscriber.status} />
                    </TableCell>
                    <TableCell>{subscriber.locale.toUpperCase()}</TableCell>
                    <TableCell>
                      {formatDate(locale, subscriber.confirmedAt)}
                    </TableCell>
                    <TableCell>{formatDate(locale, subscriber.lastSentAt)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ActivityTable
          title={t("sends.title")}
          empty={t("sends.empty")}
          rows={
            sends?.map((send) => ({
              id: send.id,
              primary:
                send.post.translations.find((item) => item.locale === "cs")?.title ??
                send.post.slug,
              secondary: `${send.sentCount}/${send.recipientCount} ${t("sends.sentLabel")}`,
              status: send.status,
              date: formatDate(locale, send.createdAt),
            })) ?? []
          }
        />
        <ActivityTable
          title={t("events.title")}
          empty={t("events.empty")}
          rows={
            events?.map((event) => ({
              id: event.id,
              primary: event.toEmail,
              secondary: event.subject,
              status: event.status,
              date: formatDate(locale, event.createdAt),
            })) ?? []
          }
        />
      </section>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card/80 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl font-semibold text-foreground">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "CONFIRMED" || status === "SENT" || status === "COMPLETED") {
    return <Badge variant="success">{status}</Badge>;
  }

  if (status === "FAILED" || status === "UNSUBSCRIBED") {
    return <Badge variant="warning">{status}</Badge>;
  }

  return <Badge>{status}</Badge>;
}

function ActivityTable({
  title,
  empty,
  rows,
}: {
  title: string;
  empty: string;
  rows: {
    id: string;
    primary: string;
    secondary: string;
    status: string;
    date: string;
  }[];
}) {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-foreground">
        {title}
      </h2>
      <div className="rounded-2xl border border-border bg-card/80">
        <Table>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell>{empty}</TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <p className="font-medium text-foreground">{row.primary}</p>
                    <p className="max-w-sm truncate text-xs text-muted-foreground">
                      {row.secondary}
                    </p>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={row.status} />
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">
                    {row.date}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
