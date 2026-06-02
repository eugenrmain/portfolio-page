import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import quanteraDemo from "@/assets/quantera-demo.gif";
import { QuanteraPipeline } from "./QuanteraPipeline";
import type { ReactNode } from "react";

type Slide = {
  image?: string | null;
  content?: ReactNode;
  caption: string;
  /** When true, image src is re-assigned on activation so GIFs restart from frame 1. */
  replayOnActive?: boolean;
};

type Project = {
  title: string;
  year: string;
  role: string;
  stack: string[];
  desc: string;
  href: string;
  image?: string | null;
  slides?: Slide[];
};

type Category = "AI" | "Games" | "Web & Data" | "Open Source";

const projects: (Project & { category: Category })[] = [
  {
    title: "Quantera AI — Indexing Pipeline",
    year: "2026",
    role: "AI Engineer · Project Course",
    category: "AI",
    stack: ["Python", "LLMs", "SQLite", "AI"],
    desc: "Designing a two-stage AI-based indexing pipeline for a financial startup. Extracting unstructured data with LLMs and optimizing cost via smart context filtering across small + large models. Built in an agile team of eight.",
    href: "#",
    image: null,
    slides: [
      {
        image: quanteraDemo,
        caption: "Live demo — querying the indexed financial dataset end-to-end.",
        replayOnActive: true,
      },
      {
        content: <QuanteraPipeline />,
        caption:
          "Pipeline architecture — PDF/Excel inputs are converted to markdown, categorised by a low-cost model and indexed in SQLite. The API layer combines master prompts, the user query and indexed data, then routes context to a stronger model for the final answer.",
      },
    ],
  },
  {
    title: "Unity 3D Games",
    year: "2023 — Present",
    role: "Solo Developer",
    category: "Games",
    stack: ["C#", "Unity", "Game Dev", "Netcode"],
    desc: "Designed and built several 3D games for single-player and co-op from scratch. Hands-on with physics, mechanics, animation, and network programming via Unity NGO (Netcode for GameObjects).",
    href: "#",
    image: null,
    slides: [
      { caption: "Co-op gameplay built on Unity Netcode for GameObjects." },
      { caption: "Custom character controller, physics & animation rigging." },
      { caption: "Level design and lighting passes in URP." },
    ],
  },
  {
    title: "Collaborative Fitness App",
    year: "2024",
    role: "API & Database Lead",
    category: "Web & Data",
    stack: ["Python", "OpenAI", "SQL", "AI"],
    desc: "Team-built fitness application where I owned external API integration (OpenAI / ChatGPT) and implemented the database layer. End-to-end collaborative software development.",
    href: "#",
    image: null,
    slides: [
      { caption: "OpenAI integration powering personalized workout suggestions." },
      { caption: "Relational schema for users, sessions and progress tracking." },
      { caption: "Team workflow — agile sprints, code reviews, shared ownership." },
    ],
  },
  {
    title: "Open Source Tools & Bots",
    year: "2024 — Present",
    role: "Contributor",
    category: "Open Source",
    stack: ["Python", "Go", "Git", "Automation"],
    desc: "Active contributor on GitHub — issues, bug fixes, and PRs. Adapted open source code into personal tools including an automated Google Maps web scraper and a crypto trading bot.",
    href: "https://github.com",
    image: null,
    slides: [
      { caption: "Google Maps scraper — automated lead extraction at scale." },
      { caption: "Crypto trading bot — strategy backtests and live execution." },
      { caption: "Upstream PRs & issue triage across multiple repos." },
    ],
  },
];

const categories: ("All" | Category)[] = ["All", "AI", "Games", "Web & Data", "Open Source"];
const allStackTags = Array.from(new Set(projects.flatMap((p) => p.stack))).sort();

