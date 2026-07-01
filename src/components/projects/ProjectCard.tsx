import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/navigation';

export type ProjectCardItem = {
  id: string;
  slug: string;
  title: string;
  year: number;
  tagline: string | null;
  descriptionShort: string | null;
  techStack: string[];
  coverImageUrl: string | null;
};

type ProjectCardProps = {
  project: ProjectCardItem;
  blurDataURL: string;
  viewLabel: string;
  href?: string;
  priority?: boolean;
};

export default function ProjectCard({
  project,
  blurDataURL,
  viewLabel,
  href,
  priority = false,
}: ProjectCardProps) {
  const summary = project.tagline ?? project.descriptionShort;

  return (
    <Link
      href={href ?? `/projects/${project.slug}`}
      className="group border-border bg-card/80 hover:border-foreground/30 focus-visible:ring-ring focus-visible:ring-offset-background block rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <div className="border-border bg-muted relative aspect-[16/10] overflow-hidden rounded-2xl border">
        {project.coverImageUrl ? (
          <>
            <Image
              src={project.coverImageUrl}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={blurDataURL}
              priority={priority}
              className="object-cover transition-transform group-hover:scale-[1.03] motion-safe:transition-transform motion-safe:duration-500 motion-reduce:transition-none"
            />
            <div className="absolute inset-0 bg-black/45 opacity-0 transition-opacity group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-300 motion-reduce:transition-none" />
          </>
        ) : (
          <div className="bg-muted/70 absolute inset-0" />
        )}
        <div className="absolute inset-0 flex items-end justify-between p-4">
          <span className="text-xs font-semibold tracking-[0.2em] text-white/90 uppercase opacity-0 transition-opacity group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-300 motion-reduce:transition-none">
            {viewLabel}
          </span>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-foreground min-w-0 text-xl font-semibold">
            {project.title}
          </h2>
          <span className="text-muted-foreground shrink-0 text-right text-xs font-semibold tracking-[0.2em] uppercase">
            {project.year}
          </span>
        </div>
        {summary ? <p className="text-muted-foreground text-sm">{summary}</p> : null}
        {project.techStack.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            {project.techStack.slice(0, 5).map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
