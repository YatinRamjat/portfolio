"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Tag, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CartItemCard } from "@/components/cart-item";
import { useCartStore } from "@/store/cart-store";
import { formatINR } from "@/lib/utils";
import toast from "react-hot-toast";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [couponInput, setCouponInput] = useState("");

  const {
    items,
    couponCode,
    couponDiscount,
    getSubtotal,
    getItemCount,
    getDeliveryCharge,
    getCGST,
    getSGST,
    getDiscount,
    getGrandTotal,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-ivory">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 rounded bg-gray-200" />
            <div className="h-32 rounded-xl bg-gray-200" />
            <div className="h-32 rounded-xl bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponInput);
    if (result.success) {
      toast.success(result.message);
      setCouponInput("");
    } else {
      toast.error(result.message);
    }
  };

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-ivory">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center px-4"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-saffron/10">
            <ShoppingBag className="h-12 w-12 text-saffron" />
          </div>
          <h1
            className="mt-6 text-2xl font-bold text-charcoal"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Your cart is empty
          </h1>
          <p className="mt-2 text-muted-foreground">
            Looks like you haven&apos;t added anything yet. Let&apos;s change that!
          </p>
          <Link href="/products">
            <Button className="mt-6 bg-saffron text-white hover:bg-saffron-dark">
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1
            className="text-2xl font-bold text-charcoal sm:text-3xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Shopping Cart
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {getItemCount()} item{getItemCount() > 1 ? "s" : ""} in your cart
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={`${item.product.id}-${item.size}-${item.color.name}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CartItemCard item={item} />
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-24 rounded-2xl border border-border bg-white p-6">
              <h2 className="text-lg font-bold text-charcoal" style={{ fontFamily: "var(--font-playfair)" }}>
                Order Summary
              </h2>

              {/* Coupon */}
              <div className="mt-4">
                {couponCode ? (
                  <div className="flex items-center justify-between rounded-lg bg-green-50 px-3 py-2">
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <Tag className="h-4 w-4" />
                      <span className="font-medium">{couponCode}</span>
                      <span>({couponDiscount}% off)</span>
                    </div>
                    <button onClick={removeCoupon}>
                      <X className="h-4 w-4 text-green-700 hover:text-red-500" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Coupon code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleApplyCoupon}
                      className="border-saffron text-saffron hover:bg-saffron hover:text-white"
                    >
                      Apply
                    </Button>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              {/* Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-charcoal">{formatINR(getSubtotal())}</span>
                </div>
                {getDiscount() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span>-{formatINR(getDiscount())}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className={`font-medium ${getDeliveryCharge() === 0 ? "text-green-600" : "text-charcoal"}`}>
                    {getDeliveryCharge() === 0 ? "FREE" : formatINR(getDeliveryCharge())}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CGST (9%)</span>
                  <span className="font-medium text-charcoal">{formatINR(getCGST())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SGST (9%)</span>
                  <span className="font-medium text-charcoal">{formatINR(getSGST())}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between">
                <span className="text-base font-bold text-charcoal">Grand Total</span>
                <span className="text-xl font-bold text-saffron">
                  {formatINR(getGrandTotal())}
                </span>
              </div>

              {getDeliveryCharge() > 0 && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Add {formatINR(999 - getSubtotal())} more for free delivery
                </p>
              )}

              <Link href="/checkout" className="mt-6 block">
                <Button className="w-full bg-saffron py-6 text-base font-semibold text-white hover:bg-saffron-dark">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/products" className="mt-3 block">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
