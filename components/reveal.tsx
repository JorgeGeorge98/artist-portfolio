"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || !window.IntersectionObserver || motion.matches) return;

    let animation: Animation | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (!motion.matches) {
        animation = element.animate(
          [{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 750, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
        );
      }
      observer.disconnect();
    }, { threshold: 0.08 });
    const stopMotion = () => { if (motion.matches) animation?.cancel(); };
    motion.addEventListener("change", stopMotion);
    observer.observe(element);
    return () => {
      observer.disconnect();
      animation?.cancel();
      motion.removeEventListener("change", stopMotion);
    };
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
