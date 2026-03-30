"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const gridSizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

type ProjectGalleryProps = {
  title: string;
  images: string[];
  blurDataURL?: string;
};

export default function ProjectGallery({
  title,
  images,
  blurDataURL,
}: ProjectGalleryProps) {
  const t = useTranslations("projects");
  const galleryImages = useMemo(
    () => images.filter((image) => image.length > 0),
    [images],
  );
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  if (galleryImages.length === 0) {
    return null;
  }

  const openAt = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
  };

  const next = () => {
    setActiveIndex((index) => (index + 1) % galleryImages.length);
  };

  const prev = () => {
    setActiveIndex((index) =>
      index === 0 ? galleryImages.length - 1 : index - 1,
    );
  };

  const activeImage = galleryImages[activeIndex];

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-foreground">
        {t("gallery.title")}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => openAt(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={t("gallery.open", { index: index + 1 })}
          >
            <Image
              src={image}
              alt={t("gallery.alt", { index: index + 1, title })}
              fill
              placeholder={blurDataURL ? "blur" : "empty"}
              blurDataURL={blurDataURL}
              sizes={gridSizes}
              className="object-cover transition-transform motion-safe:duration-500 motion-safe:transition-transform motion-reduce:transition-none group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity motion-safe:duration-300 motion-safe:transition-opacity motion-reduce:transition-none group-hover:opacity-100" />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl">
          <DialogTitle className="sr-only">{t("gallery.title")}</DialogTitle>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4"
              aria-label={t("gallery.close")}
            >
              {t("gallery.close")}
            </Button>
          </DialogClose>
          <div className="relative h-[60vh] w-full overflow-hidden rounded-2xl bg-muted">
            {activeImage ? (
              <Image
                src={activeImage}
                alt={t("gallery.alt", { index: activeIndex + 1, title })}
                fill
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-contain"
              />
            ) : null}
          </div>
          {galleryImages.length > 1 ? (
            <div className="mt-4 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={prev}
                aria-label={t("gallery.prev")}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                {t("gallery.prev")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={next}
                aria-label={t("gallery.next")}
              >
                {t("gallery.next")}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
