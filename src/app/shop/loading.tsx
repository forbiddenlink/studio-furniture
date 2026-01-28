import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Loader2 } from "lucide-react";

export default function ShopLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="border-b bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="h-10 w-64 bg-muted animate-pulse rounded mb-3" />
            <div className="h-6 w-96 bg-muted animate-pulse rounded" />
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
