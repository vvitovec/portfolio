import crypto from "node:crypto";

import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { z } from "zod";

import { slugify } from "@/lib/slugify";
import { getServerAuthSession } from "@/server/auth";
import {
  MISSING_BLOB_RW_TOKEN_ERROR,
  MISSING_SELF_HOSTED_STORAGE_CONFIG_ERROR,
  getBlobRwToken,
  hasSelfHostedStorageConfig,
  uploadSelfHostedObject,
} from "@/server/blob/getBlobRwToken";

export const runtime = "nodejs";

const kindSchema = z.enum(["cover", "gallery", "case-study"]);
const projectIdSchema = z
  .string()
  .trim()
  .min(1)
  .regex(/^[A-Za-z0-9_-]+$/);

const ALLOWED_BLOB_CONTENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const ALLOWED_BLOB_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp"]);
const EXTENSION_BY_CONTENT_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_BLOB_UPLOAD_SIZE_BYTES = 4.5 * 1024 * 1024;
const NO_STORE_HEADERS = { "Cache-Control": "no-store" };

type UploadSuccessResponse = {
  success: true;
  reqId: string;
  url: string;
  pathname: string;
  contentType: string;
  size: number;
};

type UploadErrorResponse = {
  success: false;
  error: string;
  reqId: string;
};

class UploadValidationError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "UploadValidationError";
    this.status = status;
  }
}

const sanitizeSensitive = (value: string) =>
  value
    .replace(/vercel_blob_rw_[A-Za-z0-9_-]+/g, "[REDACTED]")
    .replace(/Bearer\s+[A-Za-z0-9._-]+/gi, "Bearer [REDACTED]");

const normalizeBlobPrefix = (value: string) =>
  value.replace(/^\/+|\/+$/g, "").replace(/\/{2,}/g, "/");

const resolveBlobUploadPrefix = ({
  projectId,
  kind,
  pathPrefix,
}: {
  projectId: string;
  kind: z.infer<typeof kindSchema>;
  pathPrefix?: string;
}) => {
  const defaultPrefix = `projects/${projectId}/${kind}`;
  if (!pathPrefix) {
    return defaultPrefix;
  }

  const normalized = normalizeBlobPrefix(pathPrefix);
  const isInProjectScope =
    normalized === defaultPrefix || normalized.startsWith(`${defaultPrefix}/`);

  if (normalized.includes("..") || normalized.includes("\\") || !isInProjectScope) {
    throw new UploadValidationError("Invalid upload path.");
  }

  return normalized;
};

const toSafeBlobFileName = (fileName: string, fileType: string) => {
  const rawBase = fileName.replace(/\.[^/.]+$/, "");
  const safeBase = (slugify(rawBase) || "image").slice(0, 80);
  const extension = fileName.split(".").pop()?.toLowerCase();
  const normalizedExtension =
    extension && ALLOWED_BLOB_EXTENSIONS.has(extension)
      ? extension === "jpeg"
        ? "jpg"
        : extension
      : (EXTENSION_BY_CONTENT_TYPE[fileType] ?? "jpg");
  const uniqueSuffix = crypto.randomBytes(6).toString("hex");

  return `${safeBase}-${uniqueSuffix}.${normalizedExtension}`;
};

const toJson = (
  body: UploadSuccessResponse | UploadErrorResponse,
  status: number,
) =>
  NextResponse.json(body, {
    status,
    headers: {
      ...NO_STORE_HEADERS,
      "x-request-id": body.reqId,
    },
  });

async function parseUploadFormData(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    throw new UploadValidationError("Invalid multipart form data.");
  }

  const projectId = projectIdSchema.safeParse(formData.get("projectId"));
  if (!projectId.success) {
    throw new UploadValidationError("Invalid project identifier.");
  }

  const kind = kindSchema.safeParse(formData.get("kind"));
  if (!kind.success) {
    throw new UploadValidationError("Invalid upload kind.");
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    throw new UploadValidationError("Missing file.");
  }

  if (!ALLOWED_BLOB_CONTENT_TYPES.has(file.type)) {
    throw new UploadValidationError("Unsupported file type.");
  }

  if (file.size === 0) {
    throw new UploadValidationError("File is empty.");
  }

  if (file.size > MAX_BLOB_UPLOAD_SIZE_BYTES) {
    throw new UploadValidationError(
      "File too large for server upload (limit 4.5MB). Please compress the image.",
      413,
    );
  }

  const pathPrefixRaw = formData.get("pathPrefix");
  const pathPrefix =
    typeof pathPrefixRaw === "string" && pathPrefixRaw.trim().length > 0
      ? pathPrefixRaw
      : undefined;

  const uploadPrefix = resolveBlobUploadPrefix({
    projectId: projectId.data,
    kind: kind.data,
    pathPrefix,
  });
  const safeFileName = toSafeBlobFileName(file.name || "image", file.type);
  const pathname = `${uploadPrefix}/${safeFileName}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return {
    buffer,
    file,
    pathname,
  };
}

export async function POST(request: Request) {
  const reqId = crypto.randomUUID();

  try {
    const session = await getServerAuthSession();
    if (!session?.user?.isAdmin) {
      return toJson({ success: false, error: "Unauthorized", reqId }, 403);
    }

    const parsedInput = await parseUploadFormData(request);

    const uploaded = hasSelfHostedStorageConfig()
      ? await uploadSelfHostedObject({
          pathname: parsedInput.pathname,
          body: parsedInput.buffer,
          contentType: parsedInput.file.type,
        })
      : await (async () => {
          const token = getBlobRwToken();
          const blob = await put(parsedInput.pathname, parsedInput.buffer, {
            access: "public",
            token,
            addRandomSuffix: false,
            allowOverwrite: false,
            contentType: parsedInput.file.type,
          });
          return {
            url: blob.url,
            pathname: blob.pathname,
          };
        })();

    return toJson(
      {
        success: true,
        reqId,
        url: uploaded.url,
        pathname: uploaded.pathname,
        contentType: parsedInput.file.type,
        size: parsedInput.file.size,
      },
      200,
    );
  } catch (error) {
    if (error instanceof UploadValidationError) {
      return toJson(
        { success: false, error: error.message, reqId },
        error.status,
      );
    }

    const rawMessage = error instanceof Error ? error.message : "Unknown error";
    const rawStack = error instanceof Error ? error.stack : undefined;
    const message = sanitizeSensitive(rawMessage);
    const stack = rawStack ? sanitizeSensitive(rawStack) : undefined;
    console.error("[blob-upload]", { reqId, message, stack });

    if (rawMessage === MISSING_BLOB_RW_TOKEN_ERROR) {
      return toJson(
        {
          success: false,
          error: "Missing BLOB_READ_WRITE_TOKEN in runtime env (Production?)",
          reqId,
        },
        500,
      );
    }

    if (rawMessage === MISSING_SELF_HOSTED_STORAGE_CONFIG_ERROR) {
      return toJson(
        {
          success: false,
          error: "Missing self-hosted storage configuration in runtime env.",
          reqId,
        },
        500,
      );
    }

    if (
      rawMessage.includes("No token found") ||
      rawMessage.includes("Access denied")
    ) {
      return toJson({ success: false, error: message, reqId }, 500);
    }

    return toJson({ success: false, error: "Upload failed", reqId }, 500);
  }
}
