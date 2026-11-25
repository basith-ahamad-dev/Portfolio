"use client";

import { motion } from "framer-motion";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";

type DotsProps = {
  /** Number of lit segments. */
  filled: number;
  total?: number;
  /** Text alternative; omit to hide the meter from assistive tech (purely decorative). */
  label?: string;
  className?: string;
  segmentClassName?: string;
};

/** Segmented meter whose lit segments switch on one by one when scrolled into view. */
export function Dots({ filled, total = 10, label, className, segmentClassName }: DotsProps) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("flex gap-1", className)}
    >
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={cn("relative block h-3 flex-1 bg-fg/15", segmentClassName)}>
          {i < filled && (
            <motion.span
              className="absolute inset-0 origin-bottom bg-brand"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO, delay: 0.15 + i * 0.07 }}
            />
          )}
        </span>
      ))}
    </span>
  );
}
