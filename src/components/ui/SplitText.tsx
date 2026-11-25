"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";

type SplitTextProps = {
  text: string;
  /** Substring of `text` rendered in the brand colour. */
  accent?: string;
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  delay?: number;
  stagger?: number;
};

/** Headline whose words slide up out of a mask, one after the other, when scrolled into view. */
export function SplitText({ text, accent, as: Tag = "h2", id, className, delay = 0, stagger = 0.05 }: SplitTextProps) {
  const accentStart = accent ? text.indexOf(accent) : -1;
  const accentEnd = accentStart + (accent?.length ?? 0);

  let offset = 0;
  const words = text.split(" ").map((word) => {
    const start = offset;
    offset += word.length + 1;
    return { word, accent: accentStart >= 0 && start >= accentStart && start < accentEnd };
  });

  return (
    <Tag id={id} className={cn("font-display", className)}>
      {words.map((w, i) => (
        <Fragment key={`${w.word}-${i}`}>
          {i > 0 && " "}
          <span className="inline-block overflow-hidden pb-[0.07em] align-bottom">
            <motion.span
              className={cn("inline-block", w.accent && "text-brand-fg")}
              initial={{ y: "115%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: delay + i * stagger }}
            >
              {w.word}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
