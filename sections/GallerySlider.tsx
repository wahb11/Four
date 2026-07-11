"use client";

import { useRef } from "react";
import { GALLERY_TILES } from "@/constants/menu";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { SectionEyebrow } from "@/components/SectionEyebrow";

export function GallerySlider() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section id="gallery" ref={ref} className="panel bg-four-cream py-16 sm:py-20 md:py-32">
      <div className="section-content mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="late-section-intro mb-8 sm:mb-10 md:mb-12">
          <SectionEyebrow className="text-four-red">Gallery</SectionEyebrow>
          <AnimatedHeading className="text-[clamp(2rem,8vw,4.5rem)] tracking-tighter text-four-ink md:text-7xl">
            From the pass.
          </AnimatedHeading>
        </div>

        <div className="columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3">
          {GALLERY_TILES.map((tile) => (
            <figure
              key={tile.id}
              className="gallery-tile group relative mb-3 break-inside-avoid overflow-hidden border-2 border-four-ink/10 sm:mb-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tile.src}
                alt={tile.alt}
                className={`w-full object-cover transition-transform duration-500 ${tile.tall ? "min-h-[220px] sm:min-h-[320px]" : "min-h-[160px] sm:min-h-[220px]"}`}
                loading="lazy"
              />
              {tile.caption && (
                <figcaption className="gallery-caption absolute inset-x-0 bottom-0 bg-gradient-to-t from-four-ink/90 via-four-ink/40 to-transparent p-3 sm:p-4">
                  <span className="font-display text-base tracking-tight text-four-cream sm:text-2xl md:translate-y-4 md:text-3xl md:opacity-0 md:transition-all md:duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    {tile.caption}
                  </span>
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
