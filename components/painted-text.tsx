"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/components/use-reduced-motion";

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
  "aria-label"?: string;
};

/** The original text stays readable; a decorative copy adds pigment on hover. */
export function PaintedText({
  as = "span",
  children,
  className = "",
  light = false,
  ...props
}: PaintedTextProps) {
  const Element = elements[as];
  const reduceMotion = useReducedMotion();

  return (
    <Element
      {...props}
      className={`painted-text ${light ? "painted-text-light" : ""} ${className}`}
      initial="rest"
      whileHover="paint"
      whileFocus="paint"
      variants={{
        rest: { scale: 1 },
        paint: { scale: reduceMotion ? 1 : 1.018 },
      }}
      transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
    >
      <span className="painted-text-base">{children}</span>
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
        }}
      >
        {children}
      </motion.span>
    </Element>
  );
}
