"use client";

import { useEffect, useRef } from "react";

type Listener = (progress: number) => void;
const listeners = new Set<Listener>();
let stop: (() => void) | undefined;

function observeScroll() {
  let range = 1;
  let frame = 0;
  const update = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const progress = Math.max(0, Math.min(1, scrollY / range));
      listeners.forEach((listener) => listener(progress));
    });
  };
  const measure = () => {
    range = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    update();
  };
  const resize = new ResizeObserver(measure);
  resize.observe(document.body);
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", measure);
  measure();
  return () => {
    cancelAnimationFrame(frame);
    resize.disconnect();
    removeEventListener("scroll", update);
    removeEventListener("resize", measure);
  };
}

export function useScrollProgress(callback: Listener) {
  const latest = useRef(callback);
  useEffect(() => {
    latest.current = callback;
  }, [callback]);
  useEffect(() => {
    const listener: Listener = (value) => latest.current(value);
    listeners.add(listener);
    if (listeners.size === 1) stop = observeScroll();
    return () => {
      listeners.delete(listener);
      if (!listeners.size) {
        stop?.();
        stop = undefined;
      }
    };
  }, []);
}
