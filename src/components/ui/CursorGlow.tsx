"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

/** Soft lime glow that trails the pointer. Hidden on touch devices. */
export function CursorGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 250);
      y.set(e.clientY - 250);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden size-[500px] rounded-full bg-[radial-gradient(circle,rgb(255_95_0/0.08)_0%,transparent_65%)] [@media(pointer:fine)]:block"
    />
  );
}
