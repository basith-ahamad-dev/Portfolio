import { Icon } from "@/components/ui/icons";
import { MARQUEE_ROWS, type MarqueeTag } from "@/data/content";
import { cn } from "@/lib/utils";

const TONES: Record<MarqueeTag["tone"], string> = {
  plain: "border-black/30 bg-transparent text-black",
  accent: "border-black bg-black text-white",
  dark: "border-white bg-white text-black",
};

function Row({ tags, reverse }: { tags: readonly MarqueeTag[]; reverse?: boolean }) {
  // The list is rendered twice; the keyframes translate by exactly -50% for a seamless loop.
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div
        className={cn(
          "flex w-max shrink-0 group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-3 pr-3">
            {tags.map((tag) => (
              <li
                key={`${copy}-${tag.label}`}
                className={cn(
                  "inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 font-display text-base font-semibold uppercase tracking-wide sm:text-lg",
                  TONES[tag.tone],
                )}
              >
                <Icon name={tag.icon} size={18} className={tag.tone === "accent" ? "text-brand" : "text-black"} />
                {tag.label}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <div
      role="region"
      aria-label="Skills and highlights"
      className="relative flex flex-col gap-3 border-y border-black bg-brand py-6 text-black"
    >
      <Row tags={MARQUEE_ROWS[0]} />
      <Row tags={MARQUEE_ROWS[1]} reverse />
    </div>
  );
}
