import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Github, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import quanteraLogo from "@/assets/quantera-logo.png";
import quanteraDemo from "@/assets/quantera-demo.mp4";
import unityLogo from "@/assets/unity-logo.png";
import { QuanteraPipeline } from "./QuanteraPipeline";
import type { ReactNode } from "react";

type Slide = {
  image?: string | null;
  video?: string | null;
  content?: ReactNode;
  caption: string;
};

type Project = {
  title: string;
  year: string;
  role: string;
  stack: string[];
  desc: string;
  href: string;
  image?: string | null;
  imageClassName?: string;
  cover?: ReactNode;
  slides?: Slide[];
};

const projects: Project[] = [
  {
    title: "Quantera AI - Indexing Pipeline",
    year: "2026",
    role: "AI Engineer · Project Course",
    stack: ["Python", "LLMs", "SQLite", "AI"],
    desc: "Developed a two-stage AI-based indexing pipeline for a financial startup. Extracting unstructured data with LLMs and optimizing cost via smart context filtering across small + large models. Built in an agile team of eight.",
    href: "#",
    image: quanteraLogo,
    imageClassName: "p-8 sm:p-12",
    slides: [
      {
        video: quanteraDemo,
        caption: "Live demo - Querying the indexed financial dataset",
      },
      {
        content: <QuanteraPipeline />,
        caption:
          "Pipeline architecture - PDF/Excel inputs are converted to markdown, categorised by a low-cost model and indexed in SQLite. The API layer combines master prompts, the user query and indexed data, then routes context to a stronger model for the final answer.",
      },
    ],
  },
  {
    title: "Unity 3D Games",
    year: "2023 — Present",
    role: "Solo Developer",
    stack: ["C#", "Unity", "Game Dev"],
    desc: "Designed and built several 3D multiplayer games from scratch. Implemented physics, mechanics, animation, and network programming via Unity NGO.",
    href: "#",
    image: unityLogo,
  },
  {
    title: "Collaborative Fitness App",
    year: "2024",
    role: "API & Database Lead",
    stack: ["Python", "OpenAI", "SQL"],
    desc: "Team-built fitness application where I owned external API integration (OpenAI / ChatGPT) and implemented the database layer. End-to-end collaborative software development.",
    href: "#",
    image: null,
  },
  {
    title: "Open Source Tools & Bots",
    year: "2024 — Present",
    role: "Contributor",
    stack: ["Python", "Go", "Git"],
    desc: "Active contributor on GitHub - issues, bug fixes, and PRs. Adapted open source code into personal tools including an automated Google Maps web scraper and a crypto trading bot.",
    href: "https://github.com/eugenrmain",
    cover: (
      <Github
        className="h-28 w-28 text-white sm:h-36 sm:w-36"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    ),
  },
];

const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.stack)))];

export function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.stack.includes(filter))),
    [filter],
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
    <section id="projects" className="relative px-5 sm:px-8 pt-56 pb-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-8 bg-border" />
          01 — Selected work
        </div>
        <div className="reveal mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display font-semibold text-4xl leading-[1.05] tracking-tight sm:text-6xl max-w-2xl">
            Things I've <span className="text-primary">built</span>.
          </h2>
          <a
            href="https://github.com/eugenrmain"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            All on GitHub →
          </a>
        </div>

        <div className="reveal mt-8 flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setFilter(tag)}
              className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-all ${
                filter === tag
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
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
                <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-black">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className={`h-full w-full object-contain transition-transform duration-700 group-hover:scale-105 ${p.imageClassName ?? ""}`}
                    />
                  ) : p.cover ? (
                    <div className="flex h-full w-full items-center justify-center bg-black transition-transform duration-700 group-hover:scale-105">
                      {p.cover}
                    </div>
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
            No projects match "{filter}" yet.
          </p>
        )}
      </div>

      <Dialog
        open={modalIndex !== null}
        onOpenChange={(o) => {
          if (!o) setModalIndex(null);
        }}
      >
        <DialogContent className="max-w-4xl w-[calc(100vw-2rem)] gap-0 border-border/60 bg-card p-0 shadow-[0_30px_120px_-20px_var(--glow)] sm:rounded-2xl [&>button]:hidden">
          {active && (
            <>
              <div className="flex items-start justify-between gap-4 border-b border-border/60 px-6 py-5 sm:px-8">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    <span className="text-primary">
                      {String((modalIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                      {String(filtered.length).padStart(2, "0")}
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

              <div className="relative">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                  {slides[slide]?.video ? (
                    <video
                      key={slide}
                      src={slides[slide].video as string}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full animate-fade-in object-cover"
                    />
                  ) : slides[slide]?.image ? (
                    <img
                      key={slide}
                      src={slides[slide].image as string}
                      alt={`${active.title} — slide ${slide + 1}`}
                      className="h-full w-full animate-fade-in object-contain"
                    />
                  ) : slides[slide]?.content ? (
                    <div key={slide} className="h-full w-full animate-fade-in">
                      {slides[slide].content}
                    </div>
                  ) : (
                    <div
                      key={slide}
                      className="flex h-full w-full animate-fade-in items-center justify-center bg-[radial-gradient(circle_at_30%_30%,var(--glow),transparent_60%)] px-6 text-center text-sm leading-relaxed text-muted-foreground"
                    >
                      {slides[slide]?.caption}
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

              <div className="px-6 py-5 sm:px-8">
                <DialogDescription asChild>
                  <p
                    key={slide}
                    className="min-h-[3rem] animate-fade-in text-sm leading-relaxed text-muted-foreground sm:text-base"
                  >
                    {slides[slide]?.caption ?? active.desc}
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
