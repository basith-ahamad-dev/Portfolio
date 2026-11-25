"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";

/**
 * Tiger Tear Reveal: a poster that rips in two as you scroll, a portrait rises into the gap and its
 * eyes open, and the face shifts slightly with the pointer. Scroll back up to close it.
 */
export interface TigerTearRevealProps {
  word?: string;
  tagline?: string;
  /** Tilt of the tear in degrees (negative rises to the right, 0 is level). */
  tearAngle?: number;
  /** Small line under the big word. */
  subline?: string;
  ink?: string;
  paper?: string;
  taglineColor?: string;
  /** Photo that shows through the tear. Wide landscape, eyes near the centre. */
  image?: string;
  fontFamily?: string;
  height?: string;
  scrollDistance?: string;
  progress?: number;
  className?: string;
}

type Pt = [number, number];

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp01 = (x: number) => (x <= 0 ? 0 : x > 1 ? 1 : x);

function smooth(a: number, b: number, x: number) {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
}

function easeOutBack(t: number) {
  const c = 1.70158;
  const u = clamp01(t) - 1;
  return 1 + (c + 1) * u * u * u + c * u * u;
}

function scrollProgress(top: number, height: number, viewport: number) {
  const range = height - viewport;
  if (range <= 0) return top <= 0 ? 1 : 0;
  return clamp01(-top / range);
}

function stages(p: number) {
  return {
    crack: smooth(0.03, 0.2, p),
    open: smooth(0.18, 0.62, p),
    rise: smooth(0.26, 0.74, p),
    pop: smooth(0.58, 0.88, p),
    shake: smooth(0.16, 0.22, p) * (1 - smooth(0.26, 0.36, p)),
  };
}

function tearLine(seed = 11, from = -800, to = 1800, step = 9, cx = 500, cy = 318, angle = -7): Pt[] {
  const r = rng(seed);
  const slope = Math.tan((angle * Math.PI) / 180);
  const out: Pt[] = [];
  for (let x = from; x <= to; x += step) {
    const fibre = (r() - 0.5) * 5;
    const tooth = r() < 0.09 ? (r() - 0.5) * 26 : 0;
    const wander = Math.sin(x * 0.019 + seed) * 10 + Math.sin(x * 0.053 + seed * 2) * 4;
    out.push([x, cy + (x - cx) * slope + wander + fibre + tooth]);
  }
  return out;
}

function pieceMotion(open: number) {
  return {
    top: { dx: -10 * open, dy: -82 * open, rot: -2.6 * open },
    bottom: { dx: 12 * open, dy: 78 * open, rot: 2.1 * open },
  };
}

function fibreWidths(n: number, open: number, seed = 5) {
  const r = rng(seed);
  const k = Math.min(1, open * 4);
  return Array.from({ length: n }, (_, i) => k * (2.5 + 6 * (0.5 + 0.5 * Math.sin(i * 0.37 + seed)) * (0.6 + r() * 0.8)));
}

const VIEW_W = 1000;
const CX = 500;
const CY = 318;
const FAR = 4000;
const FRAME = "36 44 928 468";

const d = (pts: Pt[], close = true) =>
  "M" + pts.map(([x, y]) => x.toFixed(1) + " " + y.toFixed(1)).join("L") + (close ? "Z" : "");

const CURLS: Record<"top" | "bottom", [number, number, number][]> = {
  top: [
    [300, 44, 30],
    [575, 30, 20],
    [790, 52, 34],
  ],
  bottom: [
    [205, 50, 32],
    [470, 34, 22],
    [690, 40, 28],
  ],
};

