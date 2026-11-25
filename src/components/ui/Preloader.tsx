"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { EASE_OUT_EXPO } from "@/lib/utils";

const DURATION = 1800; // ms for the counter to reach 100

/**
 * Full-screen intro: a big 0-100 counter, the name rising out of a mask, and a red progress line.
 * When it hits 100 the whole panel wipes upward to reveal the page. Scrolling is locked meanwhile.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  useEffect(() => {
    if (reduce) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      // ease-in-out so it lingers a touch at the start and end
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setCount(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setVisible(false), 250);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = prev;
    };
  }, [reduce]);

  // Release the scroll lock as soon as the panel starts leaving.
  useEffect(() => {
    if (!visible) document.documentElement.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && !reduce && (
        <motion.div
          role="status"
          aria-label="Loading portfolio"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-[#050505] p-6 text-white sm:p-10"
        >
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="size-2 animate-pulse bg-brand" />
              Portfolio
            </span>
            <span>{year}</span>
          </div>

          <div className="flex select-none flex-col items-center text-center font-display text-[clamp(2.6rem,11vw,8rem)] uppercase leading-[0.95] tracking-tight">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
              
            >
              <Image src="/images/logo.png" alt="" width={844} height={357} priority className="h-auto w-[min(80vw,34rem)]" />
            </motion.div>
          </div>

          <div>
            <div className="mb-3 flex items-end justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">Loading</span>
              <span className="font-display text-6xl leading-none tabular-nums sm:text-8xl">{String(count).padStart(2, "0")}</span>
            </div>
            <div className="h-px w-full bg-white/15">
              <div className="h-full origin-left bg-brand" style={{ transform: `scaleX(${count / 100})` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
