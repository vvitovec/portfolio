import { z } from 'zod';

export const commentTargetTypeSchema = z.enum(['BLOG_POST', 'PROJECT']);
export type CommentTargetTypeInput = z.infer<typeof commentTargetTypeSchema>;

export const commentSubmitSchema = z.object({
  targetType: commentTargetTypeSchema,
  targetSlug: z.string().trim().min(1).max(160),
  parentId: z.string().trim().min(1).max(120).optional().nullable(),
  authorName: z.string().trim().max(80).optional().nullable(),
  body: z.string().trim().min(2).max(2000),
  locale: z.enum(['cs', 'en']).optional().default('cs'),
  website: z.string().trim().max(200).optional().nullable(),
});

export type CommentSubmitInput = z.infer<typeof commentSubmitSchema>;
