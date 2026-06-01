// To add a profile picture: drop an image at `public/about.jpg`
// (or change the src below to any URL / imported asset).
const PROFILE_IMAGE: string | null = null; // e.g. "/about.jpg"

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
              Analytical, driven, and shipping work that{" "}
              <span className="text-primary">matters</span>.
            </h2>
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                I'm a second-year M.Sc. student in Computer Science and
                Engineering at KTH with a strong passion for technology and a
                background spanning <span className="text-foreground">AI</span>,{" "}
                <span className="text-foreground">software development</span>,{" "}
                <span className="text-foreground">data analysis</span>, and
                leadership.
              </p>
              <p>
                In my free time I build games in Unity and contribute to open
                source projects. I'm currently seeking an internship, part-time,
                or summer position where I can apply my interest in coding and
                problem solving in an innovative environment.
              </p>
            </div>
          </div>

          <div className="reveal-right space-y-6">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-card">
              {PROFILE_IMAGE ? (
                <img
                  src={PROFILE_IMAGE}
                  alt="Eugen Ranow"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,var(--glow),transparent_60%)] font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  add photo → public/about.jpg
                </div>
              )}
            </div>

            <div className="space-y-3">
              {[
                { k: "Currently", v: "M.Sc. CS @ KTH (2024–2029)" },
                { k: "Focus", v: "AI · Game Dev · Software" },
                { k: "Location", v: "Stockholm, Sweden" },
                { k: "Status", v: "Open to internships" },
              ].map((row) => (
                <div
                  key={row.k}
                  className="group flex items-baseline justify-between gap-4 border-b border-border pb-3 transition-colors hover:border-primary/60"
                >
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {row.k}
                  </span>
                  <span className="text-right text-sm">{row.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
