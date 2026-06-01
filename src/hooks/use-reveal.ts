import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const selector = ".reveal, .reveal-up, .reveal-left, .reveal-right";
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -10% 0px" },
    );

    const observeAll = (root: ParentNode = document) => {
      root.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        if (!el.classList.contains("in")) io.observe(el);
      });
    };

    observeAll();

    // Watch for dynamically added nodes (e.g. when project filters change)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n.matches?.(selector)) io.observe(n);
            observeAll(n);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
