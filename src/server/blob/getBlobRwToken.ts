import "server-only";

export const MISSING_BLOB_RW_TOKEN_ERROR =
  "Missing BLOB_READ_WRITE_TOKEN in runtime env (Production?)";
export const MISSING_SELF_HOSTED_STORAGE_CONFIG_ERROR =
  "Missing self-hosted storage configuration in runtime env.";
const TOKEN_SUFFIX = "BLOB_READ_WRITE_TOKEN";

type SelfHostedStorageConfig = {
  baseUrl: string;
  bucket: string;
  serviceKey: string;
};

const trimTrailingSlash = (value: string) => value.replace(/\/+$/g, "");
const trimSlashes = (value: string) => value.replace(/^\/+|\/+$/g, "");

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

export function hasSelfHostedStorageConfig() {
  return Boolean(
    process.env.SELF_HOSTED_STORAGE_BASE_URL &&
      process.env.SELF_HOSTED_STORAGE_SERVICE_KEY &&
      process.env.SELF_HOSTED_STORAGE_BUCKET,
  );
}

export function getSelfHostedStorageConfig(): SelfHostedStorageConfig {
  const baseUrl = process.env.SELF_HOSTED_STORAGE_BASE_URL;
  const serviceKey = process.env.SELF_HOSTED_STORAGE_SERVICE_KEY;
  const bucket = process.env.SELF_HOSTED_STORAGE_BUCKET;

  if (!baseUrl || !serviceKey || !bucket) {
    throw new Error(MISSING_SELF_HOSTED_STORAGE_CONFIG_ERROR);
  }

  return {
    baseUrl: trimTrailingSlash(baseUrl),
    serviceKey,
    bucket: trimSlashes(bucket),
  };
}

const buildObjectApiUrl = (
  pathname: string,
  config: SelfHostedStorageConfig,
) => `${config.baseUrl}/object/${config.bucket}/${trimSlashes(pathname)}`;

export function buildSelfHostedPublicUrl(
  pathname: string,
  config = getSelfHostedStorageConfig(),
) {
  return `${config.baseUrl}/object/public/${config.bucket}/${trimSlashes(pathname)}`;
}

export async function uploadSelfHostedObject({
  pathname,
  body,
  contentType,
}: {
  pathname: string;
  body: ArrayBuffer;
  contentType: string;
}) {
  const config = getSelfHostedStorageConfig();
  const response = await fetch(buildObjectApiUrl(pathname, config), {
    method: "POST",
    headers: {
      authorization: `Bearer ${config.serviceKey}`,
      apikey: config.serviceKey,
      "content-type": contentType,
      "x-upsert": "true",
    },
    body,
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Self-hosted storage upload failed: ${response.status} ${message}`);
  }

  return {
    pathname: trimSlashes(pathname),
    url: buildSelfHostedPublicUrl(pathname, config),
  };
}

const getObjectPathFromUrl = (
  value: string,
  config: SelfHostedStorageConfig,
) => {
  try {
    const expected = new URL(
      `${config.baseUrl}/object/public/${config.bucket}/`,
    );
    const url = new URL(value);
    if (url.origin !== expected.origin) {
      return null;
    }
    if (!url.pathname.startsWith(expected.pathname)) {
      return null;
    }
    return trimSlashes(url.pathname.slice(expected.pathname.length));
  } catch {
    return null;
  }
};

export function isSelfHostedStorageUrl(value: string) {
  if (!hasSelfHostedStorageConfig()) {
    return false;
  }
  return getObjectPathFromUrl(value, getSelfHostedStorageConfig()) !== null;
}

export async function deleteSelfHostedStorageUrls(urls: string[]) {
  if (!hasSelfHostedStorageConfig()) {
    return;
  }

  const config = getSelfHostedStorageConfig();
  const objectPaths = Array.from(
    new Set(
      urls
        .map((value) => getObjectPathFromUrl(value, config))
        .filter((value): value is string => Boolean(value)),
    ),
  );

  for (const objectPath of objectPaths) {
    const response = await fetch(buildObjectApiUrl(objectPath, config), {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${config.serviceKey}`,
        apikey: config.serviceKey,
      },
      cache: "no-store",
    });

    if (
      !response.ok &&
      response.status !== 404 &&
      process.env.NODE_ENV !== "production"
    ) {
      const message = await response.text();
      console.error("Failed to delete self-hosted storage file", {
        objectPath,
        status: response.status,
        message,
      });
    }
  }
}
