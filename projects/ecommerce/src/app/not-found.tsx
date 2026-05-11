"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-ivory paisley-bg px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center"
      >
        {/* 404 Number */}
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-[120px] font-bold leading-none text-saffron/20 sm:text-[180px]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          404
        </motion.h1>

        <div className="-mt-8 sm:-mt-12">
          <h2
            className="text-2xl font-bold text-charcoal sm:text-3xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Page Not Found
          </h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            Oops! The page you&apos;re looking for seems to have wandered off like a
            loose thread. Let&apos;s get you back on track.
          </p>
        </div>

        <div className="mt-8 flex gap-3">
          <Link href="/">
            <Button className="bg-saffron text-white hover:bg-saffron-dark">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" className="border-saffron text-saffron hover:bg-saffron hover:text-white">
              <Search className="mr-2 h-4 w-4" />
              Browse Products
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
