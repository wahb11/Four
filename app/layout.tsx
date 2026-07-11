import type { Metadata } from "next";
import { Anton, Poppins } from "next/font/google";
import "./globals.css";
import { SITE } from "@/constants/site";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "FOUR — Smash Burgers & Street Food | Lahore",
    template: "%s | FOUR",
  },
  description:
    "FOUR BITES. ZERO REGRETS. Lahore's boldest smash burgers, crown pizzas, wings, shakes & desserts. Come hungry.",
  keywords: [
    "FOUR",
    "smash burger",
    "Lahore",
    "street food",
    "pizza",
    "fourpakistan",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE.url,
    siteName: SITE.name,
    title: "FOUR — Smash Burgers & Street Food",
    description: SITE.tagline,
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "FOUR" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FOUR — Smash Burgers & Street Food",
    description: SITE.tagline,
    images: ["/og.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE.url,
  },
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: SITE.name,
  description: SITE.tagline,
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  servesCuisine: ["Burgers", "Pizza", "Street Food"],
  priceRange: "$$",
  sameAs: [SITE.instagram],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <div id="app-root" suppressHydrationWarning>
          {children}
        </div>
      </body>
    </html>
  );
}
