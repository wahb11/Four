"use client";

import { useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import { FourLogo } from "./FourLogo";

type Props = {
  onComplete?: () => void;
};

export function Loader({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const obj = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to("#four-loader", {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.9,
          ease: "power4.inOut",
          onComplete: () => {
            setDone(true);
            onComplete?.();
          },
        });
      },
    });

    tl.to(obj, {
      v: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.round(obj.v)),
    });

    tl.fromTo(
      ".loader-layer",
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 0.45, ease: "back.out(1.8)" },
      0.2
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      id="four-loader"
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-four-cream"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      <div className="mb-8 text-four-red">
        <FourLogo variant="lockup" size={56} className="!text-four-red [&_svg]:text-four-ink" />
      </div>

      <div className="mb-10 flex flex-col items-center gap-1">
        <div className="loader-layer h-3 w-28 rounded-t-full bg-[#E8A84A]" />
        <div className="loader-layer h-3 w-28 bg-four-red" />
        <div className="loader-layer h-2 w-28 bg-[#3D7A3D]" />
        <div className="loader-layer h-3 w-28 bg-[#F4C96A]" />
        <div className="loader-layer h-4 w-28 rounded-b-full bg-[#5C3A1E]" />
      </div>

      <p className="font-display text-5xl tracking-tighter text-four-ink tabular-nums sm:text-6xl md:text-8xl">
        {progress}
        <span className="text-four-red">%</span>
      </p>
      <p className="mt-3 text-xs font-medium uppercase tracking-[0.3em] text-four-ink/50">
        Heating the grill
      </p>
    </div>
  );
}