function Half({
  id,
  side,
  line,
  open,
  children,
}: {
  id: string;
  side: "top" | "bottom";
  line: Pt[];
  open: number;
  children: ReactNode;
}) {
  const up = side === "top";
  const m = pieceMotion(open)[side];
  const shape = up
    ? [[line[0][0], -FAR] as Pt, [line[line.length - 1][0], -FAR] as Pt, ...[...line].reverse()]
    : [...line, [line[line.length - 1][0], FAR] as Pt, [line[0][0], FAR] as Pt];
  const widths = fibreWidths(line.length, open, up ? 5 : 8);
  const core = line.concat(line.map(([x, y], i) => [x, y + (up ? -widths[i] : widths[i])] as Pt).reverse());
  const curls = CURLS[side].map(([cx, hw, depth]) => {
    const pts = line.filter(([x]) => Math.abs(x - cx) <= hw);
    const back = pts.map(([x, y]) => {
      const s = Math.cos(((x - cx) / hw) * (Math.PI / 2));
      return [x + (up ? 6 : -6) * s * open, y + (up ? 1 : -1) * depth * s * s * Math.min(1, open * 2.5)] as Pt;
    });
    return d(pts.concat(back.reverse()));
  });
  const transform = "translate(" + m.dx.toFixed(2) + " " + m.dy.toFixed(2) + ") rotate(" + m.rot.toFixed(3) + " " + CX + " " + CY + ")";
  const clip = id + "-" + side;
  return (
    <g transform={transform}>
      {open > 0 ? (
        <g fill="none" stroke="#000" transform={"translate(0 " + (up ? 10 : -10) + ")"}>
          <path d={d(line, false)} strokeOpacity={0.18 * Math.min(1, open * 3)} strokeWidth={28} />
          <path d={d(line, false)} strokeOpacity={0.3 * Math.min(1, open * 3)} strokeWidth={14} />
        </g>
      ) : null}
      <clipPath id={clip}>
        <path d={d(shape)} />
      </clipPath>
      <g clipPath={"url(#" + clip + ")"}>{children}</g>
      {open > 0 ? (
        <>
          <path d={d(core)} fill="#ffffff" />
          {curls.map((c, i) => (
            <path key={i} d={c} fill={"url(#" + id + "-curl-" + side + ")"} stroke="#fff" strokeWidth={1} />
          ))}
        </>
      ) : null}
    </g>
  );
}

type Frame = { p: number; look: Pt; blink: number; squint: number };

