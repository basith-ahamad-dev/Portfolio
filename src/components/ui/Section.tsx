import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  labelledBy?: string;
  /** `light` flips every colour token to the paper palette (see `.theme-light` in globals.css). */
  theme?: "dark" | "light";
  className?: string;
  innerClassName?: string;
  children: ReactNode;
};

/**
 * Page section with the dashed "blueprint" frame: a dashed rule on top and dashed
 * guide lines running down both edges of the content column (wide screens).
 * `overflow-clip` (not `hidden`) so a `position: sticky` child can still pin to the viewport.
 */
export function Section({ id, labelledBy, theme = "dark", className, innerClassName, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative overflow-clip border-t border-line-strong", theme === "light" && "theme-light", className)}
    >
      <div className={cn("container-x relative py-8 md:py-10", innerClassName)}>
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 hidden border-l border-line xl:block" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden border-r border-line xl:block" />
        {children}
      </div>
    </section>
  );
}
