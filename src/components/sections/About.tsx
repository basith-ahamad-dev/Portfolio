import { Download, MapPin } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { PortraitReveal } from "@/components/ui/PortraitReveal";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ABOUT, EXPERIENCE, SITE } from "@/data/content";

const current = EXPERIENCE.items[0];

const FACTS = [
  { label: "Based in", value: SITE.location },
  { label: "Currently", value: `${current.role} @ ${current.company}` },
  { label: "Focus", value: "Full-Stack · AI · Automation" },
] as const;

export function About() {
  const [lead, ...rest] = ABOUT.paragraphs;

  return (
    <Section id="about" labelledBy="about-title">
      <SectionHeading id="about-title" index="01" badge={ABOUT.eyebrow} title={ABOUT.title} accent="DIGITAL SOLUTIONS" size="sm" />

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
        {/* Portrait frame */}
        <div className="relative mx-auto w-full max-w-md lg:sticky lg:top-28 lg:mx-0 lg:max-w-none">
          <PortraitReveal className="group relative aspect-[4/5] overflow-hidden bg-surface">
            <Image
              src="/images/about.webp"
              alt="Basith Ahamad, Software Engineer"
              width={1200}
              height={1693}
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="h-full w-full object-cover object-top grayscale contrast-125 brightness-75 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100"
            />
            {/* Charcoal filter: darkens the photo; fades away on hover to reveal the natural colours */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-0"
              aria-hidden="true"
            />
          </PortraitReveal>

          {/* Rotating badge */}
          <Reveal
            scale={0.6}
            y={0}
            delay={0.5}
            className="absolute -bottom-10 -right-4 grid size-36 place-items-center rounded-full bg-brand text-black sm:-right-10 sm:size-44"
          >
            <svg viewBox="0 0 200 200" className="absolute inset-0 animate-spin-slow" aria-hidden="true">
              <defs>
                <path id="about-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text fontSize="12.5" fontWeight="700" className="fill-black font-mono uppercase">
                <textPath href="#about-ring" textLength="486" lengthAdjust="spacing">
                  BASITH AHAMAD • SOFTWARE ENGINEER • AI BUILDER •
                </textPath>
              </text>
            </svg>
            <span className="font-display text-4xl leading-none sm:text-5xl">
              <Counter to={ABOUT.badge.value} duration={2} />
              {ABOUT.badge.suffix}
            </span>
          </Reveal>
        </div>

        {/* Copy */}
        <div>
          <Reveal>
            <p className="text-pretty text-xl font-medium leading-snug text-fg md:text-2xl">{lead}</p>
          </Reveal>

          <div className="mt-8 space-y-5 text-pretty text-base leading-relaxed text-muted md:text-[17px]">
            {rest.map((p, i) => (
              <Reveal key={i} delay={0.08 + i * 0.08} y={20}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <dl className="mt-8 divide-y divide-dashed divide-line-strong border-y border-dashed border-line-strong">
              {FACTS.map((f) => (
                <div key={f.label} className="group grid gap-1 py-5 transition-colors hover:bg-fg/[0.03] sm:grid-cols-[9rem_1fr] sm:items-center sm:px-3">
                  <dt className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    {f.label === "Based in" && <MapPin size={12} className="text-brand-fg" aria-hidden="true" />}
                    {f.label}
                  </dt>
                  <dd className="font-display text-xl tracking-wide transition-transform duration-300 group-hover:translate-x-2 sm:text-2xl">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={SITE.resume} download={SITE.resumeFilename}>
              <Download size={16} /> Download CV
            </ButtonLink>
            <ButtonLink href="#contact" variant="outline">
              Get in touch
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
