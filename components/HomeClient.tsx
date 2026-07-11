"use client";

import { useCallback, useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { Loader } from "@/components/Loader";
import { CustomCursor } from "@/components/CustomCursor";
import { PageTransition } from "@/components/PageTransition";
import { ProductTrail } from "@/components/ProductTrail";
import { GlobalMotion } from "@/components/GlobalMotion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { MenuCategoryNav } from "@/sections/MenuCategoryNav";
import { MenuList } from "@/sections/MenuList";
import { SignatureItemsSlider } from "@/sections/SignatureItemsSlider";
import { GallerySlider } from "@/sections/GallerySlider";
import { Instagram } from "@/sections/Instagram";
import { Testimonials } from "@/sections/Testimonials";
import { OrderSteps } from "@/sections/OrderSteps";
import { FAQ } from "@/sections/FAQ";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

export function HomeClient() {
  const [ready, setReady] = useState(false);
  useLenis(ready);

  const onLoaderComplete = useCallback(() => setReady(true), []);

  return (
    <>
      <Loader onComplete={onLoaderComplete} />
      <CustomCursor />
      <PageTransition>
        <div className="relative" suppressHydrationWarning>
          <Navbar />
          <main className="relative" suppressHydrationWarning>
            {ready && <ProductTrail />}
            <GlobalMotion enabled={ready} />
            <Hero />
            <About />
            <SignatureItemsSlider />
            <MenuCategoryNav />
            <MenuList />
            <GallerySlider />
            <Instagram />
            <Testimonials />
            <OrderSteps />
            <FAQ />
            <Contact />
          </main>
          <Footer />
        </div>
      </PageTransition>
    </>
  );
}
