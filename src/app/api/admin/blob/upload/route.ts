import { TRPCError } from "@trpc/server";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getServerAuthSession } from "@/server/auth";
import { appRouter } from "@/server/trpc/routers/_app";
import { createCallerFactory } from "@/server/trpc/trpc";

export const runtime = "nodejs";

const kindSchema = z.enum(["cover", "gallery", "screenshot", "case-study"]);
const createCaller = createCallerFactory(appRouter);

async function parseUploadFormData(request: Request) {
  const formData = await request.formData();
  const projectId = formData.get("projectId");
  const kind = formData.get("kind");
  const file = formData.get("file");
  const pathPrefix = formData.get("pathPrefix");

  if (typeof projectId !== "string") {
    return null;
  }

  const parsedKind = kindSchema.safeParse(kind);
  if (!parsedKind.success || !(file instanceof File)) {
    return null;
  }

  return {
    projectId,
    kind: parsedKind.data,
    fileName: file.name || "image",
    fileType: file.type || "application/octet-stream",
    fileBuffer: new Uint8Array(await file.arrayBuffer()),
    pathPrefix:
      typeof pathPrefix === "string" && pathPrefix.trim().length > 0
        ? pathPrefix
        : undefined,
  };
}

export async function POST(request: Request) {
  try {
    const session = await getServerAuthSession();
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const parsedInput = await parseUploadFormData(request);
    if (!parsedInput) {
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    const caller = createCaller({
      req: request,
      resHeaders: new Headers(),
      session,
    });
    const blob = await caller.admin.projects.blobUpload(parsedInput);

    return NextResponse.json(
      {
        url: blob.url,
        key: blob.key,
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    if (
      error instanceof TRPCError &&
      (error.code === "UNAUTHORIZED" || error.code === "FORBIDDEN")
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    console.error("Blob upload API failed", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
