const skills = [
  {
    name: "Python",
    desc: "AI pipelines, LLM tooling, data analysis, web scrapers and automation.",
    tag: "Primary",
  },
  {
    name: "Java",
    desc: "Coursework at KTH — algorithms, data structures, and OOP fundamentals.",
    tag: "Academic",
  },
  {
    name: "C# / Unity",
    desc: "3D single-player and co-op games, physics, animation, and Netcode for GameObjects.",
    tag: "Creative",
  },
  {
    name: "C & Go",
    desc: "Systems-level programming, performance-sensitive tools and services.",
    tag: "Systems",
  },
  {
    name: "SQL / Databases",
    desc: "SQLite, relational modelling, query design — Database Technology @ KTH.",
    tag: "Data",
  },
  {
    name: "Git / GitHub",
    desc: "Branching, code review, PRs, and active open source contribution.",
    tag: "Collab",
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative px-5 sm:px-8 py-32 bg-surface/40">
      <div className="mx-auto max-w-6xl">
        <div className="reveal flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-8 bg-border" />
          02 — Skills
        </div>
        <h2 className="reveal mt-6 font-display font-semibold text-4xl leading-[1.05] tracking-tight sm:text-6xl max-w-3xl">
          The tools I reach for <span className="text-primary">first</span>.
        </h2>

        <div className="mt-16 divide-y divide-border border-y border-border">
          {skills.map((s, i) => (
            <article
              key={s.name}
              className="reveal-up group grid grid-cols-[auto_1fr_auto] items-center gap-6 py-6 transition-colors hover:bg-foreground/[0.02] sm:gap-12 sm:py-8"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="font-mono text-xs text-muted-foreground tabular-nums w-10">
                0{i + 1}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-display font-semibold text-3xl tracking-tight transition-all duration-500 group-hover:translate-x-2 group-hover:text-primary sm:text-5xl">
                    {s.name}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                    {s.tag}
                  </span>
                </div>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {s.desc}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
