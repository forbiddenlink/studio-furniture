/**
 * Application-wide constants
 * Centralized location for magic numbers, strings, and configuration
 */

// ==================================
// BUSINESS CONSTANTS
// ==================================
export const BUSINESS = {
  NAME: 'STUDIO Furniture',
  TAGLINE: 'Minimalist Furniture & Home Essentials',
  EMAIL: 'hello@studiofurniture.com',
  PHONE: '+1 (555) 123-4567',
  ADDRESS: {
    STREET: '123 Design District',
    CITY: 'San Francisco',
    STATE: 'CA',
    ZIP: '94103',
    COUNTRY: 'USA',
  },
  SOCIAL: {
    TWITTER: '@studiofurniture',
    INSTAGRAM: '@studiofurniture',
    FACEBOOK: 'studiofurniture',
  },
} as const;

// ==================================
// SHIPPING & CART
// ==================================
export const SHIPPING = {
  FREE_SHIPPING_THRESHOLD: 500,
  STANDARD_SHIPPING_COST: 50,
  EXPRESS_SHIPPING_COST: 100,
  ESTIMATED_DELIVERY_DAYS: {
    STANDARD: '5-7',
    EXPRESS: '2-3',
  },
} as const;

export const CART = {
  MAX_QUANTITY_PER_ITEM: 10,
  MIN_QUANTITY_PER_ITEM: 1,
  STORAGE_KEY: 'studio-cart-storage',
} as const;

// ==================================
// PRODUCT FILTERS
// ==================================
export const PRICE_RANGE = {
  MIN: 0,
  MAX: 5000,
  STEP: 50,
} as const;

export const CATEGORIES = [
  { value: 'all', label: 'All Products' },
  { value: 'seating', label: 'Seating' },
  { value: 'tables', label: 'Tables' },
  { value: 'storage', label: 'Storage' },
  { value: 'lighting', label: 'Lighting' },
  { value: 'decor', label: 'Decor' },
] as const;

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A to Z' },
] as const;

// ==================================
// AI FEATURES
// ==================================
export const AI = {
  CHAT: {
    MAX_MESSAGE_LENGTH: 500,
    INITIAL_MESSAGE: "Hi! I'm your AI furniture consultant. I can help you find the perfect pieces for your space. What are you looking for today?",
    ERROR_MESSAGE: "Sorry, I'm having trouble responding right now.",
    TYPING_DELAY_MS: 100,
  },
  SEARCH: {
    MIN_QUERY_LENGTH: 3,
    MAX_RESULTS: 20,
    RELEVANCE_THRESHOLD: 0.5,
    SUGGESTIONS: [
      'modern chair under $1000',
      'walnut dining table for 6 people',
      'minimalist storage for small apartment',
      'ambient lighting for bedroom',
      'cozy seating for reading',
    ],
  },
  RECOMMENDATIONS: {
    DEFAULT_LIMIT: 4,
    MAX_LIMIT: 8,
  },
} as const;

// ==================================
// API CONFIGURATION
// ==================================
export const API = {
  TIMEOUT_MS: 30000,
  RATE_LIMIT: {
    MAX_REQUESTS: 100,
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  },
  ENDPOINTS: {
    CHAT: '/api/ai/chat',
    SEARCH: '/api/ai/search',
  },
} as const;

// ==================================
// UI CONSTANTS
// ==================================
export const UI = {
  ANIMATION: {
    DURATION_FAST: 150,
    DURATION_NORMAL: 300,
    DURATION_SLOW: 500,
    EASING: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  GRID: {
    COLUMNS: {
      MOBILE: 1,
      TABLET: 2,
      DESKTOP: 3,
      WIDE: 4,
    },
  },
  TOAST: {
    DURATION_SHORT: 2000,
    DURATION_NORMAL: 4000,
    DURATION_LONG: 6000,
  },
  DEBOUNCE_MS: 300,
} as const;

// ==================================
// VALIDATION
// ==================================
export const VALIDATION = {
  EMAIL: {
    REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MAX_LENGTH: 255,
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  MESSAGE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 1000,
  },
  PHONE: {
    REGEX: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
  },
} as const;

// ==================================
// SEO
// ==================================
export const SEO = {
  DEFAULT_TITLE: 'STUDIO — Minimalist Furniture & Home Essentials',
  TITLE_TEMPLATE: '%s | STUDIO Furniture',
  DEFAULT_DESCRIPTION: 'Discover curated, minimalist furniture and home essentials designed for modern living. Featuring AI-powered shopping assistance and personalized recommendations.',
  KEYWORDS: [
    'furniture',
    'minimalist furniture',
    'modern furniture',
    'home decor',
    'interior design',
    'AI shopping assistant',
    'contemporary furniture',
    'designer furniture',
    'sustainable furniture',
  ],
  OG_IMAGE: '/og-image.jpg',
  TWITTER_HANDLE: '@studiofurniture',
} as const;

// ==================================
// WARRANTY & POLICIES
// ==================================
export const WARRANTY = {
  DURATION_YEARS: 2,
  COVERAGE: 'All furniture pieces',
} as const;

export const POLICIES = {
  RETURN_WINDOW_DAYS: 30,
  PRICE_MATCH_WINDOW_DAYS: 14,
} as const;

// ==================================
// FEATURES
// ==================================
export const FEATURES = [
  {
    title: 'Free Shipping',
    description: `On orders over $${SHIPPING.FREE_SHIPPING_THRESHOLD}`,
  },
  {
    title: `${WARRANTY.DURATION_YEARS}-Year Warranty`,
    description: `On ${WARRANTY.COVERAGE.toLowerCase()}`,
  },
  {
    title: 'Expert Support',
    description: 'Design consultation available',
  },
] as const;
