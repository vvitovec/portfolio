'use client';

import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import ProjectCard from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type ProjectCard = {
  id: string;
  slug: string;
  title: string;
  year: number;
  tagline: string | null;
  descriptionShort: string | null;
  techStack: string[];
  coverImageUrl: string | null;
};

type ProjectsExplorerProps = {
  projects: ProjectCard[];
  blurDataURL: string;
};

const normalize = (value: string) => value.trim().toLowerCase();

const MAX_VISIBLE_TECH = 4;

const parseSearchParams = (params: URLSearchParams) => {
  const q = params.get('q')?.trim() ?? '';
  const techParam = params.get('tech')?.trim() ?? '';
  const tech = techParam
    ? techParam
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
        .filter((item, index, array) => array.indexOf(item) === index)
    : [];

  return { q, tech };
};

export default function ProjectsExplorer({ projects, blurDataURL }: ProjectsExplorerProps) {
  const t = useTranslations('projects');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { q: query, tech: selectedTech } = useMemo(
    () => parseSearchParams(searchParams),
    [searchParams],
  );

  const updateUrl = useCallback(
    (nextQuery: string, nextTech: string[]) => {
      const params = new URLSearchParams();
      if (nextQuery.trim()) {
        params.set('q', nextQuery.trim());
      }
      if (nextTech.length > 0) {
        params.set('tech', nextTech.join(','));
      }
      const next = params.toString();
      const current = searchParams.toString();
      if (next === current) return;
      router.replace(next ? `${pathname}?${next}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const techOptions = useMemo(() => {
    const map = new Map<string, string>();
    projects.forEach((project) => {
      project.techStack.forEach((tech) => {
        const key = normalize(tech);
        if (!map.has(key)) {
          map.set(key, tech);
        }
      });
    });
    return Array.from(map.values()).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const selectedTechOrdered = useMemo(() => {
    const order = new Map(techOptions.map((tech, index) => [tech, index]));
    const uniqueSelected = Array.from(new Set(selectedTech));
    return uniqueSelected.sort((a, b) => {
      const orderA = order.get(a) ?? Number.POSITIVE_INFINITY;
      const orderB = order.get(b) ?? Number.POSITIVE_INFINITY;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return a.localeCompare(b);
    });
  }, [selectedTech, techOptions]);

  const visibleTechOptions = useMemo(() => {
    const selectedSet = new Set(selectedTech);
    return techOptions.filter((tech) => !selectedSet.has(tech)).slice(0, MAX_VISIBLE_TECH);
  }, [techOptions, selectedTech]);

  const hasMoreTech = techOptions.length > MAX_VISIBLE_TECH;

  const filteredProjects = useMemo(() => {
    const normalizedQuery = normalize(query);
    const normalizedTech = selectedTech.map(normalize);

    return projects.filter((project) => {
      const titleMatch = normalize(project.title).includes(normalizedQuery);
      const taglineMatch = project.tagline
        ? normalize(project.tagline).includes(normalizedQuery)
        : false;
      const matchesQuery = normalizedQuery.length === 0 ? true : titleMatch || taglineMatch;

      const projectTech = project.techStack.map(normalize);
      const matchesTech =
        normalizedTech.length === 0
          ? true
          : normalizedTech.every((tech) => projectTech.includes(tech));

      return matchesQuery && matchesTech;
    });
  }, [projects, query, selectedTech]);

  const toggleTech = (tech: string) => {
    const nextSelected = selectedTech.includes(tech)
      ? selectedTech.filter((item) => item !== tech)
      : [...selectedTech, tech];
    updateUrl(query, nextSelected);
  };

  const clearFilters = () => {
    updateUrl('', []);
  };

  const hasFilters = query.trim().length > 0 || selectedTech.length > 0;

  const actionButtonClass =
    'w-full min-w-[12rem] justify-center shadow-sm transition-shadow motion-safe:transition-transform motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md';

  const renderTechButton = (tech: string) => {
    const isSelected = selectedTech.includes(tech);
    return (
      <button
        key={tech}
        type="button"
        onClick={() => toggleTech(tech)}
        className={cn(
          'focus-visible:ring-ring focus-visible:ring-offset-background rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.2em] uppercase transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          isSelected
            ? 'border-foreground bg-foreground text-background'
            : 'border-border bg-background text-muted-foreground hover:text-foreground',
        )}
        aria-pressed={isSelected}
      >
        {tech}
      </button>
    );
  };

  return (
    <div className="mt-10 space-y-8">
      <div className="border-border/60 bg-card/80 rounded-2xl border p-6 shadow-sm md:p-8">
        <div className="grid gap-6 md:grid-cols-[minmax(0,_1.4fr)_minmax(0,_1fr)_auto] md:items-start">
          <div className="space-y-2">
            <label
              htmlFor="project-search"
              className="text-muted-foreground text-xs tracking-widest uppercase"
            >
              {t('filters.searchLabel')}
            </label>
            <Input
              id="project-search"
              type="search"
              value={query}
              onChange={(event) => updateUrl(event.target.value, selectedTech)}
              placeholder={t('filters.searchPlaceholder')}
            />
          </div>
          <div className="space-y-3">
            <p className="text-muted-foreground text-xs tracking-widest uppercase">
              {t('filters.techLabel')}
            </p>
            {selectedTechOrdered.length > 0 ? (
              <div className="space-y-2">
                <p className="text-muted-foreground text-[11px] tracking-widest uppercase">
                  {t('filters.selectedLabel')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedTechOrdered.map((tech) => renderTechButton(tech))}
                </div>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-2">
              {visibleTechOptions.map((tech) => renderTechButton(tech))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!hasFilters}
              onClick={clearFilters}
              className={actionButtonClass}
            >
              {t('filters.clear')}
            </Button>
            {hasMoreTech ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button type="button" variant="outline" size="sm" className={actionButtonClass}>
                    {t('filters.moreButton')}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t('filters.moreTitle')}</DialogTitle>
                    <DialogDescription>{t('filters.moreDescription')}</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 max-h-[60vh] space-y-4 overflow-auto pr-2">
                    <div className="flex flex-wrap gap-2">
                      {techOptions.map((tech) => renderTechButton(tech))}
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <DialogClose asChild>
                      <Button type="button" variant="ghost">
                        {t('filters.moreClose')}
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            ) : null}
          </div>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="border-border/60 bg-card/80 rounded-2xl border p-8 text-center shadow-sm">
          <h2 className="font-display text-foreground text-2xl font-semibold">
            {t('filters.emptyTitle')}
          </h2>
          <p className="text-muted-foreground mt-3 text-sm">{t('filters.emptySubtitle')}</p>
          <Button asChild className="mt-6">
            <Link href="/contact">{t('filters.emptyCta')}</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              blurDataURL={blurDataURL}
              viewLabel={t('view')}
            />
          ))}
        </div>
      )}
    </div>
  );
}
