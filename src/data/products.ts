export interface Product {
  id: number;
  name: string;
  category: "drinks" | "desserts";
  description: string;
  price: string;
  image: string;
  isPopular?: boolean;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Matchaman Signature Latte",
    category: "drinks",
    description: "Ceremonial Uji matcha whisked and layered over organic, grass-fed milk with a touch of raw clover honey.",
    price: "$6.50",
    image: "/images/product_signature_latte.png",
    isPopular: true,
  },
  {
    id: 2,
    name: "Strawberry Matcha Cloud",
    category: "drinks",
    description: "Organic strawberry puree, cold milk, layered with ceremonial matcha and topped with sea-salted sweet cream foam.",
    price: "$7.25",
    isNew: true,
    image: "/images/product_strawberry_cloud.png",
  },
  {
    id: 3,
    name: "Matcha Coconut Fusion",
    category: "drinks",
    description: "Cold-pressed coconut water infused with electrolytes and finished with a float of cold-whisked matcha shot.",
    price: "$6.75",
    image: "/images/product_coconut_fusion.png",
  },
  {
    id: 4,
    name: "Hojicha Cream Latte",
    category: "drinks",
    description: "Deeply roasted green tea (hojicha) with smoky, chocolatey undertones, served warm with oat milk microfoam.",
    price: "$6.25",
    image: "/images/product_hojicha_latte.png",
  },
  {
    id: 5,
    name: "Matcha Double-Layer Cheesecake",
    category: "desserts",
    description: "Velvety layer of chilled matcha mousse stacked on rich baked matcha cream cheese, dusted with ceremonial powder.",
    price: "$8.50",
    image: "/images/product_cheesecake.png",
    isPopular: true,
  },
  {
    id: 6,
    name: "Matcha Waffle Soft Serve",
    category: "desserts",
    description: "Creamy ceremonial matcha soft serve swirled in our signature house-baked activated charcoal waffle cone.",
    price: "$5.75",
    image: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&q=80&w=800",
    isNew: true,
  },
];
