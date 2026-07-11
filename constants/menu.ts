import type {
  FaqItem,
  GalleryTile,
  MenuCategory,
  OrderStep,
  SignatureItem,
  Testimonial,
  TrailStop,
} from "@/types";

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "smash-burgers",
    label: "Smash Burgers",
    icon: "burger",
    subtitle: "Beef Smash Burgers (110g)",
    layout: "list",
    items: [
      { name: "Classic New York", description: "Smash patty, cheese, pickles, FOUR sauce", price: 699 },
      { name: "Double Trouble", description: "Two smash patties, double cheese, secret sauce", price: 949 },
      { name: "Spicy Inferno", description: "Jalapeños, pepper jack, chipotle mayo", price: 849 },
      { name: "Malai Boti Crown", description: "Creamy malai boti, cheddar, onion crunch", price: 899 },
    ],
  },
  {
    id: "chicken",
    label: "Chicken Burgers",
    icon: "burger",
    subtitle: "Crispy & Grilled",
    layout: "list",
    items: [
      { name: "Crispy Classic", price: 649 },
      { name: "Zinger Punch", price: 749 },
      { name: "BBQ Smokehouse", price: 799 },
      { name: "Garlic Parmesan", price: 829 },
    ],
  },
  {
    id: "pizzas",
    label: "Pizzas",
    icon: "pizza",
    layout: "sized",
    items: [
      { name: "Tandoori Tikka", prices: { S: 799, M: 1199, L: 1599 } },
      { name: "Malai Boti Crown", prices: { S: 849, M: 1249, L: 1649 } },
      { name: "BBQ Pepperoni", prices: { S: 899, M: 1299, L: 1699 } },
      { name: "Four Cheese Melt", prices: { S: 849, M: 1249, L: 1599 } },
      { name: "Fiery Fajita", prices: { S: 879, M: 1279, L: 1679 } },
      { name: "Classic Margherita", prices: { S: 699, M: 999, L: 1399 } },
    ],
  },
  {
    id: "wings",
    label: "Wings",
    icon: "wings",
    layout: "list",
    items: [
      { name: "Buffalo Heat (6pc)", price: 599 },
      { name: "Honey Garlic (6pc)", price: 649 },
      { name: "Peri Peri (6pc)", price: 649 },
      { name: "BBQ Glaze (6pc)", price: 629 },
    ],
  },
  {
    id: "wraps",
    label: "Wraps",
    icon: "wrap",
    layout: "list",
    items: [
      { name: "Chicken Tikka Wrap", price: 549 },
      { name: "Zinger Wrap", price: 579 },
      { name: "Veggie Crunch Wrap", price: 499 },
    ],
  },
  {
    id: "fries",
    label: "Fries",
    icon: "fries",
    layout: "list",
    items: [
      { name: "Classic Salted", price: 299 },
      { name: "Loaded Cheese Fries", price: 499 },
      { name: "Peri Peri Fries", price: 349 },
      { name: "Truffle Parmesan", price: 549 },
    ],
  },
  {
    id: "calzones",
    label: "Calzones",
    icon: "calzone",
    layout: "list",
    items: [
      { name: "Malai Boti Calzone", price: 799 },
      { name: "Garlic Bread", price: 349 },
    ],
  },
  {
    id: "shakes",
    label: "Shakes",
    icon: "shake",
    layout: "list",
    items: [
      { name: "Lotus Biscoff", price: 649 },
      { name: "Matilda Chocolate", price: 599 },
      { name: "Oreo Crush", price: 579 },
      { name: "Strawberry Cream", price: 549 },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    icon: "dessert",
    layout: "list",
    items: [
      { name: "Chocolate Lava Cake", description: "Warm molten center, vanilla scoop", price: 699 },
      { name: "Cookie Dough Bomb", description: "Baked cookie, chocolate chips, cream", price: 549 },
      { name: "Brownie Sundae", description: "Fudge brownie, ice cream, sauce", price: 599 },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    icon: "drink",
    layout: "list",
    items: [
      { name: "Coca-Cola / Sprite / Fanta", price: 149 },
      { name: "Fresh Lemonade", price: 249 },
      { name: "Mint Mojito", price: 299 },
      { name: "Iced Tea", price: 229 },
    ],
  },
  {
    id: "fizz",
    label: "Fizz Chillers",
    icon: "fizz",
    layout: "list",
    items: [
      { name: "Mango Spark", price: 349 },
      { name: "Berry Blast", price: 349 },
      { name: "Passion Punch", price: 379 },
    ],
  },
];

export const SIGNATURE_ITEMS: SignatureItem[] = [
  {
    id: "classic-ny",
    name: "Classic New York",
    description:
      "Thin smash patty, American cheese, pickles, and house sauce on a toasted bun. The one most people order first.",
    ingredients: ["110g smash beef", "American cheese", "Pickles", "FOUR sauce", "Toasted bun"],
    price: 699,
    image: "/images/products/burger.png",
    badge: "Popular",
    category: "Smash Burgers",
  },
  {
    id: "malai-pizza",
    name: "Malai Boti Crown",
    description:
      "Creamy malai boti over mozzarella with a herb finish. One of our most ordered pizzas.",
    ingredients: ["Malai boti", "Mozzarella", "Cream base", "Onion", "Fresh herbs"],
    price: 1249,
    image: "/images/products/pizza.png",
    category: "Pizzas",
  },
  {
    id: "double-trouble",
    name: "Double Trouble",
    description: "Two smash patties, double cheese, secret sauce. For when one patty is not enough.",
    ingredients: ["2× smash patties", "Double cheese", "Secret sauce", "Onion", "Pickles"],
    price: 949,
    image: "/images/products/burger-double.png",
    badge: "New",
    category: "Smash Burgers",
  },
  {
    id: "loaded-fries",
    name: "Loaded Cheese Fries",
    description: "Crispy fries with cheese sauce, jalapeños, and crispy onion. Works as a side or a meal.",
    ingredients: ["Hand-cut fries", "Cheese sauce", "Jalapeños", "Crispy onion", "Herbs"],
    price: 499,
    image: "/images/products/fries.png",
    category: "Fries",
  },
  {
    id: "lotus-shake",
    name: "Lotus Biscoff Shake",
    description: "Thick vanilla shake blended with crushed Biscoff and caramel.",
    ingredients: ["Vanilla ice cream", "Biscoff", "Whipped cream", "Caramel drizzle"],
    price: 649,
    image: "/images/products/shake.png",
    category: "Shakes",
  },
  {
    id: "peri-wings",
    name: "Peri Peri Wings",
    description: "Crispy wings tossed in peri peri glaze. Six pieces, served hot.",
    ingredients: ["Chicken wings", "Peri peri glaze", "Garlic", "Chili", "Lime"],
    price: 649,
    image: "/images/products/wings.png",
    category: "Wings",
  },
];

export const GALLERY_TILES: GalleryTile[] = [
  { id: "g1", src: "/images/gallery/g1.jpg", alt: "Smash burger close-up", caption: "Classic smash", tall: true },
  { id: "g2", src: "/images/gallery/g2.jpg", alt: "Hands holding wraps" },
  { id: "g3", src: "/images/gallery/g3.jpg", alt: "Loaded fries tray", caption: "Loaded fries" },
  { id: "g4", src: "/images/gallery/g4.jpg", alt: "Friends sharing sliders", tall: true },
  { id: "g5", src: "/images/gallery/g5.jpg", alt: "Pizza pull shot", caption: "Malai boti crown" },
  { id: "g6", src: "/images/gallery/g6.jpg", alt: "Shake lineup", caption: "Shakes & desserts" },
  { id: "g7", src: "/images/gallery/g7.jpg", alt: "Wings and dips" },
  { id: "g8", src: "/images/gallery/g8.jpg", alt: "Burger stack", caption: "From the grill", tall: true },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: "t1", name: "Ayesha K.", quote: "The smash burger is properly done — crispy edges, good sauce. I keep coming back.", rating: 5 },
  { id: "t2", name: "Hassan R.", quote: "Pizza was fresh and the malai boti topping actually had flavour. Quick service too.", rating: 5 },
  { id: "t3", name: "Sara M.", quote: "Lotus shake is rich without being too sweet. Good portion size.", rating: 5 },
  { id: "t4", name: "Bilal A.", quote: "Ordered late on a Friday. Food arrived hot and the wings were still crispy.", rating: 4 },
  { id: "t5", name: "Fatima Z.", quote: "Clean place, friendly staff, and the loaded fries are worth the trip alone.", rating: 5 },
  { id: "t6", name: "Omar S.", quote: "Solid menu for a casual spot. The double trouble burger fills you up properly.", rating: 5 },
];

