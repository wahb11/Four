"use client";

import { useCallback, useEffect, useRef } from "react";
import type { TrailPresentation, TrailStop } from "@/types";
import { clamp, clampValue, debounce, generateTrailPath, lerp } from "@/lib/path";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { useIsMobile, useReducedMotion } from "./useMediaQuery";

const DOCK = "#product-dock";
const START = "#trail-start";
const SIGNATURE = "#signature";

function mobileClampSize(vw: number, ratio: number, min: number, max: number) {
  return Math.round(Math.min(Math.max(vw * ratio, min), max));
}

function readSlotSize(selector: string, fallback: number) {
  const el = document.querySelector(selector);
  if (!el) return fallback;
  const r = el.getBoundingClientRect();
  const size = Math.max(r.width, r.height);
  return size > 0 ? Math.round(size) : fallback;
}

type PresentationStyle = {
  size: number;
  radius: number;
  rotation: number;
  presentation: TrailPresentation;
};

function getPresentationStyle(
  progress: number,
  isMobile: boolean,
  vw: number,
  sizes: { hero: number; photo: number }
): PresentationStyle {
  const zones: { until: number; p: TrailPresentation; size: number; radius: number; rot: number }[] =
    isMobile
      ? [
          { until: 0.38, p: "hero", size: sizes.hero, radius: 9999, rot: 0 },
          { until: 0.72, p: "photo", size: sizes.photo, radius: 10, rot: 0 },
          { until: 1, p: "dock", size: sizes.photo, radius: 4, rot: 0 },
        ]
      : [
          { until: 0.38, p: "hero", size: 240, radius: 9999, rot: -6 },
          { until: 0.72, p: "photo", size: 176, radius: 12, rot: 4 },
          { until: 1, p: "dock", size: 160, radius: 4, rot: 0 },
        ];

  let current = zones[0];
  let next = zones[1];

  for (let i = 0; i < zones.length; i++) {
    if (progress <= zones[i].until) {
      current = zones[i];
      next = zones[i + 1] ?? zones[i];
      break;
    }
  }

  // Mobile: snap styles per zone — avoids expensive border-radius tweens
  if (isMobile) {
    return {
      size: current.size,
      radius: current.radius,
      rotation: 0,
      presentation: current.p,
    };
  }

  const band = 0.07;
  const edge = current.until;
  const blend = clamp((progress - (edge - band)) / band);

  if (blend <= 0 || current.p === next.p) {
    return {
      size: current.size,
      radius: current.radius,
      rotation: current.rot,
      presentation: current.p,
    };
  }

  return {
    size: lerp(current.size, next.size, blend),
    radius: lerp(current.radius, next.radius, blend),
    rotation: lerp(current.rot, next.rot, blend),
    presentation: blend > 0.5 ? next.p : current.p,
  };
}

/**
 * Three-stop trail: hero (right) → about photo (left) → signature dock (right).
 * Ends at signature — does not continue through menu or rest of page.
 */
