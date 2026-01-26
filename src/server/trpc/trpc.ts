import "server-only";

import { TRPCError, initTRPC } from "@trpc/server";
import { ZodError } from "zod";
import superjson from "superjson";

import type { TRPCContext } from "@/server/trpc/context";
import { checkAdminSession } from "@/server/auth/requireAdmin";

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;

const adminMiddleware = t.middleware(({ ctx, next }) => {
  const result = checkAdminSession(ctx.session);

  if (!result.ok) {
    throw new TRPCError({
      code: result.reason === "UNAUTHORIZED" ? "UNAUTHORIZED" : "FORBIDDEN",
    });
  }

  return next({ ctx });
});

export const adminProcedure = t.procedure.use(adminMiddleware);
