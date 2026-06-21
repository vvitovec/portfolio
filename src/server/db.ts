import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL;
  const acceptSelfSigned = shouldAcceptSelfSignedCertificate();

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. Provide a PostgreSQL connection string in the environment.",
    );
  }

  const adapter = new PrismaPg({
    connectionString: normalizePostgresConnectionString(databaseUrl),
    ...(acceptSelfSigned ? { ssl: { rejectUnauthorized: false } } : {}),
  });

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

const INSECURE_SSL_MODES = new Set(["prefer", "require", "verify-ca"]);

function shouldAcceptSelfSignedCertificate() {
  if (process.env.NODE_ENV === "production") {
    return false;
  }

  return (
    process.env.PRISMA_PG_ACCEPT_SELF_SIGNED === "true" ||
    process.env.PG_SSL_REJECT_UNAUTHORIZED === "false"
  );
}

function normalizePostgresConnectionString(databaseUrl: string) {
  try {
    const parsed = new URL(databaseUrl);
    const sslMode = parsed.searchParams.get("sslmode")?.toLowerCase();
    const useLibpqCompat = parsed.searchParams.get("uselibpqcompat") === "true";

    if (sslMode && INSECURE_SSL_MODES.has(sslMode) && !useLibpqCompat) {
      parsed.searchParams.set("sslmode", "verify-full");
    }

    return parsed.toString();
  } catch {
    return databaseUrl;
  }
}

function getPrismaClient() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }

  return globalForPrisma.prisma;
}

export const db = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getPrismaClient();
    const value = Reflect.get(client, prop, receiver);

    return typeof value === "function" ? value.bind(client) : value;
  },
});
