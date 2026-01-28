"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <article aria-label={`${product.name} - ${product.category}`}>
      <Link 
        href={`/shop/${product.slug}`}
        aria-label={`View details for ${product.name}, priced at $${product.price.toLocaleString()}`}
      >
        <Card className="group overflow-hidden border-0 shadow-none transition-all hover:shadow-lg">
          <CardContent className="p-0">
            <div className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src={product.images[0]}
                alt={`${product.name} - ${product.description}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {product.featured && (
                <Badge className="absolute left-3 top-3" aria-label="Featured product">
                  Featured
                </Badge>
              )}
              {!product.inStock && (
                <Badge 
                  variant="secondary" 
                  className="absolute left-3 top-3"
                  aria-label="Out of stock"
                >
                  Out of Stock
                </Badge>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-3 p-4">
            <div className="w-full">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {product.category}
              </p>
              <h3 className="font-medium mt-1 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {product.description}
              </p>
            </div>
            <div className="flex w-full items-center justify-between">
              <span 
                className="text-lg font-medium"
                aria-label={`Price: $${product.price.toLocaleString()}`}
              >
                ${product.price.toLocaleString()}
              </span>
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="gap-2"
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                Add
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </article>
  );
}
