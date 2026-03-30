import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background shadow-sm hover:shadow-md hover:opacity-90 active:scale-[0.98]",
        outline:
          "border border-border bg-transparent text-foreground hover:border-foreground/30 hover:bg-muted active:scale-[0.98]",
        ghost: "text-foreground hover:bg-muted active:scale-[0.98]",
        gold: "bg-accent-gold text-accent-gold-foreground shadow-sm hover:shadow-[0_4px_20px_oklch(0.78_0.155_75/0.25)] active:scale-[0.98]",
      },
      size: {
        default: "px-7 py-3",
        sm: "px-5 py-2 text-xs",
        lg: "px-9 py-4 text-base",
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
