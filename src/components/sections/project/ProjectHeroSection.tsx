import ProjectCoverHero from "@/components/projects/ProjectCoverHero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SectionReveal from "@/components/sections/project/SectionReveal";
import { ExternalLink, Github } from "lucide-react";

type ProjectHeroSectionProps = {
  title: string;
  tagline?: string | null;
  role?: string | null;
  descriptionShort?: string | null;
  coverImageUrl?: string | null;
  coverAlt: string;
  blurDataURL?: string;
  techStack: string[];
  liveUrl?: string | null;
  repoUrl?: string | null;
  labels: {
    roleLabel: string;
    statusLabel: string;
    statusPublished: string;
    techStackLabel: string;
    linksLabel: string;
    liveLabel: string;
    repoLabel: string;
  };
};

export default function ProjectHeroSection({
  title,
  tagline,
  role,
  descriptionShort,
  coverImageUrl,
  coverAlt,
  blurDataURL,
  techStack,
  liveUrl,
  repoUrl,
  labels,
}: ProjectHeroSectionProps) {
  const quickFacts: Array<{ id: string; label: string; content: React.ReactNode }> = [];

  quickFacts.push({
    id: "status",
    label: labels.statusLabel,
    content: <Badge variant="success">{labels.statusPublished}</Badge>,
  });

  if (techStack.length > 0) {
    quickFacts.push({
      id: "tech",
      label: labels.techStackLabel,
      content: (
        <div className="flex flex-wrap items-center gap-2">
          {techStack.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
      ),
    });
  }

  if (liveUrl || repoUrl) {
    quickFacts.push({
      id: "links",
      label: labels.linksLabel,
      content: (
        <div className="flex flex-wrap items-center gap-2">
          {liveUrl ? (
            <Button asChild variant="gold" size="sm">
              <a href={liveUrl} target="_blank" rel="noreferrer noopener">
                <ExternalLink className="h-3.5 w-3.5" />
                {labels.liveLabel}
              </a>
            </Button>
          ) : null}
          {repoUrl ? (
            <Button asChild variant="outline" size="sm">
              <a href={repoUrl} target="_blank" rel="noreferrer noopener">
                <Github className="h-3.5 w-3.5" />
                {labels.repoLabel}
              </a>
            </Button>
          ) : null}
        </div>
      ),
    });
  }

  return (
    <SectionReveal className="space-y-10">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-5">
          {tagline ? (
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent-gold" />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-gold">
                {tagline}
              </p>
            </div>
          ) : null}
          <div className="space-y-4">
            <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {role ? (
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {labels.roleLabel}
                </span>{" "}
                {role}
              </p>
            ) : null}
            {descriptionShort ? (
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                {descriptionShort}
              </p>
            ) : null}
          </div>
        </div>
        {coverImageUrl ? (
          <ProjectCoverHero
            src={coverImageUrl}
            alt={coverAlt}
            blurDataURL={blurDataURL}
            priority
          />
        ) : null}
      </div>

      {quickFacts.length > 0 ? (
        <div className="rounded-2xl border border-border/40 bg-card/60 p-6 shadow-sm backdrop-blur-sm md:p-8">
          <div className="space-y-6">
            {quickFacts.map((fact, index) => (
              <div key={fact.id} className="space-y-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-gold">
                    {fact.label}
                  </p>
                  <div className="mt-3">{fact.content}</div>
                </div>
                {index < quickFacts.length - 1 ? (
                  <Separator className="bg-border/30" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </SectionReveal>
  );
}
