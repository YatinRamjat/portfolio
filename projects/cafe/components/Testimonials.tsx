"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-6xl text-espresso mb-4"
          >
            What Our <span className="italic text-terracotta">Guests Say</span>
          </motion.h2>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-saffron text-saffron" />
            ))}
          </div>
        </div>

        {/* Mobile: Horizontal Scroll | Desktop: Grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-8 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[280px] md:min-w-0 bg-white p-8 rounded-[2rem] border border-espresso/5 shadow-sm hover:shadow-xl transition-all group"
            >
              <Quote className="w-10 h-10 text-saffron/20 mb-6 group-hover:text-terracotta/20 transition-colors" />
              
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < testimonial.rating ? 'fill-saffron text-saffron' : 'text-espresso/10'}`} 
                  />
                ))}
              </div>

              <p className="text-espresso/80 font-medium mb-8 italic leading-relaxed">
                "{testimonial.quote}"
              </p>

              <div className="mt-auto pt-6 border-t border-espresso/5">
                <p className="font-serif text-xl font-bold text-espresso">{testimonial.name}</p>
                <p className="text-xs font-bold text-espresso/40 uppercase tracking-widest mt-1">Verified Guest</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