export function TigerTearReveal({
  word = "BUILD",
  tagline = "TURNING IDEAS INTO REALITY",
  tearAngle = 0,
  subline = "DEVELOPMENT · INNOVATION · DESIGN",
  ink = "#e5121f",
  paper = "#050505",
  taglineColor = "#f4f2ee",
  image = "/images/reveal-1.webp",
  fontFamily = 'var(--font-anton), Anton, Impact, "Arial Narrow", sans-serif',
  height = "100svh",
  scrollDistance = "160svh",
  progress,
  className = "",
}: TigerTearRevealProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const reduced = !!useReducedMotion();
  const id = "ttr" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const line = useMemo(() => tearLine(11, -800, 1800, 9, CX, CY, tearAngle), [tearAngle]);
  const [f, setF] = useState<Frame>({ p: progress ?? 0, look: [0, 0], blink: 0, squint: 0 });

  const controlled = progress !== undefined;
  const cfg = useRef({ progress, controlled, reduced });
  useEffect(() => {
    cfg.current = { progress, controlled, reduced };
  });
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const squintAt = useRef(-1e9);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    let raf = 0;
    let visible = true;
    let p = cfg.current.progress ?? 0;
    let look: Pt = [0, 0];
    let idle: Pt = [0, 0];
    let nextIdle = 0;
    let nextBlink = performance.now() + 2500;
    let last: Frame | null = null;

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(root);

    function tick(now: number) {
      raf = 0;
      if (!visible) return;
      const c = cfg.current;
      const target = c.controlled
        ? clamp01(c.progress ?? 0)
        : scrollProgress(root!.getBoundingClientRect().top, root!.offsetHeight, stage!.offsetHeight);
      p = c.reduced ? (target > 0.3 ? 1 : 0) : p + (target - p) * 0.14;
      if (Math.abs(target - p) < 0.0005) p = target;

      let want: Pt;
      if (pointer.current) {
        const r = stage!.getBoundingClientRect();
        want = [
          Math.max(-1, Math.min(1, (pointer.current.x - r.left - r.width / 2) / (r.width * 0.35))),
          Math.max(-1, Math.min(1, (pointer.current.y - r.top - r.height * 0.58) / (r.height * 0.35))),
        ];
      } else {
        if (now > nextIdle && !c.reduced) {
          const g = rng(Math.floor(now));
          idle = [(g() - 0.5) * 1.4, (g() - 0.5) * 0.8];
          nextIdle = now + 1400 + g() * 1800;
        }
        want = c.reduced ? [0, 0] : idle;
      }
      look = [look[0] + (want[0] - look[0]) * 0.14, look[1] + (want[1] - look[1]) * 0.14];

      let blink = 0;
      if (!c.reduced) {
        const since = now - nextBlink;
        if (since > 0) blink = since < 90 ? since / 90 : since < 200 ? 1 - (since - 90) / 110 : 0;
        if (since > 200) nextBlink = now + 2600 + Math.random() * 3200;
      }
      const squint = c.reduced ? 0 : Math.max(0, 1 - (now - squintAt.current) / 900);

      const next: Frame = { p, look, blink, squint };
      if (
        !last ||
        Math.abs(next.p - last.p) > 1e-4 ||
        Math.abs(next.look[0] - last.look[0]) > 1e-3 ||
        Math.abs(next.look[1] - last.look[1]) > 1e-3 ||
        next.blink !== last.blink ||
        next.squint !== last.squint
      ) {
        last = next;
        setF(next);
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const s = stages(f.p);
  const pop = reduced ? s.pop : easeOutBack(s.pop);
  const blink = Math.max(1 - clamp01(pop), f.blink, f.squint * 0.45);
  const rise = (1 - s.rise) * 150;
  const shake = reduced ? 0 : Math.sin(f.p * 900) * 6 * s.shake;
  const crackReach = s.crack * 620;
  const crack = line.filter(([x]) => Math.abs(x - CX) <= crackReach);
  const tiger = "translate(" + CX + " " + (CY + rise).toFixed(2) + ") rotate(" + tearAngle + ") scale(" + (1.34 - 0.06 * s.rise).toFixed(4) + ")";

  const sheet = (
    <>
      <rect x={-FAR} y={-FAR} width={FAR * 2 + VIEW_W} height={FAR * 2} fill={paper} />
      {tagline ? (
        <text
          x={CX}
          y={150}
          textAnchor="middle"
          fill={taglineColor}
          style={{ font: '700 32px "Helvetica Neue", Helvetica, Arial, sans-serif', letterSpacing: "0.42em" }}
        >
          {tagline}
        </text>
      ) : null}
      <text
        x={CX}
        y={404}
        textAnchor="middle"
        textLength={word.length <= 6 ? 620 : 880}
        lengthAdjust="spacingAndGlyphs"
        fill={ink}
        style={{ fontFamily, fontSize: 250, fontWeight: 400, letterSpacing: 0 }}
      >
        {word}
      </text>
      {subline ? (
        <text
          x={CX}
          y={478}
          textAnchor="middle"
          fill={taglineColor}
          style={{ font: '400 28px "Helvetica Neue", Helvetica, Arial, sans-serif', letterSpacing: "0.12em" }}
        >
          {subline}
        </text>
      ) : null}
    </>
  );

  return (
    <section
      ref={rootRef}
      id="home"
      aria-label="Tiger tear reveal"
      className={"relative w-full " + className}
      style={{ height: controlled ? height : "calc(" + height + " + " + scrollDistance + ")", background: paper, overflow: "clip" }}
    >
      <div
        ref={stageRef}
        className="sticky top-0 w-full overflow-hidden"
        style={{ height, cursor: s.pop > 0.9 ? "crosshair" : undefined }}
        onPointerMove={(e) => (pointer.current = { x: e.clientX, y: e.clientY })}
        onPointerLeave={() => (pointer.current = null)}
        onPointerDown={() => {
          if (s.pop > 0.5) squintAt.current = performance.now();
        }}
      >
        <svg
          viewBox={FRAME}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={(tagline ? tagline + ". " : "") + word + ", torn in two by a portrait looking through."}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", maxWidth: "none", display: "block" }}
        >
          <defs>
            <linearGradient id={id + "-curl-top"} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#d9d4cb" />
            </linearGradient>
            <linearGradient id={id + "-curl-bottom"} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#d9d4cb" />
            </linearGradient>
          </defs>

          <g transform={"translate(" + shake.toFixed(2) + " " + (shake * 0.4).toFixed(2) + ")"}>
            {s.open > 0 ? (
              <g transform={tiger}>
                <rect x={-1400} y={-420} width={2800} height={840} fill="#050505" />
                <image
                  href={image}
                  x={-500}
                  y={-279}
                  width={1000}
                  height={559}
                  preserveAspectRatio="xMidYMid slice"
                  transform={"translate(" + (f.look[0] * 9).toFixed(2) + " " + (f.look[1] * 5).toFixed(2) + ")"}
                />
                <rect x={-1400} y={-420} width={2800} height={840} fill="#000" opacity={f.squint * 0.25 + blink * 0.12} />
              </g>
            ) : null}

            {s.open > 0 ? (
              <>
                <Half id={id} side="top" line={line} open={s.open}>
                  {sheet}
                </Half>
                <Half id={id} side="bottom" line={line} open={s.open}>
                  {sheet}
                </Half>
              </>
            ) : (
              sheet
            )}

            {s.crack > 0 && s.open < 0.15 && crack.length > 1 ? (
              <path d={d(crack, false)} fill="none" stroke="#f4f2ee" strokeWidth={2.4} strokeLinejoin="bevel" opacity={1 - s.open / 0.15} />
            ) : null}
          </g>
        </svg>

      </div>
    </section>
  );
}
