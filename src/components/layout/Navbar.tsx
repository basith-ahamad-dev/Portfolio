"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Download, MapPin, Menu, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { DOCK_LINKS, NAV_LINKS, SITE } from "@/data/content";
import { Icon } from "@/components/ui/icons";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";

const SOCIALS = [
  { label: "Website", href: SITE.links.website, icon: "globe" },
  { label: "GitHub", href: SITE.links.github, icon: "github" },
  { label: "LinkedIn", href: SITE.links.linkedin, icon: "linkedin" },
  { label: "Email", href: SITE.links.email, icon: "mail" },
  { label: "Phone", href: SITE.links.phone, icon: "phone" },
] as const;

function useActiveSection() {
  const [active, setActive] = useState("#home");
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return active;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const active = useActiveSection();
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  // Solid bar once scrolled; slides away while scrolling down, returns on any upward scroll.
  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
    const prev = scrollY.getPrevious() ?? 0;
    if (v > prev && v > 480) setHidden(true);
    else if (v < prev) setHidden(false);
  });

  const close = useCallback(() => {
    setOpen(false);
    menuBtnRef.current?.focus();
  }, []);

  // Lock page scroll, handle Escape, move focus into the menu while it's open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <motion.header
        initial={{ y: "-100%" }}
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: hidden ? 0 : 0.05 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-dashed transition-colors duration-500",
          scrolled ? "border-white/20 bg-black/85 backdrop-blur-xl" : "border-white/10 bg-gradient-to-b from-black/70 to-transparent",
        )}
      >
        <nav aria-label="Primary" className="mx-auto grid h-16 max-w-[1680px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 sm:h-[4.5rem] sm:px-8 lg:px-12">
          {/* Brand */}
          <a href="#home" aria-label={`${SITE.name} — back to top`} className="group flex items-center">
            <Image
              src="/images/logo.png"
              alt={SITE.name}
              width={844}
              height={357}
              priority
              className="h-10 w-auto transition-transform duration-500 group-hover:scale-[1.04] sm:h-12"
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center justify-center gap-9 lg:flex xl:gap-12">
            {DOCK_LINKS.map((href) => {
              const link = NAV_LINKS.find((l) => l.href === href);
              if (!link) return null;
              const isActive = active === href;
              return (
                <li key={href}>
                  <a
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative block py-2 font-display text-[15px] tracking-[0.12em] transition-colors duration-300",
                      isActive ? "text-white" : "text-white/60 hover:text-white",
                    )}
                  >
                    {link.label}
                    {isActive ? (
                      <motion.span layoutId="nav-underline" transition={{ duration: 0.45, ease: EASE_OUT_EXPO }} className="absolute inset-x-0 -bottom-0.5 h-[3px] bg-brand" />
                    ) : (
                      <span className="absolute inset-x-0 -bottom-0.5 h-[3px] origin-left scale-x-0 bg-brand/70 transition-transform duration-300 group-hover:scale-x-100" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="col-start-3 flex items-center gap-2.5">
            <a
              href="#contact"
              className="group hidden h-11 items-center gap-2 bg-white px-5 font-display text-[15px] tracking-[0.1em] text-black transition-colors duration-300 hover:bg-brand sm:inline-flex"
            >
              Let&apos;s talk
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href={SITE.resume}
              download={SITE.resumeFilename}
              aria-label="Download CV"
              className="grid size-11 place-items-center border border-white/25 text-white transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-black"
            >
              <Download size={17} aria-hidden="true" />
            </a>
            <button
              ref={menuBtnRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="site-menu"
              className="grid size-11 place-items-center bg-brand text-black transition-colors duration-300 hover:bg-white"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-[70] overflow-y-auto bg-ink"
          >
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="container-x relative flex min-h-full flex-col py-5 sm:py-6">
              <div className="flex items-center justify-between">
                <Image src="/images/logo.png" alt={SITE.name} width={844} height={357} className="h-11 w-auto" />
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className="group inline-flex items-center gap-3 border border-line-strong py-1.5 pl-5 pr-1.5 font-display text-base tracking-widest transition-colors hover:border-brand hover:text-brand"
                >
                  Close
                  <span className="grid size-9 place-items-center bg-brand text-black transition-transform duration-500 group-hover:rotate-90">
                    <X size={16} />
                  </span>
                </button>
              </div>

              <div className="grid flex-1 gap-12 py-10 md:py-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
                <ul className="flex flex-col">
                  {NAV_LINKS.map((link, i) => {
                    const isActive = active === link.href;
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: EASE_OUT_EXPO }}
                        className="border-b border-line"
                      >
                        <a
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="group flex items-center gap-4 py-3 sm:gap-6 sm:py-4"
                        >
                          <span className="w-7 font-mono text-xs tracking-widest text-muted">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <Icon
                            name={link.icon}
                            size={22}
                            className={cn(
                              "shrink-0 transition-colors",
                              isActive ? "text-brand" : "text-muted group-hover:text-brand",
                            )}
                          />
                          <span
                            className={cn(
                              "font-display text-[clamp(1.75rem,4.4vw,3rem)] font-bold uppercase leading-none tracking-tight transition-all duration-300 group-hover:translate-x-3",
                              isActive ? "text-brand" : "text-fg group-hover:text-brand",
                            )}
                          >
                            {link.label}
                          </span>
                          <ArrowUpRight
                            size={22}
                            className="ml-auto -translate-x-2 text-brand opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                          />
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>

                <motion.aside
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7, ease: EASE_OUT_EXPO }}
                  className="flex flex-col justify-between gap-10 border border-dashed border-line-strong bg-fg/[0.03] p-6 sm:p-8"
                >
                  <div>
                    <h2 className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted">
                      Contact Info
                    </h2>
                    <ul className="space-y-5">
                      <li className="flex items-start gap-4">
                        <MapPin size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                        <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                          {SITE.location}
                        </a>
                      </li>
                      <li className="flex items-start gap-4">
                        <Icon name="mail" size={20} className="mt-0.5 shrink-0 text-brand" />
                        <a href={SITE.links.email} className="break-all hover:text-brand">
                          {SITE.email}
                        </a>
                      </li>
                      <li className="flex items-start gap-4">
                        <Icon name="phone" size={20} className="mt-0.5 shrink-0 text-brand" />
                        <a href={SITE.phoneHref} className="hover:text-brand">
                          {SITE.phone}
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted">Find me online</h2>
                    <ul className="flex flex-wrap gap-3">
                      {SOCIALS.map((s) => (
                        <li key={s.label}>
                          <a
                            href={s.href}
                            aria-label={s.label}
                            title={s.label}
                            {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="grid size-12 place-items-center border border-line-strong bg-raised text-fg transition-all hover:-translate-y-1 hover:border-brand hover:bg-brand hover:text-black"
                          >
                            <Icon name={s.icon} size={20} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.aside>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
