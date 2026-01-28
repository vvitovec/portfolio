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
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-border bg-muted"
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
      <div className="absolute inset-0 bg-black/20" />
    </motion.div>
  );
}
