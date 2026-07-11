"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const wipeRef = useRef<HTMLDivElement>(null);
  const firstLoad = useRef(true);

  useEffect(() => {
    const el = wipeRef.current;
    if (!el) return;

    // Skip wipe on first mount — loader already handles the intro
    if (firstLoad.current) {
      firstLoad.current = false;
      gsap.set(el, { yPercent: 100 });
      return;
    }

    const tween = gsap.timeline();
    tween
      .fromTo(
        el,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.45, ease: "power4.inOut" }
      )
      .to(el, {
        yPercent: -100,
        duration: 0.5,
        ease: "power4.inOut",
      });

    return () => {
      tween.kill();
      gsap.set(el, { yPercent: 100 });
    };
  }, [pathname]);

  return (
    <>
      <div
        ref={wipeRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9990] bg-four-red"
        style={{ transform: "translateY(100%)" }}
      />
      {children}
    </>
  );
}
