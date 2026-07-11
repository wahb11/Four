"use client";

import { Play } from "lucide-react";
import { INSTAGRAM_POSTS } from "@/constants/menu";
import { SITE } from "@/constants/site";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { AnimatedButton } from "@/components/AnimatedButton";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { InstagramIcon } from "@/components/SocialIcons";

export function Instagram() {
  return (
    <section id="instagram" className="panel relative overflow-hidden bg-four-red py-16 sm:py-20 md:py-32">
      <div className="halftone absolute inset-0 opacity-30" />
      <div className="section-content relative mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="late-section-intro mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <SectionEyebrow className="text-four-cream/70">Instagram</SectionEyebrow>
            <AnimatedHeading className="text-[clamp(2rem,8vw,4.5rem)] tracking-tighter text-four-cream md:text-7xl">
              {SITE.handle}
            </AnimatedHeading>
          </div>
          <AnimatedButton asChild variant="cream" className="ig-follow-btn w-full sm:w-auto">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="h-4 w-4" /> Follow
            </a>
          </AnimatedButton>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="ig-tile group relative aspect-square overflow-hidden border-2 border-four-cream/20 active:scale-[0.98] transition-transform"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.src}
                alt={post.caption}
                className="h-full w-full object-cover transition-transform duration-500 md:group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-four-ink/80 to-transparent p-2 sm:p-3 md:inset-0 md:flex md:flex-col md:items-center md:justify-center md:bg-four-ink/0 md:opacity-0 md:transition-all md:duration-300 md:group-hover:bg-four-ink/70 md:group-hover:opacity-100">
                <Play className="mb-0 hidden h-8 w-8 text-four-cream md:mb-2 md:block" fill="currentColor" />
                <p className="font-display text-xs tracking-tight text-four-cream sm:text-base md:px-4 md:text-center md:text-lg">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
