import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your selected items and proceed to checkout. Free shipping on orders over $500.",
  openGraph: {
    title: "Shopping Cart | STUDIO Furniture",
    description: "Review your cart and complete your purchase.",
    url: "https://studiofurniture.demo/cart",
  },
  robots: {
    index: false,
    follow: true,
  },
};
