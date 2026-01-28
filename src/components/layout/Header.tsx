"use client";

import Link from "next/link";
import { Search, ShoppingCart, Menu, Armchair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/store/cartStore";
import { useState } from "react";

const navigation = [
  { name: "Shop", href: "/shop" },
  { name: "Seating", href: "/shop?category=seating" },
  { name: "Tables", href: "/shop?category=tables" },
  { name: "Storage", href: "/shop?category=storage" },
  { name: "Lighting", href: "/shop?category=lighting" },
  { name: "Decor", href: "/shop?category=decor" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav 
        className="container mx-auto flex h-16 items-center justify-between px-4"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center space-x-2"
          aria-label="STUDIO Furniture - Go to homepage"
        >
          <Armchair className="h-6 w-6" aria-hidden="true" />
          <span className="font-serif text-2xl font-semibold">STUDIO</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden lg:flex"
            aria-label="Search products"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Cart */}
          <Link href="/cart" aria-label={`Shopping cart with ${totalItems} items`}>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              {totalItems > 0 && (
                <Badge
                  variant="default"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                  aria-label={`${totalItems} items in cart`}
                >
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">
                {totalItems === 0 ? 'Cart is empty' : `Cart has ${totalItems} items`}
              </span>
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[300px]"
              aria-label="Mobile navigation menu"
            >
              <nav 
                className="flex flex-col space-y-4 mt-8"
                aria-label="Mobile navigation links"
              >
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
