"use client";

import { useEffect } from "react";
import { useTouchInput } from "@/components/use-touch-input";

/** Reliable press styling without intercepting clicks, navigation, or scrolling. */
export function TouchFeedback() {
  const touchInput = useTouchInput();

  useEffect(() => {
    if (!touchInput) return;
    let pressed: HTMLElement | null = null;

    const clear = () => {
      pressed?.removeAttribute("data-pressed");
      pressed = null;
    };
    const press = (event: PointerEvent) => {
      if (!event.isPrimary || event.pointerType === "mouse") return;
      clear();
      const control = event.target instanceof Element ? event.target.closest<HTMLElement>("a, button") : null;
      if (!control?.matches(".nav-link, .text-link, .artwork-button, .viewer-control")) return;
      pressed = control;
      pressed.setAttribute("data-pressed", "");
    };

    document.addEventListener("pointerdown", press, { capture: true, passive: true });
    window.addEventListener("pointerup", clear, { capture: true, passive: true });
    window.addEventListener("pointercancel", clear, { capture: true, passive: true });
    window.addEventListener("blur", clear);
    document.addEventListener("scroll", clear, { capture: true, passive: true });
    return () => {
      clear();
      document.removeEventListener("pointerdown", press, true);
      window.removeEventListener("pointerup", clear, true);
      window.removeEventListener("pointercancel", clear, true);
      window.removeEventListener("blur", clear);
      document.removeEventListener("scroll", clear, true);
    };
  }, [touchInput]);

  return null;
}
