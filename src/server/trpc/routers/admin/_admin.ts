import { router } from '@/server/trpc/trpc';
import { adminBlogRouter } from '@/server/trpc/routers/admin/blog';
import { adminCommentsRouter } from '@/server/trpc/routers/admin/comments';
import { adminNewsletterRouter } from '@/server/trpc/routers/admin/newsletter';
import { adminProjectsRouter } from '@/server/trpc/routers/admin/projects';
import { adminWebsitesRouter } from '@/server/trpc/routers/admin/websites';

export const adminRouter = router({
  blog: adminBlogRouter,
  comments: adminCommentsRouter,
  newsletter: adminNewsletterRouter,
  projects: adminProjectsRouter,
  websites: adminWebsitesRouter,
});
