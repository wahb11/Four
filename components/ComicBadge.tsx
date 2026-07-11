"use client";

import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
};

export function ComicBadge({ children, className, animate = true }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!animate || !ref.current) return;
    gsap.from(ref.current, {
      scale: 0,
      rotation: -12,
      duration: 0.55,
      ease: "back.out(2.2)",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  }, [animate]);

  return (
    <span
      ref={ref}
      className={cn(
        "comic-badge inline-flex items-center gap-1 bg-four-red px-3 py-1 text-xs font-bold uppercase tracking-wider text-four-cream",
        className
      )}
    >
      <span className="inline-flex items-center gap-1">{children}</span>
    </span>
  );
}
