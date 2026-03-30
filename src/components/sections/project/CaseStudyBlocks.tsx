import Image from "next/image";
import { Check } from "lucide-react";

import SectionReveal from "@/components/sections/project/SectionReveal";
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
    accent: "border-l-amber-400/60 dark:border-l-amber-500/40",
    icon: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    label: "text-amber-600 dark:text-amber-400",
  },
  solution: {
    accent: "border-l-emerald-400/60 dark:border-l-emerald-500/40",
    icon: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    label: "text-emerald-600 dark:text-emerald-400",
  },
  outcome: {
    accent: "border-l-accent-gold/60",
    icon: "bg-accent-gold/10 text-accent-gold",
    label: "text-accent-gold",
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
      <div className="rounded-2xl border border-border/40 bg-card/60 p-6 shadow-sm backdrop-blur-sm md:p-8">
        <div
          className={cn(
            "grid gap-6 md:grid-cols-[minmax(0,_1.1fr)_minmax(0,_0.9fr)]",
            isRight && "md:grid-cols-[minmax(0,_0.9fr)_minmax(0,_1.1fr)]",
          )}
        >
          <div className={cn("space-y-3", isRight && "md:order-2")}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/40 bg-muted shadow-sm">
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
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-gold">
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
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/40 bg-card/60 p-6 shadow-sm backdrop-blur-sm md:p-8">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border/40 bg-muted shadow-sm">
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-gold">
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
      <div className="space-y-3">
        <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
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
            <div
              key={block.id}
              className={cn(
                "rounded-2xl border border-border/40 border-l-4 bg-card/60 p-6 shadow-sm backdrop-blur-sm md:p-8",
                style.accent,
              )}
            >
              <div className="space-y-5">
                <div className="space-y-2">
                  {title ? (
                    <p className={cn("text-[11px] font-semibold uppercase tracking-[0.2em]", style.label)}>
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
                        className="flex items-start gap-3 rounded-xl border border-border/30 bg-background/50 p-4 text-sm text-muted-foreground shadow-sm"
                      >
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-gold/10 text-accent-gold">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </SectionReveal>
  );
}
