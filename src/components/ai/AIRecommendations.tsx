"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";
import { Sparkles } from "lucide-react";

interface AIRecommendationsProps {
  currentProduct?: Product;
  category?: string;
  limit?: number;
}

export function AIRecommendations({
  currentProduct,
  category,
  limit = 4,
}: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate AI recommendation engine
    const generateRecommendations = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // In production, this would call your AI recommendation API
      // For demo, we'll use smart filtering based on category and style
      const { products } = await import("@/lib/data/products");
      
      let filtered = products.filter((p) => p.id !== currentProduct?.id);

      if (category) {
        // Prioritize same category
        filtered = [
          ...filtered.filter((p) => p.category === category),
          ...filtered.filter((p) => p.category !== category),
        ];
      }

      if (currentProduct) {
        // AI-style matching: prioritize products with similar price range
        filtered.sort((a, b) => {
          const aDiff = Math.abs(a.price - currentProduct.price);
          const bDiff = Math.abs(b.price - currentProduct.price);
          return aDiff - bDiff;
        });

        // Boost products with matching tags
        filtered.sort((a, b) => {
          const aMatchingTags = a.tags.filter((tag) =>
            currentProduct.tags.includes(tag)
          ).length;
          const bMatchingTags = b.tags.filter((tag) =>
            currentProduct.tags.includes(tag)
          ).length;
          return bMatchingTags - aMatchingTags;
        });
      }

      setRecommendations(filtered.slice(0, limit));
      setIsLoading(false);
    };

    generateRecommendations();
  }, [currentProduct, category, limit]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          <h3 className="text-2xl font-serif font-medium">AI Recommendations</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(limit)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-muted rounded-lg h-96"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="text-2xl font-serif font-medium">
          {currentProduct ? "You Might Also Like" : "Recommended For You"}
        </h3>
        <span className="text-sm text-muted-foreground ml-2">
          Powered by AI
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
