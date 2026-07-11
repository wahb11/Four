"use client";

import { useEffect } from "react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "./useMediaQuery";

/** Site-wide scroll + load animations */
export function useGlobalMotion(enabled = true) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduced) return;
    registerGsapPlugins();

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const lateSectionIds = new Set([
        "gallery",
        "instagram",
        "testimonials",
        "order",
        "faq",
        "contact",
      ]);

      // ── Navbar entrance ──
      gsap.from(".nav-shell", {
        y: -80,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out",
        delay: 0.15,
      });

      gsap.from(".nav-link", {
        y: -16,
        opacity: 0,
        stagger: 0.06,
        duration: 0.55,
        ease: "power3.out",
        delay: 0.35,
      });

      // Nav link underline sweep
      document.querySelectorAll(".nav-link").forEach((link) => {
        const el = link as HTMLElement;
        el.addEventListener("mouseenter", () => {
          gsap.to(el, { letterSpacing: "0.28em", color: "#9E2A2A", duration: 0.25, ease: "power2.out" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { letterSpacing: "0.2em", color: "#151515", duration: 0.3, ease: "power2.out" });
        });
      });

      // ── Hero load extras (headline handled by AnimatedHeading) ──
      gsap.from(".hero-badge-row", {
        x: -40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.4,
      });

      gsap.from(".hero-body", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.55,
      });

      gsap.from(".hero-scroll-hint", {
        opacity: 0,
        y: 12,
        duration: 0.6,
        delay: 1.1,
        ease: "power2.out",
      });

      gsap.to(".hero-scroll-hint", {
        y: 6,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: "sine.inOut",
        delay: 1.5,
      });

      // ── Section clip reveals ──
      gsap.utils.toArray<HTMLElement>(".panel").forEach((panel, i) => {
        if (panel.id === "hero") return;
        if (isMobile && lateSectionIds.has(panel.id)) return;

        gsap.from(panel, {
          clipPath: "inset(0 0 100% 0)",
          duration: 1,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: panel,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        // Halftone parallax drift
        const halftone = panel.querySelector(".halftone");
        if (halftone) {
          gsap.to(halftone, {
            y: i % 2 === 0 ? 60 : -40,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }
      });

      // ── Generic motion attributes ──
      gsap.utils.toArray<HTMLElement>("[data-motion='fade-up']").forEach((el) => {
        gsap.from(el, {
          y: 56,
          opacity: 0,
          skewY: 3,
          duration: 0.85,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-motion='scale-in']").forEach((el) => {
        gsap.from(el, {
          scale: 0.88,
          opacity: 0,
          duration: 0.7,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-motion='clip-left']").forEach((el) => {
        gsap.from(el, {
          clipPath: "inset(0 100% 0 0)",
          duration: 0.9,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // ── Menu category headers pop ──
      gsap.utils.toArray<HTMLElement>(".menu-cat-head").forEach((head) => {
        gsap.from(head, {
          x: -30,
          opacity: 0,
          skewX: -6,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: head,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Price tag elastic pop
      gsap.utils.toArray<HTMLElement>(".price-tag").forEach((tag) => {
        gsap.from(tag, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(2.4)",
          scrollTrigger: {
            trigger: tag,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // ── Gallery tiles (desktop) ──
      if (!isMobile) {
      gsap.utils.toArray<HTMLElement>(".gallery-tile").forEach((tile, i) => {
        gsap.from(tile, {
          clipPath: "inset(100% 0 0 0)",
          scale: 0.94,
          opacity: 0,
          duration: 0.85,
          delay: (i % 3) * 0.06,
          ease: "power4.out",
          scrollTrigger: {
            trigger: tile,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });

        const caption = tile.querySelector("figcaption span");
        const img = tile.querySelector("img");
        const canHover = window.matchMedia("(hover: hover) and (min-width: 768px)").matches;
        if (caption && img && canHover) {
          gsap.set(caption, { y: 20, opacity: 0 });
          tile.addEventListener("mouseenter", () => {
            gsap.to(img, { scale: 1.08, duration: 0.5, ease: "power2.out" });
            gsap.to(caption, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" });
          });
          tile.addEventListener("mouseleave", () => {
            gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.out" });
            gsap.to(caption, { y: 20, opacity: 0, duration: 0.35 });
          });
        }
      });
      }

      // ── Instagram grid (desktop) ──
      if (!isMobile) {
      gsap.utils.toArray<HTMLElement>(".ig-tile").forEach((tile, i) => {
        gsap.from(tile, {
          scale: 0.85,
          rotation: i % 2 === 0 ? -3 : 3,
          opacity: 0,
          duration: 0.65,
          delay: i * 0.05,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: tile,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
      }

      // ── FAQ rows (desktop) ──
      if (!isMobile) {
      gsap.utils.toArray<HTMLElement>(".faq-row").forEach((row, i) => {
        gsap.from(row, {
          x: i % 2 === 0 ? -24 : 24,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });
      });
      }

      // ── Footer (desktop) ──
      if (!isMobile) {
      gsap.from(".footer-block", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "footer",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
      }

      gsap.utils.toArray<HTMLElement>(".social-icon").forEach((icon) => {
        icon.addEventListener("mouseenter", () => {
          gsap.to(icon, { y: -4, scale: 1.08, duration: 0.25, ease: "back.out(2)" });
        });
        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
        });
      });

      // ── Featured dock card ──
      gsap.from("#featured-dock-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "#featured-dock-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".cylinder-stage", {
        scale: 0.92,
        opacity: 0,
        rotationY: -8,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cylinder-stage",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Testimonial cards hover ──
      gsap.utils.toArray<HTMLElement>(".testimonial-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -6, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, duration: 0.35, ease: "power2.out" });
        });
      });

      // About burger float
      gsap.to(".about-visual img", {
        y: -12,
        rotation: 3,
        repeat: -1,
        yoyo: true,
        duration: 2.4,
        ease: "sine.inOut",
      });

      // Order steps animated in OrderSteps.tsx

      if (!isMobile) {
      gsap.from(".contact-field", {
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.55,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".contact-hero-title", {
        skewY: 8,
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".contact-hero-title",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
      }
    });

    return () => ctx.revert();
  }, [enabled, reduced]);
}
