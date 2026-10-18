"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { useScrollProgress } from "@/components/portfolio/scroll-progress";
import { mediaPath } from "@/lib/portfolio";

export function SpaceField() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const progress = useRef(0);
  useScrollProgress((value) => {
    progress.current = value;
  });
  useEffect(() => {
    const surface = canvas.current;
    const scene = root.current;
    if (!surface || !scene) return;
    const context = surface.getContext("2d", { alpha: true });
    if (!context) return;
    let width = 0,
      height = 0,
      frame = 0,
      last = 0,
      x = 0,
      y = 0,
      lastBlend = -1,
      blendSpan = 0.45,
      lastX = -1,
      lastY = -1;
    const pointer = { x: 0, y: 0 };
    let stars: { x: number; y: number; radius: number; phase: number; depth: number }[] = [];
    const layers = [...scene.querySelectorAll<HTMLElement>(".nebula-layer")];
    const measureBlend = () => {
      const distance = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      blendSpan = Math.min(0.62, Math.max(0.42, (innerHeight * 1.2) / distance));
    };
    const resize = () => {
      width = innerWidth;
      height = innerHeight;
      measureBlend();
      const dpr = Math.min(devicePixelRatio, width < 700 ? 1.25 : 1.5);
      surface.width = width * dpr;
      surface.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      let seed = 3107;
      const random = () => {
        seed = (seed * 16807) % 2147483647;
        return seed / 2147483647;
      };
      stars = Array.from({ length: Math.min(110, Math.floor(width / 13)) }, () => ({
        x: random() * width,
        y: random() * height,
        radius: random() * 1.1 + 0.3,
        phase: random() * Math.PI * 2,
        depth: random() * 0.8 + 0.2,
      }));
    };
    const move = (event: PointerEvent) => {
      pointer.x = event.clientX / width - 0.5;
      pointer.y = event.clientY / height - 0.5;
    };
    const reset = () => {
      pointer.x = 0;
      pointer.y = 0;
    };
    const draw = (time: number) => {
      frame = requestAnimationFrame(draw);
      if (document.hidden || time - last < (width < 700 ? 50 : 32)) return;
      last = time;
      x += (pointer.x - x) * 0.045;
      y += (pointer.y - y) * 0.045;
      // A long smoothstep overlap avoids a sudden image swap near the footer.
      const phase = Math.max(0, Math.min(1, (progress.current - 0.38) / blendSpan));
      const blend = phase * phase * (3 - 2 * phase);
      if (Math.abs(blend - lastBlend) > 0.0001)
        scene.style.setProperty("--nebula-blend", String(blend));
      layers.forEach((layer, i) => {
        if (Math.abs(blend - lastBlend) > 0.0001)
          layer.style.opacity = String(i === 0 ? 1 - blend * 0.82 : blend);
        if (Math.abs(x - lastX) + Math.abs(y - lastY) > 0.0001)
          layer.style.transform = `translate3d(${x * (i + 1) * -14}px,${y * -18}px,0) scale(1.06)`;
      });
      lastBlend = blend;
      lastX = x;
      lastY = y;
      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        const opacity = 0.18 + (Math.sin(time * 0.00035 + star.phase) + 1) * 0.16;
        const sx = star.x + x * star.depth * 28;
        const sy = ((star.y + time * 0.0015 * star.depth) % height) + y * star.depth * 20;
        context.beginPath();
        context.arc(sx, sy, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(190,211,255,${opacity})`;
        context.fill();
      }
    };
    resize();
    const geometry = new ResizeObserver(measureBlend);
    geometry.observe(document.body);
    let disposed = false;
    void document.fonts.ready.then(() => {
      if (!disposed)
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(draw);
        });
    });
    addEventListener("resize", resize);
    addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", reset);
    return () => {
      disposed = true;
      geometry.disconnect();
      cancelAnimationFrame(frame);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", reset);
    };
  }, []);
  return (
    <div ref={root} className="space-field" aria-hidden="true">
      <div className="nebula-images">
        {["blue", "violet"].map((name, index) => (
          <div
            key={name}
            className={`nebula-layer nebula-${name}`}
            style={{
              backgroundImage: `url("${mediaPath(`/media/nebula-${name}.avif`)}")`,
              opacity: index === 0 ? 1 : 0,
            }}
          />
        ))}
        <div className="nebula-atmosphere" />
      </div>
      <div className="space-shade" />
      <div className="space-vignette" />
      <canvas ref={canvas} />
    </div>
  );
}

export function Spotlight({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`spotlight ${className}`}
      style={{ "--spot-x": "50%", "--spot-y": "0%" } as CSSProperties}
      onPointerMove={(event) => {
        const box = event.currentTarget.getBoundingClientRect();
        ref.current?.style.setProperty("--spot-x", `${event.clientX - box.left}px`);
        ref.current?.style.setProperty("--spot-y", `${event.clientY - box.top}px`);
      }}
    >
      <GlowingEffect />
      {children}
    </div>
  );
}
