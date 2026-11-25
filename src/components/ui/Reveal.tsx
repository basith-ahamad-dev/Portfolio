"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/utils";

type RevealProps = Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "transition"> & {
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
  scale?: number;
};

/** Fades + slides children in once they scroll into view. */
export function Reveal({ delay = 0, y = 28, x = 0, scale = 1, duration = 0.8, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
