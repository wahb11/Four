"use client";

import { PRODUCT_TRAIL } from "@/constants/menu";
import { useProductTrail } from "@/hooks/useProductTrail";

export function ProductTrail() {
  const { svgRef, bgPathRef, productRef, wrapRef } = useProductTrail(PRODUCT_TRAIL);

  return (
    <div
      ref={wrapRef}
      className="product-trail-wrap pointer-events-none absolute left-0 top-0 w-full"
      aria-hidden
    >
      <svg
        ref={svgRef}
        className="pointer-events-none absolute left-0 top-0 w-full opacity-0"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path ref={bgPathRef} d="" fill="none" stroke="transparent" strokeWidth={1} />
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={productRef}
        src={PRODUCT_TRAIL[0].image}
        alt=""
        className="product-trail-img trail-presentation-hero pointer-events-none absolute object-cover"
        style={{ visibility: "hidden" }}
      />
    </div>
  );
}
