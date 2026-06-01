import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="group flex items-center gap-2">
          <span className="font-display text-xl tracking-tight">
            <span className="text-primary">/</span>cs.dev
          </span>
        </a>
        <nav
          className={`flex items-center gap-0.5 sm:gap-1 rounded-full glass px-1.5 sm:px-2 py-1 sm:py-1.5 text-xs sm:text-sm transition-all duration-500 ${
            scrolled ? "shadow-[0_8px_30px_-12px_var(--glow)]" : ""
          }`}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative rounded-full px-2.5 sm:px-4 py-1 sm:py-1.5 transition-colors ${
                active === l.href.slice(1)
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === l.href.slice(1) && (
                <span className="absolute inset-0 -z-10 rounded-full bg-primary" />
              )}
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-foreground/90 transition-all hover:border-primary hover:text-primary"
        >
          Let's talk <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}
