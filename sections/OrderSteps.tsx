"use client";

import { ORDER_STEPS } from "@/constants/menu";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { Flame, SlidersHorizontal, Truck, UtensilsCrossed } from "lucide-react";

const STEP_ICONS: Record<string, React.ReactNode> = {
  pick: <UtensilsCrossed className="h-10 w-10 sm:h-12 sm:w-12" strokeWidth={2} />,
  customize: <SlidersHorizontal className="h-10 w-10 sm:h-12 sm:w-12" strokeWidth={2} />,
  fire: <Flame className="h-10 w-10 sm:h-12 sm:w-12" strokeWidth={2} />,
  deliver: <Truck className="h-10 w-10 sm:h-12 sm:w-12" strokeWidth={2} />,
};

export function OrderSteps() {
  return (
    <section id="order" className="panel bg-four-ink py-16 sm:py-20 md:py-32">
      <div className="section-content mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="late-section-intro mb-8 sm:mb-10 md:mb-14">
          <SectionEyebrow className="text-four-red">How to order</SectionEyebrow>
          <AnimatedHeading className="text-[clamp(2rem,8vw,4.5rem)] tracking-tighter text-four-cream md:text-7xl">
            Pick up or delivery
          </AnimatedHeading>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {ORDER_STEPS.map((step) => (
            <div
              key={step.id}
              className="order-step border-2 border-four-cream/20 p-5 transition active:scale-[0.98] sm:p-6 md:hover:border-four-red"
            >
              <div className="mb-4 flex items-center justify-between text-four-red">
                {STEP_ICONS[step.icon]}
                <span className="font-display text-3xl tracking-tighter text-four-cream/20 sm:text-4xl">
                  0{step.id}
                </span>
              </div>
              <h3 className="font-display text-xl tracking-tight text-four-cream sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-four-cream/60">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
