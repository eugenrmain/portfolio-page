"use client";
import { useEffect, useRef } from "react";

export function useVisibleSvg() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) element.unpauseAnimations();
        else element.pauseAnimations();
      },
      { threshold: 0.01 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return ref;
}
