// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  category: Category;
  images: string[];
  inStock: boolean;
  featured: boolean;
  specifications: Specifications;
  tags: string[];
}

export type Category = 'seating' | 'tables' | 'storage' | 'lighting' | 'decor';

export interface Specifications {
  dimensions: string;
  material: string;
  color: string;
  weight?: string;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

// Filter Types
export interface ProductFilters {
  category?: Category;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'name' | 'newest';
}
