"use client";

import { motion, type Variants } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/utils";

const letter: Variants = {
  hidden: { y: "105%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay: i * 0.045 } }),
};

/**
 * Giant footer name: every letter rises out of a mask in turn when the footer scrolls into view.
 * The in-view trigger lives on the (unclipped) parent; the masked letters only inherit its state.
 */
export function Wordmark({ first, last }: { first: string; last: string }) {
  let n = 0;
  const letters = (word: string, accent: boolean) =>
    word.split("").map((ch, i) => (
      <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom leading-[1.02]">
        <motion.span custom={n++} variants={letter} className={accent ? "inline-block text-brand" : "inline-block text-fg"}>
          {ch}
        </motion.span>
      </span>
    ));

  return (
    <motion.p
      aria-hidden="true"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="-mb-[0.04em] select-none whitespace-nowrap px-[2.5vw] text-center font-display text-[15.5vw] leading-[1.02] tracking-tight"
    >
      {letters(first, false)}
      <span className="inline-block w-[0.22em]" />
      {letters(last, true)}
    </motion.p>
  );
}
