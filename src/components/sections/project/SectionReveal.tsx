"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionReveal({ children, className }: SectionRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("space-y-6", className)}
    >
      {children}
    </motion.section>
  );
}
