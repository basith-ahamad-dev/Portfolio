"use client"
/* eslint-disable @next/next/no-img-element */

/**
 * Case Stack Scroll: case studies as a stack of site cards, filed up and back like folders in a drawer.
 * The nearest card faces you, the ones behind it show only their top strip. Wheel, drag, swipe or the
 * arrow keys roll the stack; hovering a card lifts it out to face you; clicking one selects it.
 *
 * Every card is painted in z-order under one shared perspective (the stage is not preserve-3d), so
 * neighbouring planes never cut through each other.
 *
 * Adapted for this site: cards are screenshots only (the demo "face" mini-sites were dropped), and the
 * colours / fonts come from the site's tokens.
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"
import gsap from "gsap"

export type CaseCard = {
  title: string
  category: string
  /** A screenshot of the site (16:10 reads best; taller shots are cropped from the top). */
  image: string
}

export type CaseStackScrollProps = {
  /** Front card first; the rest file in behind it. */
  cards: CaseCard[]
  /** Two short lines bottom-left. */
  tagline?: [string, string]
  /** Label after the card count, top-right of the stack. */
  countLabel?: string
  cursorLabel?: string
  onSelect?: (card: CaseCard, index: number) => void
  /** Must be a definite length: percentages collapse on a page with no height chain. */
  height?: string
  className?: string
}

/** Design size of a card; used for the aspect ratio. */
const FACE_W = 1280
const FACE_H = 800

// #region stack-layout
/** How far a card falls past the front before it wraps round to the back of the stack. */
const FALL = 1.6

/** Card k's slot behind the front one, wrapped so the stack loops both ways. */
export const slotOf = (k: number, roll: number, n: number) => ((((k - roll + FALL) % n) + n) % n) - FALL

/**
 * Where card k of n sits when the stack is rolled to `roll` and card `hover` is
 * lifted by `lift` (0..1). y and z are in card heights and rot in degrees, so the
 * same numbers work at any size.
 */
export function cardPose(k: number, roll: number, hover: number, lift: number, n: number) {
  const s = slotOf(k, roll, n)
  let y: number
  let z: number
  let rot: number
  if (s >= 0) {
    // filed up and back along an incline: even strips, shrinking with depth
    y = -s * 0.15 - s * s * 0.003
    z = -s * 0.15
    rot = Math.min(s, 1) * 13
  } else {
    // past the front a card drops out of the bottom, face on
    y = -s * 0.75
    z = -s * 0.04
    rot = 0
  }
  if (hover >= 0 && lift > 0) {
    // the lifted card turns to face you; the cards in front slide down out of its way
    if (k === hover) {
      rot *= 1 - lift
      y -= lift * 0.1
      z += lift * 0.08
    } else if (s < slotOf(hover, roll, n)) y += lift * 0.62
    else y -= lift * 0.05
  }
  // both ends fade to nothing before the wrap, so no card ever jumps in view
  const back = Math.min(13, n - FALL)
  const opacity = s < -1 ? Math.max(0, (s + FALL) / 0.6) : s > back - 1.5 ? Math.max(0, (back - s) / 1.5) : 1
  return { y, z, rot, opacity, slot: s }
}
// #endregion

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