export function useProductTrail(stops: TrailStop[], enabled = true) {
  const svgRef = useRef<SVGSVGElement>(null);
  const bgPathRef = useRef<SVGPathElement>(null);
  const productRef = useRef<HTMLImageElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dockedRef = useRef(false);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  const rebuild = useCallback(() => {
    registerGsapPlugins();
    const pathEl = bgPathRef.current;
    const product = productRef.current;
    const svg = svgRef.current;
    const wrap = wrapRef.current;
    if (!pathEl || !product || !svg || !wrap) return;

    ScrollTrigger.getById("product-trail")?.kill();

    const dock = document.querySelector(DOCK) as HTMLElement | null;
    const dockImg = document.querySelector("#product-dock-img") as HTMLImageElement | null;
    const dockPlaceholder = document.querySelector(
      "#product-dock-placeholder"
    ) as HTMLElement | null;
    const signatureEl = document.querySelector(SIGNATURE);

    if (!dock) return;

    const vw = window.innerWidth;
    const mobile = isMobile || vw < 768;

    const mobileSizes = {
      hero: mobile
        ? readSlotSize(START, mobileClampSize(vw, 0.38, 136, 200))
        : 240,
      photo: mobile
        ? readSlotSize("#trail-about-slot", mobileClampSize(vw, 0.36, 128, 184))
        : 176,
    };

    const sectionStops = [{ selector: "#trail-about-slot", center: true }];

    const pathData = generateTrailPath({
      mobile,
      startSelector: START,
      sectionStops,
      dockSelector: DOCK,
    });
    if (!pathData) return;

    const signatureBottom = signatureEl
      ? signatureEl.getBoundingClientRect().bottom + window.scrollY
      : dock.getBoundingClientRect().bottom + window.scrollY;

    wrap.style.height = `${signatureBottom}px`;
    wrap.style.zIndex = "10";
    svg.setAttribute("width", String(vw));
    svg.setAttribute("height", String(signatureBottom));
    svg.setAttribute("viewBox", `0 0 ${vw} ${signatureBottom}`);
    pathEl.setAttribute("d", pathData);

    const pathLength = pathEl.getTotalLength();
    if (!pathLength) return;

    const heroImage = stops[0]?.image ?? "/images/products/burger.png";
    product.src = heroImage;
    if (dockImg) dockImg.src = heroImage;

    const morphStart = mobile ? 0.8 : 0.78;
    const scrubAmount = mobile ? 0.1 : 0.35;
    dockedRef.current = false;

    product.classList.toggle("product-trail-img--mobile", mobile);

    let dockCache = { x: 0, y: 0, w: 0, h: 0 };

    const refreshDockCache = () => {
      const r = dock.getBoundingClientRect();
      dockCache = {
        x: r.left + r.width / 2,
        y: r.top + window.scrollY + r.height / 2,
        w: r.width,
        h: r.height,
      };
    };
    refreshDockCache();

    const setLayer = (front: boolean) => {
      wrap.style.zIndex = front ? "25" : "10";
    };

    let activePresentation: TrailPresentation | null = null;
    const applyPresentationClass = (presentation: TrailPresentation) => {
      if (presentation === activePresentation) return;
      activePresentation = presentation;
      product.classList.remove(
        "trail-presentation-hero",
        "trail-presentation-photo",
        "trail-presentation-menu-item",
        "trail-presentation-dock"
      );
      product.classList.add(`trail-presentation-${presentation}`);
    };

    // GPU-friendly setters — x/y transforms instead of left/top
    gsap.set(product, {
      position: "absolute",
      top: 0,
      left: 0,
      xPercent: -50,
      yPercent: -50,
      transformOrigin: "50% 50%",
      force3D: true,
    });

    const setX = gsap.quickSetter(product, "x", "px");
    const setY = gsap.quickSetter(product, "y", "px");
    const setW = gsap.quickSetter(product, "width", "px");
    const setH = gsap.quickSetter(product, "height", "px");
    const setRot = gsap.quickSetter(product, "rotation", "deg");

    let layerFront = false;

    const revealDock = () => {
      if (dockedRef.current) return;
      dockedRef.current = true;
      setLayer(false);
      layerFront = false;
      applyPresentationClass("dock");

      gsap.set(product, { opacity: 0, visibility: "hidden" });

      if (dockPlaceholder) {
        gsap.to(dockPlaceholder, { opacity: 0, duration: 0.25, ease: "power2.in" });
      }

      if (dockImg) {
        gsap.fromTo(
          dockImg,
          { opacity: 0, scale: 1.12 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
        );
      }

      dock.classList.add("is-filled");
    };

    const undock = () => {
      dockedRef.current = false;
      dock.classList.remove("is-filled");
      product.style.visibility = "visible";
      gsap.set(product, { opacity: 1 });
      if (dockImg) gsap.set(dockImg, { opacity: 0, scale: 1 });
      if (dockPlaceholder) gsap.set(dockPlaceholder, { opacity: 1 });
    };

    const placeAt = (progress: number) => {
      const p = clamp(progress);
      const pt = pathEl.getPointAtLength(p * pathLength);
      const style = getPresentationStyle(p, mobile, vw, mobileSizes);

      const morphT = clamp((p - morphStart) / (1 - morphStart));
      const ease = morphT * morphT * (3 - 2 * morphT);

      const front = p > 0.75;
      if (front !== layerFront) {
        layerFront = front;
        setLayer(front);
      }

      applyPresentationClass(morphT > 0.5 ? "dock" : style.presentation);

      let x = lerp(pt.x, dockCache.x, ease);
      let y = lerp(pt.y, dockCache.y, ease);
      let w = lerp(style.size, dockCache.w, ease);
      let h = lerp(style.size, dockCache.h, ease);

      if (mobile) {
        const margin = 16;
        x = clampValue(x, margin + w / 2, vw - margin - w / 2);

        // Keep burger inside its stage while still in the hero zone
        if (p < 0.22) {
          const startEl = document.querySelector(START);
          if (startEl) {
            const r = startEl.getBoundingClientRect();
            const anchorY = r.top + window.scrollY + r.height / 2;
            y = lerp(y, anchorY, 0.65);
          }
        }
      }

      const rot = mobile ? 0 : lerp(style.rotation, 0, ease);

      if (ease >= 0.98) {
        revealDock();
        return;
      }

      if (dockedRef.current) undock();

      setX(x);
      setY(y);
      setW(w);
      setH(h);
      setRot(rot);

      gsap.set(product, { opacity: 1, visibility: "visible" });

      if (dockPlaceholder) gsap.set(dockPlaceholder, { opacity: 1 - ease * 0.85 });
      if (dockImg && ease < 0.98) gsap.set(dockImg, { opacity: 0 });
    };

    if (reduced || !enabled) {
      revealDock();
      return;
    }

    undock();
    setLayer(false);
    layerFront = false;
    activePresentation = null;
    applyPresentationClass("hero");
    placeAt(0);

    const st = ScrollTrigger.create({
      id: "product-trail",
      trigger: "#hero",
      start: "top top",
      endTrigger: DOCK,
      end: mobile ? "center 65%" : "center center",
      scrub: scrubAmount,
      invalidateOnRefresh: true,
      fastScrollEnd: mobile,
      onRefresh: refreshDockCache,
      onUpdate: (self) => placeAt(self.progress),
      onLeave: () => revealDock(),
      onLeaveBack: () => {
        undock();
        setLayer(false);
        layerFront = false;
        activePresentation = null;
        applyPresentationClass("hero");
        placeAt(0);
      },
    });

    return () => {
      st.kill();
    };
  }, [stops, enabled, isMobile, reduced]);

  useEffect(() => {
    const boot = () => {
      rebuild();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    boot();

    const timers = isMobile
      ? [600].map((ms) => setTimeout(boot, ms))
      : [400, 900].map((ms) => setTimeout(boot, ms));

    const onResize = debounce(() => {
      rebuild();
      ScrollTrigger.refresh();
    }, isMobile ? 250 : 180);

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("load", boot, { passive: true });

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", boot);
      ScrollTrigger.getById("product-trail")?.kill();
    };
  }, [rebuild, isMobile]);

  return { svgRef, bgPathRef, productRef, wrapRef };
}
