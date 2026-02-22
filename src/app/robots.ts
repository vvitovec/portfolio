import type { MetadataRoute } from "next";

import { SITE_URL, toAbsoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/cs/admin/", "/en/admin/"],
      },
    ],
    sitemap: toAbsoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
