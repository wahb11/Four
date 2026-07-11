# FOUR — Smash Burgers & Street Food

Premium, motion-heavy marketing site for **FOUR** (Lahore street-food brand).

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4
- GSAP + ScrollTrigger + MotionPathPlugin · Lenis · Framer Motion
- Embla Carousel · React Three Fiber (optional hero accent)
- React Hook Form + Zod

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Highlights

- **ProductTrail** — SVG zigzag path product cutouts scrubbed to scroll
- **Lenis** wired into `gsap.ticker` with `ScrollTrigger.update`
- Brand palette: Signature Red `#9E2A2A` · Cream `#F1E5D6` · Ink `#151515`
- Display type: Anton · Body: Poppins
- Loader, custom cursor, comic badges, Embla signature carousel, FAQ, contact form

## Structure

```
app/           # routes, SEO (metadata, robots, sitemap, JSON-LD)
components/    # UI + motion primitives
sections/      # page sections
hooks/         # useLenis, useGsapReveal, useProductTrail
constants/     # menu + site copy
public/images/ # product + gallery SVG assets
```
