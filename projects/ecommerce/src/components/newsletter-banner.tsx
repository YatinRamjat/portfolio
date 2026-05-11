"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export function NewsletterBanner() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing! 🎉");
      setEmail("");
    }
  };

  return (
    <section className="relative overflow-hidden bg-charcoal py-16 lg:py-20">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-saffron blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-saffron blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-saffron/20">
            <Mail className="h-6 w-6 text-saffron" />
          </div>
          <h2
            className="mt-4 text-2xl font-bold text-white sm:text-3xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Stay in the Loop
          </h2>
          <p className="mt-2 max-w-md text-white/70">
            Subscribe to get exclusive deals, new arrivals, and festive sale
            alerts. Get 10% off your first order!
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex w-full max-w-md gap-2"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-saffron focus:ring-saffron"
              required
            />
            <Button
              type="submit"
              className="bg-saffron px-6 text-white hover:bg-saffron-dark"
            >
              <Send className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Subscribe</span>
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
