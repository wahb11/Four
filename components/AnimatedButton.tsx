"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, useRef, type ButtonHTMLAttributes } from "react";
import { gsap } from "@/lib/gsap";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-display uppercase tracking-wide transition-all duration-300 relative overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-four-red focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-four-red text-four-cream hover:bg-four-deep shadow-[4px_4px_0_#151515] hover:shadow-[6px_6px_0_#151515] hover:-translate-y-0.5 hover:skew-x-[-2deg]",
        secondary:
          "bg-four-ink text-four-cream hover:bg-four-red shadow-[4px_4px_0_#9E2A2A] hover:-translate-y-0.5",
        outline:
          "border-2 border-four-ink bg-transparent text-four-ink hover:bg-four-ink hover:text-four-cream",
        ghost: "bg-transparent text-four-ink hover:text-four-red",
        cream:
          "bg-four-cream text-four-ink hover:bg-four-warm shadow-[4px_4px_0_#151515] hover:-translate-y-0.5",
      },
      size: {
        default: "h-12 px-8 text-sm",
        sm: "h-10 px-5 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface AnimatedButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  shine?: boolean;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, variant, size, asChild = false, shine = true, children, onClick, ...props }, ref) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    const classes = cn(buttonVariants({ variant, size, className }));

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = innerRef.current;
      if (el) {
        gsap.fromTo(el, { scale: 0.94 }, { scale: 1, duration: 0.35, ease: "back.out(2.5)" });
      }
      onClick?.(e);
    };

    if (asChild) {
      return (
        <Slot className={classes} ref={ref} data-cursor="hover" onClick={onClick as never} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={classes}
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        data-cursor="hover"
        onClick={handleClick}
        {...props}
      >
        {shine && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-500 group-hover:translate-x-full"
          />
        )}
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </button>
    );
  }
);
AnimatedButton.displayName = "AnimatedButton";

export { buttonVariants };
