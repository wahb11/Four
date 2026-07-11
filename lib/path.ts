export type TrailPathStop = {
  selector: string;
  side?: "left" | "right";
  yRatio?: number;
  center?: boolean;
};

/**
 * Zigzag path: hero start → section stops (left / right / left …) → dock.
 */
export function generateTrailPath(options: {
  scrollY?: number;
  startSelector: string;
  sectionStops: TrailPathStop[];
  dockSelector: string;
  mobile?: boolean;
}): string {
  if (typeof window === "undefined") return "";

  const scrollY = options.scrollY ?? window.scrollY;
  const windowWidth = window.innerWidth;
  const mobile = options.mobile ?? windowWidth < 768;
  const edgeInset = mobile ? 0.1 : 0.11;

  const startEl = document.querySelector(options.startSelector);
  const dockEl = document.querySelector(options.dockSelector);
  if (!startEl || !dockEl) return "";

  const pointFromElement = (el: Element, stop: TrailPathStop) => {
    const r = el.getBoundingClientRect();
    if (stop.center || stop.selector.includes("trail-")) {
      return {
        x: r.left + r.width / 2,
        y: r.top + scrollY + r.height / 2,
      };
    }
    const side = stop.side ?? "left";
    const yRatio = stop.yRatio ?? 0.5;
    const x =
      side === "left"
        ? Math.max(24, r.left + windowWidth * edgeInset)
        : Math.min(windowWidth - 24, r.right - windowWidth * edgeInset);
    return { x, y: r.top + scrollY + r.height * yRatio };
  };

  const startRect = startEl.getBoundingClientRect();
  const dockRect = dockEl.getBoundingClientRect();

  const points: { x: number; y: number }[] = [
    {
      x: startRect.left + startRect.width / 2,
      y: startRect.top + scrollY + startRect.height / 2,
    },
  ];

  options.sectionStops.forEach((stop) => {
    const el = document.querySelector(stop.selector);
    if (el) points.push(pointFromElement(el, stop));
  });

  points.push({
    x: dockRect.left + dockRect.width / 2,
    y: dockRect.top + scrollY + dockRect.height / 2,
  });

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const dy = curr.y - prev.y;
    const bend = mobile ? 0.36 : 0.5;
    const cy1 = prev.y + dy * bend;
    const cy2 = curr.y - dy * bend;
    if (mobile) {
      const midX = (prev.x + curr.x) / 2;
      d += ` C ${midX} ${cy1}, ${midX} ${cy2}, ${curr.x} ${curr.y}`;
    } else {
      d += ` C ${prev.x} ${cy1}, ${curr.x} ${cy2}, ${curr.x} ${curr.y}`;
    }
  }
  return d;
}

/** @deprecated use generateTrailPath */
export function generateDockPath(options: {
  scrollY?: number;
  sweepWidth?: number;
  dockSelector?: string;
  startSelector?: string;
  midSelectors?: string[];
  mobile?: boolean;
} = {}): string {
  const mids = (options.midSelectors ?? ["#about", "#menu"]).map((selector, i) => ({
    selector,
    side: (i % 2 === 0 ? "left" : "right") as "left" | "right",
    yRatio: selector === "#menu" ? 0.35 : 0.5,
  }));
  return generateTrailPath({
    startSelector: options.startSelector ?? "#trail-start",
    sectionStops: mids,
    dockSelector: options.dockSelector ?? "#product-dock",
    mobile: options.mobile,
  });
}

export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  wait = 150
) {
  let t: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function clamp(n: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, n));
}

export function clampValue(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
