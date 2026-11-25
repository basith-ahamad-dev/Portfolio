"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Download, Eye } from "lucide-react";
import { useState } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CERTIFICATES } from "@/data/content";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";

const slide = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 70 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -70 }),
};

export function Certificates() {
  const items = CERTIFICATES.items;
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const cert = items[index];
  const pad = (n: number) => String(n).padStart(2, "0");

  const go = (next: number) => setState([(next + items.length) % items.length, next > index || (index === items.length - 1 && next === 0) ? 1 : -1]);

  return (
    <Section id="certificates" labelledBy="certificates-title" theme="light">
      <SectionHeading
        id="certificates-title"
        index="08"
        badge={CERTIFICATES.badge}
        title={CERTIFICATES.title}
        accent="COURSES"
        description={CERTIFICATES.description}
      />

      <div className="border border-dashed border-line-strong">
        {/* Slide */}
        <div className="grid gap-10 p-7 sm:p-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div className="min-h-[21rem] overflow-hidden" aria-live="polite">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.article
                key={cert.id}
                custom={dir}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                aria-label={`Certificate ${index + 1} of ${items.length}`}
              >
                <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-brand-fg">
                  <span className="grid size-9 place-items-center bg-fg text-ink">
                    <Icon name={cert.icon} size={18} strokeWidth={1.7} />
                  </span>
                  {cert.issuer}
                </p>
                <h3 className="mt-7 max-w-3xl text-balance font-display text-[clamp(2rem,4.6vw,4.2rem)] leading-[1.02] tracking-wide">{cert.title}</h3>
                <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted md:text-[17px]">{cert.desc}</p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <a href={cert.file} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary")}>
                    <Eye size={16} aria-hidden="true" /> View
                    <span className="sr-only"> {cert.title} certificate</span>
                  </a>
                  <a href={cert.file} download={cert.download} className={buttonClasses("outline")}>
                    <Download size={16} aria-hidden="true" /> Download
                    <span className="sr-only"> {cert.title} certificate</span>
                  </a>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Counter */}
          <div className="flex items-end justify-between gap-8 lg:flex-col lg:items-end lg:justify-between">
            <p className="text-outline font-display text-[clamp(4rem,9vw,8.5rem)] leading-[0.85]" aria-hidden="true">
              {pad(index + 1)}
              <span className="text-[0.5em] opacity-70">/{pad(items.length)}</span>
            </p>
            <div className="flex gap-2" role="group" aria-label="Choose certificate">
              {items.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show certificate ${i + 1}: ${c.title}`}
                  aria-current={i === index}
                  className={cn("h-2.5 transition-all duration-500", i === index ? "w-10 bg-brand" : "w-2.5 bg-fg/25 hover:bg-fg/50")}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Prev / Next */}
        <div className="grid grid-cols-2 divide-x divide-dashed divide-line-strong border-t border-dashed border-line-strong">
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="group split-hover flex items-center justify-center gap-3 py-5 font-display text-lg tracking-wide"
          >
            <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1.5" aria-hidden="true" /> Prev
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="group flex items-center justify-center gap-3 bg-fg py-5 font-display text-lg tracking-wide text-ink transition-colors hover:bg-brand hover:text-black"
          >
            Next <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </Section>
  );
}
