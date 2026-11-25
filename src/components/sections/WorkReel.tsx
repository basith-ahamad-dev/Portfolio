import { ArcReel, type ReelCard } from "@/components/ui/ArcReel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WORDPRESS_SITES } from "@/data/wordpressSites";

/** One card per live WordPress site; clicking a card opens the site. */
const CARDS: ReelCard[] = WORDPRESS_SITES.map((s) => ({ image: s.image, label: s.name, href: s.url }));

/** Scroll-turned fan of WordPress sites. Full width, so it sits outside the content column. */
export function WorkReel() {
  return (
    <section id="reel" aria-labelledby="reel-title" className="relative border-t border-line-strong">
      <div className="container-x relative pt-8 md:pt-10">
        <SectionHeading
          id="reel-title"
          index="04.2"
          badge="THE REEL"
          title="WORDPRESS CUSTOM THEME"
          accent="CUSTOM THEME"
          description="Custom WordPress themes, crafted from the ground up. Scroll to explore and click to experience them live."
          size="md"
        />
      </div>
      <ArcReel cards={CARDS} topOffset={72} />
    </section>
  );
}
