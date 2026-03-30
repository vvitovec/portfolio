import { Sparkles } from "lucide-react";

import SectionReveal from "@/components/sections/project/SectionReveal";
import { Card, CardContent } from "@/components/ui/card";

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
    <SectionReveal className="space-y-6">
      <h2 className="font-display text-2xl font-semibold text-foreground">
        {title}
      </h2>
      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        {items.map((highlight) => (
          <Card key={highlight}>
            <CardContent className="flex min-h-[72px] items-center gap-4 px-5 py-4 md:min-h-[84px] md:px-6 md:py-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-foreground">
                <Sparkles className="h-4 w-4" />
              </div>
              <p className="text-sm font-medium leading-snug text-muted-foreground">
                {highlight}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionReveal>
  );
}
