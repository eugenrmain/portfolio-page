import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eugen Ranow — Projects in AI, Games & Software" },
      {
        name: "description",
        content:
          "A project-focused portfolio: AI pipelines, Unity games, open source tools, and software experiments built with Python, C#, Go and SQL.",
      },
      { property: "og:title", content: "Eugen Ranow — Projects in AI, Games & Software" },
      {
        property: "og:description",
        content:
          "Selected projects in AI engineering, game development, and software craft.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <main className="relative grain">
      <Nav />
      <Hero />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
