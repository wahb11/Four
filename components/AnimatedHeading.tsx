"use client";

import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { useMemo, useRef } from "react";
import { useReducedMotion } from "@/hooks/useMediaQuery";

type Props = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  split?: "chars" | "words" | "lines";
  delay?: number;
  scroll?: boolean;
};

function splitText(text: string, mode: "chars" | "words" | "lines") {
  if (mode === "chars") return text.split("");
  if (mode === "words") return text.split(/(\s+)/);
  return text.split("\n");
}

export function AnimatedHeading({
  children,
  as: Tag = "h2",
  className,
  split = "words",
  delay = 0,
  scroll = true,
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const parts = useMemo(() => splitText(children, split), [children, split]);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!ref.current || reduced) return;

      const animTargets = ref.current.querySelectorAll(".split-part");
      if (!animTargets.length) return;

      const tween = {
        y: 0,
        opacity: 1,
        rotate: 0,
        skewY: 0,
        duration: 0.7,
        stagger: split === "chars" ? 0.02 : 0.06,
        ease: "power4.out",
        delay,
      };

      if (scroll) {
        gsap.fromTo(
          animTargets,
          { y: "110%", opacity: 0, skewY: 3 },
          {
            ...tween,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      } else {
        gsap.fromTo(animTargets, { y: "110%", opacity: 0, skewY: 3 }, tween);
      }
    },
    { dependencies: [children, reduced, split, delay, scroll] }
  );

  return (
    <Tag ref={ref} className={cn("font-display uppercase", className)} aria-label={children}>
      {parts.map((part, i) => {
        if (part === "\n") return <br key={`br-${i}`} />;

        if (split === "words" && /^\s+$/.test(part)) {
          return (
            <span key={`space-${i}`} className="inline-block overflow-hidden align-top">
              <span className="split-part inline-block will-change-transform">&nbsp;</span>
            </span>
          );
        }

        if (split === "chars") {
          return (
            <span key={`char-${i}`} className="split-part inline-block will-change-transform">
              {part}
            </span>
          );
        }

        return (
          <span key={`word-${i}`} className="inline-block overflow-hidden align-top">
            <span className="split-part inline-block will-change-transform">{part}</span>
          </span>
        );
      })}
    </Tag>
  );
}
