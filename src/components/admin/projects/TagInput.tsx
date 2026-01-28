import { useState } from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type TagInputProps = {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  maxItems?: number;
  description?: string;
  removeLabel?: string;
};

export default function TagInput({
  label,
  value,
  onChange,
  placeholder,
  maxItems,
  description,
  removeLabel,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addTag = (rawValue: string) => {
    const next = rawValue.trim();
    if (!next) return;
    if (maxItems !== undefined && value.length >= maxItems) return;
    if (value.includes(next)) return;
    onChange([...value, next]);
    setInputValue("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((item) => item !== tag));
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <Input
        value={inputValue}
        placeholder={placeholder}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            addTag(inputValue);
          }
        }}
        onBlur={() => addTag(inputValue)}
      />
      {description ? (
        <p className="text-xs text-muted-foreground">{description}</p>
      ) : null}
      {value.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {value.map((tag) => (
            <Badge key={tag} className="flex items-center gap-2">
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="rounded-full text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={
                  removeLabel ? `${removeLabel} ${tag}` : `Remove ${tag}`
                }
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      ) : null}
    </div>
  );
}
