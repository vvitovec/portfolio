import crypto from "node:crypto";

import { NextResponse } from "next/server";

import {
  deleteSelfHostedStorageUrls,
  hasSelfHostedStorageConfig,
  uploadSelfHostedObject,
} from "@/server/blob/getBlobRwToken";
import { db } from "@/server/db";

export const runtime = "nodejs";

const TINY_PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aK9sAAAAASUVORK5CYII=";

const toArrayBuffer = (value: Uint8Array): ArrayBuffer => {
  const buffer = new ArrayBuffer(value.byteLength);
  new Uint8Array(buffer).set(value);
  return buffer;
};

export async function GET(request: Request) {
  const expectedKey = process.env.PREVIEW_CHECK_KEY;
  const providedKey = request.headers.get("x-preview-check-key");

  if (process.env.VERCEL_ENV !== "preview") {
    return NextResponse.json({ ok: false, error: "Preview only." }, { status: 403 });
  }

  if (!expectedKey || providedKey !== expectedKey) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 403 });
  }

  if (!hasSelfHostedStorageConfig()) {
    return NextResponse.json(
      { ok: false, error: "Missing self-hosted storage config." },
      { status: 500 },
    );
  }

  const projectCount = await db.project.count();
  const objectPath = `preview-check/${crypto.randomUUID()}.png`;
  const pngBytes = Uint8Array.from(Buffer.from(TINY_PNG_BASE64, "base64"));

  const uploaded = await uploadSelfHostedObject({
    pathname: objectPath,
    body: toArrayBuffer(pngBytes),
    contentType: "image/png",
  });

  const fetched = await fetch(uploaded.url, { cache: "no-store" });
  await deleteSelfHostedStorageUrls([uploaded.url]);
  const afterDelete = await fetch(uploaded.url, { cache: "no-store" });

  return NextResponse.json({
    ok: true,
    projectCount,
    uploadedUrl: uploaded.url,
    publicFetchStatus: fetched.status,
    postDeleteStatus: afterDelete.status,
  });
}
