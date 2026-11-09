"use client";
/* eslint-disable @next/next/no-img-element -- Locally optimized product captures support the static export. */

import { useState } from "react";
import { mediaPath } from "@/lib/portfolio";

const screenshots = [
  {
    id: "title",
    label: "Title & Menu",
    file: "title.webp",
    alt: "Tape 31 retro VHS title screen showing the abandoned brick facility at night with Play, Settings, and Eject options",
  },
  {
    id: "corridor",
    label: "Corridor",
    file: "corridor.webp",
    alt: "Claustrophobic tiled facility hallway with Help Me Danny written in blood and camcorder HUD overlay",
  },
  {
    id: "terminal",
    label: "Medical Office",
    file: "terminal.webp",
    alt: "Dr. Hollister's office desk with CRT terminal monitor displaying glowing green code and narrative dialogue",
  },
  {
    id: "chamber",
    label: "Restraint Chamber",
    file: "chamber.webp",
    alt: "Dark interrogation chamber with bloodstained walls and heavy restraint chair under harsh overhead spotlight",
  },
  {
    id: "facility",
    label: "Warehouse Floor",
    file: "facility.webp",
    alt: "Camcorder surveillance perspective across dimly-lit industrial warehouse floor with volumetric light cones and fallen staff member",
  },
] as const;

export function Tape31Project() {
  const [selected, setSelected] = useState(0);
  const screenshot = screenshots[selected];
  const asset = mediaPath(`/media/tape31/${screenshot.file}`);

  return (
    <div className="tape31-project">
      <div className="demo-toolbar">
        <span className="demo-project-name">Tape 31 / Meta Game Jam</span>
      </div>

      <div className="tape31-screenshots">
        <div
          className="tape31-image-options"
          role="group"
          aria-label="Choose a Tape 31 capture"
        >
          {screenshots.map((item, index) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              <img
                src={mediaPath(`/media/tape31/${item.file}`)}
                alt=""
                width="160"
                height="100"
                loading="lazy"
                decoding="async"
              />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <figure className={`tape31-capture tape31-capture-${screenshot.id}`}>
          <div className="tape31-capture-stage">
            <img
              key={screenshot.id}
              src={asset}
              alt={screenshot.alt}
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption>
            <a
              href={asset}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${screenshot.label.toLowerCase()} at full size in a new tab`}
            >
              Open full size <span aria-hidden="true">↗</span>
            </a>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
