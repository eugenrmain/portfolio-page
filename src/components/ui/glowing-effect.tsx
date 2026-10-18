"use client";

// Adapted from Aceternity UI's glowing-effect, retrieved through the shadcn MCP.
// https://ui.aceternity.com/components/glowing-effect
import { useEffect, useRef } from "react";
import { animate } from "motion/mini";

export function GlowingEffect() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current,
      parent = element?.parentElement;
    if (!element || !parent) return;
    let controls: ReturnType<typeof animate> | undefined;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = parent.getBoundingClientRect();
        const angle =
          (180 *
            Math.atan2(
              event.clientY - r.top - r.height / 2,
              event.clientX - r.left - r.width / 2,
            )) /
            Math.PI +
          90;
        const current = parseFloat(getComputedStyle(element).getPropertyValue("--glow-angle")) || 0;
        const delta = ((angle - current + 540) % 360) - 180;
        element.style.setProperty("--glow-active", "1");
        controls?.stop();
        controls = animate(
          element,
          { "--glow-angle": [String(current), String(current + delta)] },
          {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          },
        );
      });
    };
    const leave = () => element.style.setProperty("--glow-active", "0");
    parent.addEventListener("pointermove", move);
    parent.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      controls?.stop();
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerleave", leave);
    };
  }, []);
  return <div ref={ref} className="glowing-effect" aria-hidden="true" />;
}
