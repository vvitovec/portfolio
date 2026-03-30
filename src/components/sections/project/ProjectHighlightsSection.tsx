import { Sparkles } from "lucide-react";

import SectionReveal from "@/components/sections/project/SectionReveal";

const MAX_HIGHLIGHTS = 6;

type ProjectHighlightsSectionProps = {
  title: string;
  highlights: string[];
};

export default function ProjectHighlightsSection({
  title,
  highlights,
}: ProjectHighlightsSectionProps) {
  const items = highlights.slice(0, MAX_HIGHLIGHTS);

  if (items.length === 0) {
    return null;
  }

  return (
    <SectionReveal className="space-y-8">
      <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
        {title}
      </h2>
      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {items.map((highlight) => (
          <div
            key={highlight}
            className="group flex min-h-[72px] items-center gap-4 rounded-2xl border border-border/40 bg-card/60 px-5 py-4 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-accent-gold/20 hover:shadow-md hover:shadow-accent-gold/5 md:min-h-[84px] md:px-6 md:py-5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-muted/80 text-accent-gold transition-all duration-300 group-hover:border-accent-gold/30 group-hover:shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
            <p className="text-sm font-medium leading-snug text-muted-foreground">
              {highlight}
            </p>
          </div>
        ))}
      </div>
    </SectionReveal>
  );
}
