import { Dots } from "@/components/ui/Dots";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SKILLS } from "@/data/content";

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading id="skills-title" index="03" badge={SKILLS.badge} title={SKILLS.title} accent="PROFICIENCY" description={SKILLS.description} />

      <ul className="grid border-l border-t border-dashed border-line-strong md:grid-cols-2 xl:grid-cols-3">
        {SKILLS.groups.map((group, i) => (
          <li key={group.title} className="group border-b border-r border-dashed border-line-strong transition-colors duration-500 hover:bg-fg/[0.035]">
            <Reveal delay={(i % 3) * 0.08} className="h-full p-7 sm:p-9">
              <div className="mb-9 flex items-start justify-between gap-3">
                <span className="font-mono text-xs tracking-widest text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="grid size-11 place-items-center border border-line-strong text-brand-fg transition-all duration-500 group-hover:border-brand group-hover:bg-brand group-hover:text-black">
                  <Icon name={group.icon} size={20} />
                </span>
              </div>

              <h3 className="font-display text-[1.9rem] leading-none tracking-wide">{group.title}</h3>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">{group.badge}</p>

              <ul className="mt-9 space-y-6">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <div className="mb-2.5 flex items-baseline justify-between gap-4 text-sm">
                      <span className="text-fg">{item.name}</span>
                      <span className="font-mono text-xs text-brand-fg">{item.level}%</span>
                    </div>
                    <Dots filled={Math.round(item.level / 10)} total={10} label={`${item.name}: ${item.level} percent`} />
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
