"use client";

import { useGlobalMotion } from "@/hooks/useGlobalMotion";
import { useLateSectionMotion } from "@/hooks/useLateSectionMotion";

export function GlobalMotion({ enabled }: { enabled: boolean }) {
  useGlobalMotion(enabled);
  useLateSectionMotion(enabled);
  return null;
}
