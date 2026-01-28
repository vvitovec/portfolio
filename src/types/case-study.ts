import { z } from "zod";

import type { Locale } from "@/i18n/routing";

export type CaseStudyProblemBlock = {
  id: string;
  type: "problem" | "solution";
  title?: string;
  body: string;
};

export type CaseStudyOutcomeBlock = {
  id: string;
  type: "outcome";
  title?: string;
  body?: string;
  bullets?: string[];
};

export type CaseStudyImageBlock = {
  id: string;
  type: "image";
  title?: string;
  body?: string;
  imageUrl: string;
  caption?: string;
  layout?: "left" | "right" | "full";
};

export type CaseStudyBlock =
  | CaseStudyProblemBlock
  | CaseStudyOutcomeBlock
  | CaseStudyImageBlock;

const MAX_BLOCKS = 20;
const MAX_BODY_LENGTH = 4000;
const MAX_BULLETS = 10;
const MAX_BULLET_LENGTH = 140;
const MAX_TITLE_LENGTH = 200;
const MAX_CAPTION_LENGTH = 200;
const MAX_ID_LENGTH = 128;
const MAX_HIGHLIGHTS = 8;
const MAX_TAGLINE_LENGTH = 200;
const MAX_SHORT_DESCRIPTION_LENGTH = 400;
const MAX_ROLE_LENGTH = 200;

const optionalNullableString = (maxLength: number) =>
  z.preprocess(
    (value) => {
      if (typeof value !== "string") return value;
      const trimmed = value.trim();
      return trimmed.length === 0 ? null : trimmed;
    },
    z.string().max(maxLength).optional().nullable(),
  );

const blockBaseSchema = z.object({
  id: z.string().min(1).max(MAX_ID_LENGTH),
  title: z.string().trim().max(MAX_TITLE_LENGTH).optional(),
});

const problemSolutionSchema = blockBaseSchema.extend({
  type: z.enum(["problem", "solution"]),
  body: z.string().trim().max(MAX_BODY_LENGTH),
});

const outcomeSchema = blockBaseSchema.extend({
  type: z.literal("outcome"),
  body: z.string().trim().max(MAX_BODY_LENGTH).optional(),
  bullets: z
    .array(z.string().trim().min(1).max(MAX_BULLET_LENGTH))
    .max(MAX_BULLETS)
    .optional(),
});

const imageSchema = blockBaseSchema.extend({
  type: z.literal("image"),
  body: z.string().trim().max(MAX_BODY_LENGTH).optional(),
  imageUrl: z.string().trim().url().max(500),
  caption: z.string().trim().max(MAX_CAPTION_LENGTH).optional(),
  layout: z.enum(["left", "right", "full"]).optional(),
});

export const CaseStudyBlocksSchema = z
  .array(z.discriminatedUnion("type", [problemSolutionSchema, outcomeSchema, imageSchema]))
  .max(MAX_BLOCKS);

export const CaseStudyBlockStructuredSchema = z.object({
  id: z.string().min(1).max(MAX_ID_LENGTH),
  type: z.enum(["problem", "solution", "outcome", "image"]),
  title: z.string().max(MAX_TITLE_LENGTH).optional().nullable(),
  body: z.string().max(MAX_BODY_LENGTH).optional().nullable(),
  bullets: z
    .array(z.string().min(1).max(MAX_BULLET_LENGTH))
    .max(MAX_BULLETS)
    .optional()
    .nullable(),
  imageUrl: z.string().max(500).optional().nullable(),
  caption: z.string().max(MAX_CAPTION_LENGTH).optional().nullable(),
  layout: z.enum(["left", "right", "full"]).optional().nullable(),
});

export const CaseStudyBlocksStructuredSchema = z
  .array(CaseStudyBlockStructuredSchema)
  .max(30);

export const CaseStudyTranslationSchema = z.object({
  title: z.string().trim().min(1).max(160),
  tagline: optionalNullableString(MAX_TAGLINE_LENGTH),
  descriptionShort: optionalNullableString(MAX_SHORT_DESCRIPTION_LENGTH),
  role: optionalNullableString(MAX_ROLE_LENGTH),
  highlights: z
    .array(z.string().trim().min(1).max(200))
    .max(MAX_HIGHLIGHTS),
  caseStudyBlocks: CaseStudyBlocksSchema,
});

export const ProjectTranslationStructuredSchema = z.object({
  title: z.string().min(1).max(160),
  tagline: z.string().max(MAX_TAGLINE_LENGTH).optional().nullable(),
  descriptionShort: z
    .string()
    .max(MAX_SHORT_DESCRIPTION_LENGTH)
    .optional()
    .nullable(),
  role: z.string().max(MAX_ROLE_LENGTH).optional().nullable(),
  highlights: z.array(z.string().min(1).max(200)).max(MAX_HIGHLIGHTS),
  caseStudyBlocks: CaseStudyBlocksStructuredSchema,
});

export type CaseStudyTranslationPayload = z.infer<
  typeof CaseStudyTranslationSchema
>;

export type ProjectTranslationStructuredPayload = z.infer<
  typeof ProjectTranslationStructuredSchema
>;

const defaultTitles = {
  cs: {
    problem: "Problém",
    solution: "Řešení",
    outcome: "Výsledek",
  },
  en: {
    problem: "Problem",
    solution: "Solution",
    outcome: "Outcome",
  },
} as const;

const createBlockId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `block_${Math.random().toString(36).slice(2, 10)}`;
};

export const createDefaultCaseStudyBlocks = (locale: Locale): CaseStudyBlock[] => {
  const titles = locale === "en" ? defaultTitles.en : defaultTitles.cs;

  return [
    {
      id: createBlockId(),
      type: "problem",
      title: titles.problem,
      body: "",
    },
    {
      id: createBlockId(),
      type: "solution",
      title: titles.solution,
      body: "",
    },
    {
      id: createBlockId(),
      type: "outcome",
      title: titles.outcome,
      body: "",
    },
  ];
};
