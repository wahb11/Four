"use client";

import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export function DragCursorHint({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-sm bg-four-ink px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-four-cream opacity-0 transition-opacity group-hover:opacity-100 md:flex",
        className
      )}
      aria-hidden
    >
      <MoveHorizontal className="h-3.5 w-3.5" />
      Drag
    </span>
  );
}
