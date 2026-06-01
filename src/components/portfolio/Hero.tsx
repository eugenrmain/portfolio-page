export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-5 sm:px-8 pt-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px] animate-float" />
        <div
          className="absolute right-10 top-1/4 h-[300px] w-[300px] rounded-full bg-accent/15 blur-[100px] animate-float"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <p className="reveal font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle animate-pulse" />
          Computer Science · Class of 2026
        </p>

        <h1 className="reveal mt-8 font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.92] tracking-tight">
          Building <em className="text-gradient not-italic">thoughtful</em>
          <br />
          software, <span className="italic text-muted-foreground">one</span>{" "}
          <br className="sm:hidden" />
          commit at a time.
        </h1>

        <div className="reveal mt-10 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            I'm a CS student exploring the intersection of{" "}
            <span className="text-foreground">game development</span>,{" "}
            <span className="text-foreground">artificial intelligence</span>, and{" "}
            <span className="text-foreground">clean engineering</span>. Currently
            shipping side projects and learning out loud.
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
              About me
            </a>
          </div>
        </div>

        <div className="reveal mt-24 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-border pt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span>Python</span>
          <span>·</span>
          <span>C#</span>
          <span>·</span>
          <span>Unity</span>
          <span>·</span>
          <span>GitHub</span>
          <span>·</span>
          <span>AI / ML</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-mono">
        <span className="animate-pulse">scroll ↓</span>
      </div>
    </section>
  );
}
