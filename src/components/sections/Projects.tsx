"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { buttonClasses } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROJECT_CATEGORIES, PROJECTS, PROJECTS_SECTION, type CategoryId } from "@/data/content";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";

type Filter = "all" | CategoryId;

const shortTitle = (t: string) => t.replace(/ \(.*\)$/, "");

export function Projects() {
  const [active, setActive] = useState<Filter>("all");
  const [selectedSlug, setSelectedSlug] = useState<string>(PROJECTS[0]?.slug ?? "");
  const panelRef = useRef<HTMLDivElement>(null);

  const category = PROJECT_CATEGORIES.find((c) => c.id === active);
  const items = active === "all" ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(active));
  // Falls back to the first project when the picked one isn't in the current filter.
  const selectedIndex = Math.max(0, items.findIndex((p) => p.slug === selectedSlug));
  const selected = items[selectedIndex];

  const pick = (slug: string) => {
    setSelectedSlug(slug);
    // On narrow screens the details sit below the list, so bring them into view.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }));
    }
  };

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: PROJECTS.length },
    ...PROJECT_CATEGORIES.map((c) => ({ id: c.id as Filter, label: c.label, count: PROJECTS.filter((p) => p.categories.includes(c.id)).length })),
  ];

  return (
    <Section id="projects" labelledBy="projects-title" theme="light">
      <SectionHeading
        id="projects-title"
        index="04"
        badge={PROJECTS_SECTION.badge}
        title={PROJECTS_SECTION.title}
        accent="AI SOLUTIONS"
        description={PROJECTS_SECTION.description}
      />

      {/* Category filter */}
      <div role="tablist" aria-label="Project categories" className="flex flex-wrap gap-2 border-y border-dashed border-line-strong py-4">
        {filters.map((f) => {
          const on = f.id === active;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(f.id)}
              className={cn(
                "flex items-center gap-2 border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-200",
                on ? "border-fg bg-fg text-ink" : "border-dashed border-line-strong text-muted hover:text-fg",
                f.count === 0 && !on && "opacity-50",
              )}
            >
              {f.label}
              <span className={cn("tabular-nums", on ? "text-brand" : "text-brand-fg")}>{String(f.count).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      {items.length > 0 && selected ? (
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          {/* Index: every project as a numbered row */}
          <ol aria-label="Projects" className="border-t border-line-strong lg:sticky lg:top-24">
            {items.map((p, i) => {
              const on = i === selectedIndex;
              return (
                <li key={p.slug} className="border-b border-line-strong">
                  <button
                    type="button"
                    aria-current={on}
                    onClick={() => pick(p.slug)}
                    className={cn(
                      "group relative flex w-full items-center gap-4 py-4 pl-4 pr-2 text-left transition-colors duration-300",
                      on ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-y-0 left-0 w-[3px] origin-top bg-brand transition-transform duration-300",
                        on ? "scale-y-100" : "scale-y-0 group-hover:scale-y-50",
                      )}
                    />
                    <span className="font-mono text-xs tabular-nums tracking-widest">{String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-xl leading-tight tracking-wide sm:text-2xl">{shortTitle(p.title)}</span>
                      <span className="mt-0.5 block truncate font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                        {p.status.split(" · ")[1] ?? p.status}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      aria-hidden="true"
                      className={cn("shrink-0 transition-all duration-300", on ? "translate-x-0 text-brand-fg opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100")}
                    />
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Details for the picked project */}
          <div ref={panelRef} className="min-w-0 scroll-mt-24">
            {category && <p className="mb-5 max-w-2xl text-pretty text-sm leading-relaxed text-muted md:text-[15px]">{category.description}</p>}
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.slug}
                id={`project-${selected.slug}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
              >
                <ProjectDetail project={selected} index={selectedIndex} total={items.length} stacked />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="relative mt-8 overflow-hidden border border-dashed border-line-strong bg-surface p-8 sm:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-fg">Case studies coming soon</p>
          <p className="mt-4 max-w-xl text-pretty font-display text-3xl leading-[1.1] tracking-wide sm:text-4xl">
            Work in this category is being documented.
          </p>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted">
            Want a walkthrough or live demo of {category?.label.toLowerCase() ?? "this"} work in the meantime? Get in touch and I&apos;ll share it directly.
          </p>
          <a href="#contact" className={cn(buttonClasses("primary"), "mt-8")}>
            Request a demo <ArrowUpRight size={16} />
          </a>
        </div>
      )}
    </Section>
  );
}
