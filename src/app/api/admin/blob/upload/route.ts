import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { z } from "zod";

import { getServerAuthSession } from "@/server/auth";

const payloadSchema = z.object({
  projectId: z.string().min(1),
  kind: z.enum(["cover", "gallery"]),
});

const sanitizePathname = (pathname: string) => {
  if (pathname.includes("..") || pathname.includes("\\")) {
    return false;
  }
  return true;
};

export async function POST(request: Request) {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!session.user?.isAdmin) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const parsed = payloadSchema.safeParse(
          JSON.parse(clientPayload ?? "{}"),
        );
        if (!parsed.success) {
          throw new Error("Invalid client payload");
        }

        const { projectId } = parsed.data;

        if (!sanitizePathname(pathname)) {
          throw new Error("Invalid pathname");
        }
        if (!pathname.startsWith(`projects/${projectId}/`)) {
          throw new Error("Invalid pathname");
        }

        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/avif",
          ],
          maximumSizeInBytes: 15 * 1024 * 1024,
          addRandomSuffix: true,
          allowOverwrite: false,
          tokenPayload: clientPayload,
        };
      },
      onUploadCompleted: async ({ tokenPayload }) => {
        try {
          if (!tokenPayload) return;
          payloadSchema.parse(JSON.parse(tokenPayload));
        } catch {
          if (process.env.NODE_ENV === "development") {
            console.error("Invalid token payload");
          }
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch {
    return NextResponse.json({ error: "upload_not_allowed" }, { status: 400 });
  }
}
