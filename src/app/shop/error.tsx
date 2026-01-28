"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AlertCircle } from "lucide-react";

export default function ShopError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-6" />
          <h2 className="font-serif text-3xl font-medium mb-4">
            Failed to load products
          </h2>
          <p className="text-muted-foreground mb-8">
            We couldn&apos;t load the shop page. Please try again.
          </p>
          <Button onClick={() => reset()} size="lg">
            Retry
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