export default function CaseStackScroll({
  cards,
  tagline = ["Filed by type.", "United by quality."],
  countLabel = "projects",
  cursorLabel = "View project",
  onSelect,
  height = "100svh",
  className = "",
}: CaseStackScrollProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])
  const cursorRef = useRef<HTMLDivElement>(null)
  const state = useRef({ roll: 0, target: 0, hover: -1, lifts: [] as number[], ch: 300, cw: 480, front: 0 })
  const [front, setFront] = useState(0)
  const [hover, setHover] = useState(-1)
  const n = cards.length

  useIsoLayoutEffect(() => {
    const root = rootRef.current
    if (!root || n === 0) return
    const st = state.current
    st.lifts = Array.from({ length: n }, (_, i) => st.lifts[i] ?? 0)

    const size = () => {
      const w = root.clientWidth
      const h = root.clientHeight
      const narrow = w < 720
      // the card's width follows the stage, but never so tall the stack can't breathe
      st.cw = Math.min(narrow ? w * 0.84 : w * 0.46, (h * 0.62 * FACE_W) / FACE_H)
      st.ch = (st.cw * FACE_H) / FACE_W
      root.style.setProperty("--cs-cw", st.cw + "px")
      root.style.setProperty("--cs-ch", st.ch + "px")
    }

    const place = () => {
      for (let k = 0; k < n; k++) {
        const el = cardRefs.current[k]
        if (!el) continue
        const p = cardPose(k, st.roll, st.hover, st.hover >= 0 ? st.lifts[st.hover] : 0, n)
        el.style.transform =
          "translate3d(-50%," + (p.y * st.ch).toFixed(2) + "px," + (p.z * st.ch).toFixed(2) + "px) rotateX(" + (-p.rot).toFixed(2) + "deg)"
        el.style.opacity = p.opacity.toFixed(3)
        el.style.zIndex = String(Math.round(1000 - p.slot * 10))
        el.style.visibility = p.opacity <= 0 ? "hidden" : "visible"
        // cards deep in the drawer sit a touch in shadow
        el.style.setProperty("--cs-shade", Math.min(0.22, Math.max(0, (p.slot - 3) * 0.025)).toFixed(3))
      }
    }

    const tick = () => {
      const ease = reduced() ? 1 : 0.085
      st.roll += (st.target - st.roll) * ease
      if (Math.abs(st.target - st.roll) < 0.0005) st.roll = st.target
      for (let k = 0; k < n; k++) {
        const goal = k === st.hover ? 1 : 0
        st.lifts[k] += (goal - st.lifts[k]) * (reduced() ? 1 : 0.12)
      }
      const f = ((Math.round(st.roll) % n) + n) % n
      if (f !== st.front) {
        st.front = f
        setFront(f)
      }
      place()
    }

    size()
    place()
    const ro = new ResizeObserver(() => {
      size()
      place()
    })
    ro.observe(root)
    gsap.ticker.add(tick)
    return () => {
      ro.disconnect()
      gsap.ticker.remove(tick)
    }
  }, [n])

  // wheel, drag and swipe roll the stack, which loops both ways
  useEffect(() => {
    const root = rootRef.current
    if (!root || n === 0) return
    const st = state.current
    let snap = 0
    const onWheel = (e: WheelEvent) => {
      const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      e.preventDefault()
      const px = e.deltaMode === 1 ? d * 32 : d
      st.target += px / 420
      // once the wheel rests, settle on a whole card
      clearTimeout(snap)
      snap = window.setTimeout(() => (st.target = Math.round(st.target)), 160)
    }
    let drag: { id: number; y: number; t: number; moved: boolean } | null = null
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return
      drag = { id: e.pointerId, y: e.clientY, t: st.target, moved: false }
    }
    const onMove = (e: PointerEvent) => {
      if (!drag || drag.id !== e.pointerId) return
      const d = drag.y - e.clientY
      if (!drag.moved && Math.abs(d) > 6) {
        drag.moved = true
        root.setPointerCapture(e.pointerId)
      }
      if (drag.moved) st.target = drag.t + d / (st.ch * 0.42)
    }
    const onUp = (e: PointerEvent) => {
      if (!drag || drag.id !== e.pointerId) return
      if (drag.moved) {
        st.target = Math.round(st.target)
        // a drag is not a click on the card under the finger
        root.addEventListener("click", (c) => c.stopPropagation(), { capture: true, once: true })
      }
      drag = null
    }
    root.addEventListener("wheel", onWheel, { passive: false })
    root.addEventListener("pointerdown", onDown)
    root.addEventListener("pointermove", onMove)
    root.addEventListener("pointerup", onUp)
    root.addEventListener("pointercancel", onUp)
    return () => {
      root.removeEventListener("wheel", onWheel)
      root.removeEventListener("pointerdown", onDown)
      root.removeEventListener("pointermove", onMove)
      root.removeEventListener("pointerup", onUp)
      root.removeEventListener("pointercancel", onUp)
      clearTimeout(snap)
    }
  }, [n])

  // the "View project" disc trails the pointer while a card is lifted
  useEffect(() => {
    const root = rootRef.current
    const cur = cursorRef.current
    if (!root || !cur) return
    const x = gsap.quickTo(cur, "x", { duration: reduced() ? 0 : 0.35, ease: "power3.out" })
    const y = gsap.quickTo(cur, "y", { duration: reduced() ? 0 : 0.35, ease: "power3.out" })
    const onMove = (e: PointerEvent) => {
      // checked per event, not once: a touch screen can grow a mouse later
      if (e.pointerType !== "mouse") return
      const r = root.getBoundingClientRect()
      x(e.clientX - r.left)
      y(e.clientY - r.top)
    }
    root.addEventListener("pointermove", onMove)
    return () => root.removeEventListener("pointermove", onMove)
  }, [])

  const setLift = (k: number) => {
    state.current.hover = k
    setHover(k)
  }

  const go = (d: number) => {
    const st = state.current
    st.target = Math.round(st.target) + d
  }

  if (n === 0) return null

  const shown = hover >= 0 ? hover : front
  const card = cards[shown]

  return (
    <div
      ref={rootRef}
      className={"cs-root" + (hover >= 0 ? " cs-lifting" : "") + (className ? " " + className : "")}
      style={{ "--cs-h": height } as CSSProperties}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown" || e.key === "PageDown") {
          e.preventDefault()
          go(1)
        } else if (e.key === "ArrowUp" || e.key === "PageUp") {
          e.preventDefault()
          go(-1)
        }
      }}
    >
      <style>{CSS}</style>

      <div className="cs-stage">
        {cards.map((c, k) => (
          <button
            key={c.title}
            ref={(el) => {
              cardRefs.current[k] = el
            }}
            type="button"
            className={"cs-card" + (k === hover ? " cs-on" : "")}
            aria-label={c.title + ", " + c.category}
            tabIndex={k === front ? 0 : -1}
            onPointerEnter={(e) => e.pointerType === "mouse" && setLift(k)}
            onPointerLeave={(e) => e.pointerType === "mouse" && state.current.hover === k && setLift(-1)}
            onFocus={() => setLift(k)}
            onBlur={() => setLift(-1)}
            onClick={() => {
              // touch: the first tap lifts, the second opens
              if (hover !== k) return setLift(k)
              onSelect?.(c, k)
            }}
          >
            <span className="cs-card-in">
              <img src={c.image} alt="" draggable={false} loading="lazy" decoding="async" />
            </span>
          </button>
        ))}
      </div>

      <div className="cs-label cs-left" aria-live="polite">
        <span className="cs-mono">{hover >= 0 ? card?.category : shown + 1 + " / " + n}</span>
        <span className="cs-big">{hover >= 0 ? card?.title : card?.category}</span>
      </div>
      <div className="cs-label cs-right">
        <span className="cs-big">
          {n} {countLabel}
        </span>
      </div>
      <div className="cs-mono cs-tag">
        {tagline[0]}
        <br />
        {tagline[1]}
      </div>

      <div ref={cursorRef} className="cs-cursor" aria-hidden="true">
        <span>
          {cursorLabel}
          <svg viewBox="0 0 12 12" width="12" height="12">
            <path d="M2 1l9 5-4 1-2 4z" fill="currentColor" />
          </svg>
        </span>
      </div>
    </div>
  )
}

