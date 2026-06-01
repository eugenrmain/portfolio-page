import { useMemo, useState } from "react";

type Project = {
  title: string;
  year: string;
  role: string;
  stack: string[];
  desc: string;
  href: string;
  // To add an image, set `image` to a URL or an imported asset
  // (e.g. drop a file at public/projects/quantera.jpg and use "/projects/quantera.jpg").
  image?: string | null;
};

const projects: Project[] = [
  {
    title: "Quantera AI — Indexing Pipeline",
    year: "2026",
    role: "AI Engineer · Project Course",
    stack: ["Python", "LLMs", "SQLite", "AI"],
    desc: "Designing a two-stage AI-based indexing pipeline for a financial startup. Extracting unstructured data with LLMs and optimizing cost via smart context filtering across small + large models. Built in an agile team of eight.",
    href: "#",
    image: null,
  },
  {
    title: "Unity 3D Games",
    year: "2023 — Present",
    role: "Solo Developer",
    stack: ["C#", "Unity", "Game Dev"],
    desc: "Designed and built several 3D games for single-player and co-op from scratch. Hands-on with physics, mechanics, animation, and network programming via Unity NGO (Netcode for GameObjects).",
    href: "#",
    image: null,
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
    desc: "Active contributor on GitHub — issues, bug fixes, and PRs. Adapted open source code into personal tools including an automated Google Maps web scraper and a crypto trading bot.",
    href: "https://github.com",
    image: null,
  },
];

const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.stack)))];

export function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.stack.includes(filter))),
    [filter],
  );

  return (
    <section id="projects" className="relative px-5 sm:px-8 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-8 bg-border" />
          03 — Selected work
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

        {/* Filter chips — demo logic for sorting projects by stack */}
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
          {filtered.map((p, i) => {
            const isOpen = openIndex === i;
            return (
              <article
                key={p.title}
                className="reveal-up group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_var(--glow)]"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Image / placeholder slot */}
                <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-surface">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_30%,var(--glow),transparent_60%)] font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      add image — projects/{p.title.toLowerCase().split(" ")[0]}.jpg
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
                  <p
                    className={`mt-3 text-sm leading-relaxed text-muted-foreground transition-all ${
                      isOpen ? "" : "line-clamp-3"
                    }`}
                  >
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
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="font-mono text-[11px] uppercase tracking-widest text-primary transition-colors hover:text-foreground"
                    >
                      {isOpen ? "− less" : "+ more"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center font-mono text-sm text-muted-foreground">
            No projects match "{filter}" yet.
          </p>
        )}
      </div>
    </section>
  );
}
