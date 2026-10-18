"use client";

import { useEffect, useRef } from "react";

type Point3 = { x: number; y: number; z: number };
type SceneKind = "network" | "globe";

export function ParticleScene({
  kind = "network",
  className = "",
}: {
  kind?: SceneKind;
  className?: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const surface = canvas.current;
    if (!surface) return;
    const ctx = surface.getContext("2d", { alpha: true });
    if (!ctx) return;
    let width = 0,
      height = 0,
      frame = 0,
      last = 0,
      visible = false,
      px = 0,
      py = 0;
    const pointer = { x: 0, y: 0, inside: false };
    const count =
      kind === "globe" ? (surface.getBoundingClientRect().width < 500 ? 800 : 1400) : 168;
    const points: Point3[] = Array.from({ length: count }, (_, i) => {
      if (kind !== "globe") {
        const noise = (n: number) => {
          const value = Math.sin(n * 127.1 + 311.7) * 43758.5453;
          return value - Math.floor(value);
        };
        const cluster = Math.floor(i / 56) - 1;
        const x = cluster * 0.68 + (noise(i + 1) - 0.5) * 0.85;
        return {
          x,
          y: Math.sin(x * 3.3) * 0.35 + (noise(i + 10) - 0.5) * 0.9,
          z: (noise(i + 100) - 0.5) * 1.1,
        };
      }
      const y = 1 - (i / (count - 1)) * 2,
        r = Math.sqrt(1 - y * y),
        angle = i * 2.39996323;
      return { x: Math.cos(angle) * r, y, z: Math.sin(angle) * r };
    });
    const links: number[][] = [];
    if (kind !== "globe")
      for (let i = 0; i < count; i++)
        for (let j = i + 1; j < count; j++) {
          const a = points[i],
            b = points[j];
          if (Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) < 0.43) links.push([i, j]);
        }
    const sprite = (color: string) => {
      const c = document.createElement("canvas");
      c.width = 32;
      c.height = 32;
      const g = c.getContext("2d")!;
      const gradient = g.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "#ffffff");
      gradient.addColorStop(0.12, color);
      gradient.addColorStop(0.35, color + "88");
      gradient.addColorStop(1, color + "00");
      g.fillStyle = gradient;
      g.fillRect(0, 0, 32, 32);
      return c;
    };
    const blue = sprite("#67d8ff"),
      violet = sprite("#ac83ff");
    const resize = () => {
      const r = surface.getBoundingClientRect();
      width = r.width;
      height = r.height;
      const dpr = Math.min(devicePixelRatio, 1.6);
      surface.width = Math.round(width * dpr);
      surface.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const move = (event: PointerEvent) => {
      const r = surface.getBoundingClientRect();
      pointer.x = event.clientX - r.left;
      pointer.y = event.clientY - r.top;
      pointer.inside = true;
    };
    const leave = () => {
      pointer.inside = false;
    };
    const project = (p: Point3, angle: number) => {
      const x = p.x * Math.cos(angle) + p.z * Math.sin(angle),
        z = p.z * Math.cos(angle) - p.x * Math.sin(angle);
      const perspective = 2.8 / (2.8 - z * 0.3),
        scale =
          kind === "globe"
            ? Math.min(width * 0.43, height * 0.68)
            : Math.min(width * 0.35, height * 0.58);
      let sx =
        (kind === "globe" ? width * 0.79 : width * 0.49) +
        x * scale * (kind === "globe" ? 1 : 1.4) * perspective;
      let sy =
        height * (kind === "globe" ? 0.66 : 0.52) +
        p.y * scale * (kind === "globe" ? 1 : 0.78) * perspective +
        Math.sin(x * 3 + angle * 3) * scale * 0.12;
      if (pointer.inside && kind !== "globe") {
        const dx = sx - px,
          dy = sy - py,
          d = Math.hypot(dx, dy);
        if (d < 105) {
          const push = (1 - d / 105) * 15;
          sx += (dx / (d || 1)) * push;
          sy += (dy / (d || 1)) * push;
        }
      }
      return { x: sx, y: sy, z };
    };
    const draw = (time: number) => {
      frame = requestAnimationFrame(draw);
      if (!visible || document.hidden || time - last < (width < 500 ? 40 : 32)) return;
      last = time;
      px += (pointer.x - px) * 0.1;
      py += (pointer.y - py) * 0.1;
      ctx.clearRect(0, 0, width, height);
      const angle =
        (kind === "globe" ? time * 0.000055 : Math.sin(time * 0.00018) * 0.35) +
        (pointer.inside ? (px / width - 0.5) * 0.12 : 0);
      const projected = points.map((p) => project(p, angle));
      if (kind !== "globe") {
        for (let bucket = 0; bucket < 2; bucket++) {
          ctx.beginPath();
          for (const [a, b] of links) {
            const p = projected[a],
              q = projected[b];
            if ((points[a].x > 0.1 ? 1 : 0) !== bucket) continue;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
          }
          ctx.strokeStyle = bucket ? "rgba(154,111,255,.29)" : "rgba(63,185,245,.3)";
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      } else {
        ctx.beginPath();
        for (let step = 0; step <= 120; step++) {
          const theta = (step / 120) * Math.PI * 2;
          const p = project({ x: Math.cos(theta), y: Math.sin(theta), z: 0 }, 0);
          if (step === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = "rgba(170,194,255,.3)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
        for (let ring = 0; ring < 16; ring++) {
          ctx.beginPath();
          let open = false;
          for (let s = 0; s <= 100; s++) {
            const theta = (s / 100) * Math.PI * 2;
            const latitude = (ring / 15 - 0.5) * Math.PI * 0.92;
            const p = project(
              {
                x: Math.cos(theta) * Math.cos(latitude),
                y: Math.sin(latitude),
                z: Math.sin(theta) * Math.cos(latitude),
              },
              angle,
            );
            if (p.z < -0.28) {
              open = false;
              continue;
            }
            if (!open) {
              ctx.moveTo(p.x, p.y);
              open = true;
            } else ctx.lineTo(p.x, p.y);
          }
          ctx.strokeStyle = `rgba(128,166,255,${0.07 + (ring % 3) * 0.025})`;
          ctx.lineWidth = 0.55;
          ctx.stroke();
        }
        for (let orbit = 0; orbit < 12; orbit++) {
          ctx.beginPath();
          for (let s = 0; s <= 100; s++) {
            const theta = (s / 100) * Math.PI * 1.65 + angle * 0.7 + orbit * 0.21;
            const p = project(
              {
                x: Math.cos(theta) * (1.01 + orbit * 0.012),
                y: Math.sin(theta * 0.65 + orbit * 0.16) * 0.7,
                z: Math.sin(theta) * (1.01 + orbit * 0.012),
              },
              angle,
            );
            if (s === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
          ctx.strokeStyle = "rgba(154,178,255,.12)";
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
      projected.forEach((p, i) => {
        const depth = (p.z + 1) / 2;
        if (kind === "globe" && p.z < -0.25) return;
        const size = (kind === "globe" ? 2.5 : 4) + depth * (kind === "globe" ? 2 : 4);
        ctx.globalAlpha = 0.35 + depth * 0.65;
        ctx.drawImage(
          points[i].x > 0.1 ? violet : blue,
          p.x - size / 2,
          p.y - size / 2,
          size,
          size,
        );
      });
      ctx.globalAlpha = 1;
      if (pointer.inside) {
        const light = ctx.createRadialGradient(px, py, 0, px, py, 90);
        light.addColorStop(0, "#7cbaff13");
        light.addColorStop(1, "#7cbaff00");
        ctx.fillStyle = light;
        ctx.fillRect(px - 90, py - 90, 180, 180);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(surface);
    resize();
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "80px" },
    );
    io.observe(surface);
    const target = surface.parentElement;
    target?.addEventListener("pointermove", move);
    target?.addEventListener("pointerleave", leave);
    let disposed = false;
    void document.fonts.ready.then(() => {
      if (!disposed)
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(draw);
        });
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      target?.removeEventListener("pointermove", move);
      target?.removeEventListener("pointerleave", leave);
    };
  }, [kind]);
  return <canvas ref={canvas} className={`particle-scene ${className}`} aria-hidden="true" />;
}
