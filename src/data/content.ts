/**
 * Single source of truth for all portfolio content.
 * Ported 1:1 from the original HTML site (index.html + assets/data/site-content.json).
 * Icons are referenced by name and resolved in components/ui/icons.tsx.
 */
import type { IconName } from "@/components/ui/icons";

export const SITE = {
  name: "Basith Ahamad",
  shortName: "BASITH AHAMAD",
  badge: "DEV",
  title: "Basith Ahamad | Software Engineer Portfolio",
  role: "Software Engineer | AI Builder",
  description:
    "Basith Ahamad - Software Engineer and Web Developer specializing in WordPress Development, Full-Stack Web Development, Laravel, and Business Automation.",
  keywords: [
    "Basith Ahamad",
    "Software Engineer",
    "Web Developer",
    "WordPress Developer",
    "Full-Stack Developer",
    "Laravel",
    "Elementor",
    "n8n",
    "AI Builder",
    "Gampaha",
    "Sri Lanka",
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://basithahamad.vercel.app",
  location: "Gampaha, Sri Lanka",
  mapUrl: "https://maps.google.com/?q=Gampaha,Sri%20Lanka",
  email: "bashithahamed79@gmail.com",
  phone: "(+94) 76 2657472",
  phoneHref: "tel:+94762657472",
  resume: "/files/Basith_Ahamad_Resume.pdf",
  resumeFilename: "Basith_Ahamad_Resume.pdf",
  year: 2026,
  links: {
    website: "https://techtitude-labs.vercel.app/",
    github: "https://github.com/BASHITH144",
    linkedin: "https://www.linkedin.com/in/basith-ahamad",
    email: "mailto:bashithahamed79@gmail.com",
    phone: "tel:+94762657472",
    developer: "https://basithahamad.vercel.app/",
  },
} as const;

export const NAV_LINKS = [
  { href: "#home", label: "Home", icon: "home" },
  { href: "#about", label: "About", icon: "user" },
  { href: "#services", label: "Services", icon: "zap" },
  { href: "#skills", label: "Skills", icon: "cpu" },
  { href: "#projects", label: "Projects", icon: "folder" },
  { href: "#experience", label: "Experience", icon: "briefcase" },
  { href: "#process", label: "Process", icon: "settings" },
  { href: "#education", label: "Education", icon: "graduation" },
  { href: "#certificates", label: "Certificates", icon: "award" },
  { href: "#contact", label: "Contact", icon: "mail" },
] as const satisfies ReadonlyArray<{ href: string; label: string; icon: IconName }>;

/** Subset shown in the desktop dock (the full list lives in the overlay menu). */
export const DOCK_LINKS = ["#about", "#services", "#projects", "#experience", "#contact"];

export const HERO = {
  identityTitles: [
    "WEB DEVELOPER",
    "FRONT-END DEV",
    "WORDPRESS DEV",
    "SOFTWARE ENGINEER",
    "UI/UX DESIGNER",
    "POSTER DESIGNER",
    "AUTOMATION BUILDER",
  ],
  statement:
    "HELLO! I'M BASITH, A SOFTWARE ENGINEER & AI BUILDER BUILDING WEB PLATFORMS, AI SYSTEMS & AUTOMATION FROM SRI LANKA.",
  skills: [
    "Full-Stack Web Development (React / Laravel)",
    "AI & Machine Learning (FastAPI / Computer Vision)",
    "WordPress & Elementor Development",
    "Business Automation (n8n Workflows)",
    "UI/UX & Responsive Design",
  ],
  metrics: [
    { value: 1, suffix: "ST", label: "Class Honours - BSc" },
    { value: 10, suffix: "+", label: "Projects & AI" },
    { value: 20, suffix: "+", label: "Technologies & Frameworks" },
    { value: 3, suffix: "", label: "Academic Degrees & Diplomas" },
  ],
  floatingChips: ["React · Next.js", "AI Builder", "n8n Automation"],
} as const;

export type MarqueeTag = { label: string; icon: IconName; tone: "plain" | "accent" | "dark" };

export const MARQUEE_ROWS: readonly [readonly MarqueeTag[], readonly MarqueeTag[]] = [
  [
    { label: "Full Stack Dev", icon: "code", tone: "plain" },
    { label: "AI Builder", icon: "brain", tone: "accent" },
    { label: "Web Architect", icon: "globe", tone: "plain" },
    { label: "React · Next.js", icon: "zap", tone: "dark" },
    { label: "Machine Learning", icon: "bot", tone: "plain" },
    { label: "Node · Django", icon: "database", tone: "accent" },
    { label: "UI/UX Design", icon: "smartphone", tone: "plain" },
    { label: "Cloud & DevOps", icon: "cloud", tone: "dark" },
  ],
  [
    { label: "Python", icon: "terminal", tone: "plain" },
    { label: "WordPress", icon: "layout", tone: "dark" },
    { label: "10+ Projects", icon: "star", tone: "accent" },
    { label: "1st Class Honours", icon: "graduation", tone: "plain" },
    { label: "GitHub", icon: "gitbranch", tone: "dark" },
    { label: "20+ Tech Stack", icon: "award", tone: "accent" },
    { label: "SEO & Analytics", icon: "chart", tone: "plain" },
    { label: "API Integration", icon: "plug", tone: "dark" },
  ],
];

export const STATS = {
  rating: { value: 4.78, decimals: 2, suffix: " / 5", label: "Average rating from our clients" },
  revenue: { value: 1.15, decimals: 2, suffix: "K+", label: "In Client revenue growth" },
  manifesto:
    "“DEDICATED TO BRINGING YOUR VISION TO LIFE BY CRAFTING UNIQUE, HIGHLY AESTHETIC, AND IMPACTFUL DIGITAL EXPERIENCES. MY WORK SPEAKS LOUDER THAN WORDS—EXPLORE THE RESULTS.”",
} as const;

export const ABOUT = {
  eyebrow: "ABOUT ME",
  title: "I BUILD MODERN, SECURE, AND SCALABLE DIGITAL SOLUTIONS WITH A PASSION FOR WEB DEVELOPMENT",
  paragraphs: [
    "I'm a passionate digital designer and web developer focused on creating user-centered digital experiences. I blend creativity with clean, efficient code to build websites that are not only visually appealing but also functional, fast, and reliable.",
    "With a strong eye for design & a solid technical foundation, I transform complex ideas into simple, intuitive digital solutions. I believe great design is purposefully laid out, interaction, and line of code is crafted to enhance usability and deliver real value.",
    "From concept to launch, I work closely with clients to understand their goals, audience and brand vision. My collaborative approach ensures each project reflects the client's identity with focused objectives and performance standards.",
  ],
  badge: { value: 15, suffix: "+" },
} as const;

export const SERVICES = {
  badge: "EXPERTISE & SERVICES",
  title: "WHAT I DO",
  description:
    "From client sites to trained models. The day-to-day at Webxkey, plus what I build on my own time — Full-Stack Architecture, AI & ML Integration, and Business Workflow Automation.",
  items: [
    {
      num: "01",
      icon: "layout",
      title: "WordPress & Website Development",
      desc: "Responsive sites built with Elementor, custom themes, and clean performance. High speed, robust security, and SEO optimization.",
    },
    {
      num: "02",
      icon: "braces",
      title: "Laravel Application Development",
      desc: "POS, inventory, and business management systems built to run daily enterprise operations smoothly and reliably.",
    },
    {
      num: "03",
      icon: "brain",
      title: "AI & Machine Learning Integration",
      desc: "Computer vision and recommendation models wired into real products via FastAPI, TensorFlow, and Python microservices.",
    },
    {
      num: "04",
      icon: "workflow",
      title: "Workflow Automation",
      desc: "n8n pipelines connecting WhatsApp API, webhooks, and third-party services to automate repetitive business tasks.",
    },
    {
      num: "05",
      icon: "devices",
      title: "UI/UX & Responsive Design",
      desc: "Interfaces that hold up across devices, browsers, and real user behavior, combining beauty with intuitive user flows.",
    },
    {
      num: "06",
      icon: "paintbrush",
      title: "Poster & Visual Graphic Design",
      desc: "Eye-catching promotional posters, event flyers, and digital marketing assets designed to capture attention and communicate your brand clearly.",
    },
  ],
} as const satisfies {
  badge: string;
  title: string;
  description: string;
  items: ReadonlyArray<{ num: string; icon: IconName; title: string; desc: string }>;
};

export const SKILLS = {
  badge: "CORE TOOLKIT",
  title: "TECHNICAL PROFICIENCY",
  description:
    "The technologies I reach for in production environments across full-stack engineering, machine learning, and systems automation.",
  groups: [
    {
      title: "Web Development",
      icon: "layout",
      badge: "CMS / DEV",
      items: [
        { name: "WordPress & Elementor", level: 95 },
        { name: "Custom WordPress Themes & Plugins", level: 85 },
        { name: "SEO & Performance Tuning", level: 90 },
      ],
    },
    {
      title: "Languages",
      icon: "code",
      badge: "CORE",
      items: [
        { name: "PHP", level: 90 },
        { name: "Python", level: 85 },
        { name: "JavaScript (ES6+)", level: 85 },
      ],
    },
    {
      title: "Frameworks & UI",
      icon: "layers",
      badge: "STACK",
      items: [
        { name: "Laravel", level: 90 },
        { name: "React & Next.js", level: 80 },
        { name: "Tailwind CSS & Bootstrap", level: 90 },
      ],
    },
    {
      title: "AI & Machine Learning",
      icon: "brain",
      badge: "ML / AI",
      items: [
        { name: "TensorFlow & Keras (MobileNetV2)", level: 80 },
        { name: "Scikit-Learn (Dynamic Pricing)", level: 75 },
        { name: "FastAPI Model Serving", level: 85 },
      ],
    },
    {
      title: "Databases & Architecture",
      icon: "database",
      badge: "DB / ARCH",
      items: [
        { name: "MySQL", level: 85 },
        { name: "Database Schema Design", level: 80 },
        { name: "RBAC & Authentication", level: 75 },
      ],
    },
    {
      title: "Automation & DevOps",
      icon: "settings",
      badge: "OPS",
      items: [
        { name: "n8n Workflow Automation", level: 88 },
        { name: "Git & GitHub Version Control", level: 85 },
        { name: "Agile / Scrum & Figma", level: 80 },
      ],
    },
  ],
} as const satisfies {
  badge: string;
  title: string;
  description: string;
  groups: ReadonlyArray<{
    title: string;
    icon: IconName;
    badge: string;
    items: ReadonlyArray<{ name: string; level: number }>;
  }>;
};

export type CategoryId = "ai-ml" | "pos-inventory" | "tile-3d" | "wordpress" | "web-apps";

export type ProjectCategory = {
  id: CategoryId;
  label: string;
  icon: IconName;
  description: string;
  topics: readonly string[];
};

export const PROJECT_CATEGORIES: readonly ProjectCategory[] = [
  {
    id: "ai-ml",
    label: "AI & Machine Learning",
    icon: "brain",
    description: "AI-powered applications, machine learning models, computer vision, and intelligent solutions.",
    topics: ["AI-powered applications", "Machine learning models", "Computer vision", "Intelligent solutions"],
  },
  {
    id: "pos-inventory",
    label: "POS & Inventory Management Systems",
    icon: "chart",
    description: "Point-of-sale systems, inventory management, dashboards, billing, and business management software.",
    topics: ["Point-of-sale systems", "Inventory management", "Dashboards", "Billing", "Business management software"],
  },
  {
    id: "tile-3d",
    label: "Tile Visualizer & 3D Projects",
    icon: "layers",
    description: "Tile Studio Plus, 2D/3D room visualizers, and interior visualization applications.",
    topics: ["Tile Studio Plus", "2D/3D room visualizers", "Interior visualization applications"],
  },
  {
    id: "wordpress",
    label: "WordPress Development",
    icon: "layout",
    description: "WordPress websites, Elementor designs, business websites, and CMS projects.",
    topics: ["WordPress websites", "Elementor designs", "Business websites", "CMS projects"],
  },
  {
    id: "web-apps",
    label: "Web Applications & Other Projects",
    icon: "globe",
    description:
      "Custom websites, full-stack applications, SaaS platforms, and projects built with different technology stacks.",
    topics: ["Custom websites", "Full-stack applications", "SaaS platforms", "Multi-stack projects"],
  },
];

export type Project = {
  id: number;
  categories: readonly CategoryId[];
  slug: string;
  title: string;
  summary: string;
  tags: readonly string[];
  image: string;
  width: number;
  height: number;
  liveUrl: string | null;
  repoUrl: string | null;
  status: string;
  /** Short bullet points shown in the project detail panel. */
  highlights: readonly string[];
  /** Optional extra screens; when present the detail panel shows them as switchable tabs (the first is the main `image`). */
  gallery?: readonly ProjectShot[];
};

export type ProjectShot = { label: string; src: string; width: number; height: number };

export const PROJECTS_SECTION = {
  badge: "SELECTED WORK",
  title: "PROJECTS & AI SOLUTIONS",
  description:
    "Production web applications, custom platforms, and AI/ML systems engineered for speed, reliability, and real-world impact.",
  backdrop: "JOURNEY",
} as const;

export const PROJECTS: readonly Project[] = [
  {
    id: 6,
    slug: "tile-studio-plus",
    categories: ["web-apps"],
    title: "Tile Studio Plus",
    summary:
      "Multi-tenant SaaS for tile showrooms: customers preview floor and wall tiles in a 3D or 2D room visualizer and get instant PDF quotes, while showrooms and a super-admin manage tiles, subscriptions and payments.",
    tags: ["SaaS", "3D Visualizer", "Dashboard", "Subscriptions"],
    image: "/images/projects/tile-studio-plus-3d-visualizer.webp",
    width: 1920,
    height: 955,
    liveUrl: "https://tilestudioplus.echilion.com/login",
    repoUrl: null,
    status: "2026 · SaaS Platform",
    highlights: [
      "3D room visualizer with lighting presets and camera angles",
      "2D visualizer to tile floors and walls and compare designs",
      "Instant PDF quotes for customers",
      "Showroom dashboard for tile uploads, storage quota and plans",
      "Super-admin dashboard for revenue, subscriptions and tenants",
    ],
    gallery: [
      { label: "3D visualizer", src: "/images/projects/tile-studio-plus-3d-visualizer.webp", width: 1920, height: 955 },
      { label: "2D visualizer", src: "/images/projects/tile-studio-plus-2d-visualizer.webp", width: 1920, height: 872 },
      { label: "Showroom dashboard", src: "/images/projects/tile-studio-plus-showroom-dashboard.webp", width: 1920, height: 995 },
      { label: "Admin dashboard", src: "/images/projects/tile-studio-plus-admin-dashboard.webp", width: 1920, height: 2156 },
      { label: "Login", src: "/images/projects/tile-studio-plus-login.webp", width: 1920, height: 868 },
    ],
  },
  {
    id: 1,
    slug: "valdore-estates",
    categories: ["web-apps"],
    title: "Valdore Estates",
    summary:
      "Platform for real estate properties allowing users to explore listings and contact brokers directly.",
    tags: ["React", "Next.js", "Tailwind CSS"],
    image: "/images/projects/valdore-estates.webp",
    width: 1600,
    height: 5119,
    liveUrl: "https://valdore-estates.vercel.app/",
    repoUrl: "https://github.com/BASHITH144",
    status: "2026 · Web Platform",
    highlights: [
      "Browse and explore real estate property listings",
      "Contact brokers directly from a listing",
      "Built with React, Next.js and Tailwind CSS",
    ],
  },
  {
    id: 2,
    slug: "maaz-advertising",
    categories: ["web-apps"],
    title: "Maaz Advertising",
    summary:
      "Marketing agency website featuring services, portfolio, and contact information for prospective clients.",
    tags: ["React", "Next.js", "Tailwind CSS", "UI/UX"],
    image: "/images/projects/maaz-advertising.webp",
    width: 1600,
    height: 6261,
    liveUrl: "https://maazadvertising.vercel.app/",
    repoUrl: "https://github.com/BASHITH144",
    status: "2026 · Client Web App",
    highlights: [
      "Services and portfolio sections for a marketing agency",
      "Contact details for prospective clients",
      "Built with React, Next.js and Tailwind CSS",
    ],
  },
  {
    id: 3,
    slug: "herit-edge",
    categories: ["ai-ml", "web-apps"],
    title: "HERIT-EDGE",
    summary:
      "Multi‑vendor e‑commerce platform with Admin/Customer/Seller panels and AI-powered visual product recommendations via FastAPI + MobileNetV2.",
    tags: ["PHP", "MySQL", "Python", "FastAPI", "TensorFlow"],
    image: "/images/projects/herit-edge.webp",
    width: 1600,
    height: 7515,
    liveUrl: null,
    repoUrl: "https://github.com/BASHITH144",
    status: "Final-Year Project · E‑Commerce",
    highlights: [
      "Multi-vendor e-commerce with Admin, Customer and Seller panels",
      "AI-powered visual product recommendations",
      "FastAPI service running a MobileNetV2 model",
    ],
  },
  {
    id: 4,
    slug: "saththar-feeds",
    categories: ["pos-inventory"],
    title: "Saththar Feeds Billing System",
    summary:
      "Group project — smart pet shop / feed shop management with AI-assisted recommendations, invoicing and inventory tracking.",
    tags: ["Automation", "Billing", "Inventory"],
    image: "/images/projects/saththar-feeds.webp",
    width: 1600,
    height: 4188,
    liveUrl: null,
    repoUrl: null,
    status: "Group Project · Automation",
    highlights: [
      "Billing and invoicing for a pet / feed shop",
      "Inventory tracking",
      "AI-assisted recommendations",
    ],
  },
  {
    id: 5,
    slug: "detectx",
    categories: ["ai-ml"],
    title: "DetectX (Plant Disease Detection)",
    summary:
      "AI web app to detect plant diseases from leaf images using MobileNetV2 and provide treatment recommendations.",
    tags: ["Python", "TensorFlow", "FastAPI", "React", "Computer Vision"],
    image: "/images/projects/detectx.webp",
    width: 1600,
    height: 4556,
    liveUrl: null,
    repoUrl: "https://github.com/BASHITH144",
    status: "Individual Project · AI/ML",
    highlights: [
      "Detects plant diseases from leaf images",
      "MobileNetV2 model served through FastAPI",
      "Treatment recommendations for each detection",
    ],
  },
];

export const EXPERIENCE = {
  badge: "CAREER TIMELINE",
  title: "WORK EXPERIENCE",
  description:
    "2+ years of professional engineering experience building production-ready applications, client websites, and automated workflows in Sri Lanka.",
  items: [
    {
      role: "Web Developer",
      company: "KD Marketing Group",
      type: "Full Time · Remote",
      date: "Oct 2026 — Present",
      current: true,
      points: [
        "Building and maintaining responsive websites and landing pages for marketing campaigns.",
        "Improving site performance, SEO, and mobile responsiveness across client and company web properties.",
        "Automating marketing and lead-handling workflows with n8n, webhooks, and third-party integrations.",
      ],
    },
    {
      role: "Associate Software Engineer",
      company: "Webxkey",
      type: "Full Time · On Site",
      date: "June 2026 — Aug 2026",
      current: false,
      points: [
        "Developed responsive WordPress websites using Elementor and custom solutions.",
        "Built Laravel-based POS, inventory, and business management systems for enterprise clients.",
        "Automated business workflows using n8n, WhatsApp API, and webhooks.",
      ],
    },
    {
      role: "Software Engineer Intern",
      company: "Webxkey",
      type: "Full Time · On Site",
      date: "Sept 2025 — June 2026",
      current: false,
      points: [
        "Assisted in Laravel application development and custom backend modules.",
        "Built automation workflows using n8n and third-party integrations.",
        "Collaborated in an Agile team to deliver production-ready client solutions.",
      ],
    },
    {
      role: "Web Developer & Social Media Assistant",
      company: "Zenith Engineering",
      type: "Full Time · On Site",
      date: "Aug 2024 — April 2025",
      current: false,
      points: [
        "Managed and maintained the company's WordPress website and digital presence.",
        "Improved website performance, SEO ranking, and mobile responsiveness.",
        "Designed digital marketing materials and social media content to boost engagement.",
      ],
    },
  ],
} as const;

export const PROCESS = {
  badge: "SYSTEMATIC APPROACH",
  title: "HOW I WORK",
  description:
    "A disciplined, three-stage workflow designed to deliver high-performance, scalable, and production-ready applications without scope creep.",
  steps: [
    {
      num: "01",
      icon: "compass",
      title: "Plan & Architect",
      desc: "Scope the problem, map the data model, and choose a stack that won't need a rewrite in a year. Everything begins with clean architecture and realistic requirements.",
    },
    {
      num: "02",
      icon: "hammer",
      title: "Build & Iterate",
      desc: "Ship in small, reviewable increments. Weekly demos, tight feedback loops, and no surprise scope changes. Production-grade code from day one.",
    },
    {
      num: "03",
      icon: "rocket",
      title: "Launch & Support",
      desc: "Monitor, harden, and hand off with thorough documentation — or stay on for ongoing iteration, automation scaling, and performance tuning.",
    },
  ],
} as const satisfies {
  badge: string;
  title: string;
  description: string;
  steps: ReadonlyArray<{ num: string; icon: IconName; title: string; desc: string }>;
};

export const EDUCATION = {
  badge: "EDUCATION",
  title: "EDUCATION",
  description:
    "Academic degrees, diplomas, and certifications relevant to Computer Science and professional development.",
  items: [
    {
      num: "01",
      org: "University of Bedfordshire (UK)",
      title: "BSc (Hons) Computer Science – 1st Class Honours",
      year: "2026",
    },
    {
      num: "02",
      org: "Marwadi University (IND)",
      title: "HND in Computer Engineering – 1st Class With Distinction",
      year: "2024",
    },
    {
      num: "03",
      org: "Aquinas College Of Higher Studies (SL)",
      title: "Diploma in English Language & Literature",
      year: "2026",
    },
  ],
} as const;

export const CERTIFICATES = {
  badge: "CERTIFICATIONS",
  title: "CERTIFICATE COURSES",
  description:
    "Professional certifications and online courses completed to sharpen skills in data, cloud, machine learning, and web development.",
  items: [
    {
      id: 1,
      icon: "chart",
      issuer: "Deloitte / Forage",
      title: "Data Analytics Job Simulation",
      desc: "Practical tasks covering data analysis and forensic technology in a professional job simulation setting.",
      file: "/files/certificates/data-analytics.pdf",
      download: "Data_Analytics_certificate.pdf",
    },
    {
      id: 2,
      icon: "cloud",
      issuer: "Google Cloud / Simplilearn",
      title: "Innovating with Google Cloud AI",
      desc: "Fundamental concepts and practical applications of artificial intelligence solutions on the Google Cloud platform.",
      file: "/files/certificates/google-cloud-ai.pdf",
      download: "Google_Cloud.pdf",
    },
    {
      id: 3,
      icon: "brain",
      issuer: "Simplilearn SkillUp",
      title: "Machine Learning Using Python",
      desc: "Fundamental and practical skills in building and implementing machine learning algorithms using Python.",
      file: "/files/certificates/machine-learning.pdf",
      download: "Machine_Learning_Certificate.pdf",
    },
    {
      id: 4,
      icon: "layout",
      issuer: "DP Education IT Campus",
      title: "WordPress Course",
      desc: "Core concepts and skills for web development and content management using WordPress.",
      file: "/files/certificates/wordpress.pdf",
      download: "Wordpress Certificate.pdf",
    },
  ],
} as const satisfies {
  badge: string;
  title: string;
  description: string;
  items: ReadonlyArray<{
    id: number;
    icon: IconName;
    issuer: string;
    title: string;
    desc: string;
    file: string;
    download: string;
  }>;
};

export const CONTACT = {
  heading: "LET'S CONNECT & CREATE SOMETHING AMAZING",
  emailjs: {
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "d9urbvFxgKIslnU_I",
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_d63ullb",
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_c32qcvb",
  },
} as const;
