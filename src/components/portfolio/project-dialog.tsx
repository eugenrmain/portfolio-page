"use client";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { QuanteraDemo } from "@/components/portfolio/demo";
import { ProjectStudy } from "@/components/portfolio/project-study";
import { ApexProject } from "@/components/portfolio/apex-preview";
import { Tape31Project } from "@/components/portfolio/tape31-preview";
import { allProjects } from "@/lib/project-cards";
import { profile } from "@/lib/portfolio";

export default function ProjectDialog({
  selected,
  open,
  onOpenChange,
  returnFocus,
}: {
  selected: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocus: () => void;
}) {
  const project = allProjects[selected];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="project-dialog sm:max-w-[1100px]"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocus();
        }}
      >
        {project && (
          <>
            <span className="panel-kicker">Project / 0{selected + 1}</span>
            <DialogTitle>{project.title}</DialogTitle>
            <DialogDescription>
              {project.year} · {project.role}
            </DialogDescription>
            <div className="project-dialog-preview" key={project.id}>
              {project.id === "quantera" ? (
                <QuanteraDemo />
              ) : project.id === "apex" ? (
                <ApexProject />
              ) : project.id === "tape31" ? (
                <Tape31Project />
              ) : (
                <ProjectStudy id={project.id as "unity" | "fitness" | "opensource"} />
              )}
            </div>
            <p>{project.description}</p>
            <ul className="technology-list">
              {project.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            {project.id === "opensource" && (
              <a className="glass-action" href={profile.github} target="_blank" rel="noreferrer">
                View GitHub <ArrowUpRightIcon />
              </a>
            )}
            {project.id === "tape31" && (
              <a
                className="glass-action"
                href="https://eugenranow.itch.io/tape-31"
                target="_blank"
                rel="noreferrer"
              >
                Play on itch.io <ArrowUpRightIcon />
              </a>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
