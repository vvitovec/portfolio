"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/slugify";
import { cn } from "@/lib/utils";

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const TYPE_EXTENSION_MAP: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "avif"]);

type ProgressState = {
  current: number;
  total: number;
  percentage: number;
};

type BlobImageUploaderProps = {
  projectId: string;
  kind: "cover" | "gallery";
  onUploaded: (urls: string[]) => void;
  buttonLabel: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
};

function getSafeBaseName(filename: string) {
  const name = filename.replace(/\.[^/.]+$/, "");
  const slug = slugify(name);
  return slug.length > 0 ? slug : "image";
}

function getExtension(file: File) {
  const byType = TYPE_EXTENSION_MAP[file.type];
  if (byType) {
    return byType;
  }

  const raw = file.name.split(".").pop()?.toLowerCase();
  if (raw && ALLOWED_EXTENSIONS.has(raw)) {
    return raw === "jpeg" ? "jpg" : raw;
  }

  return "jpg";
}

export default function BlobImageUploader({
  projectId,
  kind,
  onUploaded,
  buttonLabel,
  multiple = false,
  disabled,
  className,
}: BlobImageUploaderProps) {
  const t = useTranslations("admin.projects");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<ProgressState | null>(null);

  const handleSelect = () => {
    inputRef.current?.click();
  };

  const handleFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);

    setIsUploading(true);
    const uploaded: string[] = [];

    try {
      for (let index = 0; index < fileList.length; index += 1) {
        const file = fileList[index];
        const current = index + 1;
        const total = fileList.length;

        const baseName = getSafeBaseName(file.name);
        const extension = getExtension(file);
        const pathname = `projects/${projectId}/${kind}/${baseName}.${extension}`;

        setProgress({ current, total, percentage: 0 });

        const result = await upload(pathname, file, {
          access: "public",
          handleUploadUrl: "/api/admin/blob/upload",
          clientPayload: JSON.stringify({ projectId, kind }),
          contentType: file.type || undefined,
          onUploadProgress: ({ percentage }) => {
            setProgress({
              current,
              total,
              percentage: Math.round(percentage),
            });
          },
        });

        uploaded.push(result.url);
      }

      if (uploaded.length > 0) {
        onUploaded(uploaded);
      }
    } catch {
      toast.error(t("toast.error"));
    } finally {
      setIsUploading(false);
      setProgress(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        multiple={multiple}
        onChange={handleFiles}
        className="hidden"
        disabled={disabled || isUploading}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleSelect}
        disabled={disabled || isUploading}
      >
        {buttonLabel}
      </Button>
      {progress ? (
        <div className="space-y-1" aria-live="polite">
          <p className="text-xs text-muted-foreground">
            {t("media.uploading", {
              current: progress.current,
              total: progress.total,
              percent: progress.percentage,
            })}
          </p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-foreground motion-safe:transition-[width] motion-safe:duration-300 motion-reduce:transition-none"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
