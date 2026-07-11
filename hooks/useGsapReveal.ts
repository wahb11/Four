"use client";

import { useGSAP } from "@gsap/react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import type { RefObject } from "react";
import { useReducedMotion } from "./useMediaQuery";

type RevealOptions = {
  y?: number;
  skewY?: number;
  stagger?: number;
  start?: string;
  markers?: boolean;
};

export function useGsapReveal(
  container: RefObject<HTMLElement | null>,
  selector = "[data-reveal]",
  options: RevealOptions = {}
) {
  const reduced = useReducedMotion();
  const {
    y = 48,
    skewY = 2,
    stagger = 0.08,
    start = "top 80%",
  } = options;

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!container.current || reduced) return;

      const targets = container.current.querySelectorAll(selector);
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { y, opacity: 0, skewY },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 0.75,
          stagger,
          ease: "power4.out",
          scrollTrigger: {
            trigger: container.current,
            start,
            toggleActions: "play none none reverse",
          },
        }
      );

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === container.current) st.kill();
        });
      };
    },
    { scope: container, dependencies: [reduced] }
  );
}
