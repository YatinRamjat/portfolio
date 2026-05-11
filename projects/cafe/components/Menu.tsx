"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems } from "@/data/menuItems";
import { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

const categories: Category[] = ["All", "Chai & Drinks", "Bites & Snacks", "Main Course", "Desserts", "Combos"];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 md:py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-6xl text-espresso mb-4"
          >
            Taste the <span className="italic text-terracotta">Tradition</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            className="h-1 bg-saffron mx-auto rounded-full"
          />
        </div>

        {/* Tab Bar - Scrollable on mobile */}
        <div className="flex justify-start md:justify-center overflow-x-auto pb-8 mb-12 scrollbar-hide -mx-4 px-4">
          <div className="flex gap-2 md:gap-4 whitespace-nowrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-6 py-3 rounded-full text-sm font-bold transition-all min-h-[48px]",
                  activeCategory === category
                    ? "bg-terracotta text-cream shadow-lg shadow-terracotta/20"
                    : "bg-espresso/5 text-espresso hover:bg-espresso/10"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white p-4 md:p-6 rounded-3xl border border-espresso/5 hover:border-terracotta/20 hover:shadow-2xl hover:shadow-terracotta/5 transition-all"
              >
                {item.isMustTry && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-saffron text-espresso text-[10px] md:text-xs font-black px-3 py-1 rounded-full shadow-lg border-2 border-white uppercase tracking-tighter"
                    >
                      Must Try
                    </motion.div>
                  </div>
                )}
                
                <div className="text-4xl md:text-5xl mb-4 md:mb-6 flex justify-center group-hover:scale-110 transition-transform">
                  {item.emoji}
                </div>

                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-serif text-lg md:text-xl font-bold text-espresso leading-tight">
                    {item.name}
                  </h3>
                  <div className={cn(
                    "w-3 h-3 md:w-4 md:h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-1",
                    item.isVeg ? "border-green-600" : "border-red-600"
                  )}>
                    <div className={cn(
                      "w-1.5 h-1.5 md:w-2 md:h-2 rounded-full",
                      item.isVeg ? "bg-green-600" : "bg-red-600"
                    )} />
                  </div>
                </div>

                <p className="text-espresso/60 text-xs md:text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-terracotta md:text-lg">
                    ₹{item.price}
                  </span>
                  <button className="text-xs font-bold uppercase tracking-widest text-espresso/40 group-hover:text-terracotta transition-colors">
                    Add
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
