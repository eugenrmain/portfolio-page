import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";

import { useReveal } from "@/hooks/use-reveal";

export default function App() {
  useReveal();
  return (
    <main className="relative isolate grain">
      <div className="page-ambience" aria-hidden="true" />
      <div className="viewport-fade" aria-hidden="true" />
      <Nav />
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <About />
      <Contact />
    </main>
  );
}
