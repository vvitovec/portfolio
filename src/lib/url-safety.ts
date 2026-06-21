const HTTP_PROTOCOLS = new Set(["http:", "https:"]);
const HTTPS_IMAGE_HOSTS = new Set(["storage.vvitovec.com"]);

export function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return HTTP_PROTOCOLS.has(url.protocol);
  } catch {
    return false;
  }
}

export function isRelativePath(value: string) {
  return value.startsWith("/") && !value.startsWith("//");
}

export function isSafePublicImageUrl(value: string) {
  const trimmed = value.trim();

  if (isRelativePath(trimmed)) {
    return true;
  }

  try {
    const url = new URL(trimmed);

    if (url.protocol !== "https:") {
      return false;
    }

    const hostname = url.hostname.toLowerCase();

    if (
      hostname === "public.blob.vercel-storage.com" ||
      hostname.endsWith(".public.blob.vercel-storage.com")
    ) {
      return true;
    }

    return HTTPS_IMAGE_HOSTS.has(hostname) && url.pathname.startsWith("/_projects/");
  } catch {
    return false;
  }
}

export function normalizeHttpUrl(value?: string | null) {
  const trimmed = value?.trim() ?? "";
  return trimmed && isHttpUrl(trimmed) ? trimmed : null;
}

export function normalizeSafePublicImageUrl(value?: string | null) {
  const trimmed = value?.trim() ?? "";
  return trimmed && isSafePublicImageUrl(trimmed) ? trimmed : null;
}
