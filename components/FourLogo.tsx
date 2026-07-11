"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { useRef, useState } from "react";
import { SITE } from "@/constants/site";

type Props = {
  className?: string;
  variant?: "mark" | "lockup" | "hand";
  animate?: boolean;
  size?: number;
};

export function FourLogo({
  className,
  variant = "lockup",
  animate = false,
  size = 48,
}: Props) {
  const pathRef = useRef<SVGPathElement>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = SITE.useLogoImage && !imageFailed && variant !== "hand";

  useGSAP(() => {
    if (!animate || !pathRef.current || showImage) return;
    registerGsapPlugins();
    const path = pathRef.current;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: path,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  }, [animate, showImage]);

  if (showImage) {
    const src = variant === "mark" ? SITE.logoMark : SITE.logoFull;
    const width = variant === "mark" ? size : Math.round(size * 2.8);
    return (
      <span className={cn("relative inline-flex shrink-0 items-center", className)}>
        <Image
          src={src}
          alt={SITE.name}
          width={width}
          height={size}
          className="h-auto w-auto object-contain"
          style={{ height: size, width: variant === "mark" ? size : "auto", maxWidth: width }}
          onError={() => setImageFailed(true)}
          unoptimized
        />
      </span>
    );
  }

  const Hand = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        ref={pathRef}
        d="M28 62c-2-8-1-18 2-26 2-5 4-12 3-18 0-2 2-4 4-3 2 1 3 4 3 7v10l1-14c0-3 2-5 4-4s3 4 3 7v12l2-12c0-3 2-5 4-4 2 1 3 4 3 7v14l2-8c1-3 3-4 5-3 2 1 3 4 2 7-2 10-5 22-8 30-2 5-7 8-12 8H36c-5 0-8-4-8-8z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M36 48c4 3 10 4 16 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );

  if (variant === "hand") return <span className={cn("text-four-ink", className)}>{Hand}</span>;

  if (variant === "mark") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-four-red text-four-cream",
          className
        )}
        style={{ width: size, height: size }}
        aria-label={SITE.name}
      >
        <span className="font-display text-lg tracking-tighter">F</span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-1 text-four-cream", className)}>
      <span className="font-display text-3xl tracking-tighter md:text-4xl">F</span>
      <span className="font-display text-3xl tracking-tighter md:text-4xl">O</span>
      <span className="-mx-1 text-four-cream">{Hand}</span>
      <span className="font-display text-3xl tracking-tighter md:text-4xl">U</span>
      <span className="font-display text-3xl tracking-tighter md:text-4xl">R</span>
    </span>
  );
}
