import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about STUDIO's mission to create timeless, minimalist furniture. Discover our values, our story, and our commitment to quality craftsmanship.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Quality Craftsmanship",
      description:
        "We partner with skilled artisans who take pride in every detail, ensuring each piece meets our exacting standards.",
    },
    {
      title: "Sustainable Materials",
      description:
        "From responsibly sourced wood to eco-friendly finishes, we prioritize materials that are kind to the planet.",
    },
    {
      title: "Timeless Design",
      description:
        "Our furniture transcends trends, featuring clean lines and classic proportions that remain relevant for years.",
    },
    {
      title: "Fair Production",
      description:
        "We believe in ethical manufacturing, working only with partners who treat their workers fairly and maintain safe conditions.",
    },
  ];

  const timeline = [
    {
      year: "2020",
      title: "Founded",
      description:
        "STUDIO was born from a simple idea: furniture should be beautiful, functional, and built to last.",
    },
    {
      year: "2021",
      title: "First Collection",
      description:
        "Launched our inaugural line of seating and tables, focusing on minimalist oak and walnut pieces.",
    },
    {
      year: "2023",
      title: "Expanded Catalog",
      description:
        "Grew to include lighting, storage, and decor items, establishing partnerships with 12 artisan makers.",
    },
    {
      year: "2025",
      title: "Going Digital",
      description:
        "Reimagined our entire experience for the modern consumer with this new e-commerce platform.",
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-125 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1920&q=80"
              alt="About STUDIO"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-b from-background/60 to-background/90" />
          <div className="container relative z-10 px-4 text-center">
            <h1 className="font-serif text-5xl font-medium tracking-tight sm:text-6xl lg:text-7xl mb-6">
              About STUDIO
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Redefining modern living through thoughtful design and exceptional craftsmanship
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-4xl font-medium mb-6 text-center">
                Our Story
              </h2>
              <div className="prose prose-lg max-w-none space-y-6">
                <p className="text-muted-foreground text-center">
                  STUDIO began in a small workshop with a vision to create furniture that
                  celebrates simplicity and quality. We were tired of seeing well-designed
                  pieces that sacrificed durability, and durable pieces that sacrificed design.
                </p>
                <p className="text-muted-foreground text-center">
                  Today, we curate collections from independent makers who share our philosophy.
                  Every chair, table, and lamp in our catalog has been personally tested and
                  evaluated. We ask: Will this piece still be loved in ten years? Does it honor
                  the materials and the maker&apos;s skill? Does it make a space feel more like home?
                </p>
                <p className="text-muted-foreground text-center">
                  If the answer is yes to all three, it earns a place in the STUDIO collection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-4xl font-medium mb-12 text-center">
              Our Values
            </h2>
            <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
              {values.map((value) => (
                <div key={value.title} className="bg-background p-8 rounded-lg">
                  <h3 className="font-serif text-2xl font-medium mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-4xl font-medium mb-12 text-center">
              Our Journey
            </h2>
            <div className="max-w-3xl mx-auto space-y-12">
              {timeline.map((item) => (
                <div
                  key={item.year}
                  className="flex gap-8 items-start"
                >
                  <div className="shrink-0 w-20 text-right">
                    <span className="font-serif text-2xl font-medium">
                      {item.year}
                    </span>
                  </div>
                  <div className="flex-1 pb-8 border-l-2 border-muted pl-8">
                    <h3 className="font-medium text-xl mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-4xl font-medium mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore our collection of thoughtfully designed furniture and discover
              pieces that will grow more beautiful with time.
            </p>
            <Button asChild size="lg" className="gap-2">
              <Link href="/shop">
                Shop Collection <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
