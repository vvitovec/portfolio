import { publicProcedure, router } from "@/server/trpc/trpc";

export const publicRouter = router({
  health: publicProcedure.query(() => ({
    ok: true,
  })),
});
