import { router } from "@/server/trpc/trpc";
import { adminBlogRouter } from "@/server/trpc/routers/admin/blog";
import { adminProjectsRouter } from "@/server/trpc/routers/admin/projects";
import { adminWebsitesRouter } from "@/server/trpc/routers/admin/websites";

export const adminRouter = router({
  blog: adminBlogRouter,
  projects: adminProjectsRouter,
  websites: adminWebsitesRouter,
});
