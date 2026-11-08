"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/components/use-reduced-motion";

/** Static SVG brush texture; only its pigment and position move. */
export function PaintEdges() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="paint-edges" aria-hidden="true">
      {["left", "right"].map((side, index) => (
        <div key={side} className={`paint-edge paint-edge-${side}`}>
          <motion.div
            className="paint-edge-pigment"
            initial={false}
            animate={reduceMotion ? {
              backgroundPosition: "25% 35%",
              y: 0,
            } : {
              backgroundPosition: ["15% 10%", "85% 90%", "15% 10%"],
              y: [0, index ? -12 : 12, 0],
            }}
            transition={{
              duration: reduceMotion ? 0 : 36 + index * 8,
              repeat: reduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      ))}
    </div>
  );
}
