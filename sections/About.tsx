"use client";

import { useRef } from "react";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export function About() {
  const ref = useRef<HTMLElement>(null);
  useGsapReveal(ref);

  return (
    <section
      id="about"
      ref={ref}
      className="panel relative overflow-hidden bg-four-red py-16 sm:py-20 md:py-32"
    >
      <div className="halftone absolute inset-0 opacity-40" />
      <div className="section-content relative mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:items-center md:gap-12">
          {/* Text first on mobile, right column on desktop */}
          <div className="order-1 md:order-2">
            <SectionEyebrow className="text-four-cream/70" data-reveal>
              About
            </SectionEyebrow>
            <AnimatedHeading className="mt-1 text-[clamp(2rem,8vw,4.5rem)] leading-[0.92] tracking-tighter text-four-cream md:text-7xl">
              A corner grill that grew up.
            </AnimatedHeading>
            <p
              data-reveal
              className="mt-5 text-[0.9375rem] leading-relaxed text-four-cream/90 sm:mt-6 sm:text-base md:mt-8 md:text-xl"
            >
              FOUR started in Lahore with one grill and a short menu. We kept the smash, added pizza and wings, and built a place people actually come back to.
            </p>
            <p data-reveal className="mt-3 text-sm text-four-cream/70 sm:mt-4 sm:text-base">
              Good food, fair portions, no fuss.
            </p>
          </div>

          {/* Photo slot — below text on mobile, left column on desktop */}
          <div className="order-2 flex justify-start md:order-1">
            <div
              id="trail-about-slot"
              className="h-[clamp(8rem,36vw,11.5rem)] w-[clamp(8rem,36vw,11.5rem)] shrink-0 sm:h-44 sm:w-44 md:h-56 md:w-56 lg:h-64 lg:w-64"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