export function Projects() {
  const [category, setCategory] = useState<"All" | Category>("All");
  const [tag, setTag] = useState<string | null>(null);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const matchCategory = category === "All" || p.category === category;
        const matchTag = !tag || p.stack.includes(tag);
        return matchCategory && matchTag;
      }),
    [category, tag],
  );

  const active = modalIndex !== null ? filtered[modalIndex] : null;
  const slides: Slide[] = active?.slides?.length
    ? active.slides
    : [{ caption: active?.desc ?? "" }];

  useEffect(() => {
    if (modalIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setSlide((s) => (s + 1) % slides.length);
      if (e.key === "ArrowLeft") setSlide((s) => (s - 1 + slides.length) % slides.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalIndex, slides.length]);

  const openProject = (i: number) => {
    setModalIndex(i);
    setSlide(0);
  };

  return (
    <section id="projects" className="relative px-5 sm:px-8 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-8 bg-border" />
          01 — PROJECTS
        </div>
        <div className="reveal mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display font-semibold text-4xl leading-[1.05] tracking-tight sm:text-6xl max-w-2xl">
            Things I've <span className="text-primary">built</span>.
          </h2>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            All on GitHub →
          </a>
        </div>

        {/* Category groups */}
        <div className="reveal mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCategory(c);
                setTag(null);
              }}
              className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-all ${
                category === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Stack/skill tags */}
        <div className="reveal mt-3 flex flex-wrap gap-2">
          {allStackTags.map((t) => {
            const isActive = tag === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTag(isActive ? null : t)}
                className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest transition-all ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-border/60 text-muted-foreground hover:border-primary/60 hover:text-foreground"
                }`}
              >
                {t}
              </button>
            );
          })}
          {(tag || category !== "All") && (
            <button
              type="button"
              onClick={() => {
                setTag(null);
                setCategory("All");
              }}
              className="rounded-full border border-border/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              clear ✕
            </button>
          )}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filtered.map((p, i) => (
            <article
              key={p.title}
              className="reveal-up group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_var(--glow)]"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <button
                type="button"
                onClick={() => openProject(i)}
                className="block w-full text-left"
                aria-label={`Open ${p.title}`}
              >
                <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-surface">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_30%,var(--glow),transparent_60%)] font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      click to view — {p.title.toLowerCase().split(" ")[0]}
                    </div>
                  )}
                </div>

                <div className="p-7">
                  <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    <span>{p.year}</span>
                    <span className="text-primary">{p.role}</span>
                  </div>
                  <h3 className="mt-4 font-display font-semibold text-2xl tracking-tight transition-colors group-hover:text-primary sm:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {p.desc}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      {p.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-primary">
                      view →
                    </span>
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center font-mono text-sm text-muted-foreground">
            No projects match {tag ? `"${tag}"` : `"${category}"`} yet.
          </p>
        )}
      </div>

      {/* Project modal with carousel */}
      <Dialog
        open={modalIndex !== null}
        onOpenChange={(o) => {
          if (!o) setModalIndex(null);
        }}
      >
        <DialogContent
          className="max-w-4xl w-[calc(100vw-2rem)] gap-0 border-border/60 bg-card p-0 shadow-[0_30px_120px_-20px_var(--glow)] sm:rounded-2xl [&>button]:hidden"
        >
          {active && (
            <>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-border/60 px-6 py-5 sm:px-8">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    <span className="text-primary">
                      {String((modalIndex ?? 0) + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
                    </span>
                    <span className="h-px w-6 bg-border" />
                    <span>{active.year}</span>
                  </div>
                  <DialogTitle className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    {active.title}
                  </DialogTitle>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {active.stack.join(" · ")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setModalIndex(null)}
                  className="shrink-0 rounded-full border border-border/60 p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Carousel */}
              <div className="relative">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface">
                  {slides[slide]?.image ? (
                    <img
                      key={slide}
                      src={slides[slide].image as string}
                      alt={`${active.title} — slide ${slide + 1}`}
                      className="h-full w-full animate-fade-in object-cover"
                    />
                  ) : (
                    <div
                      key={slide}
                      className="flex h-full w-full animate-fade-in items-center justify-center bg-[radial-gradient(circle_at_30%_30%,var(--glow),transparent_60%)] px-6 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
                    >
                      slide {slide + 1} — add image
                    </div>
                  )}
                </div>

                {slides.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setSlide((s) => (s - 1 + slides.length) % slides.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border/60 bg-background/60 p-2 text-foreground backdrop-blur-md transition-all hover:border-primary hover:text-primary"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSlide((s) => (s + 1) % slides.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border/60 bg-background/60 p-2 text-foreground backdrop-blur-md transition-all hover:border-primary hover:text-primary"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Caption + dots */}
              <div className="px-6 py-5 sm:px-8">
                <DialogDescription asChild>
                  <p
                    key={slide}
                    className="min-h-[3rem] animate-fade-in text-sm leading-relaxed text-muted-foreground sm:text-base"
                  >
                    {slides[slide]?.caption}
                  </p>
                </DialogDescription>

                {slides.length > 1 && (
                  <div className="mt-5 flex items-center justify-center gap-2">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSlide(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                          i === slide
                            ? "w-6 bg-primary"
                            : "w-1.5 bg-border hover:bg-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
