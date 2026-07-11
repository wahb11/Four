export type MenuSize = "S" | "M" | "L";

export interface MenuItem {
  name: string;
  description?: string;
  price?: number | string;
  prices?: Partial<Record<MenuSize, number>>;
}

export interface MenuCategory {
  id: string;
  label: string;
  icon: string;
  subtitle?: string;
  layout: "list" | "sized";
  items: MenuItem[];
  note?: string;
  boxed?: boolean;
}

export interface SignatureItem {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  image: string;
  badge?: string;
  category: string;
}

export interface GalleryTile {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  tall?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  rating: number;
}

export type TrailPresentation = "hero" | "photo" | "menu-item" | "dock";

export interface TrailStop {
  section: string;
  image: string;
  side?: "left" | "right";
  presentation?: TrailPresentation;
  yRatio?: number;
  rotationRange?: [number, number];
}

export interface OrderStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
