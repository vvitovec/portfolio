import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-semibold uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-safe:duration-200 motion-safe:transition motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:opacity-90",
        outline: "border border-border bg-transparent text-foreground hover:bg-muted",
        ghost: "text-foreground hover:bg-muted",
      },
      size: {
        default: "px-6 py-3",
        sm: "px-4 py-2 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
