"use client";
/* eslint-disable @next/next/no-img-element -- Locally optimized product captures support the static export. */

import { useState } from "react";
import { mediaPath } from "@/lib/portfolio";
import { useVisibleSvg } from "./use-visible-svg";

const screenshots = [
  {
    id: "home",
    label: "Home",
    file: "home.webp",
    alt: "Apex Desktop home screen with System, Performance, and Media workspaces",
    caption: "One native workspace for system tools, gaming controls, and media utilities.",
  },
  {
    id: "compression",
    label: "Compression",
    file: "compression.webp",
    alt: "Apex Desktop media compression interface",
    caption: "Local image and video compression, with originals kept intact.",
  },
  {
    id: "system",
    label: "System tools",
    file: "system.webp",
    alt: "Apex Desktop System workspace with Storage, Cleanup, Organize, and File Actions",
    caption: "Storage, cleanup, organizing, and file tools in one native workspace.",
  },
] as const;

const stages = [
  {
    name: "WinUI 3 Frontend",
    code: "01 / Interface",
    detail:
      "A native Windows 11 interface built with C# and WinUI 3 exposes optimization, organization, compression, and monitoring tools.",
  },
  {
    name: "P/Invoke & Win32 APIs",
    code: "02 / Native interop",
    detail:
      "P/Invoke connects managed .NET code to Win32 APIs for system performance, organization, and data management operations.",
  },
  {
    name: "Async Media Compression & Telemetry Engine",
    code: "03 / Processing",
    detail:
      "Asynchronous local media compression runs alongside real-time hardware telemetry tracking, keeping long-running work separate from the interface.",
  },
];

export function ApexProject() {
  const wires = useVisibleSvg();
  const [view, setView] = useState<"screenshots" | "architecture">("screenshots");
  const [selected, setSelected] = useState(0);
  const [stage, setStage] = useState(0);
  const screenshot = screenshots[selected];
  const asset = mediaPath(`/media/apex/${screenshot.file}`);
  return (
    <div className="apex-project">
      <div className="demo-toolbar">
        <div className="demo-switch" role="group" aria-label="Apex project view">
          {(["screenshots", "architecture"] as const).map((name) => (
            <button
              type="button"
              key={name}
              aria-pressed={view === name}
              onClick={() => setView(name)}
            >
              {name === "screenshots" ? "Screenshots" : "Architecture"}
            </button>
          ))}
        </div>
        <span className="demo-project-name">Apex / Native Windows application</span>
      </div>
      {view === "screenshots" ? (
        <div className="apex-screenshots">
          <div
            className="apex-image-options"
            role="group"
            aria-label="Choose an Apex Desktop screenshot"
          >
            {screenshots.map((item, index) => (
              <button
                type="button"
                key={item.id}
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              >
                <img
                  src={mediaPath(`/media/apex/${item.file}`)}
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
          <figure className={`apex-capture apex-capture-${screenshot.id}`}>
            <div className="apex-capture-stage">
              <img
                key={screenshot.id}
                src={asset}
                alt={screenshot.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>
              <span aria-live="polite">{screenshot.caption}</span>
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
      ) : (
        <div className="apex-architecture">
          <span className="panel-kicker">Managed interface → native operations</span>
          <div className="apex-stage-track">
            <svg ref={wires} viewBox="0 0 900 200" preserveAspectRatio="none" aria-hidden="true">
              <path d="M150 100H750" />
              <circle r="3">
                <animateMotion dur="3s" repeatCount="indefinite" path="M150 100H750" />
              </circle>
              <circle r="2">
                <animateMotion
                  dur="3s"
                  begin="-1.5s"
                  repeatCount="indefinite"
                  path="M150 100H750"
                />
              </circle>
            </svg>
            {stages.map((item, index) => (
              <button
                type="button"
                key={item.name}
                aria-pressed={stage === index}
                onClick={() => setStage(index)}
                onPointerEnter={() => setStage(index)}
                onFocus={() => setStage(index)}
              >
                <span>{item.code}</span>
                <strong>{item.name}</strong>
                <i aria-hidden="true">{["{ }", "↔", "⌁"][index]}</i>
              </button>
            ))}
          </div>
          <div className="apex-stage-detail" aria-live="polite">
            <h3>{stages[stage].name}</h3>
            <p>{stages[stage].detail}</p>
          </div>
        </div>
      )}
    </div>
  );
}
