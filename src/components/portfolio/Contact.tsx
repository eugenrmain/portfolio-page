const socials = [
  { label: "GitHub", href: "https://github.com/eugenrmain" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/eugen-ranow-a093a6324" },
];

export function Contact() {
  return (
    <section id="contact" className="relative px-5 sm:px-8 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-8 bg-border" />
          05 — Contact
        </div>

        <h2 className="mt-8 font-display font-semibold text-[clamp(2.75rem,6vw,5rem)] leading-[0.95] tracking-tight">
          Eugen Ranow
        </h2>

        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 flex-col items-start gap-4 font-mono text-sm tracking-wide sm:text-base">
            <a
              href="mailto:eugen.ranow2005@gmail.com"
              className="max-w-full break-all border-b border-primary/30 pb-2 text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              eugen.ranow2005@gmail.com
            </a>
            <a
              href="tel:+46721525858"
              className="border-b border-primary/30 pb-2 text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              +46 72 152 58 58
            </a>
          </div>
          <div className="shrink-0 border-l border-primary/30 pl-5 font-mono text-xs uppercase tracking-widest md:border-l-0 md:border-r md:pl-0 md:pr-5 md:text-right">
            <p className="text-foreground/80">Based in Stockholm</p>
            <p className="mt-3 flex items-center gap-2 text-primary md:justify-end">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              Open to internships
            </p>
          </div>
        </div>

        <div className="mt-24 grid gap-6 border-t border-border pt-10 sm:grid-cols-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-center justify-between border-b border-border pb-4 transition-colors hover:border-primary"
            >
              <span className="font-display font-semibold text-xl transition-colors group-hover:text-primary">
                {s.label}
              </span>
              <span className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary">
                ↗
              </span>
            </a>
          ))}
        </div>

        <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} — Eugen Ranow</span>
        </footer>
      </div>
    </section>
  );
}
