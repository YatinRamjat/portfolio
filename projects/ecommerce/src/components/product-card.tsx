"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/data";
import { formatINR } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import toast from "react-hot-toast";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[2] || product.sizes[0], product.colors[0]);
    toast.success(`${product.name} added to cart ✓`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist ♡"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      <Link href={`/products/${product.id}`}>
        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
          {/* Image */}
          <div className="zoom-container relative aspect-[3/4] overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Discount Badge */}
            <Badge className="absolute left-3 top-3 bg-saffron text-white text-xs font-bold px-2 py-1">
              {product.discount}% OFF
            </Badge>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition-all hover:scale-110"
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  isWishlisted
                    ? "fill-red-500 text-red-500"
                    : "text-charcoal/60"
                }`}
              />
            </button>

            {/* Quick Add */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Button
                onClick={handleAddToCart}
                className="w-full bg-saffron text-white hover:bg-saffron-dark"
                size="sm"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </motion.div>
          </div>

          {/* Info */}
          <div className="p-4">
            <p className="text-xs font-medium text-saffron uppercase tracking-wider">
              {product.brand}
            </p>
            <h3 className="mt-1 text-sm font-semibold text-charcoal line-clamp-1 group-hover:text-saffron transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="mt-2 flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3.5 w-3.5 ${
                      star <= Math.floor(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : star <= product.rating
                        ? "fill-amber-400/50 text-amber-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-base font-bold text-charcoal">
                {formatINR(product.price)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {formatINR(product.mrp)}
              </span>
            </div>

            {/* Color Swatches */}
            <div className="mt-2 flex gap-1.5">
              {product.colors.map((color) => (
                <span
                  key={color.name}
                  className="h-4 w-4 rounded-full border border-gray-200"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
