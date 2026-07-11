"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, MapPin, Phone } from "lucide-react";
import { SITE } from "@/constants/site";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { AnimatedButton } from "@/components/AnimatedButton";
import { InstagramIcon } from "@/components/SocialIcons";

const schema = z.object({
  name: z.string().min(2, "Name please"),
  phone: z.string().min(10, "Valid phone needed"),
  message: z.string().min(5, "Say something"),
});

type FormData = z.infer<typeof schema>;

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset();
  };

  return (
    <section id="contact" className="panel relative overflow-hidden bg-four-red py-20 sm:py-24 md:py-32">
      <div className="halftone absolute inset-0 opacity-30" />
      <div className="section-content relative mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <AnimatedHeading className="contact-hero-title mb-3 text-center text-[clamp(2.5rem,12vw,5rem)] tracking-tighter text-four-cream sm:mb-4 sm:text-6xl md:text-8xl">
          COME HUNGRY
        </AnimatedHeading>
        <p className="contact-subline mx-auto mb-12 max-w-md text-center text-sm text-four-cream/70 sm:mb-16 sm:text-base">
          Store timings, the map, and a line straight to the kitchen.
        </p>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6 text-four-cream sm:space-y-8">
            <div className="contact-info-block flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0" />
              <div>
                <p className="font-display text-xl tracking-tight sm:text-2xl">Find Us</p>
                <p className="mt-1 text-sm text-four-cream/70 sm:text-base">{SITE.address}</p>
              </div>
            </div>
            <div className="contact-info-block flex gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0" />
              <div>
                <p className="font-display text-xl tracking-tight sm:text-2xl">Call</p>
                <a href={`tel:${SITE.phone}`} className="mt-1 block text-sm text-four-cream/70 active:text-four-cream sm:text-base">
                  {SITE.phone}
                </a>
              </div>
            </div>
            <div className="contact-info-block flex gap-4">
              <InstagramIcon className="mt-1 h-5 w-5 shrink-0" />
              <div>
                <p className="font-display text-xl tracking-tight sm:text-2xl">Social</p>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-sm text-four-cream/70 active:text-four-cream sm:text-base"
                >
                  {SITE.handle}
                </a>
              </div>
            </div>
            <div className="contact-info-block flex gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0" />
              <div>
                <p className="font-display text-xl tracking-tight sm:text-2xl">Hours</p>
                <ul className="mt-1 space-y-1 text-sm text-four-cream/70 sm:text-base">
                  {SITE.hours.map((h) => (
                    <li key={h.day}>
                      {h.day}: {h.time}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="contact-map aspect-video overflow-hidden border-2 border-four-cream/30 bg-four-ink/20">
              <iframe
                title="FOUR location map"
                src="https://maps.google.com/maps?q=Lahore%20Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="h-full w-full grayscale contrast-125"
                loading="lazy"
              />
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="contact-form border-2 border-four-cream/30 bg-four-cream p-5 sm:p-6 md:p-8"
          >
            <h3 className="font-display text-2xl tracking-tighter text-four-ink sm:text-3xl">Drop a line</h3>
            <div className="mt-5 space-y-4 sm:mt-6">
              <div className="contact-field">
                <label htmlFor="name" className="mb-1 block text-xs font-bold uppercase tracking-widest text-four-ink/50">
                  Name
                </label>
                <input
                  id="name"
                  {...register("name")}
                  className="w-full border-2 border-four-ink/20 bg-four-warm px-4 py-3 text-four-ink outline-none transition focus:border-four-red focus:shadow-[0_0_0_3px_rgba(158,42,42,0.25)]"
                />
                {errors.name && <p className="mt-1 text-xs text-four-red">{errors.name.message}</p>}
              </div>
              <div className="contact-field">
                <label htmlFor="phone" className="mb-1 block text-xs font-bold uppercase tracking-widest text-four-ink/50">
                  Phone
                </label>
                <input
                  id="phone"
                  {...register("phone")}
                  className="w-full border-2 border-four-ink/20 bg-four-warm px-4 py-3 text-four-ink outline-none transition focus:border-four-red focus:shadow-[0_0_0_3px_rgba(158,42,42,0.25)]"
                />
                {errors.phone && <p className="mt-1 text-xs text-four-red">{errors.phone.message}</p>}
              </div>
              <div className="contact-field">
                <label htmlFor="message" className="mb-1 block text-xs font-bold uppercase tracking-widest text-four-ink/50">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message")}
                  className="w-full resize-none border-2 border-four-ink/20 bg-four-warm px-4 py-3 text-four-ink outline-none transition focus:border-four-red focus:shadow-[0_0_0_3px_rgba(158,42,42,0.25)]"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-four-red">{errors.message.message}</p>
                )}
              </div>
              <AnimatedButton type="submit" className="w-full">
                Send It
              </AnimatedButton>
              {isSubmitSuccessful && (
                <p className="text-center text-sm font-bold text-four-red">Got it. We&apos;ll hit you back.</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
