import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[3px] px-6 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 will-change-transform active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary: "split-hover bg-brand text-black",
  outline: "split-hover border border-line-strong text-fg",
  ghost: "text-muted hover:text-fg",
};

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant };

export function ButtonLink({ variant = "primary", className, children, ...rest }: Props) {
  return (
    <a className={buttonClasses(variant, className)} {...rest}>
      {children}
    </a>
  );
}
