"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Package, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getEstimatedDelivery, generateOrderId } from "@/lib/utils";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || generateOrderId();
  const paymentId = searchParams.get("paymentId");
  const isCOD = searchParams.get("payment") === "cod";

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-ivory px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-lg"
      >
        <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-lg sm:p-10">
          {/* Animated Checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <CheckCircle className="h-12 w-12 text-green-600" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1
              className="mt-6 text-2xl font-bold text-charcoal sm:text-3xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Order Placed Successfully!
            </h1>
            <p className="mt-2 text-muted-foreground">
              Thank you for shopping with ThreadsWala
            </p>
          </motion.div>

          <Separator className="my-6" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4 text-left"
          >
            <div className="flex items-start gap-3 rounded-lg bg-ivory p-4">
              <Package className="mt-0.5 h-5 w-5 text-saffron" />
              <div>
                <p className="text-xs text-muted-foreground">Order ID</p>
                <p className="text-sm font-bold text-charcoal">{orderId}</p>
              </div>
            </div>

            {paymentId && (
              <div className="flex items-start gap-3 rounded-lg bg-ivory p-4">
                <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Payment ID</p>
                  <p className="text-sm font-bold text-charcoal">{paymentId}</p>
                </div>
              </div>
            )}

            {isCOD && (
              <div className="flex items-start gap-3 rounded-lg bg-amber-50 p-4">
                <Package className="mt-0.5 h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-xs text-amber-700">Payment Method</p>
                  <p className="text-sm font-bold text-amber-700">Cash on Delivery</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 rounded-lg bg-ivory p-4">
              <Calendar className="mt-0.5 h-5 w-5 text-saffron" />
              <div>
                <p className="text-xs text-muted-foreground">Expected Delivery</p>
                <p className="text-sm font-bold text-charcoal">
                  {getEstimatedDelivery()} (5-7 business days)
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 space-y-3"
          >
            <Link href="/products">
              <Button className="w-full bg-saffron text-white hover:bg-saffron-dark">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" className="w-full" onClick={() => {}}>
              Track Order
            </Button>
          </motion.div>

          <p className="mt-6 text-xs text-muted-foreground">
            A confirmation email has been sent to your email address.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center bg-ivory">
        <div className="animate-pulse h-96 w-full max-w-lg rounded-2xl bg-gray-200" />
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
