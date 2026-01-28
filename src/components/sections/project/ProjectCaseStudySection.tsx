import Markdown from "@/components/content/Markdown";
import SectionReveal from "@/components/sections/project/SectionReveal";
import { Card, CardContent } from "@/components/ui/card";

type ProjectCaseStudySectionProps = {
  title: string;
  content?: string | null;
  summary?: string;
};

export default function ProjectCaseStudySection({
  title,
  content,
  summary,
}: ProjectCaseStudySectionProps) {
  if (!content?.trim()) {
    return null;
  }

  return (
    <SectionReveal className="space-y-6">
      <Card>
        <CardContent className="space-y-6 p-6 md:p-8">
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              {title}
            </h2>
            {summary ? (
              <p className="text-sm text-muted-foreground">{summary}</p>
            ) : null}
          </div>
          <div>
            <Markdown content={content} />
          </div>
        </CardContent>
      </Card>
    </SectionReveal>
  );
}
