"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { AISearch } from "@/components/ai/AISearch";
import { products } from "@/lib/data/products";
import { Product } from "@/types";
import { Search, SlidersHorizontal, X, Sparkles } from "lucide-react";
import { CATEGORIES, PRICE_RANGE } from "@/lib/constants";

type SortOption = "featured" | "price-asc" | "price-desc" | "name";

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_RANGE.MIN, PRICE_RANGE.MAX]);
  const [aiResults, setAIResults] = useState<Product[] | null>(null);
  const [showAISearch, setShowAISearch] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("featured");
    setPriceRange([PRICE_RANGE.MIN, PRICE_RANGE.MAX]);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== "all" ||
    priceRange[0] !== PRICE_RANGE.MIN ||
    priceRange[1] !== PRICE_RANGE.MAX;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="border-b bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-4xl font-medium mb-3">Shop Collection</h1>
            <p className="text-muted-foreground">
              Discover our full range of minimalist furniture and home accessories
            </p>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Filters Bar */}
            <div className="mb-8 space-y-4">
              {/* AI Search Toggle */}
              <div className="flex items-center justify-between">
                <Button
                  variant={showAISearch ? "default" : "outline"}
                  onClick={() => {
                    setShowAISearch(!showAISearch);
                    if (showAISearch) {
                      setAIResults(null);
                    }
                  }}
                  className="gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  {showAISearch ? "Using AI Search" : "Try AI Search"}
                </Button>
                {hasActiveFilters && !showAISearch && (
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="gap-2"
                  >
                    <X className="h-4 w-4" />
                    Clear Filters
                  </Button>
                )}
              </div>

              {showAISearch ? (
                <AISearch onResults={(results) => setAIResults(results)} />
              ) : (
                <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full lg:w-[200px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                  <SelectTrigger className="w-full lg:w-[200px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              )}

              {/* Active Filters & Results Count */}
              {!showAISearch && (
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {filteredAndSortedProducts.length} product
                  {filteredAndSortedProducts.length !== 1 ? "s" : ""}
                </span>

                {hasActiveFilters && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="h-8 gap-2"
                    >
                      Clear all <X className="h-3 w-3" />
                    </Button>

                    {searchQuery && (
                      <Badge variant="secondary" className="gap-2">
                        Search: {searchQuery}
                        <button
                          onClick={() => setSearchQuery("")}
                          className="hover:text-foreground"
                          aria-label="Clear search"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}

                    {selectedCategory !== "all" && (
                      <Badge variant="secondary" className="gap-2">
                        {CATEGORIES.find((c) => c.value === selectedCategory)?.label}
                        <button
                          onClick={() => setSelectedCategory("all")}
                          className="hover:text-foreground"
                          aria-label="Clear category filter"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                  </>
                )}
              </div>
              )}
              
              {aiResults && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Showing {aiResults.length} AI-powered results
                </div>
              )}
            </div>

            {/* Products Grid */}
            {(aiResults || filteredAndSortedProducts).length > 0 ? (
              <ProductGrid products={aiResults || filteredAndSortedProducts} columns={3} />
            ) : (
              <div className="py-20 text-center">
                <SlidersHorizontal className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium text-lg mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters}>Clear all filters</Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
