export const SITE = {
  name: "FOUR",
  tagline: "FOUR BITES. ZERO REGRETS.",
  handle: "@fourpakistan_",
  instagram: "https://www.instagram.com/fourpakistan_/",
  phone: "+92 300 0000000",
  email: "hello@four.pk",
  address: "Lahore, Pakistan",
  /** Set to true after adding logo files to public/ */
  useLogoImage: false,
  logoMark: "/logo-mark.svg",
  logoFull: "/logo.svg",
  hours: [
    { day: "Mon – Thu", time: "12:00 PM – 12:00 AM" },
    { day: "Fri – Sun", time: "12:00 PM – 1:00 AM" },
  ],
  url: "https://four.pk",
} as const;

export const NAV_LINKS = [
  { href: "#menu", label: "Menu" },
  { href: "#signature", label: "Hits" },
  { href: "#gallery", label: "Gallery" },
  { href: "#order", label: "Order" },
  { href: "#contact", label: "Contact" },
] as const;

export const COLORS = {
  red: "#9E2A2A",
  deepRed: "#7A1F1F",
  cream: "#F1E5D6",
  warmWhite: "#FBF6EE",
  ink: "#151515",
  gold: "#C9A15A",
} as const;
