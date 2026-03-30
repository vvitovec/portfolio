import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide transition-colors duration-200",
  {
    variants: {
      variant: {
        default:
          "border-border/60 bg-muted/80 text-muted-foreground",
        success:
          "border-emerald-300/40 bg-emerald-50/60 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400",
        warning:
          "border-amber-300/40 bg-amber-50/60 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400",
        gold: "border-accent-gold/30 bg-accent-gold/10 text-accent-gold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
