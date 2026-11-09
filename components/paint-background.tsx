"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "@/components/use-reduced-motion";
import { createPaintRandom, createStroke, MAX_ACTIVE_STROKES, type BrushStroke } from "@/lib/paint-strokes";

const OPENING_STROKES = 8;

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

function PaintedStroke({ stroke, running, onExpire }: {
  stroke: BrushStroke;
  running: boolean;
  onExpire: (id: string) => void;
}) {
  const remaining = useRef((stroke.drawDuration + stroke.holdDuration) * 1000);
  const pigment = (hue: number) => `hue-rotate(${hue}deg) saturate(1.08)`;

  // Each stroke has its own lifetime, which pauses while the background is idle.
  useEffect(() => {
    if (!running) return;
    const started = performance.now();
    const timer = setTimeout(() => onExpire(stroke.id), remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current = Math.max(0, remaining.current - (performance.now() - started));
    };
  }, [running, onExpire, stroke.id]);

  return (
    <motion.div
      className="paint-stroke"
      data-stroke-id={stroke.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: stroke.opacity }}
      exit={{ opacity: 0, transition: { duration: running ? stroke.fadeDuration : 0, ease: "easeInOut" } }}
      transition={{ duration: running ? 1.2 : 0, ease: "easeOut" }}
      style={{
        top: `${stroke.top}%`,
        left: `${stroke.left}%`,
        width: `clamp(130px, ${stroke.width}vw, 340px)`,
        transform: `translate(-50%, -50%) rotate(${stroke.angle}deg) scaleX(${stroke.mirrored ? -1 : 1})`,
      }}
    >
      <motion.div
        className="paint-stroke-reveal"
        initial={{ maskPosition: "0% 100%" }}
        animate={{ maskPosition: "0% 0%" }}
        transition={{ duration: running ? stroke.drawDuration : 0, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className="paint-stroke-texture"
          style={{ backgroundImage: `url('/textures/brush-${stroke.texture}.webp')` }}
          initial={false}
          animate={{
            filter: running
              ? [pigment(stroke.hue), pigment(stroke.hue + stroke.hueDrift), pigment(stroke.hue)]
              : pigment(stroke.hue),
          }}
          transition={{ duration: running ? stroke.colorDuration : 0, repeat: running ? Infinity : 0, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

export function PaintBackground() {
  const reduceMotion = useReducedMotion();
  const visible = useSyncExternalStore(subscribeVisibility, () => document.visibilityState === "visible", () => false);
  const running = visible && !reduceMotion;
  // No prepainted composition: both the server render and first client frame are empty.
  const [strokes, setStrokes] = useState<BrushStroke[]>([]);
  const randomRef = useRef<ReturnType<typeof createPaintRandom> | null>(null);
  const sequence = useRef(0);
  const openingStrokesRemaining = useRef(OPENING_STROKES);
  const expire = useCallback((id: string) => {
    setStrokes((current) => current.filter((stroke) => stroke.id !== id));
  }, []);

  useEffect(() => {
    if (!running) return;
    randomRef.current ??= createPaintRandom(crypto.getRandomValues(new Uint32Array(1))[0]);
    const random = randomRef.current;
    let timer: ReturnType<typeof setTimeout>;

    function schedule(first = false) {
      timer = setTimeout(() => {
        const next = createStroke(random, `stroke-${++sequence.current}`);
        if (openingStrokesRemaining.current > 0) next.drawDuration *= 0.45;
        const limit = openingStrokesRemaining.current > 0 ? OPENING_STROKES : MAX_ACTIVE_STROKES;
        setStrokes((current) => current.length < limit ? [...current, next] : current);
        openingStrokesRemaining.current = Math.max(0, openingStrokesRemaining.current - 1);
        schedule();
      }, first && sequence.current === 0
        ? 0
        : openingStrokesRemaining.current > 0
          ? 400 + random() * 350
          : 2800 + random() * 2000);
    }

    schedule(true);
    return () => clearTimeout(timer);
  }, [running]);

  return (
    <div className="paint-background" aria-hidden="true" data-paint-running={running}>
      <AnimatePresence>
        {strokes.map((stroke) => <PaintedStroke key={stroke.id} stroke={stroke} running={running} onExpire={expire} />)}
      </AnimatePresence>
    </div>
  );
}
