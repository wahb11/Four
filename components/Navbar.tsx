"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/constants/site";
import { FourLogo } from "./FourLogo";
import { AnimatedButton } from "./AnimatedButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("four:mobile-menu", { detail: { open } })
    );

    if (!open) return;

    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  const overlay =
    portalReady &&
    open &&
    createPortal(
      <div
        id="mobile-menu-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          minHeight: "100dvh",
          zIndex: 2147483000,
          backgroundColor: "#9E2A2A",
          color: "#F1E5D6",
          display: "block",
          opacity: 1,
          visibility: "visible",
          pointerEvents: "auto",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
            padding: "0 20px",
            borderBottom: "1px solid rgba(241,229,214,0.25)",
            backgroundColor: "#9E2A2A",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display), Impact, sans-serif",
              fontSize: 22,
              letterSpacing: "-0.03em",
              color: "#F1E5D6",
              textTransform: "uppercase",
            }}
          >
            FOUR
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            style={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #F1E5D6",
              backgroundColor: "#F1E5D6",
              color: "#151515",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
        </div>

        <nav style={{ padding: "16px 20px 48px", backgroundColor: "#9E2A2A" }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              style={{
                display: "block",
                width: "100%",
                padding: "20px 0",
                borderBottom: "1px solid rgba(241,229,214,0.35)",
                color: "#F1E5D6",
                backgroundColor: "transparent",
                fontFamily: "var(--font-display), Impact, sans-serif",
                fontSize: "clamp(2rem, 9vw, 2.75rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                textDecoration: "none",
                opacity: 1,
                visibility: "visible",
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={close}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 28,
              padding: "16px 20px",
              border: "2px solid #F1E5D6",
              backgroundColor: "#F1E5D6",
              color: "#9E2A2A",
              fontFamily: "var(--font-display), Impact, sans-serif",
              fontSize: "1.25rem",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              textDecoration: "none",
              opacity: 1,
              visibility: "visible",
            }}
          >
            Order Now
          </a>
        </nav>
      </div>,
      document.body
    );

  return (
    <>
      <header
        id="site-nav"
        className={cn(
          "nav-shell fixed left-0 right-0 top-0 z-[100] transition-all duration-300",
          scrolled || open
            ? "bg-four-cream/95 shadow-[0_4px_0_#151515] backdrop-blur-md"
            : "bg-four-cream/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
        )}
      >
        <div className="mx-auto flex h-[var(--nav-height)] max-w-7xl items-center justify-between px-5 md:px-8">
          <Link href="/" className="relative min-w-0" aria-label={SITE.name}>
            <span className="flex items-center gap-2">
              <FourLogo variant="mark" size={40} />
              <span className="font-display text-xl tracking-tighter text-four-ink sm:text-2xl">
                FOUR
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex lg:gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-xs font-bold uppercase tracking-[0.2em] text-four-ink transition-colors hover:text-four-red"
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
            type="button"
            className="relative z-[101] flex h-10 w-10 items-center justify-center border-2 border-four-ink bg-four-cream sm:h-11 sm:w-11 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              <X className="h-5 w-5 text-four-ink" />
            ) : (
              <Menu className="h-5 w-5 text-four-ink" />
            )}
          </button>
        </div>
      </header>

      {overlay}
    </>
  );
}
