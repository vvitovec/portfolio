const DEFAULT_BASE_URL = "https://www.vvitovec.com";

type CheckResult = {
  name: string;
  ok: boolean;
  detail: string;
};

const baseUrl = (process.env.SEO_AUDIT_BASE_URL ?? DEFAULT_BASE_URL).replace(
  /\/+$/,
  "",
);
const canonicalBaseUrl = (
  process.env.SEO_CANONICAL_BASE_URL ?? DEFAULT_BASE_URL
).replace(/\/+$/, "");

const pages = [
  "/cs",
  "/en",
  "/cs/projects",
  "/en/projects",
  "/cs/blog",
  "/en/blog",
  "/cs/ai-search-brief",
  "/en/ai-search-brief",
];

const results: CheckResult[] = [];

function record(name: string, ok: boolean, detail: string) {
  results.push({ name, ok, detail });
}

async function fetchText(pathname: string) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    headers: {
      "User-Agent": "portfolio-seo-audit/1.0 (+https://www.vvitovec.com)",
    },
  });
  const text = await response.text();

  return {
    response,
    text,
  };
}

function attr(html: string, selector: RegExp) {
  return selector.exec(html)?.[1] ?? "";
}

function jsonLdBlocks(html: string) {
  const blocks: unknown[] = [];
  const scriptPattern =
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;

  while ((match = scriptPattern.exec(html))) {
    const raw = match[1]
      ?.replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&")
      .trim();

    if (!raw) {
      continue;
    }

    try {
      blocks.push(JSON.parse(raw));
    } catch {
      blocks.push({ invalidJson: true });
    }
  }

  return blocks;
}

async function checkTextRoutes() {
  for (const pathname of ["/llms.txt", "/llms-full.txt"]) {
    try {
      const { response, text } = await fetchText(pathname);
      const contentType = response.headers.get("content-type") ?? "";

      record(
        `${pathname} returns text`,
        response.ok && contentType.includes("text/plain"),
        `${response.status} ${contentType}`,
      );
      record(
        `${pathname} has Viktor positioning`,
        /Viktor (Vitovec|Vítovec)/.test(text) && /AI automation/i.test(text),
        `${text.length} bytes`,
      );
      record(
        `${pathname} is not HTML`,
        !/<html[\s>]/i.test(text) && !/<body[\s>]/i.test(text),
        "plain text body",
      );
    } catch (error) {
      record(`${pathname} fetch`, false, String(error));
    }
  }
}

async function checkRobotsAndSitemap() {
  try {
    const { response, text } = await fetchText("/robots.txt");
    record("robots.txt available", response.ok, String(response.status));
    record("robots.txt links sitemap", /Sitemap:\s*https:\/\/www\.vvitovec\.com\/sitemap\.xml/i.test(text), "sitemap directive");
    record("robots.txt protects admin", /Disallow:\s*\/cs\/admin\//i.test(text) && /Disallow:\s*\/en\/admin\//i.test(text), "admin disallow");
  } catch (error) {
    record("robots.txt fetch", false, String(error));
  }

  try {
    const { response, text } = await fetchText("/sitemap.xml");
    record("sitemap.xml available", response.ok, String(response.status));
    record("sitemap contains AI brief", text.includes("/cs/ai-search-brief") && text.includes("/en/ai-search-brief"), "localized brief URLs");
    record("sitemap contains projects", text.includes("/cs/projects") && text.includes("/en/projects"), "project index URLs");
  } catch (error) {
    record("sitemap.xml fetch", false, String(error));
  }
}

async function checkPages() {
  for (const pathname of pages) {
    try {
      const { response, text } = await fetchText(pathname);
      const title = attr(text, /<title[^>]*>([^<]+)<\/title>/i);
      const description = attr(
        text,
        /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i,
      );
      const canonical = attr(
        text,
        /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i,
      );
      const jsonLd = jsonLdBlocks(text);
      const imageMissingAlt = /<img(?![^>]+alt=)[^>]*>/i.test(text);

      record(`${pathname} status`, response.ok, String(response.status));
      record(
        `${pathname} title`,
        title.length >= 10 && title.length <= 80 && !/\|\s*Viktor Vítovec\s*\|\s*Viktor Vítovec/.test(title),
        title || "missing",
      );
      record(
        `${pathname} description`,
        description.length >= 50 && description.length <= 180,
        description || "missing",
      );
      record(
        `${pathname} canonical`,
        canonical === `${canonicalBaseUrl}${pathname}`,
        canonical || "missing",
      );
      record(
        `${pathname} hreflang`,
        text.includes('hrefLang="cs-CZ"') || text.includes('hreflang="cs-CZ"'),
        "cs-CZ alternate",
      );
      record(
        `${pathname} JSON-LD`,
        jsonLd.length > 0 && !jsonLd.some((block) => typeof block === "object" && block !== null && "invalidJson" in block),
        `${jsonLd.length} block(s)`,
      );
      record(`${pathname} image alt`, !imageMissingAlt, imageMissingAlt ? "image without alt found" : "ok");
    } catch (error) {
      record(`${pathname} fetch`, false, String(error));
    }
  }
}

async function main() {
  console.log(`SEO audit target: ${baseUrl}`);
  await checkTextRoutes();
  await checkRobotsAndSitemap();
  await checkPages();

  const failed = results.filter((result) => !result.ok);
  const passed = results.length - failed.length;

  for (const result of results) {
    const marker = result.ok ? "PASS" : "FAIL";
    console.log(`${marker} ${result.name} - ${result.detail}`);
  }

  console.log(`\n${passed}/${results.length} checks passed`);

  if (failed.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
