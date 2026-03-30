"use client";

import { useCallback, useMemo } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight, Search, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

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
  const q = params.get("q")?.trim() ?? "";
  const techParam = params.get("tech")?.trim() ?? "";
  const tech = techParam
    ? techParam
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
        .filter((item, index, array) => array.indexOf(item) === index)
    : [];

  return { q, tech };
};

export default function ProjectsExplorer({
  projects,
  blurDataURL,
}: ProjectsExplorerProps) {
  const t = useTranslations("projects");
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
        params.set("q", nextQuery.trim());
      }
      if (nextTech.length > 0) {
        params.set("tech", nextTech.join(","));
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
    return techOptions
      .filter((tech) => !selectedSet.has(tech))
      .slice(0, MAX_VISIBLE_TECH);
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
      const matchesQuery =
        normalizedQuery.length === 0 ? true : titleMatch || taglineMatch;

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
    updateUrl("", []);
  };

  const hasFilters = query.trim().length > 0 || selectedTech.length > 0;

  const renderTechButton = (tech: string) => {
    const isSelected = selectedTech.includes(tech);
    return (
      <button
        key={tech}
        type="button"
        onClick={() => toggleTech(tech)}
        className={cn(
          "rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isSelected
            ? "border-accent-gold/40 bg-accent-gold/15 text-accent-gold"
            : "border-border/60 bg-background/60 text-muted-foreground hover:border-accent-gold/30 hover:text-foreground",
        )}
        aria-pressed={isSelected}
      >
        {isSelected && <span className="mr-1">&#x2715;</span>}
        {tech}
      </button>
    );
  };

  return (
    <div className="mt-12 space-y-8">
      {/* Filter bar */}
      <div className="rounded-2xl border border-border/40 bg-card/60 p-6 shadow-sm backdrop-blur-sm md:p-8">
        <div className="grid gap-6 md:grid-cols-[minmax(0,_1.4fr)_minmax(0,_1fr)_auto] md:items-start">
          <div className="space-y-2">
            <label
              htmlFor="project-search"
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            >
              {t("filters.searchLabel")}
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
              <input
                id="project-search"
                type="search"
                value={query}
                onChange={(event) =>
                  updateUrl(event.target.value, selectedTech)
                }
                placeholder={t("filters.searchPlaceholder")}
                className="h-11 w-full rounded-xl border border-border/60 bg-background/80 pl-10 pr-4 text-sm shadow-sm outline-none transition-all duration-300 placeholder:text-muted-foreground/50 focus:border-accent-gold/40 focus:ring-2 focus:ring-accent-gold/20"
              />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {t("filters.techLabel")}
            </p>
            {selectedTechOrdered.length > 0 ? (
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-accent-gold">
                  {t("filters.selectedLabel")}
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
              className="w-full min-w-[10rem] justify-center"
            >
              <X className="h-3.5 w-3.5" />
              {t("filters.clear")}
            </Button>
            {hasMoreTech ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full min-w-[10rem] justify-center"
                  >
                    {t("filters.moreButton")}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("filters.moreTitle")}</DialogTitle>
                    <DialogDescription>
                      {t("filters.moreDescription")}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 max-h-[60vh] space-y-4 overflow-auto pr-2">
                    <div className="flex flex-wrap gap-2">
                      {techOptions.map((tech) => renderTechButton(tech))}
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <DialogClose asChild>
                      <Button type="button" variant="ghost">
                        {t("filters.moreClose")}
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            ) : null}
          </div>
        </div>
      </div>

      {/* Results */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-border/40 bg-card/60 p-12 text-center shadow-sm backdrop-blur-sm">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            {t("filters.emptyTitle")}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {t("filters.emptySubtitle")}
          </p>
          <Button asChild variant="gold" className="mt-6">
            <Link href="/contact">{t("filters.emptyCta")}</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {filteredProjects.map((project) => {
            const summary = project.tagline ?? project.descriptionShort;
            return (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-card/60 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-accent-gold/20 hover:shadow-xl hover:shadow-accent-gold/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  {project.coverImageUrl ? (
                    <>
                      <Image
                        src={project.coverImageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        placeholder="blur"
                        blurDataURL={blurDataURL}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-muted/70" />
                  )}
                  {/* View label on hover */}
                  <div className="absolute inset-0 flex items-end p-5">
                    <span className="flex items-center gap-2 text-sm font-semibold text-white/90 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 translate-y-2">
                      {t("view")}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                  {/* Year pill */}
                  <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                    {project.year}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="space-y-1.5">
                    <h2 className="font-display text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-accent-gold">
                      {project.title}
                    </h2>
                    {summary ? (
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {summary}
                      </p>
                    ) : null}
                  </div>
                  {project.techStack.length > 0 ? (
                    <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2">
                      {project.techStack.slice(0, 5).map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
