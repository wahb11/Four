"use client";

import { useEffect, useState } from "react";

/** True only after the client has mounted — safe gate for window-only APIs. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function useReducedMotion() {
  const mounted = useMounted();
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mounted]);

  return mounted ? reduced : false;
}

export function useMediaQuery(query: string) {
  const mounted = useMounted();
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query, mounted]);

  return mounted ? matches : false;
}

export function useIsMobile() {
  return useMediaQuery("(max-width: 767px)");
}

export function useCanUseThree() {
  const [ok, setOk] = useState(false);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted) return;
    if (isMobile || reduced) {
      setOk(false);
      return;
    }
    const cores = navigator.hardwareConcurrency ?? 4;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    setOk(cores >= 4 && mem >= 4 && window.innerWidth >= 768);
  }, [isMobile, reduced, mounted]);

  return ok;
}
