import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Arne Lounge Chair",
    slug: "arne-lounge-chair",
    description:
      "A timeless lounge chair featuring a curved oak frame and premium leather upholstery. Perfect for creating a cozy reading nook.",
    longDescription: "The Arne Lounge Chair combines timeless Scandinavian design with exceptional comfort. Featuring a curved oak frame and premium full-grain leather upholstery, this chair is perfect for creating a cozy reading nook or adding a touch of elegance to any space. The ergonomic design ensures hours of comfortable sitting.",
    price: 1299,
    category: "seating",
    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"],
    inStock: true,
    featured: true,
    specifications: {
      dimensions: '32"W × 30"D × 28"H',
      material: "Oak frame, full-grain leather",
      color: "Cognac brown",
      weight: "45 lbs",
    },
    tags: ["chair", "lounge", "leather", "oak"],
  },
  {
    id: "2",
    name: "Linear Dining Table",
    slug: "linear-dining-table",
    description:
      "Solid walnut dining table with clean lines and subtle grain patterns. Seats 6-8 comfortably.",
    longDescription: "The Linear Dining Table showcases exceptional craftsmanship in solid walnut, featuring clean lines and beautiful natural grain patterns. Built to last generations, this table comfortably seats 6-8 guests, making it perfect for family dinners and entertaining. The substantial construction and timeless design ensure it will be the centerpiece of your dining room for years to come.",
    price: 1899,
    category: "tables",
    images: ["https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80"],
    inStock: true,
    featured: true,
    specifications: {
      dimensions: '84"L × 42"W × 30"H',
      material: "Solid walnut",
      color: "Natural walnut",
      weight: "180 lbs",
    },
    tags: ["table", "dining", "walnut", "solid wood"],
  },
  {
    id: "3",
    name: "Cloud Ottoman",
    slug: "cloud-ottoman",
    description:
      "Plush, oversized ottoman with bouclé upholstery. Functions as extra seating or a statement coffee table.",
    longDescription: "The Cloud Ottoman lives up to its name with incredibly plush bouclé upholstery that feels like sitting on a cloud. This versatile piece functions beautifully as extra seating, a footrest, or even a statement coffee table when paired with a tray. The oversized design and modern aesthetic make it a standout addition to contemporary living spaces.",
    price: 899,
    category: "seating",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"],
    inStock: true,
    featured: true,
    specifications: {
      dimensions: '36"W × 36"D × 16"H',
      material: "Bouclé fabric, foam fill",
      color: "Cream",
      weight: "35 lbs",
    },
    tags: ["ottoman", "seating", "boucle", "modern"],
  },
  {
    id: "4",
    name: "Orb Pendant Light",
    slug: "orb-pendant-light",
    description:
      "Hand-blown glass pendant with brass hardware. Creates ambient lighting perfect for dining areas.",
    longDescription: "Each Orb Pendant Light is individually hand-blown by skilled artisans, resulting in unique variations that add character to every piece. The smoke glass diffuses light beautifully, creating warm ambient lighting perfect for dining areas. Paired with solid brass hardware, this pendant combines artisanal craftsmanship with timeless materials.",
    price: 449,
    category: "lighting",
    images: ["https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80"],
    inStock: true,
    featured: true,
    specifications: {
      dimensions: '12"Ø × 14"H',
      material: "Hand-blown glass, brass",
      color: "Smoke glass, brass",
      weight: "8 lbs",
    },
    tags: ["pendant", "lighting", "glass", "brass"],
  },
  {
    id: "5",
    name: "Frame Storage Cabinet",
    slug: "frame-storage-cabinet",
    description:
      "Minimalist cabinet with caned doors and internal shelving. Ideal for concealed storage in living spaces.",
    longDescription: "The Frame Storage Cabinet combines minimalist design with functional storage solutions. Hand-woven rattan cane doors add texture and visual interest while concealing adjustable internal shelving. Crafted from solid oak, this cabinet is perfect for storing everything from dinnerware to media equipment while maintaining a clean, uncluttered aesthetic in your living space.",
    price: 1599,
    category: "storage",
    images: ["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80"],
    inStock: true,
    featured: true,
    specifications: {
      dimensions: '48"W × 18"D × 32"H',
      material: "Oak, rattan cane",
      color: "Natural oak",
      weight: "95 lbs",
    },
    tags: ["cabinet", "storage", "cane", "oak"],
  },
  {
    id: "6",
    name: "Slope Armchair",
    slug: "slope-armchair",
    description:
      "Contemporary armchair with angled backrest and tapered legs. Upholstered in soft performance fabric.",
    longDescription: "The Slope Armchair features a distinctive angled backrest that provides optimal lumbar support while creating a striking silhouette. Upholstered in high-performance fabric that resists stains and wear, this chair is as practical as it is beautiful. The tapered hardwood legs add a mid-century modern touch, making it perfect for contemporary interiors.",
    price: 1099,
    category: "seating",
    images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80"],
    inStock: true,
    featured: false,
    specifications: {
      dimensions: '28"W × 32"D × 30"H',
      material: "Hardwood frame, performance fabric",
      color: "Charcoal gray",
      weight: "38 lbs",
    },
    tags: ["chair", "armchair", "modern", "fabric"],
  },
  {
    id: "7",
    name: "Pivot Coffee Table",
    slug: "pivot-coffee-table",
    description:
      "Round marble coffee table with brass base. A sculptural centerpiece for modern living rooms.",
    longDescription: "The Pivot Coffee Table is a true statement piece, featuring a solid white marble top supported by an architectural brass base. Each table showcases unique natural veining in the marble, ensuring no two pieces are exactly alike. The combination of luxurious materials and sculptural design makes this table a stunning centerpiece for sophisticated living rooms.",
    price: 1299,
    category: "tables",
    images: ["https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=800&q=80"],
    inStock: true,
    featured: false,
    specifications: {
      dimensions: '36"Ø × 16"H',
      material: "White marble, brass",
      color: "White marble, brass",
      weight: "85 lbs",
    },
    tags: ["coffee table", "marble", "brass", "round"],
  },
  {
    id: "8",
    name: "Linear Pendant Light",
    slug: "linear-pendant-light",
    description:
      "Elongated pendant with adjustable height. Perfect for kitchen islands and dining tables.",
    longDescription: "The Linear Pendant Light combines modern industrial design with practical functionality. Its elongated form provides even illumination across kitchen islands and dining tables, while the adjustable height allows you to customize the lighting to your space. The matte black powder-coated finish adds contemporary edge to any interior.",
    price: 649,
    category: "lighting",
    images: ["https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&q=80"],
    inStock: true,
    featured: true,
    specifications: {
      dimensions: '48"L × 4"W × 8"H',
      material: "Powder-coated steel",
      color: "Matte black",
      weight: "12 lbs",
    },
    tags: ["pendant", "linear", "modern", "kitchen"],
  },
  {
    id: "9",
    name: "Arch Floor Lamp",
    slug: "arch-floor-lamp",
    description:
      "Classic arched floor lamp with marble base. Adjustable height and reach for flexible lighting.",
    longDescription: "The Arch Floor Lamp is an iconic design that never goes out of style. Featuring a heavy black marble base for stability and a gracefully arching brushed steel arm, this lamp can reach over seating areas to provide perfect reading light. The adjustable height and reach make it incredibly versatile for various room configurations.",
    price: 799,
    category: "lighting",
    images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80"],
    inStock: true,
    featured: false,
    specifications: {
      dimensions: '72"H × 60"W reach',
      material: "Brushed steel, marble",
      color: "Brushed steel, black marble",
      weight: "35 lbs",
    },
    tags: ["floor lamp", "arc lamp", "marble", "adjustable"],
  },
  {
    id: "10",
    name: "Ladder Shelf",
    slug: "ladder-shelf",
    description:
      "Leaning ladder-style shelving unit in solid oak. Open design perfect for displaying books and objects.",
    longDescription: "The Ladder Shelf brings casual elegance to any space with its leaning design and solid oak construction. The open shelving provides ample room for displaying books, plants, and decorative objects, while the ladder-style silhouette keeps the look light and airy. Perfect for small spaces where traditional bookcases might feel too heavy.",
    price: 699,
    category: "storage",
    images: ["https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&q=80"],
    inStock: true,
    featured: false,
    specifications: {
      dimensions: '30"W × 18"D × 72"H',
      material: "Solid oak",
      color: "Natural oak",
      weight: "45 lbs",
    },
    tags: ["shelf", "ladder shelf", "oak", "display"],
  },
  {
    id: "11",
    name: "Minimal Desk",
    slug: "minimal-desk",
    description:
      "Clean-lined writing desk with integrated storage drawer. Perfect for home offices and studios.",
    longDescription: "The Minimal Desk exemplifies form meeting function with its clean-lined design and practical storage solutions. The integrated drawer keeps supplies organized and out of sight, while the walnut veneer top and powder-coated steel legs create a sophisticated aesthetic. Perfectly sized for home offices and creative studios without overwhelming the space.",
    price: 899,
    category: "tables",
    images: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80"],
    inStock: true,
    featured: true,
    specifications: {
      dimensions: '54"W × 24"D × 30"H',
      material: "Walnut veneer, steel legs",
      color: "Walnut, black",
      weight: "65 lbs",
    },
    tags: ["desk", "office", "walnut", "minimal"],
  },
  {
    id: "12",
    name: "Modular Sofa",
    slug: "modular-sofa",
    description:
      "Customizable sectional sofa with deep seats and performance fabric. Rearrange to fit your space.",
    longDescription: "The Modular Sofa adapts to your lifestyle with customizable configurations that can be rearranged as your needs change. Featuring deep seats for maximum comfort and upholstered in stain-resistant performance fabric, this sectional is built for real life. The solid hardwood frame ensures durability, while the modern silhouette keeps your space looking fresh and contemporary.",
    price: 3299,
    category: "seating",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"],
    inStock: true,
    featured: false,
    specifications: {
      dimensions: '96"W × 38"D × 30"H',
      material: "Hardwood frame, performance fabric",
      color: "Sand beige",
      weight: "180 lbs",
    },
    tags: ["sofa", "sectional", "modular", "performance fabric"],
  },
  {
    id: "13",
    name: "Console Table",
    slug: "console-table",
    description:
      "Slim console table with lower shelf. Ideal for entryways and behind sofas.",
    longDescription: "The Console Table maximizes functionality in narrow spaces with its slim profile and dual-level design. The top surface is perfect for lamps and decorative items, while the lower shelf provides additional storage or display space. Crafted from solid ash with beautiful grain patterns, this piece adds warmth and utility to entryways and behind sofas.",
    price: 799,
    category: "storage",
    images: ["https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80"],
    inStock: true,
    featured: false,
    specifications: {
      dimensions: '48"W × 14"D × 32"H',
      material: "Solid ash",
      color: "Natural ash",
      weight: "42 lbs",
    },
    tags: ["console", "entryway", "ash", "slim"],
  },
  {
    id: "14",
    name: "Side Table",
    slug: "side-table",
    description:
      "Compact side table with cylindrical design. Perfect next to sofas and beds.",
    longDescription: "The Side Table's cylindrical design offers a modern take on a classic furniture essential. Crafted from solid walnut with a rich dark finish, this compact table is perfectly sized for placement next to sofas and beds. Its clean geometric form and quality construction make it a versatile accent piece that works in any room.",
    price: 299,
    category: "tables",
    images: ["https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&q=80"],
    inStock: true,
    featured: false,
    specifications: {
      dimensions: '18"Ø × 22"H',
      material: "Solid walnut",
      color: "Dark walnut",
      weight: "18 lbs",
    },
    tags: ["side table", "accent table", "walnut", "round"],
  },
  {
    id: "15",
    name: "Table Lamp",
    slug: "table-lamp",
    description:
      "Modern table lamp with ceramic base and linen shade. Adds warm ambient lighting.",
    longDescription: "The Table Lamp combines modern simplicity with warm materials, featuring a hand-crafted white ceramic base and natural linen shade. The soft, diffused light creates a cozy ambiance perfect for bedside tables, reading nooks, or accent lighting. The timeless design ensures it will complement your décor for years to come.",
    price: 249,
    category: "lighting",
    images: ["https://images.unsplash.com/photo-1534105615926-0f5d1a128d15?w=800&q=80"],
    inStock: true,
    featured: false,
    specifications: {
      dimensions: '8"Ø × 22"H',
      material: "Ceramic, linen shade",
      color: "White ceramic, natural linen",
      weight: "6 lbs",
    },
    tags: ["table lamp", "ceramic", "linen", "bedside"],
  },
  {
    id: "16",
    name: "Ceramic Vase Set",
    slug: "ceramic-vase-set",
    description:
      "Set of three organic-shaped vases in varying heights. Hand-thrown stoneware with matte glaze.",
    longDescription: "This set of three hand-thrown vases showcases the beauty of artisanal craftsmanship. Each piece features organic, asymmetrical forms that celebrate the handmade process, finished with a sophisticated matte white glaze. The varying heights (6\", 9\", and 12\") allow for dynamic styling arrangements, whether displayed as a group or separately throughout your home.",
    price: 189,
    category: "decor",
    images: ["https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80"],
    inStock: true,
    featured: false,
    specifications: {
      dimensions: 'Small: 6"H, Medium: 9"H, Large: 12"H',
      material: "Stoneware",
      color: "Matte white",
      weight: "8 lbs total",
    },
    tags: ["vase", "ceramic", "decor", "set"],
  },
  {
    id: "17",
    name: "Throw Pillow Set",
    slug: "throw-pillow-set",
    description:
      "Pair of linen throw pillows with hidden zippers. Adds texture and comfort to any seating.",
    longDescription: "These throw pillows add instant comfort and style to any seating area. Made from 100% European linen with hidden zipper closures for a clean look, each pillow is filled with premium down for luxurious softness. The natural linen texture adds depth and warmth to sofas, chairs, and beds while maintaining a sophisticated, understated aesthetic.",
    price: 129,
    category: "decor",
    images: ["https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80"],
    inStock: true,
    featured: false,
    specifications: {
      dimensions: '20" × 20" each',
      material: "100% linen, down insert",
      color: "Natural linen",
      weight: "2 lbs",
    },
    tags: ["pillow", "linen", "decor", "throw pillow"],
  },
  {
    id: "18",
    name: "Wall Mirror",
    slug: "wall-mirror",
    description:
      "Round mirror with powder-coated steel frame. Makes spaces feel larger and brighter.",
    longDescription: "The Wall Mirror combines classic form with modern materials. The circular shape and matte black powder-coated steel frame create a bold statement while reflecting light to make rooms feel more spacious and bright. Perfect for entryways, bathrooms, or above consoles, this mirror adds both function and striking visual impact to any wall.",
    price: 349,
    category: "decor",
    images: ["https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80"],
    inStock: true,
    featured: false,
    specifications: {
      dimensions: '30"Ø × 1"D',
      material: "Steel frame, mirror glass",
      color: "Matte black",
      weight: "15 lbs",
    },
    tags: ["mirror", "wall mirror", "round", "steel"],
  },
  {
    id: "19",
    name: "Linen Throw Blanket",
    slug: "linen-throw-blanket",
    description:
      "Soft linen throw with subtle texture. Pre-washed for a lived-in feel.",
    longDescription: "The Linen Throw Blanket is crafted from 100% European linen and pre-washed to achieve a soft, lived-in texture from the first use. The subtle weave creates visual interest while providing cozy warmth. Drape it over sofas or the foot of your bed for an effortlessly casual yet refined look that embodies relaxed luxury.",
    price: 159,
    category: "decor",
    images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80"],
    inStock: true,
    featured: true,
    specifications: {
      dimensions: '50" × 70"',
      material: "100% European linen",
      color: "Oatmeal",
      weight: "2 lbs",
    },
    tags: ["throw", "blanket", "linen", "textile"],
  },
  {
    id: "20",
    name: "Wool Area Rug",
    slug: "wool-area-rug",
    description:
      "Hand-tufted wool rug with abstract pattern. Adds warmth and defines living spaces.",
    longDescription: "The Wool Area Rug is hand-tufted from 100% New Zealand wool, known for its exceptional softness and durability. The abstract pattern in ivory and charcoal tones adds sophisticated visual interest while remaining versatile enough to complement various design styles. This substantial 8'×10' rug anchors living spaces, adds warmth underfoot, and defines seating areas with timeless elegance.",
    price: 1499,
    category: "decor",
    images: ["https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80"],
    inStock: true,
    featured: true,
    specifications: {
      dimensions: "8' × 10'",
      material: "100% New Zealand wool",
      color: "Ivory and charcoal",
      weight: "48 lbs",
    },
    tags: ["rug", "wool", "area rug", "hand-tufted"],
  },
];

// Helper functions
export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getRelatedProducts = (
  productId: string,
  category: string,
  limit: number = 4
): Product[] => {
  return products
    .filter((product) => product.category === category && product.id !== productId)
    .slice(0, limit);
};
