import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "required" })
    .min(2, { message: "min" })
    .max(100, { message: "max" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "required" })
    .email({ message: "invalid" })
    .max(254, { message: "max" }),
  company: z.string().trim().max(120, { message: "max" }).optional(),
  message: z
    .string()
    .trim()
    .min(1, { message: "required" })
    .min(10, { message: "min" })
    .max(2000, { message: "max" }),
  website: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
