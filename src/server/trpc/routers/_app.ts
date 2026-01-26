import { router } from "@/server/trpc/trpc";
import { adminRouter } from "@/server/trpc/routers/admin/_admin";
import { publicRouter } from "@/server/trpc/routers/public";

export const appRouter = router({
  admin: adminRouter,
  public: publicRouter,
});

export type AppRouter = typeof appRouter;
