"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type ProjectCoverHeroProps = {
  src: string;
  alt: string;
  blurDataURL?: string;
  priority?: boolean;
};

export default function ProjectCoverHero({
  src,
  alt,
  blurDataURL,
  priority,
}: ProjectCoverHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border/40 bg-muted shadow-2xl shadow-black/5 dark:shadow-black/20"
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        sizes="(max-width: 1024px) 100vw, 80vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </motion.div>
  );
}
