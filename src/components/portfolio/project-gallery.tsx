"use client";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Reveal } from "@/components/portfolio/motion";
import { Spotlight } from "@/components/portfolio/space-field";
import { ProjectPreview } from "@/components/portfolio/project-preview";
import { allProjects, projectSummaries } from "@/lib/project-cards";
const ProjectDialog = dynamic(() => import("./project-dialog"));

export function ProjectGallery() {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  const [ready, setReady] = useState(false);
  return (
    <>
      <div className="project-card-grid">
        {allProjects.map((item, index) => (
          <Reveal key={item.id} delay={(index % 2) * 0.1}>
            <Spotlight className={"project-card project-card-" + item.id}>
              <article
                id={item.id === "quantera" ? "project-quantera" : item.id}
                aria-labelledby={`${item.id}-card-heading`}
              >
                <div className="project-card-visual">
                  <ProjectPreview id={item.id} />
                  <span className="card-number">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(allProjects.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="project-card-copy">
                  <div className="card-meta">
                    <span>{item.year}</span>
                    <span>{item.role}</span>
                  </div>
                  <h3 id={`${item.id}-card-heading`}>{item.title}</h3>
                  <p>{projectSummaries[item.id]}</p>
                  <div className="card-bottom">
                    <ul className="technology-list" aria-label={`${item.title} technologies`}>
                      {item.stack.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button
                  type="button"
                  className="card-trigger"
                  aria-label={`Explore ${item.title}`}
                  onClick={(event) => {
                    opener.current = event.currentTarget;
                    setSelected(index);
                    setReady(true);
                    setOpen(true);
                  }}
                />
              </article>
            </Spotlight>
          </Reveal>
        ))}
      </div>
      {ready && (
        <ProjectDialog
          selected={selected}
          open={open}
          onOpenChange={setOpen}
          returnFocus={() => opener.current?.focus({ preventScroll: true })}
        />
      )}
    </>
  );
}
