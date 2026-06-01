export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-5 sm:px-8 pt-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/25 blur-[130px] animate-aurora" />
        <div
          className="absolute right-10 top-1/4 h-[340px] w-[340px] rounded-full bg-accent/20 blur-[110px] animate-aurora"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute left-10 bottom-10 h-[300px] w-[300px] rounded-full bg-[oklch(0.72_0.20_340/0.18)] blur-[120px] animate-aurora"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <p className="reveal font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle animate-pulse" />
          Computer Science · Class of 2026
        </p>

        <h1 className="reveal mt-8 font-display font-semibold text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-tight">
          Building <span className="text-gradient">thoughtful</span>
          <br />
          software, one commit
          <br className="sm:hidden" />
          <span className="text-muted-foreground"> at a time.</span>
        </h1>

        <div className="reveal mt-10 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            CS student working at the intersection of{" "}
            <span className="text-foreground">game development</span>,{" "}
            <span className="text-foreground">artificial intelligence</span>, and{" "}
            <span className="text-foreground">clean engineering</span>.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:gap-3 hover:shadow-[0_10px_40px_-10px_var(--glow)]"
            >
              View work
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#about"
              className="rounded-full border border-border px-6 py-3 text-sm transition-colors hover:border-foreground"
            >
              About
            </a>
          </div>
        </div>

        <div className="reveal mt-24 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-border pt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span>Python</span>
          <span className="text-border">·</span>
          <span>C#</span>
          <span className="text-border">·</span>
          <span>Unity</span>
          <span className="text-border">·</span>
          <span>GitHub</span>
          <span className="text-border">·</span>
          <span>AI / ML</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-mono">
        <span className="animate-pulse">scroll ↓</span>
      </div>
    </section>
  );
}
