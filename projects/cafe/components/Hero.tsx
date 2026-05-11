"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-espresso">
      {/* Background Texture & Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/60 via-terracotta/40 to-espresso/80 z-10" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(#F4A523 0.5px, transparent 0.5px), radial-gradient(#F4A523 0.5px, #1C1008 0.5px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px'
          }}
        />
        {/* Animated organic shapes */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-terracotta/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -120, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-saffron/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="relative z-20 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block px-4 py-1.5 bg-saffron/20 border border-saffron/30 rounded-full mb-6 backdrop-blur-sm"
        >
          <span className="text-saffron text-sm font-bold tracking-widest uppercase">
            Est. 2019 · Koregaon Park, Pune
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl md:text-8xl text-cream leading-[1.1] mb-8"
        >
          Where Every Sip <br />
          <span className="italic text-saffron">Tells a Story</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto mb-10 font-sans"
        >
          Artisan chai & modern Indian bites in the heart of Pune. 
          Discover the perfect fusion of heritage and innovation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#menu"
            className="w-full sm:w-auto bg-terracotta text-cream px-10 py-4 rounded-full text-lg font-bold hover:bg-saffron transition-all transform hover:scale-105 shadow-xl"
          >
            Explore Our Menu
          </Link>
          <Link
            href="#reserve"
            className="w-full sm:w-auto bg-transparent border-2 border-cream/30 text-cream px-10 py-4 rounded-full text-lg font-bold hover:bg-cream hover:text-espresso transition-all backdrop-blur-sm"
          >
            Reserve a Table
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-cream/40 text-xs uppercase tracking-widest font-bold">Scroll Down</span>
        <ArrowDown className="w-5 h-5 text-saffron" />
      </motion.div>
    </section>
  );
}
