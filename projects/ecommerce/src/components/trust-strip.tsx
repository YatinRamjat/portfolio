"use client";

import { motion } from "framer-motion";
import { Truck, RotateCcw, Banknote, Award } from "lucide-react";

const trustItems = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders above ₹999",
  },
  {
    icon: RotateCcw,
    title: "Easy 15-Day Returns",
    description: "No questions asked",
  },
  {
    icon: Banknote,
    title: "Cash on Delivery",
    description: "Pay at your doorstep",
  },
  {
    icon: Award,
    title: "Authentic Craftsmanship",
    description: "100% genuine Indian wear",
  },
];

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-white py-10 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-saffron/10">
                <item.icon className="h-6 w-6 text-saffron" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-charcoal">
                {item.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
