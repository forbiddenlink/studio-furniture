"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AIRecommendations } from "@/components/ai/AIRecommendations";
import { getProductBySlug } from "@/lib/data/products";
import { useCartStore } from "@/lib/store/cartStore";
import { ShoppingCart, Truck, RotateCcw, Shield, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-medium mb-4">
              Product Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The product you&apos;re looking for doesn&apos;t exist.
            </p>
            <Button asChild>
              <Link href="/shop">Back to Shop</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $500",
    },
    {
      icon: RotateCcw,
      title: "30-Day Returns",
      description: "Easy return policy",
    },
    {
      icon: Shield,
      title: "2-Year Warranty",
      description: "Coverage included",
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <section className="border-b py-4">
          <div className="container mx-auto px-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Shop
            </Link>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Product Image */}
              <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {product.featured && (
                  <Badge className="absolute top-4 left-4">Featured</Badge>
                )}
                {!product.inStock && (
                  <Badge variant="destructive" className="absolute top-4 left-4">
                    Out of Stock
                  </Badge>
                )}
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <div className="mb-2">
                  <Badge variant="secondary" className="mb-4 capitalize">
                    {product.category}
                  </Badge>
                  <h1 className="font-serif text-4xl font-medium mb-4">
                    {product.name}
                  </h1>
                  <p className="text-3xl font-medium mb-6">
                    ${product.price.toLocaleString()}
                  </p>
                </div>

                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                  {product.description}
                </p>

                {/* Add to Cart */}
                <div className="mb-8">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gap-2"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>

                <Separator className="my-8" />

                {/* Specifications */}
                <div className="mb-8">
                  <h3 className="font-medium text-lg mb-4">Specifications</h3>
                  <dl className="grid gap-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <dt className="text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}:
                        </dt>
                        <dd className="font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <Separator className="my-8" />

                {/* Features */}
                <div className="space-y-4">
                  {features.map((feature) => (
                    <div key={feature.title} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI-Powered Recommendations */}
        <section className="py-20 border-t bg-muted/30">
          <div className="container mx-auto px-4">
            <AIRecommendations 
              currentProduct={product}
              category={product.category}
              limit={4}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
