"use client";
/* eslint-disable @next/next/no-img-element */

import { ArrowUpRight, Check, Code } from "lucide-react";
import { useState } from "react";
import { buttonClasses } from "@/components/ui/Button";
import type { Project } from "@/data/content";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  /** Position of the project in its category, for the "01 / 03" counter. */
  index: number;
  total: number;
  /** Keep the screenshot above the write-up at every width (for use in a narrow column). */
  stacked?: boolean;
};

/**
 * Side-by-side project detail: a browser-style frame holding the full-page screenshot (scrolls inside the
 * frame) on one side, and the write-up (status, summary, highlights, stack, links) on the other.
 * Stacks vertically on narrow screens.
 */
export function ProjectDetail({ project, index, total, stacked = false }: Props) {
  const {
    title,
    summary,
    tags,
    liveUrl,
    repoUrl,
    status,
    highlights,
    gallery,
  } = project;
  const host = liveUrl
    ? liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "private project";
  const [shotIndex, setShotIndex] = useState(0);
  const shots = gallery && gallery.length > 1 ? gallery : null;
  const shot = shots ? (shots[shotIndex] ?? shots[0]) : null;
  const image = shot?.src ?? project.image;
  const width = shot?.width ?? project.width;
  const height = shot?.height ?? project.height;

  return (
    <article
      className={cn(
        "grid items-start gap-8",
        !stacked && "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12",
      )}
      aria-label={title}
    >
      {/* Left: the project, in a browser frame */}
      <div className="min-w-0">
        {shots && (
          <div
            role="tablist"
            aria-label={`${title} screens`}
            className="mb-4 flex flex-wrap gap-2"
          >
            {shots.map((s, i) => {
              const on = i === shotIndex;
              return (
                <button
                  key={s.src}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setShotIndex(i)}
                  className={cn(
                    "border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200",
                    on
                      ? "border-fg bg-fg text-ink"
                      : "border-dashed border-line-strong text-muted hover:text-fg",
                  )}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        )}
        <figure className="m-0 border border-line-strong bg-surface shadow-[0_24px_60px_-30px_rgba(0,0,0,0.45)]">
          <div className="flex items-center gap-3 border-b border-line-strong px-4 py-3">
            <span aria-hidden="true" className="flex gap-1.5">
              <i className="block size-2.5 rounded-full bg-line-strong" />
              <i className="block size-2.5 rounded-full bg-line-strong" />
              <i className="block size-2.5 rounded-full bg-line-strong" />
            </span>
            <span className="min-w-0 flex-1 truncate border border-dashed border-line-strong px-3 py-1 text-center font-mono text-[11px] text-muted">
              {host}
            </span>
          </div>
          <div
            className={cn(
              "overflow-y-auto overscroll-contain bg-ink",
              stacked ? "h-[min(48svh,400px)]" : "h-[min(70svh,560px)]",
            )}
            tabIndex={0}
            role="region"
            aria-label={`${title} full-page preview, scrollable`}
          >
            <img
              key={image}
              src={image}
              alt={`${shot ? shot.label : "Full-page"} screenshot of ${title}`}
              width={width}
              height={height}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="border-t border-line-strong px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Scroll inside the frame to see the full page
          </figcaption>
        </figure>
      </div>

      {/* Right: the details */}
      <div
        className={cn(
          "min-w-0",
          stacked ? "border border-dashed border-line-strong p-6 sm:p-8" : "lg:pt-1",
        )}
      >
        <div
          className={cn(
            "flex",
            stacked ? "flex-wrap items-baseline justify-between gap-x-6 gap-y-2" : "flex-col",
          )}
        >
          <h4
            className={cn(
              "text-balance font-display leading-[1.02] tracking-wide",
              stacked
                ? "order-1 text-[clamp(1.8rem,2.8vw,2.6rem)]"
                : "order-2 mt-4 text-[clamp(2rem,3.6vw,3.4rem)]",
            )}
          >
            {title}
          </h4>
          <p
            className={cn(
              "font-mono text-xs uppercase tracking-[0.2em] text-brand-fg",
              stacked ? "order-2" : "order-1",
            )}
          >
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")} · {status}
          </p>
        </div>
        <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted md:text-[17px]">
          {summary}
        </p>

        <div className={cn(stacked && "mt-8 grid gap-8 border-t border-dashed border-line-strong pt-8 sm:grid-cols-2 [&>div]:mt-0")}>
        {highlights.length > 0 && (
          <div className="mt-8">
            <h5 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Highlights
            </h5>
            <ul className="mt-3 space-y-2.5">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 leading-snug">
                  <Check
                    size={16}
                    strokeWidth={2.2}
                    className="mt-0.5 shrink-0 text-brand-fg"
                    aria-hidden="true"
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8">
          <h5 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Tech stack
          </h5>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tech stack">
            {tags.map((t) => (
              <li
                key={t}
                className="border border-dashed border-line-strong px-3 py-1.5 font-mono text-xs text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
        </div>

        <div className={cn("flex flex-wrap items-center gap-3", stacked ? "mt-8" : "mt-10")}>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("primary")}
            >
              Live site <ArrowUpRight size={16} />
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("outline")}
            >
              <Code size={16} /> Source code
            </a>
          )}
          {!liveUrl && (
            <span
              className={cn(
                "font-mono text-xs uppercase tracking-[0.18em] text-muted",
                repoUrl && "sm:ml-1",
              )}
            >
              Not publicly hosted — ask for a walkthrough
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
