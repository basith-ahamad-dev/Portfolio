import type { Metadata, Viewport } from "next";
import { Anton, Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BackToTop } from "@/components/ui/BackToTop";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { Preloader } from "@/components/ui/Preloader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { EDUCATION, SITE } from "@/data/content";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const anton = Anton({ weight: "400", variable: "--font-anton", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: "Software Engineer",
  description: SITE.description,
  url: SITE.url,
  image: `${SITE.url}/opengraph-image`,
  email: SITE.email,
  telephone: "+94762657472",
  address: { "@type": "PostalAddress", addressLocality: "Gampaha", addressCountry: "LK" },
  worksFor: { "@type": "Organization", name: "Webxkey" },
  alumniOf: EDUCATION.items.map((e) => ({ "@type": "CollegeOrUniversity", name: e.org })),
  knowsAbout: ["WordPress", "Laravel", "React", "Next.js", "Machine Learning", "FastAPI", "n8n", "UI/UX Design"],
  sameAs: [SITE.links.github, SITE.links.linkedin],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${anton.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // Escape "<" so the JSON can never terminate the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-brand px-5 py-3 text-sm font-bold text-black transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Preloader />
          <ScrollProgress />
          <CursorGlow />
          <Navbar />
          {children}
          <Footer />
          <BackToTop />
        </MotionProvider>
      </body>
    </html>
  );
}
