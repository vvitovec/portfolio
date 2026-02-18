import "server-only";

import { put } from "@vercel/blob";

type VercelBlobOptions = {
  token?: string;
};

type BlobUploadInput = {
  project: string;
  name: string;
  data: Uint8Array;
  contentType?: string;
};

type BlobUploadResult = {
  url: string;
  key: string;
};

export class VercelBlob {
  private readonly token: string;

  constructor({ token }: VercelBlobOptions) {
    if (!token) {
      throw new Error("BLOB_READ_WRITE_TOKEN is missing.");
    }

    this.token = token;
  }

  async upload({
    project,
    name,
    data,
    contentType,
  }: BlobUploadInput): Promise<BlobUploadResult> {
    const normalizedProject = project.replace(/^\/+|\/+$/g, "");
    const normalizedName = name.replace(/^\/+|\/+$/g, "");
    const pathname = `${normalizedProject}/${normalizedName}`;

    const uploaded = await put(pathname, Buffer.from(data), {
      access: "public",
      token: this.token,
      addRandomSuffix: true,
      allowOverwrite: false,
      contentType,
    });

    return {
      url: uploaded.url,
      key: uploaded.pathname,
    };
  }
}
