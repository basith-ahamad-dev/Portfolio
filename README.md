# Basith Ahamad — Portfolio (Next.js)

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion. Orange / black editorial theme with a dashed "blueprint" grid, Anton display type and scroll-driven section animations.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

- `src/data/content.ts` — **all site content** (text, projects, skills, links). Edit here, not in components.
- `src/components/sections/` — Hero, Marquee, StatsManifesto, About, Services, Skills, Projects, Experience, Process, Education, Certificates, Contact.
- `src/components/ui/` — reusable primitives (Section frame with `theme="light"`/`"dark"`, SectionHeading, SplitText word-mask headlines, Dots meters, Reveal, Counter, Wordmark, Button, …).
- `public/images/hero.webp`, `about.webp`, `contact.webp` — swap these files to change the portraits; project screenshots live in `public/images/projects/`.
- `src/components/layout/` — Navbar (dock + full-screen menu) and Footer.
- `public/images`, `public/files` — optimized WebP images, résumé and certificate PDFs.

## Configuration

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_SITE_URL` — canonical URL used for SEO, sitemap and Open Graph.
- `NEXT_PUBLIC_EMAILJS_*` — EmailJS keys for the contact form (falls back to the keys from the original site).

## SEO / performance

Static prerender, `next/font` self-hosted fonts, `next/image` optimization, metadata + Open Graph image, JSON-LD `Person` schema, `sitemap.xml`, `robots.txt`, reduced-motion support and keyboard/ARIA-friendly navigation.
