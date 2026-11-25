"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROCESS } from "@/data/content";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";

/** Cards step up in height from left to right on wide screens, like a staircase. */
const HEIGHTS = ["lg:min-h-[23rem]", "lg:min-h-[27rem]", "lg:min-h-[31rem]"] as const;

export function Process() {
  return (
    <Section id="process" labelledBy="process-title" theme="light">
      <SectionHeading id="process-title" index="06" badge={PROCESS.badge} title={PROCESS.title} accent="WORK" description={PROCESS.description} />

      <ol className="grid gap-4 lg:grid-cols-3 lg:items-end">
        {PROCESS.steps.map((step, i) => (
          <motion.li
            key={step.num}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: i * 0.14 }}
            className={cn(
              "group split-hover flex flex-col justify-between gap-12 border border-line bg-surface p-7 sm:p-9",
              HEIGHTS[i],
            )}
          >
            {/* Top rule draws itself in */}
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] origin-left bg-brand"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.35 + i * 0.14 }}
            />

            <div className="flex items-start justify-between gap-4">
              <span
                aria-hidden="true"
                className="text-outline font-display text-[7rem] leading-[0.8] transition-all duration-500 group-hover:text-brand group-hover:[-webkit-text-stroke-color:transparent]"
              >
                {step.num}
              </span>
              <span className="grid size-12 shrink-0 place-items-center border border-line-strong text-fg transition-colors duration-500 group-hover:border-brand group-hover:bg-brand group-hover:text-black">
                <Icon name={step.icon} size={22} strokeWidth={1.6} />
              </span>
            </div>

            <div>
              <h3 className="font-display text-[2.2rem] leading-none tracking-wide">
                <span className="sr-only">Step {step.num}: </span>
                {step.title}
              </h3>
              <p className="mt-4 text-pretty text-[15px] leading-relaxed text-muted">
                {step.desc}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
