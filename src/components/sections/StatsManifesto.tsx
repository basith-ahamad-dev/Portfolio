"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionHeading";
import { STATS } from "@/data/content";

/** One word of the manifesto: fades from dim to bright as the scroll passes over it. */
function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.26em] inline-block">
      {word}
    </motion.span>
  );
}

export function StatsManifesto() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = STATS.manifesto.split(" ");

  return (
    <Section labelledBy="manifesto-title" theme="light" innerClassName="py-12 md:py-16">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <SectionLabel index="00" label="MY PHILOSOPHY" />
        </Reveal>

        <div>
          <h2
            id="manifesto-title"
            ref={ref}
            className="text-balance font-display text-[clamp(1.9rem,4.6vw,4.4rem)] leading-[1.04] tracking-tight"
          >
            {words.map((word, i) => {
              const start = i / words.length;
              return <Word key={`${word}-${i}`} word={word} progress={scrollYProgress} range={[start, Math.min(start + 1.6 / words.length, 1)]} />;
            })}
          </h2>
        </div>
      </div>
    </Section>
  );
}
