"use client";

import { useEffect } from "react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { useIsMobile, useReducedMotion } from "./useMediaQuery";

const LATE_PANELS = [
  "menu",
  "gallery",
  "instagram",
  "testimonials",
  "order",
  "faq",
  "contact",
];

/** Scroll reveals for Gallery → Footer — all screen sizes. */
export function useLateSectionMotion(enabled = true) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduced) return;
    registerGsapPlugins();

    const ctx = gsap.context(() => {
      LATE_PANELS.forEach((id) => {
        const panel = document.getElementById(id);
        if (!panel) return;
        gsap.from(panel, {
          y: isMobile ? 24 : 40,
          opacity: 0,
          duration: isMobile ? 0.6 : 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: isMobile ? "top 96%" : "top 92%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".late-section-intro").forEach((intro) => {
        gsap.from(intro.children, {
          y: isMobile ? 28 : 40,
          opacity: 0,
          skewY: isMobile ? 0 : 2,
          stagger: 0.09,
          duration: 0.75,
          ease: "power4.out",
          scrollTrigger: {
            trigger: intro,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".menu-cat-head").forEach((head, i) => {
        gsap.from(head, {
          x: i % 2 === 0 ? -32 : 32,
          opacity: 0,
          skewX: -4,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: head,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".menu-row").forEach((row, i) => {
        gsap.from(row, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          delay: (i % 4) * 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 94%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".gallery-tile").forEach((tile, i) => {
        gsap.from(tile, {
          y: isMobile ? 40 : 56,
          scale: 0.9,
          opacity: 0,
          rotation: i % 2 === 0 ? -2 : 2,
          duration: 0.8,
          delay: (i % 3) * 0.06,
          ease: "power4.out",
          scrollTrigger: {
            trigger: tile,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });

        const caption = tile.querySelector(".gallery-caption span");
        if (caption) {
          gsap.from(caption, {
            y: 16,
            opacity: 0,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: tile,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
        }
      });

      gsap.from(".ig-follow-btn", {
        scale: 0.88,
        opacity: 0,
        y: 20,
        duration: 0.65,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".ig-follow-btn",
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });

      gsap.utils.toArray<HTMLElement>(".ig-tile").forEach((tile, i) => {
        gsap.from(tile, {
          y: isMobile ? 32 : 48,
          scale: 0.86,
          opacity: 0,
          rotation: i % 2 === 0 ? -3 : 3,
          duration: 0.7,
          delay: (i % 3) * 0.05,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: tile,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.from(".testimonials-hint", {
        opacity: 0,
        x: -16,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".testimonials-hint",
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });

      gsap.utils.toArray<HTMLElement>(".testimonial-card").forEach((card, i) => {
        if (i >= 6) return;
        gsap.from(card, {
          x: isMobile ? 32 : 48,
          opacity: 0,
          scale: 0.92,
          duration: 0.65,
          delay: Math.min(i, 3) * 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#testimonials",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".order-step").forEach((step, i) => {
        gsap.from(step, {
          y: 36,
          opacity: 0,
          scale: 0.92,
          rotation: i % 2 === 0 ? -2 : 2,
          duration: 0.65,
          delay: i * 0.08,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: step,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".faq-row").forEach((row, i) => {
        gsap.from(row, {
          x: i % 2 === 0 ? -20 : 20,
          y: 16,
          opacity: 0,
          duration: 0.55,
          delay: i * 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 93%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.from(".contact-hero-title", {
        skewY: 6,
        y: isMobile ? 40 : 64,
        opacity: 0,
        scale: 0.95,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".contact-hero-title",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".contact-subline", {
        y: 16,
        opacity: 0,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-subline",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      gsap.utils.toArray<HTMLElement>(".contact-info-block").forEach((block, i) => {
        gsap.from(block, {
          x: -24,
          opacity: 0,
          duration: 0.58,
          delay: i * 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.from(".contact-map", {
        y: 28,
        scale: 0.94,
        opacity: 0,
        clipPath: "inset(8% 8% 8% 8%)",
        duration: 0.85,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".contact-map",
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".contact-form", {
        y: 44,
        opacity: 0,
        scale: 0.97,
        duration: 0.85,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });

      gsap.utils.toArray<HTMLElement>(".contact-field").forEach((field, i) => {
        gsap.from(field, {
          y: 20,
          opacity: 0,
          duration: 0.45,
          delay: i * 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.from(".footer-block", {
        y: 32,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "footer",
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".social-icon", {
        scale: 0,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: "footer",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [enabled, reduced, isMobile]);
}
