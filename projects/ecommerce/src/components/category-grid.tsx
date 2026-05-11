"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/lib/data";

const categoryIcons: Record<string, React.ReactNode> = {
  kurta: (
    <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 8L12 16V56H52V16L44 8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 8C20 8 24 14 32 14C40 14 44 8 44 8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 16L4 24L12 28" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M52 16L60 24L52 28" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32 14V36" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 3"/>
    </svg>
  ),
  saree: (
    <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 8V56C16 56 24 52 32 56C40 52 48 56 48 56V8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 20H48" strokeLinecap="round"/>
      <path d="M16 32H48" strokeLinecap="round" strokeDasharray="4 3"/>
      <path d="M16 44H48" strokeLinecap="round"/>
      <circle cx="32" cy="26" r="3"/>
    </svg>
  ),
  lehenga: (
    <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M24 8H40V20L48 56H16L24 20V8Z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 8C24 8 28 12 32 12C36 12 40 8 40 8" strokeLinecap="round"/>
      <path d="M20 44H44" strokeLinecap="round" strokeDasharray="3 2"/>
      <ellipse cx="32" cy="32" rx="4" ry="2"/>
    </svg>
  ),
  sherwani: (
    <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 8L14 16V56H50V16L42 8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 8L32 18L42 8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32 18V56" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="32" cy="28" r="1.5" fill="currentColor"/>
      <circle cx="32" cy="36" r="1.5" fill="currentColor"/>
      <circle cx="32" cy="44" r="1.5" fill="currentColor"/>
      <path d="M14 16L6 24L14 28" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M50 16L58 24L50 28" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  fusion: (
    <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 8L16 28H48L44 8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 8C20 8 24 14 32 14C40 14 44 8 44 8" strokeLinecap="round"/>
      <path d="M14 32H50V56H14V32Z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 44H50" strokeLinecap="round" strokeDasharray="4 3"/>
    </svg>
  ),
  accessory: (
    <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="32" cy="24" r="12"/>
      <path d="M20 24C20 24 26 32 32 32C38 32 44 24 44 24" strokeLinecap="round"/>
      <path d="M32 36V48" strokeLinecap="round"/>
      <path d="M24 48H40" strokeLinecap="round"/>
      <circle cx="32" cy="18" r="3" fill="currentColor"/>
    </svg>
  ),
};

export function CategoryGrid() {
  return (
    <section className="py-16 paisley-bg lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            className="text-2xl font-bold text-charcoal sm:text-3xl lg:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Shop by Category
          </h2>
          <p className="mt-2 text-muted-foreground">
            Explore our curated collection of Indian ethnic wear
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                href={`/products?category=${category.slug}`}
                className="group flex flex-col items-center rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-saffron/10 text-saffron transition-colors group-hover:bg-saffron group-hover:text-white">
                  {categoryIcons[category.icon]}
                </div>
                <span className="mt-4 text-sm font-semibold text-charcoal group-hover:text-saffron">
                  {category.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
