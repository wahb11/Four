"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X, Plus } from "lucide-react";
import type { SignatureItem } from "@/types";
import { AnimatedButton } from "./AnimatedButton";
import { ComicBadge } from "./ComicBadge";
import { formatPrice } from "@/lib/utils";

type Props = {
  item: SignatureItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ItemModal({ item, open, onOpenChange }: Props) {
  if (!item) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[200] bg-four-ink/70 data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[201] max-h-[90vh] w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto border-4 border-four-ink bg-four-cream shadow-[8px_8px_0_#151515] focus:outline-none">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-square overflow-hidden bg-four-ink md:aspect-auto md:min-h-[320px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              {item.badge && (
                <div className="absolute left-4 top-4">
                  <ComicBadge animate={false}>{item.badge}</ComicBadge>
                </div>
              )}
            </div>
            <div className="p-6 md:p-8">
              <Dialog.Title className="font-display text-4xl tracking-tighter text-four-ink md:text-5xl">
                {item.name}
              </Dialog.Title>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-four-red">
                {item.category}
              </p>
              <Dialog.Description className="mt-4 text-sm leading-relaxed text-four-ink/80">
                {item.description}
              </Dialog.Description>
              <ul className="mt-5 space-y-1.5">
                {item.ingredients.map((ing) => (
                  <li key={ing} className="flex items-center gap-2 text-sm text-four-ink">
                    <Plus className="h-3.5 w-3.5 text-four-red" />
                    {ing}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-display text-2xl tracking-tight text-four-ink sm:text-3xl">
                  {formatPrice(item.price)}
                </p>
                <AnimatedButton className="w-full sm:w-auto">Add to Order</AnimatedButton>
              </div>
            </div>
          </div>
          <Dialog.Close
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center bg-four-ink text-four-cream hover:bg-four-red"
            aria-label="Close"
            data-cursor="hover"
          >
            <X className="h-5 w-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
