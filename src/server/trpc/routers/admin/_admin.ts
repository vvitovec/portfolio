import { router } from "@/server/trpc/trpc";
import { adminProjectsRouter } from "@/server/trpc/routers/admin/projects";

export const adminRouter = router({
  projects: adminProjectsRouter,
});
