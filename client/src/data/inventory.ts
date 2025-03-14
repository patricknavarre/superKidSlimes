export interface SlimeProduct {
  _id?: string;  // MongoDB ID
  id: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  images: string[];
  category: SlimeCategory;
  tags: string[];
  inStock: boolean;
  stockQuantity: number;
  isActive: boolean;
  features: string[];
  texture: string;
  scent: string;
  size: string;
  ingredients?: string[];
  careInstructions?: string[];
  createdAt: string;
  updatedAt: string;
}

export type SlimeCategory = 'butter' | 'cloud' | 'clear' | 'glossy' | 'crunchy' | 'foam' | 'jelly' | 'special';

export const inventory: SlimeProduct[] = [
  {
    id: "unicorn-cloud-01",
    name: "Unicorn Cloud Dreams",
    price: 14.99,
    description: "Experience the magic of our signature cloud slime! This enchanting creation combines pastel swirls with a light, airy texture that feels like touching a real cloud. Infused with a sweet cotton candy scent and decorated with holographic glitters, this slime brings dreams to life in your hands.",
    shortDescription: "Magical cloud slime with cotton candy scent",
    images: [
      "/images/slimes/unicorn-cloud-1.jpg",
      "/images/slimes/unicorn-cloud-2.jpg"
    ],
    category: "cloud",
    tags: ["bestseller", "scented", "glitter", "stretchy"],
    inStock: true,
    stockQuantity: 50,
    isActive: true,
    features: [
      "Ultra soft and fluffy texture",
      "Cotton candy scented",
      "Holographic glitters",
      "Never sticky",
      "Long-lasting formula"
    ],
    texture: "Cloud-like and airy",
    scent: "Cotton Candy",
    size: "6 oz",
    ingredients: [
      "White glue",
      "Borax activator",
      "Instant snow",
      "Fragrance",
      "Non-toxic colorants",
      "Eco-friendly glitter"
    ],
    careInstructions: [
      "Store in an airtight container",
      "Keep away from direct sunlight",
      "If becomes sticky, add a drop of activator",
      "Wash hands before and after play"
    ],
    createdAt: "2024-02-20T00:00:00Z",
    updatedAt: "2024-02-20T00:00:00Z"
  },
  {
    id: "butter-rainbow-01",
    name: "Rainbow Butter Blast",
    price: 12.99,
    description: "Get ready for the most satisfying butter slime experience! Our Rainbow Butter Blast features a thick, creamy texture that's incredibly spreadable and moldable. Each container is a vibrant rainbow swirl that's as beautiful as it is fun to play with. The smooth, buttery texture provides endless hours of relaxing slime play.",
    shortDescription: "Thick and creamy rainbow butter slime",
    images: [
      "/images/slimes/rainbow-butter-1.jpg",
      "/images/slimes/rainbow-butter-2.jpg"
    ],
    category: "butter",
    tags: ["popular", "butter", "rainbow", "thick"],
    inStock: true,
    stockQuantity: 35,
    isActive: true,
    features: [
      "Super thick and creamy",
      "Rainbow swirl design",
      "Spreadable texture",
      "Never sticky",
      "Perfect for stress relief"
    ],
    texture: "Thick and buttery",
    scent: "Vanilla",
    size: "6 oz",
    ingredients: [
      "White glue",
      "Borax activator",
      "Clay softener",
      "Non-toxic colorants",
      "Lotion",
      "Clay"
    ],
    careInstructions: [
      "Store in an airtight container",
      "Keep away from heat",
      "Add lotion if becomes stiff",
      "Wash hands before and after play"
    ],
    createdAt: "2024-02-20T00:00:00Z",
    updatedAt: "2024-02-20T00:00:00Z"
  },
  {
    id: "crystal-clear-01",
    name: "Crystal Clear Sparkle",
    price: 13.99,
    description: "Dive into pure transparency with our Crystal Clear Sparkle slime! This crystal-clear creation features delicate rainbow sparkles that catch the light beautifully. Perfect for those who love watching bubbles pop through clear slime, this formula maintains its clarity while providing that satisfying stretch and poke factor.",
    shortDescription: "Crystal clear slime with rainbow sparkles",
    images: [
      "/images/slimes/crystal-clear-1.jpg",
      "/images/slimes/crystal-clear-2.jpg"
    ],
    category: "clear",
    tags: ["clear", "glitter", "stretchy", "popular"],
    inStock: true,
    stockQuantity: 25,
    isActive: true,
    features: [
      "Crystal clear base",
      "Rainbow sparkle inclusions",
      "Super stretchy",
      "Bubble making",
      "Non-sticky formula"
    ],
    texture: "Clear and stretchy",
    scent: "Unscented",
    size: "6 oz",
    ingredients: [
      "Clear glue",
      "Borax activator",
      "Rainbow glitter",
      "Mineral oil"
    ],
    careInstructions: [
      "Store in an airtight container",
      "Keep away from direct sunlight",
      "Avoid exposure to heat",
      "Wash hands before and after play"
    ],
    createdAt: "2024-02-20T00:00:00Z",
    updatedAt: "2024-02-20T00:00:00Z"
  }
];

// Helper functions for inventory management
export const getProductById = (id: string): SlimeProduct | undefined => {
  return inventory.find(product => product.id === id);
};

export const getActiveProducts = (): SlimeProduct[] => {
  return inventory.filter(product => product.isActive);
};

export const getInStockProducts = (): SlimeProduct[] => {
  return inventory.filter(product => product.inStock && product.stockQuantity > 0);
};

export const getProductsByCategory = (category: SlimeCategory): SlimeProduct[] => {
  return inventory.filter(product => product.category === category);
};

export const getProductsByTag = (tag: string): SlimeProduct[] => {
  return inventory.filter(product => product.tags.includes(tag));
}; 