"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, User, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart-store";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Men", href: "/products?gender=Men" },
  { name: "Women", href: "/products?gender=Women" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="text-charcoal">
                    <Menu className="h-6 w-6" />
                  </Button>
                }
              />
              <SheetContent side="left" className="w-80 bg-ivory p-6">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="mb-8">
                  <Link
                    href="/"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-2"
                  >
                    <span className="text-2xl font-bold text-saffron" style={{ fontFamily: "var(--font-playfair)" }}>
                      ThreadsWala
                    </span>
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Desi Style, Delivered Fast
                  </p>
                </div>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                        pathname === link.href
                          ? "bg-saffron/10 text-saffron"
                          : "text-charcoal hover:bg-saffron/5 hover:text-saffron"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-8 border-t border-border pt-6">
                  <Button className="w-full bg-saffron hover:bg-saffron-dark text-white">
                    <User className="mr-2 h-4 w-4" />
                    Login / Register
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.span
              className="text-xl font-bold text-saffron sm:text-2xl lg:text-3xl"
              style={{ fontFamily: "var(--font-playfair)" }}
              whileHover={{ scale: 1.02 }}
            >
              ThreadsWala
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-saffron"
                    : "text-charcoal hover:text-saffron"
                }`}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-saffron"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" className="hidden text-charcoal hover:text-saffron sm:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden text-charcoal hover:text-saffron sm:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative text-charcoal hover:text-saffron">
                <ShoppingBag className="h-5 w-5" />
                {mounted && itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-saffron text-[10px] font-bold text-white"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="hidden border-saffron text-saffron hover:bg-saffron hover:text-white lg:flex"
            >
              <User className="mr-2 h-4 w-4" />
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
