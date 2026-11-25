import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Wordmark } from "@/components/ui/Wordmark";
import { NAV_LINKS, SITE } from "@/data/content";

const SOCIALS = [
  { label: "LinkedIn", href: SITE.links.linkedin },
  { label: "GitHub", href: SITE.links.github },
  { label: "Website", href: SITE.links.website },
] as const;

const bigLink = "block font-display text-[clamp(1.35rem,2.9vw,2.6rem)] leading-none tracking-wide [overflow-wrap:anywhere]";

export function Footer() {
  const [first, ...rest] = SITE.shortName.split(" ");

  return (
    <footer className="relative overflow-hidden border-t border-dashed border-line-strong bg-ink">
      <div className="container-x pt-16 md:pt-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <Image src="/images/logo.png" alt={SITE.name} width={844} height={357} className="mb-10 h-20 w-auto" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Let&apos;s build something</p>
            <a href={SITE.links.email} className={`${bigLink} mt-5 text-muted transition-colors duration-300 hover:text-fg`}>
              {SITE.email}
            </a>
            <a href={SITE.phoneHref} className={`${bigLink} mt-4 text-brand-fg`}>
              {SITE.phone}
            </a>

            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-dashed border-line-strong pt-6" aria-label="Social links">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 font-display text-xl tracking-wide text-fg transition-colors duration-300 hover:text-brand-fg"
                  >
                    {s.label}
                    <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 font-display text-[1.6rem] leading-tight tracking-wide text-muted transition-colors duration-300 hover:text-brand-fg"
                  >
                    <span aria-hidden="true" className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-5" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="mt-14 md:mt-20">
        <Wordmark first={first} last={rest.join(" ")} />
      </div>

      <div className="border-t border-dashed border-line-strong">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-sm text-muted md:flex-row">
          <p>
            &copy; {SITE.year} {SITE.name}. All rights reserved.
          </p>
          <p>
            Developed by{" "}
            <a href={SITE.links.developer} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-fg underline-offset-4 hover:underline">
              {SITE.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
