const socials = [
  { label: "Email", href: "mailto:eugen.ranow2005@gmail.com" },
  { label: "Phone", href: "tel:+46721525858" },
  { label: "GitHub", href: "https://github.com/eugenrmain" },
  { label: "LinkedIn", href: "www.linkedin.com/in/eugen-ranow-a093a6324" },
];

export function Contact() {
  return (
    <section id="contact" className="relative px-5 sm:px-8 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-8 bg-border" />
          03 — Contact
        </div>

        <h2 className="reveal mt-8 font-display font-semibold text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-tight">
          Eugen Ranow
        </h2>

        <div className="reveal mt-12 flex flex-wrap items-center gap-4">
          <a
            href="mailto:eugen.ranow2005@gmail.com"
            className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-base font-medium text-primary-foreground transition-all hover:gap-4 hover:shadow-[0_10px_40px_-10px_var(--glow)]"
          >
            eugen.ranow2005@gmail.com
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Based in Stockholm · Open to internships
          </span>
        </div>

        <div className="reveal mt-24 grid gap-6 border-t border-border pt-10 sm:grid-cols-4">
          {socials.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="reveal-up group flex items-center justify-between border-b border-border pb-4 transition-colors hover:border-primary"
              style={{ animationDelay: `${i * 80}ms` }}
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

        <footer className="reveal mt-20 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} — Eugen Ranow</span>
        </footer>
      </div>
    </section>
  );
}
