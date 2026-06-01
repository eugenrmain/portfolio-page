export function About() {
  return (
    <section id="about" className="relative px-5 sm:px-8 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-8 bg-border" />
          01 — About
        </div>

        <div className="mt-12 grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <div className="reveal-left">
            <h2 className="font-display font-semibold text-4xl leading-[1.05] tracking-tight sm:text-6xl">
              Every project shipped like it's going to{" "}
              <span className="text-primary">production</span>.
            </h2>
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Started writing code to make games. Five years and many broken
                builds later, pursuing a Computer Science degree with a focus
                on intelligent systems and interactive media.
              </p>
              <p>
                Most of my time goes into shipping small, polished things —
                Unity prototypes, automation scripts, and ML experiments. I
                care about <span className="text-foreground">readable code</span>,{" "}
                <span className="text-foreground">honest documentation</span>, and
                interfaces that respect the person using them.
              </p>
            </div>
          </div>

          <div className="reveal-right space-y-4">
            {[
              { k: "Currently", v: "B.Sc. Computer Science, 3rd year" },
              { k: "Focus", v: "AI · Game Dev · Tooling" },
              { k: "Location", v: "Remote / Worldwide" },
              { k: "Status", v: "Open to internships" },
            ].map((row) => (
              <div
                key={row.k}
                className="group flex items-baseline justify-between gap-4 border-b border-border pb-4 transition-colors hover:border-primary/60"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {row.k}
                </span>
                <span className="text-right text-base">{row.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
