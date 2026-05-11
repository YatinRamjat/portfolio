"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  MapPin,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { QuantityStepper } from "@/components/quantity-stepper";
import { SizeGuideModal } from "@/components/size-guide-modal";
import { ProductCard } from "@/components/product-card";
import { formatINR } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import toast from "react-hot-toast";
import Link from "next/link";
import type { Product } from "@/lib/data";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: "", hex: "" });
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeResult, setPincodeResult] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    addItem(product, selectedSize, selectedColor, quantity);
    toast.success(`${product.name} added to cart ✓`);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    addItem(product, selectedSize, selectedColor, quantity);
    router.push("/cart");
  };

  const handlePincodeCheck = () => {
    if (pincode.length === 6) {
      setPincodeResult("Delivery available in 5-7 business days");
    } else {
      setPincodeResult("Please enter a valid 6-digit pincode");
    }
  };

  const savings = product.mrp - product.price;

  return (
    <div className="min-h-screen bg-ivory">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-saffron">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-saffron">Products</Link>
            <span>/</span>
            <span className="text-charcoal">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductImageGallery images={product.images} name={product.name} />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-saffron">
                {product.brand}
              </p>
              <h1
                className="mt-1 text-2xl font-bold text-charcoal sm:text-3xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {product.name}
              </h1>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-full bg-green-600 px-2.5 py-0.5 text-xs font-bold text-white">
                  {product.rating}
                  <Star className="h-3 w-3 fill-white" />
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.reviewCount} ratings
                </span>
              </div>
            </div>

            <Separator />

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-charcoal">
                  {formatINR(product.price)}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  {formatINR(product.mrp)}
                </span>
                <Badge className="bg-green-600 text-white">
                  {product.discount}% OFF
                </Badge>
              </div>
              <p className="mt-1 text-sm text-green-600 font-medium">
                You save {formatINR(savings)}
              </p>
              <p className="text-xs text-muted-foreground">
                Inclusive of all taxes
              </p>
            </div>

            {/* Color Selector */}
            <div>
              <h3 className="mb-2 text-sm font-semibold text-charcoal">
                Color: <span className="font-normal text-muted-foreground">{selectedColor.name}</span>
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`h-10 w-10 rounded-full border-2 transition-all ${
                      selectedColor.name === color.name
                        ? "border-saffron ring-2 ring-saffron/30 scale-110"
                        : "border-gray-200 hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-charcoal">
                  Size{selectedSize && `: ${selectedSize}`}
                </h3>
                <SizeGuideModal />
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "border-saffron bg-saffron text-white"
                        : "border-border bg-white text-charcoal hover:border-saffron"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="mb-2 text-sm font-semibold text-charcoal">Quantity</h3>
              <QuantityStepper
                quantity={quantity}
                onIncrease={() => setQuantity((q) => q + 1)}
                onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
              />
            </div>

            {/* CTAs */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-saffron py-6 text-base font-semibold text-white hover:bg-saffron-dark"
                size="lg"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                className="flex-1 bg-charcoal py-6 text-base font-semibold text-white hover:bg-charcoal-light"
                size="lg"
              >
                <Zap className="mr-2 h-5 w-5" />
                Buy Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="py-6"
                onClick={() => {
                  setIsWishlisted(!isWishlisted);
                  toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist ♡");
                }}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isWishlisted ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
            </div>

            {/* Pincode Check */}
            <div className="rounded-xl border border-border bg-white p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-charcoal">
                <MapPin className="h-4 w-4 text-saffron" />
                Check Delivery Availability
              </div>
              <div className="mt-2 flex gap-2">
                <Input
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                  className="max-w-[180px]"
                />
                <Button
                  variant="outline"
                  onClick={handlePincodeCheck}
                  className="border-saffron text-saffron hover:bg-saffron hover:text-white"
                >
                  Check
                </Button>
              </div>
              {pincodeResult && (
                <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                  <Truck className="h-3 w-3" />
                  {pincodeResult}
                </p>
              )}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center rounded-lg bg-white p-3 text-center">
                <Truck className="h-5 w-5 text-saffron" />
                <span className="mt-1 text-[10px] font-medium text-charcoal">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-white p-3 text-center">
                <RotateCcw className="h-5 w-5 text-saffron" />
                <span className="mt-1 text-[10px] font-medium text-charcoal">15-Day Returns</span>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-white p-3 text-center">
                <Shield className="h-5 w-5 text-saffron" />
                <span className="mt-1 text-[10px] font-medium text-charcoal">100% Authentic</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start bg-white">
              <TabsTrigger value="description" className="data-[state=active]:text-saffron">
                Description
              </TabsTrigger>
              <TabsTrigger value="material" className="data-[state=active]:text-saffron">
                Material & Care
              </TabsTrigger>
              <TabsTrigger value="shipping" className="data-[state=active]:text-saffron">
                Shipping & Returns
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4 rounded-xl bg-white p-6">
              <p className="text-sm leading-relaxed text-charcoal/80">
                {product.description}
              </p>
            </TabsContent>
            <TabsContent value="material" className="mt-4 rounded-xl bg-white p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-charcoal">Material</h4>
                  <p className="mt-1 text-sm text-charcoal/80">{product.material}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-charcoal">Care Instructions</h4>
                  <p className="mt-1 text-sm text-charcoal/80">{product.care}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="mt-4 rounded-xl bg-white p-6">
              <p className="text-sm text-charcoal/80">{product.shipping}</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Reviews */}
        <div className="mt-12">
          <h2
            className="text-xl font-bold text-charcoal sm:text-2xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Customer Reviews
          </h2>
          <div className="mt-6 space-y-4">
            {product.reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-xl border border-border bg-white p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-saffron/10 text-sm font-bold text-saffron">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-charcoal">
                        {review.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(review.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`h-4 w-4 ${
                          s <= review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm text-charcoal/80">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2
            className="text-xl font-bold text-charcoal sm:text-2xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            You May Also Like
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-white p-3 shadow-lg lg:hidden z-40">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-lg font-bold text-charcoal">{formatINR(product.price)}</p>
            <p className="text-xs text-muted-foreground line-through">{formatINR(product.mrp)}</p>
          </div>
          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-saffron text-white hover:bg-saffron-dark"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
