"use client";

import { useRef } from "react";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { ComicBadge } from "@/components/ComicBadge";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    registerGsapPlugins();
    if (!ref.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      },
    });

    tl.to(".hero-skew", { skewY: 5, opacity: 0, y: -100, ease: "power2.in" }, 0);
    tl.to(".hero-bg-shift", { scale: 1.08, opacity: 0.5, ease: "none" }, 0);
  }, { scope: ref });

  return (
    <section
      id="hero"
      ref={ref}
      className="panel relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-four-cream pt-[var(--nav-height)]"
    >
      <div className="hero-bg-shift halftone pointer-events-none absolute inset-0 opacity-[0.35]" />

      <div className="hero-skew section-content relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-5 sm:py-12 md:flex md:min-h-[calc(100svh-var(--nav-height))] md:items-center md:px-8 md:py-16">
        <div className="flex w-full flex-col md:relative md:max-w-[min(100%,36rem)] lg:max-w-3xl">
          <div className="hero-badge-row mb-4 flex flex-wrap items-center gap-2 sm:mb-5">
            <ComicBadge>Lahore</ComicBadge>
          </div>

          <AnimatedHeading
            as="h1"
            split="lines"
            scroll={false}
            className="max-w-[12ch] text-[clamp(2.25rem,10vw,9rem)] leading-[0.9] tracking-tighter text-four-ink md:max-w-[11ch]"
          >
            {`FOUR BITES.\nZERO REGRETS.`}
          </AnimatedHeading>

          <p className="hero-body mt-4 max-w-[32ch] text-[0.9375rem] leading-relaxed text-four-ink/70 sm:mt-5 sm:max-w-md sm:text-base md:mt-6 md:text-lg">
            Smash burgers, crown pizzas, wings and shakes. Straight from the grill to your table.
          </p>

          {/* Mobile: reserved burger stage. Desktop: anchor beside the copy block */}
          <div
            id="trail-start"
            className="pointer-events-none mx-auto mt-6 h-[clamp(8.5rem,38vw,12.5rem)] w-[clamp(8.5rem,38vw,12.5rem)] shrink-0 sm:mt-7 md:absolute md:left-[calc(100%+1.75rem)] md:top-1/2 md:mx-0 md:mt-0 md:h-px md:w-px md:-translate-y-1/2 lg:left-[calc(100%+2.5rem)]"
            aria-hidden
          />
        </div>
      </div>

      <div className="hero-scroll-hint absolute bottom-4 left-4 z-[5] font-mono text-[9px] uppercase tracking-[0.28em] text-four-ink/40 sm:bottom-5 sm:left-5 sm:text-[10px]">
        Scroll
      </div>
    </section>
  );
}
