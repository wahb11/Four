"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

let registered = false;

export function registerGsapPlugins() {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  ScrollTrigger.config({
    ignoreMobileResize: true,
    limitCallbacks: isMobile,
  });

  registered = true;
}

export { gsap, ScrollTrigger, MotionPathPlugin };
