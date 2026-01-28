"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Truck, Shield, Headphones } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { AIRecommendations } from "@/components/ai/AIRecommendations";
import { getFeaturedProducts } from "@/lib/data/products";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FadeIn, FadeInView } from "@/components/common/Animations";
import { getOrganizationSchema, getWebsiteSchema, getItemListSchema } from "@/lib/structured-data";
import { FEATURES } from "@/lib/constants";

const categories = [
  {
    name: "Seating",
    href: "/shop?category=seating",
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
    description: "Chairs, sofas, and ottomans",
  },
  {
    name: "Tables",
    href: "/shop?category=tables",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80",
    description: "Dining, coffee, and side tables",
  },
  {
    name: "Storage",
    href: "/shop?category=storage",
    image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&q=80",
    description: "Shelves, cabinets, and consoles",
  },
  {
    name: "Lighting",
    href: "/shop?category=lighting",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
    description: "Pendants, floor, and table lamps",
  },
];

const features = [
  {
    icon: Truck,
    title: FEATURES[0].title,
    description: FEATURES[0].description,
  },
  {
    icon: Shield,
    title: FEATURES[1].title,
    description: FEATURES[1].description,
  },
  {
    icon: Headphones,
    title: FEATURES[2].title,
    description: FEATURES[2].description,
  },
];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            getOrganizationSchema(),
            getWebsiteSchema(),
            getItemListSchema(featuredProducts, 'Featured Products'),
          ]),
        }}
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[85vh] min-h-150 flex items-center justify-center bg-muted overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
              alt="Modern minimalist furniture"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-b from-background/60 to-background/90" />
          <div className="container relative z-10 px-4 text-center">
            <FadeIn delay={0.2}>
              <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm font-medium bg-background/80 backdrop-blur-sm border-primary/20">
                New Collection 2025
              </Badge>
            </FadeIn>
            <FadeIn delay={0.4}>
              <h1 className="font-serif text-5xl font-medium tracking-tight sm:text-6xl lg:text-7xl mb-6">
                Minimalist Furniture
                <br />
                for Modern Living
              </h1>
            </FadeIn>
            <FadeIn delay={0.6}>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Curated pieces that combine timeless design with exceptional craftsmanship.
                Transform your space with furniture built to last.
              </p>
            </FadeIn>
            <FadeIn delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/shop">
                  Shop Collection <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
            </FadeIn>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-y bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 sm:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <FadeInView>
              <div className="text-center mb-12">
                <h2 className="font-serif text-4xl font-medium mb-4">
                  Featured Collection
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Handpicked pieces that embody our design philosophy. Each item is
                  thoughtfully crafted to bring beauty and function to your home.
                </p>
              </div>
            </FadeInView>
            <FadeInView delay={0.2}>
              <ProductGrid products={featuredProducts} columns={4} />
            </FadeInView>
            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline">
                <Link href="/shop">View All Products</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* AI Recommendations Section */}
        <section className="py-20 border-t">
          <div className="container mx-auto px-4">
            <AIRecommendations limit={4} />
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-medium mb-4">
                Shop by Category
              </h2>
              <p className="text-muted-foreground">
                Explore our curated collections
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group relative aspect-square overflow-hidden rounded-lg bg-muted transition-all hover:shadow-xl"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/90 to-background/20" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <h3 className="font-serif text-2xl font-medium mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="font-serif text-4xl font-medium mb-6">
                  Designed for Life
                </h2>
                <p className="text-muted-foreground mb-6">
                  At STUDIO, we believe great design should be accessible, sustainable,
                  and built to last. Each piece in our collection is carefully selected
                  from makers who share our values of quality craftsmanship and timeless
                  aesthetics.
                </p>
                <p className="text-muted-foreground mb-8">
                  From the warmth of natural wood to the clean lines of modern steel,
                  our furniture celebrates materials in their purest form. We partner
                  with artisans and manufacturers who prioritize sustainability and fair
                  labor practices.
                </p>
                <Button asChild variant="outline">
                  <Link href="/about">Read Our Story</Link>
                </Button>
              </div>
              <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80"
                  alt="Minimalist furniture design"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-4xl font-medium mb-4">
              Get Design Inspiration
            </h2>
            <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter for exclusive offers, styling tips, and
              early access to new collections.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md bg-primary-foreground text-foreground"
              />
              <Button type="submit" variant="secondary" size="lg">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
