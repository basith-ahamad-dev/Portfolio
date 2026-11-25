"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/utils";

const VIEW = { once: true, margin: "0px 0px -80px 0px" } as const;

/**
 * Portrait entrance: a dashed frame draws in, a red curtain sweeps up and away to
 * uncover the photo (clip wipe + zoom settle), then the photo drifts with scroll (parallax).
 */
export function PortraitReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <div ref={ref} className="relative">
      {/* Dashed frame scales + fades in */}
      <motion.div
        aria-hidden="true"
        className="absolute -inset-3 -z-10 border border-dashed border-brand/60"
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VIEW}
        transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.5 }}
      />

      <motion.div
        className={className}
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={VIEW}
        transition={{ duration: 1.3, ease: EASE_OUT_EXPO }}
      >
        <motion.div
          className="relative -mt-[9%] h-[118%] w-full"
          style={{ y: drift }}
          initial={{ scale: 1.3 }}
          whileInView={{ scale: 1 }}
          viewport={VIEW}
          transition={{ duration: 1.8, ease: EASE_OUT_EXPO }}
        >
          {children}
        </motion.div>

        {/* Red curtain sweeping off the top */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 origin-top bg-brand"
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={VIEW}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.35 }}
        />
      </motion.div>
    </div>
  );
}
