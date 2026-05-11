"use client";

import { motion } from "framer-motion";
import { Coffee, Leaf, Star } from "lucide-react";

export default function AboutStrip() {
  const items = [
    {
      icon: <Coffee className="w-8 h-8 text-terracotta" />,
      title: "17 Chai Varieties",
      description: "From Kashmiri Kahwa to Adrak Masala",
    },
    {
      icon: <Leaf className="w-8 h-8 text-terracotta" />,
      title: "100% Vegetarian",
      description: "Sourced from local Pune farms",
    },
    {
      icon: <Star className="w-8 h-8 text-terracotta" />,
      title: "4.8 on Zomato",
      description: "1,200+ happy customers",
    },
  ];

  return (
    <section id="about" className="bg-saffron/10 py-16 md:py-24 border-y border-terracotta/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-6 p-4 bg-cream rounded-2xl shadow-sm group-hover:shadow-md transition-shadow transform group-hover:-translate-y-1 duration-300">
                {item.icon}
              </div>
              <h3 className="font-serif text-2xl font-bold text-espresso mb-2">
                {item.title}
              </h3>
              <p className="text-espresso/60 font-medium">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
