import { projects } from "@/lib/portfolio";

export const allProjects = [
  {
    id: "quantera",
    title: "Quantera AI — Indexing pipeline",
    category: "AI & data",
    year: "2026",
    role: "AI engineer · Team project",
    stack: ["Python", "LLMs", "SQLite", "AI"],
    description:
      "A two-stage indexing pipeline for financial documents. Smaller models filter context before it reaches larger models. Built in a team of eight.",
  },
  ...projects,
];

export const projectSummaries: Record<string, string> = {
  quantera:
    "A two-stage pipeline for financial documents, using small models to filter context for larger models. Built in a team of eight.",
  unity:
    "A commercial multiplayer game for Steam, targeting 2027. Built in Unity with movement, physics, animation, and networked systems.",
  tape31:
    "Winner of the Meta Game Jam by a milestone, ranked #1 Overall and #1 in Art, Audio, Concept, and Creativity. Developed in Unity with 200+ views on itch.io.",
  apex: projects.find((project) => project.id === "apex")!.description,
  fitness: "A team-built fitness app. I implemented the OpenAI integration and database layer.",
};
