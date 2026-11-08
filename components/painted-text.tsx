"use client";

import { motion, useAnimationControls, useInView } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/components/use-reduced-motion";
import { useTouchInput } from "@/components/use-touch-input";

const elements = {
  a: motion.a,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
};

type PaintedTextProps = {
  as?: keyof typeof elements;
  children: ReactNode;
  className?: string;
  id?: string;
  href?: string;
  light?: boolean;
  mobileDelay?: number;
  "aria-label"?: string;
};

/** Desktop hover, a single touch-screen entrance sweep, and immediate tap feedback. */
export function PaintedText({
  as = "span",
  children,
  className = "",
  light = false,
  mobileDelay = 0.15,
  ...props
}: PaintedTextProps) {
  const Element = elements[as];
  const reduceMotion = useReducedMotion();
  const touchInput = useTouchInput();
  const textRef = useRef<HTMLSpanElement>(null);
  const played = useRef(false);
  const inView = useInView(textRef, { amount: 0.45, margin: "0px 0px -24px 0px" });
  const controls = useAnimationControls();

  useEffect(() => {
    if (!touchInput || reduceMotion) {
      controls.set("rest");
      return;
    }
    if (!inView || played.current) return;
    played.current = true;
    let cancelled = false;
    const timer = window.setTimeout(() => {
      void controls.start("sweep").then(() => {
        if (!cancelled) controls.set("rest");
      });
    }, mobileDelay * 1000);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      controls.stop();
      controls.set("rest");
    };
  }, [controls, inView, mobileDelay, reduceMotion, touchInput]);

  return (
    <Element
      {...props}
      className={`painted-text ${light ? "painted-text-light" : ""} ${className}`}
      initial="rest"
      animate={controls}
      whileHover={touchInput ? undefined : "paint"}
      whileFocus={touchInput ? "press" : "paint"}
      whileTap={touchInput && as === "a" ? "press" : undefined}
      variants={{
        rest: { scale: 1 },
        paint: { scale: reduceMotion ? 1 : 1.018 },
        sweep: { scale: 1 },
        press: { scale: reduceMotion ? 1 : 0.985 },
      }}
      transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
    >
      <span ref={textRef} className="painted-text-base">{children}</span>
      <motion.span
        aria-hidden="true"
        className="painted-text-pigment"
        variants={{
          rest: { opacity: 0, transition: { duration: reduceMotion ? 0 : 0.25 } },
          paint: {
            opacity: 1,
            backgroundPosition: reduceMotion
              ? "0% 50%"
              : ["0% 50%", "100% 50%", "0% 50%"],
            transition: {
              opacity: { duration: reduceMotion ? 0 : 0.15 },
              backgroundPosition: {
                duration: reduceMotion ? 0 : 3,
                repeat: reduceMotion ? 0 : Infinity,
                ease: "easeInOut",
              },
            },
          },
          sweep: {
            opacity: [0, 1, 1, 0],
            backgroundPosition: ["0% 50%", "100% 50%"],
            transition: {
              opacity: { duration: 2.6, times: [0, 0.15, 0.8, 1], ease: "easeInOut" },
              backgroundPosition: { duration: 2.6, ease: "easeInOut", repeat: 0 },
            },
          },
          press: {
            opacity: 1,
            backgroundPosition: "45% 50%",
            transition: { duration: reduceMotion ? 0 : 0.08 },
          },
        }}
      >
        {children}
      </motion.span>
    </Element>
  );
}
