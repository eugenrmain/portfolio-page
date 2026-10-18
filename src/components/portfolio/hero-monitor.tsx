"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "motion/mini";
import { ParticleScene } from "@/components/portfolio/particle-scene";
import { SoftwareSystem } from "./software-system";
import { ParticleTerrain } from "./particle-terrain";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const domains = [
  {
    name: "AI",
    title: "From documents to answers.",
    tools: "PYTHON / LLMS / SQLITE",
    label: "02 stages",
    note: "Quantera · Team of 8",
  },
  {
    name: "Software",
    title: "Connecting the moving parts.",
    tools: "APIS / DATABASES / GIT",
    label: "API → SQL",
    note: "Integration & software development",
  },
  {
    name: "Games",
    title: "Systems you can play.",
    tools: "C# / UNITY / NETCODE",
    label: "3D worlds",
    note: "Gameplay & multiplayer systems",
  },
];
export function HeroMonitor() {
  const [active, setActive] = useState(0);
  const monitor = useRef<HTMLDivElement>(null);
  const controls = useRef<ReturnType<typeof animate> | null>(null);
  useEffect(
    () => () => {
      controls.current?.stop();
    },
    [],
  );
  const tilt = (x: number, y: number) => {
    if (!monitor.current) return;
    controls.current?.stop();
    controls.current = animate(
      monitor.current,
      { transform: `rotateX(${x}deg) rotateY(${y}deg)` },
      { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    );
  };
  const domain = domains[active];
  return (
    <div className="monitor-perspective">
      <div
        ref={monitor}
        className="hero-monitor"
        onPointerMove={(event) => {
          const r = event.currentTarget.getBoundingClientRect();
          tilt(
            4 - ((event.clientY - r.top) / r.height) * 8,
            ((event.clientX - r.left) / r.width) * 8 - 4,
          );
        }}
        onPointerLeave={() => {
          tilt(0, 0);
        }}
      >
        <GlowingEffect />
        <div className="monitor-top">
          <span>
            {["Neural field", "Request flow", "Particle terrain"][active]}
            <br />
            {["Pointer reactive", "Local simulation", "Move / click to disturb"][active]}
          </span>
          <span className="monitor-cross">+</span>
        </div>
        <div className="domain-tabs" role="group" aria-label="Explore my domains">
          {domains.map((d, i) => (
            <button key={d.name} aria-pressed={active === i} onClick={() => setActive(i)}>
              {d.name}
            </button>
          ))}
        </div>
        <div className="monitor-art" key={active}>
          {active === 0 && <ParticleScene kind="network" />}
          {active === 1 && <SoftwareSystem />}
          {active === 2 && <ParticleTerrain />}
          <div className="monitor-ruler" aria-hidden="true">
            {Array.from({ length: 17 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
          {active !== 1 && <span className="monitor-axis">X / Y / Z</span>}
        </div>
        <div className="monitor-caption">
          <h2>{domain.title}</h2>
          <span>{domain.tools}</span>
        </div>
        <div className="monitor-bottom">
          <span>
            <i className="live-light" />
            {
              [
                "Neural study // 168 nodes",
                "Local simulation // packet telemetry",
                "Wave field // 1,152 particles",
              ][active]
            }
          </span>
          <strong key={active}>{domain.label}</strong>
        </div>
      </div>
    </div>
  );
}
