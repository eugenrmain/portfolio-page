const skills = [
  {
    name: "Python",
    desc: "Data pipelines, scripting, ML prototyping with PyTorch & scikit-learn.",
    years: "4y",
    tag: "Primary",
  },
  {
    name: "C#",
    desc: "Game logic, gameplay systems, and tooling inside the .NET ecosystem.",
    years: "3y",
    tag: "Daily",
  },
  {
    name: "Unity",
    desc: "2D & 3D prototypes, shaders, and editor extensions. Published demos on itch.io.",
    years: "3y",
    tag: "Creative",
  },
  {
    name: "GitHub",
    desc: "Branching workflows, code review, CI/CD with Actions, open-source contributions.",
    years: "4y",
    tag: "Collab",
  },
  {
    name: "AI / ML",
    desc: "Neural nets, transformer fine-tuning, prompt engineering, vector search.",
    years: "2y",
    tag: "Research",
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
        <h2 className="reveal mt-6 font-display text-4xl leading-tight tracking-tight sm:text-6xl max-w-3xl">
          The tools I reach for <em className="italic text-primary">first</em>.
        </h2>

        <div className="mt-16 divide-y divide-border border-y border-border">
          {skills.map((s, i) => (
            <article
              key={s.name}
              className="reveal group grid grid-cols-[auto_1fr_auto] items-center gap-6 py-6 transition-colors hover:bg-foreground/[0.02] sm:gap-12 sm:py-8"
            >
              <span className="font-mono text-xs text-muted-foreground tabular-nums w-10">
                0{i + 1}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-display text-3xl tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-5xl">
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
              <span className="font-mono text-xs text-muted-foreground tabular-nums">
                {s.years}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
