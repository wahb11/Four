"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { MENU_CATEGORIES } from "@/constants/menu";
import { MenuCategoryIcon } from "@/components/MenuCategoryIcon";
import { cn } from "@/lib/utils";

export function MenuCategoryNav() {
  const [active, setActive] = useState(MENU_CATEGORIES[0].id);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
    align: "start",
  });

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    MENU_CATEGORIES.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(cat.id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (!mobile) return;
    const idx = MENU_CATEGORIES.findIndex((c) => c.id === active);
    if (idx >= 0) emblaApi.scrollTo(idx);
  }, [active, emblaApi]);

  const tabs = MENU_CATEGORIES.map((cat) => (
    <a
      key={cat.id}
      href={`#${cat.id}`}
      data-cursor="fill"
      className={cn(
        "relative flex shrink-0 items-center gap-1.5 px-3 py-3 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors sm:px-4 sm:text-xs sm:tracking-[0.15em]",
        active === cat.id ? "text-four-red" : "text-four-ink/50 hover:text-four-ink"
      )}
    >
      <MenuCategoryIcon icon={cat.icon} size={16} className="text-current" />
      <span className="max-w-[7rem] truncate sm:max-w-none">{cat.label}</span>
      {active === cat.id && (
        <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-four-red sm:h-1" />
      )}
    </a>
  ));

  return (
    <div
      id="menu-category-nav"
      className="sticky top-[var(--nav-height)] z-40 border-b-2 border-four-ink/10 bg-four-cream/95 backdrop-blur-md"
      suppressHydrationWarning
    >
      {/* Mobile carousel */}
      <div className="overflow-hidden px-2 md:hidden" ref={emblaRef} data-drag suppressHydrationWarning>
        <div className="flex gap-0.5 py-0.5">{tabs}</div>
      </div>
      {/* Desktop tabs */}
      <div
        className="mx-auto hidden max-w-7xl flex-wrap gap-1 overflow-x-auto px-5 py-0.5 md:flex md:px-8 scrollbar-none"
        suppressHydrationWarning
      >
        {tabs}
      </div>
    </div>
  );
}
