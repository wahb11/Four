"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/constants/menu";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { useIsMobile } from "@/hooks/useMediaQuery";

export function Testimonials() {
  const isMobile = useIsMobile();
  const [paused, setPaused] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: isMobile ? "center" : "start",
      dragFree: !isMobile,
    },
    [Autoplay({ delay: 4500, stopOnInteraction: true, playOnInit: !isMobile })]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = emblaApi.plugins()?.autoplay;
    if (!autoplay) return;
    if (paused || isMobile) autoplay.stop();
    else autoplay.play();
  }, [paused, emblaApi, isMobile]);

  const cards = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="panel overflow-hidden bg-four-cream py-16 sm:py-20 md:py-32">
      <div className="section-content mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="late-section-intro mb-6 sm:mb-8 md:mb-10">
          <SectionEyebrow className="text-four-red">Reviews</SectionEyebrow>
          <AnimatedHeading className="text-[clamp(2rem,8vw,4.5rem)] tracking-tighter text-four-ink md:text-7xl">
            What people say
          </AnimatedHeading>
        </div>
        <p className="testimonials-hint mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-four-ink/45 md:hidden">
          Swipe for more →
        </p>
      </div>

      <div
        className="overflow-hidden"
        ref={emblaRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        data-drag
      >
        <div className="flex gap-3 px-4 sm:gap-4 sm:px-5 md:px-8">
          {cards.map((t, i) => (
            <article
              key={`${t.id}-${i}`}
              className="testimonial-card min-w-0 shrink-0 basis-[86%] border-2 border-four-red bg-four-warm p-5 transition-shadow active:scale-[0.98] sm:basis-[45%] sm:p-6 lg:basis-[30%] md:hover:shadow-[6px_6px_0_#9E2A2A]"
            >
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-four-red text-four-red sm:h-4 sm:w-4" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-four-ink sm:text-base">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-3 font-display text-lg tracking-tight text-four-red sm:mt-4 sm:text-xl">
                {t.name}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
