import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      login?: string | null;
      isAdmin?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    githubId?: string | null;
    login?: string | null;
    isAdmin?: boolean;
  }
}
