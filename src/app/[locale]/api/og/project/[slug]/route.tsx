/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

import { type Locale as PrismaLocale } from "@/generated/prisma";
import { routing, type Locale as RoutingLocale } from "@/i18n/routing";
import { getPublishedProjectBySlug } from "@/server/queries/projects";

export const runtime = "nodejs";
export const revalidate = 300;

const size = {
  width: 1200,
  height: 630,
};

const clampText = (value: string, maxLength: number) =>
  value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value;

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{
      locale: string;
      slug: string;
    }>;
  },
) {
  const { locale: rawLocale, slug } = await params;
  const locale = routing.locales.includes(rawLocale as RoutingLocale)
    ? (rawLocale as PrismaLocale)
    : routing.defaultLocale;
  const project = await getPublishedProjectBySlug(slug, locale);

  if (!project) {
    return new Response("Not found", { status: 404 });
  }

  const tagline = (project.tagline ?? project.descriptionShort ?? "").trim();
  const summary = tagline ? clampText(tagline, 160) : "";
  const techStack = project.techStack.slice(0, 5);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          padding: "64px",
          background: "#f8fafc",
          color: "#0f172a",
          fontFamily: "Manrope, system-ui, sans-serif",
        }}
      >
        {project.coverImageUrl ? (
          <img
            src={project.coverImageUrl}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.18,
            }}
          />
        ) : null}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.92)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ maxWidth: "860px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                fontSize: "16px",
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "#64748b",
                fontWeight: 600,
              }}
            >
              Portfolio
            </div>
            <div
              style={{
                fontSize: "64px",
                fontWeight: 700,
                lineHeight: 1.05,
                color: "#0f172a",
              }}
            >
              {project.title}
            </div>
            {summary ? (
              <div
                style={{
                  fontSize: "28px",
                  color: "#475569",
                  lineHeight: 1.35,
                }}
              >
                {summary}
              </div>
            ) : null}
          </div>
          {techStack.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "999px",
                    border: "1px solid rgba(148,163,184,0.6)",
                    background: "rgba(255,255,255,0.85)",
                    fontSize: "16px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#0f172a",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    ),
    size,
  );
}
