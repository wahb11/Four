"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { FAQS } from "@/constants/menu";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { SectionEyebrow } from "@/components/SectionEyebrow";

export function FAQ() {
  return (
    <section id="faq" className="panel bg-four-cream py-16 sm:py-20 md:py-32">
      <div className="section-content mx-auto max-w-3xl px-4 sm:px-5 md:px-8">
        <div className="late-section-intro mb-6 sm:mb-8 md:mb-10">
          <SectionEyebrow className="text-four-red">FAQ</SectionEyebrow>
          <AnimatedHeading className="text-[clamp(2rem,8vw,4.5rem)] tracking-tighter text-four-ink md:text-6xl">
            Common questions
          </AnimatedHeading>
        </div>

        <Accordion.Root type="single" collapsible className="space-y-0">
          {FAQS.map((faq, i) => (
            <Accordion.Item
              key={faq.question}
              value={`item-${i}`}
              className="faq-row border-b-2 border-four-ink"
            >
              <Accordion.Header>
                <Accordion.Trigger
                  className="group flex w-full items-center justify-between gap-3 py-4 text-left font-display text-base tracking-tight text-four-ink transition active:text-four-red sm:py-5 sm:text-xl md:text-2xl md:hover:text-four-red"
                >
                  <span className="min-w-0 pr-2">{faq.question}</span>
                  <span className="relative flex h-8 w-8 shrink-0 items-center justify-center text-four-red transition-transform duration-300 group-data-[state=open]:rotate-180">
                    <Plus className="h-5 w-5 transition group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0" />
                    <Minus className="absolute h-5 w-5 opacity-0 transition group-data-[state=open]:opacity-100" />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="pb-4 text-sm leading-relaxed text-four-ink/70 sm:pb-5 md:text-base">
                  {faq.answer}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
