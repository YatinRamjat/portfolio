"use client";

import { motion } from "framer-motion";
import { HeroCarousel } from "@/components/hero-carousel";
import { CategoryGrid } from "@/components/category-grid";
import { ProductCard } from "@/components/product-card";
import { TrustStrip } from "@/components/trust-strip";
import { NewsletterBanner } from "@/components/newsletter-banner";
import { products } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroCarousel />

      {/* Categories */}
      <CategoryGrid />

      {/* Featured Products */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2
              className="text-2xl font-bold text-charcoal sm:text-3xl lg:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Featured Collection
            </h2>
            <p className="mt-2 text-muted-foreground">
              Handpicked styles, curated just for you
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <TrustStrip />

      {/* Newsletter */}
      <NewsletterBanner />
    </>
  );
}
