import "server-only";

import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

const getAdminLogins = () =>
  (process.env.ADMIN_GITHUB_LOGINS ?? "")
    .split(",")
    .map((login) => login.trim().toLowerCase())
    .filter(Boolean);

const getAdminIds = () =>
  (process.env.ADMIN_GITHUB_IDS ?? "")
    .split(",")
    .map((id) => id.trim())
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

const getProfileId = (profile: unknown) => {
  if (profile && typeof profile === "object" && "id" in profile) {
    const id = (profile as { id?: unknown }).id;
    if (typeof id === "string" || typeof id === "number") {
      return String(id).trim();
    }
  }

  return null;
};

const isApprovedAdmin = ({
  githubId,
  login,
}: {
  githubId: string | null;
  login: string | null;
}) => {
  const adminIds = getAdminIds();
  if (adminIds.length > 0) {
    return Boolean(githubId && adminIds.includes(githubId));
  }

  const adminLogins = getAdminLogins();
  return Boolean(login && adminLogins.includes(login.toLowerCase()));
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
      const githubId = getProfileId(profile);

      return isApprovedAdmin({ githubId, login });
    },
    jwt({ token, profile }) {
      const profileLogin = getProfileLogin(profile);
      if (profileLogin) {
        token.login = profileLogin;
      }

      const profileId = getProfileId(profile);
      if (profileId) {
        token.githubId = profileId;
      }

      const login = typeof token.login === "string" ? token.login.toLowerCase() : "";
      const githubId =
        typeof token.githubId === "string" ? token.githubId : null;
      token.isAdmin = isApprovedAdmin({ githubId, login });

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
