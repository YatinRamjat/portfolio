import { Suspense } from "react";
import { ProductsContent } from "./ProductsClient";
import { ProductGridSkeleton } from "@/components/loading-skeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse our extensive collection of Indian ethnic and fusion wear for men and women.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-ivory">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <ProductGridSkeleton count={8} />
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
