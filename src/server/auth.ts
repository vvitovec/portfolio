import "server-only";

import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

const getAdminLogins = () =>
  (process.env.ADMIN_GITHUB_LOGINS ?? "")
    .split(",")
    .map((login) => login.trim().toLowerCase())
    .filter(Boolean);

const getProfileLogin = (profile: unknown) => {
  if (
    profile &&
    typeof profile === "object" &&
    "login" in profile &&
    typeof (profile as { login?: unknown }).login === "string"
  ) {
    return (profile as { login: string }).login;
  }

  return null;
};

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn({ profile }) {
      const login = getProfileLogin(profile)?.toLowerCase() ?? null;
      const allowlist = getAdminLogins();

      if (!login || allowlist.length === 0) {
        return false;
      }

      return allowlist.includes(login);
    },
    jwt({ token, profile }) {
      const profileLogin = getProfileLogin(profile);
      if (profileLogin) {
        token.login = profileLogin;
      }

      const allowlist = getAdminLogins();
      const login = typeof token.login === "string" ? token.login.toLowerCase() : "";
      token.isAdmin = Boolean(login && allowlist.includes(login));

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.login =
          typeof token.login === "string" ? token.login : null;
        session.user.isAdmin = Boolean(token.isAdmin);
      }

      return session;
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
