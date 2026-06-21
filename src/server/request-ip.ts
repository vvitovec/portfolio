import "server-only";

import { isIP } from "node:net";

const IP_HEADERS = [
  "x-vercel-forwarded-for",
  "x-forwarded-for",
  "x-real-ip",
  "cf-connecting-ip",
];

function firstValidIp(value: string | null) {
  if (!value) {
    return null;
  }

  for (const candidate of value.split(",")) {
    const ip = candidate.trim();
    if (isIP(ip)) {
      return ip;
    }
  }

  return null;
}

export function getClientIp(request: Request) {
  for (const header of IP_HEADERS) {
    const ip = firstValidIp(request.headers.get(header));
    if (ip) {
      return ip;
    }
  }

  return "unknown";
}