export const ORDER_STEPS: OrderStep[] = [
  { id: 1, title: "Pick your order", description: "Browse the menu and choose what you want.", icon: "pick" },
  { id: 2, title: "Add your extras", description: "Toppings, spice level, sides — build it your way.", icon: "customize" },
  { id: 3, title: "We cook it fresh", description: "Nothing sits under a heat lamp. It goes straight from the grill.", icon: "fire" },
  { id: 4, title: "Pick up or delivery", description: "Collect in-store or get it sent to your door.", icon: "deliver" },
];

export const FAQS: FaqItem[] = [
  {
    question: "Do you deliver?",
    answer: "Yes — delivery is available in our service areas. Call the store or order through our delivery partners.",
  },
  {
    question: "Are prices inclusive of tax?",
    answer: "Menu prices are exclusive of taxes. Your final total is confirmed at checkout.",
  },
  {
    question: "Can I customize my burger?",
    answer: "Yes. Add toppings, swap sauces, or make it a meal — tell us when you order.",
  },
  {
    question: "Do you have vegetarian options?",
    answer: "Yes — Margherita pizza, veggie wrap, fries, shakes, and desserts. Ask the team for today's veg options.",
  },
  {
    question: "Where are you located?",
    answer: "We're in Lahore. See the Contact section for hours, map, and @fourpakistan_ on Instagram.",
  },
];

export const PRODUCT_TRAIL: TrailStop[] = [
  {
    section: "#hero",
    image: "/images/products/burger.png",
    side: "right",
    presentation: "hero",
  },
  {
    section: "#about",
    image: "/images/products/burger.png",
    side: "left",
    presentation: "photo",
  },
  {
    section: "#signature",
    image: "/images/products/burger.png",
    side: "right",
    presentation: "dock",
  },
];

export const INSTAGRAM_POSTS = [
  { id: "ig1", src: "/images/gallery/g1.jpg", caption: "Classic smash" },
  { id: "ig2", src: "/images/gallery/g2.jpg", caption: "Wrap night" },
  { id: "ig3", src: "/images/gallery/g3.jpg", caption: "Loaded fries" },
  { id: "ig4", src: "/images/gallery/g4.jpg", caption: "Table spread" },
  { id: "ig5", src: "/images/gallery/g5.jpg", caption: "Cheese pull" },
  { id: "ig6", src: "/images/gallery/g6.jpg", caption: "Shake lineup" },
];
