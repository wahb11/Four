"use client";

import { useRef } from "react";
import { MENU_CATEGORIES } from "@/constants/menu";
import { formatPrice } from "@/lib/utils";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { MenuCategoryIcon } from "@/components/MenuCategoryIcon";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";

export function MenuList() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    registerGsapPlugins();
    if (!ref.current) return;
    ref.current.querySelectorAll(".menu-row").forEach((row) => {
      gsap.from(row, {
        y: 24,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: row,
          start: "top 92%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, { scope: ref });

  return (
    <section id="menu" ref={ref} className="panel relative bg-four-cream pb-24 pt-16 md:pb-32">
      <div className="relative z-[4] mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div className="min-w-0">
            <SectionEyebrow className="text-four-red" data-motion="fade-up">
              Menu
            </SectionEyebrow>
            <AnimatedHeading className="text-4xl tracking-tighter text-four-ink sm:text-5xl md:text-7xl">
              The full board
            </AnimatedHeading>
          </div>
          <p className="max-w-xs text-sm text-four-ink/60">
            Prices exclude tax. Sizes shown where applicable.
          </p>
        </div>

        <div className="grid gap-12 sm:gap-16 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-20">
          {MENU_CATEGORIES.map((cat) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-[calc(var(--nav-height)+3rem)]">
              <div className="menu-cat-head mb-5 flex items-center gap-3 border-b-4 border-four-ink pb-3">
                <MenuCategoryIcon icon={cat.icon} size={24} className="text-four-red" />
                <h3 className="font-display text-2xl tracking-tighter text-four-red sm:text-3xl md:text-4xl">
                  {cat.label}
                </h3>
              </div>
              {cat.subtitle && (
                <p className="mb-4 text-sm font-semibold text-four-ink">{cat.subtitle}</p>
              )}

              {cat.layout === "sized" && (
                <div className="mb-2 hidden grid-cols-[1fr_auto] gap-x-4 text-[10px] font-bold uppercase tracking-widest text-four-ink/40 sm:grid">
                  <span />
                  <span className="grid w-28 grid-cols-3 text-center md:w-36">
                    <span>S</span>
                    <span>M</span>
                    <span>L</span>
                  </span>
                </div>
              )}

              <ul className="space-y-3">
                {cat.items.map((item) => (
                  <li
                    key={item.name}
                    className="menu-row group border-b border-four-ink/10 py-2"
                    data-cursor="fill"
                  >
                    <div className="flex flex-col gap-2 sm:grid sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-4">
                      <div className="min-w-0">
                        <p className="font-semibold text-four-ink transition-colors group-hover:text-four-red">
                          {item.name}
                        </p>
                        {item.description && (
                          <p className="mt-0.5 text-xs text-four-ink/50">{item.description}</p>
                        )}
                      </div>
                      {item.prices ? (
                        <div className="flex items-center justify-between gap-4 sm:grid sm:w-28 sm:grid-cols-3 sm:justify-items-center sm:gap-0 md:w-36">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-four-ink/40 sm:hidden">
                            S / M / L
                          </span>
                          <div className="grid grid-cols-3 gap-2 text-sm font-bold text-four-ink sm:contents">
                            <span>{item.prices.S}</span>
                            <span>{item.prices.M}</span>
                            <span>{item.prices.L}</span>
                          </div>
                        </div>
                      ) : (
                        <span className="price-tag text-sm font-bold text-four-ink sm:whitespace-nowrap">
                          {formatPrice(item.price ?? 0)}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {cat.id === "pizzas" && (
                <div className="mt-6 rounded-lg border-2 border-four-red p-4">
                  <p className="font-display text-lg tracking-tight text-four-red sm:text-xl">
                    Extra Toppings
                  </p>
                  <p className="mt-1 text-sm text-four-ink/70">S / 149 · M / 199 · L / 249</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-16 text-center text-xs font-bold uppercase tracking-[0.25em] text-four-ink/50">
          All prices are exclusive of taxes
        </p>
      </div>
    </section>
  );
}
