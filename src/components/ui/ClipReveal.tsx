"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/utils";

/** Reveals its children with an upward clip-path wipe plus a subtle zoom settle. */
export function ClipReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay }}
    >
      <motion.div
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        transition={{ duration: 1.6, ease: EASE_OUT_EXPO, delay }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
