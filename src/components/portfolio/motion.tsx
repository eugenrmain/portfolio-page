"use client";

import { animate } from "motion/mini";
import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { useScrollProgress } from "@/components/portfolio/scroll-progress";

function subscribeReducedMotion(listener: () => void) {
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}
const getReducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => true);
  const scope = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = scope.current;
    if (!element || element.getBoundingClientRect().top < innerHeight - 72) return;
    const travel = reduce ? "8px" : "24px";
    element.style.opacity = "0";
    element.style.transform = `translateY(${travel})`;
    let controls: ReturnType<typeof animate> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        controls = animate(
          element,
          { opacity: [0, 1], transform: [`translateY(${travel})`, "translateY(0px)"] },
          { duration: reduce ? 0.5 : 0.8, delay: Math.min(delay, 0.18), ease: [0.22, 1, 0.36, 1] },
        );
        element.dataset.revealed = "true";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -72px 0px", threshold: 0 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      controls?.stop();
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");
    };
  }, [delay, reduce]);
  return (
    <div ref={scope} className={className} data-reveal>
      {children}
    </div>
  );
}

export function ScrollFade() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollProgress((progress) => {
    if (ref.current)
      ref.current.style.opacity = String(progress < 0.94 ? 1 : Math.max(0, (1 - progress) / 0.06));
  });
  return <div ref={ref} className="scroll-fade" aria-hidden="true" />;
}

export function HoverLink({
  children,
  href,
  className = "",
  external = false,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={`hover-link ${className}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
