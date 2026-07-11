"use client";

import { useState } from "react";
import { SIGNATURE_ITEMS } from "@/constants/menu";
import type { SignatureItem } from "@/types";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { ComicBadge } from "@/components/ComicBadge";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { ItemModal } from "@/components/ItemModal";
import { AnimatedButton } from "@/components/AnimatedButton";
import { ComicCylinderCarousel } from "@/components/ComicCylinderCarousel";
import { formatPrice } from "@/lib/utils";

const FEATURED = SIGNATURE_ITEMS[0];
const REST = SIGNATURE_ITEMS.slice(1);

export function SignatureItemsSlider() {
  const [selected, setSelected] = useState<SignatureItem | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <section id="signature" className="panel relative overflow-hidden bg-four-ink py-16 sm:py-20 md:py-32">
      <div className="halftone absolute inset-0 opacity-20" />
      <div className="section-content relative mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="mb-6 sm:mb-8 md:mb-10">
          <SectionEyebrow className="text-four-red">Signature hits</SectionEyebrow>
          <AnimatedHeading className="text-[clamp(2rem,8vw,4.5rem)] tracking-tighter text-four-cream md:text-7xl">
            House favourites
          </AnimatedHeading>
        </div>

        <div
          id="featured-dock-card"
          className="relative z-[1] mb-10 grid items-center gap-0 overflow-hidden border-2 border-four-cream/25 bg-four-cream sm:mb-12 md:mb-20 lg:grid-cols-2"
        >
          <div className="order-2 p-5 sm:p-6 md:p-10 lg:order-1">
            {FEATURED.badge && (
              <ComicBadge animate={false} className="mb-4">
                {FEATURED.badge}
              </ComicBadge>
            )}
            <p className="text-[10px] font-bold uppercase tracking-widest text-four-red">
              {FEATURED.category}
            </p>
            <h3 className="mt-2 font-display text-3xl tracking-tighter text-four-ink sm:text-4xl md:text-5xl">
              {FEATURED.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-four-ink/70 sm:mt-4 md:text-base">
              {FEATURED.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
              <p className="font-display text-2xl text-four-ink sm:text-3xl">
                {formatPrice(FEATURED.price)}
              </p>
              <AnimatedButton
                type="button"
                size="sm"
                onClick={() => {
                  setSelected(FEATURED);
                  setOpen(true);
                }}
              >
                View Item
              </AnimatedButton>
            </div>
          </div>

          <div
            id="product-dock"
            className="relative order-1 aspect-[4/3] w-full overflow-hidden bg-[#1a1a1a] lg:order-2 lg:aspect-auto lg:min-h-[420px]"
          >
            <div
              id="product-dock-placeholder"
              className="absolute inset-3 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-four-cream/25 sm:inset-4 sm:gap-3"
            >
              <span className="px-4 text-center font-display text-lg tracking-tighter text-four-cream/40 sm:text-2xl md:text-3xl">
                Featured item
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-four-cream/30">
                Scroll down to reveal
              </span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              id="product-dock-img"
              src={FEATURED.image}
              alt={FEATURED.name}
              className="absolute inset-0 h-full w-full object-cover opacity-0"
            />
          </div>
        </div>

        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-four-cream/50 md:mb-6">
          More from the menu
        </p>
        <ComicCylinderCarousel
          items={REST.length >= 3 ? REST : SIGNATURE_ITEMS}
          onSelect={(item) => {
            setSelected(item);
            setOpen(true);
          }}
        />
      </div>

      <ItemModal item={selected} open={open} onOpenChange={setOpen} />
    </section>
  );
}
