"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";

export function useLenis(enabled = true) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    registerGsapPlugins();

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const lenis = new Lenis({
      lerp: isMobile ? 0.11 : 0.1,
      smoothWheel: !isMobile,
      syncTouch: isMobile,
      syncTouchLerp: 0.085,
      touchMultiplier: 1.1,
      wheelMultiplier: isMobile ? 1 : 1,
      infinite: false,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return lenisRef;
}
