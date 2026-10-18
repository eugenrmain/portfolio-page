"use client";
import { useEffect, useRef } from "react";

export function ParticleTerrain() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;
    let width = 0,
      height = 0,
      frame = 0,
      last = 0,
      visible = true,
      impulses = 0;
    const pointer = { x: 0, z: 0, active: false };
    let ripples: { x: number; z: number; time: number }[] = [];
    const particles = Array.from({ length: 1152 }, (_, i) => ({
      x: ((i % 48) - 23.5) / 8,
      z: (Math.floor(i / 48) - 11.5) / 5,
      h: 0,
      v: 0,
    }));
    const resize = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const dpr = Math.min(devicePixelRatio, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);
    const move = (event: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - r.left) / width - 0.5) * 6;
      pointer.z = ((event.clientY - r.top) / height - 0.5) * 4;
      pointer.active = true;
    };
    const leave = () => {
      pointer.active = false;
    };
    const impulse = () => {
      ripples.push({ x: pointer.x, z: pointer.z, time: performance.now() });
      ripples = ripples.slice(-8);
      canvas.dataset.impulses = String(++impulses);
    };
    const key = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "Enter") {
        event.preventDefault();
        impulse();
      }
    };
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    canvas.addEventListener("pointerdown", impulse);
    canvas.addEventListener("keydown", key);
    function draw(time: number) {
      frame = requestAnimationFrame(draw);
      if (document.hidden || !visible || time - last < 32) return;
      const dt = Math.min(2, (time - (last || time - 32)) / 32);
      last = time;
      ctx!.clearRect(0, 0, width, height);
      ripples = ripples.filter((r) => time - r.time < 3800);
      const yaw = 0.23 + (pointer.active ? pointer.x * 0.025 : 0),
        sine = Math.sin(yaw),
        cosine = Math.cos(yaw);
      let previous = { x: 0, y: 0 };
      particles.forEach((p, i) => {
        const distance = Math.hypot(p.x - pointer.x, p.z - pointer.z);
        let target =
          Math.sin(p.x * 1.7 + time * 0.001) * 0.17 + Math.cos(p.z * 2.4 - time * 0.0013) * 0.19;
        if (pointer.active) target += Math.exp(-distance * distance * 1.3) * 0.85;
        for (const ripple of ripples) {
          const radius = Math.hypot(p.x - ripple.x, p.z - ripple.z),
            age = (time - ripple.time) / 1000;
          target +=
            Math.sin(radius * 5 - age * 8) *
            Math.exp(-Math.pow(radius - age * 1.7, 2) * 2) *
            Math.exp(-age * 0.7) *
            0.65;
        }
        p.v = (p.v + (target - p.h) * 0.085 * dt) * Math.pow(0.81, dt);
        p.h += p.v * dt;
        const x = p.x * cosine - p.z * sine,
          z = p.x * sine + p.z * cosine;
        const perspective = 1 / (1 + z * 0.085);
        const sx = width * 0.49 + x * width * 0.135 * perspective,
          sy = height * 0.52 + z * height * 0.13 * perspective - p.h * height * 0.22;
        const alpha = 0.25 + (1 - (p.z + 2.3) / 4.6) * 0.45;
        if (i % 48) {
          ctx!.beginPath();
          ctx!.moveTo(previous.x, previous.y);
          ctx!.lineTo(sx, sy);
          ctx!.strokeStyle = `rgba(99,163,245,${alpha * 0.3})`;
          ctx!.lineWidth = 0.6;
          ctx!.stroke();
        }
        ctx!.beginPath();
        ctx!.arc(
          sx,
          sy,
          (pointer.active && distance < 0.6 ? 2.3 : 1.2) * perspective,
          0,
          Math.PI * 2,
        );
        ctx!.fillStyle =
          p.h > 0.35 ? `rgba(192,144,255,${alpha + 0.2})` : `rgba(113,217,255,${alpha})`;
        ctx!.fill();
        previous = { x: sx, y: sy };
      });
    }
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("pointerdown", impulse);
      canvas.removeEventListener("keydown", key);
    };
  }, []);
  return (
    <canvas
      className="particle-terrain"
      ref={ref}
      data-visual="games"
      tabIndex={0}
      role="img"
      aria-label="Interactive 3D wave terrain. Move your pointer to attract particles; click, tap, or press Enter to send a ripple."
    />
  );
}
