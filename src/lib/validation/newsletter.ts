import { z } from "zod";

import { routing } from "@/i18n/routing";

export const newsletterSubscribeSchema = z.object({
  email: z
    .string({ required_error: "required" })
    .trim()
    .min(1, "required")
    .max(254, "max")
    .email("invalid")
    .transform((value) => value.toLowerCase()),
  locale: z.enum(routing.locales).default(routing.defaultLocale),
  source: z.string().trim().max(80).optional().default("blog"),
  website: z.string().trim().max(200).optional().default(""),
});

export type NewsletterSubscribeValues = z.infer<typeof newsletterSubscribeSchema>;
