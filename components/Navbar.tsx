"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/constants/site";
import { FourLogo } from "./FourLogo";
import { AnimatedButton } from "./AnimatedButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      id="site-nav"
      suppressHydrationWarning
      className={cn(
        "nav-shell fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-four-cream/95 shadow-[0_4px_0_#151515] backdrop-blur-md" : "bg-four-cream/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
      )}
    >
      <div
        className="mx-auto flex h-[var(--nav-height)] max-w-7xl items-center justify-between px-5 md:px-8"
        suppressHydrationWarning
      >
        <Link href="/" className="relative z-[60] min-w-0" data-cursor="hover" aria-label={SITE.name}>
          <span className="flex items-center gap-2">
            <FourLogo variant="mark" size={40} />
            <span className="font-display text-xl tracking-tighter text-four-ink sm:text-2xl">FOUR</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-xs font-bold uppercase tracking-[0.2em] text-four-ink transition-colors hover:text-four-red"
              data-cursor="hover"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <AnimatedButton asChild size="sm">
            <a href="#contact">Order Now</a>
          </AnimatedButton>
        </div>

        <button
          className="relative z-[60] flex h-10 w-10 items-center justify-center border-2 border-four-ink bg-four-cream sm:h-11 sm:w-11 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          data-cursor="hover"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[55] flex flex-col bg-four-red px-6 pt-[calc(var(--nav-height)+2rem)] transition-transform duration-500 md:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!open}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="border-b border-four-cream/20 py-4 font-display text-3xl tracking-tighter text-four-cream sm:py-5 sm:text-4xl"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="mt-6 inline-flex items-center justify-center border-2 border-four-cream bg-four-cream py-3.5 font-display text-lg tracking-tight text-four-red sm:mt-8 sm:py-4 sm:text-xl"
        >
          Order Now
        </a>
      </div>
    </header>
  );
}
