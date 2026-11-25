"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useId, useRef } from "react";
import { LightTunnel } from "@/components/ui/LightTunnel";
import { SITE } from "@/data/content";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";

type Part = { text: string; accent?: boolean };

/** Short intro. Kept to one sentence on purpose. */
const INTRO = "Software engineer & AI builder creating web platforms, AI systems and automation from Sri Lanka.";

/** Two-line headline. The red words step diagonally, as in the reference. */
const LINES: Part[][] = [
  [{ text: "Engineering " }, { text: "Ideas", accent: true }],
  [{ text: "Into ", accent: true }, { text: "Reality" }],
];

/**
 * One line of the headline. It slides up from behind a mask on load, then
 * drifts sideways as the page scrolls (`x` is a scroll-linked motion value).
 */
function HeadLine({ parts, delay, x }: { parts: Part[]; delay: number; x: MotionValue<string> }) {
  return (
    <motion.span style={{ x }} className="block will-change-transform">
      <span className="block overflow-hidden pb-[0.05em] pt-[0.02em]">
        <motion.span
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.05, ease: EASE_OUT_EXPO, delay }}
          className="block whitespace-nowrap"
        >
          {parts.map((p) => (
            <span key={p.text} className={p.accent ? "text-brand" : "text-white"}>
              {p.text}
            </span>
          ))}
        </motion.span>
      </span>
    </motion.span>
  );
}

/** Round "view my work" button with a slowly turning ring of text. */
function WorkDisc({ rotate }: { rotate: MotionValue<number> }) {
  const id = useId();
  return (
    <a href="#projects" aria-label="View my work" className="group relative grid size-28 place-items-center rounded-full">
      <motion.span style={{ rotate }} className="absolute inset-0">
        <svg viewBox="0 0 100 100" className="size-full animate-spin-slow" aria-hidden="true">
          <defs>
            <path id={id} d="M50,50 m-41,0 a41,41 0 1,1 82,0 a41,41 0 1,1 -82,0" />
          </defs>
          <text className="fill-white/80 font-mono text-[7.4px] uppercase">
            <textPath href={`#${id}`} textLength="256" lengthAdjust="spacing">
              Selected work · Selected work · Selected work ·
            </textPath>
          </text>
        </svg>
      </motion.span>
      <span className="grid size-[4.25rem] place-items-center rounded-full bg-white text-black transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
        <ArrowUpRight size={26} className="transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
      </span>
    </a>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // A light spring takes the harshness off fast wheel / trackpad flicks.
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.35 });

  // Everything scroll-driven collapses to a no-op for reduced-motion visitors.
  const k = reduce ? 0 : 1;

  // Headline: the two lines pull apart in opposite directions.
  const lineLeft = useTransform(p, [0, 1], ["0vw", `${-16 * k}vw`]);
  const lineRight = useTransform(p, [0, 1], ["0vw", `${16 * k}vw`]);

  const discRotate = useTransform(p, [0, 1], [0, 200 * k]);

  // Foreground copy lifts and fades out as the next section arrives.
  const copyY = useTransform(p, [0, 1], [0, -60 * k]);
  const copyOpacity = useTransform(p, [0.4, 0.95], [1, reduce ? 1 : 0]);

  return (
    <section ref={ref} id="home" aria-labelledby="hero-title" className="relative isolate flex min-h-svh flex-col overflow-hidden bg-[#050505]">
      {/* ---------- Backdrop: light tunnel, full bleed ---------- */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Light tunnel: red cables with pulses racing inward */}
        <LightTunnel
          cableColor="#e5121f"
          pulseColor="#ff3340"
          tunnelColor="#e5121f"
          mouseInteraction={false}
          clickSurge={false}
          className="absolute inset-0 opacity-70 mix-blend-screen"
        />
        {/* Soft vignette + a dark floor so the headline always reads */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_60%_40%,transparent_30%,rgb(5_5_5/0.7)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* ---------- Copy ---------- */}
      <motion.div style={{ y: copyY, opacity: copyOpacity }} className="relative z-10 flex flex-1 flex-col justify-end pb-10 pt-32 sm:pb-14 md:pt-36">
        {/* Left: round "view my work" button (large screens) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.9 }}
          className="absolute left-12 top-[40%] hidden lg:block"
        >
          <WorkDisc rotate={discRotate} />
        </motion.div>

        {/* Right: one short line of copy (large screens); sits under the headline on small ones */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.7 }}
          className={cn(
            "order-last mx-auto mt-6 max-w-[26rem] px-5 text-center text-[12px] font-medium uppercase leading-relaxed tracking-wide text-white/85",
            "lg:absolute lg:right-12 lg:top-[34%] lg:order-none lg:mx-0 lg:mt-0 lg:w-[16rem] lg:px-0 lg:text-left",
          )}
        >
          {INTRO}
        </motion.p>

        <h1
          id="hero-title"
          className="px-5 text-center font-display text-[clamp(2.4rem,10.5vw,3.6rem)] leading-[0.9] tracking-tight sm:px-8 sm:text-[clamp(3.6rem,8vw,9rem)]"
        >
          <span className="sr-only">{SITE.name} — Software Engineer &amp; AI Builder. Engineering ideas into reality.</span>
          <span aria-hidden="true" className="block">
            <HeadLine parts={LINES[0]} delay={0.2} x={lineLeft} />
            <HeadLine parts={LINES[1]} delay={0.34} x={lineRight} />
          </span>
        </h1>
      </motion.div>
    </section>
  );
}
