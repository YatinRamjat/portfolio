"use client";

import { useState, useEffect } from "react";
import { Coffee, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Menu", href: "#menu" },
    { name: "Reserve", href: "#reserve" },
    { name: "About", href: "#about" },
    { name: "Find Us", href: "#footer" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4 md:px-8",
        isScrolled
          ? "bg-cream/80 backdrop-blur-md shadow-md py-3"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Coffee className="w-8 h-8 text-terracotta" />
          <span className="font-serif text-2xl font-bold tracking-tight text-espresso">
            Chai & Chowk
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-terracotta transition-colors uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#reserve"
            className="bg-terracotta text-cream px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-espresso transition-all shadow-lg hover:shadow-terracotta/20"
          >
            Reserve a Table
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-espresso"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-cream flex flex-col p-8"
          >
            <div className="flex items-center justify-between mb-12">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <Coffee className="w-8 h-8 text-terracotta" />
                <span className="font-serif text-2xl font-bold text-espresso">
                  Chai & Chowk
                </span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-espresso" />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-4xl font-semibold text-espresso hover:text-terracotta transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#reserve"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 bg-terracotta text-cream text-center py-4 rounded-xl text-lg font-bold shadow-xl"
              >
                Reserve a Table
              </Link>
            </div>
            
            <div className="mt-auto pt-12 border-t border-espresso/10">
              <p className="text-sm text-espresso/60 mb-4 uppercase tracking-widest">Connect with us</p>
              <div className="flex gap-6 font-medium">
                <span>Instagram</span>
                <span>Facebook</span>
                <span>WhatsApp</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
