"use client";

import {
  Beef,
  Cookie,
  Croissant,
  CupSoda,
  Drumstick,
  GlassWater,
  IceCreamBowl,
  Pizza,
  Salad,
  Sparkles,
  SquareStack,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  burger: Beef,
  pizza: Pizza,
  wings: Drumstick,
  wrap: Salad,
  fries: SquareStack,
  calzone: Croissant,
  shake: IceCreamBowl,
  dessert: Cookie,
  drink: GlassWater,
  fizz: Sparkles,
};

type Props = {
  icon: string;
  className?: string;
  size?: number;
};

export function MenuCategoryIcon({ icon, className, size = 20 }: Props) {
  const Icon = ICONS[icon] ?? CupSoda;
  return <Icon className={cn("shrink-0", className)} size={size} aria-hidden />;
}
