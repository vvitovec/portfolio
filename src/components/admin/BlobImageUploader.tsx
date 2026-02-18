"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

type ProgressState = {
  current: number;
  total: number;
  percentage: number;
};

type UploadResponse =
  | {
      url: string;
      key: string;
      success: true;
    }
  | {
      error: string;
    };

type BlobImageUploaderProps = {
  projectId: string;
  kind: "cover" | "gallery" | "screenshot" | "case-study";
  onUploaded: (urls: string[]) => void;
  buttonLabel: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  pathPrefix?: string;
};

export default function BlobImageUploader({
  projectId,
  kind,
  onUploaded,
  buttonLabel,
  multiple = false,
  disabled,
  className,
  pathPrefix,
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

        setProgress({ current, total, percentage: 0 });

        const formData = new FormData();
        formData.append("file", file);
        formData.append("projectId", projectId);
        formData.append("kind", kind);
        if (pathPrefix) {
          formData.append("pathPrefix", pathPrefix);
        }

        const response = await fetch("/api/admin/blob/upload", {
          method: "POST",
          body: formData,
        });
        const payload = (await response.json()) as UploadResponse;

        if (!response.ok || !("success" in payload) || !payload.success) {
          throw new Error(
            "error" in payload ? payload.error : "Upload failed",
          );
        }

        setProgress({ current, total, percentage: 100 });

        uploaded.push(payload.url);
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
