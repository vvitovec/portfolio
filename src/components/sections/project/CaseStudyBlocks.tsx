import Image from "next/image";
import { Check } from "lucide-react";

import SectionReveal from "@/components/sections/project/SectionReveal";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { CaseStudyBlock, CaseStudyImageBlock } from "@/types/case-study";

type CaseStudyBlocksProps = {
  blocks: CaseStudyBlock[];
  title: string;
  summary?: string;
  imageAltFallback: string;
  labels: {
    problem: string;
    solution: string;
    outcome: string;
    image: string;
  };
};

const blockStyles = {
  problem: {
    badgeVariant: "warning",
    surface: "bg-amber-50/40",
    accent: "border-amber-200/70",
  },
  solution: {
    badgeVariant: "success",
    surface: "bg-emerald-50/40",
    accent: "border-emerald-200/70",
  },
  outcome: {
    badgeVariant: "default",
    surface: "bg-slate-50/60",
    accent: "border-slate-200/70",
  },
} as const;

const hasText = (value?: string | null) => Boolean(value?.trim());

const hasBullets = (items?: string[]) =>
  Boolean(items?.some((item) => item.trim().length > 0));

const filterBullets = (items?: string[]) =>
  (items ?? []).map((item) => item.trim()).filter((item) => item.length > 0);

const shouldRenderBlock = (block: CaseStudyBlock) => {
  if (block.type === "problem" || block.type === "solution") {
    return hasText(block.body);
  }
  if (block.type === "outcome") {
    return hasText(block.body) || hasBullets(block.bullets);
  }
  if (block.type === "image") {
    return hasText(block.imageUrl);
  }
  return false;
};

const ImageBlock = ({
  block,
  label,
  imageAltFallback,
}: {
  block: CaseStudyImageBlock;
  label: string;
  imageAltFallback: string;
}) => {
  const title = block.title?.trim();
  const body = block.body?.trim();
  const caption = block.caption?.trim();
  const layout = block.layout ?? "full";
  const imageAlt = title || caption || imageAltFallback;

  if (layout === "left" || layout === "right") {
    const isRight = layout === "right";

    return (
      <Card className="rounded-2xl border border-border/60 bg-card/80 shadow-sm">
        <CardContent className="p-6 md:p-8">
          <div
            className={cn(
              "grid gap-6 md:grid-cols-[minmax(0,_1.1fr)_minmax(0,_0.9fr)]",
              isRight && "md:grid-cols-[minmax(0,_0.9fr)_minmax(0,_1.1fr)]",
            )}
          >
            <div className={cn("space-y-3", isRight && "md:order-2")}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
                <Image
                  src={block.imageUrl}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {caption ? (
                <p className="text-sm text-muted-foreground">{caption}</p>
              ) : null}
            </div>
            <div className="space-y-4 pt-2 md:pt-4">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {label}
                </p>
                {title ? (
                  <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                    {title}
                  </h3>
                ) : null}
              </div>
              {body ? (
                <p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground">
                  {body}
                </p>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border border-border/60 bg-card/80 shadow-sm">
      <CardContent className="space-y-6 p-6 md:p-8">
        <div className="space-y-3">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
            <Image
              src={block.imageUrl}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover"
            />
          </div>
          {caption ? (
            <p className="text-sm text-muted-foreground">{caption}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {label}
          </p>
          {title ? (
            <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
              {title}
            </h3>
          ) : null}
        </div>
        {body ? (
          <p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground">
            {body}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default function CaseStudyBlocks({
  blocks,
  title,
  summary,
  imageAltFallback,
  labels,
}: CaseStudyBlocksProps) {
  const filteredBlocks = blocks.filter((block) => shouldRenderBlock(block));

  if (filteredBlocks.length === 0) {
    return null;
  }

  return (
    <SectionReveal className="space-y-8">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          {title}
        </h2>
        {summary ? (
          <p className="text-sm text-muted-foreground">{summary}</p>
        ) : null}
      </div>
      <div className="space-y-8">
        {filteredBlocks.map((block) => {
          if (block.type === "image") {
            return (
              <ImageBlock
                key={block.id}
                block={block}
                label={labels.image}
                imageAltFallback={imageAltFallback}
              />
            );
          }

          const title = block.title?.trim();
          const displayTitle = title && title.length > 0 ? title : labels[block.type];
          const body = block.body?.trim();
          const bullets = block.type === "outcome" ? filterBullets(block.bullets) : [];
          const style = blockStyles[block.type];

          return (
            <Card
              key={block.id}
              className={cn(
                "rounded-2xl border border-border/60 shadow-sm",
                style.surface,
                style.accent,
              )}
            >
              <CardContent className="space-y-5 p-6 md:p-8">
                <div className="space-y-2">
                  {title ? (
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      {labels[block.type]}
                    </p>
                  ) : null}
                  <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                    {displayTitle}
                  </h3>
                </div>
                {body ? (
                  <p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                ) : null}
                {block.type === "outcome" && bullets.length > 0 ? (
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {bullets.map((item, index) => (
                      <li
                        key={`${block.id}-bullet-${index}`}
                        className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/70 p-4 text-sm text-muted-foreground shadow-sm"
                      >
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-foreground">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </SectionReveal>
  );
}
