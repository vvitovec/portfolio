import { router } from "@/server/trpc/trpc";
import { adminProjectsRouter } from "@/server/trpc/routers/admin/projects";
import { adminWebsitesRouter } from "@/server/trpc/routers/admin/websites";

export const adminRouter = router({
  projects: adminProjectsRouter,
  websites: adminWebsitesRouter,
});
