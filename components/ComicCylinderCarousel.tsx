"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SignatureItem } from "@/types";
import { AnimatedButton } from "@/components/AnimatedButton";
import { formatPrice } from "@/lib/utils";
import { gsap } from "@/lib/gsap";
import { useIsMobile, useMounted } from "@/hooks/useMediaQuery";

type Props = {
  items: SignatureItem[];
  onSelect: (item: SignatureItem) => void;
};

/**
 * 3D cylinder carousel — drag / arrows / dots only.
 * Does NOT hijack page scroll (Lenis stays in control).
 */
export function ComicCylinderCarousel({ items, onSelect }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const isMobile = useIsMobile();
  const mobileLayout = mounted && isMobile;
  const [activeIndex, setActiveIndex] = useState(0);

  const total = items.length;
  const angleStep = 360 / Math.max(total, 1);
  const radius = mobileLayout ? 220 : 480;
  const panelW = mobileLayout ? 230 : 420;
  const panelH = mobileLayout ? 175 : 300;

  const currentRotation = useRef(0);
  const targetRotation = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartRot = useRef(0);
  const dragMoved = useRef(false);
  const rafRef = useRef(0);

  const applyRotation = useCallback(
    (deg: number) => {
      const track = trackRef.current;
      if (!track) return;
      currentRotation.current = deg;
      track.style.transform = `translateZ(${-radius * 0.55}px) rotateY(${deg}deg)`;
    },
    [radius]
  );

  const indexFromRotation = useCallback(
    (deg: number) => {
      let normalized = (-deg % 360);
      if (normalized < 0) normalized += 360;
      return Math.round(normalized / angleStep) % total;
    },
    [angleStep, total]
  );

  const goToIndex = useCallback(
    (index: number, animate = true) => {
      const safe = ((index % total) + total) % total;
      const target = -safe * angleStep;
      targetRotation.current = target;

      if (!animate) {
        applyRotation(target);
        setActiveIndex(safe);
        return;
      }

      const obj = { rot: currentRotation.current };
      gsap.to(obj, {
        rot: target,
        duration: 0.65,
        ease: "power3.out",
        onUpdate: () => {
          currentRotation.current = obj.rot;
          applyRotation(obj.rot);
        },
        onComplete: () => {
          currentRotation.current = target;
          setActiveIndex(safe);
        },
      });
    },
    [angleStep, total, applyRotation]
  );

  const navigate = useCallback(
    (dir: number) => {
      const idx = indexFromRotation(currentRotation.current);
      goToIndex(idx + dir);
    },
    [goToIndex, indexFromRotation]
  );

  // Physics loop — only eases toward target when not dragging
  useEffect(() => {
    const track = trackRef.current;
    if (!track || total === 0) return;

    const loop = () => {
      if (!isDragging.current) {
        const diff = targetRotation.current - currentRotation.current;
        if (Math.abs(diff) > 0.05) {
          currentRotation.current += diff * 0.14;
          applyRotation(currentRotation.current);
          const idx = indexFromRotation(currentRotation.current);
          setActiveIndex(idx);
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    targetRotation.current = 0;
    applyRotation(0);
    rafRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafRef.current);
  }, [total, applyRotation, indexFromRotation]);

  // Drag on the 3D stage only — no global wheel hijack
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      dragMoved.current = false;
      dragStartX.current = e.clientX;
      dragStartRot.current = currentRotation.current;
      stage.setPointerCapture(e.pointerId);
      stage.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const delta = e.clientX - dragStartX.current;
      if (Math.abs(delta) > 4) dragMoved.current = true;
      const rot = dragStartRot.current + delta * 0.35;
      applyRotation(rot);
      setActiveIndex(indexFromRotation(rot));
    };

    const snapAfterDrag = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      stage.style.cursor = "grab";
      const idx = indexFromRotation(currentRotation.current);
      goToIndex(idx);
      // Reset drag flag after click window
      setTimeout(() => {
        dragMoved.current = false;
      }, 50);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (stage.hasPointerCapture(e.pointerId)) {
        stage.releasePointerCapture(e.pointerId);
      }
      snapAfterDrag();
    };

    stage.addEventListener("pointerdown", onPointerDown, { capture: true });
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);

    return () => {
      stage.removeEventListener("pointerdown", onPointerDown, { capture: true });
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
    };
  }, [applyRotation, goToIndex, indexFromRotation]);

  const active = items[activeIndex] ?? items[0];

  return (
    <div className="relative">
      {/* 3D stage — drag here to spin. Page scroll passes through everywhere else. */}
      <div
        ref={stageRef}
        className="cylinder-stage relative flex min-h-[280px] cursor-grab select-none items-center justify-center overflow-hidden touch-pan-y sm:min-h-[340px] md:min-h-[440px]"
        style={{
          perspective: mobileLayout ? "800px" : "1400px",
          perspectiveOrigin: "50% 40%",
        }}
        aria-label={mobileLayout ? "Swipe to spin carousel" : "Drag to spin carousel"}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(158,42,42,0.25) 0%, transparent 60%)",
          }}
        />

        <div
          ref={trackRef}
          className="relative"
          style={{
            width: panelW,
            height: panelH,
            transformStyle: "preserve-3d",
            transform: `translateZ(${-radius * 0.55}px)`,
          }}
        >
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className="panel-face absolute left-0 top-0 overflow-hidden border-4 border-four-ink bg-four-ink text-left shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
              style={{
                width: panelW,
                height: panelH,
                transform: `rotateY(${i * angleStep}deg) translateZ(${radius}px)`,
                backfaceVisibility: "visible",
              }}
              onClick={(e) => {
                if (dragMoved.current) {
                  e.preventDefault();
                  return;
                }
                goToIndex(i);
                onSelect(item);
              }}
              data-cursor="hover"
              aria-label={item.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.name}
                className="pointer-events-none h-full w-full object-cover contrast-[1.08]"
                draggable={false}
              />
              <span className="pointer-events-none absolute inset-0 border border-white/20" />
            </button>
          ))}
        </div>

        <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.25em] text-four-cream/40">
          {mobileLayout ? "Swipe to spin" : "Drag to spin"}
        </p>
      </div>

      {/* Content + controls — outside stage, normal scroll */}
      <div className="relative z-10 mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <div className="comic-badge mb-3 inline-block bg-four-cream px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-four-ink">
            {active?.badge ?? active?.category}
          </div>
          <h3 className="font-display text-3xl tracking-tighter text-four-cream sm:text-4xl md:text-6xl">
            {active?.name}
          </h3>
          <p className="mt-3 max-w-sm border-l-4 border-four-red bg-black/30 p-3 text-sm leading-relaxed text-four-cream/70">
            {active?.description}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <p className="font-display text-3xl text-four-cream">
              {active ? formatPrice(active.price) : ""}
            </p>
            <AnimatedButton type="button" size="sm" onClick={() => active && onSelect(active)}>
              View Item
            </AnimatedButton>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <p className="font-display text-2xl tracking-widest text-four-cream/40 italic">
            <span className="text-four-red">{String(activeIndex + 1).padStart(2, "0")}</span> /{" "}
            {String(total).padStart(2, "0")}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex h-12 w-12 -skew-x-12 items-center justify-center border-2 border-four-cream bg-four-ink text-four-cream shadow-[3px_3px_0_#9E2A2A] transition hover:bg-four-red"
              aria-label="Previous"
              data-cursor="hover"
            >
              <ChevronLeft className="skew-x-12" />
            </button>
            <button
              type="button"
              onClick={() => navigate(1)}
              className="flex h-12 w-12 -skew-x-12 items-center justify-center border-2 border-four-cream bg-four-ink text-four-cream shadow-[3px_3px_0_#9E2A2A] transition hover:bg-four-red"
              aria-label="Next"
              data-cursor="hover"
            >
              <ChevronRight className="skew-x-12" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Go to ${item.name}`}
            onClick={() => goToIndex(i)}
            className={`h-2 -skew-x-12 border border-four-ink transition-all ${
              i === activeIndex ? "w-9 bg-four-red" : "w-6 bg-four-cream/20 hover:bg-four-cream/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
