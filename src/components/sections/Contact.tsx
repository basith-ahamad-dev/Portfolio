import Image from "next/image";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionHeading";
import { SplitText } from "@/components/ui/SplitText";
import { CONTACT, SITE } from "@/data/content";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title">
      <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        <div>
          <Reveal>
            <SectionLabel index="09" label="LET'S CONTACT" />
          </Reveal>

          <SplitText
            id="contact-title"
            text={CONTACT.heading}
            accent="AMAZING"
            className="mt-6 text-balance text-[clamp(2.4rem,5.2vw,4.6rem)] leading-[0.98] tracking-tight"
          />

          <Reveal delay={0.2} className="mt-10">
            <ul className="divide-y divide-dashed divide-line-strong border-y border-dashed border-line-strong">
              <li>
                <a href={SITE.phoneHref} className="group flex items-center justify-between gap-4 py-5 font-display text-[clamp(1.5rem,2.4vw,2.1rem)] tracking-wide text-brand-fg">
                  <span className="transition-transform duration-300 group-hover:translate-x-2">{SITE.phone}</span>
                  <Icon name="phone" size={20} />
                </a>
              </li>
              <li>
                <a
                  href={SITE.links.email}
                  className="group flex items-center justify-between gap-4 py-5 font-display text-[clamp(1.15rem,2vw,1.8rem)] tracking-wide transition-colors hover:text-brand-fg"
                >
                  <span className="break-all transition-transform duration-300 group-hover:translate-x-2">{SITE.email}</span>
                  <Icon name="mail" size={20} className="shrink-0" />
                </a>
              </li>
              <li className="py-5 font-display text-[clamp(1.15rem,2vw,1.8rem)] tracking-wide text-muted">{SITE.location}</li>
            </ul>
          </Reveal>

          <Reveal delay={0.3} className="mt-10 flex items-center gap-5">
            <div className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden bg-raised sm:w-28">
              <Image src="/images/contact.webp" alt={SITE.name} width={640} height={770} sizes="112px" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="font-display text-2xl tracking-wide">{SITE.name}</p>
              <p className="mt-1 text-sm text-muted">{SITE.role}</p>
              <ul className="mt-4 flex gap-2">
                {(
                  [
                    { label: "LinkedIn", href: SITE.links.linkedin, icon: "linkedin" },
                    { label: "GitHub", href: SITE.links.github, icon: "github" },
                  ] as const
                ).map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="split-hover grid size-11 place-items-center border border-line-strong"
                    >
                      <Icon name={s.icon} size={19} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
