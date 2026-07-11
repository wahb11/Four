"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useMediaQuery";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (isMobile) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xTo = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3" });
    const rxTo = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
    const ryTo = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      rxTo(e.clientX);
      ryTo(e.clientY);
      setHidden(false);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [data-cursor], [data-drag]");
      if (!interactive) {
        gsap.to(ring, { scale: 1, backgroundColor: "transparent", borderColor: "#9E2A2A", duration: 0.25 });
        return;
      }
      if (interactive.hasAttribute("data-drag")) {
        gsap.to(ring, { scale: 1.8, borderColor: "#9E2A2A", duration: 0.25 });
        return;
      }
      if (interactive.matches("[data-cursor='fill'], .menu-row")) {
        gsap.to(ring, {
          scale: 1.4,
          backgroundColor: "#9E2A2A",
          borderColor: "#9E2A2A",
          duration: 0.25,
        });
        return;
      }
      gsap.to(ring, { scale: 2.2, borderColor: "#9E2A2A", duration: 0.25 });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-four-red mix-blend-multiply ${hidden ? "opacity-0" : ""}`}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-four-red"
      />
    </>
  );
}
