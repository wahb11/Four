"use client";

import { useEffect } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { useIsMobile, useReducedMotion } from "./useMediaQuery";

const LATE_PANELS = ["gallery", "instagram", "testimonials", "order", "faq", "contact"];

/** Extra scroll reveals for the bottom half of the page — tuned for mobile. */
export function useLateSectionMotion(enabled = true) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduced || !isMobile) return;
    registerGsapPlugins();

    const ctx = gsap.context(() => {
      LATE_PANELS.forEach((id) => {
        const panel = document.getElementById(id);
        if (!panel) return;
        gsap.from(panel, {
          y: 28,
          opacity: 0,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 96%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".late-section-intro").forEach((intro) => {
        gsap.from(intro.children, {
          y: 32,
          opacity: 0,
          stagger: 0.09,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: intro,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".gallery-tile").forEach((tile, i) => {
        gsap.from(tile, {
          y: 44,
          scale: 0.9,
          opacity: 0,
          rotation: i % 2 === 0 ? -2.5 : 2.5,
          duration: 0.72,
          delay: (i % 3) * 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tile,
            start: "top 94%",
            toggleActions: "play none none none",
          },
        });

        const caption = tile.querySelector(".gallery-caption span");
        if (caption) {
          gsap.from(caption, {
            y: 14,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: tile,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });
        }
      });

      gsap.from(".ig-follow-btn", {
        scale: 0.88,
        opacity: 0,
        y: 22,
        duration: 0.65,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".ig-follow-btn",
          start: "top 93%",
          toggleActions: "play none none none",
        },
      });

      gsap.utils.toArray<HTMLElement>(".ig-tile").forEach((tile, i) => {
        gsap.from(tile, {
          y: 36,
          scale: 0.86,
          opacity: 0,
          rotation: i % 2 === 0 ? -3 : 3,
          duration: 0.68,
          delay: (i % 3) * 0.06,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: tile,
            start: "top 94%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.from(".testimonials-hint", {
        opacity: 0,
        x: -16,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".testimonials-hint",
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });

      gsap.utils.toArray<HTMLElement>(".testimonial-card").forEach((card, i) => {
        if (i >= 5) return;
        gsap.from(card, {
          x: 36,
          opacity: 0,
          scale: 0.93,
          duration: 0.62,
          delay: i * 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#testimonials",
            start: "top 84%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".faq-row").forEach((row, i) => {
        gsap.from(row, {
          y: 22,
          opacity: 0,
          duration: 0.52,
          delay: i * 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 94%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.from(".contact-hero-title", {
        skewY: 6,
        y: 48,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".contact-hero-title",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".contact-subline", {
        y: 18,
        opacity: 0,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-subline",
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });

      gsap.utils.toArray<HTMLElement>(".contact-info-block").forEach((block, i) => {
        gsap.from(block, {
          x: -24,
          opacity: 0,
          duration: 0.58,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 93%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.from(".contact-map", {
        y: 28,
        scale: 0.94,
        opacity: 0,
        clipPath: "inset(6% 6% 6% 6%)",
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".contact-map",
          start: "top 93%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".contact-form", {
        y: 48,
        opacity: 0,
        scale: 0.97,
        duration: 0.82,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 94%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".footer-block", {
        y: 28,
        opacity: 0,
        stagger: 0.12,
        duration: 0.68,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "footer",
          start: "top 93%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".social-icon", {
        scale: 0,
        opacity: 0,
        stagger: 0.07,
        duration: 0.48,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: "footer",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, [enabled, reduced, isMobile]);
}
