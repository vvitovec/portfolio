import "server-only";

import type { Session } from "next-auth";

export type AdminGuardResult =
  | { ok: true }
  | { ok: false; reason: "UNAUTHORIZED" | "FORBIDDEN" };

export function checkAdminSession(session: Session | null | undefined): AdminGuardResult {
  if (!session) {
    return { ok: false, reason: "UNAUTHORIZED" };
  }

  if (!session.user?.isAdmin) {
    return { ok: false, reason: "FORBIDDEN" };
  }

  return { ok: true };
}
