"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";

import BlobImageUploader from "@/components/admin/BlobImageUploader";
import TagInput from "@/components/admin/projects/TagInput";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CaseStudyBlock, CaseStudyImageBlock } from "@/types/case-study";

type CaseStudyBuilderProps = {
  value: CaseStudyBlock[];
  onChange: (next: CaseStudyBlock[]) => void;
  locale: "cs" | "en";
  projectId?: string;
};

const badgeVariants = {
  problem: "warning",
  solution: "success",
  outcome: "default",
  image: "default",
} as const;

const createBlockId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `block_${Math.random().toString(36).slice(2, 10)}`;
};

const createImageBlock = (): CaseStudyImageBlock => ({
  id: createBlockId(),
  type: "image",
  title: "",
  body: "",
  imageUrl: "",
  caption: "",
  layout: "full",
});

const updateBlockAt = (
  blocks: CaseStudyBlock[],
  index: number,
  nextBlock: CaseStudyBlock,
) => {
  const next = [...blocks];
  next[index] = nextBlock;
  return next;
};

const moveBlock = (blocks: CaseStudyBlock[], from: number, to: number) => {
  if (to < 0 || to >= blocks.length) return blocks;
  const next = [...blocks];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

export default function CaseStudyBuilder({
  value,
  onChange,
  locale,
  projectId,
}: CaseStudyBuilderProps) {
  const t = useTranslations("admin.projects.caseStudy");
  const tProjects = useTranslations("projects");
  const blocks = value ?? [];
  const canUpload = Boolean(projectId);
  const typeLabels = {
    problem: tProjects("caseStudyBlocks.problem"),
    solution: tProjects("caseStudyBlocks.solution"),
    outcome: tProjects("caseStudyBlocks.outcome"),
    image: tProjects("caseStudyBlocks.image"),
  };

  return (
    <div className="space-y-4">
      {blocks.length === 0 ? (
        <p className="text-xs text-muted-foreground">{t("emptyState")}</p>
      ) : null}
      {blocks.map((block, index) => {
        const titleId = `${block.id}-title`;
        const bodyId = `${block.id}-body`;
        const captionId = `${block.id}-caption`;
        const layoutId = `${block.id}-layout`;

        const isFirst = index === 0;
        const isLast = index === blocks.length - 1;
        const canRemove = block.type === "image";

        return (
          <Card key={block.id} className="border-border/70 bg-card/80">
            <CardContent className="space-y-4 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant={badgeVariants[block.type]}>
                    {typeLabels[block.type]}
                  </Badge>
                  <div className="space-y-1">
                    <label className="text-xs font-medium" htmlFor={titleId}>
                      {t("titleLabel")}
                    </label>
                    <Input
                      id={titleId}
                      value={block.title ?? ""}
                      onChange={(event) =>
                        onChange(
                          updateBlockAt(blocks, index, {
                            ...block,
                            title: event.target.value,
                          }),
                        )
                      }
                      placeholder={t("titlePlaceholder")}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onChange(moveBlock(blocks, index, index - 1))}
                    disabled={isFirst}
                    aria-label={t("moveUp")}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onChange(moveBlock(blocks, index, index + 1))}
                    disabled={isLast}
                    aria-label={t("moveDown")}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  {canRemove ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        onChange(blocks.filter((_, itemIndex) => itemIndex !== index))
                      }
                      aria-label={t("removeSection")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  ) : null}
                </div>
              </div>

              {block.type === "image" ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      {t("imageLabel")}
                    </p>
                    {block.imageUrl ? (
                      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-muted">
                        <Image
                          src={block.imageUrl}
                          alt={block.title || t("imageAlt")}
                          fill
                          sizes="(max-width: 768px) 100vw, 60vw"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex min-h-[140px] items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-xs text-muted-foreground">
                        {t("imageEmpty")}
                      </div>
                    )}
                    <div className="flex flex-wrap items-center gap-2">
                      <BlobImageUploader
                        projectId={projectId ?? ""}
                        kind="case-study"
                        pathPrefix={
                          projectId
                            ? `projects/${projectId}/case-study/${locale}`
                            : undefined
                        }
                        onUploaded={(urls) => {
                          const nextUrl = urls[0] ?? "";
                          onChange(
                            updateBlockAt(blocks, index, {
                              ...block,
                              imageUrl: nextUrl,
                            }),
                          );
                        }}
                        buttonLabel={
                          block.imageUrl ? t("imageReplace") : t("imageUpload")
                        }
                        disabled={!canUpload}
                      />
                      {block.imageUrl ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            onChange(
                              updateBlockAt(blocks, index, {
                                ...block,
                                imageUrl: "",
                              }),
                            )
                          }
                        >
                          {t("imageClear")}
                        </Button>
                      ) : null}
                    </div>
                    {!canUpload ? (
                      <p className="text-xs text-muted-foreground">
                        {t("uploadUnavailable")}
                      </p>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium" htmlFor={captionId}>
                      {t("captionLabel")}
                    </label>
                    <Input
                      id={captionId}
                      value={block.caption ?? ""}
                      onChange={(event) =>
                        onChange(
                          updateBlockAt(blocks, index, {
                            ...block,
                            caption: event.target.value,
                          }),
                        )
                      }
                      placeholder={t("captionPlaceholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium" htmlFor={layoutId}>
                      {t("layoutLabel")}
                    </label>
                    <select
                      id={layoutId}
                      className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm shadow-sm"
                      value={block.layout ?? "full"}
                      onChange={(event) =>
                        onChange(
                          updateBlockAt(blocks, index, {
                            ...block,
                            layout: event.target
                              .value as CaseStudyImageBlock["layout"],
                          }),
                        )
                      }
                    >
                      <option value="full">{t("layoutFull")}</option>
                      <option value="left">{t("layoutLeft")}</option>
                      <option value="right">{t("layoutRight")}</option>
                    </select>
                  </div>
                </div>
              ) : null}

              {block.type !== "image" ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium" htmlFor={bodyId}>
                      {block.type === "outcome"
                        ? t("outcomeBodyLabel")
                        : t("bodyLabel")}
                    </label>
                    <Textarea
                      id={bodyId}
                      value={block.body ?? ""}
                      onChange={(event) =>
                        onChange(
                          updateBlockAt(blocks, index, {
                            ...block,
                            body: event.target.value,
                          }),
                        )
                      }
                      placeholder={t("bodyPlaceholder")}
                      rows={4}
                    />
                  </div>
                  {block.type === "outcome" ? (
                    <TagInput
                      label={t("bulletsLabel")}
                      value={block.bullets ?? []}
                      onChange={(nextBullets) =>
                        onChange(
                          updateBlockAt(blocks, index, {
                            ...block,
                            bullets: nextBullets,
                          }),
                        )
                      }
                      placeholder={t("bulletsPlaceholder")}
                      maxItems={10}
                      description={t("bulletsHelper")}
                      removeLabel={t("removeBullet")}
                    />
                  ) : null}
                </div>
              ) : null}

              {block.type === "image" ? (
                <div className="space-y-2">
                  <label className="text-xs font-medium" htmlFor={bodyId}>
                    {t("bodyLabel")}
                  </label>
                  <Textarea
                    id={bodyId}
                    value={block.body ?? ""}
                    onChange={(event) =>
                      onChange(
                        updateBlockAt(blocks, index, {
                          ...block,
                          body: event.target.value,
                        }),
                      )
                    }
                    placeholder={t("bodyPlaceholder")}
                    rows={3}
                  />
                </div>
              ) : null}
            </CardContent>
          </Card>
        );
      })}

      <div>
        <Button
          type="button"
          variant="outline"
          onClick={() => onChange([...blocks, createImageBlock()])}
          disabled={!canUpload}
        >
          {t("addImage")}
        </Button>
        {!canUpload ? (
          <p className="mt-2 text-xs text-muted-foreground">
            {t("uploadUnavailable")}
          </p>
        ) : null}
      </div>
    </div>
  );
}
