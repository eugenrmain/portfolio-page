const projects = [
  {
    title: "Neural Pathfinder",
    year: "2025",
    stack: ["Python", "PyTorch", "Unity"],
    desc: "Reinforcement-learning agent that navigates procedurally generated dungeons. Trained 1M steps; visualized live in a Unity sandbox.",
    href: "#",
  },
  {
    title: "Echo — A 2D Platformer",
    year: "2024",
    stack: ["C#", "Unity", "Shader Graph"],
    desc: "A short metroidvania built solo over a semester. Custom physics, particle systems, and an original ambient soundtrack.",
    href: "#",
  },
  {
    title: "RepoLens",
    year: "2024",
    stack: ["Python", "FastAPI", "OpenAI"],
    desc: "CLI that summarizes any GitHub repo and answers questions about its architecture using embeddings + LLMs.",
    href: "#",
  },
  {
    title: "Course-Sched",
    year: "2023",
    stack: ["Python", "Constraint Solver"],
    desc: "An optimizer my classmates actually used during enrollment week. Reduced average scheduling time from 40min to under 2.",
    href: "#",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative px-5 sm:px-8 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-8 bg-border" />
          03 — Selected work
        </div>
        <div className="reveal mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl leading-tight tracking-tight sm:text-6xl max-w-2xl">
            Things I've <em className="italic text-primary">built</em> and learned from.
          </h2>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            All on GitHub →
          </a>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <a
              key={p.title}
              href={p.href}
              className="reveal group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_var(--glow)]"
            >
              <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(600px circle at var(--mx,50%) var(--my,0%), oklch(0.86 0.16 92 / 0.08), transparent 40%)" }}
              />
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                <span>{p.year}</span>
                <span className="transition-transform duration-500 group-hover:rotate-45">↗</span>
              </div>
              <h3 className="mt-6 font-display text-3xl tracking-tight">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
