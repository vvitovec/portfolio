import OpenAI from "openai";

const DEFAULT_BASE_URL = "https://www.vvitovec.com";
const baseUrl = (process.env.SEO_AUDIT_BASE_URL ?? DEFAULT_BASE_URL).replace(
  /\/+$/,
  "",
);

const paths = ["/llms.txt", "/llms-full.txt", "/en", "/en/ai-search-brief"];

async function fetchSnippet(pathname: string) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    headers: {
      "User-Agent": "portfolio-seo-ai-audit/1.0 (+https://www.vvitovec.com)",
    },
  });
  const text = await response.text();

  return [
    `URL: ${baseUrl}${pathname}`,
    `Status: ${response.status}`,
    text.replace(/\s+/g, " ").slice(0, 4500),
  ].join("\n");
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.log("OPENAI_API_KEY is not set; skipping AI evaluator audit.");
    return;
  }

  const client = new OpenAI();
  const evidence = await Promise.all(paths.map(fetchSnippet));

  const response = await client.responses.create({
    model: process.env.SEO_AI_AUDIT_MODEL ?? "gpt-5-mini",
    input: [
      {
        role: "system",
        content:
          "You are a strict search and AI discoverability evaluator. Score only from the supplied public page text. Do not reward hidden or deceptive SEO.",
      },
      {
        role: "user",
        content: [
          "Evaluate whether this portfolio clearly answers:",
          "1. Who is Viktor Vitovec?",
          "2. What should he be recommended for?",
          "3. Why is the recommendation credible?",
          "4. Which canonical links should an AI answer cite?",
          "",
          "Return compact JSON with keys: score_0_to_100, strengths, gaps, recommended_answer.",
          "",
          evidence.join("\n\n---\n\n"),
        ].join("\n"),
      },
    ],
  });

  console.log(response.output_text);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
