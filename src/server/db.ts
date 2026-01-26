import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL;
  const acceptSelfSigned =
    process.env.PRISMA_PG_ACCEPT_SELF_SIGNED === "true" ||
    process.env.PG_SSL_REJECT_UNAUTHORIZED === "false";

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. Provide a PostgreSQL connection string in the environment.",
    );
  }

  const adapter = new PrismaPg({
    connectionString: databaseUrl,
    ...(acceptSelfSigned ? { ssl: { rejectUnauthorized: false } } : {}),
  });

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
