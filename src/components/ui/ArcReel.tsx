"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Chained Spring Arc Carousel (adapted from the Cue "cue063" component).
 * A fanned wheel of cards. Scrolling the page turns the wheel: the leading card springs into place and the
 * rest follow one after another like a plucked string. All physics runs in a ref-backed rAF loop (no React
 * re-render per frame). Here the stage pins to the viewport and scroll progress picks the active card, instead
 * of listening to the raw wheel, so the page still scrolls normally past it.
 */

export type ReelCard = { image: string; label: string; /** Opens in a new tab when the card is clicked. */ href?: string };

type Props = {
  cards: readonly ReelCard[];
  /** Height of the fixed navbar the pinned stage sits under, in px. */
  topOffset?: number;
  gapAngle?: number;
  stiffness?: number;
  damping?: number;
};

const SCROLL_PER_CARD = 0.5; // stage heights of scroll per card

export function ArcReel({ cards, topOffset = 72, gapAngle = 16, stiffness = 0.2, damping = 0.4 }: Props) {
  const n = cards.length;
  const [focused, setFocused] = useState(0);
  const [labelVisible, setLabelVisible] = useState(false);
  const [started, setStarted] = useState(false);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardEls = useRef<Array<HTMLDivElement | null>>([]);
  const visibleRef = useRef(false);
  const st = useRef({
    activeIndex: 0,
    cards: cards.map(() => ({ angle: 0, velocity: 0 })),
    isIntro: true,
    introFanning: false,
  });

  // Start the slide-up once the stage first scrolls into view; track visibility to pause the loop off-screen.
  useEffect(() => {
    // Watch the stage, not the (many-screens-tall) track, so a sensible fraction of it can be on screen.
    const stage = stageRef.current;
    if (!stage) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 },
    );
    io.observe(stage);
    return () => io.disconnect();
  }, []);

  // Scroll progress through the track picks the active card.
  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;
    const update = () => {
      const r = track.getBoundingClientRect();
      const range = r.height - stage.clientHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, (topOffset - r.top) / range)) : 0;
      st.current.activeIndex = Math.round(p * (n - 1));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [n, topOffset]);

  // Physics loop (runs once the intro has been triggered).
  useEffect(() => {
    if (!started) return;
    const s = st.current;
    // The physics state is created once; keep it in step with the card count (e.g. a card added during hot reload).
    while (s.cards.length < n) s.cards.push({ angle: (s.cards.length - s.activeIndex) * gapAngle, velocity: 0 });
    s.cards.length = n;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let fanTimer: ReturnType<typeof setTimeout> | undefined;
    let raf = 0;

    if (reduced) {
      s.cards.forEach((c, i) => {
        c.angle = (i - s.activeIndex) * gapAngle;
        c.velocity = 0;
      });
      s.isIntro = false;
      fanTimer = setTimeout(() => setLabelVisible(true), 0);
    } else {
      fanTimer = setTimeout(() => { s.introFanning = true; }, 1000);
    }

    const step = () => {
      raf = requestAnimationFrame(step);
      if (!visibleRef.current) return;

      if (s.isIntro) {
        if (s.introFanning) {
          let settled = true;
          for (let i = 0; i < s.cards.length; i++) {
            const target = (i - s.activeIndex) * gapAngle;
            const c = s.cards[i];
            c.velocity += (target - c.angle) * 0.01;
            c.velocity *= 0.88;
            c.angle += c.velocity;
            if (Math.abs(target - c.angle) > 0.5 || Math.abs(c.velocity) > 0.5) settled = false;
          }
          if (settled) {
            s.isIntro = false;
            setLabelVisible(true);
          }
        }
      } else {
        // Chained spring: the last card leads, each one follows its neighbour.
        const leaderIdx = s.cards.length - 1;
        const leader = s.cards[leaderIdx];
        leader.velocity += ((leaderIdx - s.activeIndex) * gapAngle - leader.angle) * stiffness;
        leader.velocity *= damping;
        leader.angle += leader.velocity;
        for (let i = leaderIdx - 1; i >= 0; i--) {
          const cur = s.cards[i];
          cur.velocity += (s.cards[i + 1].angle - gapAngle - cur.angle) * stiffness;
          cur.velocity *= damping;
          cur.angle += cur.velocity;
        }
      }

      let minAbs = Infinity;
      let closest = 0;
      s.cards.forEach((c, i) => {
        const el = cardEls.current[i];
        if (el) el.style.transform = `rotate(${c.angle}deg) translateY(-800px)`;
        if (Math.abs(c.angle) < minAbs) {
          minAbs = Math.abs(c.angle);
          closest = i;
        }
      });
      cardEls.current.forEach((el, i) => {
        if (el) el.style.zIndex = String(s.cards.length - Math.abs(i - closest));
      });
      if (!s.isIntro) setFocused((prev) => (prev === closest ? prev : closest));
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      if (fanTimer) clearTimeout(fanTimer);
    };
  }, [started, n, gapAngle, stiffness, damping]);

  const height = `calc(100svh - ${topOffset}px)`;

  return (
    <div ref={trackRef} className="ac-track" style={{ height: `calc(${height} * ${1 + (n - 1) * SCROLL_PER_CARD})` }}>
      <style>{CSS}</style>
      <div ref={stageRef} className={"ac-stage" + (started ? " ac-go" : "")} style={{ height, top: topOffset }} role="group" aria-label="Project reel">
        <div className="ac-label" aria-hidden="true" style={{ opacity: labelVisible ? 1 : 0 }}>
          <div className="ac-num">{String(focused + 1).padStart(2, "0")}</div>
          <div className="ac-name">{cards[focused]?.label}</div>
        </div>

        <div className="ac-wrapper" aria-hidden="true">
          <div className="ac-arch" />
          <div className="ac-pivot">
            {cards.map((c, i) => (
              <div key={c.label} className="ac-card" ref={(el) => { cardEls.current[i] = el; }}>
                {c.href ? (
                  <a
                    className="ac-card-inner ac-link"
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}
                    style={{ backgroundImage: `url('${c.image}')` }}
                  />
                ) : (
                  <div className="ac-card-inner" style={{ backgroundImage: `url('${c.image}')` }} />
                )}
              </div>
            ))}
          </div>
        </div>

        <ul className="ac-sr">
          {cards.map((c) => (
            <li key={c.label}>
              {c.href ? (
                <a href={c.href} target="_blank" rel="noopener noreferrer">
                  {c.label} (opens live site in a new tab)
                </a>
              ) : (
                c.label
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const CSS = `
.ac-track{position:relative;width:100%}
.ac-stage{position:sticky;width:100%;overflow:hidden;color:var(--color-fg)}
.ac-wrapper{position:absolute;inset:0;display:flex;justify-content:center;align-items:center;overflow:hidden}
.ac-arch{position:absolute;bottom:calc(-450px - max(0px,640px - 100%));width:1600px;height:800px;background:var(--color-raised);border-radius:50% 50% 0 0;z-index:1}
.ac-pivot{position:absolute;bottom:calc(-450px - max(0px,640px - 100%));width:0;height:0;z-index:5;transform:translateY(100vh);opacity:0}
.ac-go .ac-pivot{animation:ac-slide-up 1.2s cubic-bezier(.16,1,.3,1) forwards}
@keyframes ac-slide-up{to{transform:translateY(0);opacity:1}}
.ac-card{position:absolute;width:240px;height:372px;left:-120px;bottom:-186px;will-change:transform;display:flex;justify-content:center}
.ac-card-inner{position:absolute;inset:0;border-radius:6px;box-shadow:0 10px 30px rgba(0,0,0,.35);overflow:hidden;background-size:cover;background-position:top center;background-color:var(--color-surface);
  transform:translateY(0);transition:transform .4s ease,box-shadow .4s ease}
.ac-link{display:block;cursor:pointer}
.ac-card:hover .ac-card-inner{transform:translateY(-40px);box-shadow:0 20px 50px rgba(0,0,0,.5)}
.ac-label{position:absolute;top:clamp(6px,calc(100% - 640px),7%);left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;z-index:20;text-align:center;transition:opacity .8s ease;pointer-events:none}
.ac-num{font-family:var(--font-display);font-size:56px;color:var(--color-fg);letter-spacing:-1px;line-height:1}
.ac-name{font-family:var(--font-mono);font-size:12px;font-weight:500;color:var(--color-muted);text-transform:uppercase;letter-spacing:.3em;white-space:nowrap}
.ac-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;margin:0;padding:0;list-style:none}
@media (max-width:900px){
  .ac-card{width:160px;height:240px;left:-80px;bottom:-120px}
  .ac-arch{width:1200px;height:600px;bottom:calc(-450px - max(0px,575px - 100%))}
  .ac-pivot{bottom:calc(-450px - max(0px,575px - 100%))}
  .ac-label{top:clamp(6px,calc(100% - 575px),7%)}
}
@media (prefers-reduced-motion:reduce){
  .ac-pivot{animation:none!important;opacity:1!important;transform:none!important}
  .ac-card-inner{transition:none!important}
}
`;

export default ArcReel;