const CSS = `
.cs-root{position:relative;height:var(--cs-h);min-height:420px;width:100%;overflow:hidden;background:var(--color-ink);color:var(--color-fg);font-family:var(--font-sans);container:cs/inline-size;user-select:none;-webkit-user-select:none}
.cs-root img{max-width:none}
.cs-stage{position:absolute;inset:0;perspective:1100px;perspective-origin:50% 0%;touch-action:pan-x}
.cs-card{position:absolute;left:50%;top:88%;width:var(--cs-cw);height:var(--cs-ch);margin-top:calc(var(--cs-ch) / -2);padding:0;border:0;background:#111;cursor:pointer;transform-origin:50% 50%;backface-visibility:hidden;will-change:transform;outline:none;box-shadow:0 -1px 0 rgb(0 0 0 / .08),0 18px 40px -22px rgb(0 0 0 / .45)}
.cs-card::after{content:"";position:absolute;inset:0;background:#000;opacity:var(--cs-shade,0);pointer-events:none;transition:opacity .2s}
.cs-card:focus-visible{outline:2px solid var(--color-brand);outline-offset:4px}
.cs-card-in{position:absolute;inset:0;overflow:hidden;display:block}
.cs-card-in img{width:100%;height:100%;object-fit:cover;object-position:top;display:block}
.cs-root.cs-lifting .cs-card.cs-on{cursor:none}
.cs-label{position:absolute;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:.35rem;pointer-events:none;z-index:20}
.cs-left{left:clamp(16px,2.4cqw,36px)}
.cs-right{right:clamp(16px,2.4cqw,36px);text-align:right}
.cs-big{font-size:clamp(15px,1.35cqw,22px);font-weight:500;letter-spacing:-.01em;line-height:1.1}
.cs-mono{font-family:var(--font-mono);font-size:clamp(9px,.68cqw,11px);letter-spacing:.04em;text-transform:uppercase;line-height:1.45}
.cs-tag{position:absolute;left:clamp(16px,2.4cqw,36px);bottom:clamp(16px,2.6cqw,34px);z-index:20;pointer-events:none;color:var(--color-muted)}
.cs-cursor{position:absolute;left:0;top:0;z-index:30;pointer-events:none;width:0;height:0}
.cs-cursor span{position:absolute;left:-36px;top:-36px;width:72px;height:72px;border-radius:50%;background:var(--color-brand);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;font-family:var(--font-mono);font-size:9px;letter-spacing:.06em;text-transform:uppercase;text-align:center;line-height:1.2;padding:0 14px;transform:scale(0);transition:transform .35s cubic-bezier(.2,.8,.2,1);box-shadow:0 10px 30px -10px rgb(0 0 0 / .5)}
.cs-root.cs-lifting .cs-cursor span{transform:scale(1)}
@media (hover: none){.cs-cursor{display:none}}

@container cs (max-width: 720px){
  .cs-stage{top:64px;bottom:72px;overflow:hidden}
  .cs-card{top:82%}
  .cs-label{top:clamp(16px,4cqw,28px);transform:none}
  .cs-big{font-size:15px}
}
@media (prefers-reduced-motion: reduce){
  .cs-cursor span,.cs-card::after{transition:none}
}
`
