export function Hero() {
  return (
    <section id="home" className="relative flex items-center overflow-hidden px-5 sm:px-8 pt-32">
      <div className="mx-auto w-full max-w-6xl">
        <p className="reveal font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle animate-pulse" />
          MY PORTFOLIO · 2023 — PRESENT
        </p>

        <h1 className="reveal mt-8 font-display font-semibold text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-tight">
          Eugen Ranow
          <br />
          <span className="text-muted-foreground text-[0.8em]">AI, Software & Games.</span>
        </h1>

        <div className="reveal mt-10 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            A working archive of <span className="text-foreground">AI pipelines</span>,{" "}
            <span className="text-foreground">Unity games</span>, and{" "}
            <span className="text-foreground">open source tools</span>.
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
              href="#contact"
              className="rounded-full border border-border px-6 py-3 text-sm transition-colors hover:border-foreground"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="reveal mt-24 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-border pt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="flex flex-col items-center">PYTHON</span>
          <span className="text-border">·</span>
          <span className="flex flex-col items-center text-center">C# / UNITY</span>
          <span className="text-border">·</span>
          <span className="flex flex-col items-center">SQL</span>
          <span className="text-border">·</span>
          <span className="flex flex-col items-center">LLMS</span>
        </div>
      </div>
    </section>
  );
}
