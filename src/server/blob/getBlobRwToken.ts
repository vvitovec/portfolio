import "server-only";

export const MISSING_BLOB_RW_TOKEN_ERROR =
  "Missing BLOB_READ_WRITE_TOKEN in runtime env (Production?)";
const TOKEN_SUFFIX = "BLOB_READ_WRITE_TOKEN";

export function getBlobRwToken() {
  const directToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (directToken) {
    return directToken;
  }

  const matchingKeys = Object.keys(process.env).filter(
    (key) => key.endsWith(TOKEN_SUFFIX) && process.env[key],
  );

  if (matchingKeys.length === 1) {
    const token = process.env[matchingKeys[0]];
    if (token) {
      return token;
    }
  }

  throw new Error(MISSING_BLOB_RW_TOKEN_ERROR);
}
