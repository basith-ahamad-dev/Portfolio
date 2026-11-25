import { Dots } from "@/components/ui/Dots";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionHeading";
import { SplitText } from "@/components/ui/SplitText";
import { EXPERIENCE } from "@/data/content";

export function Experience() {
  const total = EXPERIENCE.items.length;

  return (
    <Section id="experience" labelledBy="experience-title">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        {/* Sticky intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionLabel index="05" label={EXPERIENCE.badge} />
          </Reveal>
          <SplitText
            id="experience-title"
            text={EXPERIENCE.title}
            accent="EXPERIENCE"
            className="mt-6 text-balance text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.98] tracking-tight"
          />
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-md text-pretty leading-relaxed text-muted md:text-[17px]">{EXPERIENCE.description}</p>
          </Reveal>
        </div>

        {/* Roles */}
        <ol>
          {EXPERIENCE.items.map((job, i) => (
            <li key={`${job.company}-${job.role}`} className="group border-t border-dashed border-line-strong py-6 first:border-t-0 first:pt-0 md:py-8">
              <Reveal>
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-balance font-display text-[clamp(1.7rem,2.8vw,2.6rem)] leading-[1.05] tracking-wide transition-colors duration-300 group-hover:text-brand-fg">
                      {job.role}
                    </h3>
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-brand-fg">
                      {job.company} <span className="text-muted">· {job.type}</span>
                    </p>
                  </div>
                  <Dots filled={i + 1} total={total} className="mt-2 w-16 shrink-0" segmentClassName="h-2.5" />
                </div>

                <p className="mt-4 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-muted">
                  {job.current && (
                    <span className="relative flex size-2" aria-hidden="true">
                      <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-brand" />
                      <span className="relative inline-flex size-2 rounded-full bg-brand" />
                    </span>
                  )}
                  {job.date}
                  {job.current && <span className="sr-only">(current role)</span>}
                </p>

                <ul className="mt-6 space-y-3">
                  {job.points.map((point) => (
                    <li key={point} className="flex items-start gap-3.5 text-pretty text-[15px] leading-relaxed text-muted transition-transform duration-300 group-hover:translate-x-1.5">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-brand" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
