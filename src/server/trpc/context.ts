import "server-only";

import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { Session } from "next-auth";

import { getServerAuthSession } from "@/server/auth";

export async function createTRPCContext(
  opts: FetchCreateContextFnOptions,
) {
  const session = await getServerAuthSession();

  return {
    req: opts.req,
    resHeaders: opts.resHeaders,
    session: session as Session | null,
  };
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
