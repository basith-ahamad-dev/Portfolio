"use client";

import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";
import { cn } from "@/lib/utils";

/** Small eyebrow: index, a brand square, and a label whose last word is accented ("WORKING PROCESS"). */
export function SectionLabel({ index, label, className }: { index: string; label: string; className?: string }) {
  const words = label.split(" ");
  const last = words.pop();
  return (
    <p className={cn("flex items-center gap-3 font-display text-base tracking-wide sm:text-lg", className)}>
      <span className="font-mono text-xs tracking-widest text-muted">{index}</span>
      <span aria-hidden="true" className="size-2 bg-brand" />
      <span>
        {words.join(" ")} <span className="text-brand-fg">{last}</span>
      </span>
    </p>
  );
}

type Props = {
  index: string;
  badge: string;
  title: string;
  /** Substring of the title shown in the brand colour. */
  accent?: string;
  description?: string;
  id?: string;
  size?: "lg" | "md" | "sm";
};

export function SectionHeading({ index, badge, title, accent, description, id, size = "lg" }: Props) {
  return (
    <header
      className={cn(
        "mb-5 grid gap-3 md:mb-6",
        description && "lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-end lg:gap-16",
      )}
    >
      <div className="flex flex-col gap-4">
        <Reveal>
          <SectionLabel index={index} label={badge} />
        </Reveal>
        <SplitText
          id={id}
          text={title}
          accent={accent}
          className={cn(
            "text-balance leading-[0.98] tracking-tight",
            size === "lg" ? "text-[clamp(2rem,5vw,4.5rem)]" : size === "sm" ? "text-[clamp(1.5rem,3.2vw,2.75rem)]" : "text-[clamp(2rem,4.8vw,4.25rem)]",
          )}
        />
      </div>
      {description ? (
        <Reveal delay={0.25}>
          <p className="text-pretty border-l border-dashed border-line-strong pl-5 text-base leading-relaxed text-muted md:text-[17px]">
            {description}
          </p>
        </Reveal>
      ) : null}
    </header>
  );
}
