"use client";
import { useState } from "react";
import { ParticleTerrain } from "./particle-terrain";
import { FitnessPreview, ProjectPreview } from "./project-preview";

const studies = {
  unity: [
    [
      "Physics",
      "Gameplay & physics",
      "I build game mechanics, physics, and animation in Unity. Move over this particle study and click to send an impulse through the field.",
    ],
    [
      "Gameplay",
      "From input to interaction",
      "I’m developing a commercial 3D multiplayer game targeting Steam in 2027, combining movement mechanics, physics interactions, and animation.",
    ],
    [
      "Netcode",
      "Networked systems",
      "Multiplayer networking uses Unity Netcode for GameObjects, alongside the gameplay and physics systems.",
    ],
  ],
  fitness: [
    [
      "Application",
      "A team-built fitness app",
      "The application brings together a shared fitness experience, an external API integration, and persistent data.",
    ],
    [
      "API",
      "OpenAI integration",
      "I was responsible for connecting the application to the OpenAI API and implementing that integration with the team.",
    ],
    [
      "Database",
      "Persistent application data",
      "I implemented the SQL database layer, working across the application and its external service boundary.",
    ],
  ],
  opensource: [
    [
      "Explore",
      "Understand an existing system",
      "I use GitHub to explore existing code and report issues in open source projects.",
    ],
    [
      "Build",
      "Personal tools & bots",
      "My personal tools include a Google Maps web scraper and a crypto trading bot, built from open source projects.",
    ],
    [
      "Contribute",
      "Bug fixes & contributions",
      "I contribute changes and bug fixes on GitHub, working with Python, Go, and Git.",
    ],
  ],
} as const;

export function ProjectStudy({ id }: { id: "unity" | "fitness" | "opensource" }) {
  const [active, setActive] = useState(0);
  const steps = studies[id];
  return (
    <div className={`project-study study-${id}`}>
      <div className="study-visual">
        {id === "unity" ? (
          <ParticleTerrain />
        ) : id === "fitness" ? (
          <FitnessPreview expanded />
        ) : (
          <ProjectPreview id={id} />
        )}
      </div>
      <div className="study-tabs" role="group" aria-label="Explore project engineering">
        {steps.map(([label], index) => (
          <button
            type="button"
            key={label}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
          >
            <span>0{index + 1}</span>
            {label}
          </button>
        ))}
      </div>
      <div className="study-detail" aria-live="polite">
        <h3>{steps[active][1]}</h3>
        <p>{steps[active][2]}</p>
      </div>
    </div>
  );
}
