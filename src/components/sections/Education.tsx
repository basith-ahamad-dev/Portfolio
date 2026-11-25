import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EDUCATION } from "@/data/content";
import { cn } from "@/lib/utils";

export function Education() {
  return (
    <Section id="education" labelledBy="education-title">
      <SectionHeading id="education-title" index="07" badge={EDUCATION.badge} title={EDUCATION.title} accent="EDUCATION" description={EDUCATION.description} />

      <ol className="grid border-t border-dashed border-line-strong md:grid-cols-3">
        {EDUCATION.items.map((item, i) => (
          <li
            key={item.num}
            className={cn(
              "group relative border-b border-dashed border-line-strong transition-colors duration-500 hover:bg-fg/[0.035] md:border-b-0",
              i > 0 && "md:border-l",
            )}
          >
            <Reveal delay={i * 0.12} y={50} className="flex h-full flex-col gap-10 p-7 sm:p-9 md:min-h-[27rem]">
              <div className="flex items-center justify-between font-mono text-xs tracking-widest text-muted">
                <span>{item.num}</span>
                <span aria-hidden="true" className="h-px w-12 bg-line-strong transition-all duration-500 group-hover:w-24 group-hover:bg-brand" />
              </div>

              <p className="text-outline font-display text-[clamp(5.5rem,9vw,8.5rem)] leading-[0.85] transition-all duration-500 group-hover:text-brand group-hover:[-webkit-text-stroke-color:transparent]">
                {item.year}
              </p>

              <div className="mt-auto">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-fg">{item.org}</p>
                <h3 className="mt-3 text-balance font-display text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.1] tracking-wide">{item.title}</h3>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
