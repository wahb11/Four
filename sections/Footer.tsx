"use client";

import { SITE } from "@/constants/site";
import { FourLogo } from "@/components/FourLogo";
import { AnimatedButton } from "@/components/AnimatedButton";
import { InstagramIcon } from "@/components/SocialIcons";

export function Footer() {
  return (
    <footer className="bg-four-ink py-14 text-four-cream sm:py-16 md:py-20">
      <div className="section-content mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-10 border-b border-four-cream/15 pb-12 md:flex-row md:items-end">
          <div className="footer-block">
            <FourLogo
              variant="lockup"
              animate
              size={64}
              className="text-four-cream [&_svg]:text-four-cream"
            />
            <p className="mt-4 max-w-xs text-sm text-four-cream/50">
              {SITE.tagline}
            </p>
          </div>

          <form
            className="footer-block flex w-full max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Email for drops & deals"
              className="flex-1 border-2 border-four-cream/20 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-four-red focus:shadow-[0_0_0_3px_rgba(158,42,42,0.2)]"
              aria-label="Email"
            />
            <AnimatedButton type="submit" size="sm">
              Join
            </AnimatedButton>
          </form>
        </div>

        <div className="footer-block mt-8 flex flex-wrap items-center justify-between gap-6">
          <div className="flex gap-4">
            {[
              { Icon: InstagramIcon, href: SITE.instagram, label: "Instagram" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="social-icon flex h-11 w-11 items-center justify-center border border-four-cream/20"
                data-cursor="hover"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <p className="text-xs uppercase tracking-widest text-four-cream/40" suppressHydrationWarning>
            © {new Date().getFullYear()} {SITE.name}. All bites reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
