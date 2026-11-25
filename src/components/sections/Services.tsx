"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/data/content";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";

export function Services() {
  const [open, setOpen] = useState(0);

  return (
    <Section id="services" labelledBy="services-title" theme="light">
      <SectionHeading id="services-title" index="02" badge={SERVICES.badge} title={SERVICES.title} accent="DO" description={SERVICES.description} />

      <ol className="border-t border-line-strong">
        {SERVICES.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.num} className="relative border-b border-line-strong">
              {/* Red rail that grows down the open row */}
              <motion.span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1 origin-top bg-brand"
                initial={false}
                animate={{ scaleY: isOpen ? 1 : 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              />
              <Reveal y={24} delay={i * 0.06}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`service-panel-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group split-hover flex w-full items-center gap-4 py-6 pl-4 pr-1 text-left sm:gap-10 sm:pl-8 md:py-8"
                  >
                    <span className={cn("w-7 shrink-0 font-mono text-sm transition-colors sm:w-10", isOpen ? "text-brand-fg" : "text-muted")}>{item.num}</span>
                    <span
                      className={cn(
                        "flex-1 text-balance font-display text-[clamp(1.5rem,3.4vw,3.2rem)] leading-[1.02] tracking-wide transition-all duration-500",
                        isOpen ? "translate-x-0 text-fg" : "text-fg/55 group-hover:translate-x-2 group-hover:text-fg",
                      )}
                    >
                      {item.title}
                    </span>
                    <span
                      className={cn(
                        "grid size-11 shrink-0 place-items-center border transition-colors duration-500 sm:size-14",
                        isOpen ? "border-brand bg-brand text-black" : "border-line-strong text-fg group-hover:border-brand",
                      )}
                    >
                      <Plus size={22} className={cn("transition-transform duration-500", isOpen && "rotate-45")} aria-hidden="true" />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`service-panel-${i}`}
                      role="region"
                      aria-label={item.title}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-6 pb-10 pl-4 pt-4 sm:flex-row sm:items-start sm:gap-10 sm:pl-8">
                        <span className="hidden w-10 shrink-0 sm:block" aria-hidden="true" />
                        <span className="grid size-14 shrink-0 place-items-center bg-fg text-ink">
                          <Icon name={item.icon} size={26} strokeWidth={1.6} />
                        </span>
                        <p className="max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg">{item.desc}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
