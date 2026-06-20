import "server-only";

import { Prisma } from "@/generated/prisma";

const databaseUnavailableMessages = [
  "Can't reach database server",
  "Connection terminated",
  "Connection refused",
  "ETIMEDOUT",
  "ECONNRESET",
  "ECONNREFUSED",
  "does not exist in the current database",
];

const databaseUnavailableCodes = new Set([
  "P1001",
  "P1002",
  "P1008",
  "P1017",
  "P2021",
  "P2022",
]);

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export function isDatabaseUnavailableError(error: unknown): boolean {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return true;
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    databaseUnavailableCodes.has(error.code)
  ) {
    return true;
  }

  const message = getErrorMessage(error);

  return databaseUnavailableMessages.some((fragment) =>
    message.includes(fragment),
  );
}

export function logPublicQueryFallback(context: string, error: unknown) {
  console.error(`${context}; rendering public fallback without database data`, {
    message: getErrorMessage(error),
  });
}
